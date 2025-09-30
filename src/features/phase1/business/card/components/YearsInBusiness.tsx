// 🏢 Years in Business - Business Card Feature
// Location: src/features/phase1/business/card/components/YearsInBusiness.tsx
// Purpose: Step to collect years in business (adapted from listing service WelcomeStep)
// Note: Preserves Airbnb-inspired counter UI from original design

import React, { useEffect, useState } from 'react';
import { BusinessCardStepProps } from '../types';

const YearsInBusiness: React.FC<BusinessCardStepProps> = ({ data, onDataChange }) => {
  // Get the current year and calculate years since founding
  const currentYear = new Date().getFullYear();
  const foundedYear = data.foundedYear || currentYear;
  const calculatedYears = currentYear - foundedYear;

  // Initialize years state
  const [years, setYears] = useState(
    data.yearsInBusiness !== undefined
      ? data.yearsInBusiness
      : calculatedYears > 0
        ? calculatedYears
        : 1
  );

  // Update data when years change
  useEffect(() => {
    const newFoundedYear = currentYear - years;
    onDataChange({
      yearsInBusiness: years,
      foundedYear: newFoundedYear,
    });
  }, [years]);

  const handleYearsChange = (newYears: number) => {
    setYears(newYears);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center overflow-y-auto py-8">
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
          This helps us understand your business's maturity and experience in the industry.
        </p>
        <p className="text-xs text-gray-500 mt-2">Founded in: {currentYear - years}</p>
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
                <span className="font-medium">Just starting out?</span> That's great! We welcome
                businesses at all stages of their journey.
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
                demonstrate stability and expertise in your industry.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearsInBusiness;
