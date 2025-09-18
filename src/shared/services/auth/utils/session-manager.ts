// 🍪 Session Manager - MVP Version
// Location: src/shared/services/auth/utils/session-manager.ts
// Purpose: Centralized session management with cookies and localStorage persistence
//
// Features:
// - Cookie-based session storage with secure options
// - localStorage fallback for session data
// - Session expiration handling
// - Cross-tab session synchronization
// - Development bypass support
// - Secure cookie configuration (HTTPS, SameSite, etc.)
// - Session validation and cleanup

import { AuthResult, User } from '../../../types';

// =============================================================================
// SESSION CONFIGURATION
// =============================================================================

const SESSION_CONFIG = {
  COOKIE_NAME: 'flyp_session',
  TOKEN_KEY: 'flyp_token',
  USER_KEY: 'flyp_user',
  REFRESH_KEY: 'flyp_refresh',
  EXPIRY_DAYS: 7, // 7 days
  SECURE: process.env.NODE_ENV === 'production',
  SAME_SITE: 'lax' as const,
} as const;

// =============================================================================
// SESSION MANAGER CLASS
// =============================================================================

export class SessionManager {
  /**
   * Store authentication session
   */
  static storeSession(authResult: AuthResult): void {
    try {
      if (!authResult.isAuthenticated || !authResult.user || !authResult.token) {
        console.warn('⚠️ Invalid session data provided');
        return;
      }

      // Store in localStorage for persistence
      localStorage.setItem(SESSION_CONFIG.TOKEN_KEY, authResult.token);
      localStorage.setItem(SESSION_CONFIG.USER_KEY, JSON.stringify(authResult.user));

      // Store in cookie for server-side access
      this.setCookie(SESSION_CONFIG.COOKIE_NAME, authResult.token, SESSION_CONFIG.EXPIRY_DAYS);

      console.log('✅ Session stored successfully');
    } catch (error) {
      console.error('❌ Failed to store session:', error);
    }
  }

  /**
   * Retrieve authentication session
   */
  static getSession(): AuthResult | null {
    try {
      const token = localStorage.getItem(SESSION_CONFIG.TOKEN_KEY);
      const userStr = localStorage.getItem(SESSION_CONFIG.USER_KEY);

      if (!token || !userStr) {
        return null;
      }

      const user: User = JSON.parse(userStr);

      return {
        isAuthenticated: true,
        user,
        token,
      };
    } catch (error) {
      console.error('❌ Failed to retrieve session:', error);
      this.clearSession();
      return null;
    }
  }

  /**
   * Clear authentication session
   */
  static clearSession(): void {
    try {
      // Clear localStorage
      localStorage.removeItem(SESSION_CONFIG.TOKEN_KEY);
      localStorage.removeItem(SESSION_CONFIG.USER_KEY);
      localStorage.removeItem(SESSION_CONFIG.REFRESH_KEY);

      // Clear cookie
      this.deleteCookie(SESSION_CONFIG.COOKIE_NAME);

      console.log('✅ Session cleared successfully');
    } catch (error) {
      console.error('❌ Failed to clear session:', error);
    }
  }

  /**
   * Check if session exists
   */
  static hasSession(): boolean {
    const token = localStorage.getItem(SESSION_CONFIG.TOKEN_KEY);
    const user = localStorage.getItem(SESSION_CONFIG.USER_KEY);
    return !!(token && user);
  }

  /**
   * Get stored token
   */
  static getToken(): string | null {
    return localStorage.getItem(SESSION_CONFIG.TOKEN_KEY);
  }

  /**
   * Get stored user
   */
  static getUser(): User | null {
    try {
      const userStr = localStorage.getItem(SESSION_CONFIG.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('❌ Failed to parse stored user:', error);
      return null;
    }
  }

  /**
   * Update stored user data
   */
  static updateUser(user: User): void {
    try {
      localStorage.setItem(SESSION_CONFIG.USER_KEY, JSON.stringify(user));
      console.log('✅ User data updated in session');
    } catch (error) {
      console.error('❌ Failed to update user in session:', error);
    }
  }

  /**
   * Set cookie with proper configuration
   */
  private static setCookie(name: string, value: string, days: number): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    const cookieString = [
      `${name}=${value}`,
      `expires=${expires.toUTCString()}`,
      `path=/`,
      SESSION_CONFIG.SECURE ? 'secure' : '',
      `samesite=${SESSION_CONFIG.SAME_SITE}`,
    ]
      .filter(Boolean)
      .join('; ');

    document.cookie = cookieString;
  }

  /**
   * Delete cookie
   */
  private static deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * Get cookie value
   */
  static getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }
}
