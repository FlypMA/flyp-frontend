// =============================================================================
// LISTING RELATED TYPES
// =============================================================================
// All business listing related types and interfaces
// =============================================================================

import { ListingStatus, DocumentAccessLevel } from './index';

/**
 * Core Listing entity
 */
export interface Listing {
  id: string;
  organization_id: string;
  created_by: string;

  // Basic information
  sector: string;
  country: string;
  region?: string;
  city?: string;

  // Listing configuration
  status: ListingStatus;
  anonymous: boolean;
  requires_nda: boolean;
  featured: boolean;

  // Financial information
  asking_price?: number;
  currency: string;
  price_negotiable: boolean;

  // Timing
  reason_for_sale?: string;
  preferred_timeline?: string;
  expires_at?: string;
  published_at?: string;

  created_at: string;
  updated_at: string;

  // Relations (populated in API responses)
  translations?: ListingTranslation[];
  financials?: ListingFinancials;
  analytics?: ListingAnalytics;
  organization?: Organization;
  documents?: ListingDocument[];
  images?: ListingImage[];
}

/**
 * Multi-language listing content
 */
export interface ListingTranslation {
  id: string;
  listing_id: string;
  locale: string;
  title: string;
  description: string;
  summary?: string;
  highlights?: string[];
  reason_for_sale_details?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Financial details for listings
 */
export interface ListingFinancials {
  id: string;
  listing_id: string;

  // Revenue information
  revenue_min?: number;
  revenue_max?: number;
  revenue_currency: string;
  revenue_type: 'annual' | 'monthly' | 'quarterly';

  // Profitability
  ebitda_min?: number;
  ebitda_max?: number;
  ebitda_margin?: number;
  net_profit_min?: number;
  net_profit_max?: number;

  // Growth metrics
  revenue_growth_rate?: number;
  profit_growth_rate?: number;
  customer_growth_rate?: number;

  // Business metrics
  financial_year?: number;
  years_in_business?: number;
  employee_count?: number;
  customer_count?: number;

  // Assets and liabilities
  assets_value?: number;
  liabilities_value?: number;
  inventory_value?: number;
  real_estate_value?: number;
  equipment_value?: number;

  // Additional metrics
  working_capital?: number;
  debt_to_equity_ratio?: number;
  current_ratio?: number;
  gross_margin?: number;

  created_at: string;
  updated_at: string;
}

/**
 * Listing performance analytics
 */
export interface ListingAnalytics {
  id: string;
  listing_id: string;

  // View metrics
  views_count: number;
  unique_views_count: number;
  daily_views: number;
  weekly_views: number;
  monthly_views: number;

  // Interaction metrics
  inquiries_count: number;
  saves_count: number;
  shares_count: number;
  document_downloads: number;
  contact_attempts: number;

  // Quality metrics
  completion_score?: number;
  quality_score?: number;
  search_ranking?: number;

  // Geographic data
  view_countries: Record<string, number>;
  view_cities: Record<string, number>;

  // Time-based analytics
  peak_viewing_hours: number[];
  peak_viewing_days: string[];
  average_time_on_page?: number;

  // Conversion metrics
  inquiry_conversion_rate?: number;
  view_to_contact_rate?: number;

  last_activity_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Documents attached to listings
 */
export interface ListingDocument {
  id: string;
  listing_id: string;
  uploaded_by: string;
  filename: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  storage_key: string;
  storage_url?: string;

  // Document classification
  document_type: 'financial' | 'legal' | 'operational' | 'marketing' | 'technical' | 'other';
  category: string;
  description?: string;

  // Access control
  access_level: DocumentAccessLevel;
  password_protected: boolean;
  watermarked: boolean;
  download_count: number;

  // Version control
  version: number;
  parent_document_id?: string;

  // Metadata
  tags: string[];
  language?: string;
  page_count?: number;

  created_at: string;
  updated_at: string;
}

/**
 * Images for listings
 */
export interface ListingImage {
  id: string;
  listing_id: string;
  uploaded_by: string;
  filename: string;
  storage_url: string;
  thumbnail_url: string;

  // Image properties
  width: number;
  height: number;
  file_size: number;
  mime_type: string;

  // Classification
  image_type: 'exterior' | 'interior' | 'product' | 'team' | 'certificate' | 'other';
  is_primary: boolean;
  sort_order: number;

  // Metadata
  alt_text?: string;
  caption?: string;
  location?: string;
  date_taken?: string;

  created_at: string;
}

/**
 * Organization details
 */
export interface Organization {
  id: string;
  name: string;
  business_type?: string;
  registration_number?: string;
  tax_id?: string;

  // Location
  country: string;
  region?: string;
  city?: string;
  address?: string;
  postal_code?: string;

  // Contact information
  website?: string;
  email?: string;
  phone?: string;

  // Business details
  description?: string;
  industry_code?: string;
  legal_structure?: string;
  incorporation_date?: string;

  // Verification and compliance
  verified: boolean;
  verification_date?: string;
  compliance_status?: string;

  // Additional information
  employee_count_range?: string;
  annual_revenue_range?: string;
  business_model?: string;
  target_market?: string;

