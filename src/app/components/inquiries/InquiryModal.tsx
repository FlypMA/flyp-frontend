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
  Select,
  SelectItem,
  Checkbox,
  Divider,
  Card,
  CardBody,
  Chip,
} from '@heroui/react';
import {
  Send,
  Building2,
  MapPin,
  Euro,
  FileText,
  Shield,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  sector: string;
  country: string;
  asking_price?: number;
  currency: string;
  requires_nda: boolean;
  anonymous: boolean;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
  onSubmit: (inquiryData: InquiryFormData) => Promise<void>;
}

interface InquiryFormData {
  message: string;
  buyer_background: string;
  intended_use: string;
  financing_confirmed: boolean;
  investment_timeline: string;
  nda_accepted: boolean;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, listing, onSubmit }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    message: '',
    buyer_background: '',
    intended_use: '',
    financing_confirmed: false,
    investment_timeline: '',
    nda_accepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        message: '',
        buyer_background: '',
        intended_use: '',
        financing_confirmed: false,
        investment_timeline: '',
        nda_accepted: false,
      });
      setStep(1);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const isStep1Valid =
    formData.message.trim().length >= 50 && formData.buyer_background.trim().length >= 20;

  const isStep2Valid =
    formData.intended_use.trim().length > 0 &&
    formData.investment_timeline.length > 0 &&
    (!listing.requires_nda || formData.nda_accepted);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      isDismissable={!isSubmitting}
      backdrop="blur"
      classNames={{
        wrapper: 'z-[1000]',
        backdrop: 'bg-black/50 backdrop-blur-sm z-[999]',
        base: 'bg-white shadow-2xl border-0 z-[1001]',
        header: 'border-b border-gray-100 bg-white rounded-t-lg',
        body: 'bg-white',
        footer: 'border-t border-gray-100 bg-gray-50 rounded-b-lg',
      }}
      closeButton={
        <button
          className="absolute top-4 right-4 z-[1002] w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 group"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      }
    >
      <ModalContent className="inquiry-modal-content">
        <ModalHeader className="flex flex-col gap-1 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Submit Inquiry</h2>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Step {step} of 2 - Express your interest in this business
          </p>
        </ModalHeader>

        <ModalBody className="gap-4">
          {/* Listing Summary */}
          <Card className="bg-blue-50">
            <CardBody className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {listing.anonymous ? 'Anonymous Business Listing' : listing.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{listing.sector}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{listing.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Euro className="w-4 h-4" />
                      <span>{formatPrice(listing.asking_price, listing.currency)}</span>
                    </div>
                  </div>

                  {listing.requires_nda && (
                    <div className="flex items-center gap-2 mt-2">
                      <Shield className="w-4 h-4 text-orange-600" />
                      <Chip size="sm" color="warning" variant="flat">
                        NDA Required
                      </Chip>
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to Seller *
                </label>
                <Textarea
                  placeholder="Introduce yourself and explain your interest in this business. Be specific about your acquisition goals and why this business fits your criteria..."
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  minRows={4}
                  maxRows={8}
                  description={`${formData.message.length}/500 characters (minimum 50 required)`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Background *
                </label>
                <Textarea
                  placeholder="Describe your business background, relevant experience, and why you're qualified to acquire this business..."
                  value={formData.buyer_background}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, buyer_background: e.target.value }))
                  }
                  minRows={3}
                  maxRows={6}
                  description={`${formData.buyer_background.length}/300 characters (minimum 20 required)`}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Professional Inquiry Tips</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Be specific about your acquisition criteria and goals</li>
                      <li>• Mention your financing arrangements or capabilities</li>
                      <li>• Explain how you would add value to the business</li>
                      <li>• Include relevant industry experience or connections</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intended Use of Business *
                </label>
                <Select
                  placeholder="Select your intended use"
                  selectedKeys={formData.intended_use ? [formData.intended_use] : []}
                  onSelectionChange={keys => {
                    const value = Array.from(keys)[0] as string;
                    setFormData(prev => ({ ...prev, intended_use: value }));
                  }}
                >
                  <SelectItem key="strategic_acquisition">Strategic Acquisition</SelectItem>
                  <SelectItem key="investment_growth">Investment for Growth</SelectItem>
                  <SelectItem key="portfolio_addition">Portfolio Addition</SelectItem>
                  <SelectItem key="industry_consolidation">Industry Consolidation</SelectItem>
                  <SelectItem key="geographic_expansion">Geographic Expansion</SelectItem>
                  <SelectItem key="asset_acquisition">Asset Acquisition</SelectItem>
                  <SelectItem key="management_buyout">Management Buyout</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Timeline *
                </label>
                <Select
                  placeholder="Select your preferred timeline"
                  selectedKeys={formData.investment_timeline ? [formData.investment_timeline] : []}
                  onSelectionChange={keys => {
                    const value = Array.from(keys)[0] as string;
                    setFormData(prev => ({ ...prev, investment_timeline: value }));
                  }}
                >
                  <SelectItem key="immediate">Immediate (within 1 month)</SelectItem>
                  <SelectItem key="short_term">Short term (1-3 months)</SelectItem>
                  <SelectItem key="medium_term">Medium term (3-6 months)</SelectItem>
                  <SelectItem key="long_term">Long term (6+ months)</SelectItem>
                  <SelectItem key="flexible">Flexible timeline</SelectItem>
                </Select>
              </div>

              <div>
                <Checkbox
                  isSelected={formData.financing_confirmed}
                  onValueChange={checked =>
                    setFormData(prev => ({ ...prev, financing_confirmed: checked }))
                  }
                >
                  <div className="flex flex-col">
                    <span className="font-medium">Financing confirmed</span>
                    <span className="text-sm text-gray-600">
                      I have confirmed financing arrangements for this acquisition
                    </span>
                  </div>
                </Checkbox>
              </div>

              {listing.requires_nda && (
                <>
                  <Divider />
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-900 mb-2">NDA Required</h4>
                        <p className="text-sm text-orange-700 mb-3">
                          This business requires a Non-Disclosure Agreement (NDA) before sharing
                          detailed information. By accepting, you agree to maintain confidentiality
                          of all shared business information.
                        </p>
                        <Checkbox
                          isSelected={formData.nda_accepted}
                          onValueChange={checked =>
                            setFormData(prev => ({ ...prev, nda_accepted: checked }))
                          }
                          color="warning"
                        >
                          <span className="font-medium text-orange-900">
                            I accept the NDA terms and conditions *
                          </span>
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onClose} isDisabled={isSubmitting}>
            Cancel
          </Button>

          {step === 1 ? (
            <Button color="primary" onPress={handleNext} isDisabled={!isStep1Valid}>
              Next: Details
            </Button>
          ) : (
            <>
              <Button variant="bordered" onPress={handleBack} isDisabled={isSubmitting}>
                Back
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                isDisabled={!isStep2Valid}
                startContent={!isSubmitting ? <Send className="w-4 h-4" /> : null}
              >
                Submit Inquiry
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InquiryModal;
