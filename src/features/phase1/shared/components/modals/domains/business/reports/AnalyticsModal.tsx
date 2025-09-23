/**
 * 📈 Analytics Modal - Business Domain
 * Location: src/shared/components/modals/domains/business/reports/AnalyticsModal.tsx
 * Purpose: Placeholder for analytics modal
 */

import { Button } from '@/shared/components/buttons';
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
        <Button variant="primary" onPress={onClose}>
          Close
        </Button>
      </div>
    </CenteredModal>
  );
};

export default AnalyticsModal;
