/**
 * 🔒 SECURITY PROVIDER - BetweenDeals M&A Platform
 * Comprehensive frontend security component with CSP, XSS protection, and security monitoring
 * Built by Senior CTO for enterprise-grade security
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isDevelopment, SECURITY_CONFIG, MONITORING_CONFIG } from '../../config/api';

// =============================================================================
// INTERFACES & TYPES
// =============================================================================

interface SecurityContext {
  isSecure: boolean;
  violations: SecurityViolation[];
  reportViolation: (violation: SecurityViolation) => void;
  sanitizeInput: (input: string, maxLength?: number) => string;
  validateFileUpload: (file: File) => ValidationResult;
  checkCSP: () => boolean;
  enableSecurityHeaders: () => void;
}

interface SecurityViolation {
  id: string;
  type: 'csp' | 'xss' | 'injection' | 'file_upload' | 'rate_limit' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: any;
  timestamp: number;
  userAgent: string;
  url: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface SecurityMetrics {
  violationsCount: number;
  lastViolation: number;
  securityScore: number;
  threatsBlocked: number;
}

// =============================================================================
// SECURITY CONTEXT
// =============================================================================

const SecurityContext = createContext<SecurityContext | null>(null);

export const useSecurityContext = (): SecurityContext => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

// =============================================================================
// CSP IMPLEMENTATION
// =============================================================================

class CSPManager {
  private static instance: CSPManager;
  private violations: SecurityViolation[] = [];

  static getInstance(): CSPManager {
    if (!CSPManager.instance) {
      CSPManager.instance = new CSPManager();
    }
    return CSPManager.instance;
  }

  initializeCSP(): void {
    // Create CSP meta tag
    this.createCSPMetaTag();

    // Listen for CSP violations
    this.setupViolationReporting();

    // Apply additional security headers via meta tags
    this.applySecurityHeaders();
  }

  private createCSPMetaTag(): void {
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCSP) {
      existingCSP.remove();
    }

    const cspDirectives = Object.entries(SECURITY_CONFIG.CONTENT_SECURITY_POLICY)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');

    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Content-Security-Policy';
    metaTag.content = cspDirectives;
    document.head.appendChild(metaTag);

    if (isDevelopment) {
      console.log('[Security] CSP Policy Applied:', cspDirectives);
    }
  }

  private setupViolationReporting(): void {
    document.addEventListener('securitypolicyviolation', e => {
      const violation: SecurityViolation = {
        id: `csp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'csp',
        severity: this.classifyCSPViolationSeverity(e.violatedDirective),
        message: `CSP Violation: ${e.violatedDirective}`,
        details: {
          blockedURI: e.blockedURI,
          violatedDirective: e.violatedDirective,
          originalPolicy: e.originalPolicy,
          sourceFile: e.sourceFile,
          lineNumber: e.lineNumber,
          columnNumber: e.columnNumber,
        },
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      this.violations.push(violation);
      this.reportViolation(violation);
    });
  }

  private classifyCSPViolationSeverity(directive: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalDirectives = ['script-src', 'object-src'];
    const highDirectives = ['frame-src', 'connect-src'];
    const mediumDirectives = ['style-src', 'font-src'];

    if (criticalDirectives.includes(directive)) return 'critical';
    if (highDirectives.includes(directive)) return 'high';
    if (mediumDirectives.includes(directive)) return 'medium';
    return 'low';
  }

  private applySecurityHeaders(): void {
    const securityHeaders = [
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-Frame-Options', content: 'DENY' },
      { name: 'X-XSS-Protection', content: '1; mode=block' },
      { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { name: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' },
    ];

    securityHeaders.forEach(({ name, content }) => {
      const existing = document.querySelector(`meta[http-equiv="${name}"]`);
      if (existing) {
        existing.remove();
      }

      const metaTag = document.createElement('meta');
      metaTag.httpEquiv = name;
      metaTag.content = content;
      document.head.appendChild(metaTag);
    });
  }

  private reportViolation(violation: SecurityViolation): void {
    if (isDevelopment) {
      console.warn('[Security Violation]', violation);
    }

    // In production, send to security monitoring service
    if (MONITORING_CONFIG.ENABLED && !isDevelopment) {
      this.sendSecurityReport(violation);
    }
  }

  private async sendSecurityReport(violation: SecurityViolation): Promise<void> {
    try {
      // Send to security monitoring endpoint
      await fetch('/api/security/violations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(violation),
      });
    } catch (error) {
      console.error('Failed to report security violation:', error);
    }
  }

  getViolations(): SecurityViolation[] {
    return [...this.violations];
  }

  getSecurityScore(): number {
    const totalViolations = this.violations.length;
    const criticalViolations = this.violations.filter(v => v.severity === 'critical').length;
    const highViolations = this.violations.filter(v => v.severity === 'high').length;

    // Calculate security score (100 = perfect, 0 = critical issues)
    let score = 100;
    score -= criticalViolations * 30;
    score -= highViolations * 15;
    score -= (totalViolations - criticalViolations - highViolations) * 5;

    return Math.max(0, score);
  }
}

// =============================================================================
// XSS PROTECTION
// =============================================================================

class XSSProtection {
  private static suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*>/gi,
    /<link\b[^<]*>/gi,
    /<meta\b[^<]*>/gi,
  ];

  static sanitizeInput(input: string, maxLength: number = 1000): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    // Trim and limit length
    let sanitized = input.trim().slice(0, maxLength);

    // Remove potentially dangerous HTML tags and attributes
    sanitized = sanitized
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    // Check for suspicious patterns
    this.suspiciousPatterns.forEach(pattern => {
      if (pattern.test(sanitized)) {
        throw new Error('Potentially malicious input detected');
      }
    });

    return sanitized;
  }

  static validateHTML(html: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    // Check for dangerous patterns
    this.suspiciousPatterns.forEach(pattern => {
      if (pattern.test(html)) {
        result.isValid = false;
        result.errors.push(`Potentially dangerous content detected: ${pattern.source}`);
      }
    });

    return result;
  }

  static createSecureElement(
    tagName: string,
    attributes: Record<string, string> = {}
  ): HTMLElement {
    const element = document.createElement(tagName);

    // Whitelist of safe attributes
    const safeAttributes = [
      'class',
      'id',
      'title',
      'alt',
      'src',
      'href',
      'target',
      'rel',
      'role',
      'aria-label',
      'aria-describedby',
      'data-testid',
    ];

    Object.entries(attributes).forEach(([key, value]) => {
      if (safeAttributes.includes(key)) {
        element.setAttribute(key, this.sanitizeInput(value));
      }
    });

    return element;
  }
}

// =============================================================================
// FILE UPLOAD SECURITY
// =============================================================================

class FileUploadSecurity {
  static validateFile(file: File): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    // Check file type
    if (!SECURITY_CONFIG.ALLOWED_FILE_TYPES.includes(file.type as any)) {
      result.isValid = false;
      result.errors.push(`File type ${file.type} is not allowed`);
    }

    // Check file size
    if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
      result.isValid = false;
      result.errors.push(`File size ${file.size} exceeds maximum allowed size`);
    }

    // Check file name for suspicious patterns
    const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.jar', '.js', '.vbs'];
    const fileName = file.name.toLowerCase();

    suspiciousExtensions.forEach(ext => {
      if (fileName.endsWith(ext)) {
        result.isValid = false;
        result.errors.push(`File extension ${ext} is not allowed`);
      }
    });

    // Check for double extensions
    if ((fileName.match(/\./g) || []).length > 1) {
      result.warnings.push('File has multiple extensions');
    }

    // Check file name length
    if (file.name.length > 255) {
      result.isValid = false;
      result.errors.push('File name is too long');
    }

    return result;
  }

  static async scanFileContent(file: File): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = e => {
        const content = e.target?.result as string;

        if (content) {
          // Check for suspicious content in text files
          const suspiciousPatterns = [/<script/i, /javascript:/i, /data:text\/html/i, /vbscript:/i];

          suspiciousPatterns.forEach(pattern => {
            if (pattern.test(content)) {
              result.isValid = false;
              result.errors.push('Suspicious content detected in file');
            }
          });
        }

        resolve(result);
      };

      reader.onerror = () => {
        result.isValid = false;
        result.errors.push('Failed to read file content');
        resolve(result);
      };

      // Only read first 1KB for performance
      const blob = file.slice(0, 1024);
      reader.readAsText(blob);
    });
  }
}

// =============================================================================
// THREAT DETECTION
// =============================================================================

class ThreatDetection {
  private static suspiciousActivity: Array<{ type: string; timestamp: number }> = [];
  private static rateLimitTracker: Map<string, number[]> = new Map();

  static monitorUserBehavior(): void {
    // Monitor rapid clicks/requests
    let clickCount = 0;
    let lastClickTime = 0;

    document.addEventListener('click', () => {
      const now = Date.now();

      if (now - lastClickTime < 100) {
        // Less than 100ms between clicks
        clickCount++;

        if (clickCount > 10) {
          this.reportSuspiciousActivity('rapid_clicking', {
            clickCount,
            timeWindow: now - lastClickTime,
          });
        }
      } else {
        clickCount = 0;
      }

      lastClickTime = now;
    });

    // Monitor excessive API requests
    this.monitorAPIRequests();
  }

  private static monitorAPIRequests(): void {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const url = args[0].toString();

      if (url.includes('/api/')) {
        this.trackAPIRequest(url);
      }

      return originalFetch.apply(window, args);
    };
  }

  private static trackAPIRequest(url: string): void {
    const now = Date.now();
    const requests = this.rateLimitTracker.get(url) || [];

    // Keep only requests from the last minute
    const recentRequests = requests.filter(time => now - time < 60000);
    recentRequests.push(now);

    this.rateLimitTracker.set(url, recentRequests);

    // Check if rate limit is exceeded
    if (recentRequests.length > 100) {
      // 100 requests per minute
      this.reportSuspiciousActivity('rate_limit_exceeded', {
        url,
        requestCount: recentRequests.length,
        timeWindow: 60000,
      });
    }
  }

  private static reportSuspiciousActivity(type: string, details: any): void {
    const activity = { type, timestamp: Date.now() };
    this.suspiciousActivity.push(activity);

    const violation: SecurityViolation = {
      id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'suspicious_activity',
      severity: 'medium',
      message: `Suspicious activity detected: ${type}`,
      details,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    if (isDevelopment) {
      console.warn('[Threat Detection]', violation);
    }

    // Report to security service
    if (MONITORING_CONFIG.ENABLED) {
      this.sendThreatReport(violation);
    }
  }

  private static async sendThreatReport(violation: SecurityViolation): Promise<void> {
    try {
      await fetch('/api/security/threats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(violation),
      });
    } catch (error) {
      console.error('Failed to report threat:', error);
    }
  }
}

// =============================================================================
// SECURITY PROVIDER COMPONENT
// =============================================================================

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [isSecure, setIsSecure] = useState(false);
  const [violations, setViolations] = useState<SecurityViolation[]>([]);
  const [cspManager] = useState(() => CSPManager.getInstance());

  useEffect(() => {
    initializeSecurity();
  }, []);

  const initializeSecurity = async (): Promise<void> => {
    try {
      // Initialize CSP
      cspManager.initializeCSP();

      // Start threat detection
      ThreatDetection.monitorUserBehavior();

      // Check if we're running on HTTPS in production
      const isHTTPS = window.location.protocol === 'https:';
      const isLocalhost = window.location.hostname === 'localhost';

      if (!isDevelopment && !isHTTPS && !isLocalhost) {
        console.error('[Security] Application should be served over HTTPS in production');
        reportViolation({
          id: `https_${Date.now()}`,
          type: 'csp',
          severity: 'critical',
          message: 'Application not served over HTTPS',
          details: { protocol: window.location.protocol },
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        });
      }

      setIsSecure(true);
    } catch (error) {
      console.error('[Security] Failed to initialize security:', error);
      setIsSecure(false);
    }
  };

  const reportViolation = (violation: SecurityViolation): void => {
    setViolations(prev => [...prev, violation]);
  };

  const sanitizeInput = (input: string, maxLength?: number): string => {
    return XSSProtection.sanitizeInput(input, maxLength);
  };

  const validateFileUpload = (file: File): ValidationResult => {
    return FileUploadSecurity.validateFile(file);
  };

  const checkCSP = (): boolean => {
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    return !!cspMeta;
  };

  const enableSecurityHeaders = (): void => {
    cspManager.initializeCSP();
  };

  const contextValue: SecurityContext = {
    isSecure,
    violations,
    reportViolation,
    sanitizeInput,
    validateFileUpload,
    checkCSP,
    enableSecurityHeaders,
  };

  return <SecurityContext.Provider value={contextValue}>{children}</SecurityContext.Provider>;
};

// =============================================================================
// SECURITY HOOKS
// =============================================================================

export const useSecurityValidation = () => {
  const { sanitizeInput, validateFileUpload } = useSecurityContext();

  return {
    sanitizeInput,
    validateFileUpload,
    validateHTML: XSSProtection.validateHTML,
    scanFileContent: FileUploadSecurity.scanFileContent,
  };
};

export const useSecurityMetrics = (): SecurityMetrics => {
  const { violations } = useSecurityContext();
  const cspManager = CSPManager.getInstance();

  return {
    violationsCount: violations.length,
    lastViolation: violations.length > 0 ? Math.max(...violations.map(v => v.timestamp)) : 0,
    securityScore: cspManager.getSecurityScore(),
    threatsBlocked: violations.filter(v => v.type === 'suspicious_activity').length,
  };
};

export default SecurityProvider;
