// 🏢 ListingCard - Professional business listing card
// Location: src/features/search/components/ListingCard.tsx
// Purpose: Clean listing card component matching legacy design

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip, Button } from '@heroui/react';
import {
  MapPin,
  Eye,
  Heart,
  Building2,
  TrendingUp,
  Shield,
  MessageSquare,
  Users,
  Calendar,
  Star,
} from 'lucide-react';

interface ListingImage {
  id: string;
  storage_url: string;
  thumbnail_url: string;
  is_primary: boolean;
  alt_text?: string;
}

interface Listing {
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
  years_in_business?: number;
  business_age?: number;
  revenue_range?: string | { min?: number; max?: number };
  ebitda_range?: string | { min?: number; max?: number };
  highlights?: string[];
  images?: ListingImage[];
  status: string;
  employees?: number;
}

interface ListingCardProps {
  listing: Listing;
  currentUserRole?: 'buyer' | 'seller';
  viewMode?: 'card' | 'list';
  onSave?: (listingId: string) => void;
  onInquiry?: (listingId: string, inquiryData: any) => Promise<void>;
  className?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUserRole = 'buyer',
  viewMode = 'card',
  onSave,
  onInquiry,
  className = '',
}) => {
  const navigate = useNavigate();

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-EU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCardClick = () => {
    navigate(`/listings/${listing.id}`);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave(listing.id);
    }
  };

  const handleInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInquiry) {
      onInquiry(listing.id, {
        listingId: listing.id,
        message: 'I am interested in learning more about this business opportunity.',
      });
    }
  };

  const primaryImage = listing.images?.find(img => img.is_primary) || listing.images?.[0];

  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-neutral-200 rounded-2xl overflow-hidden ${className}`}
      isPressable
      onPress={handleCardClick}
    >
      {/* Image Section */}
      {primaryImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={primaryImage.thumbnail_url || primaryImage.storage_url}
            alt={primaryImage.alt_text || listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Overlays */}
          <div className="absolute top-3 left-3 flex gap-2">
            {listing.featured && (
              <Chip
                size="sm"
                className="bg-yellow-100 text-yellow-800 font-medium"
                startContent={<Star className="w-3 h-3" />}
              >
                Featured
              </Chip>
            )}
            {listing.anonymous && (
              <Chip size="sm" className="bg-gray-100 text-gray-700 font-medium">
                Confidential
              </Chip>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <button
              onClick={handleSave}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="font-bold text-blue-600 text-lg">
                {formatPrice(listing.asking_price, listing.currency)}
              </span>
            </div>
          </div>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="w-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {listing.title}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{listing.sector}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>
                {listing.region}, {listing.country}
              </span>
            </div>
          </div>

          {!primaryImage && listing.asking_price && (
            <div className="mb-3">
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(listing.asking_price, listing.currency)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody className="pt-0">
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">{listing.summary}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {listing.years_in_business && (
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{listing.years_in_business}</div>
              <div className="text-xs text-gray-500">Years</div>
            </div>
          )}
          {listing.employees && (
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{listing.employees}</div>
              <div className="text-xs text-gray-500">Employees</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">{listing.views}</div>
            <div className="text-xs text-gray-500">Views</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.requires_nda && (
            <Chip
              size="sm"
              className="bg-orange-100 text-orange-800"
              startContent={<Shield className="w-3 h-3" />}
            >
              NDA Required
            </Chip>
          )}
          {typeof listing.revenue_range === 'string' && (
            <Chip size="sm" className="bg-green-100 text-green-800">
              {listing.revenue_range}
            </Chip>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="bordered"
            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
            startContent={<Eye className="w-4 h-4" />}
            onPress={handleCardClick}
          >
            View Details
          </Button>
          <Button
            size="sm"
            color="primary"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            startContent={<MessageSquare className="w-4 h-4" />}
            onPress={handleInquiry}
          >
            Inquire
          </Button>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Listed {formatDate(listing.published_at)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MessageSquare className="w-3 h-3" />
            <span>{listing.inquiries} inquiries</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ListingCard;
