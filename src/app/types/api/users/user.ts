export interface UserPreferences {
  enableDataCollection?: boolean;
  eventCollection?: 'view events only' | 'interaction events only' | 'all events';
  tabOption?: 'all tabs' | 'this tab only';
  language?: string;
  timezone?: string;
  email_notifications?: boolean;
  marketing_emails?: boolean;
  currency?: string;
  theme?: 'light' | 'dark' | 'system';
}

export enum UserType {
  Default = 'default',
  Seller = 'seller',
  Buyer = 'buyer',
  Both = 'both',
  Business = 'business',
  Admin = 'admin',
}

// Alias for consistency across the app - matches shared types exactly
export type UserRole = 'seller' | 'buyer' | 'both' | 'admin' | 'moderator';
export type UserRoleShared = import('../../shared/index').UserRole;

// Production-ready User interface aligned with enhanced schema
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
  country: string;

  // Verification
  email_verified: boolean;
  verification_token?: string;
  verification_token_expires_at?: string;

  // Authentication
  password_hash?: string;
  auth_provider: string;

  // Preferences
  language_preference: string;

  // Audit Fields
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  deleted_at?: string;

  // Legacy compatibility fields (for gradual migration)
  _id?: string;
  ethAddress?: string;
  avatar?: string;
  password?: string;
  rank?: number;
  userPreferences?: UserPreferences;
  userType?: UserType;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  platformId?: string;
}

export interface AuthCheckResponse {
  isAuthenticated: boolean;
  user?: User;
  error?: string;
}
