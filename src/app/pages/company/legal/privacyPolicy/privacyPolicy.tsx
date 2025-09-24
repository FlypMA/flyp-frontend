import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import Heading1 from '@/shared/components/typography/Heading1';
import Heading2 from '@/shared/components/typography/Heading2';
import { getSEOData } from '@/shared/utils/seo/seoData';

const PrivacyPolicy = () => {
  return (
    <Container>
      <SEOHead {...getSEOData('privacyPolicy')} />
      <div className="max-w-4xl mx-auto py-12 px-4 bg-white">
        <Heading1 className="text-gray-900">Privacy Policy</Heading1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: January 2025</p>

        <div className="space-y-8 text-gray-800 leading-relaxed">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900">
              <strong>Your Privacy Matters:</strong> This Privacy Policy explains how Upswitch
              collects, uses, and protects your personal information when you use our M&A platform.
              We are committed to transparency and giving you complete control over your business
              data.
            </p>
          </div>

          <Heading2 className="text-gray-900">1. Information We Collect</Heading2>

          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Information</h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Name, email address, and account credentials</li>
              <li>Professional profile information and business details</li>
              <li>
                Billing and payment information (processed securely through third-party providers)
              </li>
              <li>Communication preferences and notification settings</li>
              <li>Identity verification documents for enhanced security</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
              Business and Transaction Data
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Business listing information and financial data</li>
              <li>Transaction history and inquiry communications</li>
              <li>Due diligence documents and confidential business information</li>
              <li>Investment preferences and acquisition criteria</li>
              <li>Transaction completion data and success fee information</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Technical Information</h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Device information, IP address, and browser type</li>
              <li>Platform usage patterns and interaction data</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Security logs and access records</li>
            </ul>
          </div>

          <Heading2 className="text-gray-900">2. How We Use Your Information</Heading2>
          <p className="text-gray-700">We use your information to:</p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>
              <strong>Facilitate M&A Transactions:</strong> Connect buyers and sellers, manage
              listings, and support deal completion
            </li>
            <li>
              <strong>Security and Verification:</strong> Verify user identities and ensure platform
              security
            </li>
            <li>
              <strong>Due Diligence Support:</strong> Provide secure document sharing and
              transaction management tools
            </li>
            <li>
              <strong>Communication:</strong> Enable secure messaging between verified buyers and
              sellers
            </li>
            <li>
              <strong>Platform Improvement:</strong> Enhance our services and develop new features
            </li>
            <li>
              <strong>Legal Compliance:</strong> Meet regulatory requirements and maintain
              transaction records
            </li>
            <li>
              <strong>Customer Support:</strong> Provide assistance and resolve platform issues
            </li>
          </ul>

          <Heading2 className="text-gray-900">3. Data Security and Confidentiality</Heading2>
          <p className="text-gray-700">
            We understand that M&A transactions involve highly sensitive business information. Our
            security measures include:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>End-to-end encryption for all sensitive data and documents</li>
            <li>Secure data rooms with granular access controls</li>
            <li>Multi-factor authentication for all user accounts</li>
            <li>Regular security audits and compliance assessments</li>
            <li>Confidentiality agreements and NDA enforcement</li>
            <li>SOC 2 Type II compliance and industry-standard security protocols</li>
          </ul>
          <p className="text-gray-700">
            All business information shared on our platform is treated with the highest level of
            confidentiality and is only accessible to verified, authorized parties.
          </p>

          <Heading2 className="text-gray-900">4. Data Sharing and Disclosure</Heading2>

          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              We May Share Information With:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who help us operate our
                platform (payment processors, security services, etc.)
              </li>
              <li>
                <strong>Transaction Counterparties:</strong> Verified buyers and sellers in active
                transactions (with appropriate NDAs)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or
                asset sales
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">We Do NOT:</h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>Sell your personal or business information to third parties</li>
              <li>Share confidential business data without explicit consent</li>
              <li>Use your data for purposes unrelated to M&A transactions</li>
              <li>Provide access to your private communications without authorization</li>
            </ul>
          </div>

          <Heading2 className="text-gray-900">5. Cookies and Tracking Technologies</Heading2>
          <p className="text-gray-700">We use cookies and similar technologies to:</p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Remember your preferences and account settings</li>
            <li>Analyze platform usage and performance</li>
            <li>Provide personalized dashboard and search results</li>
            <li>Enable secure authentication and fraud prevention</li>
            <li>Support transaction management and communication features</li>
          </ul>
          <p className="text-gray-700">
            You can control cookie settings through your browser, though some features may not work
            properly if cookies are disabled.
          </p>

          <Heading2 className="text-gray-900">6. Your Privacy Rights</Heading2>

          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">You Have the Right To:</h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>
                <strong>Access:</strong> Request a copy of all personal data we hold about you
              </li>
              <li>
                <strong>Rectification:</strong> Correct inaccurate or incomplete information
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal data ("right to be
                forgotten")
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a machine-readable format
              </li>
              <li>
                <strong>Object:</strong> Opt-out of certain data processing activities
              </li>
              <li>
                <strong>Restrict:</strong> Limit how we process your personal data
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
              How to Exercise Your Rights:
            </h3>
            <p className="text-gray-700">
              Contact us at privacy@upswitch.com or use the data management tools in your account
              settings. We will respond to requests within 30 days.
            </p>
          </div>

          <Heading2 className="text-gray-900">7. International Data Transfers</Heading2>
          <p className="text-gray-700">
            If you are located outside Belgium, your information may be transferred to and processed
            in Belgium where our servers are located. We ensure appropriate safeguards are in place
            for international transfers, including Standard Contractual Clauses and adequacy
            decisions where applicable.
          </p>

          <Heading2 className="text-gray-900">8. Data Retention</Heading2>
          <p className="text-gray-700">We retain your information for as long as necessary to:</p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Provide our services and maintain your account</li>
            <li>Comply with legal obligations and resolve disputes</li>
            <li>Complete M&A transactions and maintain transaction records</li>
            <li>Process success fees and maintain financial records</li>
            <li>Improve our platform and develop new features</li>
          </ul>
          <p className="text-gray-700">
            After account deletion, we may retain anonymized data for analytics and service
            improvement purposes. Transaction records may be retained longer for legal compliance.
          </p>

          <Heading2 className="text-gray-900">9. Business Data Protection</Heading2>
          <p className="text-gray-700">For businesses listing on our platform:</p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>You maintain ownership of all your business data and intellectual property</li>
            <li>Financial information is only shared with verified, interested buyers under NDA</li>
            <li>Business performance data is never shared with competitors</li>
            <li>You control who can access your detailed business information</li>
            <li>All data sharing requires explicit consent and legal agreements</li>
          </ul>

          <Heading2 className="text-gray-900">10. Third-Party Services</Heading2>
          <p className="text-gray-700">
            Our platform may integrate with third-party services (payment processors, identity
            verification, document storage, etc.). These services have their own privacy policies,
            and we encourage you to review them. We are not responsible for the privacy practices of
            third-party services.
          </p>

          <Heading2 className="text-gray-900">11. Updates to This Privacy Policy</Heading2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically to reflect changes in our practices or
            legal requirements. We will notify you of significant changes via email or through
            prominent notices on our platform. Your continued use of our services after changes
            become effective constitutes acceptance of the updated policy.
          </p>

          <Heading2 className="text-gray-900">12. Regional Compliance</Heading2>

          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">GDPR Compliance (EU Users)</h3>
            <p className="text-gray-700">
              For users in the European Union, we comply with the General Data Protection Regulation
              (GDPR). Your personal data is processed based on legal grounds including consent,
              contract performance, and legitimate interests.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-4">
              Belgian Data Protection Laws
            </h3>
            <p className="text-gray-700">
              As a Belgian company, we comply with local data protection regulations and work with
              Belgian data protection authorities for any compliance matters.
            </p>
          </div>

          <Heading2 className="text-gray-900">13. Contact Information</Heading2>
          <p className="text-gray-700">
            For privacy-related questions or to exercise your rights, contact us at:
          </p>
          <div className="ml-4 space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> privacy@upswitch.com
            </p>
            <p>
              <strong>Address:</strong> Upswitch, Belgium
            </p>
          </div>

          <Heading2 className="text-gray-900">14. Supervisory Authority</Heading2>
          <p className="text-gray-700">
            EU users have the right to lodge a complaint with your local data protection authority
            if you believe we have not addressed your privacy concerns adequately.
          </p>
        </div>

        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> This Privacy Policy is designed to meet modern privacy
            requirements including GDPR for flyp' M&A platform. For production use, we recommend
            review by qualified privacy counsel to ensure full compliance with all applicable
            jurisdictions and evolving privacy regulations.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
