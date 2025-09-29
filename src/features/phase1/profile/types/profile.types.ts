/**
 * 👤 Profile Types - TypeScript Definitions
 *
 * Comprehensive type definitions for the user profile system
 */

import { UserRole } from '@/shared/types';
import { CommonProfessionalBackground } from './roleBased.types';

// Re-export UserRole for convenience
export type { UserRole };

// =============================================================================
// CORE PROFILE TYPES
// =============================================================================

export interface Profile {
  id: string;
  userId: string;
  role: UserRole;

  // Basic Information
  personalInfo: PersonalInfo;

  // Common Professional Background (Shared between roles)
  commonBackground?: CommonProfessionalBackground;

  // Role-Specific Data
  businessOwnerData?: BusinessOwnerProfile;
  investorData?: InvestorProfile;

  // Shared Data
  sharedData: SharedProfileData;

  // Profile Management
  strength: ProfileStrength;

  // Metadata
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
}

export interface PersonalInfo {
  // Basic Identity
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  // Professional Identity
  professionalTitle?: string;
  company?: string;
  industry?: string;

  // Location
  city?: string;
  country: string;
  timezone: string;

  // Profile Image
  avatar?: string;
  avatarUrl?: string;

  // Bio
  bio?: string;
  professionalSummary?: string;
}

// =============================================================================
// BUSINESS OWNER PROFILE
// =============================================================================

export interface BusinessOwnerProfile {
  // Business Context
  businessName: string;
  businessType: string;
  businessModel?: string;
  industry: string;
  yearsInBusiness: number;
  yearsInIndustry: number;

  // Professional Background
  currentRole: string;
  responsibilities: string[];
  previousVentures: PreviousVenture[];
  professionalCertifications: Certification[];
  industryExpertise: string[];

  // Business Achievements
  keyAchievements: Achievement[];
  industryAwards: Award[];
  professionalNetwork: string;

  // Exit Strategy
  exitTimeline: ExitTimeline;
  reasonForSelling: string;
  preferredExitType: 'asset' | 'share' | 'both';

  // Business Metrics
  revenueRange: string;
  employeeCount: number;
  businessAge: number;
  growthRate?: number;
}

export interface PreviousVenture {
  id: string;
  name: string;
  role: string;
  industry: string;
  duration: string;
  outcome: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateObtained: string;
  expirationDate?: string;
  credentialId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: string;
  category: 'business' | 'financial' | 'operational' | 'innovation';
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: string;
  description?: string;
}

export interface ExitTimeline {
  timeframe: 'immediate' | '6-months' | '1-year' | '2-years' | 'flexible';
  urgency: 'low' | 'medium' | 'high';
  flexibility: 'strict' | 'moderate' | 'flexible';
  notes?: string;
}

// =============================================================================
// INVESTOR PROFILE
// =============================================================================

export interface InvestorProfile {
  // Investment Profile
  investmentCapacity: InvestmentCapacity;
  investmentFocus: InvestmentFocus;
  dealPreferences: DealPreferences;

  // Professional Background
  investmentExperience: InvestmentExperience;
  previousDeals: PreviousDeal[];
  professionalCredentials: Credential[];
  teamInfo: TeamInfo;

  // Decision Process
  decisionProcess: DecisionProcess;
  dueDiligenceCapabilities: DueDiligenceCapabilities;
  timelineExpectations: TimelineExpectations;

  // Financial Information
  financialCapacity: FinancialCapacity;
  fundingSource: FundingSource;
  investmentStructure: InvestmentStructure;
}

export interface InvestmentCapacity {
  minAmount: number;
  maxAmount: number;
  preferredRange: string;
  currency: string;
  availableCapital: number;
  investmentFrequency: 'one-time' | 'ongoing' | 'fund-based';
}

export interface InvestmentFocus {
  industries: string[];
  businessSizes: string[];
  businessStages: string[];
  geographicRegions: string[];
  businessModels: string[];
  specializations: string[];
}

export interface DealPreferences {
  dealSize: string;
  dealStructure: string[];
  ownershipPercentage: {
    min: number;
    max: number;
  };
  involvementLevel: 'passive' | 'active' | 'operational';
  exitStrategy: string[];
  dealTimeline: string;
}

export interface InvestmentExperience {
  yearsActive: number;
  totalDeals: number;
  successfulExits: number;
  averageDealSize: number;
  investmentPhilosophy: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface PreviousDeal {
  id: string;
  companyName: string;
  industry: string;
  dealSize: number;
  role: string;
  outcome: 'successful' | 'ongoing' | 'unsuccessful';
  year: number;
  description?: string;
}

export interface Credential {
  id: string;
  type: 'education' | 'certification' | 'license' | 'membership';
  name: string;
  issuer: string;
  dateObtained: string;
  credentialId?: string;
}

export interface TeamInfo {
  teamSize: number;
  keyMembers: TeamMember[];
  expertiseAreas: string[];
  externalAdvisors: string[];
  decisionMakingProcess: string;
}

export interface TeamMember {
  name: string;
  role: string;
  expertise: string[];
  experience: number;
}

export interface DecisionProcess {
  decisionTimeline: string;
  decisionMakers: string[];
  approvalProcess: string;
  dueDiligenceRequirements: string[];
  keyCriteria: string[];
}

export interface DueDiligenceCapabilities {
  financialAnalysis: boolean;
  legalReview: boolean;
  marketAnalysis: boolean;
  operationalReview: boolean;
  technicalAssessment: boolean;
  externalAdvisors: string[];
  typicalTimeline: string;
}

export interface TimelineExpectations {
  initialResponse: string;
  dueDiligencePeriod: string;
  decisionTimeline: string;
  closingTimeline: string;
  flexibility: 'strict' | 'moderate' | 'flexible';
}

export interface FinancialCapacity {
  liquidCapital: number;
  totalAssets: number;
  debtCapacity: number;
  fundingPartners: string[];
  proofOfFunds: boolean;
  lastUpdated: string;
}

export interface FundingSource {
  source: 'personal' | 'fund' | 'syndicate' | 'institutional' | 'mixed';
  fundName?: string;
  fundSize?: number;
  limitedPartners?: string[];
  investmentCommittee?: string[];
}

export interface InvestmentStructure {
  preferredStructure: string[];
  taxConsiderations: string[];
  legalStructure: string[];
  reportingRequirements: string[];
}

// =============================================================================
// SHARED PROFILE DATA
// =============================================================================

export interface SharedProfileData {
  // Communication Preferences
  communication: CommunicationPreferences;

