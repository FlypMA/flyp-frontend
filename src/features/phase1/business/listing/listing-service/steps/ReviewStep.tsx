// 🏢 Review Step - Listing Wizard
// Location: src/features/phase1/business/wizard/steps/ReviewStep.tsx
// Purpose: Step 7 - Review and finalize listing

import { CustomCheckbox } from '@/shared/components/forms';
import { Card, CardBody } from '@heroui/react';
import { CheckCircle } from 'lucide-react';
import React from 'react';
import { ListingWizardData } from '../types';

// NOTE: This is a legacy step that will be replaced. Using type assertions for compatibility.
const ReviewStep: React.FC<any> = ({ data }) => {
  const wizardData = data as any as ListingWizardData;
  const [isDraft, setIsDraft] = React.useState(false);
  const [termsAgreed, setTermsAgreed] = React.useState(false);

  const handleDraftChange = (checked: boolean) => {
    setIsDraft(checked);
    // You might want to pass this up to the parent component
  };

  const handleTermsChange = (checked: boolean) => {
    setTermsAgreed(checked);
    // You might want to pass this up to the parent component
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Review Your Listing</h2>
        <p className="text-neutral-600">Review all information before publishing your listing</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Business Name:</span>{' '}
                {wizardData.basicInfo?.name || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Industry:</span>{' '}
                {wizardData.basicInfo?.industry || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Location:</span>{' '}
                {wizardData.basicInfo?.location || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Team Size:</span>{' '}
                {wizardData.basicInfo?.teamSize || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Founded:</span>{' '}
                {wizardData.basicInfo?.foundedYear || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Remote Business:</span>{' '}
                {wizardData.basicInfo?.isRemote ? 'Yes' : 'No'}
              </div>
            </div>
            {wizardData.basicInfo?.description && (
              <div className="mt-4">
                <span className="font-medium">Description:</span>
                <p className="text-sm text-gray-600 mt-1">{wizardData.basicInfo.description}</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Asking Price:</span>{' '}
                {wizardData.financialInfo?.asking_price || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Price Negotiable:</span>{' '}
                {wizardData.financialInfo?.price_negotiable ? 'Yes' : 'No'}
              </div>
              {wizardData.financialInfo?.estimated_value && (
                <div>
                  <span className="font-medium">Estimated Value:</span> €
                  {wizardData.financialInfo.estimated_value.toLocaleString()}
                </div>
              )}
              {wizardData.financialInfo?.valuation_confidence && (
                <div>
                  <span className="font-medium">Valuation Confidence:</span>{' '}
                  {wizardData.financialInfo.valuation_confidence}
                </div>
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Revenue (Last 3 Years):</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>2025: €{wizardData.financialInfo?.revenue2025?.toLocaleString() || '0'}</div>
                <div>2024: €{wizardData.financialInfo?.revenue2024?.toLocaleString() || '0'}</div>
                <div>2023: €{wizardData.financialInfo?.revenue2023?.toLocaleString() || '0'}</div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">EBITDA (Last 3 Years):</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>2025: €{wizardData.financialInfo?.ebitda2025?.toLocaleString() || '0'}</div>
                <div>2024: €{wizardData.financialInfo?.ebitda2024?.toLocaleString() || '0'}</div>
                <div>2023: €{wizardData.financialInfo?.ebitda2023?.toLocaleString() || '0'}</div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Business Details */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
            <div className="space-y-3 text-sm">
              {wizardData.businessDetails?.key_products && (
                <div>
                  <span className="font-medium">Products/Services:</span>
                  <p className="text-gray-600 mt-1">{wizardData.businessDetails.key_products}</p>
                </div>
              )}
              {wizardData.businessDetails?.target_market && (
                <div>
                  <span className="font-medium">Target Market:</span>
                  <p className="text-gray-600 mt-1">{wizardData.businessDetails.target_market}</p>
                </div>
              )}
              {wizardData.businessDetails?.competitive_advantage && (
                <div>
                  <span className="font-medium">Competitive Advantage:</span>
                  <p className="text-gray-600 mt-1">
                    {wizardData.businessDetails.competitive_advantage}
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Sale Details */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sale Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Preferred Timeline:</span>{' '}
                {wizardData.saleDetails?.preferred_timeline || 'Not specified'}
              </div>
              {wizardData.saleDetails?.reason_for_sale && (
                <div>
                  <span className="font-medium">Reason for Sale:</span>
                  <p className="text-gray-600 mt-1">{wizardData.saleDetails.reason_for_sale}</p>
                </div>
              )}
              {wizardData.saleDetails?.transition_support && (
                <div>
                  <span className="font-medium">Transition Support:</span>
                  <p className="text-gray-600 mt-1">{wizardData.saleDetails.transition_support}</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Anonymous Listing:</span>{' '}
                {wizardData.privacySettings?.anonymous_listing ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-medium">Require NDA:</span>{' '}
                {wizardData.privacySettings?.requires_nda ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-medium">Hide Financials:</span>{' '}
                {wizardData.privacySettings?.hide_financials ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-medium">Hide Location:</span>{' '}
                {wizardData.privacySettings?.hide_location ? 'Yes' : 'No'}
              </div>
            </div>
            {wizardData.privacySettings?.teaser_description && (
              <div className="mt-4">
                <span className="font-medium">Teaser Description:</span>
                <p className="text-sm text-gray-600 mt-1">
                  {wizardData.privacySettings.teaser_description}
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Documents */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(wizardData.documents || {}).map(([key, file]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace('_', ' ')}:</span>
                  <span className={file ? 'text-green-600' : 'text-gray-400'}>
                    {file ? file.name : 'Not uploaded'}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Final Options */}
        <div className="space-y-4">
          <CustomCheckbox
            label="Publish listing immediately"
            checked={!isDraft}
            onChange={() => handleDraftChange(!isDraft)}
            name="publishImmediately"
          />

          <CustomCheckbox
            label="I agree to the terms and conditions of this listing"
            checked={termsAgreed}
            onChange={() => handleTermsChange(!termsAgreed)}
            name="termsAgreement"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
