// 🧭 Buyer Navigation - Unified Version
// Location: src/shared/components/layout/navigation/buyer/BuyerNavigation.tsx
// Purpose: Clean navigation for buyer pages (like Airbnb guest mode)
//
// Features:
// - Uses Zustand for global state management
// - Unified RoleNavigationMobile component
// - Logo on the left
// - User avatar/profile menu on the right
// - Clean, minimal design

import { useNavigationStore } from '@/shared/stores/navigationStore';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { RoleNavigationMobile } from '../unified/RoleNavigationMobile';
import BuyerNavigationDesktop from './BuyerNavigationDesktop';

interface BuyerNavigationProps {
  className?: string;
}

const BuyerNavigation: React.FC<BuyerNavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const { user, isLoading, logout } = useAuth();
  const { toggleMobileMenu, closeMobileMenu, setCurrentNav } = useNavigationStore();

  // Set current navigation type
  useEffect(() => {
    setCurrentNav('buyer');
  }, [setCurrentNav]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  return (
    <>
      {/* Desktop Navigation */}
      <BuyerNavigationDesktop
        user={user}
        isCheckingAuth={isLoading}
        onMobileMenuToggle={toggleMobileMenu}
        className={className}
      />

      {/* Mobile Navigation - Unified Component */}
      <RoleNavigationMobile user={user} onLogout={logout} />
    </>
  );
};

export default BuyerNavigation;
