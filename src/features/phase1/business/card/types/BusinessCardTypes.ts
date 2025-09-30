// 🏢 Business Card Types
// Location: src/features/phase1/business/card/types/BusinessCardTypes.ts
// Purpose: Type definitions for business card creation feature

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

export interface BusinessCard {
  // Step 1: Business Type
  type: BusinessType;

  // Step 2: Years in Business
  yearsInBusiness: number;
  foundedYear: number;

  // Step 3: Basic Information
  name: string;
  location: string;
  isRemote: boolean;

  // Step 4: Industry & Details
  industry: string;
  description: string;
  teamSize: string;
  website?: string;
  keyHighlights: string[];

  // Metadata
  status: 'draft' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessCardFormData extends Partial<BusinessCard> {}

export interface BusinessCardFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (card: BusinessCard) => void;
  initialData?: Partial<BusinessCard>;
}

export interface BusinessCardStepProps {
  data: BusinessCardFormData;
  onDataChange: (data: Partial<BusinessCardFormData>) => void;
  onNext?: () => void;
  onBack?: () => void;
}
