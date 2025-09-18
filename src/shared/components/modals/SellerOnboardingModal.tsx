/**
 * 🏢 Seller Onboarding Modal - Legacy Export
 * Location: src/shared/components/modals/SellerOnboardingModal.tsx
 * Purpose: Legacy export for backward compatibility
 *
 * @deprecated Use the modular system from ./onboarding/seller/ instead
 */

// Re-export from the new modular system
export {
  default as SellerOnboardingModal,
  type SellerFormData,
  type SellerOnboardingModalProps,
} from './onboarding/seller';

// Legacy export for backward compatibility
export { default } from './onboarding/seller';
