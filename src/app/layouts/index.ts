/* 
Layout Selection Logic:
- Public Content → MainLayout (most pages)
- Buyer Pages → BuyerLayout (like Airbnb guest mode, no listing button)
- Seller Pages → SellerLayout (like Airbnb host mode, with seller navigation)
- Checkout/Payment → LogoOnlyLayout (conversion-focused)
- Auth Flows → SplitScreenLayout (authentication-focused)
*/

import BuyerLayout from './BuyerLayout';
import SplitScreenLayout from './LayoutSplit';
import LogoOnlyLayout from './LogoOnlyLayout';
import MainLayout from './MainLayout';
import SellerLayout from './SellerLayout';

export { BuyerLayout, LogoOnlyLayout, MainLayout, SellerLayout, SplitScreenLayout };
export default MainLayout;
