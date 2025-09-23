import { useAuth } from '@/app/providers/auth-provider';
import {
  Card,
  CardBody,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { Building2, FileText, Lock, MessageSquare, UserPlus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { AnimatedTextarea, CustomCheckbox, CustomDropdown } from '../forms';

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
  const { openModal, isAuthenticated, user } = useAuth();
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
    acceptedTerms: false,
    subscribeUpdates: true,
  });

  const [currentStep, setCurrentStep] = useState(2);

  // Pre-populate form with user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setInquiryData(prev => ({
        ...prev,
        buyerName: user.name || '',
        buyerEmail: user.email || '',
        buyerPhone: user.phone || '',
        companyName: user.company_name || 'Individual Investor', // Fallback for company name
        position: '', // Position not available in User type
      }));
    }
  }, [isAuthenticated, user]);

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
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(inquiryData);
    }
  };

  const validateForm = () => {
    const { buyerName, buyerEmail, message, acceptedTerms } = inquiryData;
    return buyerName && buyerEmail && message && acceptedTerms;
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
              variant="primary"
              size="md"
              className="flex-1"
              onPress={handleSignup}
              startContent={<UserPlus className="w-4 h-4" />}
            >
              Create Account
            </Button>
            <Button
              variant="secondary"
              size="md"
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

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Investment Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomDropdown
            label="Investment Capacity"
            placeholder="Select your investment range"
            value={inquiryData.investmentCapacity || ''}
            onChange={value => setInquiryData(prev => ({ ...prev, investmentCapacity: value }))}
            options={[
              { value: 'under-500k', label: 'Under €500K' },
              { value: '500k-1m', label: '€500K - €1M' },
              { value: '1m-2m', label: '€1M - €2M' },
              { value: '2m-5m', label: '€2M - €5M' },
              { value: '5m-10m', label: '€5M - €10M' },
              { value: 'over-10m', label: 'Over €10M' },
            ]}
          />

          <CustomDropdown
            label="Financing Type"
            placeholder="Select financing preference"
            value={inquiryData.financingType || ''}
            onChange={value => setInquiryData(prev => ({ ...prev, financingType: value }))}
            options={[
              { value: 'cash', label: 'Cash' },
              { value: 'debt', label: 'Debt Financing' },
              { value: 'equity', label: 'Equity Investment' },
              { value: 'mixed', label: 'Mixed Financing' },
              { value: 'seller-financing', label: 'Seller Financing' },
            ]}
          />
        </div>

        <CustomDropdown
          label="Investment Timeframe"
          placeholder="Select your timeline"
          value={inquiryData.timeframe || ''}
          onChange={value => setInquiryData(prev => ({ ...prev, timeframe: value }))}
          options={[
            { value: 'immediate', label: 'Immediate (0-3 months)' },
            { value: 'short-term', label: 'Short-term (3-6 months)' },
            { value: 'medium-term', label: 'Medium-term (6-12 months)' },
            { value: 'long-term', label: 'Long-term (12+ months)' },
          ]}
        />

        <CustomDropdown
          label="Industry Experience"
          placeholder="Select your experience level"
          value={inquiryData.experience || ''}
          onChange={value => setInquiryData(prev => ({ ...prev, experience: value }))}
          options={[
            { value: 'none', label: 'No experience' },
            { value: 'limited', label: 'Limited experience' },
            { value: 'moderate', label: 'Moderate experience' },
            { value: 'extensive', label: 'Extensive experience' },
            { value: 'expert', label: 'Industry expert' },
          ]}
        />
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
          onChange={e => setInquiryData(prev => ({ ...prev, message: e.target.value }))}
          minRows={4}
          required
          onBlur={() => {}}
          name="message"
        />

        <div className="space-y-3">
          <CustomCheckbox
            name="acceptedTerms"
            label={
              <>
                I agree to the{' '}
                <a
                  href="/terms-and-conditions"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </a>
              </>
            }
            checked={inquiryData.acceptedTerms}
            onChange={() =>
              setInquiryData(prev => ({ ...prev, acceptedTerms: !prev.acceptedTerms }))
            }
            required
          />

          <CustomCheckbox
            name="subscribeUpdates"
            label="I'd like to receive updates about new features and market insights"
            checked={inquiryData.subscribeUpdates}
            onChange={() =>
              setInquiryData(prev => ({ ...prev, subscribeUpdates: !prev.subscribeUpdates }))
            }
          />
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
                  <span className="font-medium">Step {currentStep - 1} of 2</span>
                  <div className="flex gap-2">
                    {[2, 3].map(step => (
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
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                </>
              )}
            </ModalBody>

            <ModalFooter>
              {isAuthenticated && (
                <>
                  <Button variant="secondary" onPress={onClose}>
                    Cancel
                  </Button>

                  {currentStep > 2 && (
                    <Button variant="secondary" onPress={handleBack}>
                      Back
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button variant="primary" onPress={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
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
