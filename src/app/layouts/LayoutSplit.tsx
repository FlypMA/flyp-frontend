/*
Used for: Authentication and account setup flows

Routes:
- /password-reset (Password reset)
- /password-reset/confirm (Password reset confirmation)
- /signup-complete (Post-signup completion)

Features:
- Split-screen design (logo on left, content on right)
- Full-height layout (h-screen)
- Minimal navigation
- Authentication-focused design
*/

import { Link, Outlet } from 'react-router-dom';
// TODO: Implement logos and Image components
// import { logos } from '../../../assets/logos';
// import { Image } from '@heroui/react';
import AuthModals from '@/features/phase1/authentication/components/AuthModals';
import { ScrollToTop } from '@/shared/utils/ux';
import { UrlGenerator } from '../../shared/services';

const SplitScreenLayout = () => {
  return (
    <div data-scope="navigation" className="h-screen">
      <ScrollToTop />
      <div className="absolute pt-10 pl-6">
        <Link to={UrlGenerator.root()}>
          {/* TODO: Implement logo component */}
          <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">BD</span>
          </div>
        </Link>
      </div>
      <Outlet />
      <AuthModals />
    </div>
  );
};

export default SplitScreenLayout;
