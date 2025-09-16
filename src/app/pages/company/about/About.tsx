import * as React from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  Globe,
  Shield,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
  Heart,
  Target,
} from 'lucide-react';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { useAuthModal } from '../../../contexts/AuthModalContext';

const About = () => {
  const navigate = useNavigate();
  const { openModal } = useAuthModal();

  const handleGetStarted = () => {
    openModal('signup');
  };

  return (
    <>
      <SEOHead {...seoData.about} />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                About betweendeals
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                The next-generation M&A platform modernizing how European SMEs buy and sell
                businesses. Launching 2025 to transform a €125B fragmented market.
              </p>
              <div className="flex justify-center">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
                  <Target className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-neutral-900">Launching Q1 2025</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Our Story */}
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
                Our Story
              </h2>

              <div className="space-y-8 text-lg text-neutral-700 leading-relaxed">
                <p>
                  betweendeals is being built to solve one of Europe's biggest business challenges:
                  the fragmented, inefficient SME M&A market. With 2.8 million SMEs across Europe
                  seeking exit strategies and a €125 billion annual market plagued by 18-24 month
                  sale cycles, we saw an opportunity to modernize an entire industry.
                </p>

                <p>
                  Our founding team combines deep M&A expertise with cutting-edge technology to
                  create the first truly digital-native M&A platform. We're not just building
                  another listing site – we're creating a complete transaction ecosystem that guides
                  businesses from initial discovery through successful deal closure.
                </p>

                <p>
                  Starting with the Belgian market in 2025, our platform will feature AI-powered
                  buyer-seller matching, advanced confidentiality controls, integrated due diligence
                  workflows, and end-to-end transaction management. Our goal is to reduce average
                  sale time by 60% while increasing deal success rates by 40%.
                </p>

                <p>
                  We're building betweendeals because every entrepreneur deserves a transparent,
                  efficient path to their next chapter – whether that's buying their first business
                  or selling the company they've spent decades building.
                </p>
              </div>
            </div>
          </div>
        </Container>

        {/* Mission & Vision */}
        <div className="bg-neutral-50 py-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="border border-neutral-200">
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Target className="w-8 h-8 text-primary-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">Our Mission</h3>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">
                      To modernize European SME M&A by building the first truly digital-native
                      platform that reduces transaction friction, eliminates inefficiencies, and
                      empowers entrepreneurs to buy and sell businesses with confidence in a
                      transparent marketplace.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200">
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-success-100 rounded-full">
                        <Heart className="w-8 h-8 text-success-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">Our Vision</h3>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">
                      To transform European M&A into a streamlined, technology-driven process where
                      entrepreneurs can discover, evaluate, and complete business transactions 60%
                      faster than traditional methods, creating a new standard for the industry.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </div>

        {/* Market Opportunity */}
        <Container>
          <div className="py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
                The Market Opportunity
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">€125B</div>
                  <div className="text-neutral-600">Annual EU SME M&A Market</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">2.8M</div>
                  <div className="text-neutral-600">SMEs Seeking Exit Strategies</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">18-24</div>
                  <div className="text-neutral-600">Average Months to Sale</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">43%</div>
                  <div className="text-neutral-600">Deals Fail Due to Process</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">60%</div>
                  <div className="text-neutral-600">Target Time Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">Q1</div>
                  <div className="text-neutral-600">2025 Launch Date</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">AI</div>
                  <div className="text-neutral-600">Powered Matching</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">100%</div>
                  <div className="text-neutral-600">Digital Native Platform</div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Our Values */}
        <div className="bg-neutral-50 py-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
                What We Stand For
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Shield className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">Trust & Security</h3>
                    </div>
                    <p className="text-neutral-700">
                      Every user is verified, every transaction is secure, and every piece of data
                      is protected with enterprise-grade security.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-success-100 rounded-full">
                        <CheckCircle className="w-6 h-6 text-success-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">Transparency</h3>
                    </div>
                    <p className="text-neutral-700">
                      Clear pricing, honest communication, and full disclosure ensure all parties
                      make informed decisions.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-warning-100 rounded-full">
                        <TrendingUp className="w-6 h-6 text-warning-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">Excellence</h3>
                    </div>
                    <p className="text-neutral-700">
                      We continuously improve our platform, tools, and services to deliver the best
                      M&A experience in Europe.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Users className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">Community</h3>
                    </div>
                    <p className="text-neutral-700">
                      We foster a supportive community of entrepreneurs, investors, and advisors
                      helping each other succeed.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-neutral-100 rounded-full">
                        <Globe className="w-6 h-6 text-neutral-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">European Focus</h3>
                    </div>
                    <p className="text-neutral-700">
                      Deep understanding of European markets, regulations, and business culture
                      across all major economies.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-success-100 rounded-full">
                        <Award className="w-6 h-6 text-success-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">Innovation</h3>
                    </div>
                    <p className="text-neutral-700">
                      Leveraging cutting-edge technology to streamline M&A processes and create new
                      opportunities for growth.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </div>

        {/* Team Section */}
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">Our Team</h2>
              <p className="text-lg text-neutral-700 mb-12 leading-relaxed">
                betweendeals is proudly run by a dedicated team of M&A professionals, technology
                experts, and business specialists based across Europe. Our diverse backgrounds in
                finance, technology, and entrepreneurship allow us to understand the unique
                challenges and opportunities in the European M&A market.
              </p>
              <p className="text-neutral-600">
                We're always looking to improve our platform and service. Whether you're looking to
                buy your first business, sell your life's work, or expand your investment portfolio,
                we're here to support your journey every step of the way.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About;
