// 🏢 Dashboard Sidebar - Legacy Design
// Location: src/shared/components/navigation/dashboard/DashboardSidebar.tsx
// Purpose: Seller dashboard sidebar with legacy design and copy
//
// FEATURES:
// - Legacy design matching the original app
// - Role-based navigation items
// - Active state highlighting
// - Business management sections
// - Coming soon features
// - Responsive design (desktop only)

import { cn } from '@heroui/react';
import { Building2, Calculator, FileText, LayoutDashboard } from 'lucide-react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { UrlGenerator } from '../../../../services';

interface DashboardSidebarProps {
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

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navSections: NavSection[] = [
    {
      title: 'My business',
      items: [
        {
          key: 'overview',
          label: 'My business',
          icon: LayoutDashboard,
          description: 'See and manage your business',
          path: UrlGenerator.myBusiness(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
    {
      title: 'Business Tools',
      items: [
        {
          key: 'valuation',
          label: 'Valuation',
          icon: Calculator,
          description: 'Get your business valued and create listings',
          path: '/my-business/valuations',
          allowedRoles: ['seller', 'admin', 'both'],
        },
        {
          key: 'listings',
          label: 'Listings',
          icon: Building2,
          description: 'Manage your business listings',
          path: UrlGenerator.businessListings(),
          allowedRoles: ['seller', 'admin', 'both'],
        },
        {
          key: 'documents',
          label: 'Documents',
          icon: FileText,
          description: 'Upload and manage business documents',
          path: UrlGenerator.businessDocuments(),
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

  return (
    <nav
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 shadow-sm',
        'min-h-screen w-80 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto',
        className
      )}
    >
      {/* Navigation Sections */}
      <div className="flex-1 py-6">
        {filteredNavSections.map((section, sectionIndex) => (
          <div key={section.title} className={cn('px-6', sectionIndex > 0 && 'mt-8')}>
            {/* Section Title */}
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {section.title}
            </h3>

            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                // Precise active state detection - only exact matches or specific parent paths
                const isActive = (() => {
                  // Exact match
                  if (location.pathname === item.path) {
                    return true;
                  }

                  // Special case: Dashboard should only be active on exact business overview path
                  if (item.key === 'overview') {
                    return location.pathname === UrlGenerator.myBusiness();
                  }

                  // For other items, only match if current path starts with item path AND has additional segments
                  // This prevents parent paths from being active when on child paths
                  if (item.path !== '/' && location.pathname.startsWith(item.path)) {
                    const remainingPath = location.pathname.slice(item.path.length);
                    // Only consider active if there's a trailing slash or additional path segments
                    return remainingPath === '' || remainingPath.startsWith('/');
                  }

                  return false;
                })();
                const isDisabled = item.isComingSoon;

                return (
                  <button
                    key={item.key}
                    onClick={() => !isDisabled && navigate(item.path)}
                    disabled={isDisabled}
                    className={cn(
                      'w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all duration-150',
                      'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
                      isActive && 'bg-primary-50 border-primary-200 shadow-sm',
                      isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5 mt-0.5 flex-shrink-0',
                        isActive ? 'text-primary-600' : 'text-gray-500'
                      )}
                    />

                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          'text-sm font-medium',
                          isActive ? 'text-primary-700' : 'text-gray-900'
                        )}
                      >
                        {item.label}
                        {isDisabled && (
                          <span className="ml-2 text-xs text-gray-400 font-normal">
                            (Coming Soon)
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DashboardSidebar;
