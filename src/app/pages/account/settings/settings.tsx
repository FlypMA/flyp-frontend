import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@heroui/react';
import { Building2, HelpCircle } from 'lucide-react';
import { authService } from '../../../services/users/authenticationService';
import { UserProfile } from '../../../../types/api';
import SettingsSidebar from '../../../components/settings/SettingsSidebar';
import ProfileSettings from '../../../components/settings/sections/ProfileSettings';
import SimpleBusinessSettings from '../../../components/settings/sections/SimpleBusinessSettings';
import SimpleNotificationSettings from '../../../components/settings/sections/SimpleNotificationSettings';
import SimpleSupportSettings from '../../../components/settings/sections/SimpleSupportSettings';
import UnifiedNavigation from '../../../components/navigation/UnifiedNavigation';

const Settings: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
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
      } else if (data.type === 'security' || data.type === 'password') {
        // Handle password changes with proper API integration
        console.log('🔐 Processing password change request');
        const passwordData = data.data || data.passwordChange;
        
        if (passwordData && passwordData.currentPassword && passwordData.newPassword) {
          const result = await authService.updatePassword(
            passwordData.currentPassword,
            passwordData.newPassword
          );
          
          if (!result.success) {
            throw new Error(result.message || 'Failed to update password');
          }
          
          console.log('✅ Password updated successfully');
          return { success: true, message: 'Password updated successfully' };
        } else {
          // Handle other security settings if needed
          console.log('Security update (non-password):', data.data);
        }
      } else if (data.type === 'notifications') {
        // Handle notification preferences
        console.log('Notification update:', data.data);
      } else if (data.passwordChange) {
        // Handle direct password change requests
        console.log('🔐 Processing direct password change');
        const result = await authService.updatePassword(
          data.passwordChange.currentPassword,
          data.passwordChange.newPassword
        );
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to update password');
        }
        
        console.log('✅ Password updated successfully');
        return { success: true, message: 'Password updated successfully' };
      } else {
        // Handle profile data directly
        await authService.updateUserProfile(data);
      }
    } catch (err: any) {
      console.error('❌ Settings update failed:', err);
      throw new Error(err.message || 'Failed to update settings');
    }
  };

  // 🎯 MVP Settings - Simplified content rendering
  const renderContent = () => {
    if (!user) return null;

    switch (selectedSection) {
      case 'profile':
        return <ProfileSettings user={user} onSave={handleSave} />;
      case 'business':
        return <SimpleBusinessSettings onSave={handleSave} />;
      case 'notifications':
        return <SimpleNotificationSettings onSave={handleSave} />;
      case 'support':
        return <SimpleSupportSettings />;
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
      {/* Navigation */}
      <UnifiedNavigation />

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
