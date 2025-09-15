// 🔗 URL Generator Service - MVP Version
// Location: src/shared/services/UrlGenerator.ts
// Purpose: Generate consistent URLs across the MVP application

export class UrlGenerator {

  // ==============================================================================
  // PUBLIC PAGES
  // ==============================================================================

  static root = () => '/';
  static search = () => '/search';
  static browse = () => '/browse';
  static browseByFilter = (filter: string) => `/browse/sector/${filter}`;
  static listings = () => '/listings';
  static listingById = (listingId: string) => `/listings/${listingId}`;
  static about = () => '/about';
  static contact = () => '/contact';
  static forSellers = () => '/for-sellers';

  // ==============================================================================
  // RESOURCES landing pages
  // ==============================================================================
  static valuationGuide = () => '/resources/valuation-guide';
  static dueDiligenceChecklist = () => '/resources/due-diligence';

  // ==============================================================================
  // AUTHENTICATION
  // ==============================================================================

  static login = () => '/auth/login'; // Sits in a modal
  static signup = () => '/auth/signup'; // Sits in a modal
  static signupComplete = () => '/signup/complete';
  static passwordReset = () => '/auth/forgot-password';
  static emailVerification = () => '/verify-email';

  // ==============================================================================
  // BUSINESS OWNER DOMAIN - /my-business/* 
  // For business owners managing their companies, signed up as a seller
  // ==============================================================================

  static myBusiness = () => '/my-business';
  static myBusinessOverview = () => '/my-business/overview';
  static myBusinessListings = () => '/my-business/listings';
  static createListing = () => '/my-business/listings/new';
  static editListing = (listingId: string) => `/my-business/listings/${listingId}`;
  static listingAnalytics = (listingId: string) => `/my-business/listings/${listingId}/analytics`;
  static listingInquiries = (listingId: string) => `/my-business/listings/${listingId}/inquiries`;
  static businessValuations = () => '/my-business/valuations';
  static businessAnalytics = () => '/my-business/analytics';
  static businessDocuments = () => '/my-business/documents';
  static businessPerformance = () => '/my-business/performance';

  // ==============================================================================
  // BUSINESS BUYERS 
  // For business prospectors searching for a new company to acquire, signed up as a buyer
  // ==============================================================================

  static checkout = () => '/checkout';
  static checkoutSuccess = () => '/checkout/success';
  static checkoutCancel = () => '/checkout/cancel';
  static checkoutFailed = () => '/checkout/failed';
  static checkoutPending = () => '/checkout/pending';
  static checkoutProcessing = () => '/checkout/processing';
  static checkoutComplete = () => '/checkout/complete';
  static checkoutRedirect = () => '/checkout/redirect';

  // ==============================================================================
  // UNIVERSAL USER DOMAIN - /users/*
  // Universal account management for all user types
  // ==============================================================================

  static users = () => '/users';
  static userProfile = () => '/users/profile';
  static userSettings = () => '/users/settings';
  static userBilling = () => '/users/billing';
  static userSecurity = () => '/users/security';
  static userNotifications = () => '/users/notifications';

  // ==============================================================================
  // UNIVERSAL COMMUNICATION - /messages/*
  // ==============================================================================

  static messages = () => '/messages';
  static conversation = (conversationId: string) => `/messages/${conversationId}`;

  // ==============================================================================
  // LEGAL & SUPPORT
  // ==============================================================================

  static faq = () => '/faq';
  static help = () => '/help';
  static helpCenter = () => '/help';
  static privacyPolicy = () => '/privacy-policy';
  static termsConditions = () => '/terms-and-conditions';
  static cookiePolicy = () => '/cookie-policy';
  static gdprCompliance = () => '/gdpr';
  static security = () => '/security';

  // ==============================================================================
  // SUBSCRIPTION & BILLING
  // ==============================================================================
  static subscription = () => '/subscription';
  static subscriptionPlans = () => '/subscription/plans';
  static subscriptionBilling = () => '/subscription/billing';
  static subscriptionSuccess = () => '/subscription/success';

  // ==============================================================================
  // UTILITY METHODS - Helper functions for dynamic routing
  // ==============================================================================

  /**
   * Generate main destination URL based on user role
   */
  static getDashboardForRole = (role: 'buyer' | 'seller') => {
    switch (role) {
      case 'seller':
        return UrlGenerator.myBusiness(); // Business owners get /my-business/
      case 'buyer':
        return UrlGenerator.listings(); // Buyers browse listings
      default:
        return UrlGenerator.listings(); // Default to marketplace
    }
  };

  /**
   * Generate browse URL with filters
   */
  static browseWithFilters = (filters: {
    sector?: string;
    region?: string;
    priceMin?: number;
    priceMax?: number;
    revenue?: string;
  }) => {
    const params = new URLSearchParams();

    if (filters.sector) params.append('sector', filters.sector);
    if (filters.region) params.append('region', filters.region);
    if (filters.priceMin) params.append('priceMin', filters.priceMin.toString());
    if (filters.priceMax) params.append('priceMax', filters.priceMax.toString());
    if (filters.revenue) params.append('revenue', filters.revenue);

    const queryString = params.toString();
    return queryString ? `/browse?${queryString}` : '/browse';
  };

