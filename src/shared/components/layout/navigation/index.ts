// 🧭 Navigation Components - MVP Version (Production Ready)
// Location: src/shared/components/navigation/index.ts
// Purpose: Clean exports for production navigation system

/**
 * 🧭 Navigation System - Production Ready
 *
 * A clean navigation system based on legacy app implementation:
 * - Navigation: Main navigation bar (used in MainLayout)
 * - BuyerNavigation: Buyer navigation (used in BuyerLayout)
 * - SellerNavigation: Seller navigation (used in SellerLayout)
 * - UserAvatarDropdown: User avatar dropdown (used within Navigation)
 *
 * Based on legacy app components:
 * - UnifiedNavigation.tsx -> Navigation.tsx
 * - user_avatar_dropdown.tsx -> UserAvatarDropdown.tsx
 */

// ==============================================================================
// MAIN NAVIGATION COMPONENT
// ==============================================================================

export { default as Navigation } from './main/Navigation';

// ==============================================================================
// CLEAN NAVIGATION COMPONENT
// ==============================================================================

// CleanNavigation removed - replaced with BuyerNavigation and SellerNavigation

// ==============================================================================
// BUYER NAVIGATION COMPONENTS
// ==============================================================================

export { BuyerNavigation, BuyerNavigationDesktop, BuyerNavigationMobile } from './buyer';

// ==============================================================================
// SELLER NAVIGATION COMPONENTS
// ==============================================================================

export { SellerNavigation, SellerNavigationDesktop, SellerNavigationMobile } from './seller';

// ==============================================================================
// USER AVATAR DROPDOWN
// ==============================================================================

export { default as BuyerDropdown } from './dropdown/BuyerDropdown';
export { default as SellerDropdown } from './dropdown/SellerDropdown';
