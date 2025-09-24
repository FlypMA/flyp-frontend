import SellerOnboardingModal, {
  SellerFormData,
} from '@/shared/components/modals/SellerOnboardingModal';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Auto-open modal when page loads
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Navigate back to business overview when modal closes
    navigate('/my-business/overview');
  };

  const handleOnboardingComplete = (data: SellerFormData) => {
    // Here you would typically:
    // 1. Send the data to your API to create the listing
    // 2. Show success notification
    // 3. Redirect to the appropriate page

    // For now, close modal and navigate to business overview
    setIsModalOpen(false);
    navigate('/my-business/overview', {
      state: {
        message: 'Business listing created successfully!',
        listingData: data,
      },
    });
  };

  return (
    <>
      <SEOHead
        title="Create Business Listing | flyp"
        description="List your business for sale on flyp. Complete our guided process to create a professional listing that attracts qualified buyers."
        keywords="sell business, create listing, business for sale, flyp listing"
      />

      <SellerOnboardingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onComplete={handleOnboardingComplete}
      />

      {/* Fallback content or loading indicator if modal takes time to load */}
      {!isModalOpen && (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Opening listing wizard...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateListingPage;
