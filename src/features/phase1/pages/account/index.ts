/**
 * Account Pages Export
 *
 * Centralized exports for all account-related pages
 */

// Onboarding pages
export { default as BuyerOnboarding } from './onboarding/buyer/BuyerOnboarding';
export { default as SellerOnboarding } from './onboarding/seller/SellerOnboarding';
export { default as SignUpComplete } from './onboarding/signUpComplete/SignUpComplete';

// Password reset pages
export { default as ForgotPasswordPage } from './passwordReset/ForgotPasswordPage';
export { default as ResetPasswordPage } from './passwordReset/ResetPasswordPage';

// User management pages
export { default as UserBilling } from './users/UserBilling';
export { default as UserNotifications } from './users/UserNotifications';
export { default as UserProfile } from './users/UserProfile';
export { default as UserSettings } from './users/UserSettings';
