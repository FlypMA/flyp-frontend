// 🚀 App Providers - Coordinated provider composition
// Master provider that coordinates all provider layers
import React from 'react';
import { CoreProviders } from './core-providers';
import { AuthenticationProviders } from './authentication-providers';
import { ApplicationProviders } from './application-providers';
import { FeatureProviders } from './feature-providers';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * App Providers - Master coordinated provider composition
 *
 * 🎯 STRATEGIC PROVIDER HIERARCHY (Performance Optimized):
 *
 * Layer 1: CoreProviders
 *   ├─ ErrorBoundary (catches all errors)
 *   ├─ SecurityProvider (CSP, XSS protection, threat detection)
 *   └─ Suspense (loading boundaries)
 *
 * Layer 2: AuthenticationProviders
 *   ├─ SimpleAuthProvider (user state, authentication)
 *   └─ AuthModalProvider (login/signup modals)
 *
 * Layer 3: ApplicationProviders
 *   ├─ ScrollToTop (global navigation behavior)
 *   └─ [Future: Theme, Notifications, Router Context]
 *
 * Layer 4: FeatureProviders
 *   ├─ BusinessModalProvider (business listing flows)
 *   ├─ Global Modals (AuthModals, BusinessModals)
 *   └─ [Future: MarketplaceProvider, MessagingProvider]
 *
 * 🎯 BENEFITS:
 * ✅ Proper dependency hierarchy
 * ✅ Optimized re-render performance
 * ✅ Centralized provider management
 * ✅ Easy to add/remove providers
 * ✅ Clear separation of concerns
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <CoreProviders>
      <AuthenticationProviders>
        <ApplicationProviders>
          <FeatureProviders>{children}</FeatureProviders>
        </ApplicationProviders>
      </AuthenticationProviders>
    </CoreProviders>
  );
};
