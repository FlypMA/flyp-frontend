/**
 * 👤 Profile Split Layout
 *
 * Enterprise-grade responsive layout for profile management pages
 * Mobile-first design with adaptive sidebar/content patterns
 *
 * Architecture:
 * - Desktop: 35/65 split (sidebar navigation + content area)
 * - Mobile: Stacked layout with collapsible sidebar
 * - Tablet: Adaptive layout with touch-friendly navigation
 *
 * @author Senior CTO
 * @version 2.0.0 - Mobile-First Redesign
 */

import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AuthModals from '@/features/phase1/authentication/components/AuthModals';
import Footer from '@/shared/components/layout/footer/Footer';
import { BuyerNavigation } from '@/shared/components/layout/navigation/buyer';
import { ScrollToTop } from '@/shared/utils/ux';

import ProfileSidebar from '../components/ProfileSidebar';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfileSplitLayoutProps {
  showFooter?: boolean;
  showNavigation?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// =============================================================================
// PROFILE SPLIT LAYOUT COMPONENT
// =============================================================================

export const ProfileSplitLayout: React.FC<ProfileSplitLayoutProps> = ({
  showFooter = true,
  showNavigation = true,
  children,
  className = '',
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <ScrollToTop />

      {/* Top Navigation - Optional (default: true) */}
      {showNavigation && <BuyerNavigation />}

      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileSidebarOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Main Content Area - Responsive Layout */}
      <main className="flex-1 flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block lg:w-[35%] border-r border-gray-200 bg-gray-50">
          <ProfileSidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="flex-1 bg-black bg-opacity-50" onClick={closeMobileSidebar} />

            {/* Sidebar */}
            <div className="w-80 bg-white shadow-xl">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
                <button
                  onClick={closeMobileSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="overflow-y-auto">
                <ProfileSidebar onNavigate={closeMobileSidebar} />
              </div>
            </div>
          </div>
        )}

        {/* Content Area - Responsive Width */}
        <div className="flex-1 lg:w-[65%] bg-white">
          <div className="h-full overflow-y-auto">{children || <Outlet />}</div>
        </div>
      </main>

      {/* Footer - Optional */}
      {showFooter && <Footer />}

      {/* Authentication Modals */}
      <AuthModals />
    </div>
  );
};

export default ProfileSplitLayout;
