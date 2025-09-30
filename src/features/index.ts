/**
 * 🚀 Features Index - UpSwitch MVP
 * Central export point for all features organized by development phases
 *
 * PHASE STRUCTURE:
 * - phase1: MVP features for launch
 * - phase2: Future features (post-MVP)
 *
 * USAGE:
 * - Import from phase1 for MVP features
 * - Import from phase2 for future features
 * - Use this index for re-exports if needed
 */

// Phase 1 - MVP Features (Launch Ready)
export * from './phase1';

// Phase 2 - Future Features (Post-MVP)
export * from './phase2';

// Re-export commonly used MVP components for convenience
export {
  // Business Management
  // ListingWizardModal, // Legacy - removed
  // Authentication
  LoginModal,
  SignupModal,
  useAuthModal,
  useBusinessValuation,
  // Types
  type BusinessInfo,
  type ListingData,
} from './phase1';

// Re-export shared components from app level
export {
  Button,
  CenteredModal,
  CustomDropdown,
  CustomInputField,
  CustomNumberInputField,
  InquiryModal,
  NDAModal,
  ValuationModal,
} from '@/shared/components';

// Re-export types separately for isolatedModules compatibility
export type { User } from '@/shared/types';
