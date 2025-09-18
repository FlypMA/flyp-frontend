// 🔧 Shared Services - Centralized Service Exports
// Location: src/shared/services/index.ts
// Purpose: Single source of truth for all shared services

// =============================================================================
// AUTHENTICATION SERVICES
// =============================================================================

// Main Authentication Service
export { AuthenticationService, default as authenticationService, authService } from './auth';

// Individual Auth Services (for modular usage) - REMOVED FOR SECURITY
// All auth operations now go through the secure AuthService

// =============================================================================
// CONFIGURATION & CLIENT SERVICES
// =============================================================================

// Supabase Client (from config)
export { supabase } from '../../config';

// =============================================================================
// URL & NAVIGATION SERVICES
// =============================================================================

// URL Generator Service
export { UrlGenerator, default as UrlGeneratorDefault } from './urls/urlGenerator';

// Re-export for compatibility
export { UrlGenerator as UrlGeneratorService } from './urls/urlGenerator';

// =============================================================================
// PAYMENT SERVICES
// =============================================================================

// Payment Services
export * from './payments';
export { paymentsApi } from './payments';

// Individual Payment Functions
export { createCheckoutSessionAPI } from './payments/api';

// =============================================================================
// MONITORING & ERROR HANDLING
// =============================================================================

// Error Handling Service
export { errorHandler } from './monitoring/errorHandler';

// =============================================================================
// UTILITY SERVICES
// =============================================================================

// Development Utilities (re-exported from utils)
export {
  checkAuthWithBypass,
  createMockUser,
  devUtils,
  isDevBypassEnabled,
  shouldBypassProtectedRoute
} from '../utils/dev/devBypass';

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Authentication Types
export type {
  AuthProvider,
  AuthResponse,
  AuthResult,
  LoginRequest,
  RegisterRequest,
  UpdateBusinessInfoRequest,
  UpdateProfileRequest,
  User,
  UserPreferences,
  UserResponse,
  UserRole
} from '../types';

// General Types
export type { Country, Language } from '../types';

// =============================================================================
// LEGACY COMPATIBILITY EXPORTS
// =============================================================================

// For backward compatibility with legacy imports
export { authService as AuthService } from './auth';
export { UrlGenerator as urlGeneratorService } from './urls/urlGenerator';

