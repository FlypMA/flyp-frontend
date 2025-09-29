/**
 * 🔒 Security Section
 * 
 * Comprehensive security management for user accounts
 * Handles password changes, 2FA, and security settings
 * 
 * @author Senior CTO
 * @version 1.0.0
 */

import { Button } from '@/shared/components/buttons';
import { CustomInputField } from '@/shared/components/forms';
import {
    AlertTriangle,
    CheckCircle,
    Eye,
    EyeOff,
    Key,
    Shield,
    Smartphone
} from 'lucide-react';
import React, { useState } from 'react';

import { useAuth } from '@/app/providers/auth-provider';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface SecuritySectionProps {
  className?: string;
}

// =============================================================================
// SECURITY SECTION COMPONENT
// =============================================================================

export const SecuritySection: React.FC<SecuritySectionProps> = ({ 
  className = '' 
}) => {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password change logic
    console.log('Changing password:', passwordForm);
  };

  const handleEnable2FA = () => {
    // TODO: Implement 2FA setup
    console.log('Enabling 2FA');
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderSecurityOverview = () => (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Account Security Status
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Email verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-gray-700">Two-factor authentication not enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Strong password policy enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPasswordSection = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Key className="w-6 h-6 text-gray-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
        </div>
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <CustomInputField
              type={showCurrentPassword ? 'text' : 'password'}
              value={passwordForm.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              placeholder="Enter your current password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showCurrentPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <CustomInputField
              type={showNewPassword ? 'text' : 'password'}
              value={passwordForm.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              placeholder="Enter your new password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters with uppercase, lowercase, number, and special character
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <CustomInputField
              type={showConfirmPassword ? 'text' : 'password'}
              value={passwordForm.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              placeholder="Confirm your new password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );

  const renderTwoFactorSection = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Smartphone className="w-6 h-6 text-gray-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
        </div>
        <Button
          onClick={handleEnable2FA}
          variant="tertiary"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Enable 2FA
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800">
              <strong>Recommended:</strong> Enable two-factor authentication to significantly improve your account security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginActivity = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Login Activity</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-900">Current session</p>
            <p className="text-xs text-gray-500">Chrome on macOS • Amsterdam, Netherlands</p>
          </div>
          <span className="text-xs text-green-600 font-medium">Active now</span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-900">Previous session</p>
            <p className="text-xs text-gray-500">Safari on iPhone • Amsterdam, Netherlands</p>
          </div>
          <span className="text-xs text-gray-500">2 hours ago</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Previous session</p>
            <p className="text-xs text-gray-500">Chrome on Windows • Rotterdam, Netherlands</p>
          </div>
          <span className="text-xs text-gray-500">1 day ago</span>
        </div>
      </div>
    </div>
  );

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className={`max-w-4xl mx-auto p-8 ${className}`}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security</h1>
        <p className="text-gray-600">
          Manage your account security settings and authentication methods
        </p>
      </div>

      {/* Security Overview */}
      {renderSecurityOverview()}

      {/* Password Section */}
      {renderPasswordSection()}

      {/* Two-Factor Authentication */}
      {renderTwoFactorSection()}

      {/* Login Activity */}
      {renderLoginActivity()}
    </div>
  );
};

export default SecuritySection;
