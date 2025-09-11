import { UserRole, ListingStatus, InquiryStatus } from './enums';
import { BaseQueryParams } from './api';
export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  locale?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  terms_accepted: boolean;
  marketing_consent?: boolean;
}
export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface PasswordResetRequest {
  email: string;
}
export interface ResetPasswordRequest {
  email: string;
}
export interface PasswordResetConfirmRequest {
  token: string;
  new_password: string;
}
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}
export interface UpdateUserProfileRequest {
  name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  locale?: string;
  preferences?: Record<string, any>;
  avatar_url?: string;
}
export interface UpdateUserPreferencesRequest {
  language?: string;
  timezone?: string;
  email_notifications?: boolean;
  marketing_emails?: boolean;
  currency?: string;
  theme?: 'light' | 'dark' | 'system';
}
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
export interface UpdateOrganizationRequest {
  name?: string;
  business_type?: string;
  registration_number?: string;
  tax_id?: string;
  country?: string;
  region?: string;
  city?: string;
  website?: string;
  description?: string;
  contact_info?: Record<string, any>;
}
export interface CreateListingRequest {
  organization_id: string;
  sector: string;
  country: string;
  region?: string;
  city?: string;
  anonymous?: boolean;
  requires_nda?: boolean;
  featured?: boolean;
  asking_price?: number;
  currency: string;
  price_negotiable?: boolean;
  reason_for_sale?: string;
  preferred_timeline?: string;
  expires_at?: string;
  translations: {
    locale: string;
    title: string;
    description: string;
    summary?: string;
    highlights?: string[];
    reason_for_sale_details?: string;
  }[];
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
export interface UpdateListingRequest {
  sector?: string;
  country?: string;
  region?: string;
  city?: string;
  status?: ListingStatus;
  anonymous?: boolean;
  requires_nda?: boolean;
  featured?: boolean;
  asking_price?: number;
  currency?: string;
  price_negotiable?: boolean;
  reason_for_sale?: string;
  preferred_timeline?: string;
  expires_at?: string;
}
export interface UpdateListingTranslationRequest {
  locale: string;
  title?: string;
  description?: string;
  summary?: string;
  highlights?: string[];
  reason_for_sale_details?: string;
}
export interface UpdateListingFinancialsRequest {
  revenue_min?: number;
  revenue_max?: number;
  revenue_currency?: string;
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
}
export interface ListingSearchRequest extends BaseQueryParams {
  country?: string;
  region?: string;
  sector?: string;
  revenueMin?: number;
  revenueMax?: number;
  askingPriceMin?: number;
  askingPriceMax?: number;
  anonymous?: boolean;
  requiresNda?: boolean;
  featured?: boolean;
  status?: ListingStatus;
  locale?: string;
  yearsInBusinessMin?: number;
  yearsInBusinessMax?: number;
  searchQuery?: string;
}
export interface CreateInquiryRequest {
  listing_id: string;
  message: string;
  buyer_background?: string;
  intended_use?: string;
  financing_confirmed: boolean;
  nda_required?: boolean;
}
export interface RespondToInquiryRequest {
  status: InquiryStatus;
  seller_response?: string;
  nda_required?: boolean;
}
export interface UpdateInquiryRequest {
  status?: InquiryStatus;
  message?: string;
  buyer_background?: string;
  intended_use?: string;
  financing_confirmed?: boolean;
}
export interface CreateConversationRequest {
  inquiry_id: string;
  subject?: string;
  initial_message?: string;
}
export interface SendMessageRequest {
  content: string;
  message_type?: 'text' | 'document' | 'system';
  reply_to_id?: string;
  attachments?: string[];
}
export interface UpdateConversationRequest {
  status?: 'active' | 'archived' | 'completed';
  subject?: string;
}
export interface UploadDocumentRequest {
  listing_id: string;
  filename: string;
  file_size: number;
  mime_type: string;
  document_type?: string;
  category?: string;
  description?: string;
  access_level: 'public' | 'nda_required' | 'private';
  password_protected?: boolean;
}
export interface UpdateDocumentRequest {
  filename?: string;
  document_type?: string;
  category?: string;
  description?: string;
  access_level?: 'public' | 'nda_required' | 'private';
  password_protected?: boolean;
}
export interface GrantDocumentAccessRequest {
  user_id: string;
  expires_at?: string;
}
export interface CreateSavedSearchRequest {
  name: string;
  search_criteria: Record<string, any>;
  alert_enabled?: boolean;
  alert_frequency?: string;
}
export interface UpdateSavedSearchRequest {
  name?: string;
  search_criteria?: Record<string, any>;
  alert_enabled?: boolean;
  alert_frequency?: string;
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
  preferred_employee_count_min?: number;
  preferred_employee_count_max?: number;
  investment_timeline?: string;
  involvement_level?: string;
  experience_level?: string;
  risk_tolerance?: string;
  contact_preferences?: Record<string, any>;
}
export interface SignNDARequest {
  conversation_id: string;
  terms_version: string;
  ip_address: string;
  user_agent: string;
}
export interface CreateSubscriptionRequest {
  plan_id: string;
  billing_period: 'monthly' | 'yearly';
  payment_method_id: string;
}
export interface UpdateSubscriptionRequest {
  plan_id?: string;
  billing_period?: 'monthly' | 'yearly';
}
export interface CreatePaymentRequest {
  amount: number;
  currency: string;
  purpose: string;
  description?: string;
  payment_method_id: string;
  listing_id?: string;
}
export interface AdminUserListRequest extends BaseQueryParams {
  role?: UserRole;
  email_verified?: boolean;
  business_verified?: boolean;
  is_active?: boolean;
  created_after?: string;
  created_before?: string;
}
export interface AdminUpdateUserRequest {
  role?: UserRole;
  email_verified?: boolean;
  business_verified?: boolean;
  is_active?: boolean;
  preferences?: Record<string, any>;
}
export interface AdminListingModerationRequest {
  status?: ListingStatus;
  reason?: string;
  notes?: string;
}
