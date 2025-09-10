// =============================================================================
// BETWEENDEALS PRODUCTION USER TYPES - BACKEND ALIGNED
// =============================================================================
// Single source of truth matching backend schema exactly
// Based on /data/schemas/users/users.sql and backend API
// =============================================================================

// =============================================================================
// CORE ENUMS AND TYPES - BACKEND ALIGNED
// =============================================================================

/**
 * User roles - EXACT match with backend enum
 */
export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
  BOTH = 'both',
}

// String literal type for maximum compatibility
export type UserRoleString = 'admin' | 'seller' | 'buyer' | 'both';

export type AuthProvider = 'email' | 'google';
export type Language = 'en' | 'nl' | 'fr';
export type Country = 'BE' | 'NL' | 'FR' | 'DE' | 'US';

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  language?: string;
  timezone?: string;
}

// =============================================================================
// CORE USER INTERFACE - EXACT BACKEND MATCH
// =============================================================================

/**
 * User interface - EXACT match with backend public.users table
 */
export interface User {
  // Core Identity (Links to auth.users.id)
  id: string;
  email: string;
  name: string;
  phone?: string;

  // Role Management - EXACT match with backend
  role: UserRoleString;

  // Business Information (sellers only)
  company_name?: string;
  company_description?: string;

  // Enhanced Business Data (MVP Critical Fields)
  industry?: string;
  business_type?: string;
  years_in_operation?: number;

  // Financial & Size Indicators
  revenue_range?: string;
  asking_price_range?: string;
  employee_count_range?: string;

  // Business Status & Marketing
  business_verified?: boolean;
  listing_status?: 'draft' | 'active' | 'under_offer' | 'sold' | 'withdrawn';
  business_highlights?: string;
  reason_for_selling?: string;

  // Location
  city?: string;
  country: Country;

  // Verification
  email_verified: boolean;
  verification_token?: string;
  verification_token_expires_at?: string;

  // Authentication Integration
  auth_provider: AuthProvider;

  // Preferences
  language_preference: Language;

  // Audit Fields
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  deleted_at?: string;

  // Legacy compatibility fields (for gradual migration)
  _id?: string;
  first_name?: string;
  last_name?: string;
  locale?: string;
  phone_number?: string;
  avatar_url?: string;
  avatar?: string;
  last_login?: string;
  is_active?: boolean;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
  userType?: UserRoleString; // Legacy alias for role
  verified?: boolean;
  platformId?: string;
  password?: string;
  rank?: number;
  userPreferences?: UserPreferences;
}

// =============================================================================
// TYPE GUARDS AND UTILITIES
// =============================================================================

/**
 * Type guards for role checking - BACKEND ALIGNED
 */
export const isSellerUser = (user: User | null | undefined): boolean => {
  if (!user?.role) return false;
  return user.role === 'seller' || user.role === 'both';
};

export const isBuyerUser = (user: User | null | undefined): boolean => {
  if (!user?.role) return false;
  return user.role === 'buyer' || user.role === 'both';
};

export const isAdminUser = (user: User | null | undefined): boolean => {
  if (!user?.role) return false;
  return user.role === 'admin';
};

export const hasBusinessInfo = (user: User | null | undefined): boolean => {
  if (!user) return false;
  return !!(user.company_name && user.company_description);
};

export const isVerifiedUser = (user: User | null | undefined): boolean => {
  if (!user) return false;
  return user.email_verified;
};

/**
 * Normalize user role from various legacy formats
 */
export const normalizeUserRole = (user: User | any): UserRoleString => {
  if (!user) return 'buyer';

  // Try different role fields that might exist in legacy objects
  const role = user.role || user.userType || user.user_type;
  if (!role) return 'buyer';

  // Handle enum values (uppercase to lowercase)
  if (typeof role === 'string') {
    const lowerRole = role.toLowerCase();
    if (['admin', 'seller', 'buyer', 'both'].includes(lowerRole)) {
      return lowerRole as UserRoleString;
    }
  }

  // Default fallback
  return 'buyer';
};

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRoleString;
  phone?: string;
  city?: string;
  country?: Country;
  company_name?: string;
  company_description?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_in: number;
}

export interface AuthResult {
  isAuthenticated: boolean;
  user?: User;
  token?: string;
}

export interface AuthCheckResponse {
  isAuthenticated: boolean;
  user?: User;
  error?: string;
}

// =============================================================================
// PROFILE UPDATE TYPES
// =============================================================================

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  city?: string;
  country?: Country;
  language_preference?: Language;
}

