import React, { ElementType } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LuPanelLeftClose, LuPanelRightClose } from 'react-icons/lu';
import { Image } from '@heroui/react';
import UrlGeneratorService from '../../../../services/urlMapping/urlGeneratorService';
import { logos } from '../../../../../assets/logos';

interface NavItem {
  to: string;
  icon: ElementType;
  label: string;
  onClick?: () => void;
}

interface SidebarProps {
  navItems: NavItem[];
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const AudienceUserSidebar: React.FC<SidebarProps> = ({
  navItems,
  isSidebarCollapsed,
  toggleSidebar,
}) => {
  return (
    <div
      className={`fixed hidden md:flex inset-y-0 left-0 shadow-md transition-all duration-500 bg-zinc-900/75 shadow-md backdrop-blur-sm opacity-75 z-10 ${
        isSidebarCollapsed ? 'w-16' : 'w-56'
      }`}
    >
      <nav className="flex w-full flex-col items-center space-y-2 p-3 transition-all duration-500 mt-8">
        <div className="w-full flex justify-between items-center pb-16">
          <Link
            to={UrlGeneratorService.root()}
            className={`transition-opacity duration-500 ${
              isSidebarCollapsed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src={logos.main}
              alt="betweendeals logo"
              width="40"
              height="40"
              className="text-white"
            />
          </Link>
          <div
            className={`inset-0 flex justify-center items-center ${
              isSidebarCollapsed ? 'opacity-100' : 'opacity-100'
            }`}
          >
            <div
              className={`rounded-full p-2 transition-all duration-500 ${
                isSidebarCollapsed ? 'hover:bg-zinc-700/75' : 'hover:bg-zinc-700/75'
              }`}
            >
              {isSidebarCollapsed ? (
                <LuPanelRightClose
                  className="cursor-pointer text-2xl text-gray-500 shadow-md z-10 backdrop-blur-sm"
                  onClick={toggleSidebar}
                />
              ) : (
                <LuPanelLeftClose
                  className="cursor-pointer text-2xl text-gray-500 shadow-md z-10 backdrop-blur-sm"
                  onClick={toggleSidebar}
                />
              )}
            </div>
          </div>
        </div>
        {navItems.map(({ to, icon: Icon, label, onClick }, index) => (
          <div className="w-full flex justify-left" key={index}>
            <NavLink
              to={to}
              onClick={onClick}
              className={({ isActive }) =>
                isActive
                  ? 'group w-full hidden md:flex items-center p-2 px-2 text-gray-300 bg-zinc-700/75 rounded-xl transition-all duration-500 hover:text-white'
                  : 'group w-full hidden md:flex items-center p-2 px-2 transition-all duration-500 text-gray-300 hover:text-white'
              }
            >
              <Icon className="text-2xl transition-all duration-500" />
              {!isSidebarCollapsed && (
                <span className="ml-2 text-md transition-opacity duration-500">{label}</span>
              )}
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AudienceUserSidebar;
