// 🏢 Listing Prelude Page
// Location: src/app/pages/listings/ListingPreludePage.tsx
// Purpose: Entry point for listing creation - business type selection and confirmation

import { PreludeFlow } from '@/features/phase1/business/listing/prelude';
import { UrlGenerator } from '@/shared/services';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListingPreludePage: React.FC = () => {
  const navigate = useNavigate();
  const [isPreludeOpen, setIsPreludeOpen] = useState(true);

  const handlePreludeComplete = (businessType: string) => {
    console.log('Prelude completed with business type:', businessType);
    setIsPreludeOpen(false);

    // Navigate to listing service with selected business type
    navigate(UrlGenerator.listingService(businessType));
  };

  const handlePreludeClose = () => {
    console.log('Prelude closed');
    setIsPreludeOpen(false);
    // Navigate back to listings management
    navigate(UrlGenerator.businessListings());
  };

  return (
    <PreludeFlow
      isOpen={isPreludeOpen}
      onClose={handlePreludeClose}
      onComplete={handlePreludeComplete}
    />
  );
};

export default ListingPreludePage;
