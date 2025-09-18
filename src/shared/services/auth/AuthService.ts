// 🔐 Authentication Service - Backend API with HTTP-only Cookies
// Location: src/shared/services/auth/AuthService.ts
// Purpose: Secure backend-based authentication with HTTP-only cookie management

import { AuthResult, User, UserRole } from '../../types';
import { SessionManager } from './utils/session-manager';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  error?: string;
  requiresVerification?: boolean;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Authentication Service - Backend API with HTTP-only Cookies
 * 
 * Architecture:
 * Frontend → Backend API → Supabase → Backend sets HTTP-only cookies → Frontend receives user data
 * 
 * Security Features:
 * - HTTP-only cookies (XSS protection)
 * - Backend handles all Supabase interactions
 * - No sensitive tokens in localStorage
 * - CSRF protection via SameSite cookies
 */
export class AuthenticationService {
  private baseURL: string;

  constructor() {
    const backendUrl = import.meta.env.VITE_NODE_BACKEND_URL || 'http://localhost:3000';
    
    // Ensure the URL has a protocol (fix for production deployment)
    if (backendUrl && !backendUrl.startsWith('http://') && !backendUrl.startsWith('https://')) {
      this.baseURL = `https://${backendUrl}`;
    } else {
      this.baseURL = backendUrl;
    }
  }

