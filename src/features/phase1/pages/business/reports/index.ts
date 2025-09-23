// 📈 Business Reports & Analysis Pages - MVP Version
// Location: src/app/pages/business/reports/index.ts
// Purpose: Export MVP business analysis and reporting pages

// Phase 1 (MVP) Features - Active
export { default as BusinessValuation } from './BusinessValuation';
export { default as GetFreeValuation } from './GetFreeValuation';
export { default as ValuationTool } from './ValuationTool';

// Phase 2 Features - Moved to /features/phase2/analytics/
// - SolvencyIntelligence (moved to phase2)
// - LiquidationComparison (moved to phase2)

// Default export for backward compatibility
export { default } from './BusinessValuation';
