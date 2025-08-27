import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Image } from '@heroui/react';
import { Building2 } from 'lucide-react';
import AccountDropDownMenu from './account_dropdown';
import metamaskIcon from '../../../../../assets/metamaskIcon.b43nd2.png';
import UrlGeneratorService from '../../../../services/urlMapping/urlGeneratorService';
import { User } from '../../../../types/api/users/user';

interface AudienceUserNavbarProps {
  user: User;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
  onLogout: () => void;
  modalPosition: { top: number; left: number };
  showUserModal: boolean;
  setShowUserModal: (show: boolean) => void;
  isSidebarCollapsed: boolean;
}

const AudienceUserNavbar = ({
  user,
  isWalletConnected,
  onWalletConnect,
  onLogout: _onLogout,
  modalPosition,
  showUserModal,
  setShowUserModal,
  isSidebarCollapsed,
}: AudienceUserNavbarProps) => {
  console.log('AudienceUserNavbar component loaded with props:', {
    user,
    isWalletConnected,
    modalPosition,
    showUserModal,
    isSidebarCollapsed,
  });

  return (
    <Navbar className="pt-8 hidden md:flex" maxWidth="2xl">
      <NavbarBrand>
        <Link
          to={UrlGeneratorService.root()}
          className={`transition-opacity duration-500 flex items-center space-x-2 ${isSidebarCollapsed ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="p-1 bg-primary-600 rounded-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-sm">betweendeals</span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem className="flex items-center">
          <Button
            color="primary"
            variant="flat"
            size="md"
            className={`rounded-xl cursor-pointer ${isWalletConnected ? 'opacity-75' : ''}`}
            onClick={onWalletConnect}
            disabled={isWalletConnected}
          >
            <Image src={metamaskIcon} alt="Metamask Icon" width="24" />
            {isWalletConnected ? 'Wallet connected' : 'Connect Metamask'}
          </Button>
        </NavbarItem>
        <NavbarItem className="flex items-center">
          <AccountDropDownMenu user={user} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AudienceUserNavbar;
