// 👤 Settings Wrapper Component
// Location: src/features/user-profile/pages/SettingsWrapper.tsx
// Purpose: Route-aware settings wrapper with proper component routing

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardBody } from '@heroui/react';
import { SettingsSidebar } from '../components/SettingsSidebar';
import { ProfileSettings } from '../components/ProfileSettings';
import { BusinessSettings } from '../components/BusinessSettings';
import { NotificationSettings } from '../components/NotificationSettings';
import { SecuritySettings } from '../components/SecuritySettings';
import { SupportSettings } from '../components/SupportSettings';
import { User as UserProfile } from '../../../types/user.consolidated';

interface SettingsWrapperProps {
  initialSection?: string;
}

export const SettingsWrapper: React.FC<SettingsWrapperProps> = ({ initialSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Determine current section from URL path
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/business')) return 'business';
    if (path.includes('/notifications')) return 'notifications';
    if (path.includes('/security')) return 'security';
    if (path.includes('/support')) return 'support';
    if (path.includes('/billing')) return 'billing';
    return initialSection || 'profile';
  };

  const [selectedSection, setSelectedSection] = useState(getCurrentSection());

  // Update section when URL changes
  useEffect(() => {
    setSelectedSection(getCurrentSection());
  }, [location.pathname]);

  // Load user data
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // TODO: Replace with actual auth service
      // const authResult = await authService.checkAuthentication();

      // Placeholder user data
      const mockUser: UserProfile = {
        id: 'mock-user-id',
        name: 'Demo User',
        email: 'demo@betweendeals.com',
        phone: '+32 123 456 789',
        role: 'buyer',
        isVerified: true,
        createdAt: new Date().toISOString(),
      } as UserProfile;

      setUser(mockUser);
    } catch (err) {
      console.error('Failed to load user data:', err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);

    // Update URL to match section
    const basePath = '/users';
    const sectionPath = section === 'profile' ? basePath : `${basePath}/${section}`;
    navigate(sectionPath, { replace: true });
  };

  const handleSave = async (data: any) => {
    try {
      console.log('Saving settings data:', data);
      // TODO: Implement actual save functionality
      // await authService.updateUserProfile(data);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load user data.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Render appropriate settings component based on section
  const renderSettingsComponent = () => {
    switch (selectedSection) {
      case 'profile':
        return <ProfileSettings user={user} onSave={handleSave} />;
      case 'business':
        return <BusinessSettings onSave={handleSave} />;
      case 'notifications':
        return <NotificationSettings onSave={handleSave} />;
      case 'security':
        return <SecuritySettings onSave={handleSave} />;
      case 'support':
        return <SupportSettings onSave={handleSave} />;
      case 'billing':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Billing & Subscription</h3>
            <p className="text-gray-600">Billing management coming soon.</p>
          </div>
        );
      default:
        return <ProfileSettings user={user} onSave={handleSave} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account preferences and business information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SettingsSidebar
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardBody className="p-6">{renderSettingsComponent()}</CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWrapper;
