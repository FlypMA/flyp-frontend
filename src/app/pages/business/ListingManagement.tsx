import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react';
import {
  Building2,
  MessageSquare,
  TrendingUp,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Target,
} from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../types/api/users/user';
import UnifiedNavigation from '../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../components/navigation/SellerSidebar';

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

const ListingManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [businessListing, setBusinessListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
      try {
        // Get authenticated user
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // TODO: Replace with actual API calls once backend is fully implemented
          // Mock listing data (active listing)
          setBusinessListing({
            id: 'listing-1',
            title: 'Established French Bistro - Brussels Center',
            status: 'published',
            views: 245,
            inquiries: 12,
            created_at: '2024-01-15',
            asking_price: 895000,
            currency: 'EUR',
            sector: 'Food & Beverage',
            country: 'BE',
          });
        } else {
          // Redirect to login if not authenticated
          navigate('/');
        }
      } catch (error) {
        console.error('Error initializing page:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing management...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access listing management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <UnifiedNavigation />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Left Sidebar */}
        <SellerSidebar selectedTab="listings" userRole={user?.userType as 'seller' | 'buyer' | 'admin' || 'seller'} />

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Management</h2>
              <p className="text-gray-600">Manage your business listing and track performance</p>
            </div>

            {businessListing ? (
              <div className="space-y-6">
                {/* Listing Status Card */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-semibold text-gray-900">Your Business Listing</h3>
                      <Chip
                        color={getStatusColor(businessListing.status)}
                        variant="flat"
                        startContent={getStatusIcon(businessListing.status)}
                      >
                        {businessListing.status.replace('_', ' ').toUpperCase()}
                      </Chip>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{businessListing.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span>{businessListing.sector}</span>
                          <span>•</span>
                          <span>{businessListing.country}</span>
                          <span>•</span>
                          <span>{formatPrice(businessListing.asking_price, businessListing.currency)}</span>
                          <span>•</span>
                          <span>Listed {new Date(businessListing.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button 
                          color="primary" 
                          variant="flat"
                          onPress={() => navigate(`/listings/${businessListing.id}`)}
                        >
                          View Public Listing
                        </Button>
                        <Button 
                          variant="bordered"
                          startContent={<Settings className="w-4 h-4" />}
                          onPress={() => navigate(`/seller/listings/edit?id=${businessListing.id}`)}
                        >
                          Edit Listing
                        </Button>
                        {businessListing.inquiries > 0 && (
                          <Button 
                            color="success"
                            variant="flat"
                            startContent={<MessageSquare className="w-4 h-4" />}
                            onPress={() => navigate('/messages')}
                          >
                            View Inquiries ({businessListing.inquiries})
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Performance Metrics */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardBody className="text-center">
                      <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{businessListing.views}</div>
                      <p className="text-sm text-gray-600">Total Views</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center">
                      <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{businessListing.inquiries}</div>
                      <p className="text-sm text-gray-600">Inquiries Received</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {businessListing.views > 0 ? ((businessListing.inquiries / businessListing.views) * 100).toFixed(1) : 0}%
                      </div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                    </CardBody>
                  </Card>
                </div>

                {/* Additional Listing Management Tools */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Listing Tools</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Performance Optimization</h4>
                        <div className="space-y-2">
                          <Button variant="bordered" size="sm" className="w-full justify-start">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            View Analytics Dashboard
                          </Button>
                          <Button variant="bordered" size="sm" className="w-full justify-start">
                            <Settings className="w-4 h-4 mr-2" />
                            SEO Optimization Tips
                          </Button>
                          <Button variant="bordered" size="sm" className="w-full justify-start">
                            <FileText className="w-4 h-4 mr-2" />
                            Update Description
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Buyer Management</h4>
                        <div className="space-y-2">
                          <Button variant="bordered" size="sm" className="w-full justify-start">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Manage Inquiries
                          </Button>
                          <Button variant="bordered" size="sm" className="w-full justify-start">
                            <Eye className="w-4 h-4 mr-2" />
                            Buyer Interest Analytics
                          </Button>
                          <Button variant="bordered" size="sm" className="w-full justify-start">
                            <Building2 className="w-4 h-4 mr-2" />
                            Schedule Meetings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ) : (
              <Card>
                <CardBody className="text-center py-12">
                  <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Business Listing</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    List your business for sale and start attracting qualified buyers. 
                    Get your business in front of serious investors.
                  </p>
                  <Button 
                    color="primary" 
                    size="lg"
                    onPress={() => navigate('/seller/listings/new')}
                  >
                    Create Business Listing
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    Tip: Complete your business valuation first for better pricing guidance
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingManagement;