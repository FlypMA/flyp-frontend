// 🏢 Business Card Prelude Types
// Location: src/features/phase1/business/card/prelude/types/PreludeTypes.ts
// Purpose: Type definitions for business card prelude (selection + confirmation)

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
