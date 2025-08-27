// =============================================================================
// USER RELATED TYPES
// =============================================================================
// All user-related types and interfaces
// =============================================================================

import { UserRole } from './index';

/**
 * Core User entity
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  locale?: string;
  phone_number?: string;
  email_verified?: boolean;
  business_verified?: boolean;
  avatar_url?: string;

  created_at: string;
  updated_at: string;
  last_login?: string;
  is_active?: boolean;

  preferences?: UserPreferences;
  metadata?: Record<string, any>;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  language?: string;
  timezone?: string;
  email_notifications?: boolean;
  marketing_emails?: boolean;
  currency?: string;
  theme?: 'light' | 'dark' | 'auto';
  listing_alerts?: boolean;
  conversation_notifications?: boolean;
  inquiry_notifications?: boolean;
  privacy_mode?: boolean;
  public_profile?: boolean;
  [key: string]: any;
}

/**
 * User profile display information
 */
export interface UserProfile {
  id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role: UserRole;
  verified: boolean;
  member_since: string;
  location?: string;
  bio?: string;
  contact_preferences?: ContactPreferences;
}

/**
 * Contact preferences for user communication
 */
export interface ContactPreferences {
  email_enabled: boolean;
  phone_enabled: boolean;
  preferred_contact_method: 'email' | 'phone' | 'platform';
  business_hours_only: boolean;
  timezone: string;
}

/**
 * User statistics and activity metrics
 */
export interface UserStats {
  total_listings?: number;
  active_listings?: number;
  completed_transactions?: number;
  total_inquiries_sent?: number;
  total_inquiries_received?: number;
  response_rate?: number;
  average_response_time?: number; // in hours
  user_rating?: number;
  profile_completion_score?: number;
}

/**
 * User verification status
 */
export interface UserVerification {
  email_verified: boolean;
  phone_verified: boolean;
  identity_verified: boolean;
  business_verified: boolean;
  verification_level: 'none' | 'basic' | 'enhanced' | 'premium';
  verification_documents?: VerificationDocument[];
}

/**
 * Verification document
 */
export interface VerificationDocument {
  id: string;
  document_type: 'passport' | 'driving_license' | 'business_registration' | 'tax_certificate';
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: string;
  reviewed_at?: string;
  reviewer_notes?: string;
}

/**
 * User activity log entry
 */
export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  description: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

/**
 * User session information
 */
export interface UserSession {
  id: string;
  user_id: string;
  device_info: string;
  ip_address: string;
  location?: string;
  created_at: string;
  last_activity: string;
  expires_at: string;
  is_active: boolean;
}

/**
 * User notification settings
 */
export interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  marketing_emails: boolean;
  listing_alerts: boolean;
  inquiry_notifications: boolean;
  conversation_notifications: boolean;
  system_announcements: boolean;
  weekly_digest: boolean;
  notification_frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}

/**
 * User privacy settings
 */
export interface PrivacySettings {
  profile_visibility: 'public' | 'registered_users' | 'private';
  show_email: boolean;
  show_phone: boolean;
  show_location: boolean;
  allow_direct_contact: boolean;
  data_collection_consent: boolean;
  analytics_consent: boolean;
  marketing_consent: boolean;
}

/**
 * Two-factor authentication settings
 */
export interface TwoFactorAuth {
  enabled: boolean;
  method: 'sms' | 'email' | 'authenticator';
  backup_codes: string[];
  last_used: string;
  verified_devices: VerifiedDevice[];
}

/**
 * Verified device for 2FA
 */
export interface VerifiedDevice {
  id: string;
  device_name: string;
  device_type: 'mobile' | 'desktop' | 'tablet';
  last_used: string;
  trusted: boolean;
}

// =============================================================================
// USER CREATION AND UPDATE TYPES
// =============================================================================

/**
 * User creation request
 */
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  locale?: string;
  preferences?: Partial<UserPreferences>;
}

/**
 * User update request
 */
export interface UpdateUserRequest {
  name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  locale?: string;
  preferences?: Partial<UserPreferences>;
  privacy_settings?: Partial<PrivacySettings>;
  notification_settings?: Partial<NotificationSettings>;
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

/**
 * Reset password request
 */
export interface ResetPasswordRequest {
  email: string;
}

/**
 * Confirm password reset request
 */
export interface ConfirmPasswordResetRequest {
  token: string;
  new_password: string;
}

// =============================================================================
// USER ROLE SPECIFIC TYPES
// =============================================================================

/**
 * Seller profile additional information
 */
export interface SellerProfile {
  user_id: string;
  business_focus: string[];
  years_of_experience: number;
  transaction_history: number;
  specialties: string[];
  certifications: string[];
  success_rate: number;
  average_time_to_sell: number; // in days
}

/**
 * Buyer profile information
 */
export interface BuyerProfile {
  user_id: string;
  investment_range_min: number;
  investment_range_max: number;
  preferred_sectors: string[];
  preferred_locations: string[];
  investment_timeline: string;
  experience_level: 'first_time' | 'experienced' | 'serial_buyer';
  financing_type: 'cash' | 'financed' | 'mixed';
  involvement_level: 'passive' | 'active' | 'hands_on';
}

/**
 * Admin user permissions
 */
export interface AdminPermissions {
  user_id: string;
  permissions: string[];
  granted_by: string;
  granted_at: string;
  expires_at?: string;
}

// =============================================================================
// USER SEARCH AND FILTERING
// =============================================================================

/**
 * User search filters
 */
export interface UserSearchFilters {
  role?: UserRole;
  verified?: boolean;
  location?: string;
  registration_date_from?: string;
  registration_date_to?: string;
  last_activity_from?: string;
  is_active?: boolean;
  search_query?: string;
}

/**
 * User search result
 */
export interface UserSearchResult {
  users: UserProfile[];
  total_count: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// =============================================================================
// USER RELATIONSHIPS
// =============================================================================

/**
 * User connection/relationship
 */
export interface UserConnection {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  connection_type: 'business' | 'professional' | 'follow';
  created_at: string;
  updated_at: string;
}

/**
 * User follow relationship
 */
export interface UserFollow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

// =============================================================================
// USER FEEDBACK AND RATINGS
// =============================================================================

/**
 * User rating/review
 */
export interface UserRating {
  id: string;
  rated_user_id: string;
  rating_user_id: string;
  transaction_id?: string;
  rating: number; // 1-5 stars
  review_text?: string;
  categories: {
    communication: number;
    professionalism: number;
    reliability: number;
    knowledge: number;
  };
  created_at: string;
  updated_at: string;
}

/**
 * User feedback summary
 */
export interface UserFeedbackSummary {
  user_id: string;
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  category_averages: {
    communication: number;
    professionalism: number;
    reliability: number;
    knowledge: number;
  };
}

export default User;
