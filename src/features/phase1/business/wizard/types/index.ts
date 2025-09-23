// 🏢 Listing Wizard Types - Modular Architecture
// Location: src/features/phase1/business/wizard/types/index.ts
// Purpose: Shared type definitions for the listing wizard feature

import React from 'react';

// Aligned with BusinessProfileModal structure
export interface BasicInfo {
  name: string; // Changed from 'title' to 'name' to match BusinessProfileModal
  description: string;
  industry: string;
  location: string; // Combined location fields to match BusinessProfileModal
  isRemote: boolean; // Added to match BusinessProfileModal
  foundedYear: number; // Changed from string to number to match BusinessProfileModal
  teamSize: string; // Changed from 'employee_count' to 'teamSize' to match BusinessProfileModal
  website?: string; // Made optional to match BusinessProfileModal
  business_model?: string; // Made optional, not in BusinessProfileModal
}

// Aligned with ValuationModal structure
export interface FinancialInfo {
  // Business structure (from ValuationModal)
  businessType: 'sole-trader' | 'company';
  sharesForSale: number;

  // Financial data (from ValuationModal)
  revenue2025: number;
  revenue2024: number;
  revenue2023: number;
  ebitda2025: number;
  ebitda2024: number;
  ebitda2023: number;

  // Listing-specific financials
  asking_price: string;
  price_negotiable: boolean;
  currency: string;

  // Calculated valuation data (populated from valuation)
  estimated_value?: number;
  valuation_confidence?: 'high' | 'medium' | 'low';
  valuation_methodology?: string;

  // Legacy fields (kept for backward compatibility)
  annual_revenue?: string;
  revenue_trend?: string;
  ebitda_margin?: string;
  revenue_breakdown?: {
    product_sales: string;
    service_revenue: string;
    recurring_revenue: string;
    other_revenue: string;
  };
}

export interface BusinessDetails {
  key_products: string;
  target_market: string;
  competitive_advantage: string;
  growth_opportunities: string;
  key_assets: string;
  operational_highlights: string;
}

export interface SaleDetails {
  reason_for_sale: string;
  preferred_timeline: string;
  included_assets: string[];
  excluded_assets: string[];
  transition_support: string;
  staff_retention: string;
}

export interface PrivacySettings {
  anonymous_listing: boolean;
  requires_nda: boolean;
  hide_financials: boolean;
  hide_location: boolean;
  hide_industry_details: boolean;
  teaser_description: string;
}

// Aligned with DocumentVault structure
export interface Documents {
  // Core document categories (from DocumentVault)
  financial: File | null; // Financial statements, tax returns, etc.
  legal: File | null; // Legal documents, contracts, etc.
  operations: File | null; // Operational documents, procedures, etc.
  marketing: File | null; // Marketing materials, brand assets, etc.
  other: File | null; // Other supporting documents

  // Legacy fields (kept for backward compatibility)
  business_overview?: File | null;
  financial_statements?: File | null;
  tax_returns?: File | null;
  legal_documents?: File | null;
  operational_docs?: File | null;
  marketing_materials?: File | null;
}

// Valuation Report Type (aligned with business types)
export interface WizardValuationReport {
  id: string;
  estimated_value: number;
  currency: string;
  valuation_date: string;
  confidence_level: 'high' | 'medium' | 'low';
  methodology: string;
  status: 'completed' | 'in_progress' | 'draft' | 'expired';
  last_updated?: string;
  revenue_multiple?: number;
  ebitda_multiple?: number;
  industry_average?: number;
  market_conditions?: string;
  key_drivers?: string[];
  risk_factors?: string[];
  next_review_date?: string;
}

// Main wizard data structure
export interface ListingWizardData {
  basicInfo: BasicInfo;
  financialInfo: FinancialInfo;
  businessDetails: BusinessDetails;
  saleDetails: SaleDetails;
  privacySettings: PrivacySettings;
  documents: Documents;
}

// Wizard step configuration
export interface WizardStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  isCompleted: boolean;
  isActive: boolean;
}

// Step component props
export interface StepComponentProps {
  data: Partial<ListingWizardData>;
  onDataChange: (stepData: Partial<ListingWizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
}

// Main wizard props
export interface ListingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: ListingWizardData) => void;
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
  valuationReports?: WizardValuationReport[];
}

// Step indicator props
export interface StepIndicatorProps {
  step: number;
  title: string;
  completed: boolean;
  active: boolean;
}

// Wizard navigation props
export interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
  canProceed?: boolean;
}
