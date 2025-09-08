// =============================================================================
// FRONTEND LOCAL ENTITIES
// =============================================================================
// Core domain entities for the frontend application
// Independent from shared types for production reliability
// Auto-synchronized from backend entities on 2025-08-26T16:33:37.536Z
// =============================================================================

export interface DatabaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  language?: string;
  timezone?: string;
  email_notifications?: boolean;
  push_notifications?: boolean;
  marketing_emails?: boolean;
  currency?: string;
  theme?: 'light' | 'dark' | 'system';
  // For compatibility with different preference structures
  notifications?: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  [key: string]: any;
}

export interface User extends DatabaseEntity {
  email: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  locale?: string;
  phone_number?: string;
  phone?: string; // Legacy compatibility
  email_verified?: boolean;
  business_verified?: boolean;
  avatar_url?: string;
  avatar?: string; // Legacy compatibility
  last_login?: string;
  is_active?: boolean;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
  businessType?: string; // For business context
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

export interface Organization extends DatabaseEntity {
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  verified?: boolean;
  subscription_plan?: string;
  subscription_status?: string;
  trial_ends_at?: string;
  owner_id: string;
  is_active?: boolean;
  metadata?: Record<string, any>;
}

export type OrganizationRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface UserOrganization extends DatabaseEntity {
  user_id: string;
  organization_id: string;
  role: OrganizationRole;
  is_active?: boolean;
  joined_at: string;
  left_at?: string;
}

export interface Listing extends DatabaseEntity {
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
  status: ListingStatus;
  anonymous?: boolean;
  requires_nda?: boolean;
  contact_instructions?: string;
  featured?: boolean;
  featured_until?: string;
  views_count?: number;
  inquiries_count?: number;
  saves_count?: number;
  published_at?: string;
  expires_at?: string;
  locale?: string;
  metadata?: Record<string, any>;

  // Relations
  organization?: Organization;
  documents?: Document[];
  inquiries?: Inquiry[];
  analytics?: ListingAnalytics;
}

export interface Document extends DatabaseEntity {
  organization_id: string;
  listing_id?: string;
  inquiry_id?: string;
  conversation_id?: string;
  name: string;
  description?: string;
  file_path: string;
  file_size: number;
  file_type: string;
  mime_type?: string;
  is_confidential?: boolean;
  requires_nda?: boolean;
  uploaded_by: string;
  download_count?: number;
  last_accessed?: string;
  expires_at?: string;
  metadata?: Record<string, any>;
}

export interface Inquiry extends DatabaseEntity {
  listing_id: string;
  buyer_id: string;
  buyer_organization_id?: string;
  message: string;
  budget_range?: string;
  timeline?: string;
  experience?: string;
  financing_method?: string;
  status: InquiryStatus;
  responded_at?: string;
  response_message?: string;
  nda_signed?: boolean;
  nda_signed_at?: string;
  follow_up_scheduled?: string;
  priority?: 'low' | 'medium' | 'high';
  source?: string;
  metadata?: Record<string, any>;

  // Relations
  listing?: Listing;
  buyer?: User;
  conversation?: Conversation;
  documents?: Document[];
}

export interface Conversation extends DatabaseEntity {
  listing_id: string;
  inquiry_id?: string;
  buyer_id: string;
  seller_id: string;
  status: ConversationStatus;
  subject?: string;
  last_message_at?: string;
  last_message_preview?: string;
  unread_count_buyer?: number;
  unread_count_seller?: number;
  archived_by_buyer?: boolean;
  archived_by_seller?: boolean;
  priority?: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;

  // Relations
  messages?: Message[];
  listing?: Listing;
  buyer?: User;
  seller?: User;
}

export interface Message extends DatabaseEntity {
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  message_type: MessageType;
  read_at?: string;
  edited_at?: string;
  deleted_at?: string;
  reply_to_id?: string;
  attachments?: string[];
  metadata?: Record<string, any>;

  // Relations
  sender?: User;
  recipient?: User;
  attachments_docs?: Document[];
}

export interface BuyerProfile extends DatabaseEntity {
  user_id: string;
  organization_id?: string;
  budget_min?: number;
  budget_max?: number;
  preferred_sectors?: string[];
  preferred_countries?: string[];
  preferred_regions?: string[];
  experience_level?: string;
  financing_methods?: string[];
  investment_timeline?: string;
  acquisition_criteria?: string;
  background_description?: string;
  verified_funds?: boolean;
  funds_verification_date?: string;
  profile_completeness?: number;
  last_activity?: string;
  metadata?: Record<string, any>;
}

export interface SavedSearch extends DatabaseEntity {
  user_id: string;
  name: string;
  description?: string;
  search_criteria: Record<string, any>;
  email_alerts?: boolean;
  alert_frequency?: 'immediate' | 'daily' | 'weekly';
  last_run?: string;
  results_count?: number;
  is_active?: boolean;
  metadata?: Record<string, any>;
}

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

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
  BROKER = 'broker',
}

export enum ListingStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PUBLISHED = 'published',
  ACTIVE = 'active',
  PAUSED = 'paused',
  SOLD = 'sold',
  EXPIRED = 'expired',
  REJECTED = 'rejected',
  ARCHIVED = 'archived',
}

export enum InquiryStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  RESPONDED = 'responded',
  MEETING_SCHEDULED = 'meeting_scheduled',
  NDA_SENT = 'nda_sent',
  NDA_SIGNED = 'nda_signed',
  DUE_DILIGENCE = 'due_diligence',
  OFFER_MADE = 'offer_made',
  NEGOTIATING = 'negotiating',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  WITHDRAWN = 'withdrawn',
  EXPIRED = 'expired',
}

export enum ConversationStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
  CLOSED = 'closed',
}

export enum MessageType {
  TEXT = 'text',
  DOCUMENT = 'document',
  SYSTEM = 'system',
  NDA_REQUEST = 'nda_request',
  NDA_SIGNED = 'nda_signed',
  MEETING_INVITE = 'meeting_invite',
  OFFER = 'offer',
}
