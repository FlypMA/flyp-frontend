/**
 * 🔌 API Types - flyp MVP
 *
 * Comprehensive API type definitions for consistent request/response handling
 * across the entire application.
 *
 * @author Senior CTO
 * @version 1.0.0
 */

// =============================================================================
// CORE API TYPES
// =============================================================================

/**
 * Standard API Response Interface
 *
 * Provides consistent response structure across all API endpoints
 */
export interface ApiResponse<T = any> {
  /** Indicates if the request was successful */
  success: boolean;

  /** Response data payload */
  data?: T;

  /** Error message if request failed */
  error?: string;

  /** Additional message or status information */
  message?: string;

  /** HTTP status code */
  statusCode?: number;

  /** Request timestamp */
  timestamp?: string;

  /** Request ID for tracking */
  requestId?: string;

  /** Pagination metadata (for list endpoints) */
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };

  /** Additional metadata */
  meta?: Record<string, any>;
}

/**
 * API Request Configuration
 *
 * Standardizes request configuration across all API calls
 */
export interface ApiRequestConfig {
  /** HTTP method */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

  /** Request headers */
  headers?: Record<string, string>;

  /** Request body */
  body?: any;

  /** URL parameters */
  params?: Record<string, string | number | boolean>;

  /** Query parameters */
  query?: Record<string, string | number | boolean>;

  /** Request timeout in milliseconds */
  timeout?: number;

  /** Number of retry attempts */
  retryAttempts?: number;

  /** Retry delay in milliseconds */
  retryDelay?: number;

  /** Whether to include credentials */
  credentials?: 'include' | 'omit' | 'same-origin';

  /** Cache control */
  cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';

  /** Signal for aborting requests */
  signal?: AbortSignal;

  /** Whether to validate response */
  validateResponse?: boolean;

  /** Custom response transformer */
  transformResponse?: (data: any) => any;

  /** Custom request transformer */
  transformRequest?: (data: any) => any;
}

/**
 * API Client Interface
 *
 * Defines the contract for API client implementations
 */
export interface ApiClient {
  /** GET request */
  get: <T = any>(url: string, config?: Omit<ApiRequestConfig, 'method'>) => Promise<ApiResponse<T>>;

  /** POST request */
  post: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;

  /** PUT request */
  put: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;

  /** DELETE request */
  delete: <T = any>(
    url: string,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;

  /** PATCH request */
  patch: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;

  /** HEAD request */
  head?: <T = any>(
    url: string,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;

  /** OPTIONS request */
  options?: <T = any>(
    url: string,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

/**
 * API Error Interface
 */
export interface ApiError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** HTTP status code */
  statusCode?: number;

  /** Additional error details */
  details?: Record<string, any>;

  /** Stack trace (development only) */
  stack?: string;

  /** Request ID for tracking */
  requestId?: string;

  /** Timestamp when error occurred */
  timestamp?: string;
}

/**
 * Validation Error Interface
 */
export interface ValidationError {
  /** Field that failed validation */
  field: string;

  /** Validation error message */
  message: string;

  /** Validation rule that failed */
  rule?: string;

  /** Expected value or format */
  expected?: any;

  /** Actual value received */
  received?: any;
}

/**
 * API Error Response Interface
 */
export interface ApiErrorResponse extends ApiResponse<null> {
  success: false;
  error: string;
  errorCode?: string;
  validationErrors?: ValidationError[];
  apiError?: ApiError;
}

// =============================================================================
// PAGINATION TYPES
// =============================================================================

/**
 * Pagination Request Parameters
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page?: number;

  /** Number of items per page */
  limit?: number;

  /** Sort field */
  sortBy?: string;

  /** Sort direction */
  sortOrder?: 'asc' | 'desc';

  /** Search query */
  search?: string;

  /** Additional filters */
  filters?: Record<string, any>;
}

/**
 * Paginated Response Interface
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// =============================================================================
// REQUEST/RESPONSE INTERCEPTORS
// =============================================================================

/**
 * Request Interceptor Function
 */
export type RequestInterceptor = (
  config: ApiRequestConfig
) => ApiRequestConfig | Promise<ApiRequestConfig>;

/**
 * Response Interceptor Function
 */
export type ResponseInterceptor = <T>(
  response: ApiResponse<T>
) => ApiResponse<T> | Promise<ApiResponse<T>>;

/**
 * Error Interceptor Function
 */
export type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>;

// =============================================================================
// API CLIENT CONFIGURATION
// =============================================================================

/**
 * API Client Configuration Interface
 */
export interface ApiClientConfig {
  /** Base URL for all requests */
  baseURL: string;

  /** Default timeout in milliseconds */
  timeout?: number;

  /** Default headers */
  headers?: Record<string, string>;

  /** Default retry configuration */
  retry?: {
    attempts: number;
    delay: number;
    backoff?: 'linear' | 'exponential';
  };

  /** Request interceptors */
  requestInterceptors?: RequestInterceptor[];

  /** Response interceptors */
  responseInterceptors?: ResponseInterceptor[];

  /** Error interceptors */
  errorInterceptors?: ErrorInterceptor[];

  /** Whether to validate responses */
  validateResponses?: boolean;

  /** Whether to log requests (development) */
  logRequests?: boolean;

  /** Authentication configuration */
  auth?: {
    type: 'bearer' | 'basic' | 'custom';
    tokenProvider?: () => string | Promise<string>;
    refreshTokenProvider?: () => string | Promise<string>;
  };
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Extract data type from API response
 */
export type ApiResponseData<T> = T extends ApiResponse<infer U> ? U : never;

/**
 * Make API request config optional
 */
export type OptionalApiConfig = Partial<ApiRequestConfig>;

/**
 * API endpoint definition
 */
export interface ApiEndpoint {
  /** Endpoint path */
  path: string;

  /** HTTP method */
  method: ApiRequestConfig['method'];

  /** Request body schema */
  requestSchema?: any;

  /** Response schema */
  responseSchema?: any;

  /** Whether authentication is required */
  requiresAuth?: boolean;

  /** Rate limit configuration */
  rateLimit?: {
    requests: number;
    window: number; // in seconds
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default ApiResponse;
