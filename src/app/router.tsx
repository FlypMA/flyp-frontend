// 🚀 Clean Modern Router - Feature-based routing architecture
import { createBrowserRouter, RouteObject, Outlet } from 'react-router-dom';
import { AppLayout } from '@shared/components/layouts';
import ScrollToTop from '../shared/components/ui/ScrollToTop';
import AuthModals from '../features/authentication/components/AuthModals';
import {
  publicRoutes,
  authRoutes,
  marketplaceRoutes,
  businessRoutes,
  userRoutes,
  redirectRoutes,
} from './routes';

// Additional specialized routes
import { lazy } from 'react';
import { LogoOnlyLayout } from '@shared/components/layouts';

const Checkout = lazy(() => import('./pages/checkout/checkout'));
const CheckoutSuccess = lazy(() => import('./pages/checkout/success/CheckoutSuccess'));
const NoPage = lazy(() => import('./pages/error/404/noPage'));

// Root layout component - includes components that need Router context
const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
    {/* AuthModals moved here to be inside Router context */}
    <AuthModals />
  </>
);

// Clean, organized route configuration
const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // ✅ Core Feature Routes
      publicRoutes,
      marketplaceRoutes,
      businessRoutes,
      ...authRoutes,
      ...userRoutes,

      // ✅ Specialized Routes
      {
        path: '/checkout',
        element: (
          <AppLayout>
            <LogoOnlyLayout />
          </AppLayout>
        ),
        children: [{ index: true, element: <Checkout /> }],
      },
      {
        path: '/checkout/success',
        element: (
          <AppLayout>
            <LogoOnlyLayout />
          </AppLayout>
        ),
        children: [{ index: true, element: <CheckoutSuccess /> }],
      },

      // ✅ Legacy Redirects (Centralized)
      ...redirectRoutes,

      // ✅ 404 Fallback
      {
        path: '*',
        element: <NoPage />,
      },
    ],
  },
];

// Create and export the router
export const router = createBrowserRouter(routes);

export default router;
