// 🔐 Authentication Service - MVP Version with Supabase
// Location: src/shared/services/Auth.ts
// Purpose: Supabase-based authentication service for MVP

import { getApiConfig, isDevelopment, supabase } from '../../../config';
import {
  AuthResult,
  SupabaseSession,
  SupabaseUserMetadata,
  UpdateProfileRequest,
  User,
  UserRole,
  convertSupabaseUserToUser,
  convertUserToSupabaseMetadata,
} from '../../types';
import { AuthErrorHandler } from './utils/error-handler';
import { RetryHandler } from './utils/retry-handler';
import { SessionManager } from './utils/session-manager';
import { UserDataManager } from './utils/user-data-manager';

/**
 * Authentication Service - Supabase Integration
 * Handles authentication through Supabase Auth and user data through public.users table
 */
export class AuthenticationService {
  constructor() {
    // Initialize any additional services if needed
  }

  /**
   * Create a new user account with Supabase Auth
   */
  async createAccount(
    email: string,
    password: string,
    name: string,
    role: UserRole = 'buyer',
    additionalData?: Partial<User>
  ): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      console.log('🔧 Creating account with Supabase:', { email, name, role });

      const result = await RetryHandler.executeWithRetryAndTimeout(
        async () => {
          // Prepare user metadata for Supabase
          const userMetadata: SupabaseUserMetadata = {
            name,
            role,
            ...convertUserToSupabaseMetadata(additionalData || {}),
          };

          // Create user with Supabase Auth
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: userMetadata,
            },
          });

          if (error) {
            throw error;
          }

          if (!data.user) {
            throw new Error('No user data returned from Supabase');
          }

          // Convert Supabase user to our User interface
          const user = convertSupabaseUserToUser(data.user, additionalData);

          // Create user record in public.users table
          await UserDataManager.createPublicUserRecord(user);

          console.log('✅ Account created successfully:', user.id);

          // If we have a session (email confirmation not required), automatically log in
          if (data.session?.access_token) {
            console.log('🔧 Account created with session, storing token for immediate login');
            SessionManager.storeSession({
              isAuthenticated: true,
              user,
              token: data.session.access_token,
            });

            return {
              success: true,
              user,
              token: data.session.access_token,
            };
          } else {
            // Email confirmation required
            console.log('📧 Account created, email confirmation required');
            return {
              success: true,
              user,
            };
          }
        },
        'Account creation',
        30000 // 30 second timeout
      );

      return result;
    } catch (error) {
      console.error('❌ Account creation failed:', error);

      const authError = AuthErrorHandler.handleSupabaseError(error);
      AuthErrorHandler.logError(authError, 'createAccount');

      return AuthErrorHandler.createErrorResponse(authError);
    }
  }

  /**
   * Login user with Supabase Auth
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      console.log('🔐 Logging in with Supabase:', { email });

      const result = await RetryHandler.executeWithRetryAndTimeout(
        async () => {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            throw error;
          }

          if (!data.user || !data.session) {
            throw new Error('No user or session data returned');
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
   * Logout user from Supabase Auth
   */
  async logout(): Promise<void> {
    try {
      console.log('🔓 Logging out from Supabase');

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

      // Clear session
      SessionManager.clearSession();

      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);

      // Clear session even if logout fails
      SessionManager.clearSession();

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'logout');

      throw error;
    }
  }

  /**
   * Check authentication status with Supabase
   */
  async checkAuthentication(): Promise<AuthResult> {
    try {
      console.log('🔍 Checking authentication with Supabase');

      // 🚨 DEVELOPMENT BYPASS: Check if dev bypass is enabled
      const apiConfig = getApiConfig();
      const DEV_BYPASS_AUTH = apiConfig.DEV.bypassAuth;

      if (DEV_BYPASS_AUTH && isDevelopment) {
        console.log('🚨 DEV MODE: Bypassing authentication check for development');
        const mockUser: User = {
          id: 'dev-user-123',
          email: 'dev@flyp.com',
          name: 'Development User',
          role: 'seller',
          email_verified: true,
          country: 'BE',
          auth_provider: 'email',
          language_preference: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        return {
          isAuthenticated: true,
          user: mockUser,
          token: 'dev-mock-token',
        };
      }

      // Check for stored session first
      const storedSession = SessionManager.getSession();
      if (storedSession) {
        console.log('🎫 Found stored session, validating with Supabase');

        // Validate session with Supabase
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('❌ Supabase session check error:', error);
          SessionManager.clearSession(); // Clear invalid session
          return { isAuthenticated: false };
        }

        if (!session?.user) {
          console.log('👤 No active session found, clearing stored session');
          SessionManager.clearSession();
          return { isAuthenticated: false };
        }

        // Get additional user data from public.users table
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

        console.log('✅ Authentication check successful with stored session:', user.id);

        return updatedSession;
      }

      // No stored session, check Supabase session directly
      console.log('🔍 No stored session, checking Supabase session directly');
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('❌ Supabase session check error:', error);
        return { isAuthenticated: false };
      }

      if (!session?.user) {
        console.log('👤 No active session found');
        return { isAuthenticated: false };
      }

      // Get additional user data from public.users table
      const publicUserData = await UserDataManager.getPublicUserData(session.user.id);

      // Convert Supabase user to our User interface
      const user = convertSupabaseUserToUser(session.user, publicUserData || undefined);

      // Store session for future requests
      const authResult: AuthResult = {
        isAuthenticated: true,
        user,
        token: session.access_token,
      };

      SessionManager.storeSession(authResult);

      console.log('✅ Authentication check successful:', user.id);

      return authResult;
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
   * Update user profile
   */
  async updateProfile(userId: string, updates: UpdateProfileRequest): Promise<User> {
    try {
      console.log('📝 Updating user profile:', { userId, updates });

      const result = await RetryHandler.executeWithRetry(async () => {
        return await UserDataManager.updateUserInBothTables(userId, updates);
      }, `Update user profile for ${userId}`);

      console.log('✅ Profile updated successfully');
      return result;
    } catch (error) {
      console.error('❌ Profile update failed:', error);

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'updateProfile');

      throw error;
    }
  }

  /**
   * Update business information
   */
  async updateBusinessInfo(userId: string, businessData: Partial<User>): Promise<User> {
    try {
      console.log('🏢 Updating business info:', { userId, businessData });

      const result = await RetryHandler.executeWithRetry(async () => {
        return await UserDataManager.updateBusinessInfo(userId, businessData);
      }, `Update business info for ${userId}`);

      console.log('✅ Business info updated successfully');
      return result;
    } catch (error) {
      console.error('❌ Business info update failed:', error);

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'updateBusinessInfo');

      throw error;
    }
  }

  /**
   * Listen to authentication state changes
   */
  onAuthStateChange(callback: (event: string, session: SupabaseSession | null) => void) {
    return supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log('🔄 Auth state changed:', event, session?.user?.id);
      callback(event, session);
    });
  }

  /**
   * Get current user from Supabase Auth
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const result = await RetryHandler.executeWithRetry(async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          return null;
        }

        // Get additional user data from public.users table
        const publicUserData = await UserDataManager.getPublicUserData(user.id);

        // Convert Supabase user to our User interface
        return convertSupabaseUserToUser(user, publicUserData || undefined);
      }, 'Get current user');

      return result;
    } catch (error) {
      console.error('❌ Error getting current user:', error);

      const authError = AuthErrorHandler.handleGenericError(error);
      AuthErrorHandler.logError(authError, 'getCurrentUser');

      return null;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await RetryHandler.executeWithRetry(async () => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          throw error;
        }

        return { success: true };
      }, 'Reset password');

      return result;
    } catch (error) {
      const authError = AuthErrorHandler.handleSupabaseError(error);
      AuthErrorHandler.logError(authError, 'resetPassword');

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
      const result = await RetryHandler.executeWithRetry(async () => {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          throw error;
        }

        return { success: true };
      }, 'Update password');

      return result;
    } catch (error) {
      const authError = AuthErrorHandler.handleSupabaseError(error);
      AuthErrorHandler.logError(authError, 'updatePassword');

      return {
        success: false,
        error: authError.message,
      };
    }
  }

  /**
   * Get authenticated user token (like legacy app)
   */
  getAuthenticatedUser(): string | null {
    // 🚨 DEMO MODE: Enable demo authentication for production showcase
    const DEMO_MODE = (import.meta as any).env?.VITE_DEMO_MODE === 'true';
    const apiConfig = getApiConfig();
    const DEV_BYPASS_AUTH = apiConfig.DEV.bypassAuth;

    if (DEMO_MODE || (DEV_BYPASS_AUTH && isDevelopment)) {
      console.log('🎭 DEMO MODE: Authentication bypassed for demonstration');
      return 'demo-user-token-2024';
    }

    return SessionManager.getToken();
  }

  /**
   * Check authentication status (alias for checkAuthentication)
   */
  async checkAuth(): Promise<AuthResult> {
    return await this.checkAuthentication();
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { supabase } = require('../../../config');
      const { RetryHandler } = require('./utils/retry-handler');

      const result = await RetryHandler.executeWithRetry(async () => {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email,
        });

        if (error) {
          throw error;
        }
      }, 'Resend verification email');

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
   * Resend verification email (alias for backward compatibility)
   */
  async resendVerification(email: string): Promise<{ success: boolean; error?: string }> {
    return await this.resendVerificationEmail(email);
  }
}

// Create and export singleton instance
export const authService = new AuthenticationService();
export default authService;
