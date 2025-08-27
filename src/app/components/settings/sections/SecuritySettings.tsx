import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Switch, Badge, Chip } from '@heroui/react';
import {
  Lock,
  Shield,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Monitor,
  MapPin,
} from 'lucide-react';
import { EnhancedInput, FormTip } from '../../forms/EnhancedFormFields';

interface SecuritySettingsProps {
  onSave: (data: any) => Promise<void>;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onSave }) => {
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    secureDataAccess: true,
    sessionTimeout: '8_hours',
  });

  // Mock session data
  const activeSessions = [
    {
      id: '1',
      device: 'MacBook Pro',
      browser: 'Chrome 120',
      location: 'Brussels, Belgium',
      ip: '192.168.1.1',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      id: '2',
      device: 'iPhone 15 Pro',
      browser: 'Safari',
      location: 'Brussels, Belgium',
      ip: '192.168.1.2',
      lastActive: '1 hour ago',
      current: false,
    },
    {
      id: '3',
      device: 'Windows PC',
      browser: 'Edge 120',
      location: 'Antwerp, Belgium',
      ip: '10.0.0.1',
      lastActive: '3 days ago',
      current: false,
    },
  ];

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityToggle = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleChangePassword = async () => {
    setSaving(true);
    try {
      // Validate passwords match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await onSave({
        type: 'password',
        data: passwordData,
      });

      // Clear form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecuritySettings = async () => {
    setSaving(true);
    try {
      await onSave({
        type: 'security',
        data: securitySettings,
      });
    } finally {
      setSaving(false);
    }
  };

  const terminateSession = (sessionId: string) => {
    // Handle session termination
    console.log('Terminating session:', sessionId);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: 'default' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'danger' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: 'warning' };
    if (password.length < 14) return { strength: 75, label: 'Good', color: 'primary' };
    return { strength: 100, label: 'Strong', color: 'success' };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account security and authentication preferences
        </p>
      </div>

      {/* Password Section */}
      <Card className="border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold text-gray-900">Password</h3>
            <Badge color="success" variant="flat">
              <CheckCircle className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <EnhancedInput
              label="Current Password"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={value => handlePasswordChange('currentPassword', value)}
              name="currentPassword"
              required
              icon={<Lock className="w-4 h-4 text-default-400" />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4 text-default-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-default-400" />
                  )}
                </button>
              }
            />

            <EnhancedInput
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={value => handlePasswordChange('newPassword', value)}
              name="newPassword"
              required
              icon={<Key className="w-4 h-4 text-default-400" />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 text-default-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-default-400" />
                  )}
                </button>
              }
              description="Use at least 12 characters with mix of letters, numbers and symbols"
            />

            {/* Password Strength Indicator */}
            {passwordData.newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Password strength</span>
                  <Chip size="sm" color={passwordStrength.color as any} variant="flat">
                    {passwordStrength.label}
                  </Chip>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.color === 'danger'
                        ? 'bg-red-500'
                        : passwordStrength.color === 'warning'
                          ? 'bg-yellow-500'
                          : passwordStrength.color === 'primary'
                            ? 'bg-blue-500'
                            : passwordStrength.color === 'success'
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                    }`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  />
                </div>
              </div>
            )}

            <EnhancedInput
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={value => handlePasswordChange('confirmPassword', value)}
              name="confirmPassword"
              required
              error={
                passwordData.confirmPassword &&
                passwordData.newPassword !== passwordData.confirmPassword
                  ? 'Passwords do not match'
                  : undefined
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-default-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-default-400" />
                  )}
                </button>
              }
            />
          </div>

          <div className="pt-4">
            <Button
              color="primary"
              onPress={handleChangePassword}
              isLoading={saving}
              isDisabled={
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                passwordData.newPassword !== passwordData.confirmPassword
              }
            >
              Update Password
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h3>
            {securitySettings.twoFactorEnabled ? (
              <Badge color="success" variant="flat">
                <Shield className="w-3 h-3 mr-1" />
                Enabled
              </Badge>
            ) : (
              <Badge color="warning" variant="flat">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Authenticator App</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Use an authenticator app like Google Authenticator or Authy for an extra layer of
                  security.
                </p>
                {securitySettings.twoFactorEnabled && (
                  <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Two-factor authentication is active
                  </p>
                )}
              </div>
            </div>
            <Switch
              isSelected={securitySettings.twoFactorEnabled}
              onValueChange={value => handleSecurityToggle('twoFactorEnabled', value)}
              color="success"
            />
          </div>

          {!securitySettings.twoFactorEnabled && (
            <div className="mt-4">
              <Button color="primary" variant="flat" startContent={<Shield className="w-4 h-4" />}>
                Set Up 2FA
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Security Preferences */}
      <Card className="border border-gray-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">Security Preferences</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Login Notifications</h4>
                <p className="text-sm text-gray-600">
                  Get notified when someone signs into your account
                </p>
              </div>
              <Switch
                isSelected={securitySettings.loginNotifications}
                onValueChange={value => handleSecurityToggle('loginNotifications', value)}
                color="primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Secure Data Access</h4>
                <p className="text-sm text-gray-600">
                  Require additional verification for sensitive actions
                </p>
              </div>
              <Switch
                isSelected={securitySettings.secureDataAccess}
                onValueChange={value => handleSecurityToggle('secureDataAccess', value)}
                color="primary"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              color="primary"
              variant="flat"
              onPress={handleSaveSecuritySettings}
              isLoading={saving}
            >
              Save Security Preferences
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Active Sessions */}
      <Card className="border border-gray-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">Active Sessions</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {activeSessions.map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Monitor className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{session.device}</h4>
                      {session.current && (
                        <Chip size="sm" color="success" variant="flat">
                          Current
                        </Chip>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {session.browser}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {session.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>IP: {session.ip}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {!session.current && (
                  <Button
                    size="sm"
                    variant="bordered"
                    color="danger"
                    onPress={() => terminateSession(session.id)}
                  >
                    Terminate
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button
              color="danger"
              variant="bordered"
              startContent={<AlertTriangle className="w-4 h-4" />}
            >
              Terminate All Other Sessions
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Security Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormTip
          title="Strong Password"
          content="Use a unique password with at least 12 characters, including uppercase, lowercase, numbers, and symbols."
          type="info"
        />
        <FormTip
          title="Two-Factor Authentication"
          content="Enable 2FA for an extra layer of security. Even if someone gets your password, they won't be able to access your account."
          type="warning"
        />
      </div>
    </div>
  );
};

export default SecuritySettings;
