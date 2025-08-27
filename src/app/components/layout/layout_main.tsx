import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../footer';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import UnifiedNavigation from '../navigation/UnifiedNavigation';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 140;
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
  }
};

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sectionToScroll, setSectionToScroll] = useState<string | null>(null);

  useEffect(() => {
    if (sectionToScroll && location.pathname === UrlGeneratorService.root()) {
      scrollToSection(sectionToScroll);
      setSectionToScroll(null);
    }
  }, [location, sectionToScroll]);

  const handleNavigationAndScroll = (sectionId: string) => {
    if (location.pathname !== UrlGeneratorService.root()) {
      navigate(UrlGeneratorService.root(), { replace: true });
      setSectionToScroll(sectionId);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <div>
      <UnifiedNavigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;