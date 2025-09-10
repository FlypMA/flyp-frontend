// =============================================================================
// API CONTRACT TYPES
// =============================================================================
// Request/Response interfaces for all API endpoints
// Ensures type safety between frontend and backend
// =============================================================================

import {
  User,
  Listing,
  Inquiry,
  Conversation,
  Organization,
  Document,
  UserProfile as BuyerProfile,
  // any // TODO: Define SavedSearch, // TODO: Define any // TODO: Define SavedSearch interface
  Subscription,
  // Payment, // TODO: Define Payment interface
  UserRole,
  ListingStatus,
  InquiryStatus,
  ConversationStatus,
  // { page: number; limit: number; total: number; pages: number; }, // TODO: Define { page: number; limit: number; total: number; pages: number; } interface
} from './index';

// =============================================================================
// AUTHENTICATION API TYPES
// =============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  error?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  locale?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  error?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

// =============================================================================
// USER API TYPES
// =============================================================================

export interface GetUserProfileResponse {
  success: boolean;
  data?: User;
  error?: string;
}

export interface UpdateUserProfileRequest {
  name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  locale?: string;
  preferences?: Record<string, any>;
}

export interface UpdateUserProfileResponse {
  success: boolean;
  data?: User;
  message?: string;
  error?: string;
}

export interface GetUserOrganizationsResponse {
  success: boolean;
  data?: Array<{
    role: string;
    permissions: string[];
    created_at: string;
    organization: Organization;
  }>;
  error?: string;
}

// =============================================================================
// LISTING API TYPES
// =============================================================================

export interface GetListingsRequest {
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

export interface GetListingsResponse {
  success: boolean;
  data?: Listing[];
  meta?: {
    pagination: { page: number; limit: number; total: number; pages: number };
  };
  error?: string;
}

export interface GetListingResponse {
  success: boolean;
  data?: Listing;
  error?: string;
}

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
  financials?: {
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
  };
}

export interface CreateListingResponse {
  success: boolean;
  data?: Listing;
  message?: string;
  error?: string;
}

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

export interface UpdateListingResponse {
  success: boolean;
  data?: Listing;
  message?: string;
  error?: string;
}

export interface PublishListingResponse {
  success: boolean;
  data?: Listing;
  message?: string;
  error?: string;
}

export interface GetListingAnalyticsResponse {
  success: boolean;
  data?: {
    views_count: number;
    unique_views_count: number;
    inquiries_count: number;
    saves_count: number;
    shares_count: number;
    completion_score?: number;
    quality_score?: number;
  };
  error?: string;
}

// =============================================================================
// INQUIRY API TYPES
// =============================================================================

export interface GetInquiriesRequest {
  page?: number;
  limit?: number;
  status?: InquiryStatus;
  listing_id?: string;
  buyer_id?: string;
  seller_id?: string;
}

export interface GetInquiriesResponse {
  success: boolean;
  data?: Inquiry[];
  meta?: {
    pagination: { page: number; limit: number; total: number; pages: number };
  };
  error?: string;
}

export interface GetInquiryResponse {
  success: boolean;
  data?: Inquiry;
  error?: string;
}

export interface CreateInquiryRequest {
  listing_id: string;
  message: string;
  buyer_background?: string;
  intended_use?: string;
  financing_confirmed: boolean;
  nda_required?: boolean;
}

export interface CreateInquiryResponse {
  success: boolean;
  data?: Inquiry;
  message?: string;
  error?: string;
}

export interface UpdateInquiryRequest {
  status?: InquiryStatus;
  seller_response?: string;
}

export interface UpdateInquiryResponse {
  success: boolean;
  data?: Inquiry;
  message?: string;
  error?: string;
}

export interface AcceptInquiryResponse {
  success: boolean;
  data?: {
    inquiry: Inquiry;
    conversation: Conversation;
  };
  message?: string;
  error?: string;
}

// =============================================================================
// CONVERSATION API TYPES
// =============================================================================

export interface GetConversationsRequest {
  page?: number;
  limit?: number;
  status?: ConversationStatus;
  listing_id?: string;
}

export interface GetConversationsResponse {
  success: boolean;
  data?: Conversation[];
  meta?: {
    pagination: { page: number; limit: number; total: number; pages: number };
  };
  error?: string;
}

export interface GetConversationResponse {
  success: boolean;
  data?: Conversation;
  error?: string;
}

export interface GetConversationMessagesRequest {
  page?: number;
  limit?: number;
  before?: string; // Message ID for pagination
}

export interface GetConversationMessagesResponse {
  success: boolean;
  data?: Array<{
    id: string;
    sender_id: string;
    content: string;
    message_type: string;
    sent_at: string;
    read_at?: string;
    sender: User;
  }>;
  meta?: {
    pagination: { page: number; limit: number; total: number; pages: number };
  };
  error?: string;
}

export interface SendMessageRequest {
  content: string;
  message_type?: 'text' | 'document';
  reply_to_id?: string;
  attachments?: string[]; // Document IDs
}

