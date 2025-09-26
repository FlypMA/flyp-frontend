/**
 * 🛠️ Profile Helper Functions
 *
 * Utility functions for profile management and validation
 */

import { FIELD_VALIDATION_RULES, PROFILE_FIELDS } from '../constants';
import { Profile, UserRole } from '../types/profile.types';

// =============================================================================
// PROFILE VALIDATION
// =============================================================================

/**
 * Validate profile field
 */
export const validateProfileField = (
  fieldId: string,
  value: unknown
): { isValid: boolean; error?: string } => {
  const field = PROFILE_FIELDS.find(f => f.id === fieldId);

  if (!field) {
    return { isValid: false, error: 'Field not found' };
  }

  // Check required fields
  if (field.required && (!value || value === '')) {
    return { isValid: false, error: `${field.label} is required` };
  }

  // Skip validation if value is empty and field is not required
  if (!value || value === '') {
    return { isValid: true };
  }

  // Type-specific validation
  switch (field.type) {
    case 'email':
      if (!FIELD_VALIDATION_RULES.email.pattern.test(value)) {
        return { isValid: false, error: FIELD_VALIDATION_RULES.email.message };
      }
      break;

    case 'phone':
      if (!FIELD_VALIDATION_RULES.phone.pattern.test(value)) {
        return { isValid: false, error: FIELD_VALIDATION_RULES.phone.message };
      }
      break;

    case 'url':
      if (!FIELD_VALIDATION_RULES.url.pattern.test(value)) {
        return { isValid: false, error: FIELD_VALIDATION_RULES.url.message };
      }
      break;

    case 'text':
    case 'textarea':
      if (field.validation?.minLength && value.length < field.validation.minLength) {
        return {
          isValid: false,
          error: `Must be at least ${field.validation.minLength} characters long`,
        };
      }
      if (field.validation?.maxLength && value.length > field.validation.maxLength) {
        return {
          isValid: false,
          error: `Must be no more than ${field.validation.maxLength} characters long`,
        };
      }
      break;

    case 'number': {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { isValid: false, error: 'Must be a valid number' };
      }
      if (field.validation?.min && numValue < field.validation.min) {
        return { isValid: false, error: `Must be at least ${field.validation.min}` };
      }
      if (field.validation?.max && numValue > field.validation.max) {
        return { isValid: false, error: `Must be no more than ${field.validation.max}` };
      }
      break;
    }

    case 'date': {
      const dateValue = new Date(value);
      if (isNaN(dateValue.getTime())) {
        return { isValid: false, error: 'Must be a valid date' };
      }
      break;
    }
  }

  return { isValid: true };
};

/**
 * Validate entire profile
 */
export const validateProfile = (
  profile: Profile
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  // Validate personal info
  Object.entries(profile.personalInfo).forEach(([key, value]) => {
    const validation = validateProfileField(key, value);
    if (!validation.isValid && validation.error) {
      errors[key] = validation.error;
      isValid = false;
    }
  });

  // Validate business owner data
  if (profile.businessOwnerData) {
    Object.entries(profile.businessOwnerData).forEach(([key, value]) => {
      const validation = validateProfileField(key, value);
      if (!validation.isValid && validation.error) {
        errors[`businessOwnerData.${key}`] = validation.error;
        isValid = false;
      }
    });
  }

  // Validate investor data
  if (profile.investorData) {
    Object.entries(profile.investorData).forEach(([key, value]) => {
      const validation = validateProfileField(key, value);
      if (!validation.isValid && validation.error) {
        errors[`investorData.${key}`] = validation.error;
        isValid = false;
      }
    });
  }

  return { isValid, errors };
};

// =============================================================================
// PROFILE STRENGTH CALCULATION
// =============================================================================

/**
 * Calculate profile strength score
 */
