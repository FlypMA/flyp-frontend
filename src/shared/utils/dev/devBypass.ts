/* eslint-disable @typescript-eslint/no-unused-vars */
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
 * Get dev bypass role from localStorage (for easy testing)
 */
export const getDevBypassRole = (): UserRole | null => {
  if (!isDevBypassEnabled()) return null;
  
  const storedRole = localStorage.getItem('UpSwitch_dev_role');
  if (storedRole && ['buyer', 'seller', 'both', 'admin'].includes(storedRole)) {
    return storedRole as UserRole;
  }
  return null;
};

/**
 * Set dev bypass role in localStorage (for easy testing)
 */
export const setDevBypassRole = (role: UserRole): void => {
  if (!isDevBypassEnabled()) return;
  
  localStorage.setItem('UpSwitch_dev_role', role);
  // eslint-disable-next-line no-console
  console.log(`🔧 Dev Bypass: Role set to "${role}"`);
  // eslint-disable-next-line no-console
  console.log('🔄 Reload the page to see the new role in action');
};

/**
 * Determine user role based on email address for development
 */
export const determineUserRoleFromEmail = (email: string): UserRole => {
  if (email.includes('buyer@')) {
    return 'buyer';
  } else if (email.includes('seller@')) {
    return 'seller';
  } else if (email.includes('both@')) {
    return 'both';
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
  // Priority: explicit role > localStorage role > email-based role > default
  const storedRole = getDevBypassRole();
  const userRole = role || storedRole || (email ? determineUserRoleFromEmail(email) : 'seller');

  // Generate appropriate user data based on role
  const getRoleSpecificData = (role: UserRole) => {
    switch (role) {
      case 'buyer':
        return {
          name: 'John Doe (Buyer)',
          email: email || 'buyer@test.com',
        };
      case 'seller':
        return {
          name: 'Jane Smith (Seller)',
          email: email || 'seller@test.com',
        };
      case 'both':
        return {
          name: 'Alex Johnson (Buyer & Seller)',
          email: email || 'both@test.com',
        };
      case 'admin':
        return {
          name: 'Admin User',
          email: email || 'admin@test.com',
        };
      default:
        return {
          name: 'John Doe',
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
// DEV CONSOLE HELPERS
// =============================================================================

/**
 * Dev console helpers for easy role switching
 * Usage in browser console:
 *   window.devSetRole('buyer')
 *   window.devSetRole('seller')
 *   window.devSetRole('both')
 */
/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
if (typeof window !== 'undefined' && isDevBypassEnabled()) {
  (window as any).devSetRole = (role: UserRole) => {
    setDevBypassRole(role);
  };
  
  (window as any).devGetRole = () => {
    const role = getDevBypassRole();
    console.log(`🔧 Current dev role: ${role || 'default (seller)'}`);
    return role;
  };
  
  (window as any).devShowRoleHelp = () => {
    console.log(`
🔧 Dev Bypass Role Switching
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available roles:
  • buyer  - Buyer menu with Browse & Saved Items
  • seller - Seller menu with My Business & Create Listing
  • both   - Combined menu with both buyer & seller options
  • admin  - Admin menu (if implemented)

Commands:
  window.devSetRole('buyer')   - Switch to buyer role
  window.devSetRole('seller')  - Switch to seller role  
  window.devSetRole('both')    - Switch to both roles
  window.devGetRole()          - Show current role
  window.devShowRoleHelp()     - Show this help

After switching roles, reload the page to see changes.
    `);
  };
  
  // Auto-show help on first load
  if (!localStorage.getItem('UpSwitch_dev_help_shown')) {
    console.log('🔧 Dev Bypass is enabled! Type window.devShowRoleHelp() for role switching commands');
    localStorage.setItem('UpSwitch_dev_help_shown', 'true');
  }
}
/* eslint-enable no-console, @typescript-eslint/no-explicit-any */

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
export const devLog = (_message: string, _data?: any): void => {
  if (isDevelopmentMode() && isDebugModeEnabled()) {
    // TODO: Add proper logging
  }
};

/**
 * Development warning logger
 */
export const devWarn = (_message: string, _data?: any): void => {
  if (isDevelopmentMode()) {
    // TODO: Add proper warning handling
  }
};

/**
 * Development error logger
 */
export const devError = (_message: string, _error?: any): void => {
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
