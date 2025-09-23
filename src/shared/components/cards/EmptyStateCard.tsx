/**
 * 📋 Empty State Card Component
 * Location: src/shared/components/cards/EmptyStateCard.tsx
 * Purpose: Reusable empty state card with consistent styling
 */

import { Button } from '@/shared/components/buttons';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${className}`}>
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <Button variant="primary" size="sm" onPress={onButtonClick} className="h-9">
          <span className="mr-2">
            <Icon className="w-4 h-4" />
          </span>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default EmptyStateCard;
