// 🏢 Dashboard Sidebar - MVP Version
// Location: src/shared/components/navigation/dashboard/DashboardSidebar.tsx
// Purpose: Collapsible sidebar for seller dashboard with business management navigation
//
// FEATURES:
// - Collapsible sidebar with smooth animations
// - Role-based navigation items
// - Active state highlighting
// - Business management sections
// - Coming soon features
// - Responsive design (desktop only)

import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Calculator, 
  TrendingUp, 
  MessageCircle,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UrlGenerator } from '../../../../services';
import { User } from '../../../../types';
import { getDashboardSidebarSections } from '../utils';

interface DashboardSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  user?: User;
  className?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  path: string;
  isComingSoon?: boolean;
  allowedRoles?: string[];
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isCollapsed = false,
  onToggle,
  user,
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navSections: NavSection[] = [
    {
      title: 'Business Overview',
      items: [
        {
          key: 'overview',
          label: 'Dashboard',
          icon: LayoutDashboard,
          description: 'Business overview and performance',
          path: UrlGenerator.myBusiness(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
    {
      title: 'Listings & Sales',
      items: [
        {
          key: 'listings',
          label: 'My Listings',
          icon: Building2,
          description: 'Manage your business listings',
          path: UrlGenerator.myBusinessListings(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
        {
          key: 'create-listing',
          label: 'Create Listing',
          icon: Building2,
          description: 'List your business for sale',
          path: UrlGenerator.createListing(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
    {
      title: 'Analytics & Reports',
      items: [
        {
          key: 'analytics',
          label: 'Business Analytics',
          icon: BarChart3,
          description: 'Performance metrics and insights',
          path: UrlGenerator.businessAnalytics(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
        {
          key: 'performance',
          label: 'Performance',
          icon: TrendingUp,
          description: 'Business performance tracking',
          path: UrlGenerator.businessPerformance(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
    {
      title: 'Tools & Resources',
      items: [
        {
          key: 'valuation',
          label: 'Business Valuation',
          icon: Calculator,
          description: 'Professional business valuation',
          path: UrlGenerator.valuationGuide(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
        {
          key: 'documents',
          label: 'Document Vault',
          icon: FileText,
          description: 'Secure document storage',
          path: '/business/documents',
          isComingSoon: true,
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
    {
      title: 'Communication',
      items: [
        {
          key: 'messages',
          label: 'Messages',
          icon: MessageCircle,
          description: 'Buyer inquiries and communication',
          path: UrlGenerator.messages(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          key: 'settings',
          label: 'Account Settings',
          icon: Settings,
          description: 'Manage your account preferences',
          path: UrlGenerator.userSettings(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
  ];

  // Filter sections and items based on user role
  const filteredNavSections = navSections
    .map(section => ({
      ...section,
      items: section.items.filter(
        item => !item.allowedRoles || item.allowedRoles.includes(user?.role || 'seller')
      ),
    }))
    .filter(section => section.items.length > 0);

  const handleItemClick = (path: string, isComingSoon?: boolean) => {
    if (!isComingSoon) {
      navigate(path);
    }
  };

  return (
    <div
      className={`fixed hidden md:flex inset-y-0 left-0 bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col h-full">
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BD</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
          )}
          
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4">
          {filteredNavSections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
              {/* Section Title */}
              {!isCollapsed && (
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
              )}

              {/* Section Items */}
              <div className="space-y-1 px-2">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  const isDisabled = item.isComingSoon;

                  return (
                    <button
                      key={item.key}
                      onClick={() => handleItemClick(item.path, item.isComingSoon)}
                      disabled={isDisabled}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          isActive ? 'text-primary-600' : 'text-gray-500'
                        }`}
                      />
                      
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {item.label}
                            {isDisabled && (
                              <span className="ml-2 text-xs text-gray-400 font-normal">
                                (Coming Soon)
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-0.5 truncate">
                              {item.description}
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Info (Bottom) */}
        {!isCollapsed && user && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {user.name || 'User'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user.role}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
