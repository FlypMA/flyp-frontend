import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Progress,
  Card,
  CardBody,
} from '@heroui/react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Calculator,
  TrendingUp,
  Users,
  MapPin,
  Building2,
  Sparkles,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BetweendealsLogo } from '../common';

type ModalStep =
  | 'valuation-hook'
  | 'valuation-form'
  | 'valuation-result'
  | 'listing-pitch'
  | 'listing-form'
  | 'success';

interface BusinessValuationData {
  businessName: string;
  industry: string;
  location: string;
  revenueRange: string;
  employeeCount: string;
  businessAge: string;
}

interface BusinessListingData extends BusinessValuationData {
  description: string;
  contactEmail: string;
  contactPhone: string;
  sellingReason: string;
  timeline: string;
}

interface BusinessListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: ModalStep;
}

const BusinessListingModal: React.FC<BusinessListingModalProps> = ({
  isOpen,
  onClose,
  initialStep = 'valuation-hook',
}) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>(initialStep);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [valuationData, setValuationData] = useState<BusinessValuationData>({
    businessName: '',
    industry: '',
    location: '',
    revenueRange: '',
    employeeCount: '',
    businessAge: '',
  });

  const [listingData, setListingData] = useState<BusinessListingData>({
    ...valuationData,
    description: '',
    contactEmail: '',
    contactPhone: '',
    sellingReason: '',
    timeline: '',
  });

  const [calculatedValuation, setCalculatedValuation] = useState<{
    minValue: number;
    maxValue: number;
    confidence: 'high' | 'medium' | 'low';
    factors: string[];
  } | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(initialStep);
    }
  }, [isOpen, initialStep]);

  const industries = [
    'Technology & Software',
    'Healthcare & Medical',
    'Finance & Insurance',
    'Retail & E-commerce',
    'Manufacturing',
    'Real Estate',
    'Food & Beverage',
    'Professional Services',
    'Construction',
    'Transportation & Logistics',
    'Education & Training',
    'Media & Entertainment',
    'Agriculture',
    'Other',
  ];

  const revenueRanges = [
    'Under €100K',
    '€100K - €500K',
    '€500K - €1M',
    '€1M - €2.5M',
    '€2.5M - €5M',
    '€5M - €10M',
    '€10M+',
  ];

  const employeeCounts = ['1-5', '6-10', '11-25', '26-50', '51-100', '100+'];
  const businessAges = ['Under 2 years', '2-5 years', '5-10 years', '10-20 years', '20+ years'];
  const timelines = [
    'Immediate (0-3 months)',
    'Short term (3-6 months)',
    'Medium term (6-12 months)',
    'Long term (1+ years)',
  ];

  // Mock valuation calculation
  const calculateValuation = (data: BusinessValuationData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const revenueMultipliers: Record<string, number> = {
        'Under €100K': 1.5,
        '€100K - €500K': 2.0,
        '€500K - €1M': 2.5,
        '€1M - €2.5M': 3.0,
        '€2.5M - €5M': 3.5,
        '€5M - €10M': 4.0,
        '€10M+': 4.5,
      };

      const industryMultipliers: Record<string, number> = {
        'Technology & Software': 1.4,
        'Healthcare & Medical': 1.2,
        'Finance & Insurance': 1.3,
        'Professional Services': 1.1,
        Manufacturing: 0.9,
        'Retail & E-commerce': 1.0,
        Other: 1.0,
      };

      const baseRevenue = getRevenueAverage(data.revenueRange);
      const revenueMultiplier = revenueMultipliers[data.revenueRange] || 2.0;
      const industryMultiplier = industryMultipliers[data.industry] || 1.0;

      const baseValuation = baseRevenue * revenueMultiplier * industryMultiplier;
      const minValue = Math.round(baseValuation * 0.8);
      const maxValue = Math.round(baseValuation * 1.3);

      setCalculatedValuation({
        minValue,
        maxValue,
        confidence: baseRevenue > 500000 ? 'high' : baseRevenue > 100000 ? 'medium' : 'low',
        factors: [
          `${data.industry} industry multiple`,
          `${data.businessAge} operating history`,
          `${data.employeeCount} employee base`,
          `${data.location} market location`,
        ],
      });

      setIsLoading(false);
      setCurrentStep('valuation-result');
    }, 2000);
  };

  const getRevenueAverage = (range: string): number => {
    const ranges: Record<string, number> = {
      'Under €100K': 50000,
      '€100K - €500K': 300000,
      '€500K - €1M': 750000,
      '€1M - €2.5M': 1750000,
      '€2.5M - €5M': 3750000,
      '€5M - €10M': 7500000,
      '€10M+': 15000000,
    };
    return ranges[range] || 300000;
  };

  const handleValuationSubmit = () => {
    if (!valuationData.businessName || !valuationData.industry || !valuationData.revenueRange) {
      return;
    }
    calculateValuation(valuationData);
  };

  const handleCreateListing = async () => {
    setIsLoading(true);

    // Simulate API call to create listing
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setCurrentStep('valuation-hook');
    setCalculatedValuation(null);
    onClose();
  };

  const getStepProgress = () => {
    const steps = [
      'valuation-hook',
      'valuation-form',
      'valuation-result',
      'listing-form',
      'success',
    ];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderValuationHook = () => (
    <div className="text-center space-y-8 py-12">
      <div className="space-y-4">
        <div className="inline-flex p-4 bg-green-100 rounded-full">
          <Calculator className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Your Free Business Valuation
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Discover what your business is worth in today's market. Professional valuation in under
            2 minutes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">2 min</div>
          <div className="text-sm text-gray-500">Quick process</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
          <div className="text-sm text-gray-500">Free</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">€</div>
          <div className="text-sm text-gray-500">Instant result</div>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
          onPress={() => setCurrentStep('valuation-form')}
          startContent={<Sparkles className="w-5 h-5" />}
        >
          Get My Free Valuation
        </Button>
        <p className="text-sm text-gray-500">
          No obligations • Completely confidential • Used by 10,000+ business owners
        </p>
      </div>
    </div>
  );

  const renderValuationForm = () => (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Tell us about your business</h2>
        <p className="text-gray-600">Just a few quick details to calculate your valuation</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <Input
          label="Business Name"
          placeholder="Enter your business name"
          value={valuationData.businessName}
          onValueChange={value => setValuationData(prev => ({ ...prev, businessName: value }))}
          size="lg"
          variant="bordered"
          isRequired
        />

        <Select
          label="Industry"
          placeholder="Select your industry"
          selectedKeys={valuationData.industry ? [valuationData.industry] : []}
          onSelectionChange={keys => {
            const selectedIndustry = Array.from(keys)[0] as string;
            setValuationData(prev => ({ ...prev, industry: selectedIndustry }));
          }}
          size="lg"
          variant="bordered"
          isRequired
        >
          {industries.map(industry => (
            <SelectItem key={industry}>{industry}</SelectItem>
          ))}
        </Select>

        <Select
          label="Annual Revenue"
          placeholder="Select revenue range"
          selectedKeys={valuationData.revenueRange ? [valuationData.revenueRange] : []}
          onSelectionChange={keys => {
            const selectedRange = Array.from(keys)[0] as string;
            setValuationData(prev => ({ ...prev, revenueRange: selectedRange }));
          }}
          size="lg"
          variant="bordered"
          isRequired
        >
          {revenueRanges.map(range => (
            <SelectItem key={range}>{range}</SelectItem>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Employees"
            selectedKeys={valuationData.employeeCount ? [valuationData.employeeCount] : []}
            onSelectionChange={keys => {
              const selectedCount = Array.from(keys)[0] as string;
              setValuationData(prev => ({ ...prev, employeeCount: selectedCount }));
            }}
            variant="bordered"
          >
            {employeeCounts.map(count => (
              <SelectItem key={count}>{count}</SelectItem>
            ))}
          </Select>

          <Select
            label="Business Age"
            selectedKeys={valuationData.businessAge ? [valuationData.businessAge] : []}
            onSelectionChange={keys => {
              const selectedAge = Array.from(keys)[0] as string;
              setValuationData(prev => ({ ...prev, businessAge: selectedAge }));
            }}
            variant="bordered"
          >
            {businessAges.map(age => (
              <SelectItem key={age}>{age}</SelectItem>
            ))}
          </Select>
        </div>

        <Input
          label="Location"
          placeholder="City, Country"
          value={valuationData.location}
          onValueChange={value => setValuationData(prev => ({ ...prev, location: value }))}
          variant="bordered"
          startContent={<MapPin className="w-4 h-4 text-gray-400" />}
        />
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          variant="ghost"
          onPress={() => setCurrentStep('valuation-hook')}
          startContent={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8"
          onPress={handleValuationSubmit}
          isDisabled={
            !valuationData.businessName || !valuationData.industry || !valuationData.revenueRange
          }
          endContent={<Calculator className="w-4 h-4" />}
        >
          Calculate Valuation
        </Button>
      </div>
    </div>
  );

  const renderValuationResult = () => {
    if (isLoading) {
      return (
        <div className="text-center space-y-8 py-16">
          <div className="space-y-4">
            <div className="inline-flex p-4 bg-blue-100 rounded-full animate-pulse">
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Calculating Your Business Value...
              </h2>
              <p className="text-gray-600">Analyzing market data and industry comparables</p>
            </div>
          </div>
          <Progress size="sm" isIndeterminate className="max-w-xs mx-auto" />
        </div>
      );
    }

    if (!calculatedValuation) return null;

    return (
      <div className="space-y-8 py-8">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-green-100 rounded-full">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Business Valuation</h2>
            <p className="text-gray-600">
              Based on current market data for{' '}
              <span className="font-semibold">{valuationData.businessName}</span>
            </p>
          </div>
        </div>

        <Card className="max-w-lg mx-auto border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardBody className="text-center py-8">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {formatCurrency(calculatedValuation.minValue)} -{' '}
                  {formatCurrency(calculatedValuation.maxValue)}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      calculatedValuation.confidence === 'high'
                        ? 'bg-green-500'
                        : calculatedValuation.confidence === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-orange-500'
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {calculatedValuation.confidence} confidence
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="font-semibold">Based on:</div>
                {calculatedValuation.factors.slice(0, 2).map((factor, index) => (
                  <div key={index}>• {factor}</div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Want to reach serious buyers?</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Create a professional listing to connect with our network of qualified buyers actively
              looking for businesses like yours.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="ghost" onPress={handleClose}>
              Maybe Later
            </Button>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              onPress={() => setCurrentStep('listing-pitch')}
              endContent={<Target className="w-4 h-4" />}
            >
              List My Business
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderListingPitch = () => (
    <div className="text-center space-y-8 py-8">
      <div className="space-y-4">
        <div className="inline-flex p-4 bg-blue-100 rounded-full">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your business deserves the right buyer
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Join thousands of successful business owners who found their perfect buyer through our
            platform.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">12k+</div>
          <div className="text-sm text-gray-500">Active buyers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">€50M+</div>
          <div className="text-sm text-gray-500">In transactions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
          <div className="text-sm text-gray-500">Satisfied sellers</div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="max-w-md mx-auto text-left space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-900">Qualified buyer network</div>
              <div className="text-sm text-gray-600">Pre-vetted buyers with verified financing</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-900">Confidential process</div>
              <div className="text-sm text-gray-600">
                Your information stays private until you're ready
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-900">Professional support</div>
              <div className="text-sm text-gray-600">Expert guidance through every step</div>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          onPress={() => {
            setListingData(prev => ({ ...prev, ...valuationData }));
            setCurrentStep('listing-form');
          }}
          endContent={<ArrowRight className="w-4 h-4" />}
        >
          Create My Listing
        </Button>
      </div>
    </div>
  );

  const renderListingForm = () => (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Create your business listing</h2>
        <p className="text-gray-600">Just a few more details to get you connected with buyers</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <Textarea
          label="Business Description"
          placeholder="Describe your business, what makes it special, key selling points..."
          value={listingData.description}
          onValueChange={value => setListingData(prev => ({ ...prev, description: value }))}
          minRows={4}
          variant="bordered"
          isRequired
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={listingData.contactEmail}
            onValueChange={value => setListingData(prev => ({ ...prev, contactEmail: value }))}
            variant="bordered"
            isRequired
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="+32 xxx xxx xxx"
            value={listingData.contactPhone}
            onValueChange={value => setListingData(prev => ({ ...prev, contactPhone: value }))}
            variant="bordered"
          />
        </div>

        <Select
          label="Selling Reason"
          placeholder="Why are you selling?"
          selectedKeys={listingData.sellingReason ? [listingData.sellingReason] : []}
          onSelectionChange={keys => {
            const selectedReason = Array.from(keys)[0] as string;
            setListingData(prev => ({ ...prev, sellingReason: selectedReason }));
          }}
          variant="bordered"
        >
          <SelectItem key="retirement">Retirement</SelectItem>
          <SelectItem key="new-venture">Starting new venture</SelectItem>
          <SelectItem key="health">Health reasons</SelectItem>
          <SelectItem key="relocation">Relocation</SelectItem>
          <SelectItem key="other">Other</SelectItem>
        </Select>

        <Select
          label="Timeline"
          placeholder="When do you want to sell?"
          selectedKeys={listingData.timeline ? [listingData.timeline] : []}
          onSelectionChange={keys => {
            const selectedTimeline = Array.from(keys)[0] as string;
            setListingData(prev => ({ ...prev, timeline: selectedTimeline }));
          }}
          variant="bordered"
        >
          {timelines.map(timeline => (
            <SelectItem key={timeline}>{timeline}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          variant="ghost"
          onPress={() => setCurrentStep('listing-pitch')}
          startContent={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          onPress={handleCreateListing}
          isLoading={isLoading}
          isDisabled={!listingData.description || !listingData.contactEmail}
          endContent={<CheckCircle2 className="w-4 h-4" />}
        >
          {isLoading ? 'Creating Listing...' : 'Create Listing'}
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-8 py-12">
      <div className="space-y-4">
        <div className="inline-flex p-4 bg-green-100 rounded-full">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your listing is live!</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            <strong>{listingData.businessName}</strong> is now visible to our network of qualified
            buyers.
          </p>
        </div>
      </div>

      <Card className="max-w-md mx-auto bg-blue-50 border-blue-200">
        <CardBody className="text-center py-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-blue-800">What's next?</div>
            <div className="space-y-2 text-sm text-blue-700">
              <div>✉️ We'll email you when buyers show interest</div>
              <div>📊 Track views and inquiries in your dashboard</div>
              <div>🤝 We'll help facilitate buyer meetings</div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-4">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          onPress={() => {
            handleClose();
            navigate('/my-business/overview');
          }}
        >
          Go to Dashboard
        </Button>
        <div>
          <Button variant="ghost" onPress={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'valuation-hook':
        return renderValuationHook();
      case 'valuation-form':
        return renderValuationForm();
      case 'valuation-result':
        return renderValuationResult();
      case 'listing-pitch':
        return renderListingPitch();
      case 'listing-form':
        return renderListingForm();
      case 'success':
        return renderSuccess();
      default:
        return renderValuationHook();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      backdrop="opaque"
      isDismissable={true}
      hideCloseButton={true}
      classNames={{
        wrapper: 'z-[100]',
        backdrop: 'z-[99] bg-black/60',
        base: 'z-[101]',
      }}
    >
      <ModalContent className="max-h-[90vh] overflow-y-auto">
        <ModalBody className="p-0">
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <BetweendealsLogo variant="header" className="h-8 w-8" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {currentStep === 'valuation-hook' ||
                    currentStep === 'valuation-form' ||
                    currentStep === 'valuation-result'
                      ? 'Business Valuation'
                      : 'List Your Business'}
                  </div>
                  {currentStep !== 'valuation-hook' && currentStep !== 'success' && (
                    <Progress
                      size="sm"
                      value={getStepProgress()}
                      className="w-48 mt-1"
                      color="success"
                    />
                  )}
                </div>
              </div>
              <Button isIconOnly variant="ghost" onPress={handleClose} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">{renderCurrentStep()}</div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BusinessListingModal;
