/**
 * Transaction Completion Types
 * Location: src/shared/types/transaction-completion.ts
 * Purpose: Type definitions for transaction completion and closing process
 */

export interface Transaction {
  id: string;
  offerId: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'in_progress' | 'ready_to_close' | 'closed' | 'cancelled' | 'disputed';
  type: 'asset_purchase' | 'stock_purchase' | 'merger' | 'joint_venture';

  // Financial Details
  totalValue: number;
  currency: string;
  paymentStructure: TransactionPaymentStructure;
  escrowDetails?: EscrowDetails;

  // Timeline
  closingDate: string;
  actualClosingDate?: string;
  createdDate: string;
  lastUpdated: string;

  // Key Dates
  keyDates: TransactionKeyDate[];

  // Parties
  parties: TransactionParty[];

  // Documents
  documents: TransactionDocument[];

  // Tasks and Checklist
  closingChecklist: ClosingChecklistItem[];

  // Payments
  payments: TransactionPayment[];

  // Post-Closing
  postClosingItems: PostClosingItem[];

  // Communication
  communications: TransactionCommunication[];

  // Metadata
  version: number;
  createdBy: string;
  requiresApproval: boolean;
  approvals: TransactionApproval[];
}

export interface TransactionPaymentStructure {
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
  currentProgress: EarnoutProgress[];
}

export interface EarnoutMilestone {
  id: string;
  description: string;
  targetValue: number;
  targetDate: string;
  percentage: number;
  status: 'pending' | 'achieved' | 'missed';
  achievedDate?: string;
  actualValue?: number;
}

export interface EarnoutProgress {
  milestoneId: string;
  currentValue: number;
  progressPercentage: number;
  lastUpdated: string;
  notes?: string;
}

export interface StockDetails {
  stockType: 'common' | 'preferred' | 'warrants';
  percentage: number;
  valuation: number;
  vestingSchedule?: VestingSchedule[];
  currentVesting?: VestingProgress[];
}

export interface VestingSchedule {
  percentage: number;
  vestingDate: string;
  conditions?: string[];
}

export interface VestingProgress {
  scheduleId: string;
  vestedPercentage: number;
  lastVestedDate: string;
  nextVestingDate?: string;
}

export interface PaymentSchedule {
  id: string;
  amount: number;
  dueDate: string;
  description: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paidDate?: string;
  paymentMethod?: string;
  reference?: string;
  conditions?: string[];
}

export interface EscrowDetails {
  escrowAgent: string;
  escrowAccount: string;
  escrowAmount: number;
  releaseConditions: EscrowReleaseCondition[];
  status: 'active' | 'released' | 'disputed';
  releaseDate?: string;
}

export interface EscrowReleaseCondition {
  id: string;
  description: string;
  status: 'pending' | 'satisfied' | 'waived';
  satisfiedDate?: string;
  requiredBy: string;
}

export interface TransactionKeyDate {
  id: string;
  name: string;
  date: string;
  type: 'milestone' | 'deadline' | 'deliverable' | 'payment' | 'closing';
  status: 'upcoming' | 'completed' | 'overdue' | 'cancelled';
  description?: string;
  responsibleParty: string;
  isCritical: boolean;
}

export interface TransactionParty {
  id: string;
  name: string;
  role: 'buyer' | 'seller' | 'advisor' | 'lawyer' | 'accountant' | 'banker' | 'escrow_agent';
  contactInfo: ContactInfo;
  responsibilities: string[];
  isActive: boolean;
  signedAgreement: boolean;
  signedDate?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: Address;
  company?: string;
  title?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface TransactionDocument {
  id: string;
  name: string;
  type: 'legal' | 'financial' | 'operational' | 'regulatory' | 'closing' | 'other';
  category: string;
  status: 'pending' | 'draft' | 'review' | 'approved' | 'signed' | 'filed';
  requiredBy: string;
  dueDate: string;
  uploadedBy?: string;
  uploadedDate?: string;
  fileSize?: number;
  downloadUrl?: string;
  version: number;
  isLatest: boolean;
  signatures: DocumentSignature[];
  comments: DocumentComment[];
}

export interface DocumentSignature {
  id: string;
  signatoryId: string;
  signatoryName: string;
  signedDate: string;
  signatureMethod: 'electronic' | 'wet_signature' | 'digital';
  ipAddress?: string;
  location?: string;
}

export interface DocumentComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  isResolved: boolean;
}

export interface ClosingChecklistItem {
  id: string;
  category: 'legal' | 'financial' | 'operational' | 'regulatory' | 'closing' | 'post_closing';
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'not_applicable';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  dependencies: string[];
  documents: string[]; // Document IDs
  comments: ChecklistComment[];
  isRequired: boolean;
}

export interface ChecklistComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'question' | 'concern' | 'resolution';
}

export interface TransactionPayment {
  id: string;
  type: 'down_payment' | 'closing_payment' | 'earnout_payment' | 'financing_payment' | 'other';
  amount: number;
  currency: string;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod: 'wire_transfer' | 'check' | 'ach' | 'escrow' | 'other';
  reference?: string;
  fromParty: string;
  toParty: string;
  description?: string;
  confirmationNumber?: string;
  bankDetails?: BankDetails;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode?: string;
  accountHolder: string;
}

export interface PostClosingItem {
  id: string;
  title: string;
  description: string;
  type: 'transition' | 'integration' | 'compliance' | 'reporting' | 'other';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  responsibleParty: 'buyer' | 'seller' | 'both';
  estimatedDuration: number; // days
  actualDuration?: number;
  dependencies: string[];
  deliverables: string[];
  comments: PostClosingComment[];
}

