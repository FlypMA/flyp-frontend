import AnimatedTextarea from '@/shared/components/forms/AnimatedTextarea';
import { Input } from '@/shared/components/forms/Input';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { Button, Card, CardBody, CardHeader, Select, SelectItem } from '@heroui/react';
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

const NewContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      category: '',
      message: '',
    });
    setIsSubmitting(false);

    // Show success message (in a real app, this would be handled differently)
    alert("Thank you for your message! We'll get back to you within 24 hours.");
  };

  const contactCategories = [
    { key: 'general', label: 'General Inquiry' },
    { key: 'listing', label: 'Listing Support' },
    { key: 'buying', label: 'Buying Support' },
    { key: 'technical', label: 'Technical Support' },
    { key: 'billing', label: 'Billing & Subscriptions' },
    { key: 'partnership', label: 'Partnership Opportunities' },
    { key: 'press', label: 'Press & Media' },
  ];

  const supportTypes = [
    {
      icon: Building2,
      title: 'Selling Your Business',
      description: 'Get help creating your listing, optimizing visibility, and managing inquiries',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: Users,
      title: 'Finding Businesses',
      description: 'Assistance with search filters, saved searches, and connecting with sellers',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      icon: FileText,
      title: 'Due Diligence',
      description: 'Support with document review, valuation, and transaction processes',
      color: 'text-success-600',
      bgColor: 'bg-success-100',
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Questions about data protection, confidentiality, and platform security',
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
    },
  ];

  return (
    <>
      <SEOHead
        title="Contact Us | flyp M&A Platform"
        description="Get in touch with our M&A experts. Professional support for buyers, sellers, and partners across Europe. Response within 24 hours."
        keywords="contact flyp, M&A support, customer service, business support, help center"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">Get in Touch</h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Our M&A experts are here to help you succeed. Whether you're buying or selling, we
                provide professional support every step of the way.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span className="text-sm font-medium">24h Response Time</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span className="text-sm font-medium">Expert M&A Support</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span className="text-sm font-medium">Multilingual Team</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Contact Options */}
        <Container>
          <div className="py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Primary Contact */}
              <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary-100 rounded-full">
                      <Mail className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Email Support</h3>
                  <p className="text-neutral-600 mb-4">Get professional help via email</p>
                  <a
                    href="mailto:hello@flyp.com"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    hello@flyp.com
                  </a>
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-500">
                    <Clock className="w-4 h-4" />
                    <span>Response within 24 hours</span>
                  </div>
                </CardBody>
              </Card>

              {/* Phone Support */}
              <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-success-100 rounded-full">
                      <Phone className="w-8 h-8 text-success-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Phone Support</h3>
                  <p className="text-neutral-600 mb-4">Speak directly with our experts</p>
                  <a
                    href="tel:+3222345678"
                    className="text-success-600 hover:text-success-700 font-semibold"
                  >
                    +32 2 234 56 78
                  </a>
                  <div className="mt-3 text-sm text-neutral-500">
                    <div>Mon-Fri: 9:00 - 18:00 CET</div>
                    <div>English, Dutch, French</div>
                  </div>
                </CardBody>
              </Card>

              {/* Office Location */}
              <Card className="border border-neutral-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-warning-100 rounded-full">
                      <MapPin className="w-8 h-8 text-warning-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Visit Our Office</h3>
                  <p className="text-neutral-600 mb-4">Meet us in person</p>
                  <div className="text-neutral-700">
                    <div>Brussels, Belgium</div>
                    <div className="text-sm text-neutral-500 mt-2">By appointment only</div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Support Categories */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                How Can We Help You?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportTypes.map((type, index) => (
                  <Card
                    key={index}
                    className="border border-neutral-200 hover:shadow-md transition-shadow"
                  >
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 ${type.bgColor} rounded-lg flex-shrink-0`}>
                          <type.icon className={`w-6 h-6 ${type.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            {type.title}
                          </h3>
                          <p className="text-neutral-600">{type.description}</p>
                        </div>
                      </div>
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
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Send Us a Message</h2>
                <p className="text-lg text-neutral-600">
                  Fill out the form below and we'll get back to you within 24 hours
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
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Company Name"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                      />
                      <Input
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Subject"
                        placeholder="Brief subject line"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                      <Select
                        label="Category"
                        placeholder="Select a category"
                        selectedKeys={formData.category ? [formData.category] : []}
                        onSelectionChange={keys => {
                          const category = Array.from(keys)[0] as string;
                          setFormData({ ...formData, category });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {contactCategories.map(category => (
                          <SelectItem key={category.key}>{category.label}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <AnimatedTextarea
                      label="Message"
                      placeholder="Please describe how we can help you..."
                      value={formData.message}
                      onChange={value => setFormData({ ...formData, message: value })}
                      required
                      minRows={6}
                      maxRows={12}
                      autoResize={true}
                      characterLimit={1000}
                      description="Please provide as much detail as possible to help us assist you better."
                    />

                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={isSubmitting}
                        className="px-12"
                        endContent={!isSubmitting && <ArrowRight className="w-4 h-4" />}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
                Quick Answers
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border border-neutral-200">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      How quickly do you respond?
                    </h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-neutral-700">
                      We respond to all inquiries within 24 hours during business days. Urgent
                      matters are typically addressed within 2-4 hours.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      Do you offer phone consultations?
                    </h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-neutral-700">
                      Yes, we offer phone consultations for all users. Premium subscribers get
                      priority access to our M&A experts.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      What languages do you support?
                    </h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-neutral-700">
                      Our team provides support in English, Dutch, and French to serve our European
                      market effectively.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      Can you help with valuations?
                    </h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-neutral-700">
                      Yes, we offer professional business valuation services starting at €499. Our
                      certified experts provide detailed reports.
                    </p>
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

export default NewContact;
