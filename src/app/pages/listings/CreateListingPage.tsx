// Legacy import removed - using StreamlinedListingModal now
// import { ListingWizardModal } from '@/features/phase1/business/listing';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { authService } from '@/shared/services/auth';
import { User } from '@/shared/types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const navigate = useNavigate();

  // Auto-open modal when page loads
  useEffect(() => {
    const initializePage = async () => {
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);
          // TODO: Load business info from API
          // For now, use mock data
          setBusinessInfo({
            name: '',
            industry: '',
            description: '',
            foundedYear: new Date().getFullYear(),
            teamSize: '',
            location: '',
            isRemote: false,
          });
          setIsModalOpen(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    };

    initializePage();
  }, [navigate]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Navigate back to business overview when modal closes
    navigate('/my-business');
  };

  const handleListingComplete = (data: any) => {
    // Here you would typically:
    // 1. Send the data to your API to create the listing
    // 2. Show success notification
    // 3. Redirect to the appropriate page

    // For now, close modal and navigate to business overview
    setIsModalOpen(false);
    navigate('/my-business', {
      state: {
        message: 'Business listing created successfully!',
        listingData: data,
      },
    });
  };

  return (
    <>
      <SEOHead
        title="Create Business Listing | UpSwitch"
        description="List your business for sale on UpSwitch. Complete our guided process to create a professional listing that attracts qualified buyers."
        keywords="sell business, create listing, business for sale, UpSwitch listing"
      />

      {/* Legacy ListingWizardModal - now using /my-business/listings/create */}
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Please use /my-business/listings/create to create a listing</p>
      </div>

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
