/**
 * 🚀 MVP Router - flyp MVP
 * Complete routing for MVP with all pages and URL generator integration
 *
 * MVP APPROACH:
 * - Direct imports (no lazy loading for MVP)
 * - Complete route protection
 * - All essential routes mapped to URL generator
 * - Legacy redirects for compatibility
 * - Proper layout assignments
 */

import { createBrowserRouter, redirect } from 'react-router-dom';

// Layout imports
import AuthLayout from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import LayoutSplit from '../layouts/LayoutSplit';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import MainLayout from '../layouts/MainLayout';

// Route Guard imports
import { BuyerRoute, ProtectedRoute, SellerRoute } from './route-guards';

// Page imports - Landing Pages
import HomePage from '../pages/landingPages/home';
import SellersPage from '../pages/landingPages/sellers/sellers';

// Page imports - Listings
import CreateListingPage from '../pages/listings/CreateListingPage';
import EditListingPage from '../pages/listings/EditListingPage';
import ListingDetails from '../pages/listings/ListingDetails';
import ListingSearch from '../pages/listings/ListingSearch';

// Page imports - Business Dashboard
import DocumentVault from '../pages/business/data-room/DocumentVault';
import ListingManagement from '../pages/business/management/ListingManagement';
import BusinessOverview from '../pages/business/overview/BusinessOverview';
import BusinessValuation from '../pages/business/reports/BusinessValuation';
import GetFreeValuation from '../pages/business/reports/GetFreeValuation';
import LiquidationComparison from '../pages/business/reports/LiquidationComparison';
import SolvencyIntelligence from '../pages/business/reports/SolvencyIntelligence';
import ValuationTool from '../pages/business/reports/ValuationTool';

// Page imports - Account & Authentication
import SignUpComplete from '../pages/account/onboarding/signUpComplete/SignUpComplete';
import ForgotPasswordPage from '../pages/account/passwordReset/ForgotPasswordPage';
import ResetPasswordPage from '../pages/account/passwordReset/ResetPasswordPage';
import UserBilling from '../pages/account/users/UserBilling';
import UserNotifications from '../pages/account/users/UserNotifications';
import UserProfile from '../pages/account/users/UserProfile';
import UserSettings from '../pages/account/users/UserSettings';

// Page imports - Users
import { SavedListings } from '../pages/users';

// Page imports - Checkout
import CheckoutPage from '../pages/checkout/checkout';
import CheckoutSuccess from '../pages/checkout/success/CheckoutSuccess';

// Page imports - Company & Legal
import About from '../pages/company/about/About';
import CookiePolicy from '../pages/company/legal/cookiePolicy/CookiePolicy';
import GdprCompliance from '../pages/company/legal/gdpr/GdprCompliance';
import PrivacyPolicy from '../pages/company/legal/privacyPolicy/privacyPolicy';
import Security from '../pages/company/legal/security/Security';
import TermsAndConditions from '../pages/company/legal/termsAndConditions/TermsAndConditions';
import Contact from '../pages/support/contact';
import FAQ from '../pages/support/FAQ';
import Help from '../pages/support/help';

// Page imports - Resources
import DueDiligenceChecklist from '../pages/landingPages/resources/DueDiligenceChecklist';
import ValuationGuide from '../pages/landingPages/resources/ValuationGuide';

// Page imports - Messages & Communication
import Messages from '../pages/messages/Messages';

// Page imports - Onboarding
import BuyerOnboarding from '../pages/account/onboarding/buyer/BuyerOnboarding';
import SellerOnboarding from '../pages/account/onboarding/seller/SellerOnboarding';

// Page imports - Transaction
import TransactionFlow from '../pages/checkout/transaction/TransactionFlow';

// Page imports - Error
import NoPage from '../pages/error/404/noPage';

// Page imports - Test (Development only)
import RoleTest from '../pages/test/RoleTest';

