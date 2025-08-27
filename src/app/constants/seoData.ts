import { SEOProps } from '../components/SEO';

export const seoData: Record<string, SEOProps> = {
  // ============= MAIN LANDING PAGES =============
  home: {
    title: 'betweendeals | European SME M&A Platform - Buy & Sell Businesses',
    description:
      "Europe's most trusted platform for buying and selling SME businesses. Connect with qualified buyers and sellers across 15+ countries. Confidential, secure M&A transactions with expert support.",
    keywords:
      'SME M&A, business for sale, buy business, sell business, European mergers acquisitions, business marketplace, confidential transactions, due diligence, business valuation, investment opportunities, business broker, cross-border M&A, European SME transactions',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': ['WebSite', 'Organization'],
      name: 'betweendeals',
      alternateName: 'betweendeals.com',
      url: 'https://www.betweendeals.com',
      description:
        'European SME M&A platform connecting business buyers and sellers across 15+ countries',
      foundingDate: '2019',
      areaServed: ['Europe', 'European Union'],
      serviceType: ['Business Brokerage', 'M&A Advisory', 'Transaction Platform'],
      sameAs: ['https://www.linkedin.com/company/betweendeals', 'https://twitter.com/betweendeals'],
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.betweendeals.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      offers: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Sale and Acquisition Services',
          description: 'Comprehensive M&A platform for SME transactions',
        },
      },
    },
  },

  sellers: {
    title: 'For Business Sellers - Sell Your Business Confidentially | betweendeals',
    description:
      "List your business for sale on Europe's leading M&A platform. Reach qualified buyers, maintain complete confidentiality, and maximize your business value with professional tools and expert support.",
    keywords:
      'sell business, business for sale, business valuation, exit strategy, M&A advisory, confidential sale, qualified buyers, business listing, SME sale, business broker',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'betweendeals for Sellers',
      description: 'Sell your business confidentially to qualified buyers across Europe',
      url: 'https://www.betweendeals.com/for-sellers',
      isPartOf: {
        '@type': 'WebSite',
        name: 'betweendeals',
      },
    },
  },

  buyers: {
    title: 'For Business Buyers - Find Your Next Acquisition | betweendeals',
    description:
      'Discover verified business opportunities across Europe. Access confidential listings, connect with serious sellers, and find your perfect acquisition with comprehensive due diligence tools.',
    keywords:
      'buy business, business acquisition, investment opportunities, verified listings, due diligence, business investment, SME acquisition, European businesses, business opportunities',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'betweendeals for Buyers',
      description: 'Find and acquire verified businesses across Europe',
      url: 'https://www.betweendeals.com/search',
      isPartOf: {
        '@type': 'WebSite',
        name: 'betweendeals',
      },
    },
  },

  pricing: {
    title: 'Pricing Plans - Transparent M&A Platform Costs | betweendeals',
    description:
      'Simple, transparent pricing for business sales and acquisitions. Success-based fees with no upfront costs. Compare our plans and start your M&A journey today.',
    keywords:
      'M&A pricing, business sale fees, success fee, transaction costs, platform pricing, business broker fees, listing costs, acquisition fees',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'betweendeals Pricing',
      description: 'Transparent pricing for M&A transactions and business listings',
      url: 'https://www.betweendeals.com/pricing',
      isPartOf: {
        '@type': 'WebSite',
        name: 'betweendeals',
      },
    },
  },

  // ============= SEARCH & LISTINGS =============
  search: {
    title: 'Browse Business Opportunities - European SME Marketplace | betweendeals',
    description:
      'Search thousands of verified business opportunities across Europe. Filter by industry, location, revenue, and price to find your perfect acquisition target.',
    keywords:
      'business search, business opportunities, SME marketplace, European businesses, business listings, investment opportunities, business for sale search',
    type: 'website',
  },

  listingDetails: {
    title: 'Business Details - Confidential Listing | betweendeals',
    description:
      'View detailed information about this business opportunity. Access financials, operations data, and connect with the seller through our secure platform.',
    keywords:
      'business details, business information, confidential listing, due diligence, business financials, seller contact',
    type: 'website',
  },

  // ============= DASHBOARDS =============
  sellerDashboard: {
    title: 'Seller Dashboard - Manage Your Business Listings | betweendeals',
    description:
      'Manage your business listings, track inquiries, review offers, and monitor your sale progress. Complete M&A tools for business sellers.',
    keywords:
      'seller dashboard, manage listings, business sale progress, buyer inquiries, offer management, listing analytics',
    type: 'website',
    noIndex: true, // Private dashboard
  },

  buyerDashboard: {
    title: 'Buyer Dashboard - Track Your Acquisitions | betweendeals',
    description:
      'Manage your saved searches, track business opportunities, monitor due diligence progress, and communicate with sellers.',
    keywords:
      'buyer dashboard, saved searches, business tracking, acquisition progress, due diligence management, seller communication',
    type: 'website',
    noIndex: true, // Private dashboard
  },

  // ============= TRANSACTION & PROCESS =============
  transactionFlow: {
    title: 'Transaction Management - M&A Process Tools | betweendeals',
    description:
      'Comprehensive transaction management tools for M&A deals. Track due diligence, manage offers, handle documentation, and complete your business acquisition or sale.',
    keywords:
      'transaction management, M&A process, due diligence tools, offer management, deal completion, business acquisition process',
    type: 'website',
    noIndex: true, // Private transaction area
  },

  createListing: {
    title: 'List Your Business for Sale - Create Listing | betweendeals',
    description:
      'Create a professional business listing to attract qualified buyers. Our guided process helps you present your business professionally while maintaining confidentiality.',
    keywords:
      'create business listing, list business for sale, business valuation, listing creation, sell business online, business presentation',
    type: 'website',
    noIndex: true, // Private creation process
  },

  // ============= LEGAL PAGES =============
  privacy: {
    title: 'Privacy Policy - Data Protection & Security | betweendeals',
    description:
      'Learn how betweendeals protects your personal data and business information. Our commitment to privacy and security in M&A transactions.',
    keywords:
      'privacy policy, data protection, GDPR compliance, business confidentiality, information security, data privacy',
    type: 'website',
  },

  terms: {
    title: 'Terms & Conditions - Platform Usage Terms | betweendeals',
    description:
      'Terms and conditions for using the betweendeals M&A platform. User agreements, platform rules, and legal framework for business transactions.',
    keywords:
      'terms of service, platform terms, user agreement, legal terms, usage conditions, M&A platform rules',
    type: 'website',
  },

  cookies: {
    title: 'Cookie Policy - Website Cookies & Tracking | betweendeals',
    description:
      'Information about how betweendeals uses cookies and tracking technologies to improve your experience on our M&A platform.',
    keywords:
      'cookie policy, website cookies, tracking cookies, privacy settings, cookie preferences, website analytics',
    type: 'website',
  },

  security: {
    title: 'Security & Data Protection - Secure M&A Platform | betweendeals',
    description:
      'Learn about our comprehensive security measures protecting your business data and transactions. Bank-level security for M&A deals.',
    keywords:
      'security measures, data protection, secure platform, business confidentiality, transaction security, data encryption',
    type: 'website',
  },

  gdpr: {
    title: 'GDPR Compliance - European Data Protection | betweendeals',
    description:
      'Our commitment to GDPR compliance and European data protection standards. How we handle and protect your personal and business data.',
    keywords:
      'GDPR compliance, European data protection, data rights, privacy compliance, data processing, user rights',
    type: 'website',
  },

  // ============= SUPPORT & RESOURCES =============
  help: {
    title: 'Help Center - M&A Platform Support | betweendeals',
    description:
      'Get help with using the betweendeals platform. Guides, tutorials, and support for buyers and sellers in M&A transactions.',
    keywords:
      'help center, platform support, M&A help, user guides, transaction support, platform tutorials, customer support',
    type: 'website',
  },

  contact: {
    title: 'Contact Us - M&A Platform Support & Sales | betweendeals',
    description:
      'Get in touch with our M&A experts. Support for buyers and sellers, platform questions, and professional advisory services.',
    keywords:
      'contact support, M&A experts, customer service, platform help, advisory services, business consultation',
    type: 'website',
  },

  faq: {
    title: 'Frequently Asked Questions - M&A Platform FAQ | betweendeals',
    description:
      'Common questions about buying and selling businesses on betweendeals. Get answers about our platform, fees, process, and security.',
    keywords:
      'FAQ, frequently asked questions, M&A questions, platform FAQ, business sale questions, buyer questions, seller questions',
    type: 'website',
  },

  // ============= RESOURCES =============
  valuationGuide: {
    title: 'Business Valuation Guide - How to Value Your Business | betweendeals',
    description:
      'Comprehensive guide to business valuation methods, tools, and best practices. Learn how to accurately value your business for sale.',
    keywords:
      'business valuation, valuation methods, business appraisal, company valuation, valuation guide, business worth, enterprise value',
    type: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Business Valuation Guide - How to Value Your Business',
      description: 'Comprehensive guide to business valuation methods and best practices',
      author: {
        '@type': 'Organization',
        name: 'betweendeals',
      },
      publisher: {
        '@type': 'Organization',
        name: 'betweendeals',
      },
    },
  },

  dueDiligenceChecklist: {
    title: 'Due Diligence Checklist - M&A Due Diligence Guide | betweendeals',
    description:
      'Complete due diligence checklist for business acquisitions. Essential documents, financial review, and legal considerations for M&A transactions.',
    keywords:
      'due diligence checklist, M&A due diligence, business acquisition checklist, financial due diligence, legal due diligence, business review',
    type: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Due Diligence Checklist for Business Acquisitions',
      description: 'Complete checklist for conducting due diligence in M&A transactions',
      author: {
        '@type': 'Organization',
        name: 'betweendeals',
      },
      publisher: {
        '@type': 'Organization',
        name: 'betweendeals',
      },
    },
  },

  // ============= COMPANY =============
  about: {
    title: 'About betweendeals - Next-Generation M&A Platform | betweendeals',
    description:
      'Learn about betweendeals, the next-generation M&A platform launching in 2025. Our mission to modernize European SME transactions with AI-powered technology.',
    keywords:
      'about betweendeals, startup, M&A platform, European M&A, digital transformation, 2025 launch, AI-powered matching, beta waitlist',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'betweendeals',
      url: 'https://www.betweendeals.com',
      description:
        'Next-generation M&A platform launching 2025 to modernize European SME transactions',
      foundingDate: '2024',
      areaServed: 'Europe',
      serviceType: 'Digital M&A Platform and Technology',
    },
  },

  // ============= ERROR PAGES =============
  notFound: {
    title: 'Page Not Found - 404 Error | betweendeals',
    description:
      'The page you are looking for could not be found. Return to the betweendeals homepage to continue browsing business opportunities.',
    keywords: '404 error, page not found, missing page, betweendeals error',
    type: 'website',
    noIndex: true,
  },

  // ============= ONBOARDING =============
  sellerOnboarding: {
    title: 'Seller Registration - Join betweendeals as a Business Seller',
    description:
      "Complete your seller registration to list your business on Europe's leading M&A platform. Verify your identity and start reaching qualified buyers.",
    keywords:
      'seller registration, business seller signup, seller onboarding, list business, seller verification',
    type: 'website',
    noIndex: true, // Private onboarding
  },

  buyerOnboarding: {
    title: 'Buyer Registration - Join betweendeals as a Business Buyer',
    description:
      'Complete your buyer registration to access exclusive business opportunities. Verify your investment capacity and connect with business sellers.',
    keywords:
      'buyer registration, business buyer signup, buyer onboarding, investment registration, buyer verification',
    type: 'website',
    noIndex: true, // Private onboarding
  },

  // ============= CHECKOUT =============
  checkoutSuccess: {
    title: 'Payment Successful - Thank You | betweendeals',
    description:
      'Your payment has been processed successfully. Thank you for choosing betweendeals for your M&A transaction.',
    keywords: 'payment success, transaction complete, payment confirmation, thank you page',
    type: 'website',
    noIndex: true, // Private checkout result
  },
};