export interface UpdateBusinessInfoRequest {
  company_name?: string;
  company_description?: string;
}

export interface RoleToggleRequest {
  new_role: UserRoleString;
  business_info?: {
    company_name: string;
    company_description?: string;
  };
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface UsersListResponse {
  success: boolean;
  data?: User[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  error?: string;
  timestamp: string;
}

// =============================================================================
// CONSTANTS AND CONFIGURATION
// =============================================================================

export const USER_ROLES: UserRoleString[] = ['admin', 'seller', 'buyer', 'both'];
export const COUNTRIES: Country[] = ['BE', 'NL', 'FR', 'DE', 'US'];
export const LANGUAGES: Language[] = ['en', 'nl', 'fr'];

export const COUNTRY_LABELS: Record<Country, string> = {
  BE: 'Belgium',
  NL: 'Netherlands',
  FR: 'France',
  DE: 'Germany',
  US: 'United States',
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  nl: 'Nederlands',
  fr: 'Français',
};

export const DEFAULT_USER_VALUES = {
  role: 'buyer' as UserRoleString,
  country: 'BE' as Country,
  language_preference: 'en' as Language,
  email_verified: false,
  auth_provider: 'email' as AuthProvider,
} as const;

// =============================================================================
// LEGACY COMPATIBILITY FUNCTIONS
// =============================================================================

/**
 * Convert legacy user objects to consolidated User interface
 */
export const convertLegacyUser = (legacyUser: any): User => {
  return {
    id: legacyUser.id || legacyUser._id,
    email: legacyUser.email,
    name:
      legacyUser.name ||
      legacyUser.full_name ||
      `${legacyUser.first_name || ''} ${legacyUser.last_name || ''}`.trim(),
    phone: legacyUser.phone || legacyUser.phone_number,
    role: normalizeUserRole(legacyUser),
    company_name: legacyUser.company_name,
    company_description: legacyUser.company_description,
    industry: legacyUser.industry,
    business_type: legacyUser.business_type,
    years_in_operation: legacyUser.years_in_operation,
    revenue_range: legacyUser.revenue_range,
    asking_price_range: legacyUser.asking_price_range,
    employee_count_range: legacyUser.employee_count_range,
    business_verified: legacyUser.business_verified,
    listing_status: legacyUser.listing_status,
    business_highlights: legacyUser.business_highlights,
    reason_for_selling: legacyUser.reason_for_selling,
    city: legacyUser.city,
    country: legacyUser.country || 'BE',
    email_verified: legacyUser.email_verified || false,
    verification_token: legacyUser.verification_token,
    verification_token_expires_at: legacyUser.verification_token_expires_at,
    auth_provider: legacyUser.auth_provider || 'email',
    language_preference: legacyUser.language_preference || (legacyUser.locale as Language) || 'en',
    created_at: legacyUser.created_at,
    updated_at: legacyUser.updated_at,
    last_login_at: legacyUser.last_login_at || legacyUser.last_login,
    deleted_at: legacyUser.deleted_at,

    // Legacy fields for backward compatibility
    _id: legacyUser._id,
    first_name: legacyUser.first_name,
    last_name: legacyUser.last_name,
    locale: legacyUser.locale,
    phone_number: legacyUser.phone_number,
    avatar_url: legacyUser.avatar_url || legacyUser.avatar,
    avatar: legacyUser.avatar,
    last_login: legacyUser.last_login,
    is_active: legacyUser.is_active,
    preferences: legacyUser.preferences || legacyUser.userPreferences,
    metadata: legacyUser.metadata,
    userType: legacyUser.userType || legacyUser.user_type,
    verified: legacyUser.verified,
    platformId: legacyUser.platformId,
    password: legacyUser.password,
    rank: legacyUser.rank,
    userPreferences: legacyUser.userPreferences,
  };
};

// =============================================================================
// ALIASES FOR COMPATIBILITY
// =============================================================================

// Legacy type aliases
export type UserType = UserRoleString;
export type UserProfile = User;

// =============================================================================
// MIGRATION HELPER
// =============================================================================

/**
 * Check if user object needs migration from legacy format
 */
export const needsLegacyConversion = (user: any): boolean => {
  return !!(user && (user._id || user.userType || user.user_type) && !user.role);
};

/**
 * Safely get user role, handling both legacy and new formats
 */
export const getUserRole = (user: any): UserRoleString => {
  if (!user) return 'buyer';
  return normalizeUserRole(user);
};
