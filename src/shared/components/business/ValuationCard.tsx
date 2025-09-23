/**
 * 💰 Valuation Card Component
 * Location: src/shared/components/business/ValuationCard.tsx
 * Purpose: Minimalistic valuation report card for listing valuations
 *
 * Features:
 * - Compact design with valuation range visualization
 * - Key metrics display
 * - Action buttons
 * - Professional styling
 */

import { Button } from '@/shared/components/buttons';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Calendar, Download, Eye, Share2 } from 'lucide-react';
import React from 'react';

interface ValuationCardProps {
  id: string;
  date: string;
  businessValue: number;
  method: string;
  confidence: 'high' | 'medium' | 'low';
  lowRange: number;
  highRange: number;
  revenueMultiple: number;
  ebitdaMultiple: number;
  industryAverage: number;
  monthsValid: number;
  onView?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onUpdate?: () => void;
  className?: string;
}

const ValuationCard: React.FC<ValuationCardProps> = ({
  id,
  date,
  businessValue,
  method,
  confidence,
  lowRange,
  highRange,
  revenueMultiple,
  ebitdaMultiple,
  industryAverage,
  monthsValid,
  onView,
  onDownload,
  onShare,
  onUpdate,
  className = '',
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Calculate the position of the market value on the range slider
  const rangeWidth = highRange - lowRange;
  const marketPosition = ((businessValue - lowRange) / rangeWidth) * 100;
  const sliderPosition = Math.max(0, Math.min(100, marketPosition));

  return (
    <Card
      className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <CardHeader className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Business Valuation</h3>
              <p className="text-sm text-gray-500">{formatDate(date)}</p>
            </div>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(confidence)}`}
          >
            {confidence.toUpperCase()}
          </div>
        </div>
      </CardHeader>

      <CardBody className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased pt-0">
        {/* Valuation Range Visualization */}
        <div className="text-center mb-6 p-4 border border-gray-100 rounded-lg">
          <div className="text-3xl font-semibold text-gray-900 mb-2">
            {formatCurrency(businessValue)}
          </div>
          <p className="text-sm text-gray-600 mb-4">Estimated Market Value</p>

          {/* Range Slider */}
          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
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
                style={{ left: `calc(${sliderPosition}% - 6px)`, top: '-2px' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{formatCurrency(lowRange)}</span>
              <span>{formatCurrency(highRange)}</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 border border-gray-100 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 mb-1">{revenueMultiple}x</div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
          <div className="text-center p-3 border border-gray-100 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 mb-1">{ebitdaMultiple}x</div>
            <div className="text-xs text-gray-500">EBITDA</div>
          </div>
          <div className="text-center p-3 border border-gray-100 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 mb-1">{industryAverage}x</div>
            <div className="text-xs text-gray-500">Industry</div>
          </div>
        </div>

        {/* Method and Validity */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Method:</span> {method}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Valid for:</span> {monthsValid} months
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {onView && (
              <Button
                variant="tertiary"
                size="sm"
                startContent={<Eye className="w-4 h-4" />}
                onPress={onView}
              >
                View
              </Button>
            )}
            {onDownload && (
              <Button
                variant="tertiary"
                size="sm"
                startContent={<Download className="w-4 h-4" />}
                onPress={onDownload}
              >
                Download
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {onUpdate && (
              <Button variant="tertiary" size="sm" onPress={onUpdate}>
                Update
              </Button>
            )}
            {onShare && (
              <Button variant="tertiary" size="sm" isIconOnly onPress={onShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ValuationCard;
