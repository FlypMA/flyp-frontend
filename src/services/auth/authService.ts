/**
 * 🔒 COMPREHENSIVE AUTHENTICATION SERVICE - BetweenDeals M&A Platform
 * Enterprise-grade authentication with JWT, Supabase integration, and security hardening
 * Built by Senior CTO for production-ready user management
 */

import {
  User,
  UserRole,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenResponse,
  ProfileResponse,
  ChangePasswordRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
} from '@/types/shared';

import { httpClient } from '../api/secureHttpClient';
import { API_ENDPOINTS } from '../../config/api';
// import { supabase } from '../supabase/supabaseClient'; // Temporarily disabled

// Feature flags - temporarily hardcoded
const FEATURE_FLAGS = {
  ENABLE_SUPABASE_SYNC: false,
  ENABLE_BIOMETRIC_AUTH: false,
  ENABLE_ADVANCED_SECURITY: true,
  ENABLE_AUTO_LOGOUT: true,
  ENABLE_MFA: false,
  ENABLE_AUDIT_LOGGING: true,
} as const;

// Mock supabase auth for now
const supabase = {
  auth: {
    signOut: async () => ({ error: null }),
    signInWithPassword: async (credentials: any) => ({ error: null }),
    signUp: async (credentials: any) => ({ error: null }),
  },
};

// =============================================================================
// INTERFACES & TYPES
// =============================================================================

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  lastActivity: number;
  sessionExpiry: number;
}

interface SecuritySettings {
  mfaEnabled: boolean;
  sessionTimeout: number;
  deviceTrusted: boolean;
  lastPasswordChange: number;
}

interface LoginOptions {
  rememberMe?: boolean;
  trustDevice?: boolean;
  mfaCode?: string;
}

interface RegistrationOptions {
  userType: UserRole;
  organizationName?: string;
  acceptTerms: boolean;
  marketingConsent?: boolean;
}

// =============================================================================
// AUTH STATE MANAGEMENT
// =============================================================================

class AuthStateManager {
  private static instance: AuthStateManager;
  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    lastActivity: Date.now(),
    sessionExpiry: 0,
  };
  private listeners: Set<(state: AuthState) => void> = new Set();
  private sessionTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeSessionMonitoring();
  }

  static getInstance(): AuthStateManager {
    if (!AuthStateManager.instance) {
      AuthStateManager.instance = new AuthStateManager();
    }
    return AuthStateManager.instance;
  }

  getState(): AuthState {
    return { ...this.state };
  }

  setState(updates: Partial<AuthState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  private initializeSessionMonitoring(): void {
    // Monitor user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    const updateActivity = () => {
      this.setState({ lastActivity: Date.now() });
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Check session expiry every minute
    this.sessionTimer = setInterval(() => {
      this.checkSessionExpiry();
    }, 60000);
  }

  private checkSessionExpiry(): void {
    if (this.state.isAuthenticated && this.state.sessionExpiry > 0) {
      const now = Date.now();
      const timeSinceActivity = now - this.state.lastActivity;
      const sessionTimeoutMs = 30 * 60 * 1000; // 30 minutes

      if (timeSinceActivity > sessionTimeoutMs || now > this.state.sessionExpiry) {
        console.warn('Session expired due to inactivity');
        AuthService.getInstance().logout();
      }
    }
  }

  destroy(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }
    this.listeners.clear();
  }
}

// =============================================================================
// MAIN AUTHENTICATION SERVICE
// =============================================================================

export class AuthService {
  private static instance: AuthService;
  private stateManager: AuthStateManager;
  private securitySettings: SecuritySettings = {
    mfaEnabled: false,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    deviceTrusted: false,
    lastPasswordChange: 0,
  };

