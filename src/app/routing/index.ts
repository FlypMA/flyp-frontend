// 🛣️ App Routing - MVP Version (Complete URL Generator Integration)
// Location: src/app/routing/index.ts
// Purpose: Centralized exports for all routing components with complete page mapping

/**
 * 🚀 Complete Routing System - MVP Version
 *
 * Features:
 * - All pages from /pages directory mapped to routes
 * - Complete URL generator integration
 * - Proper layout assignments (MainLayout, BuyerLayout, SellerLayout, etc.)
 * - Legacy redirects for compatibility
 * - Route protection for authenticated areas
 * - Organized by route type and layout
 *
 * Route Categories:
 * - Public Routes (MainLayout): Landing, search, listings, legal, resources
 * - Buyer Routes (BuyerLayout): Messages, user account management, buyer features
 * - Seller Routes (SellerLayout): Business management, seller tools, dashboard
 * - Checkout Routes (LogoOnlyLayout): Payment and checkout flows
 * - Auth Routes (LayoutSplit): Password reset, email verification
 * - Onboarding Routes (MainLayout): User onboarding flows
 * - Legacy Redirects: Compatibility with old URLs
 */

// Main router with complete page mapping
export { default as defaultRouter, router } from './router';

// Route guards for protection
export {
  AdminRoute,
  BuyerRoute,
  GuestRoute,
  ProtectedRoute,
  RoleProtectedRoute,
  SellerRoute,
  useRoleGuard,
} from './route-guards';

// Re-export for convenience
export { router as default } from './router';
