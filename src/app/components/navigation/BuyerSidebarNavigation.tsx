import React from 'react';
import { cn } from '@heroui/react';
import {
  LayoutDashboard,
  Search,
  Heart,
  MessageSquare,
  Bookmark,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
} from 'lucide-react';

interface BuyerSidebarNavigationProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  stats?: {
    saved_searches: number;
    saved_listings: number;
    active_inquiries: number;
    new_matches: number;
  };
  className?: string;
}

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  isComingSoon?: boolean;
  description?: string;
  gradient?: string;
}

const BuyerSidebarNavigation: React.FC<BuyerSidebarNavigationProps> = ({
  selectedTab,
  onTabChange,
  stats,
  className,
}) => {
  const navItems: NavItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & activity',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      key: 'discover',
      label: 'Discover',
      icon: Search,
      description: 'Find businesses',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      key: 'favorites',
      label: 'Favorites',
      icon: Heart,
      count: stats?.saved_listings,
      description: 'Saved businesses',
      gradient: 'from-pink-500 to-pink-600',
    },
    {
      key: 'searches',
      label: 'Saved Searches',
      icon: Bookmark,
      count: stats?.saved_searches,
      description: 'Your search alerts',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      key: 'inquiries',
      label: 'Inquiries',
      icon: MessageSquare,
      count: stats?.active_inquiries,
      description: 'Active conversations',
      gradient: 'from-orange-500 to-orange-600',
      isComingSoon: true,
    },
    {
      key: 'insights',
      label: 'Market Insights',
      icon: TrendingUp,
      description: 'Market trends',
      gradient: 'from-indigo-500 to-indigo-600',
      isComingSoon: true,
    },
  ];

  return (
    <nav
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 shadow-sm',
        'min-h-screen w-72 sticky top-0',
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Buyer Hub</h2>
            <p className="text-sm text-gray-500">Find your next acquisition</p>
          </div>
        </div>

        {stats?.new_matches && stats.new_matches > 0 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {stats.new_matches} new matches
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">Based on your saved searches</p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = selectedTab === item.key;
            const isDisabled = item.isComingSoon;

            return (
              <button
                key={item.key}
                onClick={() => !isDisabled && onTabChange(item.key)}
                disabled={isDisabled}
                className={cn(
                  'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200',
                  'text-left group relative overflow-hidden',
                  isActive &&
                    'bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 shadow-md',
                  !isActive && !isDisabled && 'hover:bg-gray-50 hover:shadow-sm',
                  isDisabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div
                    className={cn(
                      'flex-shrink-0 p-2.5 rounded-lg transition-all duration-200',
                      isActive && item.gradient
                        ? `bg-gradient-to-r ${item.gradient}`
                        : 'bg-gray-100',
                      !isActive && 'bg-gray-100 group-hover:bg-gray-200'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5 transition-colors',
                        isActive ? 'text-white' : 'text-gray-600'
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p
                        className={cn(
                          'text-sm font-semibold truncate transition-colors',
                          isActive ? 'text-gray-900' : 'text-gray-700',
                          !isDisabled && 'group-hover:text-gray-900'
                        )}
                      >
                        {item.label}
                      </p>
                      {item.isComingSoon && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                          Soon
                        </span>
                      )}
                      {item.count !== undefined && item.count > 0 && (
                        <span
                          className={cn(
                            'px-2 py-0.5 text-xs font-bold rounded-full min-w-[20px] text-center',
                            isActive
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-200 text-gray-700 group-hover:bg-primary-100 group-hover:text-primary-700'
                          )}
                        >
                          {item.count > 99 ? '99+' : item.count}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
                    )}
                  </div>
                </div>

                {!isDisabled && (
                  <ChevronRight
                    className={cn(
                      'w-4 h-4 transition-all duration-200 flex-shrink-0',
                      isActive
                        ? 'text-primary-600 rotate-90 opacity-100'
                        : 'text-gray-400 opacity-0 group-hover:opacity-100'
                    )}
                  />
                )}

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 rounded-xl" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Market Status Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Market Active</p>
              <p className="text-xs text-gray-600">1,247 businesses listed</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-gray-500">New this week: 23</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BuyerSidebarNavigation;
