import React from 'react';

interface InlineBetweendealsLogoProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

/**
 * Inline SVG version of the flyp logo
 * Use this as a backup if external SVG files have caching issues
 */
const InlineBetweendealsLogo: React.FC<InlineBetweendealsLogoProps> = ({
  className = '',
  width = 48,
  height = 48,
  color = '#000000',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
      className={className}
      aria-label="flyp logo"
    >
      <g fill={color} stroke="none">
        {/* Central hub circle */}
        <circle cx="24" cy="24" r="6" fill={color} />

        {/* Connected nodes around the center */}
        {/* Top node */}
        <circle cx="24" cy="8" r="3" fill={color} />
        <line x1="24" y1="11" x2="24" y2="18" stroke={color} strokeWidth="2" />

        {/* Top right node */}
        <circle cx="36" cy="12" r="3" fill={color} />
        <line x1="33.5" y1="14.5" x2="28.2" y2="19.8" stroke={color} strokeWidth="2" />

        {/* Right node */}
        <circle cx="40" cy="24" r="3" fill={color} />
        <line x1="37" y1="24" x2="30" y2="24" stroke={color} strokeWidth="2" />

        {/* Bottom right node */}
        <circle cx="36" cy="36" r="3" fill={color} />
        <line x1="33.5" y1="33.5" x2="28.2" y2="28.2" stroke={color} strokeWidth="2" />

        {/* Bottom node */}
        <circle cx="24" cy="40" r="3" fill={color} />
        <line x1="24" y1="37" x2="24" y2="30" stroke={color} strokeWidth="2" />

        {/* Bottom left node */}
        <circle cx="12" cy="36" r="3" fill={color} />
        <line x1="14.5" y1="33.5" x2="19.8" y2="28.2" stroke={color} strokeWidth="2" />

        {/* Left node */}
        <circle cx="8" cy="24" r="3" fill={color} />
        <line x1="11" y1="24" x2="18" y2="24" stroke={color} strokeWidth="2" />

        {/* Top left node */}
        <circle cx="12" cy="12" r="3" fill={color} />
        <line x1="14.5" y1="14.5" x2="19.8" y2="19.8" stroke={color} strokeWidth="2" />
      </g>
    </svg>
  );
};

export default InlineBetweendealsLogo;
