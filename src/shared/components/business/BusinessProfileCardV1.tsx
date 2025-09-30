/**
 * 🏢 Business Profile Card V1 - Compact Horizontal
 * Variation 1: More compact layout with horizontal stage sections
 */

import { Edit, User } from 'lucide-react';
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

interface BusinessProfileCardV1Props {
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

const BusinessProfileCardV1: React.FC<BusinessProfileCardV1Props> = ({
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
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">{getBusinessIcon(businessInfo.industry)}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{businessInfo.name}</h2>
              <p className="text-sm text-gray-600">{businessInfo.industry}</p>
            </div>
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{businessInfo.description}</p>

        {/* Stage Sections - Horizontal Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {/* Valuation */}
          {!hasValuationReports ? (
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Get valuation</p>
                  <p className="text-xs text-gray-600">See your worth</p>
                </div>
              </div>
              <button
                onClick={onCreateValuation}
                className="text-xs text-primary-600 hover:text-primary-800 font-semibold"
              >
                Start →
              </button>
            </div>
          ) : (
            latestValuationReport && (
              <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-900">
                    💰 {valuationReports?.length || 0}{' '}
                    {valuationReports?.length === 1 ? 'report' : 'reports'}
                  </p>
                  <button
                    onClick={() => navigate('/my-business/valuations')}
                    className="text-xs text-primary-600 hover:text-primary-800"
                  >
                    View →
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  €{latestValuationReport.businessValue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">
                  {latestValuationReport.confidence} confidence
                </p>
              </div>
            )
          )}

          {/* Profile */}
          {hasValuationReports && !profileCardData ? (
            <div className="flex items-center justify-between p-3 bg-accent-50 rounded-lg border border-accent-200">
              <div className="flex items-center space-x-2">
                <User className="w-6 h-6 text-accent-600" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">Add profile</p>
                  <p className="text-xs text-gray-600">Build trust</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/my-business/profile/create')}
                className="text-xs text-accent-600 hover:text-accent-800 font-semibold"
              >
                Add →
              </button>
            </div>
          ) : profileCardData ? (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={profileCardData.profileImage}
                alt={profileCardData.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Owned by</p>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {profileCardData.fullName}
                </p>
              </div>
            </div>
          ) : null}

          {/* Listing Status */}
          {hasActiveListing && (
            <div className="p-3 bg-success-50 rounded-lg border border-success-200 md:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📋</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      Listing: <span className="text-success-600">Active</span>
                    </p>
                    <p className="text-xs text-gray-600">234 views • 12 interested</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/my-business/listings')}
                  className="text-xs text-success-600 hover:text-success-800 font-semibold"
                >
                  Manage →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Metrics - Compact */}
        <div className="grid grid-cols-4 gap-3 pt-3 border-t border-gray-200">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{businessInfo.foundedYear}</div>
            <div className="text-xs text-gray-500">Founded</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{businessInfo.teamSize}</div>
            <div className="text-xs text-gray-500">Team</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {businessInfo.isRemote ? 'Remote' : businessInfo.location}
            </div>
            <div className="text-xs text-gray-500">Location</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {businessInfo.status === 'active' ? '✅' : '📝'}
            </div>
            <div className="text-xs text-gray-500">Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileCardV1;
