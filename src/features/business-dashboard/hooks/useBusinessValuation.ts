// 🏪 Business Valuation Hook
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
  isCalculating: boolean;
  error: string | null;

  // Actions
  updateInputs: (inputs: Partial<ValuationInputs>) => void;
  calculateValuation: () => Promise<void>;
  generateReport: () => Promise<void>;
  saveValuation: (name: string) => Promise<void>;

  // Scenarios
  scenarios: Array<{ name: string; inputs: ValuationInputs; results: ValuationResults }>;
  createScenario: (name: string) => void;

  // Validation
  inputValidation: Record<keyof ValuationInputs, string | null>;
  isValidForCalculation: boolean;

  // Comparisons
  industryBenchmarks: {
    avgEbitdaMultiple: number;
    avgRevenueMultiple: number;
    industryName: string;
  } | null;
}

export const useBusinessValuation = (): UseBusinessValuationReturn => {
  // State
  const [inputs, setInputs] = useState<ValuationInputs>({
    revenue: 0,
    ebitda: 0,
    netIncome: 0,
    totalAssets: 0,
    totalDebt: 0,
    industryGrowthRate: 5,
    marketPosition: 'competitor',
    customerConcentration: 20,
    keyPersonDependency: 'medium',
    marketRisk: 'medium',
  });

  const [results, setResults] = useState<ValuationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<
    Array<{ name: string; inputs: ValuationInputs; results: ValuationResults }>
  >([]);

  // Update inputs
  const updateInputs = useCallback((newInputs: Partial<ValuationInputs>) => {
    setInputs(prev => ({ ...prev, ...newInputs }));
    setError(null);
  }, []);

  // Input validation
  const inputValidation = useMemo((): Record<keyof ValuationInputs, string | null> => {
    return {
      revenue: inputs.revenue <= 0 ? 'Revenue must be greater than 0' : null,
      ebitda: inputs.ebitda < 0 ? 'EBITDA cannot be negative' : null,
      netIncome: null, // Can be negative
      totalAssets: inputs.totalAssets <= 0 ? 'Total assets must be greater than 0' : null,
      totalDebt: inputs.totalDebt < 0 ? 'Total debt cannot be negative' : null,
      industryGrowthRate: null,
      marketPosition: null,
      customerConcentration:
        inputs.customerConcentration < 0 || inputs.customerConcentration > 100
          ? 'Must be between 0 and 100%'
          : null,
      keyPersonDependency: null,
      marketRisk: null,
    };
  }, [inputs]);

  const isValidForCalculation = useMemo(() => {
    return (
      Object.values(inputValidation).every(error => error === null) &&
      inputs.revenue > 0 &&
      inputs.totalAssets > 0
    );
  }, [inputValidation, inputs]);

  // Calculate valuation
  const calculateValuation = useCallback(async () => {
    if (!isValidForCalculation) {
      setError('Please fix validation errors before calculating');
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      // TODO: Replace with actual valuation API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate calculation time

      // Mock valuation calculations
      const industryMultiples = {
        leader: { ebitda: 6.5, revenue: 2.2 },
        competitor: { ebitda: 5.0, revenue: 1.8 },
        follower: { ebitda: 3.5, revenue: 1.2 },
      };

      const multiples = industryMultiples[inputs.marketPosition];

      const dcfValuation = inputs.netIncome * 15; // Simplified DCF
      const marketMultipleValuation = inputs.ebitda * multiples.ebitda;
      const assetBasedValuation = inputs.totalAssets - inputs.totalDebt;

      // Risk adjustments
      const riskFactor =
        inputs.customerConcentration > 50
          ? 0.85
          : inputs.keyPersonDependency === 'high'
            ? 0.9
            : inputs.marketRisk === 'high'
              ? 0.88
              : 1.0;

      const valuations = [dcfValuation, marketMultipleValuation, assetBasedValuation];
      const min = Math.min(...valuations) * riskFactor;
      const max = Math.max(...valuations) * riskFactor;
      const median = (min + max) / 2;

      const calculatedResults: ValuationResults = {
        dcfValuation,
        marketMultipleValuation,
        assetBasedValuation,
        valuationRange: { min, max, median },
        ebitdaMultiple: multiples.ebitda,
        revenueMultiple: multiples.revenue,
        riskAdjustedValue: median,
        confidenceLevel: riskFactor > 0.95 ? 'high' : riskFactor > 0.85 ? 'medium' : 'low',
      };

      setResults(calculatedResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate valuation');
    } finally {
      setIsCalculating(false);
    }
  }, [inputs, isValidForCalculation]);

  // Generate report
  const generateReport = useCallback(async () => {
    if (!results) return;

    try {
      // TODO: Implement actual report generation
      console.log('Generating valuation report', { inputs, results });
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Valuation report generated successfully');
    } catch (err) {
      setError('Failed to generate report');
    }
  }, [inputs, results]);

  // Save valuation
  const saveValuation = useCallback(
    async (name: string) => {
      if (!results) return;

      try {
        // TODO: Implement actual save functionality
        console.log('Saving valuation', name, { inputs, results });
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(`Valuation "${name}" saved successfully`);
      } catch (err) {
        setError('Failed to save valuation');
      }
    },
    [inputs, results]
  );

  // Create scenario
  const createScenario = useCallback(
    (name: string) => {
      if (!results) return;

      const newScenario = {
        name,
        inputs: { ...inputs },
        results: { ...results },
      };

      setScenarios(prev => [...prev, newScenario]);
    },
    [inputs, results]
  );

  // Industry benchmarks (mock data)
  const industryBenchmarks = useMemo(
    () => ({
      avgEbitdaMultiple: 5.2,
      avgRevenueMultiple: 1.9,
      industryName: 'Technology Services',
    }),
    []
  );

  // Auto-calculate when inputs change (debounced)
  useEffect(() => {
    if (!isValidForCalculation) return;

    const timeoutId = setTimeout(() => {
      calculateValuation();
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [inputs, isValidForCalculation]); // Don't include calculateValuation to avoid infinite loops

  return {
    // Data
    inputs,
    results,
    isCalculating,
    error,

    // Actions
    updateInputs,
    calculateValuation,
    generateReport,
    saveValuation,

    // Scenarios
    scenarios,
    createScenario,

    // Validation
    inputValidation,
    isValidForCalculation,

    // Comparisons
    industryBenchmarks,
  };
};
