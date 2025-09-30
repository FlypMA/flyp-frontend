// 🏢 Business Card Flow - Main Orchestrator
// Location: src/features/phase1/business/card/components/BusinessCardFlow.tsx
// Purpose: Main component orchestrating the 3-step business card creation flow
// Note: Uses FullscreenModal from prelude pattern with Airbnb-inspired UI

import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useState } from 'react';
import { BusinessCard, BusinessCardFlowProps, BusinessCardFormData } from '../types';
import BusinessBasicInfo from './BusinessBasicInfo';
import BusinessTypeSelection from './BusinessTypeSelection';
import YearsInBusiness from './YearsInBusiness';

const BusinessCardFlow: React.FC<BusinessCardFlowProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState<BusinessCardFormData>({
    ...initialData,
    status: 'draft',
  });

  const handleDataChange = (stepData: Partial<BusinessCardFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...stepData,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // Validate required fields
    if (
      !formData.type ||
      !formData.name ||
      !formData.industry ||
      !formData.description ||
      (!formData.location && !formData.isRemote)
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const completeCard: BusinessCard = {
      type: formData.type!,
      yearsInBusiness: formData.yearsInBusiness || 0,
      foundedYear: formData.foundedYear || new Date().getFullYear(),
      name: formData.name!,
      location: formData.location || '',
      isRemote: formData.isRemote || false,
      industry: formData.industry!,
      description: formData.description!,
      teamSize: formData.teamSize || '',
      website: formData.website || '',
      keyHighlights: formData.keyHighlights || [],
      status: 'complete',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onComplete(completeCard);
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.type;
      case 2:
        return !!formData.yearsInBusiness || formData.yearsInBusiness === 0;
      case 3:
        return !!(
          formData.name &&
          formData.industry &&
          formData.description &&
          (formData.location || formData.isRemote)
        );
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: formData,
      onDataChange: handleDataChange,
      onNext: handleNext,
      onBack: handleBack,
    };

    switch (currentStep) {
      case 1:
        return <BusinessTypeSelection {...stepProps} />;
      case 2:
        return <YearsInBusiness {...stepProps} />;
      case 3:
        return <BusinessBasicInfo {...stepProps} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Business Type';
      case 2:
        return 'Years in Business';
      case 3:
        return 'Business Information';
      default:
        return '';
    }
  };

  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-4">
          <img
            src="/upswitch_logo.svg?v=2024.1"
            alt="Upswitch - European SME M&A Platform"
            width="32"
            height="32"
            className="logo-image transition-opacity hover:opacity-80 w-8 h-8"
            loading="lazy"
            style={{
              height: '32px',
              objectFit: 'contain',
              opacity: 1,
              visibility: 'visible',
              display: 'block',
            }}
          />
        </div>
      }
      currentStep={currentStep}
      totalSteps={totalSteps}
      showProgress={true}
      showBackButton={currentStep > 1}
      onBack={handleBack}
    >
      <div className="h-full flex flex-col bg-white">
        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">{renderCurrentStep()}</main>

        {/* Footer with Navigation */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-8xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              {/* Back Button */}
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Back
                  </button>
                )}
              </div>

              {/* Continue/Complete Button */}
              <button
                onClick={currentStep === totalSteps ? handleComplete : handleNext}
                disabled={!canProceed()}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[165px] h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === totalSteps ? 'Complete' : 'Continue'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </FullscreenModal>
  );
};

export default BusinessCardFlow;
