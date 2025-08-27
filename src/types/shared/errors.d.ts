/**
 * Base application error
 */
export interface BaseError {
  code: string;
  message: string;
  statusCode?: number;
  timestamp: string;
  context?: Record<string, any>;
  stack?: string;
}
/**
 * API error response
 */
export interface ApiError extends BaseError {
  statusCode: number;
  requestId?: string;
  path?: string;
  method?: string;
  details?: ValidationError[];
}
/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
  constraint?: string;
}
/**
 * Business logic error
 */
export interface BusinessError extends BaseError {
  domain: string;
  entity?: string;
  entityId?: string;
  operation?: string;
}
/**
 * Infrastructure error
 */
export interface InfrastructureError extends BaseError {
  service: string;
  component?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
}
/**
 * Authentication errors
 */
export interface AuthenticationError extends ApiError {
  code:
    | 'AUTH_INVALID_CREDENTIALS'
    | 'AUTH_TOKEN_EXPIRED'
    | 'AUTH_TOKEN_INVALID'
    | 'AUTH_TOKEN_MISSING'
    | 'AUTH_ACCOUNT_LOCKED'
    | 'AUTH_ACCOUNT_DISABLED'
    | 'AUTH_SESSION_EXPIRED'
    | 'AUTH_REFRESH_TOKEN_INVALID';
  retryAfter?: number;
  lockoutDuration?: number;
}
/**
 * Authorization errors
 */
export interface AuthorizationError extends ApiError {
  code:
    | 'AUTH_INSUFFICIENT_PERMISSIONS'
    | 'AUTH_ROLE_REQUIRED'
    | 'AUTH_RESOURCE_ACCESS_DENIED'
    | 'AUTH_FEATURE_NOT_AVAILABLE'
    | 'AUTH_SUBSCRIPTION_REQUIRED';
  requiredRole?: string;
  requiredPermissions?: string[];
  currentRole?: string;
  currentPermissions?: string[];
}
/**
 * Validation errors
 */
export interface ValidationErrorResponse extends ApiError {
  code: 'VALIDATION_ERROR';
  details: ValidationError[];
}
/**
 * Resource errors
 */
export interface ResourceError extends ApiError {
  code:
    | 'RESOURCE_NOT_FOUND'
    | 'RESOURCE_ALREADY_EXISTS'
    | 'RESOURCE_CONFLICT'
    | 'RESOURCE_GONE'
    | 'RESOURCE_LOCKED'
    | 'RESOURCE_TOO_LARGE';
  resourceType: string;
  resourceId?: string;
  conflictingId?: string;
}
/**
 * Rate limiting errors
 */
export interface RateLimitError extends ApiError {
  code: 'RATE_LIMIT_EXCEEDED';
  limit: number;
  remaining: number;
  resetTime: string;
  retryAfter: number;
  window: number;
}
/**
 * Payment/billing errors
 */
export interface PaymentError extends BusinessError {
  code:
    | 'PAYMENT_CARD_DECLINED'
    | 'PAYMENT_INSUFFICIENT_FUNDS'
    | 'PAYMENT_EXPIRED_CARD'
    | 'PAYMENT_INVALID_CARD'
    | 'PAYMENT_PROCESSING_ERROR'
    | 'PAYMENT_REFUND_FAILED'
    | 'SUBSCRIPTION_CANCELLED'
    | 'SUBSCRIPTION_PAST_DUE';
  paymentMethodId?: string;
  subscriptionId?: string;
  amount?: number;
  currency?: string;
}
/**
 * File upload errors
 */
export interface FileUploadError extends ApiError {
  code:
    | 'FILE_TOO_LARGE'
    | 'FILE_TYPE_NOT_ALLOWED'
    | 'FILE_UPLOAD_FAILED'
    | 'FILE_VIRUS_DETECTED'
    | 'FILE_CORRUPTED'
    | 'STORAGE_QUOTA_EXCEEDED';
  filename?: string;
  fileSize?: number;
  maxSize?: number;
  allowedTypes?: string[];
  actualType?: string;
}
/**
 * Database errors
 */
export interface DatabaseError extends InfrastructureError {
  code:
    | 'DB_CONNECTION_FAILED'
    | 'DB_QUERY_TIMEOUT'
    | 'DB_CONSTRAINT_VIOLATION'
    | 'DB_DUPLICATE_KEY'
    | 'DB_FOREIGN_KEY_VIOLATION'
    | 'DB_TRANSACTION_FAILED'
    | 'DB_MIGRATION_FAILED';
  query?: string;
  table?: string;
  constraint?: string;
}
/**
 * External service errors
 */
export interface ExternalServiceError extends InfrastructureError {
  code:
    | 'EXTERNAL_SERVICE_UNAVAILABLE'
    | 'EXTERNAL_SERVICE_TIMEOUT'
    | 'EXTERNAL_SERVICE_RATE_LIMITED'
    | 'EXTERNAL_SERVICE_AUTH_FAILED'
    | 'EXTERNAL_SERVICE_INVALID_RESPONSE';
  serviceName: string;
  endpoint?: string;
  responseStatus?: number;
  responseBody?: string;
}
/**
 * Email service errors
 */
export interface EmailError extends Omit<ExternalServiceError, 'code'> {
  code:
    | 'EMAIL_SEND_FAILED'
    | 'EMAIL_INVALID_ADDRESS'
    | 'EMAIL_TEMPLATE_NOT_FOUND'
    | 'EMAIL_PROVIDER_ERROR'
    | 'EMAIL_QUOTA_EXCEEDED';
  to?: string[];
  template?: string;
  providerId?: string;
}
/**
 * Notification errors
 */
