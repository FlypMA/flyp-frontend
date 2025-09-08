/**
 * FormTip Component - Informational Tip for Forms
 *
 * A simple component to display tips and helpful information in forms.
 *
 * @author BetweenDeals Platform Team
 * @version 1.0.0
 */

import React from 'react';
import { Info } from 'lucide-react';

export interface FormTipProps {
  /** The tip message */
  title?: string;
  /** Additional content */
  content?: string;
  /** Type of tip */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** Custom className */
  className?: string;
}

export const FormTip: React.FC<FormTipProps> = ({
  title,
  content,
  type = 'info',
  className = '',
}) => {
  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`p-3 border rounded-lg flex items-start gap-2 ${getColors()} ${className}`}>
      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <div className="text-sm">
        {title && <div className="font-medium">{title}</div>}
        {content && <div>{content}</div>}
      </div>
    </div>
  );
};

export default FormTip;
