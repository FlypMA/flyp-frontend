/**
 * 🚀 MVP Providers - BetweenDeals MVP
 * Simple provider composition for MVP
 * 
 * MVP APPROACH:
 * - Basic provider composition only
 * - No enterprise features
 * - No complex layering
 * - Essential functionality only
 */

import * as React from 'react';
import { AuthProvider } from './auth-provider';
import { UIProvider } from './ui-provider';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Main provider composition for MVP
 * Simple, straightforward provider wrapping
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <UIProvider>
        {children}
      </UIProvider>
    </AuthProvider>
  );
};

// Export individual providers for flexibility
export { AuthProvider } from './auth-provider';
export { UIProvider } from './ui-provider';
