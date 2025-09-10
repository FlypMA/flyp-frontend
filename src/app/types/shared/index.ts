// =============================================================================
// BETWEENDEALS.COM SHARED TYPE DEFINITIONS
// =============================================================================
// Comprehensive TypeScript types for SME M&A platform
// Shared between frontend and backend for type safety
// =============================================================================

// =============================================================================
// USER SYSTEM - SINGLE SOURCE OF TRUTH
// =============================================================================

// Import ALL user-related types from consolidated system
export {
  UserRole,
  isSellerUser,
  isBuyerUser,
  isAdminUser,
  hasBusinessInfo,
  isVerifiedUser,
  normalizeUserRole,
  getUserRole,
  USER_ROLES,
  DEFAULT_USER_VALUES,
  convertLegacyUser,
  needsLegacyConversion,
} from '../../../types/user.consolidated';

// Import types with proper naming to avoid conflicts
export type {
  User,
  UserRoleString,
  UserType,
  UserProfile,
  UserPreferences,
  AuthResult,
  AuthResponse,
  AuthCheckResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  UpdateBusinessInfoRequest,
  RoleToggleRequest,
  UserResponse,
  UsersListResponse,
  Country,
  Language,
  AuthProvider,
} from '../../../types/user.consolidated';

// Import User as a local type for interface usage
import type { User as UserType } from '../../../types/user.consolidated';

// =============================================================================
// BUSINESS LOGIC ENUMS
// =============================================================================

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

export enum TransactionStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// =============================================================================
// BUSINESS ENTITIES
// =============================================================================

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
 * Business Listing - Core marketplace entity
 */
export interface Listing {
  id: string;
  title: string;
  description: string;
  owner_id: string;
  organization_id?: string;

  // Business Details
  asking_price: number;
  currency: string;
  sector: string;
  employee_count?: number;
  annual_revenue?: number;
  profit_margin?: number;

  // Location
  country: string;
  region?: string;
  city?: string;

  // Status and Visibility
  status: ListingStatus;
  visibility: 'public' | 'private' | 'nda_required';
  featured: boolean;

  // Media and Documents
  images?: string[];
  documents?: Document[];

  // SEO and Discovery
  tags: string[];
  keywords?: string[];

  // Metrics
  view_count: number;
  inquiry_count: number;
  favorite_count: number;

  // Timestamps
  created_at: string;
  updated_at: string;
  published_at?: string;
  expires_at?: string;
}

/**
 * Inquiry - Buyer interest in a listing
 */
export interface Inquiry {
  id: string;
  listing_id: string;
  buyer?: UserType;
  seller?: UserType;

  // Inquiry Details
  message: string;
  proposed_price?: number;
  financing_type?: 'cash' | 'financed' | 'mixed';
  timeline?: string;

  // Status
  status: InquiryStatus;
  priority: 'low' | 'medium' | 'high';

  // Communication
  conversation_id?: string;

  // Timestamps
  created_at: string;
  updated_at: string;
  responded_at?: string;
  expires_at?: string;
}

/**
 * Conversation - Communication between users
 */
export interface Conversation {
  id: string;
  participants: string[]; // User IDs

  // Context
  listing_id?: string;
  inquiry_id?: string;
  subject?: string;

  // Status
  status: ConversationStatus;
  last_message_at?: string;

  // Metadata
  unread_counts: Record<string, number>; // userId -> unread count
  archived_by: string[]; // User IDs who archived

  // Timestamps
  created_at: string;
  updated_at: string;
}

/**
 * Message - Individual message in a conversation
 */
export interface Message {
  id: string;
  conversation_id: string;
  sender?: UserType;

  // Content
  type: MessageType;
  content: string;
  attachments?: Attachment[];

  // Status
  read_by: Record<string, string>; // userId -> timestamp
  edited_at?: string;

  // Timestamps
  created_at: string;
  updated_at: string;
}

/**
 * Document - File attachments
 */
