/**
 * flyp Help Center
 * Clean, modular implementation with new FAQ system
 */

import { Button } from '@/shared/components/buttons';
import { FAQCategory } from '@/shared/components/FAQ/FAQCategory';
import { Input } from '@/shared/components/forms';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { Card, CardBody } from '@heroui/react';
import {
    BookOpen,
    Building2,
    Clock,
    DollarSign,
    FileText,
    HelpCircle,
    Mail,
    MessageCircle,
    Phone,
    Search,
    Settings,
    Shield,
    Star,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Custom FAQ type for this page
interface FAQCategoryType {
  id: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  questions: Array<{
    question: string;
    answer: string;
    tags?: string[];
    isPopular?: boolean;
    isNew?: boolean;
  }>;
}

interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  availability?: string;
  responseTime?: string;
  color: string;
}

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // FAQ Categories Data
  const faqCategories: FAQCategoryType[] = [
    {
      id: 'getting-started',
      category: 'Getting Started',
      description: 'Essential information to help you begin your journey on flyp',
      icon: <Star className="w-6 h-6" />,
      color: 'blue',
      questions: [
        {
          question: 'What is flyp and how does it work?',
          answer:
            "flyp is Belgium's premier digital marketplace for buying and selling established businesses. We connect entrepreneurs, business owners, and investors through our secure, AI-powered platform. Our comprehensive system handles listing creation, buyer-seller matching, due diligence support, secure communications, and transaction facilitation - making business acquisitions faster, safer, and more efficient.",
          tags: ['platform', 'overview', 'marketplace'],
          isPopular: true,
        },
        {
          question: 'How do I create an account on flyp?',
          answer:
            'Creating an account is simple: Click "Sign Up" on our homepage, provide your email and basic information, verify your email address, and complete your profile. For sellers, we require additional business verification to ensure marketplace quality.',
          tags: ['registration', 'account', 'signup'],
          isNew: true,
        },
        {
          question: 'Is flyp free to use?',
          answer:
            'flyp offers a freemium model. Basic browsing and initial contact with sellers is free for buyers. For sellers, listing your business is free, but we charge a success fee only when your business sells. Premium features like enhanced visibility and advanced analytics require a subscription.',
          tags: ['pricing', 'free', 'subscription'],
        },
        {
          question: 'What types of businesses can I find on flyp?',
          answer:
            'Our platform features a diverse range of established businesses including restaurants, retail stores, tech companies, service businesses, manufacturing operations, and more. All listings are verified and represent legitimate business opportunities in Belgium and beyond.',
          tags: ['business-types', 'listings', 'variety'],
        },
      ],
    },
    {
      id: 'buying-business',
      category: 'Buying a Business',
      description: 'Everything you need to know about finding and purchasing your ideal business',
      icon: <Building2 className="w-6 h-6" />,
      color: 'green',
      questions: [
        {
          question: 'How do I search for businesses to buy?',
          answer:
            'Use our advanced search filters to find businesses by industry, location, price range, revenue, and more. You can save searches, set up alerts for new listings, and use our AI-powered recommendation engine to discover opportunities that match your criteria.',
          tags: ['search', 'filters', 'discovery'],
        },
        {
          question: 'What information do business listings include?',
          answer:
            'Our listings provide comprehensive business information including financial summaries, operational details, market position, growth potential, asset information, and verified performance metrics. Premium listings include detailed financial statements and due diligence reports.',
          tags: ['listings', 'information', 'details'],
        },
        {
          question: 'How do I contact a business seller?',
          answer:
            'After viewing a listing, click "Contact Seller" to send a message through our secure platform. You\'ll need to sign an NDA for detailed financial information. All communications are tracked and secure, ensuring privacy for both parties.',
          tags: ['contact', 'sellers', 'communication'],
          isPopular: true,
        },
        {
          question: 'What is the due diligence process?',
          answer:
            'Our platform provides a structured due diligence framework including financial verification, legal document review, operational assessment, and market analysis. We connect you with verified professionals including accountants, lawyers, and business advisors to ensure thorough evaluation.',
          tags: ['due-diligence', 'verification', 'analysis'],
        },
        {
          question: 'How does financing work for business purchases?',
          answer:
            'flyp partners with banks and alternative lenders to offer various financing options including SBA loans, asset-based financing, and seller financing. Our financing partners are pre-qualified and understand business acquisitions.',
          tags: ['financing', 'loans', 'funding'],
        },
      ],
    },
    {
      id: 'selling-business',
      category: 'Selling a Business',
      description: 'Guide to successfully listing and selling your business on our platform',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      questions: [
        {
          question: 'How do I list my business for sale?',
          answer:
            'Start with our seller onboarding process: complete business verification, provide financial documents, describe your operations, set your asking price, and publish your listing. Our team reviews all listings to ensure quality and accuracy.',
          tags: ['listing', 'selling', 'onboarding'],
          isPopular: true,
        },
        {
          question: 'What documents do I need to sell my business?',
          answer:
            'Essential documents include 3 years of financial statements, tax returns, legal structure documents, key contracts, asset lists, and operational procedures. Our platform provides a comprehensive checklist to ensure you have everything needed.',
          tags: ['documents', 'requirements', 'paperwork'],
        },
        {
          question: 'How do you determine the value of my business?',
          answer:
            'We provide a free AI-powered business valuation using multiple methodologies including revenue multiples, asset valuation, and market comparisons. Professional appraisers are available for detailed valuations.',
          tags: ['valuation', 'pricing', 'assessment'],
        },
        {
          question: 'How long does it take to sell a business?',
          answer:
            'Average time to sale varies by industry and price range, typically 3-12 months. Factors affecting timeline include business performance, asking price, market conditions, and seller flexibility. Well-prepared listings with complete documentation sell faster.',
          tags: ['timeline', 'process', 'duration'],
        },
        {
          question: 'What are your fees for selling?',
          answer:
            'flyp charges a success fee only when your business sells, typically 3-8% depending on transaction size. No upfront fees, no monthly charges. Additional services like professional valuation or marketing upgrades have separate fees.',
          tags: ['fees', 'commission', 'pricing'],
          isNew: true,
        },
      ],
    },
    {
      id: 'platform-features',
      category: 'Platform Features',
      description: 'Discover all the tools and features available on flyp',
      icon: <Zap className="w-6 h-6" />,
      color: 'orange',
      questions: [
        {
          question: 'What is the AI-powered matching system?',
          answer:
            'Our AI analyzes buyer preferences, business characteristics, and market data to recommend the best matches. It considers factors like industry experience, investment capacity, location preferences, and business goals to connect the right buyers with the right sellers.',
          tags: ['ai', 'matching', 'technology'],
        },
        {
          question: 'How does the secure messaging system work?',
          answer:
            'All communications happen through our encrypted messaging platform. Messages are logged, searchable, and can include document sharing with automatic NDA protection. Integration with video calls and meeting scheduling makes negotiations efficient.',
          tags: ['messaging', 'security', 'communication'],
        },
        {
          question: 'What analytics are available to sellers?',
          answer:
            'Sellers get detailed analytics including listing views, buyer inquiries, market interest trends, comparative market analysis, and optimization suggestions. Premium accounts access advanced metrics and industry benchmarking.',
          tags: ['analytics', 'insights', 'metrics'],
        },
        {
          question: 'Can I get professional support during the process?',
          answer:
            'Yes, we offer access to verified professionals including business brokers, attorneys, accountants, and advisors. Our concierge service can manage the entire transaction process for complex deals.',
          tags: ['support', 'professionals', 'assistance'],
        },
      ],
    },
    {
      id: 'account-security',
      category: 'Account & Security',
      description: 'Manage your account settings, security, and privacy preferences',
      icon: <Shield className="w-6 h-6" />,
      color: 'indigo',
      questions: [
        {
          question: 'How do I update my account information?',
          answer:
            'Go to Settings > Profile to update personal information, business details, and preferences. Changes to sensitive information like banking details require additional verification for security.',
          tags: ['account', 'profile', 'updates'],
        },
        {
          question: 'What security measures protect my data?',
          answer:
            'We use enterprise-grade security including 256-bit SSL encryption, two-factor authentication, regular security audits, and GDPR compliance. All financial data is encrypted and stored separately from profile information.',
          tags: ['security', 'encryption', 'protection'],
          isPopular: true,
        },
        {
          question: 'How do I enable two-factor authentication?',
          answer:
            'In Settings > Security, click "Enable 2FA" and follow the setup process using your preferred authentication method (SMS, authenticator app, or email). 2FA is required for all financial transactions.',
          tags: ['2fa', 'authentication', 'security'],
        },
        {
          question: 'Can I delete my account?',
          answer:
            'Yes, you can request account deletion in Settings > Account. Active listings must be closed first, and we retain certain transaction records as required by law. The deletion process takes 7-14 days.',
          tags: ['deletion', 'account', 'privacy'],
        },
      ],
    },
    {
      id: 'payments-transactions',
      category: 'Payments & Transactions',
      description: 'Understanding payment processing, escrow services, and transaction management',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'pink',
      questions: [
        {
          question: 'How does the escrow service work?',
          answer:
            'Our secure escrow service holds buyer funds during due diligence and closing. Funds are released to sellers only after all conditions are met and both parties agree. This protects both buyers and sellers throughout the transaction.',
          tags: ['escrow', 'payments', 'security'],
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept bank transfers, certified checks, and wire transfers for business purchases. Cryptocurrency payments are available for qualified transactions. All payments are processed through regulated financial institutions.',
          tags: ['payments', 'methods', 'transactions'],
        },
        {
          question: 'How are transaction fees calculated?',
          answer:
            'Transaction fees vary by deal size and complexity. Typical fees range from 1-3% for buyers and 3-8% for sellers. Detailed fee schedules are provided before any transaction begins. No hidden fees guaranteed.',
          tags: ['fees', 'transactions', 'costs'],
          isNew: true,
        },
        {
          question: 'What happens if a deal falls through?',
          answer:
            'If a transaction is cancelled during due diligence, escrowed funds are returned to buyers minus any applicable fees. Our platform tracks all conditions and automatically manages refunds according to the purchase agreement.',
          tags: ['cancellation', 'refunds', 'protection'],
        },
      ],
    },
    {
      id: 'legal-compliance',
      category: 'Legal & Compliance',
      description: 'Legal requirements, compliance issues, and regulatory information',
      icon: <FileText className="w-6 h-6" />,
      color: 'yellow',
      questions: [
        {
          question: 'What legal documents are required for business sales?',
          answer:
            'Required documents include asset purchase agreements, disclosure statements, employment contracts, intellectual property assignments, and regulatory compliance certificates. Our legal partners provide standardized templates.',
          tags: ['legal', 'documents', 'requirements'],
        },
        {
          question: 'Do you provide legal advice?',
          answer:
            'flyp does not provide legal advice. However, we partner with qualified business attorneys who specialize in M&A transactions. All users are encouraged to consult independent legal counsel.',
          tags: ['legal', 'advice', 'attorneys'],
        },
        {
          question: 'How do you ensure compliance with regulations?',
          answer:
            'We maintain compliance with Belgian commercial law, EU data protection regulations, and financial services requirements. All listings are verified for regulatory compliance and legitimate business operations.',
          tags: ['compliance', 'regulations', 'verification'],
        },
        {
          question: 'What are the tax implications of business sales?',
          answer:
            'Tax implications vary by business structure, sale terms, and jurisdiction. We recommend consulting qualified tax advisors. Our platform can connect you with experienced tax professionals who specialize in business transactions.',
          tags: ['taxes', 'implications', 'advice'],
        },
      ],
    },
    {
      id: 'troubleshooting',
      category: 'Troubleshooting',
      description: 'Common issues and technical support for platform usage',
      icon: <Settings className="w-6 h-6" />,
      color: 'red',
      questions: [
        {
          question: "I'm having trouble uploading documents. What should I do?",
          answer:
            'Ensure your files are in supported formats (PDF, DOC, JPG, PNG) and under 10MB each. Clear your browser cache, try a different browser, or use our mobile app. Contact support if issues persist.',
          tags: ['upload', 'documents', 'technical'],
        },
        {
          question: "Why isn't my listing appearing in search results?",
          answer:
            "New listings take 24-48 hours to appear in search. Ensure your listing is complete, approved, and active. Incomplete listings or those under review won't appear in public searches.",
          tags: ['listings', 'search', 'visibility'],
        },
        {
          question: 'How do I reset my password?',
          answer:
            'Click "Forgot Password" on the login page, enter your email, and check for a reset link. If you don\'t receive the email within 10 minutes, check your spam folder or contact support.',
          tags: ['password', 'reset', 'login'],
        },
        {
          question: 'The platform seems slow. Is there an issue?',
          answer:
            'Check our status page for known issues. Clear your browser cache, disable browser extensions, and ensure you have a stable internet connection. Our platform is optimized for Chrome, Firefox, and Safari.',
          tags: ['performance', 'speed', 'technical'],
          isNew: true,
        },
      ],
    },
  ];

  // Support options
  const supportOptions: SupportOption[] = [
    {
      id: 'live-chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <MessageCircle className="w-6 h-6" />,
      action: 'Start Chat',
      availability: 'Mon-Fri 9AM-6PM CET',
      responseTime: 'Usually responds within minutes',
      color: 'blue',
    },
    {
      id: 'email-support',
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      icon: <Mail className="w-6 h-6" />,
      action: 'Send Email',
      availability: '24/7',
      responseTime: 'Response within 4-6 hours',
      color: 'green',
    },
    {
      id: 'phone-support',
      title: 'Phone Support',
      description: 'Speak directly with our business experts',
      icon: <Phone className="w-6 h-6" />,
      action: 'Schedule Call',
      availability: 'Mon-Fri 9AM-5PM CET',
      responseTime: 'Same-day callback available',
      color: 'purple',
    },
  ];

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectedCategory
        ? faqCategories.filter(cat => cat.id === selectedCategory)
        : faqCategories;
    }

    return faqCategories
      .map(category => ({
        ...category,
        questions: category.questions.filter(
          faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
      }))
      .filter(category => category.questions.length > 0);
  }, [searchQuery, selectedCategory, faqCategories]);

  // Get total question count
  const totalQuestions = faqCategories.reduce(
    (total, category) => total + category.questions.length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHead
        title="Help Center - flyp"
        description="Find answers to common questions about buying and selling businesses on flyp. Get support for account management, transactions, and platform features."
        keywords="help, support, FAQ, business marketplace, flyp assistance"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">How can we help you?</h1>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Find answers to your questions about buying and selling businesses on Belgium's
              premier business marketplace
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  placeholder="Search for answers... e.g., 'How to list my business'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-5 h-5 text-gray-400" />}
                  className="text-lg"
                  label=""
                  type="text"
                  onBlur={() => {}}
                  name="search"
                />
              </div>

              {searchQuery && (
                <div className="mt-4 text-blue-100">
                  {filteredCategories.length > 0
                    ? `Found ${filteredCategories.reduce((total, cat) => total + cat.questions.length, 0)} relevant answers`
                    : 'No results found. Try different keywords or browse categories below.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg border-0">
            <CardBody className="text-center py-6">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
              <div className="text-gray-600">Help Articles</div>
            </CardBody>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardBody className="text-center py-6">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </CardBody>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardBody className="text-center py-6">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">&lt; 1hr</div>
              <div className="text-gray-600">Average Response</div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar - Category Filter */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>

              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left p-3 rounded-lg transition-colors mb-2 ${
                  !selectedCategory
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                All Categories
              </button>

              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors mb-2 flex items-center gap-3 ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex-shrink-0">{category.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{category.category}</div>
                    <div className="text-sm text-gray-500">
                      {category.questions.length} questions
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <FAQCategory
                    key={category.id}
                    category={{
                      title: category.category,
                      description: category.description,
                      icon: category.icon,
                      color: category.color,
                      faqs: category.questions.map(q => ({
                        question: q.question,
                        answer: q.answer,
                        tags: q.tags,
                        isPopular: q.isPopular,
                        isNew: q.isNew,
                      })),
                    }}
                    allowMultiple={false}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse our categories
                  </p>
                  <Button onClick={() => setSearchQuery('')} className="bg-blue-600 text-white">
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 text-lg">
              Our support team is here to assist you with any questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map(option => (
              <Card
                key={option.id}
                className="border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardBody className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`p-3 rounded-full bg-${option.color}-50 text-${option.color}-600`}
                    >
                      {option.icon}
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>

                  <p className="text-gray-600 mb-4">{option.description}</p>

                  <div className="text-sm text-gray-500 mb-4">
                    <div>{option.availability}</div>
                    <div>{option.responseTime}</div>
                  </div>

                  <Button
                    className={`w-full bg-${option.color}-600 text-white hover:bg-${option.color}-700`}
                    onClick={() => {
                      if (option.id === 'email-support') {
                        window.location.href = 'mailto:support@flyp.be';
                      } else if (option.id === 'phone-support') {
                        navigate('/contact');
                      }
                      // Live chat would integrate with chat system
                    }}
                  >
                    {option.action}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of entrepreneurs using flyp to buy and sell businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
            <Button
              size="lg"
              variant="tertiary"
              onClick={() => navigate('/browse')}
            >
              Browse Businesses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
