// 📊 Wizard Progress Component
// Location: src/features/authentication/components/wizard-components/WizardProgress.tsx
// Purpose: Progress indicator for wizard steps

import React from 'react';
import { Progress } from '@heroui/react';
import { CheckCircle2 } from 'lucide-react';
import type { BuyerWizardStep } from '../../types/buyerTypes';

interface WizardProgressProps {
  steps: BuyerWizardStep[];
  currentStep: number;
  progress: number;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({ steps, currentStep, progress }) => {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progress} color="primary" size="sm" className="mb-2" />
        <p className="text-sm text-gray-500 text-center">{Math.round(progress)}% Complete</p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center relative">
        {/* Connection Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
              ${
                step.isCompleted
                  ? 'bg-primary border-primary text-white'
                  : step.isActive
                    ? 'border-primary text-primary bg-white'
                    : 'border-gray-300 text-gray-400 bg-white'
              }
            `}
            >
              {step.isCompleted ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>

            {/* Step Info */}
            <div className="mt-3 text-center">
              <div
                className={`text-xs font-medium ${
                  step.isActive ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {step.title}
              </div>
              <div className="text-xs text-gray-400 mt-1">{step.estimatedTime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
