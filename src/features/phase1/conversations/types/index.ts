// 🗨️ Conversation Feature Types
// Location: src/features/phase1/conversations/types/index.ts
// Purpose: Type definitions for conversation-centric transaction management

// =============================================================================
// ENHANCED MESSAGE TYPES
// =============================================================================

/**
 * Enhanced message interface with transaction-specific data
 */
export interface ConversationMessage {
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
  isRead?: boolean;
  type: 'text' | 'system' | 'offer' | 'due_diligence' | 'document' | 'nda' | 'transaction';

  // Offer-specific data
  offerDetails?: {
    amount: number;
    currency: string;
    terms: string;
    status: 'pending' | 'accepted' | 'rejected' | 'countered';
    expirationDate?: string;
    conditions?: string[];
    counterOffer?: {
      amount: number;
      terms: string;
      conditions?: string[];
    };
  };

  // Due diligence-specific data
  dueDiligenceDetails?: {
    processId: string;
    category: string;
    itemId: string;
    status: 'requested' | 'provided' | 'reviewed' | 'approved' | 'rejected';
    deadline?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    relatedDocuments?: string[];
    notes?: string;
  };

  // Document-specific data
  documentDetails?: {
    documentId: string;
    name: string;
    type: string;
    size: number;
    accessLevel: 'public' | 'nda_required' | 'due_diligence';
    downloadUrl?: string;
    previewUrl?: string;
  };

  // NDA-specific data
  ndaDetails?: {
    ndaId: string;
    status: 'pending' | 'signed' | 'expired' | 'rejected';
    signedAt?: string;
    expiresAt?: string;
    version: string;
  };

  // Transaction-specific data
  transactionDetails?: {
    transactionId: string;
    stage: 'offer' | 'due_diligence' | 'negotiation' | 'closing' | 'completed';
    actionRequired?: string;
    deadline?: string;
    progress?: number;
  };
}

// =============================================================================
// CONVERSATION CONTEXT TYPES
// =============================================================================

/**
 * Transaction stage enumeration
 */
export type TransactionStage =
  | 'inquiry'
  | 'nda'
  | 'offer'
  | 'due_diligence'
  | 'transaction'
  | 'completed';

/**
 * Transaction state tracking
 */
export interface TransactionState {
  hasNDA: boolean;
  hasOffer: boolean;
  hasDueDiligence: boolean;
  hasTransaction: boolean;
  currentStage: TransactionStage;
  progress: number;
}

/**
 * Quick action for transaction stages
 */
export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  available: boolean;
  urgency: 'low' | 'medium' | 'high';
  description?: string;
}

/**
 * Transaction progress tracking
 */
export interface TransactionProgress {
  percentage: number;
  description: string;
  currentStep: string;
  nextStep?: string;
  estimatedCompletion?: string;
}

/**
 * Enhanced conversation context
 */
export interface ConversationContext {
  id: string;
  listingId: string;
  currentStage: TransactionStage;
  transactionState: TransactionState;
  quickActions: QuickAction[];
  progress: TransactionProgress;
  lastActivity: string;
  participants: ConversationParticipant[];
  businessContext?: {
    title: string;
    price: number;
    currency: string;
    location: string;
    sector: string;
  };
}

/**
 * Conversation participant
 */
export interface ConversationParticipant {
  id: string;
  name: string;
  role: 'buyer' | 'seller' | 'advisor';
  company?: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
}

// =============================================================================
// CONVERSATION TYPES
// =============================================================================

/**
 * Enhanced conversation interface
 */
export interface Conversation {
  id: string;
  participant: ConversationParticipant;
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
    type: ConversationMessage['type'];
  };
  businessContext?: {
    title: string;
    price: number;
    currency: string;
    location: string;
  };
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  status: 'active' | 'negotiating' | 'closed';
  context: ConversationContext;
}

// =============================================================================
// MODAL TYPES
// =============================================================================

/**
 * Modal props for transaction actions
 */
export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  listingId?: string;
  onSuccess?: (data: unknown) => void;
}

/**
 * Offer creation modal props
 */
export interface OfferCreationModalProps extends TransactionModalProps {
  initialOffer?: {
    amount?: number;
    terms?: string;
    conditions?: string[];
  };
}

/**
 * Due diligence request modal props
 */
export interface DueDiligenceRequestModalProps extends TransactionModalProps {
  processId?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

/**
 * Document sharing modal props
 */
export interface DocumentSharingModalProps extends TransactionModalProps {
  documentType?: 'financial' | 'legal' | 'operational' | 'other';
  accessLevel?: 'public' | 'nda_required' | 'due_diligence';
}

// =============================================================================
// API TYPES
// =============================================================================

/**
 * Create offer request
 */
export interface CreateOfferRequest {
  conversationId: string;
  amount: number;
  currency: string;
  terms: string;
  conditions?: string[];
  expirationDate?: string;
  message?: string;
}

/**
 * Create due diligence request
 */
export interface CreateDueDiligenceRequest {
  conversationId: string;
  category: string;
  itemId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;
  message?: string;
}

/**
 * Share document request
 */
export interface ShareDocumentRequest {
  conversationId: string;
  documentId: string;
  accessLevel: 'public' | 'nda_required' | 'due_diligence';
  message?: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Message filter options
 */
export interface MessageFilter {
  type?: ConversationMessage['type'];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sender?: string;
  hasAttachments?: boolean;
}

/**
 * Conversation filter options
 */
export interface ConversationFilter {
  status?: Conversation['status'];
  stage?: TransactionStage;
  hasUnread?: boolean;
  participantRole?: 'buyer' | 'seller';
}

/**
 * Transaction analytics
 */
export interface TransactionAnalytics {
  totalConversations: number;
  activeConversations: number;
  averageResponseTime: number;
  conversionRate: number;
  stageDistribution: Record<TransactionStage, number>;
}

// =============================================================================
// CONTEXT PANEL TYPES
// =============================================================================

/**
 * Context panel types for different conversation stages
 */
export type ContextPanelType =
  | 'business_info'
  | 'due_diligence'
  | 'transaction'
  | 'documents'
  | 'communication';

/**
 * Context panel state interface
 */
export interface ContextPanelState {
  isVisible: boolean;
  isCollapsed: boolean;
  activeContext: ContextPanelType;
  isLoading: boolean;
  error: string | null;
  userPreferences: {
    defaultVisibility: boolean;
    preferredContext: ContextPanelType;
    rememberCollapseState: boolean;
  };
}

/**
 * Context detection result
 */
export interface ContextDetectionResult {
  contextType: ContextPanelType;
  shouldShow: boolean;
  confidence: number;
  reason: string;
}

/**
 * Breakpoint definitions
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Panel layout configuration
 */
export interface PanelLayoutConfig {
  breakpoint: Breakpoint;
  leftPanel: {
    width: number;
    visible: boolean;
    position: 'fixed' | 'relative';
  };
  middlePanel: {
    width: number | 'flex';
    visible: boolean;
  };
  rightPanel: {
    width: number;
    visible: boolean;
    position: 'fixed' | 'relative';
    overlay: boolean;
  };
}
