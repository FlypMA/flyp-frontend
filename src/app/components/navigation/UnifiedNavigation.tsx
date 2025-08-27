import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Menu } from 'lucide-react';
import { User as UserType } from '../../types/api/users/user';
import { UserAvatarDropdown } from '../account/account_UI/navigation';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { authService } from '../../services/users/authenticationService';

interface UnifiedNavigationProps {
  className?: string;
}

const UnifiedNavigation: React.FC<UnifiedNavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const [user, setUser] = useState<UserType | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useAuthModal();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => checkAuth();
    const handleLogout = () => {
      setUser(null);
      setIsCheckingAuth(false);
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('auth-logout', handleLogout);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('auth-logout', handleLogout);
    };
  }, []);

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
              style={{ height: '32px', objectFit: 'contain', opacity: 1, visibility: 'visible', display: 'block' }}
            />
            <span className="text-xl font-bold text-gray-900 ml-2">betweendeals</span>
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
            {!isCheckingAuth &&
              (user ? (
                <UserAvatarDropdown user={user} />
              ) : (
                <>
                  <button
                    onClick={() => openModal('login')}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => openModal('signup')}
                    data-conversion="CTA - Sell your business"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
                  >
                    Sell your business
                  </button>
                </>
              ))}
          </li>

          {/* Mobile Actions */}
          <li className="text-medium whitespace-nowrap box-border list-none flex lg:hidden items-center gap-2">
            {!isCheckingAuth &&
              (user ? (
                // Mobile: Show Avatar + Menu Toggle when logged in
                <>
                  <UserAvatarDropdown user={user} />
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
                // Mobile: Show CTA + Menu Toggle when logged out
                <>
                  <button
                    onClick={() => openModal('signup')}
                    data-conversion="CTA - Sell your business (mobile)"
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
              ))}
          </li>
        </ul>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/for-sellers" 
              className="block text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Sellers
            </Link>
            <Link 
              to="/search" 
              className="block text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Buyers
            </Link>
            <Link 
              to="/resources/valuation-guide" 
              className="block text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Valuation
            </Link>
            
            {!user && (
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <button
                  onClick={() => {
                    openModal('login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium py-2"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    openModal('signup');
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
