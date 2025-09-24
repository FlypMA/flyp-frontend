/* 
Auth Layout

Used for: Authenticated user pages and dashboard pages
Based on MainLayout.tsx but with simplified navigation structure

Features:
- Clean navigation with logo, host button, and user menu
- No center navigation items (For Sellers, For Buyers, Valuation)
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

interface AuthLayoutProps {
  showFooter?: boolean;
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ showFooter = true, children }) => {
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

export default AuthLayout;
