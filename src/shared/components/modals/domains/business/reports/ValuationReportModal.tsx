/**
 * 📊 Valuation Report Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/reports/ValuationReportModal.tsx
 * Purpose: Placeholder for valuation report modal
 */

import React from 'react';
import { CenteredModal } from '../../../foundations';

interface ValuationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId?: string;
}

export const ValuationReportModal: React.FC<ValuationReportModalProps> = ({
  isOpen,
  onClose,
  reportId,
}) => {
  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="Valuation Report" size="2xl">
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Valuation Report</h3>
        <p className="text-gray-600 mb-6">This feature is coming soon!</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Close
        </button>
      </div>
    </CenteredModal>
  );
};

export default ValuationReportModal;
