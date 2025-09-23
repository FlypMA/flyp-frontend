import AuthModals from '@/features/phase1/authentication/components/AuthModals';
import { Navigation } from '@/shared/components/layout/navigation';
import {
  DashboardSidebar,
  DashboardSidebarMobile,
} from '@/shared/components/layout/navigation/dashboard';
import { ScrollToTop } from '@/shared/utils/ux';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Top Navigation - like legacy UnifiedNavigation */}
      <Navigation />

      {/* Dashboard Content with Sidebar */}
      <div className="flex flex-1 bg-gray-50">
        {/* Desktop Sidebar */}
        <DashboardSidebar />

        {/* Mobile Sidebar */}
        <DashboardSidebarMobile
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <AuthModals />
    </div>
  );
};
