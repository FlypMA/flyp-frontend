import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip, Divider, useDisclosure } from '@heroui/react';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Users,
  Calendar,
  TrendingUp,
  Shield,
  MessageSquare,
  Heart,
  Eye,
  FileText,
  Share2,
  CheckCircle,
} from 'lucide-react';
import { InquiryModal } from '../../components/ma';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadListingDetails();
  }, [id]);

  const loadListingDetails = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

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
      console.error('Error loading listing details:', error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6 text-center pt-20">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Listing not found</h2>
          <Button color="primary" onPress={() => navigate('/search')}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="light"
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
                variant="bordered"
                startContent={
                  <Heart className="w-4 h-4" style={{ stroke: 'currentColor', fill: 'none' }} />
                }
                className="border-2 border-neutral-300 hover:border-neutral-400"
              >
                Save Listing
              </Button>
              <Button
                variant="bordered"
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
                  color="primary"
                  size="lg"
                  onPress={onOpen}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
                  color="primary"
                  size="lg"
                  onPress={onOpen}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
            console.log('Inquiry submitted:', inquiryData);
            // TODO: Implement actual inquiry submission
            onOpenChange();
          }}
        />
      </div>
    </div>
  );
};

export default ListingDetails;
