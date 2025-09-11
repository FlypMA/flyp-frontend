// 🏢 Core M&A Platform Entities
// Location: src/shared/types/entities.ts
// Purpose: Backend-aligned entity definitions for BetweenDeals M&A platform

// =============================================================================
// CORE BUSINESS ENTITIES
// =============================================================================

export interface Business {
  id: string;
  name: string;
  description: string;
  industry: string;
  revenue: number;
  valuation?: number;
  status: BusinessStatus;
  seller_id: string;
  location: {
    country: string;
    region: string;
    city: string;
  };
  metrics: {
    employees: number;
    founded_year: number;
    revenue_growth: number;
    profit_margin: number;
  };
  documents: {
    financials: boolean;
    legal: boolean;
    operational: boolean;
    tax: boolean;
  };
  created_at: string;
  updated_at: string;
}

export type BusinessStatus = 'draft' | 'active' | 'for-sale' | 'under-offer' | 'sold' | 'withdrawn';

// =============================================================================
// TRANSACTION ENTITIES
// =============================================================================

export interface Transaction {
  id: string;
  business_id: string;
  buyer_id: string;
  seller_id: string;
  status: TransactionStatus;
  offer_amount?: number;
  offer_date?: string;
  due_diligence_deadline?: string;
  closing_date?: string;
  terms: {
    payment_structure: string;
    earnout_terms?: string;
    conditions: string[];
  };
  created_at: string;
  updated_at: string;
}

export type TransactionStatus =
  | 'inquiry'
  | 'offer-submitted'
  | 'offer-accepted'
  | 'due-diligence'
  | 'negotiation'
  | 'closing'
  | 'closed'
  | 'cancelled';

// =============================================================================
// VALUATION ENTITIES
// =============================================================================

export interface Valuation {
  id: string;
  business_id: string;
  valuation_amount: number;
  currency: string;
  method: ValuationMethod;
  confidence_level: 'low' | 'medium' | 'high';
  factors: {
    revenue_multiple: number;
    ebitda_multiple: number;
    growth_rate: number;
    market_conditions: string;
  };
  created_by: string; // User ID who created
  approved_by?: string; // Professional valuator ID
  is_official: boolean;
  created_at: string;
  updated_at: string;
}

export type ValuationMethod =
  | 'dcf'
  | 'comparable-company'
  | 'asset-based'
  | 'revenue-multiple'
  | 'ebitda-multiple';

// =============================================================================
// USER ENTITIES (Extended)
// =============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profile: UserProfile;
  preferences: UserPreferences;
  subscription: {
    plan: 'free' | 'basic' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
    expires_at?: string;
  };
  created_at: string;
  updated_at: string;
}

export type UserRole = 'buyer' | 'seller' | 'advisor' | 'admin';

export interface UserProfile {
  first_name: string;
  last_name: string;
  company?: string;
  phone?: string;
  location: {
    country: string;
    region?: string;
    city?: string;
  };
  experience: {
    years_in_ma: number;
    completed_transactions: number;
    total_transaction_value: number;
  };
  verification: {
    identity_verified: boolean;
    accredited_investor: boolean;
    professional_credentials?: string[];
  };
}

export interface UserPreferences {
  industries: string[];
  revenue_range: {
    min: number;
    max: number;
  };
  location_preferences: string[];
  investment_timeline: 'immediate' | '3-months' | '6-months' | '12-months+';
  communication: {
    email_notifications: boolean;
    sms_notifications: boolean;
    weekly_digest: boolean;
  };
}

// =============================================================================
// DOCUMENT ENTITIES
// =============================================================================

export interface Document {
  id: string;
  business_id: string;
  name: string;
  type: DocumentType;
  category: DocumentCategory;
  file_url: string;
  file_size: number;
  file_type: string; // MIME type
  access_level: DocumentAccessLevel;
  uploaded_by: string; // User ID
  uploaded_at: string;
  expires_at?: string;
}

export type DocumentType =
  | 'financial'
  | 'legal'
  | 'operational'
  | 'tax'
  | 'marketing'
  | 'hr'
  | 'other';

export type DocumentCategory =
  | 'profit-loss'
  | 'balance-sheet'
  | 'cash-flow'
  | 'tax-returns'
  | 'contracts'
  | 'licenses'
  | 'legal-documents'
  | 'operational-procedures'
  | 'employee-handbook'
  | 'marketing-materials';

export type DocumentAccessLevel =
  | 'public'
  | 'registered'
  | 'inquiry'
  | 'due-diligence'
  | 'offer'
  | 'private';

// =============================================================================
// INQUIRY ENTITIES
// =============================================================================

export interface Inquiry {
  id: string;
  business_id: string;
  buyer_id: string;
  status: InquiryStatus;
  message: string;
  questions: InquiryQuestion[];
  seller_response?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export type InquiryStatus = 'pending' | 'responded' | 'follow-up' | 'converted' | 'closed';

export interface InquiryQuestion {
  id: string;
  category: string;
  question: string;
  answer?: string;
  is_required: boolean;
}

// =============================================================================
// MESSAGING ENTITIES
// =============================================================================

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  business_id?: string; // Related business if applicable
  transaction_id?: string; // Related transaction if applicable
  status: ConversationStatus;
  last_message?: Message;
  created_at: string;
  updated_at: string;
}

export type ConversationStatus = 'active' | 'archived' | 'blocked';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  attachments?: MessageAttachment[];
  read_by: string[]; // User IDs who have read
  sent_at: string;
}

export type MessageType = 'text' | 'document' | 'offer' | 'system';

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// =============================================================================
// ANALYTICS ENTITIES
// =============================================================================

export interface ListingAnalytics {
  listing_id: string;
  views: {
    total: number;
    unique: number;
    this_week: number;
    this_month: number;
  };
  inquiries: {
    total: number;
    pending: number;
    responded: number;
    conversion_rate: number;
  };
  engagement: {
    document_downloads: number;
    favorite_saves: number;
    share_count: number;
  };
  demographics: {
    buyer_locations: Array<{ country: string; count: number }>;
    buyer_experience: Array<{ level: string; count: number }>;
  };
}

// =============================================================================
// SEARCH & FILTER ENTITIES
// =============================================================================

export interface SearchCriteria {
  query?: string;
  industries: string[];
  revenue_range: {
    min: number;
    max: number;
  };
  valuation_range: {
    min: number;
    max: number;
  };
  locations: string[];
  business_status: BusinessStatus[];
  sort_by: 'relevance' | 'price' | 'revenue' | 'updated_at';
  sort_order: 'asc' | 'desc';
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// =============================================================================
// COMMON UTILITY TYPES
// =============================================================================

export type UUID = string;
export type Timestamp = string;
export type Currency = 'EUR' | 'USD' | 'GBP';

// =============================================================================
// EXPORT ALL FOR EASY IMPORTING
// =============================================================================

export type {
  // Re-export for convenience
  Business as BusinessEntity,
  Transaction as TransactionEntity,
  Valuation as ValuationEntity,
  User as UserEntity,
  Document as DocumentEntity,
  Inquiry as InquiryEntity,
  Conversation as ConversationEntity,
  Message as MessageEntity,
};
