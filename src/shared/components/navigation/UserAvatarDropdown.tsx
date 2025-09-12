// 👤 User Avatar Dropdown - Matching legacy functionality exactly
// Location: src/shared/components/navigation/UserAvatarDropdown.tsx
// Purpose: User avatar dropdown with role-based navigation options

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Building2,
  MessageCircle,
  Settings,
  HelpCircle,
  Store,
  LogOut,
  LayoutDashboard,
  Search,
  MessageSquare,
  Calculator,
  FileText,
  TrendingUp,
  Target,
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'both' | 'admin';
  avatar?: string;
}

interface UserAvatarDropdownProps {
  user: UserProfile;
}

const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  // Close dropdown when clicking outside
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
      console.log('🔓 Initiating logout...');

      // Clear access_token cookie directly
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      console.log('🍪 Cleared access_token cookie');

      // Dispatch events for navigation state synchronization
      window.dispatchEvent(new CustomEvent('auth-logout'));
      window.dispatchEvent(new CustomEvent('auth-change'));

      console.log('✅ Logout successful, navigating to home');
      navigate('/');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // Fallback: force navigation even if logout fails
      navigate('/');
    }
    setIsOpen(false);
  };

  const handleMenuClick = (action: string) => {
    setIsOpen(false);

    switch (action) {
      // Buyer navigation
      case 'browse-listings':
        navigate('/search');
        break;
      case 'saved':
        navigate('/users/saved');
        break;

      // Business Owner navigation
      case 'business-dashboard':
        navigate('/my-business');
        break;
      case 'my-business':
        navigate('/my-business');
        break;
      case 'my-listings':
        navigate('/my-business/listings');
        break;
      case 'valuation':
        navigate('/my-business/valuations');
        break;
      case 'performance':
        navigate('/my-business/performance');
        break;
      case 'documents':
        navigate('/my-business/documents');
        break;

      // Common navigation
      case 'messages':
        navigate('/messages');
        break;
      case 'profile-settings':
        navigate('/users/settings');
        break;
      case 'help-center':
        navigate('/help');
        break;
      case 'create-listing':
        navigate('/my-business/listings/new');
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  // Role detection
  const isSeller = user.role === 'seller' || user.role === 'both' || user.role === 'admin';
  const isBuyer = user.role === 'buyer' || user.role === 'both' || user.role === 'admin';

  const defaultAvatar =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80';

  // BUYER DROPDOWN MENU
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
      key: 'logout',
      icon: LogOut,
      label: 'Sign Out',
      action: 'logout',
      isDangerous: true,
    },
  ];

  // SELLER DROPDOWN MENU
  const sellerMenuItems = [
    {
      key: 'business-dashboard',
      icon: LayoutDashboard,
      label: 'Business Overview',
      action: 'business-dashboard',
    },
    {
      key: 'my-listings',
      icon: Store,
      label: 'My Listings',
      action: 'my-listings',
    },
    {
      key: 'valuation',
      icon: Calculator,
      label: 'Valuation',
      action: 'valuation',
    },
    {
      key: 'performance',
      icon: TrendingUp,
      label: 'Performance',
      action: 'performance',
    },
    {
      key: 'messages',
      icon: MessageCircle,
      label: 'Messages',
      action: 'messages',
    },
    {
      key: 'documents',
      icon: FileText,
      label: 'Documents',
      action: 'documents',
    },
    {
      key: 'divider-1',
      isDivider: true,
    },
    {
      key: 'create-listing',
      icon: Target,
      label: 'List New Business',
      action: 'create-listing',
      isHighlight: true,
    },
    {
      key: 'divider-2',
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
      key: 'logout',
      icon: LogOut,
      label: 'Sign Out',
      action: 'logout',
      isDangerous: true,
    },
  ];

  // BOTH BUYER & SELLER DROPDOWN MENU
  const hybridMenuItems = [
    {
      key: 'business-dashboard',
      icon: LayoutDashboard,
      label: 'Business Overview',
      action: 'business-dashboard',
    },
    {
      key: 'browse-listings',
      icon: Search,
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
      key: 'my-listings',
      icon: Store,
      label: 'My Listings',
      action: 'my-listings',
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
      key: 'create-listing',
      icon: Target,
      label: 'List New Business',
      action: 'create-listing',
      isHighlight: true,
    },
    {
      key: 'divider-2',
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
      key: 'logout',
      icon: LogOut,
      label: 'Sign Out',
      action: 'logout',
      isDangerous: true,
    },
  ];

  // Select appropriate menu based on user role
  const getMenuItems = () => {
    if (isSeller && isBuyer) {
      return hybridMenuItems;
    } else if (isSeller) {
      return sellerMenuItems;
    } else {
      return buyerMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="relative inline-block">
      {/* Avatar Button */}
      <button
        ref={avatarRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 hover:border-primary-300 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`${user.name} - Account Menu`}
      >
        <img
          src={user.avatar || defaultAvatar}
          alt={user.name}
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src = defaultAvatar;
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-neutral-200 shadow-xl py-2 z-50 animate-in slide-in-from-top-2 duration-200"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || defaultAvatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">{user.name}</p>
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item: any) => {
              if (item.isDivider) {
                return <div key={item.key} className="h-px bg-neutral-100 my-2 mx-2" />;
              }

              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.action)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none ${
                    item.isDangerous
                      ? 'text-red-600 hover:bg-red-50 focus:bg-red-50'
                      : item.isHighlight
                        ? 'text-primary-600 hover:bg-primary-50 focus:bg-primary-50 font-medium'
                        : 'text-neutral-700'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatarDropdown;
