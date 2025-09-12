// 🚀 Unified Navigation - Clean, modular implementation matching legacy functionality
// Location: src/shared/components/navigation/UnifiedNavigation.tsx
// Purpose: Main navigation bar with authentication, mobile support, and user context

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Menu } from 'lucide-react';
import UserAvatarDropdown from './UserAvatarDropdown';
import BetweendealsLogo from '../ui/BetweendealsLogo';
import { useAuthModal } from '../../../features/authentication/hooks/useAuthModal';
// TODO: Import actual services when available
// import { authService } from '../../services/users/authenticationService';

interface NavigationProps {
  className?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'both' | 'admin';
  avatar?: string;
}

const UnifiedNavigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useAuthModal();

  // State management
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  // Authentication check
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Check for token existence
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

      const hasAuthToken = !!token && token !== '';
      setHasToken(hasAuthToken);

      if (!hasAuthToken) {
        setUser(null);
        return;
      }

      setIsCheckingAuth(true);

      // TODO: Replace with actual auth service
      // const authResult = await authService.checkAuthentication();
      // Mock auth check for now
      const mockAuthResult = {
        isAuthenticated: false,
        user: null,
      };

      if (mockAuthResult.isAuthenticated && mockAuthResult.user) {
        setUser(mockAuthResult.user);
      } else {
        setUser(null);
        setHasToken(false);
      }
    } catch (error) {
      console.error('Navigation: Auth check failed:', error);
      setUser(null);
      setHasToken(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Navigation items - matching legacy exactly
  const getNavigationItems = () => {
    return [
      { label: 'For Sellers', href: '/for-sellers', highlight: false },
      { label: 'For Buyers', href: '/search', highlight: false },
      { label: 'Valuation', href: '/resources/valuation-guide', highlight: false },
    ];
  };

  const handleAuthAction = (action: 'login' | 'signup') => {
    // Use the auth modal system for seamless UX
    openModal(action);
  };

  const handlePrimaryCTA = () => {
    // Default signup action - can be enhanced with context detection later
    handleAuthAction('signup');
  };

  const handleSecondaryCTA = () => {
    // Default login action
    handleAuthAction('login');
  };

  const handleLogout = async () => {
    try {
      // TODO: Implement actual logout
      // await authService.logout();
      setUser(null);
      setHasToken(false);
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSellBusiness = () => {
    if (user) {
      if (user.role === 'seller' || user.role === 'both' || user.role === 'admin') {
        navigate('/my-business');
      } else {
        navigate('/my-business/listings/new');
      }
    } else {
      handleAuthAction('signup');
    }
  };

  const renderUserMenu = () => {
    if (user) {
      return <UserAvatarDropdown user={user} />;
    }
    return null;
  };

  const navigationItems = getNavigationItems();

  return (
    <nav
      className={`flex w-full h-auto items-center justify-center backdrop-blur-lg backdrop-saturate-150 bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30 py-4 ${className}`}
      style={{ '--navbar-height': '4rem' } as React.CSSProperties}
    >
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-full">
        {/* Logo Section */}
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border">
          <Link to="/" className="flex items-center space-x-3">
            <BetweendealsLogo variant="header" priority={true} />
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
              ) : isCheckingAuth || (hasToken && !isCheckingAuth) ? (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">•</span>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSecondaryCTA}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    Log in
                  </button>
                  <button
                    onClick={handlePrimaryCTA}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    Sell your business
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
                    variant="ghost"
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 min-w-10 w-10 h-10"
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </>
              ) : (
                <>
                  <button
                    onClick={handlePrimaryCTA}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    Sell
                  </button>
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 min-w-10 w-10 h-10"
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            {navigationItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {!user && (
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <button
                  onClick={() => {
                    handleSecondaryCTA();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium py-2"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    handlePrimaryCTA();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  Sell your business
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default UnifiedNavigation;
