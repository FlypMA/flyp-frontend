import React, { useState } from 'react';
import { Button, Switch } from '@heroui/react';
import { Bell, Save, Mail, AlertTriangle, TrendingUp } from 'lucide-react';

interface SimpleNotificationSettingsProps {
  onSave: (data: any) => Promise<void>;
}

const SimpleNotificationSettings: React.FC<SimpleNotificationSettingsProps> = ({ onSave }) => {
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newBusinessAlerts: true,
    weeklyDigest: false,
  });

  const handleToggle = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ notifications });
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const notificationOptions = [
    {
      key: 'emailNotifications',
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive important updates and messages via email',
      enabled: notifications.emailNotifications,
    },
    {
      key: 'newBusinessAlerts',
      icon: AlertTriangle,
      title: 'New Business Alerts',
      description: 'Get notified when new businesses matching your interests are listed',
      enabled: notifications.newBusinessAlerts,
    },
    {
      key: 'weeklyDigest',
      icon: TrendingUp,
      title: 'Weekly Digest',
      description: 'Summary of market activity and new opportunities',
      enabled: notifications.weeklyDigest,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-2xl">
          <Bell className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Control how and when we contact you</p>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900">Email Preferences</h2>
          
          {notificationOptions.map((option) => {
            const IconComponent = option.icon;
            
            return (
              <div key={option.key} className="flex items-start justify-between py-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
                <div className="ml-4">
                  <Switch
                    isSelected={option.enabled}
                    onValueChange={(value) => handleToggle(option.key, value)}
                    color="primary"
                    size="lg"
                  />
                </div>
              </div>
            );
          })}

          <div className="pt-6 border-t border-gray-100">
            <Button
              onPress={handleSave}
              disabled={saving}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  Save Preferences
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleNotificationSettings;

