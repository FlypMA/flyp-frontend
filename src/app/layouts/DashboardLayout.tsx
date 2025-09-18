import AuthModals from '@/features/authentication/components/AuthModals';
import { Navigation } from '@/shared/components/layout/navigation';
import {
  DashboardSidebar,
  DashboardSidebarMobile,
} from '@/shared/components/layout/navigation/dashboard';
import { ScrollToTop } from '@/shared/utils/ux';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';

export const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Top Navigation - like legacy UnifiedNavigation */}
      <Navigation />

      {/* Dashboard Content with Sidebar */}
      <div className="flex flex-1 bg-gray-50">
        {/* Desktop Sidebar */}
        <DashboardSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} user={user} />

        {/* Mobile Sidebar */}
        <DashboardSidebarMobile
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          user={user}
        />

        {/* Main Content */}
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ${
            isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          }`}
        >
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileSidebar}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            {/* User info */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">{user.name || 'User'}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <AuthModals />
    </div>
  );
};
