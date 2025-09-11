// =============================================================================
// INQUIRY RELATED TYPES
// =============================================================================
// All buyer inquiry related types and interfaces
// =============================================================================

import { InquiryStatus, User, Listing } from './index';

/**
 * Core Inquiry entity
 */
export interface Inquiry {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;

  // Inquiry details
  status: InquiryStatus;
  message: string;
  buyer_background?: string;
  intended_use?: string;
  financing_confirmed: boolean;
  financing_details?: string;

  // NDA and confidentiality
  nda_required: boolean;
  nda_accepted: boolean;
  nda_accepted_at?: string;
  nda_document_id?: string;

  // Investment details
  proposed_price?: number;
  price_currency?: string;
  payment_terms?: string;
  timeline_requirements?: string;
  due_diligence_requirements?: string[];

  // Seller response
  seller_response?: string;
  responded_at?: string;
  response_type?: 'accept' | 'reject' | 'counter' | 'request_info';

  // Follow-up information
  follow_up_questions?: string[];
  additional_documents_requested?: string[];
  meeting_requested?: boolean;
  preferred_contact_method?: 'email' | 'phone' | 'platform' | 'in_person';

  // Tracking
  viewed_by_seller: boolean;
  viewed_at?: string;
  priority_level: 'low' | 'medium' | 'high' | 'urgent';

  created_at: string;
  updated_at: string;

  // Relations (populated in API responses)
  listing?: Listing;
  buyer?: User;
  seller?: User;
  documents?: InquiryDocument[];
  activity_log?: InquiryActivity[];
}

/**
 * Documents attached to inquiries
 */
export interface InquiryDocument {
  id: string;
  inquiry_id: string;
  uploaded_by: string;
  filename: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  storage_url: string;

  // Document type
  document_type:
    | 'financial_proof'
    | 'identification'
    | 'business_plan'
    | 'references'
    | 'nda'
    | 'other';
  description?: string;

  // Access control
  confidential: boolean;
  expires_at?: string;

  created_at: string;
}

/**
 * Inquiry activity tracking
 */
export interface InquiryActivity {
  id: string;
  inquiry_id: string;
  user_id: string;
  activity_type:
    | 'created'
    | 'viewed'
    | 'responded'
    | 'updated'
    | 'document_added'
    | 'status_changed'
    | 'note_added';
  description: string;
  metadata?: Record<string, any>;
  created_at: string;

  // Relations
  user?: User;
}

/**
 * Inquiry statistics for sellers
 */
export interface InquiryStatistics {
  listing_id: string;
  total_inquiries: number;
  pending_inquiries: number;
  accepted_inquiries: number;
  rejected_inquiries: number;
  withdrawn_inquiries: number;

  // Response metrics
  average_response_time: number; // in hours
  response_rate: number; // percentage

  // Quality metrics
  qualified_inquiries: number;
  serious_buyer_rate: number;

  // Geographic distribution
  inquiries_by_country: Record<string, number>;

  // Time-based analytics
  inquiries_by_month: Record<string, number>;
  peak_inquiry_times: string[];

  last_updated: string;
}

// =============================================================================
// INQUIRY CREATION AND MANAGEMENT
// =============================================================================

/**
 * Create inquiry request
 */
export interface CreateInquiryRequest {
  listing_id: string;
  message: string;
  buyer_background?: string;
  intended_use?: string;
  financing_confirmed: boolean;
  financing_details?: string;
  nda_required?: boolean;

  // Investment proposal
  proposed_price?: number;
  price_currency?: string;
  payment_terms?: string;
  timeline_requirements?: string;

  // Additional information
  due_diligence_requirements?: string[];
  preferred_contact_method?: string;
  additional_questions?: string[];

  // Attachments
  documents?: {
    file: File;
    document_type: string;
    description?: string;
    confidential: boolean;
  }[];
}

/**
 * Update inquiry request (seller response)
 */
export interface UpdateInquiryRequest {
  status?: InquiryStatus;
  seller_response?: string;
  response_type?: 'accept' | 'reject' | 'counter' | 'request_info';

  // Counter-proposal details
  counter_price?: number;
  counter_terms?: string;
  counter_timeline?: string;

  // Information requests
  additional_documents_requested?: string[];
  follow_up_questions?: string[];

  // Meeting setup
  meeting_requested?: boolean;
  preferred_meeting_type?: 'phone' | 'video' | 'in_person';
  available_times?: string[];

  // Internal notes (not visible to buyer)
  internal_notes?: string;
}

/**
 * Inquiry note for internal tracking
 */
export interface InquiryNote {
  id: string;
  inquiry_id: string;
  user_id: string;
  note_type: 'general' | 'follow_up' | 'qualification' | 'risk_assessment';
  content: string;
  private: boolean; // only visible to note creator
  created_at: string;
  updated_at: string;
}

// =============================================================================
// INQUIRY FILTERING AND SEARCH
// =============================================================================

/**
 * Inquiry search filters
 */
export interface InquirySearchFilters {
  // Pagination
  page?: number;
  limit?: number;

  // Status filters
  status?: InquiryStatus | InquiryStatus[];

  // Entity filters
  listing_id?: string;
  buyer_id?: string;
  seller_id?: string;
  organization_id?: string;

  // Date filters
  created_after?: string;
  created_before?: string;
  responded_after?: string;
  responded_before?: string;

  // Financial filters
  proposed_price_min?: number;
  proposed_price_max?: number;
  financing_confirmed?: boolean;

  // Content filters
  nda_required?: boolean;
  nda_accepted?: boolean;
  has_documents?: boolean;
  priority_level?: string | string[];

