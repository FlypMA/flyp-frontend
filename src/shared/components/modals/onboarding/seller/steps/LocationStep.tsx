/**
 * 📍 Location Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/LocationStep.tsx
 * Purpose: Business location input step
 */

import { Globe, MapPin } from 'lucide-react';
import React from 'react';
import { Input } from '../../../../forms';
import { OnboardingStepProps } from '../types';

const LocationStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  const belgianCities = [
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
    'Kortrijk',
    'Hasselt',
    'Sint-Niklaas',
    'Ostend',
    'Tournai',
  ];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Where is your business located?</h2>
        <p className="text-gray-600">Location helps buyers understand your market and potential</p>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            label="Country"
            value={formData.country}
            onChange={e => updateFormData({ country: e.target.value })}
            disabled
            className="bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {belgianCities.map(city => (
              <button
                key={city}
                onClick={() => updateFormData({ city })}
                className={`p-3 border rounded-lg text-center transition-all ${
                  formData.city === city
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
          <Input
            placeholder="Or enter a different city"
            value={formData.city}
            onChange={e => updateFormData({ city: e.target.value })}
            className="mt-2"
          />
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-900 mb-1">Market Advantage</h4>
              <p className="text-sm text-green-700">
                Belgian businesses often attract international buyers due to the country's strategic
                location in Europe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