export interface PostClosingComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  type: 'update' | 'question' | 'issue' | 'resolution';
}

export interface TransactionCommunication {
  id: string;
  type: 'email' | 'meeting' | 'call' | 'message' | 'notification';
  subject: string;
  content: string;
  from: string;
  to: string[];
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  relatedItemId?: string;
  attachments: string[];
  actionRequired: boolean;
  actionDeadline?: string;
}

export interface TransactionApproval {
  id: string;
  approverId: string;
  approverName: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  timestamp?: string;
  required: boolean;
  approvalType: 'legal' | 'financial' | 'operational' | 'regulatory' | 'final';
}

// Dashboard and UI Types
export interface TransactionDashboard {
  transaction: Transaction;
  progress: TransactionProgress;
  upcomingDeadlines: TransactionKeyDate[];
  recentActivity: TransactionActivity[];
  teamStatus: TransactionTeamStatus[];
  financialSummary: FinancialSummary;
}

export interface TransactionProgress {
  overallProgress: number;
  categoryProgress: Record<string, number>;
  tasksCompleted: number;
  tasksTotal: number;
  documentsCompleted: number;
  documentsTotal: number;
  paymentsCompleted: number;
  paymentsTotal: number;
  daysToClosing: number;
  onTrack: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface TransactionActivity {
  id: string;
  type:
    | 'task_completed'
    | 'document_uploaded'
    | 'payment_made'
    | 'milestone_reached'
    | 'communication'
    | 'status_changed';
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
  metadata?: Record<string, any>;
}

export interface TransactionTeamStatus {
  userId: string;
  name: string;
  role: string;
  isOnline: boolean;
  lastActive: string;
  pendingTasks: number;
  completedTasks: number;
  overdueItems: number;
}

export interface FinancialSummary {
  totalValue: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  nextPayment?: TransactionPayment;
  escrowAmount?: number;
  earnoutProgress?: EarnoutProgressSummary;
}

export interface EarnoutProgressSummary {
  totalEarnout: number;
  earnedToDate: number;
  remainingAmount: number;
  nextMilestone?: EarnoutMilestone;
  progressPercentage: number;
}

// API Request/Response Types
export interface CreateTransactionRequest {
  offerId: string;
  closingDate: string;
  type: Transaction['type'];
  paymentStructure: TransactionPaymentStructure;
  parties: Omit<TransactionParty, 'id'>[];
  keyDates: Omit<TransactionKeyDate, 'id'>[];
}

export interface UpdateTransactionRequest {
  transactionId: string;
  updates: Partial<Transaction>;
  reason?: string;
}

export interface UpdateChecklistItemRequest {
  itemId: string;
  status: ClosingChecklistItem['status'];
  comments?: string;
  completedDate?: string;
}

export interface ProcessPaymentRequest {
  paymentId: string;
  amount: number;
  paymentMethod: TransactionPayment['paymentMethod'];
  reference?: string;
  confirmationNumber?: string;
  bankDetails?: BankDetails;
}

export interface UploadDocumentRequest {
  transactionId: string;
  document: File;
  type: TransactionDocument['type'];
  category: string;
  requiredBy: string;
  dueDate: string;
}

export interface SignDocumentRequest {
  documentId: string;
  signatoryId: string;
  signatureMethod: DocumentSignature['signatureMethod'];
  location?: string;
}

export interface AddCommunicationRequest {
  transactionId: string;
  type: TransactionCommunication['type'];
  subject: string;
  content: string;
  to: string[];
  priority: TransactionCommunication['priority'];
  relatedItemId?: string;
  attachments?: string[];
}

// Notification Types
export interface TransactionNotification {
  id: string;
  type:
    | 'deadline_reminder'
    | 'payment_due'
    | 'document_required'
    | 'milestone_reached'
    | 'status_change'
    | 'approval_required';
  transactionId: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionRequired: boolean;
  actionUrl?: string;
  relatedItemId?: string;
}

// Analytics Types
export interface TransactionAnalytics {
  timeRange: {
    start: string;
    end: string;
  };
  metrics: {
    totalTransactions: number;
    completedTransactions: number;
    averageClosingTime: number; // days
    successRate: number; // percentage
    averageValue: number;
    paymentCompletionRate: number;
  };
  trends: {
    closingTimes: { date: string; days: number }[];
    transactionValues: { date: string; value: number }[];
    successRates: { date: string; rate: number }[];
  };
  breakdown: {
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    byPaymentType: Record<string, number>;
    byIndustry: Record<string, number>;
  };
}

// Search and Filter Types
export interface TransactionFilters {
  status?: Transaction['status'][];
  type?: Transaction['type'][];
  valueRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: string;
    end: string;
  };
  assignedTo?: string[];
  priority?: string[];
  hasOverdueItems?: boolean;
}

export interface TransactionSearchParams {
  query?: string;
  filters?: TransactionFilters;
  sortBy?: 'closingDate' | 'value' | 'status' | 'progress';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Workflow Types
export interface TransactionWorkflow {
  id: string;
  name: string;
  description: string;
  type: Transaction['type'];
  steps: TransactionWorkflowStep[];
  isActive: boolean;
  applicableRoles: string[];
}

export interface TransactionWorkflowStep {
  id: string;
  name: string;
  description: string;
  order: number;
  requiredRole: string;
  isRequired: boolean;
  estimatedDuration: number; // hours
  dependencies: string[];
  deliverables: string[];
  actions: TransactionWorkflowAction[];
}

export interface TransactionWorkflowAction {
  id: string;
  name: string;
  type: 'approve' | 'reject' | 'modify' | 'request_info' | 'escalate' | 'complete';
  required: boolean;
  conditions?: string[];
}
