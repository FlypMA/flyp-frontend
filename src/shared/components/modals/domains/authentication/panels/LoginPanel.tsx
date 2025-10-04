/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 🔐 Login Panel Component
 * Location: src/shared/components/modals/domains/authentication/panels/LoginPanel.tsx
 * Purpose: Login form panel for TwoPanelModal
 */

import { Button } from '@/shared/components/buttons';
import React, { useState } from 'react';
import { CustomInputField, CustomPasswordInputField } from '../../../../forms';

interface LoginPanelProps {
  onClose: () => void;
  onSuccess?: (user: unknown) => void;
  onSwitchToSignup?: () => void;
  redirectPath?: string;
}

export const LoginPanel: React.FC<LoginPanelProps> = ({
  onClose,
  onSuccess,
  onSwitchToSignup,
  redirectPath,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual login logic
      onSuccess?.({}); // Mock success
      onClose();
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 px-8 py-12">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your Upswitch account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomInputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              onBlur={() => {}}
              required
            />

            <CustomPasswordInputField
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              onBlur={() => {}}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-4">
            <button type="button" className="text-sm text-primary-600 hover:text-primary-700">
              Forgot your password?
            </button>

            {onSwitchToSignup && (
              <div className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
