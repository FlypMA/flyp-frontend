import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Input, Accordion, AccordionItem, Chip, Badge } from '@heroui/react';
import { 
  Search, 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageCircle, 
  Building2, 
  TrendingUp,
  Shield,
  Users,
  DollarSign,
  FileText,
  Settings,
  Clock,
  CheckCircle,
  Star,
  Award,
  BookOpen,
  Headphones,
  ExternalLink,
  Download,
  Play,
  Lightbulb,
  Target,
  Calculator,
  Globe,
  Filter,
  ChevronRight,
  Zap,
  Analytics
} from 'lucide-react';
import { SEOHead } from '../../components/SEO';

interface FAQ {
  question: string;
  answer: string;
  tags?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

interface FAQCategory {
  id: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  questions: FAQ[];
  questionCount: number;
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

  const supportOptions: SupportOption[] = [
    {
      id: 'live-chat',
      title: 'Live Chat Support',
      description: 'Get instant help from our M&A experts',
      icon: <MessageCircle className="w-6 h-6" />,
      action: 'Start Chat',
      availability: 'Mon-Fri 9:00-18:00 CET',
      responseTime: 'Usually < 2 minutes',
      color: 'blue'
    },
    {
      id: 'video-call',
      title: 'Schedule Video Call',
      description: 'Book a consultation with our specialists',
      icon: <Play className="w-6 h-6" />,
      action: 'Book Call',
      availability: 'Mon-Fri 9:00-17:00 CET',
      responseTime: 'Same day booking',
      color: 'green'
    },
    {
      id: 'phone-support',
      title: 'Phone Support',
      description: 'Call us directly for immediate assistance',
      icon: <Phone className="w-6 h-6" />,
      action: '+32 2 588 0970',
      availability: 'Mon-Fri 9:00-18:00 CET',
      responseTime: 'Immediate',
      color: 'purple'
    },
    {
      id: 'email-support',
      title: 'Email Support',
      description: 'Send detailed questions to our team',
      icon: <Mail className="w-6 h-6" />,
      action: 'support@betweendeals.com',
      availability: '24/7 Submission',
      responseTime: 'Within 2 hours',
      color: 'orange'
    }
  ];

