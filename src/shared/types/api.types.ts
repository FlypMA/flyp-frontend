// 🌐 API Type Definitions - TypeScript safety for API calls

import type { ApiResponse, PaginatedResponse } from './utility.types';

/**
 * HTTP Methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API Error types
 */
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
}

/**
 * API Request configuration
 */
export interface ApiRequestConfig {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
  retries?: number;
}

/**
 * API Client response
 */
export interface ApiClientResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * Search and filtering
 */
export interface SearchQuery {
  query?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Upload types
 */
export interface FileUpload {
  file: File;
  name?: string;
  description?: string;
}

export interface UploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

/**
 * Webhook types
 */
export interface WebhookPayload<T = unknown> {
  id: string;
  event: string;
  data: T;
  timestamp: string;
  signature: string;
}

/**
 * Rate limiting
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: string;
}

/**
 * Health check
 */
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
  timestamp: string;
  checks: {
    database: 'up' | 'down';
    redis: 'up' | 'down';
    external_apis: 'up' | 'down';
  };
}
