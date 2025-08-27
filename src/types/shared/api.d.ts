import { ApiStatus, SortDirection } from './enums';
/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  status: ApiStatus;
  data?: T;
  error?: string;
  message?: string;
  meta?: ResponseMeta;
  timestamp?: string;
}
/**
 * Response metadata for pagination and additional info
 */
export interface ResponseMeta {
  pagination?: PaginationInfo;
  total?: number;
  timestamp?: string;
  version?: string;
  request_id?: string;
}
/**
 * Pagination information
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  offset?: number;
}
/**
 * Standard pagination request parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}
/**
 * Standard sorting parameters
 */
export interface SortParams {
  sortBy?: string;
  sortDirection?: SortDirection;
  orderBy?: string;
  orderDirection?: SortDirection;
}
/**
 * Base query parameters that most endpoints accept
 */
export interface BaseQueryParams extends PaginationParams, SortParams {
  search?: string;
  filter?: Record<string, any>;
}
/**
 * Error response structure
 */
export interface ErrorResponse {
  success: false;
  status: ApiStatus.ERROR;
  error: string;
  message: string;
  details?: any;
  code?: string;
  field?: string;
  timestamp: string;
  request_id?: string;
}
/**
 * Success response structure
 */
export interface SuccessResponse<T = any> {
  success: true;
  status: ApiStatus.SUCCESS;
  data: T;
  message?: string;
  meta?: ResponseMeta;
  timestamp: string;
}
/**
 * File upload response
 */
export interface FileUploadResponse {
  success: boolean;
  file?: {
    id: string;
    filename: string;
    original_filename: string;
    size: number;
    mime_type: string;
    url?: string;
    storage_key: string;
  };
  error?: string;
}
/**
 * Bulk operation response
 */
export interface BulkOperationResponse<T = any> {
  success: boolean;
  processed: number;
  successful: number;
  failed: number;
  errors: Array<{
    index: number;
    error: string;
    item?: T;
  }>;
  results: T[];
}
/**
 * Search/Filter capabilities for listings
 */
export interface ListingSearchParams extends BaseQueryParams {
  country?: string;
  region?: string;
  sector?: string;
  revenueMin?: number;
  revenueMax?: number;
  askingPriceMin?: number;
  askingPriceMax?: number;
  anonymous?: boolean;
  requiresNda?: boolean;
  featured?: boolean;
  status?: string;
  locale?: string;
  yearsInBusinessMin?: number;
  yearsInBusinessMax?: number;
}
/**
 * Advanced search criteria
 */
export interface AdvancedSearchCriteria {
  keywords?: string[];
  excludeKeywords?: string[];
  businessAge?: {
    min?: number;
    max?: number;
  };
  revenue?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  ebitda?: {
    min?: number;
    max?: number;
  };
  location?: {
    countries?: string[];
    regions?: string[];
    cities?: string[];
  };
  sectors?: string[];
  features?: {
    anonymous?: boolean;
    featured?: boolean;
    requiresNda?: boolean;
    hasFinancials?: boolean;
    hasDocuments?: boolean;
  };
  timeline?: string;
  lastUpdated?: {
    days?: number;
    since?: string;
  };
}
/**
 * API endpoint configuration
 */
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  authenticated: boolean;
  roles?: string[];
  rateLimit?: {
    requests: number;
    windowMs: number;
  };
  cache?: {
    ttl: number;
    key?: string;
  };
}
/**
 * WebSocket message structure
 */
export interface WebSocketMessage<T = any> {
  type: string;
  event: string;
  data: T;
  timestamp: string;
  id?: string;
  userId?: string;
  conversationId?: string;
}
/**
 * Real-time notification structure
 */
export interface RealtimeNotification {
  id: string;
  type: 'inquiry' | 'message' | 'listing_update' | 'system' | 'payment';
  title: string;
  message: string;
  data?: any;
  userId: string;
  read: boolean;
  created_at: string;
  expires_at?: string;
}
/**
 * Activity feed item
 */
export interface ActivityItem {
  id: string;
  type: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  metadata?: Record<string, any>;
  created_at: string;
  description?: string;
  formatted_message?: string;
}
/**
 * Analytics data point
 */
export interface AnalyticsDataPoint {
  timestamp: string;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}
/**
 * Time series analytics data
 */
export interface TimeSeriesData {
  period: 'hour' | 'day' | 'week' | 'month' | 'year';
  data: AnalyticsDataPoint[];
  total?: number;
  average?: number;
  change?: {
    value: number;
    percentage: number;
    period: string;
  };
}
