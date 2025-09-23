/**
 * 📊 Valuation Report Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/reports/ValuationReportModal.tsx
 * Purpose: Placeholder for valuation report modal
 */

import { Button } from '@/shared/components/buttons';
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
        <Button variant="primary" onPress={onClose}>
          Close
        </Button>
      </div>
    </CenteredModal>
  );
};

export default ValuationReportModal;
