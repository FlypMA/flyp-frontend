// 📞 Contact Us Page - Comprehensive contact and support page
// Location: src/app/pages/support/contact.tsx
// Purpose: Contact form and support information for users

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@heroui/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Building2,
  Users,
  FileText,
  Shield,
  ArrowRight,
  CheckCircle,
  Headphones,
} from 'lucide-react';
import Container from '../../../shared/components/ui/Container';
// TODO: Import SEO when available
// import { SEOHead } from '../../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    subject: '',
    message: '',
    priority: 'medium',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@betweendeals.com',
      response: 'Response within 24 hours',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '+32 (0)2 123-4567',
      response: 'Mon-Fri, 9AM-6PM CET',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with support',
      contact: 'Available on platform',
      response: 'Real-time assistance',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const supportCategories = [
    {
      icon: Building2,
      title: 'Business Listings',
      description: 'Help with creating and managing business listings',
      topics: ['Listing creation', 'Photo uploads', 'Pricing guidance', 'Listing optimization'],
    },
    {
      icon: Users,
      title: 'Buyer Support',
      description: 'Assistance for business buyers and investors',
      topics: ['Search filters', 'Due diligence', 'Financing options', 'Acquisition process'],
    },
    {
      icon: FileText,
      title: 'Transaction Help',
      description: 'Support throughout the M&A process',
      topics: ['Document sharing', 'Offer management', 'Legal requirements', 'Closing process'],
    },
    {
      icon: Shield,
      title: 'Account & Security',
      description: 'Account management and security issues',
      topics: ['Password reset', 'Verification', 'Privacy settings', 'Account deletion'],
    },
  ];

  if (isSubmitted) {
    return (
      <Container>
        <div className="py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-green-100 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-6">
              Thank You for Contacting Us!
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              We've received your message and will get back to you within 24 hours.
            </p>
            <Button color="primary" size="lg" onPress={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* TODO: Add SEO when available */}
      {/* <SEOHead
        title="Contact Us - M&A Platform Support | BetweenDeals"
        description="Get in touch with our M&A experts. Support for buyers and sellers, platform questions, and professional advisory services."
        keywords="contact support, M&A experts, customer service, platform help, advisory services, business consultation"
      /> */}

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-neutral-50 via-white to-blue-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">Get in Touch</h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Our M&A experts are here to help you succeed. Whether you're buying, selling, or
                need platform support, we're just a message away.
              </p>
              <div className="flex justify-center">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
                  <Headphones className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-neutral-900">24/7 Support Available</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Contact Methods */}
        <Container>
          <div className="py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  How Can We Help?
                </h2>
                <p className="text-lg text-neutral-600">
                  Choose the best way to reach our support team
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {contactMethods.map((method, index) => (
                  <Card
                    key={index}
                    className="border border-neutral-200 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-full ${method.color}`}>
                          <method.icon className="w-8 h-8" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">{method.title}</h3>
                      <p className="text-neutral-600">{method.description}</p>
                    </CardHeader>
                    <CardBody className="text-center pt-0">
                      <p className="font-semibold text-neutral-900 mb-2">{method.contact}</p>
                      <p className="text-sm text-neutral-600">{method.response}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Contact Form */}
        <div className="bg-neutral-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-lg text-neutral-600">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              <Card className="border border-neutral-200">
                <CardBody className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onValueChange={handleInputChange('name')}
                        isRequired
                        variant="bordered"
                      />
                      <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        value={formData.email}
                        onValueChange={handleInputChange('email')}
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Company Name"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onValueChange={handleInputChange('company')}
                        variant="bordered"
                      />
                      <Select
                        label="Your Role"
                        placeholder="Select your role"
                        variant="bordered"
                        selectedKeys={formData.role ? [formData.role] : []}
                        onSelectionChange={keys => {
                          const role = Array.from(keys)[0] as string;
                          handleInputChange('role')(role);
                        }}
                      >
                        <SelectItem key="business-owner" value="business-owner">
                          Business Owner
                        </SelectItem>
                        <SelectItem key="buyer" value="buyer">
                          Business Buyer
                        </SelectItem>
                        <SelectItem key="investor" value="investor">
                          Investor
                        </SelectItem>
                        <SelectItem key="advisor" value="advisor">
                          Business Advisor
                        </SelectItem>
                        <SelectItem key="other" value="other">
                          Other
                        </SelectItem>
                      </Select>
                    </div>

                    <Input
                      label="Subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onValueChange={handleInputChange('subject')}
                      isRequired
                      variant="bordered"
                    />

                    <Textarea
                      label="Message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onValueChange={handleInputChange('message')}
                      isRequired
                      variant="bordered"
                      minRows={6}
                    />

                    <Select
                      label="Priority Level"
                      placeholder="Select priority"
                      variant="bordered"
                      selectedKeys={[formData.priority]}
                      onSelectionChange={keys => {
                        const priority = Array.from(keys)[0] as string;
                        handleInputChange('priority')(priority);
                      }}
                    >
                      <SelectItem key="low" value="low">
                        Low - General inquiry
                      </SelectItem>
                      <SelectItem key="medium" value="medium">
                        Medium - Need assistance
                      </SelectItem>
                      <SelectItem key="high" value="high">
                        High - Urgent issue
                      </SelectItem>
                    </Select>

                    <Button
                      color="primary"
                      size="lg"
                      type="submit"
                      isLoading={isSubmitting}
                      endContent={!isSubmitting && <ArrowRight className="w-5 h-5" />}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>

        {/* Support Categories */}
        <Container>
          <div className="py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Support Categories
                </h2>
                <p className="text-lg text-neutral-600">
                  Find quick answers to common questions in these areas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {supportCategories.map((category, index) => (
                  <Card
                    key={index}
                    className="border border-neutral-200 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <category.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900">
                            {category.title}
                          </h3>
                          <p className="text-neutral-600">{category.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {category.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="text-sm text-neutral-700 bg-neutral-50 px-3 py-2 rounded-lg"
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Office Information */}
        <div className="bg-neutral-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Our Office</h2>
                <p className="text-lg text-neutral-600">
                  Visit us in the heart of Europe's business capital
                </p>
              </div>

              <Card className="border border-neutral-200">
                <CardBody className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                        BetweenDeals Office
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-neutral-900">Address</p>
                            <p className="text-neutral-600">
                              Avenue Louise 123
                              <br />
                              1050 Brussels, Belgium
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-neutral-900">Business Hours</p>
                            <p className="text-neutral-600">
                              Monday - Friday: 9:00 AM - 6:00 PM CET
                              <br />
                              Saturday - Sunday: Closed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral-100 rounded-lg p-6 flex items-center justify-center">
                      <div className="text-center">
                        <Building2 className="w-24 h-24 text-neutral-400 mx-auto mb-4" />
                        <p className="text-neutral-600">Interactive map coming soon</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Contact;
