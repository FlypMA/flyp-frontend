// =============================================================================
// CONVERSATION RELATED TYPES
// =============================================================================
// All buyer-seller conversation related types and interfaces
// =============================================================================

import { ConversationStatus, MessageType, User, Listing, Inquiry } from './index';

/**
 * Core Conversation entity
 */
export interface Conversation {
  id: string;
  inquiry_id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;

  // Conversation properties
  status: ConversationStatus;
  subject?: string;
  conversation_type: 'inquiry_follow_up' | 'negotiation' | 'due_diligence' | 'general';

  // Access and permissions
  nda_signed: boolean;
  confidential_access_granted: boolean;
  seller_can_share_financials: boolean;
  buyer_can_share_plans: boolean;

  // Message tracking
  message_count: number;
  unread_count_buyer: number;
  unread_count_seller: number;
  last_message_at?: string;
  last_message_by?: string;
  last_message_preview?: string;

  // Conversation health
  response_rate_buyer: number;
  response_rate_seller: number;
  average_response_time: number; // in hours
  engagement_score: number; // 1-10

  // Moderation and safety
  flagged: boolean;
  flag_reason?: string;
  moderated: boolean;
  moderated_by?: string;
  moderated_at?: string;

  // Archive and lifecycle
  archived_by?: string;
  archived_at?: string;
  auto_archive_at?: string;

  created_at: string;
  updated_at: string;

  // Relations (populated in API responses)
  messages?: Message[];
  listing?: Listing;
  buyer?: User;
  seller?: User;
  inquiry?: Inquiry;
  participants?: ConversationParticipant[];
  attachments?: MessageAttachment[];
}

/**
 * Individual message in conversation
 */
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;

  // Message content
  content: string;
  message_type: MessageType;
  is_system_message: boolean;

  // Message threading
  reply_to_id?: string;
  thread_id?: string;

  // Message properties
  priority: 'low' | 'normal' | 'high' | 'urgent';
  requires_response: boolean;
  response_deadline?: string;

  // Content formatting
  formatting: {
    bold?: boolean;
    italic?: boolean;
    has_links?: boolean;
    has_mentions?: boolean;
    has_quotes?: boolean;
  };

  // Status tracking
  sent_at: string;
  delivered_at?: string;
  read_at?: string;
  read_by?: string;

  // Message lifecycle
  edited_at?: string;
  edited_by?: string;
  edit_history?: MessageEdit[];
  deleted_at?: string;
  deleted_by?: string;

  // Attachments and media
  attachments?: MessageAttachment[];

  // Reactions and feedback
  reactions?: MessageReaction[];

  // AI and automation
  ai_generated: boolean;
  ai_confidence?: number;
  auto_translated: boolean;
  original_language?: string;

  created_at: string;

  // Relations (populated in API responses)
  sender?: User;
  recipient?: User;
}

/**
 * Message attachments
 */
export interface MessageAttachment {
  id: string;
  message_id: string;
  filename: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  storage_url: string;
  thumbnail_url?: string;

  // File properties
  file_type: 'document' | 'image' | 'video' | 'audio' | 'archive';
  content_type: 'financial' | 'legal' | 'technical' | 'marketing' | 'personal' | 'other';

  // Security and access
  encrypted: boolean;
  password_protected: boolean;
  access_level: 'conversation_only' | 'nda_required' | 'verified_only';
  expires_at?: string;

  // Metadata
  description?: string;
  alt_text?: string;
  tags: string[];

  // Download tracking
  download_count: number;
  last_downloaded_at?: string;
  last_downloaded_by?: string;

  created_at: string;
}

/**
 * Message reactions (like, dislike, etc.)
 */
export interface MessageReaction {
  id: string;
  message_id: string;
  user_id: string;
  reaction_type: 'like' | 'dislike' | 'love' | 'laugh' | 'surprised' | 'angry' | 'helpful';
  created_at: string;

  // Relations
  user?: User;
}

/**
 * Message edit history
 */
export interface MessageEdit {
  id: string;
  message_id: string;
  edited_by: string;
  original_content: string;
  new_content: string;
  edit_reason?: string;
  edited_at: string;
}

/**
 * Conversation participants (if expanded beyond buyer/seller)
 */
export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  role: 'buyer' | 'seller' | 'advisor' | 'moderator' | 'observer';

  // Permissions
  can_send_messages: boolean;
  can_view_history: boolean;
  can_download_attachments: boolean;
  can_invite_others: boolean;
  can_moderate: boolean;

  // Activity tracking
  joined_at: string;
  last_seen_at?: string;
  message_count: number;
  last_message_at?: string;

  // Participant status
  active: boolean;
  muted: boolean;
  blocked: boolean;

  // Relations
  user?: User;
}

// =============================================================================
// CONVERSATION MANAGEMENT
// =============================================================================

/**
 * Create conversation request
 */
export interface CreateConversationRequest {
  inquiry_id: string;
  subject?: string;
  initial_message: string;
  conversation_type?: string;
  nda_required?: boolean;
}

/**
 * Update conversation request
 */
export interface UpdateConversationRequest {
  status?: ConversationStatus;
  subject?: string;
  archived?: boolean;
  confidential_access_granted?: boolean;
  auto_archive_at?: string;
}

/**
 * Send message request
 */
export interface SendMessageRequest {
  content: string;
  message_type?: MessageType;
  reply_to_id?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  requires_response?: boolean;
  response_deadline?: string;

