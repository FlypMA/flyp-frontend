/* 
Buyer Layout

Used for: Buyer pages (like Airbnb guest mode)
Based on AuthLayout but without the "List your business" button

Features:
- Clean navigation with logo and user menu
- No "List your business" button (buyers don't list)
- Minimal design and spacing
- Footer (optional, showFooter prop)
- Standard page structure
*/

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AuthModals from '@/features/phase1/authentication/components/AuthModals';
import Footer from '@/shared/components/layout/footer/Footer';
import { BuyerNavigation } from '@/shared/components/layout/navigation/buyer';
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

interface BuyerLayoutProps {
  showFooter?: boolean;
  children?: React.ReactNode;
}

const BuyerLayout: React.FC<BuyerLayoutProps> = ({ showFooter = true, children }) => {
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
      <BuyerNavigation />
      <main className="flex-1">{children || <Outlet />}</main>
      {showFooter && <Footer />}
      <AuthModals />
    </div>
  );
};

export default BuyerLayout;
