// 🎯 Buyer Wizard Hook - State Management & Business Logic
// Location: src/features/authentication/hooks/useBuyerWizard.ts
// Purpose: Custom hook for buyer onboarding wizard logic

import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  BuyerData,
  BuyerWizardState,
  BuyerWizardActions,
  BuyerWizardStep,
  StepValidation,
} from '../types/buyerTypes';

const INITIAL_BUYER_DATA: BuyerData = {
  fullName: '',
  background: '',
  experience: '',
  investmentType: '',
  financingStatus: '',
  budgetMin: '',
  budgetMax: '',
  preferredIndustries: [],
  preferredCountries: [],
  businessModels: [],
  revenueRanges: [],
  employeeRanges: [],
  timeline: '',
  dealStructure: [],
  savedSearchName: '',
  alertTypes: [],
  communicationPrefs: [],
  searchFrequency: '',
};

const STEP_CONFIG = [
  {
    id: 'buyer-profile',
    title: 'Your Profile',
    subtitle: 'Tell us about your background',
    estimatedTime: '4 min',
  },
  {
    id: 'investment-criteria',
    title: 'Investment Criteria',
    subtitle: 'Define your investment preferences',
    estimatedTime: '5 min',
  },
  {
    id: 'deal-preferences',
    title: 'Deal Preferences',
    subtitle: 'Size and structure preferences',
    estimatedTime: '3 min',
  },
  {
    id: 'search-setup',
    title: 'Search Setup',
    subtitle: 'Configure alerts and matching',
    estimatedTime: '3 min',
  },
];

export const useBuyerWizard = () => {
  const navigate = useNavigate();

  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [buyerData, setBuyerData] = useState<BuyerData>(INITIAL_BUYER_DATA);

  // Computed values
  const steps: BuyerWizardStep[] = useMemo(
    () =>
      STEP_CONFIG.map((step, index) => ({
        ...step,
        isCompleted: currentStep > index,
        isActive: currentStep === index,
      })),
    [currentStep]
  );

  const progress = useMemo(
    () => ((currentStep + 1) / steps.length) * 100,
    [currentStep, steps.length]
  );

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  // Validation functions
  const validateStep1 = useCallback((data: BuyerData): StepValidation => {
    const errors: string[] = [];

    if (!data.fullName.trim()) errors.push('Full name is required');
    if (!data.background) errors.push('Background selection is required');
    if (!data.experience) errors.push('Experience level is required');
    if (!data.investmentType) errors.push('Investment type is required');
    if (!data.financingStatus) errors.push('Financing status is required');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  const validateStep2 = useCallback((data: BuyerData): StepValidation => {
    const errors: string[] = [];

    if (!data.budgetMin) errors.push('Minimum budget is required');
    if (!data.budgetMax) errors.push('Maximum budget is required');
    if (data.preferredIndustries.length === 0)
      errors.push('At least one industry must be selected');
    if (data.preferredCountries.length === 0) errors.push('At least one country must be selected');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  const validateStep3 = useCallback((data: BuyerData): StepValidation => {
    const errors: string[] = [];

    if (data.revenueRanges.length === 0) errors.push('At least one revenue range must be selected');
    if (data.employeeRanges.length === 0)
      errors.push('At least one employee range must be selected');
    if (!data.timeline) errors.push('Timeline is required');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  const validateStep4 = useCallback((data: BuyerData): StepValidation => {
    const errors: string[] = [];

    if (!data.savedSearchName.trim()) errors.push('Search name is required');
    if (data.alertTypes.length === 0) errors.push('At least one alert type must be selected');
    if (!data.searchFrequency) errors.push('Search frequency is required');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  const validateCurrentStep = useCallback((): StepValidation => {
    switch (currentStep) {
      case 0:
        return validateStep1(buyerData);
      case 1:
        return validateStep2(buyerData);
      case 2:
        return validateStep3(buyerData);
      case 3:
        return validateStep4(buyerData);
      default:
        return { isValid: true, errors: [] };
    }
  }, [currentStep, buyerData, validateStep1, validateStep2, validateStep3, validateStep4]);

  // Actions
  const updateBuyerData = useCallback((data: Partial<BuyerData>) => {
    setBuyerData(prev => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    const validation = validateCurrentStep();
    if (validation.isValid && !isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
    return validation;
  }, [validateCurrentStep, isLastStep]);

  const previousStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  }, [isFirstStep]);

  const handleSubmit = useCallback(async () => {
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      return validation;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call
      console.log('Submitting buyer data:', buyerData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setShowSuccess(true);

      // Navigate to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

      return { isValid: true, errors: [] };
    } catch (error) {
      console.error('Error submitting buyer data:', error);
      return {
        isValid: false,
        errors: ['Failed to submit. Please try again.'],
      };
    } finally {
      setIsSubmitting(false);
    }
  }, [validateCurrentStep, buyerData, navigate]);

  const jumpToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < totalSteps) {
        setCurrentStep(stepIndex);
      }
    },
    [totalSteps]
  );

  // Return state and actions
  const state: BuyerWizardState = {
    currentStep,
    isSubmitting,
    showSuccess,
    buyerData,
  };

  const actions: BuyerWizardActions = {
    setCurrentStep,
    setIsSubmitting,
    setShowSuccess,
    updateBuyerData,
    nextStep,
    previousStep,
    handleSubmit,
  };

  return {
    // State
    ...state,

    // Computed values
    steps,
    progress,
    totalSteps,
    isFirstStep,
    isLastStep,

    // Actions
    ...actions,
    jumpToStep,
    validateCurrentStep,

    // Validation helpers
    validateStep1,
    validateStep2,
    validateStep3,
    validateStep4,
  };
};
