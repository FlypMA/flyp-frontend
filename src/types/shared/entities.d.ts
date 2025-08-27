import { UserRole, ListingStatus, InquiryStatus, ConversationStatus, MessageType } from './enums';
/**
 * Base interface for all database entities
 */
export interface DatabaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}
/**
 * User preferences configuration
 */
export interface UserPreferences {
  language?: string;
  timezone?: string;
  email_notifications?: boolean;
  marketing_emails?: boolean;
  currency?: string;
  theme?: 'light' | 'dark' | 'system';
  [key: string]: any;
}
/**
 * Core User entity - Shared between sellers, buyers, and admins
 */
export interface User extends DatabaseEntity {
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
  last_login?: string;
  is_active?: boolean;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
}
/**
 * Organization/Business entity
 */
export interface Organization extends DatabaseEntity {
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
}
/**
 * Business Listing for M&A
 */
export interface Listing extends DatabaseEntity {
  organization_id: string;
  created_by: string;
  sector: string;
  country: string;
  region?: string;
  city?: string;
  status: ListingStatus;
  anonymous: boolean;
  requires_nda: boolean;
  featured: boolean;
  asking_price?: number;
  currency: string;
  price_negotiable: boolean;
  reason_for_sale?: string;
  preferred_timeline?: string;
  expires_at?: string;
  published_at?: string;
  translations?: ListingTranslation[];
  financials?: ListingFinancials;
  analytics?: ListingAnalytics;
  organization?: Organization;
}
/**
 * Multi-language listing content
 */
export interface ListingTranslation extends DatabaseEntity {
  listing_id: string;
  locale: string;
  title: string;
  description: string;
  summary?: string;
  highlights?: string[];
  reason_for_sale_details?: string;
}
/**
 * Financial details for listings
 */
export interface ListingFinancials extends DatabaseEntity {
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
}
/**
 * Listing performance analytics
 */
export interface ListingAnalytics extends DatabaseEntity {
  listing_id: string;
  views_count: number;
  unique_views_count: number;
  inquiries_count: number;
  saves_count: number;
  shares_count: number;
  completion_score?: number;
  quality_score?: number;
  last_activity_at?: string;
}
/**
 * Buyer inquiry to seller
 */
export interface Inquiry extends DatabaseEntity {
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
}
/**
 * Conversation between buyer and seller
 */
export interface Conversation extends DatabaseEntity {
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
}
/**
 * Individual message in conversation
 */
export interface Message extends DatabaseEntity {
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
}
/**
 * Buyer investment profile
 */
export interface BuyerProfile extends DatabaseEntity {
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
}
/**
 * Saved search for buyers
 */
export interface SavedSearch extends DatabaseEntity {
  user_id: string;
  name: string;
  search_criteria: Record<string, any>;
  alert_enabled: boolean;
  alert_frequency: string;
  last_run_at?: string;
  results_count: number;
}
/**
 * Document attached to listings
 */
export interface Document extends DatabaseEntity {
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
  access_level: 'public' | 'nda_required' | 'private';
  password_protected: boolean;
  watermarked: boolean;
  version: number;
  parent_document_id?: string;
}
/**
 * Document access tracking
 */
export interface DocumentAccess extends DatabaseEntity {
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
 * NDA record for legal compliance
 */
export interface NDARecord extends DatabaseEntity {
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
}
/**
 * User-Organization relationship
 */
export interface UserOrganization extends DatabaseEntity {
  user_id: string;
  organization_id: string;
  role: string;
  permissions: string[];
}
/**
 * Subscription plans
 */
export interface SubscriptionPlan extends DatabaseEntity {
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
}
/**
 * User subscription
 */
export interface Subscription extends DatabaseEntity {
  user_id: string;
  plan_id: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
  billing_period: string;
  price_amount: number;
  price_currency: string;
  trial_starts_at?: string;
  trial_ends_at?: string;
  current_period_start: string;
  current_period_end: string;
  canceled_at?: string;
}
/**
 * Payment record
 */
export interface Payment extends DatabaseEntity {
  user_id: string;
  subscription_id?: string;
  listing_id?: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  payment_method?: string;
  purpose: string;
  description?: string;
  receipt_url?: string;
  processed_at?: string;
  failed_at?: string;
  refunded_at?: string;
  refund_amount?: number;
}
