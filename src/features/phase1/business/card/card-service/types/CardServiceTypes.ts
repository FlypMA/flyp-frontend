// 🏢 Business Card Service Types
// Location: src/features/phase1/business/card/card-service/types/CardServiceTypes.ts
// Purpose: Type definitions for 3-step business card creation service

import { BusinessType } from '../../prelude/types/PreludeTypes';

export interface BusinessCard {
  // From Prelude
  type: BusinessType;

  // Step 1: Years in Business
  yearsInBusiness: number;
  foundedYear: number;

  // Step 2: Business Information
  name: string;
  location: string;
  isRemote: boolean;
  description: string;
  teamSize: string;

  // Metadata
  status: 'draft' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}

export interface CardStepProps {
  data: Partial<BusinessCard>;
  onDataChange: (stepData: Partial<BusinessCard>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
}

export interface CardServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (card: BusinessCard) => void;
  businessType: BusinessType; // Passed from prelude
  initialData?: BusinessCard; // For editing existing business card
  isEditing?: boolean; // Flag to indicate editing mode
}
