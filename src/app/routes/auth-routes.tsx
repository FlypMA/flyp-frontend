// 🔐 Authentication Routes - Login, signup, onboarding
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import { SplitScreenLayout, MainLayout, AppLayout } from '@shared/components/layouts';
import { LayoutApp } from '../../shared/components/layout/LayoutApp';

// Lazy load auth pages
import { lazy } from 'react';
// Unified onboarding system imports - TODO: Re-enable when fixed
// import { OnboardingUnified } from '../../features/authentication/components/onboarding/unified/OnboardingUnified';
// import { createBuyerConfig, createSellerConfig } from '../../features/authentication/components/onboarding/unified/configs';

// Placeholder components for now
const OnboardingUnified = () => <div>Onboarding Coming Soon</div>;
const createBuyerConfig = () => ({});
const createSellerConfig = () => ({});
// TODO: Fix lazy imports for auth pages
// const PasswordReset = lazy(() => import('../../features/authentication/pages/PasswordReset'));
// const PasswordResetConfirm = lazy(() => import('../../features/authentication/pages/PasswordResetConfirm'));
// const SignUpComplete = lazy(() => import('../../features/authentication/pages/SignUpComplete'));

export const authRoutes: RouteObject[] = [
  // Onboarding (Protected)
  {
    path: '/onboarding',
    element: (
      <LayoutApp>
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      </LayoutApp>
    ),
    children: [
      {
        path: 'seller',
        element: (
          <OnboardingUnified
            config={createSellerConfig('modern')}
            onComplete={data => console.log('Seller onboarding complete:', data)}
          />
        ),
      },
      {
        path: 'buyer',
        element: (
          <OnboardingUnified
            config={createBuyerConfig('modern')}
            onComplete={data => console.log('Buyer onboarding complete:', data)}
          />
        ),
      },
    ],
  },

  // Password Management (Public)
  {
    path: '/password-reset',
    element: (
      <AppLayout>
        <SplitScreenLayout />
      </AppLayout>
    ),
  },
  {
    path: '/password-reset/confirm',
    element: (
      <AppLayout>
        <SplitScreenLayout />
      </AppLayout>
    ),
  },

  // Post-signup Flow (Protected)
  {
    path: '/signup-complete',
    element: (
      <AppLayout>
        <SplitScreenLayout />
      </AppLayout>
    ),
  },
];
