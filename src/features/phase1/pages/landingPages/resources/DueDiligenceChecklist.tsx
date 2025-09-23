import { useAuth } from '@/app/providers/auth-provider';
import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import {
  AlertTriangle,
  Building2,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Eye,
  FileText,
  Scale,
  Shield,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DueDiligenceChecklist = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();
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
        title="Your Complete Due Diligence Guide | flyp - We've Got You Covered"
        description="Don't let due diligence overwhelm you. Our caring, step-by-step guide helps both buyers and sellers navigate the process with confidence and peace of mind."
        keywords="due diligence guide, business buying checklist, selling business preparation, M&A support, business acquisition help"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Caregiver Approach */}
        <div className="bg-gradient-to-br from-neutral-100 via-white to-calm-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-calm-100 rounded-full">
                  <Shield className="w-12 h-12 text-calm-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                Your Peace of Mind Guide
                <span className="block text-calm-600 text-3xl md:text-4xl mt-2">
                  We'll walk you through every step, together
                </span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Whether you're buying your first business or selling the one you've built with love,
                due diligence doesn't have to be overwhelming. We've created this guide to be your
                trusted companion — breaking down everything into simple, manageable steps so you
                can make decisions with confidence and clarity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Chip className="text-lg px-6 py-2 rounded-full bg-calm-100 text-calm-800 border border-calm-200">
                  Free • No pressure, just support
                </Chip>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <CheckCircle className="w-4 h-4 text-success-600" />
                  <span>Trusted by 500+ business owners</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              {/* Introduction - Caregiver Approach */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  We Understand — This Feels Big and Scary
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Whether you're selling the business you've poured your heart into or buying your
                    first company, due diligence can feel overwhelming. But here's the thing — it's
                    really just about making sure everyone knows what they're getting into. Think of
                    it like a thorough health check for a business, where we make sure everything is
                    as it should be.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="border border-calm-200 bg-calm-50 rounded-xl">
                      <CardBody className="p-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-calm-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-calm-900 mb-2">
                              For Buyers: Your Protection
                            </h4>
                            <p className="text-calm-800">
                              This process protects you from nasty surprises. It's like having a
                              trusted friend help you check everything before you make one of the
                              biggest decisions of your life.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="border border-accent-200 bg-accent-50 rounded-xl">
                      <CardBody className="p-6">
                        <div className="flex items-start gap-3">
                          <Shield className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-accent-900 mb-2">
                              For Sellers: Your Peace of Mind
                            </h4>
                            <p className="text-accent-800">
                              When you're prepared and organized, the process goes smoothly. This
                              checklist helps you show your business in its best light and find the
                              right buyer.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <Card className="border border-neutral-200 bg-neutral-50 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <Users className="w-6 h-6 text-neutral-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-2">
                            Remember: You're Not Alone
                          </h4>
                          <p className="text-neutral-800">
                            Most people work with professionals for the technical parts —
                            accountants, lawyers, business advisors. This guide helps you understand
                            what should be covered, so you can ask the right questions and feel
                            confident in your decisions.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Benefits Grid - Caregiver Messaging */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow rounded-xl">
                  <CardBody className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-calm-100 rounded-full">
                        <Shield className="w-8 h-8 text-calm-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      Sleep Better at Night
                    </h3>
                    <p className="text-neutral-600">
                      No more wondering "what if I missed something?" This process helps you uncover
                      any issues upfront, so you can make decisions with confidence and peace of
                      mind.
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
                      Know You're Getting Fair Value
                    </h3>
                    <p className="text-neutral-600">
                      Whether you're buying or selling, this process ensures everyone understands
                      the true value of what's being exchanged. No surprises, just honest,
                      transparent dealings.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow rounded-xl">
                  <CardBody className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-accent-100 rounded-full">
                        <Eye className="w-8 h-8 text-accent-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      Build a Strong Foundation
                    </h3>
                    <p className="text-neutral-600">
                      Understanding every aspect of the business helps you plan for success. You'll
                      know exactly what you're working with and how to make it even better.
                    </p>
                  </CardBody>
                </Card>
              </div>

              {/* Process Timeline */}
              <Card className="border border-neutral-200 mb-16 rounded-xl">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    What to Expect: Your Journey Step by Step
                  </h3>
                  <p className="text-neutral-600 mt-2">
                    Every business is different, but here's a typical timeline so you know what to
                    expect. Remember, we're here to guide you through each step.
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Getting Ready</h4>
                      <p className="text-sm text-neutral-600">1-2 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Signing agreements, gathering your team, and making initial requests
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Deep Dive</h4>
                      <p className="text-sm text-neutral-600">4-8 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Reviewing documents, analyzing data, and having conversations with key
                        people
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Making Sense</h4>
                      <p className="text-sm text-neutral-600">2-3 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Putting everything together, understanding risks, and adjusting expectations
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center text-white font-bold">
                          4
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Moving Forward</h4>
                      <p className="text-sm text-neutral-600">1-2 weeks</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Final report, making your decision, and working out the details
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Due Diligence Categories */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
                  Your Complete Checklist
                </h2>
                <p className="text-lg text-neutral-600 mb-8 text-center max-w-3xl mx-auto">
                  Don't worry — you don't need to tackle everything at once. This checklist is here
                  to guide you, not overwhelm you. Take it step by step, and remember that most
                  people work with professionals for the technical parts.
                </p>

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
                    <h3 className="text-2xl font-bold text-red-900">Things to Watch Out For</h3>
                  </div>
                  <p className="text-red-800 mt-2">
                    Don't panic — these are just things to be aware of. Most issues can be resolved
                    or factored into the deal. The key is knowing about them upfront.
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-900 mb-3">Financial Concerns</h4>
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
                      <h4 className="font-semibold text-red-900 mb-3">Operational Concerns</h4>
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

              {/* CTA Section - Caregiver Approach */}
              <Card className="border border-calm-200 bg-gradient-to-r from-calm-50 to-calm-100 rounded-xl">
                <CardBody className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-calm-900 mb-4">
                    You Don't Have to Do This Alone
                  </h2>
                  <p className="text-calm-800 mb-6 max-w-2xl mx-auto">
                    This checklist is a great starting point, but we know every business and every
                    situation is unique. If you're looking at a specific opportunity and want
                    someone experienced to walk through it with you, we're here to help. No
                    judgment, no pressure — just genuine support from people who understand what
                    you're going through.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" size="lg" onPress={() => navigate('/contact')}>
                      Talk to our team
                    </Button>
                    <Button variant="secondary" size="lg" onPress={() => navigate('/search')}>
                      Browse businesses
                    </Button>
                  </div>
                  <p className="text-sm text-calm-700 mt-4">
                    We've helped hundreds of business owners through this process. Let us help you
                    too.
                  </p>
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
