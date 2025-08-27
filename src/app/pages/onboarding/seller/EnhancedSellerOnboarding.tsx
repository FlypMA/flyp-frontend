import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
  Progress,
} from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  FileText,
  Shield,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
} from 'lucide-react';
import Container from '../../../components/main_UI/containers/container_default';
import { SEOHead } from '../../../components/SEO';
import { useMultiStepForm } from '../../../hooks/usePersistedState';
import FormRecovery, { AutoSaveIndicator } from '../../../components/forms/FormRecovery';
import GuidedTooltip, { TooltipContent } from '../../../components/guidance/GuidedTooltip';
import ProgressiveDisclosure, {
  DisclosureStep,
} from '../../../components/guidance/ProgressiveDisclosure';
import VerificationWorkflow from '../../../components/verification/VerificationWorkflow';

interface SellerOnboardingData {
  // Basic Info
  organization: {
    name: string;
    industry: string;
    description: string;
    founded_year: string;
    employee_count: string;
    website: string;
    country: string;
    city: string;
  };

  // Business Details
  business: {
    annual_revenue: string;
    business_model: string;
    key_strengths: string;
    growth_opportunities: string;
  };

  // Contact & Preferences
  contact: {
    primary_contact: string;
    phone: string;
    preferred_communication: string;
    timezone: string;
  };

  // Verification
  verification: {
    status: 'pending' | 'submitted' | 'approved' | 'rejected';
    submitted_at?: string;
  };
}

