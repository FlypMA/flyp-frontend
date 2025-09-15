// 📈 Valuation Report Card - MVP Version
// Location: src/features/business-dashboard/components/ValuationReportCard.tsx
// Purpose: Business valuation report display card

import React from 'react';
import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  FileText, 
  Eye,
  Download,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ValuationReport {
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
  report: ValuationReport;
  onView?: (reportId: string) => void;
  onDownload?: (reportId: string) => void;
  onShare?: (reportId: string) => void;
  onEdit?: (reportId: string) => void;
}

const ValuationReportCard: React.FC<ValuationReportCardProps> = ({
  report,
  onView,
  onDownload,
  onShare,
  onEdit,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'draft':
        return 'default';
      case 'expired':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'success';
      case 'medium':
        return 'warning';
      case 'low':
        return 'danger';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Business Valuation Report
              </h3>
              <p className="text-sm text-gray-500">
                {formatDate(report.valuation_date)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Chip
              color={getStatusColor(report.status)}
              variant="flat"
              size="sm"
              startContent={getStatusIcon(report.status)}
            >
              {report.status.replace('_', ' ')}
            </Chip>
            <Chip
              color={getConfidenceColor(report.confidence_level)}
              variant="flat"
              size="sm"
            >
              {report.confidence_level} confidence
            </Chip>
          </div>
        </div>
      </CardHeader>

      <CardBody className="pt-0">
        {/* Valuation Amount */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Estimated Value</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatCurrency(report.estimated_value, report.currency)}
          </div>
          {report.industry_average && (
            <div className="text-sm text-gray-500 mt-1">
              Industry average: {formatCurrency(report.industry_average, report.currency)}
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {report.revenue_multiple && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Revenue Multiple</div>
              <div className="text-lg font-semibold text-gray-900">
                {report.revenue_multiple}x
              </div>
            </div>
          )}
          {report.ebitda_multiple && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">EBITDA Multiple</div>
              <div className="text-lg font-semibold text-gray-900">
                {report.ebitda_multiple}x
              </div>
            </div>
          )}
        </div>

        {/* Methodology */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Methodology</span>
          </div>
          <p className="text-sm text-gray-700">{report.methodology}</p>
        </div>

        {/* Key Drivers */}
        {report.key_drivers && report.key_drivers.length > 0 && (
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Key Drivers</div>
            <div className="flex flex-wrap gap-2">
              {report.key_drivers.slice(0, 3).map((driver, index) => (
                <Chip key={index} size="sm" variant="flat" color="primary">
                  {driver}
                </Chip>
              ))}
              {report.key_drivers.length > 3 && (
                <Chip size="sm" variant="flat" color="default">
                  +{report.key_drivers.length - 3} more
                </Chip>
              )}
            </div>
          </div>
        )}

        {/* Risk Factors */}
        {report.risk_factors && report.risk_factors.length > 0 && (
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Risk Factors</div>
            <div className="flex flex-wrap gap-2">
              {report.risk_factors.slice(0, 2).map((risk, index) => (
                <Chip key={index} size="sm" variant="flat" color="warning">
                  {risk}
                </Chip>
              ))}
              {report.risk_factors.length > 2 && (
                <Chip size="sm" variant="flat" color="default">
                  +{report.risk_factors.length - 2} more
                </Chip>
              )}
            </div>
          </div>
        )}

        {/* Market Conditions */}
        {report.market_conditions && (
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Market Conditions</div>
            <p className="text-sm text-gray-700">{report.market_conditions}</p>
          </div>
        )}

        {/* Next Review Date */}
        {report.next_review_date && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Next Review</span>
            </div>
            <p className="text-sm text-gray-700">
              {formatDate(report.next_review_date)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onView?.(report.id)}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDownload?.(report.id)}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onShare?.(report.id)}
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
          {report.status === 'draft' && (
            <Button
              size="sm"
              color="primary"
              onClick={() => onEdit?.(report.id)}
            >
              Edit Report
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ValuationReportCard;
