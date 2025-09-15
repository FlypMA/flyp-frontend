// 👤 Role Utilities - MVP Version
// Location: src/shared/components/navigation/utils/role-utils.ts
// Purpose: Role-based utilities for navigation components

import { User } from '../../../../types';

/**
 * Role normalization - Exact copy from legacy
 */
export const normalizeUserRole = (user: User | string): 'buyer' | 'seller' => {
  const role = typeof user === 'string' ? user : user?.role;
  
  if (role === 'seller' || role === 'both' || role === 'admin') {
    return 'seller';
  }
  return 'buyer';
};

/**
 * Check if user is a seller - Exact copy from legacy
 */
export const isSellerUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'seller' || user.role === 'both' || user.role === 'admin';
};

/**
 * Check if user is a buyer - Exact copy from legacy
 */
export const isBuyerUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'buyer' || user.role === 'both';
};

/**
 * Get user display role
 */
export const getUserDisplayRole = (user: User): string => {
  switch (user.role) {
    case 'both':
      return 'Buyer & Seller';
    case 'admin':
      return 'Admin';
    case 'seller':
      return 'Seller';
    case 'buyer':
    default:
      return 'Buyer';
  }
};

/**
 * Get user initials for avatar
 */
export const getUserInitials = (user: User): string => {
  if (user.name) {
    return user.name.charAt(0).toUpperCase();
  }
  if (user.email) {
    return user.email.charAt(0).toUpperCase();
  }
  return 'U';
};

/**
 * Determine which dropdown component to use based on user role
 */
export const getDropdownComponent = (user: User): 'buyer' | 'seller' => {
  return normalizeUserRole(user);
};
