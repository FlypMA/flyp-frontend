/**
 * 🧪 Mock Profile Service - Development & Testing
 *
 * Mock service for testing the profile feature without backend integration
 */

import { UserRole } from '@/shared/types';
import {
  BusinessOwnerProfile,
  CreateProfileRequest,
  InvestorProfile,
  Profile,
  ProfileListResponse,
  UpdateProfileRequest,
} from '../types/profile.types';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockProfile: Profile = {
  id: 'profile-123',
  userId: 'user-123',
  role: 'both' as UserRole,

  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+31 6 12345678',
    professionalTitle: 'CEO & Founder',
    company: 'Tech Innovations BV',
    industry: 'Technology',
    city: 'Amsterdam',
    country: 'Netherlands',
    timezone: 'Europe/Amsterdam',
    avatar: 'avatar-123',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced entrepreneur with a passion for technology and innovation.',
    professionalSummary:
      'Master of Science in Computer Science from Delft University of Technology (2010). Bachelor of Science in Business Administration from Erasmus University Rotterdam (2008). Certified Project Management Professional (PMP) and AWS Solutions Architect.',
  },

  businessOwnerData: {
    businessName: 'Tech Innovations BV',
    businessType: 'B.V.',
    businessModel: 'SaaS platform for small businesses',
    industry: 'Technology',
    yearsInBusiness: 6,
    yearsInIndustry: 12,
    currentRole: 'CEO & Founder',
    responsibilities: ['Strategic planning', 'Business development', 'Team leadership'],
    previousVentures: [
      {
        id: 'venture-1',
        name: 'Digital Solutions Ltd',
        role: 'Co-founder',
        duration: '2015-2018',
        outcome: 'Acquired by larger company',
        description: 'Built a digital marketing platform for SMEs',
        industry: 'Technology',
      },
    ],
    professionalCertifications: [
      {
        id: 'cert-1',
        name: 'Certified Business Analyst',
        issuer: 'International Business Analysis Institute',
        dateObtained: '2020-01-01',
        credentialId: 'CBA-2020-001',
      },
    ],
    industryExpertise: ['SaaS', 'Digital Marketing', 'Business Development', 'Team Leadership'],
    keyAchievements: [
      {
        id: 'achievement-1',
        title: 'Company Growth',
        description: 'Grew company from 2 to 25 employees in 3 years',
        date: '2021-01-01',
        impact: 'high',
        category: 'business' as const,
      },
    ],
    industryAwards: [
      {
        id: 'award-1',
        name: 'Best Tech Startup 2022',
        issuer: 'Amsterdam Tech Awards',
        date: '2022-01-01',
        category: 'Technology',
      },
    ],
    professionalNetwork: 'Active in Amsterdam startup community, member of TechNL',
    exitTimeline: {
      timeframe: '1-year' as const,
      urgency: 'medium' as const,
      flexibility: 'moderate' as const,
      notes: 'Looking for new challenges and opportunities',
    },
    reasonForSelling: 'Ready to explore new ventures and opportunities',
    preferredExitType: 'share',
    revenueRange: '€1M - €5M',
    employeeCount: 25,
    businessAge: 6,
    growthRate: 35,
  },

  investorData: {
    investmentCapacity: {
      minAmount: 100000,
      maxAmount: 500000,
      preferredRange: '€100K-€500K',
      currency: 'EUR',
      availableCapital: 1000000,
      investmentFrequency: 'ongoing' as const,
    },
    investmentFocus: {
      industries: ['Technology', 'SaaS', 'E-commerce'],
      businessSizes: ['€100K-€500K', '€500K-€1M'],
      businessStages: ['growth', 'expansion'],
      geographicRegions: ['Netherlands', 'Belgium', 'Germany'],
      businessModels: ['SaaS', 'E-commerce'],
      specializations: ['Technology', 'Digital Marketing'],
    },
    dealPreferences: {
      dealSize: '€100K-€500K',
      dealStructure: ['acquisition', 'investment'],
      ownershipPercentage: {
        min: 10,
        max: 100,
      },
      involvementLevel: 'active' as const,
      exitStrategy: ['IPO', 'Strategic Sale'],
      dealTimeline: '6-12 months',
    },
    investmentExperience: {
      yearsActive: 8,
      totalDeals: 5,
      successfulExits: 3,
      averageDealSize: 300000,
      investmentPhilosophy: 'Focus on technology companies with strong growth potential',
      riskTolerance: 'moderate' as const,
    },
    previousDeals: [
      {
        id: 'deal-1',
        companyName: 'Digital Solutions Ltd',
        industry: 'Technology',
        dealSize: 250000,
        role: 'Co-founder',
        outcome: 'successful' as const,
        year: 2018,
        description: 'Co-founded and later sold the company',
      },
    ],
    professionalCredentials: [
      {
        id: 'cred-1',
        type: 'education' as const,
        name: 'MBA from Rotterdam School of Management',
        issuer: 'Rotterdam School of Management',
        dateObtained: '2015-01-01',
      },
      {
        id: 'cred-2',
        type: 'certification' as const,
        name: 'Certified Investment Professional',
        issuer: 'Investment Management Institute',
        dateObtained: '2016-01-01',
      },
    ],
    teamInfo: {
      teamSize: 3,
      keyMembers: [
        {
          name: 'John Doe',
          role: 'Managing Partner',
          expertise: ['Technology', 'Business Development'],
          experience: 10,
        },
      ],
      expertiseAreas: ['Technology', 'Business Development', 'Operations'],
      externalAdvisors: ['Legal Advisor', 'Financial Advisor'],
      decisionMakingProcess:
        'Consensus-based decision making with final approval from managing partner',
    },
    decisionProcess: {
      decisionTimeline: '2-4 weeks',
      decisionMakers: ['Managing Partner', 'Investment Committee'],
      approvalProcess: 'Investment committee approval required for deals over €250K',
      dueDiligenceRequirements: ['Financial analysis', 'Legal review', 'Market research'],
      keyCriteria: ['Growth potential', 'Market size', 'Team quality', 'Financial metrics'],
    },
    dueDiligenceCapabilities: {
      financialAnalysis: true,
      marketAnalysis: true,
      legalReview: true,
      operationalReview: true,
      technicalAssessment: true,
      externalAdvisors: ['Legal Advisor', 'Financial Advisor'],
      typicalTimeline: '30 days',
    },
    timelineExpectations: {
      initialResponse: '48 hours',
      dueDiligencePeriod: '30 days',
      decisionTimeline: '45 days',
      closingTimeline: '60 days',
      flexibility: 'moderate' as const,
    },
    financialCapacity: {
      liquidCapital: 1000000,
      totalAssets: 2000000,
      debtCapacity: 500000,
      fundingPartners: ['Bank of Amsterdam', 'Investment Partners'],
      proofOfFunds: true,
      lastUpdated: '2024-01-01',
    },
    fundingSource: {
      source: 'personal' as const,
      fundName: 'Personal Investment Fund',
      fundSize: 1000000,
      limitedPartners: ['Family Office', 'Investment Partners'],
      investmentCommittee: ['Managing Partner', 'Investment Committee'],
    },
    investmentStructure: {
      preferredStructure: ['equity', 'convertible debt'],
      taxConsiderations: ['Capital gains tax', 'Corporate tax structure'],
      legalStructure: ['LLC', 'Corporation'],
      reportingRequirements: ['Quarterly reports', 'Annual audits'],
    },
  },

  sharedData: {
    communication: {
      preferredContactMethod: 'email',
      responseTimeCommitment: '24-hours',
      availabilitySchedule: {
        timezone: 'Europe/Amsterdam',
        workingHours: {
          start: '09:00',
          end: '17:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        },
        unavailablePeriods: [],
        emergencyContact: true,
      },
      languagePreferences: ['English', 'Dutch'],
      communicationStyle: 'professional',
      meetingPreferences: {
        preferredFormat: ['video', 'in-person'],
        preferredTimes: ['morning', 'afternoon'],
        calendarIntegration: true,
        meetingDuration: '60 minutes',
        preparationRequired: true,
      },
      notificationSettings: {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        listingUpdates: true,
        messageNotifications: true,
        priceAlerts: false,
        weeklyDigest: true,
      },
    },

    professionalNetwork: {
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      professionalAssociations: ['TechNL', 'Amsterdam Startup Community'],
      industryConnections: 150,
      referralNetwork: ['John Smith', 'Jane Doe', 'Bob Johnson'],
      mentorship: {
        offering: true,
        seeking: false,
        areas: ['Technology', 'Business Development'],
      },
    },

    privacy: {
      profileVisibility: 'public' as const,
      showEmail: true,
      showPhone: false,
      showLocation: true,
      allowMessages: true,
      allowInquiries: true,
      dataSharing: true,
      anonymousProfile: false,
      searchable: true,
    },

    platformActivity: {
      memberSince: '2020-03-15T10:30:00Z',
      lastActiveAt: '2024-12-19T14:30:00Z',
      profileViews: 1247,
      messagesSent: 45,
      messagesReceived: 38,
      listingsViewed: 156,
      inquiriesSent: 23,
      inquiriesReceived: 18,
      transactionsCompleted: 3,
      averageResponseTime: 4.5,
      userRating: 4.8,
      reviewCount: 12,
    },
  },

  strength: {
    overallScore: 85,
    factors: {
      completeness: 85,
      verification: 70,
      activity: 90,
      quality: 80,
    },
    level: 'advanced' as const,
    improvements: [
      'Add more certifications',
      'Include industry awards',
      'Expand investment criteria',
    ],
    lastCalculated: '2024-12-19T14:30:00Z',
  },

  createdAt: '2020-03-15T10:30:00Z',
  updatedAt: '2024-12-19T14:30:00Z',
  lastActiveAt: '2024-12-19T14:30:00Z',
};