// MVP Router Configuration - Complete URL Generator Integration
export const router = createBrowserRouter([
  // ==============================================================================
  // PUBLIC ROUTES - MainLayout
  // ==============================================================================
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Landing Pages
      { index: true, element: <HomePage /> },
      { path: 'for-sellers', element: <SellersPage /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'help', element: <Help /> },
      { path: 'faq', element: <FAQ /> },

      // Search & Listings
      { path: 'search', element: <ListingSearch /> },
      { path: 'browse', element: <ListingSearch /> },
      { path: 'listings', element: <ListingSearch /> },
      { path: 'listings/:id', element: <ListingDetails /> },

      // Resources
      { path: 'resources/valuation-guide', element: <ValuationGuide /> },
      { path: 'resources/due-diligence', element: <DueDiligenceChecklist /> },

      // Legal Pages
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-and-conditions', element: <TermsAndConditions /> },
      { path: 'cookie-policy', element: <CookiePolicy /> },
      { path: 'gdpr', element: <GdprCompliance /> },
      { path: 'security', element: <Security /> },

      // Test Routes (Development only - should be removed in production)
      { path: 'test/roles', element: <RoleTest /> },
    ],
  },

  // ==============================================================================
  // AUTHENTICATED ROUTES - AuthLayout (General authenticated users)
  // ==============================================================================
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      // Messages (all authenticated users)
      {
        path: 'messages',
        element: (
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        ),
      },
      {
        path: 'messages/:conversationId',
        element: (
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        ),
      },

      // User Account Management (all authenticated users)
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/profile',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/settings',
        element: (
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/billing',
        element: (
          <ProtectedRoute>
            <UserBilling />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/saved',
        element: (
          <ProtectedRoute>
            <SavedListings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/security',
        element: (
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/notifications',
        element: (
          <ProtectedRoute>
            <UserNotifications />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/saved',
        element: (
          <BuyerRoute>
            <UserProfile />
          </BuyerRoute>
        ),
      },

      // Transaction Flow (sellers and admins)
      {
        path: 'transaction/:transactionId',
        element: (
          <SellerRoute>
            <TransactionFlow />
          </SellerRoute>
        ),
      },
    ],
  },

  // ==============================================================================
  // BUSINESS DASHBOARD ROUTES - DashboardLayout (SELLER-ONLY)
  // ==============================================================================
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      // Business Dashboard (sellers, both, admin only)
      {
        path: 'my-business',
        element: (
          <SellerRoute>
            <BusinessOverview />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/overview',
        element: (
          <SellerRoute>
            <BusinessOverview />
          </SellerRoute>
        ),
      },

      // Business Listing Management (sellers only)
      {
        path: 'my-business/listings',
        element: (
          <SellerRoute>
            <ListingManagement />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/listings/new',
        element: (
          <SellerRoute>
            <CreateListingPage />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/listings/:listingId',
        element: (
          <SellerRoute>
            <EditListingPage />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/listings/:listingId/analytics',
        element: (
          <SellerRoute>
            <EditListingPage />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/listings/:listingId/inquiries',
        element: (
          <SellerRoute>
            <EditListingPage />
          </SellerRoute>
        ),
      },

      // Business Valuation & Analytics (sellers only)
      {
        path: 'my-business/valuations',
        element: (
          <SellerRoute>
            <BusinessValuation />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/analytics',
        element: (
          <SellerRoute>
            <BusinessOverview />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/documents',
        element: (
          <SellerRoute>
            <DocumentVault />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/performance',
        element: (
          <SellerRoute>
            <BusinessOverview />
          </SellerRoute>
        ),
      },

      // Advanced Business Tools (sellers only)
      {
        path: 'my-business/valuation-tool',
        element: (
          <SellerRoute>
            <ValuationTool />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/get-free-valuation',
        element: (
          <SellerRoute>
            <GetFreeValuation />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/liquidation-comparison',
        element: (
          <SellerRoute>
            <LiquidationComparison />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/solvency-intelligence',
        element: (
          <SellerRoute>
            <SolvencyIntelligence />
          </SellerRoute>
        ),
      },
    ],
  },

  // ==============================================================================
  // CHECKOUT ROUTES - LogoOnlyLayout
  // ==============================================================================
  {
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'checkout/success', element: <CheckoutSuccess /> },
      { path: 'checkout/cancel', element: <CheckoutPage /> },
      { path: 'checkout/failed', element: <CheckoutPage /> },
      { path: 'checkout/pending', element: <CheckoutPage /> },
      { path: 'checkout/processing', element: <CheckoutPage /> },
      { path: 'checkout/complete', element: <CheckoutSuccess /> },
      { path: 'checkout/redirect', element: <CheckoutPage /> },
    ],
  },

  // ==============================================================================
  // AUTHENTICATION ROUTES - LayoutSplit
  // ==============================================================================
  {
    path: '/',
    element: <LayoutSplit />,
    children: [
      { path: 'signup/complete', element: <SignUpComplete /> },
      { path: 'auth/forgot-password', element: <ForgotPasswordPage /> },
      { path: 'auth/password-reset/confirm', element: <ResetPasswordPage /> },
      { path: 'verify-email', element: <SignUpComplete /> },
    ],
  },

  // ==============================================================================
  // ONBOARDING ROUTES - MainLayout
  // ==============================================================================
  {
    path: '/',
    element: <MainLayout showFooter={false} />,
    children: [
      // Buyer Onboarding
      { path: 'onboarding/buyer', element: <BuyerOnboarding /> },

      // Seller Onboarding
      { path: 'onboarding/seller', element: <SellerOnboarding /> },
    ],
  },

  // ==============================================================================
  // LEGACY REDIRECTS - Compatibility
  // ==============================================================================
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Account redirects
      { path: 'account', loader: () => redirect('/users/settings') },
      { path: 'account/seller', loader: () => redirect('/my-business') },
      { path: 'account/settings', loader: () => redirect('/users/settings') },
      { path: 'account/profile', loader: () => redirect('/users/profile') },

      // Business redirects
      { path: 'business', loader: () => redirect('/my-business') },
      { path: 'business/overview', loader: () => redirect('/my-business/overview') },
      { path: 'business/listings', loader: () => redirect('/my-business/listings') },
      { path: 'business/valuations', loader: () => redirect('/my-business/valuations') },
      { path: 'business/documents', loader: () => redirect('/my-business/documents') },
      { path: 'business/performance', loader: () => redirect('/my-business/performance') },

      // Selling/Buying redirects
      { path: 'selling', loader: () => redirect('/my-business') },
      { path: 'buying', loader: () => redirect('/listings') },
      { path: 'browse', loader: () => redirect('/listings') },

      // Dashboard redirects
      { path: 'dashboard', loader: () => redirect('/my-business') },
      { path: 'profile', loader: () => redirect('/users/profile') },

      // Auth redirects
      { path: 'login', loader: () => redirect('/') }, // Login is modal-based
      { path: 'register', loader: () => redirect('/') }, // Register is modal-based
      { path: 'signup', loader: () => redirect('/') }, // Signup is modal-based

      // Resource redirects
      { path: 'valuation-guide', loader: () => redirect('/resources/valuation-guide') },
      { path: 'due-diligence', loader: () => redirect('/resources/due-diligence') },

      // Support redirects
      { path: 'support', loader: () => redirect('/help') },
      { path: 'support/contact', loader: () => redirect('/contact') },
      { path: 'support/faq', loader: () => redirect('/faq') },

      // 404 Fallback
      { path: '*', element: <NoPage /> },
    ],
  },
]);

export default router;