  // Response filters
  response_type?: string | string[];
  unread_only?: boolean;
  requires_response?: boolean;

  // Text search
  search_query?: string;
  search_fields?: ('message' | 'buyer_background' | 'seller_response')[];

  // Sorting
  sort_by?: 'newest' | 'oldest' | 'status' | 'price' | 'priority' | 'last_activity';
}

/**
 * Inquiry search result
 */
export interface InquirySearchResult {
  inquiries: Inquiry[];
  total_count: number;
  page: number;
  per_page: number;
  total_pages: number;

  // Summary statistics
  summary: {
    pending_count: number;
    accepted_count: number;
    rejected_count: number;
    unread_count: number;
    average_response_time: number;
  };

  // Facets for filtering
  facets: {
    statuses: Record<InquiryStatus, number>;
    priority_levels: Record<string, number>;
    financing_types: Record<string, number>;
    response_types: Record<string, number>;
  };
}

// =============================================================================
// INQUIRY QUALIFICATION
// =============================================================================

/**
 * Buyer qualification assessment
 */
export interface BuyerQualification {
  inquiry_id: string;
  buyer_id: string;

  // Financial qualification
  financial_score: number; // 1-10
  proof_of_funds: boolean;
  financing_pre_approved: boolean;
  investment_experience: 'none' | 'limited' | 'moderate' | 'extensive';

  // Intent qualification
  intent_score: number; // 1-10
  timeline_realistic: boolean;
  specific_interest: boolean;
  detailed_questions: boolean;

  // Background qualification
  background_score: number; // 1-10
  relevant_experience: boolean;
  industry_knowledge: boolean;
  professional_references: boolean;

  // Overall assessment
  overall_score: number; // 1-10
  qualification_level: 'low' | 'medium' | 'high' | 'excellent';
  recommendation: 'reject' | 'proceed_cautiously' | 'engage' | 'prioritize';

  // Assessment notes
  strengths: string[];
  concerns: string[];
  additional_information_needed: string[];

  assessed_by: string;
  assessed_at: string;
}

/**
 * Inquiry risk assessment
 */
export interface InquiryRiskAssessment {
  inquiry_id: string;

  // Risk factors
  financial_risk: 'low' | 'medium' | 'high';
  timeline_risk: 'low' | 'medium' | 'high';
  confidentiality_risk: 'low' | 'medium' | 'high';
  reputation_risk: 'low' | 'medium' | 'high';

  // Risk mitigation
  nda_required: boolean;
  additional_verification_needed: boolean;
  references_required: boolean;
  escrow_recommended: boolean;

  // Risk score
  overall_risk_score: number; // 1-10 (10 = highest risk)
  risk_level: 'low' | 'medium' | 'high' | 'critical';

  // Recommendations
  proceed_recommendation: boolean;
  mitigation_steps: string[];
  monitoring_requirements: string[];

  assessed_by: string;
  assessed_at: string;
}

// =============================================================================
// INQUIRY TEMPLATES AND AUTOMATION
// =============================================================================

/**
 * Inquiry response template
 */
export interface InquiryResponseTemplate {
  id: string;
  user_id: string;
  name: string;
  description?: string;

  // Template content
  subject: string;
  content: string;
  response_type: 'accept' | 'reject' | 'counter' | 'request_info';

  // Automation rules
  auto_apply_conditions?: {
    buyer_score_min?: number;
    financing_confirmed?: boolean;
    price_range?: { min?: number; max?: number };
    sectors?: string[];
  };

  // Template variables
  variables: string[]; // placeholders like {{buyer_name}}, {{listing_title}}

  usage_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Automated inquiry rules
 */
export interface InquiryAutomationRule {
  id: string;
  user_id: string;
  name: string;
  active: boolean;

  // Trigger conditions
  conditions: {
    buyer_qualification_min?: number;
    financing_confirmed?: boolean;
    price_range?: { min?: number; max?: number };
    keywords_include?: string[];
    keywords_exclude?: string[];
    business_hours_only?: boolean;
  };

  // Actions
  actions: {
    auto_respond?: boolean;
    response_template_id?: string;
    auto_accept?: boolean;
    auto_reject?: boolean;
    notify_immediately?: boolean;
    assign_priority?: string;
    tag_inquiry?: string[];
  };

  // Execution tracking
  execution_count: number;
  last_executed: string;

  created_at: string;
  updated_at: string;
}

// =============================================================================
// INQUIRY COMMUNICATION
// =============================================================================

/**
 * Inquiry message thread
 */
export interface InquiryMessage {
  id: string;
  inquiry_id: string;
  sender_id: string;
  recipient_id: string;

  content: string;
  message_type: 'initial' | 'response' | 'follow_up' | 'clarification' | 'negotiation';

  // Attachments
  attachments?: {
    file_id: string;
    filename: string;
    file_size: number;
    mime_type: string;
  }[];

  // Status tracking
  sent_at: string;
  delivered_at?: string;
  read_at?: string;
  replied_to?: string; // parent message ID

  // Metadata
  urgency_level: 'low' | 'normal' | 'high' | 'urgent';
  requires_action: boolean;
  action_deadline?: string;

  created_at: string;
}

/**
 * Inquiry communication history
 */
export interface InquiryCommunicationHistory {
  inquiry_id: string;
  messages: InquiryMessage[];
  total_messages: number;

  // Communication metrics
  response_times: number[]; // in hours
  average_response_time: number;
  last_message_at: string;
  last_message_by: string;

  // Communication health
  engagement_score: number; // 1-10
  responsiveness_score: number; // 1-10
  professionalism_score: number; // 1-10
}

export default Inquiry;
