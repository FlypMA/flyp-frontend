// 🏢 Step Indicator Component - Listing Wizard
// Location: src/features/phase1/business/wizard/components/StepIndicator.tsx
// Purpose: Modern, clean step indicator for wizard navigation

import { Check } from 'lucide-react';
import React from 'react';
import { StepIndicatorProps } from '../types';

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, title, completed, active }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Step Circle */}
      <div className="relative z-10">
        {completed ? (
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              active
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-100'
                : 'bg-white text-gray-400 border-2 border-gray-200 hover:border-gray-300'
            }`}
          >
            {step}
          </div>
        )}
      </div>

      {/* Step Title */}
      <div className="mt-2 text-center max-w-16">
        <div
          className={`text-xs font-medium leading-tight transition-colors duration-300 ${
            active ? 'text-blue-600' : completed ? 'text-emerald-600' : 'text-gray-400'
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
