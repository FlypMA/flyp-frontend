// 🔧 Shared Types - MVP Version
// Location: src/shared/types/index.ts
// Purpose: Centralized exports for all shared types

// User Types
export * from './user';

// Re-export main types for convenience
export type {
  User,
  UserRole,
  AuthProvider,
  Language,
  Country,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  AuthResult,
  UpdateProfileRequest,
  UpdateBusinessInfoRequest,
  UserResponse,
  UserPreferences,
  SupabaseAuthUser,
  SupabaseSession,
  SupabaseAuthResponse,
  SupabaseUserMetadata
} from './user';

// Re-export type guards and utilities
export {
  isSellerUser,
  isBuyerUser,
  isAdminUser,
  hasBusinessInfo,
  isVerifiedUser,
  convertSupabaseUserToUser,
  convertUserToSupabaseMetadata,
  USER_ROLES,
  COUNTRIES,
  LANGUAGES,
  COUNTRY_LABELS,
  LANGUAGE_LABELS,
  DEFAULT_USER_VALUES,
  INDUSTRIES,
  REVENUE_RANGES,
  ASKING_PRICE_RANGES,
  EMPLOYEE_COUNT_RANGES,
  BUSINESS_TYPES,
  LISTING_STATUSES
} from './user';
