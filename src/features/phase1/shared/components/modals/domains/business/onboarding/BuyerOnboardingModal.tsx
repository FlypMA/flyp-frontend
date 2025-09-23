/**
 * 🛒 Buyer Onboarding Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/onboarding/BuyerOnboardingModal.tsx
 * Purpose: Placeholder for future buyer onboarding modal
 */

import { Button } from '@/shared/components/buttons';
import React from 'react';
import { FullscreenModal } from '../../../foundations';

interface BuyerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: unknown) => void;
}

export const BuyerOnboardingModal: React.FC<BuyerOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      title="Buyer Onboarding"
      showProgress={false}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Buyer Onboarding</h2>
          <p className="text-gray-600 mb-6">This feature is coming soon!</p>
          <Button variant="primary" onPress={onClose}>
            Close
          </Button>
        </div>
      </div>
    </FullscreenModal>
  );
};

export default BuyerOnboardingModal;
