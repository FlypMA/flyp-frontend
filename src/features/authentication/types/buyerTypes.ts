// 🎯 Buyer Onboarding Types
// Location: src/features/authentication/types/buyerTypes.ts
// Purpose: Type definitions for buyer onboarding wizard

export interface BuyerData {
  // Step 1: Buyer Profile
  fullName: string;
  background: string;
  experience: string;
  investmentType: string;
  financingStatus: string;

  // Step 2: Investment Criteria
  budgetMin: string;
  budgetMax: string;
  preferredIndustries: string[];
  preferredCountries: string[];
  businessModels: string[];

  // Step 3: Size & Financial Preferences
  revenueRanges: string[];
  employeeRanges: string[];
  timeline: string;
  dealStructure: string[];

  // Step 4: Search Preferences
  savedSearchName: string;
  alertTypes: string[];
  communicationPrefs: string[];
  searchFrequency: string;
}

export interface BuyerWizardStep {
  id: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface BuyerWizardState {
  currentStep: number;
  isSubmitting: boolean;
  showSuccess: boolean;
  buyerData: BuyerData;
}

export interface BuyerWizardActions {
  setCurrentStep: (step: number) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setShowSuccess: (showSuccess: boolean) => void;
  updateBuyerData: (data: Partial<BuyerData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  handleSubmit: () => Promise<void>;
}

// Validation types
export interface StepValidation {
  isValid: boolean;
  errors: string[];
}

export type StepValidator = (data: BuyerData) => StepValidation;
