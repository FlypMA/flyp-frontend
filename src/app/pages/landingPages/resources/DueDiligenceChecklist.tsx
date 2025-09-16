import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  FileText,
  Shield,
  DollarSign,
  Users,
  Building2,
  Scale,
  TrendingUp,
  AlertTriangle,
  Download,
  ArrowRight,
  Clock,
  Target,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { useAuthModal } from '@/app/contexts/AuthModalContext';

const DueDiligenceChecklist = () => {
  const navigate = useNavigate();
  const { openModal } = useAuthModal();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const dueDiligenceCategories = [
    {
      id: 'financial',
      title: 'Financial Due Diligence',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      items: [
        'Audited financial statements for past 3-5 years',
        'Monthly management accounts for current year',
        'Cash flow statements and projections',
        'Revenue breakdown by product/service and customer',
        'Working capital analysis',
        'Debt schedules and loan agreements',
        'Tax returns and compliance records',
        'Accounts receivable aging',
        'Inventory analysis and valuation',
        'Capital expenditure history and plans',
      ],
    },
    {
      id: 'legal',
      title: 'Legal Due Diligence',
      icon: Scale,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      items: [
        'Corporate structure and ownership documents',
        'Material contracts and agreements',
        'Intellectual property portfolio',
        'Employment agreements and HR policies',
        'Litigation history and pending cases',
        'Regulatory compliance records',
        'Real estate leases and property deeds',
        'Insurance policies and coverage',
        'Permits and licenses',
        'Environmental compliance certificates',
      ],
    },
    {
      id: 'operational',
      title: 'Operational Due Diligence',
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      items: [
        'Organization chart and key personnel',
        'Business model and value proposition',
        'Competitive analysis and market position',
        'Supplier relationships and contracts',
        'Customer analysis and retention rates',
        'IT systems and technology infrastructure',
        'Quality control and operational procedures',
        'Key performance indicators (KPIs)',
        'Operational risk assessment',
        'Succession planning documentation',
      ],
    },
    {
      id: 'commercial',
      title: 'Commercial Due Diligence',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      items: [
        'Market size and growth projections',
        'Customer segmentation and analysis',
        'Sales pipeline and conversion rates',
        'Marketing strategy and channels',
        'Brand strength and recognition',
        'Competitive landscape analysis',
        'Pricing strategy and elasticity',
        'Distribution channels and partnerships',
        'Market entry barriers and opportunities',
        'Customer satisfaction and loyalty metrics',
      ],
    },
    {
      id: 'technical',
      title: 'Technical Due Diligence',
      icon: FileText,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      items: [
        'Technology stack and architecture review',
        'Software licenses and compliance',
        'Data security and privacy measures',
        'System performance and scalability',
        'Technical debt assessment',
        'Integration capabilities and APIs',
        'Disaster recovery and backup systems',
        'Cybersecurity vulnerabilities',
        'Mobile and web application quality',
        'Third-party service dependencies',
      ],
    },
    {
      id: 'hr',
      title: 'HR Due Diligence',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      items: [
        'Employee contracts and handbooks',
        'Compensation and benefits structure',
        'Organizational culture assessment',
        'Key personnel retention plans',
        'Training and development programs',
        'Performance management systems',
        'Employee satisfaction surveys',
        'Labor law compliance',
        'Union relationships and agreements',
        'Succession planning for key roles',
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <>
      <SEOHead
        title="Due Diligence Checklist | betweendeals M&A Platform"
        description="Comprehensive due diligence checklist for M&A transactions. Cover financial, legal, operational, and commercial aspects to ensure successful deals."
        keywords="due diligence, M&A checklist, financial due diligence, legal due diligence, operational due diligence, business acquisition"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-100 rounded-full">
                  <Shield className="w-12 h-12 text-primary-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                Due Diligence Checklist
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Comprehensive checklist covering all essential aspects of business due diligence.
                Ensure thorough investigation before completing your M&A transaction.
              </p>
              <div className="flex justify-center">
                <Chip color="primary" variant="flat" className="text-lg px-6 py-2 rounded-full">
                  Professional Guide
                </Chip>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Why Due Diligence Matters
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Due diligence is the comprehensive investigation of a business before completing
                    an M&A transaction. It helps identify risks, validate assumptions, and ensure
                    you're making an informed investment decision.
                  </p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow rounded-xl">
                  <CardBody className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Shield className="w-8 h-8 text-primary-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Risk Mitigation</h3>
                    <p className="text-neutral-600">
                      Identify potential risks, liabilities, and red flags before completing the
                      transaction to avoid costly surprises.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow rounded-xl">
                  <CardBody className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-success-100 rounded-full">
                        <Target className="w-8 h-8 text-success-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      Value Validation
                    </h3>
                    <p className="text-neutral-600">
                      Confirm the business valuation and ensure you're paying a fair price based on
                      accurate financial information.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow rounded-xl">
                  <CardBody className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-warning-100 rounded-full">
                        <Eye className="w-8 h-8 text-warning-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      Strategic Insights
                    </h3>
                    <p className="text-neutral-600">
                      Understand the business deeply to develop effective integration plans and
                      growth strategies post-acquisition.
                    </p>
                  </CardBody>
                </Card>
              </div>

              {/* Process Timeline */}
              <Card className="border border-neutral-200 mb-16 rounded-xl">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Typical Due Diligence Timeline
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Preparation</h4>
                      <p className="text-sm text-neutral-600">1-2 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        NDA signing, team assembly, initial document request
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Investigation</h4>
                      <p className="text-sm text-neutral-600">4-8 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Document review, analysis, management interviews
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Analysis</h4>
                      <p className="text-sm text-neutral-600">2-3 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Findings compilation, risk assessment, valuation adjustment
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center text-white font-bold">
                          4
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Decision</h4>
                      <p className="text-sm text-neutral-600">1-2 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Final report, go/no-go decision, price negotiation
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Due Diligence Categories */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                  Complete Due Diligence Checklist
                </h2>

                <div className="space-y-4">
                  {dueDiligenceCategories.map(category => {
                    const isExpanded = expandedCategories.has(category.id);

                    return (
                      <Card
                        key={category.id}
                        className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
                      >
                        <CardBody className="p-0">
                          {/* Accordion Header */}
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-inset"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 ${category.bgColor} rounded-xl flex-shrink-0`}>
                                  <category.icon className={`w-6 h-6 ${category.color}`} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                    {category.title}
                                  </h3>
                                  <p className="text-sm text-neutral-500">
                                    {category.items.length} essential items
                                  </p>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ml-4">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-neutral-400 transition-transform" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform" />
                                )}
                              </div>
                            </div>
                          </button>

                          {/* Accordion Content */}
                          {isExpanded && (
                            <div className="px-6 pb-6 border-t border-gray-100">
                              <div className="pt-4">
                                <div className="grid grid-cols-1 gap-3">
                                  {category.items.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                      <div className="mt-1 flex-shrink-0">
                                        <CheckSquare className="w-4 h-4 text-success-600" />
                                      </div>
                                      <span className="text-neutral-700 text-sm leading-relaxed">
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Red Flags Section */}
              <Card className="border border-red-200 bg-red-50 mb-16 rounded-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="text-2xl font-bold text-red-900">
                      Common Red Flags to Watch For
                    </h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-900 mb-3">Financial Red Flags</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">
                            Declining revenue or profitability trends
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">
                            Unusual accounting practices or restatements
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">
                            High customer concentration (&gt;20% from single customer)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">
                            Significant related-party transactions
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-900 mb-3">Operational Red Flags</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">
                            High employee turnover, especially in key positions
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">
                            Pending litigation or regulatory issues
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">Outdated technology or equipment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-red-800">
                            Lack of documented processes or procedures
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* CTA Section */}
              <Card className="border border-primary-200 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
                <CardBody className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-primary-900 mb-4">
                    Need Professional Due Diligence Support?
                  </h2>
                  <p className="text-primary-800 mb-6 max-w-2xl mx-auto">
                    Our network of certified due diligence professionals can help you conduct
                    thorough investigations and provide expert analysis for your M&A transaction.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      color="primary"
                      size="lg"
                      className="rounded-xl font-semibold"
                      onPress={() => openModal('signup')}
                    >
                      Get Expert Support
                    </Button>
                    <Button
                      variant="bordered"
                      size="lg"
                      className="border-2 border-primary-600 text-primary-700 rounded-xl font-semibold"
                      onPress={() => navigate('/contact')}
                    >
                      Contact Expert
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DueDiligenceChecklist;
