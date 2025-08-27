class UrlGeneratorService {
  static root = () => '/';

  // Account Routes
  static account = () => '/account';
  static accountSettings = () => '/account/settings';

  // Reports Routes with unique keys
  static reports = () => '/reports';
  static reportById = (reportId: string) => `/reports/${reportId}`;
  static createNewReport = () => '/reports/new';

  // Legacy routes for backward compatibility
  static accountDashboard = () => '/account/dashboard';

  // Public Pages
  static creators = () => '/creators';

  static checkout = () => '/checkout';
  static checkoutSuccess = () => '/checkout/success';
  static login = () => '/login';
  static signup = () => '/signup';
  static signupComplete = () => '/signup/complete';
  static passwordReset = () => '/password-reset';

  // Legal & Support
  static faq = () => '/faq';
  static contact = () => '/contact';
  static help = () => '/help';
  static privacyPolicy = () => '/privacy-policy';
  static termsConditions = () => '/terms-and-conditions';

  // Payment
  static payment = () => '/payment';
}

export default UrlGeneratorService;
