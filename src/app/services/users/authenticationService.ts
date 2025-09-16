/**
 * Authentication Service - Compatibility Layer
 * 
 * Re-exports the authentication service from the shared services
 * for backward compatibility with existing import paths.
 */

export { authService as default } from '../../../shared/services/auth';
export { authService } from '../../../shared/services/auth';
