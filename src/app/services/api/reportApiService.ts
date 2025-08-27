/**
 * Report API Service
 * Handles API calls to the Node.js backend for report generation
 */

import { API_CONFIG, getAuthHeaders } from './apiConfig';

export interface GenerateReportRequest {
  user_id: string;
  prompt: string;
  conversation_history?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
  }>;
  report_options?: {
    format: 'html' | 'pdf' | 'json';
    style: 'creator' | 'business' | 'general';
    include_charts?: boolean;
    include_insights?: boolean;
  };
}

export interface GenerateReportResponse {
  status: 'completed' | 'processing' | 'failed';
  request_id: string;
  html_report?: string;
  generated_at: string;
  success?: boolean;
  summary?: string;
  chat_summary?: string;
  response?: string;
  ai_summary?: string;
  report_summary?: string;
  data_quality?: {
    quality_score: number;
    issues_count: number;
    warnings_count: number;
  };
  metadata?: {
    hasAiSummary: boolean;
    aiSummaryLength: number;
    hasDataQuality: boolean;
    hasHtmlReport: boolean;
    htmlReportLength: number;
    hasInsights: boolean;
    generation_time: string;
    processing_time_ms: number;
    tokens_used?: number;
    sources_analyzed?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  insights?: {
    summary?: any;
    recommendations?: any[];
    data_quality?: any;
  };
  credits_info?: {
    credits_used: number;
    credits_remaining: number;
    plan_type: string;
  };
}

export interface ReportGenerationProgress {
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress_percentage: number;
  current_step: string;
  estimated_completion_ms?: number;
  message?: string;
}

class ReportApiService {
  private baseURL: string;
  private timeout: number = 120000; // 2 minutes for report generation

  constructor() {
    this.baseURL = API_CONFIG.NODE_BACKEND.baseURL;
  }