// =============================================================================
// MOCK PROFILE SERVICE CLASS
// =============================================================================

class MockProfileService {
  private profiles: Map<string, Profile> = new Map();
  private currentProfile: Profile | null = null;

  constructor() {
    // Initialize with mock data
    this.profiles.set('profile-123', mockProfile);
    this.currentProfile = mockProfile;
  }

  /**
   * Get current user's profile
   */
  async getProfile(): Promise<Profile> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!this.currentProfile) {
      throw new Error('Profile not found');
    }

    return { ...this.currentProfile };
  }

  /**
   * Get profile by ID (public profile)
   */
  async getProfileById(profileId: string): Promise<Profile> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const profile = this.profiles.get(profileId);
    if (!profile) {
      throw new Error('Profile not found');
    }

    return { ...profile };
  }

  /**
   * Create new profile
   */
  async createProfile(data: CreateProfileRequest): Promise<Profile> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newProfile: Profile = {
      id: `profile-${Date.now()}`,
      userId: 'user-123', // Mock user ID
      role: data.role,
      personalInfo: data.personalInfo || ({} as any),
      businessOwnerData: data.businessOwnerData || ({} as any),
      investorData: data.investorData || ({} as any),
      sharedData: data.sharedData || ({} as any),
      strength: {
        overallScore: 0,
        factors: {
          completeness: 0,
          verification: 0,
          activity: 0,
          quality: 0,
        },
        level: 'beginner' as const,
        improvements: [],
        lastCalculated: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    this.profiles.set(newProfile.id, newProfile);
    this.currentProfile = newProfile;

    return { ...newProfile };
  }

  /**
   * Update profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<Profile> {
    await new Promise(resolve => setTimeout(resolve, 600));

    if (!this.currentProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile: Profile = {
      ...this.currentProfile,
      personalInfo: { ...this.currentProfile.personalInfo, ...(data.personalInfo || {}) },
      businessOwnerData: data.businessOwnerData
        ? ({
            ...(this.currentProfile.businessOwnerData || {}),
            ...data.businessOwnerData,
          } as BusinessOwnerProfile)
        : this.currentProfile.businessOwnerData,
      investorData: data.investorData
        ? ({ ...(this.currentProfile.investorData || {}), ...data.investorData } as InvestorProfile)
        : this.currentProfile.investorData,
      sharedData: { ...this.currentProfile.sharedData, ...(data.sharedData || {}) },
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    this.profiles.set(updatedProfile.id, updatedProfile);
    this.currentProfile = updatedProfile;

    return { ...updatedProfile };
  }

  /**
   * Update profile section
   */
  async updateProfileSection(section: string, data: Record<string, unknown>): Promise<Profile> {
    await new Promise(resolve => setTimeout(resolve, 400));

    if (!this.currentProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile: Profile = {
      ...this.currentProfile,
      [section]: {
        ...(this.currentProfile[section as keyof Profile] &&
        typeof this.currentProfile[section as keyof Profile] === 'object' &&
        !Array.isArray(this.currentProfile[section as keyof Profile])
          ? (this.currentProfile[section as keyof Profile] as unknown as Record<string, unknown>)
          : {}),
        ...(data && typeof data === 'object' ? (data as Record<string, unknown>) : {}),
      },
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    this.profiles.set(updatedProfile.id, updatedProfile);
    this.currentProfile = updatedProfile;

    return { ...updatedProfile };
  }

  /**
   * Upload profile image
   */
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async uploadProfileImage(_file: File): Promise<{ imageUrl: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate image upload
    const imageUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&t=${Date.now()}`;

    if (this.currentProfile) {
      this.currentProfile.personalInfo.avatarUrl = imageUrl;
      this.currentProfile.updatedAt = new Date().toISOString();
    }

    return { imageUrl };
  }

  /**
   * Delete profile image
   */
  async deleteProfileImage(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (this.currentProfile) {
      this.currentProfile.personalInfo.avatarUrl = undefined;
      this.currentProfile.updatedAt = new Date().toISOString();
    }
  }

  /**
   * Update profile visibility
   */
  async updateProfileVisibility(visibility: string): Promise<Profile> {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!this.currentProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile: Profile = {
      ...this.currentProfile,
      sharedData: {
        ...this.currentProfile.sharedData,
        privacy: {
          ...this.currentProfile.sharedData.privacy,
          profileVisibility: visibility as 'public' | 'private' | 'verified-only',
        },
      },
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    this.profiles.set(updatedProfile.id, updatedProfile);
    this.currentProfile = updatedProfile;

    return { ...updatedProfile };
  }

  /**
   * Update communication preferences
   */
  async updateCommunicationPreferences(preferences: Record<string, unknown>): Promise<Profile> {
    await new Promise(resolve => setTimeout(resolve, 400));

    if (!this.currentProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile: Profile = {
      ...this.currentProfile,
      sharedData: {
        ...this.currentProfile.sharedData,
        communication: {
          ...this.currentProfile.sharedData.communication,
          ...preferences,
        },
      },
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    this.profiles.set(updatedProfile.id, updatedProfile);
    this.currentProfile = updatedProfile;

    return { ...updatedProfile };
  }

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(settings: Record<string, unknown>): Promise<Profile> {
    await new Promise(resolve => setTimeout(resolve, 400));

    if (!this.currentProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile: Profile = {
      ...this.currentProfile,
      sharedData: {
        ...this.currentProfile.sharedData,
        privacy: {
          ...this.currentProfile.sharedData.privacy,
          ...settings,
        },
      },
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    this.profiles.set(updatedProfile.id, updatedProfile);
    this.currentProfile = updatedProfile;

    return { ...updatedProfile };
  }

  /**
   * Search profiles
   */
  async searchProfiles(
    query: string,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    _filters?: Record<string, unknown>
  ): Promise<ProfileListResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const allProfiles = Array.from(this.profiles.values());
    const filteredProfiles = allProfiles.filter(
      profile =>
        profile.personalInfo.firstName.toLowerCase().includes(query.toLowerCase()) ||
        profile.personalInfo.lastName.toLowerCase().includes(query.toLowerCase()) ||
        profile.personalInfo.company?.toLowerCase().includes(query.toLowerCase()) ||
        profile.personalInfo.industry?.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      data: filteredProfiles,
      pagination: {
        page: 1,
        limit: 10,
        total: filteredProfiles.length,
        totalPages: Math.ceil(filteredProfiles.length / 10),
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get profile recommendations
   */
  async getProfileRecommendations(): Promise<Profile[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const allProfiles = Array.from(this.profiles.values());
    return allProfiles.slice(0, 5); // Return first 5 profiles as recommendations
  }

  /**
   * Delete profile
   */
  async deleteProfile(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (this.currentProfile) {
      this.profiles.delete(this.currentProfile.id);
      this.currentProfile = null;
    }
  }

  /**
   * Get profile analytics
   */
  async getProfileAnalytics(): Promise<Record<string, unknown>> {
    await new Promise(resolve => setTimeout(resolve, 400));

    return {
      profileViews: 1247,
      searchAppearances: 89,
      clickThroughRate: 12.5,
      messageResponseRate: 85.2,
      inquiryConversionRate: 23.1,
      transactionSuccessRate: 78.5,
      profileStrengthScore: 4.2,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Export profile data
   */
  async exportProfileData(format: 'json' | 'pdf'): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const data = JSON.stringify(this.currentProfile, null, 2);
    return new Blob([data], { type: format === 'json' ? 'application/json' : 'application/pdf' });
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export const mockProfileService = new MockProfileService();
export default mockProfileService;
