// 💬 InquiryModal - Professional inquiry form
// Location: src/features/listings/components/InquiryModal.tsx
// Purpose: Business inquiry form matching legacy functionality exactly

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  Chip,
  Checkbox,
} from '@heroui/react';
import {
  MessageSquare,
  Shield,
  Building2,
  User,
  Mail,
  Phone,
  Send,
  AlertTriangle,
} from 'lucide-react';

interface ListingInfo {
  id: string;
  title: string;
  sector: string;
  asking_price?: number;
  currency: string;
  requires_nda: boolean;
}

interface InquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  agreeToNda: boolean;
  agreeToTerms: boolean;
  experienceLevel: 'first-time' | 'experienced' | 'professional';
  timeframe: '0-3-months' | '3-6-months' | '6-12-months' | 'exploring';
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingInfo;
  onSubmit: (inquiryData: InquiryData) => Promise<void>;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, listing, onSubmit }) => {
  const [formData, setFormData] = useState<InquiryData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: `Hello,

I am interested in learning more about "${listing.title}". Could you please provide additional information about:

• Financial performance and key metrics
• Reason for sale and timeline
• Key operational details
• Growth opportunities

I look forward to discussing this opportunity further.

Best regards,`,
    agreeToNda: false,
    agreeToTerms: false,
    experienceLevel: 'experienced',
    timeframe: '3-6-months',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    if (listing.requires_nda && !formData.agreeToNda)
      newErrors.agreeToNda = 'NDA agreement is required for this listing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        message: `Hello,

I am interested in learning more about "${listing.title}". Could you please provide additional information about:

• Financial performance and key metrics
• Reason for sale and timeline
• Key operational details
• Growth opportunities

I look forward to discussing this opportunity further.

Best regards,`,
        agreeToNda: false,
        agreeToTerms: false,
        experienceLevel: 'experienced',
        timeframe: '3-6-months',
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof InquiryData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: 'rounded-2xl',
        backdrop: 'bg-black/50',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center gap-3 border-b border-gray-100">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Submit Inquiry</h2>
                <p className="text-sm text-gray-600">
                  Get in touch about this business opportunity
                </p>
              </div>
            </ModalHeader>

            <ModalBody className="py-6 space-y-6">
              {/* Listing Summary */}
              <Card className="border border-blue-100 bg-blue-50">
                <CardBody className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900">{listing.title}</h3>
                        <p className="text-sm text-blue-700">
                          {listing.sector} • {formatPrice(listing.asking_price, listing.currency)}
                        </p>
                      </div>
                    </div>
                    {listing.requires_nda && (
                      <Chip
                        size="sm"
                        className="bg-orange-100 text-orange-800"
                        startContent={<Shield className="w-3 h-3" />}
                      >
                        NDA Required
                      </Chip>
                    )}
                  </div>
                </CardBody>
              </Card>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={e => handleInputChange('firstName', e.target.value)}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName}
                    variant="bordered"
                    startContent={<User className="w-4 h-4 text-gray-400" />}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={e => handleInputChange('lastName', e.target.value)}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName}
                    variant="bordered"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    placeholder="your@email.com"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    variant="bordered"
                    startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+32 123 456 789"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone}
                    variant="bordered"
                    startContent={<Phone className="w-4 h-4 text-gray-400" />}
                  />
                </div>

                <Input
                  label="Company (Optional)"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={e => handleInputChange('company', e.target.value)}
                  variant="bordered"
                  startContent={<Building2 className="w-4 h-4 text-gray-400" />}
                />
              </div>

              {/* Purchase Intent */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Purchase Intent</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={e => handleInputChange('experienceLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="first-time">First-time buyer</option>
                      <option value="experienced">Experienced buyer</option>
                      <option value="professional">Professional investor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Timeframe
                    </label>
                    <select
                      value={formData.timeframe}
                      onChange={e => handleInputChange('timeframe', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="0-3-months">0-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Message to Seller</label>
                <Textarea
                  placeholder="Write your message to the seller..."
                  value={formData.message}
                  onChange={e => handleInputChange('message', e.target.value)}
                  minRows={6}
                  isInvalid={!!errors.message}
                  errorMessage={errors.message}
                  variant="bordered"
                />
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                {listing.requires_nda && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-900 mb-2">
                          NDA Agreement Required
                        </h4>
                        <p className="text-sm text-orange-800 mb-3">
                          This business listing requires a Non-Disclosure Agreement (NDA) before
                          detailed information can be shared. By submitting this inquiry, you agree
                          to maintain confidentiality of all information received.
                        </p>
                        <Checkbox
                          isSelected={formData.agreeToNda}
                          onValueChange={checked => handleInputChange('agreeToNda', checked)}
                          className="text-sm"
                        >
                          <span className="text-orange-800">
                            I agree to sign an NDA and maintain confidentiality
                          </span>
                        </Checkbox>
                        {errors.agreeToNda && (
                          <p className="text-red-600 text-sm mt-1">{errors.agreeToNda}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <Checkbox
                  isSelected={formData.agreeToTerms}
                  onValueChange={checked => handleInputChange('agreeToTerms', checked)}
                  className="text-sm"
                >
                  <span className="text-gray-700">
                    I agree to the{' '}
                    <button className="text-blue-600 hover:underline">Terms of Service</button> and{' '}
                    <button className="text-blue-600 hover:underline">Privacy Policy</button>
                  </span>
                </Checkbox>
                {errors.agreeToTerms && (
                  <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>
                )}
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-gray-100">
              <Button
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
                className="text-gray-600"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isLoading}
                startContent={!isLoading ? <Send className="w-4 h-4" /> : null}
                className="bg-blue-600 hover:bg-blue-700 font-semibold"
              >
                {isLoading ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InquiryModal;
