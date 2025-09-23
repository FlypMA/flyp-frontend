import React, { useState } from 'react';
import { Button } from '@/shared/components/buttons/Button';
import { Card } from '@/shared/components/cards/Card';
import { TrendingUp, Eye, MessageCircle, Users, Calendar, Download, RefreshCw } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data - TODO: Replace with actual API calls
  const analytics = {
    overview: {
      totalViews: 245,
      totalInquiries: 18,
      conversionRate: 7.3,
      averageViewTime: 125,
    },
    trends: {
      views: [12, 19, 15, 25, 22, 30, 28, 35, 32, 45, 42, 38, 50, 48],
      inquiries: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 4, 7, 6],
    },
    demographics: {
      countries: [
        { name: 'Belgium', percentage: 78 },
        { name: 'Netherlands', percentage: 12 },
        { name: 'France', percentage: 6 },
        { name: 'Germany', percentage: 4 },
      ],
      buyerTypes: [
        { name: 'Individual Investors', percentage: 45 },
        { name: 'Strategic Buyers', percentage: 35 },
        { name: 'Private Equity', percentage: 15 },
        { name: 'Other', percentage: 5 },
      ],
    },
    listings: [
      {
        id: '1',
        title: 'Restaurant in Brussels',
        views: 156,
        inquiries: 12,
        conversionRate: 7.7,
        trend: '+15%',
      },
      {
        id: '2',
        title: 'Tech Consulting Firm',
        views: 89,
        inquiries: 6,
        conversionRate: 6.7,
        trend: '+8%',
      },
    ],
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // TODO: Implement refresh functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    // console.log('Exporting analytics data...');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your listing performance and buyer engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="secondary" onClick={handleRefresh} loading={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="secondary" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalViews.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% vs last period
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
              <p className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalInquiries}
              </p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +25% vs last period
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.overview.conversionRate}%
              </p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8% vs last period
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg. View Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.floor(analytics.overview.averageViewTime / 60)}m{' '}
                {analytics.overview.averageViewTime % 60}s
              </p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15s vs last period
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Views Trend Chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Views Trend</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Views</span>
              <div className="w-3 h-3 bg-green-600 rounded-full ml-4"></div>
              <span>Inquiries</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-1">
            {analytics.trends.views.map((view, index) => (
              <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                <div className="flex flex-col items-end w-full space-y-1">
                  <div
                    className="bg-blue-600 w-full rounded-t"
                    style={{ height: `${(view / Math.max(...analytics.trends.views)) * 200}px` }}
                  ></div>
                  <div
                    className="bg-green-600 w-full rounded-t"
                    style={{
                      height: `${(analytics.trends.inquiries[index] / Math.max(...analytics.trends.inquiries)) * 50}px`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Demographics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Buyer Demographics</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">By Country</h4>
              <div className="space-y-2">
                {analytics.demographics.countries.map(country => (
                  <div key={country.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{country.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary-600 rounded-full"
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900 w-8">{country.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">By Buyer Type</h4>
              <div className="space-y-2">
                {analytics.demographics.buyerTypes.map(type => (
                  <div key={type.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{type.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900 w-8">{type.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Listing Performance */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Listing Performance</h3>
          <Button variant="tertiary" size="sm">
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inquiries
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analytics.listings.map(listing => (
                <tr key={listing.id}>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <Eye className="h-4 w-4 mr-1 text-gray-400" />
                      {listing.views}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <MessageCircle className="h-4 w-4 mr-1 text-gray-400" />
                      {listing.inquiries}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-900">{listing.conversionRate}%</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center text-sm text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {listing.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
