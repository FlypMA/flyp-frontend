import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/landingPages/home';
import { MainLayout } from './components/layout';
import { LogoOnlyLayout } from './components/layout';
import { SplitScreenLayout } from './components/layout';
import { AuthenticatedAccount as AuthenticatedLayout } from './components/layout';
import ProtectedRoute from './components/account/authentication/protectedRoute';
import SellerDashboard from './pages/account/seller/SellerDashboard';
import BuyerDashboard from './pages/account/buyer/BuyerDashboard';
import Settings from './pages/account/settings/settings';
import Checkout from './pages/checkout/checkout';
import CheckoutSuccess from './pages/checkout/success/CheckoutSuccess';
import PasswordReset from './pages/account/loginTools/passwordReset/PasswordReset';
import SignUpComplete from './pages/account/onboarding/signUpComplete/SignUpComplete';
import PrivacyPolicy from './pages/legal/privacyPolicy/privacyPolicy';
import TermsAndConditions from './pages/legal/termsAndConditions/TermsAndConditions';
import FAQ from './pages/support/faq';
import Contact from './pages/support/contact';
import Help from './pages/support/help';

import SellersLandingPage from './pages/landingPages/sellers/sellers';

import ListingSearch from './pages/listings/ListingSearch';
import ListingDetails from './pages/listings/ListingDetails';
import CreateListing from './pages/listings/CreateListing';
import NoPage from './pages/error/404/noPage';
import { AuthModalProvider } from './contexts/AuthModalContext';
import AuthModals from './components/modals/AuthModals';
import UrlGeneratorService from './services/urlMapping/urlGeneratorService';
import { ScrollToTop } from './components/common';

// Root layout component that wraps the entire app
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthModalProvider>
      <div>
        <ScrollToTop />
        {children}
        <AuthModals />
      </div>
    </AuthModalProvider>
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
      { path: 'listings/:id', element: <ListingDetails /> },
      { path: UrlGeneratorService.privacyPolicy(), element: <PrivacyPolicy /> },
      { path: UrlGeneratorService.termsConditions(), element: <TermsAndConditions /> },
      { path: UrlGeneratorService.faq(), element: <FAQ /> },
      { path: UrlGeneratorService.contact(), element: <Contact /> },
      { path: UrlGeneratorService.help(), element: <Help /> },

      { path: 'for-sellers', element: <SellersLandingPage /> },
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
      { path: 'buyer', element: <BuyerDashboard /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '/seller',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <SellerDashboard /> },
      { path: 'dashboard', element: <SellerDashboard /> },
      { path: 'listings/new', element: <CreateListing /> },
      { path: 'listings/:id/edit', element: <CreateListing /> },
    ],
  },
  {
    path: '/buyer',
    element: (
      <RootLayout>
        <ProtectedRoute element={<AuthenticatedLayout />} />
      </RootLayout>
    ),
    children: [
      { index: true, element: <BuyerDashboard /> },
      { path: 'dashboard', element: <BuyerDashboard /> },
      { path: 'search', element: <ListingSearch /> },
      { path: 'saved-searches', element: <BuyerDashboard /> },
    ],
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
