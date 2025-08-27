import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Button,
  Chip,
  Avatar,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import {
  Building2,
  MapPin,
  Euro,
  Eye,
  Heart,
  MessageSquare,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  Star,
  AlertTriangle,
  Info,
  ExternalLink,
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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

  // Card view (default)
  return (
    <>
      <Card className="group bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-500 h-full transform hover:-translate-y-2">
        <CardBody className="p-8">
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

              <h3 className="font-bold text-xl text-slate-900 line-clamp-2 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {listing.anonymous ? 'Anonymous Business Listing' : listing.title}
              </h3>

              <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                  <Building2 className="w-3 h-3" />
                  <span className="font-medium">{listing.sector}</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                  <MapPin className="w-3 h-3" />
                  <span>{listing.country}</span>
                </div>
              </div>
            </div>

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
          </div>

          {/* Summary */}
          <p className="text-slate-700 line-clamp-3 mb-6 leading-relaxed text-base">
            {listing.summary}
          </p>

          {/* Highlights */}
          {listing.highlights && listing.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {listing.highlights.slice(0, 2).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs font-medium"
                >
                  {highlight}
                </span>
              ))}
              {listing.highlights.length > 2 && (
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs font-medium">
                  +{listing.highlights.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Financial Info */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Asking Price:</span>
                <span className="font-bold text-green-600 text-lg">
                  {formatPrice(listing.asking_price, listing.currency)}
                </span>
              </div>

              {listing.revenue_range && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Revenue:</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {formatRange(listing.revenue_range, listing.currency)}
                  </span>
                </div>
              )}

              {listing.ebitda_range && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">EBITDA:</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {formatRange(listing.ebitda_range, listing.currency)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{listing.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">{listing.inquiries}</span>
              </div>
              <span className="font-medium">{getTimeAgo(listing.published_at)}</span>
            </div>
          </div>

          {/* Warning badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {listing.requires_nda && (
              <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs font-medium">
                <Shield className="w-3 h-3" />
                NDA Required
              </span>
            )}
            {listing.anonymous && (
              <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs font-medium">
                Anonymous
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="bordered"
              onPress={handleViewDetails}
              className="flex-1 border-2 border-slate-300 hover:border-slate-400 hover:shadow-md rounded-2xl font-semibold transition-all duration-300"
            >
              View Details
            </Button>
            {canMakeInquiry && (
              <Button
                color="primary"
                onPress={() => setShowInquiryModal(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
                startContent={<MessageSquare className="w-4 h-4" />}
              >
                Contact Seller
              </Button>
            )}
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