  // Attachments
  attachments?: {
    file: File;
    content_type: string;
    description?: string;
    access_level?: string;
  }[];

  // Advanced options
  schedule_send_at?: string;
  auto_translate?: boolean;
  ai_assist?: boolean;
}

/**
 * Message search filters
 */
export interface MessageSearchFilters {
  conversation_id?: string;
  sender_id?: string;
  message_type?: MessageType | MessageType[];

  // Date filters
  sent_after?: string;
  sent_before?: string;

  // Content filters
  has_attachments?: boolean;
  requires_response?: boolean;
  unread_only?: boolean;
  priority?: string | string[];

  // Text search
  search_query?: string;

  // Pagination and sorting
  page?: number;
  limit?: number;
  sort_by?: 'newest' | 'oldest' | 'relevance';
  before_message_id?: string; // for pagination
}

// =============================================================================
// CONVERSATION ANALYTICS
// =============================================================================

/**
 * Conversation analytics
 */
export interface ConversationAnalytics {
  conversation_id: string;

  // Message statistics
  total_messages: number;
  messages_by_sender: Record<string, number>;
  average_message_length: number;

  // Response metrics
  average_response_time: number; // in hours
  response_times: number[];
  response_rate: number;

  // Engagement metrics
  total_attachments: number;
  total_reactions: number;
  engagement_score: number; // 1-10

  // Time-based analytics
  messages_by_hour: Record<string, number>;
  messages_by_day: Record<string, number>;
  peak_activity_hours: string[];

  // Content analytics
  sentiment_score: number; // -1 to 1
  professional_tone_score: number; // 1-10
  complexity_score: number; // 1-10

  // Progression metrics
  deal_progression_score: number; // 1-10
  negotiation_stage:
    | 'initial'
    | 'interested'
    | 'negotiating'
    | 'due_diligence'
    | 'closing'
    | 'stalled';
  likelihood_to_close: number; // 0-100%

  last_updated: string;
}

/**
 * Conversation insights
 */
export interface ConversationInsights {
  conversation_id: string;

  // Behavioral insights
  communication_style: 'formal' | 'casual' | 'business' | 'friendly';
  urgency_level: 'low' | 'medium' | 'high';
  detail_orientation: 'low' | 'medium' | 'high';

  // Deal insights
  price_sensitivity: 'low' | 'medium' | 'high';
  timeline_flexibility: 'rigid' | 'moderate' | 'flexible';
  decision_making_style: 'analytical' | 'intuitive' | 'collaborative';

  // Risk indicators
  red_flags: string[];
  positive_signals: string[];
  concerns_raised: string[];

  // Recommendations
  next_actions: string[];
  suggested_responses: string[];
  escalation_recommendations: string[];

  generated_at: string;
  confidence_score: number; // 0-100%
}

// =============================================================================
// CONVERSATION TEMPLATES AND AUTOMATION
// =============================================================================

/**
 * Message template
 */
export interface MessageTemplate {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category: 'greeting' | 'follow_up' | 'negotiation' | 'clarification' | 'closing';

  // Template content
  subject?: string;
  content: string;
  message_type: MessageType;

  // Template variables
  variables: string[]; // placeholders like {{buyer_name}}, {{price}}

  // Usage conditions
  applicable_stages: string[];
  user_roles: string[]; // buyer, seller, etc.

  // Personalization
  auto_personalize: boolean;
  tone: 'formal' | 'casual' | 'friendly' | 'professional';

  usage_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Auto-response rule
 */
export interface AutoResponseRule {
  id: string;
  user_id: string;
  name: string;
  active: boolean;

  // Trigger conditions
  conditions: {
    message_keywords?: string[];
    message_type?: MessageType[];
    sender_role?: string[];
    time_of_day?: { start: string; end: string };
    response_delay_hours?: number;
  };

  // Response configuration
  response: {
    template_id?: string;
    custom_message?: string;
    delay_minutes?: number;
    include_attachments?: boolean;
  };

  // Execution tracking
  execution_count: number;
  last_executed: string;

  created_at: string;
  updated_at: string;
}

// =============================================================================
// CONVERSATION MODERATION
// =============================================================================

/**
 * Conversation moderation action
 */
export interface ModerationAction {
  id: string;
  conversation_id: string;
  message_id?: string;
  moderator_id: string;

  action_type: 'warning' | 'message_removal' | 'user_timeout' | 'conversation_lock' | 'escalation';
  reason: string;
  details?: string;

  // Action parameters
  severity: 'low' | 'medium' | 'high' | 'critical';
  duration_hours?: number;
  public_reason?: string;

  // Resolution
  resolved: boolean;
  resolved_by?: string;
  resolved_at?: string;
  resolution_notes?: string;

  created_at: string;
}

/**
 * Content safety assessment
 */
export interface ContentSafetyAssessment {
  message_id: string;

  // Safety scores (0-100, higher = more concerning)
  toxicity_score: number;
  profanity_score: number;
  harassment_score: number;
  spam_score: number;

  // Content flags
  contains_personal_info: boolean;
  contains_financial_info: boolean;
  contains_contact_info: boolean;
  potentially_fraudulent: boolean;

  // AI assessment
  ai_confidence: number;
  human_review_required: boolean;

  // Action recommendations
  action_required: boolean;
  recommended_action: 'none' | 'flag' | 'moderate' | 'escalate';

  assessed_at: string;
}

export default Conversation;
