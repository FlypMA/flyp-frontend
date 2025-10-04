/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 🔐 Signup Panel Component
 * Location: src/shared/components/modals/domains/authentication/panels/SignupPanel.tsx
 * Purpose: Signup form panel for TwoPanelModal
 */

import { Button } from '@/shared/components/buttons';
import React, { useState } from 'react';
import { CustomInputField, CustomPasswordInputField } from '../../../../forms';

interface SignupPanelProps {
  onClose: () => void;
  onSuccess?: (user: unknown) => void;
  onSwitchToLogin?: () => void;
  redirectPath?: string;
}

export const SignupPanel: React.FC<SignupPanelProps> = ({
  onClose,
  onSuccess,
  onSwitchToLogin,
  redirectPath,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual signup logic
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join UpSwitch</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomInputField
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              onBlur={() => {}}
              required
            />

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

            <CustomPasswordInputField
              label="Confirm Password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
              Create Account
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            {onSwitchToLogin && (
              <div className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="mt-6 text-xs text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-primary-600 hover:text-primary-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary-600 hover:text-primary-700">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPanel;