export interface SendMessageResponse {
  success: boolean;
  data?: {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    message_type: string;
    sent_at: string;
  };
  error?: string;
}

// =============================================================================
// ORGANIZATION API TYPES
// =============================================================================

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

export interface CreateOrganizationResponse {
  success: boolean;
  data?: Organization;
  message?: string;
  error?: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  business_type?: string;
  website?: string;
  description?: string;
  contact_info?: Record<string, any>;
}

export interface UpdateOrganizationResponse {
  success: boolean;
  data?: Organization;
  message?: string;
  error?: string;
}

// =============================================================================
// DOCUMENT API TYPES
// =============================================================================

export interface UploadDocumentRequest {
  listing_id: string;
  file: File;
  document_type?: string;
  category?: string;
  description?: string;
  access_level: 'public' | 'nda_required' | 'private';
}

export interface UploadDocumentResponse {
  success: boolean;
  data?: Document;
  message?: string;
  error?: string;
}

export interface GetDocumentsRequest {
  listing_id?: string;
  access_level?: string;
  document_type?: string;
}

export interface GetDocumentsResponse {
  success: boolean;
  data?: Document[];
  error?: string;
}

export interface DownloadDocumentResponse {
  success: boolean;
  download_url?: string;
  expires_at?: string;
  error?: string;
}

// =============================================================================
// SEARCH API TYPES
// =============================================================================

export interface SaveSearchRequest {
  name: string;
  search_criteria: Record<string, any>;
  alert_enabled: boolean;
  alert_frequency: string;
}

export interface SaveSearchResponse {
  success: boolean;
  data?: any; // TODO: Define SavedSearch
  message?: string;
  error?: string;
}

export interface GetSavedSearchesResponse {
  success: boolean;
  data?: any[]; // TODO: Define SavedSearch
  error?: string;
}

export interface UpdateBuyerProfileRequest {
  target_sectors?: string[];
  target_countries?: string[];
  target_regions?: string[];
  budget_min?: number;
  budget_max?: number;
  budget_currency?: string;
  preferred_business_age_min?: number;
  preferred_business_age_max?: number;
  investment_timeline?: string;
  involvement_level?: string;
  experience_level?: string;
  risk_tolerance?: string;
}

export interface UpdateBuyerProfileResponse {
  success: boolean;
  data?: BuyerProfile;
  message?: string;
  error?: string;
}

// =============================================================================
// BILLING API TYPES
// =============================================================================

export interface GetSubscriptionResponse {
  success: boolean;
  data?: Subscription;
  error?: string;
}

export interface CreateCheckoutSessionRequest {
  plan_id: string;
  billing_period: 'monthly' | 'yearly';
  success_url: string;
  cancel_url: string;
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  checkout_url?: string;
  session_id?: string;
  error?: string;
}

export interface CreatePortalSessionRequest {
  return_url: string;
}

export interface CreatePortalSessionResponse {
  success: boolean;
  portal_url?: string;
  error?: string;
}

export interface GetPaymentsRequest {
  page?: number;
  limit?: number;
  status?: string;
  purpose?: string;
}

export interface GetPaymentsResponse {
  success: boolean;
  data?: any[]; // TODO: Define Payment;
  meta?: {
    pagination: { page: number; limit: number; total: number; pages: number };
  };
  error?: string;
}

// =============================================================================
// ADMIN API TYPES
// =============================================================================

export interface GetAllUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}

export interface GetAllUsersResponse {
  success: boolean;
  data?: User[];
  meta?: {
    pagination: { page: number; limit: number; total: number; pages: number };
  };
  error?: string;
}

export interface ApproveListingRequest {
  status: ListingStatus;
  admin_notes?: string;
}

export interface ApproveListingResponse {
  success: boolean;
  data?: Listing;
  message?: string;
  error?: string;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
  timestamp?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationErrorResponse {
  success: false;
  error: string;
  errors: ValidationError[];
}

// =============================================================================
// WEBSOCKET TYPES
// =============================================================================

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

export interface ConversationMessageEvent {
  type: 'conversation_message';
  data: {
    conversation_id: string;
    message: {
      id: string;
      sender_id: string;
      content: string;
      sent_at: string;
      sender: User;
    };
  };
}

export interface InquiryStatusEvent {
  type: 'inquiry_status_update';
  data: {
    inquiry_id: string;
    status: InquiryStatus;
    updated_by: string;
  };
}

export interface ListingViewEvent {
  type: 'listing_view';
  data: {
    listing_id: string;
    viewer_id?: string;
    timestamp: string;
  };
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Type helper for API endpoint configuration
 */
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  authenticated: boolean;
  roles?: UserRole[];
}

/**
 * Type helper for API service methods
 */
export interface ApiServiceConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  headers: Record<string, string>;
}

/**
 * Generic list response
 */
export interface ListResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    pagination: { page: number; limit: number; total: number; pages: number };
    total: number;
  };
  error?: string;
}

/**
 * Generic single item response
 */
export interface ItemResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Generic success response
 */
export interface SuccessResponse {
  success: boolean;
  message?: string;
  error?: string;
}
