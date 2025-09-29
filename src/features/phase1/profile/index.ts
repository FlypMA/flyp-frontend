/**
 * 👤 User Profile Feature - Production Exports
 *
 * Clean, production-ready exports for the profile feature module.
 * This module provides a comprehensive role-based profile system for business owners and investors.
 *
 * @version 1.0.0
 * @author Frontend Team
 * @since December 2024
 *
 * ## Architecture Overview
 *
 * The profile feature supports two main UI patterns:
 * 1. **Profile Card Architecture**: Clean, card-based interface for public profile display
 * 2. **Split Layout Architecture**: Enterprise-grade split layout for comprehensive profile management
 *
 * ## Key Features
 * - Role-based profiles (business owner, investor, both)
 * - Professional presentation with business timeline
 * - LinkedIn integration for data import
 * - Smart validation and error handling
 * - Mobile-optimized responsive design
 * - Profile strength calculation and recommendations
 *
 * ## Usage Examples
 *
 * ```tsx
 * // Basic profile page
 * import { UnifiedProfilePage } from '@/features/phase1/profile';
 *
 * // Profile settings with split layout
 * import { ProfileSettingsPage } from '@/features/phase1/profile';
 *
 * // Individual settings pages
 * import { PreferencesPage, SecurityPage } from '@/features/phase1/profile';
 *
 * // Profile management hook
 * import { useProfile } from '@/features/phase1/profile';
 * ```
 */

// =============================================================================
// MAIN PROFILE COMPONENTS (Public API)
// =============================================================================

/**
 * Main profile page component - unified entry point for profile display
 * Renders a clean, card-based profile interface with role-based content
 */
export { default as UnifiedProfilePage } from './components/UnifiedProfilePage';

/**
 * Profile page wrapper - handles data fetching and loading states
 * Used internally by UnifiedProfilePage
 */
export { default as ProfilePageWrapper } from './components/ProfilePageWrapper';

// =============================================================================
// PROFILE SETTINGS COMPONENTS (Settings Management)
// =============================================================================

/**
 * Main profile settings page with split layout architecture
 * Provides comprehensive profile management interface
 */
export { default as ProfileSettingsPage } from './pages/ProfileSettingsPage';

/**
 * User preferences management page
 * Handles communication preferences and notification settings
 */
export { default as PreferencesPage } from './pages/PreferencesPage';

/**
 * Security settings page
 * Manages privacy settings, password, and security preferences
 */
export { default as SecurityPage } from './pages/SecurityPage';

// =============================================================================
// PROFILE MANAGEMENT HOOKS
// =============================================================================

/**
 * Primary profile management hook
 * Provides complete CRUD operations, state management, and profile utilities
 *
 * @example
 * ```tsx
 * const { profile, loading, updateProfile, refreshProfile } = useProfile();
 * ```
 */
export { useProfile } from './hooks/useProfile';

/**
 * LinkedIn integration hook
 * Handles LinkedIn profile import and connection management
 *
 * @example
 * ```tsx
 * const { connectLinkedIn, importProfile, isConnected } = useLinkedIn();
 * ```
 */
export { useLinkedIn } from './hooks/useLinkedIn';

// =============================================================================
// CORE TYPES (TypeScript Support)
// =============================================================================

/**
 * Main profile type definitions
 * Core interfaces for profile data structure and management
 */
export type {
  CreateProfileRequest,
  Profile,
  ProfileField,
  ProfileListResponse,
  ProfileResponse,
  ProfileSection,
  SharedProfileData,
  UpdateProfileRequest,
  UserRole,
} from './types/profile.types';

/**
 * Role-based profile extensions
 * Specialized types for business owner and investor profiles
 */
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

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Profile helper utilities
 * Common functions for profile data manipulation and formatting
 */
export {
  calculateProfileStrength,
  formatProfileData,
  getProfileDisplayName,
  getProfileLocationDisplayName,
  validateProfileField,
} from './utils/profileHelpers';

/**
 * Profile validation utilities
 * Comprehensive validation functions for form inputs and profile data
 */
export {
  getFieldErrorMessage,
  getValidationRules,
  isEmpty,
  isFieldRequiredForRole,
  sanitizeInput,
  validateField,
  validateFormData,
  validateProfile,
} from './utils/profileValidation';

/**
 * Profile strength calculation
 * Advanced algorithms for calculating and improving profile strength scores
 */
export {
  calculateOverallStrength,
  calculateProfileStrength as calculateStrength,
  compareProfileStrength,
  getFieldImprovements,
  getProfileStrengthLevel,
  getStrengthImprovements,
  getStrengthLevel,
  trackStrengthChanges,
} from './utils/profileStrength';

// =============================================================================
// CONFIGURATION & CONSTANTS
// =============================================================================

/**
 * Profile field configurations and templates
 * Centralized configuration for profile fields, validation rules, and templates
 */
export {
  FIELDS_BY_SECTION,
  FIELD_VALIDATION_RULES,
  PROFILE_FIELDS,
  PROFILE_SECTIONS,
  PROFILE_TEMPLATES,
  REQUIRED_FIELDS_BY_ROLE,
} from './constants';

// =============================================================================
// SERVICES (Advanced Usage)
// =============================================================================

/**
 * Profile API service
 * Direct access to profile service for advanced use cases
 * Note: Prefer using useProfile hook for most use cases
 */
export { profileService } from './services/profileService';

/**
 * LinkedIn integration service
 * Direct access to LinkedIn service for advanced integration scenarios
 * Note: Prefer using useLinkedIn hook for most use cases
 */
export { linkedinService } from './services/linkedinService';

/**
 * Mock profile service
 * Development and testing service with mock data
 * Automatically used in development mode
 */
export { mockProfileService } from './services/mockProfileService';
