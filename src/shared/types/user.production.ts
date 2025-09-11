// Flyp Production User Types
// Aligned with single-table backend schema
// This is the source of truth for user types across the frontend

export type UserRole = 'buyer' | 'seller' | 'both' | 'admin';

// Export as enum for compatibility with existing code
export enum UserRoleEnum {
  BUYER = 'buyer',
  SELLER = 'seller',
  BOTH = 'both',
  ADMIN = 'admin',
}
export type AuthProvider = 'email' | 'google';
export type Language = 'en' | 'nl' | 'fr';
export type Country = 'BE' | 'NL' | 'FR' | 'DE' | 'US';

// Core User Interface - Production Schema
export interface User {
  // Core Identity
  id: string;
  email: string;
  name: string;
  phone?: string;

  // Role Management
  role: UserRole;

  // Business Information (sellers only)
  company_name?: string;
  company_description?: string;

  // Location
  city?: string;
  country: Country;

  // Verification
  email_verified: boolean;

  // Authentication
  auth_provider: AuthProvider;

  // Preferences
  language_preference: Language;

  // Audit Fields
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  deleted_at?: string;
}

// Public Seller Profile (what buyers can see)
export interface SellerProfile {
  id: string;
  name: string;
  company_name?: string;
  company_description?: string;
  city?: string;
  country: Country;
  created_at: string;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
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

// Profile Update Types
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

// Role Management
export interface RoleToggleRequest {
  new_role: UserRole;
  business_info?: {
    company_name: string;
    company_description?: string;
  };
}

// Email Verification
export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationConfirmRequest {
  token: string;
}

// API Response Types
export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface UsersListResponse {
  success: boolean;
  data?: SellerProfile[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  error?: string;
  timestamp: string;
}

// Form Validation Types
export interface UserValidationError {
  field: keyof User | keyof RegisterRequest | keyof UpdateProfileRequest;
  message: string;
  code: string;
}

export interface ValidationResponse {
  valid: boolean;
  errors?: UserValidationError[];
}

// Search and Filter Types
export interface UserSearchFilters {
  role?: UserRole;
  country?: Country;
  city?: string;
  email_verified?: boolean;
  created_after?: string;
  created_before?: string;
}

// Context Types (for React components)
export interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (userData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<User>;
  updateBusinessInfo: (data: UpdateBusinessInfoRequest) => Promise<User>;
  toggleRole: (request: RoleToggleRequest) => Promise<User>;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerification: () => Promise<boolean>;
}

// Utility Types
export type PublicUserFields = Pick<User, 'id' | 'name' | 'city' | 'country' | 'created_at'>;
export type RequiredUserFields = Pick<User, 'email' | 'name' | 'role'>;
export type BusinessUserFields = Pick<User, 'company_name' | 'company_description'>;

// Type Guards
export const isSellerUser = (user: User): boolean => {
  return user.role === 'seller' || user.role === 'both';
};

export const isBuyerUser = (user: User): boolean => {
  return user.role === 'buyer' || user.role === 'both';
};

export const isAdminUser = (user: User): boolean => {
  return user.role === 'admin';
};

export const hasBusinessInfo = (user: User): boolean => {
  return !!(user.company_name && user.company_description);
};

export const isVerifiedUser = (user: User): boolean => {
  return user.email_verified;
};

// Constants
export const USER_ROLES: UserRole[] = ['buyer', 'seller', 'both', 'admin'];
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
  role: 'buyer' as UserRole,
  country: 'BE' as Country,
  language_preference: 'en' as Language,
  email_verified: false,
  auth_provider: 'email' as AuthProvider,
} as const;

// Legacy compatibility type (for gradual migration)
export interface LegacyUserProfile extends User {
  // Legacy fields for backward compatibility
  first_name?: string;
  last_name?: string;
  full_name?: string;
  avatar_url?: string;
  phone_number?: string;
  locale?: string;
  business_verified?: boolean;
  is_active?: boolean;
  preferences?: Record<string, any>;
  metadata?: Record<string, any>;
  _id?: string; // For old API compatibility
}

// Utility function to convert legacy user to new format
export const convertLegacyUser = (legacyUser: LegacyUserProfile): User => {
  return {
    id: legacyUser.id,
    email: legacyUser.email,
    name:
      legacyUser.name ||
      legacyUser.full_name ||
      `${legacyUser.first_name || ''} ${legacyUser.last_name || ''}`.trim(),
    phone: legacyUser.phone || legacyUser.phone_number,
    role: legacyUser.role,
    company_name: legacyUser.company_name,
    company_description: legacyUser.company_description,
    city: legacyUser.city,
    country: legacyUser.country || 'BE',
    email_verified: legacyUser.email_verified || false,
    auth_provider: legacyUser.auth_provider || 'email',
    language_preference: legacyUser.language_preference || (legacyUser.locale as Language) || 'en',
    created_at: legacyUser.created_at,
    updated_at: legacyUser.updated_at,
    last_login_at: legacyUser.last_login_at,
    deleted_at: legacyUser.deleted_at,
  };
};
