// 🧭 Seller Navigation
// Location: src/shared/components/layout/navigation/seller/SellerNavigation.tsx
// Purpose: Navigation for seller pages (like Airbnb host mode)
//
// Features:
// - Logo on the left
// - Navigation items: Overview (my-business), Valuation, Data Room
// - User avatar/profile menu on the right
// - Based on MainLayout navigation structure

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import SellerNavigationDesktop from './SellerNavigationDesktop';
import SellerNavigationMobile from './SellerNavigationMobile';

interface SellerNavigationProps {
  className?: string;
}

const SellerNavigation: React.FC<SellerNavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <SellerNavigationDesktop
        user={user}
        isCheckingAuth={isLoading}
        hasToken={isAuthenticated}
        authCheckComplete={!isLoading}
        onMobileMenuToggle={toggleMobileMenu}
        className={className}
      />

      {/* Mobile Navigation */}
      <SellerNavigationMobile user={user} isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
    </>
  );
};

export default SellerNavigation;
