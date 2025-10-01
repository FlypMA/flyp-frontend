// 🧭 Navigation Components - Unified Version (Production Ready)
// Location: src/shared/components/navigation/index.ts
// Purpose: Clean exports for unified navigation system

/**
 * 🧭 Navigation System - Unified Architecture
 *
 * Consolidated navigation system with:
 * - Navigation: Main navigation (uses RoleNavigationMobile)
 * - BuyerNavigation: Buyer navigation (uses RoleNavigationMobile)
 * - SellerNavigation: Seller navigation (uses RoleNavigationMobile)
 * - RoleNavigationMobile: Unified mobile nav for all roles
 * - Zustand store for global state management
 * - Type-safe navigation config
 */

// ==============================================================================
// MAIN NAVIGATION COMPONENT
// ==============================================================================

export { default as Navigation } from './main/Navigation';

// ==============================================================================
// BUYER NAVIGATION COMPONENTS
// ==============================================================================

export { BuyerNavigation, BuyerNavigationDesktop } from './buyer';

// ==============================================================================
// SELLER NAVIGATION COMPONENTS
// ==============================================================================

export { SellerNavigation, SellerNavigationDesktop } from './seller';

// ==============================================================================
// UNIFIED MOBILE NAVIGATION
// ==============================================================================

export { RoleNavigationMobile } from './unified/RoleNavigationMobile';

// ==============================================================================
// USER AVATAR DROPDOWN
// ==============================================================================

export { default as BuyerDropdown } from './dropdown/BuyerDropdown';
export { default as SellerDropdown } from './dropdown/SellerDropdown';
