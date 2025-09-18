// 🔐 Login Service - MVP Version
// Location: src/shared/services/auth/login.ts
// Purpose: Dedicated service for handling user login operations with Supabase Auth
//
// Features:
// - Email/password authentication with Supabase
// - Session management with cookies and localStorage
// - Comprehensive error handling with retry logic
// - Development bypass for testing
// - User data integration from public.users table
// - Legacy-compatible API for easy migration

import { supabase } from '../../../config';
import { convertSupabaseUserToUser, User } from '../../types';
import { AuthErrorHandler } from './utils/error-handler';
import { RetryHandler } from './utils/retry-handler';
import { SessionManager } from './utils/session-manager';
import { UserDataManager } from './utils/user-data-manager';

// =============================================================================
// LOGIN TYPES
// =============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  code?: string;
}

// =============================================================================
// LOGIN SERVICE
// =============================================================================

export class LoginService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔐 Logging in user:', { email: credentials.email });

      const result = await RetryHandler.executeWithRetryAndTimeout(
        async () => {
          // Authenticate with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            throw error;
          }

          if (!data.user || !data.session) {
            throw new Error('No user or session data returned from Supabase');
          }

          // Get additional user data from public.users table
          const publicUserData = await UserDataManager.getPublicUserData(data.user.id);

          // Convert Supabase user to our User interface
          const user = convertSupabaseUserToUser(data.user, publicUserData || undefined);

          // Store session
          SessionManager.storeSession({
            isAuthenticated: true,
            user,
            token: data.session.access_token,
          });

          console.log('✅ Login successful:', user.id);

          return {
            success: true,
            user,
            token: data.session.access_token,
          };
        },
        'User login',
        30000 // 30 second timeout
      );

      return result;
    } catch (error) {
      console.error('❌ Login failed:', error);

      const authError = AuthErrorHandler.handleSupabaseError(error);
      AuthErrorHandler.logError(authError, 'login');

      return AuthErrorHandler.createErrorResponse(authError);
    }
  }

  /**
   * Login with development bypass
   */
  static async loginWithDevBypass(email: string): Promise<LoginResponse> {
    try {
      console.log('🚨 DEV MODE: Bypassing authentication for development');

      // Import the dev bypass utilities
      const { createMockUser } = await import('../../utils/dev/devBypass');

      // Create mock user with role determined from email
      const mockUser = createMockUser(email);

      // Store session
      SessionManager.storeSession({
        isAuthenticated: true,
        user: mockUser,
        token: 'dev-mock-token',
      });

      console.log('✅ Dev login successful:', mockUser.id, 'Role:', mockUser.role);

      return {
        success: true,
        user: mockUser,
        token: 'dev-mock-token',
      };
    } catch (error) {
      console.error('❌ Dev login failed:', error);
      return {
        success: false,
        error: 'Development login failed',
      };
    }
  }

  /**
   * Check if user is already logged in
   */
  static isLoggedIn(): boolean {
    return SessionManager.hasSession();
  }

  /**
   * Get current logged in user
   */
  static getCurrentUser(): User | null {
    return SessionManager.getUser();
  }

  /**
   * Get current session token
   */
  static getCurrentToken(): string | null {
    return SessionManager.getToken();
  }
}

// Export convenience function for direct usage
export const login = LoginService.login;
