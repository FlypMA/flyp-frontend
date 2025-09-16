import React, { useState, useEffect } from 'react';
import { Card, Modal, ModalContent } from '@heroui/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Heart,
  Zap,
  Target,
  Clock,
  Euro,
  Sparkles,
  Award,
  Shield,
  Phone,
  Mail,
  FileText,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Input, AnimatedTextarea } from '../forms';
import { Button } from '../buttons/Button';
// Missing components - will be replaced with simple implementations

export interface SellerFormData {
  businessType: string;
  businessName: string;
  industry: string;
  country: string;
  city: string;
  foundedYear: string;
  description: string;
  employeeCount: string;
  revenueRange: number[];
  sellingReason: string;
  timeline: string;
  priceExpectations: string;
  contactEmail: string;
  contactPhone: string;
  wantsVerification: boolean;
}

interface SellerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: SellerFormData) => void;
  existingData?: SellerFormData | null;
  isEditMode?: boolean;
}

const SellerOnboardingModal: React.FC<SellerOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  existingData,
  isEditMode = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<SellerFormData>({
    businessType: '',
    businessName: '',
    industry: '',
    country: 'Belgium',
    city: '',
    foundedYear: '',
    description: '',
    employeeCount: '',
    revenueRange: [100000, 1000000],
    sellingReason: '',
    timeline: '',
    priceExpectations: '',
    contactEmail: '',
    contactPhone: '',
    wantsVerification: false,
  });

  const totalSteps = 15; // Includes welcome, 13 form steps (merged business type & industry), and success

  // Initialize form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(isEditMode ? 1 : 0); // Skip welcome step in edit mode
      setIsSubmitting(false);

      // Populate form with existing data if in edit mode
      if (isEditMode && existingData) {
        setFormData(existingData);
      } else {
        // Check for saved draft (only in create mode)
        try {
          const savedDraft = localStorage.getItem('sellerOnboardingDraft');
          if (savedDraft) {
            const { formData: draftData, currentStep: draftStep } = JSON.parse(savedDraft);
            // Optional: Ask user if they want to continue from draft
            // For now, automatically load the draft
            setFormData(draftData);
            setCurrentStep(draftStep);
          }
        } catch (error) {
          console.error('Failed to load draft:', error);
        }
      }
    }
  }, [isOpen, isEditMode, existingData]);

  const updateFormData = (updates: Partial<SellerFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSaveDraft = async () => {
    try {
      // Save current progress to localStorage
      localStorage.setItem(
        'sellerOnboardingDraft',
        JSON.stringify({
          formData,
          currentStep,
          timestamp: new Date().toISOString(),
        })
      );

      // Show success feedback
      // You can add a toast notification here
      console.log('Draft saved successfully');

      // Optional: Show a temporary success message
      // This could be replaced with a toast notification system
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear draft after successful submission
    localStorage.removeItem('sellerOnboardingDraft');

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setCurrentStep(totalSteps - 1); // Go to success step
    setIsSubmitting(false);

    // Call completion callback if provided
    if (onComplete) {
      onComplete(formData);
    }
  };

  const getStepTitle = (stepNumber: number): string => {
    const stepTitles: Record<number, string> = {
      1: 'Business Type & Industry',
      2: 'Business Name',
      3: 'Location',
      4: 'Founded Year',
      5: 'Description',
      6: 'Team Size',
      7: 'Revenue',
      8: 'Selling Reason',
      9: 'Timeline',
      10: 'Price Expectations',
      11: 'Contact Email',
      12: 'Phone Number',
      13: 'Verification',
    };
    return stepTitles[stepNumber] || `Step ${stepNumber}`;
  };

  const handleClose = () => {
    // Reset to beginning if not completed
    if (currentStep !== totalSteps - 1) {
      setCurrentStep(0);
    }
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessType !== '' && formData.industry !== '';
      case 2:
        return formData.businessName.trim() !== '';
      case 3:
        return formData.city.trim() !== '';
      case 4:
        return formData.foundedYear !== '';
      case 5:
        return formData.description.trim().length >= 50;
      case 6:
        return formData.employeeCount !== '';
      case 7:
        return true; // Revenue range always valid
      case 8:
        return formData.sellingReason !== '';
      case 9:
        return formData.timeline !== '';
      case 10:
        return formData.priceExpectations !== '';
      case 11:
        return formData.contactEmail.includes('@');
      case 12:
        return formData.contactPhone.trim() !== '';
      case 13:
        return true; // Verification is optional
      default:
        return true;
    }
  };

  const progress = (currentStep / (totalSteps - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Building2 className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ready to sell your business?</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tell us about your business and we'll help you create an attractive listing that
              connects you with serious buyers.
            </p>
            <Button
              size="lg"
              color="primary"
              onPress={handleNext}
              endContent={<ArrowRight className="w-5 h-5" />}
              className="px-8"
            >
              Get Started
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            {/* Business Type and Industry Selector - TODO: Implement */}
            <p className="text-gray-600">Business type and industry selection will be implemented here.</p>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your business name?</h2>
              <p className="text-gray-600">This will be displayed prominently in your listing.</p>
            </div>
            <Input
              placeholder="e.g., Premium Restaurant Brussels"
              value={formData.businessName}
              onChange={value => updateFormData({ businessName: value })}
              className="text-center"
              size="lg"
            />
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Where is your business located?
              </h2>
              <p className="text-gray-600">We'll show this to buyers looking in your area.</p>
            </div>
            <div className="space-y-6">
              <div>
                <Input
                  label="Country"
                  value={formData.country}
                  onChange={value => updateFormData({ country: value })}
                  className="text-center"
                />
              </div>
              <div>
                <Input
                  label="City"
                  placeholder="e.g., Brussels, Antwerp, Ghent"
                  value={formData.city}
                  onChange={value => updateFormData({ city: value })}
                  className="text-center"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <Calendar className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                When was your business founded?
              </h2>
              <p className="text-gray-600">This helps buyers understand your business maturity.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <Card
                    key={year}
                    isPressable
                    onPress={() => {
                      updateFormData({ foundedYear: year.toString() });
                      // Auto-advance to next step after a brief delay for visual feedback
                      setTimeout(() => {
                        handleNext();
                      }, 300);
                    }}
                    className={`p-4 cursor-pointer text-center transition-all hover:shadow-md ${
                      formData.foundedYear === year.toString()
                        ? 'ring-2 ring-primary-500 bg-primary-50'
                        : ''
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        formData.foundedYear === year.toString()
                          ? 'text-primary-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {year}
                    </span>
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <Input
                placeholder="Or enter a different year"
                value={formData.foundedYear}
                onChange={value => updateFormData({ foundedYear: value })}
                className="max-w-xs mx-auto"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="max-w-3xl mx-auto py-12">
            <div className="text-center mb-12">
              <FileText className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Describe your business</h2>
              <p className="text-gray-600">
                Tell potential buyers what makes your business special. Include key services,
                competitive advantages, and growth opportunities.
              </p>
            </div>
            <AnimatedTextarea
              label="Business Description"
              placeholder="e.g., We are a premium restaurant chain operating 5 locations across Brussels. Our restaurants serve contemporary European cuisine with a focus on locally sourced ingredients. We have built a strong reputation for quality service and have a loyal customer base..."
              value={formData.description}
              onChange={value => updateFormData({ description: value })}
              minRows={8}
              className="text-base"
            />
            <div className="mt-2 text-right">
              <span
                className={`text-sm ${formData.description.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}
              >
                {formData.description.length}/50 minimum characters
              </span>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <Users className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How many employees does your business have?
              </h2>
              <p className="text-gray-600">
                This helps buyers understand the scale of your operation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: '1-5', label: '1-5 employees', desc: 'Small team operation' },
                { value: '6-20', label: '6-20 employees', desc: 'Growing business' },
                { value: '21-50', label: '21-50 employees', desc: 'Established operation' },
                { value: '51-100', label: '51-100 employees', desc: 'Medium-sized business' },
                { value: '101-250', label: '101-250 employees', desc: 'Large operation' },
                { value: '250+', label: '250+ employees', desc: 'Enterprise scale' },
              ].map(option => (
                <Card
                  key={option.value}
                  isPressable
                  onPress={() => {
                    updateFormData({ employeeCount: option.value });
                    // Auto-advance to next step after a brief delay for visual feedback
                    setTimeout(() => {
                      handleNext();
                    }, 300);
                  }}
                  className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                    formData.employeeCount === option.value
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : ''
                  }`}
                >
                  <div className="text-center">
                    <h3
                      className={`font-semibold ${
                        formData.employeeCount === option.value
                          ? 'text-primary-700'
                          : 'text-gray-900'
                      }`}
                    >
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            {/* Revenue Range Slider - TODO: Implement */}
            <p className="text-gray-600">Revenue range slider will be implemented here.</p>
          </div>
        );

      case 8:
        return (
          <div className="max-w-3xl mx-auto py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why are you selling your business?
              </h2>
              <p className="text-gray-600">
                Buyers appreciate transparency about your motivations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'retirement', label: 'Retirement', desc: 'Ready to enjoy retirement' },
                { value: 'new-venture', label: 'New Venture', desc: 'Starting a new business' },
                { value: 'relocation', label: 'Relocation', desc: 'Moving to a new location' },
                { value: 'health', label: 'Health Reasons', desc: 'Health considerations' },
                { value: 'growth', label: 'Growth Capital', desc: 'Need investment for growth' },
                { value: 'other', label: 'Other', desc: 'Different reason' },
              ].map(reason => (
                <Card
                  key={reason.value}
                  isPressable
                  onPress={() => {
                    updateFormData({ sellingReason: reason.value });
                    // Auto-advance to next step after a brief delay for visual feedback
                    setTimeout(() => {
                      handleNext();
                    }, 300);
                  }}
                  className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                    formData.sellingReason === reason.value
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : ''
                  }`}
                >
                  <div className="text-center">
                    <h3
                      className={`font-semibold ${
                        formData.sellingReason === reason.value
                          ? 'text-primary-700'
                          : 'text-gray-900'
                      }`}
                    >
                      {reason.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{reason.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            {/* Timeline Selector - TODO: Implement */}
            <p className="text-gray-600">Timeline selector will be implemented here.</p>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            {/* Price Expectations Selector - TODO: Implement */}
            <p className="text-gray-600">Price expectations selector will be implemented here.</p>
          </div>
        );

      case 11:
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <Mail className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your contact email?</h2>
              <p className="text-gray-600">
                We'll use this to send you updates and buyer inquiries.
              </p>
            </div>
            <Input
              type="email"
              placeholder="your.email@company.com"
              value={formData.contactEmail}
              onChange={value => updateFormData({ contactEmail: value })}
              className="text-center"
              size="lg"
            />
          </div>
        );

      case 12:
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <Phone className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your phone number?</h2>
              <p className="text-gray-600">Serious buyers may want to speak with you directly.</p>
            </div>
            <Input
              type="tel"
              placeholder="+32 XXX XX XX XX"
              value={formData.contactPhone}
              onChange={value => updateFormData({ contactPhone: value })}
              className="text-center"
              size="lg"
            />
          </div>
        );

      case 13:
        return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Would you like business verification?
              </h2>
              <p className="text-gray-600">
                Verified businesses get more attention from serious buyers. We'll help you verify
                your business documents.
              </p>
            </div>
            <div className="space-y-4">
              <Card
                isPressable
                onPress={() => updateFormData({ wantsVerification: true })}
                className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                  formData.wantsVerification ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <CheckCircle
                    className={`w-6 h-6 ${
                      formData.wantsVerification ? 'text-primary-600' : 'text-gray-400'
                    }`}
                  />
                  <div>
                    <h3
                      className={`font-semibold ${
                        formData.wantsVerification ? 'text-primary-700' : 'text-gray-900'
                      }`}
                    >
                      Yes, verify my business
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get a verified badge and attract more qualified buyers
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                isPressable
                onPress={() => updateFormData({ wantsVerification: false })}
                className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                  !formData.wantsVerification ? 'ring-2 ring-gray-300 bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <X
                    className={`w-6 h-6 ${
                      !formData.wantsVerification ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  />
                  <div>
                    <h3
                      className={`font-semibold ${
                        !formData.wantsVerification ? 'text-gray-700' : 'text-gray-900'
                      }`}
                    >
                      Not right now
                    </h3>
                    <p className="text-sm text-gray-600">
                      I'll list my business without verification for now
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your business listing has been created successfully. We'll review your information and
              get your listing live within 24 hours.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" color="primary" onPress={() => handleClose()} className="px-8">
                Go to Dashboard
              </Button>
              <Button size="lg" variant="bordered" onPress={() => handleClose()} className="px-8">
                Close
              </Button>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="full"
      classNames={{
        base: 'h-screen max-h-screen w-screen max-w-none m-0 rounded-none',
        body: 'p-0',
        header: 'hidden',
        footer: 'hidden',
        wrapper: 'w-full h-full p-0',
      }}
      hideCloseButton
      isDismissable={currentStep === 0 || currentStep === totalSteps - 1}
    >
      <ModalContent className="h-full">
        <div className="h-full flex">
          {/* Left Sidebar - Steps */}
          {currentStep > 0 && currentStep < totalSteps - 1 && (
            <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
              {/* Step Counter */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Progress</h3>
                  <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Step Information */}
              <div className="flex-1 p-6">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary-600 mb-1">Step {currentStep}</div>
                  <div className="text-sm text-gray-500">of {totalSteps - 2} steps</div>
                </div>

                {/* Step Indicators */}
                <div className="space-y-3">
                  {Array.from({ length: totalSteps - 2 }).map((_, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    const isUpcoming = stepNumber > currentStep;

                    return (
                      <div key={stepNumber} className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCompleted
                              ? 'bg-primary-600 text-white'
                              : isCurrent
                                ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-600'
                                : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                        </div>
                        <div
                          className={`text-sm ${
                            isCurrent
                              ? 'text-gray-900 font-medium'
                              : isCompleted
                                ? 'text-gray-700'
                                : 'text-gray-400'
                          }`}
                        >
                          {getStepTitle(stepNumber)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons in Sidebar */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  {currentStep > 1 && (
                    <Button
                      variant="flat"
                      onPress={handleBack}
                      startContent={<ArrowLeft className="w-4 h-4" />}
                      className="w-full justify-start"
                      size="lg"
                    >
                      Go Back
                    </Button>
                  )}

                  {currentStep === 14 ? (
                    <Button
                      color="primary"
                      onPress={handleSubmit}
                      isLoading={isSubmitting}
                      endContent={!isSubmitting && <CheckCircle className="w-5 h-5" />}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting
                        ? isEditMode
                          ? 'Saving changes...'
                          : 'Setting up your listing...'
                        : isEditMode
                          ? 'Save Changes'
                          : 'Complete Setup'}
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onPress={handleNext}
                      isDisabled={!isStepValid()}
                      endContent={<ArrowRight className="w-4 h-4" />}
                      className="w-full"
                      size="lg"
                    >
                      Continue
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Close Button - Larger and more prominent */}
            <div className="absolute top-6 right-6 z-50">
              <Button
                isIconOnly
                variant="flat"
                onPress={handleClose}
                className="w-12 h-12 text-gray-500 hover:text-gray-900 hover:bg-gray-100 shadow-md"
                size="lg"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-8">{renderStep()}</div>

              {/* Enhanced Navigation - Always Visible */}
              {/* Navigation - TODO: Implement SellerOnboardingNavigation component */}
              <div className="flex justify-between items-center p-4 border-t">
                <Button
                  variant="bordered"
                  onPress={handleBack}
                  isDisabled={currentStep <= 1}
                >
                  Back
                </Button>
                <Button
                  color="primary"
                  onPress={currentStep === 14 ? handleSubmit : handleNext}
                  isLoading={isSubmitting}
                  isDisabled={!isStepValid()}
                >
                  {currentStep === 14 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SellerOnboardingModal;
