// =============================================================================
// FRONTEND LOCAL TYPE DEFINITIONS
// =============================================================================
// Frontend-specific types - fully self-contained
// No external type dependencies for production reliability
// =============================================================================

// Export all frontend types from local definitions
export * from './entities';
export * from './store';

// Export specific API types to avoid conflicts
export type { 
  UserProfile, 
  ApiResponse, 
  AuthResponse, 
  ListingResponse, 
  ListingListResponse,
  ProfileResponse,
  InquiryResponse,
  ConversationResponse,
  DocumentResponse,
  LoginRequest,
  RegisterRequest,
  CreateListingRequest,
  UpdateListingRequest,
  ListingSearchRequest,
  CreateInquiryRequest,
  UpdateInquiryRequest,
  CreateMessageRequest,
  UpdateProfileRequest,
  DocumentUploadRequest,
  HttpStatusCode,
  ApiStatus
} from './api';

// Re-export commonly used types for convenience
export type {
  User,
  Organization,
  Listing,
  Document,
  Inquiry,
  Conversation,
  Message,
  BuyerProfile,
} from './entities';
export type { AppState, AuthState, UIState, FormState, AsyncState } from './store';
