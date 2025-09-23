// 📋 Listings Types - Phase1
// Location: src/features/phase1/listings/types/index.ts
// Purpose: Type definitions for listing management features

// Basic Listing Information
export interface BasicInfo {
  title: string;
  description: string;
  industry: string;
  business_model: string;
  location_country: string;
  location_city: string;
  website: string;
  founded_year: string;
  employee_count: string;
}

// Financial Information
export interface FinancialInfo {
  annual_revenue: string;
  revenue_trend: string;
  ebitda_margin: string;
  asking_price: string;
  price_negotiable: boolean;
  currency: string;
  revenue_breakdown: {
    product_sales: string;
    service_revenue: string;
    recurring_revenue: string;
    other_revenue: string;
  };
}

// Sale Details
export interface SaleDetails {
  reason_for_sale: string;
  timeline: string;
  key_assets: string[];
  growth_opportunities: string[];
  challenges: string[];
  support_offered: string[];
}

// Privacy Settings
export interface PrivacySettings {
  anonymous_listing: boolean;
  requires_nda: boolean;
  hide_financials: boolean;
  hide_location: boolean;
  hide_industry_details: boolean;
  teaser_description: string;
}

// Document Information
export interface DocumentInfo {
  business_plan: File | null;
  financial_statements: File | null;
  tax_returns: File | null;
  legal_documents: File | null;
  marketing_materials: File | null;
  other_documents: File[];
}

// Complete Listing Data
export interface ListingData {
  basicInfo: BasicInfo;
  financialInfo: FinancialInfo;
  saleDetails: SaleDetails;
  privacySettings: PrivacySettings;
  documentInfo: DocumentInfo;
}

// Listing Wizard Modal Props
export interface ListingWizardModalProps {
  onComplete?: () => void;
}
