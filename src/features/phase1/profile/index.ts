/**
 * 👤 User Profile Feature - Production Exports
 *
 * Clean, production-ready exports for the profile feature module
 * All development/test components have been removed
 */

// Main Profile Component
export { default as ProfilePage } from './components/ProfilePageWrapper';

// Core Profile Components
export { default as CommunicationPreferences } from './components/CommunicationPreferences';
export { default as ProfileCompletion } from './components/ProfileCompletion';
export { default as ProfileEditModal } from './components/ProfileEditModal';
export { default as ProfileHeader } from './components/ProfileHeader';
export { default as ProfileImageUpload } from './components/ProfileImageUpload';

// Profile Section Components
export { default as BusinessOwnerProfile } from './components/ProfileSections/BusinessOwnerProfile';
export { default as InvestorProfile } from './components/ProfileSections/InvestorProfile';
export { default as ProfessionalBackground } from './components/ProfileSections/ProfessionalBackground';
export { default as SharedProfile } from './components/ProfileSections/SharedProfile';

// Timeline Components
export { default as AddTimelineEvent } from './components/AddTimelineEvent';
export { default as BusinessTimeline } from './components/BusinessTimeline';
export { default as TimelineFilters } from './components/TimelineFilters';

// Hooks
export { useLinkedIn } from './hooks/useLinkedIn';
export { useProfile } from './hooks/useProfile';
export { useProfileCompletion } from './hooks/useProfileCompletion';
export { useTimeline } from './hooks/useTimeline';

// Services
export { linkedinService } from './services/linkedinService';
export { profileService } from './services/profileService';
export { timelineService } from './services/timelineService';

// Types
export type {
  Profile,
  ProfileField,
  ProfileSection,
  SharedProfileData,
  UserRole,
} from './types/profile.types';

export type {
  BusinessExperience,
  BusinessOwnerExtensions,
  CommonProfessionalBackground,
  InvestorExtensions,
  LeadershipExperience,
  ProfileSectionConfig,
  Publication,
  RoleBasedProfile,
  RoleConfig,
  SpeakingEngagement,
} from './types/roleBased.types';

export type {
  BusinessTimelineEvent,
  BusinessTimelineEventStatus,
  BusinessTimelineEventType,
  BusinessTimelineFilters,
  BusinessTimelineResponse,
  BusinessTimelineStats,
  CreateTimelineEventRequest,
  EventTypeConfig,
  TimelineDisplayConfig,
  UpdateTimelineEventRequest,
} from './types/timeline.types';

// Utils
export {
  calculateProfileStrength,
  formatProfileData,
  getProfileCompletionPercentage,
  validateProfileField,
} from './utils/profileHelpers';

// Constants
export { PROFILE_FIELDS, PROFILE_TEMPLATES } from './constants';