  contact_info?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// LISTING CREATION AND MANAGEMENT
// =============================================================================

/**
 * Create listing request
 */
export interface CreateListingRequest {
  organization_id: string;
  sector: string;
  country: string;
  region?: string;
  city?: string;
  anonymous?: boolean;
  requires_nda?: boolean;
  asking_price?: number;
  currency?: string;
  price_negotiable?: boolean;
  reason_for_sale?: string;
  preferred_timeline?: string;

  // Multi-language content
  translations: {
    [locale: string]: {
      title: string;
      description: string;
      summary?: string;
      highlights?: string[];
      reason_for_sale_details?: string;
    };
  };

  // Financial information
  financials?: Partial<ListingFinancials>;

  // Initial images
  images?: {
    file: File;
    image_type: string;
    is_primary: boolean;
    alt_text?: string;
    caption?: string;
  }[];
}

/**
 * Update listing request
 */
export interface UpdateListingRequest {
  sector?: string;
  region?: string;
  city?: string;
  anonymous?: boolean;
  requires_nda?: boolean;
  asking_price?: number;
  price_negotiable?: boolean;
  reason_for_sale?: string;
  preferred_timeline?: string;

  // Updated translations
  translations?: {
    [locale: string]: Partial<{
      title: string;
      description: string;
      summary: string;
      highlights: string[];
      reason_for_sale_details: string;
    }>;
  };

  // Updated financials
  financials?: Partial<ListingFinancials>;
}

/**
 * Listing draft data for saving progress
 */
export interface ListingDraft {
  step: number;
  total_steps: number;
  data: Partial<CreateListingRequest>;
  saved_at: string;
  expires_at: string;
}

// =============================================================================
// LISTING SEARCH AND FILTERING
// =============================================================================

/**
 * Comprehensive listing search filters
 */
export interface ListingSearchFilters {
  // Pagination
  page?: number;
  limit?: number;

  // Location filters
  country?: string | string[];
  region?: string | string[];
  city?: string | string[];

  // Business filters
  sector?: string | string[];
  business_type?: string | string[];

  // Financial filters
  revenue_min?: number;
  revenue_max?: number;
  asking_price_min?: number;
  asking_price_max?: number;
  ebitda_min?: number;
  ebitda_max?: number;

  // Business metrics
  years_in_business_min?: number;
  years_in_business_max?: number;
  employee_count_min?: number;
  employee_count_max?: number;

  // Listing properties
  anonymous?: boolean;
  requires_nda?: boolean;
  featured?: boolean;
  price_negotiable?: boolean;

  // Status and timing
  status?: ListingStatus | ListingStatus[];
  published_after?: string;
  published_before?: string;
  expires_after?: string;

  // Text search
  search_query?: string;
  search_fields?: ('title' | 'description' | 'summary' | 'highlights')[];

  // Sorting
  sort_by?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'views' | 'featured';

  // Localization
  locale?: string;
  currency?: string;

  // Advanced filters
  has_financials?: boolean;
  has_documents?: boolean;
  has_images?: boolean;
  verification_required?: boolean;

  // Geographic search
  near_coordinates?: {
    latitude: number;
    longitude: number;
    radius_km: number;
  };
}

/**
 * Search result with metadata
 */
export interface ListingSearchResult {
  listings: Listing[];
  total_count: number;
  page: number;
  per_page: number;
  total_pages: number;
  search_metadata: {
    query: string;
    filters_applied: string[];
    search_time_ms: number;
    featured_count: number;
    average_price?: number;
    price_range?: {
      min: number;
      max: number;
    };
  };
  facets: {
    sectors: { [key: string]: number };
    countries: { [key: string]: number };
    price_ranges: { [key: string]: number };
    business_types: { [key: string]: number };
  };
}

// =============================================================================
// LISTING VALIDATION AND QUALITY
// =============================================================================

/**
 * Listing validation result
 */
export interface ListingValidation {
  is_valid: boolean;
  completion_score: number;
  quality_score: number;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
}

/**
 * Validation error
 */
export interface ValidationError {
  field: string;
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Validation warning
 */
export interface ValidationWarning {
  field: string;
  message: string;
  recommendation: string;
}

/**
 * Validation suggestion
 */
export interface ValidationSuggestion {
  category: string;
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
}

/**
 * Listing quality metrics
 */
export interface ListingQuality {
  overall_score: number;
  completeness_score: number;
  content_quality_score: number;
  image_quality_score: number;
  financial_transparency_score: number;
  response_rate_score: number;
  verification_score: number;

  improvement_areas: string[];
  strengths: string[];
}

// =============================================================================
// LISTING COMPARISON
// =============================================================================

/**
 * Listing comparison data
 */
export interface ListingComparison {
  listings: Listing[];
  comparison_metrics: {
    price_per_revenue?: number[];
    ebitda_multiple?: number[];
    growth_rate?: number[];
    market_position?: string[];
  };
  recommendations: {
    best_value?: string; // listing ID
    highest_growth?: string;
    most_profitable?: string;
    lowest_risk?: string;
  };
}

// =============================================================================
// LISTING EXPORT TYPES
// =============================================================================

export default Listing;
