// 💳 Billing Plans Types
// Location: src/types/billing/plans.ts
// Purpose: Type definitions for billing and subscription plans

export interface UserPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  limits: PlanLimits;
  status: 'active' | 'inactive' | 'cancelled';
  creditsRemaining: number;
  creditsTotal: number;
  billingCycle: 'monthly' | 'yearly';
}

export interface PlanLimits {
  maxListings: number;
  maxInquiries: number;
  maxDocuments: number;
  maxUsers: number;
}

export interface CreditUsage {
  action: string;
  credits: number;
  timestamp: Date;
  userId: string;
}

export interface CreditCheckResult {
  allowed: boolean;
  remainingCredits: number;
  message?: string;
}

export const PLAN_CONFIGS = {
  free: {
    maxListings: 1,
    maxInquiries: 10,
    maxDocuments: 5,
    price: 0,
  },
  basic: {
    maxListings: 5,
    maxInquiries: 50,
    maxDocuments: 25,
    price: 29,
  },
  pro: {
    maxListings: 25,
    maxInquiries: 200,
    maxDocuments: 100,
    price: 99,
  },
} as const;
