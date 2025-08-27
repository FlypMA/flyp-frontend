import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem, Textarea, Badge } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  FileText,
  Shield,
  CheckCircle2,
  Upload,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Clock,
  Euro,
  Target,
} from 'lucide-react';
import OnboardingLayout from '../../../components/onboarding/OnboardingLayout';
import TrustSignals from '../../../components/onboarding/TrustSignals';
import ValueProposition from '../../../components/onboarding/ValueProposition';
import OnboardingSuccess from '../../../components/onboarding/OnboardingSuccess';
import { SEOHead } from '../../../components/SEO';

interface SellerData {
  // Step 1: Business Basics
  businessName: string;
  industry: string;
  country: string;
  city: string;
  website: string;

  // Step 2: Business Details
  description: string;
  foundedYear: string;
  employeeCount: string;
  revenueRange: string;
  businessModel: string;
  keyStrengths: string;

  // Step 3: Listing Preferences
  askingPrice: string;
  sellingReason: string;
  timeline: string;
  preferredBuyerType: string;
  confidentiality: string;

  // Step 4: Verification
  verificationStatus: 'pending' | 'documents_uploaded' | 'verified';
  documents: {
    businessRegistration: File | null;
    financialStatements: File | null;
    taxCertificate: File | null;
    ownershipProof: File | null;
  };
}

const ModernSellerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [sellerData, setSellerData] = useState<SellerData>({
    businessName: '',
    industry: '',
    country: '',
    city: '',
    website: '',
    description: '',
    foundedYear: '',
    employeeCount: '',
    revenueRange: '',
    businessModel: '',
    keyStrengths: '',
    askingPrice: '',
    sellingReason: '',
    timeline: '',
    preferredBuyerType: '',
    confidentiality: '',
    verificationStatus: 'pending',
    documents: {
      businessRegistration: null,
      financialStatements: null,
      taxCertificate: null,
      ownershipProof: null,
    },
  });

  const steps = [
    {
      id: 'business-basics',
      title: 'Business Basics',
      subtitle: 'Tell us about your business',
      estimatedTime: '3 min',
      isCompleted: currentStep > 0,
      isActive: currentStep === 0,
    },
    {
      id: 'business-details',
      title: 'Business Details',
      subtitle: 'Describe your business value',
      estimatedTime: '5 min',
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: 'listing-preferences',
      title: 'Listing Setup',
      subtitle: 'Configure your sale preferences',
      estimatedTime: '4 min',
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: 'verification',
      title: 'Verification',
      subtitle: 'Verify your business (optional)',
      estimatedTime: '10 min',
      isCompleted: currentStep > 3,
      isActive: currentStep === 3,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Form options
  const industries = [
    'Technology & Software',
    'Healthcare & Medical',
    'Financial Services',
    'Retail & E-commerce',
    'Manufacturing',
    'Real Estate',
    'Food & Beverage',
    'Transportation & Logistics',
    'Education & Training',
    'Professional Services',
    'Construction',
    'Energy & Utilities',
    'Media & Entertainment',
    'Agriculture',
  ];

  const countries = [
    'Belgium',
    'Netherlands',
    'France',
    'Germany',
    'United Kingdom',
    'Spain',
    'Italy',
    'Portugal',
    'Austria',
    'Switzerland',
  ];

  const employeeCounts = ['1-5', '6-10', '11-25', '26-50', '51-100', '101-250', '250+'];

  const revenueRanges = [
    'Under €100K',
    '€100K - €500K',
    '€500K - €1M',
    '€1M - €2.5M',
    '€2.5M - €5M',
    '€5M - €10M',
    '€10M - €25M',
    '€25M+',
  ];

  const businessModels = [
    'B2B Services',
    'B2C Products',
    'SaaS/Software',
    'E-commerce',
    'Manufacturing',
    'Consulting',
    'Franchise',
    'Subscription',
    'Marketplace',
  ];

  const sellingReasons = [
    'Retirement',
    'Career Change',
    'Health Reasons',
    'Family Reasons',
    'New Business Venture',
    'Relocation',
    'Financial Liquidity',
    'Market Timing',
  ];

  const timelines = [
    'ASAP (1-3 months)',
    'Soon (3-6 months)',
    'This year (6-12 months)',
    'Flexible (12+ months)',
    'Exploring options',
  ];

  const buyerTypes = [
    'Individual Entrepreneur',
    'Strategic Acquirer',
    'Investment Group',
    'Private Equity',
    'Family Office',
    'Any Qualified Buyer',
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (field: keyof SellerData['documents'], file: File | null) => {
    setSellerData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return sellerData.businessName && sellerData.industry && sellerData.country;
      case 1:
        return sellerData.description && sellerData.foundedYear && sellerData.employeeCount;
      case 2:
        return sellerData.sellingReason && sellerData.timeline;
      case 3:
        return true; // Verification is optional
      default:
        return false;
    }
  };

  if (showSuccess) {
    return (
      <OnboardingSuccess
        userType="seller"
        userName={sellerData.businessName.split(' ')[0] || 'Business Owner'}
        onContinue={() => navigate('/seller/dashboard')}
        onScheduleCall={() => navigate('/seller/schedule-call')}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-8">
              {/* Step Header */}
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-primary-100 rounded-2xl mb-4">
                  <Building2 className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Tell us about your business
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Start by sharing the basic information about your business. This will be used to
                  create your profile.
                </p>
              </div>

              <div className="space-y-6">
                <Input
                  label="Business Name"
                  placeholder="Enter your official business name"
                  value={sellerData.businessName}
                  onValueChange={value => setSellerData({ ...sellerData, businessName: value })}
                  variant="bordered"
                  size="lg"
                  isRequired
                  description="Use your official registered business name"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Industry"
                    placeholder="Select your industry"
                    selectedKeys={sellerData.industry ? [sellerData.industry] : []}
                    onSelectionChange={keys => {
                      const industry = Array.from(keys)[0] as string;
                      setSellerData({ ...sellerData, industry });
                    }}
                    variant="bordered"
                    size="lg"
                    isRequired
                  >
                    {industries.map(industry => (
                      <SelectItem key={industry}>{industry}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Country"
                    placeholder="Select your country"
                    selectedKeys={sellerData.country ? [sellerData.country] : []}
                    onSelectionChange={keys => {
                      const country = Array.from(keys)[0] as string;
                      setSellerData({ ...sellerData, country });
                    }}
                    variant="bordered"
                    size="lg"
                    isRequired
                  >
                    {countries.map(country => (
                      <SelectItem key={country}>{country}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="City"
                    placeholder="Enter your city"
                    value={sellerData.city}
                    onValueChange={value => setSellerData({ ...sellerData, city: value })}
                    variant="bordered"
                    size="lg"
                    startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                  />

                  <Input
                    label="Website"
                    placeholder="https://yourwebsite.com"
                    value={sellerData.website}
                    onValueChange={value => setSellerData({ ...sellerData, website: value })}
                    variant="bordered"
                    size="lg"
                    description="Your business website (optional)"
                  />
                </div>

                {/* Progress Indicator */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 p-2 bg-blue-500 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Getting Started</h4>
                      <p className="text-sm text-blue-700">
                        This information helps us create your business profile and attract the right
                        buyers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        );

      case 1:
        return (
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-green-100 rounded-2xl mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Describe your business value
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Help buyers understand what makes your business special and attractive.
                </p>
              </div>

              <div className="space-y-6">
                <Textarea
                  label="Business Description"
                  placeholder="Describe your business, what you do, your target market, competitive advantages, and what makes you unique..."
                  value={sellerData.description}
                  onValueChange={value => setSellerData({ ...sellerData, description: value })}
                  variant="bordered"
                  minRows={4}
                  maxRows={8}
                  isRequired
                  description="A compelling description attracts more qualified buyers"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Founded Year"
                    placeholder="e.g., 2015"
                    type="number"
                    value={sellerData.foundedYear}
                    onValueChange={value => setSellerData({ ...sellerData, foundedYear: value })}
                    variant="bordered"
                    startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                    isRequired
                  />

                  <Select
                    label="Number of Employees"
                    placeholder="Select employee count"
                    selectedKeys={sellerData.employeeCount ? [sellerData.employeeCount] : []}
                    onSelectionChange={keys => {
                      const employeeCount = Array.from(keys)[0] as string;
                      setSellerData({ ...sellerData, employeeCount });
                    }}
                    variant="bordered"
                    isRequired
                  >
                    {employeeCounts.map(count => (
                      <SelectItem key={count}>{count}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Annual Revenue"
                    placeholder="Select revenue range"
                    selectedKeys={sellerData.revenueRange ? [sellerData.revenueRange] : []}
                    onSelectionChange={keys => {
                      const revenueRange = Array.from(keys)[0] as string;
                      setSellerData({ ...sellerData, revenueRange });
                    }}
                    variant="bordered"
                    isRequired
                  >
                    {revenueRanges.map(range => (
                      <SelectItem key={range}>{range}</SelectItem>
                    ))}
                  </Select>
                </div>

                <Select
                  label="Business Model"
                  placeholder="Select your business model"
                  selectedKeys={sellerData.businessModel ? [sellerData.businessModel] : []}
                  onSelectionChange={keys => {
                    const businessModel = Array.from(keys)[0] as string;
                    setSellerData({ ...sellerData, businessModel });
                  }}
                  variant="bordered"
                  isRequired
                >
                  {businessModels.map(model => (
                    <SelectItem key={model}>{model}</SelectItem>
                  ))}
                </Select>

                <Textarea
                  label="Key Strengths & Differentiators"
                  placeholder="What are your business's key strengths, competitive advantages, unique assets, or market position?"
                  value={sellerData.keyStrengths}
                  onValueChange={value => setSellerData({ ...sellerData, keyStrengths: value })}
                  variant="bordered"
                  minRows={3}
                  description="Highlight what makes your business stand out"
                />
              </div>
            </CardBody>
          </Card>
        );

      case 2:
        return (
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-purple-100 rounded-2xl mb-4">
                  <Euro className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Configure your sale preferences
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Set your preferences to attract the right buyers and manage your listing
                  effectively.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Asking Price (Optional)"
                    placeholder="e.g., €500,000"
                    value={sellerData.askingPrice}
                    onValueChange={value => setSellerData({ ...sellerData, askingPrice: value })}
                    variant="bordered"
                    size="lg"
                    startContent={<Euro className="w-4 h-4 text-gray-400" />}
                    description="Leave blank to receive offers"
                  />

                  <Select
                    label="Selling Timeline"
                    placeholder="When do you want to sell?"
                    selectedKeys={sellerData.timeline ? [sellerData.timeline] : []}
                    onSelectionChange={keys => {
                      const timeline = Array.from(keys)[0] as string;
                      setSellerData({ ...sellerData, timeline });
                    }}
                    variant="bordered"
                    size="lg"
                    isRequired
                  >
                    {timelines.map(timeline => (
                      <SelectItem key={timeline}>{timeline}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Reason for Selling"
                    placeholder="Why are you selling?"
                    selectedKeys={sellerData.sellingReason ? [sellerData.sellingReason] : []}
                    onSelectionChange={keys => {
                      const sellingReason = Array.from(keys)[0] as string;
                      setSellerData({ ...sellerData, sellingReason });
                    }}
                    variant="bordered"
                    isRequired
                  >
                    {sellingReasons.map(reason => (
                      <SelectItem key={reason}>{reason}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Preferred Buyer Type"
                    placeholder="Who would be ideal?"
                    selectedKeys={
                      sellerData.preferredBuyerType ? [sellerData.preferredBuyerType] : []
                    }
                    onSelectionChange={keys => {
                      const preferredBuyerType = Array.from(keys)[0] as string;
                      setSellerData({ ...sellerData, preferredBuyerType });
                    }}
                    variant="bordered"
                  >
                    {buyerTypes.map(type => (
                      <SelectItem key={type}>{type}</SelectItem>
                    ))}
                  </Select>
                </div>

                <Select
                  label="Confidentiality Level"
                  placeholder="How do you want to handle confidentiality?"
                  selectedKeys={sellerData.confidentiality ? [sellerData.confidentiality] : []}
                  onSelectionChange={keys => {
                    const confidentiality = Array.from(keys)[0] as string;
                    setSellerData({ ...sellerData, confidentiality });
                  }}
                  variant="bordered"
                  isRequired
                >
                  <SelectItem key="full-nda">Full NDA Required - Maximum Privacy</SelectItem>
                  <SelectItem key="blind-listing">
                    Blind Listing - Business Details Hidden
                  </SelectItem>
                  <SelectItem key="semi-public">Semi-Public - Some Details Visible</SelectItem>
                  <SelectItem key="public">Public Listing - All Details Visible</SelectItem>
                </Select>

                {/* Preview Card */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">Listing Preview</h4>
                      <p className="text-sm text-green-700">
                        Here's how your listing will appear to buyers:
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">
                        {sellerData.businessName || 'Your Business Name'}
                      </h5>
                      <Badge color="success" variant="flat" size="sm">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {sellerData.industry || 'Industry'} • {sellerData.country || 'Country'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {sellerData.employeeCount || 'X'} employees •{' '}
                      {sellerData.revenueRange || 'Revenue range'}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        );

      case 3:
        return (
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-orange-100 rounded-2xl mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verify your business (Optional)
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Upload documents to verify your business and increase buyer trust. Verified
                  businesses get 3x more inquiries.
                </p>
              </div>

              <div className="space-y-6">
                {/* Benefits of Verification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">3x</div>
                    <div className="text-sm text-blue-700">More Inquiries</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">+15%</div>
                    <div className="text-sm text-green-700">Higher Valuations</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">50%</div>
                    <div className="text-sm text-purple-700">Faster Process</div>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-4">
                  <FileUploadCard
                    title="Business Registration"
                    description="Official business registration or articles of incorporation"
                    required
                    file={sellerData.documents.businessRegistration}
                    onUpload={file => handleFileUpload('businessRegistration', file)}
                  />
                  <FileUploadCard
                    title="Financial Statements"
                    description="Recent profit & loss statement or financial summary"
                    required
                    file={sellerData.documents.financialStatements}
                    onUpload={file => handleFileUpload('financialStatements', file)}
                  />
                  <FileUploadCard
                    title="Tax Certificate"
                    description="Tax registration or VAT certificate"
                    file={sellerData.documents.taxCertificate}
                    onUpload={file => handleFileUpload('taxCertificate', file)}
                  />
                  <FileUploadCard
                    title="Proof of Ownership"
                    description="Document proving ownership or authorization to sell"
                    file={sellerData.documents.ownershipProof}
                    onUpload={file => handleFileUpload('ownershipProof', file)}
                  />
                </div>

                {/* Security Notice */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    Document Security & Privacy
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All documents are encrypted and stored securely</li>
                    <li>• Only accessible to our verification team</li>
                    <li>• Never shared with buyers without your consent</li>
                    <li>• You can remove documents at any time</li>
                  </ul>
                </div>

                {/* Skip Option */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    You can skip verification now and complete it later from your dashboard.
                  </p>
                  <Button variant="bordered" onPress={() => setCurrentStep(currentStep + 1)}>
                    Skip for Now
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        title="Sell Your Business | BetweenDeals"
        description="Complete seller onboarding to list your business and connect with qualified buyers"
        keywords="sell business, business for sale, M&A platform, business broker"
      />

      <OnboardingLayout
        title="Sell Your Business"
        subtitle="Complete your seller profile to start attracting qualified buyers"
        steps={steps}
        currentStep={currentStep}
        progress={progress}
        onBack={handleBack}
        showBackButton={currentStep > 0}
        estimatedTimeRemaining={currentStep < 3 ? `${(3 - currentStep) * 4} min` : '10 min'}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section on first step */}
            {currentStep === 0 && <ValueProposition userType="seller" variant="hero" />}

            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="bordered"
                onPress={handleBack}
                startContent={<ChevronLeft className="w-4 h-4" />}
                isDisabled={currentStep === 0}
              >
                Back
              </Button>

              <div className="flex items-center space-x-3">
                {currentStep < steps.length - 1 ? (
                  <Button
                    color="primary"
                    size="lg"
                    onPress={handleNext}
                    endContent={<ChevronRight className="w-4 h-4" />}
                    isDisabled={!isStepValid()}
                    className="bg-gradient-to-r from-primary-500 to-blue-600"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    size="lg"
                    onPress={handleComplete}
                    isLoading={isSubmitting}
                    className="bg-gradient-to-r from-green-500 to-emerald-600"
                  >
                    {isSubmitting ? 'Setting Up...' : 'Complete Setup'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ValueProposition userType="seller" variant="sidebar" />
              <TrustSignals variant="full" />
            </div>
          </div>
        </div>
      </OnboardingLayout>
    </>
  );
};

// File Upload Component
interface FileUploadCardProps {
  title: string;
  description: string;
  required?: boolean;
  file: File | null;
  onUpload: (file: File | null) => void;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  description,
  required = false,
  file,
  onUpload,
}) => {
  return (
    <Card className="border border-gray-200">
      <CardBody className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
            <FileText className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">
              {title} {required && <span className="text-red-500">*</span>}
            </h4>
            <p className="text-sm text-gray-600 mb-3">{description}</p>

            <div className="flex items-center space-x-3">
              <input
                type="file"
                id={title}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={e => onUpload(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label
                htmlFor={title}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 hover:bg-primary-200 rounded-lg text-sm font-medium cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Choose File</span>
              </label>
              {file && (
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700 truncate max-w-xs">
                    {file.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ModernSellerOnboarding;
