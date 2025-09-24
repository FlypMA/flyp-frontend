// 🏠 Host Button - List Your Business Button
// Location: src/shared/components/buttons/HostButton.tsx
// Purpose: Button for "List your business" action with specific styling

import * as React from 'react';

export interface HostButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Host Button Component
 *
 * Used for "List your business" actions with specific styling
 * that matches the provided HTML structure.
 */
export const HostButton: React.FC<HostButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center 
        transition-all duration-200 ease-in-out 
        focus:outline-none focus:ring-3 focus:ring-offset-0 
        disabled:opacity-50 disabled:cursor-not-allowed 
        border-0 outline-none cursor-pointer 
        relative overflow-hidden 
        bg-primary-500 text-white font-semibold 
        hover:bg-primary-600 
        focus:ring-primary-500/30 
        shadow-sm hover:shadow-md 
        px-4 py-2 text-sm h-9 rounded-lg 
        text-gray-700 border-gray-300 
        hover:bg-gray-50 hover:border-gray-400
        ${className}
      `.trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="flex items-center justify-center opacity-100">{children}</span>
    </button>
  );
};

export default HostButton;
