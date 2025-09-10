// =============================================================================
// BETWEENDEALS.COM SHARED TYPE DEFINITIONS
// =============================================================================
// Comprehensive TypeScript types for SME M&A platform
// Shared between frontend and backend for type safety
// =============================================================================

// =============================================================================
// CORE ENUMS
// =============================================================================

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SELLER = 'seller',
  BUYER = 'buyer',
  BOTH = 'both',
}

export enum ListingStatus {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  SOLD = 'sold',
}

export enum InquiryStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export enum ConversationStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  COMPLETED = 'completed',
}

export enum MessageType {
  TEXT = 'text',
  DOCUMENT = 'document',
  SYSTEM = 'system',
}

export enum DocumentAccessLevel {
  PUBLIC = 'public',
  NDA_REQUIRED = 'nda_required',
  PRIVATE = 'private',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
  UNPAID = 'unpaid',
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// =============================================================================
// CORE ENTITIES
// =============================================================================

/**
 * User - Main user entity for all platform users
 * Production-ready types aligned with enhanced single-table schema
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

  // Legacy compatibility fields (deprecated - for gradual migration)
  first_name?: string;
  last_name?: string;
  locale?: string;
  phone_number?: string;
  avatar_url?: string;
  last_login?: string;
  is_active?: boolean;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
  _id?: string; // Legacy field mapping
}

/**
 * User preferences for platform customization
 */
export interface UserPreferences {
  language?: string;
  timezone?: string;
  email_notifications?: boolean;
  marketing_emails?: boolean;
  currency?: string;
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  [key: string]: any;
}

/**
 * UserProfile - Alias for User to maintain backward compatibility
 * Gradually migrate components to use User instead of UserProfile
 */
export type UserProfile = User;

/**
 * Legacy User interface mapping for components still using old structure
 */
export interface LegacyUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  userType?: UserType;
  verified?: boolean;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Common user role/type mappings
export type UserType = 'seller' | 'buyer' | 'both' | 'admin' | 'business';

// Type conversion utilities
export const convertLegacyToUser = (legacy: LegacyUser): User => ({
  id: legacy._id,
  name: legacy.name,
  email: legacy.email,
  role: legacy.role,
  email_verified: legacy.verified ?? false,
  country: 'BE', // Default
  auth_provider: 'email',
  language_preference: 'en',
  created_at: legacy.createdAt?.toISOString() ?? new Date().toISOString(),
  updated_at: legacy.updatedAt?.toISOString() ?? new Date().toISOString(),
  avatar_url: legacy.avatar,
});

// Alias for backward compatibility
export const convertLegacyUser = convertLegacyToUser;

export const convertUserToLegacy = (user: User): LegacyUser => ({
  _id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  verified: user.email_verified,
  avatar: user.avatar_url,
  createdAt: new Date(user.created_at),
  updatedAt: new Date(user.updated_at),
});

/**
 * Organization - Business entities that own listings
 */
export interface Organization {
  id: string;
  name: string;
  business_type?: string;
  registration_number?: string;
  tax_id?: string;
  country: string;
  region?: string;
  city?: string;
  website?: string;
  description?: string;
  verified: boolean;
  contact_info?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Business Listing - Core listing entity
 */
export interface Listing {
  id: string;
  organization_id: string;
  created_by: string;

  // Basic information
  sector: string;
  country: string;
  region?: string;
  city?: string;

  // Listing configuration
  status: ListingStatus;
  anonymous: boolean;
  requires_nda: boolean;
  featured: boolean;

  // Financial information
  asking_price?: number;
  currency: string;
  price_negotiable: boolean;

  // Timing
  reason_for_sale?: string;
  preferred_timeline?: string;
  expires_at?: string;
  published_at?: string;

  created_at: string;
  updated_at: string;

  // Relations (populated in API responses)
  translations?: ListingTranslation[];
  financials?: ListingFinancials;
  analytics?: ListingAnalytics;
  organization?: Organization;
  documents?: Document[];
}

/**
 * Multi-language listing content
 */
export interface ListingTranslation {
  id: string;
  listing_id: string;
  locale: string;
  title: string;
  description: string;
  summary?: string;
  highlights?: string[];
  reason_for_sale_details?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Financial details for listings
 */
export interface ListingFinancials {
  id: string;
  listing_id: string;
  revenue_min?: number;
  revenue_max?: number;
  revenue_currency: string;
  ebitda_min?: number;
  ebitda_max?: number;
  ebitda_margin?: number;
  revenue_growth_rate?: number;
  profit_growth_rate?: number;
  financial_year?: number;
  years_in_business?: number;
  assets_value?: number;
  liabilities_value?: number;
  inventory_value?: number;
  created_at: string;
}

/**
 * Listing performance analytics
 */
export interface ListingAnalytics {
  id: string;
  listing_id: string;
  views_count: number;
  unique_views_count: number;
  inquiries_count: number;
  saves_count: number;
  shares_count: number;
  completion_score?: number;
  quality_score?: number;
  last_activity_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Buyer inquiry to seller
 */
export interface Inquiry {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  status: InquiryStatus;
  message: string;
  buyer_background?: string;
  intended_use?: string;
  financing_confirmed: boolean;
  nda_required: boolean;
  nda_accepted: boolean;
  nda_accepted_at?: string;
  seller_response?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;

