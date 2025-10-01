/**
 * 🧭 Navigation Store
 * Global state management for all navigation components
 *
 * Features:
 * - Single source of truth for navigation state
 * - Only one menu open at a time (better UX)
 * - Programmatic control from anywhere
 * - Easy debugging and analytics
 */

import { create } from 'zustand';

type NavigationType = 'main' | 'buyer' | 'seller';

interface NavigationState {
  // State
  isMobileMenuOpen: boolean;
  isUserMenuOpen: boolean;
  currentNav: NavigationType;

  // Actions
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openUserMenu: () => void;
  closeUserMenu: () => void;
  toggleUserMenu: () => void;
  closeAllMenus: () => void;
  setCurrentNav: (nav: NavigationType) => void;
}

export const useNavigationStore = create<NavigationState>(set => ({
  // Initial state
  isMobileMenuOpen: false,
  isUserMenuOpen: false,
  currentNav: 'main',

  // Mobile menu actions
  openMobileMenu: () => set({ isMobileMenuOpen: true, isUserMenuOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set(state => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
      isUserMenuOpen: false, // Close user menu when opening mobile menu
    })),

  // User menu actions
  openUserMenu: () => set({ isUserMenuOpen: true, isMobileMenuOpen: false }),
  closeUserMenu: () => set({ isUserMenuOpen: false }),
  toggleUserMenu: () =>
    set(state => ({
      isUserMenuOpen: !state.isUserMenuOpen,
      isMobileMenuOpen: false, // Close mobile menu when opening user menu
    })),

  // Utility actions
  closeAllMenus: () => set({ isMobileMenuOpen: false, isUserMenuOpen: false }),
  setCurrentNav: (nav: NavigationType) => set({ currentNav: nav }),
}));
