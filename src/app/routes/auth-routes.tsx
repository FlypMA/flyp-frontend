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

// Import actual onboarding components
// Use existing working components
import { BuyerWizard } from '../../features/authentication/components/BuyerWizard';
// For seller, create a simple placeholder for now
const SellerOnboarding = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🏢</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Seller Onboarding</h2>
      <p className="text-gray-600 mb-8">
        Welcome! We'll help you set up your business profile and create your first listing.
      </p>
      <button
        onClick={() => (window.location.href = '/my-business')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue to Business Dashboard
      </button>
    </div>
  </div>
);
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
        element: <SellerOnboarding />,
      },
      {
        path: 'buyer',
        element: <BuyerWizard />,
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
