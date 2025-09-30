// 🏢 Listing Prelude Flow - Modal Container
// Location: src/features/phase1/business/listing/prelude/components/PreludeFlow.tsx
// Purpose: Manages the 2-step prelude flow (business type selection + confirmation)

import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useState } from 'react';
import { BusinessType, PreludeFlowProps } from '../types/PreludeTypes';
import BusinessConfirmationPage from './BusinessConfirmationPage';
import BusinessTypeSelectionPage from './BusinessTypeSelectionPage';

const PreludeFlow: React.FC<PreludeFlowProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialBusinessType,
}) => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'confirmation'>('selection');
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | undefined>(
    initialBusinessType
  );

  const handleBusinessTypeSelect = (businessType: BusinessType) => {
    setSelectedBusinessType(businessType);
    setCurrentStep('confirmation');
  };

  const handleBack = () => {
    if (currentStep === 'confirmation') {
      setCurrentStep('selection');
    } else {
      onClose();
    }
  };

  const handleGetStarted = () => {
    if (selectedBusinessType) {
      onComplete(selectedBusinessType);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'selection':
        return (
          <BusinessTypeSelectionPage
            onBusinessTypeSelect={handleBusinessTypeSelect}
            onBack={handleBack}
            selectedBusinessType={selectedBusinessType}
          />
        );
      case 'confirmation':
        return (
          <BusinessConfirmationPage
            selectedBusinessType={selectedBusinessType!}
            onBack={handleBack}
            onGetStarted={handleGetStarted}
          />
        );
      default:
        return null;
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
    >
      {renderCurrentStep()}
    </FullscreenModal>
  );
};

export default PreludeFlow;
