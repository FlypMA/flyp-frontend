// 🔧 Shared Services - MVP Version
// Location: src/shared/services/index.ts
// Purpose: Centralized exports for all shared services

// Authentication Service (Modular)
export {
  authService,
  AuthenticationService,
  default as authenticationService
} from './auth/Auth';

// Supabase Client (from config)
export { supabase } from '../../config';

// Types (re-exported from shared types)
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
  UserPreferences
} from '../types';

// URL Generator Service
export { UrlGenerator, default as UrlGeneratorDefault } from './urls/urlGenerator';
