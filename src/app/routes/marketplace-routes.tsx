// 🏪 Marketplace Routes - Browse, search, view listings
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@shared/components/layouts';
import { AppLayout } from '../layouts/app-layout';

// Lazy load marketplace pages
import { lazy } from 'react';
const ListingSearch = lazy(() => import('@marketplace/pages/ListingSearch'));
const ListingDetails = lazy(() => import('@marketplace/pages/ListingDetails'));

export const marketplaceRoutes: RouteObject = {
  path: '/marketplace',
  element: (
    <AppLayout>
      <MainLayout />
    </AppLayout>
  ),
  children: [
    // Main marketplace browsing
    { index: true, element: <ListingSearch /> },
    { path: 'search', element: <ListingSearch /> },
    { path: 'advanced-search', element: <ListingSearch /> },
    { path: 'advanced', element: <ListingSearch /> }, // Legacy alias

    // Individual listings (matching legacy exactly)
    { path: 'listings/:id', element: <ListingDetails /> },
    { path: 'listings/:id/data-room', element: <ListingDetails /> },
    { path: ':id', element: <ListingDetails /> }, // Legacy alias for direct access
  ],
};
