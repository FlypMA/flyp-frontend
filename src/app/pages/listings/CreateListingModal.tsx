import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingWizardModal from '../../components/modals/ListingWizardModal';

const CreateListingModal: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Automatically open the modal when the component mounts
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // The modal component will handle navigation back to dashboard
  };

  // Show a loading state while the modal is opening
  if (!isModalOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Opening listing wizard...</p>
        </div>
      </div>
    );
  }

  return <ListingWizardModal isOpen={isModalOpen} onClose={handleCloseModal} />;
};

export default CreateListingModal;
