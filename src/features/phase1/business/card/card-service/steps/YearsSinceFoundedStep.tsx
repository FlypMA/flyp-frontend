// 🏢 Years Since Founded Step - Card Service
// Location: src/features/phase1/business/card/card-service/steps/YearsSinceFoundedStep.tsx
// Purpose: Step 1 - How many years since you founded your business?

import React, { useEffect, useState } from 'react';
import { CardStepProps } from '../types/CardServiceTypes';

const YearsSinceFoundedStep: React.FC<CardStepProps> = ({ data, onDataChange }) => {
  const currentYear = new Date().getFullYear();
  const foundedYear = data.foundedYear || currentYear;
  const initialYears = currentYear - foundedYear;

  const [years, setYears] = useState(initialYears > 0 ? initialYears : 1);

  useEffect(() => {
    const newFoundedYear = currentYear - years;
    const yearData = {
      yearsInBusiness: years,
      foundedYear: newFoundedYear,
    };
    console.log('📅 Years Since Founded Step - updating data:', yearData);
    onDataChange(yearData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [years, currentYear]);

  const handleYearsChange = (newYears: number) => {
    setYears(Math.max(0, newYears));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">
        How many years since you founded your business?
      </h1>

      {/* Counter */}
      <div className="flex items-center justify-center space-x-4">
        {/* Minus Button */}
        <button
          onClick={() => handleYearsChange(years - 1)}
          className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
          aria-label="Decrease years"
          disabled={years <= 0}
        >
          <svg viewBox="0 0 12 12" className="w-4 h-4" fill="currentColor">
            <path d="m.75 6.75h10.5v-1.5h-10.5z" />
          </svg>
        </button>

        {/* Years Display */}
        <div className="flex flex-col items-center min-w-[150px]">
          <div className="text-6xl font-bold text-gray-900 mb-2">{years}</div>
          <div className="text-lg text-gray-600">{years === 1 ? 'year' : 'years'}</div>
        </div>

        {/* Plus Button */}
        <button
          onClick={() => handleYearsChange(years + 1)}
          className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
          aria-label="Increase years"
        >
          <svg viewBox="0 0 12 12" className="w-4 h-4" fill="currentColor">
            <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
          </svg>
        </button>
      </div>

      {/* Founded Year Display */}
      <div className="mt-8 text-sm text-gray-600">
        Founded in: <span className="font-semibold">{currentYear - years}</span>
      </div>

      {/* Contextual Feedback */}
      <div className="mt-12 max-w-md">
        <p className="text-sm text-gray-600">
          This helps potential buyers understand your level of experience in the industry.
        </p>
      </div>

      {/* Special Messages */}
      {years === 0 && (
        <div className="mt-8 max-w-md p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-primary-600 mt-0.5"
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
              <p className="text-sm text-gray-900">
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

export default YearsSinceFoundedStep;
