/**
 * 🚨 COMPREHENSIVE ERROR HANDLING & MONITORING - flyp M&A Platform
 * Enterprise-grade error handling with user feedback, logging, and recovery strategies
 * Built by Senior CTO for production-ready error management
 */

import { ApiError } from '../../types/api';

// Define missing error types
export interface AuthenticationError extends ApiError {
  type: 'AUTHENTICATION_ERROR';
}

export interface AuthorizationError extends ApiError {
  type: 'AUTHORIZATION_ERROR';
}

export interface RateLimitError extends ApiError {
  type: 'RATE_LIMIT_ERROR';
  retryAfter?: number;
}

export interface HttpStatusCode {
  OK: 200;
  CREATED: 201;
  BAD_REQUEST: 400;
  UNAUTHORIZED: 401;
  FORBIDDEN: 403;
  NOT_FOUND: 404;
  RATE_LIMITED: 429;
  INTERNAL_SERVER_ERROR: 500;
}

// Create temporary config objects until proper error config is implemented
const ERROR_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  enableLogging: true,
  USER_MESSAGES: {
    GENERIC_ERROR: 'Something went wrong. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    AUTH_ERROR: 'Authentication failed. Please log in again.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    RATE_LIMIT_ERROR: 'Too many requests. Please try again later.',
    SERVER_ERROR: 'Server error. Please try again later.',
    CLIENT_ERROR: 'Invalid request. Please check your input.',
  },
};

const MONITORING_CONFIG = {
  enableErrorReporting: true,
  enablePerformanceMonitoring: true,
  ENABLED: true,
};

const isDevelopment = (import.meta as any).env?.NODE_ENV === 'development';
const isProduction = (import.meta as any).env?.NODE_ENV === 'production';

// =============================================================================
// INTERFACES & TYPES
// =============================================================================

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  url?: string;
  userAgent?: string;
  timestamp: number;
  stackTrace?: string;
  breadcrumbs?: ErrorBreadcrumb[];
}

interface ErrorBreadcrumb {
  category: 'navigation' | 'user' | 'api' | 'console' | 'error';
  message: string;
  level: 'info' | 'warning' | 'error';
  timestamp: number;
  data?: any;
}

interface ErrorReport {
  id: string;
  type: 'javascript' | 'api' | 'network' | 'security' | 'business';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  error: Error | any;
  context: ErrorContext;
  userImpact: 'none' | 'low' | 'medium' | 'high' | 'critical';
  recoveryAction?: string;
  resolved: boolean;
}

interface UserFeedback {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }>;
  timeout?: number;
  dismissible?: boolean;
}

interface ErrorMetrics {
  totalErrors: number;
  errorsByType: Record<string, number>;
  errorsByComponent: Record<string, number>;
  criticalErrors: number;
  lastError: number;
  recoveryRate: number;
}

// =============================================================================
// ERROR BREADCRUMBS MANAGER
// =============================================================================

class BreadcrumbManager {
  private static instance: BreadcrumbManager;
  private breadcrumbs: ErrorBreadcrumb[] = [];
  private maxBreadcrumbs = 50;

  static getInstance(): BreadcrumbManager {
    if (!BreadcrumbManager.instance) {
      BreadcrumbManager.instance = new BreadcrumbManager();
    }
    return BreadcrumbManager.instance;
  }

  addBreadcrumb(breadcrumb: Omit<ErrorBreadcrumb, 'timestamp'>): void {
    const fullBreadcrumb: ErrorBreadcrumb = {
      ...breadcrumb,
      timestamp: Date.now(),
    };

    this.breadcrumbs.push(fullBreadcrumb);

    // Keep only the last N breadcrumbs
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs = this.breadcrumbs.slice(-this.maxBreadcrumbs);
    }

    if (isDevelopment) {
      console.debug('[Breadcrumb]', fullBreadcrumb);
    }
  }

  getBreadcrumbs(): ErrorBreadcrumb[] {
    return [...this.breadcrumbs];
  }

  clearBreadcrumbs(): void {
    this.breadcrumbs = [];
  }
}

// =============================================================================
// USER FEEDBACK MANAGER
// =============================================================================

class UserFeedbackManager {
  private static instance: UserFeedbackManager;
  private feedbackQueue: UserFeedback[] = [];
  private listeners: Set<(feedback: UserFeedback[]) => void> = new Set();

  static getInstance(): UserFeedbackManager {
    if (!UserFeedbackManager.instance) {
      UserFeedbackManager.instance = new UserFeedbackManager();
    }
    return UserFeedbackManager.instance;
  }

  showFeedback(feedback: UserFeedback): void {
    this.feedbackQueue.push(feedback);
    this.notifyListeners();

    // Auto-dismiss if timeout is set
    if (feedback.timeout) {
      setTimeout(() => {
        this.dismissFeedback(feedback);
      }, feedback.timeout);
    }
  }

