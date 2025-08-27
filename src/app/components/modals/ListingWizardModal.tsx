import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@heroui/react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ListingWizard from '../../pages/listings/ListingWizard';

interface ListingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

// Custom ListingWizard component that accepts onComplete callback
const ModalListingWizard: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  // For now, use the original ListingWizard
  // The navigation will be handled by the modal's close behavior
  return <ListingWizard />;
};

const ListingWizardModal: React.FC<ListingWizardModalProps> = ({ isOpen, onClose, onComplete }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    // Navigate back to seller dashboard
    navigate('/seller/dashboard');
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      // Default behavior: close modal and navigate to dashboard
      onClose();
      navigate('/seller/dashboard');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="full"
      classNames={{
        base: 'h-full max-h-full m-0',
        wrapper: 'h-full',
        body: 'h-full p-0',
        backdrop: 'bg-black/50',
      }}
      hideCloseButton={true}
      isDismissable={false}
    >
      <ModalContent className="h-full max-h-full m-0">
        <ModalHeader className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Create Business Listing</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Step-by-step wizard
            </span>
          </div>
          <Button
            isIconOnly
            variant="light"
            onPress={handleClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </ModalHeader>
        <ModalBody className="p-0 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <ModalListingWizard onComplete={handleComplete} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ListingWizardModal;
