/**
 * 👤 User Profile Feature - Production Exports
 *
 * Clean, production-ready exports for the profile feature module
 * Streamlined for trust-building personal profiles
 */

// Main Profile Components
export { default as ProfilePage } from './components/ProfilePageWrapper';
export { default as UnifiedProfilePage } from './components/UnifiedProfilePage';

// Core Profile Components
export { default as CommunicationPreferences } from './components/CommunicationPreferences';
export { default as ProfessionalBackgroundModal } from './components/ProfessionalBackgroundModal';
export { default as ProfileEditFullscreenModal } from './components/ProfileEditFullscreenModal';
export { default as ProfileImageUpload } from './components/ProfileImageUpload';


// Hooks
export { useLinkedIn } from './hooks/useLinkedIn';
export { useProfile } from './hooks/useProfile';

// Services
export { linkedinService } from './services/linkedinService';
export { profileService } from './services/profileService';

// Types
export type {
    Profile,
    ProfileField,
    ProfileSection,
    SharedProfileData,
    UserRole
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
    SpeakingEngagement
} from './types/roleBased.types';

// Utils
export {
    calculateProfileStrength,
    formatProfileData,
    validateProfileField
} from './utils/profileHelpers';

// Constants
export { PROFILE_FIELDS, PROFILE_TEMPLATES } from './constants';
