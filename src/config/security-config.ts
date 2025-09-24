/**
 * 🔒 Security Configuration - UpSwitch MVP
 * Security settings for the MVP application
 */

// =============================================================================
// ENVIRONMENT DETECTION
// =============================================================================

export const isDevelopment = (import.meta as any).env?.DEV;
export const isProduction = (import.meta as any).env?.PROD;

// =============================================================================
// SECURITY CONFIGURATION
// =============================================================================

export const SECURITY_CONFIG = {
  // Token storage
  TOKEN_STORAGE_KEY: 'UpSwitch_token',
  REFRESH_TOKEN_KEY: 'UpSwitch_refresh_token',
  TOKEN_REFRESH_THRESHOLD: 300000, // 5 minutes
  REQUEST_ID_HEADER: 'X-Request-ID',

  // Content Security Policy
  CONTENT_SECURITY_POLICY: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // More permissive for MVP
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'connect-src': ["'self'", 'https:', 'wss:'],
    'font-src': ["'self'", 'data:', 'https:'],
    'object-src': ["'none'"],
    'media-src': ["'self'", 'https:'],
    'frame-src': ["'none'"],
    'worker-src': ["'self'", 'blob:'],
    'child-src': ["'self'", 'blob:'],
  },

  // File upload security
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

// =============================================================================
// MONITORING CONFIGURATION
// =============================================================================

export const MONITORING_CONFIG = {
  // Enable monitoring in production
  ENABLED: isProduction || (import.meta as any).env?.VITE_ENABLE_MONITORING === 'true',

  // Security monitoring
  SECURITY: {
    REPORT_VIOLATIONS: true,
    REPORT_THREATS: true,
    MAX_VIOLATIONS_PER_SESSION: 100,
  },
} as const;
