/**
 * 📝 Profile Edit Modal - Airbnb-Inspired Profile Editing
 *
 * Comprehensive profile editing modal with LinkedIn integration
 * Similar to Airbnb's profile editing experience
 */

import { Button } from '@/shared/components/buttons';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';
import { Building2, Globe, Linkedin, MapPin, TrendingUp, Upload, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  BusinessOwnerProfile,
  InvestorProfile,
  PersonalInfo,
  Profile,
  SharedProfileData,
} from '../types/profile.types';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (updatedProfile: Partial<Profile>) => Promise<void>;
  onLinkedInImport?: () => Promise<void>;
  className?: string;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onLinkedInImport,
  className = '',
}) => {
  // =============================================================================
  // STATE MANAGEMENT
  // =============================================================================

  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [personalInfo, setPersonalInfo] = useState<Partial<PersonalInfo>>({});
  const [businessData, setBusinessData] = useState<Partial<BusinessOwnerProfile>>({});
  const [investorData, setInvestorData] = useState<Partial<InvestorProfile>>({});
  const [sharedData, setSharedData] = useState<Partial<SharedProfileData>>({});

  // =============================================================================
  // EFFECTS
  // =============================================================================

  useEffect(() => {
    if (isOpen && profile) {
      // Initialize form data with current profile
      setFormData(profile);
      setPersonalInfo(profile.personalInfo || {});
      setBusinessData(profile.businessOwnerData || {});
      setInvestorData(profile.investorData || {});
      setSharedData(profile.sharedData || {});
      setHasChanges(false);
    }
  }, [isOpen, profile]);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: any) => {
    const updated = { ...personalInfo, [field]: value } as PersonalInfo;
    setPersonalInfo(updated);
    setFormData(prev => ({ ...prev, personalInfo: updated }));
    setHasChanges(true);
  };

  const handleBusinessDataChange = (field: keyof BusinessOwnerProfile, value: any) => {
    const updated = { ...businessData, [field]: value } as BusinessOwnerProfile;
    setBusinessData(updated);
    setFormData(prev => ({ ...prev, businessOwnerData: updated }));
    setHasChanges(true);
  };

  const handleInvestorDataChange = (field: keyof InvestorProfile, value: any) => {
    const updated = { ...investorData, [field]: value } as InvestorProfile;
    setInvestorData(updated);
    setFormData(prev => ({ ...prev, investorData: updated }));
    setHasChanges(true);
  };

  const handleSharedDataChange = (field: keyof SharedProfileData, value: any) => {
    const updated = { ...sharedData, [field]: value } as SharedProfileData;
    setSharedData(updated);
    setFormData(prev => ({ ...prev, sharedData: updated }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(formData);
      setHasChanges(false);
      onClose();
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInImport = async () => {
    if (onLinkedInImport) {
      setIsLoading(true);
      try {
        await onLinkedInImport();
        // Refresh form data after import
        setFormData(profile);
        setPersonalInfo(profile.personalInfo || {});
        setBusinessData(profile.businessOwnerData || {});
        setInvestorData(profile.investorData || {});
        setSharedData(profile.sharedData || {});
      } catch (error) {
        console.error('Failed to import from LinkedIn:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderPersonalInfoSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <Avatar
          src={personalInfo.avatarUrl}
          name={`${personalInfo.firstName} ${personalInfo.lastName}`}
          size="lg"
          className="w-20 h-20"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h3>
          <p className="text-gray-600">{personalInfo.professionalTitle}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            {personalInfo.city && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {personalInfo.city}, {personalInfo.country}
                </span>
              </div>
            )}
            {personalInfo.company && (
              <div className="flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span>{personalInfo.company}</span>
              </div>
            )}
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            /* Handle avatar upload */
          }}
          className="flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Change Photo</span>
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Basic Information</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={personalInfo.firstName || ''}
              onChange={e => handlePersonalInfoChange('firstName', e.target.value)}
              placeholder="Enter your first name"
            />
            <Input
              label="Last Name"
              value={personalInfo.lastName || ''}
              onChange={e => handlePersonalInfoChange('lastName', e.target.value)}
              placeholder="Enter your last name"
            />
          </div>

          <Input
            label="Professional Title"
            value={personalInfo.professionalTitle || ''}
            onChange={e => handlePersonalInfoChange('professionalTitle', e.target.value)}
            placeholder="e.g., CEO, Managing Director, Investment Partner"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company"
              value={personalInfo.company || ''}
              onChange={e => handlePersonalInfoChange('company', e.target.value)}
              placeholder="Your current company"
            />
            <Input
              label="Industry"
              value={personalInfo.industry || ''}
              onChange={e => handlePersonalInfoChange('industry', e.target.value)}
              placeholder="e.g., Technology, Manufacturing, Services"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              value={personalInfo.city || ''}
              onChange={e => handlePersonalInfoChange('city', e.target.value)}
              placeholder="Your city"
            />
            <Select
              label="Country"
              selectedKeys={personalInfo.country ? [personalInfo.country] : []}
              onSelectionChange={keys => handlePersonalInfoChange('country', Array.from(keys)[0])}
              placeholder="Select your country"
            >
              <SelectItem key="Netherlands">Netherlands</SelectItem>
              <SelectItem key="Belgium">Belgium</SelectItem>
              <SelectItem key="Germany">Germany</SelectItem>
              <SelectItem key="France">France</SelectItem>
              <SelectItem key="United Kingdom">United Kingdom</SelectItem>
            </Select>
          </div>

          <Textarea
            label="Professional Summary"
            value={personalInfo.professionalSummary || ''}
            onChange={e => handlePersonalInfoChange('professionalSummary', e.target.value)}
            placeholder="Tell us about your professional background and expertise..."
            minRows={3}
          />
        </CardBody>
      </Card>

      {/* LinkedIn Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-semibold">LinkedIn Integration</h4>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLinkedInImport}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>Import from LinkedIn</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 text-sm">
            Connect your LinkedIn profile to automatically import your professional information,
            work experience, and skills to enhance your profile.
          </p>
        </CardBody>
      </Card>
    </div>
  );

  const renderBusinessOwnerSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Business Information</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Business Name"
            value={businessData.businessName || ''}
            onChange={e => handleBusinessDataChange('businessName', e.target.value)}
            placeholder="Your business name"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Business Type"
              value={businessData.businessType || ''}
              onChange={e => handleBusinessDataChange('businessType', e.target.value)}
              placeholder="e.g., B.V., N.V., Sole Proprietorship"
            />
            <Input
              label="Industry"
              value={businessData.industry || ''}
              onChange={e => handleBusinessDataChange('industry', e.target.value)}
              placeholder="Your business industry"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Years in Business"
              type="number"
              value={businessData.yearsInBusiness?.toString() || ''}
              onChange={e => handleBusinessDataChange('yearsInBusiness', parseInt(e.target.value))}
              placeholder="0"
            />
            <Input
              label="Years in Industry"
              type="number"
              value={businessData.yearsInIndustry?.toString() || ''}
              onChange={e => handleBusinessDataChange('yearsInIndustry', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <Textarea
            label="Business Model"
            value={businessData.businessModel || ''}
            onChange={e => handleBusinessDataChange('businessModel', e.target.value)}
            placeholder="Describe your business model and how you generate revenue..."
            minRows={3}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Professional Background</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Current Role"
            value={businessData.currentRole || ''}
            onChange={e => handleBusinessDataChange('currentRole', e.target.value)}
            placeholder="Your current role in the business"
          />

          <Textarea
            label="Key Responsibilities"
            value={businessData.responsibilities?.join(', ') || ''}
            onChange={e => handleBusinessDataChange('responsibilities', e.target.value.split(', '))}
            placeholder="List your main responsibilities (separated by commas)..."
            minRows={2}
          />

          <Textarea
            label="Industry Expertise"
            value={businessData.industryExpertise?.join(', ') || ''}
            onChange={e =>
              handleBusinessDataChange('industryExpertise', e.target.value.split(', '))
            }
            placeholder="List your areas of expertise (separated by commas)..."
            minRows={2}
          />
        </CardBody>
      </Card>
    </div>
  );

  const renderInvestorSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Investment Profile</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Investment Capacity (Min)"
              type="number"
              value={investorData.investmentCapacity?.minAmount?.toString() || ''}
              onChange={e =>
                handleInvestorDataChange('investmentCapacity', {
                  ...investorData.investmentCapacity,
                  minAmount: parseFloat(e.target.value),
                })
              }
              placeholder="0"
            />
            <Input
              label="Investment Capacity (Max)"
              type="number"
              value={investorData.investmentCapacity?.maxAmount?.toString() || ''}
              onChange={e =>
                handleInvestorDataChange('investmentCapacity', {
                  ...investorData.investmentCapacity,
                  maxAmount: parseFloat(e.target.value),
                })
              }
              placeholder="0"
            />
          </div>

          <Textarea
            label="Industry Focus"
            value={investorData.investmentFocus?.industries?.join(', ') || ''}
            onChange={e =>
              handleInvestorDataChange('investmentFocus', {
                ...investorData.investmentFocus,
                industries: e.target.value.split(', '),
              })
            }
            placeholder="List industries you focus on (separated by commas)..."
            minRows={2}
          />

          <Textarea
            label="Geographic Preferences"
            value={investorData.investmentFocus?.geographicRegions?.join(', ') || ''}
            onChange={e =>
              handleInvestorDataChange('investmentFocus', {
                ...investorData.investmentFocus,
                geographicRegions: e.target.value.split(', '),
              })
            }
            placeholder="List preferred geographic regions (separated by commas)..."
            minRows={2}
          />

          <Select
            label="Investment Timeline"
            selectedKeys={
              investorData.dealPreferences?.dealTimeline
                ? [investorData.dealPreferences.dealTimeline]
                : []
            }
            onSelectionChange={keys =>
              handleInvestorDataChange('dealPreferences', {
                ...investorData.dealPreferences,
                dealTimeline: Array.from(keys)[0],
              })
            }
            placeholder="Select your investment timeline"
          >
            <SelectItem key="immediate">Immediate (0-3 months)</SelectItem>
            <SelectItem key="short-term">Short-term (3-6 months)</SelectItem>
            <SelectItem key="medium-term">Medium-term (6-12 months)</SelectItem>
            <SelectItem key="long-term">Long-term (12+ months)</SelectItem>
          </Select>
        </CardBody>
      </Card>
    </div>
  );

  const renderCommunicationSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Communication Preferences</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          <Select
            label="Preferred Contact Method"
            selectedKeys={
              sharedData.communication?.preferredContactMethod
                ? [sharedData.communication.preferredContactMethod]
                : []
            }
            onSelectionChange={keys =>
              handleSharedDataChange('communication', {
                ...sharedData.communication,
                preferredContactMethod: Array.from(keys)[0] as string,
              })
            }
            placeholder="Select preferred contact method"
          >
            <SelectItem key="email">Email</SelectItem>
            <SelectItem key="phone">Phone</SelectItem>
            <SelectItem key="platform">Platform Messaging</SelectItem>
            <SelectItem key="any">Any Method</SelectItem>
          </Select>

          <Select
            label="Response Time Commitment"
            selectedKeys={
              sharedData.communication?.responseTimeCommitment
                ? [sharedData.communication.responseTimeCommitment]
                : []
            }
            onSelectionChange={keys =>
              handleSharedDataChange('communication', {
                ...sharedData.communication,
                responseTimeCommitment: Array.from(keys)[0] as string,
              })
            }
            placeholder="Select response time commitment"
          >
            <SelectItem key="immediate">Immediate (within 1 hour)</SelectItem>
            <SelectItem key="same-day">Same Day</SelectItem>
            <SelectItem key="24-hours">Within 24 Hours</SelectItem>
            <SelectItem key="48-hours">Within 48 Hours</SelectItem>
            <SelectItem key="week">Within a Week</SelectItem>
          </Select>

          <Textarea
            label="Languages Spoken"
            value={sharedData.communication?.languagePreferences?.join(', ') || ''}
            onChange={e =>
              handleSharedDataChange('communication', {
                ...sharedData.communication,
                languagePreferences: e.target.value.split(', '),
              })
            }
            placeholder="List languages you speak (separated by commas)..."
            minRows={2}
          />
        </CardBody>
      </Card>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfoSection();
      case 'business':
        return renderBusinessOwnerSection();
      case 'investor':
        return renderInvestorSection();
      case 'communication':
        return renderCommunicationSection();
      default:
        return renderPersonalInfoSection();
    }
  };

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      className={className}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Edit Profile</h2>
            </div>
            <Button variant="tertiary" size="sm" onClick={onClose} className="p-2">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <nav className="space-y-2">
                {[
                  { id: 'personal', label: 'Personal Info', icon: User },
                  { id: 'business', label: 'Business Info', icon: Building2 },
                  { id: 'investor', label: 'Investment Profile', icon: TrendingUp },
                  { id: 'communication', label: 'Communication', icon: Globe },
                ].map(section => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">{renderActiveSection()}</div>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-gray-500">{hasChanges && 'You have unsaved changes'}</div>
            <div className="flex space-x-3">
              <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileEditModal;