  /**
   * Generate report using the Node.js backend
   */
  async generateReport(request: GenerateReportRequest): Promise<GenerateReportResponse> {
    const startTime = Date.now();
    const requestId = `report_req_${startTime}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Validate the request
      if (!request.prompt) {
        throw new Error('Prompt is required');
      }

      // Call the backend API
      const response = await this.makeRequest(request);

      // Handle error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        switch (response.status) {
          case 400:
            return {
              status: 'failed',
              request_id: requestId,
              generated_at: new Date().toISOString(),
              success: false,
              error: {
                code: 'VALIDATION_ERROR',
                message: errorData.message || 'Invalid request',
                details: errorData,
              },
            };
          case 401:
            return {
              status: 'failed',
              request_id: requestId,
              generated_at: new Date().toISOString(),
              success: false,
              error: {
                code: 'UNAUTHORIZED',
                message: 'Authentication required',
                details: errorData,
              },
            };
          case 429:
            return {
              status: 'failed',
              request_id: requestId,
              generated_at: new Date().toISOString(),
              success: false,
              error: {
                code: 'RATE_LIMIT',
                message: 'Too many requests. Please try again later.',
                details: errorData,
              },
            };
          case 500:
            return {
              status: 'failed',
              request_id: requestId,
              generated_at: new Date().toISOString(),
              success: false,
              error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: `Server error: ${errorData.message || 'Internal server error'}`,
                details: {
                  status: response.status,
                  response_data: errorData,
                },
              },
            };
          case 502:
          case 503:
          case 504:
            return {
              status: 'failed',
              request_id: requestId,
              generated_at: new Date().toISOString(),
              success: false,
              error: {
                code: 'SERVICE_UNAVAILABLE',
                message:
                  'Report generation service is temporarily unavailable. Please try again later.',
                details: {
                  status: response.status,
                  gateway_error: true,
                },
              },
            };
          default:
            return {
              status: 'failed',
              request_id: requestId,
              generated_at: new Date().toISOString(),
              success: false,
              error: {
                code: 'HTTP_ERROR',
                message: `HTTP ${response.status}: ${response.statusText}`,
                details: {
                  status: response.status,
                  status_text: response.statusText,
                },
              },
            };
        }
      }

      // Parse the successful response
      const data: GenerateReportResponse = await response.json();

      console.log(`✅ [${requestId}] Report generated successfully`);
      console.log(`📊 Status: ${data.status}`);
      console.log(`📄 HTML Report Length: ${data.html_report?.length || 0} characters`);
      console.log(`🕒 Generated At: ${data.generated_at}`);

      // Validate the HTML content if present
      if (data.html_report) {
        const htmlValidation = this.validateHTMLContent(data.html_report);
        if (!htmlValidation.isValid) {
          console.warn(`⚠️ [${requestId}] HTML validation warning:`, htmlValidation.warning);

          // Add warning to metadata but don't fail the request
          data.metadata = {
            hasAiSummary: !!data.ai_summary,
            aiSummaryLength: data.ai_summary?.length || 0,
            hasDataQuality: !!data.data_quality,
            hasHtmlReport: !!data.html_report,
            htmlReportLength: data.html_report?.length || 0,
            hasInsights: !!data.insights,
            generation_time: `${Date.now() - startTime}ms`,
            processing_time_ms: Date.now() - startTime,
            tokens_used: data.metadata?.tokens_used,
            sources_analyzed: data.metadata?.sources_analyzed,
          };
        }
      }

      // Ensure success flag is set for completed reports
      if (data.status === 'completed' && data.html_report) {
        return { ...data, success: true };
      }

      return data;
    } catch (error: any) {
      console.error(`❌ [${requestId}] Error generating report:`, error);
      return {
        status: 'failed',
        request_id: requestId,
        generated_at: new Date().toISOString(),
        success: false,
        error: {
          code: 'REQUEST_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
          details: { error },
        },
      };
    }
  }

  /**
   * Check the status of a report generation job (for async processing)
   */
  async checkReportStatus(reportId: string): Promise<ReportGenerationProgress> {
    try {
      const authHeaders = await getAuthHeaders();

      const response = await fetch(`${this.baseURL}/api/report-status/${reportId}`, {
        method: 'GET',
        headers: authHeaders,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(`❌ Failed to check report status for ID ${reportId}:`, error);

      return {
        status: 'failed',
        progress_percentage: 0,
        current_step: 'Error checking status',
        message: error.message || 'Unable to check report status',
      };
    }
  }

  /**
   * Retrieve a previously generated report
   */
  async getReport(
    reportId: string,
    format: 'html' | 'pdf' | 'json' = 'html'
  ): Promise<GenerateReportResponse> {
    try {
      const authHeaders = await getAuthHeaders();

      const response = await fetch(`${this.baseURL}/api/reports/${reportId}?format=${format}`, {
        method: 'GET',
        headers: authHeaders,
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Report not found. It may have been deleted or expired.');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(`❌ Failed to retrieve report ${reportId}:`, error);

      return {
        status: 'failed',
        request_id: `retrieve_${Date.now()}`,
        generated_at: new Date().toISOString(),
        success: false,
        error: {
          code: 'RETRIEVAL_ERROR',
          message: error.message || 'Failed to retrieve report',
          details: { report_id: reportId, format },
        },
      };
    }
  }

  /**
   * List user's previous reports
   */
  async listReports(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    success: boolean;
    reports?: Array<{
      id: string;
      title: string;
      created_at: string;
      format: string;
      size_bytes: number;
      status: string;
    }>;
    total_count?: number;
    error?: string;
  }> {
    try {
      const authHeaders = await getAuthHeaders();

      const response = await fetch(`${this.baseURL}/api/reports?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: authHeaders,
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, ...data };
    } catch (error: any) {
      console.error('❌ Failed to list reports:', error);

      return {
        success: false,
        error: error.message || 'Failed to retrieve reports list',
      };
    }
  }

  /**
   * Delete a report
   */
  async deleteReport(reportId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const authHeaders = await getAuthHeaders();

      const response = await fetch(`${this.baseURL}/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: authHeaders,
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { success: true }; // Already deleted
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return { success: true };
    } catch (error: any) {
      console.error(`❌ Failed to delete report ${reportId}:`, error);

      return {
        success: false,
        error: error.message || 'Failed to delete report',
      };
    }
  }

  /**
   * Health check for the report generation service
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    response_time_ms: number;
    services: {
      backend: boolean;
      ai_pipeline: boolean;
      database: boolean;
    };
  }> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.baseURL}/api/health/reports`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });

      const responseTime = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`Health check failed: HTTP ${response.status}`);
      }

      const data = await response.json();

      return {
        healthy: true,
        response_time_ms: responseTime,
        services: {
          backend: true,
          ai_pipeline: data.ai_pipeline || false,
          database: data.database || false,
        },
      };
    } catch (error: any) {
      const responseTime = Date.now() - startTime;

      console.warn('⚠️ Report service health check failed:', error);

      return {
        healthy: false,
        response_time_ms: responseTime,
        services: {
          backend: false,
          ai_pipeline: false,
          database: false,
        },
      };
    }
  }

  /**
   * Test backend health before making requests
   */
  private async testBackendHealth(): Promise<{ healthy: boolean; details?: any }> {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout for health check
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        return {
          healthy: true,
          details: {
            status: response.status,
            response_data: data,
            response_time: performance.now(),
          },
        };
      } else {
        return {
          healthy: false,
          details: {
            status: response.status,
            status_text: response.statusText,
          },
        };
      }
    } catch (error) {
      return {
        healthy: false,
        details: {
          error: error instanceof Error ? error.message : 'Unknown error',
          connection_failed: true,
        },
      };
    }
  }

  /**
   * Validate HTML content for common issues
   */
  private validateHTMLContent(html: string): { isValid: boolean; warning?: string; details?: any } {
    try {
      // Check for extremely large content
      if (html.length > 10 * 1024 * 1024) {
        // 10MB
        return {
          isValid: false,
          warning: 'HTML content is extremely large (>10MB)',
          details: { size: html.length },
        };
      }

      // Check for suspicious patterns
      const suspiciousPatterns = [
        /<<script>>/gi,
        /<script><script>/gi,
        /javascript:/gi,
        /vbscript:/gi,
        /on\w+\s*=/gi, // Event handlers
      ];

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(html)) {
          return {
            isValid: false,
            warning: `Suspicious pattern detected: ${pattern.toString()}`,
            details: { pattern: pattern.toString() },
          };
        }
      }

      // Check for severely malformed HTML
      const openTags = (html.match(/<[^/][^>]*>/g) || []).length;
      const closeTags = (html.match(/<\/[^>]*>/g) || []).length;

      if (openTags > closeTags + 20) {
        // Allow some tolerance
        return {
          isValid: false,
          warning: 'HTML appears to have many unclosed tags',
          details: { open_tags: openTags, close_tags: closeTags },
        };
      }

      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        warning: 'Failed to validate HTML content',
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  private async makeRequest(request: GenerateReportRequest): Promise<Response> {
    const authHeaders = await getAuthHeaders();

    // Prepare the request payload
    const payload: GenerateReportRequest = {
      ...request,
      report_options: {
        format: 'html',
        style: 'business',
        include_charts: true,
        include_insights: true,
        ...request.report_options,
      },
    };

    // Create abort controller for timeout handling
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, this.timeout);

    try {
      // Make the API call
      const response = await fetch(`${this.baseURL}/api/generate-report`, {
        method: 'POST',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json',
          'X-Timeout': this.timeout.toString(),
        },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });

      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

// Create singleton instance
export const reportApiService = new ReportApiService();
export default reportApiService;
