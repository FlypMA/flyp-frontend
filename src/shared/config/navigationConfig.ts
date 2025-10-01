/**
 * 🧭 Navigation Configuration
 * Type-safe, centralized navigation config for all navigation components
 *
 * Benefits:
 * - Single source of truth for all navigation items
 * - Type safety (TypeScript catches errors)
 * - Easy to update routes/labels
 * - Reusable across desktop/mobile
 */

import {
  CircleHelp,
  Euro,
  FileCheck,
  FileText,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Settings,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export type UserRole = 'buyer' | 'seller' | 'both' | 'admin';

export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  roles?: UserRole[]; // If specified, only show for these roles
  showWhenLoggedIn?: boolean;
  showWhenLoggedOut?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// ========================================
// PUBLIC NAVIGATION (Logged Out)
// ========================================

export const publicNavConfig: NavSection[] = [
  {
    title: 'For Business Owners',
    items: [
      {
        key: 'valuation',
        label: 'Get Free Valuation',
        href: '/valuation',
        icon: TrendingUp,
        description: 'Know your business worth',
      },
      {
        key: 'sell',
        label: 'Sell My Business',
        href: '/for-sellers',
        icon: FileText,
        description: 'List your business for sale',
      },
    ],
  },
  {
    title: 'For Buyers',
    items: [
      {
        key: 'browse',
        label: 'Browse Businesses',
        href: '/search',
        icon: Search,
        description: 'Find businesses for sale',
      },
    ],
  },
  {
    title: 'Information',
    items: [
      {
        key: 'how-it-works',
        label: 'How It Works',
        href: '/how-it-works',
        icon: FileText,
      },
      {
        key: 'pricing',
        label: 'Pricing',
        href: '/pricing',
        icon: Euro,
      },
      {
        key: 'faq',
        label: 'FAQ',
        href: '/faq',
        icon: HelpCircle,
      },
    ],
  },
];

// ========================================
// BUYER NAVIGATION (Logged In as Buyer)
// ========================================

export const buyerNavConfig: NavSection[] = [
  {
    title: 'Browse & Search',
    items: [
      {
        key: 'browse',
        label: 'Browse Businesses',
        href: '/search',
        icon: Search,
        description: 'Find your next business',
      },
      {
        key: 'saved',
        label: 'Saved Businesses',
        href: '/saved',
        icon: Heart,
        description: 'Your saved listings',
      },
    ],
  },
  {
    title: 'Activity',
    items: [
      {
        key: 'messages',
        label: 'Messages',
        href: '/messages',
        icon: MessageSquare,
      },
      {
        key: 'offers',
        label: 'My Offers',
        href: '/offers',
        icon: FileCheck,
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        key: 'profile',
        label: 'Profile',
        href: '/profile',
        icon: Settings,
      },
    ],
  },
];

// ========================================
// SELLER NAVIGATION (Logged In as Seller)
// ========================================

export const sellerNavConfig: NavSection[] = [
  {
    title: 'Business Management',
    items: [
      {
        key: 'my-business',
        label: 'My Business',
        href: '/my-business',
        icon: LayoutDashboard,
        description: 'Dashboard overview',
      },
      {
        key: 'valuations',
        label: 'Valuation',
        href: '/my-business/valuations',
        icon: TrendingUp,
        description: 'Business valuation',
      },
      {
        key: 'listings',
        label: 'Listings',
        href: '/my-business/listings',
        icon: FileText,
        description: 'Manage listings',
      },
      {
        key: 'messages',
        label: 'Messages',
        href: '/messages',
        icon: MessageSquare,
      },
      {
        key: 'documents',
        label: 'Documents',
        href: '/my-business/documents',
        icon: FileCheck,
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        key: 'profile',
        label: 'Profile',
        href: '/profile',
        icon: Settings,
      },
    ],
  },
];

// ========================================
// USER AVATAR DROPDOWN MENU
// ========================================

export const userAvatarMenuConfig: NavItem[] = [
  {
    key: 'dashboard',
    label: 'My Business',
    href: '/my-business',
    icon: LayoutDashboard,
    roles: ['seller', 'both', 'admin'],
  },
  {
    key: 'saved',
    label: 'Saved Businesses',
    href: '/saved',
    icon: Heart,
    roles: ['buyer', 'both'],
  },
  {
    key: 'settings',
    label: 'Account Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    key: 'help',
    label: 'Get Help',
    href: '/help',
    icon: CircleHelp,
  },
  {
    key: 'create-listing',
    label: 'Create a New Listing',
    href: '/my-business/listings/new',
    icon: Plus,
    roles: ['seller', 'both', 'admin'],
  },
  {
    key: 'logout',
    label: 'Log Out',
    href: '/logout',
    icon: LogOut,
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get navigation config based on user role
 */
export const getNavConfigForRole = (role?: UserRole): NavSection[] => {
  if (!role) return publicNavConfig;

  switch (role) {
    case 'buyer':
      return buyerNavConfig;
    case 'seller':
    case 'both':
    case 'admin':
      return sellerNavConfig;
    default:
      return publicNavConfig;
  }
};

/**
 * Get combined navigation config (public + role-specific)
 * Used when logged in users need access to both public pages and their dashboard
 */
export const getCombinedNavConfig = (role?: UserRole): NavSection[] => {
  if (!role) return publicNavConfig;

  // Get role-specific navigation
  const roleNav = getNavConfigForRole(role);

  // Combine public navigation with role-specific navigation
  // Public pages first, then role-specific dashboard pages
  return [...publicNavConfig, ...roleNav];
};

/**
 * Filter menu items based on user role
 */
export const filterMenuItemsByRole = (items: NavItem[], role?: UserRole): NavItem[] => {
  return items.filter(item => {
    // If no roles specified, show to everyone
    if (!item.roles) return true;

    // If no user role, hide items that require roles
    if (!role) return false;

    // Show if user role matches item roles
    return item.roles.includes(role);
  });
};
