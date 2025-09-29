// 🔄 Retry Handler - MVP Version
// Location: src/shared/services/auth/utils/retry-handler.ts
// Purpose: Handle retry logic for authentication operations with exponential backoff
//
// Features:
// - Exponential backoff retry strategy
// - Configurable retry attempts and delays
// - Network error detection and retry logic
// - Timeout handling for long-running operations
// - Retryable vs non-retryable error classification
// - Comprehensive logging of retry attempts
// - Development-friendly retry configuration

import { AUTH_ERROR_CODES } from './error-handler';
import { logger } from '../../../utils/logger';

// =============================================================================
// RETRY CONFIGURATION
// =============================================================================

const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  BASE_DELAY: 1000, // 1 second
  MAX_DELAY: 10000, // 10 seconds
  BACKOFF_MULTIPLIER: 2,
} as const;

// =============================================================================
// RETRY HANDLER CLASS
// =============================================================================

export class RetryHandler {
  /**
   * Execute function with retry logic
   */
  static async executeWithRetry<T>(
    operation: () => Promise<T>,
    context: string,
    maxAttempts: number = RETRY_CONFIG.MAX_ATTEMPTS
  ): Promise<T> {
    let lastError: Error | unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        logger.debug(`🔄 ${context} - Attempt ${attempt}/${maxAttempts}`);
        const result = await operation();

        if (attempt > 1) {
          logger.success(`${context} - Succeeded on attempt ${attempt}`);
        }

        return result;
      } catch (error) {
        lastError = error;

        // Check if error is retryable
        if (!this.isRetryableError(error) || attempt === maxAttempts) {
          logger.error("Error occurred", error);
          throw error;
        }

        // Calculate delay with exponential backoff
        const delay = this.calculateDelay(attempt);
        logger.warn(`⚠️ ${context} - Attempt ${attempt} failed, retrying in ${delay}ms:`, error);

        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  /**
   * Check if error is retryable
   */
  private static isRetryableError(error: unknown): boolean {
    const retryableErrors = [
      AUTH_ERROR_CODES.NETWORK_ERROR,
      AUTH_ERROR_CODES.TIMEOUT_ERROR,
      AUTH_ERROR_CODES.SERVER_ERROR,
      AUTH_ERROR_CODES.SERVICE_UNAVAILABLE,
      AUTH_ERROR_CODES.TOKEN_REFRESH_FAILED,
    ];

    // Type guard to check if error has code property
    const hasCode = (err: unknown): err is { code: string } => {
      return typeof err === 'object' && err !== null && 'code' in err;
    };

    // Type guard to check if error has message property
    const hasMessage = (err: unknown): err is { message: string } => {
      return typeof err === 'object' && err !== null && 'message' in err;
    };

    // Type guard to check if error has status property
    const hasStatus = (err: unknown): err is { status: number } => {
      return typeof err === 'object' && err !== null && 'status' in err;
    };

    // Check error code
    if (hasCode(error) && retryableErrors.includes(error.code as any)) {
      return true;
    }

    // Check error message
    const message = hasMessage(error) ? error.message.toLowerCase() : '';
    if (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('server error') ||
      message.includes('service unavailable')
    ) {
      return true;
    }

    // Check HTTP status codes
    if (hasStatus(error)) {
      const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
      return retryableStatusCodes.includes(error.status);
    }

    return false;
  }

  /**
   * Calculate delay with exponential backoff
   */
  private static calculateDelay(attempt: number): number {
    const delay = RETRY_CONFIG.BASE_DELAY * Math.pow(RETRY_CONFIG.BACKOFF_MULTIPLIER, attempt - 1);
    return Math.min(delay, RETRY_CONFIG.MAX_DELAY);
  }

  /**
   * Sleep for specified milliseconds
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Execute with timeout
   */
  static async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number = 30000,
    context: string = 'Operation'
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`${context} timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      operation()
        .then(result => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  /**
   * Execute with both retry and timeout
   */
  static async executeWithRetryAndTimeout<T>(
    operation: () => Promise<T>,
    context: string,
    timeoutMs: number = 30000,
    maxAttempts: number = RETRY_CONFIG.MAX_ATTEMPTS
  ): Promise<T> {
    return this.executeWithRetry(
      () => this.executeWithTimeout(operation, timeoutMs, context),
      context,
      maxAttempts
    );
  }
}
