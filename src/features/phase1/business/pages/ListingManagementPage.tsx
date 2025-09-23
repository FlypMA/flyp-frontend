import { Button } from '@/shared/components/buttons/Button';
import { Card } from '@/shared/components/cards/Card';
import { CustomDropdown, Input } from '@/shared/components/forms';
import {
  Calendar,
  Edit,
  Euro,
  Eye,
  Filter,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  price: number;
  revenue: number;
  location: string;
  industry: string;
  status: 'active' | 'draft' | 'sold' | 'expired';
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}

export const ListingManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - TODO: Replace with actual API calls
  const [listings] = useState<Listing[]>([
    {
      id: '1',
      title: 'Established Restaurant in Brussels',
      price: 350000,
      revenue: 180000,
      location: 'Brussels',
      industry: 'Restaurant',
      status: 'active',
      views: 89,
      inquiries: 12,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      title: 'Tech Consulting Firm',
      price: 750000,
      revenue: 450000,
      location: 'Antwerp',
      industry: 'Technology',
      status: 'active',
      views: 156,
      inquiries: 6,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
    },
    {
      id: '3',
      title: 'Manufacturing Business',
      price: 1200000,
      revenue: 800000,
      location: 'Ghent',
      industry: 'Manufacturing',
      status: 'draft',
      views: 0,
      inquiries: 0,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    },
  ]);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600">Manage and track your business listings</p>
        </div>
        <Link to="/dashboard/listings/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Listing
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
            <p className="text-sm text-gray-600">Total Listings</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {listings.filter(l => l.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {listings.reduce((sum, l) => sum + l.views, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Views</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">
              {listings.reduce((sum, l) => sum + l.inquiries, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Inquiries</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
              label=""
              onBlur={() => {}}
              name="search"
            />
          </div>
          <CustomDropdown
            label="Status Filter"
            placeholder="All Status"
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
              { value: 'sold', label: 'Sold' },
              { value: 'expired', label: 'Expired' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            name="statusFilter"
          />
          <Button variant="secondary">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Listings Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map(listing => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                      <div className="text-sm text-gray-500">
                        {listing.industry} • {listing.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Euro className="h-4 w-4 mr-1" />
                      {listing.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      €{listing.revenue.toLocaleString()}/yr revenue
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}
                    >
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {listing.views}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {listing.inquiries}
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {Math.round((listing.inquiries / (listing.views || 1)) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(listing.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="tertiary" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="tertiary" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="tertiary" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button variant="tertiary" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No listings found matching your criteria.</p>
            {searchTerm || statusFilter !== 'all' ? (
              <Button
                variant="tertiary"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="mt-2"
              >
                Clear filters
              </Button>
            ) : (
              <Link to="/dashboard/listings/create" className="mt-4 inline-block">
                <Button>Create your first listing</Button>
              </Link>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
