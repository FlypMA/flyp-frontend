// 🔗 API Configuration - MVP Version
// Location: src/config/api-config.ts
// Purpose: Centralized API configuration for MVP frontend

// =============================================================================
// ENVIRONMENT DETECTION
// =============================================================================

export const isDevelopment = (import.meta as any).env?.DEV;
export const isProduction = (import.meta as any).env?.PROD;

// =============================================================================
// API CONFIGURATION
// =============================================================================

/**
 * API Configuration for MVP Frontend
 * Supports both Supabase and custom backend integration
 */
export const API_CONFIG = {
  // Supabase Configuration
  SUPABASE: {
    url: (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
    anonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    isValid: !!(
      (import.meta as any).env?.VITE_SUPABASE_URL &&
      (import.meta as any).env?.VITE_SUPABASE_ANON_KEY
    ),
  },

  // Custom Backend Configuration (for additional services)
  BACKEND: {
    baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // API Endpoints
  ENDPOINTS: {
    // Authentication endpoints (Supabase handles these)
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      logout: '/api/auth/logout',
      refresh: '/api/auth/refresh',
      profile: '/api/auth/profile',
      resetPassword: '/api/auth/reset-password',
      verifyEmail: '/api/auth/verify-email',
    },

    // User management endpoints
    users: {
      profile: '/api/users/profile',
      update: '/api/users/update',
      business: '/api/users/business',
      preferences: '/api/users/preferences',
      delete: '/api/users/delete',
    },

    // Business/Listing endpoints
    listings: {
      list: '/api/listings',
      create: '/api/listings',
      update: '/api/listings/:id',
      delete: '/api/listings/:id',
      search: '/api/listings/search',
      analytics: '/api/listings/:id/analytics',
      inquiries: '/api/listings/:id/inquiries',
    },

    // Messaging endpoints
    messages: {
      conversations: '/api/messages/conversations',
      messages: '/api/messages/:conversationId',
      send: '/api/messages/send',
      markRead: '/api/messages/:id/read',
    },

    // File upload endpoints
    upload: {
      images: '/api/upload/images',
      documents: '/api/upload/documents',
      avatar: '/api/upload/avatar',
    },

    // Analytics endpoints
    analytics: {
      dashboard: '/api/analytics/dashboard',
      listings: '/api/analytics/listings',
      user: '/api/analytics/user',
    },
  },

  // Request Configuration
  REQUEST: {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Development Configuration
  DEV: {
    bypassAuth: (import.meta as any).env?.VITE_DEV_BYPASS_AUTH === 'true',
    mockData: (import.meta as any).env?.VITE_DEV_MOCK_DATA === 'true',
    debugLogs: (import.meta as any).env?.VITE_DEV_DEBUG_LOGS === 'true',
    apiDelay: parseInt((import.meta as any).env?.VITE_DEV_API_DELAY || '0'),
  },
} as const;

// =============================================================================
// API UTILITIES
// =============================================================================

/**
 * Get full API URL for an endpoint
 */
export const getApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  let url = `${API_CONFIG.BACKEND.baseURL}${endpoint}`;

  // Replace URL parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, encodeURIComponent(value));
    });
  }

  return url;
};

/**
 * Get Supabase configuration
 */
export const getSupabaseConfig = () => {
  return {
    url: API_CONFIG.SUPABASE.url,
    key: API_CONFIG.SUPABASE.anonKey,
    isValid: API_CONFIG.SUPABASE.isValid,
  };
};

/**
 * Check if API is available
 */
export const isApiAvailable = (): boolean => {
  return API_CONFIG.SUPABASE.isValid || API_CONFIG.BACKEND.baseURL !== 'http://localhost:3001';
};

/**
 * Get request headers with authentication
 */
export const getRequestHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = { ...API_CONFIG.REQUEST.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// =============================================================================
// ERROR HANDLING CONFIGURATION
// =============================================================================

export const API_ERROR_CONFIG = {
  // Retry configuration
  retryAttempts: 3,
  retryDelay: 1000,
  retryBackoff: 2,

  // Timeout configuration
  timeout: 30000,

  // Error codes that should trigger retry
  retryableErrors: [408, 429, 500, 502, 503, 504],

  // Error messages
  messages: {
    networkError: 'Network error. Please check your connection.',
    timeoutError: 'Request timed out. Please try again.',
    serverError: 'Server error. Please try again later.',
    unauthorizedError: 'Unauthorized. Please log in again.',
    forbiddenError: 'Access denied.',
    notFoundError: 'Resource not found.',
    validationError: 'Invalid data provided.',
    unknownError: 'An unexpected error occurred.',
  },
} as const;

// =============================================================================
// DEVELOPMENT HELPERS
// =============================================================================

/**
 * Log API configuration in development
 */
export const logApiConfig = () => {
  if (isDevelopment && API_CONFIG.DEV.debugLogs) {
    // API configuration logging removed for production
  }
};

// Log configuration on import in development
if (isDevelopment) {
  logApiConfig();
}
