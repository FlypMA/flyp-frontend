import { Button } from '@/shared/components/buttons';
import { ImageGalleryModal } from '@/shared/components/modals/images';
import InquiryModal from '@/shared/components/modals/InquiryModal';
import { Card, CardBody, CardHeader, Divider, useDisclosure } from '@heroui/react';
import {
    ArrowLeft,
    Building2,
    CheckCircle,
    Eye,
    Heart,
    MapPin,
    MessageSquare,
    Share2,
    Shield,
    TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  useEffect(() => {
    loadListingDetails();
  }, [id]);

  const loadListingDetails = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 100)); // Minimal delay for demo

      // Mock listing data
      setListing({
        id: id,
        title: 'Premium Restaurant Chain - Brussels',
        sector: 'Food & Beverage',
        country: 'BE',
        region: 'Brussels',
        asking_price: 2500000,
        currency: 'EUR',
        summary:
          'Established restaurant chain with 3 locations in prime Brussels areas. Strong customer base, excellent reputation, and significant growth potential in the Belgian market.',
        images: [
          {
            id: '1',
            storage_url:
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
            thumbnail_url:
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            is_primary: true,
            alt_text: 'Premium restaurant interior with elegant dining setup',
          },
          {
            id: '2',
            storage_url:
              'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
            thumbnail_url:
              'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            is_primary: false,
            alt_text: 'Restaurant exterior view',
          },
          {
            id: '3',
            storage_url:
              'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
            thumbnail_url:
              'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            is_primary: false,
            alt_text: 'Delicious gourmet food presentation',
          },
        ],
        description: `This premium restaurant chain represents an exceptional opportunity to acquire a well-established business in the heart of Brussels. With three strategically located restaurants in high-traffic areas, this business has built a loyal customer base over 8 years of operation.

Key highlights:
• Three prime locations in Brussels city center
• Established brand with excellent reputation
• Strong financial performance with consistent growth
• Experienced management team willing to stay post-acquisition
• Modern equipment and recently renovated facilities
• Strong supplier relationships and operational systems

The business specializes in contemporary European cuisine with a focus on local ingredients and seasonal menus. Each location has been carefully selected for maximum visibility and foot traffic, resulting in strong and consistent revenue streams.

This is an ideal acquisition for an investor looking to enter the Belgian food service market or expand an existing hospitality portfolio.`,
        views: 245,
        inquiries: 12,
        published_at: '2024-01-15',
        featured: true,
        anonymous: false,
        requires_nda: true,
        years_in_business: 8,
        revenue_range: '€2M - €5M',
        ebitda_range: '€400K - €800K',
        employees: 45,
        financials: {
          revenue_2023: 4200000,
          revenue_2022: 3800000,
          revenue_2021: 3200000,
          ebitda_2023: 756000,
          ebitda_2022: 684000,
          ebitda_2021: 576000,
          ebitda_margin: 18,
          growth_rate: 12,
        },
        highlights: [
          'Prime Brussels locations',
          'Established brand reputation',
          'Experienced management team',
          'Modern equipment & facilities',
          'Strong supplier relationships',
        ],
        seller_info: {
          reason_for_sale: 'Retirement',
          timeline: '3-6 months',
          involvement_post_sale: 'Transition support available',
        },
      });
    } catch (error) {
      // console.error('Error loading listing details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleImageClick = (imageIndex: number) => {
    setInitialImageIndex(imageIndex);
    setIsImageGalleryOpen(true);
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6 text-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  // Show not found only after loading is complete and no listing found
  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6 text-center pt-20">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Listing not found</h2>
          <p className="text-gray-600 mb-6">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onPress={() => navigate('/search')}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const primaryImage = listing.images?.find(img => img.is_primary) || listing.images?.[0];
  const additionalImages = listing.images?.filter(img => img.id !== primaryImage?.id) || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="tertiary"
            startContent={
              <ArrowLeft className="w-4 h-4" style={{ stroke: 'currentColor', fill: 'none' }} />
            }
            onPress={() => navigate(-1)}
            className="mb-6 text-neutral-600 hover:text-neutral-900"
          >
            Back to Search
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">{listing.title}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" style={{ stroke: 'currentColor', fill: 'none' }} />
                  <span className="font-medium">{listing.sector}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ stroke: 'currentColor', fill: 'none' }} />
                  <span>
                    {listing.region}, {listing.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" style={{ stroke: 'currentColor', fill: 'none' }} />
                  <span>{listing.views} views</span>
                </div>
              </div>

              {/* M&A Funnel Progress */}
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                <div className="flex items-center justify-between max-w-2xl">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mb-1">
                      <CheckCircle
                        className="w-4 h-4 text-white"
                        style={{ stroke: '#ffffff', fill: 'none', strokeWidth: '2.5' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary-600">Found</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-primary-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mb-1">
                      <MessageSquare
                        className="w-4 h-4 text-white"
                        style={{ stroke: '#ffffff', fill: 'none', strokeWidth: '2.5' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary-600">Inquire</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-neutral-300 mx-2"></div>
                  <div className="flex flex-col items-center opacity-50">
                    <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center mb-1">
                      <Shield
                        className="w-4 h-4 text-neutral-600"
                        style={{ stroke: 'currentColor', fill: 'none', strokeWidth: '2' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-neutral-600">NDA</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-neutral-300 mx-2"></div>
                  <div className="flex flex-col items-center opacity-50">
                    <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center mb-1">
                      <Building2
                        className="w-4 h-4 text-neutral-600"
                        style={{ stroke: 'currentColor', fill: 'none', strokeWidth: '2' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-neutral-600">Close</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-64">
              <Button
                variant="tertiary"
                startContent={
                  <Heart className="w-4 h-4" style={{ stroke: 'currentColor', fill: 'none' }} />
                }
                className="border-2 border-neutral-300 hover:border-neutral-400"
              >
                Save Listing
              </Button>
              <Button
                variant="tertiary"
                startContent={
                  <Share2 className="w-4 h-4" style={{ stroke: 'currentColor', fill: 'none' }} />
                }
                className="border-2 border-neutral-300 hover:border-neutral-400"
              >
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Airbnb-Style Image Gallery Section */}
        {(primaryImage || additionalImages.length > 0) && (
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-2 h-[400px] md:h-[480px] rounded-xl overflow-hidden">
              {/* Large primary image - takes up 2 columns */}
              {primaryImage && (
                <div
                  className="col-span-4 md:col-span-2 relative cursor-pointer group"
                  onClick={() => handleImageClick(0)}
                >
                  <img
                    src={primaryImage.storage_url}
                    alt={primaryImage.alt_text || `${listing.title} main image`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}

              {/* Right side grid - smaller images */}
              <div className="col-span-4 md:col-span-2 grid grid-cols-2 gap-2">
                {additionalImages.slice(0, 4).map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative cursor-pointer group overflow-hidden ${
                      index === 1 ? 'row-span-1' : ''
                    }`}
                    onClick={() => handleImageClick(index + 1)}
                  >
                    <img
                      src={image.thumbnail_url || image.storage_url}
                      alt={image.alt_text || `${listing.title} photo ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                    {/* Show all photos overlay on last image if there are more */}
                    {index === 3 && additionalImages.length > 4 && (
                      <div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60"
                        onClick={e => {
                          e.stopPropagation();
                          handleImageClick(0);
                        }}
                      >
                        <div className="text-center text-white">
                          <svg
                            className="w-8 h-8 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                          </svg>
                          <div className="text-sm font-semibold">
                            +{additionalImages.length - 3} photos
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Fill empty slots if we have fewer than 4 additional images */}
                {additionalImages.length < 4 &&
                  Array.from({ length: 4 - additionalImages.length }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="bg-gray-100 flex items-center justify-center"
                    >
                      <div className="text-gray-400">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Show all photos button - mobile/tablet view */}
            <div className="mt-4 md:hidden flex justify-center">
              <button
                onClick={() => handleImageClick(0)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  View all {(listing.images || []).length} photos
                </span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mobile Price & Contact - Shown first on mobile */}
          <div className="lg:hidden order-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Asking Price</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-primary-600">
                    {formatPrice(listing.asking_price, listing.currency)}
                  </p>
                  <p className="text-sm text-neutral-600">Negotiable</p>
                </div>

                {/* Contact Seller CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  onPress={onOpen}
                  className="w-full"
                  startContent={
                    <MessageSquare
                      className="w-5 h-5"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  }
                >
                  Contact Seller
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 order-2">
            {/* Key Information */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Business Overview</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary-600">
                      {listing.years_in_business}
                    </p>
                    <p className="text-sm text-neutral-600">Years in Business</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-success-600">{listing.employees}</p>
                    <p className="text-sm text-neutral-600">Employees</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-warning-600">
                      {listing.financials.ebitda_margin}%
                    </p>
                    <p className="text-sm text-neutral-600">EBITDA Margin</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary-700">
                      {listing.financials.growth_rate}%
                    </p>
                    <p className="text-sm text-neutral-600">Growth Rate</p>
                  </div>
                </div>

                <Divider className="my-4" />

                <div>
                  <h3 className="font-semibold mb-3">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {listing.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Business Description</h2>
              </CardHeader>
              <CardBody>
                <div className="prose prose-gray max-w-none">
                  {listing.description.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Financial Information */}
            <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-200 rounded-3xl shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-2xl font-bold text-slate-900">Financial Overview</h2>
                  {listing.requires_nda && (
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700 text-sm font-medium whitespace-nowrap">
                      <Shield
                        className="w-3 h-3 flex-shrink-0"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                      <span>NDA Required</span>
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">Revenue 2023</p>
                      <TrendingUp
                        className="w-4 h-4 text-green-600"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.revenue_2023)}
                    </p>
                    <p className="text-xs text-green-600 font-medium mt-1">+10.5% YoY</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">EBITDA 2023</p>
                      <TrendingUp
                        className="w-4 h-4 text-green-600"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.ebitda_2023)}
                    </p>
                    <p className="text-xs text-green-600 font-medium mt-1">+10.5% YoY</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">Revenue 2022</p>
                      <TrendingUp
                        className="w-4 h-4 text-blue-600"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.revenue_2022)}
                    </p>
                    <p className="text-xs text-blue-600 font-medium mt-1">+18.8% YoY</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">EBITDA 2022</p>
                      <TrendingUp
                        className="w-4 h-4 text-blue-600"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.ebitda_2022)}
                    </p>
                    <p className="text-xs text-blue-600 font-medium mt-1">+18.8% YoY</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">Revenue 2021</p>
                      <TrendingUp
                        className="w-4 h-4 text-slate-600"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.revenue_2021)}
                    </p>
                    <p className="text-xs text-slate-600 font-medium mt-1">Base year</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">EBITDA 2021</p>
                      <TrendingUp
                        className="w-4 h-4 text-slate-600"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.ebitda_2021)}
                    </p>
                    <p className="text-xs text-slate-600 font-medium mt-1">Base year</p>
                  </div>
                </div>

                {listing.requires_nda && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 rounded-full p-2 mt-0.5">
                        <Shield
                          className="w-5 h-5 text-amber-600"
                          style={{ stroke: 'currentColor', fill: 'none' }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-amber-900 mb-2">
                          Confidential Financial Data
                        </h4>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          Detailed financial statements, cash flow analysis, and sensitive business
                          metrics are available to qualified buyers after NDA execution. This
                          includes P&L statements, balance sheets, and growth projections.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 order-3">
            {/* Price & Contact - Desktop Only */}
            <Card className="hidden lg:block">
              <CardHeader>
                <h3 className="text-lg font-semibold">Asking Price</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-primary-600">
                    {formatPrice(listing.asking_price, listing.currency)}
                  </p>
                  <p className="text-sm text-neutral-600">Negotiable</p>
                </div>

                {/* Contact Seller CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  onPress={onOpen}
                  className="w-full"
                  startContent={
                    <MessageSquare
                      className="w-5 h-5"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  }
                >
                  Contact Seller
                </Button>
              </CardBody>
            </Card>

            {/* Sale Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Sale Information</h3>
              </CardHeader>
              <CardBody className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Reason for Sale</p>
                  <p className="font-medium">{listing.seller_info.reason_for_sale}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Preferred Timeline</p>
                  <p className="font-medium">{listing.seller_info.timeline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Post-Sale Involvement</p>
                  <p className="font-medium">{listing.seller_info.involvement_post_sale}</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Image Gallery Modal */}
        <ImageGalleryModal
          isOpen={isImageGalleryOpen}
          onClose={() => setIsImageGalleryOpen(false)}
          images={listing.images || []}
          initialImageIndex={initialImageIndex}
        />

        {/* Inquiry Modal */}
        <InquiryModal
          isOpen={isOpen}
          onClose={() => onOpenChange()}
          listing={{
            id: listing.id,
            title: listing.title,
            sector: listing.sector,
            asking_price: listing.asking_price,
            currency: listing.currency,
            requires_nda: listing.requires_nda,
          }}
          onSubmit={inquiryData => {
            // console.log('Inquiry submitted:', inquiryData);
            // TODO: Implement actual inquiry submission
            onOpenChange();
          }}
        />
      </div>
    </div>
  );
};

export default ListingDetails;
