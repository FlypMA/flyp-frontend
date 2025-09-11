// 🔐 Login Modal Component - Reconstructed
// Location: src/features/authentication/components/LoginModal.tsx
// Purpose: Modal wrapper for LoginForm with authentication integration

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import { useAuthModal } from '../../../shared/stores/AuthModalContext';
// Create a simple inline login form since LoginForm doesn't exist
// import { LoginForm } from './LoginForm'; // TODO: Fix import

// Simple inline login form component
const LoginForm: React.FC<{
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
}> = ({ onSubmit, loading = false }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(email, password);
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};
import { useNavigate } from 'react-router-dom';

export const LoginModal: React.FC = () => {
  const { isLoginOpen, closeAll } = useAuthModal();
  const navigate = useNavigate();

  const handleLoginSuccess = async (email: string, password: string) => {
    // TODO: Implement actual authentication service
    console.log('Login attempt:', { email, password });

    // Simulate successful login
    // In real implementation, this would call authService.login()
    try {
      // Placeholder for authentication logic
      localStorage.setItem('auth_token', 'mock-token');
      localStorage.setItem('user_email', email);

      // Close modal and navigate
      closeAll();
      navigate('/dashboard');

      // Dispatch user login event
      window.dispatchEvent(
        new CustomEvent('user-login', {
          detail: { email, id: 'mock-user-id' },
        })
      );
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return (
    <Modal isOpen={isLoginOpen} onOpenChange={closeAll} placement="center" backdrop="blur">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-gray-600">Sign in to your Flyp account</p>
            </ModalHeader>
            <ModalBody className="pb-6">
              <LoginForm onSubmit={handleLoginSuccess} loading={false} />

              {/* Footer */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      // TODO: Switch to signup modal
                      console.log('Switch to signup');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