export interface NotificationError extends Omit<ExternalServiceError, 'code'> {
  code:
    | 'NOTIFICATION_SEND_FAILED'
    | 'NOTIFICATION_INVALID_TOKEN'
    | 'NOTIFICATION_DEVICE_NOT_FOUND'
    | 'NOTIFICATION_QUOTA_EXCEEDED';
  deviceToken?: string;
  platform?: 'ios' | 'android' | 'web';
}
/**
 * User context for error reporting
 */
export interface ErrorUserContext {
  id?: string;
  email?: string;
  role?: string;
  subscription?: string;
  ip?: string;
  userAgent?: string;
}
/**
 * Request context for error reporting
 */
export interface ErrorRequestContext {
  id: string;
  method: string;
  path: string;
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
  timestamp: string;
  duration?: number;
}
/**
 * System context for error reporting
 */
export interface ErrorSystemContext {
  version: string;
  environment: string;
  hostname: string;
  pid: number;
  memory?: {
    used: number;
    total: number;
  };
  load?: number[];
}
/**
 * Complete error context
 */
export interface ErrorContext {
  user?: ErrorUserContext;
  request?: ErrorRequestContext;
  system?: ErrorSystemContext;
  custom?: Record<string, any>;
}
/**
 * Error handler configuration
 */
export interface ErrorHandlerConfig {
  captureStackTrace: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  includeContext: boolean;
  sanitizeData: boolean;
  maxStackDepth?: number;
  excludeFields?: string[];
}
/**
 * Error reporter interface
 */
export interface ErrorReporter {
  report(error: BaseError, context?: ErrorContext): Promise<void>;
  reportMultiple(errors: BaseError[], context?: ErrorContext): Promise<void>;
  setUser(user: ErrorUserContext): void;
  setContext(context: Partial<ErrorContext>): void;
  clearContext(): void;
}
/**
 * Error recovery strategy
 */
export interface ErrorRecoveryStrategy {
  type: 'retry' | 'fallback' | 'circuit_breaker' | 'ignore';
  maxRetries?: number;
  retryDelay?: number;
  exponentialBackoff?: boolean;
  fallbackValue?: any;
  fallbackFunction?: () => any;
  circuitBreakerThreshold?: number;
  circuitBreakerTimeout?: number;
}
/**
 * Error handling result
 */
export interface ErrorHandlingResult<T = any> {
  success: boolean;
  data?: T;
  error?: BaseError;
  recovered: boolean;
  recoveryStrategy?: string;
  attempts: number;
}
/**
 * JavaScript runtime errors
 */
export interface JavaScriptError extends BaseError {
  code:
    | 'JS_SYNTAX_ERROR'
    | 'JS_REFERENCE_ERROR'
    | 'JS_TYPE_ERROR'
    | 'JS_RANGE_ERROR'
    | 'JS_UNHANDLED_PROMISE_REJECTION';
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
}
/**
 * Network/HTTP errors
 */
export interface NetworkError extends BaseError {
  code:
    | 'NETWORK_OFFLINE'
    | 'NETWORK_TIMEOUT'
    | 'NETWORK_CORS_ERROR'
    | 'NETWORK_DNS_ERROR'
    | 'NETWORK_CONNECTION_REFUSED'
    | 'NETWORK_UNKNOWN_HOST';
  url?: string;
  method?: string;
  timeout?: number;
}
/**
 * Frontend rendering errors
 */
export interface RenderError extends BaseError {
  code:
    | 'RENDER_COMPONENT_ERROR'
    | 'RENDER_HYDRATION_ERROR'
    | 'RENDER_CHUNK_LOAD_ERROR'
    | 'RENDER_MEMORY_ERROR';
  componentStack?: string;
  chunkName?: string;
}
export declare enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}
/**
 * Error classification
 */
export interface ErrorClassification {
  severity: ErrorSeverity;
  category: 'user' | 'system' | 'business' | 'security';
  reportable: boolean;
  userFacing: boolean;
  retryable: boolean;
  autoRecover: boolean;
}
/**
 * Error transformer for client responses
 */
export interface ErrorTransformer {
  transformForClient(error: BaseError): {
    message: string;
    code?: string;
    details?: any;
  };
  transformForLogging(
    error: BaseError,
    context?: ErrorContext
  ): {
    level: string;
    message: string;
    metadata: Record<string, any>;
  };
}
/**
 * Error sanitizer for sensitive data
 */
export interface ErrorSanitizer {
  sanitizeError(error: BaseError): BaseError;
  sanitizeContext(context: ErrorContext): ErrorContext;
  isFieldSensitive(fieldName: string): boolean;
}
/**
 * Error metrics
 */
export interface ErrorMetrics {
  total: number;
  byCode: Record<string, number>;
  bySeverity: Record<ErrorSeverity, number>;
  byCategory: Record<string, number>;
  trends: Array<{
    timestamp: string;
    count: number;
    codes: string[];
  }>;
}
/**
 * Error alert configuration
 */
export interface ErrorAlert {
  id: string;
  name: string;
  condition: {
    codes?: string[];
    severity?: ErrorSeverity[];
    threshold: number;
    window: number;
  };
  channels: Array<{
    type: 'email' | 'slack' | 'webhook';
    destination: string;
    template?: string;
  }>;
  enabled: boolean;
}
