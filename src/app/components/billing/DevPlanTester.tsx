import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { TestTube, Zap, AlertCircle, CheckCircle, Code } from 'lucide-react';
import { creditService } from '../../services/billing/creditService';

const DevPlanTester: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; data?: any } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateDevPlan = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await creditService.createDevPlan();

      if (response.success) {
        setResult({
          success: true,
          message: `✅ Dev plan created successfully! You now have ${response.plan?.creditsPerMonth} credits.`,
          data: response.plan,
        });
      } else {
        setResult({
          success: false,
          message: `❌ Failed to create dev plan: ${response.error}`,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `❌ Error creating dev plan: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckDevStatus = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await creditService.getDevStatus();

      if (response.success) {
        setResult({
          success: true,
          message: '🔍 Dev status retrieved successfully',
          data: response.status,
        });
      } else {
        setResult({
          success: false,
          message: `❌ Failed to get dev status: ${response.error}`,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `❌ Error checking dev status: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckCurrentPlan = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const plan = await creditService.getUserPlan();
      const isDevPlan = await creditService.isDevPlan();

      if (plan) {
        setResult({
          success: true,
          message: `📊 Current plan: ${plan.planType.toUpperCase()} (${isDevPlan ? 'Development Mode' : 'Standard Mode'})`,
          data: plan,
        });
      } else {
        setResult({
          success: false,
          message: '❌ No plan found',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `❌ Error checking plan: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetCredits = async () => {
    setLoading(true);
    setMessage('');

    try {
      console.log('🧪 Testing credit reset...');

      // Use the new debug method
      const result = await creditService.debugResetCredits();

      if (result.success) {
        setMessage(`✅ ${result.message}`);
        console.log('✅ Credit reset successful:', result.plan);
      } else {
        setMessage(`❌ ${result.message}`);
        console.error('❌ Credit reset failed:', result.message);
      }
    } catch (error) {
      const errorMsg = `Credit reset failed: ${error instanceof Error ? error.message : String(error)}`;
      setMessage(`❌ ${errorMsg}`);
      console.error('❌ Credit reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckCreditState = async () => {
    try {
      console.log('🔍 Checking credit state...');

      const state = creditService.debugGetCreditState();
      console.log('🔍 Current localStorage state:', state.localStorage);

      const plan = await state.userPlan;
      console.log('🔍 Current user plan:', plan);

      setMessage(
        `Check complete - see console for details. Credits: ${plan?.creditsRemaining || 'N/A'}`
      );
    } catch (error) {
      console.error('❌ Failed to check credit state:', error);
      setMessage(
        `❌ Failed to check credit state: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <Card className="bg-zinc-900/80 border-orange-700/40">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-600/20 rounded-lg">
            <TestTube size={20} className="text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Dev Plan Tester</h3>
            <p className="text-zinc-400 text-sm">Test development plan functionality</p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              color="primary"
              onClick={handleCreateDevPlan}
              isLoading={isLoading}
              disabled={isLoading}
              startContent={<Zap size={16} />}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Create Dev Plan
            </Button>

            <Button
              variant="bordered"
              onClick={handleCheckDevStatus}
              isLoading={isLoading}
              disabled={isLoading}
              startContent={<Code size={16} />}
              className="border-orange-600 text-orange-400"
            >
              Check Dev Status
            </Button>

            <Button
              variant="bordered"
              onClick={handleCheckCurrentPlan}
              isLoading={isLoading}
              disabled={isLoading}
              startContent={<CheckCircle size={16} />}
              className="border-zinc-600 text-zinc-300"
            >
              Check Current Plan
            </Button>
          </div>

          {/* Result Display */}
          {result && (
            <div
              className={`p-4 rounded-lg border ${
                result.success
                  ? 'bg-green-900/20 border-green-700/50'
                  : 'bg-red-900/20 border-red-700/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {result.success ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : (
                  <AlertCircle size={16} className="text-red-400" />
                )}
                <span
                  className={`font-medium text-sm ${
                    result.success ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  Test Result
                </span>
              </div>
              <p className="text-zinc-300 text-sm mb-2">{result.message}</p>

              {result.data && (
                <div className="mt-3 p-3 bg-zinc-800/40 rounded-lg">
                  <p className="text-xs text-zinc-400 mb-2">Response Data:</p>
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Debug Message Display */}
          {message && (
            <div className="p-4 rounded-lg border bg-blue-900/20 border-blue-500/30 text-blue-400">
              <p className="text-sm">{message}</p>
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TestTube size={16} className="text-orange-400" />
              <span className="font-medium text-sm text-orange-400">Development Testing</span>
            </div>
            <p className="text-zinc-300 text-sm">
              Use this component to test the dev plan API endpoints. The dev plan includes 500
              credits and full feature access for comprehensive testing of the billing system.
            </p>
          </div>

          <Button
            color="warning"
            variant="bordered"
            onClick={handleResetCredits}
            isLoading={loading}
            className="w-full"
          >
            🔄 Reset Credits (Debug)
          </Button>

          <Button
            color="secondary"
            variant="bordered"
            onClick={handleCheckCreditState}
            className="w-full"
          >
            🔍 Check Credit State
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default DevPlanTester;
