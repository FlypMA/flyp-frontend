/**
 * API Configuration for Frontend Backends
 * Connects to Node.js (Supabase) and Python (AI Chat) backends
 */

export const API_CONFIG = {
  // Node.js backend connected to Supabase for user management and data
  NODE_BACKEND: {
    baseURL: 'https://web-production-8d00b.up.railway.app',
    endpoints: {
      auth: {
        // Primary endpoints (Railway backend with /api prefix) - ✅ WORKING
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        verify: '/api/auth/verify',
        refresh: '/api/auth/refresh',
        profile: '/api/users/profile',

        // Legacy endpoints (backward compatibility without /api prefix)
        loginLegacy: '/auth/login',
        registerLegacy: '/auth/register',
        profileLegacy: '/auth/profile',
      },
      users: {
        profile: '/api/users/profile',
        update: '/api/users/profile',
        business: '/api/users/business',
        roleToggle: '/api/users/role/toggle',
        sellers: '/api/users/sellers',
        creators: '/api/users/creators',
        businesses: '/api/users/businesses',

        // User profile and settings (working endpoints)
        userProfile: '/api/user/profile',
        updateProfile: '/api/user/profile',
        creatorMode: '/api/user/creator-mode', // ✅ Working endpoint for creator mode
        userType: '/api/user/type',
        avatar: '/api/user/avatar',
        deleteAccount: '/api/user/account',
      },
      data: {
        creator: '/api/data/creator',
        business: '/api/data/business',
        analytics: '/api/data/analytics',
      },
      billing: {
        plan: '/api/billing/plan',
        createCheckoutSession: '/api/billing/create-checkout-session',
        createPortalSession: '/api/billing/create-portal-session',
        webhook: '/api/billing/webhook',
        analytics: '/api/billing/analytics',
        credits: {
          use: '/api/billing/credits/use',
          history: '/api/billing/credits/history',
          reset: '/api/billing/credits/reset',
        },
        dev: {
          createPlan: '/api/billing/dev/create-plan',
          status: '/api/billing/dev/status',
        },
      },
      reports: {
        generate: '/api/generate-report', // ✅ WORKING
        status: '/api/report-status', // TODO: Implement
        get: '/api/reports', // TODO: Implement
        delete: '/api/reports', // TODO: Implement
        list: '/api/reports', // TODO: Implement
        health: '/api/health/reports', // TODO: Implement
      },
      chat: {
        // Basic chat endpoint - ✅ WORKING
        message: '/api/chat',

        // Enhanced chat endpoints (when socket.io is enabled)
        conversations: '/api/chat/conversations',
        send: '/api/chat/conversations/:id/messages',
        aiRequest: '/api/chat/ai/request',
        status: '/api/chat/ai/status/:requestId',

        // Legacy chat endpoints
        query: '/api/chat/query', // TODO: Map to /api/chat
        history: '/api/chat/history', // TODO: Implement
        suggestions: '/api/chat/suggestions', // TODO: Implement
      },
      health: {
        api: '/api/health', // ✅ WORKING
        server: '/health', // ✅ WORKING
        reports: '/api/health/reports', // TODO: Implement
      },
    },
  },

  // Python backend for AI query chat functionality
  // TODO: Update legacy Ilara URLs to BetweenDeals endpoints
  AI_BACKEND: {
    baseURL: 'https://ilara-deep-end-artemis-production.up.railway.app', // Legacy Ilara endpoint
    endpoints: {
      chat: {
        query: '/api/chat/query',
        history: '/api/chat/history',
        suggestions: '/api/chat/suggestions',
        mcp: '/chat', // ✅ WORKING
      },
      analysis: {
        trends: '/api/analysis/trends',
        insights: '/api/analysis/insights',
        performance: '/api/analysis/performance',
      },
      creator: {
        content: '/api/creator/content-analysis',
        audience: '/api/creator/audience-insights',
        growth: '/api/creator/growth-opportunities',
      },
      business: {
        campaigns: '/api/business/campaign-analysis',
        market: '/api/business/market-trends',
        targeting: '/api/business/audience-targeting',
      },
      reports: {
        generate: '/api/v1/reports/generate', // ✅ WORKING
        process: '/process_prompt', // ✅ WORKING (legacy)
      },
      health: {
        check: '/health', // ✅ WORKING
        live: '/health/live', // ✅ WORKING
        ready: '/health/ready', // ✅ WORKING
      },
    },
  },

  // Data aggregation backend (Aphrodite)
  // TODO: Update legacy Ilara URLs to BetweenDeals endpoints
  DATA_BACKEND: {
    baseURL: 'https://ilara-trends-data-aggregator-aphrodite-production.up.railway.app', // Legacy Ilara endpoint
    endpoints: {
      trends: {
        list: '/api/v1/trends', // ✅ WORKING
        aggregate: '/api/v1/trends/aggregate', // ✅ WORKING
        context: '/api/v1/context', // ✅ WORKING
      },
      health: {
        check: '/health', // ✅ WORKING
        data: '/health/data', // ✅ WORKING
        services: '/health/services', // ✅ WORKING
      },
    },
  },
};

// Request headers configuration
export const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// Helper function to get auth headers - now automatically retrieves token
export const getAuthHeaders = async (explicitToken?: string): Promise<Record<string, string>> => {
  const headers: Record<string, string> = { ...API_HEADERS };

  // Use explicit token if provided, otherwise get from auth service
  let token = explicitToken;

  if (!token) {
    try {
      // Dynamically import to avoid circular dependencies
      const { authService } = await import('./authAPI');
      const authToken = authService.getAuthenticatedUser();
      token = authToken || undefined;
    } catch (error) {
      console.warn('⚠️ Failed to get authentication token:', error);
    }
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Synchronous version for cases where async is not possible
export const getAuthHeadersSync = (explicitToken?: string): Record<string, string> => {
  const headers: Record<string, string> = { ...API_HEADERS };

  if (explicitToken) {
    headers['Authorization'] = `Bearer ${explicitToken}`;
  } else {
    // Try to get token from cookies directly (synchronous fallback)
    try {
      if (typeof document !== 'undefined') {
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='))
          ?.split('=')[1];

        if (cookieValue) {
          headers['Authorization'] = `Bearer ${cookieValue}`;
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to get token from cookies:', error);
    }
  }

  return headers;
};

// Development mode configuration
export const DEV_CONFIG = {
  enableMockData: import.meta.env.VITE_DEV_BYPASS_AUTH === 'true',
  timeout: 10000, // 10 seconds
  retries: 3,
};
