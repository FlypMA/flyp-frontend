// 🎯 Store Type Definitions - Centralized state typing
import { User } from '@shared/types/user.types';

// =============================================================================
// UI STATE TYPES - Eliminates scattered UI useState
// =============================================================================
export interface UIState {
  // Modal Management
  activeModal: string | null;
  modalProps: Record<string, any>;

  // Loading States (eliminates individual loading useState)
  loadingStates: Record<string, boolean>;

  // Error States (eliminates individual error useState)
  errors: Record<string, string | null>;

  // Form States
  formStates: Record<string, any>;

  // Navigation
  isMenuOpen: boolean;
  activeTab: string;

  // Notifications
  notifications: Notification[];
}

// =============================================================================
// AUTH STATE TYPES - Eliminates scattered auth useState
// =============================================================================
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  hasToken: boolean;
  authCheckComplete: boolean;
  lastAuthCheck: number;
  userRole: string | null;
  permissions: string[];
}

// =============================================================================
// BUSINESS STATE TYPES - Eliminates business-related useState
// =============================================================================
export interface BusinessState {
  currentBusiness: any | null;
  businesses: any[];
  listings: any[];
  valuations: any[];
  documents: any[];
  isLoading: boolean;
  errors: Record<string, string | null>;
}

// =============================================================================
// MARKETPLACE STATE TYPES - Eliminates marketplace useState
// =============================================================================
export interface MarketplaceState {
  listings: any[];
  filters: SearchFilters;
  selectedListing: any | null;
  searchResults: any[];
  totalResults: number;
  currentPage: number;
  isLoading: boolean;
  lastSearch: string;
}

export interface SearchFilters {
  priceRange: [number, number];
  industry: string[];
  location: string[];
  businessType: string[];
  revenue: [number, number];
}

// =============================================================================
// MESSAGING STATE TYPES - Eliminates messaging useState
// =============================================================================
export interface MessagingState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Record<string, Message[]>;
  unreadCounts: Record<string, number>;
  isTyping: Record<string, boolean>;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
  title: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
}

// =============================================================================
// TRANSACTION STATE TYPES - Eliminates transaction useState
// =============================================================================
export interface TransactionState {
  activeTransactions: Transaction[];
  completedTransactions: Transaction[];
  currentTransaction: Transaction | null;
  offers: Offer[];
  dueDiligence: DueDiligenceItem[];
  successFees: SuccessFee[];
  isLoading: boolean;
  errors: Record<string, string | null>;
}

export interface Transaction {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  amount: number;
  currency: string;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  message?: string;
  expiresAt: string;
}

export interface DueDiligenceItem {
  id: string;
  transactionId: string;
  title: string;
  status: 'pending' | 'completed' | 'approved' | 'rejected';
  uploadedAt?: string;
  reviewedAt?: string;
}

export interface SuccessFee {
  id: string;
  transactionId: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'collected' | 'disputed';
  dueDate: string;
}

// =============================================================================
// NOTIFICATION TYPES - Eliminates notification useState
// =============================================================================
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary';
}
