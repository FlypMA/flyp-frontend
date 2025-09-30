// 🏢 Financial Overview Step - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/steps/FinancialOverviewStep.tsx
// Purpose: Financial information collection

import React from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const FinancialOverviewStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💰</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Overview</h2>
        <p className="text-gray-600 mb-8">
          This step will collect your business financial information, including revenue,
          profitability, and asking price.
        </p>
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-blue-800">
            <strong>Coming Soon:</strong> We're building an intuitive financial data collection
            experience inspired by Airbnb's approach to making complex information simple and
            engaging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverviewStep;
