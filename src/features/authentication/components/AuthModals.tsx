// 🔐 Auth Modals Component
// Location: src/features/authentication/components/AuthModals.tsx
// Purpose: Authentication modal components

import React from 'react';
import { Modal } from '@heroui/react';

interface AuthModalsProps {
  isOpen?: boolean;
  onClose?: () => void;
  type?: 'login' | 'signup' | 'forgot';
}

const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen = false,
  onClose = () => {},
  type = 'login',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {type === 'login' && 'Login'}
          {type === 'signup' && 'Sign Up'}
          {type === 'forgot' && 'Forgot Password'}
        </h2>
        <p>Auth modal content coming soon...</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </Modal>
  );
};

export { AuthModals };
export default AuthModals;
