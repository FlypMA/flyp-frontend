// 🧭 Simple Navigation Component
// Location: src/app/components/navigation/NavigationSimple.tsx
// Purpose: Clean, working navigation without complex auth logic

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Menu } from 'lucide-react';
import { useAuthModal } from '../../../shared/stores/AuthModalContext';
import { useBusinessModal } from '../../contexts/BusinessModalContext';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useAuthModal();
  const { openBusinessModal } = useBusinessModal();

  const handleLoginClick = () => {
    openModal('login');
  };

  const handleSignupClick = () => {
    openModal('signup');
  };

  const handleBusinessClick = () => {
    openBusinessModal('business');
  };

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Flyp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/marketplace"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/marketplace')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Marketplace
              </Link>
              <Link
                to="/sellers"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/sellers')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                For Sellers
              </Link>
              <Link
                to="/buyers"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/buyers')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                For Buyers
              </Link>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoginClick}
                className="text-gray-700 hover:text-blue-600"
              >
                Sign In
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="sm"
                onClick={handleSignupClick}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
              <Button
                variant="bordered"
                size="sm"
                onClick={handleBusinessClick}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                List Business
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              isIconOnly
              variant="ghost"
              className="text-gray-700 hover:text-blue-600"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              to="/marketplace"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/sellers"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              For Sellers
            </Link>
            <Link
              to="/buyers"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              For Buyers
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLoginClick}
                  className="w-full text-left justify-start"
                >
                  Sign In
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  onClick={handleSignupClick}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Button>
                <Button
                  variant="bordered"
                  size="sm"
                  onClick={handleBusinessClick}
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  List Business
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
