// 🔍 Check Authentication Service - MVP Version
// Location: src/shared/services/auth/checkAuth.ts
// Purpose: Dedicated service for checking authentication status and session validation
//
// Features:
// - Authentication status checking with Supabase
// - Session validation and refresh
// - User data retrieval from public.users table
// - Development bypass for testing
// - Token validation and management
// - Comprehensive error handling with retry logic
// - Session state management

import { getApiConfig, isDevelopment, supabase } from '../../../config';
import { AuthResult, convertSupabaseUserToUser, User } from '../../types';
import { AuthErrorHandler } from './utils/error-handler';
import { RetryHandler } from './utils/retry-handler';
import { SessionManager } from './utils/session-manager';
import { UserDataManager } from './utils/user-data-manager';

// =============================================================================
// CHECK AUTH SERVICE
// =============================================================================

export class CheckAuthService {
  /**
   * Check authentication status
   */
  static async checkAuthentication(): Promise<AuthResult> {
    try {
      console.log('🔍 Checking authentication status');

      // Check if we have a stored session
      const storedSession = SessionManager.getSession();
      if (!storedSession) {
        console.log('👤 No stored session found');
        return { isAuthenticated: false };
      }

      // 🚨 DEVELOPMENT BYPASS: Check if dev bypass is enabled
      const apiConfig = getApiConfig();
      const DEV_BYPASS_AUTH = apiConfig.DEV.bypassAuth;

      if (DEV_BYPASS_AUTH && isDevelopment) {
        console.log('🚨 DEV MODE: Using stored session for development');
        return storedSession;
      }

      // Validate session with Supabase
      const result = await RetryHandler.executeWithRetry(
        async () => {
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            throw error;
          }

          if (!session?.user) {
            // Session is invalid, clear stored session
            SessionManager.clearSession();
            return { isAuthenticated: false };
          }

          // Get fresh user data from public.users table
          const publicUserData = await UserDataManager.getPublicUserData(session.user.id);

          // Convert Supabase user to our User interface
          const user = convertSupabaseUserToUser(session.user, publicUserData || undefined);

          // Update stored session with fresh data
          const updatedSession: AuthResult = {
            isAuthenticated: true,
            user,
            token: session.access_token,
          };

          SessionManager.storeSession(updatedSession);

          return updatedSession;
        },
        'Check authentication',
        10000 // 10 second timeout
      );

      console.log('✅ Authentication check successful');
      return result;
    } catch (error) {
      console.error('❌ Authentication check failed:', error);

      // Clear invalid session
      SessionManager.clearSession();

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'checkAuthentication');

      return { isAuthenticated: false };
    }
  }

  /**
   * Get current user from stored session
   */
  static getCurrentUser(): User | null {
    try {
      const session = SessionManager.getSession();
      return session?.user || null;
    } catch (error) {
      console.error('❌ Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get current session token
   */
  static getCurrentToken(): string | null {
    try {
      const session = SessionManager.getSession();
      return session?.token || null;
    } catch (error) {
      console.error('❌ Error getting current token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    try {
      const session = SessionManager.getSession();
      return session?.isAuthenticated || false;
    } catch (error) {
      console.error('❌ Error checking authentication status:', error);
      return false;
    }
  }

  /**
   * Validate session with Supabase
   */
  static async validateSession(): Promise<boolean> {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        SessionManager.clearSession();
        return false;
      }

      return true;
    } catch (error) {
      console.error('❌ Session validation failed:', error);
      SessionManager.clearSession();
      return false;
    }
  }

  /**
   * Refresh session if needed
   */
  static async refreshSession(): Promise<AuthResult> {
    try {
      console.log('🔄 Refreshing session');

      const result = await RetryHandler.executeWithRetry(
        async () => {
          const {
            data: { session },
            error,
          } = await supabase.auth.refreshSession();

          if (error) {
            throw error;
          }

          if (!session?.user) {
            throw new Error('No session data returned from refresh');
          }

          // Get fresh user data
          const publicUserData = await UserDataManager.getPublicUserData(session.user.id);
          const user = convertSupabaseUserToUser(session.user, publicUserData || undefined);

          const refreshedSession: AuthResult = {
            isAuthenticated: true,
            user,
            token: session.access_token,
          };

          SessionManager.storeSession(refreshedSession);

          return refreshedSession;
        },
        'Refresh session',
        10000
      );

      console.log('✅ Session refreshed successfully');
      return result;
    } catch (error) {
      console.error('❌ Session refresh failed:', error);

      SessionManager.clearSession();

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'refreshSession');

      return { isAuthenticated: false };
    }
  }

  /**
   * Check if session is expired
   */
  static isSessionExpired(): boolean {
    try {
      const token = SessionManager.getToken();
      if (!token) {
        return true;
      }

      // Decode JWT token to check expiration
      try {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
      } catch (error) {
        console.warn('⚠️ Could not decode token:', error);
        return true;
      }
    } catch (error) {
      console.error('❌ Error checking session expiration:', error);
      return true;
    }
  }
}

// Export convenience function for direct usage
export const checkAuth = CheckAuthService.checkAuthentication;
