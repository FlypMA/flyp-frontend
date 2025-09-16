import * as React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { AlertTriangle, Info, Scale, Shield } from 'lucide-react';

interface FinancialDisclaimerProps {
  type: 'valuation' | 'solvency' | 'liquidation' | 'general';
  variant?: 'banner' | 'modal' | 'sidebar';
  isCollapsible?: boolean;
  className?: string;
}

const FinancialDisclaimer: React.FC<FinancialDisclaimerProps> = ({
  type,
  variant = 'banner',
  isCollapsible = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = React.useState(!isCollapsible);

  const getDisclaimerContent = () => {
    switch (type) {
      case 'valuation':
        return {
          title: 'Business Valuation Disclaimer',
          icon: <Scale className="w-5 h-5" />,
          content: [
            'This business valuation is for informational purposes only and should not be considered as professional financial advice.',
            'Valuations are estimates based on available data and market conditions, which can change rapidly.',
            'Actual sale prices may vary significantly from estimated values due to market conditions, buyer preferences, negotiation factors, and other variables.',
            'This tool does not constitute a formal business appraisal. For legal, tax, or investment decisions, consult qualified professionals.',
            'Flyp is not licensed to provide investment advice and makes no warranties about the accuracy of valuations.',
          ],
        };

      case 'solvency':
        return {
          title: 'Financial Analysis Disclaimer',
          icon: <Shield className="w-5 h-5" />,
          content: [
            'This solvency analysis is for educational purposes only and does not constitute financial advice.',
            'Loan eligibility and interest rates shown are estimates based on general criteria and may not reflect actual lending decisions.',
            'Banks consider numerous factors beyond these metrics when making lending decisions.',
            'Financial ratios should be interpreted by qualified financial professionals in context of your specific situation.',
            'Do not make financial decisions based solely on this analysis. Consult your accountant, financial advisor, or bank directly.',
            'Flyp is not a licensed financial institution and cannot guarantee loan approval or terms.',
          ],
        };

      case 'liquidation':
        return {
          title: 'Liquidation Analysis Disclaimer',
          icon: <AlertTriangle className="w-5 h-5" />,
          content: [
            'CRITICAL: This liquidation analysis contains speculative estimates and should not be used for legal or financial decision-making.',
            'Liquidation values are highly dependent on market conditions, asset condition, timing, and numerous other factors.',
            'These projections are for educational comparison purposes only and may not reflect actual liquidation outcomes.',
            'Liquidation processes involve complex legal and financial considerations that require professional guidance.',
            'Do not base business decisions on these estimates. Consult qualified legal, financial, and business professionals.',
            'Flyp strongly recommends professional business appraisal before making any exit decisions.',
            'Actual costs, timelines, and recoveries in liquidation may vary dramatically from these projections.',
          ],
        };

      default:
        return {
          title: 'Financial Information Disclaimer',
          icon: <Info className="w-5 h-5" />,
          content: [
            'All financial information and tools provided are for educational purposes only.',
            'This platform does not provide professional financial, legal, or investment advice.',
            'Consult qualified professionals before making any business or financial decisions.',
            'Results may vary and are not guaranteed. Past performance does not indicate future results.',
          ],
        };
    }
  };

  const disclaimer = getDisclaimerContent();
  const isHighRisk = type === 'liquidation';

  const getVariantStyles = () => {
    switch (variant) {
      case 'modal':
        return 'border-2 border-yellow-300 bg-yellow-50';
      case 'sidebar':
        return 'border border-gray-300 bg-gray-50';
      default:
        return isHighRisk
          ? 'border-2 border-red-300 bg-red-50'
          : 'border-2 border-yellow-300 bg-yellow-50';
    }
  };

  const getIconColor = () => {
    if (isHighRisk) return 'text-red-600';
    return variant === 'sidebar' ? 'text-gray-600' : 'text-yellow-600';
  };

  const getTextColor = () => {
    if (isHighRisk) return 'text-red-900';
    return variant === 'sidebar' ? 'text-gray-700' : 'text-yellow-900';
  };

  const getTitleColor = () => {
    if (isHighRisk) return 'text-red-900';
    return variant === 'sidebar' ? 'text-gray-900' : 'text-yellow-900';
  };

  return (
    <Card className={`${getVariantStyles()} ${className}`}>
      <CardBody className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`${getIconColor()} mt-0.5 flex-shrink-0`}>{disclaimer.icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${getTitleColor()}`}>{disclaimer.title}</h4>
              {isCollapsible && (
                <Button
                  variant="light"
                  size="sm"
                  onPress={() => setIsExpanded(!isExpanded)}
                  className={getTitleColor()}
                >
                  {isExpanded ? 'Hide' : 'Show'}
                </Button>
              )}
            </div>

            {isExpanded && (
              <div className={`text-sm ${getTextColor()} space-y-2`}>
                {disclaimer.content.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-xs mt-1.5 flex-shrink-0">•</span>
                    <span
                      className={`leading-relaxed ${item.startsWith('CRITICAL:') ? 'font-semibold' : ''}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}

                {/* Legal Footer */}
                <div
                  className={`mt-4 pt-3 border-t ${
                    isHighRisk
                      ? 'border-red-200'
                      : variant === 'sidebar'
                        ? 'border-gray-200'
                        : 'border-yellow-200'
                  }`}
                >
                  <p className={`text-xs ${getTextColor()} font-medium`}>
                    By using this tool, you acknowledge that you understand these limitations and
                    will seek professional advice for important business decisions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FinancialDisclaimer;
