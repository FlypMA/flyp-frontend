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

  // Get business type icon
  const getBusinessIcon = (industry: string): string => {
    const iconMap: Record<string, string> = {
      catering: '🍽️',
      photography: '📸',
      hairstyling: '💇‍♀️',
      chef: '👨‍🍳',
      meals: '🍱',
      makeup: '💄',
      massage: '💆‍♀️',
      nailcare: '💅',
      personaltraining: '💪',
      wellness: '🧘‍♀️',
      cleaning: '🧹',
      consulting: '💼',
    };
    return iconMap[industry.toLowerCase()] || '🏢';
  };

  // Get business type display name
  const getBusinessTypeName = (industry: string): string => {
    const nameMap: Record<string, string> = {
      catering: 'Catering',
      photography: 'Photography',
      hairstyling: 'Hairstyling',
      chef: 'Chef Services',
      meals: 'Meal Services',
      makeup: 'Make-up',
      massage: 'Massage',
      nailcare: 'Nail Care',
      personaltraining: 'Personal Training',
      wellness: 'Wellness Treatments',
      cleaning: 'Cleaning Services',
      consulting: 'Business Consulting',
    };
    return nameMap[industry.toLowerCase()] || industry;
  };

  // Filled State - Based on Prelude Card Design
  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative">
        {/* Edit Button - Top Right */}
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="absolute top-6 right-6 inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Edit business card"
          >
            <Edit className="w-5 h-5" />
          </button>
        )}

        {/* Icon - Centered Large */}
        <div className="text-center">
          <div className="text-8xl mb-6">{getBusinessIcon(businessInfo.industry)}</div>

          {/* Business Name */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{businessInfo.name}</h2>

          {/* Business Type */}
          <p className="text-lg text-gray-600 mb-8">{getBusinessTypeName(businessInfo.industry)}</p>

          {/* Description */}
          <p className="text-base text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            {businessInfo.description}
          </p>

          {/* Metrics Grid - 4 Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {businessInfo.foundedYear}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">{businessInfo.teamSize}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Team Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {businessInfo.isRemote ? 'Remote' : businessInfo.location}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Location</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {businessInfo.status === 'active' ? '✅ Active' : '📝 Draft'}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileCard;
