// 🏢 Listing Creation Flow - Full Page Experience
// Location: src/features/phase1/business/listing/components/ListingCreationFlow.tsx
// Purpose: Full-page listing creation flow starting with business type selection

import React, { useState } from 'react';
import { ListingCreationData } from '../listing-service/types';
import { BusinessConfirmationPage, BusinessTypeSelectionPage } from '../prelude/components';
import { BusinessType } from '../prelude/types';

interface ListingCreationFlowProps {
  onComplete?: (data: ListingCreationData) => void;
  onClose?: () => void;
  businessInfo?: {
    name: string;
    industry: string;
    description: string;
    foundedYear: number;
    teamSize: string;
    location: string;
    isRemote: boolean;
    website?: string;
    revenue?: number;
    status?: 'active' | 'inactive' | 'draft';
  };
  valuationData?: {
    businessType: 'sole-trader' | 'company';
    sharesForSale: number;
    revenue2025: number;
    revenue2024: number;
    revenue2023: number;
    ebitda2025: number;
    ebitda2024: number;
    ebitda2023: number;
    estimated_value?: number;
    valuation_confidence?: 'high' | 'medium' | 'low';
    valuation_methodology?: string;
  };
}

const ListingCreationFlow: React.FC<ListingCreationFlowProps> = ({
  onComplete,
  onClose,
  businessInfo,
  valuationData,
}) => {
  const [currentStep, setCurrentStep] = useState<'business-type' | 'confirmation' | 'details'>(
    'business-type'
  );
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | undefined>();
  const [listingData, setListingData] = useState<Partial<ListingCreationData>>({});

  const handleBusinessTypeSelect = (businessType: BusinessType) => {
    setSelectedBusinessType(businessType);
    setListingData(prev => ({
      ...prev,
      businessType,
    }));
    setCurrentStep('confirmation');
  };

  const handleGetStarted = () => {
    setCurrentStep('details');
    // In a real implementation, you'd navigate to the next step
    if (onComplete) {
      onComplete({
        businessType: selectedBusinessType!,
        basicInfo: {
          name: businessInfo?.name || '',
          description: businessInfo?.description || '',
          industry: businessInfo?.industry || '',
          location: businessInfo?.location || '',
          isRemote: businessInfo?.isRemote || false,
          foundedYear: businessInfo?.foundedYear || new Date().getFullYear(),
          teamSize: businessInfo?.teamSize || '',
          website: businessInfo?.website || '',
          keyHighlights: [],
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
  };

  const handleBack = () => {
    if (currentStep === 'confirmation') {
      setCurrentStep('business-type');
    } else if (onClose) {
      onClose();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'business-type':
        return (
          <BusinessTypeSelectionPage
            onBusinessTypeSelect={handleBusinessTypeSelect}
            onBack={handleBack}
            selectedBusinessType={selectedBusinessType}
          />
        );
      case 'confirmation':
        return (
          <BusinessConfirmationPage
            selectedBusinessType={selectedBusinessType!}
            onBack={handleBack}
            onGetStarted={handleGetStarted}
          />
        );
      case 'details':
        // This would be the next step in the flow
        return (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Step: Business Details</h2>
              <p className="text-gray-600">This would be the next step in the flow...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="min-h-screen bg-white">{renderCurrentStep()}</div>;
};

export default ListingCreationFlow;
