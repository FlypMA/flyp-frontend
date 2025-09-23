// Phase 1 - MVP Launch Features
// This file exports all Phase 1 features for the MVP launch

// Authentication System
export * from './authentication';

// Business Management
export * from './business';

// Listings System
export * from './listings';

// Shared Components and Utilities
export * from './shared';

// Application Pages
export * from './pages';

// Re-export commonly used components for convenience
export { default as AuthModals } from './authentication/components/AuthModals';
export { default as LoginModal } from './authentication/components/LoginModal';
export { default as SignupModal } from './authentication/components/SignupModal';

export { default as DocumentVault } from './pages/business/data-room/DocumentVault';
export { default as BusinessOverview } from './pages/business/overview/BusinessOverview';
export { default as ValuationTool } from './pages/business/reports/ValuationTool';

export { default as ListingDetails } from './pages/listings/ListingDetails';
export { default as ListingSearch } from './pages/listings/ListingSearch';
export { default as PrivateListingDetails } from './pages/listings/PrivateListingDetails';

export { default as Home } from './pages/landingPages/home/home';
export { default as ValuationGuide } from './pages/landingPages/resources/ValuationGuide';
export { default as Sellers } from './pages/landingPages/sellers/sellers';

// Shared Components
export { Button } from './shared/components/buttons';
export {
  CustomDropdown,
  CustomInputField,
  CustomNumberInputField,
} from './shared/components/forms';
export { CenteredModal } from './shared/components/modals/foundations/CenteredModal';
export { default as InquiryModal } from './shared/components/modals/InquiryModal';
export { default as NDAModal } from './shared/components/modals/NDAModal';
export { default as ValuationModal } from './shared/components/modals/ValuationModal';

// Hooks
export { useAuthModal } from './authentication/hooks/useAuthModal';
export { useBusinessMetrics } from './business/hooks/useBusinessMetrics';
export { useBusinessValuation } from './business/hooks/useBusinessValuation';

// Types
export type { BusinessInfo } from './business/types';
export type { ListingData } from './listings/types';
export type { User } from './shared/types';
