// 🔧 Authentication Utilities
import { UserRole } from '@shared/types/user.types';

/**
 * Get current user role from storage
 * Used for routing decisions before full auth context loads
 */
export const getUserRole = (): UserRole => {
  if (typeof window === 'undefined') return 'buyer'; // SSR fallback

  try {
    const role = localStorage.getItem('userRole') as UserRole;
    return role || 'buyer';
  } catch {
    return 'buyer'; // Fallback if localStorage fails
  }
};

/**
 * Check if user has specific role
 */
export const hasRole = (role: UserRole): boolean => {
  const userRole = getUserRole();
  return userRole === role || userRole === 'both';
};

/**
 * Check if user is a seller (can access business features)
 */
export const isSeller = (): boolean => {
  return hasRole('seller') || hasRole('both');
};

/**
 * Check if user is a buyer
 */
export const isBuyer = (): boolean => {
  return hasRole('buyer') || hasRole('both');
};

/**
 * Get default dashboard path for user role
 */
export const getDefaultDashboard = (role?: UserRole): string => {
  const userRole = role || getUserRole();

  switch (userRole) {
    case 'seller':
    case 'both':
      return '/my-business';
    case 'buyer':
      return '/marketplace';
    case 'admin':
      return '/admin';
    default:
      return '/marketplace';
  }
};