export const calculateProfileStrength = (profile: Profile): number => {
  let score = 0;
  const maxScore = 100;

  // Basic information completeness (20 points)
  const basicFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'professionalTitle',
    'company',
    'industry',
    'city',
    'country',
  ];
  const basicCompleted = basicFields.filter(field => {
    const value = profile.personalInfo[field as keyof typeof profile.personalInfo];
    return value && value !== '';
  }).length;
  score += (basicCompleted / basicFields.length) * 20;

  // Bio and professional summary (15 points)
  if (profile.personalInfo.bio && profile.personalInfo.bio.length > 50) {
    score += 10;
  }
  if (
    profile.personalInfo.professionalSummary &&
    profile.personalInfo.professionalSummary.length > 50
  ) {
    score += 5;
  }

  // Profile image (10 points)
  if (profile.personalInfo.avatar || profile.personalInfo.avatarUrl) {
    score += 10;
  }

  // Role-specific information (30 points)
  if (profile.role === 'seller' || profile.role === 'both') {
    if (profile.businessOwnerData) {
      const businessFields = [
        'businessName',
        'businessType',
        'yearsInBusiness',
        'revenueRange',
        'employeeCount',
      ];
      const businessCompleted = businessFields.filter(field => {
        const value = profile.businessOwnerData![field as keyof typeof profile.businessOwnerData];
        return value && value !== '';
      }).length;
      score += (businessCompleted / businessFields.length) * 15;
    }
  }

  if (profile.role === 'buyer' || profile.role === 'both') {
    if (profile.investorData) {
      const investorFields = [
        'investmentCapacityMin',
        'investmentCapacityMax',
        'investmentFocus',
        'investmentExperience',
      ];
      const investorCompleted = investorFields.filter(field => {
        const value = profile.investorData![field as keyof typeof profile.investorData];
        if (typeof value === 'object' && value !== null) {
          return Object.keys(value).length > 0;
        }
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return (
          value !== undefined && value !== null && (typeof value === 'string' ? value !== '' : true)
        );
      }).length;
      score += (investorCompleted / investorFields.length) * 15;
    }
  }

  // Communication preferences (10 points)
  if (profile.sharedData.communication) {
    const commFields = ['preferredContactMethod', 'responseTimeCommitment', 'languagePreferences'];
    const commCompleted = commFields.filter(field => {
      const value =
        profile.sharedData.communication[field as keyof typeof profile.sharedData.communication];
      return value && value !== '';
    }).length;
    score += (commCompleted / commFields.length) * 10;
  }

  // Privacy settings (5 points)
  if (profile.sharedData.privacy) {
    score += 5;
  }

  // Professional network (10 points)
  if (profile.sharedData.professionalNetwork) {
    const networkFields = ['linkedinUrl', 'professionalAssociations'];
    const networkCompleted = networkFields.filter(field => {
      const value =
        profile.sharedData.professionalNetwork[
          field as keyof typeof profile.sharedData.professionalNetwork
        ];
      return value && value !== '';
    }).length;
    score += (networkCompleted / networkFields.length) * 10;
  }

  return Math.min(Math.round(score), maxScore);
};

// =============================================================================
// PROFILE COMPLETION
// =============================================================================

/**
 * Get profile completion percentage
 */
export const getProfileCompletionPercentage = (profile: Profile): number => {
  const role = profile.role;
  const requiredFields = getRequiredFieldsForRole(role);

  let completedFields = 0;
  let totalFields = 0;

  requiredFields.forEach(fieldId => {
    totalFields++;
    const value = getFieldValue(profile, fieldId);
    if (value && value !== '') {
      completedFields++;
    }
  });

  return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
};

/**
 * Get required fields for role
 */
export const getRequiredFieldsForRole = (role: UserRole): string[] => {
  const requiredFields: Record<UserRole, string[]> = {
    buyer: [
      'firstName',
      'lastName',
      'email',
      'industry',
      'country',
      'investmentCapacityMin',
      'investmentCapacityMax',
      'investmentFocus',
    ],
    seller: [
      'firstName',
      'lastName',
      'email',
      'industry',
      'country',
      'businessName',
      'businessType',
      'yearsInBusiness',
    ],
    both: [
      'firstName',
      'lastName',
      'email',
      'industry',
      'country',
      'businessName',
      'businessType',
      'yearsInBusiness',
      'investmentCapacityMin',
      'investmentCapacityMax',
      'investmentFocus',
    ],
    admin: ['firstName', 'lastName', 'email', 'country'],
  };

  return requiredFields[role] || [];
};

/**
 * Get field value from profile
 */
export const getFieldValue = (profile: Profile, fieldId: string): unknown => {
  // Check personal info first
  if (profile.personalInfo[fieldId as keyof typeof profile.personalInfo] !== undefined) {
    return profile.personalInfo[fieldId as keyof typeof profile.personalInfo];
  }

  // Check business owner data
  if (
    profile.businessOwnerData &&
    profile.businessOwnerData[fieldId as keyof typeof profile.businessOwnerData] !== undefined
  ) {
    return profile.businessOwnerData[fieldId as keyof typeof profile.businessOwnerData];
  }

  // Check investor data
  if (
    profile.investorData &&
    profile.investorData[fieldId as keyof typeof profile.investorData] !== undefined
  ) {
    return profile.investorData[fieldId as keyof typeof profile.investorData];
  }

  // Check shared data
  if (profile.sharedData[fieldId as keyof typeof profile.sharedData] !== undefined) {
    return profile.sharedData[fieldId as keyof typeof profile.sharedData];
  }

  return undefined;
};

// =============================================================================
// PROFILE FORMATTING
// =============================================================================

/**
 * Format profile data for display
 */
