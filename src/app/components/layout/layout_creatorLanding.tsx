import React, { useEffect, useState } from 'react';
import { logos } from '../../../assets/logos';
import { Button, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link, Outlet } from 'react-router-dom';
import Container from '../main_UI/containers/container_default';
import Footer from '../footer';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { authService } from '../../services/users/authenticationService';
import { User as UserProfile } from '../../types/shared/index';
import { UserAvatarDropdown } from '../account/account_UI/navigation';
import { BetweendealsLogo } from '../common';

const CreatorLandingLayout = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { openModal } = useAuthModal();

  // Check authentication status on mount
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
  }, []);

  // Listen for logout events to re-check authentication
  useEffect(() => {
    const handleAuthChange = () => {
      console.log(
        '🎯 Auth change event detected in creators layout, re-checking authentication...'
      );
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
      }, 100);
    };

    window.addEventListener('auth-logout', handleAuthChange);

    return () => {
      window.removeEventListener('auth-logout', handleAuthChange);
    };
  }, []);

  return (
    <div>
      <Navbar
        className="pt-8 px-0 lg:px-4 bg-transparent !backdrop-blur-none !backdrop-saturate-100"
        maxWidth="2xl"
      >
        <NavbarBrand>
          <Link to={UrlGeneratorService.root()} className="group nav-logo-group">
            <div className="flex items-center justify-center">
              <BetweendealsLogo
                variant="header"
                className="w-12 h-12 transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end" className="gap-4">
          <NavbarItem className="flex items-center ml-4">
            {!isCheckingAuth &&
              (user ? (
                <UserAvatarDropdown user={user} />
              ) : (
                <button
                  onClick={() => openModal('signup')}
                  className="ml-4 bg-white hover:bg-zinc-100 text-black px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
                >
                  Join the Beta
                </button>
              ))}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default CreatorLandingLayout;
