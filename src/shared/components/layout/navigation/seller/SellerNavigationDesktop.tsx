// 🖥️ Seller Desktop Navigation
// Location: src/shared/components/layout/navigation/seller/SellerNavigationDesktop.tsx
// Purpose: Desktop navigation bar for sellers (like Airbnb host mode)
//
// Features:
// - Logo on the left
// - Navigation items: Overview, Valuation, Data Room
// - User avatar/profile menu on the right
// - Based on MainLayout navigation structure

import { Button } from '@/shared/components/buttons';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { UrlGenerator } from '../../../../services';
import { User } from '../../../../types';
import UserAvatarDropdown from '../dropdown/UserAvatarDropdown';

interface SellerNavigationDesktopProps {
  user: User | null;
  isCheckingAuth: boolean;
  hasToken: boolean;
  authCheckComplete: boolean;
  onMobileMenuToggle: () => void;
  className?: string;
}

const SellerNavigationDesktop: React.FC<SellerNavigationDesktopProps> = ({
  user,
  isCheckingAuth,
  hasToken,
  authCheckComplete,
  onMobileMenuToggle,
  className = '',
}) => {
  const navigate = useNavigate();
  const { openModal } = useAuth();

  // Handle authentication actions
  const handleLogin = () => {
    openModal('login');
  };

  const handleSignup = () => {
    openModal('signup');
  };

  // Navigation items for sellers
  const navigationItems = [
    {
      label: 'Overview',
      path: UrlGenerator.myBusiness(),
      isActive: (pathname: string) =>
        pathname === UrlGenerator.myBusiness() || pathname === '/my-business/overview',
    },
    {
      label: 'Valuation',
      path: '/my-business/valuations',
      isActive: (pathname: string) => pathname.startsWith('/my-business/valuations'),
    },
    {
      label: 'Data Room',
      path: UrlGenerator.businessDocuments(),
      isActive: (pathname: string) => pathname.startsWith('/my-business/documents'),
    },
  ];

  // Render user menu - using unified dropdown
  const renderUserMenu = () => {
    if (!user) return null;
    return <UserAvatarDropdown user={user} />;
  };

  return (
    <nav
      className={`flex w-full h-auto items-center justify-center bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30 py-4 ${className}`}
      style={{ '--navbar-height': '4rem' } as React.CSSProperties}
    >
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-full">
        {/* Logo Section */}
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/upswitch_logo.svg?v=2024.1"
              alt="Upswitch - European SME M&A Platform"
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
            <span className="text-xl font-bold text-gray-900 ml-2">Upswitch</span>
          </Link>
        </div>

        {/* Center Navigation Items */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigationItems.map(item => {
            const isActive = item.isActive(window.location.pathname);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Section - User Menu */}
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-end bg-transparent items-center">
          <ul className="h-full flex-row flex-nowrap flex items-center gap-4" data-justify="end">
            {/* Desktop Actions */}
            <li className="text-medium whitespace-nowrap box-border list-none hidden lg:flex items-center gap-4">
              {user ? (
                renderUserMenu()
              ) : isCheckingAuth ? (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">•</span>
                  </div>
                </div>
              ) : (
                <>
                  <Button variant="link" size="sm" onClick={handleLogin}>
                    Log in
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSignup}>
                    Sign up
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
                    variant="tertiary"
                    onClick={onMobileMenuToggle}
                    className="text-neutral-700"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5 text-neutral-700" />
                  </Button>
                </>
              ) : isCheckingAuth ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">•</span>
                  </div>
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={onMobileMenuToggle}
                    className="text-neutral-700"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5 text-neutral-700" />
                  </Button>
                </div>
              ) : (
                <Button
                  isIconOnly
                  variant="tertiary"
                  onClick={onMobileMenuToggle}
                  className="text-neutral-700"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-5 h-5 text-neutral-700" />
                </Button>
              )}
            </li>
          </ul>
        </div>
      </header>
    </nav>
  );
};

export default SellerNavigationDesktop;
