import React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Download,
  Eye,
  Calculator,
  RefreshCw,
  Share2,
  BookOpen,
} from 'lucide-react';

interface BusinessValuation {
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
  conservative_value?: number;
  optimistic_value?: number;
}

interface ValuationReportCardProps {
  valuation?: BusinessValuation | null;
  onRequestValuation?: () => void;
  onUpdateValuation?: () => void;
  onCreateListing?: () => void;
}

const ValuationReportCard: React.FC<ValuationReportCardProps> = ({
  valuation,
  onRequestValuation,
  onUpdateValuation,
  onCreateListing,
}) => {
  if (!valuation) {
    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardBody className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Calculator className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Valuation Available</h3>
          <p className="text-gray-600 mb-6">
            Get a professional business valuation to understand your company's worth.
          </p>
          <Button
            color="primary"
            size="lg"
            onPress={onRequestValuation}
            startContent={<Calculator className="w-5 h-5" />}
          >
            Get Valuation
          </Button>
        </CardBody>
      </Card>
    );
  }

  const formatPrice = (price: number, currency = 'EUR') => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate conservative and optimistic values (±20% of estimated value)
  const conservativeValue =
    valuation.conservative_value || Math.round(valuation.estimated_value * 0.8);
  const optimisticValue = valuation.optimistic_value || Math.round(valuation.estimated_value * 1.2);

  // Calculate months since valuation (for expiry warning)
  const monthsSinceValuation = Math.floor(
    (Date.now() - new Date(valuation.valuation_date).getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  const isExpired = monthsSinceValuation > 6;

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardBody className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Valuation Report</h3>
            <p className="text-gray-500">
              {valuation.methodology} • Updated {formatDate(valuation.valuation_date)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
              {valuation.status.toUpperCase()}
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
              {valuation.confidence_level.toUpperCase()} CONFIDENCE
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Valuation Display */}
          <div>
            {/* Main Valuation */}
            <div className="text-center mb-8 p-6 border border-gray-100 rounded-lg">
              <div className="text-4xl font-semibold text-gray-900 mb-2">
                {formatPrice(valuation.estimated_value, valuation.currency)}
              </div>
              <p className="text-base text-gray-600 mb-6">Estimated Market Value</p>

              {/* Range Visualization */}
              <div className="max-w-sm mx-auto">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Conservative</span>
                  <span>Market</span>
                  <span>Optimistic</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-gray-900 rounded-full"
                    style={{ width: '60%', left: '20%' }}
                  ></div>
                  <div
                    className="absolute w-3 h-3 bg-gray-900 rounded-full"
                    style={{ left: 'calc(50% - 6px)', top: '-2px' }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{formatPrice(conservativeValue)}</span>
                  <span>{formatPrice(optimisticValue)}</span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {valuation.revenue_multiple || 3.2}x
                </div>
                <div className="text-sm text-gray-500">Revenue Multiple</div>
              </div>
              <div className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {valuation.ebitda_multiple || 8.5}x
                </div>
                <div className="text-sm text-gray-500">EBITDA Multiple</div>
              </div>
              <div className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {valuation.industry_average || 7.2}x
                </div>
                <div className="text-sm text-gray-500">Industry Avg</div>
              </div>
              <div className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {isExpired ? `-${monthsSinceValuation - 6}` : monthsSinceValuation - 6}
                </div>
                <div className="text-sm text-gray-500">Months Valid</div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Expiration Notice */}
            {isExpired && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Valuation expires in {monthsSinceValuation - 6} months
                </p>
                <p className="text-sm text-gray-600">
                  Consider updating your valuation to reflect current market conditions.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                size="lg"
                onPress={onCreateListing}
              >
                Create Listing
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="bordered"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  size="md"
                >
                  Download Report
                </Button>
                <Button
                  variant="bordered"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  size="md"
                  onPress={() => {
                    /* Navigate to valuation details */
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                variant="light"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
                onPress={onUpdateValuation}
              >
                Update Valuation
              </Button>
              <div className="flex items-center space-x-3">
                <Button variant="light" size="sm" className="text-gray-600 hover:text-gray-900">
                  Share
                </Button>
                <Button variant="light" size="sm" className="text-gray-600 hover:text-gray-900">
                  Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ValuationReportCard;
