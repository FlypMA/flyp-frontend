/**
 * 🚀 MVP Router - UpSwitch MVP
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
import BuyerLayout from '../layouts/BuyerLayout';
import LayoutSplit from '../layouts/LayoutSplit';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import MainLayout from '../layouts/MainLayout';
import SellerLayout from '../layouts/SellerLayout';

// Route Guard imports
import NDARouteGuard from './NDARouteGuard';
import { ProtectedRoute, SellerRoute } from './route-guards';

// Page imports - Landing Pages
import {
  SellerVariationA,
  SellerVariationB,
  SellerVariationC,
  SellerVariationD,
} from '../pages/landingPages/sellers/variations';
import VariationComparison from '../pages/landingPages/sellers/variations/VariationComparison';

// Page imports - Listings
import CreateListingPage from '../pages/listings/CreateListingPage';
import ListingDetails from '../pages/listings/ListingDetails';
import ListingPreludePage from '../pages/listings/ListingPreludePage';
import PrivateListingDetails from '../pages/listings/PrivateListingDetails';

// Page imports - Search Variations
import {
  SearchVariationA,
  SearchVariationB,
  SearchVariationC,
  SearchVariationD,
} from '../pages/listings/variations';

// Page imports - Business Dashboard
import BusinessCardCreationPage from '../pages/business/card/BusinessCardCreationPage';
import DocumentVault from '../pages/business/data-room/DocumentVault';
import ListingCreationPage from '../pages/business/listing/ListingCreationPage';
import { ListingManagement } from '../pages/business/management';
import BusinessCardVariations from '../pages/business/overview/BusinessCardVariations';
import BusinessOverview from '../pages/business/overview/BusinessOverview';
import GetFreeValuation from '../pages/business/reports/GetFreeValuation';
import ValuationTool from '../pages/business/reports/ValuationTool';
import ProfileCardCreationPage from '../pages/profile/ProfileCardCreationPage';

// Page imports - Valuation Pages
import {
  ValuationVariationA,
  ValuationVariationB,
  ValuationVariationC,
  ValuationVariationD,
} from '../pages/landingPages/valuation/variations';
import ValuationComparison from '../pages/landingPages/valuation/variations/ValuationComparison';

// Page imports - Homepage Variations
import {
  HomeVariationA,
  HomeVariationB,
  HomeVariationC,
} from '../pages/landingPages/home/variations';
import HomeComparison from '../pages/landingPages/home/variations/HomeComparison';

// Page imports - Due Diligence
import { DueDiligencePage } from '../pages/due-diligence';

// Page imports - Offer Management
import { OfferManagementPage } from '../pages/offer-management';

// Page imports - Transaction Completion
import { TransactionCompletionPage } from '../pages/transaction-completion';

// Page imports - Account & Authentication
import { PreferencesPage, SecurityPage } from '@/features/phase1/profile';
import SignUpComplete from '../pages/account/onboarding/signUpComplete/SignUpComplete';
import ForgotPasswordPage from '../pages/account/passwordReset/ForgotPasswordPage';
import ResetPasswordPage from '../pages/account/passwordReset/ResetPasswordPage';
import UserBilling from '../pages/account/users/UserBilling';
import UserNotifications from '../pages/account/users/UserNotifications';
import UserProfileNew from '../pages/account/users/UserProfileNew';

// Page imports - Users
import { SavedListings } from '../pages/users';

// Page imports - Checkout
import CheckoutPage from '../pages/checkout/checkout';
import CheckoutSuccess from '../pages/checkout/success/CheckoutSuccess';

// Page imports - Company & Legal
import About from '../pages/company/about/About';
import HowItWorks from '../pages/company/howItWorks/HowItWorks';
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
      { index: true, element: <HomeVariationC /> },
      { path: 'for-sellers', element: <SellerVariationC /> },

      // Seller Landing Page Variations (for design exploration & A/B testing)
      { path: 'for-sellers/variation-a', element: <SellerVariationA /> },
      { path: 'for-sellers/variation-b', element: <SellerVariationB /> },
      { path: 'for-sellers/variation-c', element: <SellerVariationC /> },
      { path: 'for-sellers/variation-d', element: <SellerVariationD /> },
      { path: 'for-sellers/compare', element: <VariationComparison /> },

      // Valuation Landing Page (NEW - Main entry point for sellers)
      { path: 'valuation', element: <ValuationVariationD /> },
      { path: 'get-valued', element: <ValuationVariationD /> }, // Alternative URL

      // Valuation Page Variations (for design exploration & A/B testing)
      { path: 'valuation/variation-a', element: <ValuationVariationA /> },
      { path: 'valuation/variation-b', element: <ValuationVariationB /> },
      { path: 'valuation/variation-c', element: <ValuationVariationC /> },
      { path: 'valuation/variation-d', element: <ValuationVariationD /> },
      { path: 'valuation/compare', element: <ValuationComparison /> },

      // Homepage Variations (for design exploration & A/B testing)
      { path: 'home/variation-a', element: <HomeVariationA /> },
      { path: 'home/variation-b', element: <HomeVariationB /> },
      { path: 'home/variation-c', element: <HomeVariationC /> },
      { path: 'home/compare', element: <HomeComparison /> },

      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'how-it-works', element: <HowItWorks /> },
      { path: 'help', element: <Help /> },
      { path: 'faq', element: <FAQ /> },

      // Search & Listings
      { path: 'search', element: <SearchVariationC /> },
      { path: 'browse', element: <SearchVariationC /> },

      // Search Page Variations (for design exploration & A/B testing)
      { path: 'search/variation-a', element: <SearchVariationA /> },
      { path: 'search/variation-b', element: <SearchVariationB /> },
      { path: 'search/variation-c', element: <SearchVariationC /> },
      { path: 'search/variation-d', element: <SearchVariationD /> },
      { path: 'listings/:id', element: <ListingDetails /> },
      {
        path: 'listings/:id/private',
        element: (
          <ProtectedRoute>
            <NDARouteGuard>
              <PrivateListingDetails />
            </NDARouteGuard>
          </ProtectedRoute>
        ),
      },

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
  // BUYER ROUTES - BuyerLayout (Buyer-specific authenticated users)
  // ==============================================================================
  {
    path: '/',
    element: <BuyerLayout />,
    children: [
      // User Account Management (all authenticated users)
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <UserProfileNew />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/profile',
        element: (
          <ProtectedRoute>
            <UserProfileNew />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/profile-new',
        element: (
          <ProtectedRoute>
            <UserProfileNew />
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
            <SecurityPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/preferences',
        element: (
          <ProtectedRoute>
            <PreferencesPage />
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
    ],
  },

  // ==============================================================================
  // BUSINESS PAGES - SellerLayout WITHOUT FOOTER
  // ==============================================================================
  {
    path: '/',
    element: <SellerLayout showFooter={false} />,
    children: [
      // Business Dashboard (sellers, both, admin only) - NO FOOTER
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
        path: 'my-business/card/create',
        element: (
          <SellerRoute>
            <BusinessCardCreationPage />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/profile/create',
        element: (
          <SellerRoute>
            <ProfileCardCreationPage />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/listings/create',
        element: (
          <SellerRoute>
            <ListingCreationPage />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/valuations',
        element: (
          <SellerRoute>
            <ValuationTool />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/card-variations',
        element: (
          <SellerRoute>
            <BusinessCardVariations />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/listings',
        element: (
          <SellerRoute>
            <ListingManagement />
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

      // Listing Creation Flow
      {
        path: 'my-business/listings/new',
        element: (
          <SellerRoute>
            <CreateListingPage />
          </SellerRoute>
        ),
      },
      {
        path: 'my-business/listings/prelude',
        element: (
          <SellerRoute>
            <ListingPreludePage />
          </SellerRoute>
        ),
      },
      // Removed duplicate 'my-business/listings/create' route (legacy ListingServicePage)
      // Now using ListingCreationPage at line 296

      // Due Diligence (buyers, sellers, advisors)
      {
        path: 'due-diligence/:processId/:listingId',
        element: (
          <ProtectedRoute>
            <DueDiligencePage />
          </ProtectedRoute>
        ),
      },

      // Offer Management (buyers, sellers, advisors)
      {
        path: 'offers',
        element: (
          <ProtectedRoute>
            <OfferManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'offers/:listingId',
        element: (
          <ProtectedRoute>
            <OfferManagementPage />
          </ProtectedRoute>
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

      // Transaction Completion (buyers, sellers, advisors)
      {
        path: 'transactions/:transactionId',
        element: (
          <ProtectedRoute>
            <TransactionCompletionPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ==============================================================================
  // OTHER SELLER ROUTES - SellerLayout WITH FOOTER
  // ==============================================================================
  {
    path: '/',
    element: <SellerLayout showFooter={true} />,
    children: [
      // Messages (all authenticated users) - Enhanced with conversation context
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
      { path: 'account', loader: () => redirect('/users/profile') },
      { path: 'account/seller', loader: () => redirect('/my-business') },
      { path: 'account/settings', loader: () => redirect('/users/profile') },
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
      { path: 'buying', loader: () => redirect('/search') },

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
