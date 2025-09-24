/**
 * Offer Management Types
 * Location: src/shared/types/offer-management.ts
 * Purpose: Type definitions for offer management and negotiation system
 */

export interface Offer {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status:
    | 'draft'
    | 'submitted'
    | 'under_review'
    | 'accepted'
    | 'rejected'
    | 'countered'
    | 'expired'
    | 'withdrawn';
  type: 'initial' | 'counter' | 'final';
  parentOfferId?: string; // For counter-offers

  // Financial Terms
  offerPrice: number;
  currency: string;
  paymentStructure: PaymentStructure;
  financingDetails?: FinancingDetails;

  // Terms and Conditions
  conditions: OfferCondition[];
  contingencies: OfferContingency[];
  timeline: OfferTimeline;

  // Additional Terms
  additionalTerms: string;
  specialRequests: string[];

  // Metadata
  submittedAt: string;
  expiresAt: string;
  lastModifiedAt: string;
  createdBy: string;
  version: number;

  // Negotiation History
  negotiationHistory: NegotiationEvent[];
  comments: OfferComment[];

  // Attachments
  attachments: OfferAttachment[];

  // Approval Workflow
  approvals: OfferApproval[];
  requiresApproval: boolean;
}

export interface PaymentStructure {
  type: 'cash' | 'financed' | 'mixed' | 'earnout' | 'stock';
  cashAmount?: number;
  financedAmount?: number;
  earnoutDetails?: EarnoutDetails;
  stockDetails?: StockDetails;
  downPayment?: number;
  paymentSchedule?: PaymentSchedule[];
}

export interface EarnoutDetails {
  totalAmount: number;
  duration: number; // months
  milestones: EarnoutMilestone[];
  performanceMetrics: string[];
}

export interface EarnoutMilestone {
  id: string;
  description: string;
  targetValue: number;
  targetDate: string;
  percentage: number;
}

export interface StockDetails {
  stockType: 'common' | 'preferred' | 'warrants';
  percentage: number;
  valuation: number;
  vestingSchedule?: VestingSchedule[];
}

export interface VestingSchedule {
  percentage: number;
  vestingDate: string;
  conditions?: string[];
}

export interface PaymentSchedule {
  amount: number;
  dueDate: string;
  description: string;
  conditions?: string[];
}

export interface FinancingDetails {
  lenderName?: string;
  loanAmount?: number;
  interestRate?: number;
  termLength?: number; // months
  preApproved: boolean;
  preApprovalDocument?: string;
  financingContingency: boolean;
}

export interface OfferCondition {
  id: string;
  type: 'due_diligence' | 'financing' | 'regulatory' | 'board_approval' | 'custom';
  description: string;
  isRequired: boolean;
  deadline?: string;
  status: 'pending' | 'satisfied' | 'waived' | 'failed';
  documents?: string[];
}

export interface OfferContingency {
  id: string;
  type: 'inspection' | 'appraisal' | 'environmental' | 'legal' | 'financial' | 'custom';
  description: string;
  deadline: string;
  responsibleParty: 'buyer' | 'seller' | 'both';
  status: 'pending' | 'satisfied' | 'waived' | 'failed';
  estimatedCost?: number;
  documents?: string[];
}

export interface OfferTimeline {
  dueDiligencePeriod: number; // days
  financingPeriod: number; // days
  closingDate: string;
  inspectionPeriod?: number; // days
  responseDeadline: string; // for seller response
}

export interface NegotiationEvent {
  id: string;
  type:
    | 'offer_submitted'
    | 'counter_offer'
    | 'acceptance'
    | 'rejection'
    | 'modification'
    | 'withdrawal'
    | 'expiration'
    | 'comment';
  timestamp: string;
  userId: string;
  userName: string;
  description: string;
  changes?: OfferChange[];
  metadata?: Record<string, any>;
}

export interface OfferChange {
  field: string;
  oldValue: any;
  newValue: any;
  reason?: string;
}

export interface OfferComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  isPrivate: boolean;
  attachments?: string[];
}

export interface OfferAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  downloadUrl: string;
  category: 'financial' | 'legal' | 'inspection' | 'other';
}

export interface OfferApproval {
  id: string;
  approverId: string;
  approverName: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  timestamp?: string;
  required: boolean;
}

// Dashboard and UI Types
export interface OfferDashboard {
  activeOffers: Offer[];
  pendingOffers: Offer[];
  completedOffers: Offer[];
  statistics: OfferStatistics;
  recentActivity: NegotiationEvent[];
  upcomingDeadlines: OfferDeadline[];
}

