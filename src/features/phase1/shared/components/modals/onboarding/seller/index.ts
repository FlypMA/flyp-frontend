/**
 * 🏢 Seller Onboarding - Index
 * Location: src/shared/components/modals/onboarding/seller/index.ts
 * Purpose: Centralized exports for seller onboarding modal system
 */

// Main modal component
export { default as SellerOnboardingModal } from './SellerOnboardingModal';

// Types
export type {
  OnboardingStepProps,
  SellerFormData,
  SellerOnboardingModalProps,
  StepValidationProps,
} from './types';

export { DEFAULT_FORM_DATA, TOTAL_STEPS } from './types';

// Utilities
export {
  clearDraft,
  formatCurrency,
  getStepDescription,
  getStepTitle,
  isStepValid,
  loadDraft,
  saveDraft,
  triggerConfetti,
} from './utils';

// Individual step components (for advanced usage)
export { default as BusinessDescriptionStep } from './steps/BusinessDescriptionStep';
export { default as BusinessNameStep } from './steps/BusinessNameStep';
export { default as BusinessTypeStep } from './steps/BusinessTypeStep';
export { default as ContactEmailStep } from './steps/ContactEmailStep';
export { default as ContactPhoneStep } from './steps/ContactPhoneStep';
export { default as EmployeeCountStep } from './steps/EmployeeCountStep';
export { default as FoundedYearStep } from './steps/FoundedYearStep';
export { default as LocationStep } from './steps/LocationStep';
export { default as RevenueRangeStep } from './steps/RevenueRangeStep';
export { default as SellingReasonStep } from './steps/SellingReasonStep';
export { default as SuccessStep } from './steps/SuccessStep';
export { default as WelcomeStep } from './steps/WelcomeStep';

// Default export for convenience
export { default } from './SellerOnboardingModal';
