import React from 'react';
import { cn } from '@heroui/react';
import { LayoutDashboard, Building2, MessageSquare, TrendingUp, ChevronRight } from 'lucide-react';

interface SidebarNavigationProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  isComingSoon?: boolean;
  description?: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  selectedTab,
  onTabChange,
  className,
}) => {
  const navItems: NavItem[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Dashboard summary',
    },
    {
      key: 'listings',
      label: 'Listings',
      icon: Building2,
      description: 'Manage your listings',
    },
    {
      key: 'inquiries',
      label: 'Inquiries',
      icon: MessageSquare,
      description: 'Buyer inquiries',
      isComingSoon: true,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      description: 'Performance metrics',
      isComingSoon: true,
    },
  ];

  return (
    <nav
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 shadow-sm',
        'min-h-screen w-64 sticky top-0',
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your business</p>
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
                  'w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200',
                  'text-left hover:bg-gray-50 group',
                  isActive && 'bg-primary-50 border border-primary-100 shadow-sm',
                  isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
                  !isActive && !isDisabled && 'hover:shadow-sm'
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      'flex-shrink-0 p-2 rounded-md transition-colors',
                      isActive ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600',
                      !isDisabled && 'group-hover:bg-primary-100 group-hover:text-primary-600'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p
                        className={cn(
                          'text-sm font-medium truncate transition-colors',
                          isActive ? 'text-primary-700' : 'text-gray-900',
                          !isDisabled && 'group-hover:text-primary-700'
                        )}
                      >
                        {item.label}
                      </p>
                      {item.isComingSoon && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                          Soon
                        </span>
                      )}
                      {item.count && (
                        <span
                          className={cn(
                            'px-2 py-0.5 text-xs font-medium rounded-full',
                            isActive
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-gray-100 text-gray-600'
                          )}
                        >
                          {item.count}
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
                      'w-4 h-4 transition-all duration-200',
                      isActive
                        ? 'text-primary-600 rotate-90'
                        : 'text-gray-400 opacity-0 group-hover:opacity-100'
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-md">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Need Help?</p>
              <p className="text-xs text-gray-600">Check our guides</p>
            </div>
          </div>
          <button className="w-full mt-3 px-3 py-2 text-xs font-medium text-primary-600 bg-white hover:bg-primary-50 rounded-md border border-primary-200 transition-colors">
            View Documentation
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SidebarNavigation;