export interface OfferStatistics {
  totalOffers: number;
  activeOffers: number;
  acceptedOffers: number;
  rejectedOffers: number;
  averageOfferValue: number;
  averageNegotiationTime: number; // days
  successRate: number; // percentage
}

export interface OfferDeadline {
  id: string;
  offerId: string;
  title: string;
  deadline: string;
  type: 'response' | 'due_diligence' | 'financing' | 'closing' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'critical';
  isOverdue: boolean;
}

export interface OfferComparison {
  offers: Offer[];
  comparisonFields: string[];
  summary: {
    highestOffer: number;
    lowestOffer: number;
    averageOffer: number;
    mostFavorableTerms: string;
  };
}

// API Request/Response Types
export interface CreateOfferRequest {
  listingId: string;
  offerPrice: number;
  currency: string;
  paymentStructure: PaymentStructure;
  conditions: Omit<OfferCondition, 'id' | 'status'>[];
  contingencies: Omit<OfferContingency, 'id' | 'status'>[];
  timeline: OfferTimeline;
  additionalTerms?: string;
  specialRequests?: string[];
  financingDetails?: FinancingDetails;
}

export interface UpdateOfferRequest {
  offerId: string;
  changes: Partial<Offer>;
  reason?: string;
}

export interface CounterOfferRequest {
  parentOfferId: string;
  offerPrice?: number;
  paymentStructure?: PaymentStructure;
  conditions?: OfferCondition[];
  contingencies?: OfferContingency[];
  timeline?: OfferTimeline;
  additionalTerms?: string;
  specialRequests?: string[];
  reason: string;
}

export interface AcceptOfferRequest {
  offerId: string;
  comments?: string;
  conditions?: string[];
}

export interface RejectOfferRequest {
  offerId: string;
  reason: string;
  comments?: string;
}

export interface WithdrawOfferRequest {
  offerId: string;
  reason: string;
}

export interface AddOfferCommentRequest {
  offerId: string;
  content: string;
  isPrivate?: boolean;
  attachments?: string[];
}

// Notification Types
export interface OfferNotification {
  id: string;
  type:
    | 'new_offer'
    | 'counter_offer'
    | 'offer_accepted'
    | 'offer_rejected'
    | 'offer_expired'
    | 'deadline_reminder';
  offerId: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionRequired: boolean;
  actionUrl?: string;
}

// Template Types
export interface OfferTemplate {
  id: string;
  name: string;
  description: string;
  industry: string;
  businessSize: 'small' | 'medium' | 'large';
  template: Partial<Offer>;
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

// Analytics Types
export interface OfferAnalytics {
  timeRange: {
    start: string;
    end: string;
  };
  metrics: {
    totalOffers: number;
    offerVolume: number;
    averageOfferValue: number;
    acceptanceRate: number;
    averageNegotiationRounds: number;
    timeToClose: number; // days
  };
  trends: {
    offerValues: { date: string; value: number }[];
    acceptanceRates: { date: string; rate: number }[];
    negotiationRounds: { date: string; rounds: number }[];
  };
  breakdown: {
    byIndustry: Record<string, number>;
    byBusinessSize: Record<string, number>;
    byPaymentType: Record<string, number>;
    byStatus: Record<string, number>;
  };
}

// Search and Filter Types
export interface OfferFilters {
  status?: Offer['status'][];
  type?: Offer['type'][];
  priceRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: string;
    end: string;
  };
  industry?: string[];
  businessSize?: string[];
  paymentType?: PaymentStructure['type'][];
  hasContingencies?: boolean;
  requiresFinancing?: boolean;
}

export interface OfferSearchParams {
  query?: string;
  filters?: OfferFilters;
  sortBy?: 'price' | 'date' | 'status' | 'deadline';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Workflow Types
export interface OfferWorkflow {
  id: string;
  name: string;
  description: string;
  steps: OfferWorkflowStep[];
  isActive: boolean;
  applicableRoles: string[];
}

export interface OfferWorkflowStep {
  id: string;
  name: string;
  description: string;
  order: number;
  requiredRole: string;
  isRequired: boolean;
  estimatedDuration: number; // hours
  dependencies: string[];
  actions: OfferWorkflowAction[];
}

export interface OfferWorkflowAction {
  id: string;
  name: string;
  type: 'approve' | 'reject' | 'modify' | 'request_info' | 'escalate';
  required: boolean;
  conditions?: string[];
}
