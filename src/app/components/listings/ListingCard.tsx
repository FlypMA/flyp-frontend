import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Button,
  Tooltip,
} from '@heroui/react';
import {
  Building2,
  MapPin,
  Eye,
  Heart,
  MessageSquare,
  Calendar,
  Users,
  TrendingUp,
  Shield,
} from 'lucide-react';
import InquiryModal from '../inquiries/InquiryModal';

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    sector: string;
    country: string;
    region?: string;
    asking_price?: number;
    currency: string;
    summary: string;
    views: number;
    inquiries: number;
    published_at: string;
    featured: boolean;
    anonymous: boolean;
    requires_nda: boolean;
    status: string;
    revenue_range?: {
      min?: number;
      max?: number;
    };
    ebitda_range?: {
      min?: number;
      max?: number;
    };
    employee_count?: number;
    business_age?: number;
    highlights?: string[];
    images?: {
      id: string;
      storage_url: string;
      thumbnail_url: string;
      is_primary: boolean;
      alt_text?: string;
    }[];
    organization?: {
      name: string;
      verified: boolean;
    };
  };
  currentUserRole?: 'buyer' | 'seller' | 'admin';
  onSave?: (listingId: string) => void;
  onInquiry?: (listingId: string, inquiryData: any) => Promise<void>;
  isSaved?: boolean;
  viewMode?: 'card' | 'list';
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUserRole,
  onSave,
  onInquiry,
  isSaved = false,
  viewMode = 'card',
}) => {
  const navigate = useNavigate();
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatRange = (range?: { min?: number; max?: number }, currency = 'EUR') => {
    if (!range || (!range.min && !range.max)) return 'Not disclosed';
    if (range.min && range.max) {
      return `${formatPrice(range.min, currency)} - ${formatPrice(range.max, currency)}`;
    }
    if (range.min) return `${formatPrice(range.min, currency)}+`;
    if (range.max) return `Up to ${formatPrice(range.max, currency)}`;
    return 'Not disclosed';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const handleSave = async () => {
    if (onSave) {
      setIsProcessing(true);
      try {
        await onSave(listing.id);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleInquiry = async (inquiryData: any) => {
    if (onInquiry) {
      await onInquiry(listing.id, inquiryData);
      setShowInquiryModal(false);
    }
  };

  const handleViewDetails = () => {
    navigate(`/listings/${listing.id}`);
  };

  const canMakeInquiry = currentUserRole === 'buyer';
  const canSave = currentUserRole === 'buyer';

  if (viewMode === 'list') {
    return (
      <>
        <Card
          className="group bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
          isPressable
          onPress={handleViewDetails}
        >
          <CardBody className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-xl text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {listing.anonymous ? 'Anonymous Business Listing' : listing.title}
                      </h3>
                      {listing.organization?.verified && (
                        <Tooltip content="Verified business">
                          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-gray-700">
                            <Shield className="w-3 h-3" />
                            <span className="text-xs font-medium">Verified</span>
                          </div>
                        </Tooltip>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                        <Building2 className="w-3 h-3" />
                        <span className="font-medium">{listing.sector}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {listing.country}
                          {listing.region && `, ${listing.region}`}
                        </span>
                      </div>
                      {listing.employee_count && (
                        <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                          <Users className="w-3 h-3" />
                          <span>{listing.employee_count} employees</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                        <Calendar className="w-3 h-3" />
                        <span>{getTimeAgo(listing.published_at)}</span>
                      </div>
                    </div>

                    <p className="text-slate-700 line-clamp-2 mb-4 leading-relaxed text-base">
                      {listing.summary}
                    </p>

                    {listing.highlights && listing.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {listing.highlights.slice(0, 3).map((highlight, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col items-end gap-4 ml-6">
                    <div className="text-right bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200">
                      <p className="text-2xl font-bold text-green-600">
                        {formatPrice(listing.asking_price, listing.currency)}
                      </p>
                      {listing.revenue_range && (
                        <p className="text-sm text-slate-600 mt-1">
                          Revenue: {formatRange(listing.revenue_range, listing.currency)}
                        </p>
                      )}
                      {listing.ebitda_range && (
                        <p className="text-sm text-slate-600 mt-1">
                          EBITDA: {formatRange(listing.ebitda_range, listing.currency)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">{listing.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-medium">{listing.inquiries}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {canSave && (
                        <Button
                          isIconOnly
                          size="sm"
                          variant={isSaved ? 'solid' : 'light'}
                          color={isSaved ? 'danger' : 'default'}
                          onPress={handleSave}
                          isLoading={isProcessing}
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 transform hover:scale-110"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </Button>
                      )}
                      {canMakeInquiry && (
                        <Button
                          size="sm"
                          color="primary"
                          onPress={() => setShowInquiryModal(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
                          startContent={<MessageSquare className="w-4 h-4" />}
                        >
                          Contact Seller
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Warning badges */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                  {listing.requires_nda && (
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs font-medium">
                      <Shield className="w-3 h-3" />
                      NDA Required
                    </span>
                  )}
                  {listing.anonymous && (
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs font-medium">
                      Anonymous Listing
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Inquiry Modal */}
        {showInquiryModal && (
          <InquiryModal
            isOpen={showInquiryModal}
            onClose={() => setShowInquiryModal(false)}
            listing={{
              id: listing.id,
              title: listing.title,
              sector: listing.sector,
              country: listing.country,
              asking_price: listing.asking_price,
              currency: listing.currency,
              requires_nda: listing.requires_nda,
              anonymous: listing.anonymous,
            }}
            onSubmit={handleInquiry}
          />
        )}
      </>
    );
  }

  // Get primary image or first image
  const primaryImage = listing.images?.find(img => img.is_primary) || listing.images?.[0];

  // Stock photo fallbacks by sector
  const getSectorPlaceholder = (sector: string) => {
    const sectorMap: Record<string, string> = {
      'Food & Beverage':
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      Technology:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      Retail:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      Manufacturing:
        'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      Healthcare:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'Professional Services':
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    };
    return (
      sectorMap[sector] ||
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
    );
  };

  const imageUrl = primaryImage?.storage_url || getSectorPlaceholder(listing.sector);

  // Card view (default)
  return (
    <>
      <Card
        className="group bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-500 h-full transform hover:-translate-y-2 cursor-pointer"
        isPressable
        onPress={handleViewDetails}
      >
        <CardBody className="p-0">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-t-3xl aspect-[16/10] mb-6">
            <img
              src={imageUrl}
              alt={primaryImage?.alt_text || `${listing.title} business image`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Favorite button overlay */}
            {canSave && (
              <div className="absolute top-4 right-4">
                <Button
                  isIconOnly
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  onPress={() => {
                    handleSave();
                  }}
                  isLoading={isProcessing}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            )}

            {/* Featured badge */}
            {listing.featured && (
              <div className="absolute top-4 left-4">
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  FEATURED
                </div>
              </div>
            )}
          </div>

          <div className="px-8 pb-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  {listing.organization?.verified && (
                    <Tooltip content="Verified business">
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-gray-700">
                        <Shield className="w-3 h-3" />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    </Tooltip>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-xl line-clamp-2 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                  {listing.anonymous ? 'Confidential Business' : listing.title}
                </h3>

                <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full min-w-0 flex-shrink-0">
                    <Building2 className="w-3 h-3 flex-shrink-0" />
                    <span className="font-medium text-slate-700 truncate">{listing.sector}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full min-w-0 flex-shrink-0">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-700 truncate whitespace-nowrap">
                      {listing.country}
                      {listing.region && `, ${listing.region}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {/* Summary */}
              <p className="text-slate-700 line-clamp-3 leading-relaxed text-base">
                {listing.summary}
              </p>

              {/* Highlights */}
              {listing.highlights && listing.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {listing.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-lg text-gray-700 text-xs font-medium whitespace-nowrap"
                    >
                      <Shield className="w-3 h-3 flex-shrink-0" />
                      <span>{highlight}</span>
                    </span>
                  ))}
                  {listing.business_age && (
                    <span className="inline-flex items-center bg-gray-100 px-2.5 py-1.5 rounded-lg text-gray-700 text-xs font-medium whitespace-nowrap">
                      <span>{listing.business_age} years</span>
                    </span>
                  )}
                </div>
              )}

              {/* Financial Info */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-green-600 text-2xl">
                      {formatPrice(listing.asking_price, listing.currency)}
                    </p>
                    {listing.revenue_range && (
                      <p className="text-sm text-slate-600 mt-1">
                        Revenue:{' '}
                        {typeof listing.revenue_range === 'string'
                          ? listing.revenue_range
                          : formatRange(listing.revenue_range, listing.currency)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{listing.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{listing.inquiries}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
          listing={{
            id: listing.id,
            title: listing.title,
            sector: listing.sector,
            country: listing.country,
            asking_price: listing.asking_price,
            currency: listing.currency,
            requires_nda: listing.requires_nda,
            anonymous: listing.anonymous,
          }}
          onSubmit={handleInquiry}
        />
      )}
    </>
  );
};

export default ListingCard;
