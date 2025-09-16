import * as React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Cookie, Shield, Settings, Eye } from 'lucide-react';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';

const CookiePolicy = () => {
  return (
    <>
      <SEOHead
        title="Cookie Policy | betweendeals M&A Platform"
        description="Learn about how betweendeals uses cookies to improve your experience on our M&A platform. Detailed information about cookie types and your choices."
        keywords="cookie policy, privacy, data protection, website cookies, tracking, betweendeals"
      />

      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary-100 rounded-full">
                    <Cookie className="w-12 h-12 text-primary-600" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Cookie Policy
                </h1>
                <p className="text-xl text-neutral-600">Last updated: January 2025</p>
              </div>

              {/* Introduction */}
              <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
                <Card className="border border-primary-200 bg-primary-50">
                  <CardBody className="p-6">
                    <p className="text-primary-800 font-medium">
                      This Cookie Policy explains how betweendeals ("we," "us," or "our") uses
                      cookies and similar technologies when you visit our website and platform. This
                      policy should be read together with our Privacy Policy.
                    </p>
                  </CardBody>
                </Card>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">What Are Cookies?</h2>
                  <p>
                    Cookies are small text files that are placed on your device when you visit a
                    website. They are widely used to make websites work more efficiently and to
                    provide information to website owners about how users interact with their sites.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">How We Use Cookies</h2>
                  <p className="mb-6">We use cookies for several reasons, including to:</p>
                  <ul className="space-y-2">
                    <li>• Ensure our platform functions properly and securely</li>
                    <li>• Remember your preferences and settings</li>
                    <li>• Analyze how our platform is used to improve user experience</li>
                    <li>• Personalize content and recommendations</li>
                    <li>• Measure the effectiveness of our marketing campaigns</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Types of Cookies We Use
                  </h2>

                  <div className="space-y-6">
                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Shield className="w-6 h-6 text-green-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Essential Cookies
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700 mb-3">
                          These cookies are strictly necessary for the platform to function and
                          cannot be switched off. They include:
                        </p>
                        <ul className="space-y-1 text-neutral-600">
                          <li>• Authentication and security cookies</li>
                          <li>• Session management cookies</li>
                          <li>• Load balancing cookies</li>
                          <li>• CSRF protection tokens</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Settings className="w-6 h-6 text-blue-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Functional Cookies
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700 mb-3">
                          These cookies enhance functionality and personalization:
                        </p>
                        <ul className="space-y-1 text-neutral-600">
                          <li>• Language and region preferences</li>
                          <li>• User interface customizations</li>
                          <li>• Search filters and sorting preferences</li>
                          <li>• Recently viewed listings</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Eye className="w-6 h-6 text-purple-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Analytics Cookies
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700 mb-3">
                          These cookies help us understand how users interact with our platform:
                        </p>
                        <ul className="space-y-1 text-neutral-600">
                          <li>• Google Analytics cookies</li>
                          <li>• Page view and user flow tracking</li>
                          <li>• Performance monitoring</li>
                          <li>• Error tracking and debugging</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Marketing Cookies
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700 mb-3">
                          These cookies are used to deliver relevant advertisements:
                        </p>
                        <ul className="space-y-1 text-neutral-600">
                          <li>• Social media integration cookies</li>
                          <li>• Advertising platform cookies</li>
                          <li>• Conversion tracking cookies</li>
                          <li>• Retargeting and remarketing cookies</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Third-Party Cookies</h2>
                  <p className="mb-4">We may also use third-party cookies from trusted partners:</p>
                  <ul className="space-y-2">
                    <li>
                      • <strong>Google Analytics:</strong> For website analytics and user behavior
                      analysis
                    </li>
                    <li>
                      • <strong>LinkedIn:</strong> For professional networking features and
                      advertising
                    </li>
                    <li>
                      • <strong>Microsoft Clarity:</strong> For user session recordings and heatmaps
                    </li>
                    <li>
                      • <strong>Stripe:</strong> For secure payment processing
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Managing Your Cookie Preferences
                  </h2>
                  <p className="mb-4">You have several options to manage cookies:</p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        Browser Settings
                      </h3>
                      <p>
                        Most browsers allow you to control cookies through their settings. You can
                        block or delete cookies, but this may affect website functionality.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        Cookie Consent Banner
                      </h3>
                      <p>
                        When you first visit our site, you'll see a cookie consent banner where you
                        can accept or customize your cookie preferences.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Opt-Out Links</h3>
                      <p>For analytics and advertising cookies, you can opt out through:</p>
                      <ul className="mt-2 space-y-1">
                        <li>
                          • Google Analytics Opt-out:{' '}
                          <a
                            href="https://tools.google.com/dlpage/gaoptout"
                            className="text-primary-600 hover:underline"
                          >
                            tools.google.com/dlpage/gaoptout
                          </a>
                        </li>
                        <li>
                          • Network Advertising Initiative:{' '}
                          <a
                            href="https://optout.networkadvertising.org"
                            className="text-primary-600 hover:underline"
                          >
                            optout.networkadvertising.org
                          </a>
                        </li>
                        <li>
                          • Digital Advertising Alliance:{' '}
                          <a
                            href="https://optout.aboutads.info"
                            className="text-primary-600 hover:underline"
                          >
                            optout.aboutads.info
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Retention</h2>
                  <p>Different cookies have different retention periods:</p>
                  <ul className="mt-4 space-y-2">
                    <li>
                      • <strong>Session cookies:</strong> Deleted when you close your browser
                    </li>
                    <li>
                      • <strong>Authentication cookies:</strong> Expire after 30 days of inactivity
                    </li>
                    <li>
                      • <strong>Preference cookies:</strong> Stored for up to 1 year
                    </li>
                    <li>
                      • <strong>Analytics cookies:</strong> Stored for up to 2 years
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Updates to This Policy
                  </h2>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our
                    practices or for other operational, legal, or regulatory reasons. We will notify
                    you of any material changes by posting the updated policy on our website.
                  </p>
                </div>

                <Card className="border border-neutral-200 bg-neutral-50">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Contact Us</h3>
                    <p className="text-neutral-700 mb-4">
                      If you have any questions about our use of cookies or this Cookie Policy,
                      please contact us:
                    </p>
                    <div className="text-neutral-600">
                      <p>Email: privacy@betweendeals.com</p>
                      <p>Address: Brussels, Belgium</p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CookiePolicy;
