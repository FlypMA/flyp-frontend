// 🖥️ Buyer Desktop Navigation
// Location: src/shared/components/layout/navigation/buyer/BuyerNavigationDesktop.tsx
// Purpose: Desktop navigation bar for buyers (like Airbnb guest mode)
//
// Features:
// - Logo on the left
// - User avatar/profile menu on the right
// - NO "List your business" button (buyers don't list)
// - Clean, minimal spacing and design
// - No center navigation items

import { Button } from '@/shared/components/buttons';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { User } from '../../../../types';
import UserAvatarDropdown from '../dropdown/UserAvatarDropdown';

interface BuyerNavigationDesktopProps {
  user: User | null;
  isCheckingAuth: boolean;
  onMobileMenuToggle: () => void;
  className?: string;
}

const BuyerNavigationDesktop: React.FC<BuyerNavigationDesktopProps> = ({
  user,
  isCheckingAuth,
  onMobileMenuToggle,
  className = '',
}) => {
  const { openModal } = useAuth();

  // Handle authentication actions
  const handleLogin = () => {
    openModal('login');
  };

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
          <Link to="/" className="flex items-center gap-1">
            <img
              src="/UpSwitch_logo_var1.svg?v=2024.4"
              alt="Upswitch - European SME M&A Platform"
              width="32"
              height="32"
              className="logo-image transition-opacity hover:opacity-80 w-8 h-8 flex-shrink-0"
              loading="lazy"
              style={{
                height: '32px',
                objectFit: 'contain',
                opacity: 1,
                visibility: 'visible',
                display: 'block',
              }}
            />
            <span className="font-display text-xl font-light text-primary-700 leading-none mt-0.5">
              Upswitch
            </span>
          </Link>
        </div>

        {/* Right Section - User Menu Only (No List Business Button) */}
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
                <Button variant="link" size="sm" onClick={handleLogin}>
                  Log in
                </Button>
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

export default BuyerNavigationDesktop;
