export type PlanType = 'creators' | 'free' | 'pro' | 'enterprise' | 'dev';
export type BillingCycle = 'monthly' | 'yearly';
export type PlanStatus = 'active' | 'cancelled' | 'past_due' | 'trialing';
export type SupportLevel = 'community' | 'email' | 'priority' | 'dedicated';

export interface UserPlan {
  id: string;
  userId: string;
  planType: PlanType;
  status: PlanStatus;
  creditsPerMonth: number;
  creditsUsed: number;
  creditsRemaining: number;
  billingCycle: BillingCycle;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanFeatures {
  creditsPerMonth: number;
  features: string[];
  support: SupportLevel;
  exportCapabilities: boolean;
  teamCollaboration: boolean;
  advancedAnalytics: boolean;
  apiAccess: boolean;
}

export interface CreditCheckResult {
  hasCredits: boolean;
  creditsRemaining: number;
  creditsRequired: number;
  planType: string;
  canUpgrade: boolean;
  upgradeUrl?: string;
}

export interface CreateCheckoutSessionParams {
  priceId: string;
  customerInfo: {
    email: string;
    name: string;
  };
  successUrl: string;
  cancelUrl: string;
  trialPeriodDays?: number;
}

export interface CheckoutResult {
  success: boolean;
  error?: string;
  sessionId?: string;
  url?: string;
}
