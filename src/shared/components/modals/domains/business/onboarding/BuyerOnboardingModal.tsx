/**
 * 🛒 Buyer Onboarding Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/onboarding/BuyerOnboardingModal.tsx
 * Purpose: Placeholder for future buyer onboarding modal
 */

import React from 'react';
import { FullscreenModal } from '../../../foundations';

interface BuyerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: any) => void;
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
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Close
          </button>
        </div>
      </div>
    </FullscreenModal>
  );
};

export default BuyerOnboardingModal;
