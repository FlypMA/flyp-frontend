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
import { CustomPasswordInputField } from '@/shared/components/forms';
import { Key } from 'lucide-react';
import React, { useState } from 'react';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface SecuritySectionProps {
  className?: string;
}

// =============================================================================
// SECURITY SECTION COMPONENT
// =============================================================================

export const SecuritySection: React.FC<SecuritySectionProps> = ({ className = '' }) => {
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
    // Password change logic will be implemented here
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

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
        <CustomPasswordInputField
          label="Current Password"
          value={passwordForm.currentPassword}
          onChange={e => handlePasswordChange('currentPassword', e.target.value)}
          onBlur={() => {}}
          name="currentPassword"
          placeholder="Enter your current password"
          className="w-full"
        />

        <CustomPasswordInputField
          label="New Password"
          value={passwordForm.newPassword}
          onChange={e => handlePasswordChange('newPassword', e.target.value)}
          onBlur={() => {}}
          name="newPassword"
          placeholder="Enter your new password"
          className="w-full"
          showPasswordStrength={true}
        />

        <CustomPasswordInputField
          label="Confirm New Password"
          value={passwordForm.confirmPassword}
          onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
          onBlur={() => {}}
          name="confirmPassword"
          placeholder="Confirm your new password"
          className="w-full"
        />

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
            Update Password
          </Button>
        </div>
      </form>
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

      {/* Password Section */}
      {renderPasswordSection()}

      {/* Login Activity */}
      {renderLoginActivity()}
    </div>
  );
};

export default SecuritySection;
