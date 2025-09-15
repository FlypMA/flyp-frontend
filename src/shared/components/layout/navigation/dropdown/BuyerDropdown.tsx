// 🛒 Buyer Dropdown - MVP Version
// Location: src/shared/components/navigation/dropdown/BuyerDropdown.tsx
// Purpose: Buyer-specific user avatar dropdown based on legacy user_avatar_dropdown.tsx
//
// Features:
// - Buyer-focused navigation items
// - Browse businesses, saved items, messages
// - Account settings and help
// - Logout functionality

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  User as UserIcon
} from 'lucide-react';
import { User } from '../../../../types';
import { UrlGenerator } from '../../../../services';
import { AuthenticationService } from '../../../../services/auth/Auth';
import { getBuyerDropdownItems, createNavigationHandler, getUserInitials, getUserDisplayRole } from '../utils';

interface BuyerDropdownProps {
  user: User;
}

const BuyerDropdown: React.FC<BuyerDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Initialize auth service and navigation handler
  const authService = new AuthenticationService();
  const navigationHandler = createNavigationHandler(navigate, authService);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Get menu items - exact copy from legacy
  const menuItems = getBuyerDropdownItems();

  const handleItemClick = (item: any) => {
    if (item.isLogout) {
      navigationHandler.handleLogout();
    } else if (item.action) {
      navigationHandler.handleMenuClick(item.action);
    } else if (item.href) {
      navigate(item.href);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={`${user.name || user.email} - Account Menu`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getUserInitials(user)}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {/* User Profile Header */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {getUserInitials(user)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user.email}
                  </div>
                  <div className="text-xs text-gray-400 capitalize">
                    {getUserDisplayRole(user)}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => {
                if (item.divider) {
                  return (
                    <div
                      key={index}
                      className="my-2 border-t border-gray-200"
                      role="separator"
                    />
                  );
                }

                const Icon = item.icon;
                const isLogout = item.isLogout;

                return (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-150 ${
                      isLogout
                        ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    role="menuitem"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyerDropdown;