// 🏢 Prefilled Data Summary
// Location: src/features/phase1/business/listing/listing-service/components/PrefilledDataSummary.tsx
// Purpose: Display summary of prefilled data from business card and valuation
// Note: Shows users what data is already populated from their business card + valuation

import React from 'react';
import type { BusinessCardData } from '../types';

interface PrefilledDataSummaryProps {
  businessCard?: BusinessCardData;
  valuationData?: {
    revenue2025: number;
    revenue2024: number;
    revenue2023: number;
    ebitda2025: number;
    ebitda2024: number;
    ebitda2023: number;
    estimated_value?: number;
  };
  onEdit?: () => void;
}

const PrefilledDataSummary: React.FC<PrefilledDataSummaryProps> = ({
  businessCard,
  valuationData,
  onEdit,
}) => {
  if (!businessCard && !valuationData) {
    return null;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Pre-populated Information</h3>
            <p className="text-sm text-gray-600">
              We've filled in your business details from your profile
            </p>
          </div>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Business Card Data */}
      {businessCard && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            {/* Business Name */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Business Name</div>
              <div className="text-sm font-semibold text-gray-900">{businessCard.name}</div>
            </div>

            {/* Industry */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Industry</div>
              <div className="text-sm font-semibold text-gray-900 capitalize">
                {businessCard.industry.replace('-', ' ')}
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Location</div>
              <div className="text-sm font-semibold text-gray-900">
                {businessCard.isRemote ? (
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Remote
                  </span>
                ) : (
                  businessCard.location
                )}
              </div>
            </div>

            {/* Founded Year */}
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Founded</div>
              <div className="text-sm font-semibold text-gray-900">
                {businessCard.foundedYear} ({businessCard.yearsInBusiness} years)
              </div>
            </div>

            {/* Team Size */}
            {businessCard.teamSize && (
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase mb-1">Team Size</div>
                <div className="text-sm font-semibold text-gray-900">{businessCard.teamSize}</div>
              </div>
            )}

            {/* Website */}
            {businessCard.website && (
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase mb-1">Website</div>
                <a
                  href={businessCard.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {businessCard.website}
                </a>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          {businessCard.keyHighlights && businessCard.keyHighlights.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-medium text-gray-500 uppercase mb-2">Key Highlights</div>
              <div className="flex flex-wrap gap-2">
                {businessCard.keyHighlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Valuation Data */}
      {valuationData && (
        <div className="mt-6 pt-6 border-t border-blue-200">
          <div className="text-xs font-medium text-gray-500 uppercase mb-3">
            Financial Data (from Valuation)
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Revenue */}
            <div>
              <div className="text-xs text-gray-500 mb-1">Revenue (2023-2025)</div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(valuationData.revenue2025)}
                  <span className="text-xs text-gray-500 ml-1">2025</span>
                </div>
                <div className="text-xs text-gray-600">
                  {formatCurrency(valuationData.revenue2024)}
                </div>
                <div className="text-xs text-gray-600">
                  {formatCurrency(valuationData.revenue2023)}
                </div>
              </div>
            </div>

            {/* EBITDA */}
            <div>
              <div className="text-xs text-gray-500 mb-1">EBITDA (2023-2025)</div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(valuationData.ebitda2025)}
                  <span className="text-xs text-gray-500 ml-1">2025</span>
                </div>
                <div className="text-xs text-gray-600">
                  {formatCurrency(valuationData.ebitda2024)}
                </div>
                <div className="text-xs text-gray-600">
                  {formatCurrency(valuationData.ebitda2023)}
                </div>
              </div>
            </div>

            {/* Estimated Value */}
            {valuationData.estimated_value && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Estimated Value</div>
                <div className="text-lg font-bold text-emerald-600">
                  {formatCurrency(valuationData.estimated_value)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-600">
          💡 <span className="font-medium">Good news!</span> Your business information and financial
          data have been automatically populated. You only need to complete the remaining steps
          about your business story, sale details, and preferences.
        </p>
      </div>
    </div>
  );
};

export default PrefilledDataSummary;
