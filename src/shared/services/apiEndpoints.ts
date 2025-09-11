// 🌐 Unified API Endpoints Configuration
// Location: src/shared/services/apiEndpoints.ts
// Purpose: Single source for all API endpoint definitions

// =============================================================================
// BACKEND CONFIGURATION - UNIFIED
// =============================================================================

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || process.env.NODE_ENV === 'production'
    ? 'https://betweendeals-api.up.railway.app' // Future unified backend
    : 'https://web-production-8d00b.up.railway.app'; // Current working backend

// =============================================================================
// CORE M&A PLATFORM ENDPOINTS
// =============================================================================

export const API_ENDPOINTS = {
  // Authentication & Users
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    verify: '/api/auth/verify',
  },

  users: {
    profile: '/api/users/profile',
    update: '/api/users/profile',
    preferences: '/api/users/preferences',
    subscription: '/api/users/subscription',
  },

  // Business Listings
  businesses: {
    list: '/api/businesses',
    create: '/api/businesses',
    detail: '/api/businesses/:id',
    update: '/api/businesses/:id',
    delete: '/api/businesses/:id',
    search: '/api/businesses/search',
    analytics: '/api/businesses/:id/analytics',
  },

  // Transactions
  transactions: {
    list: '/api/transactions',
    create: '/api/transactions',
    detail: '/api/transactions/:id',
    update: '/api/transactions/:id',
    myTransactions: '/api/transactions/my',
  },

  // Valuations
  valuations: {
    create: '/api/valuations',
    business: '/api/valuations/business/:businessId',
    request: '/api/valuations/request',
  },

  // Inquiries
  inquiries: {
    create: '/api/inquiries',
    list: '/api/inquiries',
    respond: '/api/inquiries/:id/respond',
    business: '/api/inquiries/business/:businessId',
  },

  // Documents
  documents: {
    upload: '/api/documents/upload',
    business: '/api/documents/business/:businessId',
    download: '/api/documents/:id/download',
    delete: '/api/documents/:id',
  },

  // Messaging
  conversations: {
    list: '/api/conversations',
    create: '/api/conversations',
    detail: '/api/conversations/:id',
    messages: '/api/conversations/:id/messages',
    send: '/api/conversations/:id/messages',
  },

  // Search & Discovery
  search: {
    businesses: '/api/search/businesses',
    users: '/api/search/users',
    saved: '/api/search/saved',
    suggestions: '/api/search/suggestions',
  },

  // Analytics
  analytics: {
    dashboard: '/api/analytics/dashboard',
    listings: '/api/analytics/listings',
    market: '/api/analytics/market',
  },

  // System
  health: '/api/health',
  status: '/api/status',
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Replace URL parameters with actual values
 * @param endpoint - Endpoint with parameters (e.g., '/api/users/:id')
 * @param params - Parameters to replace (e.g., { id: '123' })
 * @returns Resolved endpoint
 */
export function resolveEndpoint(endpoint: string, params: Record<string, string | number>): string {
  let resolved = endpoint;

  Object.entries(params).forEach(([key, value]) => {
    resolved = resolved.replace(`:${key}`, String(value));
  });

  return resolved;
}

/**
 * Get full API URL
 * @param endpoint - API endpoint
 * @returns Full URL
 */
export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

// =============================================================================
// LEGACY ENDPOINTS (For Migration)
// =============================================================================

// TODO: Phase out these legacy endpoints
export const LEGACY_ENDPOINTS = {
  ai_backend: 'https://ilara-deep-end-artemis-production.up.railway.app',
  data_backend: 'https://ilara-trends-data-aggregator-aphrodite-production.up.railway.app',
} as const;

// =============================================================================
// EXPORT TYPE DEFINITIONS
// =============================================================================

export type ApiEndpoints = typeof API_ENDPOINTS;
export type EndpointKey = keyof typeof API_ENDPOINTS;
