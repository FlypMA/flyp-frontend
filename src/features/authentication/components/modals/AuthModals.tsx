// 🎭 Auth Modals Container - Centralized modal management
// Location: src/features/authentication/components/AuthModals.tsx
// Purpose: Container component for all authentication modals

import * as React from 'react';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';

const AuthModals: React.FC = () => {
  return (
    <>
      <LoginModal />
      <SignupModal />
    </>
  );
};

export default AuthModals;
