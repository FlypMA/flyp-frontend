/**
 * 🔌 API Configuration - UpSwitch MVP
 *
 * Centralized API configuration and client setup for consistent
 * API interactions across the application.
 *
 * @author Senior CTO
 * @version 1.0.0
 */

import { ApiClientConfig, ApiRequestConfig } from '../shared/types/api';

// =============================================================================
// API CONFIGURATION
// =============================================================================

/**
 * Base API Configuration
 */
export const API_BASE_CONFIG: ApiClientConfig = {
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  retry: {
    attempts: 3,
    delay: 1000,
    backoff: 'exponential',
  },
  validateResponses: true,
  logRequests: (import.meta as any).env?.NODE_ENV === 'development',
  auth: {
    type: 'bearer',
    tokenProvider: () => {
      // Get token from localStorage or session storage
      return localStorage.getItem('auth_token') || '';
    },
    refreshTokenProvider: () => {
      return localStorage.getItem('refresh_token') || '';
    },
  },
};

/**
 * Default Request Configuration
 */
export const DEFAULT_REQUEST_CONFIG: ApiRequestConfig = {
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  credentials: 'include',
  cache: 'default',
  validateResponse: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// =============================================================================
// ENVIRONMENT-SPECIFIC CONFIGURATIONS
// =============================================================================

/**
 * Development Configuration
 */
export const DEV_CONFIG: Partial<ApiClientConfig> = {
  logRequests: true,
  validateResponses: true,
  timeout: 60000, // Longer timeout for development
};

/**
 * Production Configuration
 */
export const PROD_CONFIG: Partial<ApiClientConfig> = {
  logRequests: false,
  validateResponses: true,
  timeout: 30000,
};

/**
 * Get environment-specific configuration
 */
export const getApiConfig = (): ApiClientConfig => {
  const env = (import.meta as any).env?.NODE_ENV || 'development';

  const baseConfig = { ...API_BASE_CONFIG };

  if (env === 'production') {
    return { ...baseConfig, ...PROD_CONFIG };
  }

  return { ...baseConfig, ...DEV_CONFIG };
};

// =============================================================================
// API ENDPOINTS
// =============================================================================

/**
 * API Endpoints Configuration
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification',
  },

  // Users
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update',
    BUSINESS: '/api/users/business',
    PREFERENCES: '/api/users/preferences',
    DELETE: '/api/users/delete',
    VERIFICATION: '/api/users/verification',
    SECURITY: '/api/users/security',
  },

  // Business Listings
  LISTINGS: {
    LIST: '/api/listings',
    CREATE: '/api/listings',
    GET: (id: string) => `/api/listings/${id}`,
    UPDATE: (id: string) => `/api/listings/${id}`,
    DELETE: (id: string) => `/api/listings/${id}`,
    SEARCH: '/api/listings/search',
    ANALYTICS: (id: string) => `/api/listings/${id}/analytics`,
    INQUIRIES: (id: string) => `/api/listings/${id}/inquiries`,
    FEATURED: '/api/listings/featured',
  },

  // Valuations
  VALUATIONS: {
    CREATE: '/api/valuations',
    GET: (id: string) => `/api/valuations/${id}`,
    LIST: '/api/valuations',
    REPORT: (id: string) => `/api/valuations/${id}/report`,
  },

  // Transactions
  TRANSACTIONS: {
    LIST: '/api/transactions',
    CREATE: '/api/transactions',
    GET: (id: string) => `/api/transactions/${id}`,
    UPDATE: (id: string) => `/api/transactions/${id}`,
    INQUIRIES: '/api/transactions/inquiries',
    NDA: '/api/transactions/nda',
    DUE_DILIGENCE: '/api/transactions/due-diligence',
    OFFERS: '/api/transactions/offers',
  },

  // Messages
  MESSAGES: {
    CONVERSATIONS: '/api/messages/conversations',
    MESSAGES: (conversationId: string) => `/api/messages/${conversationId}`,
    SEND: '/api/messages/send',
    MARK_READ: (id: string) => `/api/messages/${id}/read`,
  },

  // File Upload
  UPLOAD: {
    IMAGES: '/api/upload/images',
    DOCUMENTS: '/api/upload/documents',
    AVATAR: '/api/upload/avatar',
    BUSINESS_DOCS: '/api/upload/business-documents',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
    LISTINGS: '/api/analytics/listings',
    USER: '/api/analytics/user',
    PERFORMANCE: '/api/analytics/performance',
  },

  // Payments
  PAYMENTS: {
    PLANS: '/api/payments/plans',
    SUBSCRIBE: '/api/payments/subscribe',
    CANCEL: '/api/payments/cancel',
    INVOICES: '/api/payments/invoices',
    METHODS: '/api/payments/methods',
  },
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Build URL with parameters
 */
export const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  if (!params) return endpoint;

  const url = new URL(endpoint, API_BASE_CONFIG.baseURL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.pathname + url.search;
};

/**
 * Get authorization header
 */
export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('auth_token');
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Check if request requires authentication
 */
export const requiresAuth = (endpoint: string): boolean => {
  const publicEndpoints = [
    API_ENDPOINTS.AUTH.LOGIN,
    API_ENDPOINTS.AUTH.REGISTER,
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    API_ENDPOINTS.LISTINGS.LIST,
    API_ENDPOINTS.LISTINGS.SEARCH,
  ];

  return !publicEndpoints.some(publicEndpoint => {
    // Handle both static strings and function-generated endpoints
    if (typeof publicEndpoint === 'string') {
      return endpoint === publicEndpoint || endpoint.startsWith(publicEndpoint);
    }
    return false;
  });
};

// =============================================================================
// EXPORTS
// =============================================================================

export default getApiConfig;
