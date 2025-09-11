import React from 'react';
import { Button } from '@heroui/react';
import { HelpCircle, Mail, Book, MessageCircle, ExternalLink } from 'lucide-react';

interface SimpleSupportSettingsProps {
  onSave?: (data: any) => Promise<void>;
}

export const SupportSettings: React.FC<SimpleSupportSettingsProps> = ({
  onSave,
}: {
  onSave: (data: any) => Promise<any>;
}) => {
  const supportOptions = [
    {
      icon: Book,
      title: 'Help Center',
      description: 'Browse our comprehensive guides and tutorials',
      action: 'Visit Help Center',
      href: '/help',
      color: 'bg-blue-100 text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: "Send us a message and we'll respond within 24 hours",
      action: 'Contact Support',
      href: 'mailto:support@betweendeals.com',
      color: 'bg-green-100 text-green-600',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: 'Start Chat',
      href: '#',
      color: 'bg-purple-100 text-purple-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      comingSoon: true,
    },
  ];

  const faqItems = [
    {
      question: 'How do I list my business?',
      answer: 'Click "Sell your business" and follow our step-by-step onboarding process.',
    },
    {
      question: 'What information do buyers see?',
      answer: 'Buyers see your business overview, financials, and key details you choose to share.',
    },
    {
      question: 'How long does verification take?',
      answer:
        'Basic listings are live immediately. Full verification typically takes 2-3 business days.',
    },
    {
      question: 'Is there a fee to list?',
      answer: 'Basic listings are free. Premium features and successful sale commissions apply.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-2xl">
          <HelpCircle className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support</h1>
        <p className="text-gray-600">Get help when you need it</p>
      </div>

      {/* Support Options */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Options</h2>

          <div className="grid gap-6">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;

              return (
                <div
                  key={index}
                  className="flex items-start justify-between p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl ${option.color}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 flex items-center">
                        {option.title}
                        {option.comingSoon && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {option.comingSoon ? (
                      <Button
                        disabled
                        className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        {option.action}
                      </Button>
                    ) : (
                      <Button
                        as="a"
                        href={option.href}
                        target={option.href.startsWith('mailto:') ? '_self' : '_blank'}
                        className={`${option.buttonColor} text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg`}
                      >
                        {option.action}
                        {!option.href.startsWith('mailto:') && (
                          <ExternalLink className="w-4 h-4 ml-2" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick FAQ */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Button
              as="a"
              href="/help"
              variant="bordered"
              className="w-full border-gray-200 hover:border-gray-300 text-gray-700 py-3 px-6 rounded-xl"
            >
              View All FAQs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSupportSettings;
