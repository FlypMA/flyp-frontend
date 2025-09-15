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

import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { authService, UrlGenerator } from '../../shared/services';
import { User } from '../../shared/types';
import { Navigation } from '../../shared/components/layout/navigation';

const DEV_BYPASS_AUTH =
  (import.meta as any).env?.VITE_DEV_BYPASS_AUTH === 'true' || (import.meta as any).env?.DEV === true;

const AuthenticatedAccount = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true); // Add loading state to prevent premature redirect
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      console.log('🔍 AuthenticatedAccount: Starting authentication check...');
      console.log('🔍 Current location:', location.pathname);
      console.log('🔍 DEV_BYPASS_AUTH:', DEV_BYPASS_AUTH);

      setIsAuthChecking(true);

      // Development bypass
      if (DEV_BYPASS_AUTH) {
        console.log('🚨 DEV MODE: Bypassing authentication for development');
        const mockUser: User = {
          id: 'dev-user-123',
          email: 'dev@betweendeals.com',
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
        console.log('🔍 AuthenticatedAccount: Auth result:', authResult);

        if (authResult.isAuthenticated && authResult.user) {
          console.log('✅ Authenticated user detected:', authResult.user);
          setAuthenticatedUser(authResult.user);
        } else {
          console.log('❌ No authenticated user detected');
          setAuthenticatedUser(null);
        }
      } catch (error) {
        console.error('❌ Auth check error:', error);
        setAuthenticatedUser(null);
      } finally {
        setIsAuthChecking(false);
      }
    };

    fetchData();
  }, []); // Remove location dependency to prevent loops

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
    console.log('🚨 No authenticated user after auth check complete, redirecting to home');
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
      {/* Navigation - like legacy UnifiedNavigation for authenticated pages */}
      <Navigation />
      
      {/* Main Content - full width without sidebar */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedAccount;