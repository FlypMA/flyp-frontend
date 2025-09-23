import { useUI } from '@/app/providers/UIProvider';
import { Button } from '@/shared/components/buttons/Button';
import { Card } from '@/shared/components/cards/Card';
import {
  CustomDropdown,
  CustomInputField,
  CustomNumberInputField,
  CustomTextarea,
} from '@/shared/components/forms';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ListingFormData {
  // Basic Information
  title: string;
  description: string;
  industry: string;
  location: string;
  yearEstablished: string;

  // Financial Information
  askingPrice: string;
  annualRevenue: string;
  netProfit: string;
  grossMargin: string;

  // Business Details
  employees: string;
  realEstate: 'included' | 'lease' | 'separate';

  // Additional Information
  highlights: string;
  reasonForSelling: string;

  // Contact preferences
  contactPreference: 'direct' | 'anonymous';
}

export const CreateListingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useUI();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    industry: '',
    location: '',
    yearEstablished: '',
    askingPrice: '',
    annualRevenue: '',
    netProfit: '',
    grossMargin: '',
    employees: '',
    realEstate: 'lease',
    highlights: '',
    reasonForSelling: '',
    contactPreference: 'direct',
  });

  const industries = [
    'Technology',
    'Restaurant & Food',
    'Manufacturing',
    'Retail',
    'Healthcare',
    'Professional Services',
    'E-commerce',
    'Real Estate',
    'Transportation',
    'Education',
    'Other',
  ];

  const locations = [
    'Brussels',
    'Antwerp',
    'Ghent',
    'Charleroi',
    'Liège',
    'Bruges',
    'Namur',
    'Leuven',
    'Mechelen',
    'Aalst',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement save draft API call
      // console.log('Saving draft:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification('success', 'Draft saved successfully');
    } catch (_error) {
      addNotification('error', 'Failed to save draft');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement publish API call
      // console.log('Publishing listing:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification('success', 'Listing published successfully!');
      navigate('/dashboard/listings');
    } catch (_error) {
      addNotification('error', 'Failed to publish listing');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              <p className="text-gray-600">Tell us about your business</p>
            </div>

            <CustomInputField
              label="Business Title"
              type="text"
              placeholder="e.g., Established Restaurant in Brussels"
              value={formData.title}
              onChange={handleInputChange}
              onBlur={() => {}}
              name="title"
              required
            />

            <CustomTextarea
              label="Business Description"
              placeholder="Provide a detailed description of your business..."
              value={formData.description}
              onChange={handleInputChange}
              onBlur={() => {}}
              name="description"
              required
              minHeight={120}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CustomDropdown
                  label="Industry"
                  placeholder="Select industry"
                  options={industries.map(industry => ({
                    value: industry,
                    label: industry,
                  }))}
                  value={formData.industry}
                  onChange={value => setFormData(prev => ({ ...prev, industry: value }))}
                  required={true}
                  name="industry"
                />
              </div>

              <div>
                <CustomDropdown
                  label="Location"
                  placeholder="Select location"
                  options={locations.map(location => ({
                    value: location,
                    label: location,
                  }))}
                  value={formData.location}
                  onChange={value => setFormData(prev => ({ ...prev, location: value }))}
                  required={true}
                  name="location"
                />
              </div>
            </div>

            <CustomNumberInputField
              label="Year Established"
              placeholder="e.g., 2015"
              value={formData.yearEstablished}
              onChange={handleInputChange}
              onBlur={() => {}}
              name="yearEstablished"
              required
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Financial Information</h2>
              <p className="text-gray-600">Provide key financial metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomNumberInputField
                label="Asking Price (€)"
                placeholder="e.g., 350000"
                value={formData.askingPrice}
                onChange={handleInputChange}
                onBlur={() => {}}
                name="askingPrice"
                prefix="€"
                required
              />

              <CustomNumberInputField
                label="Annual Revenue (€)"
                placeholder="e.g., 180000"
                value={formData.annualRevenue}
                onChange={handleInputChange}
                onBlur={() => {}}
                name="annualRevenue"
                prefix="€"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomNumberInputField
                label="Net Profit (€)"
                placeholder="e.g., 45000"
                value={formData.netProfit}
                onChange={handleInputChange}
                onBlur={() => {}}
                name="netProfit"
                prefix="€"
              />

              <CustomNumberInputField
                label="Gross Margin (%)"
                placeholder="e.g., 65"
                value={formData.grossMargin}
                onChange={handleInputChange}
                onBlur={() => {}}
                name="grossMargin"
                suffix="%"
              />
            </div>

            <CustomNumberInputField
              label="Number of Employees"
              placeholder="e.g., 8"
              value={formData.employees}
              onChange={handleInputChange}
              onBlur={() => {}}
              name="employees"
              required
            />

            <div>
              <CustomDropdown
                label="Real Estate"
                placeholder="Select real estate option"
                options={[
                  { value: 'included', label: 'Real estate included' },
                  { value: 'lease', label: 'Leased premises' },
                  { value: 'separate', label: 'Real estate sold separately' },
                ]}
                value={formData.realEstate}
                onChange={value =>
                  setFormData(prev => ({
                    ...prev,
                    realEstate: value as 'included' | 'lease' | 'separate',
                  }))
                }
                required={true}
                name="realEstate"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>
              <p className="text-gray-600">Help buyers understand your business better</p>
            </div>

            <CustomTextarea
              label="Key Highlights"
              placeholder="List the main selling points of your business (one per line)..."
              value={formData.highlights}
              onChange={handleInputChange}
              onBlur={() => {}}
              name="highlights"
              minHeight={120}
            />
            <p className="text-sm text-gray-500 mt-1">
              Example: Prime location with high foot traffic, Loyal customer base, Recently
              renovated
            </p>

            <CustomTextarea
              label="Reason for Selling"
              placeholder="Why are you selling this business?"
              value={formData.reasonForSelling}
              onChange={handleInputChange}
              onBlur={() => {}}
              name="reasonForSelling"
              minHeight={100}
            />

            <div>
              <CustomDropdown
                label="Contact Preference"
                placeholder="Select contact preference"
                options={[
                  { value: 'direct', label: 'Direct contact allowed' },
                  { value: 'anonymous', label: 'Anonymous listing (flyp mediates)' },
                ]}
                value={formData.contactPreference}
                onChange={value =>
                  setFormData(prev => ({
                    ...prev,
                    contactPreference: value as 'direct' | 'anonymous',
                  }))
                }
                required={true}
                name="contactPreference"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Review & Publish</h2>
              <p className="text-gray-600">Review your listing before publishing</p>
            </div>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Listing Preview</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {formData.title || 'Business Title'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {formData.industry} • {formData.location}
                  </p>
                </div>

                <p className="text-gray-600">
                  {formData.description || 'Business description will appear here...'}
                </p>

                <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-200 text-sm">
                  <div>
                    <p className="text-gray-500">Asking Price</p>
                    <p className="font-semibold">
                      €
                      {formData.askingPrice ? parseInt(formData.askingPrice).toLocaleString() : '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold">
                      €
                      {formData.annualRevenue
                        ? parseInt(formData.annualRevenue).toLocaleString()
                        : '0'}
                      /yr
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Before Publishing</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Make sure all information is accurate</li>
                <li>• Consider adding high-quality photos (you can add them after publishing)</li>
                <li>• Review your pricing strategy</li>
                <li>• Ensure your contact preferences are correct</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Step {currentStep} of 4</span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / 4) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        {renderStep()}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <Button variant="tertiary" onClick={handlePrevious}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="secondary" onClick={handleSaveDraft} loading={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handlePublish} loading={isLoading}>
                Publish Listing
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
