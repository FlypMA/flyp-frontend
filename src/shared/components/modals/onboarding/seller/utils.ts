/**
 * 🛠️ Seller Onboarding Utilities
 * Location: src/shared/components/modals/sellerOnboarding/utils.ts
 * Purpose: Utility functions for seller onboarding modal
 */

import { SellerFormData, StepValidationProps } from './types';

/**
 * Validate if a step is complete
 */
export const isStepValid = ({ formData, step }: StepValidationProps): boolean => {
  switch (step) {
    case 1:
      return formData.businessType !== '' && formData.industry !== '';
    case 2:
      return formData.businessName.trim() !== '';
    case 3:
      return formData.city.trim() !== '';
    case 4:
      return formData.foundedYear !== '';
    case 5:
      return formData.description.trim().length >= 50;
    case 6:
      return formData.employeeCount !== '';
    case 7:
      return true; // Revenue range always valid
    case 8:
      return formData.sellingReason !== '';
    case 9:
      return formData.timeline !== '';
    case 10:
      return formData.priceExpectations !== '';
    case 11:
      return formData.contactEmail.includes('@');
    case 12:
      return formData.contactPhone.trim() !== '';
    case 13:
      return true; // Verification is optional
    default:
      return true;
  }
};

/**
 * Save draft to localStorage
 */
export const saveDraft = (formData: SellerFormData, currentStep: number): void => {
  try {
    const draftData = {
      formData,
      currentStep,
      timestamp: Date.now(),
    };
    localStorage.setItem('sellerOnboardingDraft', JSON.stringify(draftData));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
};

/**
 * Load draft from localStorage
 */
export const loadDraft = (): { formData: SellerFormData; currentStep: number } | null => {
  try {
    const savedDraft = localStorage.getItem('sellerOnboardingDraft');
    if (savedDraft) {
      const { formData, currentStep } = JSON.parse(savedDraft);
      return { formData, currentStep };
    }
  } catch (error) {
    console.error('Failed to load draft:', error);
  }
  return null;
};

/**
 * Clear draft from localStorage
 */
export const clearDraft = (): void => {
  try {
    localStorage.removeItem('sellerOnboardingDraft');
  } catch (error) {
    console.error('Failed to clear draft:', error);
  }
};

/**
 * Trigger confetti celebration
 */
export const triggerConfetti = (): void => {
  import('canvas-confetti').then(confetti => {
    confetti.default({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  });
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Get step title
 */
export const getStepTitle = (step: number): string => {
  const titles = [
    'Welcome to flyp',
    'Business Type & Industry',
    'Business Name',
    'Location',
    'Founded Year',
    'Business Description',
    'Team Size',
    'Revenue Range',
    'Selling Reason',
    'Timeline',
    'Price Expectations',
    'Contact Email',
    'Phone Number',
    'Verification',
    'Success!',
  ];
  return titles[step] || 'Step';
};

/**
 * Get step description
 */
export const getStepDescription = (step: number): string => {
  const descriptions = [
    "Let's get your business listed and find the perfect buyer",
    'Tell us about your business type and industry',
    "What's the name of your business?",
    'Where is your business located?',
    'When was your business established?',
    'Describe your business in detail',
    'How many people work at your business?',
    "What's your annual revenue range?",
    'Why are you selling your business?',
    'When do you want to sell?',
    'What price are you expecting?',
    'How can buyers contact you?',
    "What's your phone number?",
    'Would you like verification?',
    'Your listing is ready!',
  ];
  return descriptions[step] || 'Complete this step';
};
