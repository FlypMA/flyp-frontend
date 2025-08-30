import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, Switch, Select, SelectItem, Chip, Badge } from '@heroui/react';
import {
  Bell,
  BellOff,
  Mail,
  Smartphone,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  MessageSquare,
  Building2,
  Heart,
  TrendingUp,
  Calendar,
  Filter,
  X,
} from 'lucide-react';

interface NotificationSettings {
  email_enabled: boolean;
  push_enabled: boolean;
  search_alerts: boolean;
  inquiry_updates: boolean;
  market_insights: boolean;
  platform_updates: boolean;
  email_frequency: 'immediate' | 'daily' | 'weekly';
}

interface Notification {
  id: string;
  type: 'search_alert' | 'inquiry_update' | 'market_insight' | 'platform_update' | 'favorite_update';
  title: string;
  message: string;
  timestamp: string;
  is_read: boolean;
  action_url?: string;
  metadata?: {
    search_name?: string;
    listing_title?: string;
    inquiry_id?: string;
    business_count?: number;
  };
}

interface NotificationCenterProps {}

const NotificationCenter: React.FC<NotificationCenterProps> = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email_enabled: true,
    push_enabled: true,
    search_alerts: true,
    inquiry_updates: true,
    market_insights: true,
    platform_updates: false,
    email_frequency: 'daily',
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'search_alert' | 'inquiry_update'>('all');

  useEffect(() => {
    loadNotifications();
    loadSettings();
  }, []);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await notificationService.getNotifications();
      
      // Mock data
      const mockNotifications: Notification[] = [
        {
          id: 'notif_1',
          type: 'search_alert',
          title: '3 new businesses match "Tech Companies Belgium €1-5M"',
          message: 'New SaaS platforms and tech startups have been listed that match your saved search criteria.',
          timestamp: '2024-01-22T09:15:00Z',
          is_read: false,
          action_url: '/search?search_id=search_1',
          metadata: {
            search_name: 'Tech Companies Belgium €1-5M',
            business_count: 3,
          },
        },
        {
          id: 'notif_2',
          type: 'inquiry_update',
          title: 'Response from Premium Restaurant Chain seller',
          message: 'Marie Dupont has responded to your inquiry about the Brussels restaurant chain.',
          timestamp: '2024-01-22T14:30:00Z',
          is_read: false,
          action_url: '/dashboard/buyer?tab=inquiries',
          metadata: {
            listing_title: 'Premium Restaurant Chain - Brussels',
            inquiry_id: 'inq_1',
          },
        },
        {
          id: 'notif_3',
          type: 'favorite_update',
          title: 'Price reduced on favorited business',
          message: 'Digital Marketing Agency Amsterdam has reduced their asking price by €150,000.',
          timestamp: '2024-01-21T16:45:00Z',
          is_read: true,
          action_url: '/listings/4',
          metadata: {
            listing_title: 'Digital Marketing Agency Amsterdam',
          },
        },
        {
          id: 'notif_4',
          type: 'search_alert',
          title: '1 new business matches "Restaurants & Cafes Brussels"',
          message: 'A new boutique café in Brussels has been listed that matches your search criteria.',
          timestamp: '2024-01-21T18:05:00Z',
          is_read: true,
          action_url: '/search?search_id=search_2',
          metadata: {
            search_name: 'Restaurants & Cafes Brussels',
            business_count: 1,
          },
        },
        {
          id: 'notif_5',
          type: 'market_insight',
          title: 'Belgian Tech Sector Report',
          message: 'Technology company valuations in Belgium have increased 12% this quarter.',
          timestamp: '2024-01-20T10:00:00Z',
          is_read: true,
          action_url: '/market-insights/tech-belgium-q1-2024',
        },
        {
          id: 'notif_6',
          type: 'platform_update',
          title: 'New Feature: Business Portfolio Tracking',
          message: 'Track the performance of your acquired businesses with our new portfolio management feature.',
          timestamp: '2024-01-19T12:00:00Z',
          is_read: true,
          action_url: '/dashboard/buyer?tab=businesses',
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await notificationService.getSettings();
      // setSettings(response.data);
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const updateSetting = async (key: keyof NotificationSettings, value: any) => {
    try {
      // TODO: Replace with actual API call
      setSettings(prev => ({ ...prev, [key]: value }));
      // await notificationService.updateSettings({ [key]: value });
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
      // TODO: API call to mark as read
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(notif => ({ ...notif, is_read: true })));
      // TODO: API call to mark all as read
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      // TODO: API call to delete notification
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'search_alert':
        return Bell;
      case 'inquiry_update':
        return MessageSquare;
      case 'favorite_update':
        return Heart;
      case 'market_insight':
        return TrendingUp;
      case 'platform_update':
        return Settings;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'search_alert':
        return 'primary';
      case 'inquiry_update':
        return 'success';
      case 'favorite_update':
        return 'warning';
      case 'market_insight':
        return 'secondary';
      case 'platform_update':
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.is_read;
    if (filter === 'search_alert') return notif.type === 'search_alert';
    if (filter === 'inquiry_update') return notif.type === 'inquiry_update';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            {notifications.length} total notifications • {unreadCount} unread
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select
            placeholder="Filter notifications"
            selectedKeys={[filter]}
            onSelectionChange={(keys) => setFilter(Array.from(keys)[0] as any)}
            className="w-48"
          >
            <SelectItem key="all">All Notifications</SelectItem>
            <SelectItem key="unread">Unread Only</SelectItem>
            <SelectItem key="search_alert">Search Alerts</SelectItem>
            <SelectItem key="inquiry_update">Inquiry Updates</SelectItem>
          </Select>

          {unreadCount > 0 && (
            <Button variant="bordered" onPress={markAllAsRead}>
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Notifications List */}
        <div className="xl:col-span-2 space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`border transition-all duration-200 hover:shadow-lg ${
                    notification.is_read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <CardBody className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          notification.is_read ? 'bg-gray-100' : 'bg-blue-100'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            notification.is_read ? 'text-gray-600' : 'text-blue-600'
                          }`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className={`font-medium ${
                              notification.is_read ? 'text-gray-900' : 'text-blue-900'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              {!notification.is_read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <span className="text-xs text-gray-500">
                                {getTimeAgo(notification.timestamp)}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between">
                            <Chip
                              size="sm"
                              color={getNotificationColor(notification.type)}
                              variant="flat"
                            >
                              {notification.type.replace('_', ' ')}
                            </Chip>

                            <div className="flex items-center gap-2">
                              {notification.action_url && (
                                <Button
                                  size="sm"
                                  color="primary"
                                  variant="flat"
                                  onPress={() => {
                                    if (!notification.is_read) {
                                      markAsRead(notification.id);
                                    }
                                    // Navigate to action URL
                                    window.location.href = notification.action_url!;
                                  }}
                                >
                                  View
                                </Button>
                              )}
                              
                              {!notification.is_read && (
                                <Button
                                  size="sm"
                                  variant="light"
                                  onPress={() => markAsRead(notification.id)}
                                >
                                  Mark Read
                                </Button>
                              )}

                              <Button
                                size="sm"
                                isIconOnly
                                variant="light"
                                onPress={() => deleteNotification(notification.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <Card className="border border-gray-200">
              <CardBody className="text-center py-16">
                <div className="p-4 bg-gray-100 rounded-2xl w-fit mx-auto mb-4">
                  <Bell className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {filter === 'all' ? 'No notifications' : `No ${filter.replace('_', ' ')} notifications`}
                </h3>
                <p className="text-gray-600">
                  {filter === 'all'
                    ? 'All caught up! New notifications will appear here.'
                    : `No ${filter.replace('_', ' ')} notifications at the moment.`}
                </p>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Notification Settings */}
        <div className="xl:col-span-1">
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Email Notifications</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  isSelected={settings.email_enabled}
                  onValueChange={(value) => updateSetting('email_enabled', value)}
                />
              </div>

              {/* Email Frequency */}
              {settings.email_enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Frequency
                  </label>
                  <Select
                    selectedKeys={[settings.email_frequency]}
                    onSelectionChange={(keys) => updateSetting('email_frequency', Array.from(keys)[0])}
                  >
                    <SelectItem key="immediate">Immediate</SelectItem>
                    <SelectItem key="daily">Daily Digest</SelectItem>
                    <SelectItem key="weekly">Weekly Summary</SelectItem>
                  </Select>
                </div>
              )}

              {/* Push Notifications */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Push Notifications</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch
                  isSelected={settings.push_enabled}
                  onValueChange={(value) => updateSetting('push_enabled', value)}
                />
              </div>

              {/* Notification Types */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Notification Types</h4>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Search Alerts</span>
                  <Switch
                    size="sm"
                    isSelected={settings.search_alerts}
                    onValueChange={(value) => updateSetting('search_alerts', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Inquiry Updates</span>
                  <Switch
                    size="sm"
                    isSelected={settings.inquiry_updates}
                    onValueChange={(value) => updateSetting('inquiry_updates', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Market Insights</span>
                  <Switch
                    size="sm"
                    isSelected={settings.market_insights}
                    onValueChange={(value) => updateSetting('market_insights', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Platform Updates</span>
                  <Switch
                    size="sm"
                    isSelected={settings.platform_updates}
                    onValueChange={(value) => updateSetting('platform_updates', value)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
