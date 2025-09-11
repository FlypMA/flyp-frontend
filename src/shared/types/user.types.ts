// 👤 User Type Definitions - TypeScript safety for user data

import type { UserId } from './utility.types';

/**
 * User roles in the system
 */
export type UserRole = 'buyer' | 'seller' | 'both' | 'admin';

/**
 * User status
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';

/**
 * Core User interface
 */
export interface User {
  id: UserId;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;

  // Profile information
  bio?: string;
  company?: string;
  location?: string;
  website?: string;

  // System fields
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  emailVerified: boolean;

  // Permissions and preferences
  permissions: string[];
  preferences: UserPreferences;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}

/**
 * User profile update payload
 */
export interface UserProfileUpdate {
  firstName?: string;
  lastName?: string;
  bio?: string;
  company?: string;
  location?: string;
  website?: string;
  phone?: string;
  avatar?: string;
}

/**
 * Authentication payload
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  agreeToTerms: boolean;
}

/**
 * Auth response
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

/**
 * Password reset
 */
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

/**
 * User session
 */
export interface UserSession {
  id: string;
  userId: UserId;
  device: string;
  browser: string;
  ipAddress: string;
  location?: string;
  createdAt: string;
  lastActiveAt: string;
  isActive: boolean;
}