export const formatProfileData = (profile: Profile): Record<string, unknown> => {
  return {
    ...profile,
    personalInfo: {
      ...profile.personalInfo,
      fullName: `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`,
      displayTitle:
        profile.personalInfo.professionalTitle || profile.personalInfo.company || 'Professional',
    },
    businessOwnerData: profile.businessOwnerData
      ? {
          ...profile.businessOwnerData,
          displayBusinessAge: `${profile.businessOwnerData.yearsInBusiness} years`,
          displayEmployeeCount: `${profile.businessOwnerData.employeeCount} employees`,
        }
      : undefined,
    investorData: profile.investorData
      ? {
          ...profile.investorData,
          displayInvestmentRange: `€${profile.investorData.investmentCapacity.minAmount.toLocaleString()} - €${profile.investorData.investmentCapacity.maxAmount.toLocaleString()}`,
          displayExperience: `${profile.investorData.investmentExperience.yearsActive} years`,
        }
      : undefined,
  };
};

/**
 * Format profile for search
 */
export const formatProfileForSearch = (profile: Profile): Record<string, unknown> => {
  const formatted = formatProfileData(profile);

  return {
    id: profile.id,
    userId: profile.userId,
    role: profile.role,
    fullName: formatted.personalInfo.fullName,
    displayTitle: formatted.personalInfo.displayTitle,
    industry: profile.personalInfo.industry,
    country: profile.personalInfo.country,
    city: profile.personalInfo.city,
    avatar: profile.personalInfo.avatarUrl,
    businessName: profile.businessOwnerData?.businessName,
    investmentRange: formatted.investorData?.displayInvestmentRange,
    experience: formatted.investorData?.displayExperience,
    completion: profile.completion.overallPercentage,
    strength: profile.strength.overallScore,
    verified: false, // Verification system removed from MVP
    lastActiveAt: profile.lastActiveAt,
  };
};

// =============================================================================
// PROFILE UTILITIES
// =============================================================================

/**
 * Get profile display name
 */
export const getProfileDisplayName = (profile: Profile): string => {
  const { firstName, lastName, company, professionalTitle } = profile.personalInfo;

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  if (company) {
    return company;
  }

  if (professionalTitle) {
    return professionalTitle;
  }

  return 'Anonymous User';
};

/**
 * Get profile role display name
 */
export const getProfileRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    buyer: 'Investor',
    seller: 'Business Owner',
    both: 'Business Owner & Investor',
    admin: 'Administrator',
  };

  return roleNames[role] || 'User';
};

/**
 * Get profile industry display name
 */
export const getProfileIndustryDisplayName = (industry: string): string => {
  const industryNames: Record<string, string> = {
    technology: 'Technology',
    manufacturing: 'Manufacturing',
    retail: 'Retail',
    services: 'Services',
    healthcare: 'Healthcare',
    finance: 'Finance',
    'real-estate': 'Real Estate',
    construction: 'Construction',
    'food-beverage': 'Food & Beverage',
    education: 'Education',
    consulting: 'Consulting',
  };

  return industryNames[industry] || industry;
};

/**
 * Get profile location display name
 */
export const getProfileLocationDisplayName = (profile: Profile): string => {
  const { city, country } = profile.personalInfo;

  if (city && country) {
    return `${city}, ${country}`;
  }

  if (country) {
    return country;
  }

  return 'Location not specified';
};

/**
 * Check if profile is public
 */
export const isProfilePublic = (profile: Profile): boolean => {
  return profile.sharedData.privacy.profileVisibility === 'public';
};

/**
 * Check if profile is searchable
 */
export const isProfileSearchable = (profile: Profile): boolean => {
  return profile.sharedData.privacy.searchable;
};

/**
 * Get profile visibility level
 */
export const getProfileVisibilityLevel = (profile: Profile): string => {
  return profile.sharedData.privacy.profileVisibility;
};

// =============================================================================
// PROFILE COMPARISON
// =============================================================================

/**
 * Compare profiles
 */
export const compareProfiles = (profile1: Profile, profile2: Profile): Record<string, unknown> => {
  const comparison = {
    basicInfo: {
      profile1: {
        name: getProfileDisplayName(profile1),
        role: getProfileRoleDisplayName(profile1.role),
        industry: getProfileIndustryDisplayName(profile1.personalInfo.industry || ''),
        location: getProfileLocationDisplayName(profile1),
      },
      profile2: {
        name: getProfileDisplayName(profile2),
        role: getProfileRoleDisplayName(profile2.role),
        industry: getProfileIndustryDisplayName(profile2.personalInfo.industry || ''),
        location: getProfileLocationDisplayName(profile2),
      },
    },
    completion: {
      profile1: profile1.completion.overallPercentage,
      profile2: profile2.completion.overallPercentage,
    },
    strength: {
      profile1: profile1.strength.overallScore,
      profile2: profile2.strength.overallScore,
    },
    verification: {
      profile1: false, // Verification system removed from MVP
      profile2: false, // Verification system removed from MVP
    },
  };

  return comparison;
};
