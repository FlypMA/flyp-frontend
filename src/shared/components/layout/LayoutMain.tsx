import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import NavigationDesktop from '../navigation/NavigationDesktop';

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
      <NavigationDesktop />
      {children || <Outlet />}
      {/* TODO: Re-enable Footer when available */}
    </div>
  );
};

export default MainLayout;
