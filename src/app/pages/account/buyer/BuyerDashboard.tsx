import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@heroui/react';
import { Heart, MessageSquare, TrendingUp, Bookmark } from 'lucide-react';
import { authService } from '../../../services/users/authenticationService';
import { UserProfile } from '../../../../types/api';
import BuyerSidebarNavigation from '../../../components/navigation/BuyerSidebarNavigation';
import DashboardOverview from '../../../components/buyer/DashboardOverview';
import DiscoverBusinesses from '../../../components/buyer/DiscoverBusinesses';
import FavoriteBusinesses from '../../../components/buyer/FavoriteBusinesses';
import InquiryManagement from '../../../components/buyer/InquiryManagement';
import MyBusinesses from '../../../components/buyer/MyBusinesses';
import SavedSearches from '../../../components/buyer/SavedSearches';
import UnifiedNavigation from '../../../components/navigation/UnifiedNavigation';

interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    sector?: string;
    country?: string;
    priceRange?: [number, number];
    revenueRange?: [number, number];
  };
  results_count: number;
  last_run: string;
  alert_enabled: boolean;
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

interface BuyerStats {
  saved_searches: number;
  viewed_listings: number;
  saved_listings: number;
  active_inquiries: number;
  new_matches: number;
}

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [recentListings, setRecentListings] = useState<RecentListing[]>([]);
  const [stats, setStats] = useState<BuyerStats>({
    saved_searches: 0,
    viewed_listings: 0,
    saved_listings: 0,
    active_inquiries: 0,
    new_matches: 0,
  });
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for navigation events from avatar dropdown
    const handleBuyerNavigation = (event: CustomEvent) => {
      const targetTab = event.detail;
      if (['favorites', 'inquiries', 'businesses'].includes(targetTab)) {
        setSelectedTab(targetTab);
      }
    };

    window.addEventListener('navigate-buyer-tab', handleBuyerNavigation as EventListener);

    return () => {
      window.removeEventListener('navigate-buyer-tab', handleBuyerNavigation as EventListener);
    };
  }, []);

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

          // Mock saved searches
          setSavedSearches([
            {
              id: '1',
              name: 'Tech Companies Belgium',
              criteria: {
                sector: 'Technology',
                country: 'BE',
                priceRange: [500000, 5000000],
              },
              results_count: 12,
              last_run: '2024-01-22',
              alert_enabled: true,
            },
            {
              id: '2',
              name: 'Restaurants Under €2M',
              criteria: {
                sector: 'Food & Beverage',
                priceRange: [0, 2000000],
              },
              results_count: 8,
              last_run: '2024-01-21',
              alert_enabled: false,
            },
          ]);

          // Mock recent listings with enhanced data
          setRecentListings([
            {
              id: '1',
              title: 'Premium Restaurant Chain - Brussels',
              sector: 'Food & Beverage',
              country: 'Belgium',
              asking_price: 2500000,
              currency: 'EUR',
              summary:
                'Established restaurant chain with 3 prime Brussels locations. Strong customer base, proven systems, and excellent growth potential in expanding European food scene.',
              views: 245,
              published_at: '2024-01-15',
              featured: true,
              employees: '25-30',
              founded_year: '2015',
            },
            {
              id: '2',
              title: 'Enterprise SaaS Platform - Ghent',
              sector: 'Technology',
              country: 'Belgium',
              asking_price: 1800000,
              currency: 'EUR',
              summary:
                'Growing B2B SaaS company specializing in enterprise workflow solutions. Strong recurring revenue model with 200+ active clients and 15 dedicated team members.',
              views: 189,
              published_at: '2024-01-18',
              featured: true,
              employees: '15',
              founded_year: '2019',
            },
            {
              id: '3',
              title: 'Precision Manufacturing - Antwerp',
              sector: 'Manufacturing',
              country: 'Belgium',
              asking_price: 3200000,
              currency: 'EUR',
              summary:
                'Specialized precision manufacturing company with modern CNC equipment, established supply chains, and long-term contracts with automotive industry clients.',
              views: 156,
              published_at: '2024-01-20',
              featured: false,
              employees: '45',
              founded_year: '2008',
            },
            {
              id: '4',
              title: 'Digital Marketing Agency - Amsterdam',
              sector: 'Professional Services',
              country: 'Netherlands',
              asking_price: 950000,
              currency: 'EUR',
              summary:
                'Full-service digital marketing agency with 50+ active clients, strong brand reputation, and experienced team of 12 marketing specialists.',
              views: 123,
              published_at: '2024-01-21',
              featured: false,
              employees: '12',
              founded_year: '2017',
            },
          ]);

          // Mock stats
          setStats({
            saved_searches: 2,
            viewed_listings: 28,
            saved_listings: 7,
            active_inquiries: 3,
            new_matches: 12,
          });
        }
      } catch (error) {
        console.error('Error initializing buyer dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  // Render different content based on selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return (
          <DashboardOverview
            stats={stats}
            recentListings={recentListings}
            userName={user?.full_name || 'Buyer'}
          />
        );
      case 'discover':
        return <DiscoverBusinesses />;
      case 'favorites':
        return <FavoriteBusinesses />;
      case 'inquiries':
        return <InquiryManagement />;
      case 'businesses':
        return <MyBusinesses />;
      case 'searches':
        return <SavedSearches />;
      case 'insights':
        return (
          <Card className="border border-gray-200">
            <CardBody className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-indigo-100 rounded-2xl w-fit mx-auto mb-4">
                  <TrendingUp className="w-12 h-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Insights</h3>
                <p className="text-gray-600 mb-6">
                  Access detailed market analysis, pricing trends, and sector performance data.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Coming in Phase 4 development
                </div>
              </div>
            </CardBody>
          </Card>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <UnifiedNavigation />

      <div className="flex">
        {/* Sidebar Navigation */}
        <BuyerSidebarNavigation
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          stats={stats}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
