/**
 * 🏢 Business Profile Card V4 - Airbnb Card Style
 * Variation 4: Simple square card with icon overlays and tooltips
 * Inspired by Airbnb listing cards - minimal, visual, interactive
 */

import { Edit } from 'lucide-react';
import React, { useState } from 'react';
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

interface BusinessProfileCardV4Props {
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

const BusinessProfileCardV4: React.FC<BusinessProfileCardV4Props> = ({
  businessInfo,
  onEdit,
  className = '',
  profileCardData,
  hasValuationReports,
  latestValuationReport,
  hasActiveListing,
  onCreateValuation,
}) => {
  const navigate = useNavigate();
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

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
    <div className={`w-full max-w-sm ${className}`}>
      {/* Card Container - Square aspect ratio */}
      <div className="relative group cursor-pointer">
        {/* Main Card - Square with gradient background */}
        <div
          className="relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          }}
        >
          {/* Edit Button - Bottom Right (on hover) */}
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 hover:bg-white"
            >
              <Edit className="w-4 h-4 text-gray-700" />
            </button>
          )}

          {/* Badge Overlays - Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {/* Valuation Badge */}
            {!hasValuationReports ? (
              <div className="relative">
                <button
                  onClick={onCreateValuation}
                  onMouseEnter={() => setHoveredBadge('valuation')}
                  onMouseLeave={() => setHoveredBadge(null)}
                  className="w-10 h-10 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <span className="text-xl">💰</span>
                </button>
                {hoveredBadge === 'valuation' && (
                  <div className="absolute left-12 top-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Get valuation
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </div>
            ) : (
              latestValuationReport && (
                <div className="relative">
                  <button
                    onClick={() => navigate('/my-business/valuations')}
                    onMouseEnter={() => setHoveredBadge('valuation-complete')}
                    onMouseLeave={() => setHoveredBadge(null)}
                    className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-xl">💰</span>
                  </button>
                  {hoveredBadge === 'valuation-complete' && (
                    <div className="absolute left-12 top-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg z-20">
                      €{(latestValuationReport.businessValue / 1000).toFixed(0)}K
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              )
            )}

            {/* Profile Badge */}
            {hasValuationReports && !profileCardData ? (
              <div className="relative">
                <button
                  onClick={() => navigate('/my-business/profile/create')}
                  onMouseEnter={() => setHoveredBadge('profile')}
                  onMouseLeave={() => setHoveredBadge(null)}
                  className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 border-2 border-primary-500"
                >
                  <span className="text-xl">👤</span>
                </button>
                {hoveredBadge === 'profile' && (
                  <div className="absolute left-12 top-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Add profile
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Listing Badge */}
            {hasActiveListing && (
              <div className="relative">
                <button
                  onClick={() => navigate('/my-business/listings')}
                  onMouseEnter={() => setHoveredBadge('listing')}
                  onMouseLeave={() => setHoveredBadge(null)}
                  className="w-10 h-10 bg-success-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-xl">📋</span>
                </button>
                {hoveredBadge === 'listing' && (
                  <div className="absolute left-12 top-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg z-20">
                    Active listing
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Owner Avatar - Top Right (if profile exists) */}
          {profileCardData && (
            <div className="absolute top-3 right-3 z-10">
              <div className="relative">
                <img
                  src={profileCardData.profileImage}
                  alt={profileCardData.fullName}
                  onMouseEnter={() => setHoveredBadge('owner')}
                  onMouseLeave={() => setHoveredBadge(null)}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover cursor-pointer"
                />
                {hoveredBadge === 'owner' && (
                  <div className="absolute right-0 top-14 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg z-20">
                    Owned by {profileCardData.fullName}
                    <div className="absolute right-3 top-0 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Center Content - Business Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-9xl mb-4 drop-shadow-lg">
                {getBusinessIcon(businessInfo.industry)}
              </div>
            </div>
          </div>

          {/* Bottom Overlay - Business Name */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-5 px-5">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                {businessInfo.name}
              </h3>
              <p className="text-sm text-white/90">{businessInfo.industry}</p>
            </div>
          </div>
        </div>

        {/* Compact Info Below Card */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span>📅 {businessInfo.foundedYear}</span>
            <span>•</span>
            <span>👥 {businessInfo.teamSize}</span>
          </div>
          <div className="text-gray-600">
            📍 {businessInfo.isRemote ? 'Remote' : businessInfo.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileCardV4;
