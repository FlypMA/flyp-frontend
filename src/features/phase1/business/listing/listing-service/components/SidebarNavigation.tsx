// 🏢 Sidebar Navigation - Airbnb-Inspired
// Location: src/features/phase1/business/listing/listing-service/components/SidebarNavigation.tsx
// Purpose: Vertical sidebar navigation for listing creation wizard steps

import React from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface SidebarNavigationProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  const getStepStatus = (stepId: number): 'current' | 'unlocked' | 'locked' => {
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'unlocked';
    return 'locked';
  };

  const getStepClasses = (stepId: number): string => {
    const status = getStepStatus(stepId);
    const baseClasses =
      'flex items-center w-full h-auto min-h-[56px] rounded-xl border-2 transition-all duration-200 text-left cursor-pointer';

    switch (status) {
      case 'current':
        return `${baseClasses} border-gray-900 bg-gray-50 ring-2 ring-gray-100`;
      case 'unlocked':
        return `${baseClasses} border-gray-200 hover:border-gray-300 hover:bg-gray-50`;
      case 'locked':
        return `${baseClasses} border-gray-200 opacity-50 cursor-not-allowed`;
      default:
        return baseClasses;
    }
  };

  const getIconClasses = (stepId: number): string => {
    const status = getStepStatus(stepId);
    return status === 'current' ? 'text-2xl' : 'text-xl opacity-70';
  };

  const getTitleClasses = (stepId: number): string => {
    const status = getStepStatus(stepId);
    const baseClasses = 'font-semibold transition-colors';

    switch (status) {
      case 'current':
        return `${baseClasses} text-gray-900`;
      case 'unlocked':
        return `${baseClasses} text-gray-700`;
      case 'locked':
        return `${baseClasses} text-gray-400`;
      default:
        return baseClasses;
    }
  };

  const getDescriptionClasses = (stepId: number): string => {
    const status = getStepStatus(stepId);
    return status === 'locked' ? 'text-xs text-gray-400' : 'text-xs text-gray-600';
  };

  const handleStepClick = (stepId: number) => {
    const status = getStepStatus(stepId);
    // Only allow clicking on unlocked or current steps
    if (status !== 'locked' && onStepClick) {
      onStepClick(stepId);
    }
  };

  return (
    <aside className="w-full h-full flex flex-col bg-black py-7 px-10">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <img
          src="/upswitch_logo.svg?v=2024.1"
          alt="Upswitch - European SME M&A Platform"
          width="32"
          height="32"
          className="logo-image transition-opacity hover:opacity-80 w-8 h-8 brightness-0 invert"
          loading="lazy"
          style={{
            height: '32px',
            objectFit: 'contain',
            opacity: 1,
            visibility: 'visible',
            display: 'block',
          }}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex flex-col gap-4">
        {steps.map(step => {
          const status = getStepStatus(step.id);
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleStepClick(step.id)}
              disabled={status === 'locked'}
              aria-current={isCurrent ? 'step' : undefined}
              className="flex flex-col items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
            >
              {/* Progress Line Above Icon */}
              <div
                className={`w-12 h-1 rounded-full transition-colors duration-200 ${
                  isCurrent ? 'bg-white' : status === 'unlocked' ? 'bg-gray-500' : 'bg-gray-700'
                }`}
              />

              {/* Icon Container */}
              <div
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                  isCurrent
                    ? 'border-white bg-gray-800 shadow-sm'
                    : status === 'unlocked'
                      ? 'border-gray-600 bg-transparent hover:bg-gray-800'
                      : 'border-gray-700 bg-transparent'
                }`}
              >
                <div
                  className={`text-2xl ${status === 'locked' ? 'opacity-40 grayscale' : 'opacity-100'}`}
                >
                  {step.icon}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarNavigation;
