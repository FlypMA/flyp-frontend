// 🧭 Navigation Configuration - MVP Version
// Location: src/shared/components/navigation/utils/navigation-config.ts
// Purpose: Centralized navigation configuration matching legacy app exactly

import {
  Building2,
  Calculator,
  DollarSign,
  FileText,
  Heart,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import React from 'react';
import { normalizeUserRole } from './role-utils';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface DropdownMenuItem {
  icon?: React.ComponentType<any>;
  label?: string;
  href?: string;
  action?: string;
  divider?: boolean;
  isLogout?: boolean;
}

/**
 * Desktop Navigation Items - Exact copy from legacy UnifiedNavigation.tsx
 */
export const getDesktopNavigationItems = (): NavItem[] => [
  { label: 'How to Sell', href: '/for-sellers', icon: Building2 },
  { label: 'Browse Businesses', href: '/search', icon: Search },
  { label: 'Free Valuation', href: '/resources/valuation-guide', icon: Calculator },
];

/**
 * Mobile Navigation Sections - Exact copy from legacy MobileNavigation.tsx
 */
export const getMobileNavigationSections = (userRole?: string): NavSection[] => {
  const publicSections: NavSection[] = [
    {
      title: 'Discover',
      items: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Browse Businesses', href: '/search', icon: TrendingUp },
        { label: 'How to Sell', href: '/for-sellers', icon: Building2 },
      ],
    },
    {
      title: 'Resources',
      items: [{ label: 'Free Valuation', href: '/resources/valuation-guide', icon: DollarSign }],
    },
  ];

  if (!userRole) {
    return publicSections;
  }

  const normalizedRole = normalizeUserRole(userRole);

  const authenticatedSections: NavSection[] = [
    {
      title: 'Dashboard',
      items: [
        {
          label: normalizedRole === 'seller' ? 'My Business' : 'Browse Businesses',
          href: normalizedRole === 'seller' ? '/my-business' : '/listings',
          icon: Home,
        },
        {
          label: normalizedRole === 'seller' ? 'My Listings' : 'Saved Items',
          href: normalizedRole === 'seller' ? '/my-business/listings' : '/users/saved',
          icon: Heart,
        },
        {
          label: 'Messages',
          href: '/messages',
          icon: MessageCircle,
          badge: normalizedRole === 'buyer' ? '2' : undefined,
        },
      ],
    },
  ];

  if (normalizedRole === 'seller') {
    authenticatedSections.push({
      title: 'Business Management',
      items: [
        { label: 'My Listings', href: '/my-business/listings', icon: Building2 },
        {
          label: 'Create New Listing',
          href: '/my-business/listings/new',
          icon: FileText,
          isNew: true,
        },
        { label: 'Business Valuations', href: '/my-business/valuations', icon: Users },
        { label: 'Performance Analytics', href: '/my-business/performance', icon: TrendingUp },
      ],
    });
  }

  authenticatedSections.push({
    title: 'Account',
    items: [
      { label: 'Account Settings', href: '/users/settings', icon: Settings },
      { label: 'Billing & Subscription', href: '/users/billing', icon: Shield },
      { label: 'Messages', href: '/messages', icon: MessageCircle },
    ],
  });

  return [...authenticatedSections, ...publicSections];
};

/**
 * Buyer Dropdown Menu Items - Exact copy from legacy user_avatar_dropdown.tsx
 */
export const getBuyerDropdownItems = (): DropdownMenuItem[] => [
  { icon: LayoutDashboard, label: 'Browse Businesses', href: '/listings' },
  { icon: Heart, label: 'Saved Items', href: '/users/saved' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
  { divider: true },
  { icon: Settings, label: 'Account Settings', href: '/users/settings' },
  { icon: Shield, label: 'Billing & Subscription', href: '/users/billing' },
  { icon: HelpCircle, label: 'Help Center', href: '/help' },
  { divider: true },
  { icon: LogOut, label: 'Log Out', action: 'logout', isLogout: true },
];

/**
 * Seller Dropdown Menu Items - Exact copy from legacy user_avatar_dropdown.tsx
 */
export const getSellerDropdownItems = (): DropdownMenuItem[] => [
  // Primary business management
  { icon: LayoutDashboard, label: 'My Business', href: '/my-business' },
  { divider: true },
  // Account and support
  { icon: Settings, label: 'Account Settings', href: '/users/settings' },
  { icon: HelpCircle, label: 'Get Help', href: '/help' },
  { icon: Plus, label: 'Create a New Listing', href: '/my-business/listings/new' },
  { divider: true },
  // Logout
  { icon: LogOut, label: 'Log Out', action: 'logout', isLogout: true },
];

/**
 * Dashboard Sidebar Items - Based on legacy SellerSidebar.tsx
 */
export const getDashboardSidebarSections = () => [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/my-business',
        icon: LayoutDashboard,
        description: 'Business overview and metrics',
      },
    ],
  },
  {
    title: 'Valuation & Analysis',
    items: [
      {
        label: 'Business Valuation',
        href: '/my-business/valuations',
        icon: Calculator,
        description: 'Get your business valued',
      },
    ],
  },
  {
    title: 'Documents & Compliance',
    items: [
      {
        label: 'Document Vault',
        href: '/my-business/documents',
        icon: FileText,
        description: 'Secure document storage',
        comingSoon: true,
      },
    ],
  },
];

// normalizeUserRole is now imported from role-utils
