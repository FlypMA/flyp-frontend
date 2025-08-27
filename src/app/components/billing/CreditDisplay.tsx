import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, Progress, Button, Chip } from '@heroui/react';
import { Zap, TrendingUp, AlertTriangle, Crown, RefreshCw } from 'lucide-react';
import { creditService } from '../../services/billing/creditService';
import { UserPlan } from '../../types/billing/plans';
import { useNavigate } from 'react-router-dom';

interface CreditDisplayProps {
  variant?: 'compact' | 'detailed' | 'inline';
  showUpgradeButton?: boolean;
  className?: string;
  onCreditsUpdate?: (creditsRemaining: number) => void;
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({
  variant = 'compact',
  showUpgradeButton = true,
  className = '',
  onCreditsUpdate,
}) => {
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const loadPlan = useCallback(async () => {
    try {
      setLoading(true);
      const userPlan = await creditService.getUserPlan();
      setPlan(userPlan);

      if (userPlan && onCreditsUpdate) {
        onCreditsUpdate(userPlan.creditsRemaining);
      }
    } catch (error) {
      console.error('Failed to load user plan:', error);
    } finally {
      setLoading(false);
    }
  }, [onCreditsUpdate]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPlan();
    setRefreshing(false);
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  useEffect(() => {
    loadPlan();
  }, [loadPlan]);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-zinc-800 rounded w-24"></div>
      </div>
    );
  }

  if (!plan) {
    return (
      <Card className={`bg-red-900/20 border-red-700/50 ${className}`}>
        <CardBody className="p-3">
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertTriangle size={16} />
            <span>Unable to load plan</span>
          </div>
        </CardBody>
      </Card>
    );
  }

  const usagePercentage =
    ((plan.creditsPerMonth - plan.creditsRemaining) / plan.creditsPerMonth) * 100;
  const isLowCredits = plan.creditsRemaining <= 2;
  const isOutOfCredits = plan.creditsRemaining <= 0;

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Chip
          size="sm"
          variant="flat"
          color={isOutOfCredits ? 'danger' : isLowCredits ? 'warning' : 'primary'}
          startContent={<Zap size={12} />}
        >
          {plan.creditsRemaining}/{plan.creditsPerMonth} credits
        </Chip>
        {(isLowCredits || isOutOfCredits) && showUpgradeButton && plan.planType === 'free' && (
          <Button
            size="sm"
            color="primary"
            variant="flat"
            onClick={handleUpgrade}
            className="text-xs"
          >
            Upgrade
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`bg-zinc-900/80 border-zinc-700/50 ${className}`}>
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-lg ${
                  isOutOfCredits
                    ? 'bg-red-500/20'
                    : isLowCredits
                      ? 'bg-yellow-500/20'
                      : 'bg-blue-500/20'
                }`}
              >
                <Zap
                  size={16}
                  className={
                    isOutOfCredits
                      ? 'text-red-400'
                      : isLowCredits
                        ? 'text-yellow-400'
                        : 'text-blue-400'
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Credits</p>
                <p
                  className={`text-xs capitalize ${
                    plan.planType === 'creators'
                      ? 'text-purple-400'
                      : plan.planType === 'dev'
                        ? 'text-orange-400'
                        : 'text-zinc-400'
                  }`}
                >
                  {plan.planType === 'creators'
                    ? 'Creators'
                    : plan.planType === 'dev'
                      ? 'Dev/Alpha'
                      : plan.planType}{' '}
                  Plan
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">{plan.creditsRemaining}</p>
              <p className="text-xs text-zinc-400">of {plan.creditsPerMonth}</p>
            </div>
          </div>

          <Progress
            value={usagePercentage}
            color={isOutOfCredits ? 'danger' : isLowCredits ? 'warning' : 'primary'}
            className="mb-3"
            size="sm"
          />

          {isOutOfCredits && (
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 mb-3">
              <p className="text-red-400 text-xs font-medium">Out of credits</p>
              <p className="text-zinc-300 text-xs">Upgrade to continue using Ilara</p>
            </div>
          )}

          {isLowCredits && !isOutOfCredits && (
            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-3">
              <p className="text-yellow-400 text-xs font-medium">Running low</p>
              <p className="text-zinc-300 text-xs">Consider upgrading soon</p>
            </div>
          )}

          {showUpgradeButton && plan.planType === 'free' && (
            <Button
              size="sm"
              color="primary"
              onClick={handleUpgrade}
              className="w-full"
              startContent={<Crown size={14} />}
            >
              Upgrade Plan
            </Button>
          )}
        </CardBody>
      </Card>
    );
  }

  // Detailed variant
  return (
    <Card className={`bg-zinc-900/80 border-zinc-700/50 ${className}`}>
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                isOutOfCredits
                  ? 'bg-red-500/20'
                  : isLowCredits
                    ? 'bg-yellow-500/20'
                    : 'bg-blue-500/20'
              }`}
            >
              <Zap
                size={20}
                className={
                  isOutOfCredits
                    ? 'text-red-400'
                    : isLowCredits
                      ? 'text-yellow-400'
                      : 'text-blue-400'
                }
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Credit Usage</h3>
              <p
                className={`text-sm capitalize ${
                  plan.planType === 'creators'
                    ? 'text-purple-400'
                    : plan.planType === 'dev'
                      ? 'text-orange-400'
                      : 'text-zinc-400'
                }`}
              >
                {plan.planType === 'creators'
                  ? 'Creators'
                  : plan.planType === 'dev'
                    ? 'Dev/Alpha'
                    : plan.planType}{' '}
                Plan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="bordered"
              isIconOnly
              onClick={handleRefresh}
              isLoading={refreshing}
              className="border-zinc-600"
            >
              <RefreshCw size={14} />
            </Button>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{plan.creditsRemaining}</p>
              <p className="text-sm text-zinc-400">of {plan.creditsPerMonth} credits</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Usage this month</span>
              <span className="text-white">
                {plan.creditsPerMonth - plan.creditsRemaining}/{plan.creditsPerMonth}
              </span>
            </div>
            <Progress
              value={usagePercentage}
              color={isOutOfCredits ? 'danger' : isLowCredits ? 'warning' : 'success'}
              className="mb-1"
            />
            <p className="text-xs text-zinc-500">
              Resets on {new Date(plan.currentPeriodEnd).toLocaleDateString()}
            </p>
          </div>

