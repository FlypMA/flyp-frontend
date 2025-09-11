// 🧭 Wizard Navigation Component
// Location: src/features/authentication/components/wizard-components/WizardNavigation.tsx
// Purpose: Navigation buttons for wizard steps

import React from 'react';
import { Button } from '@heroui/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  isSubmitting,
  canProceed,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const handleNext = () => {
    if (isLastStep) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      {/* Previous Button */}
      <Button
        variant="bordered"
        size="lg"
        onPress={onPrevious}
        isDisabled={isFirstStep || isSubmitting}
        startContent={<ChevronLeft className="w-4 h-4" />}
      >
        Previous
      </Button>

      {/* Step Counter */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Next/Submit Button */}
      <Button
        color="primary"
        size="lg"
        onPress={handleNext}
        isDisabled={!canProceed}
        isLoading={isSubmitting}
        endContent={
          isLastStep ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        }
      >
        {isSubmitting ? 'Submitting...' : isLastStep ? 'Complete Setup' : 'Continue'}
      </Button>
    </div>
  );
};