  dismissFeedback(feedback: UserFeedback): void {
    const index = this.feedbackQueue.indexOf(feedback);
    if (index > -1) {
      this.feedbackQueue.splice(index, 1);
      this.notifyListeners();
    }
  }

  subscribe(listener: (feedback: UserFeedback[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.feedbackQueue]));
  }

  getFeedbackQueue(): UserFeedback[] {
    return [...this.feedbackQueue];
  }
}

// =============================================================================
// ERROR RECOVERY STRATEGIES
// =============================================================================

class ErrorRecoveryManager {
  private static recoveryStrategies: Map<string, () => Promise<boolean>> = new Map();

  static registerStrategy(errorType: string, strategy: () => Promise<boolean>): void {
    this.recoveryStrategies.set(errorType, strategy);
  }

  static async attemptRecovery(errorType: string): Promise<boolean> {
    const strategy = this.recoveryStrategies.get(errorType);

    if (strategy) {
      try {
        const recovered = await strategy();
        if (recovered) {
          console.log(`[Recovery] Successfully recovered from ${errorType}`);
          return true;
        }
      } catch (recoveryError) {
        console.error(`[Recovery] Failed to recover from ${errorType}:`, recoveryError);
      }
    }

    return false;
  }

  static initializeDefaultStrategies(): void {
    // Authentication error recovery
    this.registerStrategy('AUTH_ERROR', async () => {
      try {
        // Try to refresh token
        const authService = await import('../auth');
        await authService.default.checkAuth();
        return true;
      } catch {
        // Redirect to login
        window.location.href = '/login';
        return false;
      }
    });

    // Network error recovery
    this.registerStrategy('NETWORK_ERROR', async () => {
      try {
        // Check if connection is restored
        const response = await fetch('/api/health', {
          method: 'GET',
          cache: 'no-cache',
        });
        return response.ok;
      } catch {
        return false;
      }
    });

    // Rate limit recovery
    this.registerStrategy('RATE_LIMIT_ERROR', async () => {
      // Wait and retry
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay
      return true;
    });
  }
}

// =============================================================================
// MAIN ERROR HANDLER
// =============================================================================

export class ErrorHandler {
  private static instance: ErrorHandler;
  private breadcrumbManager: BreadcrumbManager;
  private feedbackManager: UserFeedbackManager;
  private errorReports: ErrorReport[] = [];
  private metrics: ErrorMetrics = {
    totalErrors: 0,
    errorsByType: {},
    errorsByComponent: {},
    criticalErrors: 0,
    lastError: 0,
    recoveryRate: 0,
  };

  private constructor() {
    this.breadcrumbManager = BreadcrumbManager.getInstance();
    this.feedbackManager = UserFeedbackManager.getInstance();
    this.initializeErrorHandling();
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private initializeErrorHandling(): void {
    // Global error handlers
    window.addEventListener('error', this.handleJavaScriptError.bind(this));
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));

    // Initialize recovery strategies
    ErrorRecoveryManager.initializeDefaultStrategies();

    // Track navigation for breadcrumbs
    this.trackNavigation();

