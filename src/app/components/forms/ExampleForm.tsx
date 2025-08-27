import React, { useState } from 'react';
import { Input, Select, SelectItem, Textarea, Button } from '@heroui/react';
import { FormField } from '../common';

/**
 * Example Form Component
 *
 * Demonstrates the correct usage of forms with the new styling system.
 * Shows proper label positioning, consistent styling, and professional layout.
 */
const ExampleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    location: '',
    description: '',
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Professional Services',
    'Construction',
    'Food & Beverage',
    'Transportation',
  ];

  const locations = [
    'Belgium',
    'Brussels Capital',
    'Flanders',
    'Wallonia',
    'Netherlands',
    'France',
    'Germany',
  ];

  return (
    <div className="professional-form max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Business Information</h2>
        <p className="text-slate-600">Please provide details about your business</p>
      </div>

      <form className="space-y-6">
        {/* Using FormField wrapper for consistent styling */}
        <FormField label="Business Name" required helpText="Enter the legal name of your business">
          <Input
            placeholder="Enter your business name"
            value={formData.businessName}
            onValueChange={value => setFormData({ ...formData, businessName: value })}
            variant="bordered"
          />
        </FormField>

        {/* Form grid for side-by-side fields */}
        <div className="form-grid form-grid-2">
          <FormField label="Industry" required>
            <Select
              placeholder="Select your industry"
              selectedKeys={formData.industry ? [formData.industry] : []}
              onSelectionChange={keys => {
                const industry = Array.from(keys)[0] as string;
                setFormData({ ...formData, industry });
              }}
              variant="bordered"
            >
              {industries.map(industry => (
                <SelectItem key={industry}>{industry}</SelectItem>
              ))}
            </Select>
          </FormField>

          <FormField label="Location" required>
            <Select
              placeholder="Select your location"
              selectedKeys={formData.location ? [formData.location] : []}
              onSelectionChange={keys => {
                const location = Array.from(keys)[0] as string;
                setFormData({ ...formData, location });
              }}
              variant="bordered"
            >
              {locations.map(location => (
                <SelectItem key={location}>{location}</SelectItem>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField
          label="Business Description"
          required
          helpText="Describe what your business does, your target market, and key differentiators"
        >
          <Textarea
            placeholder="Describe your business, its history, and what makes it unique..."
            value={formData.description}
            onValueChange={value => setFormData({ ...formData, description: value })}
            variant="bordered"
            minRows={4}
          />
        </FormField>

        {/* Form actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            color="primary"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-xl"
          >
            Save Information
          </Button>
          <Button
            variant="bordered"
            size="lg"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-8 rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExampleForm;
