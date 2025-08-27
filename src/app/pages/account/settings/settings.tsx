import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@heroui/react';
import { CreditCard, Building2, Shield, Users, Eye, HelpCircle } from 'lucide-react';
import { authService } from '../../../services/users/authenticationService';
import { User } from '../../../types/api/users/user';
import SettingsSidebar from '../../../components/settings/SettingsSidebar';
import ProfileSettings from '../../../components/settings/sections/ProfileSettings';
import SecuritySettings from '../../../components/settings/sections/SecuritySettings';
import NotificationSettings from '../../../components/settings/sections/NotificationSettings';

const Settings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const authResult = await authService.checkAuthentication();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (data.type === 'profile') {
        await authService.updateUserProfile(data.data);
      } else if (data.type === 'security') {
        // Handle security updates
        console.log('Security update:', data.data);
      } else if (data.type === 'notifications') {
        // Handle notification preferences
        console.log('Notification update:', data.data);
      } else {
        // Handle profile data directly
        await authService.updateUserProfile(data);
      }
    } catch (err) {
      throw new Error('Failed to update settings');
    }
  };

  // Render different content based on selected section
  const renderContent = () => {
    if (!user) return null;

    switch (selectedSection) {
      case 'profile':
        return <ProfileSettings user={user} onSave={handleSave} />;
      case 'security':
        return <SecuritySettings onSave={handleSave} />;
      case 'notifications':
        return <NotificationSettings onSave={handleSave} />;
      case 'company':
        return (
          <Card className="border border-gray-200">
            <CardBody className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-blue-100 rounded-2xl w-fit mx-auto mb-4">
                  <Building2 className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Company Profile</h3>
                <p className="text-gray-600 mb-6">
                  Manage your business information, verification status, and company branding.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Coming in Phase 2 development
                </div>
              </div>
            </CardBody>
          </Card>
        );
      case 'verification':
        return (
          <Card className="border border-gray-200">
            <CardBody className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-green-100 rounded-2xl w-fit mx-auto mb-4">
                  <Shield className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Identity Verification</h3>
                <p className="text-gray-600 mb-6">
                  Verify your identity to build trust with other users and access premium features.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Coming in Phase 2 development
                </div>
              </div>
            </CardBody>
          </Card>
        );
      case 'team':
        return (
          <Card className="border border-gray-200">
            <CardBody className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-purple-100 rounded-2xl w-fit mx-auto mb-4">
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Management</h3>
                <p className="text-gray-600 mb-6">
                  Invite team members, manage permissions, and collaborate on deal sourcing.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Coming in Phase 3 development
                </div>
              </div>
            </CardBody>
          </Card>
        );
      case 'privacy':
        return (
          <Card className="border border-gray-200">
            <CardBody className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-indigo-100 rounded-2xl w-fit mx-auto mb-4">
                  <Eye className="w-12 h-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Settings</h3>
                <p className="text-gray-600 mb-6">
                  Control your data privacy, profile visibility, and information sharing
                  preferences.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Coming in Phase 2 development
                </div>
              </div>
            </CardBody>
          </Card>
        );
      case 'billing':
        return (
          <Card className="border border-gray-200">
            <CardBody className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-green-100 rounded-2xl w-fit mx-auto mb-4">
                  <CreditCard className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Billing & Subscription</h3>
                <p className="text-gray-600 mb-6">
                  Manage your subscription, payment methods, and billing history.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Coming in Phase 3 development
                </div>
              </div>
            </CardBody>
          </Card>
        );
      case 'support':
        return (
          <Card className="border border-gray-200">
            <CardBody className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-orange-100 rounded-2xl w-fit mx-auto mb-4">
                  <HelpCircle className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Support & Help</h3>
                <p className="text-gray-600 mb-6">
                  Get help, contact support, access documentation, and provide feedback.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Coming in Phase 2 development
                </div>
              </div>
            </CardBody>
          </Card>
        );
      default:
        return <ProfileSettings user={user} onSave={handleSave} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <div className="text-gray-600 font-medium">Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Settings Sidebar */}
        <SettingsSidebar selectedSection={selectedSection} onSectionChange={setSelectedSection} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
