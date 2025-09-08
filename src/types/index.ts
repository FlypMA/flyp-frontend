// =============================================================================
// FRONTEND LOCAL TYPE DEFINITIONS
// =============================================================================
// Frontend-specific types - fully self-contained
// No external type dependencies for production reliability
// =============================================================================

// Export all frontend types from local definitions
export * from './entities';
// Note: api exports handled selectively to avoid conflicts
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
export type {
  ApiResponse,
  AuthResponse,
  ListingResponse,
  ListingListResponse,
  UserProfile,
} from './api';
export type { AppState, AuthState, UIState, FormState, AsyncState } from './store';
