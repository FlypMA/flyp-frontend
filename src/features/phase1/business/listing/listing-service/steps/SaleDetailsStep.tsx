// 🏢 Sale Details Step - Implementation
// Location: src/features/phase1/business/listing/steps/SaleDetailsStep.tsx
// Purpose: Sale preferences and transition details (Step 2 of streamlined flow)

import React, { useState } from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const SaleDetailsStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    reasonForSale: data.saleDetails?.reasonForSale || '',
    preferredTimeline: data.saleDetails?.preferredTimeline || '',
    includedAssets: data.saleDetails?.includedAssets || [],
    excludedAssets: data.saleDetails?.excludedAssets || [],
    transitionSupport: data.saleDetails?.transitionSupport || '',
    staffRetention: data.saleDetails?.staffRetention || '',
  });

  const [newIncludedAsset, setNewIncludedAsset] = useState('');
  const [newExcludedAsset, setNewExcludedAsset] = useState('');

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange({
      saleDetails: updatedData,
    });
  };

  const addAsset = (type: 'included' | 'excluded') => {
    const asset = type === 'included' ? newIncludedAsset : newExcludedAsset;
    if (asset.trim()) {
      const field = type === 'included' ? 'includedAssets' : 'excludedAssets';
      const updatedAssets = [...formData[field], asset.trim()];
      handleInputChange(field, updatedAssets);
      if (type === 'included') {
        setNewIncludedAsset('');
      } else {
        setNewExcludedAsset('');
      }
    }
  };

  const removeAsset = (type: 'included' | 'excluded', index: number) => {
    const field = type === 'included' ? 'includedAssets' : 'excludedAssets';
    const updatedAssets = formData[field].filter((_, i) => i !== index);
    handleInputChange(field, updatedAssets);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🤝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sale Details</h2>
        <p className="text-gray-600">
          Help buyers understand your preferences for the sale and transition
        </p>
      </div>

      {/* Reason for Sale */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why are you selling? *
        </label>
        <select
          value={formData.reasonForSale}
          onChange={e => handleInputChange('reasonForSale', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Select a reason</option>
          <option value="retirement">Retirement</option>
          <option value="new-opportunity">Pursuing new opportunity</option>
          <option value="health">Health reasons</option>
          <option value="relocation">Relocation</option>
          <option value="financial">Financial reasons</option>
          <option value="market-timing">Market timing</option>
          <option value="lifestyle">Lifestyle change</option>
          <option value="other">Other</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Transparency builds trust with potential buyers
        </p>
      </div>

      {/* Preferred Timeline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's your preferred sale timeline? *
        </label>
        <select
          value={formData.preferredTimeline}
          onChange={e => handleInputChange('preferredTimeline', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Select a timeline</option>
          <option value="immediate">Immediate (1-3 months)</option>
          <option value="short-term">Short-term (3-6 months)</option>
          <option value="medium-term">Medium-term (6-12 months)</option>
          <option value="flexible">Flexible (12+ months)</option>
          <option value="conditional">Conditional on right offer</option>
        </select>
      </div>

      {/* Included Assets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's included in the sale?
        </label>
        <div className="space-y-3">
          {formData.includedAssets.map((asset, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-gray-900">
                ✓ {asset}
              </div>
              <button
                onClick={() => removeAsset('included', index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remove asset"
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

          <div className="flex space-x-2">
            <input
              type="text"
              value={newIncludedAsset}
              onChange={e => setNewIncludedAsset(e.target.value)}
              placeholder="Add an included asset..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addAsset('included');
                }
              }}
            />
            <button
              onClick={() => addAsset('included')}
              disabled={!newIncludedAsset.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          E.g., "Equipment", "Customer database", "Intellectual property"
        </p>
      </div>

      {/* Excluded Assets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's NOT included in the sale?
        </label>
        <div className="space-y-3">
          {formData.excludedAssets.map((asset, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                ✗ {asset}
              </div>
              <button
                onClick={() => removeAsset('excluded', index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remove asset"
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

          <div className="flex space-x-2">
            <input
              type="text"
              value={newExcludedAsset}
              onChange={e => setNewExcludedAsset(e.target.value)}
              placeholder="Add an excluded asset..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addAsset('excluded');
                }
              }}
            />
            <button
              onClick={() => addAsset('excluded')}
              disabled={!newExcludedAsset.trim()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          E.g., "Personal vehicles", "Personal accounts receivable"
        </p>
      </div>

      {/* Transition Support */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transition support offered
        </label>
        <select
          value={formData.transitionSupport}
          onChange={e => handleInputChange('transitionSupport', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Select transition support</option>
          <option value="full-training">Full training and onboarding (30-60 days)</option>
          <option value="limited-training">Limited training (1-2 weeks)</option>
          <option value="consulting">Consulting basis (negotiable)</option>
          <option value="minimal">Minimal (documentation only)</option>
          <option value="none">None</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Transition support can increase buyer confidence and value
        </p>
      </div>

      {/* Staff Retention */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Staff retention expectations
        </label>
        <select
          value={formData.staffRetention}
          onChange={e => handleInputChange('staffRetention', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Select staff retention preference</option>
          <option value="all-staff">Expect all staff to be retained</option>
          <option value="key-staff">Expect key staff to be retained</option>
          <option value="negotiable">Negotiable with buyer</option>
          <option value="no-staff">No staff (solo operation)</option>
          <option value="buyer-decision">Buyer's decision</option>
        </select>
      </div>

      {/* Help Section */}
      <div className="bg-primary-50 rounded-xl p-6 mt-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary-600"
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
            <h3 className="font-medium text-gray-900 mb-2">Sale Details Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be clear about what's included to avoid misunderstandings</li>
              <li>• Offering transition support often increases sale value</li>
              <li>• Flexibility on timeline can attract more buyers</li>
              <li>• Staff retention plans add value for buyers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailsStep;
