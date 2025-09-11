/**
 * 🔒 SECURE HTTP CLIENT - Flyp M&A Platform
 * Enterprise-grade HTTP client with comprehensive security and error handling
 * Built by Senior CTO for production-ready frontend-backend communication
 */

// TODO: Fix these type imports when paths are resolved
// import {
//   ApiResponse,
//   ErrorResponse,
//   AuthResponse,
//   RefreshTokenResponse,
//   AuthenticationError,
//   AuthorizationError,
//   ValidationErrorResponse,
//   RateLimitError,
//   HttpStatusCode,
// } from '@/types/shared';

// Placeholder types
type ApiResponse<T> = any;
type ErrorResponse = any;
type AuthResponse = any;
type RefreshTokenResponse = any;
type AuthenticationError = any;
type AuthorizationError = any;
type ValidationErrorResponse = any;
type RateLimitError = any;
type HttpStatusCode = number;

import {
  ERROR_CONFIG,
  API_CONFIG,
  SECURITY_CONFIG,
  REQUEST_CONFIG,
  CONFIG,
  getApiUrl,
  isDevelopment,
} from '../../config/api';

// =============================================================================
// INTERFACES & TYPES
// =============================================================================

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
  timeout?: number;
  retries?: number;
  requireAuth?: boolean;
  skipTokenRefresh?: boolean;
  signal?: AbortSignal;
}

interface SecurityContext {
  requestId: string;
  timestamp: number;
  userAgent: string;
  fingerprint?: string;
}

interface RequestMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  retryCount: number;
  endpoint: string;
  method: string;
  statusCode?: number;
  error?: string;
}

// =============================================================================
// TOKEN MANAGEMENT
// =============================================================================

class TokenManager {
  private static instance: TokenManager;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;
  private tokenExpiry: number = 0;

