/**
 * 🏢 Seller Onboarding Types
 * Location: src/shared/components/modals/sellerOnboarding/types.ts
 * Purpose: Type definitions for seller onboarding modal
 */

export interface SellerFormData {
  businessType: string;
  businessName: string;
  industry: string;
  country: string;
  city: string;
  foundedYear: string;
  description: string;
  employeeCount: string;
  revenueRange: number[];
  sellingReason: string;
  timeline: string;
  priceExpectations: string;
  contactEmail: string;
  contactPhone: string;
  wantsVerification: boolean;
}

export interface SellerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: SellerFormData) => void;
  existingData?: SellerFormData | null;
  isEditMode?: boolean;
}

export interface OnboardingStepProps {
  formData: SellerFormData;
  updateFormData: (updates: Partial<SellerFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface StepValidationProps {
  formData: SellerFormData;
  step: number;
}

export const TOTAL_STEPS = 15; // Includes welcome, 13 form steps, and success

export const DEFAULT_FORM_DATA: SellerFormData = {
  businessType: '',
  businessName: '',
  industry: '',
  country: 'Belgium',
  city: '',
  foundedYear: '',
  description: '',
  employeeCount: '',
  revenueRange: [100000, 1000000],
  sellingReason: '',
  timeline: '',
  priceExpectations: '',
  contactEmail: '',
  contactPhone: '',
  wantsVerification: false,
};
