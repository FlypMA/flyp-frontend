// 🏢 Navigation Controls - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/components/NavigationControls.tsx
// Purpose: Navigation controls for the listing creation flow

import React from 'react';

interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
  canProceed?: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onComplete,
  isFirstStep,
  isLastStep,
  isLoading,
  canProceed,
}) => {
  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  const getNextButtonText = () => {
    if (isLoading) {
      return isLastStep ? 'Publishing...' : 'Loading...';
    }
    if (isLastStep) {
      return 'Publish Listing';
    }
    return 'Continue';
  };

  const getNextButtonVariant = ():
    | 'primary'
    | 'secondary'
    | 'supportive'
    | 'subtle'
    | 'success'
    | 'danger'
    | 'tertiary'
    | 'link' => {
    if (isLastStep) {
      return 'success';
    }
    return 'primary';
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleNext}
        disabled={!canProceed || isLoading}
        className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[165px] h-12 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {getNextButtonText()}
          </div>
        ) : (
          getNextButtonText()
        )}
      </button>
    </div>
  );
};

export default NavigationControls;
