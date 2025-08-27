import React from 'react';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import UrlGeneratorService from '../../../../services/urlMapping/urlGeneratorService';
import { authService } from '../../../../services/users/authenticationService';
import { User } from '../../../../types/api/users/user';

interface AccountDropDownMenuProps {
  user: User;
}

const AccountDropDownMenu = ({ user }: AccountDropDownMenuProps) => {
  const navigate = useNavigate();

  const handleUserLogoutClick = async () => {
    authService
      .logout()
      .then(() => {
        navigate(UrlGeneratorService.root());
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  const handleAccountClick = () => {
    navigate(UrlGeneratorService.accountSettings());
  };

  return (
    <React.Fragment>
      {user && user.name ? <p className="mr-0">{/*user.name*/}</p> : null}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            src={user?.avatar}
            alt="User Avatar"
            className="cursor-pointer w-8 h-8"
            fallback={<div></div>}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile menu">
          <DropdownItem key="my-account" onClick={handleAccountClick}>
            My account
          </DropdownItem>
          <DropdownItem key="logout" onClick={handleUserLogoutClick}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default AccountDropDownMenu;
