// 📝 Signup Service - MVP Version
// Location: src/shared/services/auth/signup.ts
// Purpose: Dedicated service for handling user registration with Supabase Auth
//
// Features:
// - User registration with email/password
// - Automatic user record creation in public.users table
// - Email verification handling
// - Automatic login after successful signup (if no email confirmation required)
// - Comprehensive error handling with retry logic
// - Development bypass for testing
// - User metadata management with Supabase Auth

import { supabase } from '../../../config';
import {
  convertSupabaseUserToUser,
  convertUserToSupabaseMetadata,
  User,
  UserRole,
} from '../../types';
import { AuthErrorHandler } from './utils/error-handler';
import { RetryHandler } from './utils/retry-handler';
import { SessionManager } from './utils/session-manager';
import { UserDataManager } from './utils/user-data-manager';

// =============================================================================
// SIGNUP TYPES
// =============================================================================

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  additionalData?: Partial<User>;
}

export interface SignupResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  code?: string;
  requiresEmailVerification?: boolean;
}

// =============================================================================
// SIGNUP SERVICE
// =============================================================================

export class SignupService {
  /**
   * Create a new user account
   */
  static async signup(request: SignupRequest): Promise<SignupResponse> {
    try {
      console.log('📝 Creating new account:', {
        email: request.email,
        name: request.name,
        role: request.role,
      });

      const result = await RetryHandler.executeWithRetryAndTimeout(
        async () => {
          // Prepare user metadata for Supabase
          const userMetadata = {
            name: request.name,
            role: request.role || 'buyer',
            ...convertUserToSupabaseMetadata(request.additionalData || {}),
          };

          // Create user with Supabase Auth
          const { data, error } = await supabase.auth.signUp({
            email: request.email,
            password: request.password,
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
          const user = convertSupabaseUserToUser(data.user, request.additionalData);

          // Create user record in public.users table
          await UserDataManager.createPublicUserRecord(user);

          // If we have a session (email confirmation not required), store it
          if (data.session) {
            SessionManager.storeSession({
              isAuthenticated: true,
              user,
              token: data.session.access_token,
            });
          }

          console.log('✅ Account created successfully:', user.id);

          return {
            success: true,
            user,
            token: data.session?.access_token,
            requiresEmailVerification: !data.session,
          };
        },
        'User signup',
        30000 // 30 second timeout
      );

      return result;
    } catch (error) {
      console.error('❌ Account creation failed:', error);

      const authError = AuthErrorHandler.handleSupabaseError(error);
      AuthErrorHandler.logError(authError, 'signup');

      return AuthErrorHandler.createErrorResponse(authError);
    }
  }

  /**
   * Signup with development bypass
   */
  static async signupWithDevBypass(request: SignupRequest): Promise<SignupResponse> {
    try {
      console.log('🚨 DEV MODE: Bypassing signup for development');

      const mockUser: User = {
        id: 'dev-user-' + Date.now(),
        email: request.email,
        name: request.name,
        role: request.role || 'buyer',
        email_verified: true,
        country: 'BE',
        auth_provider: 'email',
        language_preference: 'en',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...request.additionalData,
      };

      // Store session
      SessionManager.storeSession({
        isAuthenticated: true,
        user: mockUser,
        token: 'dev-mock-token',
      });

      console.log('✅ Dev signup successful:', mockUser.id);

      return {
        success: true,
        user: mockUser,
        token: 'dev-mock-token',
        requiresEmailVerification: false,
      };
    } catch (error) {
      console.error('❌ Dev signup failed:', error);
      return {
        success: false,
        error: 'Development signup failed',
      };
    }
  }

  /**
   * Verify email address
   */
  static async verifyEmail(token: string): Promise<SignupResponse> {
    try {
      console.log('📧 Verifying email with token');

      const result = await RetryHandler.executeWithRetry(async () => {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (error) {
          throw error;
        }

        if (!data.user || !data.session) {
          throw new Error('No user or session data returned from email verification');
        }

        // Get additional user data
        const publicUserData = await UserDataManager.getPublicUserData(data.user.id);
        const user = convertSupabaseUserToUser(data.user, publicUserData || undefined);

        // Store session
        SessionManager.storeSession({
          isAuthenticated: true,
          user,
          token: data.session.access_token,
        });

        return {
          success: true,
          user,
          token: data.session.access_token,
          requiresEmailVerification: false,
        };
      }, 'Email verification');

      console.log('✅ Email verification successful');
      return result;
    } catch (error) {
      console.error('❌ Email verification failed:', error);

      const authError = AuthErrorHandler.handleSupabaseError(error);
      AuthErrorHandler.logError(authError, 'verifyEmail');

      return AuthErrorHandler.createErrorResponse(authError);
    }
  }

  /**
   * Resend email verification
   */
  static async resendVerification(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📧 Resending email verification:', email);

      await RetryHandler.executeWithRetry(async () => {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email,
        });

        if (error) {
          throw error;
        }
      }, 'Resend email verification');

      console.log('✅ Email verification resent successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to resend email verification:', error);

      const authError = AuthErrorHandler.handleSupabaseError(error);
      AuthErrorHandler.logError(authError, 'resendVerification');

      return {
        success: false,
        error: authError.message,
      };
    }
  }

  /**
   * Check if email is already registered
   */
  static async isEmailRegistered(email: string): Promise<boolean> {
    try {
      // This is a simple check - in production you might want to use a different approach
      // to avoid exposing user information
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: 'dummy-password-to-check-if-email-exists',
      });

      // If we get an "invalid credentials" error, the email exists
      if (error && error.message.includes('Invalid login credentials')) {
        return true;
      }

      // If we get a different error or no error, the email might not exist
      return false;
    } catch (error) {
      console.warn('⚠️ Error checking if email is registered:', error);
      return false;
    }
  }
}

// Export convenience function for direct usage
export const signup = SignupService.signup;
