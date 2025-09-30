// 🏢 Demo Business Type Selection - Standalone Component
// Location: src/features/phase1/business/listing/components/DemoBusinessTypeSelection.tsx
// Purpose: Demo component showing the business type selection in action

import React, { useState } from 'react';
import { BusinessType } from '../types/PreludeTypes';
import BusinessTypeSelectionPage from './BusinessTypeSelectionPage';

const DemoBusinessTypeSelection: React.FC = () => {
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | undefined>();

  const handleBusinessTypeSelect = (businessType: BusinessType) => {
    setSelectedBusinessType(businessType);
    console.log('Selected business type:', businessType);

    // Show success message
    alert(
      `Great! You selected: ${businessType}. This would continue to the next step in the listing creation flow.`
    );
  };

  const handleBack = () => {
    console.log('Back button clicked');
    alert('Back button clicked - this would navigate back to the previous page.');
  };

  return (
    <BusinessTypeSelectionPage
      onBusinessTypeSelect={handleBusinessTypeSelect}
      onBack={handleBack}
      selectedBusinessType={selectedBusinessType}
    />
  );
};

export default DemoBusinessTypeSelection;
