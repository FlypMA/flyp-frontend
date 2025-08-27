import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip, Divider, Progress } from '@heroui/react';
import {
  Plus,
  Building2,
  Eye,
  MessageSquare,
  TrendingUp,
  FileText,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
} from 'lucide-react';
import { authService } from '../../../services/users/authenticationService';
import { User as UserType } from '../../../types/api/users/user';
import DashboardNavigation from '../../../components/navigation/DashboardNavigation';
import SidebarNavigation from '../../../components/navigation/SidebarNavigation';

interface Listing {
  id: string;
  title: string;
  status: 'draft' | 'under_review' | 'published' | 'archived';
  views: number;
  inquiries: number;
  created_at: string;
  asking_price?: number;
  currency?: string;
  sector: string;
  country: string;
}

interface DashboardStats {
  total_listings: number;
  published_listings: number;
  total_views: number;
  total_inquiries: number;
  active_conversations: number;
}

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_listings: 0,
    published_listings: 0,
    total_views: 0,
    total_inquiries: 0,
    active_conversations: 0,
  });
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      setIsLoading(true);
      try {
        // Get authenticated user
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // TODO: Replace with actual API calls once backend is fully implemented
          // For now, using mock data to show the UI structure

          // Mock listings data
          setListings([
            {
              id: '1',
              title: 'Premium Restaurant Chain - Brussels',
              status: 'published',
              views: 245,
              inquiries: 12,
              created_at: '2024-01-15',
              asking_price: 2500000,
              currency: 'EUR',
              sector: 'Food & Beverage',
              country: 'BE',
            },
            {
              id: '2',
              title: 'Software Development Company',
              status: 'under_review',
              views: 0,
              inquiries: 0,
              created_at: '2024-01-20',
              asking_price: 1800000,
              currency: 'EUR',
              sector: 'Technology',
              country: 'BE',
            },
            {
              id: '3',
              title: 'Manufacturing Business - Antwerp',
              status: 'draft',
              views: 0,
              inquiries: 0,
              created_at: '2024-01-22',
              sector: 'Manufacturing',
              country: 'BE',
            },
          ]);

          // Mock stats data
          setStats({
            total_listings: 3,
            published_listings: 1,
            total_views: 245,
            total_inquiries: 12,
            active_conversations: 8,
          });
        } else {
          // Redirect to login if not authenticated
          navigate('/');
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'under_review':
        return 'warning';
      case 'draft':
        return 'default';
      case 'archived':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'under_review':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'archived':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatPrice = (price?: number, currency?: string) => {
    if (!price) return 'Price not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'EUR',
    }).format(price);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
          <Button color="primary" onPress={() => navigate('/')}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <DashboardNavigation user={user} />

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name || 'Seller'}!
          </h1>
          <p className="text-gray-600">Manage your business listings and track buyer interest</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_listings}</p>
                </div>
                <Building2 className="w-8 h-8 text-primary-600" />
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.published_listings}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_views}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_inquiries}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Conversations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active_conversations}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Dashboard Content with Sidebar */}
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <SidebarNavigation selectedTab={selectedTab} onTabChange={setSelectedTab} />

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Overview Tab Content */}
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="flex flex-wrap gap-4">
                      <Button color="primary" onPress={() => navigate('/seller/listings/new')}>
                        Create New Listing
                      </Button>
                      <Button
                        variant="bordered"
                        startContent={<Search className="w-4 h-4" />}
                        onPress={() => navigate('/search')}
                      >
                        Browse Market
                      </Button>
                      <Button
                        variant="bordered"
                        startContent={<Settings className="w-4 h-4" />}
                        onPress={() => navigate('/account/settings')}
                      >
                        Account Settings
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                {/* Recent Listings */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Your Listings</h3>
                      <Button size="sm" variant="light" onPress={() => setSelectedTab('listings')}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {listings.length === 0 ? (
                      <div className="text-center py-8">
                        <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No listings yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Create your first business listing to start attracting buyers
                        </p>
                        <Button color="primary" onPress={() => navigate('/seller/listings/new')}>
                          Create First Listing
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {listings.slice(0, 3).map(listing => (
                          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                            <CardBody>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      {listing.title}
                                    </h3>
                                    <Chip
                                      color={getStatusColor(listing.status)}
                                      variant="flat"
                                      startContent={getStatusIcon(listing.status)}
                                      size="sm"
                                    >
                                      {listing.status.replace('_', ' ')}
                                    </Chip>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <span>{listing.sector}</span>
                                    <span>•</span>
                                    <span>{listing.country}</span>
                                    <span>•</span>
                                    <span>
                                      {formatPrice(listing.asking_price, listing.currency)}
                                    </span>
                                    <span>•</span>
                                    <span>
                                      Created {new Date(listing.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <Eye className="w-4 h-4 text-gray-500" />
                                      <span>{listing.views}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="w-4 h-4 text-gray-500" />
                                      <span>{listing.inquiries}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="light"
                                      onPress={() => navigate(`/listings/${listing.id}`)}
                                    >
                                      View
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="flat"
                                      startContent={<Settings className="w-4 h-4" />}
                                      onPress={() =>
                                        navigate(`/seller/listings/${listing.id}/edit`)
                                      }
                                    >
                                      Edit
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            )}

            {/* Listings Tab Content */}
            {selectedTab === 'listings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">All Listings</h3>
                  <Button color="primary" onPress={() => navigate('/seller/listings/new')}>
                    Create New Listing
                  </Button>
                </div>

                {listings.length === 0 ? (
                  <Card className="border border-gray-200">
                    <CardBody className="text-center py-12">
                      <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
                      <p className="text-gray-600 mb-4">
                        Create your first business listing to start attracting buyers
                      </p>
                      <Button color="primary" onPress={() => navigate('/seller/listings/new')}>
                        Create First Listing
                      </Button>
                    </CardBody>
                  </Card>
                ) : (
                  listings.map(listing => (
                    <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                      <CardBody>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {listing.title}
                              </h3>
                              <Chip
                                color={getStatusColor(listing.status)}
                                variant="flat"
                                startContent={getStatusIcon(listing.status)}
                                size="sm"
                              >
                                {listing.status.replace('_', ' ')}
                              </Chip>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span>{listing.sector}</span>
                              <span>•</span>
                              <span>{listing.country}</span>
                              <span>•</span>
                              <span>{formatPrice(listing.asking_price, listing.currency)}</span>
                              <span>•</span>
                              <span>
                                Created {new Date(listing.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-gray-500" />
                                <span>{listing.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4 text-gray-500" />
                                <span>{listing.inquiries}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="light"
                                onPress={() => navigate(`/listings/${listing.id}`)}
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                startContent={<Settings className="w-4 h-4" />}
                                onPress={() => navigate(`/seller/listings/${listing.id}/edit`)}
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* Inquiries Tab Content */}
            {selectedTab === 'inquiries' && (
              <Card>
                <CardBody className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Inquiry management</h3>
                  <p className="text-gray-600">
                    This section will show buyer inquiries and communication tools
                  </p>
                  <p className="text-sm text-blue-600 mt-2">Coming in Phase 3 development</p>
                </CardBody>
              </Card>
            )}

            {/* Analytics Tab Content */}
            {selectedTab === 'analytics' && (
              <Card>
                <CardBody className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600">Detailed performance metrics and insights</p>
                  <p className="text-sm text-blue-600 mt-2">Coming in Phase 4 development</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
