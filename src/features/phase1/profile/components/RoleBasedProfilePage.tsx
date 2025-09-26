/**
 * 🎯 Role-Based Profile Page
 *
 * Optimized profile page that emphasizes common professional backgrounds
 * while maintaining role-specific differences
 */

import { Card, CardBody, CardHeader, Tab, Tabs } from '@heroui/react';
import { Briefcase, Building2, MessageCircle, Settings, Target, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Profile } from '../types/profile.types';
import { getRoleConfig } from '../types/roleBased.types';
import { CommunicationPreferences } from './CommunicationPreferences';
import { ProfileCompletion } from './ProfileCompletion';
import { ProfileEditModal } from './ProfileEditModal';
import { ProfileHeader } from './ProfileHeader';
import { BusinessOwnerProfile } from './ProfileSections/BusinessOwnerProfile';
import { InvestorProfile } from './ProfileSections/InvestorProfile';
import { ProfessionalBackground } from './ProfileSections/ProfessionalBackground';
import { SharedProfile } from './ProfileSections/SharedProfile';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface RoleBasedProfilePageProps {
  profile: Profile;
  isOwnProfile?: boolean;
  onProfileUpdate?: (profile: unknown) => void;
  className?: string;
}

// =============================================================================
// ROLE-BASED PROFILE PAGE COMPONENT
// =============================================================================

export const RoleBasedProfilePage: React.FC<RoleBasedProfilePageProps> = ({
  profile,
  isOwnProfile = false,
  onProfileUpdate,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Get role configuration
  const roleConfig = getRoleConfig(profile.role);

  // =============================================================================
  // EFFECTS
  // =============================================================================

  useEffect(() => {
    // Set default tab based on role
    if (profile.role === 'seller') {
      setActiveTab('business');
    } else if (profile.role === 'buyer') {
      setActiveTab('investment');
    } else {
      setActiveTab('overview');
    }
  }, [profile.role]);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleProfileSectionUpdate = async (section: string, data: unknown) => {
    try {
      // Update profile section
      onProfileUpdate?.({ [section]: data });
    } catch {
      // TODO: Add error notification
      // Error handling for profile section update
    }
  };

  const handleProfileUpdate = async (updatedProfile: unknown) => {
    try {
      onProfileUpdate?.(updatedProfile);
      setShowEditModal(false);
    } catch {
      // TODO: Add error notification
      // Error handling for profile update
    }
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderRoleHeader = () => {
    const IconComponent = getIconComponent(roleConfig.icon);

    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className={`bg-${roleConfig.color}-100 p-3 rounded-full`}>
            <IconComponent className={`w-6 h-6 text-${roleConfig.color}-600`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{roleConfig.displayName}</h2>
            <p className="text-gray-600">{roleConfig.description}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderProfileTabs = () => {
    const tabs = [
      {
        id: 'overview',
        label: 'Overview',
        icon: Briefcase,
        description: 'Professional background and experience',
      },
      {
        id: 'business',
        label: 'Business',
        icon: Building2,
        description: 'Business information and exit strategy',
        show: profile.role === 'seller' || profile.role === 'both',
      },
      {
        id: 'investment',
        label: 'Investment',
        icon: Target,
        description: 'Investment profile and preferences',
        show: profile.role === 'buyer' || profile.role === 'both',
      },
      {
        id: 'communication',
        label: 'Communication',
        icon: MessageCircle,
        description: 'Communication preferences and availability',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        description: 'Privacy and platform settings',
        show: isOwnProfile,
      },
    ].filter(tab => tab.show !== false);

    return (
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={key => setActiveTab(key as string)}
        className="mb-6"
        variant="underlined"
        color="primary"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            title={
              <div className="flex items-center space-x-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    );
  };

  const renderOverviewTab = () => {
    return (
      <div className="space-y-6">
        {/* Professional Background - Always shown */}
        <ProfessionalBackground
          profile={profile}
          isEditing={isEditing}
          onUpdate={data => handleProfileSectionUpdate('commonBackground', data)}
          onFieldUpdate={(field, value) =>
            handleProfileSectionUpdate('commonBackground', { [field]: value })
          }
        />

        {/* Role-specific overview content */}
        {profile.role === 'seller' && (
          <Card className="border border-gray-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Business Overview</h3>
                  <p className="text-gray-600 text-sm">Current business and exit strategy</p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile.businessOwnerData?.revenueRange || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Revenue Range</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {profile.businessOwnerData?.employeeCount || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile.businessOwnerData?.businessAge || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Years in Business</div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {profile.role === 'buyer' && (
          <Card className="border border-gray-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Investment Overview</h3>
                  <p className="text-gray-600 text-sm">Investment capacity and focus</p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {profile.investorData?.investmentCapacity?.preferredRange || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Investment Range</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile.investorData?.investmentExperience?.totalDeals || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Total Deals</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile.investorData?.investmentExperience?.successfulExits || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Successful Exits</div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {profile.role === 'both' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Current Business</h3>
                    <p className="text-gray-600 text-sm">Business information</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium">
                      {profile.businessOwnerData?.revenueRange || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees:</span>
                    <span className="font-medium">
                      {profile.businessOwnerData?.employeeCount || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Years:</span>
                    <span className="font-medium">
                      {profile.businessOwnerData?.businessAge || 'N/A'}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Investment Profile</h3>
                    <p className="text-gray-600 text-sm">Investment capacity</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Range:</span>
                    <span className="font-medium">
                      {profile.investorData?.investmentCapacity?.preferredRange || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deals:</span>
                    <span className="font-medium">
                      {profile.investorData?.investmentExperience?.totalDeals || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exits:</span>
                    <span className="font-medium">
                      {profile.investorData?.investmentExperience?.successfulExits || 'N/A'}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'business':
        return (
          <BusinessOwnerProfile
            profile={profile}
            isEditing={isEditing}
            onUpdate={data => handleProfileSectionUpdate('businessOwnerData', data)}
            onFieldUpdate={(field, value) =>
              handleProfileSectionUpdate('businessOwnerData', { [field]: value })
            }
          />
        );
      case 'investment':
        return (
          <InvestorProfile
            profile={profile}
            isEditing={isEditing}
            onUpdate={data => handleProfileSectionUpdate('investorData', data)}
            onFieldUpdate={(field, value) =>
              handleProfileSectionUpdate('investorData', { [field]: value })
            }
          />
        );
      case 'communication':
        return (
          <CommunicationPreferences
            preferences={profile.sharedData.communication}
            onUpdate={data => handleProfileSectionUpdate('sharedData', { communication: data })}
          />
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <SharedProfile
              profile={profile}
              isEditing={isEditing}
              onUpdate={data => handleProfileSectionUpdate('sharedData', data)}
              onFieldUpdate={(field, value) =>
                handleProfileSectionUpdate('sharedData', { [field]: value })
              }
            />
            <ProfileCompletion profile={profile} completion={profile.completion} />
          </div>
        );
      default:
        return renderOverviewTab();
    }
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${className}`}>
      {/* Profile Header */}
      <ProfileHeader
        profile={profile}
        isOwnProfile={isOwnProfile}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        onEditProfile={() => setShowEditModal(true)}
        className="mb-8"
      />

      {/* Role Header */}
      {renderRoleHeader()}

      {/* Profile Tabs */}
      {renderProfileTabs()}

      {/* Active Tab Content */}
      {renderActiveTabContent()}

      {/* Profile Edit Modal */}
      {isOwnProfile && (
        <ProfileEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Building2,
    Target,
    Users,
    Shield: Users, // Fallback
  };

  return icons[iconName] || Briefcase;
};

export default RoleBasedProfilePage;
