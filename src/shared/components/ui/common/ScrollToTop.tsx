// 📜 Scroll to Top Component
// Location: src/shared/components/ui/common/ScrollToTop.tsx
// Purpose: Utility component to scroll to top on route change

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
