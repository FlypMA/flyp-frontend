// 🏪 Business Valuation Hook - MVP Version
// Location: src/features/business-dashboard/hooks/useBusinessValuation.ts
// Purpose: Handle business valuation calculations, scenarios, and reports

import { useState, useEffect, useCallback, useMemo } from 'react';

// Types
interface ValuationInputs {
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

interface ValuationResults {
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

interface UseBusinessValuationReturn {
  // Data
  inputs: ValuationInputs;
  results: ValuationResults | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  updateInputs: (inputs: Partial<ValuationInputs>) => void;
  calculateValuation: () => Promise<void>;
  saveValuation: (name: string) => Promise<string>;
  loadValuation: (id: string) => Promise<void>;
  exportValuation: (format: 'pdf' | 'excel') => Promise<void>;
}

// Default inputs
const defaultInputs: ValuationInputs = {
  revenue: 1000000,
  ebitda: 200000,
  netIncome: 150000,
  totalAssets: 800000,
  totalDebt: 200000,
  industryGrowthRate: 5,
  marketPosition: 'competitor',
  customerConcentration: 30,
  keyPersonDependency: 'medium',
  marketRisk: 'medium',
};

// Industry multiples (simplified)
const industryMultiples = {
  technology: { revenue: 3.5, ebitda: 12 },
  retail: { revenue: 1.2, ebitda: 8 },
  manufacturing: { revenue: 1.8, ebitda: 10 },
  services: { revenue: 2.5, ebitda: 9 },
  healthcare: { revenue: 4.0, ebitda: 15 },
};

export const useBusinessValuation = (): UseBusinessValuationReturn => {
  const [inputs, setInputs] = useState<ValuationInputs>(defaultInputs);
  const [results, setResults] = useState<ValuationResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate DCF valuation
  const calculateDCF = useCallback((inputs: ValuationInputs): number => {
    const { revenue, ebitda, industryGrowthRate } = inputs;

    // Simplified DCF calculation
    const projectedRevenue = revenue * (1 + industryGrowthRate / 100);
    const projectedEBITDA = ebitda * (1 + industryGrowthRate / 100);
    const terminalValue = projectedEBITDA * 10; // 10x EBITDA multiple
    const presentValue = terminalValue / (1 + 0.1); // 10% discount rate

    return Math.round(presentValue);
  }, []);

  // Calculate market multiple valuation
  const calculateMarketMultiple = useCallback((inputs: ValuationInputs): number => {
    const { revenue, ebitda } = inputs;

    // Use average industry multiples (simplified)
    const avgRevenueMultiple = 2.5;
    const avgEBITDAMultiple = 10;

    const revenueBasedValue = revenue * avgRevenueMultiple;
    const ebitdaBasedValue = ebitda * avgEBITDAMultiple;

    return Math.round((revenueBasedValue + ebitdaBasedValue) / 2);
  }, []);

  // Calculate asset-based valuation
  const calculateAssetBased = useCallback((inputs: ValuationInputs): number => {
    const { totalAssets, totalDebt } = inputs;
    return Math.round(totalAssets - totalDebt);
  }, []);

  // Calculate risk adjustment
  const calculateRiskAdjustment = useCallback((inputs: ValuationInputs): number => {
    let riskFactor = 1.0;

    // Customer concentration risk
    if (inputs.customerConcentration > 50) riskFactor -= 0.1;
    else if (inputs.customerConcentration > 30) riskFactor -= 0.05;

    // Key person dependency risk
    if (inputs.keyPersonDependency === 'high') riskFactor -= 0.15;
    else if (inputs.keyPersonDependency === 'medium') riskFactor -= 0.08;

    // Market risk
    if (inputs.marketRisk === 'high') riskFactor -= 0.1;
    else if (inputs.marketRisk === 'medium') riskFactor -= 0.05;

    return Math.max(0.5, riskFactor); // Minimum 50% of original value
  }, []);

  // Calculate confidence level
  const calculateConfidenceLevel = useCallback(
    (inputs: ValuationInputs): 'high' | 'medium' | 'low' => {
      let score = 0;

      // Revenue stability
      if (inputs.revenue > 500000) score += 1;

      // Profitability
      if (inputs.ebitda > inputs.revenue * 0.15) score += 1;

      // Customer concentration
      if (inputs.customerConcentration < 30) score += 1;

      // Key person dependency
      if (inputs.keyPersonDependency === 'low') score += 1;

      // Market risk
      if (inputs.marketRisk === 'low') score += 1;

      if (score >= 4) return 'high';
      if (score >= 2) return 'medium';
      return 'low';
    },
    []
  );

  // Calculate valuation
  const calculateValuation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Calculate different valuation methods
      const dcfValuation = calculateDCF(inputs);
      const marketMultipleValuation = calculateMarketMultiple(inputs);
      const assetBasedValuation = calculateAssetBased(inputs);

      // Calculate range
      const valuations = [dcfValuation, marketMultipleValuation, assetBasedValuation];
      const min = Math.min(...valuations);
      const max = Math.max(...valuations);
      const median = valuations.sort((a, b) => a - b)[1];

      // Calculate multiples
      const ebitdaMultiple = marketMultipleValuation / inputs.ebitda;
      const revenueMultiple = marketMultipleValuation / inputs.revenue;

      // Apply risk adjustment
      const riskFactor = calculateRiskAdjustment(inputs);
      const riskAdjustedValue = Math.round(median * riskFactor);

      // Calculate confidence level
      const confidenceLevel = calculateConfidenceLevel(inputs);

      const valuationResults: ValuationResults = {
        dcfValuation,
        marketMultipleValuation,
        assetBasedValuation,
        valuationRange: { min, max, median },
        ebitdaMultiple,
        revenueMultiple,
        riskAdjustedValue,
        confidenceLevel,
      };

      setResults(valuationResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate valuation');
    } finally {
      setIsLoading(false);
    }
  }, [
    inputs,
    calculateDCF,
    calculateMarketMultiple,
    calculateAssetBased,
    calculateRiskAdjustment,
    calculateConfidenceLevel,
  ]);

  // Update inputs
  const updateInputs = useCallback((newInputs: Partial<ValuationInputs>) => {
    setInputs(prev => ({
      ...prev,
      ...newInputs,
    }));
  }, []);

  // Save valuation
  const saveValuation = useCallback(
    async (name: string): Promise<string> => {
      if (!results) throw new Error('No valuation results to save');

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const valuationId = `val_${Date.now()}`;
        console.log('Valuation saved:', { id: valuationId, name, inputs, results });

        return valuationId;
      } catch (err) {
        throw new Error('Failed to save valuation');
      }
    },
    [results, inputs]
  );

  // Load valuation
  const loadValuation = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real implementation, this would load from the API
      console.log('Loading valuation:', id);

      // For now, just reset to defaults
      setInputs(defaultInputs);
      setResults(null);
    } catch (err) {
      setError('Failed to load valuation');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Export valuation
  const exportValuation = useCallback(
    async (format: 'pdf' | 'excel'): Promise<void> => {
      if (!results) throw new Error('No valuation results to export');

      try {
        // Simulate export process
        console.log(`Exporting valuation as ${format.toUpperCase()}...`, { inputs, results });

        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(`Valuation exported successfully as ${format.toUpperCase()}`);
      } catch (err) {
        throw new Error(`Failed to export valuation as ${format.toUpperCase()}`);
      }
    },
    [results, inputs]
  );

  return {
    inputs,
    results,
    isLoading,
    error,
    updateInputs,
    calculateValuation,
    saveValuation,
    loadValuation,
    exportValuation,
  };
};

export default useBusinessValuation;
