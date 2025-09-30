// 🏢 Card Service Modal - Business Card Creation
// Location: src/features/phase1/business/card/card-service/components/CardServiceModal.tsx
// Purpose: Main modal for 3-step business card creation (listing-service style)

import { SecondaryButton } from '@/shared/components/buttons';
import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessInformationStep from '../steps/BusinessInformationStep';
import ReviewCardStep from '../steps/ReviewCardStep';
import YearsSinceFoundedStep from '../steps/YearsSinceFoundedStep';
import { BusinessCard, CardServiceModalProps } from '../types/CardServiceTypes';

const CardServiceModal: React.FC<CardServiceModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  businessType,
  initialData,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardData, setCardData] = useState<Partial<BusinessCard>>(
    initialData || { type: businessType }
  );

  const totalSteps = 3;

  // Step configuration
  const stepConfig = [
    {
      id: 1,
      title: 'Years',
      icon: '📅',
    },
    {
      id: 2,
      title: 'Information',
      icon: '🏢',
    },
    {
      id: 3,
      title: 'Review',
      icon: '✅',
    },
  ];

  const handleDataChange = (stepData: Partial<BusinessCard>) => {
    setCardData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalSteps) {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Enhanced validation with logging
      console.log('🔍 Business Card Data:', cardData);

      const isValid =
        cardData.type &&
        typeof cardData.yearsInBusiness === 'number' &&
        cardData.foundedYear &&
        cardData.name &&
        (cardData.location || cardData.isRemote) && // Allow completion if remote
        cardData.description &&
        cardData.teamSize;

      if (!isValid) {
        console.error('❌ Validation failed. Missing fields:', {
          type: cardData.type ? '✅' : '❌',
          yearsInBusiness: typeof cardData.yearsInBusiness === 'number' ? '✅' : '❌',
          foundedYear: cardData.foundedYear ? '✅' : '❌',
          name: cardData.name ? '✅' : '❌',
          location: cardData.location || cardData.isRemote ? '✅' : '❌',
          description: cardData.description ? '✅' : '❌',
          teamSize: cardData.teamSize ? '✅' : '❌',
        });
        return;
      }

      const completedCard: BusinessCard = {
        type: cardData.type,
        yearsInBusiness: cardData.yearsInBusiness,
        foundedYear: cardData.foundedYear,
        name: cardData.name,
        location: cardData.location || 'Remote', // Default to 'Remote' if no location
        isRemote: cardData.isRemote || false,
        description: cardData.description,
        teamSize: cardData.teamSize,
        status: 'complete',
        createdAt: isEditing && initialData?.createdAt ? initialData.createdAt : new Date(),
        updatedAt: new Date(),
      };

      console.log(
        isEditing ? '✏️ Updating business card:' : '✅ Creating business card:',
        completedCard
      );

      if (onComplete) {
        onComplete(completedCard);
      }

      localStorage.setItem('businessCard', JSON.stringify(completedCard));
      localStorage.setItem('hasBusinessCard', 'true');

      console.log('💾 Saved to localStorage');
      console.log('🔄 Navigating to /my-business');

      onClose();
      navigate('/my-business');
    } catch (error) {
      console.error('❌ Error creating business card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: // Years Since Founded
        return typeof cardData.yearsInBusiness === 'number' && cardData.yearsInBusiness >= 0;
      case 2: // Business Information
        return !!(
          cardData.name &&
          cardData.description &&
          (cardData.location || cardData.isRemote)
        );
      case 3: // Review
        return true;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: cardData,
      onDataChange: handleDataChange,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === totalSteps,
      isLoading: isSubmitting,
    };

    switch (currentStep) {
      case 1:
        return <YearsSinceFoundedStep {...stepProps} />;
      case 2:
        return <BusinessInformationStep {...stepProps} />;
      case 3:
        return <ReviewCardStep {...stepProps} />;
      default:
        return null;
    }
  };

  const currentStepConfig = stepConfig[currentStep - 1];

  return (
    <FullscreenModal isOpen={isOpen} onClose={onClose} showProgress={false} showHeader={false}>
      <div className="flex h-full min-h-0 bg-black p-4">
        {/* Sidebar Navigation - Fixed Width */}
        <div className="flex-shrink-0 w-[160px] bg-black h-full flex flex-col items-center justify-center space-y-8">
          {stepConfig.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Progress Line Above */}
              {index > 0 && (
                <div
                  className={`w-0.5 h-12 -mb-4 ${
                    currentStep > step.id ? 'bg-white' : 'bg-gray-600'
                  }`}
                />
              )}

              {/* Step Icon */}
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={step.id > currentStep}
                className={`
                  w-16 h-16 rounded-lg flex items-center justify-center text-2xl transition-all
                  ${
                    currentStep === step.id
                      ? 'bg-gray-800 ring-2 ring-white'
                      : step.id < currentStep
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-gray-900 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                {step.icon}
              </button>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-h-0 ml-4 bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Step Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Step Title and Progress */}
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900">{currentStepConfig.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>

              {/* Save and Exit Button */}
              <SecondaryButton onClick={onClose} size="sm" aria-label="Save and exit">
                Save and exit
              </SecondaryButton>
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white">{renderCurrentStep()}</div>

          {/* Navigation Footer - Sticky */}
          <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
              <SecondaryButton
                onClick={handlePrevious}
                disabled={currentStep === 1}
                size="sm"
                aria-label="Back"
              >
                Back
              </SecondaryButton>
              <button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[165px] h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? isEditing
                    ? 'Updating...'
                    : 'Saving...'
                  : currentStep === totalSteps
                    ? isEditing
                      ? 'Update'
                      : 'Complete'
                    : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </FullscreenModal>
  );
};

export default CardServiceModal;
