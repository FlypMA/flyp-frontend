/**
 * 📈 useProfileCompletion Hook - Profile Completion Tracking
 *
 * Custom React hook for managing profile completion state and progress
 */

import { useCallback, useEffect, useState } from 'react';
import { PROFILE_TEMPLATES, REQUIRED_FIELDS_BY_ROLE } from '../constants';
import { Profile, ProfileCompletion } from '../types/profile.types';
import { useProfile } from './useProfile';

// =============================================================================
// HOOK INTERFACE
// =============================================================================

interface UseProfileCompletionReturn {
  // Completion Data
  completion: ProfileCompletion | null;
  loading: boolean;
  error: string | null;

  // Completion Operations
  calculateCompletion: (profile: Profile) => ProfileCompletion;
  getCompletionPercentage: () => number;
  getMissingFields: () => string[];
  getRecommendations: () => string[];

  // Section Completion
  getSectionCompletion: (section: string) => number;
  isSectionComplete: (section: string) => boolean;
  getIncompleteSections: () => string[];

  // Field Completion
  isFieldComplete: (fieldId: string) => boolean;
  isFieldRequired: (fieldId: string) => boolean;
  getFieldCompletionStatus: (fieldId: string) => 'complete' | 'incomplete' | 'required';

  // Completion Guidance
  getNextSteps: () => string[];
  getPriorityFields: () => string[];
  getCompletionTips: () => string[];

