import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Home from './pages/landingPages/home';
import { MainLayout } from './components/layout';
import { LogoOnlyLayout } from './components/layout';
import { SplitScreenLayout } from './components/layout';
import { AuthenticatedAccount as AuthenticatedLayout } from './components/layout';
import ProtectedRoute from './components/account/authentication/protectedRoute';
import SellerDashboard from './pages/account/seller/SellerDashboard';
// BuyerDashboard removed - buyers browse /listings/ in Airbnb model
import Settings from './pages/account/settings/settings';
import Checkout from './pages/checkout/checkout';
import CheckoutSuccess from './pages/checkout/success/CheckoutSuccess';
import PasswordReset from './pages/account/loginTools/passwordReset/PasswordReset';
import PasswordResetConfirm from './pages/account/loginTools/passwordReset/PasswordResetConfirm';
import SignUpComplete from './pages/account/onboarding/signUpComplete/SignUpComplete';
import PrivacyPolicy from './pages/legal/privacyPolicy/privacyPolicy';
import TermsAndConditions from './pages/legal/termsAndConditions/TermsAndConditions';
import Contact from './pages/support/contact';
import Messages from './pages/messages/Messages';
import Help from './pages/help/Help';

import SellersLandingPage from './pages/landingPages/sellers/sellers';

import ListingSearch from './pages/listings/ListingSearch';
import ListingDetails from './pages/listings/ListingDetails';
import EditListingPage from './pages/listings/EditListingPage';

import NoPage from './pages/error/404/noPage';
import { AuthModalProvider } from './contexts/AuthModalContext';
import { BusinessModalProvider, useBusinessModal } from './contexts/BusinessModalContext';
import AuthModals from './components/modals/AuthModals';
import BusinessListingModal from './components/modals/BusinessListingModal';
import UrlGeneratorService from './services/urlMapping/urlGeneratorService';
import About from './pages/company/about/About';
import ValuationGuide from './pages/resources/ValuationGuide';
import DueDiligenceChecklist from './pages/resources/DueDiligenceChecklist';
import CookiePolicy from './pages/legal/cookiePolicy/CookiePolicy';
import GdprCompliance from './pages/legal/gdpr/GdprCompliance';
import Security from './pages/legal/security/Security';
import SellerOnboarding from './pages/onboarding/seller/SellerOnboardingPage';
import BuyerOnboarding from './pages/onboarding/buyer/ModernBuyerOnboarding';

import CreateListingPage from './pages/listings/CreateListingPage';
import TransactionFlow from './pages/transaction/TransactionFlow';
import NavigationTest from './components/navigation/NavigationTest';
import { ScrollToTop } from './components/common';
import BusinessOverview from './pages/business/BusinessOverview';
import BusinessValuation from './pages/business/BusinessValuation';
import ListingManagement from './pages/business/ListingManagement';
import DocumentVault from './pages/business/DocumentVault';
import SolvencyIntelligence from './pages/business/SolvencyIntelligence';
import LiquidationComparison from './pages/business/LiquidationComparison';

// Root layout component that wraps the entire app
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthModalProvider>
      <BusinessModalProvider>
        <div>
          <ScrollToTop />
          {children}
          <AuthModals />
          <BusinessListingModalContainer />
        </div>
      </BusinessModalProvider>
    </AuthModalProvider>
  );
};

// Container component for BusinessListingModal with context integration
const BusinessListingModalContainer = () => {
  const { activeModal, modalStep, closeBusinessModal } = useBusinessModal();

  return (
    <BusinessListingModal
      isOpen={activeModal === 'business-listing'}
      onClose={closeBusinessModal}
      initialStep={modalStep}
    />
  );
};

