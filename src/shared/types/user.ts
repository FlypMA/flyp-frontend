export type UserType = 'seller' | 'buyer' | 'both' | 'admin';
export type UserRole = UserType; // Alias for compatibility

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  language: string;
  timezone: string;
}

// Import the production User type for consistency
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserType;
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
  country: string;
  email_verified: boolean;
  verification_token?: string;
  verification_token_expires_at?: string;
  password_hash?: string;
  auth_provider: string;
  language_preference: string;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  deleted_at?: string;

  // Legacy compatibility fields
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

export interface UserMetrics {
  _id: string;
  platformExperiencePoints: number;
  total_experiencePoints: number;
  total_userLevel: number;
}
