// 🏢 Business Card Prelude Types
// Location: src/features/phase1/business/card/prelude/types/PreludeTypes.ts
// Purpose: Type definitions for business card prelude (selection + confirmation)

export type BusinessType =
  // Food & Beverage Services
  | 'catering'
  | 'chef'
  | 'meals'
  | 'restaurant'
  // Beauty & Wellness Services
  | 'hairstyling'
  | 'makeup'
  | 'massage'
  | 'nailcare'
  | 'wellness'
  // Fitness & Health
  | 'personaltraining'
  | 'gym'
  | 'healthcare'
  // Creative & Media
  | 'photography'
  | 'videography'
  | 'design'
  | 'marketing'
  // Tech & Digital
  | 'saas'
  | 'software'
  | 'webdev'
  | 'itsupport'
  // E-commerce & Retail
  | 'ecommerce'
  | 'retail'
  | 'subscription'
  // Home & Property Services
  | 'cleaning'
  | 'realestate'
  | 'construction'
  | 'landscaping'
  // Professional Services
  | 'consulting'
  | 'legal'
  | 'accounting'
  | 'hr'
  // Education & Training
  | 'education'
  | 'coaching'
  // Transportation & Logistics
  | 'logistics'
  | 'automotive'
  // Events & Entertainment
  | 'events'
  | 'entertainment';

export interface BusinessTypeOption {
  id: BusinessType;
  title: string;
  description: string;
  icon: string;
}

export interface BusinessTypeSelectionPageProps {
  onBusinessTypeSelect: (type: BusinessType) => void;
  selectedBusinessType?: BusinessType;
}

export interface BusinessConfirmationPageProps {
  selectedBusinessType: BusinessType;
  onGetStarted: () => void;
}
