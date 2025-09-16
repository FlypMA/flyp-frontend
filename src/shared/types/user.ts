// 🔐 User Types - MVP Version
// Location: src/shared/types/user.ts
// Purpose: User type definitions for MVP frontend
// Based on data room types with MVP-specific simplifications

// =============================================================================
// CORE ENUMS AND TYPES
// =============================================================================

export type UserRole = 'buyer' | 'seller' | 'both' | 'admin';
export type AuthProvider = 'email' | 'google';
export type Language = 'en' | 'nl' | 'fr';
export type Country = 'BE' | 'NL' | 'FR' | 'DE' | 'US';

// =============================================================================
// CORE USER INTERFACE - MVP VERSION
// =============================================================================

/**
 * User interface - MVP version based on data room types
 * Simplified for MVP needs while maintaining compatibility
 */
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
  
  // Authentication
  auth_provider: AuthProvider;
  
  // Preferences
  language_preference: Language;
  
  // Audit Fields
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  deleted_at?: string;

  // MVP-specific fields
  avatar?: string;
  preferences?: UserPreferences;
  
  // Additional fields for compatibility
  location?: string;
  company?: string;
  bio?: string;
}

// =============================================================================
// USER PREFERENCES
// =============================================================================

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
  industry?: string;
  business_type?: string;
  years_in_operation?: number;
  revenue_range?: string;
  asking_price_range?: string;
  employee_count_range?: string;
  business_highlights?: string;
  reason_for_selling?: string;
}

export interface RoleToggleRequest {
  new_role: UserRole;
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
// TYPE GUARDS AND UTILITIES
// =============================================================================

/**
 * Type guards for role checking
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

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type PublicUserFields = Pick<User, 'id' | 'name' | 'city' | 'country' | 'created_at'>;
export type RequiredUserFields = Pick<User, 'email' | 'name' | 'role'>;
export type BusinessUserFields = Pick<User, 'company_name' | 'company_description'>;

// =============================================================================
// CONSTANTS
// =============================================================================

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

// =============================================================================
// BUSINESS CONSTANTS
// =============================================================================

export const INDUSTRIES = [
  'Technology',
  'Manufacturing',
  'Business Consulting',
  'Food & Beverage', 
  'E-commerce',
  'Healthcare',
  'Education',
  'Real Estate',
  'Financial Services',
  'Transportation',
  'Other'
] as const;

export const REVENUE_RANGES = [
  '<€100K',
  '€100K-€500K',
  '€500K-€1M',
  '€1M-€5M', 
  '€5M+',
] as const;

export const ASKING_PRICE_RANGES = [
  '<€100K',
  '€100K-€500K',
  '€500K-€1M',
  '€1M-€5M',
  '€5M+',
] as const;

export const EMPLOYEE_COUNT_RANGES = [
  '1-5',
  '6-20',
  '21-50',
  '51-100',
  '100+',
] as const;

export const BUSINESS_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'LLC',
  'Corporation',
  'Other'
] as const;

export const LISTING_STATUSES = [
  'draft',
  'active',
  'under_offer',
  'sold',
  'withdrawn'
] as const;

// =============================================================================
// SUPABASE AUTH TYPES
// =============================================================================

/**
 * Supabase Auth User (from auth.users table)
 */
export interface SupabaseAuthUser {
  id: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email_change?: string;
  phone_change?: string;
  reauthentication_sent_at?: string;
  reauthentication_token?: string;
}

/**
 * Supabase Session
 */
export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: SupabaseAuthUser;
}

/**
 * Supabase Auth Response
 */
export interface SupabaseAuthResponse {
  data: {
    user: SupabaseAuthUser | null;
    session: SupabaseSession | null;
  };
  error: Error | null;
}

/**
 * Supabase User Metadata (stored in user_metadata)
 */
export interface SupabaseUserMetadata {
  name?: string;
  role?: UserRole;
  company_name?: string;
  company_description?: string;
  industry?: string;
  business_type?: string;
  years_in_operation?: number;
  revenue_range?: string;
  asking_price_range?: string;
  employee_count_range?: string;
  business_verified?: boolean;
  listing_status?: 'draft' | 'active' | 'under_offer' | 'sold' | 'withdrawn';
  business_highlights?: string;
  reason_for_selling?: string;
  city?: string;
  country?: Country;
  language_preference?: Language;
  avatar_url?: string;
}

/**
 * Convert Supabase Auth User to our User interface
 */
export const convertSupabaseUserToUser = (
  supabaseUser: SupabaseAuthUser,
  publicUserData?: Partial<User>
): User => {
  const metadata = supabaseUser.user_metadata as SupabaseUserMetadata;
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: metadata.name || supabaseUser.email || 'Unknown User',
    phone: supabaseUser.phone || undefined,
    role: metadata.role || 'buyer',
    company_name: metadata.company_name || undefined,
    company_description: metadata.company_description || undefined,
    industry: metadata.industry || undefined,
    business_type: metadata.business_type || undefined,
    years_in_operation: metadata.years_in_operation || undefined,
    revenue_range: metadata.revenue_range || undefined,
    asking_price_range: metadata.asking_price_range || undefined,
    employee_count_range: metadata.employee_count_range || undefined,
    business_verified: metadata.business_verified || false,
    listing_status: metadata.listing_status || 'draft',
    business_highlights: metadata.business_highlights || undefined,
    reason_for_selling: metadata.reason_for_selling || undefined,
    city: metadata.city || undefined,
    country: metadata.country || 'BE',
    email_verified: !!supabaseUser.email_confirmed_at,
    verification_token: undefined, // Not stored in Supabase Auth
    verification_token_expires_at: undefined, // Not stored in Supabase Auth
    auth_provider: 'email', // Default for email auth
    language_preference: metadata.language_preference || 'en',
    created_at: supabaseUser.created_at,
    updated_at: supabaseUser.updated_at || supabaseUser.created_at,
    last_login_at: supabaseUser.last_sign_in_at || undefined,
    deleted_at: undefined,
    avatar: metadata.avatar_url || undefined,
    preferences: undefined,
    
    // Override with public user data if available
    ...publicUserData,
  };
};

/**
 * Convert our User interface to Supabase User Metadata
 */
export const convertUserToSupabaseMetadata = (user: Partial<User>): SupabaseUserMetadata => {
  return {
    name: user.name || undefined,
    role: user.role || undefined,
    company_name: user.company_name || undefined,
    company_description: user.company_description || undefined,
    industry: user.industry || undefined,
    business_type: user.business_type || undefined,
    years_in_operation: user.years_in_operation || undefined,
    revenue_range: user.revenue_range || undefined,
    asking_price_range: user.asking_price_range || undefined,
    employee_count_range: user.employee_count_range || undefined,
    business_verified: user.business_verified || undefined,
    listing_status: user.listing_status || undefined,
    business_highlights: user.business_highlights || undefined,
    reason_for_selling: user.reason_for_selling || undefined,
    city: user.city || undefined,
    country: user.country || undefined,
    language_preference: user.language_preference || undefined,
    avatar_url: user.avatar || undefined,
  };
};
