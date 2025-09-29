/**
 * 👤 Profile Split Layout
 * 
 * Enterprise-grade split layout for profile management pages
 * Combines AuthLayout navigation with a sophisticated sidebar/content split
 * 
 * Architecture:
 * - Top: AuthLayout navigation (consistent with app)
 * - Main: 35/65 split (sidebar navigation + content area)
 * - Responsive design with mobile considerations
 * 
 * @author Senior CTO
 * @version 1.0.0
 */

import React from 'react';
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
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <ScrollToTop />
      
      {/* Top Navigation - Optional (default: true) */}
      {showNavigation && <BuyerNavigation />}
      
      {/* Main Split Content Area */}
      <main className="flex-1 flex">
        {/* Left Sidebar - 35% width */}
        <div className="w-[35%] border-r border-gray-200 bg-gray-50">
          <ProfileSidebar />
        </div>
        
        {/* Right Content Area - 65% width */}
        <div className="w-[65%] bg-white">
          <div className="h-full overflow-y-auto">
            {children || <Outlet />}
          </div>
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
