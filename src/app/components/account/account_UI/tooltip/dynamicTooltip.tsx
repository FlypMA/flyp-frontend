import React from 'react';

interface TooltipProps {
  text: string;
  style?: React.CSSProperties; // Add style property
}

export const DynamicTooltip: React.FC<TooltipProps> = ({ text, style }) => (
  <div
    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white py-1 px-4 rounded-lg text-xs transition-all duration-500 ease-in-out whitespace-nowrap"
    style={style}
  >
    {text}
  </div>
);

export default DynamicTooltip;
