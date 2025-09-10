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
  // BUSINESS LISTINGS - Core marketplace functionality
  // ==============================================================================
  static listings = () => '/listings';
  static listingById = (listingId: string) => `/listings/${listingId}`;
  static createListing = () => '/listings/new';
  static editListing = (listingId: string) => `/listings/${listingId}/edit`;
  static listingAnalytics = (listingId: string) => `/listings/${listingId}/analytics`;

  // ==============================================================================
  // DASHBOARD - Role-based user areas
  // ==============================================================================
  static dashboard = () => '/dashboard';
  static sellerDashboard = () => '/account/seller'; // Fixed: actual route is /account/seller
  static buyerDashboard = () => '/dashboard/buyer';

  // ==============================================================================
  // INQUIRIES & COMMUNICATIONS
  // ==============================================================================
  static inquiries = () => '/inquiries';
  static inquiryById = (inquiryId: string) => `/inquiries/${inquiryId}`;
  static conversations = () => '/conversations';
  static conversationById = (conversationId: string) => `/conversations/${conversationId}`;

  // ==============================================================================
  // DUE DILIGENCE & DATA ROOMS
  // ==============================================================================
  static dataRoom = (listingId: string) => `/listings/${listingId}/data-room`;
  static documents = (listingId: string) => `/listings/${listingId}/documents`;

  // ==============================================================================
  // USER ACCOUNT MANAGEMENT
  // ==============================================================================
  static account = () => '/account';
  static accountSettings = () => '/account/settings';
  static accountProfile = () => '/account/profile';
  static accountNotifications = () => '/account/notifications';
  static accountBilling = () => '/account/billing';
  static accountSecurity = () => '/account/security';

  // ==============================================================================
  // SEARCH & DISCOVERY
  // ==============================================================================
  static search = () => '/search';
  static searchResults = (query: string) => `/search?q=${encodeURIComponent(query)}`;
  static advancedSearch = () => '/search/advanced';
  static savedSearches = () => '/searches/saved';

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
   * Generate dashboard URL based on user role
   */
  static getDashboardForRole = (role: 'buyer' | 'seller' | 'admin') => {
    switch (role) {
      case 'seller':
        return UrlGeneratorService.sellerDashboard();
      case 'buyer':
        return UrlGeneratorService.buyerDashboard();
      default:
        return UrlGeneratorService.dashboard();
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
   * Generate account URL with specific section
   */
  static getAccountSection = (
    section: 'profile' | 'settings' | 'notifications' | 'billing' | 'security'
  ) => {
    switch (section) {
      case 'profile':
        return UrlGeneratorService.accountProfile();
      case 'settings':
        return UrlGeneratorService.accountSettings();
      case 'notifications':
        return UrlGeneratorService.accountNotifications();
      case 'billing':
        return UrlGeneratorService.accountBilling();
      case 'security':
        return UrlGeneratorService.accountSecurity();
      default:
        return UrlGeneratorService.account();
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
    return match ? match[1] : null;
  };
}

export default UrlGeneratorService;
