import * as React from 'react';
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  TrendingUp,
  Building2,
  Euro,
  BarChart,
  Target,
  CheckCircle,
  ArrowRight,
  FileText,
  PieChart,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { useAuth } from '@/app/providers/auth-provider';

const ValuationGuide = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();

  return (
    <>
      <SEOHead
        title="Business Valuation Guide | betweendeals M&A Platform"
        description="Complete guide to business valuation for M&A transactions. Learn valuation methods, multiples, and how to value your SME business for sale in Europe."
        keywords="business valuation, company valuation, M&A valuation, EBITDA multiples, discounted cash flow, business worth, SME valuation"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-100 rounded-full">
                  <Calculator className="w-12 h-12 text-primary-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                Business Valuation Guide
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Learn how to accurately value your business for M&A transactions. Comprehensive
                guide covering all major valuation methods and industry best practices.
              </p>
              <div className="flex justify-center">
                <Chip color="primary" variant="flat" className="text-lg px-6 py-2 rounded-full">
                  Free Expert Guide
                </Chip>
              </div>
            </div>
          </Container>
        </div>

        {/* Table of Contents */}
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              <Card className="border border-neutral-200 mb-12 rounded-xl">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-neutral-900">Table of Contents</h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: '1. Introduction to Business Valuation', icon: FileText },
                      { title: '2. Revenue Multiple Method', icon: TrendingUp },
                      { title: '3. EBITDA Multiple Method', icon: BarChart },
                      { title: '4. Discounted Cash Flow (DCF)', icon: Calculator },
                      { title: '5. Asset-Based Valuation', icon: Building2 },
                      { title: '6. Industry-Specific Multiples', icon: Target },
                      { title: '7. Valuation Adjustments', icon: PieChart },
                      { title: '8. Market Comparables', icon: Briefcase },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary-600" />
                        <span className="text-neutral-700">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Introduction */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  1. Introduction to Business Valuation
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Business valuation is both an art and a science. It involves determining the
                    economic value of a business using various financial metrics, market conditions,
                    and industry-specific factors. For M&A transactions, accurate valuation is
                    crucial for both buyers and sellers to ensure fair pricing and successful deals.
                  </p>

                  <Card className="border border-primary-200 bg-primary-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-2">Key Point</h4>
                          <p className="text-primary-800">
                            Multiple valuation methods should always be used together to arrive at a
                            comprehensive and accurate business value range.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    Why Accurate Valuation Matters
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span>Ensures fair pricing for both buyers and sellers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span>Facilitates faster deal closure and negotiations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span>Reduces risk of valuation disputes during due diligence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span>Helps secure financing and investor interest</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Revenue Multiple Method */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  2. Revenue Multiple Method
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    The Revenue Multiple Method values a business based on its annual revenue
                    multiplied by an industry-specific multiple. This method is particularly useful
                    for businesses with strong revenue growth or in industries where revenue is a
                    key value driver.
                  </p>

                  <Card className="border border-neutral-200 mb-6 rounded-xl">
                    <CardHeader>
                      <h4 className="text-lg font-semibold text-neutral-900">Formula</h4>
                    </CardHeader>
                    <CardBody>
                      <div className="bg-neutral-100 p-4 rounded-xl text-center">
                        <code className="text-lg font-mono text-neutral-900">
                          Business Value = Annual Revenue × Revenue Multiple
                        </code>
                      </div>
                    </CardBody>
                  </Card>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    Typical Revenue Multiples by Industry
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Technology/SaaS</span>
                          <span className="text-primary-600 font-bold">3-8x</span>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Professional Services</span>
                          <span className="text-primary-600 font-bold">1-3x</span>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Manufacturing</span>
                          <span className="text-primary-600 font-bold">0.5-2x</span>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Retail/E-commerce</span>
                          <span className="text-primary-600 font-bold">0.5-1.5x</span>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>

              {/* EBITDA Multiple Method */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  3. EBITDA Multiple Method & Sector Expansion
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    The EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)
                    multiple method is one of the most widely used valuation approaches in M&A. It
                    provides a clearer view of operational performance by removing the effects of
                    financing and accounting decisions.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      🔍 What are Multiples?
                    </h3>
                    <p className="text-blue-700 mb-4">
                      <strong>
                        Multiples are financial ratios used to determine company value by comparing
                        to similar companies or transactions.
                      </strong>
                      They provide a market-based approach to valuation by analyzing what investors
                      are willing to pay for companies with similar characteristics.
                    </p>
                    <p className="text-blue-700">
                      A common multiple is the EBITDA multiple, where enterprise value is divided by
                      EBITDA. This multiple varies significantly across sectors due to differences
                      in growth rates, profitability patterns, capital requirements, and market
                      dynamics.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-amber-800 mb-4">
                      📊 Sector Expansion for Multiples (Uitbreiding Sectoren)
                    </h3>
                    <p className="text-amber-700 mb-4">
                      The "expansion of sectors" in multiples refers to applying the multiple-method
                      to companies active in sectors where fewer comparable, traded companies exist.
                      This requires more research and adjustment of multiples to account for
                      sector-specific characteristics.
                    </p>
                    <p className="text-amber-700 mb-4">
                      <strong>High-Growth Sectors like SaaS:</strong> Sectors with significant
                      market potential and high profitability, such as fast-growing
                      software-as-a-service (SaaS) companies, often command higher multiples due to:
                    </p>
                    <ul className="text-amber-700 space-y-2 ml-6">
                      <li>
                        • <strong>Predictable Revenue:</strong> Recurring subscription models
                        provide stable cash flows
                      </li>
                      <li>
                        • <strong>Scalability:</strong> Low marginal costs for additional customers
                      </li>
                      <li>
                        • <strong>Customer Metrics:</strong> Low churn rates and high lifetime value
                        (LTV)
                      </li>
                      <li>
                        • <strong>Growth Efficiency:</strong> Favorable customer acquisition cost
                        (CAC) to LTV ratios
                      </li>
                      <li>
                        • <strong>Market Position:</strong> First-mover advantages and network
                        effects
                      </li>
                    </ul>
                  </div>

                  <Card className="border border-neutral-200 mb-6 rounded-xl">
                    <CardHeader>
                      <h4 className="text-lg font-semibold text-neutral-900">Formula</h4>
                    </CardHeader>
                    <CardBody>
                      <div className="bg-neutral-100 p-4 rounded-xl text-center mb-4">
                        <code className="text-lg font-mono text-neutral-900">
                          Business Value = EBITDA × EBITDA Multiple
                        </code>
                      </div>
                      <div className="text-sm text-neutral-600">
                        <p>
                          <strong>EBITDA</strong> = Net Income + Interest + Taxes + Depreciation +
                          Amortization
                        </p>
                      </div>
                    </CardBody>
                  </Card>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    EBITDA Multiples by Business Size (Revenue & EBITDA Analysis)
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Revenue & EBITDA Relationship:</strong> While revenue shows business
                      scale, EBITDA reveals operational efficiency. Both metrics are essential -
                      revenue indicates market size and growth potential, while EBITDA demonstrates
                      profitability and cash generation capability.
                    </p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Micro Businesses (€0-1M revenue)</span>
                          <span className="text-primary-600 font-bold">2-4x EBITDA</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Typically owner-operated with limited scalability
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Small Businesses (€1-10M revenue)</span>
                          <span className="text-primary-600 font-bold">3-6x EBITDA</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Established operations with some management depth
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Medium Businesses (€10-50M revenue)</span>
                          <span className="text-primary-600 font-bold">4-8x EBITDA</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Professional management and scalable operations
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Large Businesses (€50M+ revenue)</span>
                          <span className="text-primary-600 font-bold">6-12x EBITDA</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Institutional quality with strong market position
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    Practical Valuation Example
                  </h3>
                  <Card className="border border-neutral-200 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="bg-neutral-50 p-4 rounded-xl mb-4">
                        <h4 className="font-semibold text-neutral-900 mb-2">Sample Business</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>
                              <strong>Annual Revenue:</strong> €5,000,000
                            </p>
                            <p>
                              <strong>EBITDA:</strong> €1,700,000
                            </p>
                            <p>
                              <strong>Industry:</strong> Professional Services
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Revenue Multiple:</strong> 2.0x
                            </p>
                            <p>
                              <strong>EBITDA Multiple:</strong> 5.5x
                            </p>
                            <p>
                              <strong>Growth Rate:</strong> 15% annually
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-primary-50 rounded-xl">
                          <span className="font-medium">Revenue Multiple (2.0x):</span>
                          <span className="text-primary-600 font-bold">€10.0M</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-success-50 rounded-xl">
                          <span className="font-medium">EBITDA Multiple (5.5x):</span>
                          <span className="text-success-600 font-bold">€9.4M</span>
                        </div>
                        <div className="text-sm text-neutral-600 mt-4 p-3 bg-amber-50 rounded-xl">
                          <strong>Note:</strong> In this case, the EBITDA multiple method provides a
                          more accurate valuation as it accounts for the business's profitability
                          and operational efficiency, which is crucial for professional services
                          companies.
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Valuation Adjustments */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  7. Valuation Adjustments
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Raw valuation multiples often need adjustments based on specific business
                    characteristics, market conditions, and risk factors. These adjustments can
                    significantly impact the final business value.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardHeader>
                        <h3 className="text-lg font-semibold text-neutral-900">Value Enhancers</h3>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <span className="text-sm">Recurring revenue streams</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <span className="text-sm">Strong management team</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <span className="text-sm">Diversified customer base</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <span className="text-sm">Proprietary technology/IP</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <span className="text-sm">Scalable business model</span>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200 rounded-xl">
                      <CardHeader>
                        <h3 className="text-lg font-semibold text-neutral-900">Value Detractors</h3>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                            <span className="text-sm">Customer concentration risk</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                            <span className="text-sm">Owner dependency</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                            <span className="text-sm">Declining market trends</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                            <span className="text-sm">Outdated technology/equipment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                            <span className="text-sm">Regulatory/legal issues</span>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <Card className="border border-primary-200 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
                <CardBody className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-primary-900 mb-4">
                    Need Professional Valuation Services?
                  </h2>
                  <p className="text-primary-800 mb-6 max-w-2xl mx-auto">
                    Our network of certified business appraisers and M&A professionals can provide
                    detailed valuations for your business. Get started with a free consultation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      color="primary"
                      size="lg"
                      className="rounded-xl font-semibold"
                      onPress={() => openModal('signup')}
                    >
                      Get Free Valuation
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

export default ValuationGuide;
