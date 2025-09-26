/**
 * 🏢 Business Owner Profile Section
 *
 * Business owner specific profile information section
 */

import { Button } from '@/shared/components/buttons';
import { Card, CardBody, CardHeader, Input, Select, SelectItem, Textarea } from '@heroui/react';
import { Award, Briefcase, Building2, Calendar, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react';
import {
  BusinessOwnerProfile as BusinessOwnerProfileType,
  Profile,
} from '../../types/profile.types';
import BusinessTimeline from '../BusinessTimeline';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface BusinessOwnerProfileProps {
  profile: Profile;
  isEditing?: boolean;
  onUpdate?: (data: Partial<BusinessOwnerProfileType>) => void;
  onFieldUpdate?: (field: string, value: any) => void;
  className?: string;
  userId?: string;
}

// =============================================================================
// BUSINESS OWNER PROFILE COMPONENT
// =============================================================================

export const BusinessOwnerProfile: React.FC<BusinessOwnerProfileProps> = ({
  profile,
  isEditing = false,
  onUpdate,
  onFieldUpdate,
  className = '',
  userId,
}) => {
  const [localData, setLocalData] = useState<Partial<BusinessOwnerProfileType>>(
    profile.businessOwnerData || {}
  );

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleFieldChange = (field: string, value: any) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onFieldUpdate?.(field, value);
  };

  const handleSave = () => {
    onUpdate?.(localData);
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderBusinessInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          {isEditing ? (
            <Input
              value={localData.businessName || ''}
              onChange={e => handleFieldChange('businessName', e.target.value)}
              placeholder="Enter your business name"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{localData.businessName || 'Not specified'}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
          {isEditing ? (
            <Select
              value={localData.businessType || ''}
              onChange={value => handleFieldChange('businessType', value)}
              placeholder="Select business type"
              variant="bordered"
            >
              <SelectItem key="sole-proprietorship">Sole Proprietorship</SelectItem>
              <SelectItem key="partnership">Partnership</SelectItem>
              <SelectItem key="llc">Limited Liability Company (LLC)</SelectItem>
              <SelectItem key="corporation">Corporation</SelectItem>
              <SelectItem key="s-corp">S-Corporation</SelectItem>
              <SelectItem key="b-corp">B-Corporation</SelectItem>
              <SelectItem key="non-profit">Non-Profit</SelectItem>
            </Select>
          ) : (
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{localData.businessType || 'Not specified'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
          {isEditing ? (
            <Input
              type="number"
              value={localData.yearsInBusiness?.toString() || ''}
              onChange={e => handleFieldChange('yearsInBusiness', parseInt(e.target.value) || 0)}
              placeholder="Enter years in business"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localData.yearsInBusiness ? `${localData.yearsInBusiness} years` : 'Not specified'}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees
          </label>
          {isEditing ? (
            <Input
              type="number"
              value={localData.employeeCount?.toString() || ''}
              onChange={e => handleFieldChange('employeeCount', parseInt(e.target.value) || 0)}
              placeholder="Enter number of employees"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localData.employeeCount ? `${localData.employeeCount} employees` : 'Not specified'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Range</label>
        {isEditing ? (
          <Select
            value={localData.revenueRange || ''}
            onChange={value => handleFieldChange('revenueRange', value)}
            placeholder="Select revenue range"
            variant="bordered"
          >
            <SelectItem key="0-100k">€0 - €100K</SelectItem>
            <SelectItem key="100k-500k">€100K - €500K</SelectItem>
            <SelectItem key="500k-1m">€500K - €1M</SelectItem>
            <SelectItem key="1m-5m">€1M - €5M</SelectItem>
            <SelectItem key="5m-10m">€5M - €10M</SelectItem>
            <SelectItem key="10m+">€10M+</SelectItem>
          </Select>
        ) : (
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{localData.revenueRange || 'Not specified'}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderExitStrategy = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Exit Timeline</label>
        {isEditing ? (
          <Select
            value={localData.exitTimeline?.timeframe || ''}
            onChange={value =>
              handleFieldChange('exitTimeline', { ...localData.exitTimeline, timeframe: value })
            }
            placeholder="Select exit timeline"
            variant="bordered"
          >
            <SelectItem key="immediate">Immediate (0-3 months)</SelectItem>
            <SelectItem key="6-months">6 months</SelectItem>
            <SelectItem key="1-year">1 year</SelectItem>
            <SelectItem key="2-years">2 years</SelectItem>
            <SelectItem key="flexible">Flexible</SelectItem>
          </Select>
        ) : (
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">
              {localData.exitTimeline?.timeframe || 'Not specified'}
            </span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Selling</label>
        {isEditing ? (
          <Textarea
            value={localData.reasonForSelling || ''}
            onChange={e => handleFieldChange('reasonForSelling', e.target.value)}
            placeholder="Why are you considering selling your business?"
            variant="bordered"
            minRows={3}
          />
        ) : (
          <div className="text-gray-900">{localData.reasonForSelling || 'Not specified'}</div>
        )}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
        <div className="space-y-2">
          {localData.keyAchievements?.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Award className="w-4 h-4 text-yellow-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">{achievement.title}</div>
                <div className="text-sm text-gray-600">{achievement.description}</div>
                <div className="text-xs text-gray-500">{achievement.date}</div>
              </div>
            </div>
          )) || <div className="text-gray-500 text-sm">No achievements listed</div>}
        </div>
      </div>
    </div>
  );

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <Card className={`border border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
              <p className="text-gray-600 text-sm">Details about your business and exit strategy</p>
            </div>
          </div>
          {isEditing && (
            <Button variant="primary" color="primary" size="sm" onPress={handleSave}>
              Save Changes
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-8">
          {/* Business Information */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Business Details</h4>
            {renderBusinessInfo()}
          </div>

          {/* Exit Strategy */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Exit Strategy</h4>
            {renderExitStrategy()}
          </div>

          {/* Achievements */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Key Achievements</h4>
            {renderAchievements()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// =============================================================================
// BUSINESS TIMELINE COMPONENT
// =============================================================================

export const BusinessTimelineSection: React.FC<{ userId?: string }> = ({ userId }) => {
  if (!userId) {
    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardBody className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">📈</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Timeline</h3>
          <p className="text-gray-600">User ID required to load timeline</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Business Journey</h3>
            <p className="text-gray-600 text-sm">Your business activities and milestones</p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <BusinessTimeline
          userId={userId}
          showHeader={false}
          showStats={true}
          maxEvents={12}
          groupByYear={true}
        />
      </CardBody>
    </Card>
  );
};

export default BusinessOwnerProfile;
