/**
 * 🏢 Business Profile Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/management/BusinessProfileModal.tsx
 * Purpose: Complete business profile management with multi-step form
 */

import { Button } from '@/shared/components/buttons';
import {
  CustomCheckbox,
  CustomDropdown,
  CustomInputField,
  CustomNumberInputField,
  CustomTextarea,
} from '@/shared/components/forms';
import {
  Briefcase,
  Building2,
  Check,
  DollarSign,
  Factory,
  Film,
  GraduationCap,
  Heart,
  Home,
  Laptop,
  MoreHorizontal,
  ShoppingBag,
  TrendingUp,
  Truck,
  Users,
  Utensils,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { CenteredModal } from '../../../foundations';

interface BusinessInfo {
  name: string;
  location: string;
  isRemote: boolean;
  industry: string;
  description: string;
  foundedYear: number;
  teamSize: string;
  revenue: number;
  status?: 'active' | 'inactive' | 'draft';
}

interface BusinessProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: BusinessInfo) => void;
  initialData?: Partial<BusinessInfo>;
}

const industryOptions = [
  {
    value: 'technology',
    label: 'Technology',
    icon: Laptop,
    description: 'Software, IT services, digital products',
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
    icon: Heart,
    description: 'Medical services, pharmaceuticals, wellness',
  },
  {
    value: 'finance',
    label: 'Finance & Banking',
    icon: DollarSign,
    description: 'Banking, insurance, investment services',
  },
  {
    value: 'retail',
    label: 'Retail & E-commerce',
    icon: ShoppingBag,
    description: 'Stores, online shops, consumer goods',
  },
  {
    value: 'manufacturing',
    label: 'Manufacturing',
    icon: Factory,
    description: 'Production, assembly, industrial goods',
  },
  {
    value: 'consulting',
    label: 'Consulting',
    icon: Briefcase,
    description: 'Professional services, advisory',
  },
  {
    value: 'real-estate',
    label: 'Real Estate',
    icon: Home,
    description: 'Property, construction, development',
  },
  {
    value: 'education',
    label: 'Education',
    icon: GraduationCap,
    description: 'Schools, training, educational services',
  },
  {
    value: 'food-beverage',
    label: 'Food & Beverage',
    icon: Utensils,
    description: 'Restaurants, cafes, food production',
  },
  {
    value: 'transportation',
    label: 'Transportation & Logistics',
    icon: Truck,
    description: 'Shipping, delivery, logistics services',
  },
  {
    value: 'energy',
    label: 'Energy & Utilities',
    icon: Zap,
    description: 'Power, utilities, renewable energy',
  },
  {
    value: 'media',
    label: 'Media & Entertainment',
    icon: Film,
    description: 'Content creation, entertainment, media',
  },
  {
    value: 'other',
    label: 'Other',
    icon: MoreHorizontal,
    description: 'Other industries not listed above',
  },
];

