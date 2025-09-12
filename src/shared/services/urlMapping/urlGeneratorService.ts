// 🔗 URL Generator Service - Centralized routing
// Location: src/shared/services/urlMapping/urlGeneratorService.ts
// Purpose: Generate consistent URLs across the application

class UrlGeneratorService {
  // Basic routes
  static root = () => '/';
  static dashboard = () => '/dashboard';
  static marketplace = () => '/marketplace';
  static listings = () => '/search';
  static myBusiness = () => '/my-business';

  // Page routes
  static contact = () => '/contact';
  static about = () => '/about';
  static forSellers = () => '/for-sellers';
  static forBuyers = () => '/search';

  // Legal routes
  static privacyPolicy = () => '/privacy-policy';
  static termsConditions = () => '/terms-conditions';
  static cookiePolicy = () => '/cookie-policy';
  static gdprCompliance = () => '/gdpr';
  static security = () => '/security';

  // Resource routes
  static valuationGuide = () => '/resources/valuation-guide';
  static dueDiligenceChecklist = () => '/resources/due-diligence';

  // Auth routes
  static login = () => '/auth/login';
  static signup = () => '/auth/signup';
  static forgotPassword = () => '/auth/forgot-password';

  // User routes
  static profile = () => '/users/profile';
  static settings = () => '/users/settings';
  static saved = () => '/users/saved';

  // Business routes
  static businessOverview = () => '/my-business';
  static businessListings = () => '/my-business/listings';
  static businessValuations = () => '/my-business/valuations';
  static businessPerformance = () => '/my-business/performance';
  static businessDocuments = () => '/my-business/documents';

  // Utility methods
  static generateOnboardingUrl = (user: any) => {
    switch (user?.role) {
      case 'seller':
        return this.myBusiness();
      case 'buyer':
        return this.listings();
      default:
        return this.dashboard();
    }
  };

  static generateDashboardUrl = (user: any) => {
    switch (user?.role) {
      case 'seller':
        return this.myBusiness();
      case 'buyer':
        return this.listings();
      case 'both':
        return this.myBusiness();
      default:
        return this.dashboard();
    }
  };
}

export default UrlGeneratorService;
