export interface UserPlan {
  id: string;
  userId: string;
  planType: 'creators' | 'free' | 'pro' | 'enterprise' | 'dev';
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  creditsPerMonth: number;
  creditsUsed: number;
  creditsRemaining: number;
  billingCycle: 'monthly' | 'yearly';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreditUsage {
  id: string;
  userId: string;
  action: 'chat_message' | 'trend_analysis' | 'insight_generation' | 'export_data';
  creditsUsed: number;
  description: string;
  timestamp: string;
  metadata?: {
    messageId?: string;
    analysisType?: string;
    requestId?: string;
  };
}

export interface PlanFeatures {
  creditsPerMonth: number;
  features: string[];
  support: 'community' | 'email' | 'priority' | 'dedicated';
  exportCapabilities: boolean;
  teamCollaboration: boolean;
  advancedAnalytics: boolean;
  apiAccess: boolean;
}

export const PLAN_CONFIGS: Record<string, PlanFeatures> = {
  creators: {
    creditsPerMonth: 100,
    features: [
      'Extended chat credits per month',
      'Unlimited content data collection',
      'Advanced trend insights',
      'Creator dashboard access',
      'Community support',
    ],
    support: 'community',
    exportCapabilities: false,
    teamCollaboration: false,
    advancedAnalytics: false,
    apiAccess: false,
  },
  free: {
    creditsPerMonth: 100,
    features: ['Basic trend insights', 'Community support', 'Extended chat interactions'],
    support: 'community',
    exportCapabilities: false,
    teamCollaboration: false,
    advancedAnalytics: false,
    apiAccess: false,
  },
  dev: {
    creditsPerMonth: 500,
    features: [
      'Extended trend analysis capabilities',
      'Debug information for development',
      'Priority support during alpha phase',
      'Alpha feature testing access',
      'Development tools integration',
      'Full feature access for testing',
    ],
    support: 'priority',
    exportCapabilities: true,
    teamCollaboration: true,
    advancedAnalytics: true,
    apiAccess: true,
  },
  pro: {
    creditsPerMonth: 100,
    features: [
      'Real-time cultural trend monitoring',
      'Advanced analytics dashboard',
      'Priority support & early access',
      'Export capabilities',
      'Team collaboration',
      'Full chat access',
    ],
    support: 'priority',
    exportCapabilities: true,
    teamCollaboration: true,
    advancedAnalytics: true,
    apiAccess: true,
  },
  enterprise: {
    creditsPerMonth: 1000,
    features: [
      'Everything in Pro',
      'Dedicated analyst support',
      'White-label solutions',
      'Unlimited team members',
      'SLA guarantee',
      'Custom integrations',
    ],
    support: 'dedicated',
    exportCapabilities: true,
    teamCollaboration: true,
    advancedAnalytics: true,
    apiAccess: true,
  },
};

export interface CreditCheckResult {
  hasCredits: boolean;
  creditsRemaining: number;
  creditsRequired: number;
  planType: string;
  canUpgrade: boolean;
  upgradeUrl?: string;
}
