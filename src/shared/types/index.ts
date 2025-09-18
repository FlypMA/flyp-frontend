// 🔧 Shared Types - MVP Version
// Location: src/shared/types/index.ts
// Purpose: Centralized exports for all shared types

// User Types
export * from './user';

// SEO Types
export * from './seo';

// API Types
export * from './api';
// Auth types are exported from user.ts
export * from './api-business';

// Re-export main types for convenience
export type {
  AuthProvider, AuthResponse,
  AuthResult, Country, Language, LoginRequest,
  RegisterRequest, SupabaseAuthResponse, SupabaseAuthUser,
  SupabaseSession, SupabaseUserMetadata, UpdateBusinessInfoRequest, UpdateProfileRequest, User, UserPreferences, UserResponse, UserRole
} from './user';

// Re-export type guards and utilities
export {
  ASKING_PRICE_RANGES, BUSINESS_TYPES, convertSupabaseUserToUser,
  convertUserToSupabaseMetadata, COUNTRIES, COUNTRY_LABELS, DEFAULT_USER_VALUES, EMPLOYEE_COUNT_RANGES, hasBusinessInfo, INDUSTRIES, isAdminUser, isBuyerUser, isSellerUser, isVerifiedUser, LANGUAGE_LABELS, LANGUAGES, LISTING_STATUSES, REVENUE_RANGES, USER_ROLES
} from './user';

