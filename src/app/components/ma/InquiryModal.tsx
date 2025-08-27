import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Chip,
} from '@heroui/react';
import { AnimatedInput, AnimatedTextarea } from '../forms';
import {
  MessageSquare,
  User,
  Building2,
  Euro,
  Mail,
  Phone,
  FileText,
  X,
  UserPlus,
  Lock,
  MapPin,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { useAuthModal } from '../../contexts/AuthModalContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inquiryData: InquiryData) => void;
  listing: {
    id: string;
    title: string;
    sector: string;
    asking_price?: number;
    currency?: string;
    requires_nda: boolean;
  };
  isLoading?: boolean;
}

interface InquiryData {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  companyName: string;
  position: string;
  investmentCapacity: string;
  financingType: string;
  timeframe: string;
  experience: string;
  message: string;
  interests: string[];
  acceptedTerms: boolean;
  subscribeUpdates: boolean;
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  listing,
  isLoading = false,
}) => {
  const { openModal } = useAuthModal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inquiryData, setInquiryData] = useState<InquiryData>({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    companyName: '',
    position: '',
    investmentCapacity: '',
    financingType: '',
    timeframe: '',
    experience: '',
    message: '',
    interests: [],
    acceptedTerms: false,
    subscribeUpdates: true,
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('betweendeals_auth');
      const user = localStorage.getItem('betweendeals_user');
      setIsAuthenticated(!!(token && user));
    };

    checkAuth();

    // Check auth status when modal opens
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(inquiryData);
    }
  };

  const validateForm = () => {
    const { buyerName, buyerEmail, companyName, message, acceptedTerms } = inquiryData;
    return buyerName && buyerEmail && companyName && message && acceptedTerms;
  };

  const handleLogin = () => {
    openModal('login', {
      url: window.location.pathname,
      state: { listingId: listing.id },
    });
  };

  const handleSignup = () => {
    openModal('signup', {
      url: window.location.pathname,
      state: { listingId: listing.id },
    });
  };

  const renderAuthCTA = () => (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardBody className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Account Required</h3>
            <p className="text-blue-700 text-sm">
              Create an account to connect with sellers and access detailed information
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              color="primary"
              className="flex-1"
              onPress={handleSignup}
              startContent={<UserPlus className="w-4 h-4" />}
            >
              Create Account
            </Button>
            <Button
              variant="bordered"
              className="flex-1"
              onPress={handleLogin}
              startContent={<Lock className="w-4 h-4" />}
            >
              Log In
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-blue-900 text-sm">Benefits of creating an account:</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-blue-800">Direct communication with sellers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-blue-800">
                  Access to detailed business information
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-blue-800">
                  Save favorite listings and get notifications
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Business Opportunity Card - Redesigned */}
      <Card className="border-2 border-gray-200 bg-white shadow-sm">
        <CardBody className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-xl flex-shrink-0">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Business Opportunity</h4>
              <p className="text-sm text-gray-600">
                Premium business listing with detailed information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Business
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{listing.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Sector
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{listing.sector}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Asking Price
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(listing.asking_price, listing.currency)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-gray-900">Active Listing</p>
                </div>
              </div>
            </div>
          </div>

          {listing.requires_nda && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Chip size="sm" color="warning" variant="flat" className="text-xs">
                      NDA Required
                    </Chip>
                  </div>
                  <p className="text-sm text-amber-800">
                    You'll need to sign a Non-Disclosure Agreement to access detailed financial
                    information and sensitive business data.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Business Opportunity Card - Redesigned */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardBody className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-blue-900 mb-1">Business Opportunity</h4>
              <p className="text-sm text-blue-700">
                Premium business listing with detailed information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                    Business
                  </p>
                  <p className="text-sm font-semibold text-blue-900">{listing.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                    Sector
                  </p>
                  <p className="text-sm font-semibold text-blue-900">{listing.sector}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                    Asking Price
                  </p>
                  <p className="text-sm font-semibold text-blue-900">
                    {formatPrice(listing.asking_price, listing.currency)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-blue-900">Active Listing</p>
                </div>
              </div>
            </div>
          </div>

          {listing.requires_nda && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Chip size="sm" color="warning" variant="flat" className="text-xs">
                      NDA Required
                    </Chip>
                  </div>
                  <p className="text-sm text-amber-800">
                    You'll need to sign a Non-Disclosure Agreement to access detailed financial
                    information and sensitive business data.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedInput
            label="Full Name"
            placeholder="Enter your full name"
            value={inquiryData.buyerName}
            onChange={value => setInquiryData(prev => ({ ...prev, buyerName: value }))}
            startContent={<User className="w-4 h-4 text-gray-400" />}
            required
            name="buyerName"
          />

          <AnimatedInput
            label="Email Address"
            type="email"
            placeholder="your.email@company.com"
            value={inquiryData.buyerEmail}
            onChange={value => setInquiryData(prev => ({ ...prev, buyerEmail: value }))}
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            required
            name="buyerEmail"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedInput
            label="Company/Organization"
            placeholder="Your company name"
            value={inquiryData.companyName}
            onChange={value => setInquiryData(prev => ({ ...prev, companyName: value }))}
            startContent={<Building2 className="w-4 h-4 text-gray-400" />}
            required
            name="companyName"
          />

          <AnimatedInput
            label="Position/Title"
            placeholder="Your job title"
            value={inquiryData.position}
            onChange={value => setInquiryData(prev => ({ ...prev, position: value }))}
            startContent={<User className="w-4 h-4 text-gray-400" />}
            name="position"
          />
        </div>

        <AnimatedInput
          label="Phone Number"
          placeholder="+32 123 456 789"
          value={inquiryData.buyerPhone}
          onChange={value => setInquiryData(prev => ({ ...prev, buyerPhone: value }))}
          startContent={<Phone className="w-4 h-4 text-gray-400" />}
          name="buyerPhone"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Investment Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Investment Capacity"
            placeholder="Select your investment range"
            selectedKeys={inquiryData.investmentCapacity ? [inquiryData.investmentCapacity] : []}
            onSelectionChange={keys => {
              const value = Array.from(keys)[0] as string;
              setInquiryData(prev => ({ ...prev, investmentCapacity: value }));
            }}
          >
            <SelectItem key="under-500k">Under €500K</SelectItem>
            <SelectItem key="500k-1m">€500K - €1M</SelectItem>
            <SelectItem key="1m-2m">€1M - €2M</SelectItem>
            <SelectItem key="2m-5m">€2M - €5M</SelectItem>
            <SelectItem key="5m-10m">€5M - €10M</SelectItem>
            <SelectItem key="over-10m">Over €10M</SelectItem>
          </Select>

          <Select
            label="Financing Type"
            placeholder="Select financing preference"
            selectedKeys={inquiryData.financingType ? [inquiryData.financingType] : []}
            onSelectionChange={keys => {
              const value = Array.from(keys)[0] as string;
              setInquiryData(prev => ({ ...prev, financingType: value }));
            }}
          >
            <SelectItem key="cash">Cash</SelectItem>
            <SelectItem key="debt">Debt Financing</SelectItem>
            <SelectItem key="equity">Equity Investment</SelectItem>
            <SelectItem key="mixed">Mixed Financing</SelectItem>
            <SelectItem key="seller-financing">Seller Financing</SelectItem>
          </Select>
        </div>

        <Select
          label="Investment Timeframe"
          placeholder="Select your timeline"
          selectedKeys={inquiryData.timeframe ? [inquiryData.timeframe] : []}
          onSelectionChange={keys => {
            const value = Array.from(keys)[0] as string;
            setInquiryData(prev => ({ ...prev, timeframe: value }));
          }}
        >
          <SelectItem key="immediate">Immediate (0-3 months)</SelectItem>
          <SelectItem key="short-term">Short-term (3-6 months)</SelectItem>
          <SelectItem key="medium-term">Medium-term (6-12 months)</SelectItem>
          <SelectItem key="long-term">Long-term (12+ months)</SelectItem>
        </Select>

        <Select
          label="Industry Experience"
          placeholder="Select your experience level"
          selectedKeys={inquiryData.experience ? [inquiryData.experience] : []}
          onSelectionChange={keys => {
            const value = Array.from(keys)[0] as string;
            setInquiryData(prev => ({ ...prev, experience: value }));
          }}
        >
          <SelectItem key="none">No experience</SelectItem>
          <SelectItem key="limited">Limited experience</SelectItem>
          <SelectItem key="moderate">Moderate experience</SelectItem>
          <SelectItem key="extensive">Extensive experience</SelectItem>
          <SelectItem key="expert">Industry expert</SelectItem>
        </Select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Message</h3>

        <AnimatedTextarea
          label="Inquiry Message"
          placeholder="Tell the seller about your interest in this business, your background, and any specific questions you have..."
          value={inquiryData.message}
          onChange={value => setInquiryData(prev => ({ ...prev, message: value }))}
          minRows={4}
          required
        />

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Areas of Interest (Optional)</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Financial Performance',
              'Customer Base',
              'Operations',
              'Technology',
              'Growth Potential',
              'Management Team',
            ].map(interest => (
              <Checkbox
                key={interest}
                isSelected={inquiryData.interests.includes(interest)}
                onValueChange={checked => {
                  setInquiryData(prev => ({
                    ...prev,
                    interests: checked
                      ? [...prev.interests, interest]
                      : prev.interests.filter(i => i !== interest),
                  }));
                }}
              >
                {interest}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Checkbox
            isSelected={inquiryData.acceptedTerms}
            onValueChange={checked => setInquiryData(prev => ({ ...prev, acceptedTerms: checked }))}
            isRequired
          >
            I agree to the{' '}
            <a href="/terms-and-conditions" className="text-blue-600 hover:text-blue-700 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </a>
          </Checkbox>

          <Checkbox
            isSelected={inquiryData.subscribeUpdates}
            onValueChange={checked =>
              setInquiryData(prev => ({ ...prev, subscribeUpdates: checked }))
            }
          >
            I'd like to receive updates about new features and market insights
          </Checkbox>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      backdrop="blur"
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      hideCloseButton={true}
      classNames={{
        base: 'max-h-[90vh]',
        body: 'overflow-y-auto max-h-[60vh] px-6',
        header: 'pb-4',
      }}
    >
      <ModalContent className="inquiry-modal-content">
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1 pt-6 pb-4 relative">
              {/* Custom Close Button */}
              <button
                className="absolute top-2 right-2 z-[1002] w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 group"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>

              <div className="flex items-center gap-3 pr-10">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  {isAuthenticated ? 'Submit Inquiry' : 'Submit Inquiry'}
                </span>
              </div>

              {isAuthenticated && (
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                  <span className="font-medium">Step {currentStep} of 3</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(step => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          step <= currentStep ? 'bg-blue-600 shadow-sm' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isAuthenticated && (
                <p className="text-sm text-gray-600 mt-2">
                  Create an account or log in to connect with sellers
                </p>
              )}
            </ModalHeader>

            <ModalBody>
              {!isAuthenticated ? (
                renderAuthCTA()
              ) : (
                <>
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                </>
              )}
            </ModalBody>

            <ModalFooter>
              {isAuthenticated && (
                <>
                  <Button variant="bordered" onPress={onClose}>
                    Cancel
                  </Button>

                  {currentStep > 1 && (
                    <Button variant="bordered" onPress={handleBack}>
                      Back
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button
                      color="primary"
                      onPress={handleNext}
                      isDisabled={
                        currentStep === 1 &&
                        !inquiryData.buyerName &&
                        !inquiryData.buyerEmail &&
                        !inquiryData.companyName
                      }
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onPress={handleSubmit}
                      isLoading={isLoading}
                      isDisabled={!validateForm()}
                    >
                      Submit Inquiry
                    </Button>
                  )}
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InquiryModal;
