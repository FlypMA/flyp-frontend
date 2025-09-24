// 🧭 Buyer Navigation
// Location: src/shared/components/layout/navigation/buyer/BuyerNavigation.tsx
// Purpose: Clean navigation for buyer pages (like Airbnb guest mode)
//
// Features:
// - Logo on the left
// - User avatar/profile menu on the right
// - No "List your business" button (buyers don't list)
// - Clean, minimal design
// - No center navigation items

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import BuyerNavigationDesktop from './BuyerNavigationDesktop';
import BuyerNavigationMobile from './BuyerNavigationMobile';

interface BuyerNavigationProps {
  className?: string;
}

const BuyerNavigation: React.FC<BuyerNavigationProps> = ({ className = '' }) => {
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
      <BuyerNavigationDesktop
        user={user}
        isCheckingAuth={isLoading}
        onMobileMenuToggle={toggleMobileMenu}
        className={className}
      />

      {/* Mobile Navigation */}
      <BuyerNavigationMobile user={user} isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
    </>
  );
};

export default BuyerNavigation;
