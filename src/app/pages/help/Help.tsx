// ❓ Help Center - Comprehensive FAQ and support information
// Location: src/app/pages/help/Help.tsx
// Purpose: Help center with searchable FAQ and support resources

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Input, Accordion, AccordionItem } from '@heroui/react';
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
  BookOpen,
  Star,
  Zap,
  ChevronDown,
} from 'lucide-react';
import Container from '../../../shared/components/ui/Container';
// TODO: Import SEO when available
// import { SEOHead } from '../../components/SEO';

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

interface FAQCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  items: FAQItem[];
}

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const faqCategories: FAQCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'New to BetweenDeals? Start here',
      icon: Zap,
      color: 'bg-blue-100 text-blue-600',
      items: [
        {
          question: 'How do I create an account on BetweenDeals?',
          answer:
            'Creating an account is simple. Click the "Sign Up" button, choose whether you\'re a buyer or seller, and fill out the registration form. You\'ll need to verify your email address to complete the process.',
          keywords: ['account', 'registration', 'sign up', 'create', 'verify'],
        },
        {
          question: 'What information do I need to get started?',
          answer:
            'For buyers: basic contact information and investment criteria. For sellers: business details, financial information, and verification documents. All information is kept confidential and secure.',
          keywords: ['information', 'requirements', 'documents', 'verification'],
        },
        {
          question: 'Is BetweenDeals free to use?',
          answer:
            'Browsing listings is free for buyers. Sellers pay a one-time listing fee of €299 for 3 months of visibility. No commission fees - you keep 100% of your sale price.',
          keywords: ['free', 'pricing', 'cost', 'fees', 'commission'],
        },
      ],
    },
    {
      id: 'for-sellers',
      title: 'For Business Sellers',
      description: 'Everything about selling your business',
      icon: Building2,
      color: 'bg-green-100 text-green-600',
      items: [
        {
          question: 'How do I create a business listing?',
          answer:
            'After creating your seller account, click "List Your Business" and follow our step-by-step guide. You\'ll add business details, financial information, photos, and set your asking price. Our team reviews each listing before publication.',
          keywords: ['listing', 'create', 'sell', 'business', 'publish'],
        },
        {
          question: 'What documents do I need to provide?',
          answer:
            "You'll need basic business documents like registration, recent financial statements, and tax returns. Additional documents may be required during due diligence. All documents are shared securely with qualified buyers only.",
          keywords: ['documents', 'financial', 'statements', 'tax', 'due diligence'],
        },
        {
          question: 'How long does it take to sell a business?',
          answer:
            'The timeline varies by industry, price, and market conditions. Most businesses receive inquiries within the first month and sell within 3-9 months. Our platform streamlines the process significantly.',
          keywords: ['timeline', 'how long', 'sell time', 'duration'],
        },
      ],
    },
    {
      id: 'for-buyers',
      title: 'For Business Buyers',
      description: 'Guide to buying businesses',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      items: [
        {
          question: 'How do I search for businesses?',
          answer:
            'Use our advanced search filters to find businesses by location, industry, price range, revenue, and more. Save your searches to get notified when new matching businesses are listed.',
          keywords: ['search', 'filter', 'find', 'browse', 'criteria'],
        },
        {
          question: 'How do I contact a seller?',
          answer:
            'Click "Contact Seller" on any listing to send an inquiry. You\'ll need to sign a confidentiality agreement first. All communications are tracked and secure through our platform.',
          keywords: ['contact', 'inquiry', 'message', 'confidentiality', 'NDA'],
        },
        {
          question: 'What financing options are available?',
          answer:
            'We work with various financing partners including traditional banks, SBA lenders, and private equity firms. Our advisors can help you explore financing options that match your situation.',
          keywords: ['financing', 'loans', 'funding', 'SBA', 'equity'],
        },
      ],
    },
    {
      id: 'transactions',
      title: 'Transactions & Process',
      description: 'M&A process and transaction help',
      icon: FileText,
      color: 'bg-orange-100 text-orange-600',
      items: [
        {
          question: 'What is the typical M&A process?',
          answer:
            'The process includes: initial inquiry, confidentiality agreement, preliminary discussions, due diligence, offer negotiation, purchase agreement, and closing. We guide you through each step.',
          keywords: ['process', 'M&A', 'steps', 'due diligence', 'closing'],
        },
        {
          question: 'How does due diligence work?',
          answer:
            'Due diligence is a thorough review of the business. Buyers examine financials, operations, legal matters, and more. Our platform provides secure document sharing and due diligence checklists.',
          keywords: ['due diligence', 'review', 'documents', 'checklist'],
        },
        {
          question: 'Do I need professional help?',
          answer:
            'While not required, we recommend working with professionals like lawyers, accountants, and business brokers for complex transactions. Our network includes vetted professionals.',
          keywords: ['professional', 'lawyer', 'broker', 'advisor', 'help'],
        },
      ],
    },
    {
      id: 'pricing',
      title: 'Pricing & Payments',
      description: 'Understanding our fees and pricing',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      items: [
        {
          question: 'What are your fees?',
          answer:
            'Sellers pay a one-time listing fee of €299 for 3 months of visibility. No commission fees or hidden costs. Buyers browse for free. Payment processing fees may apply for transactions.',
          keywords: ['fees', 'pricing', 'cost', '€299', 'commission'],
        },
        {
          question: 'Do you charge success fees?',
          answer:
            "No, we don't charge success fees or commissions. You keep 100% of your sale price. Our simple listing fee model means no surprises.",
          keywords: ['success fee', 'commission', 'percentage', 'keep 100%'],
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major credit cards, bank transfers, and SEPA payments. All payments are processed securely through encrypted payment systems.',
          keywords: ['payment', 'credit card', 'bank transfer', 'SEPA'],
        },
      ],
    },
    {
      id: 'account',
      title: 'Account & Settings',
      description: 'Managing your account',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600',
      items: [
        {
          question: 'How do I change my password?',
          answer:
            'Go to Account Settings > Security and click "Change Password". You\'ll need to enter your current password and choose a new one. We recommend using a strong, unique password.',
          keywords: ['password', 'change', 'security', 'reset'],
        },
        {
          question: 'How do I update my profile?',
          answer:
            'Visit Account Settings > Profile to update your information, business details, and preferences. Keep your profile current to build trust with potential partners.',
          keywords: ['profile', 'update', 'information', 'settings'],
        },
        {
          question: 'Can I delete my account?',
          answer:
            'Yes, you can delete your account from Account Settings > Privacy. This will remove all your data and listings. This action cannot be undone.',
          keywords: ['delete', 'remove', 'account', 'privacy', 'data'],
        },
      ],
    },
  ];

  // Filter FAQs based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectedCategory
        ? faqCategories.filter(cat => cat.id === selectedCategory)
        : faqCategories;
    }

    const query = searchQuery.toLowerCase();
    return faqCategories
      .map(category => ({
        ...category,
        items: category.items.filter(
          item =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(query))
        ),
      }))
      .filter(category => category.items.length > 0);
  }, [searchQuery, selectedCategory]);

  const totalFAQs = faqCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <>
      {/* TODO: Add SEO when available */}
      {/* <SEOHead
        title="Help Center - M&A Platform Support | BetweenDeals"
        description="Get help with using the BetweenDeals platform. Guides, tutorials, and support for buyers and sellers in M&A transactions."
        keywords="help center, platform support, M&A help, user guides, transaction support, platform tutorials, customer support"
      /> */}

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-blue-100 rounded-full">
                  <HelpCircle className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                How can we help?
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Find answers to common questions, get platform guidance, and learn how to make the
                most of your M&A journey.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <Input
                  placeholder="Search for help..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  startContent={<Search className="w-5 h-5 text-neutral-400" />}
                  classNames={{
                    base: 'max-w-full',
                    mainWrapper: 'h-full',
                    input: 'text-lg',
                    inputWrapper:
                      'h-14 font-normal text-default-500 bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-within:border-blue-500',
                  }}
                />
                <p className="text-sm text-neutral-500 mt-3">
                  {totalFAQs} helpful articles across {faqCategories.length} categories
                </p>
              </div>
            </div>
          </Container>
        </div>

        {/* Quick Actions */}
        <Container>
          <div className="py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Popular Help Topics
                </h2>
                <p className="text-lg text-neutral-600">
                  Quick access to the most common questions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {faqCategories.map(category => (
                  <Card
                    key={category.id}
                    className="border border-neutral-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    isPressable
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <CardBody className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full ${category.color}`}>
                          <category.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900">
                            {category.title}
                          </h3>
                          <p className="text-neutral-600 text-sm">{category.description}</p>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500">{category.items.length} articles</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* FAQ Section */}
        <div className="bg-neutral-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                    {selectedCategory
                      ? faqCategories.find(cat => cat.id === selectedCategory)?.title
                      : searchQuery
                        ? 'Search Results'
                        : 'Frequently Asked Questions'}
                  </h2>
                  <p className="text-neutral-600">
                    {filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)} articles
                    found
                  </p>
                </div>
                {selectedCategory && (
                  <Button variant="light" onPress={() => setSelectedCategory(null)}>
                    View All Categories
                  </Button>
                )}
              </div>

              {filteredCategories.map(category => (
                <div key={category.id} className="mb-8">
                  {!selectedCategory && !searchQuery && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-full ${category.color}`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-semibold text-neutral-900">{category.title}</h3>
                    </div>
                  )}

                  <Accordion variant="splitted">
                    {category.items.map((item, index) => (
                      <AccordionItem
                        key={`${category.id}-${index}`}
                        aria-label={item.question}
                        title={
                          <span className="text-neutral-900 font-medium text-left">
                            {item.question}
                          </span>
                        }
                        className="!shadow-sm border border-neutral-200"
                      >
                        <div className="text-neutral-700 leading-relaxed pb-4">{item.answer}</div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {filteredCategories.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-4">No results found</h3>
                  <p className="text-neutral-600 mb-8">
                    Try adjusting your search terms or browse our categories above.
                  </p>
                  <Button variant="bordered" onPress={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Contact Support */}
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Still need help?
                </h2>
                <p className="text-lg text-neutral-600">
                  Our support team is here to help you succeed
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6 text-center">
                    <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Email Support</h3>
                    <p className="text-neutral-600 mb-4">Get detailed help via email</p>
                    <Button
                      variant="bordered"
                      onPress={() => navigate('/contact')}
                      className="w-full"
                    >
                      Send Email
                    </Button>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6 text-center">
                    <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Phone Support</h3>
                    <p className="text-neutral-600 mb-4">Speak directly with our team</p>
                    <Button variant="bordered" className="w-full" as="a" href="tel:+3221234567">
                      Call Now
                    </Button>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6 text-center">
                    <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                      <MessageCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Live Chat</h3>
                    <p className="text-neutral-600 mb-4">Get instant help online</p>
                    <Button
                      variant="bordered"
                      className="w-full"
                      onPress={() => {
                        // TODO: Implement chat widget
                        alert('Chat feature coming soon!');
                      }}
                    >
                      Start Chat
                    </Button>
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

export default Help;
