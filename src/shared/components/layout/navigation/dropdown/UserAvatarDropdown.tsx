import { authService } from '@/shared/services/auth';
import {
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../../services/urls/urlGenerator';
import { User } from '../../../../types';

interface UserAvatarDropdownProps {
  user: User;
}

const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.dispatchEvent(new CustomEvent('auth-logout'));
      window.dispatchEvent(new CustomEvent('auth-change'));
      navigate(UrlGenerator.root());
    } catch (error) {
      navigate(UrlGenerator.root());
    }
    setIsOpen(false);
  };

  const handleMenuClick = (action: string) => {
    setIsOpen(false);

    switch (action) {
      // Buyer navigation
      case 'browse-listings':
        navigate(UrlGenerator.listings());
        break;
      case 'saved':
        navigate(UrlGenerator.savedItems());
        break;

      // Business Owner navigation
      case 'business-dashboard':
      case 'my-business':
        navigate(UrlGenerator.myBusiness());
        break;
      case 'my-listings':
        navigate(UrlGenerator.myBusiness());
        break;
      case 'valuation':
        navigate(UrlGenerator.businessValuations());
        break;
      case 'performance':
        navigate(UrlGenerator.businessPerformance());
        break;
      case 'documents':
        navigate(UrlGenerator.businessDocuments());
        break;

      // Common navigation
      case 'messages':
        navigate(UrlGenerator.messages());
        break;
      case 'profile-settings':
        navigate(UrlGenerator.userSettings());
        break;
      case 'help-center':
        navigate(UrlGenerator.help());
        break;
      case 'create-listing':
        // Dispatch custom event to trigger ListingWizardModal instead of navigating
        window.dispatchEvent(new CustomEvent('open-listing-wizard'));
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  const isSeller = user?.role === 'seller' || user?.role === 'both';
  const isBuyer = user?.role === 'buyer' || user?.role === 'both';

  const defaultAvatar =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80';

  const buyerMenuItems = [
    {
      key: 'browse-listings',
      icon: LayoutDashboard,
      label: 'Browse Businesses',
      action: 'browse-listings',
    },
    {
      key: 'saved',
      icon: Heart,
      label: 'Saved Items',
      action: 'saved',
    },
    {
      key: 'messages',
      icon: MessageCircle,
      label: 'Messages',
      action: 'messages',
    },
    {
      key: 'divider-1',
      isDivider: true,
    },
    {
      key: 'profile-settings',
      icon: Settings,
      label: 'Account Settings',
      action: 'profile-settings',
    },
    {
      key: 'help-center',
      icon: HelpCircle,
      label: 'Help Center',
      action: 'help-center',
    },
    {
      key: 'divider-2',
      isDivider: true,
    },
    {
      key: 'logout',
      icon: LogOut,
      label: 'Log Out',
      action: 'logout',
      isLogout: true,
    },
  ];

  const businessOwnerMenuItems = [
    {
      key: 'business-dashboard',
      icon: LayoutDashboard,
      label: 'My Business',
      action: 'business-dashboard',
    },
    {
      key: 'divider-1',
      isDivider: true,
    },
    {
      key: 'profile-settings',
      icon: Settings,
      label: 'Account Settings',
      action: 'profile-settings',
    },
    {
      key: 'help-center',
      icon: HelpCircle,
      label: 'Get Help',
      action: 'help-center',
    },
    {
      key: 'create-listing',
      icon: Plus,
      label: 'Create a New Listing',
      action: 'create-listing',
    },
    {
      key: 'divider-2',
      isDivider: true,
    },
    {
      key: 'logout',
      icon: LogOut,
      label: 'Log Out',
      action: 'logout',
      isLogout: true,
    },
  ];

  const menuItems = isSeller ? businessOwnerMenuItems : buyerMenuItems;

  const getUserInitials = (user: User) => {
    if (user.name) {
      const parts = user.name.split(' ');
      if (parts.length > 1) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
      }
      return parts[0].charAt(0).toUpperCase();
    }
    return user.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="relative">
      {/* Clean Avatar - No borders, spacing, or effects */}
      <img
        ref={avatarRef}
        src={user?.avatar || defaultAvatar}
        alt={user?.name || 'User'}
        className="w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      />

      {/* Mobile: Full Screen Modal, Desktop: Dropdown */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile: Full Screen Modal */}
          <div className="fixed inset-0 z-50 sm:hidden">
            <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="overflow-y-auto max-h-[calc(80vh-130px)] p-4">
                {menuItems.map((item, index) => {
                  if (item.isDivider) {
                    return <div key={item.key} className="h-px bg-gray-200 my-3" />;
                  }

                  const Icon = item.icon!;

                  return (
                    <button
                      key={item.key}
                      onClick={() => handleMenuClick(item.action!)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all ${
                        item.isLogout
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      role="menuitem"
                      tabIndex={0}
                    >
                      <div
                        className={`p-2 rounded-lg ${item.isLogout ? 'bg-red-100' : 'bg-gray-100'}`}
                      >
                        <Icon
                          className={`w-5 h-5 ${item.isLogout ? 'text-red-600' : 'text-gray-600'}`}
                        />
                      </div>
                      <span className="flex-1 font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop: Dropdown */}
          <div
            ref={dropdownRef}
            className="hidden sm:block absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border-0 z-50 overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            style={{
              filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
            }}
          >
            {menuItems.map((item, index) => {
              if (item.isDivider) {
                return <div key={item.key} className="h-px bg-gray-200 my-1" role="separator" />;
              }

              const Icon = item.icon!;
              const isFirst = index === 0;
              const isLast = index === menuItems.length - 1;

              return (
                <button
                  key={item.key}
                  className={`
                  w-full flex items-center gap-3 px-4 py-4 sm:py-3 text-base sm:text-sm font-medium text-gray-700 
                  hover:bg-gray-50 transition-colors duration-150 text-left border-0 bg-transparent
                  ${isFirst ? 'rounded-t-xl' : ''} 
                  ${isLast ? 'rounded-b-xl' : ''}
                  ${item.isLogout ? 'text-gray-700 hover:bg-gray-50' : ''}
                `}
                  onClick={() => handleMenuClick(item.action!)}
                  role="menuitem"
                  tabIndex={0}
                >
                  <Icon className="w-5 h-5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default UserAvatarDropdown;
