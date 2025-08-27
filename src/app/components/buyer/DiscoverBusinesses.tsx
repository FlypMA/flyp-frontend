import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Slider,
  Chip,
  Badge,
} from '@heroui/react';
import {
  Search,
  Filter,
  TrendingUp,
  MapPin,
  Building2,
  Euro,
  Users,
  Calendar,
  Star,
  ArrowUpRight,
  Zap,
  Target,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchFilters {
  sector: string;
  country: string;
  priceRange: [number, number];
  searchQuery: string;
  employeeRange: string;
  revenueRange: string;
}

interface TrendingSearch {
  query: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

interface PopularSector {
  name: string;
  count: number;
  avgPrice: number;
  growth: number;
}

interface DiscoverBusinessesProps {
  onSearch?: (filters: SearchFilters) => void;
}

const DiscoverBusinesses: React.FC<DiscoverBusinessesProps> = ({ onSearch }) => {
  const navigate = useNavigate();

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    sector: '',
    country: '',
    priceRange: [0, 10000000] as [number, number],
    searchQuery: '',
    employeeRange: '',
    revenueRange: '',
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const trendingSearches: TrendingSearch[] = [
    { query: 'SaaS companies', count: 145, trend: 'up' },
    { query: 'Restaurants Belgium', count: 89, trend: 'up' },
    { query: 'E-commerce under 2M', count: 67, trend: 'stable' },
    { query: 'Manufacturing', count: 54, trend: 'down' },
    { query: 'Professional services', count: 43, trend: 'up' },
  ];

  const popularSectors: PopularSector[] = [
    { name: 'Technology', count: 234, avgPrice: 2800000, growth: 15.2 },
    { name: 'Food & Beverage', count: 189, avgPrice: 1900000, growth: 8.7 },
    { name: 'Professional Services', count: 156, avgPrice: 1200000, growth: 12.3 },
    { name: 'E-commerce', count: 134, avgPrice: 2100000, growth: 22.1 },
    { name: 'Manufacturing', count: 112, avgPrice: 3200000, growth: 5.4 },
    { name: 'Healthcare', count: 98, avgPrice: 2600000, growth: 18.9 },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: price >= 1000000 ? 'compact' : 'standard',
    }).format(price);
  };

  const handleAdvancedSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchFilters.sector) searchParams.set('sector', searchFilters.sector);
    if (searchFilters.country) searchParams.set('country', searchFilters.country);
    if (searchFilters.searchQuery) searchParams.set('q', searchFilters.searchQuery);
    if (searchFilters.priceRange[0] > 0)
      searchParams.set('priceMin', searchFilters.priceRange[0].toString());
    if (searchFilters.priceRange[1] < 10000000)
      searchParams.set('priceMax', searchFilters.priceRange[1].toString());
    if (searchFilters.employeeRange) searchParams.set('employees', searchFilters.employeeRange);
    if (searchFilters.revenueRange) searchParams.set('revenue', searchFilters.revenueRange);

    navigate(`/search?${searchParams.toString()}`);
    onSearch?.(searchFilters);
  };

  const handleQuickSearch = (query: string, filters?: Partial<SearchFilters>) => {
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);
    if (filters?.sector) searchParams.set('sector', filters.sector);
    if (filters?.country) searchParams.set('country', filters.country);

    navigate(`/search?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    setSearchFilters({
      sector: '',
      country: '',
      priceRange: [0, 10000000],
      searchQuery: '',
      employeeRange: '',
      revenueRange: '',
    });
    setActiveFilters([]);
  };

  const addFilter = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
    if (value && !activeFilters.includes(key)) {
      setActiveFilters(prev => [...prev, key]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <div className="text-center py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next <span className="text-primary-600">Business Opportunity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Search through 1,200+ verified businesses across Europe
          </p>

          {/* Main Search Bar */}
          <div className="flex gap-3">
            <Input
              size="lg"
              placeholder="Search by business name, industry, or location..."
              value={searchFilters.searchQuery}
              onValueChange={value => setSearchFilters(prev => ({ ...prev, searchQuery: value }))}
              startContent={<Search className="w-5 h-5 text-gray-400" />}
              className="flex-1"
              classNames={{
                input: 'text-lg',
                inputWrapper:
                  'h-14 shadow-lg border-2 border-gray-200 hover:border-primary-300 focus-within:border-primary-500',
              }}
            />
            <Button
              color="primary"
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-primary-500 to-blue-600 font-semibold shadow-lg"
              onPress={handleAdvancedSearch}
              endContent={<Search className="w-5 h-5" />}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Advanced Filters */}
        <div className="xl:col-span-1">
          <Card className="border border-gray-200 sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-bold text-gray-900">Refine Search</h3>
                {activeFilters.length > 0 && (
                  <Button size="sm" variant="light" onPress={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Industry Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">Industry</label>
                <Select
                  placeholder="Select industry"
                  selectedKeys={searchFilters.sector ? [searchFilters.sector] : []}
                  onSelectionChange={keys => addFilter('sector', Array.from(keys)[0] as string)}
                  variant="bordered"
                  classNames={{
                    trigger: 'border-gray-300',
                    value: 'text-gray-900',
                  }}
                >
                  <SelectItem key="Technology">Technology</SelectItem>
                  <SelectItem key="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem key="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem key="Retail">Retail</SelectItem>
                  <SelectItem key="Professional Services">Professional Services</SelectItem>
                  <SelectItem key="Healthcare">Healthcare</SelectItem>
                  <SelectItem key="E-commerce">E-commerce</SelectItem>
                </Select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">Location</label>
                <Select
                  placeholder="Select country"
                  selectedKeys={searchFilters.country ? [searchFilters.country] : []}
                  onSelectionChange={keys => addFilter('country', Array.from(keys)[0] as string)}
                  variant="bordered"
                  classNames={{
                    trigger: 'border-gray-300',
                    value: 'text-gray-900',
                  }}
                >
                  <SelectItem key="BE">Belgium</SelectItem>
                  <SelectItem key="NL">Netherlands</SelectItem>
                  <SelectItem key="FR">France</SelectItem>
                  <SelectItem key="DE">Germany</SelectItem>
                  <SelectItem key="LU">Luxembourg</SelectItem>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-3 block">
                  Price Range: {formatPrice(searchFilters.priceRange[0])} -{' '}
                  {formatPrice(searchFilters.priceRange[1])}
                </label>
                <Slider
                  step={100000}
                  minValue={0}
                  maxValue={10000000}
                  value={searchFilters.priceRange}
                  onChange={value =>
                    setSearchFilters(prev => ({ ...prev, priceRange: value as [number, number] }))
                  }
                  className="w-full"
                  color="primary"
                />
              </div>

              {/* Company Size */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  Company Size
                </label>
                <Select
                  placeholder="Select employee range"
                  selectedKeys={searchFilters.employeeRange ? [searchFilters.employeeRange] : []}
                  onSelectionChange={keys =>
                    addFilter('employeeRange', Array.from(keys)[0] as string)
                  }
                  variant="bordered"
                >
                  <SelectItem key="1-5">1-5 employees</SelectItem>
                  <SelectItem key="6-20">6-20 employees</SelectItem>
                  <SelectItem key="21-50">21-50 employees</SelectItem>
                  <SelectItem key="51-100">51-100 employees</SelectItem>
                  <SelectItem key="100+">100+ employees</SelectItem>
                </Select>
              </div>

              {/* Search Button */}
              <Button
                color="primary"
                className="w-full bg-gradient-to-r from-primary-500 to-blue-600"
                size="lg"
                onPress={handleAdvancedSearch}
                startContent={<Filter className="w-4 h-4" />}
              >
                Apply Filters
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-2 space-y-8">
          {/* Trending Searches */}
          <Card className="border border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Trending Searches</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((trend, index) => (
                  <Button
                    key={index}
                    variant="bordered"
                    size="sm"
                    className="border-gray-300 hover:border-primary-500 hover:bg-primary-50"
                    onPress={() => handleQuickSearch(trend.query)}
                    startContent={
                      <div
                        className={`w-2 h-2 rounded-full ${
                          trend.trend === 'up'
                            ? 'bg-green-500'
                            : trend.trend === 'down'
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                        }`}
                      />
                    }
                  >
                    {trend.query} ({trend.count})
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Popular Sectors */}
          <Card className="border border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Popular Sectors</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularSectors.map((sector, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => handleQuickSearch('', { sector: sector.name })}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {sector.name}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-medium text-gray-900">{sector.count} businesses</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Avg. Price:</span>
                        <span className="font-medium text-gray-900">
                          {formatPrice(sector.avgPrice)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Growth:</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="font-medium text-green-600">+{sector.growth}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
              <CardBody className="text-center p-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Featured Businesses</h3>
                <p className="text-gray-600 mb-4">Hand-picked premium opportunities</p>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => navigate('/search?featured=true')}
                >
                  View Featured
                </Button>
              </CardBody>
            </Card>

            <Card className="border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all cursor-pointer group">
              <CardBody className="text-center p-8">
                <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Market Insights</h3>
                <p className="text-gray-600 mb-4">Latest trends and analysis</p>
                <Button color="success" variant="flat" onPress={() => navigate('/market-insights')}>
                  View Insights
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverBusinesses;
