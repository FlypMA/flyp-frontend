// 🏢 Basic Info Step - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/steps/BasicInfoStep.tsx
// Purpose: Basic business information collection

import React, { useState } from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const BasicInfoStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    name: data.basicInfo?.name || '',
    description: data.basicInfo?.description || '',
    industry: data.basicInfo?.industry || '',
    location: data.basicInfo?.location || '',
    isRemote: data.basicInfo?.isRemote || false,
    foundedYear: data.basicInfo?.foundedYear || new Date().getFullYear(),
    teamSize: data.basicInfo?.teamSize || '',
    website: data.basicInfo?.website || '',
    keyHighlights: data.basicInfo?.keyHighlights || [],
  });

  const [newHighlight, setNewHighlight] = useState('');

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange({
      basicInfo: updatedData,
    });
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
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => handleInputChange('name', e.target.value)}
          placeholder="Enter your business name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          This will be the first thing potential buyers see
        </p>
      </div>

      {/* Industry and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
          <select
            value={formData.industry}
            onChange={e => handleInputChange('industry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select industry</option>
            <option value="restaurant">Restaurant & Food</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="service">Professional Services</option>
            <option value="technology">Technology & Software</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={e => handleInputChange('location', e.target.value)}
            placeholder="City, Country"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Founded Year and Team Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
          <input
            type="number"
            value={formData.foundedYear}
            onChange={e => handleInputChange('foundedYear', parseInt(e.target.value))}
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
          <select
            value={formData.teamSize}
            onChange={e => handleInputChange('teamSize', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
        <input
          type="url"
          value={formData.website}
          onChange={e => handleInputChange('website', e.target.value)}
          placeholder="https://yourbusiness.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm">{highlight}</div>
              <button
                onClick={() => removeHighlight(index)}
                className="text-red-500 hover:text-red-700"
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
                onKeyPress={e => e.key === 'Enter' && addHighlight()}
              />
              <button
                onClick={addHighlight}
                disabled={!newHighlight.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          What makes your business special? (e.g., "Award-winning restaurant", "Growing 20%
          annually")
        </p>
      </div>

      {/* Remote Work Option */}
      <div className="flex items-center space-x-3">
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
  );
};

export default BasicInfoStep;
