import { CustomDropdown } from '@/shared/components/forms';
import { Input } from '@/shared/components/forms/Input';
import { Button, Card, CardBody, CardHeader, Divider, Switch } from '@heroui/react';
import {
  Bell,
  Building2,
  Camera,
  CheckCircle,
  Edit3,
  Eye,
  EyeOff,
  Globe,
  Save,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../../../../shared/services/auth/Auth';
import { UrlGenerator } from '../../../../shared/services/urls/urlGenerator';
import { User as UserType } from '../../../../shared/types';

const UserSettings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [settings, setSettings] = useState({
    about: {
      name: '',
      location: '',
      age: '',
      languages: ['English', 'Nederlands'],
      bio: '',
      company: '',
      position: '',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      listingUpdates: true,
      messageNotifications: true,
      priceAlerts: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowMessages: true,
      dataSharing: false,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: '30',
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'Europe/Brussels',
      currency: 'EUR',
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Mock businesses owned data
  const [businessesOwned] = useState([
    { id: 1, name: 'Tech Solutions BV', industry: 'Technology', status: 'Active' },
    { id: 2, name: 'Green Energy Co', industry: 'Renewable Energy', status: 'Sold' },
  ]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const authService = new AuthenticationService();
      const authResult = await authService.checkAuth();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
        // Pre-populate about section with user data
        setSettings(prev => ({
          ...prev,
          about: {
            ...prev.about,
            name: authResult.user.name || '',
            location: 'Neerpelt, België', // Mock location
            age: '32', // Mock age
            company: authResult.user.company_name || '',
          },
        }));
      } else {
        navigate(UrlGenerator.login());
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
      navigate(UrlGenerator.login());
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // TODO: Implement settings save API call
      // await AuthenticationService.updateUserSettings(settings);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      // TODO: Implement password change API call
      // await AuthenticationService.changePassword(passwordData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      console.log('Password changed successfully');
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your settings.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About me', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  const renderAboutSection = () => (
    <div className="space-y-6">
      {/* Profile Image Section */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
          <p className="text-sm text-gray-600">Upload a photo to personalize your profile</p>
        </div>
      </div>

      <Divider />

      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Full Name"
              value={settings.about.name}
              onChange={e => updateSetting('about', 'name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Input
              label="Location"
              value={settings.about.location}
              onChange={e => updateSetting('about', 'location', e.target.value)}
              placeholder="Enter your location"
            />
          </div>
          <div>
            <Input
              label="Age"
              type="number"
              value={settings.about.age}
              onChange={e => updateSetting('about', 'age', e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div>
            <Input
              label="Company"
              value={settings.about.company}
              onChange={e => updateSetting('about', 'company', e.target.value)}
              placeholder="Enter your company"
            />
          </div>
        </div>
      </div>

      <Divider />

      {/* Languages */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
        <div className="space-y-2">
          {settings.about.languages.map((language, index) => (
            <div key={index} className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{language}</span>
            </div>
          ))}
          <Button
            variant="bordered"
            size="sm"
            startContent={<Edit3 className="w-4 h-4" />}
            className="mt-2"
          >
            Edit Languages
          </Button>
        </div>
      </div>

      <Divider />

      {/* Identity Verification */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Verification</h3>
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-medium text-green-900">Identity Verified</p>
            <p className="text-sm text-green-700">Your identity has been verified</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Businesses Owned */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Businesses Owned</h3>
        <div className="space-y-3">
          {businessesOwned.map(business => (
            <div key={business.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Building2 className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{business.name}</p>
                <p className="text-sm text-gray-600">{business.industry}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  business.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {business.status}
              </span>
            </div>
          ))}
          <Button
            variant="bordered"
            size="sm"
            startContent={<Edit3 className="w-4 h-4" />}
            className="mt-2"
          >
            Manage Businesses
          </Button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              isSelected={settings.notifications.emailNotifications}
              onValueChange={value => updateSetting('notifications', 'emailNotifications', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Listing Updates</p>
              <p className="text-sm text-gray-600">Get notified about your listing performance</p>
            </div>
            <Switch
              isSelected={settings.notifications.listingUpdates}
              onValueChange={value => updateSetting('notifications', 'listingUpdates', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Message Notifications</p>
              <p className="text-sm text-gray-600">Get notified about new messages</p>
            </div>
            <Switch
              isSelected={settings.notifications.messageNotifications}
              onValueChange={value => updateSetting('notifications', 'messageNotifications', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Price Alerts</p>
              <p className="text-sm text-gray-600">Get notified about price changes</p>
            </div>
            <Switch
              isSelected={settings.notifications.priceAlerts}
              onValueChange={value => updateSetting('notifications', 'priceAlerts', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Marketing Emails</p>
              <p className="text-sm text-gray-600">Receive promotional content and updates</p>
            </div>
            <Switch
              isSelected={settings.notifications.marketingEmails}
              onValueChange={value => updateSetting('notifications', 'marketingEmails', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div>
            <CustomDropdown
              label="Profile Visibility"
              placeholder="Select visibility"
              options={[
                { value: 'public', label: 'Public' },
                { value: 'private', label: 'Private' },
                { value: 'contacts', label: 'Contacts Only' },
              ]}
              value={settings.privacy.profileVisibility}
              onChange={value => updateSetting('privacy', 'profileVisibility', value)}
              name="profileVisibility"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Email</p>
              <p className="text-sm text-gray-600">Display email on your profile</p>
            </div>
            <Switch
              isSelected={settings.privacy.showEmail}
              onValueChange={value => updateSetting('privacy', 'showEmail', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Phone</p>
              <p className="text-sm text-gray-600">Display phone number on your profile</p>
            </div>
            <Switch
              isSelected={settings.privacy.showPhone}
              onValueChange={value => updateSetting('privacy', 'showPhone', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Allow Messages</p>
              <p className="text-sm text-gray-600">Allow other users to message you</p>
            </div>
            <Switch
              isSelected={settings.privacy.allowMessages}
              onValueChange={value => updateSetting('privacy', 'allowMessages', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
        <div className="space-y-4">
          <div>
            <Input
              label="Current Password"
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={e =>
                setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))
              }
              placeholder="Enter current password"
              rightIcon={
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="focus:outline-none"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              }
            />
          </div>
          <div>
            <Input
              label="New Password"
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={e => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              placeholder="Enter new password"
              rightIcon={
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="focus:outline-none"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              }
            />
          </div>
          <div>
            <Input
              label="Confirm New Password"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={e =>
                setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))
              }
              placeholder="Confirm new password"
              rightIcon={
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="focus:outline-none"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              }
            />
          </div>
          <Button
            color="primary"
            onPress={handlePasswordChange}
            isLoading={saving}
            startContent={!saving && <Save className="w-4 h-4" />}
          >
            {saving ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </div>
      <Divider />
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Switch
              isSelected={settings.security.twoFactorAuth}
              onValueChange={value => updateSetting('security', 'twoFactorAuth', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Login Alerts</p>
              <p className="text-sm text-gray-600">Get notified of new login attempts</p>
            </div>
            <Switch
              isSelected={settings.security.loginAlerts}
              onValueChange={value => updateSetting('security', 'loginAlerts', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <CustomDropdown
              label="Theme"
              placeholder="Select theme"
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
              value={settings.preferences.theme}
              onChange={value => updateSetting('preferences', 'theme', value)}
              name="theme"
            />
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Localization</h3>
        <div className="space-y-4">
          <div>
            <CustomDropdown
              label="Language"
              placeholder="Select language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'nl', label: 'Nederlands' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
              ]}
              value={settings.preferences.language}
              onChange={value => updateSetting('preferences', 'language', value)}
              name="language"
            />
          </div>
          <div>
            <CustomDropdown
              label="Timezone"
              placeholder="Select timezone"
              options={[
                { value: 'Europe/Brussels', label: 'Europe/Brussels' },
                { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam' },
                { value: 'Europe/Paris', label: 'Europe/Paris' },
                { value: 'Europe/Berlin', label: 'Europe/Berlin' },
              ]}
              value={settings.preferences.timezone}
              onChange={value => updateSetting('preferences', 'timezone', value)}
              name="timezone"
            />
          </div>
          <div>
            <CustomDropdown
              label="Currency"
              placeholder="Select currency"
              options={[
                { value: 'EUR', label: 'EUR (€)' },
                { value: 'USD', label: 'USD ($)' },
                { value: 'GBP', label: 'GBP (£)' },
              ]}
              value={settings.preferences.currency}
              onChange={value => updateSetting('preferences', 'currency', value)}
              name="currency"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 shadow-sm">
              <CardBody className="p-4">
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardBody>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </h3>
                    <p className="text-gray-600 text-sm">Configure your preferences</p>
                  </div>
                  <Button
                    color="primary"
                    onPress={handleSaveSettings}
                    isLoading={saving}
                    startContent={!saving && <Save className="w-4 h-4" />}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                {activeTab === 'about' && renderAboutSection()}
                {activeTab === 'notifications' && renderNotificationsSettings()}
                {activeTab === 'privacy' && renderPrivacySettings()}
                {activeTab === 'security' && renderSecuritySettings()}
                {activeTab === 'preferences' && renderPreferencesSettings()}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
