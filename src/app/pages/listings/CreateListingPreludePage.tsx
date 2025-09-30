// 🏢 Create Listing Prelude Page
// Location: src/app/pages/listings/CreateListingPreludePage.tsx
// Purpose: Demo page for the listing creation prelude flow

import { BusinessType, PreludeFlow } from '@/features/phase1/business/listing/prelude';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListingPreludePage: React.FC = () => {
  const navigate = useNavigate();
  const [isPreludeOpen, setIsPreludeOpen] = useState(true);

  const handlePreludeComplete = (businessType: BusinessType) => {
    console.log('Prelude completed with business type:', businessType);
    setIsPreludeOpen(false);

    // In a real app, this would open the ListingCreationModal
    // or navigate to the listing service wizard
    alert(`Business type selected: ${businessType}\n\nNext: Open listing service wizard`);

    // Navigate to business listings page
    navigate('/business/listings');
  };

  const handlePreludeClose = () => {
    console.log('Prelude closed');
    setIsPreludeOpen(false);
    navigate('/business/overview');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Listing Prelude Demo</h1>
        <p className="text-gray-600 mb-8">
          This demonstrates the 2-step prelude flow for business type selection
        </p>

        {!isPreludeOpen && (
          <button
            onClick={() => setIsPreludeOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Prelude Flow
          </button>
        )}
      </div>

      <PreludeFlow
        isOpen={isPreludeOpen}
        onClose={handlePreludeClose}
        onComplete={handlePreludeComplete}
      />
    </div>
  );
};

export default CreateListingPreludePage;
