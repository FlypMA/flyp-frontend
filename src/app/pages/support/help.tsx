import React, { useState } from 'react';
import Container from '../../components/main_UI/containers/container_default';
import Heading1 from '../../components/main_UI/fonts/heading1';
import Heading2 from '../../components/main_UI/fonts/heading2';
import { ChevronDown, ChevronUp, Search, MessageCircle, Mail, BookOpen } from 'lucide-react';
import { Input, Accordion, AccordionItem, Chip, Button } from '@heroui/react';
import { SEOHead } from '../../components/SEO';
import { getSEOData } from '../../constants/seoData';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    // Getting Started
    {
      category: 'getting-started',
      question: 'What is Ilara and how does it work?',
      answer:
        'Ilara is an AI-powered cultural intelligence platform that analyzes real-time consumer trends, creator analytics, and cultural data to help businesses make informed decisions and creators understand their impact. Our platform uses advanced machine learning to process publicly available data and generate actionable insights about trending topics, audience behavior, and cultural movements.',
    },
    {
      category: 'getting-started',
      question: 'How do I get started with Ilara?',
      answer:
        'Getting started is simple: 1) Create your free account, 2) Complete your profile setup, and 3) Start using the dashboard to generate AI-powered reports and insights. You can choose between Creator and Business features directly from your dashboard settings.',
    },
    {
      category: 'getting-started',
      question: "What's the difference between Creator and Business accounts?",
      answer:
        'Creator accounts are designed for content creators, influencers, and artists who want to understand their cultural impact and earn from their data insights. Business accounts are for brands, agencies, and marketers who need cultural intelligence for campaign planning and trend analysis. Business accounts require a subscription, while creators can join for free and earn revenue.',
    },

    // For Creators
    {
      category: 'creators',
      question: 'How do creators earn money with Ilara?',
      answer:
        'Creators earn through our 50/50 revenue sharing program. When businesses purchase insights derived from your content analytics and cultural impact data, you receive 50% of the revenue. Earnings are calculated monthly and paid out when you reach the minimum threshold. All revenue calculations are transparent and auditable in your dashboard.',
    },
    {
      category: 'creators',
      question: 'What data does Ilara collect from creators?',
      answer:
        'We only collect publicly available performance metrics from your connected social media accounts, such as engagement rates, audience demographics, content categorization, and trend participation. We never access private messages, personal content, or sensitive information. You maintain full ownership of your content and can control what data is shared.',
    },
    {
      category: 'creators',
      question: 'Can I opt out of revenue sharing or data collection?',
      answer:
        'Yes, absolutely. You have complete control over your participation. You can opt out of revenue sharing, adjust your data sharing preferences, or request complete data deletion at any time through your account settings. There are no penalties for opting out.',
    },

    // For Businesses
    {
      category: 'business',
      question: 'What kind of insights can businesses get from Ilara?',
      answer:
        'Businesses get access to real-time cultural intelligence including trending topics before they go mainstream, creator influence patterns, audience behavior analytics, campaign optimization recommendations, and cultural movement predictions. All insights are aggregated and anonymized to protect individual creator privacy.',
    },
    {
      category: 'business',
      question: 'How much does Ilara cost for businesses?',
      answer:
        'Our Business Pro plan starts at $49/month (normally $99, currently 50% off). This includes unlimited cultural insights, custom report generation, trend forecasting, and access to our creator collaboration tools. We also offer enterprise plans for larger organizations with custom requirements.',
    },
    {
      category: 'business',
      question: 'Can I cancel my business subscription anytime?',
      answer:
        "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged for subsequent periods. There are no cancellation fees or penalties.",
    },

    // Technical & Privacy
    {
      category: 'technical',
      question: 'How does Ilara protect my data and privacy?',
      answer:
        'We implement end-to-end encryption, secure data storage with access controls, regular security audits, and strict compliance with GDPR and CCPA regulations. Your personal information is never sold to third parties, and all business insights are aggregated and anonymized. You have full rights to access, correct, or delete your data at any time.',
    },
    {
      category: 'technical',
      question: "How accurate are Ilara's AI predictions?",
      answer:
        'Our AI models are trained on vast datasets and continuously improved, but like all AI systems, predictions should be used as guidance rather than definitive business decisions. We provide confidence scores with our predictions and recommend combining our insights with your own market knowledge and research.',
    },
    {
      category: 'technical',
      question: 'What platforms does Ilara integrate with?',
      answer:
        "Currently, we analyze data from major platforms including TikTok, Instagram, YouTube, Twitter/X, and Spotify. We're continuously adding new platform integrations and will notify users when new platforms become available.",
    },

    // Account & Billing
    {
      category: 'account',
      question: 'How do I change my account type?',
      answer:
        'You can change your account type by going to Settings > Account > User Type. Note that switching from Creator to Business will require setting up a subscription, while switching from Business to Creator will cancel your subscription at the end of the billing period.',
    },
    {
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer:
        'Click the "Forgot Password" link on the login page, enter your email address, and we\'ll send you a secure reset link. If you don\'t receive the email within a few minutes, check your spam folder or contact support.',
    },
    {
      category: 'account',
      question: 'How do I delete my account?',
      answer:
        'Go to Settings > Account > Privacy and click "Delete Account". This will permanently remove all your data from our systems. For creator accounts with pending revenue payments, contact support to ensure proper payout processing before deletion.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'getting-started', label: 'Getting Started', icon: Search },
    { id: 'creators', label: 'For Creators', icon: MessageCircle },
    { id: 'business', label: 'For Businesses', icon: Mail },
    { id: 'technical', label: 'Technical & Privacy', icon: ChevronDown },
    { id: 'account', label: 'Account & Billing', icon: ChevronUp },
  ];

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <Container>
      <SEOHead {...getSEOData('help')} />
      <div className="py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Heading1>Help Center</Heading1>
          <p className="text-lg text-zinc-400 mt-4 max-w-3xl mx-auto">
            Find answers to common questions about Ilara&apos;s AI-powered cultural intelligence
            platform
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">
                No results found. Try adjusting your search or browse different categories.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-zinc-700/30 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-white pr-4">{item.question}</h3>
                    {expandedItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <p className="text-zinc-300 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-zinc-800/30 rounded-2xl p-8 max-w-2xl mx-auto border border-zinc-700/50">
            <Heading2>Still need help?</Heading2>
            <p className="text-zinc-400 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as="a"
                href="/contact"
                color="primary"
                size="lg"
                className="px-6 py-3 font-medium"
              >
                Contact Support
              </Button>
              <a
                href="mailto:hello@ilara.xyz"
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Help;
