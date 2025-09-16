// 🖥️ Navigation Desktop - MVP Version
// Location: src/shared/components/navigation/main/NavigationDesktop.tsx
// Purpose: Desktop navigation bar based on legacy UnifiedNavigation.tsx
//
// Features:
// - Desktop navigation with authentication
// - User avatar dropdown integration
// - Mobile menu toggle button
// - Role-based navigation items

import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Menu } from 'lucide-react';
import { User } from '../../../../types';
import { UrlGenerator } from '../../../../services';
import BuyerDropdown from '../dropdown/BuyerDropdown';
import SellerDropdown from '../dropdown/SellerDropdown';
import { getDesktopNavigationItems, getDropdownComponent } from '../utils';

interface NavigationDesktopProps {
  user: User | null;
  isCheckingAuth: boolean;
  hasToken: boolean;
  authCheckComplete: boolean;
  onMobileMenuToggle: () => void;
  className?: string;
}

const NavigationDesktop: React.FC<NavigationDesktopProps> = ({
  user,
  isCheckingAuth,
  hasToken,
  authCheckComplete,
  onMobileMenuToggle,
  className = ''
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get navigation items - exact copy from legacy
  const navigationItems = getDesktopNavigationItems();

  // Handle authentication actions
  const handleLogin = () => {
    navigate(UrlGenerator.login());
  };

  const handleSignup = () => {
    navigate(UrlGenerator.signup());
  };

  const handleSellBusiness = () => {
    if (user) {
      navigate(UrlGenerator.createListing());
    } else {
      navigate(UrlGenerator.signup());
    }
  };

  // Render user menu based on role - using utils
  const renderUserMenu = () => {
    if (!user) return null;

    const dropdownType = getDropdownComponent(user);
    return dropdownType === 'seller' ? 
      <SellerDropdown user={user} /> : 
      <BuyerDropdown user={user} />;
  };

  return (
    <nav
      className={`flex w-full h-auto items-center justify-center backdrop-blur-lg backdrop-saturate-150 bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30 py-4 ${className}`}
      style={{ '--navbar-height': '4rem' } as React.CSSProperties}
    >
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-full">
        {/* Logo Section */}
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/betweendeals_logo.svg?v=2024.1"
              alt="betweendeals - European SME M&A Platform"
              width="32"
              height="32"
              className="logo-image transition-opacity hover:opacity-80 w-8 h-8"
              loading="lazy"
              style={{
                height: '32px',
                objectFit: 'contain',
                opacity: 1,
                visibility: 'visible',
                display: 'block',
              }}
            />
            <span className="text-xl font-bold text-gray-900 ml-2">betweendeals</span>
          </Link>
        </div>

        {/* Center Navigation - Desktop */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
          <ul className="h-full flex-row flex-nowrap items-center flex gap-8">
            {navigationItems.map(item => (
              <li key={item.href} className="text-medium whitespace-nowrap box-border list-none">
                <Link
                  to={item.href}
                  className={`transition-colors text-sm font-medium ${
                    location.pathname === item.href
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-end bg-transparent items-center">
          <ul className="h-full flex-row flex-nowrap flex items-center gap-4" data-justify="end">
            {/* Desktop Actions */}
            <li className="text-medium whitespace-nowrap box-border list-none hidden lg:flex items-center gap-4">
              {user ? (
                renderUserMenu()
              ) : isCheckingAuth || (hasToken && !authCheckComplete) ? (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">•</span>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={handleLogin}
                    className="text-neutral-700 hover:text-primary-600"
                  >
                    Log in
                  </Button>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={handleSellBusiness}
                    className="bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    Sell your business
                  </Button>
                </>
              )}
            </li>

            {/* Mobile Actions */}
            <li className="text-medium whitespace-nowrap box-border list-none flex lg:hidden items-center gap-2">
              {user ? (
                <>
                  {renderUserMenu()}
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={onMobileMenuToggle}
                    className="text-neutral-700"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </>
              ) : isCheckingAuth || (hasToken && !authCheckComplete) ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">•</span>
                  </div>
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={onMobileMenuToggle}
                    className="text-neutral-700"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  isIconOnly
                  variant="light"
                  onClick={onMobileMenuToggle}
                  className="text-neutral-700"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
            </li>
          </ul>
        </div>
      </header>
    </nav>
  );
};

export default NavigationDesktop;