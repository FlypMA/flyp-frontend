// 📱 Dashboard Sidebar Mobile - MVP Version
// Location: src/shared/components/navigation/dashboard/DashboardSidebarMobile.tsx
// Purpose: Mobile-optimized sidebar for seller dashboard with business management navigation
//
// FEATURES:
// - Mobile-optimized sidebar with slide-in animation
// - Backdrop overlay for mobile UX
// - Touch-friendly navigation items
// - Role-based navigation items
// - Active state highlighting
// - Business management sections
// - Coming soon features

import {
  BarChart3,
  Building2,
  Calculator,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Settings,
  TrendingUp,
  X,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../app/providers/auth-provider';
import { UrlGenerator } from '../../../../services';

interface DashboardSidebarMobileProps {
  isOpen: boolean;
  onClose: () => void;
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

const DashboardSidebarMobile: React.FC<DashboardSidebarMobileProps> = ({
  isOpen,
  onClose,
  className = '',
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

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
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BD</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
                {user && <p className="text-sm text-gray-500">{user.name || user.email}</p>}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 overflow-y-auto py-4">
            {filteredNavSections.map((section, sectionIndex) => (
              <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                {/* Section Title */}
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>

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
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 border border-primary-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 ${
                            isActive ? 'text-primary-600' : 'text-gray-500'
                          }`}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">
                            {item.label}
                            {isDisabled && (
                              <span className="ml-2 text-xs text-gray-400 font-normal">
                                (Coming Soon)
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">flyp Dashboard</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebarMobile;
