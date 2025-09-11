import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Switch, Select, SelectItem } from '@heroui/react';
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Building2,
  TrendingUp,
  AlertCircle,
  Clock,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface NotificationSettingsProps {
  onSave: (data: any) => Promise<void>;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onSave }) => {
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    // Email notifications
    email: {
      newListings: true,
      matchingSearches: true,
      inquiries: true,
      messages: true,
      marketUpdates: false,
      weeklyDigest: true,
      securityAlerts: true,
      accountUpdates: true,
    },
    // Push notifications
    push: {
      newListings: false,
      matchingSearches: true,
      inquiries: true,
      messages: true,
      marketUpdates: false,
      securityAlerts: true,
    },
    // SMS notifications
    sms: {
      securityAlerts: true,
      criticalUpdates: false,
    },
    // Preferences
    emailFrequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00',
    },
    timezone: 'Europe/Brussels',
  });

  const handleNotificationToggle = (
    category: 'email' | 'push' | 'sms',
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

  const handlePreferenceChange = (setting: string, value: any) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleQuietHoursToggle = (enabled: boolean) => {
    setNotifications(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        enabled,
      },
    }));
  };

  const handleQuietHoursChange = (field: 'start' | 'end', value: string) => {
    setNotifications(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(notifications);
    } finally {
      setSaving(false);
    }
  };

  const notificationCategories = [
    {
      title: 'Business Listings',
      icon: Building2,
      items: [
        {
          key: 'newListings',
          label: 'New Business Listings',
          description: 'Get notified when new businesses are listed in your areas of interest',
          email: true,
          push: true,
          sms: false,
        },
        {
          key: 'matchingSearches',
          label: 'Matching Search Alerts',
          description: 'Notifications when new listings match your saved searches',
          email: true,
          push: true,
          sms: false,
        },
      ],
    },
    {
      title: 'Communications',
      icon: MessageSquare,
      items: [
        {
          key: 'inquiries',
          label: 'New Inquiries',
          description: 'When someone shows interest in your listing or sends you an inquiry',
          email: true,
          push: true,
          sms: false,
        },
        {
          key: 'messages',
          label: 'Direct Messages',
          description: 'New messages in your conversations with other users',
          email: true,
          push: true,
          sms: false,
        },
      ],
    },
    {
      title: 'Market Intelligence',
      icon: TrendingUp,
      items: [
        {
          key: 'marketUpdates',
          label: 'Market Updates',
          description: 'Weekly market trends, pricing insights, and industry news',
          email: true,
          push: true,
          sms: false,
        },
        {
          key: 'weeklyDigest',
          label: 'Weekly Digest',
          description: 'Summary of your activity, new opportunities, and market highlights',
          email: true,
          push: false,
          sms: false,
        },
      ],
    },
    {
      title: 'Security & Account',
      icon: AlertCircle,
      items: [
        {
          key: 'securityAlerts',
          label: 'Security Alerts',
          description: 'Login attempts, password changes, and security-related events',
          email: true,
          push: true,
          sms: true,
        },
        {
          key: 'accountUpdates',
          label: 'Account Updates',
          description: 'Changes to your account, subscription, or profile verification',
          email: true,
          push: false,
          sms: false,
        },
        {
          key: 'criticalUpdates',
          label: 'Critical Updates',
          description: 'Important platform announcements and service updates',
          email: false,
          push: false,
          sms: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-600 mt-2">
          Choose how and when you want to receive notifications about your BetweenDeals activity
        </p>
      </div>

      {/* Notification Categories */}
      {notificationCategories.map(category => {
        const CategoryIcon = category.icon;
        return (
          <Card
            key={category.title}
            className="bg-gradient-to-br from-white to-gray-50 shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 ring-1 ring-gray-100"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <CategoryIcon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {category.items.map(item => (
                  <div key={item.key} className="border border-gray-200 rounded-xl p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {item.email && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">Email</span>
                          </div>
                          <Switch
                            size="sm"
                            isSelected={
                              notifications.email[
                                item.key as keyof typeof notifications.email
                              ] as boolean
                            }
                            onValueChange={value =>
                              handleNotificationToggle('email', item.key, value)
                            }
                            color="primary"
                          />
                        </div>
                      )}

                      {item.push && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">Push</span>
                          </div>
                          <Switch
                            size="sm"
                            isSelected={
                              notifications.push[
                                item.key as keyof typeof notifications.push
                              ] as boolean
                            }
                            onValueChange={value =>
                              handleNotificationToggle('push', item.key, value)
                            }
                            color="primary"
                          />
                        </div>
                      )}

                      {item.sms && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">SMS</span>
                          </div>
                          <Switch
                            size="sm"
                            isSelected={
                              notifications.sms[
                                item.key as keyof typeof notifications.sms
                              ] as boolean
                            }
                            onValueChange={value =>
                              handleNotificationToggle('sms', item.key, value)
                            }
                            color="primary"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        );
      })}

      {/* Notification Preferences */}
      <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 ring-1 ring-gray-100">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Preferences</h3>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Email Frequency
              </label>
              <Select
                selectedKeys={[notifications.emailFrequency]}
                onSelectionChange={keys =>
                  handlePreferenceChange('emailFrequency', Array.from(keys)[0])
                }
                placeholder="Select frequency"
                variant="bordered"
                classNames={{
                  trigger: 'border-gray-300',
                  value: 'text-gray-900',
                }}
              >
                <SelectItem key="immediate">Immediate</SelectItem>
                <SelectItem key="daily">Daily digest</SelectItem>
                <SelectItem key="weekly">Weekly digest</SelectItem>
                <SelectItem key="never">Never</SelectItem>
              </Select>
              <p className="text-xs text-gray-600 mt-1">
                How often you receive email notifications
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">Timezone</label>
              <Select
                selectedKeys={[notifications.timezone]}
                onSelectionChange={keys => handlePreferenceChange('timezone', Array.from(keys)[0])}
                placeholder="Select timezone"
                variant="bordered"
                classNames={{
                  trigger: 'border-gray-300',
                  value: 'text-gray-900',
                }}
              >
                <SelectItem key="Europe/Brussels">Brussels (CET)</SelectItem>
                <SelectItem key="Europe/Amsterdam">Amsterdam (CET)</SelectItem>
                <SelectItem key="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem key="Europe/Berlin">Berlin (CET)</SelectItem>
                <SelectItem key="Europe/London">London (GMT)</SelectItem>
              </Select>
              <p className="text-xs text-gray-600 mt-1">Used for scheduling notifications</p>
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  {notifications.quietHours.enabled ? (
                    <VolumeX className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-indigo-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quiet Hours</h4>
                  <p className="text-sm text-gray-600">
                    Pause non-urgent notifications during specific hours
                  </p>
                </div>
              </div>
              <Switch
                isSelected={notifications.quietHours.enabled}
                onValueChange={handleQuietHoursToggle}
                color="primary"
              />
            </div>

            {notifications.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Start Time</label>
                  <input
                    type="time"
                    value={notifications.quietHours.start}
                    onChange={e => handleQuietHoursChange('start', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">End Time</label>
                  <input
                    type="time"
                    value={notifications.quietHours.end}
                    onChange={e => handleQuietHoursChange('end', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <div className="font-medium mb-2">Stay Informed</div>
          <div>
            Enable matching search alerts to never miss opportunities that fit your investment
            criteria.
          </div>
        </div>
        <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
          <div className="font-medium mb-2">Manage Noise</div>
          <div>
            Use quiet hours and digest options to reduce notification overload while staying
            informed about important updates.
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <div className="flex gap-3">
          <Button variant="bordered" size="lg">
            Reset to Defaults
          </Button>
          <Button
            color="primary"
            size="lg"
            isLoading={saving}
            onPress={handleSave}
            className="bg-gradient-to-r from-primary-500 to-blue-600"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
