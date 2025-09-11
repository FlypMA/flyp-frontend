// 🏢 Business Dashboard Routes - Seller/business owner tools
import { RouteObject } from 'react-router-dom';
import { RoleProtectedRoute } from '../components/routing/role-protected-route';
import { AuthenticatedLayout } from '@shared/components/layouts';
import { AppLayout } from '../layouts/app-layout';

// Lazy load business pages
import { lazy } from 'react';
const BusinessOverview = lazy(() => import('@business/pages/business/BusinessOverview'));
const ListingManagement = lazy(() => import('@business/pages/business/ListingManagement'));
const CreateListing = lazy(() => import('../../features/listings/pages/CreateListingPage'));
const EditListing = lazy(() => import('../../features/listings/pages/EditListingPage'));
const BusinessValuation = lazy(() => import('@business/pages/business/BusinessValuation'));
const DocumentVault = lazy(() => import('@business/pages/business/DocumentVault'));
const DashboardPerformance = lazy(() => import('@business/pages/business/DashboardPerformance'));

export const businessRoutes: RouteObject = {
  path: '/my-business',
  element: (
    <AppLayout>
      <RoleProtectedRoute allowedRoles={['seller', 'both', 'admin']}>
        <AuthenticatedLayout />
      </RoleProtectedRoute>
    </AppLayout>
  ),
  children: [
    // Dashboard Overview
    { index: true, element: <BusinessOverview /> },
    { path: 'overview', element: <BusinessOverview /> },

    // Listing Management
    { path: 'listings', element: <ListingManagement /> },
    { path: 'listings/new', element: <CreateListing /> },
    { path: 'listings/:id/edit', element: <EditListing /> },
    { path: 'listings/:id/analytics', element: <DashboardPerformance /> },
    { path: 'listings/:id/inquiries', element: <DashboardPerformance /> },

    // Business Tools
    { path: 'valuations', element: <BusinessValuation /> },
    { path: 'documents', element: <DocumentVault /> },
    { path: 'performance', element: <DashboardPerformance /> },
  ],
};
