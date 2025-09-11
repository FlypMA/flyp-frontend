import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@heroui/react';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Calculator,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { UserRole, UserRoleString } from '../../../types/user.consolidated';

interface SidebarSellerProps {
  selectedTab?: string;
  className?: string;
  userRole?: UserRoleString;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  key: string;
  label: string;
  icon: any;
  description?: string;
  path: string;
  isComingSoon?: boolean;
  allowedRoles?: UserRoleString[];
}

const SidebarSeller: React.FC<SidebarSellerProps> = ({
  selectedTab,
  className,
  userRole = 'seller',
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
          path: '/my-business',
          allowedRoles: ['seller', 'admin', 'both'],
        },
      ],
    },
    {
      title: 'Reports & Analysis',
      items: [
        {
          key: 'valuation',
          label: 'Business Valuation',
          icon: Calculator,
          description: 'Professional business valuation tool',
          path: '/business/valuation',
          allowedRoles: [UserRole.SELLER, UserRole.ADMIN],
        },
        {
          key: 'solvency',
          label: 'Solvency Intelligence',
          icon: TrendingUp,
          description: 'Financial health & loan eligibility',
          path: '/business/solvency',
          allowedRoles: [UserRole.SELLER, UserRole.ADMIN],
        },
        {
          key: 'liquidation',
          label: 'Liquidation Analysis',
          icon: AlertTriangle,
          description: 'Strategic sale vs liquidation',
          path: '/business/liquidation',
          allowedRoles: [UserRole.SELLER, UserRole.ADMIN],
        },
      ],
    },
    {
      title: 'Data Room',
      items: [
        {
          key: 'documents',
          label: 'Document Vault',
          icon: FileText,
          description: 'Secure document storage',
          path: '/business/documents',
          allowedRoles: [UserRole.SELLER, UserRole.ADMIN],
        },
      ],
    },
    {
      title: 'Business Management',
      items: [
        {
          key: 'listings',
          label: 'Listing Management',
          icon: Building2,
          description: 'Manage your sale listing',
          path: '/business/listings',
          allowedRoles: [UserRole.SELLER, UserRole.ADMIN],
        },
      ],
    },
  ];

  // Filter sections and items based on user role
  const filteredNavSections = navSections
    .map(section => ({
      ...section,
      items: section.items.filter(
        item => !item.allowedRoles || item.allowedRoles.includes(userRole)
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
                const isActive = selectedTab
                  ? selectedTab === item.key
                  : location.pathname === item.path;
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

export default SidebarSeller;
