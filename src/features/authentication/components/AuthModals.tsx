// 🎭 Auth Modals Container - Centralized modal management
// Location: src/features/authentication/components/AuthModals.tsx
// Purpose: Container component for all authentication modals

import React from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { AuthModalProvider } from '../hooks/useAuthModal';

const AuthModals: React.FC = () => {
  return (
    <AuthModalProvider>
      <LoginModal />
      <SignupModal />
    </AuthModalProvider>
  );
};

export default AuthModals;
