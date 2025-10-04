/* eslint-disable @typescript-eslint/no-unused-vars */
// 🏢 Create Listing Flow Page - Full Page Experience
// Location: src/app/pages/listings/CreateListingFlowPage.tsx
// Purpose: Full-page listing creation flow starting with business type selection

// Legacy import removed
// import { ListingCreationFlow } from '@/features/phase1/business/listing/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListingFlowPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    console.log('Listing created:', data);
    // Navigate back to dashboard or show success message
    navigate('/business/overview');
  };

  const handleClose = () => {
    // Navigate back to previous page
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Please use /my-business/listings/create to create a listing</p>
    </div>
    /* <ListingCreationFlow
      onComplete={handleComplete}
      onClose={handleClose}
      businessInfo={{
        name: 'My Business',
        industry: 'Technology',
        description: 'A great business',
        foundedYear: 2020,
        teamSize: '2-5 employees',
        location: 'Brussels, Belgium',
        isRemote: true,
        website: 'https://mybusiness.com',
      }}
      valuationData={{
        businessType: 'company',
        sharesForSale: 100,
        revenue2025: 500000,
        revenue2024: 400000,
        revenue2023: 300000,
        ebitda2025: 100000,
        ebitda2024: 80000,
        ebitda2023: 60000,
        estimated_value: 1000000,
        valuation_confidence: 'high',
        valuation_methodology: 'DCF',
      }}
    /> */
  );
};

export default CreateListingFlowPage;
