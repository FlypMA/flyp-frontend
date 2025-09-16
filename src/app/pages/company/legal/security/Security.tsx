import * as React from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import {
  Shield,
  Lock,
  Eye,
  Server,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Key,
  Database,
  Wifi,
  FileText,
  Mail,
} from 'lucide-react';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';

const Security = () => {
  return (
    <>
      <SEOHead
        title="Security & Data Protection | betweendeals M&A Platform"
        description="Learn about betweendeals' comprehensive security measures, data protection protocols, and compliance standards for M&A transactions."
        keywords="data security, cybersecurity, encryption, secure platform, data protection, M&A security, business confidentiality"
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
                  Security & Data Protection
                </h1>
                <p className="text-xl text-neutral-600">
                  Enterprise-grade security for confidential M&A transactions
                </p>
              </div>

              {/* Introduction */}
              <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
                <Card className="border border-primary-200 bg-primary-50">
                  <CardBody className="p-6">
                    <p className="text-primary-800 font-medium">
                      Security is at the core of everything we do at betweendeals. As Europe's
                      leading M&A platform, we understand that business transactions involve highly
                      sensitive and confidential information that requires the highest levels of
                      protection.
                    </p>
                  </CardBody>
                </Card>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Our Security Framework
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                      <CardBody className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-green-100 rounded-full">
                            <Lock className="w-8 h-8 text-green-600" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                          End-to-End Encryption
                        </h3>
                        <p className="text-neutral-600">
                          All data is encrypted in transit and at rest using AES-256 encryption
                          standards.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                      <CardBody className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-blue-100 rounded-full">
                            <UserCheck className="w-8 h-8 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                          Multi-Factor Authentication
                        </h3>
                        <p className="text-neutral-600">
                          Required 2FA for all accounts with support for authenticator apps and SMS.
                        </p>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                      <CardBody className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-purple-100 rounded-full">
                            <Eye className="w-8 h-8 text-purple-600" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                          24/7 Monitoring
                        </h3>
                        <p className="text-neutral-600">
                          Continuous security monitoring with real-time threat detection and
                          response.
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Data Protection Measures
                  </h2>

                  <div className="space-y-6">
                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Database className="w-6 h-6 text-blue-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Data Storage & Backup
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-2 text-neutral-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>
                              Data stored in EU-based data centers (AWS Frankfurt, Azure
                              Netherlands)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Automated encrypted backups with 99.9% availability SLA</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Geographic replication for disaster recovery</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Point-in-time recovery with configurable retention periods</span>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Wifi className="w-6 h-6 text-green-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">
                            Network Security
                          </h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-2 text-neutral-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>TLS 1.3 encryption for all data in transit</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Web Application Firewall (WAF) protection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>DDoS protection and rate limiting</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Regular vulnerability scanning and penetration testing</span>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Key className="w-6 h-6 text-purple-600" />
                          <h3 className="text-xl font-semibold text-neutral-900">Access Control</h3>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-2 text-neutral-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>
                              Role-based access control (RBAC) with principle of least privilege
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Multi-factor authentication (MFA) required for all accounts</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>
                              Session management with automatic timeout and re-authentication
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Comprehensive audit logs and access monitoring</span>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Compliance & Certifications
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="border border-neutral-200">
                      <CardBody className="p-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">
                          Regulatory Compliance
                        </h3>
                        <ul className="space-y-2 text-neutral-700">
                          <li>• GDPR (General Data Protection Regulation)</li>
                          <li>• SOC 2 Type II compliance</li>
                          <li>• ISO 27001 security management</li>
                          <li>• Belgian financial services regulations</li>
                          <li>• EU data residency requirements</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardBody className="p-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">Industry Standards</h3>
                        <ul className="space-y-2 text-neutral-700">
                          <li>• PCI DSS for payment processing</li>
                          <li>• OWASP security guidelines</li>
                          <li>• NIST Cybersecurity Framework</li>
                          <li>• Cloud Security Alliance (CSA)</li>
                          <li>• Financial industry best practices</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Secure Document Management
                  </h2>

                  <Card className="border border-neutral-200 mb-6">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-orange-600" />
                        <h3 className="text-xl font-semibold text-neutral-900">
                          Virtual Data Room Features
                        </h3>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3">Document Security</h4>
                          <ul className="space-y-1 text-neutral-700">
                            <li>• End-to-end encryption for all documents</li>
                            <li>• Watermarking and download restrictions</li>
                            <li>• View-only access with screen capture protection</li>
                            <li>• Automatic document expiration</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3">Access Control</h4>
                          <ul className="space-y-1 text-neutral-700">
                            <li>• Granular permission settings per document</li>
                            <li>• NDA verification before access</li>
                            <li>• User activity tracking and audit trails</li>
                            <li>• Time-limited access with notifications</li>
                          </ul>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Infrastructure Security
                  </h2>

                  <Card className="border border-neutral-200 mb-6">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Server className="w-6 h-6 text-indigo-600" />
                        <h3 className="text-xl font-semibold text-neutral-900">
                          Cloud Infrastructure
                        </h3>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-2">
                            Amazon Web Services (AWS)
                          </h4>
                          <p className="text-neutral-700 mb-3">
                            Primary hosting on AWS with Frankfurt data centers, leveraging:
                          </p>
                          <ul className="space-y-1 text-neutral-600">
                            <li>• AWS Shield for DDoS protection</li>
                            <li>• AWS WAF for application layer security</li>
                            <li>• AWS KMS for key management</li>
                            <li>• Amazon VPC for network isolation</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-2">
                            Microsoft Azure (Secondary)
                          </h4>
                          <p className="text-neutral-700 mb-3">
                            Backup and disaster recovery with Netherlands data centers:
                          </p>
                          <ul className="space-y-1 text-neutral-600">
                            <li>• Azure Security Center monitoring</li>
                            <li>• Azure Key Vault for secrets management</li>
                            <li>• Azure Backup for data protection</li>
                            <li>• Cross-region replication</li>
                          </ul>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Incident Response</h2>
                  <p className="mb-6">
                    We maintain a comprehensive incident response plan to quickly address any
                    security concerns:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="border border-neutral-200 text-center">
                      <CardBody className="p-4">
                        <div className="text-2xl font-bold text-primary-600 mb-2">&lt; 15min</div>
                        <div className="text-sm text-neutral-600">Detection Time</div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 text-center">
                      <CardBody className="p-4">
                        <div className="text-2xl font-bold text-primary-600 mb-2">&lt; 1hr</div>
                        <div className="text-sm text-neutral-600">Response Time</div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 text-center">
                      <CardBody className="p-4">
                        <div className="text-2xl font-bold text-primary-600 mb-2">24/7</div>
                        <div className="text-sm text-neutral-600">Monitoring</div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 text-center">
                      <CardBody className="p-4">
                        <div className="text-2xl font-bold text-primary-600 mb-2">&lt; 24hr</div>
                        <div className="text-sm text-neutral-600">Customer Notification</div>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Your Security Responsibilities
                  </h2>
                  <p className="mb-4">
                    While we provide enterprise-grade security, users play a crucial role in
                    maintaining security:
                  </p>

                  <Card className="border border-orange-200 bg-orange-50">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-orange-600" />
                        <h3 className="text-lg font-semibold text-orange-900">
                          Security Best Practices
                        </h3>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <ul className="space-y-2 text-orange-800">
                        <li>• Use strong, unique passwords and enable 2FA</li>
                        <li>• Keep your devices and browsers updated</li>
                        <li>• Only access the platform from secure networks</li>
                        <li>• Log out when using shared or public computers</li>
                        <li>• Report suspicious activity immediately</li>
                        <li>• Review and verify all account notifications</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Security Updates & Communication
                  </h2>
                  <p className="mb-6">
                    We're committed to transparency about our security practices and any incidents
                    that may occur:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-neutral-200">
                      <CardBody className="p-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">Regular Updates</h3>
                        <ul className="space-y-2 text-neutral-700">
                          <li>• Monthly security newsletter</li>
                          <li>• Quarterly security reports</li>
                          <li>• Annual third-party security audits</li>
                          <li>• Platform status page updates</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200">
                      <CardBody className="p-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">
                          Incident Communication
                        </h3>
                        <ul className="space-y-2 text-neutral-700">
                          <li>• Immediate notification of any breaches</li>
                          <li>• Detailed incident reports</li>
                          <li>• Remediation steps and timeline</li>
                          <li>• Follow-up preventive measures</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                <Card className="border border-primary-200 bg-primary-50">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">
                      Security Contact
                    </h3>
                    <p className="text-primary-800 mb-4">
                      If you have security concerns, questions, or want to report a potential
                      vulnerability, please contact our security team immediately:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button color="primary" startContent={<Mail className="w-4 h-4" />}>
                        security@betweendeals.com
                      </Button>
                      <Button
                        variant="bordered"
                        className="border-primary-600 text-primary-700"
                        startContent={<AlertTriangle className="w-4 h-4" />}
                      >
                        Report Vulnerability
                      </Button>
                    </div>
                    <p className="text-sm text-primary-700 mt-4">
                      We appreciate responsible disclosure and will respond to security reports
                      within 24 hours.
                    </p>
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

export default Security;
