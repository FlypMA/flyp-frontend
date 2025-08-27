import React, { ElementType } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Building2 } from 'lucide-react';
import UrlGeneratorService from '../../../../services/urlMapping/urlGeneratorService';

interface NavItem {
  to: string;
  icon: ElementType;
  label: string;
  onClick?: () => void; // Made optional
}

interface MobileSidebarProps {
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  navItems: NavItem[];
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isMobileSidebarOpen,
  toggleMobileSidebar,
  navItems,
}) => {
  return (
    <div>
      {/* Mobile Navbar with Hamburger */}
      <div className="md:hidden flex justify-between items-center p-8 shadow-md">
        <AiOutlineMenu className="text-3xl cursor-pointer" onClick={toggleMobileSidebar} />
        {/* Rest of the Navbar content */}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed w-full inset-y-0 left-0 z-50 transition-transform transform ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } mobile-sidebar shadow-2xl p-4 space-y-4`}
      >
        {/* Close Icon */}
        <div className="flex justify-end">
          <button onClick={toggleMobileSidebar} className="p-2 text-gray-300 hover:text-primary">
            <AiOutlineClose className="text-3xl" />
          </button>
        </div>

        {/* Logo */}
        <Link to={UrlGeneratorService.root()} className="flex justify-left items-center ml-1">
          <div className="p-1 bg-primary-600 rounded-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="ml-3 text-white font-bold">betweendeals</span>
        </Link>

        <section className="mt-8">
          {/* Navigation Items */}
          {navItems.map(({ to, icon: Icon, label, onClick }, index) => (
            <section className="mt-1" key={index}>
              <NavLink
                to={to}
                onClick={() => {
                  onClick?.(); // Using optional chaining
                  toggleMobileSidebar();
                }}
                className="flex items-center p-3 text-gray-300 hover:text-white mobile-sidebar-item rounded-xl transition-all"
              >
                <Icon className="text-2xl" />
                <span className="ml-2">{label}</span>
              </NavLink>
            </section>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MobileSidebar;
export { MobileSidebar };
