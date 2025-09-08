// =============================================================================
// FRONTEND LOCAL API TYPES
// =============================================================================
// API request/response types for frontend use
// Independent from shared types for production reliability
// Auto-synchronized from backend API types on 2025-08-26T16:33:37.539Z
// =============================================================================

import {
  User,
  Organization,
  Listing,
  Document,
  Inquiry,
  Conversation,
  Message,
  BuyerProfile,
  UserPreferences as BaseUserPreferences,
  ListingAnalytics,
  UserRole,
  ListingStatus,
  InquiryStatus,
  MessageType,
} from './entities';

// Chat types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatResponse {
  message: ChatMessage;
  suggestions?: string[];
}

// User types
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  avatar?: string; // Legacy compatibility
  name?: string; // Legacy compatibility
  phone?: string; // For profile settings
  businessType?: string; // For business context
  role: UserRole;
  preferences?: UserPreferences;
  // Legacy API compatibility fields
  _id?: string;
  password?: string;
  rank?: number;
  userPreferences?: UserPreferences;
  userType?: any;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  platformId?: string;
}

// Use UserPreferences from entities to avoid conflicts
export type UserPreferences = BaseUserPreferences;

export interface PaymentMetadata {
  stripe_customer_id?: string;
  payment_method_id?: string;
  subscription_id?: string;
  last_payment_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
  has_more?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  filters_applied?: Record<string, any>;
  processing_time?: number;
  request_id?: string;
  details?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface BaseQueryParams extends PaginationParams, SortParams {
  search?: string;
  filters?: Record<string, any>;
}

export interface ErrorResponse {
  success: false;
  status: 'error';
  error: string;
  message?: string;
  timestamp: string;
  meta?: {
    code?: string;
    details?: any;
    request_id?: string;
  };
}

export interface SuccessResponse<T = any> {
  success: true;
  status: 'success';
  data: T;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

export interface AuthResponse {
  success: boolean;
  status: 'success' | 'error';
  data?: {
    user: User;
    token: string;
    refresh_token?: string;
    expires_at: string;
    organization?: Organization;
  };
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Profile response
 */
export interface ProfileResponse {
  user: User;
  organization?: Organization;
  buyer_profile?: BuyerProfile;
  preferences?: UserPreferences;
}

/**
 * Listing response
 */
export interface ListingResponse {
  success: boolean;
  status: 'success' | 'error';
  data?: {
    listing: Listing;
    organization?: Organization;
    documents?: Document[];
    can_edit?: boolean;
    can_delete?: boolean;
    analytics?: ListingAnalytics;
  };
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Listing list response
 */
export interface ListingListResponse {
  success: boolean;
  status: 'success' | 'error';
  data?: {
    listings: Listing[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
      has_more: boolean;
    };
    filters_applied?: Record<string, any>;
  };
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Inquiry response
 */
export interface InquiryResponse {
  inquiry: Inquiry;
  listing?: Listing;
  buyer?: User;
  conversation?: Conversation;
  documents?: Document[];
}

/**
 * Conversation response
 */
export interface ConversationResponse {
  conversation: Conversation;
  messages?: Message[];
  participants?: User[];
  listing?: Listing;
  unread_count?: number;
}

/**
 * Document response
 */
export interface DocumentResponse {
  document: Document;
  download_url?: string;
  preview_url?: string;
  can_download?: boolean;
  can_delete?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Response metadata
 */
export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
  has_more?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  filters_applied?: Record<string, any>;
  processing_time?: number;
  request_id?: string;
  details?: any;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

/**
 * Base query parameters
 */
export interface BaseQueryParams extends PaginationParams, SortParams {
  search?: string;
  filters?: Record<string, any>;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  success: false;
  status: 'error';
  error: string;
  message?: string;
  timestamp: string;
  meta?: {
    code?: string;
    details?: any;
    request_id?: string;
  };
}

/**
 * Success response structure
 */
export interface SuccessResponse<T = any> {
  success: true;
  status: 'success';
  data: T;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  success: boolean;
  status: 'success' | 'error';
  data?: {
    user: User;
    token: string;
    refresh_token?: string;
    expires_at: string;
    organization?: Organization;
  };
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Profile response
 */
export interface ProfileResponse {
  user: User;
  organization?: Organization;
  buyer_profile?: BuyerProfile;
  preferences?: UserPreferences;
}

/**
 * Listing response
 */
export interface ListingResponse {
  success: boolean;
  status: 'success' | 'error';
  data?: {
    listing: Listing;
    organization?: Organization;
    documents?: Document[];
    can_edit?: boolean;
    can_delete?: boolean;
    analytics?: ListingAnalytics;
  };
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Listing list response
 */
export interface ListingListResponse {
  success: boolean;
  status: 'success' | 'error';
  data?: {
    listings: Listing[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
      has_more: boolean;
    };
    filters_applied?: Record<string, any>;
  };
  error?: string;
  message?: string;
  timestamp: string;
  meta?: ResponseMeta;
}

/**
 * Inquiry response
 */
export interface InquiryResponse {
  inquiry: Inquiry;
  listing?: Listing;
  buyer?: User;
  conversation?: Conversation;
  documents?: Document[];
}

/**
 * Conversation response
 */
export interface ConversationResponse {
  conversation: Conversation;
  messages?: Message[];
  participants?: User[];
  listing?: Listing;
  unread_count?: number;
}

/**
 * Document response
 */
export interface DocumentResponse {
  document: Document;
  download_url?: string;
  preview_url?: string;
  can_download?: boolean;
  can_delete?: boolean;
}

// Request types

/**
 * Login request
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
  locale?: string;
  organization_name?: string;
}

/**
 * Create listing request
 */
export interface CreateListingRequest {
  organization_id: string;
  title: string;
  description?: string;
  asking_price?: number;
  revenue?: number;
  profit?: number;
  employees?: number;
  established_year?: number;
  country: string;
  region?: string;
  city?: string;
  sector?: string;
  industry?: string;
  business_model?: string;
  assets_included?: string[];
  liabilities?: number;
  reason_for_sale?: string;
  growth_opportunities?: string;
  challenges?: string;
  financials_description?: string;
  anonymous?: boolean;
  requires_nda?: boolean;
  contact_instructions?: string;
  locale?: string;
  featured?: boolean;
  currency?: string;
  price_negotiable?: boolean;
  preferred_timeline?: string;
  expires_at?: string;
  translations?: any[];
  financials?: any;
}

/**
 * Update listing request
 */
export interface UpdateListingRequest extends Partial<CreateListingRequest> {
  status?: ListingStatus;
  featured?: boolean;
  featured_until?: string;
  expires_at?: string;
  updated_at?: string;
}

/**
 * Listing search request
 */
export interface ListingSearchRequest extends BaseQueryParams {
  country?: string;
  region?: string;
  sector?: string;
  industry?: string;
  revenue_min?: number;
  revenue_max?: number;
  revenueMin?: number;
  revenueMax?: number;
  asking_price_min?: number;
  asking_price_max?: number;
  askingPriceMin?: number;
  askingPriceMax?: number;
  employees_min?: number;
  employees_max?: number;
  established_year_min?: number;
  established_year_max?: number;
  anonymous?: boolean;
  requires_nda?: boolean;
  requiresNda?: boolean;
  featured_only?: boolean;
  featured?: boolean;
  status?: ListingStatus[];
  business_model?: string[];
  locale?: string;
  searchQuery?: string;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Create inquiry request
 */
export interface CreateInquiryRequest {
  listing_id: string;
  message: string;
  budget_range?: string;
  timeline?: string;
  experience?: string;
  financing_method?: string;
}

/**
 * Update inquiry request
 */
export interface UpdateInquiryRequest {
  status?: InquiryStatus;
  response_message?: string;
  follow_up_scheduled?: string;
  priority?: 'low' | 'medium' | 'high';
}

/**
 * Create message request
 */
export interface CreateMessageRequest {
  conversation_id: string;
  content: string;
  message_type?: MessageType;
  reply_to_id?: string;
  attachments?: string[];
}

/**
 * Update user profile request
 */
export interface UpdateProfileRequest {
  name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar_url?: string;
  preferences?: UserPreferences;
  locale?: string;
}

/**
 * Document upload request
 */
export interface DocumentUploadRequest {
  name: string;
  description?: string;
  listing_id?: string;
  inquiry_id?: string;
  conversation_id?: string;
  is_confidential?: boolean;
  requires_nda?: boolean;
  expires_at?: string;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  PENDING = 'pending',
  PROCESSING = 'processing',
}

// Types are already exported above - no need to re-export
