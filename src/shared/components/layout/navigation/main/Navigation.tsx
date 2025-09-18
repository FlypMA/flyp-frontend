// 🧭 Main Navigation - MVP Version
// Location: src/shared/components/navigation/main/Navigation.tsx
// Purpose: Main navigation orchestrator that handles both desktop and mobile navigation
//
// Based on legacy UnifiedNavigation.tsx - orchestrates NavigationDesktop and NavigationMobile

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import NavigationDesktop from './NavigationDesktop';
import NavigationMobile from './NavigationMobile';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
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
      <NavigationDesktop
        user={user}
        isCheckingAuth={isLoading}
        hasToken={isAuthenticated}
        authCheckComplete={!isLoading}
        onMobileMenuToggle={toggleMobileMenu}
        className={className}
      />

      {/* Mobile Navigation */}
      <NavigationMobile user={user} isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
    </>
  );
};

export default Navigation;
