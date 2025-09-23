/**
 * 🎭 Modal System - Enterprise Architecture
 * Location: src/shared/components/modals/index.ts
 * Purpose: Main export file for the entire modal system
 */

// ===== FOUNDATION COMPONENTS =====
// Reusable UI foundations for all modals
export { CenteredModal, FullscreenModal, TwoPanelModal } from './foundations';

// ===== DOMAIN COMPONENTS =====

// Authentication Domain
export {
  AuthenticationModal,
  LoginPanel,
  SignupPanel,
  WelcomePanel,
} from './domains/authentication';

// Business Domain
export {
  AnalyticsModal,
  BusinessProfileModal,
  BuyerOnboardingModal,
  ListingManagementModal,
  SellerOnboardingModal,
  ValuationReportModal,
} from './domains/business';

// ===== STANDALONE MODALS =====
// Modals that haven't been migrated to domain structure yet
export { default as InquiryModal } from './InquiryModal';
export { default as NDAModal } from './NDAModal';
export { default as ValuationModal } from './ValuationModal';

// ===== IMAGE MODALS =====
export { ImageGalleryModal } from './images';

// ===== TYPE EXPORTS =====
export type { AuthenticationType } from './domains/authentication';

// ===== UTILITY EXPORTS =====
export * from './utils/modalHelpers';

// ===== LEGACY COMPATIBILITY =====
// Backward compatibility exports (SellerOnboardingModal is already exported from domains/business)
