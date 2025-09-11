// 🏢 Feature Providers - Business feature layer
// Business modals, marketplace state - Layer 4
import React from 'react';
import { BusinessModalProvider } from '../contexts/BusinessModalContext';
import { AuthModals } from '@auth/components/AuthModals';
import { BusinessListingModalContainer } from '../components/modals/business-listing-modal-container';

interface FeatureProvidersProps {
  children: React.ReactNode;
}

/**
 * Feature Providers - Business logic and feature-specific state
 * Layer 4: Feature-specific contexts and modals
 *
 * This layer handles:
 * - Business listing modals and flows
 * - Marketplace-specific state (when implemented)
 * - Feature-specific UI components
 */
export const FeatureProviders: React.FC<FeatureProvidersProps> = ({ children }) => {
  return (
    <BusinessModalProvider>
      {/* Main App Content */}
      {children}

      {/* Global Modal Components - AuthModals moved inside Router context */}
      {/* AuthModals moved to RootLayout to fix Router context error */}
      <BusinessListingModalContainer />
    </BusinessModalProvider>
  );
};
