// 📊 Dashboard Stats - MVP Version
// Location: src/features/business-dashboard/components/DashboardStats.tsx
// Purpose: Business dashboard statistics and metrics display

import React from 'react';
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

interface DashboardStatsProps {
  performanceData: PerformanceData;
  isLoading?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ performanceData, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Views',
      value: performanceData.totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Inquiries',
      value: performanceData.totalInquiries.toLocaleString(),
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Conversion Rate',
      value: `${performanceData.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+2.1%',
      changeType: 'positive' as const,
    },
    {
      title: 'Avg. Time on Listing',
      value: performanceData.avgTimeOnListing,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+15s',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <CardBody className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
