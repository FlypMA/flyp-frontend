/**
 * 🏢 Business Profile Card V2 - Sidebar Layout
 * Variation 2: Split layout with business info on left, stages on right
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

interface BusinessProfileCardV2Props {
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

const BusinessProfileCardV2: React.FC<BusinessProfileCardV2Props> = ({
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
      <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left: Business Info (2/3 width) */}
          <div className="md:col-span-2 p-6 border-r border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{getBusinessIcon(businessInfo.industry)}</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{businessInfo.name}</h2>
                  <p className="text-sm text-gray-600">{businessInfo.industry}</p>
                </div>
              </div>
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">{businessInfo.description}</p>

            {/* Metrics Row */}
            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="font-semibold text-gray-900">{businessInfo.foundedYear}</span>
                <span className="text-gray-500 ml-1">Founded</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">{businessInfo.teamSize}</span>
                <span className="text-gray-500 ml-1">Team</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  {businessInfo.isRemote ? 'Remote' : businessInfo.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Stage Progress Sidebar (1/3 width) */}
          <div className="md:col-span-1 bg-gray-50 p-4 space-y-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Progress
            </h3>

            {/* Valuation */}
            {!hasValuationReports ? (
              <div className="bg-white p-3 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">💰</span>
                  <button
                    onClick={onCreateValuation}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Start →
                  </button>
                </div>
                <p className="text-xs font-semibold text-gray-900">Get Valuation</p>
                <p className="text-xs text-gray-500">See your worth</p>
              </div>
            ) : (
              latestValuationReport && (
                <div className="bg-primary-50 p-3 rounded-lg border border-primary-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">💰</span>
                    <button
                      onClick={() => navigate('/my-business/valuations')}
                      className="text-xs text-primary-600 hover:text-primary-800"
                    >
                      View
                    </button>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    €{(latestValuationReport.businessValue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-600">
                    {valuationReports?.length}{' '}
                    {valuationReports?.length === 1 ? 'report' : 'reports'}
                  </p>
                </div>
              )
            )}

            {/* Profile */}
            {hasValuationReports && !profileCardData ? (
              <div className="bg-white p-3 rounded-lg border border-purple-200 hover:border-purple-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <User className="w-5 h-5 text-purple-600" />
                  <button
                    onClick={() => navigate('/my-business/profile/create')}
                    className="text-xs text-accent-600 hover:text-accent-800 font-semibold"
                  >
                    Add →
                  </button>
                </div>
                <p className="text-xs font-semibold text-gray-900">Add Profile</p>
                <p className="text-xs text-gray-500">Build trust</p>
              </div>
            ) : profileCardData ? (
              <div className="bg-accent-50 p-3 rounded-lg border border-accent-200">
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={profileCardData.profileImage}
                    alt={profileCardData.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {profileCardData.fullName}
                    </p>
                    <p className="text-xs text-gray-600">Owner</p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Listing */}
            {hasActiveListing && (
              <div className="bg-success-50 p-3 rounded-lg border border-success-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">📋</span>
                  <button
                    onClick={() => navigate('/my-business/listings')}
                    className="text-xs text-success-600 hover:text-success-800"
                  >
                    Manage
                  </button>
                </div>
                <p className="text-xs font-semibold text-success-700">Active Listing</p>
                <p className="text-xs text-gray-600">234 views</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileCardV2;
