import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Input, Accordion, AccordionItem } from '@heroui/react';
import { Search, HelpCircle, Mail, Phone, ArrowLeft, MessageCircle, Book, Shield, Users, DollarSign } from 'lucide-react';

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      category: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      questions: [
        {
          question: 'How do I list my business for sale?',
          answer: 'To list your business, create a seller account and go through our guided listing process. We\'ll help you provide all necessary business information, financial details, and documentation to attract serious buyers.'
        },
        {
          question: 'What information do I need to provide as a seller?',
          answer: 'You\'ll need basic business information (revenue, employees, location), financial statements for the last 2-3 years, and details about your business operations, assets, and growth potential.'
        },
        {
          question: 'How do I search for businesses to buy?',
          answer: 'Use our advanced search filters to find businesses by industry, location, price range, revenue, and other criteria. Create a buyer profile to save searches and get notifications for new listings.'
        }
      ]
    },
    {
      category: 'Account & Security',
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: 'How do I verify my account?',
          answer: 'Account verification involves confirming your email address and providing identification documents. Verified accounts get access to detailed business information and can contact sellers directly.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Go to Profile & Settings from the user menu, then click on Security settings. You can change your password by providing your current password and setting a new one.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use bank-level encryption and security measures to protect your data. We never share your personal information with third parties without your consent.'
        }
      ]
    },
    {
      category: 'Buying & Selling',
      icon: <DollarSign className="w-5 h-5" />,
      questions: [
        {
          question: 'How does the buying process work?',
          answer: 'After finding a business you\'re interested in, you can request more information, schedule meetings with the seller, conduct due diligence, make offers, and complete the transaction with professional support.'
        },
        {
          question: 'What are the fees for selling?',
          answer: 'We charge a small success fee only when your business sells. There are no upfront listing fees, and you only pay when we help you achieve a successful transaction.'
        },
        {
          question: 'How long does it take to sell a business?',
          answer: 'The timeline varies depending on your business type, price, and market conditions. On average, businesses sell within 3-12 months of listing, but some may sell faster or take longer.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600 mt-1">Find answers to common questions and get support</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              classNames={{
                input: "pl-10",
                inputWrapper: "bg-white border border-gray-200 hover:border-gray-300"
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" isPressable onPress={() => navigate('/messages')}>
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Contact Support</h3>
                  <p className="text-gray-600 text-sm">Get help from our support team</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600 text-sm">+32 2 123 4567 (Mon-Fri 9-18h)</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardBody className="p-0">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                  </div>
                </div>
                
                <Accordion variant="splitted" className="p-6">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      aria-label={faq.question}
                      title={faq.question}
                      className="border border-gray-200 rounded-lg mb-2"
                      classNames={{
                        title: "font-medium text-gray-900",
                        content: "text-gray-600 pb-4"
                      }}
                    >
                      {faq.answer}
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardBody className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still need help?</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions about buying or selling businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                color="primary"
                startContent={<MessageCircle className="w-4 h-4" />}
                onPress={() => navigate('/messages')}
              >
                Send Message
              </Button>
              <Button
                variant="bordered"
                startContent={<Mail className="w-4 h-4" />}
              >
                Email Support
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Help;
