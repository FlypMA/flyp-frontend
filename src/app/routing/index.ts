// 🛣️ App Routing - MVP Version (Complete URL Generator Integration)
// Location: src/app/routing/index.ts
// Purpose: Centralized exports for all routing components with complete page mapping

/**
 * 🚀 Complete Routing System - MVP Version
 * 
 * Features:
 * - All pages from /pages directory mapped to routes
 * - Complete URL generator integration
 * - Proper layout assignments (MainLayout, AuthLayout, DashboardLayout, etc.)
 * - Legacy redirects for compatibility
 * - Route protection for authenticated areas
 * - Organized by route type and layout
 * 
 * Route Categories:
 * - Public Routes (MainLayout): Landing, search, listings, legal, resources
 * - Authenticated Routes (AuthLayout): Messages, user account management
 * - Dashboard Routes (DashboardLayout): Business management, seller tools
 * - Checkout Routes (LogoOnlyLayout): Payment and checkout flows
 * - Auth Routes (LayoutSplit): Password reset, email verification
 * - Onboarding Routes (MainLayout): User onboarding flows
 * - Legacy Redirects: Compatibility with old URLs
 */

// Main router with complete page mapping
export { router, default as defaultRouter } from './router';

// Route guards for protection
export { 
  ProtectedRoute, 
  RoleProtectedRoute,
  SellerRoute,
  BuyerRoute,
  AdminRoute,
  GuestRoute,
  useRoleGuard 
} from './route-guards';

// Re-export for convenience
export { router as default } from './router';
