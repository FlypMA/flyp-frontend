import React, { useState } from 'react';
import { Button, Avatar } from '@heroui/react';
import {
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  CleanInput,
} from '../../ui';
import { User as UserType } from '../../../types/api/users/user';

interface ProfileSettingsProps {
  user: UserType;
  onSave: (data: any) => Promise<any>;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onSave }) => {
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Toast notification state
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
    show: boolean;
  }>({ type: 'success', message: '', show: false });

  // Show notification helper
  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message, show: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await onSave({ ...profileData, profileImage });
      showNotification('success', 'Profile updated successfully!');
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async () => {
    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showNotification('error', 'Password must be at least 8 characters long');
      return;
    }

    if (!passwordData.currentPassword.trim()) {
      showNotification('error', 'Current password is required');
      return;
    }
    
    setSaving(true);
    try {
      console.log('🔐 Submitting password change request');
      const result = await onSave({ passwordChange: passwordData });
      
      // Clear form only on success
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Show success message
      showNotification('success', 'Password updated successfully!');
      console.log('✅ Password change completed successfully');
      
    } catch (error: any) {
      console.error('❌ Password change failed:', error);
      
      // Show user-friendly error messages
      if (error.message.includes('current password') || error.message.includes('incorrect')) {
        showNotification('error', 'Current password is incorrect. Please try again.');
      } else if (error.message.includes('weak') || error.message.includes('format')) {
        showNotification('error', 'New password does not meet security requirements. Please choose a stronger password.');
      } else if (error.message.includes('same') || error.message.includes('different')) {
        showNotification('error', 'New password must be different from your current password.');
      } else {
        showNotification('error', 'Failed to update password. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const getUserInitials = () => {
    const name = profileData.name || user.name || 'User';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      {/* Toast Notification */}
      {notification.show && (
        <div 
          className={`fixed top-4 right-4 z-50 max-w-sm rounded-lg shadow-lg p-4 flex items-center space-x-3 transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-50 border border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-yellow-50 border border-yellow-200'
          }`}
        >
          {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
          {notification.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
          {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
          
          <span className={`text-sm font-medium ${
            notification.type === 'success' ? 'text-green-800' :
            notification.type === 'error' ? 'text-red-800' :
            'text-yellow-800'
          }`}>
            {notification.message}
          </span>
          
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className={`ml-auto text-xs ${
              notification.type === 'success' ? 'text-green-600 hover:text-green-800' :
              notification.type === 'error' ? 'text-red-600 hover:text-red-800' :
              'text-yellow-600 hover:text-yellow-800'
            }`}
          >
            ✕
          </button>
        </div>
      )}

      {/* Header - Minimalistic */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
        <p className="mt-2 text-gray-600">Manage your BetweenDeals profile</p>
      </div>

      {/* Profile Picture - Airbnb Style */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar
            size="lg"
            src={previewImage || user.avatar}
            name={getUserInitials()}
            className="w-32 h-32 text-3xl border-4 border-white shadow-lg"
            showFallback
          />
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        
        <button
          onClick={() => document.getElementById('avatar-upload')?.click()}
          className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
        >
          Update photo
        </button>
      </div>

      {/* Personal Information - Clean & Simple */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Personal information
        </h2>
        
        <div className="space-y-4">
          <CleanInput
            label="Name"
            placeholder="Your full name"
            value={profileData.name}
            onChange={value => handleInputChange('name', value)}
            size="lg"
          />

          <CleanInput
            label="Email address"
            type="email"
            placeholder="your@email.com"
            value={profileData.email}
            onChange={value => handleInputChange('email', value)}
            size="lg"
            helpText="We'll use this to send you important updates"
          />

          <CleanInput
            label="Phone number"
            type="tel"
            placeholder="+32 123 456 789 (optional)"
            value={profileData.phone}
            onChange={value => handleInputChange('phone', value)}
            size="lg"
          />
        </div>

        <div className="pt-4">
          <Button
            color="primary"
            onPress={handleSaveProfile}
            isLoading={saving}
            size="lg"
            className="w-full"
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Password Section - Secure & Simple */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Login & security
        </h2>
        
        <div className="space-y-4">
          <div className="relative">
            <CleanInput
              label="Current password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={value => handlePasswordChange('currentPassword', value)}
              size="lg"
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          <div className="relative">
            <CleanInput
              label="New password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Create new password"
              value={passwordData.newPassword}
              onChange={value => handlePasswordChange('newPassword', value)}
              size="lg"
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          <CleanInput
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
            value={passwordData.confirmPassword}
            onChange={value => handlePasswordChange('confirmPassword', value)}
            size="lg"
          />
        </div>

        <div className="pt-4">
          <Button
            variant="bordered"
            onPress={handleSavePassword}
            isLoading={saving}
            size="lg"
            className="w-full"
            isDisabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            {saving ? 'Updating...' : 'Update password'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
