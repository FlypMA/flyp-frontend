import React from 'react';
import { cn } from '@heroui/react';
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Building2,
  Eye,
  Shield,
  Users,
  HelpCircle,
  Settings as SettingsIcon,
} from 'lucide-react';

interface SettingsSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  selectedSection,
  onSectionChange,
  className,
}) => {
  const settingsSections: SettingsSection[] = [
    // Account Settings
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Personal information and avatar',
      category: 'Account',
    },
    {
      id: 'security',
      label: 'Security',
      icon: Lock,
      description: 'Password and authentication',
      category: 'Account',
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: Eye,
      description: 'Data and visibility settings',
      category: 'Account',
    },

    // Business Settings
    {
      id: 'company',
      label: 'Company Profile',
      icon: Building2,
      description: 'Business information',
      category: 'Business',
    },
    {
      id: 'verification',
      label: 'Verification',
      icon: Shield,
      description: 'Identity verification status',
      category: 'Business',
    },
    {
      id: 'team',
      label: 'Team Members',
      icon: Users,
      description: 'Manage team access',
      category: 'Business',
    },

    // Platform Settings
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Email and push preferences',
      category: 'Platform',
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      description: 'Subscription and payments',
      category: 'Platform',
    },
    {
      id: 'support',
      label: 'Support',
      icon: HelpCircle,
      description: 'Help and contact options',
      category: 'Platform',
    },
  ];

  const groupedSections = settingsSections.reduce(
    (acc, section) => {
      if (!acc[section.category]) {
        acc[section.category] = [];
      }
      acc[section.category].push(section);
      return acc;
    },
    {} as Record<string, SettingsSection[]>
  );

  return (
    <nav
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 shadow-sm',
        'min-h-screen w-80 sticky top-0',
        className
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-500">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 p-4 space-y-8">
        {Object.entries(groupedSections).map(([category, sections]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {category}
            </h3>
            <div className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon;
                const isActive = selectedSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={cn(
                      'w-full flex items-start p-3 rounded-xl transition-all duration-200',
                      'text-left group hover:bg-gray-50',
                      isActive && 'bg-primary-50 border border-primary-100 shadow-sm'
                    )}
                  >
                    <div
                      className={cn(
                        'flex-shrink-0 p-2 rounded-lg mr-3 transition-colors',
                        isActive
                          ? 'bg-primary-100 text-primary-600'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-600'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'text-sm font-semibold truncate transition-colors',
                          isActive
                            ? 'text-primary-700'
                            : 'text-gray-900 group-hover:text-primary-700'
                        )}
                      >
                        {section.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {section.description}
                      </p>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Security Status</p>
              <p className="text-xs text-gray-600">Your account is secure</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-gray-500">Last login: Today</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SettingsSidebar;
