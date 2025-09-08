// =============================================================================
// FRONTEND LOCAL TYPE DEFINITIONS
// =============================================================================
// Frontend-specific types - fully self-contained
// No external type dependencies for production reliability
// =============================================================================

// Export all frontend types from local definitions
export * from './entities';
export * from './api';
export * from './store';

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
export type { ApiResponse, AuthResponse, ListingResponse, ListingListResponse } from './api';
export type { AppState, AuthState, UIState, FormState, AsyncState } from './store';
