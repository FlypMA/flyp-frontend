import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Progress, Chip } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  TrendingUp,
  Download,
  Edit,
  RefreshCw,
  Calendar,
  Target,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Eye,
  Share2,
  FileText,
  Building2,
  DollarSign,
  Sparkles,
  ArrowRight,
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
}

interface ValuationReportCardProps {
  valuation: BusinessValuation | null;
  onRequestValuation?: () => void;
  onUpdateValuation?: () => void;
  onCreateListing?: () => void;
  className?: string;
}

const ValuationReportCard: React.FC<ValuationReportCardProps> = ({
  valuation,
  onRequestValuation,
  onUpdateValuation,
  onCreateListing,
  className = '',
}) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'danger';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'draft': return 'warning';
      case 'expired': return 'danger';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return RefreshCw;
      case 'draft': return Edit;
      case 'expired': return AlertCircle;
      default: return FileText;
    }
  };

  const getTimeUntilExpiry = () => {
    if (!valuation?.next_review_date) return null;
    const reviewDate = new Date(valuation.next_review_date);
    const now = new Date();
    const diffTime = reviewDate.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  // No valuation state
  if (!valuation) {
    return (
      <Card className={`border border-gray-200 ${className}`}>
        <CardBody className="text-center py-16">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Get Your Free Business Valuation
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Discover your business worth with our comprehensive valuation analysis. 
              Get started in minutes and receive a detailed report.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              color="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onPress={onRequestValuation}
              endContent={<Sparkles className="w-5 h-5" />}
            >
              Start Free Valuation
            </Button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free & Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>5-10 Minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Professional Report</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="light"
              size="sm"
              className="text-blue-600 hover:text-blue-700"
              onPress={() => navigate('/resources/valuation-guide')}
              endContent={<ArrowRight className="w-4 h-4" />}
            >
              Learn About Business Valuation
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  const StatusIcon = getStatusIcon(valuation.status);
  const monthsUntilExpiry = getTimeUntilExpiry();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Valuation Card */}
      <Card className={`border-2 ${
        valuation.status === 'completed' 
          ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50' 
          : valuation.status === 'expired'
          ? 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50'
          : 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-2xl ${
                valuation.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <StatusIcon className={`w-6 h-6 ${
                  valuation.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Business Valuation Report
                </h3>
                <p className="text-gray-600 text-sm">
                  {valuation.methodology} • Updated {new Date(valuation.last_updated || valuation.valuation_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Chip 
                color={getStatusColor(valuation.status) as any}
                variant="flat" 
                size="sm"
                className="font-medium"
              >
                {valuation.status.toUpperCase().replace('_', ' ')}
              </Chip>
              <Chip 
                color={getConfidenceColor(valuation.confidence_level) as any}
                variant="flat" 
                size="sm"
              >
                {valuation.confidence_level.toUpperCase()} CONFIDENCE
              </Chip>
            </div>
          </div>
        </CardHeader>
        
        <CardBody className="pt-0">
          {/* Valuation Amount */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-4xl font-bold text-gray-900">
                {formatCurrency(valuation.estimated_value, valuation.currency)}
              </span>
            </div>
            <p className="text-gray-600 text-lg">Estimated Market Value</p>
            
            {/* Value Range Indicator */}
            <div className="mt-4 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Conservative</span>
                <span>Market</span>
                <span>Optimistic</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  style={{ width: '60%', left: '20%' }}
                />
                <div 
                  className="absolute w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg"
                  style={{ left: 'calc(50% - 8px)', top: '-4px' }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatCurrency(valuation.estimated_value * 0.8, valuation.currency)}</span>
                <span>{formatCurrency(valuation.estimated_value * 1.2, valuation.currency)}</span>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-white/50 rounded-xl border border-white/60">
              <div className="text-lg font-bold text-gray-900">
                {valuation.revenue_multiple || '3.2'}x
              </div>
              <div className="text-xs text-gray-600">Revenue Multiple</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-xl border border-white/60">
              <div className="text-lg font-bold text-gray-900">
                {valuation.ebitda_multiple || '8.5'}x
              </div>
              <div className="text-xs text-gray-600">EBITDA Multiple</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-xl border border-white/60">
              <div className="text-lg font-bold text-gray-900">
                {valuation.industry_average || '7.2'}x
              </div>
              <div className="text-xs text-gray-600">Industry Avg</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-xl border border-white/60">
              <div className="flex items-center justify-center space-x-1">
                <Calendar className="w-3 h-3 text-gray-600" />
                <div className="text-lg font-bold text-gray-900">
                  {monthsUntilExpiry || 12}
                </div>
              </div>
              <div className="text-xs text-gray-600">Months Valid</div>
            </div>
          </div>

          {/* Expiry Warning */}
          {monthsUntilExpiry && monthsUntilExpiry <= 3 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">
                    Valuation expires in {monthsUntilExpiry} month{monthsUntilExpiry !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-orange-700">
                    Consider updating your valuation to reflect current market conditions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              color="primary"
              variant="solid"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-medium"
              onPress={onCreateListing}
              startContent={<Building2 className="w-4 h-4" />}
            >
              Create Listing
            </Button>
            
            <Button
              variant="bordered"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onPress={() => {/* TODO: Download functionality */}}
              startContent={<Download className="w-4 h-4" />}
            >
              Download Report
            </Button>
            
            <Button
              variant="bordered"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              onPress={() => setShowDetails(!showDetails)}
              startContent={<Eye className="w-4 h-4" />}
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/60">
            <Button
              variant="light"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
              onPress={onUpdateValuation}
              startContent={<RefreshCw className="w-4 h-4" />}
            >
              Update Valuation
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="light"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
                startContent={<Share2 className="w-4 h-4" />}
              >
                Share
              </Button>
              <Button
                variant="light"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
                onPress={() => navigate('/resources/valuation-guide')}
                startContent={<FileText className="w-4 h-4" />}
              >
                Valuation Guide
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Detailed Analysis (Expandable) */}
      {showDetails && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Value Drivers */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Key Value Drivers</h4>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="space-y-3">
                {(valuation.key_drivers || [
                  'Strong recurring revenue base',
                  'Prime location with long-term lease',
                  'Experienced management team',
                  'Growing market demand',
                  'Proprietary business processes'
                ]).map((driver, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{driver}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Risk Factors</h4>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="space-y-3">
                {(valuation.risk_factors || [
                  'Key person dependency',
                  'Market competition increasing',
                  'Economic uncertainty',
                  'Regulatory changes possible',
                  'Customer concentration risk'
                ]).map((risk, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{risk}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ValuationReportCard;
