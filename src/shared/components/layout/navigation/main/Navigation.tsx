// 🧭 Main Navigation - MVP Version
// Location: src/shared/components/navigation/main/Navigation.tsx
// Purpose: Main navigation orchestrator that handles both desktop and mobile navigation
//
// Based on legacy UnifiedNavigation.tsx - orchestrates NavigationDesktop and NavigationMobile

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../../../../types';
import { AuthenticationService } from '../../../../services/auth/Auth';
import NavigationDesktop from './NavigationDesktop';
import NavigationMobile from './NavigationMobile';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize auth service
  const authService = new AuthenticationService();

  // Check for token presence immediately
  useEffect(() => {
    const checkToken = () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='))
          ?.split('=')[1];
        setHasToken(!!token);
      } catch (error) {
        console.error('Error checking token:', error);
        setHasToken(false);
      }
    };

    checkToken();
  }, []);

  // Authentication check with timeout (like legacy)
  useEffect(() => {
    const checkAuthentication = async () => {
      if (!hasToken) {
        setUser(null);
        setIsCheckingAuth(false);
        setAuthCheckComplete(true);
        return;
      }

      try {
        setIsCheckingAuth(true);

        // Add timeout to prevent hanging (like legacy)
        const authPromise = authService.checkAuthentication();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Auth check timeout')), 3000)
        );

        const authResult = await Promise.race([authPromise, timeoutPromise]);

        if (authResult.success && authResult.user) {
          setUser(authResult.user);
          setHasToken(true);
        } else {
          setUser(null);
          setHasToken(false);
          // Clear invalid token (like legacy)
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
      } catch (error) {
        console.error('Navigation: Auth check failed:', error);
        setUser(null);
        setHasToken(false);
        // Clear potentially invalid token (like legacy)
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      } finally {
        setIsCheckingAuth(false);
        setAuthCheckComplete(true);
      }
    };

    if (hasToken) {
      checkAuthentication();
    }

    // Auth timeout fallback (like legacy)
    const authTimeout = setTimeout(() => {
      if (isCheckingAuth || !authCheckComplete) {
        console.warn('⚠️ Navigation: Auth check timeout, forcing completion');
        setIsCheckingAuth(false);
        setAuthCheckComplete(true);
        setUser(null);
        setHasToken(false);
      }
    }, 4000);

    // Listen for auth changes (like legacy)
    const handleAuthChange = async () => {
      setIsCheckingAuth(true);
      setAuthCheckComplete(false);

      // Force immediate token recheck
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

      const hasAuthToken = !!token && token !== '';
      setHasToken(hasAuthToken);

      if (!hasAuthToken) {
        setUser(null);
        setIsCheckingAuth(false);
        setAuthCheckComplete(true);
      } else {
        // Recheck authentication
        checkAuthentication();
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('auth-logout', handleAuthChange);

    return () => {
      clearTimeout(authTimeout);
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('auth-logout', handleAuthChange);
    };
  }, [hasToken, isCheckingAuth, authCheckComplete]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationDesktop
        user={user}
        isCheckingAuth={isCheckingAuth}
        hasToken={hasToken}
        authCheckComplete={authCheckComplete}
        onMobileMenuToggle={toggleMobileMenu}
        className={className}
      />

      {/* Mobile Navigation */}
      <NavigationMobile
        user={user}
        isOpen={isMobileMenuOpen}
        onToggle={toggleMobileMenu}
      />
    </>
  );
};

export default Navigation;