  /**
   * Make authenticated API request with credentials (cookies)
   */
  private async makeRequest<T = any>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        credentials: 'include', // CRITICAL: Include HTTP-only cookies
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Create a new user account through backend
   * Backend will handle Supabase signup and set HTTP-only cookies
   */
  async createAccount(
    email: string,
    password: string,
    name: string,
    role: UserRole = 'buyer'
  ): Promise<{ success: boolean; user?: User; error?: string; requiresVerification?: boolean }> {
    try {
      console.log('🔧 Creating account through backend:', { email, name, role });

      const response = await this.makeRequest<{
        user: User;
        requiresVerification?: boolean;
      }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name,
          role,
        }),
      });

      if (!response.success) {
        console.error('Account creation failed:', response.error);
        return {
          success: false,
          error: response.error || 'Account creation failed',
        };
      }

      // Store user in session (cookies are handled by backend)
      if (response.data?.user) {
        const authResult: AuthResult = {
          isAuthenticated: true,
          user: response.data.user,
          token: 'cookie-based', // Placeholder - actual auth is via HTTP-only cookies
        };
        SessionManager.storeSession(authResult);
      }

      console.log('✅ Account created successfully');
      return {
        success: true,
        user: response.data?.user,
        requiresVerification: response.data?.requiresVerification,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Account creation failed:', error);

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Login user through backend
   * Backend will validate with Supabase and set HTTP-only cookies
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      console.log('🔐 Logging in user through backend:', { email });

      const response = await this.makeRequest<{
        user: User;
      }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.success) {
        console.error('Login failed:', response.error);
        return {
          success: false,
          error: response.error || 'Login failed',
        };
      }

      // Store user in session (cookies are handled by backend)
      if (response.data?.user) {
        const authResult: AuthResult = {
          isAuthenticated: true,
          user: response.data.user,
          token: 'cookie-based', // Placeholder - actual auth is via HTTP-only cookies
        };
        SessionManager.storeSession(authResult);
      }

      console.log('✅ Login successful');
      return {
        success: true,
        user: response.data?.user,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Login failed:', error);

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Logout user through backend
   * Backend will clear HTTP-only cookies and invalidate Supabase session
   */
  async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🚪 Logging out user through backend');

      // Call backend logout (will clear HTTP-only cookies)
      const response = await this.makeRequest('/api/auth/logout', {
        method: 'POST',
      });

      // Clear local session regardless of backend response
      SessionManager.clearSession();

      console.log('✅ Logout successful');
      return { 
        success: true,
        error: response.success ? undefined : response.error,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Logout failed:', error);
      
      // Clear session anyway
      SessionManager.clearSession();
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Check authentication status through backend
   * Backend will validate HTTP-only cookies with Supabase
   */
  async checkAuth(): Promise<{ isAuthenticated: boolean; user?: User; error?: string }> {
    try {
      // First, check if we have a valid session in localStorage
      const localSession = SessionManager.getSession();
      if (localSession && localSession.isAuthenticated && localSession.user) {
        console.log('🔍 Using cached session data');
        return {
          isAuthenticated: true,
          user: localSession.user
        };
      }

      console.log('🔍 Checking authentication status through backend');

      const response = await this.makeRequest<{ user: User }>('/api/auth/me');

      if (!response.success) {
        // Not authenticated or session expired
        SessionManager.clearSession();
        return { 
          isAuthenticated: false, 
          error: response.error 
        };
      }

      // Update session with fresh user data
      if (response.data?.user) {
        const authResult: AuthResult = {
          isAuthenticated: true,
          user: response.data.user,
          token: 'cookie-based', // Placeholder - actual auth is via HTTP-only cookies
        };
        SessionManager.storeSession(authResult);
      }

      return {
        isAuthenticated: true,
        user: response.data?.user,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Auth check failed:', error);
      
      SessionManager.clearSession();
      
      return {
        isAuthenticated: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Check authentication status (alias for checkAuth for backward compatibility)
   */
  async checkAuthentication(): Promise<AuthResult> {
    const result = await this.checkAuth();
    return {
      isAuthenticated: result.isAuthenticated,
      user: result.user,
      token: result.isAuthenticated ? 'cookie-based' : undefined,
    };
  }

  /**
   * Get cached session data without making API calls
   */
  getSession(): AuthResult | null {
    return SessionManager.getSession();
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const authCheck = await this.checkAuth();
      return authCheck.user || null;
    } catch (error) {
      console.error('❌ Get current user failed:', error);
      return null;
    }
  }

  /**
   * Reset password through backend
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔑 Requesting password reset through backend:', email);

      const response = await this.makeRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      return {
        success: response.success,
        error: response.error,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Password reset failed:', error);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Update password through backend
   */
  async updatePassword(newPassword: string, token?: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔐 Updating password through backend');

      const response = await this.makeRequest('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ 
          password: newPassword,
          ...(token && { token })
        }),
      });

      return {
        success: response.success,
        error: response.error,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Password update failed:', error);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Verify email through backend
   */
  async verifyEmail(token: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      console.log('📧 Verifying email through backend');

      const response = await this.makeRequest<{ user: User }>('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });

      // If verification successful and user is returned, store session
      if (response.success && response.data?.user) {
        const authResult: AuthResult = {
          isAuthenticated: true,
          user: response.data.user,
          token: 'cookie-based',
        };
        SessionManager.storeSession(authResult);
      }

      return {
        success: response.success,
        user: response.data?.user,
        error: response.error,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Email verification failed:', error);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Resend verification email through backend
   */
  async resendVerification(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📧 Resending verification email through backend:', email);

      const response = await this.makeRequest('/api/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      return {
        success: response.success,
        error: response.error,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Resend verification failed:', error);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Refresh session through backend
   * Backend will refresh Supabase session and update HTTP-only cookies
   */
  async refreshSession(): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      console.log('🔄 Refreshing session through backend');

      const response = await this.makeRequest<{ user: User }>('/api/auth/refresh', {
        method: 'POST',
      });

      if (response.success && response.data?.user) {
        // Update local session
        const authResult: AuthResult = {
          isAuthenticated: true,
          user: response.data.user,
          token: 'cookie-based',
        };
        SessionManager.storeSession(authResult);

        return {
          success: true,
          user: response.data.user,
        };
      }

      return {
        success: false,
        error: response.error || 'Session refresh failed',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Session refresh failed:', error);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Check if user email exists (for signup validation)
   */
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await this.makeRequest<{ exists: boolean }>('/api/auth/check-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      return response.data?.exists || false;
    } catch (error) {
      console.error('❌ Email check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const authService = new AuthenticationService();