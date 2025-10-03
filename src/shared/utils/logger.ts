/**
 * 🪵 Logger Utility - Upswitch MVP
 *
 * Centralized logging utility that can be easily controlled
 * for development vs production environments.
 */

const isDevelopment = import.meta.env?.DEV || import.meta.env?.NODE_ENV === 'development';

export const logger = {
  /**
   * Log info messages (development only)
   */
  info: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.info(`[INFO] ${message}`, ...args);
    }
  },

  /**
   * Log error messages (always)
   */
  error: (message: string, ...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`, ...args);
  },

  /**
   * Log warning messages (always)
   */
  warn: (message: string, ...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.warn(`[WARN] ${message}`, ...args);
  },

  /**
   * Log debug messages (development only)
   */
  debug: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },

  /**
   * Log success messages (development only)
   */
  success: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(`[SUCCESS] ${message}`, ...args);
    }
  },

  /**
   * Log failure messages (development only)
   */
  failure: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.error(`[FAILURE] ${message}`, ...args);
    }
  },
};
