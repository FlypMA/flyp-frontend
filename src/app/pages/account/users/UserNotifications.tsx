import { Button } from '@/shared/components/buttons';
import { authService } from '@/shared/services/auth';
import { logger } from '@/shared/utils/logger';
import { Badge, Card, CardBody, CardHeader, Switch } from '@heroui/react';
import {
    Bell,
    CheckCircle,
    DollarSign,
    Mail,
    MessageSquare,
    Settings,
    TrendingUp,
    XCircle,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../../shared/services/urls/urlGenerator';
import { User as UserType } from '../../../../shared/types';

interface Notification {
  id: string;
  type: 'message' | 'listing' | 'price' | 'system' | 'marketing';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const UserNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    listingUpdates: true,
    messageNotifications: true,
    priceAlerts: true,
  });

  const loadUserData = useCallback(async () => {
    try {
      const authResult = await authService.checkAuth();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
      } else {
        navigate(UrlGenerator.login());
      }
    } catch (error) {
      logger.error("Error occurred", error);
      navigate(UrlGenerator.login());
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadUserData();
    loadNotifications();
  }, [loadUserData]);

  const loadNotifications = async () => {
    try {
      // TODO: Implement notifications API call
      // const userNotifications = await AuthenticationService.getNotifications();

      // Mock data for now
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'message',
          title: 'New Message from Buyer',
          message: 'John Smith sent you a message about your business listing.',
          timestamp: '2024-01-15T10:30:00Z',
          read: false,
          priority: 'high',
        },
        {
          id: '2',
          type: 'listing',
          title: 'Listing Performance Update',
          message: 'Your business listing received 15 new views this week.',
          timestamp: '2024-01-14T16:45:00Z',
          read: false,
          priority: 'medium',
        },
        {
          id: '3',
          type: 'price',
          title: 'Price Alert',
          message: 'Similar businesses in your sector are selling for 20% more.',
          timestamp: '2024-01-13T09:15:00Z',
          read: true,
          priority: 'medium',
        },
        {
          id: '4',
          type: 'system',
          title: 'Account Verification Complete',
          message: 'Your business verification has been approved.',
          timestamp: '2024-01-12T14:20:00Z',
          read: true,
          priority: 'high',
        },
        {
          id: '5',
          type: 'marketing',
          title: 'Weekly Market Report',
          message: "Check out this week's market trends and opportunities.",
          timestamp: '2024-01-11T08:00:00Z',
          read: true,
          priority: 'low',
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      logger.error("Error occurred", error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // TODO: Implement mark as read API call
      // await AuthenticationService.markNotificationAsRead(notificationId);

      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      logger.error("Error occurred", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Implement mark all as read API call
      // await AuthenticationService.markAllNotificationsAsRead();

      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    } catch (error) {
      logger.error("Error occurred", error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      // TODO: Implement delete notification API call
      // await AuthenticationService.deleteNotification(notificationId);

      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    } catch (error) {
      logger.error("Error occurred", error);
    }
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      case 'listing':
        return <TrendingUp className="w-5 h-5" />;
      case 'price':
        return <DollarSign className="w-5 h-5" />;
      case 'system':
        return <Settings className="w-5 h-5" />;
      case 'marketing':
        return <Mail className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'text-blue-600 bg-blue-100';
      case 'listing':
        return 'text-green-600 bg-green-100';
      case 'price':
        return 'text-yellow-600 bg-yellow-100';
      case 'system':
        return 'text-purple-600 bg-purple-100';
      case 'marketing':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // TODO: Implement priority color functionality
  // const getPriorityColor = (priority: string) => {
  //   switch (priority) {
  //     case 'high':
  //       return 'text-red-600 bg-red-100';
  //     case 'medium':
  //       return 'text-yellow-600 bg-yellow-100';
  //     case 'low':
  //       return 'text-green-600 bg-green-100';
  //     default:
  //       return 'text-gray-600 bg-gray-100';
  //   }
  // };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-2">Stay updated with your account activity</p>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <Badge content={unreadCount} variant="solid" color="danger">
                  <Bell className="w-6 h-6 text-gray-600" />
                </Badge>
              )}
              <Button
                variant="tertiary"
                onPress={() => navigate(UrlGenerator.userSettings())}
                startContent={<Settings className="w-4 h-4" />}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Notification Settings */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      isSelected={notificationSettings.emailNotifications}
                      onValueChange={value =>
                        updateNotificationSetting('emailNotifications', value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive push notifications</p>
                    </div>
                    <Switch
                      isSelected={notificationSettings.pushNotifications}
                      onValueChange={value => updateNotificationSetting('pushNotifications', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Message Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about new messages</p>
                    </div>
                    <Switch
                      isSelected={notificationSettings.messageNotifications}
                      onValueChange={value =>
                        updateNotificationSetting('messageNotifications', value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Listing Updates</p>
                      <p className="text-sm text-gray-600">
                        Get notified about listing performance
                      </p>
                    </div>
                    <Switch
                      isSelected={notificationSettings.listingUpdates}
                      onValueChange={value => updateNotificationSetting('listingUpdates', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Price Alerts</p>
                      <p className="text-sm text-gray-600">Get notified about price changes</p>
                    </div>
                    <Switch
                      isSelected={notificationSettings.priceAlerts}
                      onValueChange={value => updateNotificationSetting('priceAlerts', value)}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={filter === 'all' ? 'primary' : 'secondary'}
                        onPress={() => setFilter('all')}
                      >
                        All
                      </Button>
                      <Button
                        size="sm"
                        variant={filter === 'unread' ? 'primary' : 'secondary'}
                        onPress={() => setFilter('unread')}
                      >
                        Unread
                      </Button>
                      <Button
                        size="sm"
                        variant={filter === 'read' ? 'primary' : 'secondary'}
                        onPress={() => setFilter('read')}
                      >
                        Read
                      </Button>
                    </div>
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      size="sm"
                      variant="tertiary"
                      onPress={markAllAsRead}
                      startContent={<CheckCircle className="w-4 h-4" />}
                    >
                      Mark All Read
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-600">
                      {filter === 'unread'
                        ? "You're all caught up! No unread notifications."
                        : filter === 'read'
                          ? 'No read notifications to show.'
                          : "You don't have any notifications yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                          notification.read
                            ? 'bg-white border-gray-200'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </h4>
                                <Badge
                                  size="sm"
                                  color={
                                    notification.priority === 'high'
                                      ? 'danger'
                                      : notification.priority === 'medium'
                                        ? 'warning'
                                        : 'success'
                                  }
                                >
                                  {notification.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">
                                  {new Date(notification.timestamp).toLocaleDateString()}
                                </span>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center space-x-2 mt-3">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="tertiary"
                                  onPress={() => markAsRead(notification.id)}
                                  startContent={<CheckCircle className="w-3 h-3" />}
                                >
                                  Mark as Read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="danger"
                                onPress={() => deleteNotification(notification.id)}
                                startContent={<XCircle className="w-3 h-3" />}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