  private constructor() {
    this.stateManager = AuthStateManager.getInstance();
    this.initializeAuth();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initialize authentication state on app start
   */
  private async initializeAuth(): Promise<void> {
    try {
      this.stateManager.setState({ loading: true, error: null });

      // Check for existing session
      const token = httpClient.getAuthToken();
      if (token) {
        await this.validateSession();
      } else {
        this.stateManager.setState({
          loading: false,
          isAuthenticated: false,
          user: null,
        });
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.stateManager.setState({
        loading: false,
        isAuthenticated: false,
        user: null,
        error: 'Failed to initialize authentication',
      });
    }
  }

  /**
   * Validate current session and refresh user data
   */
  private async validateSession(): Promise<void> {
    try {
      const response = await httpClient.get<ProfileResponse>(API_ENDPOINTS.AUTH.PROFILE);

      if (response.success && response.data) {
        this.stateManager.setState({
          isAuthenticated: true,
          user: response.data,
          loading: false,
          error: null,
          sessionExpiry: Date.now() + this.securitySettings.sessionTimeout,
        });
      } else {
        throw new Error('Invalid session');
      }
    } catch (error) {
      console.warn('Session validation failed:', error);
      await this.logout();
    }
  }

  /**
   * Login with email and password
   */
  async login(credentials: LoginRequest, options: LoginOptions = {}): Promise<AuthResponse> {
    try {
      this.stateManager.setState({ loading: true, error: null });

      // Validate input
      this.validateLoginCredentials(credentials);

      // Attempt login through our backend
      const response = await httpClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          ...credentials,
          rememberMe: options.rememberMe,
          mfaCode: options.mfaCode,
          deviceFingerprint: this.generateDeviceFingerprint(),
        },
        { requireAuth: false }
      );

      if (response.success && response.data) {
        // Store tokens securely
        httpClient.setAuthTokens(response.data.token!, response.data.refreshToken);

        // Update auth state
        this.stateManager.setState({
          isAuthenticated: true,
          user: response.data.user!,
          loading: false,
          error: null,
          sessionExpiry: Date.now() + this.securitySettings.sessionTimeout,
        });

        // Sync with Supabase if needed
        if (FEATURE_FLAGS.ENABLE_SUPABASE_SYNC) {
          await this.syncWithSupabase(credentials.email, credentials.password);
        }

        // Log successful login
        this.logSecurityEvent('LOGIN_SUCCESS', {
          userId: response.data.user!.id,
          rememberMe: options.rememberMe,
          trustDevice: options.trustDevice,
        });

        return response;
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error: any) {
      this.stateManager.setState({
        loading: false,
        error: error.message || 'Login failed',
      });

      this.logSecurityEvent('LOGIN_FAILED', {
        email: credentials.email,
        error: error.message,
      });

      throw error;
    }
  }

  /**
   * Register new user account
   */
  async register(userData: RegisterRequest, options: RegistrationOptions): Promise<AuthResponse> {
    try {
      this.stateManager.setState({ loading: true, error: null });

      // Validate input
      this.validateRegistrationData(userData, options);

      // Register through our backend
      const response = await httpClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        {
          ...userData,
          role: options.userType,
          organizationName: options.organizationName,
          acceptTerms: options.acceptTerms,
          marketingConsent: options.marketingConsent,
          deviceFingerprint: this.generateDeviceFingerprint(),
        },
        { requireAuth: false }
      );

      if (response.success && response.data) {
        // Store tokens securely
        httpClient.setAuthTokens(response.data.token!, response.data.refreshToken);

        // Update auth state
        this.stateManager.setState({
          isAuthenticated: true,
          user: response.data.user!,
          loading: false,
          error: null,
          sessionExpiry: Date.now() + this.securitySettings.sessionTimeout,
        });

        // Create Supabase account if needed
        if (FEATURE_FLAGS.ENABLE_SUPABASE_SYNC) {
          await this.createSupabaseAccount(userData.email, userData.password);
        }

        // Log successful registration
        this.logSecurityEvent('REGISTRATION_SUCCESS', {
          userId: response.data.user!.id,
          userType: options.userType,
        });

        return response;
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error: any) {
      this.stateManager.setState({
        loading: false,
        error: error.message || 'Registration failed',
      });

      this.logSecurityEvent('REGISTRATION_FAILED', {
        email: userData.email,
        error: error.message,
      });

      throw error;
    }
  }

  /**
   * Logout and clean up session
   */
  async logout(): Promise<void> {
    try {
      const currentUser = this.stateManager.getState().user;

      // Notify backend of logout
      try {
        await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        console.warn('Backend logout failed:', error);
      }

      // Sign out from Supabase
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.warn('Supabase logout failed:', error);
      }

      // Clear local auth state
      httpClient.clearAuthTokens();
      this.stateManager.setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        sessionExpiry: 0,
      });

