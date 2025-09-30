// 📱 Navigation Mobile - MVP Version
// Location: src/shared/components/navigation/main/NavigationMobile.tsx
// Purpose: Mobile navigation sidebar based on legacy MobileNavigation.tsx
//
// Features:
// - Mobile sidebar navigation
// - Role-based navigation sections
// - Smooth animations
// - Body scroll prevention

import { Button } from '@/shared/components/buttons';
import { AuthenticationService } from '@/shared/services/auth';
import { ChevronRight, LogOut, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { User } from '../../../../types';
import { createNavigationHandler, getMobileNavigationSections } from '../utils';

interface NavigationMobileProps {
  user?: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({ user, isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useAuth();

  // Initialize auth service and navigation handler
  const authService = new AuthenticationService();
  const navigationHandler = createNavigationHandler(navigate, authService);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    onToggle();
  }, [location.pathname]);

  const handleLogout = async () => {
    await navigationHandler.handleLogout();
    onToggle();
  };

  // Get navigation sections - exact copy from legacy
  const navigationSections = getMobileNavigationSections(user?.role);

  const handleItemClick = (href: string) => {
    navigate(href);
    onToggle();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onToggle}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="font-display text-lg font-light text-gray-900">Upswitch</span>
            </div>

            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User Profile (if authenticated) */}
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{user.email}</div>
                  <div className="text-xs text-gray-400 capitalize">{user.role}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Sections */}
          <div className="flex-1 overflow-y-auto py-4">
            {navigationSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-6' : ''}>
                {section.title && (
                  <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                )}

                <div className="space-y-1 px-2">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                      <button
                        key={itemIndex}
                        onClick={() => handleItemClick(item.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 border border-primary-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 ${
                            isActive ? 'text-primary-600' : 'text-gray-500'
                          }`}
                        />
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {item.isNew && (
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {user ? (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Log Out</span>
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-3">
              <Button
                variant="link"
                className="w-full"
                onPress={() => {
                  onToggle();
                  openModal('login');
                }}
              >
                Log in
              </Button>
              <button
                onClick={() => {
                  onToggle();
                  openModal('signup');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-4 py-3 text-sm font-semibold"
              >
                List your business
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationMobile;
