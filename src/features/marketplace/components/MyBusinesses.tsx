import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Euro,
  Calendar,
  Users,
  MapPin,
  Eye,
  Edit3,
  Share2,
  Calculator,
  FileText,
  MoreVertical,
  Plus,
  Briefcase,
  Target,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OwnedBusiness {
  id: string;
  original_listing_id?: string; // If acquired through the platform
  name: string;
  sector: string;
  country: string;
  region: string;
  acquisition_date: string;
  acquisition_price: number;
  current_valuation?: number;
  currency: string;
  status: 'operating' | 'for_sale' | 'sold' | 'under_review';
  ownership_percentage: number;
  employees: number;
  annual_revenue?: number;
  annual_ebitda?: number;
  growth_rate?: number;
  founded_year: string;
  business_model: string;
  key_metrics: {
    customer_count?: number;
    market_share?: string;
    monthly_recurring_revenue?: number;
  };
  notes?: string;
  last_valuation_date?: string;
  listing_id?: string; // If currently listed for sale
}

interface MyBusinessesProps {}

const MyBusinesses: React.FC<MyBusinessesProps> = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<OwnedBusiness[]>([]);
  // Loading states removed for smooth UX
  const [filter, setFilter] = useState<'all' | 'operating' | 'for_sale' | 'sold' | 'under_review'>(
    'all'
  );

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    // Instant data loading - no loading state
    try {
      // TODO: Replace with actual API call
      // const response = await businessService.getOwnedBusinesses();

      // Mock data for now
      const mockBusinesses: OwnedBusiness[] = [
        {
          id: 'biz_1',
          original_listing_id: '4',
          name: 'Digital Marketing Agency Amsterdam',
          sector: 'Professional Services',
          country: 'Netherlands',
          region: 'Amsterdam',
          acquisition_date: '2023-06-15',
          acquisition_price: 950000,
          current_valuation: 1250000,
          currency: 'EUR',
          status: 'operating',
          ownership_percentage: 100,
          employees: 15,
          annual_revenue: 1800000,
          annual_ebitda: 360000,
          growth_rate: 22,
          founded_year: '2017',
          business_model: 'Service-based',
          key_metrics: {
            customer_count: 65,
            monthly_recurring_revenue: 45000,
          },
          notes: 'Strong growth since acquisition. Added new service lines and expanded team.',
          last_valuation_date: '2024-01-15',
        },
        {
          id: 'biz_2',
          name: 'Boutique Coffee Roastery Ghent',
          sector: 'Food & Beverage',
          country: 'Belgium',
          region: 'Ghent',
          acquisition_date: '2022-03-20',
          acquisition_price: 320000,
          current_valuation: 480000,
          currency: 'EUR',
          status: 'for_sale',
          ownership_percentage: 75,
          employees: 8,
          annual_revenue: 650000,
          annual_ebitda: 95000,
          growth_rate: 15,
          founded_year: '2019',
          business_model: 'Retail + Online',
          key_metrics: {
            customer_count: 2500,
          },
          notes: 'Ready for next phase of growth. Seeking strategic buyer.',
          last_valuation_date: '2023-12-10',
          listing_id: 'listing_789',
        },
        {
          id: 'biz_3',
          name: 'Tech Consulting Firm Brussels',
          sector: 'Technology',
          country: 'Belgium',
          region: 'Brussels',
          acquisition_date: '2021-11-08',
          acquisition_price: 680000,
          current_valuation: 850000,
          currency: 'EUR',
          status: 'operating',
          ownership_percentage: 80,
          employees: 12,
          annual_revenue: 1200000,
          annual_ebitda: 240000,
          growth_rate: 8,
          founded_year: '2018',
          business_model: 'Consulting',
          key_metrics: {
            customer_count: 28,
          },
          notes: 'Stable business with recurring clients. Considering expansion.',
          last_valuation_date: '2023-11-20',
        },
      ];

      setBusinesses(mockBusinesses);
    } catch (error) {
      console.error('Error loading businesses:', error);
    } finally {
      // No loading state to manage
    }
  };

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Not valued';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: price >= 1000000 ? 'compact' : 'standard',
    }).format(price);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);

    if (diffYears >= 1) {
      return `${Math.floor(diffYears)} year${Math.floor(diffYears) > 1 ? 's' : ''} ago`;
    }

    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);
    return `${Math.floor(diffMonths)} month${Math.floor(diffMonths) > 1 ? 's' : ''} ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operating':
        return 'success';
      case 'for_sale':
        return 'warning';
      case 'sold':
        return 'primary';
      case 'under_review':
        return 'default';
      default:
        return 'default';
    }
  };

  const getROI = (business: OwnedBusiness) => {
    if (!business.current_valuation) return null;

    const totalReturn = business.current_valuation - business.acquisition_price;
    const roi = (totalReturn / business.acquisition_price) * 100;
    const yearsOwned =
      (new Date().getTime() - new Date(business.acquisition_date).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    const annualizedROI = roi / yearsOwned;

    return { totalReturn, roi, annualizedROI };
  };

  const createListing = (business: OwnedBusiness) => {
    // Navigate to seller listing creation with pre-filled data
    navigate('/seller/listings/new', {
      state: {
        prefilled: {
          title: business.name,
          sector: business.sector,
          country: business.country,
          region: business.region,
          asking_price: business.current_valuation,
          employees: business.employees,
          founded_year: business.founded_year,
          annual_revenue: business.annual_revenue,
          annual_ebitda: business.annual_ebitda,
        },
      },
    });
  };

  const getValuation = (business: OwnedBusiness) => {
    navigate('/my-business/valuation', {
      state: {
        businessData: {
          name: business.name,
          sector: business.sector,
          employees: business.employees,
          annual_revenue: business.annual_revenue,
        },
      },
    });
  };

  const filteredBusinesses = businesses.filter(
    business => filter === 'all' || business.status === filter
  );

  const totalPortfolioValue = businesses.reduce(
    (sum, business) => sum + (business.current_valuation || business.acquisition_price),
    0
  );

  const totalInvestment = businesses.reduce((sum, business) => sum + business.acquisition_price, 0);

  const totalROI =
    totalInvestment > 0 ? ((totalPortfolioValue - totalInvestment) / totalInvestment) * 100 : 0;

  // Loading screens removed for smooth UX

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Business Portfolio</h1>
          <p className="text-gray-600">
            {businesses.length} businesses owned • {formatPrice(totalPortfolioValue)} total value
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="bordered"
            onPress={() => navigate('/search')}
            startContent={<Plus className="w-4 h-4" />}
          >
            Acquire More
          </Button>
          <Button
            color="primary"
            onPress={() => navigate('/seller/listings/new')}
            startContent={<Target className="w-4 h-4" />}
          >
            Sell a Business
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{businesses.length}</p>
                <p className="text-sm text-gray-600">Businesses Owned</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                <Euro className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(totalPortfolioValue)}
                </p>
                <p className="text-sm text-gray-600">Portfolio Value</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {totalROI > 0 ? '+' : ''}
                  {totalROI.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Total ROI</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {businesses.filter(b => b.status === 'for_sale').length}
                </p>
                <p className="text-sm text-gray-600">Listed for Sale</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        {[
          { key: 'all', label: 'All', count: businesses.length },
          {
            key: 'operating',
            label: 'Operating',
            count: businesses.filter(b => b.status === 'operating').length,
          },
          {
            key: 'for_sale',
            label: 'For Sale',
            count: businesses.filter(b => b.status === 'for_sale').length,
          },
          { key: 'sold', label: 'Sold', count: businesses.filter(b => b.status === 'sold').length },
        ].map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              filter === tab.key
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setFilter(tab.key as any)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Business List */}
      {filteredBusinesses.length > 0 ? (
        <div className="space-y-6">
          {filteredBusinesses.map(business => {
            const roi = getROI(business);
            return (
              <Card
                key={business.id}
                className="border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
              >
                <CardBody className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{business.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              <span>{business.sector}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {business.region}, {business.country}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{business.employees} employees</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Owned {getTimeAgo(business.acquisition_date)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Chip size="sm" color={getStatusColor(business.status)} variant="flat">
                            {business.status.replace('_', ' ').toUpperCase()}
                          </Chip>

                          <Dropdown>
                            <DropdownTrigger>
                              <Button isIconOnly size="sm" variant="light">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              {business.status === 'operating' && (
                                <>
                                  <DropdownItem
                                    key="sell"
                                    startContent={<Target className="w-4 h-4" />}
                                    onPress={() => createListing(business)}
                                  >
                                    List for Sale
                                  </DropdownItem>
                                  <DropdownItem
                                    key="valuation"
                                    startContent={<Calculator className="w-4 h-4" />}
                                    onPress={() => getValuation(business)}
                                  >
                                    Get Valuation
                                  </DropdownItem>
                                </>
                              )}
                              {business.listing_id && (
                                <DropdownItem
                                  key="view-listing"
                                  startContent={<Eye className="w-4 h-4" />}
                                  onPress={() => navigate(`/listings/${business.listing_id}`)}
                                >
                                  View Listing
                                </DropdownItem>
                              )}
                              <DropdownItem key="edit" startContent={<Edit3 className="w-4 h-4" />}>
                                Edit Details
                              </DropdownItem>
                              <DropdownItem
                                key="reports"
                                startContent={<FileText className="w-4 h-4" />}
                              >
                                View Reports
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>

                      {/* Financial Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-600 font-medium">Acquisition Price</p>
                          <p className="text-xl font-bold text-blue-900">
                            {formatPrice(business.acquisition_price, business.currency)}
                          </p>
                        </div>

                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-600 font-medium">Current Value</p>
                          <p className="text-xl font-bold text-green-900">
                            {formatPrice(business.current_valuation, business.currency)}
                          </p>
                          {business.last_valuation_date && (
                            <p className="text-xs text-green-600 mt-1">
                              Updated {getTimeAgo(business.last_valuation_date)}
                            </p>
                          )}
                        </div>

                        {roi && (
                          <>
                            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                              <p className="text-sm text-purple-600 font-medium">Total Return</p>
                              <p className="text-xl font-bold text-purple-900">
                                {roi.totalReturn > 0 ? '+' : ''}
                                {formatPrice(roi.totalReturn, business.currency)}
                              </p>
                              <p className="text-xs text-purple-600 mt-1">
                                {roi.roi > 0 ? '+' : ''}
                                {roi.roi.toFixed(1)}%
                              </p>
                            </div>

                            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                              <p className="text-sm text-orange-600 font-medium">Annual ROI</p>
                              <p className="text-xl font-bold text-orange-900">
                                {roi.annualizedROI > 0 ? '+' : ''}
                                {roi.annualizedROI.toFixed(1)}%
                              </p>
                              {business.growth_rate && (
                                <p className="text-xs text-orange-600 mt-1 flex items-center justify-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {business.growth_rate}% growth
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Performance Metrics */}
                      {(business.annual_revenue || business.annual_ebitda) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {business.annual_revenue && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                  Annual Revenue
                                </span>
                                <span className="text-sm font-bold text-gray-900">
                                  {formatPrice(business.annual_revenue, business.currency)}
                                </span>
                              </div>
                            </div>
                          )}

                          {business.annual_ebitda && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                  Annual EBITDA
                                </span>
                                <span className="text-sm font-bold text-gray-900">
                                  {formatPrice(business.annual_ebitda, business.currency)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {business.notes && (
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
                          <p className="text-sm text-gray-700">{business.notes}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {business.status === 'operating' && (
                          <>
                            <Button
                              color="primary"
                              variant="flat"
                              size="sm"
                              onPress={() => createListing(business)}
                              startContent={<Target className="w-4 h-4" />}
                            >
                              List for Sale
                            </Button>
                            <Button
                              variant="flat"
                              size="sm"
                              onPress={() => getValuation(business)}
                              startContent={<Calculator className="w-4 h-4" />}
                            >
                              Get Valuation
                            </Button>
                          </>
                        )}

                        {business.listing_id && (
                          <Button
                            color="success"
                            variant="flat"
                            size="sm"
                            onPress={() => navigate(`/listings/${business.listing_id}`)}
                            startContent={<Eye className="w-4 h-4" />}
                          >
                            View Listing
                          </Button>
                        )}

                        <Button
                          variant="flat"
                          size="sm"
                          startContent={<FileText className="w-4 h-4" />}
                        >
                          View Reports
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border border-gray-200">
          <CardBody className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-blue-100 rounded-2xl w-fit mx-auto mb-4">
                <Building2 className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {filter === 'all'
                  ? 'No businesses owned yet'
                  : `No ${filter.replace('_', ' ')} businesses`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? 'Start building your business portfolio by acquiring your first business.'
                  : `No businesses with ${filter.replace('_', ' ')} status. Try a different filter.`}
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button color="primary" onPress={() => navigate('/search')}>
                  Browse Businesses
                </Button>
                {businesses.length > 0 && (
                  <Button variant="bordered" onPress={() => setFilter('all')}>
                    View All
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* CTA Section for becoming a seller */}
      {businesses.length > 0 && businesses.some(b => b.status === 'operating') && (
        <Card className="border border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to sell?</h4>
                <p className="text-gray-600">
                  You've successfully acquired and grown businesses. Consider selling one to realize
                  your returns.
                </p>
              </div>
              <Button
                color="primary"
                size="lg"
                onPress={() => navigate('/seller/listings/new')}
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                List a Business for Sale
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MyBusinesses;
