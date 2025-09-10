class UrlGeneratorService {
  static root = () => '/';

  // ==============================================================================
  // PUBLIC PAGES
  // ==============================================================================
  static browse = () => '/browse';
  static browseBySector = (sector: string) => `/browse/sector/${sector}`;
  static browseByRegion = (region: string) => `/browse/region/${region}`;
  static about = () => '/about';
  static howItWorks = () => '/how-it-works';

  // ==============================================================================
  // AUTHENTICATION
  // ==============================================================================
  static login = () => '/login';
  static signup = () => '/signup';
  static signupComplete = () => '/signup/complete';
  static passwordReset = () => '/password-reset';
  static emailVerification = () => '/verify-email';

  // ==============================================================================
  // PUBLIC MARKETPLACE - Business listings (like Airbnb stays)
  // ==============================================================================
  static listings = () => '/listings';
  static listingById = (listingId: string) => `/listings/${listingId}`;
  static listingDataRoom = (listingId: string) => `/listings/${listingId}/data-room`;

  // ==============================================================================
  // BUSINESS OWNER DOMAIN - /my-business/* (like Airbnb /hosting/*)
  // For business owners managing their companies - only accessible if you own a business
  // ==============================================================================
  static myBusiness = () => '/my-business';
  static myBusinessOverview = () => '/my-business/overview';
  static myBusinessListings = () => '/my-business/listings';
  static createListing = () => '/my-business/listings/new';
  static editListing = (listingId: string) => `/my-business/listings/${listingId}`;
  static listingAnalytics = (listingId: string) => `/my-business/listings/${listingId}/analytics`;
  static listingInquiries = (listingId: string) => `/my-business/listings/${listingId}/inquiries`;
  static businessValuations = () => '/my-business/valuations';
  static businessDocuments = () => '/my-business/documents';
  static businessPerformance = () => '/my-business/performance';

  // ==============================================================================
  // UNIVERSAL USER DOMAIN - /users/* (like Airbnb /users/*)
  // Universal account management for all user types
  // ==============================================================================
  static users = () => '/users';
  static userProfile = () => '/users/profile';
  static userSettings = () => '/users/settings';
  static userBilling = () => '/users/billing';
  static userSecurity = () => '/users/security';
  static userNotifications = () => '/users/notifications';

  // ==============================================================================
  // UNIVERSAL COMMUNICATION - /messages/* (like Airbnb /messages/*)
  // ==============================================================================
  static messages = () => '/messages';
  static conversation = (conversationId: string) => `/messages/${conversationId}`;

  // ==============================================================================
  // LEGACY SUPPORT - Backward compatibility redirects
  // ==============================================================================
  static dashboard = () => '/listings'; // Redirect old dashboard to listings (like Airbnb home)
  static sellerDashboard = () => '/my-business'; // Legacy: redirect to business owner domain
  static buyerDashboard = () => '/listings'; // Legacy: redirect to listings (no buyer dashboard)
  static selling = () => '/my-business'; // Legacy: redirect old selling to my-business
  static buying = () => '/listings'; // Legacy: redirect old buying to listings

  // ==============================================================================
  // LEGACY REDIRECTS - For backward compatibility during migration
  // CTO INSIGHT: Most buyer actions flow through /messages/ - inquiries, offers, negotiations
  // ==============================================================================
  static inquiries = () => '/messages'; // All inquiries flow through messages
  static inquiryById = (inquiryId: string) => `/messages/${inquiryId}`;
  static offers = () => '/messages'; // All offers flow through messages
  static watchlist = () => '/users/saved'; // Watchlist becomes saved items
  static conversations = () => '/messages';
  static conversationById = (conversationId: string) => `/messages/${conversationId}`;
  static dataRoom = (listingId: string) => `/listings/${listingId}/data-room`;
  static documents = (listingId: string) => `/my-business/documents`;
  static account = () => '/users/profile';
  static accountSettings = () => '/users/settings';
  static accountProfile = () => '/users/profile';
  static accountNotifications = () => '/users/notifications';
  static accountBilling = () => '/users/billing';
  static accountSecurity = () => '/users/security';
  static search = () => '/listings'; // Search happens on listings page
  static searchResults = (query: string) => `/listings?q=${encodeURIComponent(query)}`;
  static advancedSearch = () => '/listings/advanced'; // Advanced search on listings page
  static savedSearches = () => '/users/saved'; // Saved items in user profile

  // ==============================================================================
  // LEGAL & SUPPORT
  // ==============================================================================
  static faq = () => '/faq';
  static contact = () => '/contact';
  static help = () => '/help';
  static privacyPolicy = () => '/privacy-policy';
  static termsConditions = () => '/terms-and-conditions';
  static cookiePolicy = () => '/cookie-policy';

  // ==============================================================================
  // SUBSCRIPTION & BILLING
  // ==============================================================================
  static subscription = () => '/subscription';
  static subscriptionPlans = () => '/subscription/plans';
  static subscriptionBilling = () => '/subscription/billing';
  static subscriptionSuccess = () => '/subscription/success';

  // ==============================================================================
  // LEGACY ROUTES (for backward compatibility during migration)
  // ==============================================================================
  static reports = () => '/listings'; // Redirect old reports to listings
  static reportById = (reportId: string) => `/listings/${reportId}`;
  static createNewReport = () => '/listings/new';
  static accountDashboard = () => '/dashboard';

  // E-commerce routes - consider removing if not needed for B2B marketplace
  static checkout = () => '/subscription/plans'; // Redirect to subscription plans
  static checkoutSuccess = () => '/subscription/success';

  // ==============================================================================
  // UTILITY METHODS - Helper functions for dynamic routing
  // ==============================================================================

  /**
   * Generate main destination URL based on user role - AIRBNB MODEL
   */
  static getDashboardForRole = (role: 'buyer' | 'seller' | 'admin') => {
    switch (role) {
      case 'seller':
        return UrlGeneratorService.myBusiness(); // Business owners get /my-business/
      case 'buyer':
        return UrlGeneratorService.listings(); // Buyers browse listings (like Airbnb guests)
      default:
        return UrlGeneratorService.listings(); // Default to marketplace
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
        return UrlGeneratorService.editListing(listingId);
      case 'analytics':
        return UrlGeneratorService.listingAnalytics(listingId);
      case 'data-room':
        return UrlGeneratorService.dataRoom(listingId);
      case 'documents':
        return UrlGeneratorService.documents(listingId);
      default:
        return UrlGeneratorService.listingById(listingId);
    }
  };

  /**
   * Generate user section URL - NEW ARCHITECTURE
   */
  static getUserSection = (
    section: 'profile' | 'settings' | 'notifications' | 'billing' | 'security'
  ) => {
    switch (section) {
      case 'profile':
        return UrlGeneratorService.userProfile();
      case 'settings':
        return UrlGeneratorService.userSettings();
      case 'notifications':
        return UrlGeneratorService.userNotifications();
      case 'billing':
        return UrlGeneratorService.userBilling();
      case 'security':
        return UrlGeneratorService.userSecurity();
      default:
        return UrlGeneratorService.users();
    }
  };

  /**
   * Generate business owner section URL - AIRBNB MODEL
   */
  static getBusinessSection = (
    section: 'overview' | 'listings' | 'valuations' | 'documents' | 'performance'
  ) => {
    switch (section) {
      case 'listings':
        return UrlGeneratorService.myBusinessListings();
      case 'valuations':
        return UrlGeneratorService.businessValuations();
      case 'documents':
        return UrlGeneratorService.businessDocuments();
      case 'performance':
        return UrlGeneratorService.businessPerformance();
      case 'overview':
        return UrlGeneratorService.myBusinessOverview();
      default:
        return UrlGeneratorService.myBusiness();
    }
  };

  /**
   * Generate marketplace navigation - AIRBNB MODEL
   * Buyers don't need a dashboard, they browse listings
   */
  static getMarketplaceSection = (section: 'browse' | 'search' | 'advanced' | 'category') => {
    switch (section) {
      case 'search':
        return UrlGeneratorService.listings() + '?search=true';
      case 'advanced':
        return UrlGeneratorService.advancedSearch();
      case 'category':
        return UrlGeneratorService.browse();
      default:
        return UrlGeneratorService.listings();
    }
  };

  /**
   * Legacy method - for backward compatibility
   */
  static getAccountSection = (
    section: 'profile' | 'settings' | 'notifications' | 'billing' | 'security'
  ) => {
    console.warn('getAccountSection is deprecated, use getUserSection instead');
    return UrlGeneratorService.getUserSection(section);
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
    return match ? match[1] : null;
  };
}

export default UrlGeneratorService;
