/**
 * Due Diligence Types
 * Location: src/shared/types/due-diligence.ts
 * Purpose: Type definitions for due diligence process
 */

export interface DueDiligenceProcess {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: 'initiated' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  estimatedCompletionDate: string;
  progress: number; // 0-100
  checklist: DueDiligenceChecklist;
  documents: DueDiligenceDocument[];
  communications: DueDiligenceCommunication[];
  reports: DueDiligenceReport[];
  team: DueDiligenceTeamMember[];
}

export interface DueDiligenceChecklist {
  id: string;
  processId: string;
  categories: DueDiligenceCategory[];
  overallProgress: number;
  lastUpdated: string;
}

export interface DueDiligenceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  items: DueDiligenceItem[];
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
}

export interface DueDiligenceItem {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'not_applicable' | 'blocked';
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  documents: string[]; // Document IDs
  comments: DueDiligenceComment[];
  verificationRequired: boolean;
  verificationStatus?: 'pending' | 'verified' | 'failed';
}

export interface DueDiligenceDocument {
  id: string;
  processId: string;
  itemId?: string; // Optional link to checklist item
  name: string;
  description?: string;
  category: string;
  type: 'financial' | 'legal' | 'operational' | 'commercial' | 'technical' | 'hr' | 'other';
  fileType: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected' | 'needs_revision';
  version: number;
  isLatest: boolean;
  downloadUrl: string;
  previewUrl?: string;
  tags: string[];
  comments: DueDiligenceComment[];
  accessLevel: 'buyer' | 'seller' | 'both' | 'advisor';
}

export interface DueDiligenceCommunication {
  id: string;
  processId: string;
  type: 'message' | 'request' | 'response' | 'alert' | 'reminder';
  from: string;
  to: string[];
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments: string[]; // Document IDs
  relatedItemId?: string; // Link to checklist item
  actionRequired?: boolean;
  actionDeadline?: string;
}

export interface DueDiligenceReport {
  id: string;
  processId: string;
  type: 'interim' | 'final' | 'summary';
  title: string;
  content: string;
  generatedBy: string;
  generatedAt: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  findings: DueDiligenceFinding[];
  recommendations: DueDiligenceRecommendation[];
  riskAssessment: DueDiligenceRiskAssessment;
  attachments: string[]; // Document IDs
}

export interface DueDiligenceFinding {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: 'positive' | 'neutral' | 'negative';
  evidence: string[];
  recommendations: string[];
}

export interface DueDiligenceRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  estimatedCost?: number;
  estimatedTimeframe?: string;
  responsibleParty: string;
}

export interface DueDiligenceRiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  financialRisk: 'low' | 'medium' | 'high' | 'critical';
  operationalRisk: 'low' | 'medium' | 'high' | 'critical';
  legalRisk: 'low' | 'medium' | 'high' | 'critical';
  marketRisk: 'low' | 'medium' | 'high' | 'critical';
  risks: DueDiligenceRisk[];
  mitigations: DueDiligenceMitigation[];
}

export interface DueDiligenceRisk {
  id: string;
  title: string;
  description: string;
  category: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface DueDiligenceMitigation {
  id: string;
  riskId: string;
  title: string;
  description: string;
  effectiveness: 'low' | 'medium' | 'high';
  cost: 'low' | 'medium' | 'high';
  timeframe: string;
}

export interface DueDiligenceTeamMember {
  id: string;
  processId: string;
  userId: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'advisor' | 'accountant' | 'lawyer' | 'consultant';
  permissions: DueDiligencePermissions;
  isActive: boolean;
  joinedAt: string;
}

export interface DueDiligencePermissions {
  canViewDocuments: boolean;
  canUploadDocuments: boolean;
  canEditChecklist: boolean;
  canSendMessages: boolean;
  canGenerateReports: boolean;
  canManageTeam: boolean;
  documentAccessLevel: 'none' | 'limited' | 'full';
}

export interface DueDiligenceComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'question' | 'concern' | 'approval' | 'rejection';
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface DueDiligenceTemplate {
  id: string;
  name: string;
  description: string;
  industry: string;
  businessSize: 'small' | 'medium' | 'large';
  categories: DueDiligenceCategory[];
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

// API Request/Response Types
export interface CreateDueDiligenceRequest {
  listingId: string;
  buyerId: string;
  templateId?: string;
  estimatedCompletionDate: string;
  teamMembers: Omit<DueDiligenceTeamMember, 'id' | 'processId' | 'joinedAt'>[];
}

export interface UpdateDueDiligenceItemRequest {
  itemId: string;
  status: DueDiligenceItem['status'];
  comments?: string;
  assignedTo?: string;
  dueDate?: string;
}

export interface UploadDueDiligenceDocumentRequest {
  processId: string;
  itemId?: string;
  file: File;
  category: string;
  description?: string;
  accessLevel: DueDiligenceDocument['accessLevel'];
  tags?: string[];
}

export interface SendDueDiligenceMessageRequest {
  processId: string;
  to: string[];
  subject: string;
  content: string;
  priority: DueDiligenceCommunication['priority'];
  relatedItemId?: string;
  attachments?: string[];
}

// Dashboard and UI Types
export interface DueDiligenceDashboard {
  process: DueDiligenceProcess;
  recentActivity: DueDiligenceActivity[];
  upcomingDeadlines: DueDiligenceDeadline[];
  teamStatus: DueDiligenceTeamStatus[];
  progressMetrics: DueDiligenceProgressMetrics;
}

export interface DueDiligenceActivity {
  id: string;
  type:
    | 'document_uploaded'
    | 'item_completed'
    | 'message_sent'
    | 'report_generated'
    | 'status_changed';
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
  metadata?: Record<string, any>;
}

export interface DueDiligenceDeadline {
  id: string;
  title: string;
  dueDate: string;
  type: 'item' | 'document' | 'report' | 'process';
  priority: 'low' | 'medium' | 'high' | 'critical';
  isOverdue: boolean;
  assignedTo: string;
}

export interface DueDiligenceTeamStatus {
  userId: string;
  name: string;
  role: string;
  isOnline: boolean;
  lastActive: string;
  pendingTasks: number;
  completedTasks: number;
}

export interface DueDiligenceProgressMetrics {
  overallProgress: number;
  categoryProgress: Record<string, number>;
  itemsCompleted: number;
  itemsTotal: number;
  documentsUploaded: number;
  documentsPending: number;
  daysRemaining: number;
  onTrack: boolean;
}
