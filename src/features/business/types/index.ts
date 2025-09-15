// 🏢 Business Dashboard Types - MVP Version
// Location: src/features/business-dashboard/types/index.ts
// Purpose: Type definitions for business dashboard features

// Business Metrics Types
export interface BusinessMetrics {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  transactions: {
    total: number;
    pending: number;
    completed: number;
  };
  inquiries: {
    total: number;
    responded: number;
    responseRate: number;
  };
  listings: {
    active: number;
    views: number;
    favorites: number;
  };
}

export interface MetricsFilters {
  timeframe: 'week' | 'month' | 'quarter' | 'year';
  dateRange: {
    start: Date;
    end: Date;
  };
}

// Business Valuation Types
export interface ValuationInputs {
  // Financial metrics
  revenue: number;
  ebitda: number;
  netIncome: number;
  totalAssets: number;
  totalDebt: number;

  // Business metrics
  industryGrowthRate: number;
  marketPosition: 'leader' | 'competitor' | 'follower';

  // Risk factors
  customerConcentration: number; // 0-100%
  keyPersonDependency: 'high' | 'medium' | 'low';
  marketRisk: 'high' | 'medium' | 'low';
}

export interface ValuationResults {
  // Multiple valuations
  dcfValuation: number;
  marketMultipleValuation: number;
  assetBasedValuation: number;

  // Range and final estimate
  valuationRange: {
    min: number;
    max: number;
    median: number;
  };

  // Key metrics
  ebitdaMultiple: number;
  revenueMultiple: number;

  // Risk adjustments
  riskAdjustedValue: number;
  confidenceLevel: 'high' | 'medium' | 'low';
}

// Performance Data Types
export interface PerformanceData {
  totalViews: number;
  totalInquiries: number;
  conversionRate: number;
  avgTimeOnListing: string;
  uniqueVisitors: number;
  returnVisitors: number;
  topCountries: { country: string; views: number }[];
  weeklyViews: number[];
  weeklyInquiries: number[];
}

// Listing Types
export interface Listing {
  id: string;
  title: string;
  status: 'draft' | 'under_review' | 'published' | 'archived';
  views: number;
  inquiries: number;
  created_at: string;
  asking_price?: number;
  currency?: string;
  sector: string;
  country: string;
}

// Business Valuation Report Types
export interface ValuationReport {
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

// Dashboard Toolbar Types
export interface DashboardToolbarProps {
  onRefresh?: () => void;
  onDownload?: () => void;
  onFullScreen?: () => void;
  isGenerating?: boolean;
  user?: any;
  reportName?: string;
  reportId?: string;
  activeTab?: 'preview' | 'source' | 'info';
  onTabChange?: (tab: 'preview' | 'source' | 'info') => void;
  onReportNameChange?: (name: string) => void;
}

// Dashboard Stats Types
export interface DashboardStatsProps {
  performanceData: PerformanceData;
  isLoading?: boolean;
}

// Valuation Report Card Types
export interface ValuationReportCardProps {
  report: ValuationReport;
  onView?: (reportId: string) => void;
  onDownload?: (reportId: string) => void;
  onShare?: (reportId: string) => void;
  onEdit?: (reportId: string) => void;
}
