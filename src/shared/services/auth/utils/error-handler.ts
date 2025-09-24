// 🚨 Error Handler - MVP Version
// Location: src/shared/services/auth/utils/error-handler.ts
// Purpose: Centralized error handling for authentication operations with user-friendly messages
//
// Features:
// - Supabase-specific error handling and translation
// - User-friendly error messages
// - Error categorization (retryable vs non-retryable)
// - Comprehensive error logging
// - Development vs production error handling
// - Error response standardization
// - Network error detection and handling

// =============================================================================
// ERROR TYPES
// =============================================================================

export interface AuthError {
  code: string;
  message: string;
  details?: any;
  retryable: boolean;
}

export interface AuthErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

// =============================================================================
// ERROR CODES
// =============================================================================

export const AUTH_ERROR_CODES = {
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',

  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',

  // Registration errors
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  INVALID_EMAIL: 'INVALID_EMAIL',

  // Session errors
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_REFRESH_FAILED: 'TOKEN_REFRESH_FAILED',

  // Permission errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  ACCESS_DENIED: 'ACCESS_DENIED',

  // Server errors
  SERVER_ERROR: 'SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Unknown errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

// =============================================================================
// ERROR MESSAGES
// =============================================================================

export const AUTH_ERROR_MESSAGES = {
  [AUTH_ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection.',
  [AUTH_ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [AUTH_ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid email or password.',
  [AUTH_ERROR_CODES.USER_NOT_FOUND]: 'User not found.',
  [AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED]: 'Please verify your email address.',
  [AUTH_ERROR_CODES.ACCOUNT_DISABLED]: 'Your account has been disabled.',
  [AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'An account with this email already exists.',
  [AUTH_ERROR_CODES.WEAK_PASSWORD]: 'Password is too weak. Please choose a stronger password.',
  [AUTH_ERROR_CODES.INVALID_EMAIL]: 'Please enter a valid email address.',
  [AUTH_ERROR_CODES.SESSION_EXPIRED]: 'Your session has expired. Please log in again.',
  [AUTH_ERROR_CODES.INVALID_TOKEN]: 'Invalid authentication token.',
  [AUTH_ERROR_CODES.TOKEN_REFRESH_FAILED]: 'Failed to refresh authentication token.',
  [AUTH_ERROR_CODES.INSUFFICIENT_PERMISSIONS]: 'You do not have permission to perform this action.',
  [AUTH_ERROR_CODES.ACCESS_DENIED]: 'Access denied.',
  [AUTH_ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  [AUTH_ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable.',
  [AUTH_ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred.',
} as const;

// =============================================================================
// ERROR HANDLER CLASS
// =============================================================================

export class AuthErrorHandler {
  /**
   * Handle Supabase auth errors
   */
  static handleSupabaseError(error: any): AuthError {
    // Map Supabase error codes to our error codes
    const errorCode = this.mapSupabaseErrorCode(error);
    const message =
      AUTH_ERROR_MESSAGES[errorCode] || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.UNKNOWN_ERROR];

    return {
      code: errorCode,
      message,
      details: error,
      retryable: this.isRetryableError(errorCode),
    };
  }

  /**
   * Handle generic errors
   */
  static handleGenericError(error: any): AuthError {
    if (error instanceof Error) {
      // Network errors
      if (error.message.includes('fetch')) {
        return {
          code: AUTH_ERROR_CODES.NETWORK_ERROR,
          message: AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.NETWORK_ERROR],
          details: error,
          retryable: true,
        };
      }

      // Timeout errors
      if (error.message.includes('timeout')) {
        return {
          code: AUTH_ERROR_CODES.TIMEOUT_ERROR,
          message: AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.TIMEOUT_ERROR],
          details: error,
          retryable: true,
        };
      }
    }

    return {
      code: AUTH_ERROR_CODES.UNKNOWN_ERROR,
      message: AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.UNKNOWN_ERROR],
      details: error,
      retryable: false,
    };
  }

  /**
   * Create error response
   */
  static createErrorResponse(error: AuthError): AuthErrorResponse {
    return {
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
    };
  }

  /**
   * Map Supabase error codes to our error codes
   */
  private static mapSupabaseErrorCode(error: any): string {
    const message = error?.message?.toLowerCase() || '';
    const code = error?.code || '';

    // Email already exists
    if (message.includes('already registered') || message.includes('user already exists')) {
      return AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS;
    }

    // Invalid credentials
    if (message.includes('invalid login credentials') || message.includes('invalid credentials')) {
      return AUTH_ERROR_CODES.INVALID_CREDENTIALS;
    }

    // Email not verified
    if (message.includes('email not confirmed') || message.includes('email not verified')) {
      return AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED;
    }

    // Weak password
    if (message.includes('password') && message.includes('weak')) {
      return AUTH_ERROR_CODES.WEAK_PASSWORD;
    }

    // Invalid email
    if (message.includes('invalid email') || message.includes('malformed email')) {
      return AUTH_ERROR_CODES.INVALID_EMAIL;
    }

    // Session expired
    if (message.includes('session') && message.includes('expired')) {
      return AUTH_ERROR_CODES.SESSION_EXPIRED;
    }

    // Invalid token
    if (message.includes('invalid token') || message.includes('jwt')) {
      return AUTH_ERROR_CODES.INVALID_TOKEN;
    }

    // Server errors
    if (code === '500' || message.includes('internal server error')) {
      return AUTH_ERROR_CODES.SERVER_ERROR;
    }

    // Service unavailable
    if (code === '503' || message.includes('service unavailable')) {
      return AUTH_ERROR_CODES.SERVICE_UNAVAILABLE;
    }

    return AUTH_ERROR_CODES.UNKNOWN_ERROR;
  }

  /**
   * Check if error is retryable
   */
  private static isRetryableError(errorCode: string): boolean {
    const retryableErrors = [
      AUTH_ERROR_CODES.NETWORK_ERROR,
      AUTH_ERROR_CODES.TIMEOUT_ERROR,
      AUTH_ERROR_CODES.SERVER_ERROR,
      AUTH_ERROR_CODES.SERVICE_UNAVAILABLE,
      AUTH_ERROR_CODES.TOKEN_REFRESH_FAILED,
    ];

    return retryableErrors.includes(errorCode as any);
  }

  /**
   * Log error for monitoring
   */
  static logError(error: AuthError, context: string): void {
    const logData = {
      timestamp: new Date().toISOString(),
      context,
      error: {
        code: error.code,
        message: error.message,
        retryable: error.retryable,
      },
    };

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to monitoring service (e.g., Sentry, LogRocket)
    } else {
      console.log('Development error logging:', logData);
    }
  }
}
