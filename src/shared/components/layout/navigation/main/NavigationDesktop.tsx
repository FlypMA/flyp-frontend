// 🖥️ Navigation Desktop - Growth Marketing Optimized
// Location: src/shared/components/navigation/main/NavigationDesktop.tsx
// Purpose: Desktop navigation bar with smart routing logic
//
// AARRR STRATEGY:
// - Seller-first navigation (70% of marketing focus)
// - Clear buyer path (30%, essential for marketplace)
// - Intelligence-first approach ("Get Valued" not "Sell")
// - Persistent CTA button for conversion
//
// Features:
// - Smart routing based on user intent
// - Context-aware active states
// - Resources dropdown (educational content)
// - Persistent "Get Free Valuation" CTA

import { Button } from '@/shared/components/buttons';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChevronDown, Menu } from 'lucide-react';
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
  onMobileMenuToggle,
  className = '',
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useAuth();

  // Handle authentication actions
  const handleLogin = () => {
    openModal('login');
  };

  // Smart CTA routing based on context
  const handlePrimaryCTA = () => {
    if (user) {
      // If logged in, route to appropriate dashboard
      if (user.role === 'buyer') {
        navigate(UrlGenerator.search());
      } else {
        navigate(UrlGenerator.myBusiness());
      }
    } else {
      // If not logged in, open signup modal (leads to valuation after signup)
      openModal('signup');
    }
  };

  // Check if link is active
  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Render user menu
  const renderUserMenu = () => {
    if (!user) return null;
    return <UserAvatarDropdown user={user} />;
  };

  // Resources dropdown items
  const resourceItems = [{ key: 'faq', label: 'FAQ', href: '/faq' }];

  return (
    <nav
      className={`flex w-full h-auto items-center justify-center backdrop-blur-lg backdrop-saturate-150 bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30 py-3 sm:py-4 ${className}`}
      style={{ '--navbar-height': '4rem' } as React.CSSProperties}
    >
      <header className="z-40 flex px-3 sm:px-4 lg:px-6 gap-2 sm:gap-3 lg:gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-full overflow-x-hidden">
        {/* Logo Section */}
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border">
          <Link to="/" className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <img
              src="/UpSwitch_logo_var1.svg?v=2024.4"
              alt="Upswitch - European SME M&A Platform"
              width="32"
              height="32"
              className="logo-image transition-opacity hover:opacity-80 w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
              loading="lazy"
              style={{
                height: '32px',
                objectFit: 'contain',
                opacity: 1,
                visibility: 'visible',
                display: 'block',
              }}
            />
            <span className="font-display text-lg sm:text-xl font-light text-primary-700 leading-none mt-0.5 flex-shrink-0">
              Upswitch
            </span>
          </Link>
        </div>

        {/* Center Navigation - Desktop (Growth Marketing Optimized) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
          <ul className="h-full flex-row flex-nowrap items-center flex gap-6">
            {/* For Business Owners - Dropdown */}
            <li className="text-medium whitespace-nowrap box-border list-none flex items-center">
              <Dropdown>
                <DropdownTrigger>
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors relative group ${
                      isActiveLink('/valuation') || isActiveLink('/for-sellers')
                        ? 'text-primary-600 font-semibold'
                        : 'text-neutral-700 hover:text-primary-600'
                    }`}
                  >
                    For Business Owners
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 transition-transform origin-left ${
                        isActiveLink('/valuation') || isActiveLink('/for-sellers')
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Business Owners Menu"
                  className="w-64 p-0"
                  itemClasses={{
                    base: 'rounded-md',
                  }}
                >
                  <DropdownItem
                    key="get-valuation"
                    onClick={() => navigate('/valuation')}
                    className="py-3 px-4 hover:bg-primary-50 transition-colors"
                    description="Know your business worth"
                  >
                    <div className="font-medium">Get Free Valuation</div>
                  </DropdownItem>
                  <DropdownItem
                    key="sell-business"
                    onClick={() => navigate('/for-sellers')}
                    className="py-3 px-4 hover:bg-primary-50 transition-colors"
                    description="List your business for sale"
                  >
                    <div className="font-medium">Sell My Business</div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>

            {/* For Buyers - Dropdown */}
            <li className="text-medium whitespace-nowrap box-border list-none flex items-center">
              <Dropdown>
                <DropdownTrigger>
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors relative group ${
                      isActiveLink('/search') || isActiveLink('/browse')
                        ? 'text-primary-600 font-semibold'
                        : 'text-neutral-700 hover:text-primary-600'
                    }`}
                  >
                    For Buyers
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 transition-transform origin-left ${
                        isActiveLink('/search') || isActiveLink('/browse')
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Buyers Menu"
                  className="w-64 p-0"
                  itemClasses={{
                    base: 'rounded-md',
                  }}
                >
                  <DropdownItem
                    key="browse-businesses"
                    onClick={() => navigate(UrlGenerator.search())}
                    className="py-3 px-4 hover:bg-primary-50 transition-colors"
                    description="Find businesses for sale"
                  >
                    <div className="font-medium">Browse Businesses</div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>

            {/* How It Works - Education */}
            <li className="text-medium whitespace-nowrap box-border list-none">
              <Link
                to="/how-it-works"
                className={`text-sm font-medium transition-colors relative group ${
                  isActiveLink('/how-it-works')
                    ? 'text-primary-600 font-semibold'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                How It Works
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 transition-transform origin-left ${
                    isActiveLink('/how-it-works')
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            </li>

            {/* Pricing - Transparency */}
            <li className="text-medium whitespace-nowrap box-border list-none">
              <Link
                to={UrlGenerator.pricing()}
                className={`text-sm font-medium transition-colors relative group ${
                  isActiveLink('/pricing')
                    ? 'text-primary-600 font-semibold'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                Pricing
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 transition-transform origin-left ${
                    isActiveLink('/pricing') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            </li>

            {/* Resources Dropdown */}
            <li className="text-medium whitespace-nowrap box-border list-none flex items-center">
              <Dropdown>
                <DropdownTrigger>
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors relative group ${
                      isActiveLink('/blog') ||
                      isActiveLink('/success-stories') ||
                      isActiveLink('/faq')
                        ? 'text-primary-600 font-semibold'
                        : 'text-neutral-700 hover:text-primary-600'
                    }`}
                  >
                    Resources
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 transition-transform origin-left ${
                        isActiveLink('/faq') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="FAQ & Help Center"
                  className="min-w-[200px]"
                  onAction={key =>
                    navigate(resourceItems.find(item => item.key === key)?.href || '/')
                  }
                >
                  {resourceItems.map(item => (
                    <DropdownItem
                      key={item.key}
                      className={isActiveLink(item.href) ? 'bg-primary-50 text-primary-700' : ''}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-end bg-transparent items-center min-w-0">
          <ul
            className="h-full flex-row flex-nowrap flex items-center gap-2 sm:gap-3 lg:gap-4"
            data-justify="end"
          >
            {/* Desktop Actions */}
            <li className="text-medium whitespace-nowrap box-border list-none hidden lg:flex items-center gap-3">
              {user ? (
                renderUserMenu()
              ) : isCheckingAuth ? (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">•</span>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleLogin}
                    className="text-neutral-700 hover:text-primary-600 hidden xl:inline-flex"
                  >
                    Log in
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handlePrimaryCTA}
                    className="px-4 xl:px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm xl:text-base whitespace-nowrap"
                  >
                    <span className="hidden xl:inline">Get Free Valuation</span>
                    <span className="xl:hidden">Get Valued</span>
                  </Button>
                </>
              )}
            </li>

            {/* Mobile Actions */}
            <li className="text-medium whitespace-nowrap box-border list-none flex lg:hidden items-center gap-1.5 sm:gap-2">
              {user ? (
                <>
                  {renderUserMenu()}
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={onMobileMenuToggle}
                    className="text-neutral-700 min-w-[44px] min-h-[44px]"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
                  </Button>
                </>
              ) : isCheckingAuth ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">•</span>
                  </div>
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={onMobileMenuToggle}
                    className="text-neutral-700 min-w-[44px] min-h-[44px]"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handlePrimaryCTA}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs sm:text-sm min-h-[44px] sm:min-h-0 whitespace-nowrap"
                  >
                    Get Valued
                  </Button>
                  <Button
                    isIconOnly
                    variant="tertiary"
                    onClick={onMobileMenuToggle}
                    className="text-neutral-700 min-w-[44px] min-h-[44px]"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      </header>
    </nav>
  );
};

export default NavigationDesktop;
