/**
 * FAQ Badge Component
 * Clean, modular badge system for Popular/New indicators
 */

import * as React from 'react';
import { cn } from '@heroui/react';
import type { FAQBadgeProps } from './types';

const badgeStyles = {
  new: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  popular: 'bg-amber-50 text-amber-700 border border-amber-200',
};

const badgeLabels = {
  new: 'New',
  popular: 'Popular',
};

export const FAQBadge: React.FC<FAQBadgeProps> = ({ type, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        'transition-colors duration-200',
        badgeStyles[type],
        className
      )}
    >
      {badgeLabels[type]}
    </span>
  );
};

export default FAQBadge;
