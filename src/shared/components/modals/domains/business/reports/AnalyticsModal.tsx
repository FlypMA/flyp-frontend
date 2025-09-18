/**
 * 📈 Analytics Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/reports/AnalyticsModal.tsx
 * Purpose: Placeholder for analytics modal
 */

import React from 'react';
import { CenteredModal } from '../../../foundations';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeRange?: string;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose, timeRange }) => {
  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="Business Analytics" size="3xl">
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Analytics</h3>
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

export default AnalyticsModal;