  private constructor() {
    this.loadTokensFromStorage();
  }

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  private loadTokensFromStorage(): void {
    try {
      // Use secure storage if available, fallback to localStorage
      const secureStorage = this.getSecureStorage();
      this.token = secureStorage.getItem(SECURITY_CONFIG.TOKEN_STORAGE_KEY);
      this.refreshToken = secureStorage.getItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY);

      // Parse token expiry from JWT if available
      if (this.token) {
        this.parseTokenExpiry(this.token);
      }
    } catch (error) {
      console.warn('Failed to load tokens from storage:', error);
    }
  }

  private getSecureStorage(): Storage {
    // In a real production app, you might use a more secure storage mechanism
    // For now, using localStorage with plans to upgrade to secure cookies
    return localStorage;
  }

  private parseTokenExpiry(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.tokenExpiry = payload.exp * 1000; // Convert to milliseconds
    } catch (error) {
      console.warn('Failed to parse token expiry:', error);
      this.tokenExpiry = 0;
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  setTokens(accessToken: string, refreshToken?: string): void {
    this.token = accessToken;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }

    // Store securely
    const secureStorage = this.getSecureStorage();
    secureStorage.setItem(SECURITY_CONFIG.TOKEN_STORAGE_KEY, accessToken);
    if (refreshToken) {
      secureStorage.setItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
    }

    this.parseTokenExpiry(accessToken);
  }

  clearTokens(): void {
    this.token = null;
    this.refreshToken = null;
    this.tokenExpiry = 0;

    const secureStorage = this.getSecureStorage();
    secureStorage.removeItem(SECURITY_CONFIG.TOKEN_STORAGE_KEY);
    secureStorage.removeItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    if (!this.token || !this.tokenExpiry) return true;
    return Date.now() >= this.tokenExpiry - SECURITY_CONFIG.TOKEN_REFRESH_THRESHOLD;
  }

  async refreshTokenIfNeeded(): Promise<string | null> {
    if (!this.isTokenExpired()) {
      return this.token;
    }

    if (!this.refreshToken) {
      this.clearTokens();
      throw new Error('No refresh token available');
    }

    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();

    try {
      const newToken = await this.refreshPromise;
      this.refreshPromise = null;
      return newToken;
    } catch (error) {
      this.refreshPromise = null;
      this.clearTokens();
      throw error;
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const response = await fetch(getApiUrl('/api/auth/refresh'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: this.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data: RefreshTokenResponse = await response.json();

    if (!data.success || !data.data?.token) {
      throw new Error('Invalid token refresh response');
    }

    this.setTokens(data.data.token, this.refreshToken);
    return data.data.token;
  }
}

// =============================================================================
// REQUEST INTERCEPTORS
// =============================================================================

class RequestInterceptor {
  static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static generateSecurityContext(): SecurityContext {
    return {
      requestId: this.generateRequestId(),
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      fingerprint: this.generateFingerprint(),
    };
  }

  private static generateFingerprint(): string {
    // Simple browser fingerprinting for security purposes
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('Flyp', 0, 0);

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join('|');

    return btoa(fingerprint).slice(0, 16);
  }

  static addSecurityHeaders(
    headers: Record<string, string>,
    context: SecurityContext
  ): Record<string, string> {
    return {
      ...headers,
      [SECURITY_CONFIG.REQUEST_ID_HEADER]: context.requestId,
      'X-Client-Timestamp': context.timestamp.toString(),
      'X-Client-Fingerprint': context.fingerprint || '',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }
}

// =============================================================================
// ERROR HANDLER
// =============================================================================

class ErrorHandler {
  static handleHttpError(response: Response, data: any): never {
    const context = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      data,
    };

    if (isDevelopment) {
      console.error('HTTP Error:', context);
    }

    switch (response.status) {
      case HttpStatusCode.UNAUTHORIZED:
        // Clear tokens on authentication failure
        TokenManager.getInstance().clearTokens();
        throw this.createError('AUTH_ERROR', data.error || ERROR_CONFIG.USER_MESSAGES.AUTH_ERROR);

      case HttpStatusCode.FORBIDDEN:
        throw this.createError('AUTH_ERROR', data.error || 'Access denied');

      case HttpStatusCode.BAD_REQUEST:
      case HttpStatusCode.UNPROCESSABLE_ENTITY:
        throw this.createError(
          'VALIDATION_ERROR',
          data.error || ERROR_CONFIG.USER_MESSAGES.VALIDATION_ERROR,
          data.details
        );

      case 429: // Too Many Requests
        const retryAfter = response.headers.get('Retry-After');
        throw this.createError('RATE_LIMIT_ERROR', ERROR_CONFIG.USER_MESSAGES.RATE_LIMIT_ERROR, {
          retryAfter,
        });

      case HttpStatusCode.NOT_FOUND:
        throw this.createError('CLIENT_ERROR', 'The requested resource was not found');

      case HttpStatusCode.CONFLICT:
        throw this.createError('CLIENT_ERROR', data.error || 'Conflict with existing data');

      case HttpStatusCode.INTERNAL_SERVER_ERROR:
      case 502: // BAD_GATEWAY
      case HttpStatusCode.SERVICE_UNAVAILABLE:
      case 504: // GATEWAY_TIMEOUT
        throw this.createError('SERVER_ERROR', ERROR_CONFIG.USER_MESSAGES.SERVER_ERROR);

      default:
        if (response.status >= 500) {
          throw this.createError('SERVER_ERROR', ERROR_CONFIG.USER_MESSAGES.SERVER_ERROR);
        } else {
          throw this.createError(
            'CLIENT_ERROR',
            data.error || ERROR_CONFIG.USER_MESSAGES.CLIENT_ERROR
          );
        }
    }
  }

  static handleNetworkError(error: Error): never {
    if (isDevelopment) {
      console.error('Network Error:', error);
    }

    if (error.name === 'AbortError') {
      throw this.createError('NETWORK_ERROR', 'Request was cancelled');
    }

    if (error.message.includes('timeout')) {
      throw this.createError('NETWORK_ERROR', 'Request timed out. Please try again.');
    }

    throw this.createError('NETWORK_ERROR', ERROR_CONFIG.USER_MESSAGES.NETWORK_ERROR);
  }

  private static createError(type: string, message: string, details?: any): Error {
    const error = new Error(message) as any;
    error.type = type;
    error.details = details;
    error.timestamp = Date.now();
    return error;
  }
}

// =============================================================================
// PERFORMANCE MONITOR
// =============================================================================

class PerformanceMonitor {
  private static metrics: Map<string, RequestMetrics> = new Map();

  static startRequest(requestId: string, endpoint: string, method: string): void {
    this.metrics.set(requestId, {
      startTime: performance.now(),
      retryCount: 0,
      endpoint,
      method,
    });
  }

  static endRequest(requestId: string, statusCode: number, error?: string): void {
    const metric = this.metrics.get(requestId);
    if (!metric) return;

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    metric.statusCode = statusCode;
    metric.error = error;

    this.reportMetrics(metric);
    this.metrics.delete(requestId);
  }

  static incrementRetry(requestId: string): void {
    const metric = this.metrics.get(requestId);
    if (metric) {
      metric.retryCount++;
    }
  }

  private static reportMetrics(metric: RequestMetrics): void {
    if (isDevelopment) {
      console.log(`[API Performance] ${metric.method} ${metric.endpoint}:`, {
        duration: `${metric.duration?.toFixed(2)}ms`,
        retries: metric.retryCount,
        status: metric.statusCode,
        error: metric.error,
      });
    }

    // In production, send to analytics service
    if (CONFIG.ENABLE_ANALYTICS && metric.duration) {
      this.sendAnalytics(metric);
    }
  }

  private static sendAnalytics(metric: RequestMetrics): void {
    // Implementation would send to your analytics service
    // Example: Google Analytics, DataDog, custom analytics endpoint
  }
}

// =============================================================================
// SECURE HTTP CLIENT
// =============================================================================

export class SecureHttpClient {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = TokenManager.getInstance();
  }

  /**
   * Make authenticated HTTP request with comprehensive security and error handling
   */
  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const context = RequestInterceptor.generateSecurityContext();
    const method = options.method || 'GET';
    const fullUrl = getApiUrl(endpoint);

    PerformanceMonitor.startRequest(context.requestId, endpoint, method);

    // Prepare request configuration
    const config = await this.prepareRequestConfig(options, context);

    // Execute request with retry logic
    return this.executeWithRetry(
      fullUrl,
      config,
      context,
      options.retries || REQUEST_CONFIG.RETRY_COUNT
    );
  }

  /**
   * Prepare request configuration with security headers and authentication
   */
  private async prepareRequestConfig(
    options: RequestOptions,
    context: SecurityContext
  ): Promise<RequestInit> {
    // Base headers
    let headers = {
      ...REQUEST_CONFIG.DEFAULT_HEADERS,
      ...options.headers,
    };

    // Add security headers
    headers = RequestInterceptor.addSecurityHeaders(headers, context) as any;

    // Handle authentication
    if (options.requireAuth !== false) {
      try {
        const token = await this.tokenManager.refreshTokenIfNeeded();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        if (options.requireAuth === true) {
          throw error;
        }
      }
    }

    // Prepare body
    let body: string | FormData | undefined;
    if (options.body && options.method !== 'GET') {
      if (options.body instanceof FormData) {
        body = options.body;
        // Remove Content-Type header for FormData (browser will set it with boundary)
        delete headers['Content-Type'];
      } else {
        body = JSON.stringify(options.body);
      }
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeout = options.timeout || REQUEST_CONFIG.TIMEOUT;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Combine signals if provided
    const signal = options.signal
      ? this.combineAbortSignals([controller.signal, options.signal])
      : controller.signal;

    return {
      method: options.method || 'GET',
      headers,
      body,
      signal,
      credentials: 'same-origin',
      mode: 'cors',
      cache: 'no-cache',
    };
  }

  /**
   * Execute request with exponential backoff retry logic
   */
  private async executeWithRetry<T>(
    url: string,
    config: RequestInit,
    context: SecurityContext,
    maxRetries: number
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          PerformanceMonitor.incrementRetry(context.requestId);

          // Exponential backoff delay
          const delay =
            REQUEST_CONFIG.RETRY_DELAY *
            Math.pow(REQUEST_CONFIG.RETRY_EXPONENTIAL_BASE, attempt - 1);
          await this.delay(delay);
        }

        // Make the request
        const response = await fetch(url, config);
        const data = await response.json();

        // Handle HTTP errors
        if (!response.ok) {
          // Check if this is a retryable error (using common retry status codes)
          const retryStatusCodes = [408, 429, 500, 502, 503, 504];
          if (attempt < maxRetries && retryStatusCodes.includes(response.status)) {
            lastError = new Error(`HTTP ${response.status}: ${data.error || response.statusText}`);
            continue;
          }

          PerformanceMonitor.endRequest(context.requestId, response.status, data.error);
          ErrorHandler.handleHttpError(response, data);
        }

        // Success
        PerformanceMonitor.endRequest(context.requestId, response.status);
        return data;
      } catch (error: any) {
        lastError = error;

        // Don't retry network errors on the last attempt
        if (attempt === maxRetries) {
          PerformanceMonitor.endRequest(context.requestId, 0, error.message);
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            ErrorHandler.handleNetworkError(error);
          }
          throw error;
        }

        // Don't retry certain error types (client errors that won't change on retry)
        const noRetryStatusCodes = [400, 401, 403, 404, 422];
        if (error.type && error.status && noRetryStatusCodes.includes(error.status)) {
          PerformanceMonitor.endRequest(context.requestId, error.status || 0, error.message);
          throw error;
        }

        if (isDevelopment) {
          console.warn(`Request attempt ${attempt + 1} failed:`, error.message);
        }
      }
    }

    throw lastError!;
  }

  /**
   * Convenience methods for common HTTP verbs
   */
  get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    const url = params ? `${endpoint}?${new URLSearchParams(params).toString()}` : endpoint;
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  post<T = any>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  put<T = any>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  delete<T = any>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  patch<T = any>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  /**
   * File upload with progress tracking
   */
  async uploadFile<T = any>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    // TODO: Implement progress tracking with XMLHttpRequest if needed
    return this.post<T>(endpoint, formData);
  }

  /**
   * Authentication methods
   */
  setAuthTokens(accessToken: string, refreshToken?: string): void {
    this.tokenManager.setTokens(accessToken, refreshToken);
  }

  clearAuthTokens(): void {
    this.tokenManager.clearTokens();
  }

  getAuthToken(): string | null {
    return this.tokenManager.getToken();
  }

  isAuthenticated(): boolean {
    return !this.tokenManager.isTokenExpired();
  }

  /**
   * Utility methods
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private combineAbortSignals(signals: AbortSignal[]): AbortSignal {
    const controller = new AbortController();

    signals.forEach(signal => {
      if (signal.aborted) {
        controller.abort();
      } else {
        signal.addEventListener('abort', () => controller.abort());
      }
    });

    return controller.signal;
  }
}

// =============================================================================
// SINGLETON EXPORT
// =============================================================================

export const httpClient = new SecureHttpClient();
export default httpClient;
