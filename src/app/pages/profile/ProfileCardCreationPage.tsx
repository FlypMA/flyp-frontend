// 👤 Profile Card Creation Page
// Location: src/app/pages/profile/ProfileCardCreationPage.tsx
// Purpose: Dedicated page for creating profile cards

import { ProfileCardServiceModal } from '@/features/phase1/profile/profile-card-service';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCardCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen] = useState(true);

  const handleClose = () => {
    navigate('/my-business');
  };

  const handleComplete = (profileCard: any) => {
    console.log('✅ Profile card created:', profileCard);
    // Data is already saved to localStorage by the modal
    navigate('/my-business');
  };

  return (
    <ProfileCardServiceModal isOpen={isOpen} onClose={handleClose} onComplete={handleComplete} />
  );
};

export default ProfileCardCreationPage;
