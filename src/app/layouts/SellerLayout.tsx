/* 
Seller Layout

Used for: Seller pages (like Airbnb host mode)
Based on MainLayout but with seller-specific navigation

Features:
- Seller navigation with Overview, Valuation, Data Room
- User avatar/profile menu on the right
- Footer (optional, showFooter prop)
- Standard page structure
*/

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AuthModals from '@/features/phase1/authentication/components/AuthModals';
import Footer from '@/shared/components/layout/footer/Footer';
import { SellerNavigation } from '@/shared/components/layout/navigation/seller';
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

interface SellerLayoutProps {
  showFooter?: boolean;
  children?: React.ReactNode;
}

const SellerLayout: React.FC<SellerLayoutProps> = ({ showFooter = true, children }) => {
  const location = useLocation();
  const [sectionToScroll, setSectionToScroll] = useState<string | null>(null);

  useEffect(() => {
    if (sectionToScroll && location.pathname === UrlGenerator.root()) {
      scrollToSection(sectionToScroll);
      setSectionToScroll(null);
    }
  }, [location, sectionToScroll]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <SellerNavigation />
      <main className="flex-1">{children || <Outlet />}</main>
      {showFooter && <Footer />}
      <AuthModals />
    </div>
  );
};

export default SellerLayout;
