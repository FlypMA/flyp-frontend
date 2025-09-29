/**
 * 🏢 Business Profile Card Component
 * Location: src/shared/components/business/BusinessProfileCard.tsx
 * Purpose: Reusable business profile display with empty and filled states
 *
 * Features:
 * - Empty state with call-to-action to fill business info
 * - Filled state with business details and metrics
 * - Professional card design with hover effects
 * - Responsive layout for different screen sizes
 */

import { Edit, Plus } from 'lucide-react';
import React from 'react';

interface BusinessInfo {
  name: string;
  industry: string;
  description: string;
  foundedYear: number;
  teamSize: string;
  revenue: number;
  location: string;
  isRemote: boolean;
  status?: 'active' | 'inactive' | 'draft';
}

interface BusinessProfileCardProps {
  businessInfo?: BusinessInfo;
  onEdit?: () => void;
  onAddInfo?: () => void;
  className?: string;
}

const BusinessProfileCard: React.FC<BusinessProfileCardProps> = ({
  businessInfo,
  onEdit,
  onAddInfo,
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

  if (!businessInfo) {
    // Empty State - Airbnb Style
    return (
      <div
        className={`relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
      >
        {/* Background visual element */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-50"></div>

        {/* Content container */}
        <div className="relative w-full h-full flex flex-col p-6">
          {/* Spacer for visual balance */}
          <div className="flex-1"></div>

          {/* Main content area */}
          <div className="text-center flex-1 flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Complete Your Business Profile
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm flex-1">
              Add your business information to get started.
            </p>

            {/* CTA Button - Airbnb style */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onAddInfo}
                className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:ring-primary-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-4 py-2 text-sm h-9 rounded-lg"
                style={
                  {
                    '--dls-button-or-anchor-width-px': '166.9375',
                    '--dls-button-or-anchor-height-px': '40',
                  } as React.CSSProperties
                }
              >
                <span className="flex items-center justify-center opacity-100">
                  <span className="mr-2">
                    <Edit className="w-4 h-4" />
                  </span>
                  Add Information
                </span>
              </button>
            </div>
          </div>

          {/* Bottom spacer */}
          <div className="flex-1"></div>
        </div>
      </div>
    );
  }

  // Filled State - Airbnb Style
  return (
    <div
      className={`relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Background visual element */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-30"></div>

      {/* Content container */}
      <div className="relative w-full h-full flex flex-col p-6">
        {/* Header with edit button */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{businessInfo.name}</h2>
            <p className="text-gray-500 text-sm">{businessInfo.industry}</p>
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
          {businessInfo.description}
        </p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {businessInfo.foundedYear}
            </div>
            <div className="text-xs text-gray-500">Founded</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">{businessInfo.teamSize}</div>
            <div className="text-xs text-gray-500">Team Size</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {formatCurrency(businessInfo.revenue)}
            </div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {businessInfo.isRemote ? 'Remote' : businessInfo.location}
            </div>
            <div className="text-xs text-gray-500">Location</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileCard;
