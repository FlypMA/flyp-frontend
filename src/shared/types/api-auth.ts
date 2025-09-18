/**
 * 🔐 Authentication API Types - flyp MVP
 *
 * Authentication and authorization API type definitions for secure
 * user management and access control.
 *
 * @author Senior CTO
 * @version 1.0.0
 */

import { ApiResponse } from './api';
import { User, UserRole } from './user';

// =============================================================================
// AUTHENTICATION REQUEST TYPES
// =============================================================================

/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    deviceId?: string;
  };
}

/**
 * Registration Request
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  businessInfo?: {
    companyName?: string;
    industry?: string;
    website?: string;
  };
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  marketingConsent?: boolean;
}

/**
 * Password Reset Request
 */
export interface PasswordResetRequest {
  email: string;
  redirectUrl?: string;
}

/**
 * Password Update Request
 */
export interface PasswordUpdateRequest {
  currentPassword?: string;
  newPassword: string;
  token?: string; // For reset password flow
}

/**
 * Email Verification Request
 */
export interface EmailVerificationRequest {
  token: string;
}

/**
 * Resend Verification Request
 */
export interface ResendVerificationRequest {
  email: string;
}

// =============================================================================
// AUTHENTICATION RESPONSE TYPES
// =============================================================================

/**
 * Authentication Result
 */
export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  expiresAt?: string;
  error?: string;
  requiresVerification?: boolean;
  requiresOnboarding?: boolean;
}

/**
 * Session Information
 */
export interface SessionInfo {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  expiresAt: string | null;
  lastActivity: string | null;
}

/**
 * Token Refresh Result
 */
export interface TokenRefreshResult {
  success: boolean;
  token?: string;
  refreshToken?: string;
  expiresAt?: string;
  error?: string;
}

// =============================================================================
// USER PROFILE TYPES
// =============================================================================

/**
 * Profile Update Request
 */
export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  preferences?: {
    language?: string;
    currency?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    privacy?: {
      showProfile?: boolean;
      showActivity?: boolean;
      allowMessages?: boolean;
    };
  };
}

/**
 * Business Profile Update Request
 */
export interface BusinessProfileUpdateRequest {
  companyName?: string;
  industry?: string;
  website?: string;
  description?: string;
  logo?: string;
  employees?: number;
  yearEstablished?: number;
  revenue?: number;
  location?: {
    address?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  };
  verification?: {
    businessLicense?: string;
    taxId?: string;
    bankAccount?: string;
  };
}

// =============================================================================
// VERIFICATION TYPES
// =============================================================================

/**
 * Verification Status
 */
export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'expired';

/**
 * Verification Request
 */
export interface VerificationRequest {
  type: 'email' | 'phone' | 'identity' | 'business';
  documents?: Array<{
    type: string;
    url: string;
    name: string;
  }>;
  additionalInfo?: Record<string, any>;
}

/**
 * Verification Result
 */
export interface VerificationResult {
  id: string;
  type: VerificationRequest['type'];
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  expiresAt?: string;
  notes?: string;
  documents: Array<{
    id: string;
    type: string;
    status: VerificationStatus;
    url: string;
    name: string;
  }>;
}

// =============================================================================
// SECURITY TYPES
// =============================================================================

/**
 * Security Event
 */
export interface SecurityEvent {
  id: string;
  type:
    | 'login'
    | 'logout'
    | 'password_change'
    | 'email_change'
    | 'failed_login'
    | 'suspicious_activity';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
  success: boolean;
  details?: Record<string, any>;
}

/**
 * Two-Factor Authentication Setup
 */
export interface TwoFactorSetupRequest {
  method: 'sms' | 'email' | 'authenticator';
  phoneNumber?: string;
  backupCodes?: boolean;
}

/**
 * Two-Factor Authentication Verification
 */
export interface TwoFactorVerificationRequest {
  code: string;
  method: 'sms' | 'email' | 'authenticator' | 'backup';
  rememberDevice?: boolean;
}

// =============================================================================
// PERMISSION TYPES
// =============================================================================

/**
 * Permission Entity
 */
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

/**
 * Role Entity
 */
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isDefault: boolean;
}

/**
 * Access Control Request
 */
export interface AccessControlRequest {
  resource: string;
  action: string;
  context?: Record<string, any>;
}

/**
 * Access Control Result
 */
export interface AccessControlResult {
  allowed: boolean;
  reason?: string;
  requiredPermissions?: string[];
  context?: Record<string, any>;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export type LoginResponse = ApiResponse<AuthResult>;
export type RegisterResponse = ApiResponse<AuthResult>;
export type PasswordResetResponse = ApiResponse<{ message: string }>;
export type PasswordUpdateResponse = ApiResponse<{ message: string }>;
export type EmailVerificationResponse = ApiResponse<AuthResult>;
export type ProfileResponse = ApiResponse<User>;
export type SessionResponse = ApiResponse<SessionInfo>;
export type TokenRefreshResponse = ApiResponse<TokenRefreshResult>;
export type VerificationResponse = ApiResponse<VerificationResult>;
export type SecurityEventsResponse = ApiResponse<SecurityEvent[]>;
export type RolesResponse = ApiResponse<Role[]>;
export type PermissionsResponse = ApiResponse<Permission[]>;
export type AccessControlResponse = ApiResponse<AccessControlResult>;

// =============================================================================
// AUTHENTICATION CONTEXT TYPES
// =============================================================================

/**
 * Authentication Context State
 */
export interface AuthContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

/**
 * Authentication Context Actions
 */
export interface AuthContextActions {
  login: (credentials: LoginRequest) => Promise<AuthResult>;
  register: (data: RegisterRequest) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<TokenRefreshResult>;
  updateProfile: (updates: ProfileUpdateRequest) => Promise<User>;
  changePassword: (data: PasswordUpdateRequest) => Promise<void>;
  resetPassword: (data: PasswordResetRequest) => Promise<void>;
  verifyEmail: (data: EmailVerificationRequest) => Promise<AuthResult>;
  resendVerification: (data: ResendVerificationRequest) => Promise<void>;
  checkPermission: (request: AccessControlRequest) => Promise<boolean>;
}

/**
 * Authentication Context
 */
export interface AuthContext extends AuthContextState, AuthContextActions {}

// =============================================================================
// EXPORTS
// =============================================================================

export default AuthResult;
