// 🏢 Streamlined Listing Creation Modal
// Location: src/features/phase1/business/listing/components/StreamlinedListingModal.tsx
// Purpose: Intelligent listing creation with data reuse from business card, profile, and valuation

import { SecondaryButton } from '@/shared/components/buttons';
import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Steps
import BusinessStoryStep from '../listing-service/steps/BusinessStoryStep';
import DocumentsStep from '../listing-service/steps/DocumentsStep';
import PrivacySettingsStep from '../listing-service/steps/PrivacySettingsStep';
import ReviewStep from '../listing-service/steps/ReviewStep';
import SaleDetailsStep from '../listing-service/steps/SaleDetailsStep';

// Preview Steps (read-only)
import BusinessCardPreviewStep from './listing-steps/BusinessCardPreviewStep';
import ProfileCardPreviewStep from './listing-steps/ProfileCardPreviewStep';
import ValuationPreviewStep from './listing-steps/ValuationPreviewStep';

// Types
import { ListingWizardData } from '../types';

interface StreamlinedListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: ListingWizardData) => void;
  businessCard: any; // Business card data from localStorage
  profileCard?: any; // Profile card data from localStorage
  valuationReport?: any; // Latest valuation report from localStorage
}

const StreamlinedListingModal: React.FC<StreamlinedListingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  businessCard,
  profileCard,
  valuationReport,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingData, setListingData] = useState<Partial<ListingWizardData>>({});

  const totalSteps = 8;

  // Step configuration
  const stepConfig = [
    {
      id: 1,
      title: 'Business',
      icon: '🏢',
      isPreview: true,
    },
    {
      id: 2,
      title: 'Profile',
      icon: '👤',
      isPreview: true,
    },
    {
      id: 3,
      title: 'Valuation',
      icon: '💰',
      isPreview: true,
    },
    {
      id: 4,
      title: 'Story',
      icon: '📖',
      isPreview: false,
    },
    {
      id: 5,
      title: 'Sale',
      icon: '📋',
      isPreview: false,
    },
    {
      id: 6,
      title: 'Photos',
      icon: '📸',
      isPreview: false,
    },
    {
      id: 7,
      title: 'Privacy',
      icon: '🔒',
      isPreview: false,
    },
    {
      id: 8,
      title: 'Review',
      icon: '✅',
      isPreview: false,
    },
  ];

  const handleDataChange = (stepData: Partial<ListingWizardData>) => {
    setListingData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalSteps) {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Allow clicking on any visited step or preview steps
    if (stepId <= currentStep || stepId <= 3) {
      setCurrentStep(stepId);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Combine all data: prefilled + user-entered
      const completeListing: ListingWizardData = {
        // From business card
        basicInfo: {
          name: businessCard.name,
          description: businessCard.description,
          industry: businessCard.type,
          location: businessCard.location,
          isRemote: businessCard.isRemote,
          foundedYear: businessCard.foundedYear,
          teamSize: businessCard.teamSize,
          website: '',
          business_model: '',
          keyHighlights: [],
        },
        // From valuation
        financialInfo: valuationReport
          ? {
              businessType: valuationReport.inputs?.businessType || 'company',
              sharesForSale: valuationReport.inputs?.sharesForSale || 100,
              revenue2025: valuationReport.inputs?.revenue2025 || 0,
              revenue2024: valuationReport.inputs?.revenue2024 || 0,
              revenue2023: valuationReport.inputs?.revenue2023 || 0,
              ebitda2025: valuationReport.inputs?.ebitda2025 || 0,
              ebitda2024: valuationReport.inputs?.ebitda2024 || 0,
              ebitda2023: valuationReport.inputs?.ebitda2023 || 0,
              asking_price: valuationReport.businessValue?.toString() || '',
              price_negotiable: true,
              currency: 'EUR',
              estimated_value: valuationReport.businessValue,
              valuation_confidence: valuationReport.confidence,
              valuation_methodology: valuationReport.methodology,
            }
          : {
              businessType: 'company',
              sharesForSale: 100,
              revenue2025: 0,
              revenue2024: 0,
              revenue2023: 0,
              ebitda2025: 0,
              ebitda2024: 0,
              ebitda2023: 0,
              asking_price: '',
              price_negotiable: true,
              currency: 'EUR',
            },
        // User-entered data
        businessDetails: listingData.businessDetails || {
          key_products: '',
          target_market: '',
          competitive_advantage: '',
          growth_opportunities: '',
          key_assets: '',
          operational_highlights: '',
        },
        businessStory: listingData.businessStory || {
          whatMakesSpecial: '',
          targetCustomers: '',
          growthOpportunities: '',
          keyAssets: '',
          competitiveAdvantage: '',
        },
        saleDetails: listingData.saleDetails || {
          reason_for_sale: '',
          preferred_timeline: '',
          included_assets: [],
          excluded_assets: [],
          transition_support: '',
          staff_retention: '',
        },
        privacySettings: listingData.privacySettings || {
          anonymous_listing: true,
          requires_nda: true,
          hide_financials: false,
          hide_location: false,
          hide_industry_details: false,
          teaser_description: '',
        },
        documents: listingData.documents || {
          financial: null,
          legal: null,
          operations: null,
          marketing: null,
          other: null,
        },
      };

      console.log('✅ Complete listing data:', completeListing);

      if (onComplete) {
        onComplete(completeListing);
      }

      // Save to localStorage
      localStorage.setItem('activeListing', JSON.stringify(completeListing));
      localStorage.setItem('hasActiveListing', 'true');

      onClose();
      navigate('/my-business');
    } catch (error) {
      console.error('❌ Error creating listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    // Preview steps (1-3) can always proceed
    if (currentStep <= 3) return true;

    switch (currentStep) {
      case 4: {
        // Business Story
        const hasSpecial = listingData.businessStory?.whatMakesSpecial?.trim();
        const hasCustomers = listingData.businessStory?.targetCustomers?.trim();
        console.log('🔍 Step 4 validation:', {
          whatMakesSpecial: listingData.businessStory?.whatMakesSpecial,
          targetCustomers: listingData.businessStory?.targetCustomers,
          hasSpecial,
          hasCustomers,
          canProceed: !!(hasSpecial && hasCustomers),
        });
        return !!(hasSpecial && hasCustomers);
      }
      case 5: {
        // Sale Details
        const hasReason = listingData.saleDetails?.reasonForSale?.trim();
        const hasTimeline = listingData.saleDetails?.preferredTimeline?.trim();
        console.log('🔍 Step 5 validation:', {
          reasonForSale: listingData.saleDetails?.reasonForSale,
          preferredTimeline: listingData.saleDetails?.preferredTimeline,
          hasReason,
          hasTimeline,
          canProceed: !!(hasReason && hasTimeline),
        });
        return !!(hasReason && hasTimeline);
      }
      case 6: // Documents
        return true; // Optional
      case 7: // Privacy
        return !!listingData.privacySettings?.teaser_description;
      case 8: // Review
        return true;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: listingData,
      onDataChange: handleDataChange,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === totalSteps,
      isLoading: isSubmitting,
    };

    switch (currentStep) {
      case 1:
        return <BusinessCardPreviewStep businessCard={businessCard} onNext={handleNext} />;
      case 2:
        return <ProfileCardPreviewStep profileCard={profileCard} onNext={handleNext} />;
      case 3:
        return <ValuationPreviewStep valuationReport={valuationReport} onNext={handleNext} />;
      case 4:
        return <BusinessStoryStep {...(stepProps as any)} />;
      case 5:
        return <SaleDetailsStep {...(stepProps as any)} />;
      case 6:
        return <DocumentsStep {...(stepProps as any)} />;
      case 7:
        return <PrivacySettingsStep {...(stepProps as any)} />;
      case 8:
        return <ReviewStep {...(stepProps as any)} />;
      default:
        return null;
    }
  };

  const currentStepConfig = stepConfig[currentStep - 1];

  return (
    <FullscreenModal isOpen={isOpen} onClose={onClose} showProgress={false} showHeader={false}>
      <div className="flex h-full min-h-0 bg-black p-4">
        {/* Sidebar Navigation - Fixed Width */}
        <div className="flex-shrink-0 w-[160px] bg-black h-full flex flex-col items-center py-6 overflow-y-auto">
          <div className="flex flex-col space-y-4 w-full">
            {stepConfig.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isClickable = step.id <= currentStep || step.id <= 3;

              return (
                <div key={step.id} className="relative">
                  {/* Progress line above icon */}
                  {index > 0 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-700">
                      {isCompleted && <div className="w-full h-full bg-white" />}
                    </div>
                  )}

                  {/* Step button */}
                  <button
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`w-full flex flex-col items-center space-y-2 transition-all ${
                      isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                        isActive
                          ? 'bg-white text-black ring-2 ring-white ring-offset-2 ring-offset-black'
                          : isCompleted
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-900 text-gray-500'
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Title */}
                    <span
                      className={`text-xs font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>

                    {/* Preview badge */}
                    {step.isPreview && (
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                        Prefilled
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-h-0 ml-4 bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Step Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Step Title and Progress */}
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900">{currentStepConfig.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Step {currentStep} of {totalSteps}
                  {currentStep <= 3 && (
                    <span className="ml-2 text-emerald-600 font-medium">
                      • Prefilled from your data
                    </span>
                  )}
                </p>
              </div>

              {/* Save and Exit Button */}
              <SecondaryButton onClick={onClose} size="sm" aria-label="Save and exit">
                Save and exit
              </SecondaryButton>
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white">{renderCurrentStep()}</div>

          {/* Navigation Footer - Sticky */}
          <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
              <SecondaryButton
                onClick={handlePrevious}
                disabled={currentStep === 1}
                size="sm"
                aria-label="Back"
              >
                Back
              </SecondaryButton>
              <button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[165px] h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Publishing...'
                  : currentStep === totalSteps
                    ? 'Publish Listing'
                    : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </FullscreenModal>
  );
};

export default StreamlinedListingModal;
