// 🏢 Business Card Creation Page
// Location: src/app/pages/business/card/BusinessCardCreationPage.tsx
// Purpose: Page wrapper for business card creation flow
// Note: Part of Phase 3 - Dashboard Integration

import type { BusinessCard } from '@/features/phase1/business/card';
import { BusinessCardFlow } from '@/features/phase1/business/card';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessCardCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFlowOpen] = useState(true);

  const handleComplete = async (card: BusinessCard) => {
    console.log('Business card created:', card);

    // TODO: Save to backend
    // await api.businessCards.create(card);

    // For now, save to localStorage for demo
    localStorage.setItem('businessCard', JSON.stringify(card));
    localStorage.setItem('hasBusinessCard', 'true');

    // Navigate to dashboard
    navigate('/my-business');

    // Show success notification
    // TODO: Add toast notification
    console.log('✅ Business card saved successfully!');
  };

  const handleClose = () => {
    // Navigate back to dashboard
    navigate('/my-business');
  };

  return <BusinessCardFlow isOpen={isFlowOpen} onClose={handleClose} onComplete={handleComplete} />;
};

export default BusinessCardCreationPage;
