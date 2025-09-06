/**
 * Context Detection Utility
 * Intelligently detects user intent based on current page, referrer, and other signals
 */

export type UserIntent = 'buyer' | 'seller' | 'neutral';

export interface ContextInfo {
  intent: UserIntent;
  confidence: 'high' | 'medium' | 'low';
  primaryCTA: {
    text: string;
    action: 'signup-buyer' | 'signup-seller' | 'signup-neutral' | 'business-valuation' | 'business-listing';
    className: string;
  };
  secondaryCTA: {
    text: string;
    action: 'login' | 'explore-alternative';
    className: string;
  };
  pageContext: string;
}

/**
 * Detects user intent from current URL path
 */
export const detectIntentFromPath = (pathname: string): UserIntent => {
  // High confidence seller intent
  if (pathname.includes('/for-sellers') || 
      pathname.includes('/sell') ||
      pathname.includes('/list-business') ||
      pathname.includes('/seller') ||
      pathname.includes('/valuation')) {
    return 'seller';
  }

  // High confidence buyer intent  
  if (pathname.includes('/search') ||
      pathname.includes('/buy') ||
      pathname.includes('/for-buyers') ||
      pathname.includes('/listings') ||
      pathname.includes('/discover')) {
    return 'buyer';
  }

  // Medium confidence seller intent
  if (pathname.includes('/business') ||
      pathname.includes('/opportunities')) {
    return 'seller';
  }

  // Neutral - let user choose
  return 'neutral';
};

/**
 * Detects user intent from referrer URL
 */
export const detectIntentFromReferrer = (referrer?: string): UserIntent => {
  if (!referrer) return 'neutral';

  const referrerLower = referrer.toLowerCase();
  
  // Business sale related referrers
  if (referrerLower.includes('business-sale') ||
      referrerLower.includes('sell-business') ||
      referrerLower.includes('business-broker') ||
      referrerLower.includes('company-sale')) {
    return 'seller';
  }

  // Business acquisition related referrers
  if (referrerLower.includes('buy-business') ||
      referrerLower.includes('business-acquisition') ||
      referrerLower.includes('company-acquisition')) {
    return 'buyer';
  }

  return 'neutral';
};

/**
 * Main context detection function
 */
export const detectUserContext = (
  pathname: string, 
  referrer?: string,
  searchParams?: URLSearchParams
): ContextInfo => {
  const pathIntent = detectIntentFromPath(pathname);
  const referrerIntent = detectIntentFromReferrer(referrer);
  
  // Check URL parameters for explicit intent
  const urlIntent = searchParams?.get('intent') as UserIntent | null;
  const utmCampaign = searchParams?.get('utm_campaign')?.toLowerCase();
  
  let finalIntent: UserIntent = pathIntent;
  let confidence: 'high' | 'medium' | 'low' = 'medium';

  // URL parameter takes highest priority
  if (urlIntent && ['buyer', 'seller', 'neutral'].includes(urlIntent)) {
    finalIntent = urlIntent;
    confidence = 'high';
  }
  // Path-based detection
  else if (pathIntent !== 'neutral') {
    finalIntent = pathIntent;
    confidence = 'high';
  }
  // UTM campaign analysis
  else if (utmCampaign?.includes('seller') || utmCampaign?.includes('sell')) {
    finalIntent = 'seller';
    confidence = 'medium';
  }
  else if (utmCampaign?.includes('buyer') || utmCampaign?.includes('buy')) {
    finalIntent = 'buyer';  
    confidence = 'medium';
  }
  // Referrer-based detection
  else if (referrerIntent !== 'neutral') {
    finalIntent = referrerIntent;
    confidence = 'medium';
  }
  else {
    confidence = 'low';
  }

  return {
    intent: finalIntent,
    confidence,
    ...generateCTAs(finalIntent, pathname),
    pageContext: pathname
  };
};

/**
 * Generate appropriate CTAs based on detected intent
 */
const generateCTAs = (intent: UserIntent, pathname: string) => {
  switch (intent) {
    case 'seller':
      // Prioritize valuation hook for seller pages
      const isValuationPage = pathname.includes('/valuation');
      const isSellerLandingPage = pathname.includes('/for-sellers');
      
      return {
        primaryCTA: {
          text: isValuationPage ? 'Get Free Valuation' : 'List Your Business',
          action: (isValuationPage || isSellerLandingPage) ? 'business-valuation' : 'business-listing' as const,
          className: 'bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200'
        },
        secondaryCTA: {
          text: 'Browse Businesses',
          action: 'explore-alternative' as const,
          className: 'text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-100'
        }
      };

    case 'buyer':
      return {
        primaryCTA: {
          text: 'Find Businesses',
          action: 'signup-buyer' as const,
          className: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200'
        },
        secondaryCTA: {
          text: 'Sell Your Business',
          action: 'explore-alternative' as const,
          className: 'text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-100'
        }
      };

    default: // neutral
      return {
        primaryCTA: {
          text: 'Get Started',
          action: 'signup-neutral' as const,
          className: 'bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200'
        },
        secondaryCTA: {
          text: 'Log in',
          action: 'login' as const,
          className: 'text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-100'
        }
      };
  }
};
