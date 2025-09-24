import { SEOProps, SEOValidationResult } from '../../types/seo';

export const validateSEO = (seoProps: SEOProps): SEOValidationResult => {
  const warnings: string[] = [];
  const errors: string[] = [];
  const suggestions: string[] = [];

  // Title validation
  if (seoProps.title) {
    const titleLength = seoProps.title.length;
    if (titleLength > 60) {
      warnings.push(`Title is ${titleLength} characters (recommended: 50-60 characters)`);
    } else if (titleLength < 30) {
      warnings.push(`Title is ${titleLength} characters (recommended: 30-60 characters)`);
    }

    if (!seoProps.title.includes('UpSwitch')) {
      suggestions.push('Consider including "Upswitch" in the title for brand consistency');
    }
  } else {
    errors.push('Title is required');
  }

  // Description validation
  if (seoProps.description) {
    const descLength = seoProps.description.length;
    if (descLength > 160) {
      warnings.push(`Description is ${descLength} characters (recommended: 150-160 characters)`);
    } else if (descLength < 120) {
      warnings.push(`Description is ${descLength} characters (recommended: 120-160 characters)`);
    }
  } else {
    errors.push('Description is required');
  }

  // Keywords validation
  if (seoProps.keywords) {
    const keywordCount = seoProps.keywords.split(',').length;
    if (keywordCount > 15) {
      warnings.push(`Too many keywords (${keywordCount}). Recommended: 5-15 focused keywords`);
    }
  } else {
    warnings.push('Keywords are recommended for better SEO');
  }

  // Structured data validation
  if (!seoProps.structuredData) {
    suggestions.push('Consider adding structured data for better search visibility');
  }

  // Image validation
  if (!seoProps.image) {
    suggestions.push('Consider adding an Open Graph image for social sharing');
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    warnings,
    errors,
    suggestions,
  };
};

export const generateSEOReport = (
  seoData: Record<string, SEOProps>
): Record<string, SEOValidationResult> => {
  const report: Record<string, SEOValidationResult> = {};

  Object.entries(seoData).forEach(([key, props]) => {
    report[key] = validateSEO(props);
  });

  return report;
};

// Character limit helpers
export const truncateTitle = (title: string, maxLength = 60): string => {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength - 3) + '...';
};

export const truncateDescription = (description: string, maxLength = 160): string => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
};

// SEO optimization helpers
export const optimizeSEOForLength = (seoProps: SEOProps): SEOProps => {
  return {
    ...seoProps,
    title: seoProps.title ? truncateTitle(seoProps.title) : seoProps.title,
    description: seoProps.description
      ? truncateDescription(seoProps.description)
      : seoProps.description,
  };
};
