// 🔐 Secure Authentication Service - Backend API Only
// Location: src/shared/services/auth/index.ts
// Purpose: Export only the secure backend-based authentication service

/**
 * Authentication Service Exports
 *
 * Architecture: Frontend → Backend API → Supabase → HTTP-only Cookies
 *
 * SECURITY NOTICE:
 * - Frontend does NOT access Supabase directly
 * - All authentication operations go through backend API
 * - HTTP-only cookies provide XSS protection
 * - No sensitive tokens stored in localStorage
 */

// Main authentication service (backend API integration)
export { AuthenticationService, authService } from './AuthService';

// Session manager for local UI state (non-sensitive data only)
export { SessionManager } from './utils/session-manager';

// TypeScript types
export type { AuthResult, User, UserRole } from '../../types';

// Default export for convenience
export { authService as default } from './AuthService';
