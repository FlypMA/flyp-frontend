/**
 * 💳 Payments Service Index
 * Location: src/shared/services/payments/index.ts
 * Purpose: Export all payment-related services and types
 */

// Export payment API service
export * from './api';
export { default as paymentsApi } from './api';

// Re-export types for convenience
export type { CheckoutSession, PaymentMethod, PaymentPlan, Subscription } from './api';
