// 💰 Valuation Preview Step
// Location: src/features/phase1/business/listing/components/listing-steps/ValuationPreviewStep.tsx
// Purpose: Read-only preview of valuation data (Step 3 of listing creation)

import React from 'react';

interface ValuationPreviewStepProps {
  valuationReport?: any;
  onNext: () => void;
}

const ValuationPreviewStep: React.FC<ValuationPreviewStepProps> = ({
  valuationReport,
  onNext,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Info Banner */}
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-emerald-900 mb-1">
                Valuation Data Prefilled
              </h3>
              <p className="text-sm text-emerald-700">
                {valuationReport
                  ? 'Your most recent valuation is automatically included in your listing. Financial data will be prefilled.'
                  : 'No valuation report found. You can still create a listing and add financial details manually.'}
              </p>
            </div>
          </div>
        </div>

        {/* Valuation Preview */}
        {valuationReport ? (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-xl">
            <div className="text-center mb-8">
              {/* Valuation Icon */}
              <div className="text-8xl mb-6">💰</div>

              {/* Estimated Value */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {formatCurrency(valuationReport.businessValue)}
              </h2>
              <p className="text-lg text-gray-600 mb-4">Estimated Business Value</p>

              {/* Confidence & Date */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span>Confidence:</span>
                  <span className="font-semibold capitalize">{valuationReport.confidence}</span>
                </div>
                <span>•</span>
                <div>
                  {new Date(valuationReport.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
              {/* Revenue */}
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  Annual Revenue
                </div>
                <div className="space-y-1">
                  {valuationReport.inputs?.revenue2024 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">2024:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(valuationReport.inputs.revenue2024)}
                      </span>
                    </div>
                  )}
                  {valuationReport.inputs?.revenue2023 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">2023:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(valuationReport.inputs.revenue2023)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* EBITDA */}
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  Annual EBITDA
                </div>
                <div className="space-y-1">
                  {valuationReport.inputs?.ebitda2024 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">2024:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(valuationReport.inputs.ebitda2024)}
                      </span>
                    </div>
                  )}
                  {valuationReport.inputs?.ebitda2023 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">2023:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(valuationReport.inputs.ebitda2023)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Methodology */}
              <div className="md:col-span-2">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                  Valuation Method
                </div>
                <div className="text-base font-medium text-gray-900">
                  {valuationReport.methodology || 'Revenue & EBITDA Multiple Analysis'}
                </div>
              </div>
            </div>

            {/* Key Multiples */}
            {(valuationReport.revenueMultiple || valuationReport.ebitdaMultiple) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  {valuationReport.revenueMultiple && (
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {valuationReport.revenueMultiple}x
                      </div>
                      <div className="text-sm text-primary-700 mt-1">Revenue Multiple</div>
                    </div>
                  )}
                  {valuationReport.ebitdaMultiple && (
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-900">
                        {valuationReport.ebitdaMultiple}x
                      </div>
                      <div className="text-sm text-purple-700 mt-1">EBITDA Multiple</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Valuation Data</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't created a valuation yet. You can continue with the listing and add
                financial details manually in the next steps.
              </p>
              <div className="inline-flex items-center space-x-2 text-sm text-primary-600">
                <span>💡</span>
                <span>We recommend getting a free valuation to attract serious buyers</span>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">What's Next?</h3>
              <p className="text-sm text-primary-700">
                Now you'll add the unique story behind your business, sale details, photos, and
                privacy settings. Only 5 steps to complete!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationPreviewStep;
