import React, { useEffect, useState } from 'react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Container from '../main_UI/containers/container_default';
import Footer from '../footer';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { authService } from '../../services/users/authenticationService';
import { User } from '../../types/api/users/user';
import { UserAvatarDropdown } from '../account/account_UI/navigation';
import { BetweendealsLogo } from '../common';
import MobileNavigation from '../navigation/MobileNavigation';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 140;
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
  }
};

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sectionToScroll, setSectionToScroll] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal, activeModal } = useAuthModal();

  // All pages now use white navbar background

  useEffect(() => {
    if (sectionToScroll && location.pathname === UrlGeneratorService.root()) {
      scrollToSection(sectionToScroll);
      setSectionToScroll(null);
    }
  }, [location, sectionToScroll]);

  // Check authentication status on mount and location changes
  useEffect(() => {
    const checkAuthentication = async () => {
      setIsCheckingAuth(true);
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [location.pathname]);

  // Listen for logout events to re-check authentication
  useEffect(() => {
    const handleAuthChange = () => {
      setIsCheckingAuth(true);
      setTimeout(async () => {
        try {
          const authResult = await authService.checkAuthentication();
          if (authResult.isAuthenticated && authResult.user) {
            setUser(authResult.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error checking authentication after logout:', error);
          setUser(null);
        } finally {
          setIsCheckingAuth(false);
        }
      }, 100); // Small delay to ensure logout completes
    };

    // Listen for custom logout events
    window.addEventListener('auth-logout', handleAuthChange);

    return () => {
      window.removeEventListener('auth-logout', handleAuthChange);
    };
  }, []);

  const handleNavigationAndScroll = (sectionId: string) => {
    if (location.pathname !== UrlGeneratorService.root()) {
      navigate(UrlGeneratorService.root(), { replace: true });
      setSectionToScroll(sectionId);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <div>
      {/* Mobile Navigation Sidebar */}
      <MobileNavigation
        user={user}
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      <Navbar
        data-scope="navigation"
        className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30 py-4"
        maxWidth="full"
      >
        <NavbarBrand>
          <Link to={UrlGeneratorService.root()} className="flex items-center space-x-3">
            <BetweendealsLogo variant="header" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900 ml-2">betweendeals</span>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden lg:flex gap-8" justify="center">
          <NavbarItem>
            <Link
              to="/for-sellers"
              className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              For Sellers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to="/search"
              className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              For Buyers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to="/resources/valuation-guide"
              className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              Valuation
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="flex items-center gap-4">
          {/* Desktop Actions */}
          <NavbarItem className="hidden lg:flex items-center gap-4">
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
          </NavbarItem>

          {/* Mobile Actions */}
          <NavbarItem className="flex lg:hidden items-center gap-2">
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
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
