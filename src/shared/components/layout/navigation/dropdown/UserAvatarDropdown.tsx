import {
  Building2,
  Calculator,
  FileText,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  TrendingUp,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../../../app/services/users/authenticationService';
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
      await authService.logout();
      window.dispatchEvent(new CustomEvent('auth-logout'));
      window.dispatchEvent(new CustomEvent('auth-change'));
      console.log('✅ Logout successful, navigating to home');
      navigate(UrlGenerator.root());
    } catch (error) {
      console.error('❌ Logout failed:', error);
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
        navigate(UrlGenerator.myBusinessListings());
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
        navigate(UrlGenerator.createListing());
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
      key: 'browse-businesses',
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

  const sellerMenuItems = [
    {
      key: 'my-business',
      icon: Building2,
      label: 'My Business',
      action: 'my-business',
    },
    {
      key: 'my-listings',
      icon: LayoutDashboard,
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
      key: 'documents',
      icon: FileText,
      label: 'Documents',
      action: 'documents',
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

  const menuItems = isSeller ? sellerMenuItems : buyerMenuItems;

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
        className="w-8 h-8 rounded-full object-cover cursor-pointer select-none"
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

      {/* Custom Dropdown - Full control */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border-0 z-50 overflow-hidden"
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
                  w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 
                  hover:bg-gray-50 transition-colors duration-150 text-left border-0 bg-transparent
                  ${isFirst ? 'rounded-t-xl' : ''} 
                  ${isLast ? 'rounded-b-xl' : ''}
                  ${item.isLogout ? 'text-gray-700 hover:bg-gray-50' : ''}
                `}
                onClick={() => handleMenuClick(item.action!)}
                role="menuitem"
                tabIndex={0}
              >
                <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserAvatarDropdown;
