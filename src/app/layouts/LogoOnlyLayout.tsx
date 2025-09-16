/* 
Used for: Checkout and payment flows

Routes:
- /checkout (Payment processing)
- /checkout/success (Payment confirmation)

Features:
- Minimal navigation (logo only)
- Clean, distraction-free interface
- Footer included
- Focused on conversion
*/


import { Navbar, NavbarBrand } from '@heroui/react';
import { Link, Outlet } from 'react-router-dom';
import { UrlGenerator } from '../../shared/services';
import Footer from '@/shared/components/layout/footer/Footer';

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
            to={UrlGenerator.root()}
            className="flex items-center space-x-3 group nav-logo-group"
          >
            {/* TODO: Implement BetweendealsLogo component */}
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BD</span>
            </div>
            <span className="text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-600 ml-2">
              betweendeals
            </span>
          </Link>
        </NavbarBrand>
      </Navbar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default LogoOnlyLayout;
