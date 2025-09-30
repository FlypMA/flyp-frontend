// 🏢 Business Basic Info - Business Card Feature
// Location: src/features/phase1/business/card/components/BusinessBasicInfo.tsx
// Purpose: Combined basic information collection (adapted from listing BasicInfoStep + BusinessProfileModal)
// Note: Preserves form design patterns from original components

import React, { useState } from 'react';
import { BusinessCardStepProps } from '../types';

const BusinessBasicInfo: React.FC<BusinessCardStepProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    name: data.name || '',
    location: data.location || '',
    isRemote: data.isRemote || false,
    industry: data.industry || '',
    description: data.description || '',
    teamSize: data.teamSize || '',
    website: data.website || '',
    keyHighlights: data.keyHighlights || [],
  });

  const [newHighlight, setNewHighlight] = useState('');

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const addHighlight = () => {
    if (newHighlight.trim() && formData.keyHighlights.length < 5) {
      const updatedHighlights = [...formData.keyHighlights, newHighlight.trim()];
      handleInputChange('keyHighlights', updatedHighlights);
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    const updatedHighlights = formData.keyHighlights.filter((_, i) => i !== index);
    handleInputChange('keyHighlights', updatedHighlights);
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your business</h1>
          <p className="text-gray-600">
            This information will be used to create your business profile
          </p>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            placeholder="Enter your business name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">The official name of your business</p>
        </div>

        {/* Location and Remote Checkbox */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location {!formData.isRemote && '*'}
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={e => handleInputChange('location', e.target.value)}
            placeholder="City, Country"
            disabled={formData.isRemote}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          {/* Remote Work Checkbox */}
          <div className="flex items-center space-x-3 mt-3">
            <input
              type="checkbox"
              id="isRemote"
              checked={formData.isRemote}
              onChange={e => handleInputChange('isRemote', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isRemote" className="text-sm font-medium text-gray-700">
              This business can be operated remotely
            </label>
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
          <select
            value={formData.industry}
            onChange={e => handleInputChange('industry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select industry</option>
            <option value="food-beverage">Food & Beverage</option>
            <option value="creative-services">Creative Services</option>
            <option value="beauty-wellness">Beauty & Wellness</option>
            <option value="fitness-health">Fitness & Health</option>
            <option value="home-services">Home Services</option>
            <option value="professional-services">Professional Services</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="technology">Technology & Software</option>
            <option value="consulting">Consulting</option>
            <option value="education">Education & Training</option>
            <option value="healthcare">Healthcare</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
            placeholder="Describe your business in 2-3 sentences"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            What does your business do? What makes it unique?
          </p>
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
          <select
            value={formData.teamSize}
            onChange={e => handleInputChange('teamSize', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select team size</option>
            <option value="1">Just me</option>
            <option value="2-5">2-5 employees</option>
            <option value="6-10">6-10 employees</option>
            <option value="11-25">11-25 employees</option>
            <option value="26-50">26-50 employees</option>
            <option value="50+">50+ employees</option>
          </select>
        </div>

        {/* Website (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
          <input
            type="url"
            value={formData.website}
            onChange={e => handleInputChange('website', e.target.value)}
            placeholder="https://yourbusiness.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Key Highlights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Highlights (up to 5)
          </label>
          <div className="space-y-3">
            {formData.keyHighlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-900">
                  {highlight}
                </div>
                <button
                  onClick={() => removeHighlight(index)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove highlight"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {formData.keyHighlights.length < 5 && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={e => setNewHighlight(e.target.value)}
                  placeholder="Add a key highlight..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addHighlight();
                    }
                  }}
                />
                <button
                  onClick={addHighlight}
                  disabled={!newHighlight.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            What makes your business special? (e.g., "Award-winning service", "Growing 20%
            annually", "10,000+ satisfied customers")
          </p>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 rounded-xl p-6 mt-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Why we need this information</h3>
              <p className="text-sm text-gray-600">
                This information helps create your business profile card, which you'll use across
                the platform. You can update this anytime from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessBasicInfo;