  /**
   * Generate listing URL with action
   */
  static getListingAction = (
    listingId: string,
    action: 'view' | 'edit' | 'analytics' | 'data-room' | 'documents'
  ) => {
    switch (action) {
      case 'edit':
        return UrlGenerator.editListing(listingId);
      case 'analytics':
        return UrlGenerator.listingAnalytics(listingId);
      case 'data-room':
        return UrlGenerator.listingById(listingId) + '/data-room';
      case 'documents':
        return UrlGenerator.listingById(listingId) + '/documents';
      default:
        return UrlGenerator.listingById(listingId);
    }
  };

  /**
   * Generate user section URL
   */
  static getUserSection = (
    section: 'profile' | 'settings' | 'notifications' | 'billing' | 'security'
  ) => {
    switch (section) {
      case 'profile':
        return UrlGenerator.userProfile();
      case 'settings':
        return UrlGenerator.userSettings();
      case 'notifications':
        return UrlGenerator.userNotifications();
      case 'billing':
        return UrlGenerator.userBilling();
      case 'security':
        return UrlGenerator.userSecurity();
      default:
        return UrlGenerator.users();
    }
  };

  /**
   * Generate business owner section URL
   */
  static getBusinessSection = (
    section: 'overview' | 'listings' | 'valuations' | 'documents' | 'performance'
  ) => {
    switch (section) {
      case 'listings':
        return UrlGenerator.myBusinessListings();
      case 'valuations':
        return UrlGenerator.businessValuations();
      case 'documents':
        return UrlGenerator.businessDocuments();
      case 'performance':
        return UrlGenerator.businessPerformance();
      case 'overview':
        return UrlGenerator.myBusinessOverview();
      default:
        return UrlGenerator.myBusiness();
    }
  };

  /**
   * Generate marketplace navigation
   * Buyers don't need a dashboard, they browse listings
   */
  static getMarketplaceSection = (section: 'browse' | 'search' | 'advanced' | 'category') => {
    switch (section) {
      case 'search':
        return UrlGenerator.listings() + '?search=true';
      case 'category':
        return UrlGenerator.browse();
      default:
        return UrlGenerator.listings();
    }
  };

  /**
   * Check if current path matches a route
   */
  static isCurrentRoute = (currentPath: string, targetRoute: string): boolean => {
    return currentPath === targetRoute || currentPath.startsWith(targetRoute + '/');
  };

  /**
   * Extract ID from parameterized route
   */
  static extractIdFromPath = (path: string, baseRoute: string): string | null => {
    const regex = new RegExp(`^${baseRoute.replace(/:\w+/g, '([^/]+)')}$`);
    const match = path.match(regex);
    return match ? match[1] || null : null;
  };

  // ==============================================================================
  // MVP SPECIFIC UTILITIES
  // ==============================================================================

  /**
   * Generate onboarding URL based on user role - MVP version
   */
  static generateOnboardingUrl = (user: any) => {
    switch (user?.role) {
      case 'seller':
        return this.myBusiness();
      case 'buyer':
        return this.listings();
      default:
        return this.listings();
    }
  };

  /**
   * Generate dashboard URL based on user role - MVP version
   */
  static generateDashboardUrl = (user: any) => {
    switch (user?.role) {
      case 'seller':
        return this.myBusiness();
      case 'buyer':
        return this.listings();
      case 'both':
        return this.myBusiness();
      default:
        return this.listings();
    }
  };

  /**
   * Generate search URL with query parameters
   */
  static searchWithQuery = (query: string, filters?: {
    sector?: string;
    region?: string;
    priceMin?: number;
    priceMax?: number;
  }) => {
    const params = new URLSearchParams();
    params.append('q', query);
    
    if (filters?.sector) params.append('sector', filters.sector);
    if (filters?.region) params.append('region', filters.region);
    if (filters?.priceMin) params.append('priceMin', filters.priceMin.toString());
    if (filters?.priceMax) params.append('priceMax', filters.priceMax.toString());

    return `/search?${params.toString()}`;
  };

  /**
   * Generate profile URL with tab
   */
  static profileWithTab = (tab: 'overview' | 'settings' | 'billing' | 'security') => {
    return `/users/profile?tab=${tab}`;
  };

  /**
   * Generate business dashboard URL with tab
   */
  static businessWithTab = (tab: 'overview' | 'listings' | 'valuations' | 'documents' | 'performance') => {
    return `/my-business?tab=${tab}`;
  };

  /**
   * Generate messages URL with filters
   */
  static messagesWithFilter = (filter: 'all' | 'unread' | 'inquiries' | 'offers') => {
    return `/messages?filter=${filter}`;
  };

  /**
   * Generate listing URL with tab
   */
  static listingWithTab = (listingId: string, tab: 'overview' | 'analytics' | 'inquiries' | 'documents') => {
    return `/listings/${listingId}?tab=${tab}`;
  };

  /**
   * Generate checkout URL with step
   */
  static checkoutWithStep = (step: 'details' | 'payment' | 'review' | 'confirmation') => {
    return `/checkout?step=${step}`;
  };

  /**
   * Generate business listing URL with tab
   */
  static businessListingWithTab = (listingId: string, tab: 'overview' | 'analytics' | 'inquiries' | 'documents') => {
    return `/my-business/listings/${listingId}?tab=${tab}`;
  };

  /**
   * Generate saved items URL
   */
  static savedItems = () => '/users/saved';
  static savedListings = () => '/users/saved';

  /**
   * Generate watchlist URL (alias for saved items)
   */
  static watchlist = () => '/users/saved';
}

export default UrlGenerator;

// Export the class for named imports
export { UrlGenerator };