/* 
  AuthenticatedAccount (AuthenticatedLayout)

  Used for: Protected user areas, dashboards, account management

  Routes:
  - /my-business/* (Seller dashboard - business management)
  - /users/* (Universal account management - profile, settings, billing)
  - /messages/* (Communication system)
  - /transaction/:transactionId (Transaction flows)
  
  Features:
  - Authentication checking with loading states
  - Development bypass for testing
  - Mobile navigation support
  - Full-width content (no sidebar)
  - Redirects unauthenticated users to home
*/

import AuthModals from '@/features/phase1/authentication/components/AuthModals';
import { Navigation } from '@/shared/components/layout/navigation';
import { ScrollToTop } from '@/shared/utils/ux';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService, UrlGenerator } from '../../shared/services';
import { User } from '../../shared/types';
import { logger } from '../../shared/utils/logger';

const DEV_BYPASS_AUTH =
  (import.meta.env as Record<string, unknown>)?.VITE_DEV_BYPASS_AUTH === 'true' ||
  (import.meta.env as Record<string, unknown>)?.DEV === true;

const AuthenticatedAccount = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true); // Add loading state to prevent premature redirect
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      logger.debug('🔍 AuthenticatedAccount: Starting authentication check...');
      logger.debug('🔍 Current location:', location.pathname);
      logger.debug('🔍 DEV_BYPASS_AUTH:', DEV_BYPASS_AUTH);

      setIsAuthChecking(true);

      // Development bypass
      if (DEV_BYPASS_AUTH) {
        logger.info('🚨 DEV MODE: Bypassing authentication for development');
        const mockUser: User = {
          id: 'dev-user-123',
          email: 'dev@flyp.com',
          name: 'Development User',
          role: 'seller',
          email_verified: true,
          country: 'BE',
          auth_provider: 'email',
          language_preference: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setAuthenticatedUser(mockUser);
        setIsAuthChecking(false);
        return;
      }

      try {
        const authResult = await authService.checkAuthentication();
        logger.debug('🔍 AuthenticatedAccount: Auth result:', authResult);

        if (authResult.isAuthenticated && authResult.user) {
          logger.success('Authenticated user detected:', authResult.user);
          setAuthenticatedUser(authResult.user);
        } else {
          logger.info('❌ No authenticated user detected');
          setAuthenticatedUser(null);
        }
      } catch (error) {
        logger.error('❌ Auth check error:', error);
        setAuthenticatedUser(null);
      } finally {
        setIsAuthChecking(false);
      }
    };

    fetchData();
  }, [location.pathname]); // Remove location dependency to prevent loops

  // TODO: Implement logout functionality
  // const handleUserLogoutClick = async () => {
  //   console.log('🔓 Logout initiated');
  //   try {
  //     await authService.logout();
  //     navigate(UrlGenerator.root());
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  // Show loading state while checking authentication to prevent premature redirect
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Only redirect if auth check is complete and no authenticated user (excluding dev mode)
  if (!isAuthChecking && !authenticatedUser && !DEV_BYPASS_AUTH) {
    logger.info('🚨 No authenticated user after auth check complete, redirecting to home');
    return <Navigate to={UrlGenerator.root()} replace />;
  }

  // TODO: Implement navigation items
  // const navItems = [
  //   {
  //     to: UrlGenerator.createListing(),
  //     icon: MessageCircle,
  //     label: 'New Report',
  //     onClick: handleUserDashboardClick,
  //   },
  // ];

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Navigation - like legacy UnifiedNavigation for authenticated pages */}
      <Navigation />

      {/* Main Content - full width without sidebar */}
      <main className="flex-1">
        <Outlet />
      </main>

      <AuthModals />
    </div>
  );
};

export default AuthenticatedAccount;