  // Professional Network
  professionalNetwork: ProfessionalNetwork;

  // Platform Activity
  platformActivity: PlatformActivity;

  // Privacy Settings
  privacy: PrivacySettings;
}

export interface CommunicationPreferences {
  preferredContactMethod: 'email' | 'phone' | 'platform' | 'any';
  responseTimeCommitment: string;
  availabilitySchedule: AvailabilitySchedule;
  languagePreferences: string[];
  communicationStyle: 'formal' | 'casual' | 'professional';
  meetingPreferences: MeetingPreferences;
  notificationSettings: NotificationSettings;
}

export interface AvailabilitySchedule {
  timezone: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  unavailablePeriods: UnavailablePeriod[];
  emergencyContact: boolean;
}

export interface UnavailablePeriod {
  startDate: string;
  endDate: string;
  reason: string;
  alternativeContact?: string;
}

export interface MeetingPreferences {
  preferredFormat: ('video' | 'phone' | 'in-person')[];
  preferredTimes: string[];
  calendarIntegration: boolean;
  meetingDuration: string;
  preparationRequired: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  listingUpdates: boolean;
  messageNotifications: boolean;
  priceAlerts: boolean;
  weeklyDigest: boolean;
}

export interface ProfessionalNetwork {
  linkedinUrl?: string;
  professionalAssociations: string[];
  industryConnections: number;
  referralNetwork: string[];
  mentorship: {
    offering: boolean;
    seeking: boolean;
    areas: string[];
  };
}

export interface PlatformActivity {
  memberSince: string;
  lastActiveAt: string;
  profileViews: number;
  messagesSent: number;
  messagesReceived: number;
  listingsViewed: number;
  inquiriesSent: number;
  inquiriesReceived: number;
  transactionsCompleted: number;
  averageResponseTime: number;
  userRating: number;
  reviewCount: number;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'verified-only';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  allowMessages: boolean;
  allowInquiries: boolean;
  dataSharing: boolean;
  anonymousProfile: boolean;
  searchable: boolean;
}

// =============================================================================
// PROFILE MANAGEMENT TYPES
// =============================================================================


export interface ProfileStrength {
  overallScore: number; // 0-100
  factors: {
    completeness: number;
    verification: number;
    activity: number;
    quality: number;
  };
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  improvements: string[];
  lastCalculated: string;
}

export interface ProfileSection {
  id: string;
  title: string;
  description: string;
  fields: ProfileField[];
  required: boolean;
  order: number;
  roleSpecific?: UserRole[];
}

export interface ProfileField {
  id: string;
  name: string;
  type:
    | 'text'
    | 'email'
    | 'phone'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'date'
    | 'number'
    | 'file'
    | 'url';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: FieldValidation;
  options?: FieldOption[];
  helpText?: string;
  order: number;
  roleSpecific?: UserRole[];
  privacyLevel: 'public' | 'private' | 'verified-only';
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  required?: boolean;
  custom?: string;
}

export interface FieldOption {
  value: string;
  label: string;
  description?: string;
}

// =============================================================================
// API TYPES
// =============================================================================

export interface CreateProfileRequest {
  role: UserRole;
  personalInfo: Partial<PersonalInfo>;
  businessOwnerData?: Partial<BusinessOwnerProfile>;
  investorData?: Partial<InvestorProfile>;
  sharedData?: Partial<SharedProfileData>;
}

export interface UpdateProfileRequest {
  personalInfo?: Partial<PersonalInfo>;
  businessOwnerData?: Partial<BusinessOwnerProfile>;
  investorData?: Partial<InvestorProfile>;
  sharedData?: Partial<SharedProfileData>;
}

export interface ProfileResponse {
  success: boolean;
  data: Profile;
  message?: string;
  timestamp: string;
}

export interface ProfileListResponse {
  success: boolean;
  data: Profile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  timestamp: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type ProfileRole = 'business-owner' | 'investor' | 'both';

export type ProfileStatus = 'draft' | 'incomplete' | 'complete' | 'verified';

export type ProfileVisibility = 'public' | 'private' | 'verified-only';

export type VerificationLevel = 'none' | 'basic' | 'verified' | 'premium';

export interface ProfileStats {
  totalProfiles: number;
  completedProfiles: number;
  verifiedProfiles: number;
  averageCompletion: number;
  averageStrength: number;
}
