/**
 * 🏢 Seller Onboarding Modal - Main Orchestrator
 * Location: src/shared/components/modals/sellerOnboarding/SellerOnboardingModal.tsx
 * Purpose: Main modal component that orchestrates all onboarding steps
 */

import { Modal, ModalContent } from '@heroui/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '../../../buttons/Button';
import {
  DEFAULT_FORM_DATA,
  OnboardingStepProps,
  SellerOnboardingModalProps,
  TOTAL_STEPS,
} from './types';
import { clearDraft, isStepValid, loadDraft, saveDraft } from './utils';

// Step imports
import BusinessDescriptionStep from './steps/BusinessDescriptionStep';
import BusinessNameStep from './steps/BusinessNameStep';
import BusinessTypeStep from './steps/BusinessTypeStep';
import ContactEmailStep from './steps/ContactEmailStep';
import ContactPhoneStep from './steps/ContactPhoneStep';
import EmployeeCountStep from './steps/EmployeeCountStep';
import FoundedYearStep from './steps/FoundedYearStep';
import LocationStep from './steps/LocationStep';
import RevenueRangeStep from './steps/RevenueRangeStep';
import SellingReasonStep from './steps/SellingReasonStep';
import SuccessStep from './steps/SuccessStep';
import WelcomeStep from './steps/WelcomeStep';

const SellerOnboardingModal: React.FC<SellerOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  existingData,
  isEditMode = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  // Initialize form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(isEditMode ? 1 : 0); // Skip welcome step in edit mode
      setIsSubmitting(false);

      // Populate form with existing data if in edit mode
      if (isEditMode && existingData) {
        setFormData(existingData);
      } else {
        // Check for saved draft (only in create mode)
        const draft = loadDraft();
        if (draft) {
          setFormData(draft.formData);
          setCurrentStep(draft.currentStep);
        }
      }
    }
  }, [isOpen, isEditMode, existingData]);

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);

      // Save draft on each step
      if (!isEditMode) {
        saveDraft(formData, newStep);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Clear draft on successful submission
      if (!isEditMode) {
        clearDraft();
      }

      // Call completion handler
      if (onComplete) {
        onComplete(formData);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Save draft before closing (only in create mode)
    if (!isEditMode && currentStep > 0) {
      saveDraft(formData, currentStep);
    }
    onClose();
  };

  const renderStep = () => {
    const stepProps: OnboardingStepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === TOTAL_STEPS - 1,
    };

    switch (currentStep) {
      case 0:
        return <WelcomeStep {...stepProps} />;
      case 1:
        return <BusinessTypeStep {...stepProps} />;
      case 2:
        return <BusinessNameStep {...stepProps} />;
      case 3:
        return <LocationStep {...stepProps} />;
      case 4:
        return <FoundedYearStep {...stepProps} />;
      case 5:
        return <BusinessDescriptionStep {...stepProps} />;
      case 6:
        return <EmployeeCountStep {...stepProps} />;
      case 7:
        return <RevenueRangeStep {...stepProps} />;
      case 8:
        return <SellingReasonStep {...stepProps} />;
      case 9:
        return <div className="text-center py-16">Timeline Step - TODO</div>;
      case 10:
        return <div className="text-center py-16">Price Expectations Step - TODO</div>;
      case 11:
        return <ContactEmailStep {...stepProps} />;
      case 12:
        return <ContactPhoneStep {...stepProps} />;
      case 13:
        return <div className="text-center py-16">Verification Step - TODO</div>;
      case 14:
        return <SuccessStep />;
      default:
        return <div>Unknown step</div>;
    }
  };

  const canProceed = currentStep === 0 || isStepValid({ formData, step: currentStep });
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        base: 'max-h-[90vh]',
        body: 'p-0',
      }}
    >
      <ModalContent>
        <div className="relative">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {currentStep > 0 && !isLastStep && (
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {isEditMode ? 'Edit Business Listing' : 'Create Business Listing'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Step {currentStep + 1} of {TOTAL_STEPS}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">{renderStep()}</div>

          {/* Footer */}
          {!isLastStep && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex justify-between">
                <div>
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      startContent={<ArrowLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                  )}
                </div>

                <Button
                  color="primary"
                  onClick={isLastStep ? handleSubmit : handleNext}
                  endContent={!isLastStep ? <ArrowRight className="w-4 h-4" /> : undefined}
                  disabled={!canProceed || isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isLastStep ? 'Complete' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SellerOnboardingModal;
