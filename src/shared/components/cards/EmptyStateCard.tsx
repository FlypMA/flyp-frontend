/**
 * 📋 Empty State Card Component
 * Location: src/shared/components/cards/EmptyStateCard.tsx
 * Purpose: Reusable empty state card with consistent styling
 */

import { LucideIcon } from 'lucide-react';
import React from 'react';

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  description: string | React.ReactNode;
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
    <div
      className={`relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Background visual element */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-50"></div>

      {/* Content container */}
      <div className="relative w-full h-full flex flex-col p-6">
        {/* Spacer for visual balance */}
        <div className="flex-1"></div>

        {/* Main content area */}
        <div className="text-center flex-1 flex flex-col justify-center">
          {/* Icon container */}
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

          {/* Description */}
          <div className="text-gray-600 mb-4 text-sm flex-1">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>

          {/* CTA Button - Airbnb style */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onButtonClick}
              className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:ring-primary-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-4 py-2 text-sm h-9 rounded-lg"
              style={
                {
                  '--dls-button-or-anchor-width-px': '166.9375',
                  '--dls-button-or-anchor-height-px': '40',
                } as React.CSSProperties
              }
            >
              <span className="flex items-center justify-center opacity-100">
                <span className="mr-2">
                  <Icon className="w-4 h-4" />
                </span>
                {buttonText}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default EmptyStateCard;
