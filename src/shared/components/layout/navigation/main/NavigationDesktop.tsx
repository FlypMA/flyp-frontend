// 🖥️ Navigation Desktop - MVP Version
// Location: src/shared/components/navigation/main/NavigationDesktop.tsx
// Purpose: Desktop navigation bar based on legacy UnifiedNavigation.tsx
//
// Features:
// - Desktop navigation with authentication
// - User avatar dropdown integration
// - Mobile menu toggle button
// - Role-based navigation items

import { Button } from '@heroui/react';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { UrlGenerator } from '../../../../services';
import { User } from '../../../../types';
import UserAvatarDropdown from '../dropdown/UserAvatarDropdown';

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
  className = '',
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useAuth();

  // Navigation items are now hardcoded to match legacy app

  // Handle authentication actions
  const handleLogin = () => {
    openModal('login');
  };

  const handleSignup = () => {
    openModal('signup');
  };

  const handleSellBusiness = () => {
    if (user) {
      navigate(UrlGenerator.createListing());
    } else {
      openModal('signup');
    }
  };

  // Render user menu - using unified dropdown
  const renderUserMenu = () => {
    if (!user) return null;
    return <UserAvatarDropdown user={user} />;
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
              src="/flyp_logo.svg?v=2024.1"
              alt="Flyp - European SME M&A Platform"
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
            <span className="text-xl font-bold text-gray-900 ml-2">Flyp</span>
          </Link>
        </div>

        {/* Center Navigation - Desktop */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
          <ul className="h-full flex-row flex-nowrap items-center flex gap-8">
            <li className="text-medium whitespace-nowrap box-border list-none">
              <Link
                to="/for-sellers"
                className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                For Sellers
              </Link>
            </li>
            <li className="text-medium whitespace-nowrap box-border list-none">
              <Link
                to="/search"
                className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                For Buyers
              </Link>
            </li>
            <li className="text-medium whitespace-nowrap box-border list-none">
              <Link
                to="/resources/valuation-guide"
                className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                Valuation
              </Link>
            </li>
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
                  <button
                    onClick={handleLogin}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    Log in
                  </button>
                  <button
                    onClick={handleSellBusiness}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
                  >
                    List your business
                  </button>
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