const teamSizeOptions = [
  { value: '1-5', label: '1-5 employees' },
  { value: '6-10', label: '6-10 employees' },
  { value: '11-25', label: '11-25 employees' },
  { value: '26-50', label: '26-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '100+', label: '100+ employees' },
];

export const BusinessProfileModal: React.FC<BusinessProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessInfo>({
    name: '',
    location: '',
    isRemote: false,
    industry: '',
    description: '',
    foundedYear: new Date().getFullYear(),
    teamSize: '1-5',
    revenue: 0,
    status: 'active',
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: 'Business Info', icon: Building2 },
    { id: 2, title: 'Industry', icon: TrendingUp },
    { id: 3, title: 'Details', icon: Users },
    { id: 4, title: 'Review', icon: Check },
  ];

  const handleInputChange = (field: keyof BusinessInfo, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Business name is required';
      if (!formData.location.trim() && !formData.isRemote)
        newErrors.location = 'Location is required or select remote';
      if (formData.foundedYear < 1900 || formData.foundedYear > new Date().getFullYear()) {
        newErrors.foundedYear = 'Please enter a valid year';
      }
    }

    if (step === 2) {
      if (!formData.industry) newErrors.industry = 'Industry is required';
    }

    if (step === 3) {
      if (!formData.description.trim()) newErrors.description = 'Business description is required';
      if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
    }

    // Debug logging
    if (Object.keys(newErrors).length > 0) {
      // TODO: Add proper logging
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSave = () => {
    if (validateStep(4)) {
      onSave?.(formData);
      onClose();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Building2 className="w-4 h-4 text-primary-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Business Information</h3>
        <p className="text-gray-600 text-xs">Tell us about your business basics</p>
      </div>

      <CustomInputField
        label="Business Name"
        placeholder="Enter your business name"
        value={formData.name}
        onChange={e => handleInputChange('name', e.target.value)}
        onBlur={() => {}}
        name="name"
        error={errors.name}
        required
      />

      <CustomInputField
        label="Location"
        placeholder="City, Country"
        value={formData.location}
        onChange={e => handleInputChange('location', e.target.value)}
        onBlur={() => {}}
        name="location"
        error={errors.location}
        required={!formData.isRemote}
        disabled={formData.isRemote}
      />

      <CustomNumberInputField
        label="Founded Year"
        placeholder="2020"
        value={formData.foundedYear.toString()}
        onChange={e => handleInputChange('foundedYear', parseInt(e.target.value) || 0)}
        onBlur={() => {}}
        name="foundedYear"
        error={errors.foundedYear}
        min={1900}
        max={new Date().getFullYear()}
        allowDecimals={false}
        required
      />

      <CustomCheckbox
        label="This is a remote/online business"
        checked={formData.isRemote}
        onChange={() => handleInputChange('isRemote', !formData.isRemote)}
        name="isRemote"
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <TrendingUp className="w-4 h-4 text-primary-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Industry Selection</h3>
        <p className="text-gray-600 text-xs">What industry does your business operate in?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
        {industryOptions.map(industry => {
          const Icon = industry.icon;
          const isSelected = formData.industry === industry.value;
          return (
            <button
              key={industry.value}
              type="button"
              onClick={() => handleInputChange('industry', industry.value)}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-primary-100' : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-gray-500'}`}
                  />
                </div>
                <div>
                  <h4
                    className={`font-medium text-sm ${
                      isSelected ? 'text-primary-700' : 'text-gray-900'
                    }`}
                  >
                    {industry.label}
                  </h4>
                  <p
                    className={`text-xs mt-1 ${isSelected ? 'text-primary-600' : 'text-gray-500'}`}
                  >
                    {industry.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {errors.industry && (
        <span className="block text-sm text-red-600 mt-2 font-medium">{errors.industry}</span>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Users className="w-4 h-4 text-primary-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Business Details</h3>
        <p className="text-gray-600 text-xs">Share more about your business</p>
      </div>

      <CustomTextarea
        label="Business Description"
        placeholder="Describe what your business does, your products/services, and what makes you unique..."
        value={formData.description}
        onChange={e => handleInputChange('description', e.target.value)}
        onBlur={() => {}}
        name="description"
        error={errors.description}
        required
        rows={4}
      />

      <CustomDropdown
        label="Team Size"
        placeholder="Select team size"
        options={teamSizeOptions}
        value={formData.teamSize}
        onChange={value => handleInputChange('teamSize', value)}
        name="teamSize"
        error={errors.teamSize}
        required
      />
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Check className="w-4 h-4 text-green-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Review Your Information</h3>
        <p className="text-gray-600 text-xs">Please review your business profile before saving</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span> {formData.name}
              </p>
              <p>
                <span className="font-medium">Industry:</span>{' '}
                {industryOptions.find(opt => opt.value === formData.industry)?.label}
              </p>
              <p>
                <span className="font-medium">Location:</span>{' '}
                {formData.isRemote ? 'Remote/Online' : formData.location}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Business Details</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Founded:</span> {formData.foundedYear}
              </p>
              <p>
                <span className="font-medium">Team Size:</span>{' '}
                {teamSizeOptions.find(opt => opt.value === formData.teamSize)?.label}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-sm text-gray-600">{formData.description}</p>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <CenteredModal
      isOpen={isOpen}
      onClose={onClose}
      title="Business Profile"
      size="2xl"
      footer={
        <div className="flex items-center justify-between">
          <Button variant="tertiary" onPress={currentStep === 1 ? onClose : handleBack} size="md">
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
            {currentStep < 4 ? (
              <Button variant="primary" onPress={handleNext} size="md">
                Next
              </Button>
            ) : (
              <Button variant="primary" onPress={handleSave} size="md">
                Save Profile
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="p-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {renderCurrentStep()}
      </div>
    </CenteredModal>
  );
};

export default BusinessProfileModal;
