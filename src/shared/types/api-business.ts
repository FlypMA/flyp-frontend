/**
 * 🏢 Business API Types - flyp MVP
 *
 * Business-specific API type definitions for listings, valuations,
 * transactions, and M&A operations.
 *
 * @author Senior CTO
 * @version 1.0.0
 */

import { ApiResponse, PaginatedResponse, PaginationParams } from './api';

// =============================================================================
// BUSINESS LISTING TYPES
// =============================================================================

/**
 * Business Listing Entity
 */
export interface BusinessListing {
  id: string;
  title: string;
  description: string;
  industry: string;
  location: {
    country: string;
    region: string;
    city: string;
  };
  financials: {
    askingPrice: number;
    revenue: number;
    ebitda?: number;
    netIncome?: number;
    currency: string;
  };
  assets: {
    images: string[];
    documents: string[];
    videos?: string[];
  };
  seller: {
    id: string;
    name: string;
    verified: boolean;
  };
  status: 'draft' | 'active' | 'sold' | 'withdrawn';
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  inquiryCount: number;
  featured: boolean;
  tags: string[];
}

/**
 * Create Listing Request
 */
export interface CreateListingRequest {
  title: string;
  description: string;
  industry: string;
  location: {
    country: string;
    region: string;
    city: string;
  };
  financials: {
    askingPrice: number;
    revenue: number;
    ebitda?: number;
    netIncome?: number;
    currency: string;
  };
  assets?: {
    images?: string[];
    documents?: string[];
    videos?: string[];
  };
  tags?: string[];
}

/**
 * Update Listing Request
 */
export interface UpdateListingRequest extends Partial<CreateListingRequest> {
  status?: BusinessListing['status'];
}

/**
 * Listing Search Parameters
 */
export interface ListingSearchParams extends PaginationParams {
  industry?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  status?: BusinessListing['status'];
  featured?: boolean;
}

/**
 * Listing Analytics
 */
export interface ListingAnalytics {
  listingId: string;
  views: {
    total: number;
    unique: number;
    daily: Array<{ date: string; count: number }>;
  };
  inquiries: {
    total: number;
    pending: number;
    responded: number;
  };
  performance: {
    conversionRate: number;
    averageTimeOnPage: number;
    bounceRate: number;
  };
}

// =============================================================================
// VALUATION TYPES
// =============================================================================

/**
 * Business Valuation Request
 */
export interface ValuationRequest {
  businessType: string;
  industry: string;
  revenue: number;
  ebitda?: number;
  netIncome?: number;
  assets?: number;
  liabilities?: number;
  employees?: number;
  yearEstablished?: number;
  location: string;
  growthRate?: number;
  marketConditions?: 'excellent' | 'good' | 'fair' | 'poor';
}

/**
 * Business Valuation Result
 */
export interface ValuationResult {
  id: string;
  estimatedValue: {
    low: number;
    mid: number;
    high: number;
    currency: string;
  };
  methodology: {
    approach: string;
    multiples: Record<string, number>;
    adjustments: Array<{
      factor: string;
      impact: number;
      description: string;
    }>;
  };
  confidence: 'low' | 'medium' | 'high';
  reportUrl?: string;
  createdAt: string;
  expiresAt: string;
}

// =============================================================================
// TRANSACTION TYPES
// =============================================================================

/**
 * Transaction Status
 */
export type TransactionStatus =
  | 'inquiry'
  | 'nda_signed'
  | 'due_diligence'
  | 'offer_made'
  | 'negotiation'
  | 'closing'
  | 'completed'
  | 'cancelled';

/**
 * Transaction Entity
 */
export interface Transaction {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: TransactionStatus;
  timeline: Array<{
    status: TransactionStatus;
    timestamp: string;
    notes?: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
    uploadedBy: string;
  }>;
  offers: Array<{
    id: string;
    amount: number;
    currency: string;
    terms: string;
    createdAt: string;
    status: 'pending' | 'accepted' | 'rejected' | 'countered';
  }>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Inquiry Request
 */
export interface CreateInquiryRequest {
  listingId: string;
  message: string;
  buyerInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  financialCapacity?: {
    budget: number;
    financing: 'cash' | 'loan' | 'investor' | 'mixed';
  };
}

/**
 * NDA Request
 */
export interface NDARequest {
  transactionId: string;
  buyerName: string;
  buyerEmail: string;
  buyerAddress: string;
  agreementType: 'standard' | 'mutual';
}

// =============================================================================
// DUE DILIGENCE TYPES
// =============================================================================

/**
 * Due Diligence Category
 */
export interface DueDiligenceCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  documents: Array<{
    id: string;
    name: string;
    description: string;
    required: boolean;
    uploaded: boolean;
    url?: string;
  }>;
}

/**
 * Due Diligence Request
 */
export interface DueDiligenceRequest {
  transactionId: string;
  categories: string[];
  message?: string;
  deadline?: string;
}

// =============================================================================
// MESSAGING TYPES
// =============================================================================

/**
 * Message Entity
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  sentAt: string;
  readAt?: string;
  type: 'text' | 'system' | 'document';
}

/**
 * Conversation Entity
 */
export interface Conversation {
  id: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: 'buyer' | 'seller';
  }>;
  listingId?: string;
  transactionId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export type ListingResponse = ApiResponse<BusinessListing>;
export type ListingsResponse = PaginatedResponse<BusinessListing>;
export type ValuationResponse = ApiResponse<ValuationResult>;
export type TransactionResponse = ApiResponse<Transaction>;
export type TransactionsResponse = PaginatedResponse<Transaction>;
export type MessagesResponse = PaginatedResponse<Message>;
export type ConversationsResponse = PaginatedResponse<Conversation>;
export type ListingAnalyticsResponse = ApiResponse<ListingAnalytics>;

// =============================================================================
// EXPORTS
// =============================================================================

export default BusinessListing;
