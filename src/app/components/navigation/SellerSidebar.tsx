import React from 'react';
import { cn } from '@heroui/react';
import { LayoutDashboard, Building2, FileText, Calculator } from 'lucide-react';

interface SellerSidebarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
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
  isComingSoon?: boolean;
}

const SellerSidebar: React.FC<SellerSidebarProps> = ({
  selectedTab,
  onTabChange,
  className,
}) => {
  const navSections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        {
          key: 'overview',
          label: 'My business',
          icon: LayoutDashboard,
          description: '',
        },
      ],
    },
    {
      title: 'Listing',
      items: [
        {
          key: 'listings',
          label: 'Manage your listing',
          icon: Building2,
          description: '',
        },
      ],
    },
    {
      title: 'Valuation',
      items: [
        {
          key: 'valuation',
          label: 'Calculate your business valuation',
          icon: Calculator,
          description: '',
          isComingSoon: true,
        },
      ],
    },
  ];

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
        {navSections.map((section, sectionIndex) => (
          <div key={section.title} className={cn('px-6', sectionIndex > 0 && 'mt-8')}>
            {/* Section Title */}
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {section.title}
            </h3>
            
            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = selectedTab === item.key;
                const isDisabled = item.isComingSoon;

                return (
                  <button
                    key={item.key}
                    onClick={() => !isDisabled && onTabChange(item.key)}
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
                      <div className={cn(
                        'text-sm font-medium',
                        isActive ? 'text-primary-700' : 'text-gray-900'
                      )}>
                        {item.label}
                        {isDisabled && (
                          <span className="ml-2 text-xs text-gray-400 font-normal">(Coming Soon)</span>
                        )}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </div>
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

export default SellerSidebar;
