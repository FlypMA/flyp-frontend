/**
 * 💪 Profile Strength Calculation
 *
 * Utilities for calculating and managing profile strength scores
 */

import { Profile } from '../types/profile.types';

// =============================================================================
// STRENGTH CALCULATION TYPES
// =============================================================================

export interface StrengthFactors {
  completeness: number;
  verification: number;
  activity: number;
  quality: number;
}

export interface StrengthLevel {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  score: number;
  color: string;
  description: string;
  benefits: string[];
}

// =============================================================================
// STRENGTH CALCULATION
// =============================================================================

/**
 * Calculate profile strength score
 */
export const calculateProfileStrength = (profile: Profile): StrengthFactors => {
  const factors: StrengthFactors = {
    completeness: calculateCompletenessScore(profile),
    verification: calculateVerificationScore(profile),
    activity: calculateActivityScore(profile),
    quality: calculateQualityScore(profile),
  };

  return factors;
};

/**
 * Calculate overall strength score
 */
export const calculateOverallStrength = (factors: StrengthFactors): number => {
  const weights = {
    completeness: 0.4,
    verification: 0.3,
    activity: 0.2,
    quality: 0.1,
  };

  const weightedSum =
    factors.completeness * weights.completeness +
    factors.verification * weights.verification +
    factors.activity * weights.activity +
    factors.quality * weights.quality;

  return Math.round(weightedSum);
};

/**
 * Calculate completeness score
 */
