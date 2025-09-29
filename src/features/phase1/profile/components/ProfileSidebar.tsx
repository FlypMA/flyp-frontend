/**
 * 👤 Profile Sidebar Navigation
 * 
 * Minimalistic sidebar navigation inspired by Airbnb design
 * Clean, focused navigation without user header clutter
 * 
 * Features:
 * - Minimal design approach
 * - Active state management
 * - Clean typography
 * - Accessibility compliant
 * 
 * @author Senior CTO
 * @version 1.0.0
 */

import {
    Settings,
    Shield,
    User
} from 'lucide-react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  isActive?: boolean;
}

// =============================================================================
// NAVIGATION CONFIGURATION
// =============================================================================

const getNavigationItems = (): NavigationItem[] => [
  {
    id: 'about-me',
    label: 'About me',
    icon: User,
    path: '/users/profile',
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    path: '/users/security',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Settings,
    path: '/users/preferences',
  },
];

// =============================================================================
// PROFILE SIDEBAR COMPONENT
// =============================================================================

export const ProfileSidebar: React.FC = () => {
  const location = useLocation();
  const navigationItems = getNavigationItems();

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = location.pathname === item.path;
    
    const IconComponent = item.icon;

    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={({ isActive: navIsActive }) => `
          flex items-center py-4 px-4 text-left transition-colors duration-200 rounded-lg
          ${isActive
            ? 'text-gray-900 font-medium bg-gray-100'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 bg-white'
          }
        `}
      >
        <IconComponent 
          className={`w-5 h-5 mr-3 ${
            isActive ? 'text-gray-900' : 'text-gray-500'
          }`} 
        />
        <span className="text-sm">
          {item.label}
        </span>
      </NavLink>
    );
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className="h-full bg-white">
      {/* Main Container - Centered with margins */}
      <div className="max-w-xs mx-auto px-6 p-8">
        {/* Section Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Profile</h1>
        
        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navigationItems.map(renderNavigationItem)}
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;
