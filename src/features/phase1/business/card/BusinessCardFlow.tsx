/* eslint-disable @typescript-eslint/no-unused-vars */
// 🏢 Business Card Flow - Main Orchestrator
// Location: src/features/phase1/business/card/BusinessCardFlow.tsx
// Purpose: Orchestrates the complete business card creation flow (prelude + card service)

import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Prelude components
import BusinessConfirmationPage from './prelude/components/BusinessConfirmationPage';
import BusinessTypeSelectionPage from './prelude/components/BusinessTypeSelectionPage';
import { BusinessType } from './prelude/types/PreludeTypes';

// Card Service
import CardServiceModal from './card-service/components/CardServiceModal';
import { BusinessCard } from './card-service/types/CardServiceTypes';

interface BusinessCardFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (card: BusinessCard) => void;
  initialData?: BusinessCard; // For editing existing business card
  isEditing?: boolean; // Flag to skip prelude and go directly to card service
}

const BusinessCardFlow: React.FC<BusinessCardFlowProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialData,
  isEditing = false,
}) => {
  const navigate = useNavigate();

  // Prelude state
  const [preludeStep, setPreludeStep] = useState<'selection' | 'confirmation' | 'service'>(
    isEditing ? 'service' : 'selection'
  );
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | undefined>(
    isEditing && initialData ? initialData.type : undefined
  );

  // Card Service state
  const [isCardServiceOpen, setIsCardServiceOpen] = useState(isEditing);

  useEffect(() => {
    if (!isOpen) {
      // Reset when modal closes
      setPreludeStep(isEditing ? 'service' : 'selection');
      setSelectedBusinessType(isEditing && initialData ? initialData.type : undefined);
      setIsCardServiceOpen(isEditing);
    } else if (isEditing && initialData) {
      // When opening in edit mode, skip prelude
      setPreludeStep('service');
      setSelectedBusinessType(initialData.type);
      setIsCardServiceOpen(true);
    }
  }, [isOpen, isEditing, initialData]);

  // Prelude handlers
  const handleBusinessTypeSelect = (type: BusinessType) => {
    setSelectedBusinessType(type);
    setPreludeStep('confirmation');
  };

  const handleGetStarted = () => {
    setPreludeStep('service');
    setIsCardServiceOpen(true);
  };

  const handleCardServiceClose = () => {
    setIsCardServiceOpen(false);
    onClose();
  };

  const handleCardServiceComplete = (card: BusinessCard) => {
    setIsCardServiceOpen(false);
    if (onComplete) {
      onComplete(card);
    }
    onClose();
  };

  // If card service is active, render it separately
  if (preludeStep === 'service' && selectedBusinessType) {
    return (
      <CardServiceModal
        isOpen={isCardServiceOpen}
        onClose={handleCardServiceClose}
        onComplete={handleCardServiceComplete}
        businessType={selectedBusinessType}
        initialData={initialData}
        isEditing={isEditing}
      />
    );
  }

  // Otherwise, render the prelude in a FullscreenModal
  return (
    <FullscreenModal
      isOpen={isOpen && preludeStep !== 'service'}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-4">
          <img
            src="/UpSwitch_logo_var1.svg?v=2024.4"
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
      closeButtonAriaLabel="Close business card creation"
      showProgress={false}
    >
      <div className="h-full">
        {preludeStep === 'selection' && (
          <BusinessTypeSelectionPage
            onBusinessTypeSelect={handleBusinessTypeSelect}
            selectedBusinessType={selectedBusinessType}
          />
        )}

        {preludeStep === 'confirmation' && selectedBusinessType && (
          <BusinessConfirmationPage
            selectedBusinessType={selectedBusinessType}
            onGetStarted={handleGetStarted}
          />
        )}
      </div>
    </FullscreenModal>
  );
};

export default BusinessCardFlow;
