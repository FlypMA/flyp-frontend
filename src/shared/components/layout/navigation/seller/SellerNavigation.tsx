// 🧭 Seller Navigation - Unified Version
// Location: src/shared/components/layout/navigation/seller/SellerNavigation.tsx
// Purpose: Navigation for seller pages (like Airbnb host mode)
//
// Features:
// - Uses Zustand for global state management
// - Unified RoleNavigationMobile component
// - Logo on the left
// - Navigation items: Overview (my-business), Valuation, Data Room
// - User avatar/profile menu on the right

import { useNavigationStore } from '@/shared/stores/navigationStore';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { RoleNavigationMobile } from '../unified/RoleNavigationMobile';
import SellerNavigationDesktop from './SellerNavigationDesktop';

interface SellerNavigationProps {
  className?: string;
}

const SellerNavigation: React.FC<SellerNavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toggleMobileMenu, closeMobileMenu, setCurrentNav } = useNavigationStore();

  // Set current navigation type
  useEffect(() => {
    setCurrentNav('seller');
  }, [setCurrentNav]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  return (
    <>
      {/* Desktop Navigation */}
      <SellerNavigationDesktop
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

export default SellerNavigation;
