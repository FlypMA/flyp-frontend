/**
 * 💳 Payments API Service - Compatibility Layer
 * 
 * Re-exports payment-related API functionality from the shared services
 * for backward compatibility with existing import paths.
 */

// For now, create a basic payments API interface
// This can be expanded when payment functionality is implemented

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// Placeholder API functions - to be implemented
export const paymentsApi = {
  getPlans: async (): Promise<PaymentPlan[]> => {
    // TODO: Implement actual API call
    return [];
  },
  
  subscribe: async (planId: string): Promise<Subscription> => {
    // TODO: Implement actual API call
    throw new Error('Not implemented');
  },
  
  getSubscription: async (): Promise<Subscription | null> => {
    // TODO: Implement actual API call
    return null;
  },
  
  cancelSubscription: async (): Promise<void> => {
    // TODO: Implement actual API call
  },
  
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    // TODO: Implement actual API call
    return [];
  },
};

// Individual function exports for compatibility
export const createCheckoutSessionAPI = async (planId: string): Promise<{ sessionId: string; url: string }> => {
  // TODO: Implement actual Stripe checkout session creation
  throw new Error('createCheckoutSessionAPI not implemented');
};

export default paymentsApi;
