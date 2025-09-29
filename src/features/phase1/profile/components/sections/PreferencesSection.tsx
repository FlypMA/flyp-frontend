/**
 * ⚙️ Preferences Section
 * 
 * Comprehensive preferences management for user experience
 * Handles notifications, privacy, language, and app preferences
 * 
 * @author Senior CTO
 * @version 1.0.0
 */

import { Button } from '@/shared/components/buttons';
import { CustomDropdown } from '@/shared/components/forms';
import { Switch } from '@heroui/react';
import {
    Bell,
    Mail,
    MessageSquare,
    Moon,
    Shield,
    Smartphone,
    Sun
} from 'lucide-react';
import React, { useState } from 'react';

import { useAuth } from '@/app/providers/auth-provider';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface PreferencesSectionProps {
  className?: string;
}

interface NotificationSettings {
  email: {
    newMessages: boolean;
    businessUpdates: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
  };
  push: {
    newMessages: boolean;
    businessUpdates: boolean;
    reminders: boolean;
  };
  sms: {
    securityAlerts: boolean;
    importantUpdates: boolean;
  };
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
  shareAnalytics: boolean;
}

// =============================================================================
// PREFERENCES SECTION COMPONENT
// =============================================================================

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({ 
  className = '' 
}) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Europe/Amsterdam');
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: {
      newMessages: true,
      businessUpdates: true,
      marketingEmails: false,
      securityAlerts: true,
    },
    push: {
      newMessages: true,
      businessUpdates: false,
      reminders: true,
    },
    sms: {
      securityAlerts: true,
      importantUpdates: false,
    },
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareAnalytics: true,
  });

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleNotificationChange = (
    category: keyof NotificationSettings,
    setting: string,
    value: boolean
  ) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handlePrivacyChange = (setting: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSavePreferences = () => {
    // TODO: Implement preferences save logic
    console.log('Saving preferences:', {
      notifications,
      privacy,
      language,
      timezone,
      isDarkMode,
    });
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderAppearanceSection = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        {isDarkMode ? (
          <Moon className="w-6 h-6 text-gray-600" />
        ) : (
          <Sun className="w-6 h-6 text-gray-600" />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
          <p className="text-sm text-gray-600">Customize how the app looks and feels</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">Dark Mode</label>
            <p className="text-xs text-gray-500">Switch between light and dark themes</p>
          </div>
          <Switch
            isSelected={isDarkMode}
            onValueChange={setIsDarkMode}
            color="primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <CustomDropdown
              label=""
              value={language}
              onChange={setLanguage}
              options={[
                { value: 'en', label: 'English' },
                { value: 'nl', label: 'Nederlands' },
                { value: 'de', label: 'Deutsch' },
                { value: 'fr', label: 'Français' },
              ]}
              placeholder="Select language"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <CustomDropdown
              label=""
              value={timezone}
              onChange={setTimezone}
              options={[
                { value: 'Europe/Amsterdam', label: 'Amsterdam (CET)' },
                { value: 'Europe/London', label: 'London (GMT)' },
                { value: 'America/New_York', label: 'New York (EST)' },
                { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
                { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
              ]}
              placeholder="Select timezone"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSection = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Bell className="w-6 h-6 text-gray-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <p className="text-sm text-gray-600">Choose how you want to be notified</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-gray-600" />
            <h4 className="text-md font-medium text-gray-900">Email Notifications</h4>
          </div>
          <div className="space-y-4 ml-7">
            {Object.entries(notifications.email).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                </div>
                <Switch
                  isSelected={value}
                  onValueChange={(checked) => handleNotificationChange('email', key, checked)}
                  color="primary"
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <h4 className="text-md font-medium text-gray-900">Push Notifications</h4>
          </div>
          <div className="space-y-4 ml-7">
            {Object.entries(notifications.push).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                </div>
                <Switch
                  isSelected={value}
                  onValueChange={(checked) => handleNotificationChange('push', key, checked)}
                  color="primary"
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <h4 className="text-md font-medium text-gray-900">SMS Notifications</h4>
          </div>
          <div className="space-y-4 ml-7">
            {Object.entries(notifications.sms).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                </div>
                <Switch
                  isSelected={value}
                  onValueChange={(checked) => handleNotificationChange('sms', key, checked)}
                  color="primary"
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-gray-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
          <p className="text-sm text-gray-600">Control your privacy and data sharing</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Visibility
          </label>
          <CustomDropdown
            label=""
            value={privacy.profileVisibility}
            onChange={(value) => handlePrivacyChange('profileVisibility', value)}
            options={[
              { value: 'public', label: 'Public - Anyone can see your profile' },
              { value: 'private', label: 'Private - Only you can see your profile' },
              { value: 'contacts', label: 'Contacts - Only your contacts can see your profile' },
            ]}
            placeholder="Select visibility"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Show Online Status</label>
              <p className="text-xs text-gray-500">Let others see when you're online</p>
            </div>
            <Switch
              isSelected={privacy.showOnlineStatus}
              onValueChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
              color="primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Allow Direct Messages</label>
              <p className="text-xs text-gray-500">Let others send you direct messages</p>
            </div>
            <Switch
              isSelected={privacy.allowDirectMessages}
              onValueChange={(checked) => handlePrivacyChange('allowDirectMessages', checked)}
              color="primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Share Analytics</label>
              <p className="text-xs text-gray-500">Help improve the app by sharing usage data</p>
            </div>
            <Switch
              isSelected={privacy.shareAnalytics}
              onValueChange={(checked) => handlePrivacyChange('shareAnalytics', checked)}
              color="primary"
            />
          </div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Preferences</h1>
        <p className="text-gray-600">
          Customize your app experience, notifications, and privacy settings
        </p>
      </div>

      {/* Appearance Section */}
      {renderAppearanceSection()}

      {/* Notification Section */}
      {renderNotificationSection()}

      {/* Privacy Section */}
      {renderPrivacySection()}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSavePreferences}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSection;
