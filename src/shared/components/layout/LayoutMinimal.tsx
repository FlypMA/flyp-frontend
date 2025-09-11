import { Navbar, NavbarBrand } from '@heroui/react';
import { Link, Outlet } from 'react-router-dom';
// import Container from '../main_UI/containers/container_default'; // TODO: Fix import
// import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService'; // TODO: Fix import
// import { BetweendealsLogo } from '../common'; // TODO: Fix import

// Placeholder implementations
const UrlGeneratorService = {
  root: () => '/',
};

const LogoOnlyLayout = () => {
  return (
    <div>
      <Navbar
        data-scope="navigation"
        className="bg-white border-b border-neutral-200 shadow-sm py-4"
        maxWidth="2xl"
      >
        <NavbarBrand>
          <Link
            to={UrlGeneratorService.root()}
            className="flex items-center space-x-3 group nav-logo-group"
          >
            <BetweendealsLogo
              variant="header"
              className="w-12 h-12 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-600 ml-2">
              betweendeals
            </span>
          </Link>
        </NavbarBrand>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default LogoOnlyLayout;
