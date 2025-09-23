// 📊 Dashboard Types - Business Feature
// Location: src/features/phase1/business/dashboard/types/index.ts
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

// Business Info Types
export interface BusinessInfo {
  name: string;
  industry: string;
  description: string;
  foundedYear: number;
  teamSize: string;
  revenue: number;
  location: string;
  isRemote: boolean;
  status?: 'active' | 'inactive' | 'draft';
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
