// 📱 Seller Mobile Navigation
// Location: src/shared/components/layout/navigation/seller/SellerNavigationMobile.tsx
// Purpose: Mobile navigation for sellers (like Airbnb host mode)
//
// Features:
// - Mobile menu overlay
// - Navigation items: Overview, Valuation, Data Room
// - User authentication options
// - Clean, minimal design

import { Button } from '@/shared/components/buttons';
import { X } from 'lucide-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { UrlGenerator } from '../../../../services';
import { User } from '../../../../types';

interface SellerNavigationMobileProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

const SellerNavigationMobile: React.FC<SellerNavigationMobileProps> = ({
  user,
  isOpen,
  onToggle,
}) => {
  const location = useLocation();
  const { openModal } = useAuth();

  const handleLogin = () => {
    openModal('login');
    onToggle();
  };

  const handleSignup = () => {
    openModal('signup');
    onToggle();
  };

  const handleLogout = () => {
    // Dispatch logout event for auth provider to handle
    window.dispatchEvent(new CustomEvent('auth-logout'));
    onToggle();
  };

  // Navigation items for sellers
  const navigationItems = [
    {
      label: 'My business',
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
      label: 'Listings',
      path: UrlGenerator.businessListings(),
      isActive: (pathname: string) => pathname.startsWith('/my-business/listings'),
    },
    {
      label: 'Messages',
      path: '/messages',
      isActive: (pathname: string) => pathname.startsWith('/messages'),
    },
    {
      label: 'Documents',
      path: UrlGenerator.businessDocuments(),
      isActive: (pathname: string) => pathname.startsWith('/my-business/documents'),
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 sm:max-w-[85vw] bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button
              isIconOnly
              variant="tertiary"
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700 min-w-[44px] min-h-[44px]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 px-6 py-4">
            {user ? (
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name?.[0] || user.email?.[0] || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name || user.email}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Business Management
                  </h3>
                  {navigationItems.map(item => {
                    const isActive = item.isActive(location.pathname);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block w-full px-4 py-4 sm:py-3 text-base sm:text-sm text-left rounded-lg transition-colors ${
                          isActive
                            ? 'text-primary-600 bg-primary-50 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={onToggle}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* User Actions */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Account
                  </h3>
                  <Link
                    to="/profile"
                    className="block w-full px-4 py-4 sm:py-3 text-base sm:text-sm text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={onToggle}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block w-full px-4 py-4 sm:py-3 text-base sm:text-sm text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={onToggle}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-4 sm:py-3 text-base sm:text-sm text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to UpSwitch</h3>
                  <p className="text-gray-500 mb-6">Sign in to manage your business</p>
                </div>

                <div className="space-y-3">
                  <Button variant="primary" size="lg" className="w-full" onClick={handleLogin}>
                    Log in
                  </Button>
                  <Button variant="tertiary" size="lg" className="w-full" onClick={handleSignup}>
                    Sign up
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerNavigationMobile;
