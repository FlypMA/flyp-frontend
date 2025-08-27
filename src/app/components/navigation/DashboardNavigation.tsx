import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@heroui/react';
import { Home, Search } from 'lucide-react';
import { User as UserType } from '../../types/api/users/user';
import { BetweendealsLogo } from '../common';
import { UserAvatarDropdown } from '../account/account_UI/navigation';
import MobileNavigation from './MobileNavigation';

interface DashboardNavigationProps {
  user: UserType | null;
  showCreateButton?: boolean;
  createButtonText?: string;
  createButtonPath?: string;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  user,
  showCreateButton = true,
  createButtonText = 'Create Listing',
  createButtonPath = '/seller/listings/new',
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div>
      {/* Mobile Navigation */}
      <MobileNavigation
        user={user}
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      <Navbar
        className="z-40 bg-white border-b border-gray-200 shadow-sm sticky top-0"
        maxWidth="1024px"
      >
        {/* Logo Section */}
        <NavbarBrand className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center">
          <Link to="/" className="flex items-center space-x-3 group nav-logo-group">
            <BetweendealsLogo
              variant="header"
              width={48}
              height={48}
              className="w-12 h-12 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-600 ml-2">
              betweendeals
            </span>
          </Link>
        </NavbarBrand>

        {/* Center Navigation */}
        <NavbarContent className="hidden lg:flex gap-8" justify="center">
          <NavbarItem>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to="/for-sellers"
              className="text-gray-700 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              For Sellers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to="/search"
              className="text-gray-700 hover:text-primary-600 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <Search className="w-4 h-4" />
              For Buyers
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Right Section - Create Button + Avatar */}
        <NavbarContent justify="end" className="gap-4">
          {showCreateButton && (
            <NavbarItem>
              <Button
                color="primary"
                className="bg-primary text-primary-foreground data-[hover=true]:opacity-hover"
                onPress={() => navigate(createButtonPath)}
              >
                {createButtonText}
              </Button>
            </NavbarItem>
          )}

          {user && (
            <NavbarItem>
              <UserAvatarDropdown user={user} />
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default DashboardNavigation;
