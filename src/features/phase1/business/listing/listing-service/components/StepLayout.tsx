// 🏢 Step Layout - Airbnb-Inspired Step Container
// Location: src/features/phase1/business/listing/listing-service/components/StepLayout.tsx
// Purpose: Reusable layout component for wizard steps

import React from 'react';

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showSaveExit?: boolean;
  onSaveExit?: () => void;
}

/**
 * StepLayout provides the Airbnb-style structure for each step:
 * - Header with title and optional subtitle
 * - Centered content area
 * - Consistent spacing and typography
 */
const StepLayout: React.FC<StepLayoutProps> = ({
  title,
  subtitle,
  children,
  showSaveExit = true,
  onSaveExit,
}) => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Step Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-1">{title}</h1>
        {subtitle && <p className="text-base text-gray-600">{subtitle}</p>}
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col items-start justify-start max-w-2xl w-full">
        {children}
      </div>
    </div>
  );
};

export default StepLayout;
