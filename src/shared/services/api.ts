// import stripeService, { CreateCheckoutSessionParams } from './stripeService'; // TODO: Fix import

// API endpoint for creating checkout sessions
export const createCheckoutSessionAPI = async (params: CreateCheckoutSessionParams) => {
  try {
    const result = await stripeService.createCheckoutSession(params);
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create checkout session',
    };
  }
};

// API endpoint for managing billing portal
export const createPortalSessionAPI = async (customerId: string, returnUrl: string) => {
  try {
    const portalUrl = await stripeService.createPortalSession(customerId, returnUrl);
    if (portalUrl) {
      return { url: portalUrl };
    } else {
      return { error: 'Failed to create portal session' };
    }
  } catch (error: any) {
    return { error: error.message || 'Failed to create portal session' };
  }
};

// API endpoint for updating subscriptions
export const updateSubscriptionAPI = async (subscriptionId: string, newPriceId: string) => {
  try {
    const subscription = await stripeService.updateSubscription(subscriptionId, newPriceId);
    if (subscription) {
      return { subscription };
    } else {
      return { error: 'Failed to update subscription' };
    }
  } catch (error: any) {
    return { error: error.message || 'Failed to update subscription' };
  }
};

// API endpoint for canceling subscriptions
export const cancelSubscriptionAPI = async (subscriptionId: string) => {
  try {
    const subscription = await stripeService.cancelSubscription(subscriptionId);
    if (subscription) {
      return { subscription };
    } else {
      return { error: 'Failed to cancel subscription' };
    }
  } catch (error: any) {
    return { error: error.message || 'Failed to cancel subscription' };
  }
};
