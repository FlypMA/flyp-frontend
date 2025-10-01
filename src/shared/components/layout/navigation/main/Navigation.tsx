// 🧭 Main Navigation - Unified Version
// Location: src/shared/components/navigation/main/Navigation.tsx
// Purpose: Main navigation orchestrator that handles both desktop and mobile navigation
//
// Features:
// - Uses Zustand for global state management
// - Unified RoleNavigationMobile component
// - Automatic menu closing on route change

import { useNavigationStore } from '@/shared/stores/navigationStore';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { RoleNavigationMobile } from '../unified/RoleNavigationMobile';
import NavigationDesktop from './NavigationDesktop';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toggleMobileMenu, closeMobileMenu, setCurrentNav } = useNavigationStore();

  // Set current navigation type
  useEffect(() => {
    setCurrentNav('main');
  }, [setCurrentNav]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationDesktop
        user={user}
        isCheckingAuth={isLoading}
        hasToken={isAuthenticated}
        authCheckComplete={!isLoading}
        onMobileMenuToggle={toggleMobileMenu}
        className={className}
      />

      {/* Mobile Navigation - Unified Component */}
      <RoleNavigationMobile user={user} onLogout={logout} />
    </>
  );
};

export default Navigation;
