// 🔐 Auth Modals Component - Enhanced Integration
// Location: src/features/authentication/components/AuthModals.tsx
// Purpose: Complete authentication modal system

import React from 'react';
import { useAuthModal } from '../../../shared/stores/AuthModalContext';
import { LoginModal } from './LoginModal';
import SignupModal from './SignupModal';

/**
 * Complete Authentication Modal System
 * Integrates all authentication flows: Login, Signup, Password Reset
 */
export const AuthModals: React.FC = () => {
  return (
    <>
      {/* Login Modal */}
      <LoginModal />

      {/* Signup Modal */}
      <SignupModal />

      {/* TODO: Add additional modals as needed */}
      {/* <PasswordResetModal /> */}
      {/* <ForgotPasswordModal /> */}
    </>
  );
};

export default AuthModals;
