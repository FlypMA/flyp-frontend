// 🏢 Listing Prelude Types
// Location: src/features/phase1/business/listing/prelude/types/PreludeTypes.ts
// Purpose: Type definitions for the listing creation prelude flow (business type selection + confirmation)

// Business Type Selection
export type BusinessType =
  | 'catering'
  | 'photography'
  | 'hairstyling'
  | 'chef'
  | 'meals'
  | 'makeup'
  | 'massage'
  | 'nailcare'
  | 'personaltraining'
  | 'wellness'
  | 'cleaning'
  | 'consulting';

export interface BusinessTypeOption {
  id: BusinessType;
  title: string;
  description: string;
  icon: string; // Emoji or SVG path
  popular?: boolean;
}

// Prelude Flow Props
export interface PreludeFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (businessType: BusinessType) => void;
  initialBusinessType?: BusinessType;
}

// Business Type Selection Page Props
export interface BusinessTypeSelectionPageProps {
  onBusinessTypeSelect: (type: BusinessType) => void;
  onBack: () => void;
  selectedBusinessType?: BusinessType;
}

// Business Confirmation Page Props
export interface BusinessConfirmationPageProps {
  selectedBusinessType: BusinessType;
  onBack: () => void;
  onGetStarted: () => void;
}