  const faqData: FAQCategory[] = [
    {
      id: 'getting-started',
      category: 'Getting Started',
      description: 'Essential information for new users',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'blue',
      questionCount: 6,
      questions: [
        {
          question: 'What is BetweenDeals and how does it work?',
          answer: 'BetweenDeals is Belgium\'s premier digital marketplace for buying and selling established businesses. We connect entrepreneurs, business owners, and investors through our secure, AI-powered platform. Our comprehensive system handles listing creation, buyer-seller matching, due diligence support, secure communications, and transaction facilitation - making business acquisitions faster, safer, and more efficient.',
          tags: ['platform', 'overview', 'marketplace'],
          isPopular: true
        },
        {
          question: 'How do I create an account and get started?',
          answer: 'Getting started is simple! Click "Sign Up" and choose your account type (Buyer or Seller). Complete our 2-minute verification process with your email and basic information. Buyers get instant access to browse businesses, while sellers are guided through our intuitive listing creation process. Both account types are completely free to create.',
          tags: ['account', 'registration', 'verification'],
          isPopular: true
        },
        {
          question: 'What types of businesses are available on BetweenDeals?',
          answer: 'We feature profitable businesses across all industries: SaaS and tech companies, e-commerce stores, manufacturing and industrial businesses, professional services, restaurants and hospitality, retail stores, healthcare practices, consulting firms, and more. Most businesses generate between €50K-€50M+ in annual revenue.',
          tags: ['business types', 'industries', 'range'],
          isPopular: true
        },
        {
          question: 'Is BetweenDeals only for Belgian businesses?',
          answer: 'While we started in Belgium and have deep expertise in the Belgian market, BetweenDeals now serves businesses across Europe and beyond. We specialize in EU markets but welcome international businesses looking to expand into Europe or global buyers interested in European opportunities.',
          tags: ['location', 'international', 'belgium']
        },
        {
          question: 'How much does it cost to use BetweenDeals?',
          answer: 'Creating an account and browsing businesses is completely free for buyers. For sellers, basic listings are free, while premium features (verification, featured placement, marketing boost) have optional fees. We only charge a success fee when a transaction completes through our platform.',
          tags: ['pricing', 'fees', 'cost']
        },
        {
          question: 'What makes BetweenDeals different from other platforms?',
          answer: 'BetweenDeals combines cutting-edge technology with deep M&A expertise. Our AI-powered matching system, comprehensive due diligence tools, built-in valuation calculator, secure document sharing, integrated communications, and network of M&A professionals create an unmatched experience.',
          tags: ['differentiation', 'technology', 'expertise'],
          isNew: true
        }
      ]
    },
    {
      id: 'selling-business',
      category: 'Selling Your Business',
      description: 'Complete guide to listing and selling successfully',
      icon: <Building2 className="w-5 h-5" />,
      color: 'green',
      questionCount: 10,
      questions: [
        {
          question: 'What information do I need to create a business listing?',
          answer: 'To create a compelling listing you\'ll need: business overview (name, industry, location, founded date), financial details (revenue, profit, growth trends), operational information (employees, business model, key assets), reason for sale, asking price or valuation range, and high-quality photos.',
          tags: ['listing', 'requirements', 'information'],
          isPopular: true
        },
        {
          question: 'How do I determine the right price for my business?',
          answer: 'Our built-in valuation calculator provides initial estimates based on industry multiples, typically 1.5-8x annual profit depending on factors like growth rate, market position, and scalability. For accurate valuations, we recommend our professional valuation service or can connect you with certified business valuers.',
          tags: ['pricing', 'valuation', 'calculator'],
          isPopular: true
        },
        {
          question: 'Should I get my business verified?',
          answer: 'Absolutely! Verified businesses receive 5x more inquiries, appear higher in search results, and sell 60% faster on average. Verification involves uploading key documents (business registration, tax returns, financial statements) and takes 24-48 hours. Verified listings display a prominent trust badge.',
          tags: ['verification', 'trust', 'benefits'],
          isPopular: true
        },
        {
          question: 'How long does it typically take to sell a business?',
          answer: 'Most quality listings receive serious inquiries within the first week. The complete sales process typically takes 2-8 months depending on business complexity, asking price, market conditions, and buyer financing. Well-prepared, verified listings with realistic pricing sell significantly faster.',
          tags: ['timeline', 'process', 'expectations']
        },
        {
          question: 'Can I keep my business sale confidential?',
          answer: 'Yes! We offer multiple confidentiality levels: anonymous listings (hide business name/exact location), NDA-protected detailed information sharing, blind contact system where buyers must qualify before seeing sensitive details, and private communications through our secure messaging system.',
          tags: ['confidentiality', 'privacy', 'anonymous']
        },
        {
          question: 'What documents should I prepare for potential buyers?',
          answer: 'Essential documents include: 3 years of financial statements, tax returns, business registration, customer contracts (if applicable), lease agreements, employee agreements, inventory lists, and equipment valuations. Having these ready accelerates the due diligence process.',
          tags: ['documents', 'due diligence', 'preparation']
        },
        {
          question: 'How do I handle inquiries from potential buyers?',
          answer: 'All buyer communications go through our secure messaging system. Respond promptly to serious inquiries, ask about buyer qualifications and financing, share appropriate information based on confidentiality level, and schedule calls with qualified prospects.',
          tags: ['inquiries', 'communication', 'screening']
        },
        {
          question: 'What fees do sellers pay on BetweenDeals?',
          answer: 'Basic listings are free forever. Premium features (verification €99, featured placement €199/month, marketing boost €299/month) are optional. We charge a success fee only when your business sells: 3% for transactions under €1M, 2% for €1M-€5M, 1.5% for over €5M.',
          tags: ['fees', 'pricing', 'success fee'],
          isNew: true
        },
        {
          question: 'Can I edit or update my listing after it\'s published?',
          answer: 'Yes! You have complete control over your listing. Update business information, adjust pricing, add new photos, modify descriptions, and respond to market feedback anytime through your seller dashboard. Major changes may require re-verification.',
          tags: ['editing', 'updates', 'flexibility']
        },
        {
          question: 'How do I know if a buyer is serious and qualified?',
          answer: 'We verify buyer accounts and financial capacity. Look for verified buyer badges, detailed buyer profiles, specific questions showing research, and proof of funds or financing pre-approval. Our team can help assess buyer seriousness.',
          tags: ['buyer qualification', 'verification', 'assessment']
        }
      ]
    },
    {
      id: 'buying-business',
      category: 'Buying a Business',
      description: 'Everything you need to acquire the perfect business',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'purple',
      questionCount: 9,
      questions: [
        {
          question: 'How do I search for businesses that match my criteria?',
          answer: 'Use our advanced search filters to find perfect matches: filter by industry, location, revenue range, asking price, business model, number of employees, and growth rate. Save your searches and set up email alerts for new listings. Our AI recommendation engine suggests businesses based on your preferences.',
          tags: ['search', 'filters', 'recommendations'],
          isPopular: true
        },
        {
          question: 'What should I evaluate when considering a business?',
          answer: 'Key evaluation criteria include: consistent revenue and profit trends, customer diversification, market position and competitive advantages, quality of management and systems, growth opportunities, reason for sale, financial health indicators, and cultural fit.',
          tags: ['evaluation', 'criteria', 'analysis'],
          isPopular: true
        },
        {
          question: 'How do I contact sellers and request information?',
          answer: 'Click "Request Information" on any listing to send a secure message. Introduce yourself professionally, explain your background and acquisition criteria, ask specific questions, and demonstrate serious interest. Verified buyers with complete profiles receive faster responses.',
          tags: ['contact', 'messaging', 'introduction'],
          isPopular: true
        },
        {
          question: 'What financing options are available for business purchases?',
          answer: 'Common financing methods include: seller financing (30-50% down, seller holds note), SBA loans (70-90% financing for qualified buyers), traditional bank financing, investor partnerships, asset-based lending, and revenue-based financing. We partner with specialized lenders.',
          tags: ['financing', 'loans', 'funding'],
          isPopular: true
        },
        {
          question: 'How do I verify a business opportunity is legitimate?',
          answer: 'Look for verified business badges, review financial documentation, ask for references, conduct independent market research, verify business registration and licenses, and request proof of claims. Always conduct your own due diligence with professional advisors.',
          tags: ['verification', 'legitimacy', 'due diligence']
        },
        {
          question: 'What is the typical buying process timeline?',
          answer: 'The process typically follows: initial research and inquiry (1-2 weeks), detailed evaluation and due diligence (4-6 weeks), offer negotiation and acceptance (1-2 weeks), financing and legal documentation (4-8 weeks), and closing (1-2 weeks).',
          tags: ['process', 'timeline', 'steps']
        },
        {
          question: 'Do I need professional help for due diligence?',
          answer: 'For most transactions over €100K, yes! We recommend engaging: an M&A attorney for legal review, an accountant for financial analysis, and industry experts for market validation. We can connect you with our network of trusted professionals.',
          tags: ['due diligence', 'professionals', 'legal']
        },
        {
          question: 'How do I make a competitive offer?',
          answer: 'Research comparable sales, understand the seller\'s motivation and timeline, structure terms that work for both parties (price, down payment, seller financing), include reasonable contingencies, and present proof of financing.',
          tags: ['offers', 'negotiation', 'strategy']
        },
        {
          question: 'What ongoing support is available after purchase?',
          answer: 'We provide post-acquisition support including: transition planning guidance, connection to business mentors and advisors, access to growth funding resources, networking with other BetweenDeals entrepreneurs, and ongoing platform access for future opportunities.',
          tags: ['support', 'post-acquisition', 'community'],
          isNew: true
        }
      ]
    },
    {
      id: 'platform-features',
      category: 'Platform Features',
      description: 'Master all BetweenDeals tools and capabilities',
      icon: <Settings className="w-5 h-5" />,
      color: 'orange',
      questionCount: 7,
      questions: [
        {
          question: 'How does the AI matching system work?',
          answer: 'Our proprietary AI analyzes your profile, search behavior, and preferences to recommend highly relevant businesses. It considers factors like industry experience, investment capacity, geographic preferences, and business model interests. The system learns from your activity and improves recommendations over time.',
          tags: ['AI', 'matching', 'recommendations'],
          isPopular: true
        },
        {
          question: 'What is the valuation calculator and how accurate is it?',
          answer: 'Our valuation calculator uses industry-standard multiples, recent market data, and business-specific factors to provide estimated value ranges. While useful for initial assessments, accuracy varies by industry and business complexity. For precise valuations, we recommend our professional valuation service.',
          tags: ['valuation', 'calculator', 'accuracy']
        },
        {
          question: 'How does the secure document sharing work?',
          answer: 'Our document vault provides encrypted storage and sharing of confidential business information. Set access permissions, track who views documents, add watermarks, and control download rights. All documents are stored with bank-level security and are only accessible to authorized parties.',
          tags: ['documents', 'security', 'sharing']
        },
        {
          question: 'Can I integrate BetweenDeals with my existing tools?',
          answer: 'Yes! We offer integrations with popular CRM systems, accounting software, email platforms, and calendar applications. API access is available for enterprise users. Contact our support team to discuss specific integration needs.',
          tags: ['integrations', 'API', 'tools']
        },
        {
          question: 'How do saved searches and alerts work?',
          answer: 'Save any search criteria combination and receive instant email notifications when matching businesses are listed. Set up multiple alert profiles for different investment interests, adjust notification frequency, and modify criteria anytime.',
          tags: ['alerts', 'notifications', 'search']
        },
        {
          question: 'What analytics are available for my listings or searches?',
          answer: 'Sellers get detailed analytics: listing views, inquiry rates, buyer demographics, search ranking performance, and market comparison data. Buyers receive insights on search competition, market trends, and personalized opportunity scoring.',
          tags: ['analytics', 'insights', 'tracking']
        },
        {
          question: 'What mobile features are available?',
          answer: 'Our mobile-optimized platform includes: full browsing and search capabilities, instant messaging, document viewing, notification management, and listing management for sellers. Native mobile apps for iOS and Android are coming in Q2 2024.',
          tags: ['mobile', 'apps', 'features'],
          isNew: true
        }
      ]
    },
    {
      id: 'pricing-fees',
      category: 'Pricing & Fees',
      description: 'Transparent pricing for all services',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'emerald',
      questionCount: 6,
      questions: [
        {
          question: 'What are the fees for buyers?',
          answer: 'BetweenDeals is completely free for buyers! Create an account, browse businesses, contact sellers, and access due diligence tools at no cost. We only succeed when you do - our revenue comes from seller success fees, ensuring we\'re aligned with finding you the perfect business.',
          tags: ['buyer fees', 'free', 'cost'],
          isPopular: true
        },
        {
          question: 'What fees do sellers pay?',
          answer: 'Basic listings are free forever. Optional premium services: Business Verification (€99), Featured Listing (€199/month), Marketing Boost (€299/month). Success fees only apply when your business sells: 3% for deals under €1M, 2% for €1M-€5M, 1.5% for over €5M.',
          tags: ['seller fees', 'success fee', 'premium'],
          isPopular: true
        },
        {
          question: 'When are success fees paid?',
          answer: 'Success fees are only charged when your business successfully sells through our platform and funds transfer at closing. No upfront fees, no monthly charges unless you choose premium services. We only get paid when you get paid.',
          tags: ['success fee', 'payment timing', 'closing']
        },
        {
          question: 'Are there any hidden fees or charges?',
          answer: 'Absolutely not! We believe in complete transparency. All fees are clearly disclosed upfront with no hidden charges, processing fees, or surprise costs. Optional services are clearly priced, and success fees are only charged on completed transactions.',
          tags: ['transparency', 'hidden fees', 'disclosure']
        },
        {
          question: 'How do professional services fees work?',
          answer: 'Professional valuation (€299-€999), legal document review (€199/hour), M&A advisory (€150/hour), and specialized consultations are priced separately. These are optional services from our partner network with transparent pricing upfront.',
          tags: ['professional services', 'consultation', 'advisory']
        },
        {
          question: 'How do fees compare to traditional business brokers?',
          answer: 'Traditional brokers typically charge 8-12% commission plus upfront fees. BetweenDeals charges 1.5-3% success fees with no upfront costs - saving you thousands while providing superior technology, broader reach, and faster transactions.',
          tags: ['comparison', 'savings', 'traditional brokers'],
          isNew: true
        }
      ]
    },
    {
      id: 'security-legal',
      category: 'Security & Legal',
      description: 'Understanding safety, regulations and compliance',
      icon: <Shield className="w-5 h-5" />,
      color: 'red',
      questionCount: 6,
      questions: [
        {
          question: 'How secure is my information on BetweenDeals?',
          answer: 'Security is our top priority. We use bank-level encryption, secure document storage, verified user accounts, NDA-protected communications, and comply with GDPR and other data protection regulations. All financial information and business documents are protected with enterprise-grade security measures.',
          tags: ['security', 'encryption', 'protection'],
          isPopular: true
        },
        {
          question: 'Is BetweenDeals regulated and compliant?',
          answer: 'Yes! We comply with all applicable EU regulations including GDPR, AML (Anti-Money Laundering), KYC (Know Your Customer), and business broker licensing requirements. We\'re registered in Belgium and operate under strict financial services compliance standards.',
          tags: ['regulation', 'compliance', 'licensing']
        },
        {
          question: 'What legal documents are typically needed for a business sale?',
          answer: 'Common documents include: Purchase Agreement, Asset Purchase Agreement or Stock Purchase Agreement, Due Diligence Reports, Financial Statements, Tax Returns, Business Registration, Employment Agreements, and Closing Documents. We provide templates and can connect you with M&A attorneys.',
          tags: ['legal documents', 'contracts', 'requirements']
        },
        {
          question: 'Do I need a lawyer for my business transaction?',
          answer: 'For most transactions over €50K, yes! Legal representation protects your interests, ensures proper documentation, handles regulatory compliance, and manages liability issues. We work with experienced M&A attorneys who understand our platform.',
          tags: ['lawyers', 'legal representation', 'protection']
        },
        {
          question: 'What anti-fraud measures are in place?',
          answer: 'Comprehensive fraud prevention includes: identity verification for all users, business registration validation, financial document authentication, secure payment processing, suspicious activity monitoring, and cooperation with law enforcement when needed.',
          tags: ['fraud prevention', 'security', 'verification']
        },
        {
          question: 'How do international transactions work legally?',
          answer: 'Cross-border transactions involve additional complexity: multiple jurisdiction compliance, currency regulations, tax treaties, immigration considerations for business ownership, and international contract law. We work with specialists in international M&A.',
          tags: ['international', 'cross-border', 'regulations'],
          isNew: true
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectedCategory 
        ? faqData.filter(cat => cat.id === selectedCategory)
        : faqData;
    }

    const query = searchQuery.toLowerCase();
    return faqData.map(category => ({
      ...category,
      questions: category.questions.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    })).filter(category => category.questions.length > 0);
  }, [searchQuery, selectedCategory]);

  const totalQuestions = faqData.reduce((sum, cat) => sum + cat.questionCount, 0);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  const handleSupportAction = (option: SupportOption) => {
    switch (option.id) {
      case 'live-chat':
        console.log('Opening live chat...');
        break;
      case 'video-call':
        window.open('https://calendly.com/betweendeals', '_blank');
        break;
      case 'phone-support':
        window.open('tel:+3225880970', '_self');
        break;
      case 'email-support':
        window.open('mailto:support@betweendeals.com', '_self');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Help Center - BetweenDeals Support | Business Marketplace FAQ"
        description="Get comprehensive support for buying and selling businesses on BetweenDeals. Find answers to common questions, access expert help, and learn how to succeed in business transactions."
        keywords="business marketplace help, M&A support, buying selling business guide, BetweenDeals FAQ, business transaction assistance, Belgium business platform"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl font-bold mb-4">How can we help you today?</h1>
            <p className="text-xl text-blue-100 mb-2">
              Get expert support for your business transaction journey
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-blue-200 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{totalQuestions}+ Help Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>&lt; 2h Response Time</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search help articles, guides, and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="lg"
                classNames={{
                  input: "pl-12 text-base",
                  inputWrapper: "bg-white/90 border-0 shadow-xl hover:bg-white h-14 backdrop-blur-sm",
                  mainWrapper: "shadow-2xl"
                }}
              />
            </div>
            {searchQuery && (
              <div className="mt-3">
                <Chip
                  size="sm"
                  variant="flat"
                  className="bg-white/20 text-white"
                  onClose={() => setSearchQuery('')}
                >
                  Search: "{searchQuery}"
                </Chip>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Support Options */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Instant Support</h2>
            <p className="text-lg text-gray-600">Choose the support method that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option) => (
              <Card
                key={option.id}
                isPressable
                onPress={() => handleSupportAction(option)}
                className="hover:shadow-xl transition-shadow cursor-pointer group border-0"
              >
                <CardBody className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-${option.color}-100 text-${option.color}-600 group-hover:scale-110 transition-transform`}>
                    {option.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">{option.availability}</div>
                    <div className="text-xs font-medium text-green-600">{option.responseTime}</div>
                  </div>
                  <Button
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="mt-4 w-full"
                    endContent={<ExternalLink className="w-3 h-3" />}
                  >
                    {option.action}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
              <p className="text-lg text-gray-600">Find answers organized by topic</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Button
                variant={!selectedCategory ? "solid" : "flat"}
                color="primary"
                size="sm"
                onPress={() => handleCategorySelect(null)}
                startContent={<Filter className="w-4 h-4" />}
              >
                All Categories ({totalQuestions})
              </Button>
              {faqData.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "solid" : "flat"}
                  color="primary"
                  size="sm"
                  onPress={() => handleCategorySelect(category.id)}
                  startContent={category.icon}
                >
                  {category.category} ({category.questionCount})
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqData.map((category) => (
                <Card
                  key={category.id}
                  isPressable
                  onPress={() => handleCategorySelect(category.id)}
                  className={`hover:shadow-lg transition-all cursor-pointer ${
                    selectedCategory === category.id ? 'ring-2 ring-primary-500 shadow-lg' : ''
                  }`}
                >
                  <CardBody className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-${category.color}-100 flex items-center justify-center flex-shrink-0`}>
                        {React.cloneElement(category.icon as React.ReactElement, {
                          className: `w-6 h-6 text-${category.color}-600`
                        })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{category.category}</h3>
                          <Badge color="primary" variant="flat" size="sm">
                            {category.questionCount}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                        <div className="flex items-center text-primary-600 text-sm font-medium">
                          <span>View questions</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Content */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
                <div className={`w-10 h-10 rounded-lg bg-${category.color}-100 flex items-center justify-center`}>
                  {React.cloneElement(category.icon as React.ReactElement, {
                    className: `w-5 h-5 text-${category.color}-600`
                  })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <div className="ml-auto">
                  <Badge color="primary" variant="flat">
                    {category.questions.length} questions
                  </Badge>
                </div>
              </div>

              <Accordion variant="splitted" className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={faq.question}
                    title={
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                        <div className="flex gap-1">
                          {faq.isNew && (
                            <Badge color="success" size="sm" variant="flat">New</Badge>
                          )}
                          {faq.isPopular && (
                            <Badge color="warning" size="sm" variant="flat">Popular</Badge>
                          )}
                        </div>
                      </div>
                    }
                    className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    classNames={{
                      title: "font-semibold text-gray-900",
                      content: "text-gray-700 pb-4 leading-relaxed"
                    }}
                  >
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      {faq.tags && (
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag, tagIndex) => (
                            <Chip
                              key={tagIndex}
                              size="sm"
                              variant="flat"
                              color="primary"
                              className="text-xs"
                            >
                              {tag}
                            </Chip>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any articles matching "{searchQuery}". Try different keywords or browse by category.
            </p>
            <Button color="primary" variant="flat" onPress={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
            <p className="text-gray-600">Our M&A experts are here to support your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md">
              <CardBody className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Learning Center</h3>
                <p className="text-sm text-gray-600 mb-4">Comprehensive M&A guides and tutorials</p>
                <Button size="sm" color="primary" variant="flat" fullWidth>
                  Explore Guides
                </Button>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
                <p className="text-sm text-gray-600 mb-4">Connect with other entrepreneurs</p>
                <Button size="sm" color="success" variant="flat" fullWidth>
                  Join Community
                </Button>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6 text-center">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Expert Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">One-on-one M&A guidance</p>
                <Button size="sm" color="warning" variant="flat" fullWidth>
                  Book Session
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