// Helper function to get SEO data for a route
export const getSEOData = (route: string): SEOProps | undefined => {
  return seoData[route];
};

// Helper function to get default SEO data
export const getDefaultSEO = (): SEOProps => {
  return seoData.home;
};

// Dynamic SEO generators for specific pages
export const generateListingSEO = (listing: {
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  location?: string;
  industry?: string;
}): SEOProps => {
  const priceText = listing.price
    ? ` - ${new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: listing.currency || 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(listing.price)}`
    : '';

  const locationText = listing.location ? ` in ${listing.location}` : '';

  return {
    title: `${listing.title}${priceText} | Business for Sale${locationText} | betweendeals`,
    description:
      listing.description ||
      `${listing.title} - Premium business opportunity for sale${locationText}. View detailed financials, operations data, and connect with the seller through our secure M&A platform.`,
    keywords: `${listing.title}, business for sale${locationText}, ${listing.industry || 'business'} acquisition, SME for sale, business opportunity, M&A, investment opportunity`,
    type: 'product',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: listing.title,
      description: listing.description,
      offers: {
        '@type': 'Offer',
        price: listing.price,
        priceCurrency: listing.currency || 'EUR',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'betweendeals',
        },
      },
      category: listing.industry,
      location: listing.location,
    },
  };
};

export const generateSearchSEO = (filters: {
  query?: string;
  location?: string;
  industry?: string;
  priceRange?: string;
}): SEOProps => {
  const parts = [];
  if (filters.query) parts.push(filters.query);
  if (filters.industry) parts.push(filters.industry);
  if (filters.location) parts.push(`in ${filters.location}`);

  const searchTerm = parts.length > 0 ? parts.join(' ') : 'Business Opportunities';

  return {
    title: `${searchTerm} | Search Results | betweendeals`,
    description: `Find ${searchTerm.toLowerCase()} on Europe's leading M&A platform. Browse verified business opportunities${filters.location ? ` in ${filters.location}` : ' across Europe'} with comprehensive due diligence information.`,
    keywords: `${searchTerm}, business search, SME opportunities, ${filters.industry || 'business'} for sale, M&A marketplace, investment opportunities`,
    type: 'website',
  };
};
