import React from 'react';
import Container from '../../../components/main_UI/containers/container_default';
import Heading1 from '../../../components/main_UI/fonts/heading1';
import Heading2 from '../../../components/main_UI/fonts/heading2';
import { SEOHead } from '../../../components/SEO';
import { getSEOData } from '../../../constants/seoData';

const TermsAndConditions = () => {
  return (
    <Container>
      <SEOHead {...getSEOData('termsAndConditions')} />
      <div className="max-w-4xl mx-auto py-12 px-4 bg-white">
        <Heading1 className="text-gray-900">Terms and Conditions</Heading1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: January 2025</p>

        <div className="space-y-8 text-gray-800 leading-relaxed">
          <Heading2 className="text-gray-900">1. Acceptance of Terms</Heading2>
          <p className="text-gray-700">
            Welcome to betweendeals, a digital M&A platform that facilitates business sales and
            acquisitions across Europe. These Terms and Conditions ("Terms") govern your access to
            and use of betweendeals' website, services, and applications (collectively, the
            "Service"). By accessing or using our Service, you agree to be bound by these Terms.
          </p>

          <Heading2 className="text-gray-900">2. Description of Service</Heading2>
          <p className="text-gray-700">
            betweendeals provides a digital M&A platform that facilitates business sales and
            acquisitions, including but not limited to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Business listing and discovery services</li>
            <li>Secure buyer-seller communication and inquiry management</li>
            <li>Due diligence document sharing and management</li>
            <li>Transaction workflow support and completion tracking</li>
            <li>Success fee processing for completed transactions</li>
            <li>Identity verification and platform security services</li>
          </ul>

          <Heading2 className="text-gray-900">3. Account Registration and Eligibility</Heading2>
          <p className="text-gray-700">
            To access our Service, you must create an account and meet our eligibility requirements.
            You must be at least 18 years old and have legal capacity to enter into contracts. When
            creating an account, you agree to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your account information</li>
            <li>Keep your login credentials secure and confidential</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Complete identity verification when required</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <Heading2 className="text-gray-900">4. User Types and Services</Heading2>
          <p className="text-gray-700">
            <strong>Business Sellers:</strong> Business owners can list their businesses for sale,
            manage inquiries from qualified buyers, share confidential information under NDAs, and
            complete transactions through our platform.
          </p>
          <p className="text-gray-700">
            <strong>Business Buyers:</strong> Investors and entrepreneurs can search for businesses,
            submit inquiries, conduct due diligence, and complete acquisitions through our platform.
          </p>
          <p className="text-gray-700">
            <strong>Professional Users:</strong> M&A advisors, brokers, and other professionals can
            access enhanced platform features to serve their clients.
          </p>

          <Heading2 className="text-gray-900">5. Fees and Payment Terms</Heading2>
          <p className="text-gray-700">
            Our platform operates on a success fee model. By using our services, you agree to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Pay success fees only upon successful transaction completion</li>
            <li>Fee rates as disclosed at the time of listing or transaction initiation</li>
            <li>Payment processing through secure third-party providers</li>
            <li>Additional fees for premium services as specified</li>
            <li>All fees are non-refundable once transactions are completed</li>
          </ul>

          <Heading2 className="text-gray-900">6. Confidentiality and NDAs</Heading2>
          <p className="text-gray-700">
            M&A transactions involve highly sensitive business information. By using our Service,
            you agree to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Maintain strict confidentiality of all shared business information</li>
            <li>Sign Non-Disclosure Agreements (NDAs) before accessing confidential data</li>
            <li>Use shared information solely for transaction evaluation purposes</li>
            <li>Return or destroy confidential information upon request</li>
            <li>Report any unauthorized disclosure or breach immediately</li>
          </ul>
          <p className="text-gray-700">
            For detailed information about data practices, please review our Privacy Policy.
          </p>

          <Heading2 className="text-gray-900">7. Transaction Completion and Success Fees</Heading2>
          <p className="text-gray-700">
            When transactions are completed through our platform, the following terms apply:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Success fees are calculated based on final transaction value</li>
            <li>Fees are due within 30 days of transaction completion</li>
            <li>Transparent fee calculation and reporting</li>
            <li>Dispute resolution procedures for fee-related issues</li>
            <li>Platform facilitates but does not guarantee transaction completion</li>
          </ul>

          <Heading2 className="text-gray-900">8. Intellectual Property Rights</Heading2>
          <p className="text-gray-700">
            The Service and its original content, features, and functionality are owned by
            betweendeals and are protected by international copyright, trademark, patent, trade
            secret, and other intellectual property laws. You retain ownership of business
            information you submit, but grant us necessary licenses to provide our Service and
            facilitate transactions.
          </p>

          <Heading2 className="text-gray-900">9. User Conduct and Prohibited Uses</Heading2>
          <p className="text-gray-700">You agree not to use the Service to:</p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>Violate any applicable laws or regulations</li>
            <li>Provide false or misleading business information</li>
            <li>Breach confidentiality agreements or NDAs</li>
            <li>Attempt to circumvent security measures or access restrictions</li>
            <li>Use automated systems to scrape or extract data</li>
            <li>Interfere with the proper functioning of the Service</li>
            <li>Engage in fraudulent or deceptive practices</li>
            <li>Harass or harm other users</li>
          </ul>

          <Heading2 className="text-gray-900">10. Business Information Accuracy</Heading2>
          <p className="text-gray-700">
            Users are responsible for the accuracy and completeness of all business information
            shared on the platform. This includes financial data, business operations, legal status,
            and any other material information. Misrepresentation of business information may result
            in account termination and legal action.
          </p>

          <Heading2 className="text-gray-900">11. Privacy and Data Protection</Heading2>
          <p className="text-gray-700">
            We are committed to protecting your privacy and complying with applicable data
            protection laws, including GDPR. Our Privacy Policy details how we collect, use, and
            protect your personal and business information.
          </p>

          <Heading2 className="text-gray-900">12. Disclaimers and Limitation of Liability</Heading2>
          <p className="text-gray-700">
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT
            PERMITTED BY LAW, BETWEENDEALS DISCLAIMS ALL WARRANTIES AND SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES. We do not guarantee the success
            of any transaction or the accuracy of business information provided by users.
          </p>

          <Heading2 className="text-gray-900">13. Indemnification</Heading2>
          <p className="text-gray-700">
            You agree to indemnify and hold harmless betweendeals from any claims, damages, or
            expenses arising from your use of the Service, violation of these Terms, breach of
            confidentiality agreements, or infringement of any rights of another party.
          </p>

          <Heading2 className="text-gray-900">14. Termination</Heading2>
          <p className="text-gray-700">
            We may terminate or suspend your account and access to the Service at our discretion,
            with or without notice, for conduct that violates these Terms, fraudulent activity, or
            behavior harmful to other users. Upon termination, your access to confidential business
            information will be revoked.
          </p>

          <Heading2 className="text-gray-900">15. Changes to Terms</Heading2>
          <p className="text-gray-700">
            We reserve the right to modify these Terms at any time. We will notify users of
            significant changes via email or through the Service. Continued use after changes
            constitutes acceptance of the modified Terms.
          </p>

          <Heading2 className="text-gray-900">16. Governing Law and Jurisdiction</Heading2>
          <p className="text-gray-700">
            These Terms are governed by the laws of Belgium. Any disputes shall be resolved in the
            courts of Belgium, or through binding arbitration as we may elect. For EU users, EU
            consumer protection laws may also apply.
          </p>

          <Heading2 className="text-gray-900">17. Contact Information</Heading2>
          <p className="text-gray-700">For questions about these Terms, please contact us at:</p>
          <div className="ml-4 text-gray-700">
            <p>
              <strong>Email:</strong> legal@betweendeals.com
            </p>
            <p>
              <strong>Address:</strong> betweendeals, Belgium
            </p>
          </div>

          <Heading2 className="text-gray-900">18. Severability</Heading2>
          <p className="text-gray-700">
            If any provision of these Terms is found to be unenforceable, the remaining provisions
            will remain in full force and effect.
          </p>

          <Heading2 className="text-gray-900">19. Entire Agreement</Heading2>
          <p className="text-gray-700">
            These Terms, together with our Privacy Policy and any additional agreements for specific
            transactions, constitute the entire agreement between you and betweendeals regarding the
            Service.
          </p>
        </div>

        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> These Terms and Conditions are designed to provide a solid legal
            foundation for betweendeals' M&A platform. For production use, we recommend review by
            qualified legal counsel to ensure compliance with all applicable jurisdictions and
            business requirements.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default TermsAndConditions;
