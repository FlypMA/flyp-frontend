// 🏢 Business Type Definitions - TypeScript safety for business domain

import type { BusinessId, ListingId, UserId, MoneyAmount } from './utility.types';

/**
 * Business types and categories
 */
export type BusinessType =
  | 'saas'
  | 'ecommerce'
  | 'marketplace'
  | 'service'
  | 'manufacturing'
  | 'retail'
  | 'restaurant'
  | 'consulting'
  | 'agency'
  | 'other';

export type BusinessStatus = 'active' | 'pending' | 'sold' | 'inactive';

export type IndustryCategory =
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'real_estate'
  | 'food_beverage'
  | 'automotive'
  | 'entertainment'
  | 'other';

/**
 * Core Business interface
 */
export interface Business {
  id: BusinessId;
  ownerId: UserId;
  name: string;
  description: string;
  type: BusinessType;
  industry: IndustryCategory;
  status: BusinessStatus;

  // Location
  location: {
    country: string;
    state?: string;
    city: string;
    address?: string;
  };

  // Financial information
  financials: BusinessFinancials;

  // Listing information (if listed for sale)
  listing?: BusinessListing;

  // Assets and documents
  assets: BusinessAsset[];
  documents: BusinessDocument[];

  // Metadata
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
}

/**
 * Business financial information
 */
export interface BusinessFinancials {
  revenue: {
    annual: MoneyAmount;
    monthly: MoneyAmount;
    growth: number; // percentage
  };

  profit: {
    annual: MoneyAmount;
    monthly: MoneyAmount;
    margin: number; // percentage
  };

  expenses: {
    monthly: MoneyAmount;
    breakdown: Record<string, MoneyAmount>;
  };

  // Valuation
  valuation?: BusinessValuation;

  // Historical data (last 12 months)
  historicalData: FinancialDataPoint[];
}

export interface FinancialDataPoint {
  month: string; // YYYY-MM
  revenue: number;
  profit: number;
  expenses: number;
}

/**
 * Business valuation
 */
export interface BusinessValuation {
  id: string;
  businessId: BusinessId;
  method: 'dcf' | 'multiple' | 'asset' | 'market';
  value: MoneyAmount;
  confidence: 'low' | 'medium' | 'high';
  factors: ValuationFactor[];
  createdAt: string;
  validUntil: string;
}

export interface ValuationFactor {
  name: string;
  weight: number;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

/**
 * Business listing (when business is for sale)
 */
export interface BusinessListing {
  id: ListingId;
  businessId: BusinessId;
  title: string;
  summary: string;
  askingPrice: MoneyAmount;
  priceRange: {
    min: MoneyAmount;
    max: MoneyAmount;
  };

  // Listing details
  highlights: string[];
  reasons: string;
  included: string[];
  excluded: string[];

  // Terms
  terms: {
    financing: boolean;
    earnout: boolean;
    nonCompete: boolean;
    training: boolean;
    transitionPeriod: string;
  };

  // Visibility
  isPublic: boolean;
  isFeatured: boolean;

  // Stats
  views: number;
  inquiries: number;
  offers: number;

  // Dates
  listedAt: string;
  updatedAt: string;
  expiresAt?: string;
}

/**
 * Business assets
 */
export type AssetType =
  | 'domain'
  | 'trademark'
  | 'patent'
  | 'inventory'
  | 'equipment'
  | 'software'
  | 'database'
  | 'other';

export interface BusinessAsset {
  id: string;
  type: AssetType;
  name: string;
  description?: string;
  value?: MoneyAmount;
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
  includedInSale: boolean;
}

/**
 * Business documents
 */
export type DocumentType =
  | 'financial_statement'
  | 'tax_return'
  | 'contract'
  | 'lease'
  | 'license'
  | 'insurance'
  | 'legal'
  | 'other';

export interface BusinessDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  size: number;
  uploadedAt: string;
  isConfidential: boolean;
  sharedWith: UserId[];
}

/**
 * Business metrics
 */
export interface BusinessMetrics {
  businessId: BusinessId;
  period: string; // YYYY-MM

  // Revenue metrics
  revenue: number;
  recurringRevenue: number;
  oneTimeRevenue: number;

  // Customer metrics
  customers: number;
  newCustomers: number;
  churnedCustomers: number;
  averageOrderValue: number;
  customerLifetimeValue: number;

  // Operational metrics
  employees: number;
  operatingHours: number;
  capacity: number;
  utilization: number;

  // Digital metrics (for online businesses)
  websiteVisitors?: number;
  conversionRate?: number;
  averageSessionDuration?: number;
  bounceRate?: number;
}
