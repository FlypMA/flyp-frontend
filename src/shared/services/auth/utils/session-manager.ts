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
  COOKIE_NAME: 'upswitch_session',
  TOKEN_KEY: 'upswitch_token',
  USER_KEY: 'upswitch_user',
  REFRESH_KEY: 'upswitch_refresh',
  EXPIRY_DAYS: 7, // 7 days
  SECURE: import.meta.env.MODE === 'production',
  SAME_SITE: 'lax' as const,
} as const;

// =============================================================================
// SESSION MANAGER CLASS
// =============================================================================

export class SessionManager {
  /**
   * Store authentication session (HTTP-only cookie pattern)
   * Note: Actual authentication is via HTTP-only cookies set by backend
   * This only stores user data locally for UI purposes
   */
  static storeSession(authResult: AuthResult): void {
    try {
      if (!authResult.isAuthenticated || !authResult.user) {
        return;
      }

      // Only store user data locally (not tokens - those are in HTTP-only cookies)
      localStorage.setItem(SESSION_CONFIG.USER_KEY, JSON.stringify(authResult.user));

      // Store a flag to indicate we have a session
      localStorage.setItem('upswitch_has_session', 'true');
    } catch (error) {
      console.error('Error storing session:', error);
    }
  }

  /**
   * Retrieve authentication session (HTTP-only cookie pattern)
   * Note: This only returns locally stored user data
   * Actual authentication validation must be done via backend API
   */
  static getSession(): AuthResult | null {
    try {
      const userStr = localStorage.getItem(SESSION_CONFIG.USER_KEY);
      const hasSession = localStorage.getItem('upswitch_has_session');

      if (!userStr || !hasSession) {
        return null;
      }

      const user: User = JSON.parse(userStr);

      return {
        isAuthenticated: true,
        user,
        token: 'cookie-based', // Placeholder - actual auth is via HTTP-only cookies
      };
    } catch (error) {
      this.clearSession();
      return null;
    }
  }

  /**
   * Clear authentication session (HTTP-only cookie pattern)
   * Note: HTTP-only cookies are cleared by backend on logout
   */
  static clearSession(): void {
    try {
      // Clear localStorage (HTTP-only cookies are cleared by backend)
      localStorage.removeItem(SESSION_CONFIG.USER_KEY);
      localStorage.removeItem('upswitch_has_session');

      // Clear any legacy tokens if they exist
      localStorage.removeItem(SESSION_CONFIG.TOKEN_KEY);
      localStorage.removeItem(SESSION_CONFIG.REFRESH_KEY);
    } catch (error) {
      console.error('Error clearing session:', error);
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
      return null;
    }
  }

  /**
   * Update stored user data
   */
  static updateUser(user: User): void {
    try {
      localStorage.setItem(SESSION_CONFIG.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error updating user data:', error);
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
