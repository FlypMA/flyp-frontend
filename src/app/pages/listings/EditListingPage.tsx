/* eslint-disable @typescript-eslint/no-unused-vars */
// Legacy import removed
// import { ListingWizardModal } from '@/features/phase1/business/listing';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { authService } from '@/shared/services/auth';
import { User } from '@/shared/types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EditListingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get('id');

  // Load existing listing data and auto-open modal
  useEffect(() => {
    const loadExistingListing = async () => {
      if (!listingId) {
        navigate('/my-business/overview');
        return;
      }

      try {
        // TODO: Replace with actual API call to fetch listing data

        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // Mock data for now - replace with actual API call
          setBusinessInfo({
            name: 'Example Tech Company',
            industry: 'Technology',
            description:
              'A innovative technology company specializing in software solutions for small and medium businesses.',
            foundedYear: 2018,
            teamSize: '6-20',
            location: 'Brussels, Belgium',
            isRemote: false,
          });
          setIsModalOpen(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        // Navigate back on error
        navigate('/my-business');
      } finally {
        // No loading state to manage
      }
    };

    loadExistingListing();
  }, [listingId, navigate]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Navigate back to business overview when modal closes
    navigate('/my-business');
  };

  const handleListingSave = async (data: any) => {
    try {
      // TODO: Replace with actual API call to update listing
      // const response = await fetch(`/api/listings/${listingId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // Mock API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Close modal and navigate back with success message
      setIsModalOpen(false);
      navigate('/my-business', {
        state: {
          message: 'Your business listing has been saved successfully!',
          type: 'success',
          listingData: data,
        },
      });
    } catch (error) {
      // TODO: Show error state in modal instead of failing silently
      // For now, show generic error
      alert('Failed to save listing changes. Please try again.');
    }
  };

  // Loading screens removed for smooth user experience

  return (
    <>
      <SEOHead
        title="Edit Business Listing | UpSwitch"
        description="Update your business listing on UpSwitch. Modify your listing details to attract the right buyers."
        keywords="edit business listing, update listing, business for sale, UpSwitch"
      />

      {/* Legacy ListingWizardModal - edit functionality to be implemented */}
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Edit listing functionality coming soon</p>
      </div>
      {/* <ListingWizardModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onComplete={handleListingSave}
        businessInfo={businessInfo}
      />

      {/* Fallback content if modal is not open */}
      {!isModalOpen && (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Opening listing editor...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditListingPage;