const routes = [
  {
    path: '/',
    element: (
      <RootLayout>
        <MainLayout />
      </RootLayout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <ListingSearch /> },
      { path: 'listings/:id', element: <ListingSearch /> }, // Will show details modal/view
      { path: UrlGeneratorService.privacyPolicy(), element: <PrivacyPolicy /> },
      { path: UrlGeneratorService.termsConditions(), element: <TermsAndConditions /> },

      { path: UrlGeneratorService.contact(), element: <Contact /> },
      { path: UrlGeneratorService.help(), element: <Help /> },

      { path: 'for-sellers', element: <SellersLandingPage /> },
      { path: 'about', element: <About /> },
      { path: 'resources/valuation-guide', element: <ValuationGuide /> },
      { path: 'resources/due-diligence', element: <DueDiligenceChecklist /> },
      { path: 'cookie-policy', element: <CookiePolicy /> },
      { path: 'gdpr', element: <GdprCompliance /> },
      { path: 'security', element: <Security /> },
      { path: 'navigation-test', element: <NavigationTest /> },
    ],
  },
  {
    path: '/onboarding',
    element: (
      <RootLayout>
        <ProtectedRoute element={<MainLayout />} />
      </RootLayout>
    ),
    children: [
      { path: 'seller', element: <SellerOnboarding /> },
      { path: 'buyer', element: <BuyerOnboarding /> },
    ],
  },
  {
    path: '/account',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <SellerDashboard /> }, // Default to seller dashboard
      { path: 'seller', element: <SellerDashboard /> },
      { path: 'seller/dashboard', element: <SellerDashboard /> },
      // Buyer routes removed - buyers browse /listings/ in Airbnb model
      { path: 'settings', element: <Settings /> },
    ],
  },
  // Legacy /business route - redirect to /my-business
  {
    path: '/business',
    loader: () => redirect('/my-business'),
  },
  {
    path: '/business/*',
    loader: ({ params }) => redirect('/my-business/' + (params['*'] || '')),
  },
  // ==============================================================================
  // MARKETPLACE ENHANCEMENTS - Extended listings functionality
  // Buyers browse here (no dashboard needed, like Airbnb guests)
  // ==============================================================================
  {
    path: '/listings',
    element: (
      <RootLayout>
        <MainLayout />
      </RootLayout>
    ),
    children: [
      { index: true, element: <ListingSearch /> },
      { path: 'advanced', element: <ListingSearch /> },
      { path: ':id', element: <ListingSearch /> }, // Will show listing details
      { path: ':id/data-room', element: <ListingSearch /> }, // Will show data room
    ],
  },
  // ==============================================================================
  // BUSINESS OWNER DOMAIN - /my-business/* (Airbnb /hosting/ equivalent)
  // Only accessible if user owns/manages a business
  // ==============================================================================
  {
    path: '/my-business',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <SellerDashboard /> },
      { path: 'overview', element: <SellerDashboard /> },
      { path: 'listings', element: <SellerDashboard /> },
      { path: 'listings/new', element: <CreateListingPage /> },
      { path: 'listings/:id', element: <EditListingPage /> },
      { path: 'listings/:id/analytics', element: <SellerDashboard /> },
      { path: 'listings/:id/inquiries', element: <SellerDashboard /> },
      { path: 'valuations', element: <BusinessValuation /> },
      { path: 'documents', element: <DocumentVault /> },
      { path: 'performance', element: <SellerDashboard /> },
    ],
  },
  // ==============================================================================
  // USER DOMAIN - /users/* (Universal account management)
  // ==============================================================================
  {
    path: '/users',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <Settings /> },
      { path: 'profile', element: <Settings /> },
      { path: 'settings', element: <Settings /> },
      { path: 'saved', element: <Settings /> }, // Saved listings for buyers
      { path: 'notifications', element: <Settings /> },
      { path: 'billing', element: <Settings /> },
      { path: 'security', element: <Settings /> },
      { path: 'consultation', element: <Settings /> }, // Buyer consultation booking
    ],
  },
  // ==============================================================================
  // UNIVERSAL COMMUNICATION - /messages/* (like Airbnb /messages/*)
  // ==============================================================================
  {
    path: '/messages',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <Messages /> },
      { path: ':conversationId', element: <Messages /> },
    ],
  },
  // ==============================================================================
  // BACKWARD COMPATIBILITY REDIRECTS - AIRBNB MODEL
  // ==============================================================================
  {
    path: '/dashboard',
    loader: () => {
      // Redirect legacy dashboard based on role (like Airbnb)
      const userRole = localStorage.getItem('userRole') || 'buyer';
      if (userRole === 'seller') {
        return redirect('/my-business'); // Business owners get /my-business/
      }
      return redirect('/listings'); // Buyers browse listings (no dashboard)
    },
  },
  {
    path: '/dashboard/buyer',
    loader: () => redirect('/listings'), // No buyer dashboard, browse listings
  },
  {
    path: '/account/seller',
    loader: () => redirect('/my-business'),
  },
  {
    path: '/selling',
    loader: () => redirect('/my-business'),
  },
  {
    path: '/selling/*',
    loader: ({ params }) => redirect('/my-business/' + (params['*'] || '')),
  },
  {
    path: '/buying',
    loader: () => redirect('/listings'),
  },
  {
    path: '/buying/*',
    loader: () => redirect('/listings'),
  },
  {
    path: '/buyer',
    loader: () => redirect('/listings'),
  },
  {
    path: '/seller',
    loader: () => redirect('/my-business'),
  },
  {
    path: '/profile',
    loader: () => redirect('/users/profile'),
  },
  {
    path: '/account',
    loader: () => redirect('/users/profile'),
  },
  // ==============================================================================
  // USER DOMAIN - /users/* (Universal account management)
  // ==============================================================================
  {
    path: '/users',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <Settings /> }, // Default to profile
      { path: 'profile', element: <Settings /> },
      { path: 'settings', element: <Settings /> },
      { path: 'billing', element: <Settings /> },
      { path: 'security', element: <Settings /> },
      { path: 'notifications', element: <Settings /> },
    ],
  },
  // ==============================================================================
  // COMMUNICATION DOMAIN - /messages/* (Universal messaging)
  // ==============================================================================
  {
    path: '/messages',
    element: (
      <RootLayout>
        <ProtectedRoute element={<Messages />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <Messages /> },
      { path: ':conversationId', element: <Messages /> },
    ],
  },
  // ==============================================================================
  // BUSINESS OWNER DOMAIN - /my-business/* (Airbnb /hosting/ equivalent)
  // Only accessible if user owns/manages a business
  // ==============================================================================
  {
    path: '/my-business',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <SellerDashboard /> },
      { path: 'overview', element: <SellerDashboard /> },
      { path: 'listings', element: <SellerDashboard /> },
      { path: 'listings/new', element: <CreateListingPage /> },
      { path: 'listings/:id', element: <EditListingPage /> },
      { path: 'listings/:id/analytics', element: <SellerDashboard /> },
      { path: 'listings/:id/inquiries', element: <SellerDashboard /> },
      { path: 'valuations', element: <BusinessValuation /> },
      { path: 'documents', element: <DocumentVault /> },
      { path: 'performance', element: <SellerDashboard /> },
    ],
  },
  // ==============================================================================
  // MARKETPLACE ENHANCEMENTS - Extended listings functionality
  // Buyers browse here (no dashboard needed, like Airbnb guests)
  // ==============================================================================
  {
    path: '/listings',
    element: (
      <RootLayout>
        <MainLayout />
      </RootLayout>
    ),
    children: [
      { index: true, element: <ListingSearch /> },
      { path: 'advanced', element: <ListingSearch /> },
      { path: ':id', element: <ListingSearch /> }, // Will show listing details
      { path: ':id/data-room', element: <ListingSearch /> }, // Will show data room
    ],
  },
  {
    path: '/transaction/:transactionId',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [{ index: true, element: <TransactionFlow /> }],
  },
  {
    path: UrlGeneratorService.checkout(),
    element: (
      <RootLayout>
        <LogoOnlyLayout />
      </RootLayout>
    ),
    children: [{ index: true, element: <Checkout /> }],
  },
  {
    path: UrlGeneratorService.checkoutSuccess(),
    element: (
      <RootLayout>
        <LogoOnlyLayout />
      </RootLayout>
    ),
    children: [{ index: true, element: <CheckoutSuccess /> }],
  },
  {
    path: UrlGeneratorService.passwordReset(),
    element: (
      <RootLayout>
        <SplitScreenLayout />
      </RootLayout>
    ),
    children: [{ index: true, element: <PasswordReset /> }],
  },
  {
    path: UrlGeneratorService.signupComplete(),
    element: (
      <RootLayout>
        <SplitScreenLayout />
      </RootLayout>
    ),
    children: [{ index: true, element: <SignUpComplete /> }],
  },
  {
    path: '/password-reset/confirm',
    element: (
      <RootLayout>
        <SplitScreenLayout />
      </RootLayout>
    ),
    children: [{ index: true, element: <PasswordResetConfirm /> }],
  },
  {
    path: '*',
    element: (
      <RootLayout>
        <NoPage />
      </RootLayout>
    ),
  },
];

const router = createBrowserRouter(routes);

export const App = () => {
  useEffect(() => {
    console.log('🚀 betweendeals.com App component mounted, starting initialization...');

    const initializeApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log('✅ betweendeals.com App initialization complete');
      } catch (error) {
        console.error('❌ betweendeals.com App initialization failed:', error);
      }
    };

    initializeApp();
  }, []);

  console.log('🎨 betweendeals.com App component rendering main content...');

  return <RouterProvider router={router} />;
};

export default App;
