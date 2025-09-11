// 🎯 App Layout - Clean layout component (providers moved to AppProviders)
import React from 'react';
import { AppProviders } from '../providers';

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * App Layout - Clean layout component with coordinated provider system
 *
 * ✅ BEFORE: Chaotic provider management in layout
 * ✅ AFTER: Clean separation - providers in AppProviders, layout logic here
 *
 * All providers are now managed by the coordinated AppProviders system:
 * - Layer 1: Core (Security, ErrorBoundary, Suspense)
 * - Layer 2: Authentication (SimpleAuth, AuthModals)
 * - Layer 3: Application (ScrollToTop, global UI)
 * - Layer 4: Features (BusinessModals, global modals)
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <AppProviders>
      <div className="app-layout min-h-screen">{children}</div>
    </AppProviders>
  );
};
