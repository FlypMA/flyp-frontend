/**
 * 🏢 Business Domain - Modal Components
 * Location: src/shared/components/modals/domains/business/index.ts
 * Purpose: Export all business-related modal components
 */

// Onboarding modals
export { default as BuyerOnboardingModal } from './onboarding/BuyerOnboardingModal';
export { default as SellerOnboardingModal } from './onboarding/SellerOnboardingModal';

// Management modals
export { default as BusinessProfileModal } from './management/BusinessProfileModal';
export { default as ListingManagementModal } from './management/ListingManagementModal';

// Report modals
export { default as AnalyticsModal } from './reports/AnalyticsModal';
export { default as ValuationReportModal } from './reports/ValuationReportModal';

// Legacy compatibility exports
export { default as BusinessOnboardingModal } from './onboarding/SellerOnboardingModal';
