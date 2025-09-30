// 🏢 Listing Creation Modal - Streamlined Flow (Steps 4-8 Only)
// Location: src/features/phase1/business/listing/listing-service/components/ListingCreationModal.tsx
// Purpose: Main modal for listing creation with prefilled data from business card + valuation
// Note: Steps 1-3 removed - business info comes from business card, financials from valuation

import { SecondaryButton } from '@/shared/components/buttons';
import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import React, { useEffect, useState } from 'react';

// Step Components (Steps 4-8 only)
import BusinessStoryStep from '../steps/BusinessStoryStep';
import PhotosDocumentsStep from '../steps/PhotosDocumentsStep';
import PrivacyVisibilityStep from '../steps/PrivacyVisibilityStep';
import ReviewPublishStep from '../steps/ReviewPublishStep';
import SaleDetailsStep from '../steps/SaleDetailsStep';

// Shared Components
import NavigationControls from './NavigationControls';
import SidebarNavigation from './SidebarNavigation';

// Types
import { ListingCreationData, ListingCreationModalProps } from '../types';

const ListingCreationModal: React.FC<ListingCreationModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  businessCard, // NEW: Required business card data
  businessInfo, // DEPRECATED: For backward compatibility
  valuationData,
  valuationReports = [],
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingData, setListingData] = useState<Partial<ListingCreationData>>({});

  const totalSteps = 5; // Updated from 8 to 5 (removed Steps 1-3)

  // Step configuration (Steps 4-8 renumbered to 1-5)
  const stepConfig = [
    {
      id: 1,
      title: 'Business Story',
      description: 'What makes your business special?',
      icon: '✨',
    },
    {
      id: 2,
      title: 'Sale Details',
      description: 'How would you like to sell?',
      icon: '🤝',
    },
    {
      id: 3,
      title: 'Photos & Docs',
      description: 'Add visual appeal and documents',
      icon: '📸',
    },
    {
      id: 4,
      title: 'Privacy',
      description: 'Control your listing visibility',
      icon: '🔒',
    },
    {
      id: 5,
      title: 'Review',
      description: 'Review and publish your listing',
      icon: '🚀',
    },
  ];

  // Initialize listing data with business card + valuation data (prefilled)
  useEffect(() => {
    if (isOpen) {
      // Use businessCard (new) or fallback to businessInfo (deprecated)
      const sourceData = businessCard || businessInfo;

      setListingData({
        businessType: businessCard?.type || 'catering', // From business card
        basicInfo: {
          name: sourceData?.name || '',
          description: sourceData?.description || businessCard?.description || '',
          industry: sourceData?.industry || businessCard?.industry || '',
          location: sourceData?.location || businessCard?.location || '',
          isRemote: sourceData?.isRemote || businessCard?.isRemote || false,
          foundedYear:
            sourceData?.foundedYear || businessCard?.foundedYear || new Date().getFullYear(),
          teamSize: sourceData?.teamSize || businessCard?.teamSize || '',
          website: sourceData?.website || businessCard?.website || '',
          keyHighlights: businessCard?.keyHighlights || [],
        },
        financialOverview: {
          businessType: valuationData?.businessType || 'company',
          sharesForSale: valuationData?.sharesForSale || 100,
          revenue2025: valuationData?.revenue2025 || 0,
          revenue2024: valuationData?.revenue2024 || 0,
          revenue2023: valuationData?.revenue2023 || 0,
          ebitda2025: valuationData?.ebitda2025 || 0,
          ebitda2024: valuationData?.ebitda2024 || 0,
          ebitda2023: valuationData?.ebitda2023 || 0,
          askingPrice: valuationData?.estimated_value?.toString() || '',
          priceNegotiable: true,
          currency: 'EUR',
          estimatedValue: valuationData?.estimated_value,
          valuationConfidence: valuationData?.valuation_confidence,
          valuationMethodology: valuationData?.valuation_methodology,
          priceJustification: '',
        },
        businessStory: {
          whatMakesSpecial: '',
          targetCustomers: '',
          growthOpportunities: '',
          keyAssets: '',
          competitiveAdvantage: '',
        },
        saleDetails: {
          reasonForSale: '',
          preferredTimeline: '',
          includedAssets: [],
          excludedAssets: [],
          transitionSupport: '',
          staffRetention: '',
        },
        photosDocuments: {
          businessPhotos: [],
          financialDocuments: [],
          legalDocuments: [],
          operationalDocuments: [],
          marketingMaterials: [],
        },
        privacyVisibility: {
          anonymousListing: true,
          requiresNda: true,
          hideFinancials: false,
          hideLocation: false,
          hideIndustryDetails: false,
          teaserDescription: '',
        },
      });
    }
  }, [isOpen]);

  // Pre-populate form data when modal opens
  useEffect(() => {
    if (isOpen && businessInfo) {
      setListingData(prev => ({
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
      setListingData(prev => ({
        ...prev,
        financialOverview: {
          ...prev.financialOverview!,
          businessType: valuationData.businessType || prev.financialOverview!.businessType,
          sharesForSale: valuationData.sharesForSale || prev.financialOverview!.sharesForSale,
          revenue2025: valuationData.revenue2025 || prev.financialOverview!.revenue2025,
          revenue2024: valuationData.revenue2024 || prev.financialOverview!.revenue2024,
          revenue2023: valuationData.revenue2023 || prev.financialOverview!.revenue2023,
          ebitda2025: valuationData.ebitda2025 || prev.financialOverview!.ebitda2025,
          ebitda2024: valuationData.ebitda2024 || prev.financialOverview!.ebitda2024,
          ebitda2023: valuationData.ebitda2023 || prev.financialOverview!.ebitda2023,
          estimatedValue: valuationData.estimated_value || prev.financialOverview!.estimatedValue,
          valuationConfidence:
            valuationData.valuation_confidence || prev.financialOverview!.valuationConfidence,
          valuationMethodology:
            valuationData.valuation_methodology || prev.financialOverview!.valuationMethodology,
          askingPrice: valuationData.estimated_value
            ? valuationData.estimated_value.toString()
            : prev.financialOverview!.askingPrice,
        },
        privacyVisibility: {
          ...prev.privacyVisibility!,
          anonymousListing: true,
          requiresNda: true,
          hideFinancials: false,
          hideLocation: false,
          hideIndustryDetails: false,
        },
      }));
    }
  }, [isOpen, businessCard, businessInfo, valuationData]);

  const handleDataChange = (stepData: Partial<ListingCreationData>) => {
    setListingData(prev => ({
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

  const handleStepClick = (stepId: number) => {
    // Only allow navigation to current step or previous steps
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
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
        onComplete(listingData as ListingCreationData);
      }

      onClose();
    } catch (error) {
      // TODO: Handle error properly (show user notification, etc.)
      console.error('Error creating listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    // Validation logic for streamlined steps (1-5, originally 4-8)
    switch (currentStep) {
      case 1: // Business Story (formerly Step 4)
        return !!(
          listingData.businessStory?.whatMakesSpecial && listingData.businessStory?.targetCustomers
        );
      case 2: // Sale Details (formerly Step 5)
        return !!(
          listingData.saleDetails?.reasonForSale && listingData.saleDetails?.preferredTimeline
        );
      case 3: // Photos & Docs (formerly Step 6)
        return true; // Photos and documents are optional
      case 4: // Privacy (formerly Step 7)
        return !!listingData.privacyVisibility?.teaserDescription;
      case 5: // Review (formerly Step 8)
        return true; // Review step
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

    // Streamlined steps (1-5, originally 4-8)
    switch (currentStep) {
      case 1: // Business Story (formerly Step 4)
        return <BusinessStoryStep {...stepProps} />;
      case 2: // Sale Details (formerly Step 5)
        return <SaleDetailsStep {...stepProps} />;
      case 3: // Photos & Docs (formerly Step 6)
        return <PhotosDocumentsStep {...stepProps} />;
      case 4: // Privacy (formerly Step 7)
        return <PrivacyVisibilityStep {...stepProps} />;
      case 5: // Review (formerly Step 8)
        return <ReviewPublishStep {...stepProps} />;
      default:
        return null;
    }
  };

  const currentStepConfig = stepConfig[currentStep - 1];

  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      showProgress={false} // Hide default progress, we'll use sidebar
      showHeader={false} // Hide default header, we have our own
    >
      <div className="flex h-full min-h-0 bg-black p-4">
        {/* Sidebar Navigation - Fixed Width */}
        <div className="flex-shrink-0 w-[160px] bg-black h-full overflow-y-auto">
          <SidebarNavigation
            steps={stepConfig}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
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
                </p>
              </div>

              {/* Save and Exit Button */}
              <SecondaryButton onClick={onClose} size="sm" aria-label="Save and exit">
                Save and exit
              </SecondaryButton>
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-8 py-6 min-h-0 bg-white">
            {renderCurrentStep()}
          </div>

          {/* Navigation Footer - Sticky */}
          <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-6">
            <NavigationControls
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
      </div>
    </FullscreenModal>
  );
};

export default ListingCreationModal;
