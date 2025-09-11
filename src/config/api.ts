/**
 * 🔧 API CONFIGURATION - Flyp M&A Platform
 * Central configuration for API endpoints, error handling, and monitoring
 * Built by Senior CTO for production-ready API management
 */

// =============================================================================
// ENVIRONMENT DETECTION
// =============================================================================

export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
export const isTesting = import.meta.env.MODE === 'test';

// =============================================================================
// ERROR CONFIGURATION
// =============================================================================

export const ERROR_CONFIG = {
  // User-friendly error messages
  USER_MESSAGES: {
    AUTH_ERROR: 'Your session has expired. Please log in again.',
    RATE_LIMIT_ERROR: 'Too many requests. Please wait a moment and try again.',
    SERVER_ERROR: "We're experiencing technical difficulties. Please try again later.",
    NETWORK_ERROR: 'Connection lost. Please check your internet and try again.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    CLIENT_ERROR: 'Something went wrong. Please try again.',
    PERMISSION_ERROR: "You don't have permission to perform this action.",
    NOT_FOUND_ERROR: 'The requested resource was not found.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
  },

  // Error severity levels
  SEVERITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Error types
  ERROR_TYPES: {
    JAVASCRIPT: 'javascript',
    API: 'api',
    NETWORK: 'network',
    SECURITY: 'security',
    BUSINESS: 'business',
  } as const,

  // User impact levels
  USER_IMPACT: {
    NONE: 'none',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,
} as const;

// =============================================================================
// MONITORING CONFIGURATION
// =============================================================================

export const MONITORING_CONFIG = {
  // Enable monitoring in production
  ENABLED: isProduction || import.meta.env.VITE_ENABLE_MONITORING === 'true',

  // Error reporting
  ERROR_REPORTING: {
    MAX_ERRORS_PER_SESSION: 50,
    MAX_BREADCRUMBS: 50,
    REPORT_INTERVAL: 30000, // 30 seconds
    BATCH_SIZE: 10,
  },

  // Performance monitoring
  PERFORMANCE: {
    TRACK_API_CALLS: true,
    TRACK_NAVIGATION: true,
    TRACK_USER_INTERACTIONS: true,
    SAMPLE_RATE: isProduction ? 0.1 : 1.0, // 10% in production, 100% in development
  },

  // Analytics
  ANALYTICS: {
    TRACK_ERRORS: true,
    TRACK_USER_FLOWS: true,
    TRACK_CONVERSION_EVENTS: true,
  },
} as const;

// =============================================================================
// API CONFIGURATION
// =============================================================================

export const API_CONFIG = {
  // Request timeouts
  TIMEOUTS: {
    DEFAULT: 30000, // 30 seconds
    UPLOAD: 120000, // 2 minutes
    DOWNLOAD: 300000, // 5 minutes
    LONG_RUNNING: 600000, // 10 minutes
  },

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 1000,
    BACKOFF_FACTOR: 2,
    RETRYABLE_STATUSES: [408, 429, 500, 502, 503, 504],
  },

  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 60000, // 1 minute
    MAX_REQUESTS: 100,
    SKIP_SUCCESSFUL_REQUESTS: false,
  },

  // Cache settings
  CACHE: {
    DEFAULT_TTL: 300000, // 5 minutes
    MAX_SIZE: 100, // Max cached responses
    EXCLUDE_METHODS: ['POST', 'PUT', 'DELETE', 'PATCH'],
  },

  // Security headers
  SECURITY: {
    INCLUDE_CREDENTIALS: false,
    CORS_HEADERS: {
      'Access-Control-Allow-Origin': isProduction ? 'https://app.flyp.com' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  },
} as const;

// =============================================================================
// ENVIRONMENT VARIABLES
// =============================================================================

export const ENV_CONFIG = {
  // API URLs
  NODE_BACKEND_URL: import.meta.env.VITE_NODE_BACKEND_URL || 'http://localhost:3001',
  AI_BACKEND_URL: import.meta.env.VITE_AI_BACKEND_URL || 'http://localhost:8001',
  DATA_BACKEND_URL: import.meta.env.VITE_DATA_BACKEND_URL || 'http://localhost:8002',

  // Authentication
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || 'dev-secret-key',
  AUTH_COOKIE_NAME: import.meta.env.VITE_AUTH_COOKIE_NAME || 'flyp_auth',
  REFRESH_TOKEN_KEY: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'flyp_refresh',

  // External services
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  MIXPANEL_TOKEN: import.meta.env.VITE_MIXPANEL_TOKEN,

  // Feature flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_MONITORING: import.meta.env.VITE_ENABLE_MONITORING === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true' || isDevelopment,
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true',

  // Performance
  LAZY_LOADING: import.meta.env.VITE_LAZY_LOADING !== 'false',
  PREFETCH_ROUTES: import.meta.env.VITE_PREFETCH_ROUTES === 'true',
  SERVICE_WORKER: import.meta.env.VITE_SERVICE_WORKER === 'true',

  // Security
  CSP_NONCE: import.meta.env.VITE_CSP_NONCE,
  ENCRYPTION_KEY: import.meta.env.VITE_ENCRYPTION_KEY,
} as const;

