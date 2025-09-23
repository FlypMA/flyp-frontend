// 💰 Valuation Types - Business Feature
// Location: src/features/phase1/business/valuation/types/index.ts
// Purpose: Type definitions for valuation features

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

// Valuation Dashboard Types
export interface ValuationDashboardProps {
  reports: ValuationReport[];
  isLoading?: boolean;
  onGenerateReport?: () => void;
  onViewReport?: (reportId: string) => void;
  onDeleteReport?: (reportId: string) => void;
}

export interface ValuationReportCardProps {
  report: ValuationReport;
  onView?: (reportId: string) => void;
  onDownload?: (reportId: string) => void;
  onShare?: (reportId: string) => void;
  onEdit?: (reportId: string) => void;
}

// Valuation Hook Types
export interface UseBusinessValuationReturn {
  reports: ValuationReport[];
  isLoading: boolean;
  error: string | null;
  generateReport: (inputs: ValuationInputs) => Promise<void>;
  updateReport: (id: string, updates: Partial<ValuationReport>) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
  refreshReports: () => Promise<void>;
}
