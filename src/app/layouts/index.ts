/* 
Layout Selection Logic:
- Public Content → MainLayout (most pages)
- User Dashboards → AuthenticatedAccount (protected areas)
- Checkout/Payment → LogoOnlyLayout (conversion-focused)
- Auth Flows → SplitScreenLayout (authentication-focused)
*/

import AuthenticatedAccount from './AuthLayout';
import MainLayout from './MainLayout';
import LogoOnlyLayout from './LogoOnlyLayout';
import SplitScreenLayout from './LayoutSplit';

export {
  AuthenticatedAccount,
  MainLayout,
  LogoOnlyLayout,
  SplitScreenLayout,
};
export default MainLayout;