export interface Document {
  id: string;
  filename: string;
  original_name: string;
  size: number;
  mime_type: string;

  // Access Control
  access_level: DocumentAccessLevel;
  owner_id: string;

  // Context
  listing_id?: string;
  conversation_id?: string;

  // Metadata
  description?: string;
  category?: string;

  // Timestamps
  created_at: string;
  updated_at: string;
}

/**
 * Attachment - Message attachments
 */
export interface Attachment {
  id: string;
  filename: string;
  size: number;
  mime_type: string;
  url: string;
  thumbnail_url?: string;

  // Metadata
  description?: string;

  created_at: string;
}

/**
 * Subscription - User subscription plans
 */
export interface Subscription {
  id: string;
  user_id: string;

  // Plan Details
  plan_id: string;
  plan_name: string;

  // Status
  status: SubscriptionStatus;

  // Billing
  current_period_start: string;
  current_period_end: string;

  // Timestamps
  created_at: string;
  updated_at: string;
  cancelled_at?: string;
}

/**
 * Transaction - Financial transactions
 */
export interface Transaction {
  id: string;
  user_id: string;

  // Transaction Details
  type: 'subscription' | 'listing_fee' | 'commission';
  amount: number;
  currency: string;
  description: string;

  // Status
  status: TransactionStatus;

  // Payment
  payment_method?: string;
  payment_id?: string;

  // References
  listing_id?: string;
  subscription_id?: string;

  // Timestamps
  created_at: string;
  updated_at: string;
  processed_at?: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export interface DatabaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  location?: string;
  price_min?: number;
  price_max?: number;
  [key: string]: any;
}

export interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
  listing_alerts: boolean;
  inquiry_notifications: boolean;
  conversation_notifications: boolean;
}

export interface PrivacySettings {
  profile_visibility: 'public' | 'private';
  show_contact_info: boolean;
  allow_direct_messages: boolean;
  data_collection_consent: boolean;
}

export interface UserContext {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  permissions: string[];
}

// =============================================================================
// FORM AND VALIDATION TYPES
// =============================================================================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormState<T> {
  data: Partial<T>;
  errors: ValidationError[];
  loading: boolean;
  submitted: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  url?: string;
}

// =============================================================================
// ANALYTICS AND METRICS
// =============================================================================

export interface UserMetrics {
  user_id: string;
  total_listings: number;
  active_listings: number;
  total_inquiries_sent: number;
  total_inquiries_received: number;
  response_rate: number;
  average_response_time: number;
  profile_completion: number;
  last_activity: string;
}

export interface ListingMetrics {
  listing_id: string;
  total_views: number;
  unique_views: number;
  total_inquiries: number;
  qualified_inquiries: number;
  conversion_rate: number;
  average_time_on_page: number;
  bounce_rate: number;
  favorite_rate: number;
}

export interface PlatformMetrics {
  total_users: number;
  active_users: number;
  total_listings: number;
  active_listings: number;
  total_transactions: number;
  revenue: number;
  growth_rate: number;
  user_satisfaction: number;
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

export interface ErrorDetails {
  code: string;
  message: string;
  field?: string;
  context?: Record<string, any>;
}

export interface ValidationResult {
  valid: boolean;
  errors: ErrorDetails[];
}

export interface ApiError extends Error {
  status: number;
  code: string;
  details?: ErrorDetails[];
}

// =============================================================================
// FEATURE FLAGS
// =============================================================================

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description: string;
  audience?: string[];
  rollout_percentage?: number;
}

export interface FeatureFlags {
  [key: string]: boolean;
}

// =============================================================================
// EXPORTS
// =============================================================================

// Re-export commonly used types for convenience
export type {
  DatabaseEntity as BaseEntity,
  PaginatedResponse as PaginatedResp,
  ApiResponse as ApiResp,
  ValidationError as ValidationErr,
  ErrorDetails as ErrorDet,
  SelectOption as SelectOpt,
};
