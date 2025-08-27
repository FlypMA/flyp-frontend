import React from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuthModal } from '../../contexts/AuthModalContext';

const AuthModals: React.FC = () => {
  const { activeModal, closeModal } = useAuthModal();

  return (
    <>
      <LoginModal data-testid="login-modal" />
      <SignupModal data-testid="signup-modal" />
    </>
  );
};

export default AuthModals;
