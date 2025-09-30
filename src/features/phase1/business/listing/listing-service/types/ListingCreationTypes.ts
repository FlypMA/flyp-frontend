// 🏢 Listing Creation Types - Streamlined Flow
// Location: src/features/phase1/business/listing/listing-service/types/ListingCreationTypes.ts
// Purpose: Type definitions for the listing service (5-step wizard, Steps 4-8)
// Note: Steps 1-3 removed - data comes from business card + valuation

// Import BusinessType from business card feature
import type { BusinessType } from '../../../card/types';

// Basic Information
export interface BasicInfo {
  name: string;
  description: string;
  industry: string;
  location: string;
  isRemote: boolean;
  foundedYear: number;
  teamSize: string;
  website?: string;
  keyHighlights: string[]; // 3-5 key highlights
}

// Financial Overview
export interface FinancialOverview {
  businessType: 'sole-trader' | 'company';
  sharesForSale: number;
  revenue2025: number;
  revenue2024: number;
  revenue2023: number;
  ebitda2025: number;
  ebitda2024: number;
  ebitda2023: number;
  askingPrice: string;
  priceNegotiable: boolean;
  currency: string;
  estimatedValue?: number;
  valuationConfidence?: 'high' | 'medium' | 'low';
  valuationMethodology?: string;
  priceJustification: string; // "Why this price?" explanation
}

// Business Story
export interface BusinessStory {
  whatMakesSpecial: string;
  targetCustomers: string;
  growthOpportunities: string;
  keyAssets: string;
  competitiveAdvantage: string;
}

// Sale Details
export interface SaleDetails {
  reasonForSale: string;
  preferredTimeline: string;
  includedAssets: string[];
  excludedAssets: string[];
  transitionSupport: string;
  staffRetention: string;
}

// Photos and Documents
export interface PhotosDocuments {
  businessPhotos: File[];
  financialDocuments: File[];
  legalDocuments: File[];
  operationalDocuments: File[];
  marketingMaterials: File[];
}

// Privacy and Visibility
export interface PrivacyVisibility {
  anonymousListing: boolean;
  requiresNda: boolean;
  hideFinancials: boolean;
  hideLocation: boolean;
  hideIndustryDetails: boolean;
  teaserDescription: string;
}

// Main listing creation data structure
export interface ListingCreationData {
  businessType: BusinessType;
  basicInfo: BasicInfo;
  financialOverview: FinancialOverview;
  businessStory: BusinessStory;
  saleDetails: SaleDetails;
  photosDocuments: PhotosDocuments;
  privacyVisibility: PrivacyVisibility;
}

// Step configuration
export interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Step component props
export interface StepComponentProps {
  data: Partial<ListingCreationData>;
  onDataChange: (stepData: Partial<ListingCreationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
}

// Prefilled data from business card
export interface BusinessCardData {
  type: BusinessType;
  yearsInBusiness: number;
  foundedYear: number;
  name: string;
  location: string;
  isRemote: boolean;
  industry: string;
  description: string;
  teamSize: string;
  website?: string;
  keyHighlights: string[];
}

// Main modal props (updated for Phase 2)
export interface ListingCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: ListingCreationData) => void;

  // NEW: Prefilled data from business card (required)
  businessCard?: BusinessCardData;

  // NEW: Prefilled data from valuation (optional but recommended)
  valuationData?: {
    businessType: 'sole-trader' | 'company';
    sharesForSale: number;
    revenue2025: number;
    revenue2024: number;
    revenue2023: number;
    ebitda2025: number;
    ebitda2024: number;
    ebitda2023: number;
    estimated_value?: number;
    valuation_confidence?: 'high' | 'medium' | 'low';
    valuation_methodology?: string;
  };

  // DEPRECATED: Use businessCard instead
  businessInfo?: {
    name: string;
    industry: string;
    description: string;
    foundedYear: number;
    teamSize: string;
    location: string;
    isRemote: boolean;
    website?: string;
    revenue?: number;
    status?: 'active' | 'inactive' | 'draft';
  };

  valuationReports?: any[]; // Keep existing valuation reports type
}

// BusinessTypeOption is imported from prelude/types - no need to redefine

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// File upload result
export interface FileUploadResult {
  file: File;
  url?: string;
  error?: string;
  progress?: number;
}