          {(isOutOfCredits || isLowCredits) && (
            <div
              className={`p-4 rounded-lg border ${
                isOutOfCredits
                  ? 'bg-red-900/20 border-red-700/50'
                  : 'bg-yellow-900/20 border-yellow-700/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle
                  size={16}
                  className={isOutOfCredits ? 'text-red-400' : 'text-yellow-400'}
                />
                <span
                  className={`font-medium text-sm ${isOutOfCredits ? 'text-red-400' : 'text-yellow-400'}`}
                >
                  {isOutOfCredits ? 'Out of Credits' : 'Low Credits'}
                </span>
              </div>
              <p className="text-zinc-300 text-sm mb-3">
                {isOutOfCredits
                  ? "You've used all your monthly credits. Upgrade to continue using Ilara's AI features."
                  : `Only ${plan.creditsRemaining} credits remaining this month. Consider upgrading for unlimited access.`}
              </p>
              {showUpgradeButton && plan.planType === 'free' && (
                <Button
                  size="sm"
                  color="primary"
                  onClick={handleUpgrade}
                  startContent={<Crown size={14} />}
                >
                  Upgrade to Pro
                </Button>
              )}
            </div>
          )}

          {plan.planType === 'free' && !isOutOfCredits && !isLowCredits && (
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-blue-400" />
                <span className="font-medium text-sm text-blue-400">Upgrade Available</span>
              </div>
              <p className="text-zinc-300 text-sm mb-3">
                Get 100 credits per month, advanced analytics, and priority support with Pro.
              </p>
              {showUpgradeButton && (
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  onClick={handleUpgrade}
                  startContent={<Crown size={14} />}
                >
                  View Pro Features
                </Button>
              )}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CreditDisplay;
