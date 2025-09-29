// 🏢 Listing Wizard Modal - Modular Architecture
// Location: src/features/phase1/business/wizard/components/ListingWizardModal.tsx
// Purpose: Main modal orchestrating the listing creation wizard

import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useEffect, useState } from 'react';

// Step Components
import BasicInfoStep from '../steps/BasicInfoStep';
import BusinessDetailsStep from '../steps/BusinessDetailsStep';
import DocumentsStep from '../steps/DocumentsStep';
import FinancialInfoStep from '../steps/FinancialInfoStep';
import PrivacySettingsStep from '../steps/PrivacySettingsStep';
import ReviewStep from '../steps/ReviewStep';
import SaleDetailsStep from '../steps/SaleDetailsStep';

// Shared Components
import StepIndicator from './StepIndicator';
import WizardNavigation from './WizardNavigation';

// Types
import { ListingWizardData, ListingWizardModalProps } from '../types';

const ListingWizardModal: React.FC<ListingWizardModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  businessInfo,
  valuationData,
  valuationReports = [],
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wizardData, setWizardData] = useState<Partial<ListingWizardData>>({});

  const totalSteps = 7;

  // Initialize wizard data with business profile data or defaults
  useEffect(() => {
    if (isOpen) {
      setWizardData({
        basicInfo: {
          name: businessInfo?.name || '',
          description: businessInfo?.description || '',
          industry: businessInfo?.industry || '',
          location: businessInfo?.location || '',
          isRemote: businessInfo?.isRemote || false,
          foundedYear: businessInfo?.foundedYear || new Date().getFullYear(),
          teamSize: businessInfo?.teamSize || '',
          website: businessInfo?.website || '',
          business_model: '', // Not available in business profile, will be filled by user
        },
        financialInfo: {
          businessType: valuationData?.businessType || 'company',
          sharesForSale: valuationData?.sharesForSale || 100,
          revenue2025: valuationData?.revenue2025 || 0,
          revenue2024: valuationData?.revenue2024 || 0,
          revenue2023: valuationData?.revenue2023 || 0,
          ebitda2025: valuationData?.ebitda2025 || 0,
          ebitda2024: valuationData?.ebitda2024 || 0,
          ebitda2023: valuationData?.ebitda2023 || 0,
          asking_price: valuationData?.estimated_value?.toString() || '',
          price_negotiable: true,
          currency: 'EUR',
          estimated_value: valuationData?.estimated_value,
          valuation_confidence: valuationData?.valuation_confidence,
          valuation_methodology: valuationData?.valuation_methodology,
        },
        businessDetails: {
          key_products: '',
          target_market: '',
          competitive_advantage: '',
          growth_opportunities: '',
          key_assets: '',
          operational_highlights: '',
        },
        saleDetails: {
          reason_for_sale: '',
          preferred_timeline: '',
          included_assets: [],
          excluded_assets: [],
          transition_support: '',
          staff_retention: '',
        },
        privacySettings: {
          anonymous_listing: true,
          requires_nda: true,
          hide_financials: false,
          hide_location: false,
          hide_industry_details: false,
          teaser_description: '',
        },
        documents: {
          financial: null,
          legal: null,
          operations: null,
          marketing: null,
          other: null,
        },
      });
    }
  }, [isOpen]);

  // Pre-populate form data when modal opens
  useEffect(() => {
    if (isOpen && businessInfo) {
      setWizardData(prev => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo!,
          name: businessInfo.name
            ? `${businessInfo.name} - Business for Sale`
            : prev.basicInfo!.name,
          description: businessInfo.description || prev.basicInfo!.description,
          industry: businessInfo.industry || prev.basicInfo!.industry,
          location: businessInfo.location || prev.basicInfo!.location,
          isRemote: businessInfo.isRemote || prev.basicInfo!.isRemote,
          foundedYear: businessInfo.foundedYear || prev.basicInfo!.foundedYear,
          teamSize: businessInfo.teamSize || prev.basicInfo!.teamSize,
        },
      }));
    }

    if (isOpen && valuationData) {
      setWizardData(prev => ({
        ...prev,
        financialInfo: {
          ...prev.financialInfo!,
          businessType: valuationData.businessType || prev.financialInfo!.businessType,
          sharesForSale: valuationData.sharesForSale || prev.financialInfo!.sharesForSale,
          revenue2025: valuationData.revenue2025 || prev.financialInfo!.revenue2025,
          revenue2024: valuationData.revenue2024 || prev.financialInfo!.revenue2024,
          revenue2023: valuationData.revenue2023 || prev.financialInfo!.revenue2023,
          ebitda2025: valuationData.ebitda2025 || prev.financialInfo!.ebitda2025,
          ebitda2024: valuationData.ebitda2024 || prev.financialInfo!.ebitda2024,
          ebitda2023: valuationData.ebitda2023 || prev.financialInfo!.ebitda2023,
          estimated_value: valuationData.estimated_value || prev.financialInfo!.estimated_value,
          valuation_confidence:
            valuationData.valuation_confidence || prev.financialInfo!.valuation_confidence,
          valuation_methodology:
            valuationData.valuation_methodology || prev.financialInfo!.valuation_methodology,
          asking_price: valuationData.estimated_value
            ? valuationData.estimated_value.toString()
            : prev.financialInfo!.asking_price,
        },
        privacySettings: {
          ...prev.privacySettings!,
          anonymous_listing: true,
          requires_nda: true,
          hide_financials: false,
          hide_location: false,
          hide_industry_details: false,
        },
      }));
    }
  }, [isOpen, businessInfo, valuationData]);

  const handleDataChange = (stepData: Partial<ListingWizardData>) => {
    setWizardData(prev => ({
      ...prev,
      ...stepData,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your API
      // TODO: Implement API call to submit listing data

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (onComplete) {
        onComplete(wizardData as ListingWizardData);
      }

      onClose();
    } catch (error) {
      // TODO: Handle error properly (show user notification, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    // Add validation logic for each step
    switch (currentStep) {
      case 1:
        return !!(
          wizardData.basicInfo?.name &&
          wizardData.basicInfo?.description &&
          wizardData.basicInfo?.industry
        );
      case 2:
        return !!wizardData.financialInfo?.asking_price;
      case 3:
        return !!(
          wizardData.businessDetails?.key_products && wizardData.businessDetails?.target_market
        );
      case 4:
        return !!(
          wizardData.saleDetails?.reason_for_sale && wizardData.saleDetails?.preferred_timeline
        );
      case 5:
        return !!wizardData.privacySettings?.teaser_description;
      case 6:
        return true; // Documents are optional
      case 7:
        return true; // Review step
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: wizardData,
      onDataChange: handleDataChange,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === totalSteps,
      isLoading: isSubmitting,
    };

    switch (currentStep) {
      case 1:
        return <BasicInfoStep {...stepProps} />;
      case 2:
        return <FinancialInfoStep {...stepProps} valuationReports={valuationReports} />;
      case 3:
        return <BusinessDetailsStep {...stepProps} />;
      case 4:
        return <SaleDetailsStep {...stepProps} />;
      case 5:
        return <PrivacySettingsStep {...stepProps} />;
      case 6:
        return <DocumentsStep {...stepProps} />;
      case 7:
        return <ReviewStep {...stepProps} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    'Basic Info',
    'Financials',
    'Business Details',
    'Sale Details',
    'Privacy',
    'Documents',
    'Review',
  ];

  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Business Listing"
      currentStep={currentStep}
      totalSteps={totalSteps}
      showProgress={true}
      headerContent={
        <div className="w-full px-6 py-3">
          {/* Compact Timeline Container */}
          <div className="relative">
            {/* Background Progress Line */}
            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-100 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Step Indicators */}
            <div className="relative flex justify-between items-start">
              {stepTitles.map((title, index) => (
                <div key={index + 1} className="flex flex-col items-center flex-1">
                  <StepIndicator
                    step={index + 1}
                    title={title}
                    completed={currentStep > index + 1}
                    active={currentStep === index + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full min-h-0">
        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">{renderCurrentStep()}</div>

        {/* Navigation Footer - Sticky */}
        <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-2">
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onComplete={handleComplete}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === totalSteps}
            isLoading={isSubmitting}
            canProceed={canProceed()}
          />
        </div>
      </div>
    </FullscreenModal>
  );
};

export default ListingWizardModal;
