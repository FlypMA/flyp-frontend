// 🔓 Logout Service - MVP Version
// Location: src/shared/services/auth/logout.ts
// Purpose: Dedicated service for handling user logout operations and session cleanup
//
// Features:
// - Supabase Auth signout with proper error handling
// - Complete session cleanup (cookies, localStorage, memory)
// - Retry logic for network resilience
// - Force logout option for emergency cleanup
// - Logout from all devices functionality
// - Development bypass support

import { supabase } from '../../../config';
import { AuthErrorHandler } from './utils/error-handler';
import { RetryHandler } from './utils/retry-handler';
import { SessionManager } from './utils/session-manager';

// =============================================================================
// LOGOUT TYPES
// =============================================================================

export interface LogoutResponse {
  success: boolean;
  error?: string;
}

// =============================================================================
// LOGOUT SERVICE
// =============================================================================

export class LogoutService {
  /**
   * Logout user and clear session
   */
  static async logout(): Promise<LogoutResponse> {
    try {
      console.log('🔓 Logging out user');

      // Clear local session first
      SessionManager.clearSession();

      // Sign out from Supabase
      await RetryHandler.executeWithRetry(
        async () => {
          const { error } = await supabase.auth.signOut();

          if (error) {
            throw error;
          }
        },
        'User logout',
        10000 // 10 second timeout
      );

      console.log('✅ Logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout failed:', error);

      // Even if Supabase logout fails, we should clear local session
      SessionManager.clearSession();

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'logout');

      return {
        success: false,
        error: authError.message,
      };
    }
  }

  /**
   * Force logout (clear session without Supabase call)
   */
  static forceLogout(): LogoutResponse {
    try {
      console.log('🔓 Force logging out user');

      SessionManager.clearSession();

      console.log('✅ Force logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Force logout failed:', error);
      return {
        success: false,
        error: 'Failed to clear session',
      };
    }
  }

  /**
   * Logout from all devices
   */
  static async logoutFromAllDevices(): Promise<LogoutResponse> {
    try {
      console.log('🔓 Logging out from all devices');

      // Clear local session
      SessionManager.clearSession();

      // Sign out from Supabase (this should invalidate all sessions)
      await RetryHandler.executeWithRetry(
        async () => {
          const { error } = await supabase.auth.signOut();

          if (error) {
            throw error;
          }
        },
        'Logout from all devices',
        10000
      );

      console.log('✅ Logout from all devices successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout from all devices failed:', error);

      // Clear local session even if Supabase call fails
      SessionManager.clearSession();

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'logoutFromAllDevices');

      return {
        success: false,
        error: authError.message,
      };
    }
  }

  /**
   * Check if user is logged out
   */
  static isLoggedOut(): boolean {
    return !SessionManager.hasSession();
  }
}

// Export convenience function for direct usage
export const logout = LogoutService.logout;
