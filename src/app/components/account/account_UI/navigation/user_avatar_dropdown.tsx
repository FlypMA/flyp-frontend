import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
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
} from 'lucide-react';

interface UserAvatarDropdownProps {
  user: User;
}

const UserAvatarDropdown = ({ user }: UserAvatarDropdownProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.dispatchEvent(new CustomEvent('auth-logout'));
      navigate(UrlGeneratorService.root());
    } catch (error) {
      console.error('Logout failed:', error);
      window.location.href = UrlGeneratorService.root();
    }
  };

  // Handle dropdown menu actions
  const handleMenuAction = (key: React.Key) => {
    switch (key) {
      case 'favorites':
        navigate('/account/buyer');
        break;
      case 'my-business':
        navigate('/account/seller');
        break;
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
        navigate('/onboarding/seller');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        console.log('Unknown action:', key);
    }
  };

  // Determine user role for conditional menu items
  const isSeller = user?.userType === UserType.Seller;
  const isBuyer = user?.userType === UserType.Buyer;

  // Default avatar image (placeholder)
  const defaultAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80";

  return (
    <Dropdown 
      placement="bottom-end" 
      className="w-56"
      classNames={{
        content: "p-0 border-0 shadow-lg bg-white rounded-xl min-w-56",
      }}
    >
      <DropdownTrigger>
        <button 
          className="relative flex items-center justify-center rounded-full overflow-hidden hover:shadow-md transition-all duration-200"
          aria-label="User menu"
        >
          <img
            src={user?.avatar || defaultAvatar}
            alt={user?.name || 'User'}
            className="w-8 h-8 rounded-full object-cover"
          />
        </button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="User menu"
        className="p-2"
        onAction={handleMenuAction}
        itemClasses={{
          base: "rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer",
        }}
      >
        {/* Favorites (for buyers) */}
        {isBuyer && (
          <DropdownItem
            key="favorites"
            startContent={<Heart className="w-4 h-4 text-gray-500" />}
          >
            Favorites
          </DropdownItem>
        )}

        {/* My business (for sellers) */}
        {isSeller && (
          <DropdownItem
            key="my-business"
            startContent={<Building2 className="w-4 h-4 text-gray-500" />}
          >
            My business
          </DropdownItem>
        )}

        {/* Messages */}
        <DropdownItem
          key="messages"
          startContent={<MessageCircle className="w-4 h-4 text-gray-500" />}
        >
          Messages
        </DropdownItem>

        {/* Profile & settings */}
        <DropdownItem
          key="profile-settings"
          startContent={<Settings className="w-4 h-4 text-gray-500" />}
        >
          Profile & settings
        </DropdownItem>

        {/* Help center */}
        <DropdownItem
          key="help-center"
          startContent={<HelpCircle className="w-4 h-4 text-gray-500" />}
        >
          Help center
        </DropdownItem>

        {/* Divider */}
        <DropdownItem
          key="divider"
          className="p-0 h-px my-2 cursor-default"
          isReadOnly
          textValue=""
        >
          <div className="w-full h-px bg-gray-200" />
        </DropdownItem>

        {/* Sell your business */}
        <DropdownItem
          key="sell-business"
          startContent={<Store className="w-4 h-4 text-gray-500" />}
        >
          Sell your business
        </DropdownItem>

        {/* Logout */}
        <DropdownItem
          key="logout"
          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
          startContent={<LogOut className="w-4 h-4 text-gray-500" />}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatarDropdown;