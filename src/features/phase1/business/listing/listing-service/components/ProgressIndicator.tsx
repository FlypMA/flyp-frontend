// 🏢 Progress Indicator - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/components/ProgressIndicator.tsx
// Purpose: Visual progress indicator for the listing creation flow

import React from 'react';

interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ProgressIndicatorProps {
  steps: StepConfig[];
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-6">
        {/* Background Line */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            const isUpcoming = currentStep < step.id;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                          ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                          : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs">{step.id}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="mt-2 text-center max-w-20">
                  <div
                    className={`
                      text-xs font-medium transition-colors duration-300
                      ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}
                    `}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Info */}
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% complete</div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
