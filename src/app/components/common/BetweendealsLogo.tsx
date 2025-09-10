import React from 'react';
import { logos, getLogoConfig } from '../../../assets/logos';

interface BetweendealsLogoProps {
  /**
   * Logo variant/context for different use cases
   */
  variant?: 'header' | 'footer' | 'sidebar' | 'mobile' | 'icon';

  /**
   * Custom width override
   */
  width?: number;

  /**
   * Custom height override
   */
  height?: number | 'auto';

  /**
   * Custom CSS classes
   */
  className?: string;

  /**
   * Custom alt text override
   */
  alt?: string;

  /**
   * Whether the logo should be clickable (link to home)
   */
  clickable?: boolean;

  /**
   * Custom onClick handler
   */
  onClick?: () => void;

  /**
   * Image priority for performance (Next.js style)
   */
  priority?: boolean;
}

/**
 * BetweendealsLogo Component
 *
 * A reusable logo component that provides consistent branding across the platform.
 * Supports different variants for various contexts (header, footer, sidebar, mobile).
 *
 * @example
 * ```tsx
 * // Header usage
 * <BetweendealsLogo variant="header" clickable />
 *
 * // Footer usage
 * <BetweendealsLogo variant="footer" />
 *
 * // Custom size
 * <BetweendealsLogo width={150} height="auto" />
 * ```
 */
const BetweendealsLogo: React.FC<BetweendealsLogoProps> = ({
  variant = 'header',
  width,
  height,
  className = '',
  alt,
  clickable = false,
  onClick,
  priority = false,
}) => {
  // Get logo configuration based on variant
  const logoConfig = getLogoConfig(variant);

  // Determine final dimensions
  const finalWidth = width ?? logoConfig.width;
  const finalHeight = height ?? logoConfig.height;
  const finalAlt = alt ?? logoConfig.alt;

  // Determine styling based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'header':
        return 'transition-opacity hover:opacity-80';
      case 'footer':
        return 'transition-all duration-200 hover:scale-105';
      case 'sidebar':
        return 'transition-transform hover:scale-105';
      case 'mobile':
        return 'transition-opacity hover:opacity-80';
      default:
        return '';
    }
  };

  // Combined classes
  const combinedClasses = `${getVariantClasses()} ${className}`.trim();

  // Logo image element - using regular img tag for reliable visibility
  const logoElement = (
    <img
      src={logos.main}
      alt={finalAlt}
      width={finalWidth}
      height={finalHeight}
      className={`logo-image ${combinedClasses}`}
      loading={priority ? 'eager' : 'lazy'}
      style={{
        height: finalHeight,
        objectFit: 'contain',
        opacity: 1,
        visibility: 'visible',
        display: 'block',
      }}
      onError={e => {
        console.error('Logo failed to load:', e);
        // Fallback - could set a default or retry
      }}
    />
  );

  // Wrap in clickable element if needed
  if (clickable || onClick) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg ${
          clickable ? 'cursor-pointer' : ''
        }`}
        aria-label={`${finalAlt} - Go to homepage`}
        type="button"
      >
        {logoElement}
      </button>
    );
  }

  return logoElement;
};

export default BetweendealsLogo;
