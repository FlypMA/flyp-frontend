/**
 * 🎯 Role-Based Profile Types
 *
 * Optimized type definitions that emphasize common professional backgrounds
 * while maintaining role-specific differences
 */

import { UserRole } from '@/shared/types';
import { Achievement, Award, Certification, PreviousDeal, PreviousVenture } from './profile.types';

// =============================================================================
// ROLE CONFIGURATION
// =============================================================================

export interface RoleConfig {
  id: UserRole;
  displayName: string;
  description: string;
  icon: string;
  color: string;
  sections: ProfileSectionConfig[];
  commonSections: string[];
}

export interface ProfileSectionConfig {
  id: string;
  title: string;
  description: string;
  required: boolean;
  order: number;
  fields: string[];
  conditional?: {
    field: string;
    value: any;
  };
}

// =============================================================================
// ROLE CONFIGURATIONS
// =============================================================================

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  seller: {
    id: 'seller',
    displayName: 'Business Owner',
    description: 'Selling or planning to sell a business',
    icon: 'Building2',
    color: 'blue',
    commonSections: ['professional-background', 'business-experience', 'achievements', 'network'],
    sections: [
      {
        id: 'business-details',
        title: 'Business Information',
        description: 'Current business details and metrics',
        required: true,
        order: 1,
        fields: ['businessName', 'businessType', 'industry', 'revenueRange', 'employeeCount'],
      },
      {
        id: 'exit-strategy',
        title: 'Exit Strategy',
        description: 'Your exit timeline and preferences',
        required: true,
        order: 2,
        fields: ['exitTimeline', 'reasonForSelling', 'preferredExitType'],
      },
    ],
  },
  buyer: {
    id: 'buyer',
    displayName: 'Investor',
    description: 'Looking to acquire or invest in businesses',
    icon: 'Target',
    color: 'green',
    commonSections: ['professional-background', 'business-experience', 'achievements', 'network'],
    sections: [
      {
        id: 'investment-profile',
        title: 'Investment Profile',
        description: 'Your investment capacity and preferences',
        required: true,
        order: 1,
        fields: ['investmentCapacity', 'investmentFocus', 'dealPreferences'],
      },
      {
        id: 'decision-process',
        title: 'Decision Process',
        description: 'How you evaluate and decide on investments',
        required: true,
        order: 2,
        fields: ['decisionProcess', 'dueDiligenceCapabilities', 'timelineExpectations'],
      },
    ],
  },
  both: {
    id: 'both',
    displayName: 'Business Owner & Investor',
    description: 'Both selling and investing in businesses',
    icon: 'Users',
    color: 'purple',
    commonSections: ['professional-background', 'business-experience', 'achievements', 'network'],
    sections: [
      {
        id: 'business-details',
        title: 'Current Business',
        description: 'Your current business information',
        required: true,
        order: 1,
        fields: ['businessName', 'businessType', 'industry', 'revenueRange'],
      },
      {
        id: 'investment-profile',
        title: 'Investment Profile',
        description: 'Your investment capacity and preferences',
        required: true,
        order: 2,
        fields: ['investmentCapacity', 'investmentFocus', 'dealPreferences'],
      },
      {
        id: 'exit-strategy',
        title: 'Exit Strategy',
        description: 'Your exit timeline and preferences',
        required: false,
        order: 3,
        fields: ['exitTimeline', 'reasonForSelling', 'preferredExitType'],
      },
    ],
  },
  admin: {
    id: 'admin',
    displayName: 'Administrator',
    description: 'Platform administrator',
    icon: 'Shield',
    color: 'gray',
    commonSections: ['professional-background'],
    sections: [],
  },
};

// =============================================================================
// COMMON PROFESSIONAL BACKGROUND
// =============================================================================

export interface CommonProfessionalBackground {
  // Core Professional Identity
  currentRole: string;
  yearsOfExperience: number;
  industryExpertise: string[];
  professionalTitle: string;

  // Business Experience (Common to both roles)
  previousVentures: PreviousVenture[];
  businessExperience: BusinessExperience[];
  keyAchievements: Achievement[];
  professionalCertifications: Certification[];

  // Professional Network & Recognition
  professionalNetwork: string;
  industryAwards: Award[];
  speakingEngagements: SpeakingEngagement[];
  publications: Publication[];

  // Skills & Expertise
  coreSkills: string[];
  industryKnowledge: string[];
  leadershipExperience: LeadershipExperience[];
}