const EnhancedSellerOnboarding = () => {
  const navigate = useNavigate();
  const [showRecovery, setShowRecovery] = useState(false);
  const [organizationId, setOrganizationId] = useState<string>('temp-org-id'); // Would come from API
  const [activeTooltips, setActiveTooltips] = useState<Set<string>>(new Set());

  const initialData: SellerOnboardingData = {
    organization: {
      name: '',
      industry: '',
      description: '',
      founded_year: '',
      employee_count: '',
      website: '',
      country: '',
      city: '',
    },
    business: {
      annual_revenue: '',
      business_model: '',
      key_strengths: '',
      growth_opportunities: '',
    },
    contact: {
      primary_contact: '',
      phone: '',
      preferred_communication: '',
      timezone: '',
    },
    verification: {
      status: 'pending',
    },
  };

  const steps = ['basic-info', 'business-details', 'contact-info', 'verification'];

  const {
    formData,
    updateFormData,
    currentStep,
    currentStepIndex,
    goToNextStep,
    goToPreviousStep,
    markStepCompleted,
    isStepCompleted,
    progress,
    isLoading,
    hasPersistedData,
    clearForm,
    save,
  } = useMultiStepForm({
    formKey: 'seller_onboarding',
    initialData,
    steps,
    expirationHours: 72, // 3 days
    onStepComplete: (step, data) => {
      console.log('Step completed:', step, data);
      // Enable next tooltip
      enableTooltip(getNextStepTooltip(step));
    },
    onFormComplete: data => {
      console.log('Form completed:', data);
      navigate('/seller/dashboard');
    },
  });

  // Show recovery modal if persisted data exists
  useEffect(() => {
    if (hasPersistedData && !isLoading) {
      setShowRecovery(true);
    }
  }, [hasPersistedData, isLoading]);

  const enableTooltip = (tooltipId: string) => {
    setActiveTooltips(prev => new Set([...prev, tooltipId]));
  };

  const getNextStepTooltip = (completedStep: string): string => {
    const stepMap: Record<string, string> = {
      'basic-info': 'business-details-tip',
      'business-details': 'contact-info-tip',
      'contact-info': 'verification-tip',
    };
    return stepMap[completedStep] || '';
  };

  // Tooltip configurations
  const tooltips: Record<string, TooltipContent> = {
    'basic-info-start': {
      id: 'basic-info-start',
      title: 'Welcome to Seller Onboarding!',
      description:
        "Let's start by setting up your organization profile. This information will be used across your listings.",
      type: 'info',
      showOnce: true,
      delay: 1000,
    },
    'business-details-tip': {
      id: 'business-details-tip',
      title: 'Business Details Matter',
      description:
        'Providing detailed business information helps attract the right buyers and builds credibility.',
      type: 'tip',
      showOnce: true,
    },
    'verification-important': {
      id: 'verification-important',
      title: 'Verification Increases Trust',
      description:
        'Verified businesses receive 3x more inquiries. Upload your documents to get verified.',
      type: 'success',
      showOnce: true,
    },
  };

  // Progressive disclosure steps for guidance
  const disclosureSteps: DisclosureStep[] = [
    {
      id: 'organization-setup',
      title: 'Set Up Organization Profile',
      description: 'Create your business profile with essential information',
      type: 'required',
      estimatedTime: '5 min',
      isCompleted: isStepCompleted('basic-info'),
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">
            Your organization profile is the foundation of your seller account. Make sure to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
            <li>Use your official business name</li>
            <li>Select the most accurate industry</li>
            <li>Write a compelling business description</li>
            <li>Provide accurate location information</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'business-positioning',
      title: 'Position Your Business',
      description: 'Help buyers understand your value proposition',
      type: 'required',
      estimatedTime: '10 min',
      prerequisites: ['organization-setup'],
      isCompleted: isStepCompleted('business-details'),
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">
            Strong business positioning attracts qualified buyers:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
            <li>Highlight your unique competitive advantages</li>
            <li>Identify clear growth opportunities</li>
            <li>Be honest about revenue ranges</li>
            <li>Choose the right business model category</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact-setup',
      title: 'Configure Communication',
      description: 'Set up how buyers can reach you',
      type: 'required',
      estimatedTime: '3 min',
      prerequisites: ['business-positioning'],
      isCompleted: isStepCompleted('contact-info'),
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">
            Proper contact setup ensures smooth buyer communication:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
            <li>Use a professional email address</li>
            <li>Provide a reliable phone number</li>
            <li>Set communication preferences</li>
            <li>Choose your timezone for scheduling</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'verification-process',
      title: 'Complete Business Verification',
      description: 'Upload documents to verify your business',
      type: 'tip',
      estimatedTime: '15 min',
      isOptional: true,
      prerequisites: ['contact-setup'],
      isCompleted: formData.verification.status === 'approved',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">
            Business verification is optional but highly recommended:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
            <li>Verified businesses get 3x more inquiries</li>
            <li>Builds trust with potential buyers</li>
            <li>Enables premium listing features</li>
            <li>Faster transaction processing</li>
          </ul>
        </div>
      ),
    },
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Food & Beverage',
    'Transportation',
    'Education',
    'Professional Services',
    'Construction',
    'Energy',
  ];

  const countries = [
    'Belgium',
    'Netherlands',
    'France',
    'Germany',
    'United Kingdom',
    'Spain',
    'Italy',
  ];
  const employeeCounts = ['1-5', '6-10', '11-25', '26-50', '51-100', '101-250', '250+'];
  const revenueRanges = [
    'Under €100K',
    '€100K - €500K',
    '€500K - €1M',
    '€1M - €5M',
    '€5M - €10M',
    '€10M+',
  ];
  const businessModels = [
    'B2B Services',
    'B2C Products',
    'SaaS/Software',
    'E-commerce',
    'Manufacturing',
    'Consulting',
    'Franchise',
  ];

  const handleNext = () => {
    markStepCompleted();
    goToNextStep();
  };

  const handleRestore = () => {
    setShowRecovery(false);
    // Data is already restored by the hook
  };

  const handleStartFresh = () => {
    clearForm();
    setShowRecovery(false);
  };

  const handleDiscard = () => {
    clearForm();
    setShowRecovery(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your onboarding...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Enhanced Seller Onboarding | betweendeals"
        description="Complete your seller profile with guided assistance and automatic saving"
        keywords="seller onboarding, business setup, organization profile"
      />

      <div className="min-h-screen bg-neutral-50">
        <Container>
          <div className="max-w-6xl mx-auto py-8">
            {/* Recovery Modal */}
            {showRecovery && hasPersistedData && (
              <div className="mb-6">
                <FormRecovery
                  savedData={{
                    formKey: 'seller_onboarding',
                    title: 'Seller Onboarding',
                    description: 'Organization setup and business profile',
                    lastSaved: new Date().toISOString(),
                    progress,
                    stepCount: steps.length,
                    currentStep: currentStep,
                    dataSize: JSON.stringify(formData).length,
                  }}
                  onRestore={handleRestore}
                  onDiscard={handleDiscard}
                  onStartFresh={handleStartFresh}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Guidance */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <ProgressiveDisclosure
                    steps={disclosureSteps}
                    currentStepId={`${currentStep}-guidance`}
                    showProgress={true}
                  />
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-2">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-neutral-900 mb-2">Seller Onboarding</h1>
                  <p className="text-lg text-neutral-600 mb-4">
                    Set up your seller account with guided assistance
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <Progress value={progress} color="primary" className="flex-1 mr-4" />
                    <AutoSaveIndicator lastSaved={new Date().toISOString()} hasChanges={false} />
                  </div>

                  <p className="text-sm text-neutral-500">
                    Step {currentStepIndex + 1} of {steps.length} • {progress}% complete
                  </p>
                </div>

                <Card className="border border-neutral-200">
                  <CardBody className="p-8">
                    {/* Step 1: Basic Information */}
                    {currentStep === 'basic-info' && (
                      <GuidedTooltip
                        content={tooltips['basic-info-start']}
                        isVisible={activeTooltips.has('basic-info-start')}
                      >
                        <div className="space-y-6">
                          <div className="text-center mb-6">
                            <Building2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                              Organization Information
                            </h2>
                            <p className="text-neutral-600">
                              Let's start with the basic details about your business
                            </p>
                          </div>

                          <Input
                            label="Business Name"
                            placeholder="Enter your official business name"
                            value={formData.organization.name}
                            onValueChange={value =>
                              updateFormData(prev => ({
                                ...prev,
                                organization: { ...prev.organization, name: value },
                              }))
                            }
                            isRequired
                            variant="bordered"
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                              label="Industry"
                              placeholder="Select your industry"
                              selectedKeys={
                                formData.organization.industry
                                  ? [formData.organization.industry]
                                  : []
                              }
                              onSelectionChange={keys => {
                                const industry = Array.from(keys)[0] as string;
                                updateFormData(prev => ({
                                  ...prev,
                                  organization: { ...prev.organization, industry },
                                }));
                              }}
                              isRequired
                              variant="bordered"
                            >
                              {industries.map(industry => (
                                <SelectItem key={industry}>{industry}</SelectItem>
                              ))}
                            </Select>

                            <Select
                              label="Country"
                              placeholder="Select country"
                              selectedKeys={
                                formData.organization.country ? [formData.organization.country] : []
                              }
                              onSelectionChange={keys => {
                                const country = Array.from(keys)[0] as string;
                                updateFormData(prev => ({
                                  ...prev,
                                  organization: { ...prev.organization, country },
                                }));
                              }}
                              isRequired
                              variant="bordered"
                            >
                              {countries.map(country => (
                                <SelectItem key={country}>{country}</SelectItem>
                              ))}
                            </Select>
                          </div>

                          <Textarea
                            label="Business Description"
                            placeholder="Describe what your business does, your target market, and key differentiators..."
                            value={formData.organization.description}
                            onValueChange={value =>
                              updateFormData(prev => ({
                                ...prev,
                                organization: { ...prev.organization, description: value },
                              }))
                            }
                            minRows={4}
                            isRequired
                            variant="bordered"
                          />
                        </div>
                      </GuidedTooltip>
                    )}

                    {/* Step 4: Verification */}
                    {currentStep === 'verification' && (
                      <GuidedTooltip
                        content={tooltips['verification-important']}
                        isVisible={activeTooltips.has('verification-important')}
                      >
                        <div className="space-y-6">
                          <div className="text-center mb-6">
                            <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                              Business Verification
                            </h2>
                            <p className="text-neutral-600">
                              Verify your business to build trust with buyers
                            </p>
                          </div>

                          <VerificationWorkflow
                            organizationId={organizationId}
                            onVerificationComplete={() => {
                              updateFormData(prev => ({
                                ...prev,
                                verification: {
                                  status: 'submitted',
                                  submitted_at: new Date().toISOString(),
                                },
                              }));
                              markStepCompleted();
                            }}
                            onSkip={() => markStepCompleted()}
                          />
                        </div>
                      </GuidedTooltip>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200">
                      <Button
                        variant="bordered"
                        onPress={goToPreviousStep}
                        startContent={<ChevronLeft className="w-4 h-4" />}
                        isDisabled={currentStepIndex === 0}
                      >
                        Back
                      </Button>

                      <Button
                        variant="bordered"
                        onPress={save}
                        startContent={<Save className="w-4 h-4" />}
                      >
                        Save Progress
                      </Button>

                      <Button color="primary" onPress={handleNext}>
                        {currentStepIndex === steps.length - 1 ? 'Complete Setup' : 'Continue'}
                      </Button>
                    </div>
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

export default EnhancedSellerOnboarding;
