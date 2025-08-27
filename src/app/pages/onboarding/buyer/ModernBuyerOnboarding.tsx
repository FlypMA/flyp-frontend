import React, { useState } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem, Textarea, Chip } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  TrendingUp,
  MapPin,
  Euro,
  Building2,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  Search,
  Bell,
  Briefcase,
  Clock,
  Shield,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import OnboardingLayout from '../../../components/onboarding/OnboardingLayout';
import TrustSignals from '../../../components/onboarding/TrustSignals';
import ValueProposition from '../../../components/onboarding/ValueProposition';
import OnboardingSuccess from '../../../components/onboarding/OnboardingSuccess';
import { SEOHead } from '../../../components/SEO';

interface BuyerData {
  // Step 1: Buyer Profile
  fullName: string;
  background: string;
  experience: string;
  investmentType: string;
  financingStatus: string;

  // Step 2: Investment Criteria
  budgetMin: string;
  budgetMax: string;
  preferredIndustries: string[];
  preferredCountries: string[];
  businessModels: string[];

  // Step 3: Size & Financial Preferences
  revenueRanges: string[];
  employeeRanges: string[];
  timeline: string;
  dealStructure: string[];

  // Step 4: Search Preferences
  savedSearchName: string;
  alertTypes: string[];
  communicationPrefs: string[];
  searchFrequency: string;
}

const ModernBuyerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [buyerData, setBuyerData] = useState<BuyerData>({
    fullName: '',
    background: '',
    experience: '',
    investmentType: '',
    financingStatus: '',
    budgetMin: '',
    budgetMax: '',
    preferredIndustries: [],
    preferredCountries: [],
    businessModels: [],
    revenueRanges: [],
    employeeRanges: [],
    timeline: '',
    dealStructure: [],
    savedSearchName: '',
    alertTypes: [],
    communicationPrefs: [],
    searchFrequency: '',
  });

  const steps = [
    {
      id: 'buyer-profile',
      title: 'Your Profile',
      subtitle: 'Tell us about your background',
      estimatedTime: '4 min',
      isCompleted: currentStep > 0,
      isActive: currentStep === 0,
    },
    {
      id: 'investment-criteria',
      title: 'Investment Criteria',
      subtitle: 'Define your investment preferences',
      estimatedTime: '5 min',
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: 'deal-preferences',
      title: 'Deal Preferences',
      subtitle: 'Size and structure preferences',
      estimatedTime: '3 min',
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: 'search-setup',
      title: 'Search Setup',
      subtitle: 'Configure alerts and matching',
      estimatedTime: '3 min',
      isCompleted: currentStep > 3,
      isActive: currentStep === 3,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Form options
  const experienceLevels = [
    'First-time buyer - New to business acquisitions',
    'Some M&A experience - 1-2 previous deals',
    'Experienced acquirer - 3-5 previous deals',
    'Serial entrepreneur - Multiple acquisitions',
    'Investment professional - Institutional experience',
  ];

  const investmentTypes = [
    'Individual Investor - Personal investment',
    'Investment Group - Small group of investors',
    'Family Office - Managing family wealth',
    'Private Equity Fund - Institutional fund',
    'Strategic Acquirer - Corporate acquisition',
    'Search Fund - Entrepreneur in residence',
  ];

  const financingStatuses = [
    'Self-funded - Personal capital available',
    'SBA loan pre-approved - Ready to close',
    'Bank financing available - Pre-qualified',
    'Investor backing secured - Capital committed',
    'Need financing guidance - Seeking options',
  ];

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
    'Any European Country',
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

  const employeeRanges = [
    '1-5 employees',
    '6-10 employees',
    '11-25 employees',
    '26-50 employees',
    '51-100 employees',
    '101-250 employees',
    '250+ employees',
  ];

  const budgetRanges = [
    'Under €50K',
    '€50K - €100K',
    '€100K - €250K',
    '€250K - €500K',
    '€500K - €1M',
    '€1M - €2.5M',
    '€2.5M - €5M',
    '€5M - €10M',
    '€10M+',
  ];

  const timelines = [
    'Actively looking (next 3 months)',
    'Serious search (next 6 months)',
    'This year (6-12 months)',
    'Long-term planning (12+ months)',
    'Just exploring options',
  ];

  const dealStructures = [
    'Asset Purchase',
    'Stock Purchase',
    'Merger',
    'Partnership/Joint Venture',
    'Licensing Deal',
    'Management Buyout',
    'Any Structure',
  ];

  const alertTypes = [
    'New listings matching criteria',
    'Price reductions on watched businesses',
    'Similar businesses recently sold',
    'Market insights and trends',
    'Featured premium opportunities',
    'Off-market exclusive deals',
  ];

  const communicationPrefs = [
    'Daily email digest',
    'Weekly summary report',
    'Instant notifications for perfect matches',
    'Mobile push notifications',
    'SMS alerts for urgent opportunities',
    'Monthly market insights',
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

  const handleArrayToggle = (
    field: keyof Pick<
      BuyerData,
      | 'preferredIndustries'
      | 'preferredCountries'
      | 'businessModels'
      | 'revenueRanges'
      | 'employeeRanges'
      | 'dealStructure'
      | 'alertTypes'
      | 'communicationPrefs'
    >,
    value: string
  ) => {
    const currentArray = buyerData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];

    setBuyerData({ ...buyerData, [field]: newArray });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return buyerData.fullName && buyerData.background && buyerData.experience;
      case 1:
        return (
          buyerData.budgetMin &&
          buyerData.preferredIndustries.length > 0 &&
          buyerData.preferredCountries.length > 0
        );
      case 2:
        return buyerData.timeline && buyerData.revenueRanges.length > 0;
      case 3:
        return buyerData.alertTypes.length > 0 && buyerData.communicationPrefs.length > 0;
      default:
        return false;
    }
  };

  if (showSuccess) {
    return (
      <OnboardingSuccess
        userType="buyer"
        userName={buyerData.fullName.split(' ')[0] || 'Investor'}
        onContinue={() => navigate('/buyer/dashboard')}
        onScheduleCall={() => navigate('/buyer/schedule-consultation')}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-primary-100 rounded-2xl mb-4">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Tell us about your investment background
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Help us understand your experience and goals to provide the best opportunities.
                </p>
              </div>

              <div className="space-y-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={buyerData.fullName}
                  onValueChange={value => setBuyerData({ ...buyerData, fullName: value })}
                  variant="bordered"
                  size="lg"
                  isRequired
                />

                <Textarea
                  label="Professional Background"
                  placeholder="Tell us about your professional background, industry experience, and what drives your interest in acquiring a business..."
                  value={buyerData.background}
                  onValueChange={value => setBuyerData({ ...buyerData, background: value })}
                  variant="bordered"
                  minRows={4}
                  maxRows={8}
                  isRequired
                  description="This helps us match you with relevant opportunities"
                />

                <div className="grid grid-cols-1 gap-6">
                  <Select
                    label="M&A Experience Level"
                    placeholder="Select your experience with business acquisitions"
                    selectedKeys={buyerData.experience ? [buyerData.experience] : []}
                    onSelectionChange={keys => {
                      const experience = Array.from(keys)[0] as string;
                      setBuyerData({ ...buyerData, experience });
                    }}
                    variant="bordered"
                    size="lg"
                    isRequired
                  >
                    {experienceLevels.map(level => (
                      <SelectItem key={level}>{level}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Investment Type"
                    placeholder="How are you planning to invest?"
                    selectedKeys={buyerData.investmentType ? [buyerData.investmentType] : []}
                    onSelectionChange={keys => {
                      const investmentType = Array.from(keys)[0] as string;
                      setBuyerData({ ...buyerData, investmentType });
                    }}
                    variant="bordered"
                    size="lg"
                  >
                    {investmentTypes.map(type => (
                      <SelectItem key={type}>{type}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Financing Status"
                    placeholder="What's your financing situation?"
                    selectedKeys={buyerData.financingStatus ? [buyerData.financingStatus] : []}
                    onSelectionChange={keys => {
                      const financingStatus = Array.from(keys)[0] as string;
                      setBuyerData({ ...buyerData, financingStatus });
                    }}
                    variant="bordered"
                    size="lg"
                  >
                    {financingStatuses.map(status => (
                      <SelectItem key={status}>{status}</SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Getting Started Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 p-2 bg-blue-500 rounded-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Why This Matters</h4>
                      <p className="text-sm text-blue-700">
                        Understanding your background helps us curate opportunities that match your
                        experience level and provide relevant guidance throughout your acquisition
                        journey.
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
                  <Euro className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Define your investment criteria
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Set your budget and preferences to receive highly targeted opportunities.
                </p>
              </div>

              <div className="space-y-8">
                {/* Budget Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Budget</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Minimum Investment"
                      placeholder="Select minimum budget"
                      selectedKeys={buyerData.budgetMin ? [buyerData.budgetMin] : []}
                      onSelectionChange={keys => {
                        const budgetMin = Array.from(keys)[0] as string;
                        setBuyerData({ ...buyerData, budgetMin });
                      }}
                      variant="bordered"
                      size="lg"
                      isRequired
                    >
                      {budgetRanges.map(range => (
                        <SelectItem key={range}>{range}</SelectItem>
                      ))}
                    </Select>

                    <Select
                      label="Maximum Investment"
                      placeholder="Select maximum budget"
                      selectedKeys={buyerData.budgetMax ? [buyerData.budgetMax] : []}
                      onSelectionChange={keys => {
                        const budgetMax = Array.from(keys)[0] as string;
                        setBuyerData({ ...buyerData, budgetMax });
                      }}
                      variant="bordered"
                      size="lg"
                    >
                      {budgetRanges.map(range => (
                        <SelectItem key={range}>{range}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Industries Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Preferred Industries <span className="text-red-500">*</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {industries.map(industry => (
                      <button
                        key={industry}
                        onClick={() => handleArrayToggle('preferredIndustries', industry)}
                        className={`p-4 text-left text-sm rounded-xl border-2 transition-all hover:shadow-sm ${
                          buyerData.preferredIndustries.includes(industry)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-200 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              buyerData.preferredIndustries.includes(industry)
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {buyerData.preferredIndustries.includes(industry) && (
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="font-medium">{industry}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {buyerData.preferredIndustries.length} industries
                  </p>
                </div>

                {/* Countries Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Preferred Countries <span className="text-red-500">*</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {countries.map(country => (
                      <button
                        key={country}
                        onClick={() => handleArrayToggle('preferredCountries', country)}
                        className={`p-4 text-left text-sm rounded-xl border-2 transition-all hover:shadow-sm ${
                          buyerData.preferredCountries.includes(country)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-200 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              buyerData.preferredCountries.includes(country)
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {buyerData.preferredCountries.includes(country) && (
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="font-medium">{country}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {buyerData.preferredCountries.length} countries
                  </p>
                </div>

                {/* Business Models */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Business Models (Optional)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {businessModels.map(model => (
                      <Chip
                        key={model}
                        onClick={() => handleArrayToggle('businessModels', model)}
                        className={`cursor-pointer transition-all ${
                          buyerData.businessModels.includes(model)
                            ? 'bg-purple-100 text-purple-700 border-purple-500'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-purple-50'
                        }`}
                        variant="bordered"
                      >
                        {model}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Criteria Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    Your Investment Profile Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">Budget:</span>
                      <p className="text-blue-700">
                        {buyerData.budgetMin || 'Min'} - {buyerData.budgetMax || 'Max'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Industries:</span>
                      <p className="text-blue-700">
                        {buyerData.preferredIndustries.length} selected
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Countries:</span>
                      <p className="text-blue-700">
                        {buyerData.preferredCountries.length} selected
                      </p>
                    </div>
                  </div>
                </div>
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
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Business size and deal preferences
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Define the size and structure of deals you're interested in.
                </p>
              </div>

              <div className="space-y-8">
                {/* Revenue Size */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Company Size by Revenue <span className="text-red-500">*</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {revenueRanges.map(range => (
                      <button
                        key={range}
                        onClick={() => handleArrayToggle('revenueRanges', range)}
                        className={`p-3 text-center text-sm rounded-lg border-2 transition-all ${
                          buyerData.revenueRanges.includes(range)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {buyerData.revenueRanges.length} ranges
                  </p>
                </div>

                {/* Employee Size */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Company Size by Employees
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {employeeRanges.map(range => (
                      <button
                        key={range}
                        onClick={() => handleArrayToggle('employeeRanges', range)}
                        className={`p-3 text-center text-sm rounded-lg border-2 transition-all ${
                          buyerData.employeeRanges.includes(range)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Investment Timeline <span className="text-red-500">*</span>
                  </h3>
                  <Select
                    label="When are you looking to acquire?"
                    placeholder="Select your timeline"
                    selectedKeys={buyerData.timeline ? [buyerData.timeline] : []}
                    onSelectionChange={keys => {
                      const timeline = Array.from(keys)[0] as string;
                      setBuyerData({ ...buyerData, timeline });
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

                {/* Deal Structure */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Deal Structure Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dealStructures.map(structure => (
                      <button
                        key={structure}
                        onClick={() => handleArrayToggle('dealStructure', structure)}
                        className={`p-4 text-left text-sm rounded-xl border-2 transition-all ${
                          buyerData.dealStructure.includes(structure)
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded border-2 ${
                              buyerData.dealStructure.includes(structure)
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {buyerData.dealStructure.includes(structure) && (
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="font-medium">{structure}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Urgency Indicator */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 p-2 bg-orange-500 rounded-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Timeline Impact</h4>
                      <p className="text-sm text-orange-700">
                        {buyerData.timeline.includes('Actively')
                          ? "Based on your urgent timeline, we'll prioritize ready-to-close opportunities and provide fast-track support."
                          : buyerData.timeline.includes('Serious')
                            ? 'Your 6-month timeline gives us flexibility to show you the best available deals and some upcoming opportunities.'
                            : 'Your flexible timeline allows us to present premium opportunities and help you build relationships with top sellers.'}
                      </p>
                    </div>
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
                  <Bell className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Set up your deal alerts and matching
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Configure how you want to discover and be notified about new opportunities.
                </p>
              </div>

              <div className="space-y-8">
                {/* Save Search */}
                <div>
                  <Input
                    label="Save This Search As"
                    placeholder="e.g., 'Tech Companies in Belgium'"
                    value={buyerData.savedSearchName}
                    onValueChange={value => setBuyerData({ ...buyerData, savedSearchName: value })}
                    variant="bordered"
                    size="lg"
                    description="Give your search a memorable name for easy access"
                  />
                </div>

                {/* Alert Types */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    What alerts would you like to receive? <span className="text-red-500">*</span>
                  </h3>
                  <div className="space-y-3">
                    {alertTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => handleArrayToggle('alertTypes', type)}
                        className={`w-full p-4 text-left text-sm rounded-xl border-2 transition-all hover:shadow-sm ${
                          buyerData.alertTypes.includes(type)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-200 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              buyerData.alertTypes.includes(type)
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {buyerData.alertTypes.includes(type) && (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{type}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {type.includes('New listings') &&
                                'Get notified immediately when new businesses match your criteria'}
                              {type.includes('Price reductions') &&
                                'Alert when watched businesses reduce their asking price'}
                              {type.includes('Similar businesses') &&
                                'See recent comparable sales in your target industries'}
                              {type.includes('Market insights') &&
                                'Weekly reports on market trends and valuation insights'}
                              {type.includes('Featured') &&
                                'Exclusive access to premium, high-quality opportunities'}
                              {type.includes('Off-market') &&
                                'Private deals not publicly listed on the platform'}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {buyerData.alertTypes.length} alert types
                  </p>
                </div>

                {/* Communication Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    How would you like to receive notifications?{' '}
                    <span className="text-red-500">*</span>
                  </h3>
                  <div className="space-y-3">
                    {communicationPrefs.map(pref => (
                      <button
                        key={pref}
                        onClick={() => handleArrayToggle('communicationPrefs', pref)}
                        className={`w-full p-4 text-left text-sm rounded-xl border-2 transition-all hover:shadow-sm ${
                          buyerData.communicationPrefs.includes(pref)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-200 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              buyerData.communicationPrefs.includes(pref)
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {buyerData.communicationPrefs.includes(pref) && (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="font-medium">{pref}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Setup Complete Preview */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-shrink-0 p-2 bg-green-500 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">You're All Set!</h4>
                      <p className="text-sm text-green-700">
                        Based on your preferences, we'll start showing you relevant opportunities
                        immediately.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="font-medium text-green-900 mb-1">Expected Matches</div>
                      <div className="text-green-700">~15-25 businesses</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="font-medium text-green-900 mb-1">New Alerts</div>
                      <div className="text-green-700">2-5 per week</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="font-medium text-green-900 mb-1">Match Quality</div>
                      <div className="text-green-700">High (85%+)</div>
                    </div>
                  </div>
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
        title="Find Your Perfect Business | BetweenDeals"
        description="Complete buyer onboarding to access exclusive business opportunities and set up personalized deal alerts"
        keywords="buy business, business acquisition, investment opportunities, M&A platform"
      />

      <OnboardingLayout
        title="Find Your Perfect Business"
        subtitle="Set up your buyer profile to discover exclusive opportunities"
        steps={steps}
        currentStep={currentStep}
        progress={progress}
        onBack={handleBack}
        showBackButton={currentStep > 0}
        estimatedTimeRemaining={`${(4 - currentStep) * 3} min`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section on first step */}
            {currentStep === 0 && <ValueProposition userType="buyer" variant="hero" />}

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
                    Continue Setup
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    size="lg"
                    onPress={handleComplete}
                    isLoading={isSubmitting}
                    className="bg-gradient-to-r from-green-500 to-emerald-600"
                    endContent={!isSubmitting && <Search className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Setting Up...' : 'Start Finding Deals'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ValueProposition userType="buyer" variant="sidebar" />
              <TrustSignals variant="full" />

              {/* Quick Stats */}
              <Card className="border border-gray-200">
                <CardBody className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Platform Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Listings</span>
                      <span className="font-semibold text-gray-900">500+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg. Time to Match</span>
                      <span className="font-semibold text-gray-900">3 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="font-semibold text-gray-900">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg. Deal Size</span>
                      <span className="font-semibold text-gray-900">€2.1M</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </OnboardingLayout>
    </>
  );
};

export default ModernBuyerOnboarding;
