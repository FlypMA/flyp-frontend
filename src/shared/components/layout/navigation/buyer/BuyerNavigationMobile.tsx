// 📱 Buyer Mobile Navigation
// Location: src/shared/components/layout/navigation/buyer/BuyerNavigationMobile.tsx
// Purpose: Mobile navigation for buyers (like Airbnb guest mode)
//
// Features:
// - Mobile menu overlay
// - User authentication options
// - No "List your business" option (buyers don't list)
// - Clean, minimal design

import { Button } from '@/shared/components/buttons';
import { X } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { User } from '../../../../types';

interface BuyerNavigationMobileProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

const BuyerNavigationMobile: React.FC<BuyerNavigationMobileProps> = ({
  user,
  isOpen,
  onToggle,
}) => {
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

                {/* User Actions */}
                <div className="space-y-2">
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
                  <p className="text-gray-500 mb-6">Sign in to access your account</p>
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

export default BuyerNavigationMobile;
