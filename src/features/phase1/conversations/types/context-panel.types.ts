// 🎯 Context Panel Types
// Location: src/features/phase1/conversations/types/context-panel.types.ts
// Purpose: Type definitions for the three-panel messaging interface

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
 * Context panel props interface
 */
export interface ContextPanelProps {
  conversation: Conversation;
  isVisible: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onContextChange: (context: ContextPanelType) => void;
  className?: string;
}

/**
 * Context panel content props
 */
export interface ContextPanelContentProps {
  conversation: Conversation;
  contextType: ContextPanelType;
  isLoading?: boolean;
  error?: string | null;
}

// =============================================================================
// CONTEXT PANEL DATA TYPES
// =============================================================================

/**
 * Business information context data
 */
export interface BusinessInfoContext {
  businessId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  sector: string;
  revenue: number;
  ebitda: number;
  growthRate: number;
  teamSize: number;
  establishedYear: number;
  keyMetrics: {
    revenue: number;
    profit: number;
    growth: number;
    employees: number;
  };
  recentUpdates: Array<{
    date: string;
    type: 'financial' | 'operational' | 'legal';
    description: string;
  }>;
  photos: Array<{
    id: string;
    url: string;
    caption?: string;
  }>;
}

/**
 * Due diligence context data
 */
export interface DueDiligenceContext {
  processId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  checklist: Array<{
    id: string;
    category: string;
    item: string;
    status: 'pending' | 'requested' | 'provided' | 'reviewed' | 'approved';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    deadline?: string;
    assignedTo?: string;
    notes?: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    status: 'pending' | 'uploaded' | 'reviewed' | 'approved';
    uploadedAt?: string;
    reviewedAt?: string;
    size: number;
  }>;
  timeline: Array<{
    date: string;
    action: string;
    user: string;
    status: 'completed' | 'pending' | 'overdue';
  }>;
  riskAssessment: {
    overall: 'low' | 'medium' | 'high';
    categories: Array<{
      category: string;
      risk: 'low' | 'medium' | 'high';
      description: string;
    }>;
  };
}

/**
 * Transaction process context data
 */
export interface TransactionContext {
  transactionId: string;
  stage: 'offer' | 'negotiation' | 'due_diligence' | 'closing' | 'completed';
  currentOffer?: {
    id: string;
    amount: number;
    currency: string;
    terms: string;
    status: 'pending' | 'accepted' | 'rejected' | 'countered';
    submittedAt: string;
    expiresAt?: string;
  };
  offerHistory: Array<{
    id: string;
    amount: number;
    currency: string;
    terms: string;
    status: 'accepted' | 'rejected' | 'countered' | 'expired';
    submittedAt: string;
    respondedAt?: string;
  }>;
  negotiationTimeline: Array<{
    date: string;
    action: string;
    user: string;
    details: string;
  }>;
  closingChecklist: Array<{
    id: string;
    item: string;
    status: 'pending' | 'in_progress' | 'completed';
    assignedTo?: string;
    deadline?: string;
  }>;
  paymentStatus: {
    escrowAmount: number;
    currency: string;
    status: 'pending' | 'in_escrow' | 'released' | 'refunded';
    releaseDate?: string;
  };
  legalDocuments: Array<{
    id: string;
    name: string;
    status: 'draft' | 'review' | 'signed' | 'executed';
    signedAt?: string;
  }>;
}

/**
 * Document management context data
 */
export interface DocumentContext {
  sharedDocuments: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    uploadedAt: string;
    uploadedBy: string;
    accessLevel: 'public' | 'nda_required' | 'due_diligence';
    downloadCount: number;
    lastDownloaded?: string;
  }>;
  documentCategories: Array<{
    category: string;
    count: number;
    totalSize: number;
  }>;
  accessPermissions: {
    canUpload: boolean;
    canDownload: boolean;
    canDelete: boolean;
    canManagePermissions: boolean;
  };
  recentActivity: Array<{
    date: string;
    action: 'uploaded' | 'downloaded' | 'shared' | 'deleted';
    user: string;
    document: string;
  }>;
}

/**
 * Communication history context data
 */
export interface CommunicationContext {
  keyMilestones: Array<{
    date: string;
    milestone: string;
    description: string;
    participants: string[];
  }>;
  importantDecisions: Array<{
    date: string;
    decision: string;
    agreedBy: string[];
    status: 'pending' | 'agreed' | 'disputed';
  }>;
  actionItems: Array<{
    id: string;
    description: string;
    assignedTo: string;
    dueDate?: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
  }>;
  meetingNotes: Array<{
    id: string;
    date: string;
    title: string;
    participants: string[];
    summary: string;
    actionItems: string[];
  }>;
  communicationAnalytics: {
    totalMessages: number;
    averageResponseTime: number;
    mostActiveParticipant: string;
    communicationFrequency: 'low' | 'medium' | 'high';
  };
}

// =============================================================================
// CONTEXT DETECTION TYPES
// =============================================================================

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
 * Context detection rules
 */
export interface ContextDetectionRule {
  condition: (conversation: Conversation) => boolean;
  contextType: ContextPanelType;
  priority: number;
  reason: string;
}

// =============================================================================
// QUICK ACTIONS TYPES
// =============================================================================

/**
 * Quick action for context panels
 */
export interface ContextQuickAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  available: boolean;
  urgency: 'low' | 'medium' | 'high';
  description?: string;
  category: 'primary' | 'secondary' | 'tertiary';
}

/**
 * Quick actions by context type
 */
export interface ContextQuickActions {
  business_info: ContextQuickAction[];
  due_diligence: ContextQuickAction[];
  transaction: ContextQuickAction[];
  documents: ContextQuickAction[];
  communication: ContextQuickAction[];
}

// =============================================================================
// RESPONSIVE DESIGN TYPES
// =============================================================================

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

// =============================================================================
// ANIMATION TYPES
// =============================================================================

/**
 * Panel animation variants
 */
export interface PanelAnimationVariants {
  hidden: {
    x: string;
    opacity: number;
  };
  visible: {
    x: number;
    opacity: number;
    transition: {
      type: string;
      stiffness: number;
      damping: number;
    };
  };
  collapsed: {
    x: string;
    opacity: number;
    transition: {
      type: string;
      stiffness: number;
      damping: number;
    };
  };
}

// =============================================================================
// IMPORT TYPES
// =============================================================================

import { Conversation } from './index';
