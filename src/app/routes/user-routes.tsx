// 👤 User Account Routes - Profile, settings, messaging
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../components/routing/protected-route';
import { AuthenticatedLayout } from '@shared/components/layouts';
import { AppLayout } from '../layouts/app-layout';

// Lazy load user pages
import { lazy } from 'react';
const Settings = lazy(() => import('@profile/pages/settings'));
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
      { index: true, element: <Settings /> },
      { path: 'profile', element: <Settings /> },
      { path: 'settings', element: <Settings /> },
      { path: 'saved', element: <Settings /> },
      { path: 'notifications', element: <Settings /> },
      { path: 'billing', element: <Settings /> },
      { path: 'security', element: <Settings /> },
      { path: 'consultation', element: <Settings /> },
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