      // Log logout
      if (currentUser) {
        this.logSecurityEvent('LOGOUT_SUCCESS', {
          userId: currentUser.id,
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  /**
   * Change user password with security checks
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    try {
      this.stateManager.setState({ loading: true, error: null });

      // Validate password strength
      this.validatePasswordStrength(passwordData.new_password);

      // Note: Using profile update endpoint for password changes temporarily
      const response = await httpClient.post('/api/auth/change-password', passwordData);

      if (response.success) {
        this.securitySettings.lastPasswordChange = Date.now();

        // Log password change
        this.logSecurityEvent('PASSWORD_CHANGED', {
          userId: this.stateManager.getState().user?.id,
        });

        this.stateManager.setState({ loading: false, error: null });
      } else {
        throw new Error(response.error || 'Password change failed');
      }
    } catch (error: any) {
      this.stateManager.setState({
        loading: false,
        error: error.message || 'Password change failed',
      });
      throw error;
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    try {
      const response = await httpClient.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email },
        { requireAuth: false }
      );

      if (!response.success) {
        throw new Error(response.error || 'Password reset request failed');
      }

      this.logSecurityEvent('PASSWORD_RESET_REQUESTED', { email });
    } catch (error: any) {
      this.logSecurityEvent('PASSWORD_RESET_FAILED', {
        email,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(resetData: PasswordResetConfirmRequest): Promise<void> {
    try {
      this.validatePasswordStrength(resetData.new_password);

      const response = await httpClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData, {
        requireAuth: false,
      });

      if (!response.success) {
        throw new Error(response.error || 'Password reset failed');
      }

      this.logSecurityEvent('PASSWORD_RESET_SUCCESS', {
        token: resetData.token,
      });
    } catch (error: any) {
      this.logSecurityEvent('PASSWORD_RESET_FAILED', {
        token: resetData.token,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Enable/disable MFA
   */
  async toggleMFA(enable: boolean, mfaCode?: string): Promise<void> {
    if (!FEATURE_FLAGS.ENABLE_MFA) {
      throw new Error('MFA is not enabled on this platform');
    }

    try {
      const response = await httpClient.post('/api/auth/mfa/toggle', {
        enable,
        mfaCode,
      });

      if (response.success) {
        this.securitySettings.mfaEnabled = enable;

        this.logSecurityEvent(enable ? 'MFA_ENABLED' : 'MFA_DISABLED', {
          userId: this.stateManager.getState().user?.id,
        });
      } else {
        throw new Error(response.error || 'MFA toggle failed');
      }
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Validate current session
   */
  async checkAuth(): Promise<boolean> {
    try {
      await this.validateSession();
      return this.stateManager.getState().isAuthenticated;
    } catch (error) {
      return false;
    }
  }

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange(callback: (state: AuthState) => void): () => void {
    return this.stateManager.subscribe(callback);
  }

  /**
   * Get current auth state
   */
  getAuthState(): AuthState {
    return this.stateManager.getState();
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.stateManager.getState().user;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.stateManager.getState().isAuthenticated;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  // =============================================================================
  // PRIVATE HELPER METHODS
  // =============================================================================

  private validateLoginCredentials(credentials: LoginRequest): void {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Invalid email format');
    }

    if (credentials.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
  }

  private validateRegistrationData(userData: RegisterRequest, options: RegistrationOptions): void {
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error('Name, email, and password are required');
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    this.validatePasswordStrength(userData.password);

    if (!options.acceptTerms) {
      throw new Error('You must accept the terms and conditions');
    }

    if (!Object.values(UserRole).includes(options.userType)) {
      throw new Error('Invalid user type');
    }
  }

  private validatePasswordStrength(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter');
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter');
    }

    if (!/(?=.*\d)/.test(password)) {
      throw new Error('Password must contain at least one number');
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      throw new Error('Password must contain at least one special character');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private generateDeviceFingerprint(): string {
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
    ].join('|');

    return btoa(fingerprint).slice(0, 16);
  }

  private async syncWithSupabase(email: string, password: string): Promise<void> {
    try {
      // Sign in to Supabase (or create account if it doesn't exist)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error && error.message.includes('Invalid login credentials')) {
        // Account doesn't exist in Supabase, create it
        await this.createSupabaseAccount(email, password);
      } else if (error) {
        throw error;
      }
    } catch (error) {
      console.warn('Supabase sync failed:', error);
      // Don't fail the login if Supabase sync fails
    }
  }

  private async createSupabaseAccount(email: string, password: string): Promise<void> {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.warn('Supabase account creation failed:', error);
      // Don't fail the registration if Supabase creation fails
    }
  }

  private logSecurityEvent(event: string, data: any): void {
    const logEntry = {
      event,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...data,
    };

    console.log('[Security Event]', logEntry);

    // In production, send to security monitoring service
    if (FEATURE_FLAGS.ENABLE_AUDIT_LOGGING) {
      // Implementation would send to your security logging service
    }
  }
}

// =============================================================================
// SINGLETON EXPORT
// =============================================================================

export const authService = AuthService.getInstance();
export default authService;