// =============================================================================
// VALIDATION
// =============================================================================

export function validateConfig(): void {
  const requiredEnvVars = ['VITE_NODE_BACKEND_URL'];

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0 && isProduction) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  if (isDevelopment && missingVars.length > 0) {
    console.warn('Missing environment variables (using defaults):', missingVars);
  }
}

// =============================================================================
// API ENDPOINTS
// =============================================================================

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY: '/api/auth/verify',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    PROFILE: '/api/auth/profile',
  },

  // Users
  USERS: {
    LIST: '/api/users',
    GET: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
    AVATAR: (id: string) => `/api/users/${id}/avatar`,
    PREFERENCES: (id: string) => `/api/users/${id}/preferences`,
  },

  // Organizations
  ORGANIZATIONS: {
    LIST: '/api/organizations',
    GET: (id: string) => `/api/organizations/${id}`,
    CREATE: '/api/organizations',
    UPDATE: (id: string) => `/api/organizations/${id}`,
    DELETE: (id: string) => `/api/organizations/${id}`,
    MEMBERS: (id: string) => `/api/organizations/${id}/members`,
    INVITE: (id: string) => `/api/organizations/${id}/invite`,
  },

  // Listings
  LISTINGS: {
    LIST: '/api/listings',
    GET: (id: string) => `/api/listings/${id}`,
    CREATE: '/api/listings',
    UPDATE: (id: string) => `/api/listings/${id}`,
    DELETE: (id: string) => `/api/listings/${id}`,
    FAVORITES: '/api/listings/favorites',
    SEARCH: '/api/listings/search',
    FEATURED: '/api/listings/featured',
  },

  // Inquiries
  INQUIRIES: {
    LIST: '/api/inquiries',
    GET: (id: string) => `/api/inquiries/${id}`,
    CREATE: '/api/inquiries',
    UPDATE: (id: string) => `/api/inquiries/${id}`,
    DELETE: (id: string) => `/api/inquiries/${id}`,
    RESPOND: (id: string) => `/api/inquiries/${id}/respond`,
  },

  // Documents
  DOCUMENTS: {
    LIST: '/api/documents',
    GET: (id: string) => `/api/documents/${id}`,
    UPLOAD: '/api/documents/upload',
    DELETE: (id: string) => `/api/documents/${id}`,
    DOWNLOAD: (id: string) => `/api/documents/${id}/download`,
    SHARE: (id: string) => `/api/documents/${id}/share`,
  },

  // Search
  SEARCH: {
    GLOBAL: '/api/search',
    LISTINGS: '/api/search/listings',
    ORGANIZATIONS: '/api/search/organizations',
    DOCUMENTS: '/api/search/documents',
    SUGGESTIONS: '/api/search/suggestions',
  },

  // Monitoring
  MONITORING: {
    ERRORS: '/api/monitoring/errors',
    PERFORMANCE: '/api/monitoring/performance',
    ANALYTICS: '/api/monitoring/analytics',
    HEALTH: '/api/health',
  },

  // Billing
  BILLING: {
    PLANS: '/api/billing/plans',
    SUBSCRIPTION: '/api/billing/subscription',
    PAYMENT_METHODS: '/api/billing/payment-methods',
    INVOICES: '/api/billing/invoices',
    USAGE: '/api/billing/usage',
  },
} as const;

// =============================================================================
// INITIALIZATION
// =============================================================================

// Validate configuration on import
if (typeof window !== 'undefined') {
  try {
    validateConfig();
  } catch (error) {
    console.error('Configuration validation failed:', error);
    if (isProduction) {
      throw error;
    }
  }
}

// =============================================================================
// ADDITIONAL CONFIG OBJECTS FOR COMPATIBILITY
// =============================================================================

export const SECURITY_CONFIG = {
  TOKEN_STORAGE_KEY: 'flyp_token',
  REFRESH_TOKEN_KEY: 'flyp_refresh_token',
  TOKEN_REFRESH_THRESHOLD: 300000, // 5 minutes
  REQUEST_ID_HEADER: 'X-Request-ID',
  CONTENT_SECURITY_POLICY: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'"],
    'font-src': ["'self'"],
    'object-src': ["'none'"],
    'media-src': ["'self'"],
    'frame-src': ["'none'"],
  },
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

export const REQUEST_CONFIG = {
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  TIMEOUT: API_CONFIG.TIMEOUTS.DEFAULT,
  RETRY_COUNT: API_CONFIG.RETRY.MAX_ATTEMPTS,
  RETRY_DELAY: API_CONFIG.RETRY.DELAY_MS,
  RETRY_EXPONENTIAL_BASE: API_CONFIG.RETRY.BACKOFF_FACTOR,
} as const;

export const CONFIG = {
  ENABLE_ANALYTICS: !isDevelopment,
} as const;

export function getApiUrl(endpoint: string): string {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return `${baseUrl}${endpoint}`;
}

// Export everything
export default {
  ERROR_CONFIG,
  MONITORING_CONFIG,
  API_CONFIG,
  ENV_CONFIG,
  API_ENDPOINTS,
  isDevelopment,
  isProduction,
  isTesting,
  validateConfig,
};