export const calculateCompletenessScore = (profile: Profile): number => {
  const role = profile.role;
  let score = 0;
  const maxScore = 100;

  // Basic information (30 points)
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
  score += (basicCompleted / basicFields.length) * 30;

  // Bio and professional summary (20 points)
  if (profile.personalInfo.bio && profile.personalInfo.bio.length > 50) {
    score += 15;
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

  // Role-specific information (40 points)
  if (role === 'seller' || role === 'both') {
    if (profile.businessOwnerData) {
      const businessFields = [
        'businessName',
        'businessType',
        'yearsInBusiness',
        'revenueRange',
        'employeeCount',
        'exitTimeline',
      ];
      const businessCompleted = businessFields.filter(field => {
        const value = profile.businessOwnerData![field as keyof typeof profile.businessOwnerData];
        return value && value !== '';
      }).length;
      score += (businessCompleted / businessFields.length) * 20;
    }
  }

  if (role === 'buyer' || role === 'both') {
    if (profile.investorData) {
      const investorFields = [
        'investmentCapacityMin',
        'investmentCapacityMax',
        'investmentFocus',
        'investmentExperience',
        'totalDeals',
        'decisionTimeline',
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
      score += (investorCompleted / investorFields.length) * 20;
    }
  }

  return Math.min(Math.round(score), maxScore);
};

/**
 * Calculate verification score
 */
export const calculateVerificationScore = (profile: Profile): number => {
  let score = 0;
  const maxScore = 100;

  // Verification system removed from MVP - no points awarded

  return Math.min(Math.round(score), maxScore);
};

/**
 * Calculate activity score
 */
export const calculateActivityScore = (profile: Profile): number => {
  let score = 0;
  const maxScore = 100;

  const activity = profile.sharedData.platformActivity;

  // Profile views (20 points)
  if (activity.profileViews > 100) {
    score += 20;
  } else if (activity.profileViews > 50) {
    score += 15;
  } else if (activity.profileViews > 20) {
    score += 10;
  } else if (activity.profileViews > 0) {
    score += 5;
  }

  // Messages sent (20 points)
  if (activity.messagesSent > 50) {
    score += 20;
  } else if (activity.messagesSent > 20) {
    score += 15;
  } else if (activity.messagesSent > 10) {
    score += 10;
  } else if (activity.messagesSent > 0) {
    score += 5;
  }

  // Inquiries sent (20 points)
  if (activity.inquiriesSent > 20) {
    score += 20;
  } else if (activity.inquiriesSent > 10) {
    score += 15;
  } else if (activity.inquiriesSent > 5) {
    score += 10;
  } else if (activity.inquiriesSent > 0) {
    score += 5;
  }

  // Transactions completed (20 points)
  if (activity.transactionsCompleted > 5) {
    score += 20;
  } else if (activity.transactionsCompleted > 2) {
    score += 15;
  } else if (activity.transactionsCompleted > 0) {
    score += 10;
  }

  // Response rate (20 points)
  if (activity.averageResponseTime < 2) {
    score += 20;
  } else if (activity.averageResponseTime < 24) {
    score += 15;
  } else if (activity.averageResponseTime < 72) {
    score += 10;
  } else if (activity.averageResponseTime > 0) {
    score += 5;
  }

  return Math.min(Math.round(score), maxScore);
};

/**
 * Calculate quality score
 */
export const calculateQualityScore = (profile: Profile): number => {
  let score = 0;
  const maxScore = 100;

  // Bio quality (25 points)
  if (profile.personalInfo.bio) {
    const bioLength = profile.personalInfo.bio.length;
    if (bioLength > 200) {
      score += 25;
    } else if (bioLength > 100) {
      score += 20;
    } else if (bioLength > 50) {
      score += 15;
    } else {
      score += 10;
    }
  }

  // Professional summary quality (20 points)
  if (profile.personalInfo.professionalSummary) {
    const summaryLength = profile.personalInfo.professionalSummary.length;
    if (summaryLength > 150) {
      score += 20;
    } else if (summaryLength > 100) {
      score += 15;
    } else if (summaryLength > 50) {
      score += 10;
    } else {
      score += 5;
    }
  }

  // User rating (25 points)
  const rating = profile.sharedData.platformActivity.userRating;
  if (rating >= 4.5) {
    score += 25;
  } else if (rating >= 4.0) {
    score += 20;
  } else if (rating >= 3.5) {
    score += 15;
  } else if (rating >= 3.0) {
    score += 10;
  } else if (rating > 0) {
    score += 5;
  }

  // Review count (15 points)
  const reviewCount = profile.sharedData.platformActivity.reviewCount;
  if (reviewCount > 20) {
    score += 15;
  } else if (reviewCount > 10) {
    score += 12;
  } else if (reviewCount > 5) {
    score += 8;
  } else if (reviewCount > 0) {
    score += 5;
  }

  // Professional network (15 points)
  if (profile.sharedData.professionalNetwork.linkedinUrl) {
    score += 10;
  }
  if (profile.sharedData.professionalNetwork.professionalAssociations.length > 0) {
    score += 5;
  }

  return Math.min(Math.round(score), maxScore);
};

// =============================================================================
// STRENGTH LEVELS
// =============================================================================

/**
 * Get strength level based on score
 */
export const getStrengthLevel = (score: number): StrengthLevel => {
  if (score >= 90) {
    return {
      level: 'expert',
      score,
      color: '#10B981', // green
      description: 'Expert Profile',
      benefits: [
        'Maximum visibility in searches',
        'Priority in recommendations',
        'Access to premium features',
        'Expert verification badge',
      ],
    };
  } else if (score >= 75) {
    return {
      level: 'advanced',
      score,
      color: '#3B82F6', // blue
      description: 'Advanced Profile',
      benefits: [
        'High visibility in searches',
        'Enhanced credibility',
        'Access to advanced features',
        'Advanced verification badge',
      ],
    };
  } else if (score >= 50) {
    return {
      level: 'intermediate',
      score,
      color: '#F59E0B', // amber
      description: 'Intermediate Profile',
      benefits: [
        'Good visibility in searches',
        'Standard credibility',
        'Access to standard features',
        'Intermediate verification badge',
      ],
    };
  } else {
    return {
      level: 'beginner',
      score,
      color: '#EF4444', // red
      description: 'Beginner Profile',
      benefits: [
        'Basic visibility in searches',
        'Limited credibility',
        'Access to basic features',
        'Beginner verification badge',
      ],
    };
  }
};

/**
 * Get strength level for profile
 */
export const getProfileStrengthLevel = (profile: Profile): StrengthLevel => {
  const factors = calculateProfileStrength(profile);
  const overallScore = calculateOverallStrength(factors);
  return getStrengthLevel(overallScore);
};

// =============================================================================
// STRENGTH IMPROVEMENTS
// =============================================================================

/**
 * Get strength improvement recommendations
 */
export const getStrengthImprovements = (profile: Profile): string[] => {
  const factors = calculateProfileStrength(profile);
  const improvements: string[] = [];

  // Completeness improvements
  if (factors.completeness < 70) {
    improvements.push('Complete your profile information');
    improvements.push('Add a professional photo');
    improvements.push('Write a detailed bio');
  }

  // Verification improvements
  if (factors.verification < 50) {
    improvements.push('Verify your email address');
    improvements.push('Verify your phone number');
    improvements.push('Complete identity verification');
  }

  // Activity improvements
  if (factors.activity < 50) {
    improvements.push('Increase your platform activity');
    improvements.push('Respond to messages quickly');
    improvements.push('Send more inquiries');
  }

  // Quality improvements
  if (factors.quality < 70) {
    improvements.push('Improve your bio quality');
    improvements.push('Add more professional details');
    improvements.push('Build your professional network');
  }

  return improvements;
};

/**
 * Get specific field improvements
 */
export const getFieldImprovements = (profile: Profile): Record<string, string[]> => {
  const improvements: Record<string, string[]> = {};

  // Personal info improvements
  if (!profile.personalInfo.avatar && !profile.personalInfo.avatarUrl) {
    improvements.personalInfo = [...(improvements.personalInfo || []), 'Add a professional photo'];
  }
  if (!profile.personalInfo.bio || profile.personalInfo.bio.length < 50) {
    improvements.personalInfo = [...(improvements.personalInfo || []), 'Write a detailed bio'];
  }
  if (!profile.personalInfo.professionalTitle) {
    improvements.personalInfo = [
      ...(improvements.personalInfo || []),
      'Add your professional title',
    ];
  }

  // Business owner improvements
  if (profile.role === 'seller' || profile.role === 'both') {
    if (profile.businessOwnerData) {
      if (!profile.businessOwnerData.revenueRange) {
        improvements.businessOwnerData = [
          ...(improvements.businessOwnerData || []),
          'Add revenue range',
        ];
      }
      if (!profile.businessOwnerData.exitTimeline) {
        improvements.businessOwnerData = [
          ...(improvements.businessOwnerData || []),
          'Set exit timeline',
        ];
      }
      if (!profile.businessOwnerData.reasonForSelling) {
        improvements.businessOwnerData = [
          ...(improvements.businessOwnerData || []),
          'Explain reason for selling',
        ];
      }
    }
  }

  // Investor improvements
  if (profile.role === 'buyer' || profile.role === 'both') {
    if (profile.investorData) {
      if (!profile.investorData.investmentExperience) {
        improvements.investorData = [
          ...(improvements.investorData || []),
          'Add investment experience',
        ];
      }
      if (!profile.investorData.investmentExperience?.totalDeals) {
        improvements.investorData = [
          ...(improvements.investorData || []),
          'Add total deals completed',
        ];
      }
      if (!profile.investorData.decisionProcess?.decisionTimeline) {
        improvements.investorData = [...(improvements.investorData || []), 'Set decision timeline'];
      }
    }
  }

  return improvements;
};

// =============================================================================
// STRENGTH COMPARISON
// =============================================================================

/**
 * Compare profile strength with others
 */
export const compareProfileStrength = (profile: Profile, comparisonProfiles: Profile[]): any => {
  const profileStrength = calculateOverallStrength(calculateProfileStrength(profile));
  const comparisonStrengths = comparisonProfiles.map(p =>
    calculateOverallStrength(calculateProfileStrength(p))
  );

  const averageStrength =
    comparisonStrengths.reduce((sum, strength) => sum + strength, 0) / comparisonStrengths.length;
  const percentile =
    (comparisonStrengths.filter(s => s < profileStrength).length / comparisonStrengths.length) *
    100;

  return {
    profileStrength,
    averageStrength: Math.round(averageStrength),
    percentile: Math.round(percentile),
    comparison: {
      aboveAverage: profileStrength > averageStrength,
      percentile: Math.round(percentile),
      rank: comparisonStrengths.filter(s => s < profileStrength).length + 1,
      total: comparisonStrengths.length,
    },
  };
};

// =============================================================================
// STRENGTH TRACKING
// =============================================================================

/**
 * Track strength changes over time
 */
export const trackStrengthChanges = (currentProfile: Profile, previousProfile: Profile): any => {
  const currentStrength = calculateOverallStrength(calculateProfileStrength(currentProfile));
  const previousStrength = calculateOverallStrength(calculateProfileStrength(previousProfile));

  const change = currentStrength - previousStrength;
  const changePercentage = previousStrength > 0 ? (change / previousStrength) * 100 : 0;

  return {
    current: currentStrength,
    previous: previousStrength,
    change,
    changePercentage: Math.round(changePercentage),
    trend: change > 0 ? 'improving' : change < 0 ? 'declining' : 'stable',
  };
};
