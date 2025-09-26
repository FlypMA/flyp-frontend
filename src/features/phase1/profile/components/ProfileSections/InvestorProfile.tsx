/**
 * 💼 Investor Profile Section
 *
 * Investor specific profile information section
 */

import { Button } from '@/shared/components/buttons';
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';
import { Briefcase, Clock, DollarSign, Target, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { InvestorProfile as InvestorProfileType, Profile } from '../../types/profile.types';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface InvestorProfileProps {
  profile: Profile;
  isEditing?: boolean;
  onUpdate?: (data: Partial<InvestorProfileType>) => void;
  onFieldUpdate?: (field: string, value: any) => void;
  className?: string;
}

// =============================================================================
// INVESTOR PROFILE COMPONENT
// =============================================================================

export const InvestorProfile: React.FC<InvestorProfileProps> = ({
  profile,
  isEditing = false,
  onUpdate,
  onFieldUpdate,
  className = '',
}) => {
  const [localData, setLocalData] = useState<Partial<InvestorProfileType>>(
    profile.investorData || {}
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

  const renderInvestmentCapacity = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Investment</label>
          {isEditing ? (
            <Input
              type="number"
              value={localData.investmentCapacity?.minAmount?.toString() || ''}
              onChange={e =>
                handleFieldChange('investmentCapacity', {
                  ...localData.investmentCapacity,
                  minAmount: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Enter minimum amount"
              variant="bordered"
              startContent={<span className="text-gray-500">€</span>}
            />
          ) : (
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                €{localData.investmentCapacity?.minAmount?.toLocaleString() || 'Not specified'}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Investment</label>
          {isEditing ? (
            <Input
              type="number"
              value={localData.investmentCapacity?.maxAmount?.toString() || ''}
              onChange={e =>
                handleFieldChange('investmentCapacity', {
                  ...localData.investmentCapacity,
                  maxAmount: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Enter maximum amount"
              variant="bordered"
              startContent={<span className="text-gray-500">€</span>}
            />
          ) : (
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                €{localData.investmentCapacity?.maxAmount?.toLocaleString() || 'Not specified'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Investment Frequency</label>
        {isEditing ? (
          <Select
            value={localData.investmentCapacity?.investmentFrequency || ''}
            onChange={value =>
              handleFieldChange('investmentCapacity', {
                ...localData.investmentCapacity,
                investmentFrequency: value,
              })
            }
            placeholder="Select investment frequency"
            variant="bordered"
          >
            <SelectItem key="one-time">One-time</SelectItem>
            <SelectItem key="ongoing">Ongoing</SelectItem>
            <SelectItem key="fund-based">Fund-based</SelectItem>
          </Select>
        ) : (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">
              {localData.investmentCapacity?.investmentFrequency || 'Not specified'}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderInvestmentFocus = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industries of Interest
        </label>
        {isEditing ? (
          <Select
            value={localData.investmentFocus?.industries || []}
            onChange={value =>
              handleFieldChange('investmentFocus', {
                ...localData.investmentFocus,
                industries: value,
              })
            }
            placeholder="Select industries"
            variant="bordered"
            selectionMode="multiple"
          >
            <SelectItem key="technology">Technology</SelectItem>
            <SelectItem key="manufacturing">Manufacturing</SelectItem>
            <SelectItem key="retail">Retail</SelectItem>
            <SelectItem key="services">Services</SelectItem>
            <SelectItem key="healthcare">Healthcare</SelectItem>
            <SelectItem key="finance">Finance</SelectItem>
            <SelectItem key="real-estate">Real Estate</SelectItem>
            <SelectItem key="construction">Construction</SelectItem>
            <SelectItem key="food-beverage">Food & Beverage</SelectItem>
            <SelectItem key="education">Education</SelectItem>
            <SelectItem key="consulting">Consulting</SelectItem>
          </Select>
        ) : (
          <div className="flex flex-wrap gap-2">
            {localData.investmentFocus?.industries?.map(industry => (
              <Chip key={industry} size="sm" variant="flat" color="primary">
                {industry}
              </Chip>
            )) || <span className="text-gray-500 text-sm">No industries specified</span>}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Stages</label>
        {isEditing ? (
          <Select
            value={localData.investmentFocus?.businessStages || []}
            onChange={value =>
              handleFieldChange('investmentFocus', {
                ...localData.investmentFocus,
                businessStages: value,
              })
            }
            placeholder="Select business stages"
            variant="bordered"
            selectionMode="multiple"
          >
            <SelectItem key="startup">Startup</SelectItem>
            <SelectItem key="growth">Growth</SelectItem>
            <SelectItem key="mature">Mature</SelectItem>
            <SelectItem key="turnaround">Turnaround</SelectItem>
          </Select>
        ) : (
          <div className="flex flex-wrap gap-2">
            {localData.investmentFocus?.businessStages?.map(stage => (
              <Chip key={stage} size="sm" variant="flat" color="secondary">
                {stage}
              </Chip>
            )) || <span className="text-gray-500 text-sm">No stages specified</span>}
          </div>
        )}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          {isEditing ? (
            <Input
              type="number"
              value={localData.investmentExperience?.yearsActive?.toString() || ''}
              onChange={e =>
                handleFieldChange('investmentExperience', {
                  ...localData.investmentExperience,
                  yearsActive: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Enter years of experience"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localData.investmentExperience?.yearsActive
                  ? `${localData.investmentExperience.yearsActive} years`
                  : 'Not specified'}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Deals Completed
          </label>
          {isEditing ? (
            <Input
              type="number"
              value={localData.investmentExperience?.totalDeals?.toString() || ''}
              onChange={e =>
                handleFieldChange('investmentExperience', {
                  ...localData.investmentExperience,
                  totalDeals: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Enter total deals"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localData.investmentExperience?.totalDeals || 'Not specified'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Investment Philosophy
        </label>
        {isEditing ? (
          <Textarea
            value={localData.investmentExperience?.investmentPhilosophy || ''}
            onChange={e =>
              handleFieldChange('investmentExperience', {
                ...localData.investmentExperience,
                investmentPhilosophy: e.target.value,
              })
            }
            placeholder="Describe your investment philosophy and approach"
            variant="bordered"
            minRows={3}
          />
        ) : (
          <div className="text-gray-900">
            {localData.investmentExperience?.investmentPhilosophy || 'Not specified'}
          </div>
        )}
      </div>
    </div>
  );

  const renderDecisionProcess = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Decision Timeline</label>
        {isEditing ? (
          <Select
            value={localData.decisionProcess?.decisionTimeline || ''}
            onChange={value =>
              handleFieldChange('decisionProcess', {
                ...localData.decisionProcess,
                decisionTimeline: value,
              })
            }
            placeholder="Select decision timeline"
            variant="bordered"
          >
            <SelectItem key="immediate">Immediate (same day)</SelectItem>
            <SelectItem key="1-week">1 week</SelectItem>
            <SelectItem key="2-weeks">2 weeks</SelectItem>
            <SelectItem key="1-month">1 month</SelectItem>
            <SelectItem key="flexible">Flexible</SelectItem>
          </Select>
        ) : (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">
              {localData.decisionProcess?.decisionTimeline || 'Not specified'}
            </span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Criteria</label>
        {isEditing ? (
          <Textarea
            value={localData.decisionProcess?.keyCriteria?.join(', ') || ''}
            onChange={e =>
              handleFieldChange('decisionProcess', {
                ...localData.decisionProcess,
                keyCriteria: e.target.value
                  .split(',')
                  .map(c => c.trim())
                  .filter(c => c),
              })
            }
            placeholder="List your key investment criteria (comma-separated)"
            variant="bordered"
            minRows={2}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {localData.decisionProcess?.keyCriteria?.map(criteria => (
              <Chip key={criteria} size="sm" variant="flat" color="default">
                {criteria}
              </Chip>
            )) || <span className="text-gray-500 text-sm">No criteria specified</span>}
          </div>
        )}
      </div>
    </div>
  );

  const renderPreviousDeals = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Previous Deals</label>
        <div className="space-y-3">
          {localData.previousDeals?.map((deal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{deal.companyName}</div>
                  <div className="text-sm text-gray-600">{deal.industry}</div>
                  <div className="text-sm text-gray-500">
                    {deal.year} • €{deal.dealSize.toLocaleString()} • {deal.role}
                  </div>
                  {deal.description && (
                    <div className="text-sm text-gray-700 mt-2">{deal.description}</div>
                  )}
                </div>
                <div className="ml-4">
                  <Chip
                    size="sm"
                    color={
                      deal.outcome === 'successful'
                        ? 'success'
                        : deal.outcome === 'ongoing'
                          ? 'warning'
                          : 'danger'
                    }
                    variant="flat"
                  >
                    {deal.outcome}
                  </Chip>
                </div>
              </div>
            </div>
          )) || <div className="text-gray-500 text-sm">No previous deals listed</div>}
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
            <Target className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Investment Profile</h3>
              <p className="text-gray-600 text-sm">Your investment preferences and experience</p>
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
          {/* Investment Capacity */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Investment Capacity</h4>
            {renderInvestmentCapacity()}
          </div>

          {/* Investment Focus */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Investment Focus</h4>
            {renderInvestmentFocus()}
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Experience</h4>
            {renderExperience()}
          </div>

          {/* Decision Process */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Decision Process</h4>
            {renderDecisionProcess()}
          </div>

          {/* Previous Deals */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Previous Deals</h4>
            {renderPreviousDeals()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InvestorProfile;
