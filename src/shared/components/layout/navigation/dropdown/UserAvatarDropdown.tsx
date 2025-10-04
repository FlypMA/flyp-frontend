import { authService } from '@/shared/services/auth';
import { useNavigationStore } from '@/shared/stores/navigationStore';
import {
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../../services/urls/urlGenerator';
import { User } from '../../../../types';

interface UserAvatarDropdownProps {
  user: User;
  instanceId?: string;
}

const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({ user }) => {
  const { isUserMenuOpen: isOpen, toggleUserMenu, closeUserMenu } = useNavigationStore();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const [avatarPosition, setAvatarPosition] = useState({ top: 0, right: 0 });
  const [isThisInstanceActive, setIsThisInstanceActive] = useState(false);

  // Check if this component should render the dropdown
  useEffect(() => {
    if (isOpen && avatarRef.current && avatarRef.current.dataset.clicked === 'true') {
      setIsThisInstanceActive(true);
      // Clear the clicked flag
      delete avatarRef.current.dataset.clicked;
    } else if (!isOpen) {
      setIsThisInstanceActive(false);
    }
  }, [isOpen]);

  // Calculate avatar position for portal positioning
  const updateAvatarPosition = () => {
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setAvatarPosition({
        top: rect.bottom + window.scrollY + 8, // 8px margin
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
  };

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        closeUserMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeUserMenu]);

  // Note: No body scroll lock needed - mobile menu disabled, desktop dropdown doesn't require it

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeUserMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Update position on scroll/resize
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => updateAvatarPosition();
      const handleResize = () => updateAvatarPosition();
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen]);


  const handleLogout = async () => {
    try {
      await authService.logout();
      window.dispatchEvent(new CustomEvent('auth-logout'));
      window.dispatchEvent(new CustomEvent('auth-change'));
      navigate(UrlGenerator.root());
    } catch (error) {
      navigate(UrlGenerator.root());
    }
    closeUserMenu();
  };

  const handleMenuClick = (action: string) => {
    closeUserMenu();

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

  // Debug logging for role-based menu
  useEffect(() => {
    console.log('UserAvatarDropdown - User role:', user?.role);
    console.log('UserAvatarDropdown - isSeller:', isSeller);
    console.log('UserAvatarDropdown - isBuyer:', isBuyer);
    console.log('UserAvatarDropdown - Menu type:', isSeller ? 'Business Owner Menu' : 'Buyer Menu');
  }, [user?.role, isSeller, isBuyer]);

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

  // Combined menu for users with 'both' roles
  const bothRolesMenuItems = [
    // Seller section
    {
      key: 'business-dashboard',
      icon: LayoutDashboard,
      label: 'My Business',
      action: 'business-dashboard',
    },
    {
      key: 'create-listing',
      icon: Plus,
      label: 'Create a New Listing',
      action: 'create-listing',
    },
    {
      key: 'divider-1',
      isDivider: true,
    },
    // Buyer section
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
      key: 'divider-2',
      isDivider: true,
    },
    // Common section
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
      key: 'divider-3',
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

  // Determine which menu to show based on role
  const menuItems = 
    user?.role === 'both' ? bothRolesMenuItems :
    isSeller ? businessOwnerMenuItems : 
    buyerMenuItems;

  return (
    <div className="relative">
      {/* Clean Avatar - Clickable only on desktop */}
      <img
        ref={avatarRef}
        src={user?.avatar || defaultAvatar}
        alt={user?.name || 'User'}
        className="w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover sm:cursor-pointer select-none"
        onClick={() => {
          // Only allow click on desktop (sm breakpoint and above)
          if (window.innerWidth >= 640) {
            // Mark this instance as the clicked one
            if (avatarRef.current) {
              avatarRef.current.dataset.clicked = 'true';
            }
            updateAvatarPosition();
            toggleUserMenu();
          }
        }}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Only allow keyboard activation on desktop
            if (window.innerWidth >= 640) {
              toggleUserMenu();
            }
          }
        }}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      />

      {/* Desktop Only: Dropdown Portal */}
      {isThisInstanceActive && createPortal(
        <div
          data-user-avatar-dropdown
          ref={dropdownRef}
          className="fixed w-56 bg-white rounded-xl shadow-2xl border-0 z-[9999] overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          style={{
            top: `${avatarPosition.top}px`,
            right: `${avatarPosition.right}px`,
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
        </div>,
        document.body
      )}
    </div>
  );
};

export default UserAvatarDropdown;
