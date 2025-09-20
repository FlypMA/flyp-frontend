/**
 * 🏢 Business Profile Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/management/BusinessProfileModal.tsx
 * Purpose: Placeholder for business profile management modal
 */

import { Button } from '@/shared/components/buttons';
import React from 'react';
import { CenteredModal } from '../../../foundations';

interface BusinessProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: unknown) => void;
}

export const BusinessProfileModal: React.FC<BusinessProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="Business Profile" size="lg">
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Profile Management</h3>
        <p className="text-gray-600 mb-6">This feature is coming soon!</p>
        <Button
          variant="primary"
          onPress={onClose}
        >
          Close
        </Button>
      </div>
    </CenteredModal>
  );
};

export default BusinessProfileModal;
