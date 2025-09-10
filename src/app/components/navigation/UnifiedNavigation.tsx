import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Menu } from 'lucide-react';
import { User as UserProfile } from '../../../types/user.consolidated';
import { UserAvatarDropdown } from '../account/account_UI/navigation';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { useBusinessModal } from '../../contexts/BusinessModalContext';
import { authService } from '../../services/users/authenticationService';
import { detectUserContext, UserIntent } from '../../utils/contextDetection';

interface UnifiedNavigationProps {
  className?: string;
}

const UnifiedNavigation: React.FC<UnifiedNavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false); // Start optimistic
  const [hasToken, setHasToken] = useState(false); // Track token presence immediately
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useAuthModal();
  const { openBusinessModal } = useBusinessModal();

  // Detect user context based on current page
  const contextInfo = detectUserContext(
    location.pathname,
    document.referrer,
    new URLSearchParams(location.search)
  );

  // Immediate optimistic auth check
  useEffect(() => {
    // IMMEDIATE TOKEN CHECK - Show avatar instantly if token exists
    const checkTokenExists = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

      const hasAuthToken = !!token && token !== '';
      console.log('⚡ UnifiedNavigation: Immediate token check:', hasAuthToken);
      setHasToken(hasAuthToken);

      // If no token, we know immediately there's no user
      if (!hasAuthToken) {
        setUser(null);
        setIsCheckingAuth(false);
      }
    };

    // Check token immediately (synchronous)
    checkTokenExists();

    const checkAuth = async () => {
      // Only proceed with full auth check if we have a token
      if (!hasToken) return;

      try {
        console.log('🔍 UnifiedNavigation: Background auth validation...');
        setIsCheckingAuth(true); // Only set loading when actually checking

        const authResult = await authService.checkAuthentication();
        console.log('🔍 UnifiedNavigation: Auth result:', authResult);

        if (authResult.isAuthenticated && authResult.user) {
          console.log('✅ UnifiedNavigation: User authenticated:', authResult.user);
          setUser(authResult.user);
        } else {
          console.log('❌ UnifiedNavigation: Auth validation failed');
          setUser(null);
          setHasToken(false); // Token invalid, remove optimistic state
        }
      } catch (error) {
        console.error('❌ UnifiedNavigation: Auth check failed:', error);
        setUser(null);
        setHasToken(false); // On error, assume no valid auth
      } finally {
        setIsCheckingAuth(false);
      }
    };

    // Initial auth check
    checkAuth();

    // Fail-safe timeout to ensure UI doesn't hang on auth check
    const authTimeout = setTimeout(() => {
      if (isCheckingAuth) {
        console.warn('⚠️ UnifiedNavigation: Auth check timeout, forcing completion');
        setIsCheckingAuth(false);
      }
    }, 5000); // 5 second timeout

    // Listen for auth changes
    const handleAuthChange = () => {
      console.log('📡 UnifiedNavigation: Auth change event received, rechecking...');
      setIsCheckingAuth(true); // Set checking state during recheck
      checkAuth();
    };
    const handleLogout = () => {
      console.log('📡 UnifiedNavigation: Logout event received');
      setUser(null);
      setIsCheckingAuth(false);
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('auth-logout', handleLogout);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('auth-logout', handleLogout);
      clearTimeout(authTimeout); // Clean up timeout
    };
  }, []);

  // Handle context-aware CTA actions
  const handlePrimaryCTA = () => {
    switch (contextInfo.primaryCTA.action) {
      case 'business-valuation':
        // Open business modal starting with valuation hook
        openBusinessModal('business-listing', 'valuation-hook', {
          url: '/my-business/overview',
          state: { source: 'navbar-valuation', confidence: contextInfo.confidence },
        });
        break;
      case 'business-listing':
        // Open business modal starting with listing pitch (skip valuation)
        openBusinessModal('business-listing', 'listing-pitch', {
          url: '/my-business/overview',
          state: { source: 'navbar-listing', confidence: contextInfo.confidence },
        });
        break;
      case 'signup-seller':
        openModal('signup', {
          // intent: 'seller', // Removed for type compatibility
          url: location.pathname.includes('/valuation')
            ? '/my-business/valuation'
            : '/seller/listings/new',
          state: { detectedIntent: 'seller', confidence: contextInfo.confidence },
        });
        break;
      case 'signup-buyer':
        openModal('signup', {
          // intent: 'buyer', // Removed for type compatibility
          url: '/search',
          state: { detectedIntent: 'buyer', confidence: contextInfo.confidence },
        });
        break;
      case 'signup-neutral':
        openModal('signup', {
          url: '/',
          state: { detectedIntent: 'neutral', confidence: contextInfo.confidence },
        });
        break;
      default:
        openModal('signup');
    }
  };

  const handleSecondaryCTA = () => {
    switch (contextInfo.secondaryCTA.action) {
      case 'login':
        openModal('login');
        break;
      case 'explore-alternative':
        if (contextInfo.intent === 'seller') {
          navigate('/search');
        } else if (contextInfo.intent === 'buyer') {
          // If buyer wants to explore selling, show valuation hook
          openBusinessModal('business-listing', 'valuation-hook', {
            url: '/my-business/overview',
            state: { source: 'navbar-explore', confidence: 'medium' },
          });
        } else {
          navigate('/for-sellers');
        }
        break;
      default:
        openModal('login');
    }
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
              {(() => {
                console.log('🖥️ UnifiedNavigation DESKTOP RENDER:', {
                  isCheckingAuth,
                  user: !!user,
                  userRole: user?.role,
                });
                return user ? (
                  <UserAvatarDropdown user={user} />
                ) : hasToken ? (
                  /* Optimistic avatar placeholder while loading user data */
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                      <span className="text-white text-sm font-medium">•</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleSecondaryCTA}
                      className={contextInfo.secondaryCTA.className}
                    >
                      {contextInfo.secondaryCTA.text}
                    </button>
                    <button
                      onClick={handlePrimaryCTA}
                      data-conversion={`CTA - ${contextInfo.primaryCTA.text}`}
                      className={contextInfo.primaryCTA.className}
                      title={`${contextInfo.primaryCTA.text} (${contextInfo.confidence} confidence)`}
                    >
                      {contextInfo.primaryCTA.text}
                    </button>
                  </>
                );
              })()}
            </li>

            {/* Mobile Actions */}
            <li className="text-medium whitespace-nowrap box-border list-none flex lg:hidden items-center gap-2">
              {(() => {
                console.log('📱 UnifiedNavigation MOBILE RENDER:', {
                  isCheckingAuth,
                  user: !!user,
                  userRole: user?.role,
                });
                return (
                  !isCheckingAuth &&
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
                        onClick={() => {
                          handlePrimaryCTA();
                        }}
                        data-conversion={`CTA - ${contextInfo.primaryCTA.text} (mobile)`}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        {contextInfo.intent === 'buyer'
                          ? 'Find'
                          : contextInfo.intent === 'seller'
                            ? 'List'
                            : 'Start'}
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
                  ))
                );
              })()}
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
                    handleSecondaryCTA();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium py-2"
                >
                  {contextInfo.secondaryCTA.text}
                </button>
                <button
                  onClick={() => {
                    handlePrimaryCTA();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  {contextInfo.primaryCTA.text}
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
