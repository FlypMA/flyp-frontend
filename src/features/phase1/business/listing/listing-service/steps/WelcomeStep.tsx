// 🏢 Welcome Step - Years in Business
// Location: src/features/phase1/business/listing/listing-service/steps/WelcomeStep.tsx
// Purpose: First step asking how many years the business has been operating

import React, { useEffect, useState } from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const WelcomeStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  // Get business type from data
  const businessType = data.businessType || 'business';

  // Get the current year and calculate years since founding
  const currentYear = new Date().getFullYear();
  const foundedYear = data.basicInfo?.foundedYear || currentYear;
  const yearsInBusiness = currentYear - foundedYear;

  // Initialize years state with calculated value or default to 1
  const [years, setYears] = useState(yearsInBusiness > 0 ? yearsInBusiness : 1);

  // Update data when years change
  useEffect(() => {
    const newFoundedYear = currentYear - years;
    onDataChange({
      basicInfo: {
        ...data.basicInfo,
        name: data.basicInfo?.name || '',
        description: data.basicInfo?.description || '',
        industry: data.basicInfo?.industry || '',
        location: data.basicInfo?.location || '',
        isRemote: data.basicInfo?.isRemote || false,
        teamSize: data.basicInfo?.teamSize || '',
        website: data.basicInfo?.website || '',
        keyHighlights: data.basicInfo?.keyHighlights || [],
        foundedYear: newFoundedYear,
      },
    });
  }, [years]);

  const handleYearsChange = (newYears: number) => {
    setYears(newYears);
  };

  // Get the correct business type label
  const getBusinessTypeLabel = () => {
    switch (businessType) {
      case 'catering':
        return 'caterer';
      case 'photography':
        return 'photographer';
      case 'hairstyling':
        return 'hairstylist';
      case 'chef':
        return 'chef';
      case 'meals':
        return 'meal service provider';
      case 'makeup':
        return 'makeup artist';
      case 'massage':
        return 'massage therapist';
      case 'nailcare':
        return 'nail technician';
      case 'personaltraining':
        return 'personal trainer';
      case 'wellness':
        return 'wellness provider';
      case 'cleaning':
        return 'cleaning service provider';
      case 'consulting':
        return 'consultant';
      default:
        return 'business owner';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Large Centered Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-12">
        How many years since you founded your business?
      </h1>

      {/* Centered Counter */}
      <div className="flex items-center justify-center space-x-4">
        {/* Decrease Button */}
        <button
          onClick={() => handleYearsChange(Math.max(0, years - 1))}
          className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
          aria-label="Decrease years"
        >
          <svg viewBox="0 0 12 12" className="w-4 h-4" fill="currentColor">
            <path d="m.75 6.75h10.5v-1.5h-10.5z" />
          </svg>
        </button>

        {/* Number Display */}
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-gray-900 mb-2">{years}</div>
          <div className="text-lg text-gray-600">years</div>
        </div>

        {/* Increase Button */}
        <button
          onClick={() => handleYearsChange(Math.min(99, years + 1))}
          className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
          aria-label="Increase years"
        >
          <svg viewBox="0 0 12 12" className="w-4 h-4" fill="currentColor">
            <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
          </svg>
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-12 max-w-md">
        <p className="text-sm text-gray-600">
          This helps potential buyers understand your level of experience in the industry.
        </p>
      </div>

      {/* Additional Context */}
      {years === 0 && (
        <div className="mt-8 max-w-md p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5"
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
            <div>
              <p className="text-sm text-blue-900">
                <span className="font-medium">Just starting out?</span> That's great! Even new
                businesses can attract buyers looking for growth opportunities.
              </p>
            </div>
          </div>
        </div>
      )}

      {years >= 10 && (
        <div className="mt-8 max-w-md p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-emerald-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-emerald-900">
                <span className="font-medium">Established business!</span> Your years of experience
                are valuable and demonstrate stability to potential buyers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeStep;
