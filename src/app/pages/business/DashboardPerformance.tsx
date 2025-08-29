import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@heroui/react';
import {
  Eye,
  MessageSquare,
  TrendingUp,
  BarChart,
  Activity,
  Users,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../types/api/users/user';
import UnifiedNavigation from '../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../components/navigation/SellerSidebar';

interface PerformanceData {
  totalViews: number;
  totalInquiries: number;
  conversionRate: number;
  avgTimeOnListing: string;
  uniqueVisitors: number;
  returnVisitors: number;
  topCountries: { country: string; views: number }[];
  weeklyViews: number[];
  weeklyInquiries: number[];
}

const DashboardPerformance = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // Mock performance data
          setPerformanceData({
            totalViews: 245,
            totalInquiries: 12,
            conversionRate: 4.9,
            avgTimeOnListing: '3m 24s',
            uniqueVisitors: 198,
            returnVisitors: 47,
            topCountries: [
              { country: 'Belgium', views: 145 },
              { country: 'Netherlands', views: 62 },
              { country: 'France', views: 28 },
              { country: 'Germany', views: 10 },
            ],
            weeklyViews: [32, 45, 28, 67, 52, 41, 33],
            weeklyInquiries: [1, 2, 1, 3, 2, 2, 1],
          });
        } else {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading performance data...</p>
        </div>
      </div>
    );
  }

  if (!performanceData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Performance Data</h2>
          <p className="text-gray-600">Performance data will appear once your listing is active.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />
      
      <div className="flex">
        <SellerSidebar selectedTab="performance" onTabChange={(tab) => navigate(`/business/${tab}`)} />
        
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard & Performance</h1>
              <p className="text-gray-600">Track your business listing performance and buyer engagement</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{performanceData.totalViews}</p>
                      <p className="text-sm text-gray-600">Total Views</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{performanceData.totalInquiries}</p>
                      <p className="text-sm text-gray-600">Inquiries</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{performanceData.conversionRate}%</p>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{performanceData.avgTimeOnListing}</p>
                      <p className="text-sm text-gray-600">Avg. Time on Page</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Charts and Detailed Analytics */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Weekly Performance Chart */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Views This Week</h4>
                      <div className="flex items-end space-x-2 h-20">
                        {performanceData.weeklyViews.map((views, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-blue-200 rounded-t"
                              style={{ height: `${(views / Math.max(...performanceData.weeklyViews)) * 100}%` }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-1">
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Inquiries This Week</h4>
                      <div className="flex items-end space-x-2 h-16">
                        {performanceData.weeklyInquiries.map((inquiries, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-green-200 rounded-t"
                              style={{ height: `${inquiries === 0 ? 5 : (inquiries / Math.max(...performanceData.weeklyInquiries)) * 100}%` }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-1">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Visitor Analytics */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Visitor Analytics</h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{performanceData.uniqueVisitors}</p>
                        <p className="text-sm text-gray-600">Unique Visitors</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{performanceData.returnVisitors}</p>
                        <p className="text-sm text-gray-600">Return Visitors</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Top Countries</h4>
                      <div className="space-y-2">
                        {performanceData.topCountries.map((country, index) => (
                          <div key={country.country} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{country.country}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${(country.views / performanceData.totalViews) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 w-8">{country.views}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-800 mb-1">Strong Interest</h4>
                    <p className="text-sm text-green-700">Your conversion rate is above industry average (3.2%)</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-800 mb-1">Good Visibility</h4>
                    <p className="text-sm text-blue-700">Your listing is getting consistent daily views</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-purple-800 mb-1">Quality Inquiries</h4>
                    <p className="text-sm text-purple-700">Buyers are spending time reviewing your business</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPerformance;
