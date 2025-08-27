import { useState, useEffect, useCallback } from 'react';
import { creditService } from '../services/billing/creditService';
import { UserPlan, CreditUsage } from '../types/billing/plans';

export const useCreditPlan = () => {
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlan = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userPlan = await creditService.getUserPlan();
      setPlan(userPlan);
    } catch (err) {
      console.error('Failed to load user plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to load plan');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshPlan = useCallback(() => {
    return loadPlan();
  }, [loadPlan]);

  const checkCredits = useCallback(async (action: string, creditsRequired: number = 1) => {
    return await creditService.checkCredits(action, creditsRequired);
  }, []);

  const useCredits = useCallback(
    async (
      action: 'chat_message' | 'trend_analysis' | 'insight_generation' | 'export_data',
      creditsUsed: number = 1,
      description: string,
      metadata?: any
    ) => {
      const success = await creditService.useCredits(action, creditsUsed, description, metadata);
      if (success) {
        // Refresh plan after using credits
        await loadPlan();
      }
      return success;
    },
    [loadPlan]
  );

  useEffect(() => {
    loadPlan();
  }, [loadPlan]);

  return {
    plan,
    loading,
    error,
    refreshPlan,
    checkCredits,
    useCredits,
    hasCredits: plan ? plan.creditsRemaining > 0 : false,
    isLowCredits: plan ? plan.creditsRemaining <= 2 : false,
    isOutOfCredits: plan ? plan.creditsRemaining <= 0 : true,
  };
};