  // Relations (populated in API responses)
  listing?: Listing;
  buyer?: User;
  seller?: User;
}

/**
 * Conversation between buyer and seller
 */
export interface Conversation {
  id: string;
  inquiry_id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  status: ConversationStatus;
  subject?: string;
  nda_signed: boolean;
  confidential_access_granted: boolean;
  last_message_at?: string;
  last_message_by?: string;
  message_count: number;
  created_at: string;
  updated_at: string;

  // Relations (populated in API responses)
  messages?: Message[];
  listing?: Listing;
  buyer?: User;
  seller?: User;
}

/**
 * Individual message in conversation
 */
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  is_system_message: boolean;
  reply_to_id?: string;
  edited_at?: string;
  sent_at: string;
  read_at?: string;
  read_by?: string;
  attachments?: any[];
  created_at: string;

  // Relations (populated in API responses)
  sender?: User;
}

/**
 * Document attached to listings
 */
export interface Document {
  id: string;
  listing_id: string;
  uploaded_by: string;
  filename: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  storage_key: string;
  storage_url?: string;
  document_type?: string;
  category?: string;
  description?: string;
  access_level: DocumentAccessLevel;
  password_protected: boolean;
  watermarked: boolean;
  version: number;
  parent_document_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Document access tracking
 */
export interface DocumentAccess {
  id: string;
  document_id: string;
  user_id: string;
  granted_by: string;
  granted_at: string;
  expires_at?: string;
  revoked_at?: string;
  revoked_by?: string;
  first_accessed_at?: string;
  last_accessed_at?: string;
  access_count: number;
  download_count: number;
  ip_addresses?: string[];
  user_agents?: string[];
}

/**
 * Buyer investment profile
 */
export interface BuyerProfile {
  id: string;
  user_id: string;
  target_sectors?: string[];
  target_countries?: string[];
  target_regions?: string[];
  budget_min?: number;
  budget_max?: number;
  budget_currency: string;
  preferred_business_age_min?: number;
  preferred_business_age_max?: number;
  preferred_employee_count_min?: number;
  preferred_employee_count_max?: number;
  investment_timeline?: string;
  involvement_level?: string;
  experience_level?: string;
  risk_tolerance?: string;
  contact_preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Saved search for buyers
 */
export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  search_criteria: Record<string, any>; // JSON filters
  alert_enabled: boolean;
  alert_frequency: string;
  last_run_at?: string;
  results_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * NDA record for legal compliance
 */
export interface NDARecord {
  id: string;
  conversation_id: string;
  inquiry_id?: string;
  buyer_id: string;
  seller_id: string;
  document_template_id: string;
  document_url?: string;
  terms_version: string;
  signed_by_buyer: boolean;
  signed_by_seller: boolean;
  buyer_signed_at?: string;
  seller_signed_at?: string;
  buyer_ip_address?: string;
  seller_ip_address?: string;
  buyer_user_agent?: string;
  seller_user_agent?: string;
  expires_at?: string;
  created_at: string;
}

/**
 * Subscription plans
 */
export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price_monthly: number;
  price_yearly?: number;
  currency: string;
  features: string[];
  limits: Record<string, any>;
  trial_days: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * User subscription
 */
export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  status: SubscriptionStatus;
  billing_period: string;
  price_amount: number;
  price_currency: string;
  trial_starts_at?: string;
  trial_ends_at?: string;
  current_period_start: string;
  current_period_end: string;
  canceled_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Payment record
 */
export interface Payment {
  id: string;
  user_id: string;
  subscription_id?: string;
  listing_id?: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method?: string;
  purpose: string; // 'listing_fee', 'subscription', 'featured_listing'
  description?: string;
  receipt_url?: string;
  processed_at?: string;
  failed_at?: string;
  refunded_at?: string;
  refund_amount?: number;
  created_at: string;
  updated_at: string;
}

/**
 * User-Organization relationship
 */
export interface UserOrganization {
  id: string;
  user_id: string;
  organization_id: string;
  role: string;
  permissions: string[];
  created_at: string;

