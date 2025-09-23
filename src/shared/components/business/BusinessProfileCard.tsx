/**
 * 🏢 Business Profile Card Component
 * Location: src/shared/components/business/BusinessProfileCard.tsx
 * Purpose: Reusable business profile display with empty and filled states
 *
 * Features:
 * - Empty state with call-to-action to fill business info
 * - Filled state with business details and metrics
 * - Professional card design with hover effects
 * - Responsive layout for different screen sizes
 */

import { Button } from '@/shared/components/buttons';
import { Card, CardBody } from '@heroui/react';
import { Edit, Plus } from 'lucide-react';
import React from 'react';

interface BusinessInfo {
  name: string;
  industry: string;
  description: string;
  foundedYear: number;
  teamSize: string;
  revenue: number;
  location: string;
  isRemote: boolean;
  status?: 'active' | 'inactive' | 'draft';
}

interface BusinessProfileCardProps {
  businessInfo?: BusinessInfo;
  onEdit?: () => void;
  onAddInfo?: () => void;
  className?: string;
}

const BusinessProfileCard: React.FC<BusinessProfileCardProps> = ({
  businessInfo,
  onEdit,
  onAddInfo,
  className = '',
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!businessInfo) {
    // Empty State - Minimal Version
    return (
      <Card
        className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      >
        <CardBody className="p-6">
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Complete Your Business Profile
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Add your business information to get started.
            </p>
            <Button
              variant="primary"
              size="sm"
              startContent={<Edit className="w-4 h-4" />}
              onPress={onAddInfo}
            >
              Add Information
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Filled State - Minimal Version
  return (
    <Card
      className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{businessInfo.name}</h2>
            <p className="text-gray-500 text-sm">{businessInfo.industry}</p>
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <Button
                variant="tertiary"
                size="sm"
                isIconOnly
                onPress={onEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">{businessInfo.description}</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {businessInfo.foundedYear}
            </div>
            <div className="text-xs text-gray-500">Founded</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">{businessInfo.teamSize}</div>
            <div className="text-xs text-gray-500">Team Size</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {formatCurrency(businessInfo.revenue)}
            </div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {businessInfo.isRemote ? 'Remote' : businessInfo.location}
            </div>
            <div className="text-xs text-gray-500">Location</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BusinessProfileCard;
