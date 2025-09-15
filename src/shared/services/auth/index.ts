// 🔐 Authentication Service Orchestrator - MVP Version (Modular)
// Location: src/shared/services/auth/index.ts
// Purpose: Alternative modular orchestrator service that coordinates all authentication operations
//
// Features:
// - Orchestrates individual service modules (login, logout, signup, checkAuth)
// - Unified API for all authentication operations
// - Development bypass support
// - Comprehensive error handling
// - Session management integration
// - Legacy-compatible API for easy migration
//
// Note: This is an alternative to Auth.ts - choose one approach for your application

import { User, UserRole, AuthResult, UpdateProfileRequest } from '../../types';
import { LoginService, LoginRequest, LoginResponse } from './login';
import { LogoutService, LogoutResponse } from './logout';
import { CheckAuthService } from './checkAuth';
import { SignupService, SignupRequest, SignupResponse } from './signup';
import { SessionManager } from './utils/session-manager';
import { getApiConfig, isDevelopment } from '../../../config';

// =============================================================================
// MAIN AUTHENTICATION SERVICE
// =============================================================================

/**
 * Main Authentication Service - Modular Architecture
 * Orchestrates all authentication operations with proper error handling,
 * session management, and retry logic.
 */
class AuthenticationService {
  /**
   * Create a new user account
   */
  async createAccount(
    email: string,
    password: string,
    name: string,
    role: UserRole = 'buyer',
    additionalData?: Partial<User>
  ): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    const request: SignupRequest = {
      email,
      password,
      name,
      role,
      additionalData,
    };

    // Check for development bypass
    const apiConfig = getApiConfig();
    if (apiConfig.DEV.bypassAuth && isDevelopment) {
      const result = await SignupService.signupWithDevBypass(request);
      return {
        success: result.success,
        user: result.user,
        token: result.token,
        error: result.error,
      };
    }

    const result = await SignupService.signup(request);
    return {
      success: result.success,
      user: result.user,
      token: result.token,
      error: result.error,
    };
  }

  /**
   * Login user with email and password
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    const credentials: LoginRequest = { email, password };

    // Check for development bypass
    const apiConfig = getApiConfig();
    if (apiConfig.DEV.bypassAuth && isDevelopment) {
      const result = await LoginService.loginWithDevBypass(email);
      return {
        success: result.success,
        user: result.user,
        token: result.token,
        error: result.error,
      };
    }

    const result = await LoginService.login(credentials);
    return {
      success: result.success,
      user: result.user,
      token: result.token,
      error: result.error,
    };
  }

  /**
   * Logout user and clear session
   */
  async logout(): Promise<void> {
    const result = await LogoutService.logout();
    if (!result.success) {
      throw new Error(result.error || 'Logout failed');
    }
  }

  /**
   * Check authentication status
   */
  async checkAuthentication(): Promise<AuthResult> {
    return await CheckAuthService.checkAuthentication();
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: UpdateProfileRequest): Promise<User> {
    const { UserDataManager } = await import('./utils/user-data-manager');
    return await UserDataManager.updateUserInBothTables(userId, updates);
  }

  /**
   * Update business information
   */
  async updateBusinessInfo(userId: string, businessData: Partial<User>): Promise<User> {
    const { UserDataManager } = await import('./utils/user-data-manager');
    return await UserDataManager.updateBusinessInfo(userId, businessData);
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    return CheckAuthService.getCurrentUser();
  }

  /**
   * Listen to authentication state changes
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    const { supabase } = require('../supabaseClient');
    return supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log('🔄 Auth state changed:', event, session?.user?.id);
      
      // Update local session when auth state changes
      if (event === 'SIGNED_IN' && session?.user) {
        const { convertSupabaseUserToUser } = require('../../types');
        const { UserDataManager } = require('./utils/user-data-manager');
        
        UserDataManager.getPublicUserData(session.user.id).then((publicUserData) => {
          const user = convertSupabaseUserToUser(session.user, publicUserData || undefined);
          SessionManager.storeSession({
            isAuthenticated: true,
            user,
            token: session.access_token,
          });
        });
      } else if (event === 'SIGNED_OUT') {
        SessionManager.clearSession();
      }
      
      callback(event, session);
    });
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { supabase } = require('../../../config');
      const { RetryHandler } = require('./utils/retry-handler');
      
      const result = await RetryHandler.executeWithRetry(
        async () => {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });

          if (error) {
            throw error;
          }
        },
        'Reset password'
      );

      return { success: true };
    } catch (error) {
      const { AuthErrorHandler } = require('./utils/error-handler');
      const authError = AuthErrorHandler.handleSupabaseError(error);
      return {
        success: false,
        error: authError.message,
      };
    }
  }

  /**
   * Update password
   */
  async updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { supabase } = require('../../../config');
      const { RetryHandler } = require('./utils/retry-handler');
      
      const result = await RetryHandler.executeWithRetry(
        async () => {
          const { error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (error) {
            throw error;
          }
        },
        'Update password'
      );

      return { success: true };
    } catch (error) {
      const { AuthErrorHandler } = require('./utils/error-handler');
      const authError = AuthErrorHandler.handleSupabaseError(error);
      return {
        success: false,
        error: authError.message,
      };
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    const result = await SignupService.verifyEmail(token);
    return {
      success: result.success,
      user: result.user,
      token: result.token,
      error: result.error,
    };
  }

  /**
   * Resend email verification
   */
  async resendVerification(email: string): Promise<{ success: boolean; error?: string }> {
    return await SignupService.resendVerification(email);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return LoginService.isLoggedIn();
  }

  /**
   * Get current session token
   */
  getCurrentToken(): string | null {
    return CheckAuthService.getCurrentToken();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return CheckAuthService.isAuthenticated();
  }

  /**
   * Validate current session
   */
  async validateSession(): Promise<boolean> {
    return await CheckAuthService.validateSession();
  }

  /**
   * Refresh session
   */
  async refreshSession(): Promise<AuthResult> {
    return await CheckAuthService.refreshSession();
  }

  /**
   * Force logout (clear session without Supabase call)
   */
  forceLogout(): LogoutResponse {
    return LogoutService.forceLogout();
  }

  /**
   * Logout from all devices
   */
  async logoutFromAllDevices(): Promise<LogoutResponse> {
    return await LogoutService.logoutFromAllDevices();
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

// Create and export singleton instance
export const authService = new AuthenticationService();
export default authService;

// Also export the main Auth service for backward compatibility
export { authService as AuthService } from './Auth';

// Export individual services for direct access if needed
export { LoginService } from './login';
export { LogoutService } from './logout';
export { CheckAuthService } from './checkAuth';
export { SignupService } from './signup';
export { SessionManager } from './utils/session-manager';
export { AuthErrorHandler } from './utils/error-handler';
export { RetryHandler } from './utils/retry-handler';
export { UserDataManager } from './utils/user-data-manager';
