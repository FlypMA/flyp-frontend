import React from 'react';
import { Button } from '@heroui/react';
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';

interface SellerOnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isStepValid?: boolean;
  isEditMode?: boolean;
  showNavigation?: boolean;
}

const SellerOnboardingNavigation: React.FC<SellerOnboardingNavigationProps> = ({
  currentStep,
  totalSteps,
  isLastStep,
  isFirstStep,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
  isSubmitting = false,
  isStepValid = true,
  isEditMode = false,
  showNavigation = true,
}) => {
  if (!showNavigation) return null;

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back Button */}
          <div className="flex-1 flex justify-start">
            {!isFirstStep && (
              <Button
                variant="flat"
                onPress={onBack}
                startContent={<ArrowLeft className="w-4 h-4" />}
                className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 border border-gray-200 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                size="lg"
              >
                Back
              </Button>
            )}
          </div>

          {/* Center: Save Draft */}
          <div className="flex-1 flex justify-center">
            {!isEditMode && !isLastStep && (
              <Button
                variant="bordered"
                onPress={onSaveDraft}
                startContent={<Save className="w-4 h-4" />}
                className="text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                size="lg"
              >
                Save Draft
              </Button>
            )}
          </div>

          {/* Right: Continue/Submit Button */}
          <div className="flex-1 flex justify-end">
            {isLastStep ? (
              <Button
                color="primary"
                onPress={onSubmit}
                isLoading={isSubmitting}
                endContent={!isSubmitting && <CheckCircle className="w-5 h-5" />}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] min-w-[160px]"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isEditMode ? 'Saving...' : 'Creating...'}</span>
                  </span>
                ) : (
                  <span>{isEditMode ? 'Save Changes' : 'Complete Setup'}</span>
                )}
              </Button>
            ) : (
              <Button
                color="primary"
                onPress={onNext}
                isDisabled={!isStepValid}
                endContent={<ArrowRight className="w-4 h-4" />}
                className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 transform min-w-[140px] ${
                  isStepValid
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                size="lg"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile-friendly touch area */}
      <div className="h-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10" />
    </div>
  );
};

export default SellerOnboardingNavigation;
