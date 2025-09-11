// 🏢 Business Dashboard Hooks - Barrel Exports
// Location: src/features/business-dashboard/hooks/index.ts
// Purpose: Centralized exports for business dashboard hooks

export { useBusinessMetrics } from './useBusinessMetrics';
export { useBusinessValuation } from './useBusinessValuation';

// Re-export types if needed
export type {
  BusinessMetrics,
  MetricsFilters,
  UseBusinessMetricsReturn,
} from './useBusinessMetrics';

export type {
  ValuationInputs,
  ValuationResults,
  UseBusinessValuationReturn,
} from './useBusinessValuation';
