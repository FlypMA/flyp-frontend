// 🏢 Wizard Navigation Component - Listing Wizard
// Location: src/features/phase1/business/wizard/components/WizardNavigation.tsx
// Purpose: Navigation controls for wizard steps

import { Button } from '@/shared/components/buttons';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { WizardNavigationProps } from '../types';

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  onPrevious,
  onNext,
  onComplete,
  isFirstStep,
  isLastStep,
  isLoading = false,
  canProceed = true,
}) => {
  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  const getNextButtonText = () => {
    if (isLastStep) return 'Create Listing';
    return 'Next';
  };

  const getNextButtonIcon = () => {
    if (isLastStep) return <Check className="w-4 h-4" />;
    return <ChevronRight className="w-4 h-4" />;
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
      <Button
        variant="secondary"
        onPress={onPrevious}
        isDisabled={isFirstStep || isLoading}
        startContent={<ChevronLeft className="w-4 h-4" />}
      >
        Previous
      </Button>

      <div className="flex gap-3">
        <Button
          variant="primary"
          onPress={handleNext}
          isDisabled={!canProceed || isLoading}
          endContent={getNextButtonIcon()}
          isLoading={isLoading}
        >
          {getNextButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default WizardNavigation;
