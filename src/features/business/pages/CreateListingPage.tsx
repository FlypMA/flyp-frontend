import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/buttons/Button';
import { Card } from '@/shared/components/cards/Card';
import { Input } from '@/shared/components/ui/Input';
import { useUI } from '@/app/providers/UIProvider';
import { Save, ArrowRight, ArrowLeft } from 'lucide-react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      console.log('Saving draft:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification('success', 'Draft saved successfully');
    } catch (error) {
      addNotification('error', 'Failed to save draft');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement publish API call
      console.log('Publishing listing:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification('success', 'Listing published successfully!');
      navigate('/dashboard/listings');
    } catch (error) {
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

            <Input
              label="Business Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Established Restaurant in Brussels"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Provide a detailed description of your business..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              label="Year Established"
              name="yearEstablished"
              type="number"
              value={formData.yearEstablished}
              onChange={handleInputChange}
              placeholder="e.g., 2015"
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
              <Input
                label="Asking Price (€)"
                name="askingPrice"
                type="number"
                value={formData.askingPrice}
                onChange={handleInputChange}
                placeholder="e.g., 350000"
                required
              />

              <Input
                label="Annual Revenue (€)"
                name="annualRevenue"
                type="number"
                value={formData.annualRevenue}
                onChange={handleInputChange}
                placeholder="e.g., 180000"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Net Profit (€)"
                name="netProfit"
                type="number"
                value={formData.netProfit}
                onChange={handleInputChange}
                placeholder="e.g., 45000"
              />

              <Input
                label="Gross Margin (%)"
                name="grossMargin"
                type="number"
                value={formData.grossMargin}
                onChange={handleInputChange}
                placeholder="e.g., 65"
              />
            </div>

            <Input
              label="Number of Employees"
              name="employees"
              type="number"
              value={formData.employees}
              onChange={handleInputChange}
              placeholder="e.g., 8"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Real Estate
              </label>
              <select
                name="realEstate"
                value={formData.realEstate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="included">Real estate included</option>
                <option value="lease">Leased premises</option>
                <option value="separate">Real estate sold separately</option>
              </select>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Highlights
              </label>
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="List the main selling points of your business (one per line)..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: Prime location with high foot traffic, Loyal customer base, Recently renovated
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Selling
              </label>
              <textarea
                name="reasonForSelling"
                value={formData.reasonForSelling}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Why are you selling this business?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Preference
              </label>
              <select
                name="contactPreference"
                value={formData.contactPreference}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="direct">Direct contact allowed</option>
                <option value="anonymous">Anonymous listing (BetweenDeals mediates)</option>
              </select>
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
                  <h4 className="font-medium text-gray-900">{formData.title || 'Business Title'}</h4>
                  <p className="text-gray-600 text-sm">{formData.industry} • {formData.location}</p>
                </div>
                
                <p className="text-gray-600">{formData.description || 'Business description will appear here...'}</p>
                
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-200 text-sm">
                  <div>
                    <p className="text-gray-500">Asking Price</p>
                    <p className="font-semibold">€{formData.askingPrice ? parseInt(formData.askingPrice).toLocaleString() : '0'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold">€{formData.annualRevenue ? parseInt(formData.annualRevenue).toLocaleString() : '0'}/yr</p>
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
          <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% complete</span>
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
              <Button variant="ghost" onClick={handlePrevious}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={handleSaveDraft}
              loading={isLoading}
            >
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
