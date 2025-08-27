import { UserPlan, CreditUsage, CreditCheckResult, PLAN_CONFIGS } from '../../types/billing/plans';
import { API_CONFIG } from '../api/apiConfig';
import { authService } from '../users/authenticationService';

class CreditService {
  private baseURL: string;
  private planCache: { plan: UserPlan | null; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 30000; // 30 seconds cache

  constructor() {
    this.baseURL = API_CONFIG.NODE_BACKEND.baseURL;
  }

  /**
   * Check if billing service is available
   */
  async checkBillingHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return response.ok;
    } catch (error) {
      console.warn('Billing service health check failed:', error);
      return false;
    }
  }

  /**
   * Get current user's plan and credit information
   */
  async getUserPlan(forceRefresh: boolean = false): Promise<UserPlan | null> {
    // Check cache first (unless force refresh requested)
    if (
      !forceRefresh &&
      this.planCache &&
      Date.now() - this.planCache.timestamp < this.CACHE_DURATION
    ) {
      console.log('💰 Using cached plan data (prevents rate limiting)');
      return this.planCache.plan;
    }

    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) {
        console.warn('No auth token found for credit service');
        return null;
      }

      // Check if user is a creator from the current path or stored user type
      const isCreator = this.isCreatorUser();

      if (isCreator) {
        const creatorPlan = this.getCreatorsPlan();
        // Cache creator plan too
        this.planCache = { plan: creatorPlan, timestamp: Date.now() };
        return creatorPlan;
      }

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.plan}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          // User doesn't have a plan yet, create default free plan
          console.log('📝 Creating default free plan for new user...');
          const newPlan = await this.createDefaultFreePlan();
          // Cache the new plan
          this.planCache = { plan: newPlan, timestamp: Date.now() };
          return newPlan;
        }
        if (response.status === 429) {
          console.warn('⚠️ Rate limited - using fallback plan');
          // If we have a cached plan, use it even if expired
          if (this.planCache) {
            console.log('💰 Using expired cache due to rate limiting');
            return this.planCache.plan;
          }
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const plan = this.transformApiPlan(data.plan);

      // Cache the successful response
      this.planCache = { plan, timestamp: Date.now() };

      return plan;
    } catch (error) {
      console.error('❌ Failed to get user plan:', error);

      // If we have cached data, use it during errors
      if (this.planCache) {
        console.log('💰 Using cached plan due to API error');
        return this.planCache.plan;
      }

      // Fallback: check if user is creator and return creators plan
      if (this.isCreatorUser()) {
        const creatorPlan = this.getCreatorsPlan();
        this.planCache = { plan: creatorPlan, timestamp: Date.now() };
        return creatorPlan;
      }

      // Enhanced fallback: create a local free plan if backend is unavailable
      console.log('🔄 Creating fallback free plan due to API error...');
      const fallbackPlan = this.createFallbackFreePlan();
      this.planCache = { plan: fallbackPlan, timestamp: Date.now() };
      return fallbackPlan;
    }
  }

  /**
   * Transform API response plan data from snake_case to camelCase
   */
  private transformApiPlan(apiPlan: any): UserPlan | null {
    if (!apiPlan) return null;

    return {
      id: apiPlan.id || apiPlan.user_id || `plan-${Date.now()}`,
      userId: apiPlan.user_id || apiPlan.userId,
      planType: apiPlan.plan_type || apiPlan.planType || 'free',
      status: apiPlan.status || 'active',
      creditsPerMonth: apiPlan.credits_per_month || apiPlan.creditsPerMonth || 0,
      creditsUsed: apiPlan.credits_used || apiPlan.creditsUsed || 0,
      creditsRemaining: apiPlan.credits_remaining || apiPlan.creditsRemaining || 0,
      billingCycle: apiPlan.billing_cycle || apiPlan.billingCycle || 'monthly',
      currentPeriodStart:
        apiPlan.current_period_start || apiPlan.currentPeriodStart || new Date().toISOString(),
      currentPeriodEnd:
        apiPlan.current_period_end || apiPlan.currentPeriodEnd || new Date().toISOString(),
      nextBillingDate: apiPlan.next_billing_date || apiPlan.nextBillingDate,
      stripeSubscriptionId: apiPlan.stripe_subscription_id || apiPlan.stripeSubscriptionId,
      stripeCustomerId: apiPlan.stripe_customer_id || apiPlan.stripeCustomerId,
      createdAt: apiPlan.created_at || apiPlan.createdAt || new Date().toISOString(),
      updatedAt: apiPlan.updated_at || apiPlan.updatedAt || new Date().toISOString(),
    };
  }

  /**
   * Check if current user is a creator based on URL path, stored user type, or backend role
   */
  private isSellerUser(): boolean {
    // TODO: Implement seller user check
    return false;
  }

  private isCreatorUser(): boolean {
    // Check current path
    const path = window.location.pathname;
    if (path.includes('/account/creator/')) {
      return true;
    }

    // Check stored user type
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType === 'creator') {
      return true;
    }

    // Check user role from JWT token (backend assigns role: "creator")
    try {
      const authToken = authService.getAuthenticatedUser();
      if (authToken) {
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        // Note: Backend uses "role" field, not "user_type"
        if (payload.role === 'creator') {
          console.log('🎨 User detected as creator from JWT role');
          return true;
        }
      }
    } catch (error) {
      console.error('Failed to check user role from token:', error);
    }

    return false;
  }

  /**
   * Get creators plan (local, no API call needed)
   */
  private getSellersPlan(): UserPlan {
    // TODO: Implement sellers plan
    return {
      id: 'seller_basic',
      userId: 'dev-user-123',
      planType: 'free',
      status: 'active',
      creditsPerMonth: 100,
      creditsUsed: 0,
      creditsRemaining: 100,
      billingCycle: 'monthly',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  private getCreatorsPlan(): UserPlan {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const userId = this.getCurrentUserId();
    const creditsUsed = this.getCreatorCreditUsage();
    const maxCredits = PLAN_CONFIGS.creators.creditsPerMonth;

    console.log('🎨 Creating creators plan:');
    console.log('  - userId:', userId);
    console.log('  - creditsUsed:', creditsUsed);
    console.log('  - maxCredits:', maxCredits);
    console.log('  - creditsRemaining will be:', Math.max(0, maxCredits - creditsUsed));
    console.log('  - PLAN_CONFIGS.creators:', PLAN_CONFIGS.creators);

    // Ensure we have valid values
    const safeMaxCredits = maxCredits || 10;
    const safeCreditsUsed = creditsUsed || 0;
    const creditsRemaining = Math.max(0, safeMaxCredits - safeCreditsUsed);

    const plan: UserPlan = {
      id: `creators-plan-${userId}`,
      userId: userId || 'unknown',
      planType: 'creators',
      status: 'active',
      creditsPerMonth: safeMaxCredits,
      creditsUsed: safeCreditsUsed,
      creditsRemaining: creditsRemaining,
      billingCycle: 'monthly',
      currentPeriodStart: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      currentPeriodEnd: nextMonth.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    console.log('🎨 Final creators plan object:', JSON.stringify(plan, null, 2));
    console.log('🎨 Plan properties check:', {
      creditsRemaining: plan.creditsRemaining,
      creditsPerMonth: plan.creditsPerMonth,
      planType: plan.planType,
      hasUndefinedValues: Object.values(plan).some(v => v === undefined),
    });

    return plan;
  }

  /**
   * Get current user ID from auth token
   */
  private getCurrentUserId(): string | null {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) return null;

      // Decode JWT token to get user ID (basic decode, no verification needed for this use)
      const payload = JSON.parse(atob(authToken.split('.')[1]));
      return payload.id || null;
    } catch (error) {
      console.error('Failed to get user ID from token:', error);
      return null;
    }
  }

  /**
   * Create default free plan for new users
   */
  async createDefaultFreePlan(): Promise<UserPlan | null> {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) return null;

      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      console.log('📝 Creating default free plan with fresh credits...');

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.plan}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            planType: 'free',
            creditsPerMonth: PLAN_CONFIGS.free.creditsPerMonth,
            creditsUsed: 0, // Explicitly set to 0 for new accounts
            creditsRemaining: PLAN_CONFIGS.free.creditsPerMonth, // Full credits
            currentPeriodStart: now.toISOString(),
            currentPeriodEnd: nextMonth.toISOString(),
            forceReset: true, // Flag to indicate this is a fresh account
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to create free plan:', response.status, errorText);
        throw new Error(`Failed to create free plan: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Default free plan created successfully with full credits:', data.plan);
      return this.transformApiPlan(data.plan);
    } catch (error) {
      console.error('❌ Failed to create default free plan:', error);

      // Enhanced fallback with fresh credits
      console.log('🔄 Creating enhanced fallback free plan...');
      return this.createFallbackFreePlan();
    }
  }

  /**
   * Create a local fallback free plan when backend is unavailable
   */
  private createFallbackFreePlan(): UserPlan {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const userId = this.getCurrentUserId() || 'fallback-user';

    console.log('⚡ Creating fallback free plan for immediate dashboard access');

    return {
      id: `fallback-free-${userId}-${now.getTime()}`,
      userId: userId,
      planType: 'free',
      status: 'active',
      creditsPerMonth: PLAN_CONFIGS.free.creditsPerMonth,
      creditsUsed: 0,
      creditsRemaining: PLAN_CONFIGS.free.creditsPerMonth,
      billingCycle: 'monthly',
      currentPeriodStart: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      currentPeriodEnd: nextMonth.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  }

  /**
   * Check if user has enough credits for an action
   */
  async checkCredits(action: string, creditsRequired: number = 1): Promise<CreditCheckResult> {
    try {
      const plan = await this.getUserPlan();
      if (!plan) {
        return {
          hasCredits: false,
          creditsRemaining: 0,
          creditsRequired,
          planType: 'none',
          canUpgrade: true,
          upgradeUrl: '/pricing',
        };
      }

      const hasCredits = plan.creditsRemaining >= creditsRequired;

      return {
        hasCredits,
        creditsRemaining: plan.creditsRemaining,
        creditsRequired,
        planType: plan.planType,
        canUpgrade: plan.planType === 'free',
        upgradeUrl: plan.planType === 'free' ? '/pricing' : undefined,
      };
    } catch (error) {
      console.error('Failed to check credits:', error);
      return {
        hasCredits: false,
        creditsRemaining: 0,
        creditsRequired,
        planType: 'error',
        canUpgrade: true,
        upgradeUrl: '/pricing',
      };
    }
  }

  /**
   * Use credits for an action
   */
  async useCredits(
    action: 'chat_message' | 'trend_analysis' | 'insight_generation' | 'export_data',
    creditsUsed: number = 1,
    description: string,
    metadata?: any
  ): Promise<boolean> {
    try {
      // Handle creators plan locally
      if (this.isCreatorUser()) {
        return this.useCreatorCredits(action, creditsUsed, description, metadata);
      }

      const authToken = authService.getAuthenticatedUser();
      if (!authToken) {
        console.warn('No auth token found for credit usage');
        return false;
      }

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.credits.use}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            action,
            creditsUsed,
            description,
            metadata,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to use credits:', errorData.error || response.statusText);
        return false;
      }

      const data = await response.json();
      console.log(
        `💳 Credits used: ${creditsUsed} for ${action}. Remaining: ${data.creditsRemaining}`
      );
      return true;
    } catch (error) {
      console.error('Failed to use credits:', error);

      // Fallback for creators
      if (this.isCreatorUser()) {
        return this.useCreatorCredits(action, creditsUsed, description, metadata);
      }

      return false;
    }
  }

  /**
   * Use credits for creators (local storage)
   */
  private useCreatorCredits(
    action: string,
    creditsUsed: number,
    description: string,
    metadata?: any
  ): boolean {
    try {
      const userId = this.getCurrentUserId() || 'unknown';
      const storageKey = `creator_credits_${userId}`;

      // Get current credit usage for this month
      const currentUsage = this.getCreatorCreditUsage();
      const maxCredits = PLAN_CONFIGS.creators.creditsPerMonth;

      if (currentUsage + creditsUsed > maxCredits) {
        console.warn('🚫 Not enough creator credits');
        return false;
      }

      // Update credit usage
      const newUsage = currentUsage + creditsUsed;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          used: newUsage,
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
          lastUpdated: new Date().toISOString(),
        })
      );

      console.log(
        `🎨 Creator credits used: ${creditsUsed} for ${action}. Remaining: ${maxCredits - newUsage}`
      );
      return true;
    } catch (error) {
      console.error('Failed to use creator credits:', error);
      return false;
    }
  }

  /**
   * Get current creator credit usage for this month
   */
  private getCreatorCreditUsage(): number {
    try {
      const userId = this.getCurrentUserId() || 'unknown';
      const storageKey = `creator_credits_${userId}`;
      const stored = localStorage.getItem(storageKey);

      if (!stored) return 0;

      const data = JSON.parse(stored);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      // Reset if it's a new month
      if (data.month !== currentMonth || data.year !== currentYear) {
        localStorage.removeItem(storageKey);
        return 0;
      }

      return data.used || 0;
    } catch (error) {
      console.error('Failed to get creator credit usage:', error);
      return 0;
    }
  }

  /**
   * Get credit usage history
   */
  async getCreditUsageHistory(limit: number = 20): Promise<CreditUsage[]> {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) return [];

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.credits.history}?limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.usage as CreditUsage[];
    } catch (error) {
      console.error('Failed to get credit usage history:', error);
      return [];
    }
  }

  /**
   * Create Stripe checkout session for plan upgrade
   */
  async createCheckoutSession(
    planType: 'pro' | 'enterprise',
    billingCycle: 'monthly' | 'yearly' = 'monthly'
  ): Promise<{ success: boolean; checkoutUrl?: string; error?: string }> {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) {
        return { success: false, error: 'Authentication required' };
      }

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.createCheckoutSession}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            planType,
            billingCycle,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.error || 'Checkout session creation failed' };
      }

      const data = await response.json();
      return {
        success: true,
        checkoutUrl: data.checkoutUrl || data.url,
      };
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      return { success: false, error: 'Checkout session creation failed' };
    }
  }

  /**
   * Create Stripe customer portal session
   */
  async createPortalSession(): Promise<{ success: boolean; portalUrl?: string; error?: string }> {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) {
        return { success: false, error: 'Authentication required' };
      }

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.createPortalSession}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.error || 'Portal session creation failed' };
      }

      const data = await response.json();
      return {
        success: true,
        portalUrl: data.portalUrl || data.url,
      };
    } catch (error) {
      console.error('Failed to create portal session:', error);
      return { success: false, error: 'Portal session creation failed' };
    }
  }

  /**
   * Upgrade user plan (using new checkout session)
   */
  async upgradePlan(
    planType: 'pro' | 'enterprise',
    billingCycle: 'monthly' | 'yearly' = 'monthly'
  ): Promise<{ success: boolean; checkoutUrl?: string; error?: string }> {
    return await this.createCheckoutSession(planType, billingCycle);
  }

  /**
   * Cancel user subscription (redirect to customer portal)
   */
  async cancelSubscription(): Promise<{ success: boolean; portalUrl?: string; error?: string }> {
    return await this.createPortalSession();
  }

  /**
   * Get billing analytics
   */
  async getBillingAnalytics(days: number = 30): Promise<any> {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) return null;

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.analytics}?days=${days}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.analytics;
    } catch (error) {
      console.error('Failed to get billing analytics:', error);
      return null;
    }
  }

  /**
   * Get plan features for display
   */
  getPlanFeatures(planType: string) {
    return PLAN_CONFIGS[planType] || PLAN_CONFIGS.free;
  }

  /**
   * Check if action is allowed for current plan
   */
  isActionAllowed(planType: string, action: string): boolean {
    const features = this.getPlanFeatures(planType);

    switch (action) {
      case 'export_data':
        return features.exportCapabilities;
      case 'team_collaboration':
        return features.teamCollaboration;
      case 'advanced_analytics':
        return features.advancedAnalytics;
      case 'api_access':
        return features.apiAccess;
      default:
        return true; // Basic actions allowed for all plans
    }
  }

  /**
   * Create development/alpha plan for testing
   */
  async createDevPlan(): Promise<{ success: boolean; plan?: UserPlan; error?: string }> {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) {
        return { success: false, error: 'Authentication required' };
      }

      console.log('🧪 Creating dev plan for testing...');

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.dev.createPlan}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.error || 'Dev plan creation failed' };
      }

      const data = await response.json();
      console.log('✅ Dev plan created successfully with 500 credits');
      const transformedPlan = this.transformApiPlan(data.plan);
      return {
        success: true,
        plan: transformedPlan || undefined,
      };
    } catch (error) {
      console.error('❌ Failed to create dev plan:', error);
      return { success: false, error: 'Dev plan creation failed' };
    }
  }

  /**
   * Check development status and capabilities
   */
  async getDevStatus(): Promise<{ success: boolean; status?: any; error?: string }> {
    try {
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) {
        return { success: false, error: 'Authentication required' };
      }

      const response = await fetch(
        `${this.baseURL}${API_CONFIG.NODE_BACKEND.endpoints.billing.dev.status}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.error || 'Dev status check failed' };
      }

      const data = await response.json();
      return {
        success: true,
        status: data.status,
      };
    } catch (error) {
      console.error('❌ Failed to get dev status:', error);
      return { success: false, error: 'Dev status check failed' };
    }
  }

  /**
   * Check if user is on development plan
   */
  async isDevPlan(): Promise<boolean> {
    try {
      const plan = await this.getUserPlan();
      return plan?.planType === 'dev';
    } catch (error) {
      console.error('Failed to check dev plan status:', error);
      return false;
    }
  }

  /**
   * Clear all cached credit data (for account reset/logout)
   */
  clearCachedData(): void {
    try {
      // Clear in-memory cache
      this.planCache = null;

      const userId = this.getCurrentUserId();
      if (userId) {
        // Clear creator credits cache
        const creatorKey = `creator_credits_${userId}`;
        localStorage.removeItem(creatorKey);
        console.log('🧹 Cleared cached credit data for user:', userId);
      }

      // Clear any other user-specific cache
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (
          key.startsWith('creator_credits_') ||
          key.startsWith('user_plan_') ||
          key.startsWith('credit_cache_')
        ) {
          localStorage.removeItem(key);
        }
      });

      console.log('🧹 Cleared all cached billing data (including memory cache)');
    } catch (error) {
      console.error('Failed to clear cached data:', error);
    }
  }

  /**
   * Reset account data for new/recreated accounts
   */
  async resetAccountData(): Promise<void> {
    try {
      console.log('🔄 Resetting account data for fresh start...');

      // Clear all cached data
      this.clearCachedData();

      // Force refresh of user plan (will create new default plan if needed)
      await this.getUserPlan();

      console.log('✅ Account data reset completed');
    } catch (error) {
      console.error('❌ Failed to reset account data:', error);
    }
  }

  /**
   * Initialize fresh account with proper default credits
   */
  async initializeFreshAccount(): Promise<UserPlan | null> {
    try {
      console.log('🆕 Initializing fresh account with default credits...');

      // Clear any existing cached data first
      this.clearCachedData();

      // Force creation of new default plan
      const authToken = authService.getAuthenticatedUser();
      if (!authToken) {
        console.warn('No auth token for fresh account initialization');
        return null;
      }

      // Check if user is creator
      const isCreator = this.isCreatorUser();

      if (isCreator) {
        // For creators, ensure clean localStorage state with fresh credits
        const userId = this.getCurrentUserId();
        console.log('🎨 Initializing fresh creator account for userId:', userId);

        if (userId) {
          const storageKey = `creator_credits_${userId}`;
          const freshCreditData = {
            used: 0,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            lastUpdated: new Date().toISOString(),
          };
          localStorage.setItem(storageKey, JSON.stringify(freshCreditData));
          console.log('🎨 Set fresh creator credit data:', freshCreditData);
        }

        const plan = this.getCreatorsPlan();
        console.log('🎨 Fresh creator plan created:', plan);
        return plan;
      } else {
        // For regular users, force create new plan
        return await this.createDefaultFreePlan();
      }
    } catch (error) {
      console.error('❌ Failed to initialize fresh account:', error);
      return null;
    }
  }

  /**
   * Debug method to force reset credits (for testing)
   */
  async debugResetCredits(): Promise<{ success: boolean; message: string; plan?: UserPlan }> {
    try {
      console.log('🐛 DEBUG: Force resetting credits...');

      // Clear all cached data
      this.clearCachedData();

      // Force refresh user plan
      const plan = await this.getUserPlan(true);

      if (!plan) {
        // Try to create fresh plan
        const freshPlan = await this.initializeFreshAccount();
        return {
          success: !!freshPlan,
          message: freshPlan ? 'Fresh plan created successfully' : 'Failed to create fresh plan',
          plan: freshPlan || undefined,
        };
      }

      return {
        success: true,
        message: `Credits reset successfully. You now have ${plan.creditsRemaining}/${plan.creditsPerMonth} credits.`,
        plan,
      };
    } catch (error) {
      console.error('❌ DEBUG: Failed to reset credits:', error);
      return {
        success: false,
        message: `Failed to reset credits: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * Debug method to check current credit state
   */
  debugGetCreditState(): { localStorage: any; userPlan: Promise<UserPlan | null> } {
    const userId = this.getCurrentUserId();
    const storageData: any = {};

    if (userId) {
      const creatorKey = `creator_credits_${userId}`;
      const stored = localStorage.getItem(creatorKey);
      storageData[creatorKey] = stored ? JSON.parse(stored) : null;
    }

    // Get all credit-related localStorage items
    Object.keys(localStorage).forEach(key => {
      if (
        key.startsWith('creator_credits_') ||
        key.startsWith('user_plan_') ||
        key.startsWith('credit_cache_')
      ) {
        storageData[key] = localStorage.getItem(key);
      }
    });

    return {
      localStorage: storageData,
      userPlan: this.getUserPlan(true),
    };
  }
}

export const creditService = new CreditService();
export default CreditService;
