// 🚀 Account Onboarding Pages - MVP Version
// Location: src/app/pages/account/onboarding/index.ts
// Purpose: Export all onboarding related pages

// Buyer Onboarding
export { default as BuyerOnboarding } from './buyer/BuyerOnboarding';

// Seller Onboarding
export { default as SellerOnboarding } from './seller/SellerOnboarding';

// Signup Complete
export { default as SignUpComplete } from './signUpComplete/SignUpComplete';

// Default export for backward compatibility
export { default } from './signUpComplete/SignUpComplete';
