// 👤 User Account Routes - Profile, settings, messaging
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../components/routing/protected-route';
import { AuthenticatedLayout } from '@shared/components/layouts';
import { AppLayout } from '../layouts/app-layout';

// Lazy load user pages
import { lazy } from 'react';
const SettingsWrapper = lazy(() => import('../../features/user-profile/pages/SettingsWrapper'));
const Messages = lazy(() => import('@messaging/pages/Messages'));
const TransactionFlow = lazy(() => import('../../features/transactions/pages/TransactionFlow'));

export const userRoutes: RouteObject[] = [
  // User Profile & Settings
  {
    path: '/users',
    element: (
      <AppLayout>
        <ProtectedRoute>
          <AuthenticatedLayout />
        </ProtectedRoute>
      </AppLayout>
    ),
    children: [
      { index: true, element: <SettingsWrapper initialSection="profile" /> },
      { path: 'profile', element: <SettingsWrapper initialSection="profile" /> },
      { path: 'business', element: <SettingsWrapper initialSection="business" /> },
      { path: 'notifications', element: <SettingsWrapper initialSection="notifications" /> },
      { path: 'security', element: <SettingsWrapper initialSection="security" /> },
      { path: 'support', element: <SettingsWrapper initialSection="support" /> },
      { path: 'billing', element: <SettingsWrapper initialSection="billing" /> },
      { path: 'saved', element: <SettingsWrapper initialSection="profile" /> },
    ],
  },

  // Messaging
  {
    path: '/messages',
    element: (
      <AppLayout>
        <ProtectedRoute>
          <AuthenticatedLayout />
        </ProtectedRoute>
      </AppLayout>
    ),
    children: [
      { index: true, element: <Messages /> },
      { path: ':conversationId', element: <Messages /> },
    ],
  },

  // Transactions
  {
    path: '/transactions/:transactionId',
    element: (
      <AppLayout>
        <ProtectedRoute>
          <AuthenticatedLayout />
        </ProtectedRoute>
      </AppLayout>
    ),
  },
];
