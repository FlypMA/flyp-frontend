/**
 * 🏢 Business Profile Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/management/BusinessProfileModal.tsx
 * Purpose: Placeholder for business profile management modal
 */

import React from 'react';
import { CenteredModal } from '../../../foundations';

interface BusinessProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
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
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Close
        </button>
      </div>
    </CenteredModal>
  );
};

export default BusinessProfileModal;