    if (isDevelopment) {
      console.log('[ErrorHandler] Initialized comprehensive error handling');
    }
  }

  /**
   * Handle JavaScript runtime errors
   */
  private handleJavaScriptError(event: ErrorEvent): void {
    const error = event.error || new Error(event.message);

    this.handleError(error, {
      component: 'global',
      action: 'javascript_error',
      url: event.filename,
      timestamp: Date.now(),
      stackTrace: error.stack,
    });
  }

  /**
   * Handle unhandled promise rejections
   */
  private handlePromiseRejection(event: PromiseRejectionEvent): void {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

    this.handleError(error, {
      component: 'global',
      action: 'promise_rejection',
      timestamp: Date.now(),
    });

    // Prevent the default browser behavior
    event.preventDefault();
  }

  /**
   * Main error handling method
   */
  async handleError(error: Error | any, context: Partial<ErrorContext> = {}): Promise<void> {
    const fullContext: ErrorContext = {
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      breadcrumbs: this.breadcrumbManager.getBreadcrumbs(),
      ...context,
    };

    const errorReport = this.createErrorReport(error, fullContext);
    this.errorReports.push(errorReport);
    this.updateMetrics(errorReport);

    // Log error
    this.logError(errorReport);

    // Show user feedback if appropriate
    this.showUserFeedback(errorReport);

    // Attempt recovery
    await this.attemptRecovery(errorReport);

    // Send to monitoring service
    this.sendErrorReport(errorReport);
  }

  /**
   * Handle API errors specifically
   */
  async handleApiError(
    error: any,
    endpoint: string,
    context: Partial<ErrorContext> = {}
  ): Promise<void> {
    const errorType = this.classifyApiError(error);
    const userMessage = this.getApiErrorMessage(error);

    const apiContext: ErrorContext = {
      ...context,
      component: 'api',
      action: endpoint,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      type: 'api',
      severity: this.getApiErrorSeverity(error),
      message: userMessage,
      error,
      context: apiContext,
      userImpact: this.assessUserImpact(error),
      resolved: false,
    };

    this.errorReports.push(errorReport);
    this.updateMetrics(errorReport);

    // Show user feedback
    this.feedbackManager.showFeedback({
      type: 'error',
      title: 'Request Failed',
      message: userMessage,
      actions: [
        {
          label: 'Retry',
          action: () => window.location.reload(),
          variant: 'primary',
        },
        {
          label: 'Dismiss',
          action: () => this.feedbackManager.dismissFeedback(errorReport as any),
          variant: 'secondary',
        },
      ],
      dismissible: true,
    });

    // Attempt recovery based on error type
    const recovered = await ErrorRecoveryManager.attemptRecovery(errorType);
    if (recovered) {
      errorReport.resolved = true;
      errorReport.recoveryAction = errorType;
    }

    this.logError(errorReport);
    this.sendErrorReport(errorReport);
  }

  /**
   * Track user actions for breadcrumbs
   */
  trackUserAction(action: string, data?: any): void {
    this.breadcrumbManager.addBreadcrumb({
      category: 'user',
      message: action,
      level: 'info',
      data,
    });
  }

  /**
   * Track API calls for breadcrumbs
   */
  trackApiCall(endpoint: string, method: string, status?: number): void {
    this.breadcrumbManager.addBreadcrumb({
      category: 'api',
      message: `${method} ${endpoint}`,
      level: status && status >= 400 ? 'error' : 'info',
      data: { endpoint, method, status },
    });
  }

  /**
   * Track console errors for breadcrumbs
   */
  trackConsoleError(message: string, data?: any): void {
    this.breadcrumbManager.addBreadcrumb({
      category: 'console',
      message,
      level: 'error',
      data,
    });
  }

  /**
   * Get error metrics
   */
  getMetrics(): ErrorMetrics {
    return { ...this.metrics };
  }

  /**
   * Get error reports
   */
  getErrorReports(): ErrorReport[] {
    return [...this.errorReports];
  }

  /**
   * Subscribe to user feedback
   */
  subscribeFeedback(listener: (feedback: UserFeedback[]) => void): () => void {
    return this.feedbackManager.subscribe(listener);
  }

  // =============================================================================
  // PRIVATE HELPER METHODS
  // =============================================================================

  private createErrorReport(error: Error | any, context: ErrorContext): ErrorReport {
    return {
      id: this.generateErrorId(),
      type: this.classifyError(error),
      severity: this.getSeverity(error),
      message: error.message || String(error),
      error,
      context,
      userImpact: this.assessUserImpact(error),
      resolved: false,
    };
  }

  private classifyError(error: any): ErrorReport['type'] {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return 'network';
    }
    if (error.type === 'AUTH_ERROR') {
      return 'security';
    }
    if (error.name === 'ValidationError') {
      return 'business';
    }
    if (error.status && error.status >= 400) {
      return 'api';
    }
    return 'javascript';
  }

  private classifyApiError(error: any): string {
    if (error.status === 401 || error.type === 'AUTH_ERROR') {
      return 'AUTH_ERROR';
    }
    if (error.status === 429 || error.type === 'RATE_LIMIT_ERROR') {
      return 'RATE_LIMIT_ERROR';
    }
    if (error.status >= 500) {
      return 'SERVER_ERROR';
    }
    if (!navigator.onLine || error.type === 'NETWORK_ERROR') {
      return 'NETWORK_ERROR';
    }
    return 'CLIENT_ERROR';
  }

  private getSeverity(error: any): ErrorReport['severity'] {
    if (error.type === 'AUTH_ERROR' || error.status === 401) {
      return 'high';
    }
    if (error.status >= 500) {
      return 'high';
    }
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return 'medium';
    }
    return 'low';
  }

  private getApiErrorSeverity(error: any): ErrorReport['severity'] {
    if (error.status === 401 || error.status === 403) {
      return 'high';
    }
    if (error.status >= 500) {
      return 'critical';
    }
    if (error.status === 429) {
      return 'medium';
    }
    return 'low';
  }

  private assessUserImpact(error: any): ErrorReport['userImpact'] {
    if (error.type === 'AUTH_ERROR' || error.status === 401) {
      return 'critical'; // User can't use the app
    }
    if (error.status >= 500) {
      return 'high'; // Core functionality affected
    }
    if (error.status === 429) {
      return 'medium'; // Temporary limitation
    }
    if (error.status >= 400) {
      return 'low'; // Specific action failed
    }
    return 'none';
  }

  private getApiErrorMessage(error: any): string {
    // Return user-friendly messages
    const messages = ERROR_CONFIG.USER_MESSAGES;

    if (error.type === 'AUTH_ERROR' || error.status === 401) {
      return messages.AUTH_ERROR;
    }
    if (error.type === 'RATE_LIMIT_ERROR' || error.status === 429) {
      return messages.RATE_LIMIT_ERROR;
    }
    if (error.status >= 500) {
      return messages.SERVER_ERROR;
    }
    if (error.type === 'NETWORK_ERROR') {
      return messages.NETWORK_ERROR;
    }
    if (error.type === 'VALIDATION_ERROR') {
      return messages.VALIDATION_ERROR;
    }

    return error.message || messages.CLIENT_ERROR;
  }

  private showUserFeedback(errorReport: ErrorReport): void {
    // Only show feedback for errors that impact the user
    if (errorReport.userImpact === 'none') {
      return;
    }

    const feedback: UserFeedback = {
      type: 'error',
      title: 'Something went wrong',
      message: this.getApiErrorMessage(errorReport.error),
      dismissible: true,
      timeout: errorReport.severity === 'low' ? 5000 : undefined,
    };

    this.feedbackManager.showFeedback(feedback);
  }

  private async attemptRecovery(errorReport: ErrorReport): Promise<void> {
    const errorType = this.classifyApiError(errorReport.error);
    const recovered = await ErrorRecoveryManager.attemptRecovery(errorType);

    if (recovered) {
      errorReport.resolved = true;
      errorReport.recoveryAction = errorType;

      this.feedbackManager.showFeedback({
        type: 'success',
        title: 'Issue Resolved',
        message: 'The problem has been automatically resolved.',
        timeout: 3000,
        dismissible: true,
      });
    }
  }

  private updateMetrics(errorReport: ErrorReport): void {
    this.metrics.totalErrors++;
    this.metrics.errorsByType[errorReport.type] =
      (this.metrics.errorsByType[errorReport.type] || 0) + 1;

    if (errorReport.context.component) {
      this.metrics.errorsByComponent[errorReport.context.component] =
        (this.metrics.errorsByComponent[errorReport.context.component] || 0) + 1;
    }

    if (errorReport.severity === 'critical') {
      this.metrics.criticalErrors++;
    }

    this.metrics.lastError = errorReport.context.timestamp;

    // Calculate recovery rate
    const resolvedErrors = this.errorReports.filter(r => r.resolved).length;
    this.metrics.recoveryRate =
      this.errorReports.length > 0 ? resolvedErrors / this.errorReports.length : 0;
  }

  private logError(errorReport: ErrorReport): void {
    if (isDevelopment) {
      console.group(`[Error ${errorReport.severity.toUpperCase()}] ${errorReport.message}`);
      console.error('Error:', errorReport.error);
      console.log('Context:', errorReport.context);
      console.log('Breadcrumbs:', errorReport.context.breadcrumbs);
      console.groupEnd();
    }
  }

  private async sendErrorReport(errorReport: ErrorReport): Promise<void> {
    if (!MONITORING_CONFIG.ENABLED || isDevelopment) {
      return;
    }

    try {
      await fetch('/api/monitoring/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...errorReport,
          // Don't send the full error object (may contain circular references)
          error: {
            name: errorReport.error.name,
            message: errorReport.error.message,
            stack: errorReport.error.stack,
          },
        }),
      });
    } catch (monitoringError) {
      console.error('Failed to send error report:', monitoringError);
    }
  }

  private trackNavigation(): void {
    // Track route changes
    let currentUrl = window.location.href;

    const observer = new MutationObserver(() => {
      if (window.location.href !== currentUrl) {
        this.breadcrumbManager.addBreadcrumb({
          category: 'navigation',
          message: `Navigation to ${window.location.pathname}`,
          level: 'info',
          data: {
            from: currentUrl,
            to: window.location.href,
          },
        });
        currentUrl = window.location.href;
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Track history API usage
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      BreadcrumbManager.getInstance().addBreadcrumb({
        category: 'navigation',
        message: `History push: ${args[2]}`,
        level: 'info',
      });
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      BreadcrumbManager.getInstance().addBreadcrumb({
        category: 'navigation',
        message: `History replace: ${args[2]}`,
        level: 'info',
      });
    };
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// =============================================================================
// SINGLETON EXPORT
// =============================================================================

export const errorHandler = ErrorHandler.getInstance();
export { BreadcrumbManager, ErrorRecoveryManager, UserFeedbackManager };
export default errorHandler;
