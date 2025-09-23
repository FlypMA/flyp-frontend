/* 

Used for: Public pages, general content pages

Routes:
  - / (Home page)
  - /search, /listings (Search & browse)
  - /listings/:id (Individual listing details)
  - /privacy-policy, /terms-conditions (Legal pages)
  - /contact, /help (Support pages)
  - /for-sellers, /about (Landing pages)
  - /resources/valuation-guide, /resources/due-diligence (Resource pages)
  - /cookie-policy, /gdpr, /security (Legal/Compliance)
  - /onboarding/seller, /onboarding/buyer (Onboarding flows)

Features:
- Full navigation bar with logo, menu items, auth buttons
- Footer (optional, showFooter prop)
- Scroll-to-section functionality for home page
- Standard page structure
*/

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AuthModals from '@/features/phase1/authentication/components/AuthModals';
import Footer from '@/shared/components/layout/footer/Footer';
import Navigation from '@/shared/components/layout/navigation/main/Navigation';
import { ScrollToTop } from '@/shared/utils/ux';
import { UrlGenerator } from '../../shared/services';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 140;
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
  }
};

interface MainLayoutProps {
  showFooter?: boolean;
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ showFooter = true, children }) => {
  // const navigate = useNavigate(); // TODO: Implement navigation functionality
  const location = useLocation();
  const [sectionToScroll, setSectionToScroll] = useState<string | null>(null);

  useEffect(() => {
    if (sectionToScroll && location.pathname === UrlGenerator.root()) {
      scrollToSection(sectionToScroll);
      setSectionToScroll(null);
    }
  }, [location, sectionToScroll]);

  // TODO: Implement navigation and scroll functionality
  // const handleNavigationAndScroll = (sectionId: string) => {
  //   if (location.pathname !== UrlGenerator.root()) {
  //     navigate(UrlGenerator.root(), { replace: true });
  //     setSectionToScroll(sectionId);
  //   } else {
  //     scrollToSection(sectionId);
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <main className="flex-1">{children || <Outlet />}</main>
      {showFooter && <Footer />}
      <AuthModals />
    </div>
  );
};

export default MainLayout;
