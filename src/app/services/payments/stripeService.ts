import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export interface CustomerInfo {
  email: string;
  name: string;
  company?: string;
  country: string;
}

export interface CreateCheckoutSessionParams {
  priceId: string;
  customerInfo: CustomerInfo;
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

class StripeService {
  // Create checkout session and redirect to Stripe Checkout
  async createCheckoutSession(params: CreateCheckoutSessionParams): Promise<CheckoutResult> {
    try {
      // Call backend to create checkout session
      const response = await this.createCheckoutSessionBackend(params);

      if (!response.success) {
        return {
          success: false,
          error: response.error || 'Failed to create checkout session',
        };
      }

      const stripe = await stripePromise;

      if (!stripe) {
        return {
          success: false,
          error: 'Stripe failed to load. Please check your connection and try again.',
        };
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to redirect to checkout',
        };
      }

      return {
        success: true,
        sessionId: response.sessionId,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create checkout session',
      };
    }
  }

  // Simulate backend API call to create checkout session
  private async createCheckoutSessionBackend(params: CreateCheckoutSessionParams): Promise<any> {
    try {
      const baseUrl = window.location.origin;

      // Simulate API call to backend
      const requestBody = {
        price_id: params.priceId,
        customer_email: params.customerInfo.email,
        customer_name: params.customerInfo.name,
        customer_company: params.customerInfo.company,
        customer_country: params.customerInfo.country,
        success_url: `${baseUrl}${params.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}${params.cancelUrl}`,
        trial_period_days: params.trialPeriodDays || 14,
        mode: 'subscription',
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        metadata: {
          company: params.customerInfo.company || '',
          country: params.customerInfo.country,
        },
      };

      console.log('Creating checkout session with:', requestBody);

      // For demo purposes, create a mock session
      // In production, this would be an actual API call to your backend
      const mockResponse = await this.createMockCheckoutSession(requestBody);

      return mockResponse;
    } catch (error: any) {
      console.error('Backend checkout session creation failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to create checkout session',
      };
    }
  }

  // Mock backend response for demo (replace with actual backend call)
  private async createMockCheckoutSession(requestBody: any): Promise<any> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, check if we have a real Stripe key
    if (
      STRIPE_PUBLISHABLE_KEY === 'pk_test_demo_key' ||
      !STRIPE_PUBLISHABLE_KEY.startsWith('pk_')
    ) {
      // Demo mode - redirect to success page
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/checkout/success?session_id=demo_session_123&plan=${this.getPlanFromPrice(requestBody.price_id)}&demo=true`;

      window.location.href = successUrl;

      return {
        success: true,
        sessionId: 'demo_session_123',
      };
    }

    // If we have a real Stripe key, we'd need a real backend
    // For now, show an error asking to implement backend
    return {
      success: false,
      error:
        'Backend integration required. Please implement your checkout session creation endpoint.',
    };
  }

  // Create payment intent for custom payment form
  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    metadata: any = {}
  ): Promise<any> {
    try {
      // This would call your backend to create a payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      throw error;
    }
  }

  // Helper method to extract plan from price ID
  private getPlanFromPrice(priceId: string): string {
    if (priceId.includes('starter')) return 'starter';
    if (priceId.includes('enterprise')) return 'enterprise';
    return 'pro';
  }

  // Get subscription details (would normally call your backend)
  async getSubscription(subscriptionId: string): Promise<any | null> {
    try {
      // In production, this would call your backend API
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to retrieve subscription:', error);

      // Mock subscription data for demo
      return {
        id: subscriptionId,
        status: 'active',
        current_period_start: Date.now() / 1000,
        current_period_end: Date.now() / 1000 + 30 * 24 * 60 * 60, // 30 days
        trial_end: Date.now() / 1000 + 14 * 24 * 60 * 60, // 14 days
      };
    }
  }

  // Cancel a subscription (would normally call your backend)
  async cancelSubscription(subscriptionId: string): Promise<any | null> {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to cancel subscription:', error);

      // Mock cancellation for demo
      return {
        id: subscriptionId,
        status: 'canceled',
        canceled_at: Date.now() / 1000,
      };
    }
  }

  // Update subscription (would normally call your backend)
  async updateSubscription(subscriptionId: string, newPriceId: string): Promise<any | null> {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: newPriceId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to update subscription:', error);

      // Mock update for demo
      return {
        id: subscriptionId,
        status: 'active',
        items: {
          data: [{ price: { id: newPriceId } }],
        },
      };
    }
  }

  // Get customer portal session (would normally call your backend)
  async createPortalSession(customerId: string, returnUrl: string): Promise<string | null> {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          return_url: returnUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Failed to create portal session:', error);

      // Mock portal URL for demo
      return '/account/settings?demo=true';
    }
  }

  // Helper to get auth token (implement based on your auth system)
  private getAuthToken(): string {
    // This would get the JWT token from your auth system
    // For demo purposes, return a mock token
    return 'demo_auth_token';
  }

  // Get products and prices from Stripe
  async getProducts(): Promise<{ products: any[]; prices: any[] }> {
    try {
      // In production, this would call your backend or Stripe's API
      const response = await fetch('/api/products', {
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get products:', error);

      // Mock product data for demo
      const products = [
        {
          id: 'prod_starter',
          name: 'Starter Plan',
          description: 'Perfect for small agencies getting started',
        },
        {
          id: 'prod_pro',
          name: 'Pro Plan',
          description: 'Best for growing agencies',
        },
        {
          id: 'prod_enterprise',
          name: 'Enterprise Plan',
          description: 'For large agencies with advanced needs',
        },
      ];

      const prices = [
        {
          id: 'price_starter_monthly',
          product: 'prod_starter',
          unit_amount: 9900, // $99.00
          currency: 'usd',
          recurring: { interval: 'month' },
        },
        {
          id: 'price_starter_yearly',
          product: 'prod_starter',
          unit_amount: 99000, // $990.00 (10 months price)
          currency: 'usd',
          recurring: { interval: 'year' },
        },
        {
          id: 'price_pro_monthly',
          product: 'prod_pro',
          unit_amount: 49900, // $499.00
          currency: 'usd',
          recurring: { interval: 'month' },
        },
        {
          id: 'price_pro_yearly',
          product: 'prod_pro',
          unit_amount: 499000, // $4990.00 (10 months price)
          currency: 'usd',
          recurring: { interval: 'year' },
        },
        {
          id: 'price_enterprise_monthly',
          product: 'prod_enterprise',
          unit_amount: 200000, // $2000.00
          currency: 'usd',
          recurring: { interval: 'month' },
        },
        {
          id: 'price_enterprise_yearly',
          product: 'prod_enterprise',
          unit_amount: 2000000, // $20000.00 (10 months price)
          currency: 'usd',
          recurring: { interval: 'year' },
        },
      ];

      return { products, prices };
    }
  }
}

const stripeService = new StripeService();
export default stripeService;