  // Relations (populated in API responses)
  organization?: Organization;
}

// =============================================================================
// API TYPES
// =============================================================================

/**
 * Standard API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    pagination?: PaginationInfo;
    total?: number;
    timestamp?: string;
  };
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Search filters for listings
 */
export interface ListingFilters {
  page?: number;
  limit?: number;
  country?: string;
  sector?: string;
  revenueMin?: number;
  revenueMax?: number;
  askingPriceMin?: number;
  askingPriceMax?: number;
  anonymous?: boolean;
  requiresNda?: boolean;
  searchQuery?: string;
  locale?: string;
}

/**
 * Search filters for inquiries
 */
export interface InquiryFilters {
  page?: number;
  limit?: number;
  status?: InquiryStatus;
  listing_id?: string;
  buyer_id?: string;
  seller_id?: string;
}

/**
 * Search filters for conversations
 */
export interface ConversationFilters {
  page?: number;
  limit?: number;
  status?: ConversationStatus;
  listing_id?: string;
  buyer_id?: string;
  seller_id?: string;
}

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Login request (alias for LoginCredentials)
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register request
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  city?: string;
  country?: string;
  company_name?: string;
  company_description?: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  locale?: string;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  error?: string;
  expires_in?: number;
}

/**
 * Auth result for authentication checks
 */
export interface AuthResult {
  isAuthenticated: boolean;
  user?: User;
  token?: string;
  error?: string;
}

/**
 * Auth check response for authentication status
 */
export interface AuthCheckResponse {
  isAuthenticated: boolean;
  user?: User;
  error?: string;
}

// =============================================================================
// REQUEST/RESPONSE TYPES
// =============================================================================

/**
 * Create listing request
 */
export interface CreateListingRequest {
  organization_id: string;
  sector: string;
  country: string;
  region?: string;
  city?: string;
  anonymous?: boolean;
  requires_nda?: boolean;
  asking_price?: number;
  currency?: string;
  price_negotiable?: boolean;
  reason_for_sale?: string;
  preferred_timeline?: string;
  translations: {
    [locale: string]: {
      title: string;
      description: string;
      summary?: string;
      highlights?: string[];
      reason_for_sale_details?: string;
    };
  };
  financials?: Partial<ListingFinancials>;
}

/**
 * Update listing request
 */
export interface UpdateListingRequest {
  sector?: string;
  region?: string;
  city?: string;
  anonymous?: boolean;
  requires_nda?: boolean;
  asking_price?: number;
  price_negotiable?: boolean;
  reason_for_sale?: string;
  preferred_timeline?: string;
}

/**
 * Create inquiry request
 */
export interface CreateInquiryRequest {
  listing_id: string;
  message: string;
  buyer_background?: string;
  intended_use?: string;
  financing_confirmed: boolean;
  nda_required?: boolean;
}

/**
 * Update inquiry request
 */
export interface UpdateInquiryRequest {
  status?: InquiryStatus;
  seller_response?: string;
}

/**
 * Create organization request
 */
export interface CreateOrganizationRequest {
  name: string;
  business_type?: string;
  registration_number?: string;
  tax_id?: string;
  country: string;
  region?: string;
  city?: string;
  website?: string;
  description?: string;
  contact_info?: Record<string, any>;
}

/**
 * Update user profile request
 */
export interface UpdateUserProfileRequest {
  name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  locale?: string;
  preferences?: UserPreferences;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Database entity base interface
 */
export interface DatabaseEntity {
  created_at: string;
  updated_at: string;
}

/**
 * Repository query options
 */
export interface RepositoryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

/**
 * File upload result
 */
export interface FileUploadResult {
  id: string;
  filename: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  storage_url: string;
}

/**
 * Error details for API responses
 */
export interface ErrorDetails {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

/**
 * Validation error response
 */
export interface ValidationErrorResponse {
  success: false;
  error: string;
  errors: ErrorDetails[];
}

// =============================================================================
// BUSINESS LOGIC TYPES
// =============================================================================

/**
 * Business valuation parameters
 */
export interface BusinessValuation {
  revenue: number;
  ebitda: number;
  sector: string;
  location: string;
  years_in_business: number;
  growth_rate?: number;
  market_position?: string;
  estimated_value_min: number;
  estimated_value_max: number;
  valuation_method: string;
  confidence_score: number;
}

/**
 * Due diligence checklist item
 */
export interface DueDiligenceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  completed_at?: string;
  notes?: string;
  documents_required: string[];
  documents_provided: string[];
}

/**
 * Due diligence checklist
 */
export interface DueDiligenceChecklist {
  id: string;
  inquiry_id: string;
  conversation_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  items: DueDiligenceItem[];
  completion_percentage: number;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// EXPORT ALL TYPES
// =============================================================================

export * from './listing';
export * from './user';
export * from './inquiry';
export * from './conversation';
// Temporarily comment out to avoid export conflicts
// export * from './api';
