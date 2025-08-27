import React from 'react';
import { Progress, Button } from '@heroui/react';
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  subtitle: string;
  estimatedTime?: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

interface OnboardingLayoutProps {
  title: string;
  subtitle: string;
  steps: Step[];
  currentStep: number;
  progress: number;
  children: React.ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
  estimatedTimeRemaining?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  title,
  subtitle,
  steps,
  currentStep,
  progress,
  children,
  onBack,
  showBackButton = true,
  estimatedTimeRemaining,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              {showBackButton && onBack && (
                <Button variant="ghost" size="sm" onPress={onBack} className="mr-4">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-600">{subtitle}</p>
              </div>
            </div>

            {estimatedTimeRemaining && (
              <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 mr-1" />~{estimatedTimeRemaining} remaining
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} color="primary" className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Steps Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start space-x-3 p-3 rounded-xl transition-all ${
                      step.isActive
                        ? 'bg-primary-50 border border-primary-200'
                        : step.isCompleted
                          ? 'bg-green-50 border border-green-200'
                          : 'border border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.isCompleted
                          ? 'bg-green-500 text-white'
                          : step.isActive
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          step.isActive ? 'text-primary-700' : 'text-gray-900'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{step.subtitle}</p>
                      {step.estimatedTime && !step.isCompleted && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.estimatedTime}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Motivation Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-sm text-blue-700 font-medium mb-2">Almost there!</div>
                  <div className="text-xs text-blue-600">
                    You're doing great. Complete setup to start connecting with opportunities.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
