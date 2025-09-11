import React from 'react';
import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
import {
  Eye,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  Building2,
  Euro,
  Users,
  Calendar,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BuyerStats {
  saved_searches: number;
  viewed_listings: number;
  saved_listings: number;
  active_inquiries: number;
  new_matches: number;
}

interface RecentListing {
  id: string;
  title: string;
  sector: string;
  country: string;
  asking_price?: number;
  currency: string;
  summary: string;
  views: number;
  published_at: string;
  featured: boolean;
  employees?: string;
  founded_year?: string;
}

interface DashboardOverviewProps {
  stats: BuyerStats;
  recentListings: RecentListing[];
  userName: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  recentListings,
  userName,
}) => {
  const navigate = useNavigate();

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const quickStats = [
    {
      label: 'Market Activity',
      value: '1,247',
      subtitle: 'Active listings',
      change: '+23 this week',
      positive: true,
      icon: Building2,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Avg. Price',
      value: '€2.3M',
      subtitle: 'Belgium market',
      change: '+5.2% vs last month',
      positive: true,
      icon: Euro,
      gradient: 'from-green-500 to-green-600',
    },
    {
      label: 'New This Week',
      value: '23',
      subtitle: 'Fresh opportunities',
      change: '12 in your sectors',
      positive: true,
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-gray-600 text-lg">Ready to discover your next business acquisition?</p>
        </div>
        <Button
          color="primary"
          size="lg"
          className="bg-gradient-to-r from-primary-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          onPress={() => navigate('/search')}
          endContent={<ArrowUpRight className="w-4 h-4" />}
        >
          Explore Businesses
        </Button>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg"
            >
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-700 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Your Activity & Recent Listings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Your Activity */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">Your Activity</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">{stats.viewed_listings}</p>
                      <p className="text-sm text-blue-700">Viewed Listings</p>
                    </div>
                  </div>
                  <Button size="sm" variant="light" color="primary">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500 rounded-lg">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-pink-900">{stats.saved_listings}</p>
                      <p className="text-sm text-pink-700">Saved Favorites</p>
                    </div>
                  </div>
                  <Button size="sm" variant="light" color="secondary">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">{stats.saved_searches}</p>
                      <p className="text-sm text-purple-700">Saved Searches</p>
                    </div>
                  </div>
                  <Button size="sm" variant="light" color="secondary">
                    Manage
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="flat"
                  onPress={() => navigate('/search')}
                >
                  🔍 Search Businesses
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="flat"
                  onPress={() => navigate('/search?featured=true')}
                >
                  ⭐ Browse Featured
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="flat"
                  onPress={() => navigate('/market-insights')}
                >
                  📊 Market Insights
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Recent & Featured Listings */}
        <div className="xl:col-span-2">
          <Card className="border border-gray-200 h-fit">
            <CardHeader className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Featured Opportunities</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Handpicked businesses that match your interests
                </p>
              </div>
              <Button
                size="sm"
                variant="light"
                onPress={() => navigate('/search')}
                endContent={<ArrowUpRight className="w-3 h-3" />}
              >
                View All
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {recentListings.slice(0, 3).map(listing => (
                  <div
                    key={listing.id}
                    className="group border border-gray-200 rounded-2xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-gray-50"
                    onClick={() => navigate(`/listings/${listing.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                            {listing.title}
                          </h4>
                          {listing.featured && (
                            <Chip size="sm" color="warning" variant="flat">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Chip>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span className="font-medium">{listing.sector}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{listing.country}</span>
                          </div>
                          {listing.employees && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{listing.employees} employees</span>
                            </div>
                          )}
                          {listing.founded_year && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Est. {listing.founded_year}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{listing.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            {formatPrice(listing.asking_price, listing.currency)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{listing.views} views</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{getTimeAgo(listing.published_at)}</span>
                        </div>
                      </div>

                      <Button
                        color="primary"
                        variant="flat"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        endContent={<ArrowUpRight className="w-3 h-3" />}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {recentListings.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h4>
                  <p className="text-gray-600 mb-4">
                    Start exploring businesses to see personalized recommendations
                  </p>
                  <Button color="primary" onPress={() => navigate('/search')}>
                    Start Exploring
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
