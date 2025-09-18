/**
 * 🎭 Modals - Main Index
 * Location: src/shared/components/modals/index.ts
 * Purpose: Centralized exports for all modal components
 */

// Business modals
export { default as BusinessListingModalContainer } from './business-listing-modal-container';
export { default as InquiryModal } from './InquiryModal';
export { default as NDAModal } from './NDAModal';

// Legacy seller onboarding (for backward compatibility)
export { default as SellerOnboardingModal } from './SellerOnboardingModal';

// Image modals
export * from './images';

// Onboarding modals (new organized structure)
export * from './onboarding';

// Re-export main onboarding components for convenience
export {
  // Individual step components
  BusinessDescriptionStep,
  BusinessNameStep,
  BusinessTypeStep,
  clearDraft,
  ContactEmailStep,
  ContactPhoneStep,
  EmployeeCountStep,
  formatCurrency,
  FoundedYearStep,
  getStepDescription,
  getStepTitle,
  // Utilities
  isStepValid,
  loadDraft,
  LocationStep,
  RevenueRangeStep,
  saveDraft,
  SellerOnboardingModal as SellerOnboardingModalV2,
  SellingReasonStep,
  SuccessStep,
  triggerConfetti,
  WelcomeStep,
  type SellerFormData,
  type SellerOnboardingModalProps,
} from './onboarding/seller';
