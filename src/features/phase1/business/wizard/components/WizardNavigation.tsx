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
    if (isLastStep) return <Check className="w-3 h-3" />;
    return <ChevronRight className="w-3 h-3" />;
  };

  return (
    <div className="flex justify-between items-center py-3 border-t border-gray-100">
      <Button
        variant="secondary"
        size="sm"
        onPress={onPrevious}
        isDisabled={isFirstStep || isLoading}
        startContent={<ChevronLeft className="w-3 h-3" />}
      >
        Previous
      </Button>

      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
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
