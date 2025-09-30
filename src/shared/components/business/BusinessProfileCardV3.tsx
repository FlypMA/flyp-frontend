/**
 * 🏢 Business Profile Card V3 - Minimal with Badges
 * Variation 3: Ultra-compact with inline badges for stages
 */

import { Edit } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

interface BusinessProfileCardV3Props {
  businessInfo?: BusinessInfo;
  onEdit?: () => void;
  className?: string;
  profileCardData?: any;
  hasValuationReports?: boolean;
  latestValuationReport?: any;
  valuationReports?: any[];
  hasActiveListing?: boolean;
  onCreateValuation?: () => void;
}

const BusinessProfileCardV3: React.FC<BusinessProfileCardV3Props> = ({
  businessInfo,
  onEdit,
  className = '',
  profileCardData,
  hasValuationReports,
  latestValuationReport,
  valuationReports,
  hasActiveListing,
  onCreateValuation,
}) => {
  const navigate = useNavigate();

  if (!businessInfo) return null;

  const getBusinessIcon = (industry: string): string => {
    const iconMap: Record<string, string> = {
      catering: '🍽️',
      chef: '👨‍🍳',
      meals: '🍱',
      restaurant: '🍴',
      hairstyling: '💇‍♀️',
      makeup: '💄',
      massage: '💆‍♀️',
      nailcare: '💅',
      wellness: '🧘‍♀️',
      personaltraining: '💪',
      gym: '🏋️',
      healthcare: '⚕️',
      photography: '📸',
      videography: '🎥',
      design: '🎨',
      marketing: '📱',
      saas: '💻',
      software: '⚙️',
      webdev: '🌐',
      itsupport: '🖥️',
      ecommerce: '🛒',
      retail: '🏪',
      subscription: '📦',
      cleaning: '🧹',
      realestate: '🏡',
      construction: '🔨',
      landscaping: '🌳',
      consulting: '💼',
      legal: '⚖️',
      accounting: '📊',
      hr: '👥',
      education: '📚',
      coaching: '🎯',
      logistics: '🚚',
      automotive: '🚗',
      events: '🎉',
      entertainment: '🎭',
    };
    return iconMap[industry.toLowerCase()] || '🏢';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300">
        {/* Header with badges */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="text-3xl">{getBusinessIcon(businessInfo.industry)}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900">{businessInfo.name}</h2>
              <p className="text-xs text-gray-500">{businessInfo.industry}</p>
            </div>
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{businessInfo.description}</p>

        {/* Inline Badges for Stages */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Metrics badges */}
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
            📅 {businessInfo.foundedYear}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
            👥 {businessInfo.teamSize}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
            📍 {businessInfo.isRemote ? 'Remote' : businessInfo.location}
          </span>

          {/* Divider */}
          <span className="text-gray-300">|</span>

          {/* Valuation Badge */}
          {!hasValuationReports ? (
            <button
              onClick={onCreateValuation}
              className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-primary-100 text-primary-700 hover:bg-primary-200 font-medium transition-colors"
            >
              💰 Get valuation →
            </button>
          ) : (
            latestValuationReport && (
              <button
                onClick={() => navigate('/my-business/valuations')}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-primary-100 text-primary-700 hover:bg-primary-200 font-medium"
              >
                💰 €{(latestValuationReport.businessValue / 1000).toFixed(0)}K
              </button>
            )
          )}

          {/* Profile Badge */}
          {hasValuationReports && !profileCardData ? (
            <button
              onClick={() => navigate('/my-business/profile/create')}
              className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-accent-100 text-accent-700 hover:bg-accent-200 font-medium transition-colors"
            >
              👤 Add profile →
            </button>
          ) : profileCardData ? (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-accent-100 text-accent-700">
              <img
                src={profileCardData.profileImage}
                alt={profileCardData.fullName}
                className="w-4 h-4 rounded-full mr-1.5 object-cover"
              />
              {profileCardData.fullName.split(' ')[0]}
            </span>
          ) : null}

          {/* Listing Badge */}
          {hasActiveListing && (
            <button
              onClick={() => navigate('/my-business/listings')}
              className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-success-100 text-success-700 hover:bg-success-200 font-medium"
            >
              📋 Active listing
            </button>
          )}
        </div>

        {/* Expandable Details (Optional) */}
        {!hasValuationReports && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              💡 <span className="font-medium">Next step:</span> Get a professional valuation to see
              what your business is worth
            </p>
          </div>
        )}
        {hasValuationReports && !profileCardData && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              💡 <span className="font-medium">Next step:</span> Add your profile to build trust
              with buyers
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessProfileCardV3;
