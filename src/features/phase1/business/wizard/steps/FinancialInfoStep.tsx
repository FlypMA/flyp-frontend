// 🏢 Financial Info Step - Listing Wizard
// Location: src/features/phase1/business/wizard/steps/FinancialInfoStep.tsx
// Purpose: Step 2 - Financial information and valuation data

import { CustomInputField, CustomNumberInputField } from '@/shared/components/forms';
import { BarChart3, Euro } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FinancialInfo, StepComponentProps, WizardValuationReport } from '../types';

interface FinancialInfoStepProps extends StepComponentProps {
  valuationReports?: WizardValuationReport[];
}

const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({
  data,
  onDataChange,
  valuationReports = [],
}) => {
  const financialInfo = data.financialInfo || ({} as FinancialInfo);
  const [selectedValuationReport, setSelectedValuationReport] = useState<string | null>(null);

  const handleInputChange = (field: keyof FinancialInfo, value: string | number | boolean) => {
    onDataChange({
      financialInfo: {
        ...financialInfo,
        [field]: value,
      },
    });
  };

  // Handle valuation report selection
  useEffect(() => {
    if (selectedValuationReport && valuationReports.length > 0) {
      const selectedReport = valuationReports.find(report => report.id === selectedValuationReport);
      if (selectedReport) {
        handleInputChange('estimated_value', selectedReport.estimated_value);
        handleInputChange('valuation_confidence', selectedReport.confidence_level);
        handleInputChange('valuation_methodology', selectedReport.methodology);
        handleInputChange('asking_price', selectedReport.estimated_value.toString());
      }
    }
  }, [selectedValuationReport, valuationReports]);

  // Check if we have valuation data
  const hasValuationData = financialInfo.estimated_value && financialInfo.revenue2025;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Euro className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {hasValuationData ? 'Financial Information' : 'Financial Information'}
        </h2>
        <p className="text-neutral-600">
          {hasValuationData
            ? 'Review and update your financial data from valuation reports'
            : 'Share your financial performance'}
        </p>
      </div>

      {hasValuationData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">
                Financial data loaded from your valuation reports
              </p>
              <p className="text-sm text-blue-700">You can edit any values below if needed</p>
            </div>
          </div>
        </div>
      )}

      {/* Valuation Report Selection */}
      {valuationReports.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Select Valuation Report</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Choose from your existing valuation reports to pre-fill financial data, or enter
            manually below.
          </p>

          <div className="space-y-3">
            {valuationReports.map(report => (
              <div
                key={report.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedValuationReport === report.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() =>
                  setSelectedValuationReport(
                    selectedValuationReport === report.id ? null : report.id
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedValuationReport === report.id
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedValuationReport === report.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          €{report.estimated_value.toLocaleString()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(report.valuation_date).toLocaleDateString()} •
                          {report.confidence_level.charAt(0).toUpperCase() +
                            report.confidence_level.slice(1)}{' '}
                          confidence
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 ml-7">{report.methodology}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {report.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedValuationReport && (
            <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-sm text-primary-700">
                ✓ Selected valuation report will be used to pre-fill financial data below.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Valuation Summary - Enhanced */}
      {financialInfo.estimated_value && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Business Valuation Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-1">
                €{financialInfo.estimated_value.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-blue-800">Estimated Value</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-900 mb-1 capitalize">
                {financialInfo.valuation_confidence || 'Medium'}
              </div>
              <div className="text-sm font-medium text-blue-800">Confidence Level</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-900 mb-1">
                {financialInfo.valuation_methodology || 'Revenue & EBITDA Analysis'}
              </div>
              <div className="text-sm font-medium text-blue-800">Methodology</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              💡 This valuation data has been pre-populated from your business valuation reports.
              You can modify any values below if needed for your listing.
            </p>
          </div>
        </div>
      )}

      {/* Business Structure Information */}
      {(financialInfo.businessType || financialInfo.sharesForSale) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Business Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financialInfo.businessType && (
              <div>
                <span className="text-sm font-medium text-gray-700">Business Type:</span>
                <div className="text-sm text-gray-900 capitalize">
                  {financialInfo.businessType.replace('-', ' ')}
                </div>
              </div>
            )}
            {financialInfo.sharesForSale && (
              <div>
                <span className="text-sm font-medium text-gray-700">Shares for Sale:</span>
                <div className="text-sm text-gray-900">{financialInfo.sharesForSale}%</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomNumberInputField
            label="Revenue 2025"
            placeholder="€1,000,000"
            value={financialInfo.revenue2025?.toString() || ''}
            onChange={e => handleInputChange('revenue2025', parseFloat(e.target.value) || 0)}
            required
            onBlur={() => {}}
            name="revenue2025"
          />

          <CustomNumberInputField
            label="Revenue 2024"
            placeholder="€900,000"
            value={financialInfo.revenue2024?.toString() || ''}
            onChange={e => handleInputChange('revenue2024', parseFloat(e.target.value) || 0)}
            required
            onBlur={() => {}}
            name="revenue2024"
          />

          <CustomNumberInputField
            label="Revenue 2023"
            placeholder="€800,000"
            value={financialInfo.revenue2023?.toString() || ''}
            onChange={e => handleInputChange('revenue2023', parseFloat(e.target.value) || 0)}
            required
            onBlur={() => {}}
            name="revenue2023"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomNumberInputField
            label="EBITDA 2025"
            placeholder="€150,000"
            value={financialInfo.ebitda2025?.toString() || ''}
            onChange={e => handleInputChange('ebitda2025', parseFloat(e.target.value) || 0)}
            onBlur={() => {}}
            name="ebitda2025"
          />

          <CustomNumberInputField
            label="EBITDA 2024"
            placeholder="€135,000"
            value={financialInfo.ebitda2024?.toString() || ''}
            onChange={e => handleInputChange('ebitda2024', parseFloat(e.target.value) || 0)}
            onBlur={() => {}}
            name="ebitda2024"
          />

          <CustomNumberInputField
            label="EBITDA 2023"
            placeholder="€120,000"
            value={financialInfo.ebitda2023?.toString() || ''}
            onChange={e => handleInputChange('ebitda2023', parseFloat(e.target.value) || 0)}
            onBlur={() => {}}
            name="ebitda2023"
          />
        </div>

        <CustomInputField
          label="Asking Price"
          placeholder="€5,000,000"
          value={financialInfo.asking_price || ''}
          onChange={e => handleInputChange('asking_price', e.target.value)}
          required
          onBlur={() => {}}
          name="asking_price"
        />

        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h3 className="font-medium text-neutral-900">Price Negotiable</h3>
            <p className="text-sm text-neutral-600">
              Allow potential buyers to negotiate the price
            </p>
          </div>
          <input
            type="checkbox"
            checked={financialInfo.price_negotiable || false}
            onChange={e => handleInputChange('price_negotiable', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialInfoStep;
