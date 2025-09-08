import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UrlGeneratorService from '../../../../services/urlMapping/urlGeneratorService';
import { authService } from '../../../../services/users/authenticationService';
import { User, UserType } from '../../../../types/api/users/user';
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
  user: User;
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
        await fetch(`${process.env.REACT_APP_NODE_BACKEND_URL || 'http://localhost:3001'}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
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
      // Buyer navigation
      case 'buyer-dashboard':
        navigate('/dashboard/buyer');
        break;
      case 'discover':
        navigate('/search');
        break;
      case 'favorites':
        navigate('/dashboard/buyer');
        // Simulate clicking the favorites tab
        setTimeout(() => {
          const event = new CustomEvent('navigate-buyer-tab', { detail: 'favorites' });
          window.dispatchEvent(event);
        }, 100);
        break;
      case 'inquiries':
        navigate('/dashboard/buyer');
        setTimeout(() => {
          const event = new CustomEvent('navigate-buyer-tab', { detail: 'inquiries' });
          window.dispatchEvent(event);
        }, 100);
        break;
      case 'my-businesses':
        navigate('/dashboard/buyer');
        setTimeout(() => {
          const event = new CustomEvent('navigate-buyer-tab', { detail: 'businesses' });
          window.dispatchEvent(event);
        }, 100);
        break;
        
      // Seller navigation  
      case 'seller-dashboard':
        navigate('/business/overview');
        break;
      case 'my-business':
        navigate('/business/overview');
        break;
      case 'valuation':
        navigate('/business/valuation');
        break;
      case 'solvency':
        navigate('/business/solvency');
        break;
      case 'listings':
        navigate('/business/listing');
        break;
      case 'reports':
        navigate('/business/valuation');
        break;
        
      // Common navigation
      case 'messages':
        navigate('/messages');
        break;
      case 'profile-settings':
        navigate('/account/settings');
        break;
      case 'help-center':
        navigate('/help');
        break;
      case 'sell-business':
        navigate('/seller/listings/new');
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  const isSeller = user?.userType === UserType.Seller;
  const isBuyer = user?.userType === UserType.Buyer;
  const defaultAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80";

  // Role-based menu items
  const buyerMenuItems = [
    {
      key: 'buyer-dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      action: 'buyer-dashboard'
    },
    {
      key: 'discover',
      icon: Search,
      label: 'Discover Businesses',
      action: 'discover'
    },
    {
      key: 'favorites',
      icon: Heart,
      label: 'Favorites',
      action: 'favorites'
    },
    {
      key: 'inquiries',
      icon: MessageSquare,
      label: 'My Inquiries',
      action: 'inquiries'
    },
    {
      key: 'messages',
      icon: MessageCircle,
      label: 'Messages',
      action: 'messages'
    },
    {
      key: 'divider-1',
      isDivider: true
    },
    {
      key: 'profile-settings',
      icon: Settings,
      label: 'Profile & Settings',
      action: 'profile-settings'
    },
    {
      key: 'help-center',
      icon: HelpCircle,
      label: 'Help Center',
      action: 'help-center'
    },
    {
      key: 'divider-2',
      isDivider: true
    },
    {
      key: 'logout',
      icon: LogOut,
      label: 'Log Out',
      action: 'logout',
      isLogout: true
    }
  ];

  const sellerMenuItems = [
    {
      key: 'seller-dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      action: 'seller-dashboard'
    },
    {
      key: 'messages',
      icon: MessageCircle,
      label: 'Messages',
      action: 'messages'
    },
    {
      key: 'divider-1',
      isDivider: true
    },
    {
      key: 'profile-settings',
      icon: Settings,
      label: 'Profile & Settings',
      action: 'profile-settings'
    },
    {
      key: 'help-center',
      icon: HelpCircle,
      label: 'Help Center',
      action: 'help-center'
    },
    {
      key: 'divider-2',
      isDivider: true
    },
    {
      key: 'sell-business',
      icon: Target,
      label: 'Sell a Business',
      action: 'sell-business'
    },
    {
      key: 'logout',
      icon: LogOut,
      label: 'Log Out',
      action: 'logout',
      isLogout: true
    }
  ];

  // Select appropriate menu based on user type
  const menuItems = isBuyer ? buyerMenuItems : sellerMenuItems;

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
        onKeyDown={(e) => {
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
              return (
                <div 
                  key={item.key}
                  className="h-px bg-gray-200 my-1"
                  role="separator"
                />
              );
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