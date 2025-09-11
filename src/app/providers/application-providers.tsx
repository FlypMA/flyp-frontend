// 🎯 Application Providers - App-wide functionality layer
// Navigation, global UI state, notifications - Layer 3
import React from 'react';
import { ScrollToTop } from '@shared/components/ui/common/ScrollToTop';

interface ApplicationProvidersProps {
  children: React.ReactNode;
}

/**
 * Application Providers - App-wide functionality
 * Layer 3: Global UI components and navigation
 *
 * This layer handles:
 * - Global navigation components
 * - App-wide UI behaviors
 * - Global notifications/toasts (when implemented)
 * - Theme management (when implemented)
 */
export const ApplicationProviders: React.FC<ApplicationProvidersProps> = ({ children }) => {
  return (
    <>
      {/* Global UI Components */}
      {/* ScrollToTop moved inside Router context to fix useLocation error */}

      {/* App Content */}
      {children}
    </>
  );
};
