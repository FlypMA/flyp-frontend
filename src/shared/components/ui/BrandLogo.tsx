// 🎨 Brand Logo Component - Consistent logo usage
// Location: src/shared/components/ui/BrandLogo.tsx
// Purpose: Reusable logo component for branding consistency

import React from 'react';
import { Building2 } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white' | 'footer';
  className?: string;
  showText?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const colorClasses = {
    default: 'bg-blue-600 text-white',
    white: 'bg-white text-blue-600',
    footer: 'bg-blue-600 text-white',
  };

  const textColorClasses = {
    default: 'text-neutral-900',
    white: 'text-white',
    footer: 'text-white',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[variant]} rounded-lg flex items-center justify-center`}
      >
        <Building2 className={iconSizeClasses[size]} />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold ${textColorClasses[variant]}`}>
          BetweenDeals
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