  // Completion State
  refreshCompletion: () => void;
  isProfileComplete: boolean;
  completionLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// =============================================================================
// USE PROFILE COMPLETION HOOK
// =============================================================================

export const useProfileCompletion = (): UseProfileCompletionReturn => {
  const { profile, loading: profileLoading, error: profileError } = useProfile();

  // State
  const [completion, setCompletion] = useState<ProfileCompletion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =============================================================================
  // COMPLETION CALCULATION
  // =============================================================================

  /**
   * Calculate profile completion
   */
  const calculateCompletion = useCallback((profile: Profile): ProfileCompletion => {
    const role = profile.role;
    const requiredFields = REQUIRED_FIELDS_BY_ROLE[role] || [];
    const template = PROFILE_TEMPLATES[role];

    if (!template) {
      return {
        overallPercentage: 0,
        sections: {
          personalInfo: 0,
          sharedData: 0,
        },
        missingFields: requiredFields,
        recommendations: ['Complete your profile to get started'],
        lastUpdated: new Date().toISOString(),
      };
    }

    // Calculate section completion
    const sectionCompletion: {
      personalInfo: number;
      businessOwnerData?: number;
      investorData?: number;
      sharedData: number;
    } = {
      personalInfo: 0,
      sharedData: 0,
    };
    let totalFields = 0;
    let completedFields = 0;
    const missingFields: string[] = [];
    const recommendations: string[] = [];

    // Personal Info Section
    const personalInfoFields = template.defaultData.personalInfo
      ? Object.keys(template.defaultData.personalInfo)
      : [];
    const personalInfoCompleted = personalInfoFields.filter(field => {
      const value = profile.personalInfo[field as keyof typeof profile.personalInfo];
      return value !== undefined && value !== null && value !== '';
    }).length;
    sectionCompletion.personalInfo =
      personalInfoFields.length > 0 ? (personalInfoCompleted / personalInfoFields.length) * 100 : 0;

    // Business Owner Data Section
    if (profile.businessOwnerData && template.defaultData.businessOwnerData) {
      const businessFields = Object.keys(template.defaultData.businessOwnerData);
      const businessCompleted = businessFields.filter(field => {
        const value = profile.businessOwnerData![field as keyof typeof profile.businessOwnerData];
        return value !== undefined && value !== null && value !== '';
      }).length;
      sectionCompletion.businessOwnerData =
        businessFields.length > 0 ? (businessCompleted / businessFields.length) * 100 : 0;
    }

    // Investor Data Section
    if (profile.investorData && template.defaultData.investorData) {
      const investorFields = Object.keys(template.defaultData.investorData);
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
      sectionCompletion.investorData =
        investorFields.length > 0 ? (investorCompleted / investorFields.length) * 100 : 0;
    }

    // Shared Data Section
    const sharedDataFields = template.defaultData.sharedData
      ? Object.keys(template.defaultData.sharedData)
      : [];
    const sharedDataCompleted = sharedDataFields.filter(field => {
      const value = profile.sharedData[field as keyof typeof profile.sharedData];
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
    sectionCompletion.sharedData =
      sharedDataFields.length > 0 ? (sharedDataCompleted / sharedDataFields.length) * 100 : 0;

    // Calculate overall completion
    const sectionWeights = {
      personalInfo: 0.3,
      businessOwnerData: 0.3,
      investorData: 0.3,
      sharedData: 0.1,
    };

    let weightedSum = 0;
    let totalWeight = 0;

    Object.entries(sectionCompletion).forEach(([section, percentage]) => {
      const weight = sectionWeights[section as keyof typeof sectionWeights] || 0.1;
      weightedSum += percentage * weight;
      totalWeight += weight;
    });

    const overallPercentage = totalWeight > 0 ? weightedSum / totalWeight : 0;

    // Find missing required fields
    requiredFields.forEach(field => {
      const value = getFieldValue(profile, field);
      if (!value || value === '') {
        missingFields.push(field);
      }
    });

    // Generate recommendations
    if (overallPercentage < 25) {
      recommendations.push('Start by completing your basic information');
      recommendations.push('Add your professional title and company');
    } else if (overallPercentage < 50) {
      recommendations.push('Complete your business or investment profile');
      recommendations.push('Add a professional bio');
    } else if (overallPercentage < 75) {
      recommendations.push('Add more detailed information about your experience');
      recommendations.push('Set your communication preferences');
    } else if (overallPercentage < 90) {
      recommendations.push('Add a professional photo');
      recommendations.push('Complete your privacy settings');
    } else {
      recommendations.push('Your profile is almost complete!');
      recommendations.push('Consider adding more detailed information');
    }

    return {
      overallPercentage: Math.round(overallPercentage),
      sections: sectionCompletion,
      missingFields,
      recommendations,
      lastUpdated: new Date().toISOString(),
    };
  }, []);

  /**
   * Get field value from profile
   */
  const getFieldValue = (profile: Profile, fieldId: string): any => {
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
  // COMPLETION OPERATIONS
  // =============================================================================

  /**
   * Get completion percentage
   */
  const getCompletionPercentage = useCallback((): number => {
    return completion?.overallPercentage || 0;
  }, [completion]);

  /**
   * Get missing fields
   */
  const getMissingFields = useCallback((): string[] => {
    return completion?.missingFields || [];
  }, [completion]);

  /**
   * Get recommendations
   */
  const getRecommendations = useCallback((): string[] => {
    return completion?.recommendations || [];
  }, [completion]);

  // =============================================================================
  // SECTION COMPLETION
  // =============================================================================

  /**
   * Get section completion percentage
   */
  const getSectionCompletion = useCallback(
    (section: string): number => {
      return completion?.sections[section as keyof typeof completion.sections] || 0;
    },
    [completion]
  );

  /**
   * Check if section is complete
   */
  const isSectionComplete = useCallback(
    (section: string): boolean => {
      return getSectionCompletion(section) >= 80;
    },
    [getSectionCompletion]
  );

  /**
   * Get incomplete sections
   */
  const getIncompleteSections = useCallback((): string[] => {
    if (!completion) return [];

    return Object.entries(completion.sections)
      .filter(([_, percentage]) => percentage < 80)
      .map(([section, _]) => section);
  }, [completion]);

  // =============================================================================
  // FIELD COMPLETION
  // =============================================================================

  /**
   * Check if field is complete
   */
  const isFieldComplete = useCallback(
    (fieldId: string): boolean => {
      if (!profile) return false;

      const value = getFieldValue(profile, fieldId);
      return value !== undefined && value !== null && value !== '';
    },
    [profile]
  );

  /**
   * Check if field is required
   */
  const isFieldRequired = useCallback(
    (fieldId: string): boolean => {
      if (!profile) return false;

      const requiredFields = REQUIRED_FIELDS_BY_ROLE[profile.role] || [];
      return requiredFields.includes(fieldId);
    },
    [profile]
  );

  /**
   * Get field completion status
   */
  const getFieldCompletionStatus = useCallback(
    (fieldId: string): 'complete' | 'incomplete' | 'required' => {
      if (isFieldRequired(fieldId)) {
        return isFieldComplete(fieldId) ? 'complete' : 'required';
      }
      return isFieldComplete(fieldId) ? 'complete' : 'incomplete';
    },
    [isFieldComplete, isFieldRequired]
  );

  // =============================================================================
  // COMPLETION GUIDANCE
  // =============================================================================

  /**
   * Get next steps
   */
  const getNextSteps = useCallback((): string[] => {
    if (!completion) return [];

    const steps: string[] = [];
    const percentage = completion.overallPercentage;

    if (percentage < 25) {
      steps.push('Complete your basic information');
      steps.push('Add your professional details');
    } else if (percentage < 50) {
      steps.push('Fill in your business or investment profile');
      steps.push('Add a professional bio');
    } else if (percentage < 75) {
      steps.push('Complete your experience details');
      steps.push('Set communication preferences');
    } else if (percentage < 90) {
      steps.push('Add a professional photo');
      steps.push('Review and finalize your profile');
    } else {
      steps.push('Your profile is complete!');
      steps.push('Consider adding more detailed information');
    }

    return steps;
  }, [completion]);

  /**
   * Get priority fields
   */
  const getPriorityFields = useCallback((): string[] => {
    if (!profile) return [];

    const requiredFields = REQUIRED_FIELDS_BY_ROLE[profile.role] || [];
    return requiredFields.filter(field => !isFieldComplete(field));
  }, [profile, isFieldComplete]);

  /**
   * Get completion tips
   */
  const getCompletionTips = useCallback((): string[] => {
    if (!profile) return [];

    const tips: string[] = [];
    const percentage = completion?.overallPercentage || 0;

    if (percentage < 50) {
      tips.push('Complete all required fields first');
      tips.push('Add a professional photo to increase trust');
      tips.push('Write a compelling bio that highlights your expertise');
    } else if (percentage < 80) {
      tips.push('Add detailed information about your experience');
      tips.push('Include specific achievements and accomplishments');
      tips.push('Set clear communication preferences');
    } else {
      tips.push('Review your profile for accuracy and completeness');
      tips.push('Consider adding more detailed information');
      tips.push('Keep your profile updated with recent changes');
    }

    return tips;
  }, [profile, completion]);

  // =============================================================================
  // COMPLETION STATE
  // =============================================================================

  /**
   * Refresh completion data
   */
  const refreshCompletion = useCallback((): void => {
    if (profile) {
      const newCompletion = calculateCompletion(profile);
      setCompletion(newCompletion);
    }
  }, [profile, calculateCompletion]);

  /**
   * Check if profile is complete
   */
  const isProfileComplete = Boolean(completion && completion.overallPercentage >= 80);

  /**
   * Get completion level
   */
  const completionLevel = useCallback((): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
    const percentage = completion?.overallPercentage || 0;

    if (percentage < 25) return 'beginner';
    if (percentage < 50) return 'intermediate';
    if (percentage < 80) return 'advanced';
    return 'expert';
  }, [completion]);

  // =============================================================================
  // EFFECTS
  // =============================================================================

  /**
   * Calculate completion when profile changes
   */
  useEffect(() => {
    if (profile) {
      const newCompletion = calculateCompletion(profile);
      setCompletion(newCompletion);
    } else {
      setCompletion(null);
    }
  }, [profile, calculateCompletion]);

  /**
   * Update loading and error states
   */
  useEffect(() => {
    setLoading(profileLoading);
    setError(profileError);
  }, [profileLoading, profileError]);

  // =============================================================================
  // RETURN HOOK INTERFACE
  // =============================================================================

  return {
    // Completion Data
    completion,
    loading,
    error,

    // Completion Operations
    calculateCompletion,
    getCompletionPercentage,
    getMissingFields,
    getRecommendations,

    // Section Completion
    getSectionCompletion,
    isSectionComplete,
    getIncompleteSections,

    // Field Completion
    isFieldComplete,
    isFieldRequired,
    getFieldCompletionStatus,

    // Completion Guidance
    getNextSteps,
    getPriorityFields,
    getCompletionTips,

    // Completion State
    refreshCompletion,
    isProfileComplete,
    completionLevel: completionLevel(),
  };
};
