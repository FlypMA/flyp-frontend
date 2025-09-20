import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/buttons/Button';
import { Card } from '@/shared/components/cards/Card';
import {
  Building2,
  Eye,
  MessageCircle,
  TrendingUp,
  Plus,
  Users,
  Euro,
  Calendar,
} from 'lucide-react';

export const DashboardHomePage: React.FC = () => {
  // Mock data - TODO: Replace with actual API calls
  const stats = {
    totalListings: 2,
    totalViews: 1247,
    totalInquiries: 18,
    activeConversations: 5,
  };

  const recentActivity = [
    {
      type: 'view',
      message: 'Your listing "Restaurant in Brussels" was viewed',
      time: '2 hours ago',
    },
    { type: 'inquiry', message: 'New inquiry from John Smith', time: '4 hours ago' },
    { type: 'message', message: 'Reply from potential buyer', time: '1 day ago' },
    { type: 'view', message: 'Your listing "Tech Consulting" was viewed', time: '2 days ago' },
  ];

  const listings = [
    {
      id: '1',
      title: 'Restaurant in Brussels',
      price: 350000,
      views: 89,
      inquiries: 12,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Tech Consulting Firm',
      price: 750000,
      views: 156,
      inquiries: 6,
      status: 'active',
      createdAt: '2024-01-10',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your business listings and track performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Building2 className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Listings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalViews.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Inquiries</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeConversations}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Listings */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Your Listings</h2>
            <Link to="/dashboard/listings/create">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Listing
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {listings.map(listing => (
              <div
                key={listing.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      listing.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Euro className="h-4 w-4 mr-1" />€{listing.price.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {listing.views} views
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {listing.inquiries} inquiries
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Listed {new Date(listing.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="tertiary" size="sm">
                      View
                    </Button>
                    <Button variant="tertiary" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/dashboard/listings">
              <Button variant="tertiary" size="sm" className="w-full">
                View All Listings
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className={`p-1.5 rounded-full ${
                    activity.type === 'view'
                      ? 'bg-blue-100'
                      : activity.type === 'inquiry'
                        ? 'bg-green-100'
                        : activity.type === 'message'
                          ? 'bg-yellow-100'
                          : 'bg-gray-100'
                  }`}
                >
                  {activity.type === 'view' && <Eye className="h-3 w-3 text-blue-600" />}
                  {activity.type === 'inquiry' && <Users className="h-3 w-3 text-green-600" />}
                  {activity.type === 'message' && (
                    <MessageCircle className="h-3 w-3 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="tertiary" size="sm" className="w-full mt-4">
            View All Activity
          </Button>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/dashboard/listings/create">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <Plus className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Create New Listing</h3>
              <p className="text-sm text-gray-600 mt-1">List your business for sale</p>
            </div>
          </Card>
        </Link>

        <Link to="/dashboard/analytics">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Track your performance</p>
            </div>
          </Card>
        </Link>

        <Link to="/messages">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600 mt-1">Chat with potential buyers</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};
