import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import { User as UserProfile, UserRole } from '../../types/shared/index';
import { UserType } from '../../types/api/users/user';
import MobileNavigation from '../navigation/MobileNavigation';

const DEV_BYPASS_AUTH =
  import.meta.env.VITE_DEV_BYPASS_AUTH === 'true' || process.env.NODE_ENV === 'development';

const AuthenticatedAccount = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      console.log('🔍 AuthenticatedAccount: Starting authentication check...');
      console.log('🔍 Current location:', location.pathname);
      console.log('🔍 DEV_BYPASS_AUTH:', DEV_BYPASS_AUTH);

      setIsLoading(true);

      // Development bypass
      if (DEV_BYPASS_AUTH) {
        console.log('🚨 DEV MODE: Bypassing authentication for development');
        const mockUser = {
          id: 'dev-user-123',
          email: 'dev@betweendeals.com',
          name: 'Development User',
          role: UserRole.SELLER,
          email_verified: true,
          country: 'BE',
          auth_provider: 'email',
          language_preference: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          preferences: {
            language: 'en',
            timezone: 'UTC',
          },
        } as UserProfile;

        setUser(mockUser);
        setAuthenticatedUser(mockUser);
        setIsLoading(false);
        return;
      }

      try {
        const authResult = await authService.checkAuthentication();
        console.log('🔍 AuthenticatedAccount: Auth result:', authResult);

        if (authResult.isAuthenticated && authResult.user) {
          console.log('✅ Authenticated user detected:', authResult.user);
          setUser(authResult.user);
          setAuthenticatedUser(authResult.user);
        } else {
          console.log('❌ No authenticated user detected');
          setUser(null);
          setAuthenticatedUser(null);
        }
      } catch (error) {
        console.error('❌ Auth check error:', error);
        setUser(null);
        setAuthenticatedUser(null);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [location.pathname]); // Remove location dependency to prevent loops

  const handleUserLogoutClick = async () => {
    console.log('🔓 Logout initiated');
    try {
      await authService.logout();
      navigate(UrlGeneratorService.root());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleUserAccountClick = () => {
    console.log('🎯 Navigate to account settings');
    navigate(UrlGeneratorService.accountSettings());
  };

  const handleUserDashboardClick = () => {
    console.log('🎯 Navigate to new report');
    navigate(UrlGeneratorService.createListing());
  };

  const handleUserSettingsClick = () => {
    console.log('🎯 Navigate to settings');
    navigate(UrlGeneratorService.accountSettings());
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Only redirect if not in dev mode and no authenticated user
  if (!authenticatedUser && !DEV_BYPASS_AUTH) {
    console.log('🚨 No authenticated user, redirecting to home');
    return <Navigate to={UrlGeneratorService.root()} replace />;
  }

  const navItems = [
    {
      to: UrlGeneratorService.createListing(),
      icon: MessageCircle,
      label: 'New Report',
      onClick: handleUserDashboardClick,
    },
  ];

  return (
    <div>
      {/* New Mobile Navigation */}
      <MobileNavigation
        user={authenticatedUser}
        isOpen={isMobileSidebarOpen}
        onToggle={toggleMobileSidebar}
      />

      {/* Main Content - full width without sidebar */}
      <div className="flex">
        <div className="flex-1 w-full">
          {/* Main Content - full height */}
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedAccount;
