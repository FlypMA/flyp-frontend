// 🧭 Navigation Components - MVP Version (Production Ready)
// Location: src/shared/components/navigation/index.ts
// Purpose: Clean exports for production navigation system

/**
 * 🧭 Navigation System - Production Ready
 *
 * A clean navigation system based on legacy app implementation:
 * - Navigation: Main navigation bar (used in MainLayout)
 * - DashboardSidebar: Desktop sidebar for seller dashboard (used in DashboardLayout)
 * - DashboardSidebarMobile: Mobile sidebar for seller dashboard (used in DashboardLayout)
 * - UserAvatarDropdown: User avatar dropdown (used within Navigation)
 *
 * Based on legacy app components:
 * - UnifiedNavigation.tsx -> Navigation.tsx
 * - SellerSidebar.tsx -> DashboardSidebar.tsx
 * - MobileNavigation.tsx -> DashboardSidebarMobile.tsx
 * - user_avatar_dropdown.tsx -> UserAvatarDropdown.tsx
 */

// ==============================================================================
// MAIN NAVIGATION COMPONENT
// ==============================================================================

export { default as Navigation } from './main/Navigation';

// ==============================================================================
// DASHBOARD SIDEBAR COMPONENTS
// ==============================================================================

export { DashboardSidebar, DashboardSidebarMobile } from './dashboard';

// ==============================================================================
// USER AVATAR DROPDOWN
// ==============================================================================

export { default as BuyerDropdown } from './dropdown/BuyerDropdown';
export { default as SellerDropdown } from './dropdown/SellerDropdown';
