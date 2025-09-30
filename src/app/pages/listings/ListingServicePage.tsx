// 🏢 Listing Service Page
// Location: src/app/pages/listings/ListingServicePage.tsx
// Purpose: Main listing creation wizard (7 steps) after prelude

import { ListingCreationModal } from '@/features/phase1/business/listing/listing-service';
import { BusinessType } from '@/features/phase1/business/listing/prelude';
import { UrlGenerator } from '@/shared/services';
import { authService } from '@/shared/services/auth';
import { User } from '@/shared/types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ListingServicePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [businessType, setBusinessType] = useState<BusinessType | undefined>();

  // Initialize page and check authentication
  useEffect(() => {
    const initializePage = async () => {
      try {
        // Get business type from URL parameter
        const typeParam = searchParams.get('type');
        if (!typeParam) {
          // No business type provided, redirect to prelude
          navigate(UrlGenerator.listingPrelude());
          return;
        }

        setBusinessType(typeParam as BusinessType);

        // Check authentication
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
        console.error('Error initializing listing service:', error);
        navigate('/');
      }
    };

    initializePage();
  }, [navigate, searchParams]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Navigate back to business listings
    navigate(UrlGenerator.businessListings());
  };

  const handleListingComplete = (data: any) => {
    console.log('Listing creation completed:', data);

    // Here you would typically:
    // 1. Send the data to your API to create the listing
    // 2. Show success notification
    // 3. Redirect to the appropriate page

    setIsModalOpen(false);
    navigate(UrlGenerator.businessListings(), {
      state: {
        message: 'Business listing created successfully!',
        listingData: data,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {businessType && (
        <ListingCreationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onComplete={handleListingComplete}
          businessInfo={businessInfo}
        />
      )}
    </div>
  );
};

export default ListingServicePage;