export interface BusinessExperience {
  id: string;
  companyName: string;
  role: string;
  industry: string;
  startDate: string;
  endDate?: string;
  description: string;
  keyResponsibilities: string[];
  achievements: string[];
  companySize?: string;
  revenue?: string;
  exitOutcome?: 'IPO' | 'Acquisition' | 'Merger' | 'Still Active' | 'Closed';
}

export interface SpeakingEngagement {
  id: string;
  eventName: string;
  topic: string;
  date: string;
  audience: string;
  location: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  type: 'Article' | 'Book' | 'Research Paper' | 'Blog Post' | 'Interview';
  publication: string;
  date: string;
  url?: string;
  description?: string;
}

export interface LeadershipExperience {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  teamSize?: number;
  budget?: string;
  achievements: string[];
}

// =============================================================================
// ROLE-SPECIFIC EXTENSIONS
// =============================================================================

export interface BusinessOwnerExtensions {
  // Current Business Focus
  currentBusiness: CurrentBusiness;
  exitStrategy: ExitStrategy;
  businessMetrics: BusinessMetrics;
}

export interface InvestorExtensions {
  // Investment Focus
  investmentProfile: InvestmentProfile;
  dealExperience: DealExperience;
  decisionFramework: DecisionFramework;
}

export interface CurrentBusiness {
  businessName: string;
  businessType: string;
  businessModel: string;
  industry: string;
  yearsInBusiness: number;
  revenueRange: string;
  employeeCount: number;
  growthRate?: number;
  marketPosition: string;
  competitiveAdvantages: string[];
}

export interface ExitStrategy {
  timeframe: 'immediate' | '6-months' | '1-year' | '2-years' | 'flexible';
  urgency: 'low' | 'medium' | 'high';
  reason: string;
  preferredExitType: 'asset' | 'share' | 'both';
  valuationExpectations?: string;
  dealStructure?: string[];
}

export interface BusinessMetrics {
  revenue: {
    current: string;
    growth: number;
    projections: string;
  };
  profitability: {
    margin: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  };
  marketShare?: string;
  customerMetrics?: {
    count: number;
    retention: number;
    acquisition: number;
  };
}

export interface InvestmentProfile {
  capacity: {
    minAmount: number;
    maxAmount: number;
    preferredRange: string;
    availableCapital: number;
  };
  focus: {
    industries: string[];
    businessStages: string[];
    geographicRegions: string[];
    dealSizes: string[];
  };
  preferences: {
    dealStructure: string[];
    ownershipPercentage: { min: number; max: number };
    involvementLevel: 'passive' | 'active' | 'operational';
    exitStrategy: string[];
  };
}

export interface DealExperience {
  totalDeals: number;
  successfulExits: number;
  averageDealSize: number;
  investmentPhilosophy: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  previousDeals: PreviousDeal[];
}

export interface DecisionFramework {
  process: {
    timeline: string;
    keyCriteria: string[];
    decisionMakers: string[];
    approvalProcess: string;
  };
  dueDiligence: {
    capabilities: string[];
    typicalTimeline: string;
    externalAdvisors: string[];
  };
  expectations: {
    initialResponse: string;
    dueDiligencePeriod: string;
    closingTimeline: string;
  };
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type ProfileSection =
  | 'professional-background'
  | 'business-experience'
  | 'achievements'
  | 'network'
  | 'business-details'
  | 'exit-strategy'
  | 'investment-profile'
  | 'decision-process';

export interface RoleBasedProfile {
  role: UserRole;
  commonBackground: CommonProfessionalBackground;
  roleExtensions:
    | BusinessOwnerExtensions
    | InvestorExtensions
    | (BusinessOwnerExtensions & InvestorExtensions);
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getRoleConfig = (role: UserRole): RoleConfig => {
  return ROLE_CONFIGS[role];
};

export const getCommonSections = (role: UserRole): string[] => {
  return ROLE_CONFIGS[role].commonSections;
};

export const getRoleSpecificSections = (role: UserRole): ProfileSectionConfig[] => {
  return ROLE_CONFIGS[role].sections;
};

export const shouldShowSection = (sectionId: string, role: UserRole): boolean => {
  const config = getRoleConfig(role);
  return config.commonSections.includes(sectionId) || config.sections.some(s => s.id === sectionId);
};

export const getSectionOrder = (sectionId: string, role: UserRole): number => {
  const config = getRoleConfig(role);
  const commonIndex = config.commonSections.indexOf(sectionId);
  if (commonIndex !== -1) return commonIndex;

  const specificSection = config.sections.find(s => s.id === sectionId);
  return specificSection?.order || 999;
};
