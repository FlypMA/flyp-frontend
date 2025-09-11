// 🏢 Business Listing Modal Container
// Location: src/app/components/modals/business-listing-modal-container.tsx
// Purpose: Container for business listing modals

import React from 'react';
import { Modal } from '@heroui/react';

interface BusinessListingModalContainerProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const BusinessListingModalContainer: React.FC<BusinessListingModalContainerProps> = ({
  isOpen = false,
  onClose = () => {},
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        {children || (
          <div>
            <h2 className="text-2xl font-bold mb-4">Business Listing</h2>
            <p>Business listing modal content...</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export { BusinessListingModalContainer };
export default BusinessListingModalContainer;
