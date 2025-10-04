/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { Calendar, Download, Eye, Rocket, Share2 } from 'lucide-react';
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
  onCreateListing?: () => void;
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
  onCreateListing,
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
    <div
      className={`relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Background visual element */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30"></div>

      {/* Content container */}
      <div className="relative w-full h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center space-x-2">
            {onView && (
              <button
                type="button"
                onClick={onView}
                className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-3 py-2 text-sm h-8 rounded-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
            )}
            {onDownload && (
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-3 py-2 text-sm h-8 rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {onCreateListing && (
              <button
                type="button"
                onClick={onCreateListing}
                className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:ring-primary-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-4 py-2 text-sm h-9 rounded-lg"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Create Listing
              </button>
            )}
            {onUpdate && (
              <button
                type="button"
                onClick={onUpdate}
                className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-3 py-2 text-sm h-8 rounded-lg"
              >
                Update
              </button>
            )}
            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] w-8 h-8 rounded-lg"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationCard;
