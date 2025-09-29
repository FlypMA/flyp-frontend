// import { useAuth } from '@/app/providers/auth-provider';
import { Button } from '@/shared/components/buttons';
import { ImageGalleryModal } from '@/shared/components/modals/images';
import InquiryModal from '@/shared/components/modals/InquiryModal';
import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle,
  DollarSign,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  MapPin,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface PrivateListingData {
  id: string;
  title: string;
  summary: string;
  description: string;
  sector: string;
  region: string;
  country: string;
  asking_price: number;
  currency: string;
  views: number;
  inquiries: number;
  years_in_business: number;
  employees: number;
  customers: number;
  growth_rate: number;
  highlights: string[];
  financials: {
    revenue_2023: number;
    revenue_2022: number;
    revenue_2021: number;
    ebitda_2023: number;
    ebitda_2022: number;
    ebitda_2021: number;
    ebitda_margin_2023: number;
    net_profit_2023: number;
    net_profit_growth: number;
    gross_profit_margin: number;
    operating_expenses: number;
    assets_value: number;
    liabilities: number;
  };
  business_details: {
    legal_structure: string;
    location_description: string;
    key_assets: string[];
    growth_opportunities: string[];
  };
  seller_info: {
    reason_for_sale: string;
    timeline: string;
    involvement_post_sale: string;
    contact_email: string;
    contact_phone: string;
  };
  documents: Array<{
    name: string;
    size: string;
    format: string;
    url: string;
  }>;
  images: Array<{
    id: string;
    storage_url: string;
    thumbnail_url: string;
    is_primary: boolean;
    alt_text: string;
  }>;
}

const PrivateListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // useAuth(); // Unused for now
  const [listing, setListing] = useState<PrivateListingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [, setInitialImageIndex] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    loadPrivateListingDetails();
  }, [id]);

  const loadPrivateListingDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setListing({
        id: id || '2',
        title: 'Premium Restaurant Chain - Brussels',
        summary:
          'Established premium restaurant chain with 3 locations in prime Brussels areas. Strong brand recognition, experienced management team, and modern facilities. Excellent growth potential with established customer base and supplier relationships.',
        description: `This premium restaurant chain represents an exceptional opportunity in the heart of Brussels' culinary scene. With three strategically located restaurants, the business has built a strong reputation for quality cuisine and exceptional service.

The flagship location in the historic center attracts both locals and tourists, while the two additional locations serve high-traffic commercial districts. Each restaurant features modern kitchen equipment, elegant dining spaces, and outdoor seating areas.

The business benefits from established relationships with premium suppliers, experienced kitchen and service staff, and a loyal customer base. The management team has successfully navigated market challenges and maintained profitability through innovative menu development and operational efficiency.

Recent investments in technology, including a modern POS system and online ordering platform, have positioned the business for continued growth. The brand has strong social media presence and positive online reviews, contributing to consistent customer acquisition.

This opportunity is ideal for an experienced restaurateur or investor looking to enter the premium dining market with an established, profitable operation.`,
        sector: 'Food & Beverage',
        region: 'Brussels',
        country: 'Belgium',
        asking_price: 2500000,
        currency: 'EUR',
        views: 1247,
        inquiries: 23,
        years_in_business: 8,
        employees: 45,
        customers: 12000,
        growth_rate: 15,
        highlights: [
          'Prime Brussels locations with high foot traffic',
          'Established brand reputation and customer loyalty',
          'Experienced management team with proven track record',
          'Modern equipment and facilities recently upgraded',
          'Strong supplier relationships and favorable terms',
          'Multiple revenue streams including catering and events',
          'Positive online reviews and social media presence',
          'Scalable business model with expansion potential',
        ],
        financials: {
          revenue_2023: 4200000,
          revenue_2022: 3800000,
          revenue_2021: 3200000,
          ebitda_2023: 756000,
          ebitda_2022: 684000,
          ebitda_2021: 576000,
          ebitda_margin_2023: 18,
          net_profit_2023: 420000,
          net_profit_growth: 12,
          gross_profit_margin: 65,
          operating_expenses: 2800000,
          assets_value: 1800000,
          liabilities: 450000,
        },
        business_details: {
          legal_structure: 'Private Limited Company (BVBA)',
          location_description:
            'Three prime locations in Brussels: historic center (flagship), commercial district, and business quarter. All locations feature modern facilities, outdoor seating, and excellent accessibility.',
          key_assets: [
            'Three restaurant locations with long-term leases',
            'Modern kitchen equipment and POS systems',
            'Established brand trademarks and recipes',
            'Customer database and loyalty program',
            'Supplier contracts and relationships',
            'Trained staff and management team',
            'Online ordering and delivery platform',
            'Event catering equipment and capabilities',
          ],
          growth_opportunities: [
            'Expansion to additional Brussels locations',
            'Franchise development opportunities',
            'Catering and event services expansion',
            'Online delivery and ghost kitchen concepts',
            'Premium product line development',
            'Corporate partnerships and contracts',
            'Seasonal menu and special event offerings',
            'International market entry potential',
          ],
        },
        seller_info: {
          reason_for_sale: 'Owner retirement and desire to focus on other ventures',
          timeline: 'Flexible timeline, prefer completion within 3-6 months',
          involvement_post_sale:
            '3-month transition period available with full training and support',
          contact_email: 'jp.dubois@duboisrestaurants.be',
          contact_phone: '+32 2 123 4567',
        },
        documents: [
          {
            name: 'Financial Statements 2021-2023',
            size: '2.4 MB',
            format: 'PDF',
            url: '#',
          },
          {
            name: 'Tax Returns and Audits',
            size: '1.8 MB',
            format: 'PDF',
            url: '#',
          },
          {
            name: 'Lease Agreements',
            size: '3.2 MB',
            format: 'PDF',
            url: '#',
          },
          {
            name: 'Equipment Inventory',
            size: '1.1 MB',
            format: 'Excel',
            url: '#',
          },
          {
            name: 'Staff Contracts and HR',
            size: '2.7 MB',
            format: 'PDF',
            url: '#',
          },
        ],
        images: [
          {
            id: '1',
            storage_url:
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
            thumbnail_url:
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
            is_primary: true,
            alt_text: 'Main restaurant interior',
          },
          {
            id: '2',
            storage_url:
              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
            thumbnail_url:
              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
            is_primary: false,
            alt_text: 'Restaurant exterior',
          },
          {
            id: '3',
            storage_url:
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
            thumbnail_url:
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
            is_primary: false,
            alt_text: 'Kitchen facilities',
          },
          {
            id: '4',
            storage_url:
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
            thumbnail_url:
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
            is_primary: false,
            alt_text: 'Outdoor seating area',
          },
          {
            id: '5',
            storage_url:
              'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
            thumbnail_url:
              'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
            is_primary: false,
            alt_text: 'Bar area',
          },
        ],
      });
    } catch (error) {
      // Error loading private listing details
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-EU').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num}%`;
  };

  const handleImageClick = (imageIndex: number) => {
    setInitialImageIndex(imageIndex);
    setIsImageGalleryOpen(true);
  };

  const handleContactSeller = () => {
    setIsInquiryModalOpen(true);
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6 text-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading private listing details...</p>
        </div>
      </div>
    );
  }

  // Show not found only after loading is complete and no listing found
  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6 text-center pt-20">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Private listing not found</h2>
          <p className="text-gray-600 mb-6">
            The private listing you're looking for doesn't exist or you don't have access to it.
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
                <div className="inline-flex items-center gap-1.5 bg-green-100 px-3 py-1.5 rounded-full text-green-700 text-sm font-medium">
                  <Shield className="w-3 h-3" style={{ stroke: 'currentColor', fill: 'none' }} />
                  <span>Private Access</span>
                </div>
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

              {/* Private Access Timeline */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
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
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-1">
                      <Shield
                        className="w-4 h-4 text-white"
                        style={{ stroke: '#ffffff', fill: 'none', strokeWidth: '2.5' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-green-600">NDA Signed</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-green-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mb-1">
                      <MessageSquare
                        className="w-4 h-4 text-white"
                        style={{ stroke: '#ffffff', fill: 'none', strokeWidth: '2.5' }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary-600">Contact Seller</span>
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
                    className="relative cursor-pointer group overflow-hidden"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
                  />
                </svg>
                <span className="text-sm font-medium">Show all photos</span>
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
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-primary-600">
                    {formatPrice(listing.asking_price, listing.currency)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {listing.sector} • {listing.region}, {listing.country}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onPress={handleContactSeller}
                  className="w-full"
                  startContent={
                    <MessageSquare
                      className="w-5 h-5"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  }
                >
                  Contact Seller Directly
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 order-2">
            {/* Business Overview */}
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
                      {formatNumber(listing.customers)}
                    </p>
                    <p className="text-sm text-neutral-600">Customer Base</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary-700">
                      {formatPercentage(listing.growth_rate)}
                    </p>
                    <p className="text-sm text-neutral-600">Annual Growth</p>
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

            {/* Business Description */}
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

            {/* Detailed Financial Performance */}
            <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-200 rounded-3xl shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    Detailed Financial Performance
                  </h2>
                  <div className="inline-flex items-center gap-1.5 bg-green-100 px-3 py-1.5 rounded-full text-green-700 text-sm font-medium">
                    <Shield className="w-3 h-3" style={{ stroke: 'currentColor', fill: 'none' }} />
                    <span>Private Data</span>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">Revenue 2023</p>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.revenue_2023, listing.currency)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      vs. {formatPrice(listing.financials.revenue_2022, listing.currency)} in 2022
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">EBITDA 2023</p>
                      <DollarSign className="w-5 h-5 text-primary-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.ebitda_2023, listing.currency)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Margin: {formatPercentage(listing.financials.ebitda_margin_2023)}
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600">Net Profit 2023</p>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPrice(listing.financials.net_profit_2023, listing.currency)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Growth: {formatPercentage(listing.financials.net_profit_growth)}
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold mb-3">Detailed Financials</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Revenue (Last 3 Years)</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(listing.financials.revenue_2023, listing.currency)} (2023),{' '}
                      {formatPrice(listing.financials.revenue_2022, listing.currency)} (2022),{' '}
                      {formatPrice(listing.financials.revenue_2021, listing.currency)} (2021)
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Gross Profit Margin</span>
                    <span className="font-medium text-gray-900">
                      {formatPercentage(listing.financials.gross_profit_margin)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Operating Expenses</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(listing.financials.operating_expenses, listing.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Assets Value</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(listing.financials.assets_value, listing.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Liabilities</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(listing.financials.liabilities, listing.currency)}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-600" />
                  Business Details
                </h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Industry & Sector</h3>
                    <p className="text-gray-700">{listing.sector}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Legal Structure</h3>
                    <p className="text-gray-700">{listing.business_details.legal_structure}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location & Facilities</h3>
                    <p className="text-gray-700">{listing.business_details.location_description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Key Assets</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {listing.business_details.key_assets.map((asset: string, index: number) => (
                        <li key={index}>{asset}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Growth Opportunities</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {listing.business_details.growth_opportunities.map(
                        (opportunity: string, index: number) => (
                          <li key={index}>{opportunity}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-600" />
                  Private Documents
                </h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {listing.documents.map((doc: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            {doc.size} • {doc.format}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        startContent={<Download className="w-4 h-4" />}
                        onPress={() => window.open(doc.url, '_blank')}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
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
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-primary-600">
                    {formatPrice(listing.asking_price, listing.currency)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {listing.sector} • {listing.region}, {listing.country}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onPress={handleContactSeller}
                  className="w-full"
                  startContent={
                    <MessageSquare
                      className="w-5 h-5"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  }
                >
                  Contact Seller Directly
                </Button>
              </CardBody>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Seller Information</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
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
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isImageGalleryOpen}
        onClose={() => setIsImageGalleryOpen(false)}
        images={listing.images || []}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        listing={{
          id: id || '',
          title: listing?.title || 'Business Listing',
          sector: listing?.sector || 'Business',
          asking_price: listing?.asking_price,
          currency: listing?.currency || 'EUR',
          requires_nda: true,
        }}
        onSubmit={() => {
          // Inquiry submitted
          // TODO: Implement actual inquiry submission
          setIsInquiryModalOpen(false);
        }}
      />
    </div>
  );
};

export default PrivateListingDetails;
