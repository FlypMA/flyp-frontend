import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Download, Eye, FileText, Lock, Mail, Shield, UserCheck } from 'lucide-react';

const GdprCompliance = () => {
  return (
    <>
      <SEOHead
        title="GDPR Compliance | Data Protection | UpSwitch"
        description="Learn about UpSwitch' commitment to GDPR compliance and data protection. Your rights under GDPR and how we protect your personal data."
        keywords="GDPR compliance, data protection, privacy rights, personal data, EU regulation, data security"
      />

      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary-100 rounded-full">
                    <Shield className="w-12 h-12 text-primary-600" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  GDPR Compliance
                </h1>
                <p className="text-xl text-neutral-600">
                  Your data protection rights and our compliance commitment
                </p>
              </div>

              {/* Introduction */}
              <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
                <Card className="border border-primary-200 bg-primary-50">
                  <CardBody className="p-6">
                    <p className="text-primary-800 font-medium">
                      UpSwitch is fully committed to compliance with the General Data Protection
                      Regulation (GDPR) and protecting the privacy rights of all users within the
                      European Union and European Economic Area.
                    </p>
                  </CardBody>
                </Card>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our GDPR Commitment</h2>
                  <p>
                    As a European M&A platform, we take data protection seriously and have
                    implemented comprehensive measures to ensure full GDPR compliance. We process
                    personal data lawfully, transparently, and for specific, legitimate purposes
                    only.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Your Rights Under GDPR
                  </h2>

                  <div className="space-y-6">
                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Eye className="w-6 h-6 text-primary-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Right to be Informed
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700">
                          You have the right to know how your personal data is collected, used,
                          stored, and shared. This information is detailed in our Privacy Policy and
                          data processing notices.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-green-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Right of Access
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700">
                          You can request a copy of the personal data we hold about you, including
                          information about how it's processed. We'll provide this information in a
                          commonly used electronic format.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-6 h-6 text-purple-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Right to Rectification
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700">
                          If your personal data is inaccurate or incomplete, you have the right to
                          have it corrected. You can update most information directly through your
                          account settings.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Right to Erasure
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700">
                          Also known as the "right to be forgotten," you can request that we delete
                          your personal data in certain circumstances, such as when it's no longer
                          necessary for the original purpose.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Lock className="w-6 h-6 text-orange-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Right to Restrict Processing
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700">
                          You can request that we limit how we use your personal data in specific
                          circumstances, such as when you contest the accuracy of the data or object
                          to processing.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Download className="w-6 h-6 text-indigo-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Right to Data Portability
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700">
                          You can request that we transfer your personal data to another service
                          provider in a structured, commonly used, and machine-readable format.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Right to Object
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700">
                          You can object to the processing of your personal data for direct
                          marketing purposes or when processing is based on legitimate interests.
                          You can opt out of marketing communications at any time.
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    How We Protect Your Data
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="border border-neutral-200">
                      <CardBody className="p-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">Technical Measures</h3>
                        <ul className="space-y-2 text-neutral-700">
                          <li>• End-to-end encryption for sensitive data</li>
                          <li>• Secure cloud infrastructure (AWS/Azure)</li>
                          <li>• Regular security audits and penetration testing</li>
                          <li>• Multi-factor authentication</li>
                          <li>• Automated backup and disaster recovery</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardBody className="p-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">
                          Organizational Measures
                        </h3>
                        <ul className="space-y-2 text-neutral-700">
                          <li>• Staff training on data protection</li>
                          <li>• Data processing agreements with vendors</li>
                          <li>• Privacy by design and by default</li>
                          <li>• Regular compliance reviews</li>
                          <li>• Incident response procedures</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Legal Basis for Processing
                  </h2>
                  <p className="mb-4">
                    We process personal data based on one or more of the following legal bases:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      • <strong>Contract:</strong> To fulfill our contractual obligations to you
                    </li>
                    <li>
                      • <strong>Consent:</strong> Where you have explicitly agreed to specific
                      processing
                    </li>
                    <li>
                      • <strong>Legitimate Interest:</strong> For our business operations and
                      service improvement
                    </li>
                    <li>
                      • <strong>Legal Obligation:</strong> To comply with applicable laws and
                      regulations
                    </li>
                    <li>
                      • <strong>Vital Interest:</strong> To protect your vital interests or those of
                      others
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Transfers</h2>
                  <p className="mb-4">
                    When we transfer personal data outside the EU/EEA, we ensure adequate protection
                    through:
                  </p>
                  <ul className="space-y-2">
                    <li>• Adequacy decisions by the European Commission</li>
                    <li>• Standard Contractual Clauses (SCCs)</li>
                    <li>• Certification schemes and codes of conduct</li>
                    <li>• Binding Corporate Rules (BCRs) where applicable</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Retention</h2>
                  <p className="mb-4">
                    We retain personal data only for as long as necessary for the purposes for which
                    it was collected:
                  </p>
                  <div className="bg-neutral-50 p-6 rounded-lg">
                    <ul className="space-y-2">
                      <li>
                        • <strong>Account data:</strong> Until account deletion + 30 days
                      </li>
                      <li>
                        • <strong>Transaction records:</strong> 7 years (legal requirement)
                      </li>
                      <li>
                        • <strong>Marketing data:</strong> Until consent withdrawal + 30 days
                      </li>
                      <li>
                        • <strong>Support tickets:</strong> 3 years after case closure
                      </li>
                      <li>
                        • <strong>Analytics data:</strong> 26 months (anonymized)
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Exercising Your Rights
                  </h2>
                  <p className="mb-4">To exercise any of your GDPR rights, you can:</p>
                  <div className="space-y-4">
                    <div className="bg-neutral-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-neutral-900 mb-3">
                        Contact Our Data Protection Officer
                      </h3>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary-600" />
                        <span>dpo@upswitch.com</span>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-neutral-900 mb-3">
                        Use Your Account Settings
                      </h3>
                      <p className="text-neutral-700">
                        Access, update, or delete much of your personal data directly through your
                        account dashboard.
                      </p>
                    </div>

                    <div className="bg-neutral-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-neutral-900 mb-3">
                        Submit a Formal Request
                      </h3>
                      <p className="text-neutral-700">
                        Send us a detailed request via email. We'll respond within 30 days and may
                        need to verify your identity for security purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Complaints and Supervisory Authority
                  </h2>
                  <p className="mb-4">
                    If you believe we have not complied with GDPR requirements, you have the right
                    to:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li>• Contact us directly to resolve the issue</li>
                    <li>• Lodge a complaint with your local supervisory authority</li>
                    <li>
                      • Contact the Belgian Data Protection Authority (our lead supervisory
                      authority)
                    </li>
                  </ul>

                  <Card className="border border-neutral-200 bg-neutral-50">
                    <CardBody className="p-6">
                      <h3 className="font-semibold text-neutral-900 mb-3">
                        Belgian Data Protection Authority
                      </h3>
                      <div className="text-neutral-700">
                        <p>
                          Website:{' '}
                          <a
                            href="https://www.autoriteprotectiondonnees.be"
                            className="text-primary-600 hover:underline"
                          >
                            autoriteprotectiondonnees.be
                          </a>
                        </p>
                        <p>Address: Rue de la Presse, 35, 1000 Brussels, Belgium</p>
                        <p>Phone: +32 (0)2 274 48 00</p>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <Card className="border border-primary-200 bg-primary-50">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">
                      Updates to Our GDPR Compliance
                    </h3>
                    <p className="text-primary-800 mb-4">
                      We continuously review and update our data protection practices to ensure
                      ongoing GDPR compliance. Any material changes will be communicated through our
                      website and directly to affected users.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="primary" startContent={<FileText className="w-4 h-4" />}>
                        View Privacy Policy
                      </Button>
                      <Button
                        variant="tertiary"
                        className="border-primary-600 text-primary-700"
                        startContent={<Mail className="w-4 h-4" />}
                      >
                        Contact DPO
                      </Button>
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

export default GdprCompliance;
