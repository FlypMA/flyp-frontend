// 🌐 Public Routes - No authentication required
import { RouteObject } from 'react-router-dom';
import { MainLayout, AppLayout } from '@shared/components/layouts';

// Lazy load pages for better performance
import { lazy } from 'react';
const Home = lazy(() => import('../pages/landingPages/home'));
const About = lazy(() => import('../pages/company/about/About'));
const Contact = lazy(() => import('../pages/support/contact'));
const Help = lazy(() => import('../pages/help/Help'));
const SellersLanding = lazy(() => import('../pages/landingPages/sellers'));
const ListingSearch = lazy(() => import('@marketplace/pages/ListingSearch'));
const ListingDetails = lazy(() => import('@marketplace/pages/ListingDetails'));

// Legal pages
const PrivacyPolicy = lazy(() => import('../pages/legal/privacyPolicy/privacyPolicy'));
const TermsAndConditions = lazy(
  () => import('../pages/legal/termsAndConditions/TermsAndConditions')
);
const CookiePolicy = lazy(() => import('../pages/legal/cookiePolicy/CookiePolicy'));
const GdprCompliance = lazy(() => import('../pages/legal/gdpr/GdprCompliance'));
const Security = lazy(() => import('../pages/legal/security/Security'));

// Resource pages
const ValuationGuide = lazy(() => import('../pages/resources/ValuationGuide'));
const DueDiligenceChecklist = lazy(() => import('../pages/resources/DueDiligenceChecklist'));

// FAQ page (missing from new app)
const FAQ = lazy(() => import('../pages/support/FAQ'));

export const publicRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    // Home & Landing
    { index: true, element: <Home /> },
    { path: 'about', element: <About /> },
    { path: 'for-sellers', element: <SellersLanding /> },

    // Marketplace (Public Browsing)
    { path: 'search', element: <ListingSearch /> },
    { path: 'listings', element: <ListingSearch /> },
    { path: 'listings/:id', element: <ListingDetails /> },
    { path: 'listings/advanced', element: <ListingSearch /> },

    // Support & Help
    { path: 'contact', element: <Contact /> },
    { path: 'help', element: <Help /> },
    { path: 'faq', element: <FAQ /> },
    { path: 'support/faq', element: <FAQ /> },

    // Legal & Compliance
    { path: 'privacy-policy', element: <PrivacyPolicy /> },
    { path: 'terms-conditions', element: <TermsAndConditions /> },
    { path: 'cookie-policy', element: <CookiePolicy /> },
    { path: 'gdpr', element: <GdprCompliance /> },
    { path: 'security', element: <Security /> },

    // Resources
    { path: 'resources/valuation-guide', element: <ValuationGuide /> },
    { path: 'resources/due-diligence', element: <DueDiligenceChecklist /> },
    { path: 'valuation-guide', element: <ValuationGuide /> }, // Legacy alias
    { path: 'due-diligence', element: <DueDiligenceChecklist /> }, // Legacy alias
  ],
};
