import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UrlGeneratorService from '../../../../services/urlMapping/urlGeneratorService';
import { authService } from '../../../../services/users/authenticationService';
import { User, UserRole, isSellerUser, isBuyerUser } from '../../../../../types/user.consolidated';
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

interface UserAvatarDropdownProps {
  user: any; // Temporary: Accept any user type during consolidation
}

const UserAvatarDropdown = ({ user }: UserAvatarDropdownProps) => {
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

      // 🔧 DEV BYPASS FIX: Set logout flag to override dev authentication
      sessionStorage.setItem('user_logged_out', 'true');
      console.log('🔧 Set logout override flag for dev bypass');

      // Try to notify backend of logout (optional)
      try {
        await fetch(
          `${process.env.REACT_APP_NODE_BACKEND_URL || 'http://localhost:3001'}/api/auth/logout`,
          {
            method: 'POST',
            credentials: 'include',
          }
        );
        console.log('🌐 Notified backend of logout');
      } catch (error) {
        console.warn('⚠️ Backend logout notification failed:', error);
      }

      // Clear access_token cookie directly
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      console.log('🍪 Cleared access_token cookie');

      // Dispatch events for navigation state synchronization
      window.dispatchEvent(new CustomEvent('auth-logout'));
      window.dispatchEvent(new CustomEvent('auth-change'));

      console.log('✅ Logout successful, navigating to home');
      navigate(UrlGeneratorService.root());
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // Ensure logout flag is still set on error
      sessionStorage.setItem('user_logged_out', 'true');
      // Fallback: force navigation even if logout fails
      navigate(UrlGeneratorService.root());
    }
    setIsOpen(false);
  };

  const handleMenuClick = (action: string) => {
    setIsOpen(false);

    switch (action) {
      // Buyer navigation (SIMPLIFIED CTO MODEL)
      case 'browse-listings':
        navigate('/listings');
        break;
      case 'saved':
        navigate('/users/saved'); // Saved items in user profile
        break;

      // Business Owner navigation (AIRBNB MODEL - /my-business/*)
      case 'business-dashboard':
        navigate('/my-business'); // Navigate to business overview
        break;
      case 'my-business':
        navigate('/my-business'); // Navigate to business overview
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

  // STANDARDIZED ROLE DETECTION - Use consolidated type guards
  const isSeller = isSellerUser(user);
  const isBuyer = isBuyerUser(user);

  // Debug logging for role detection
  console.log('🔍 UserAvatarDropdown role detection:', {
    role: user?.role,
    isSeller,
    isBuyer,
    user: user ? { id: user.id, email: user.email, role: user.role } : null,
  });
  const defaultAvatar =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80';

  // BUYER DROPDOWN - SIMPLIFIED CTO MODEL
  // Most buyer activity happens through /messages/ - inquiries, offers, negotiations
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

  // BUSINESS OWNER DROPDOWN - SIMPLIFIED
  const businessOwnerMenuItems = [
    {
      key: 'business-dashboard',
      icon: LayoutDashboard,
      label: 'My Business',
      action: 'business-dashboard',
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

  // Select appropriate menu based on user type (AIRBNB MODEL)
  const menuItems = isSeller ? businessOwnerMenuItems : buyerMenuItems;

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
