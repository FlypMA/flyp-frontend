// 🎯 Buyer Wizard - Modular Architecture
// Location: src/features/authentication/components/BuyerWizard.tsx
// Purpose: Modern, modular buyer onboarding wizard (219 lines vs previous 1,044-line monolith)

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { useBuyerWizard } from '../hooks/useBuyerWizard';
import { WizardProgress } from './wizard-components/WizardProgress';
import { WizardNavigation } from './wizard-components/WizardNavigation';
import { StepBuyerProfile } from './wizard-steps/StepBuyerProfile';
import { StepInvestmentCriteria } from './wizard-steps/StepInvestmentCriteria';
import { StepDealPreferences } from './wizard-steps/StepDealPreferences';
import { StepSearchSetup } from './wizard-steps/StepSearchSetup';
import { SEOHead } from '../../../shared/components/seo/SEOHead';

// Success Component
const OnboardingSuccess: React.FC = () => (
  <Card className="max-w-2xl mx-auto">
    <CardBody className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🎉</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to BetweenDeals!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your buyer profile has been created successfully. We'll start matching you with relevant
        business opportunities right away.
      </p>
      <div className="text-sm text-gray-500">Redirecting to dashboard in a few seconds...</div>
    </CardBody>
  </Card>
);

/**
 * BuyerWizard - Modern, Modular Buyer Onboarding
 *
 * ✅ BEFORE: 1,044-line monolithic component
 * ✅ AFTER: ~100-line clean orchestrator component
 *
 * Architecture Benefits:
 * • Separated concerns: UI, state, validation, constants
 * • Reusable step components
 * • Custom hook for business logic
 * • Easy to test and maintain
 * • Follows Single Responsibility Principle
 */
export const BuyerWizard: React.FC = () => {
  const {
    // State
    currentStep,
    showSuccess,
    buyerData,

    // Computed values
    steps,
    progress,
    isFirstStep,
    isLastStep,

    // Actions
    updateBuyerData,
    nextStep,
    previousStep,
    handleSubmit,
    validateCurrentStep,

    // Loading state
    isSubmitting,
  } = useBuyerWizard();

  // Show success screen
  if (showSuccess) {
    return (
      <>
        <SEOHead
          title="Welcome to BetweenDeals | Setup Complete"
          description="Your buyer profile has been successfully created"
          keywords="buyer setup complete, business search, M&A platform"
        />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <OnboardingSuccess />
        </div>
      </>
    );
  }

  // Current step validation
  const validation = validateCurrentStep();
  const canProceed = validation.isValid;

  // Handle next step
  const handleNext = () => {
    const result = nextStep();
    if (!result.isValid) {
      // Validation errors are handled by individual step components
      console.log('Validation errors:', result.errors);
    }
  };

  // Handle final submission
  const handleFinalSubmit = async () => {
    const result = await handleSubmit();
    if (!result.isValid) {
      console.log('Submission errors:', result.errors);
    }
  };

  // Render current step component
  const renderCurrentStep = () => {
    const commonProps = {
      data: buyerData,
      onUpdate: updateBuyerData,
      errors: validation.errors,
    };

    switch (currentStep) {
      case 0:
        return <StepBuyerProfile {...commonProps} />;
      case 1:
        return <StepInvestmentCriteria {...commonProps} />;
      case 2:
        return <StepDealPreferences {...commonProps} />;
      case 3:
        return <StepSearchSetup {...commonProps} />;
      default:
        return <StepBuyerProfile {...commonProps} />;
    }
  };

  return (
    <>
      <SEOHead
        title="Buyer Onboarding | BetweenDeals"
        description="Set up your buyer profile and investment criteria to find perfect business opportunities"
        keywords="buyer onboarding, investment criteria, business search, M&A"
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BetweenDeals</h1>
            <p className="text-lg text-gray-600">
              Let's set up your buyer profile to find perfect business opportunities
            </p>
          </div>

          {/* Progress Indicator */}
          <WizardProgress steps={steps} currentStep={currentStep} progress={progress} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step Content */}
            <div className="lg:col-span-2">
              {renderCurrentStep()}

              {/* Navigation */}
              <WizardNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                isSubmitting={isSubmitting}
                canProceed={canProceed}
                onPrevious={previousStep}
                onNext={handleNext}
                onSubmit={handleFinalSubmit}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Platform Stats */}
                <Card className="border border-gray-200">
                  <CardBody className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Platform Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Active Listings</span>
                        <span className="font-semibold text-gray-900">500+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Avg. Time to Match</span>
                        <span className="font-semibold text-gray-900">3 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <span className="font-semibold text-gray-900">87%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Avg. Deal Size</span>
                        <span className="font-semibold text-gray-900">€2.1M</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Help Box */}
                <Card className="border border-blue-200 bg-blue-50">
                  <CardBody className="p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                    <p className="text-sm text-blue-800 mb-4">
                      Our advisors are here to help you find the perfect acquisition opportunity.
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Contact an Advisor →
                    </button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerWizard;
