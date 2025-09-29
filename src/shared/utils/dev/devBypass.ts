// 🚨 Development Bypass Utilities
// Location: src/shared/utils/devBypass.ts
// Purpose: Development environment bypass for authentication and testing

import type { User, UserRole } from '@/shared/types';

// =============================================================================
// DEVELOPMENT BYPASS CONFIGURATION
// =============================================================================

/**
 * Check if development bypass is enabled
 */
export const isDevBypassEnabled = (): boolean => {
  const DEV_BYPASS_AUTH = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true';
  const isDevelopment = import.meta.env.DEV === true;

  return DEV_BYPASS_AUTH && isDevelopment;
};

/**
 * Check if we're in development mode
 */
export const isDevelopmentMode = (): boolean => {
  return import.meta.env.DEV === true;
};

/**
 * Check if debug mode is enabled
 */
export const isDebugModeEnabled = (): boolean => {
  return import.meta.env.VITE_DEV_ENABLE_DEBUG_MODE === 'true';
};

// =============================================================================
// MOCK USER DATA FOR DEVELOPMENT
// =============================================================================

/**
 * Determine user role based on email address for development
 */
export const determineUserRoleFromEmail = (email: string): UserRole => {
  if (email.includes('buyer@')) {
    return 'buyer';
  } else if (email.includes('seller@')) {
    return 'seller';
  } else if (email.includes('admin@')) {
    return 'admin';
  }
  // Default to seller for backward compatibility
  return 'seller';
};

/**
 * Create a mock user for development bypass
 */
export const createMockUser = (email?: string, role?: UserRole): User => {
  // Determine role from email if not provided
  const userRole = role || (email ? determineUserRoleFromEmail(email) : 'seller');

  // Generate appropriate user data based on role
  const getRoleSpecificData = (role: UserRole) => {
    switch (role) {
      case 'buyer':
        return {
          name: 'Development Buyer',
          email: email || 'buyer@test.com',
        };
      case 'seller':
        return {
          name: 'Development Seller',
          email: email || 'seller@test.com',
        };
      case 'admin':
        return {
          name: 'Development Admin',
          email: email || 'admin@test.com',
        };
      default:
        return {
          name: 'Development User',
          email: email || 'dev@upswitch.com',
        };
    }
  };

  const roleData = getRoleSpecificData(userRole);

  const mockUser: User = {
    id: `dev-${userRole}-123`,
    email: roleData.email,
    name: roleData.name,
    role: userRole,
    email_verified: true,
    country: 'BE',
    auth_provider: 'email',
    language_preference: 'en',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    preferences: {
      language: 'en',
      timezone: 'UTC',
    },
  };

  return mockUser;
};

/**
 * Create mock authentication result for development
 */
export const createMockAuthResult = (email?: string, role?: UserRole) => {
  return {
    isAuthenticated: true,
    user: createMockUser(email, role),
    token: 'dev-mock-token',
  };
};

// =============================================================================
// DEVELOPMENT BYPASS FUNCTIONS
// =============================================================================

/**
 * Check authentication with development bypass
 */
export const checkAuthWithBypass = async (
  originalCheckAuth: () => Promise<any>,
  email?: string,
  defaultRole?: UserRole
): Promise<any> => {
  // 🚨 DEVELOPMENT BYPASS: Check if dev bypass is enabled
  if (isDevBypassEnabled()) {
    return createMockAuthResult(email, defaultRole);
  }

  // Normal authentication check
  return await originalCheckAuth();
};

/**
 * Get authenticated user with development bypass
 */
export const getAuthenticatedUserWithBypass = (
  originalGetUser: () => any,
  email?: string,
  defaultRole?: UserRole
): any => {
  // 🚨 DEVELOPMENT BYPASS: Check if dev bypass is enabled
  if (isDevBypassEnabled()) {
    return createMockUser(email, defaultRole);
  }

  // Normal user retrieval
  return originalGetUser();
};

/**
 * Protected route bypass for development
 */
export const shouldBypassProtectedRoute = (): boolean => {
  if (isDevBypassEnabled()) {
    return true;
  }

  return false;
};

// =============================================================================
// DEVELOPMENT LOGGING UTILITIES
// =============================================================================

/**
 * Development logger that only logs in dev mode
 */
export const devLog = (message: string, data?: any): void => {
  if (isDevelopmentMode() && isDebugModeEnabled()) {
    // TODO: Add proper logging
  }
};

/**
 * Development warning logger
 */
export const devWarn = (message: string, data?: any): void => {
  if (isDevelopmentMode()) {
    // TODO: Add proper warning handling
  }
};

/**
 * Development error logger
 */
export const devError = (message: string, error?: any): void => {
  if (isDevelopmentMode()) {
    // TODO: Add proper error handling
  }
};

// =============================================================================
// DEVELOPMENT ENVIRONMENT INFO
// =============================================================================

/**
 * Log development environment information
 */
export const logDevEnvironmentInfo = (): void => {
  if (isDevelopmentMode()) {
    if (isDevBypassEnabled()) {
      // TODO: Add proper logging
    }
  }
};

// =============================================================================
// DEVELOPMENT UTILITIES EXPORT
// =============================================================================

export const devUtils = {
  isDevBypassEnabled,
  isDevelopmentMode,
  isDebugModeEnabled,
  createMockUser,
  createMockAuthResult,
  checkAuthWithBypass,
  getAuthenticatedUserWithBypass,
  shouldBypassProtectedRoute,
  devLog,
  devWarn,
  devError,
  logDevEnvironmentInfo,
};

// Auto-log environment info on import in development
if (isDevelopmentMode()) {
  logDevEnvironmentInfo();
}
