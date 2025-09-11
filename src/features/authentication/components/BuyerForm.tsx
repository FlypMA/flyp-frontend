import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
  Progress,
  Checkbox,
  Chip,
} from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Target,
  Euro,
  TrendingUp,
  MapPin,
  Building2,
  CheckCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
// import Container from '../../../components/main_UI/containers/container_default'; // TODO: Fix import
// import { SEOHead } from '../../../components/SEO'; // TODO: Fix import

interface BuyerProfile {
  background: string;
  experience: string;
  investment_type: string;
  financing_status: string;
  timeline: string;
}

interface InvestmentCriteria {
  budget_min: string;
  budget_max: string;
  preferred_industries: string[];
  preferred_countries: string[];
  business_models: string[];
  revenue_range: string[];
  company_size: string[];
}

interface SearchPreferences {
  search_frequency: string;
  alert_types: string[];
  communication_preferences: string[];
  saved_search_name: string;
}

const BuyerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile>({
    background: '',
    experience: '',
    investment_type: '',
    financing_status: '',
    timeline: '',
  });

  const [investmentCriteria, setInvestmentCriteria] = useState<InvestmentCriteria>({
    budget_min: '',
    budget_max: '',
    preferred_industries: [],
    preferred_countries: [],
    business_models: [],
    revenue_range: [],
    company_size: [],
  });

  const [searchPreferences, setSearchPreferences] = useState<SearchPreferences>({
    search_frequency: '',
    alert_types: [],
    communication_preferences: [],
    saved_search_name: '',
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const experienceLevels = [
    'First-time buyer',
    'Some M&A experience',
    'Experienced acquirer',
    'Serial entrepreneur',
    'Investment professional',
  ];

  const investmentTypes = [
    'Individual investor',
    'Investment group',
    'Private equity fund',
    'Strategic acquirer',
    'Family office',
    'Search fund',
  ];

  const financingStatuses = [
    'Self-funded',
    'SBA loan pre-approved',
    'Bank financing available',
    'Investor backing secured',
    'Need financing guidance',
  ];

  const timelines = [
    'Actively looking (next 3 months)',
    'Serious search (next 6 months)',
    'Exploring options (next year)',
    'Long-term planning (1+ years)',
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
    'Any European country',
  ];

  const businessModels = [
    'B2B Services',
    'B2C Products',
    'SaaS/Software',
    'E-commerce',
    'Manufacturing',
    'Consulting',
    'Franchise',
    'Subscription business',
  ];

  const revenueRanges = [
    'Under €100K',
    '€100K - €500K',
    '€500K - €1M',
    '€1M - €5M',
    '€5M - €10M',
    '€10M - €50M',
    '€50M+',
  ];

  const companySizes = [
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

  const alertTypes = [
    'New listings matching criteria',
    'Price reductions',
    'Similar businesses sold',
    'Market insights',
    'Featured opportunities',
  ];

  const communicationPrefs = [
    'Daily email digest',
    'Weekly summary',
    'Instant notifications',
    'Mobile push notifications',
    'SMS alerts for urgent matches',
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      // Here you would submit the buyer profile and preferences
      // await buyerService.updateProfile(buyerProfile);
      // await searchService.saveInvestmentCriteria(investmentCriteria);
      // await notificationService.setupPreferences(searchPreferences);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      navigate('/listings'); // AIRBNB MODEL: Buyers browse listings (no dashboard)
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArraySelection = (
    field: keyof InvestmentCriteria,
    value: string,
    currentValues: string[]
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    setInvestmentCriteria({
      ...investmentCriteria,
      [field]: newValues,
    });
  };

  const handleAlertSelection = (value: string, currentValues: string[]) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    setSearchPreferences({
      ...searchPreferences,
      alert_types: newValues,
    });
  };

  const handleCommSelection = (value: string, currentValues: string[]) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    setSearchPreferences({
      ...searchPreferences,
      communication_preferences: newValues,
    });
  };

  const isStep1Valid =
    buyerProfile.background && buyerProfile.experience && buyerProfile.investment_type;
  const isStep2Valid =
    investmentCriteria.budget_min && investmentCriteria.preferred_industries.length > 0;
  const isStep3Valid = investmentCriteria.preferred_countries.length > 0;

  return (
    <>
      {/* TODO: Re-enable SEOHead when available */}
      {/* <SEOHead
        title="Buyer Onboarding | flyp"
        description="Set up your buyer profile and investment criteria"
        keywords="buyer onboarding, investment criteria, business search"
      /> */}

      <div className="min-h-screen bg-neutral-50">
        <div>
          <div className="max-w-3xl mx-auto py-12">
            {/* Progress Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome to flyp</h1>
              <p className="text-lg text-neutral-600 mb-6">
                Let's set up your buyer profile to find the perfect business opportunities
              </p>

              <div className="mb-4">
                <Progress value={progress} color="primary" className="max-w-md mx-auto" />
              </div>

              <p className="text-sm text-neutral-500">
                Step {currentStep} of {totalSteps}
              </p>
            </div>

            <Card className="border border-neutral-200">
              <CardBody className="p-8">
                {/* Step 1: Buyer Profile */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Target className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Tell Us About Yourself
                      </h2>
                      <p className="text-neutral-600">
                        Help us understand your investment background and goals
                      </p>
                    </div>

                    <Textarea
                      label="Professional Background"
                      placeholder="Tell us about your professional background, industry experience, and what drives your interest in acquiring a business..."
                      value={buyerProfile.background}
                      onValueChange={value =>
                        setBuyerProfile({ ...buyerProfile, background: value })
                      }
                      minRows={3}
                      isRequired
                      variant="bordered"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="M&A Experience"
                        placeholder="Select your experience level"
                        selectedKeys={buyerProfile.experience ? [buyerProfile.experience] : []}
                        onSelectionChange={keys => {
                          const experience = Array.from(keys)[0] as string;
                          setBuyerProfile({ ...buyerProfile, experience });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {experienceLevels.map(level => (
                          <SelectItem key={level}>{level}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Investment Type"
                        placeholder="How are you investing?"
                        selectedKeys={
                          buyerProfile.investment_type ? [buyerProfile.investment_type] : []
                        }
                        onSelectionChange={keys => {
                          const investment_type = Array.from(keys)[0] as string;
                          setBuyerProfile({ ...buyerProfile, investment_type });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {investmentTypes.map(type => (
                          <SelectItem key={type}>{type}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Financing Status"
                        placeholder="What's your financing situation?"
                        selectedKeys={
                          buyerProfile.financing_status ? [buyerProfile.financing_status] : []
                        }
                        onSelectionChange={keys => {
                          const financing_status = Array.from(keys)[0] as string;
                          setBuyerProfile({ ...buyerProfile, financing_status });
                        }}
                        variant="bordered"
                      >
                        {financingStatuses.map(status => (
                          <SelectItem key={status}>{status}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Investment Timeline"
                        placeholder="When are you looking to acquire?"
                        selectedKeys={buyerProfile.timeline ? [buyerProfile.timeline] : []}
                        onSelectionChange={keys => {
                          const timeline = Array.from(keys)[0] as string;
                          setBuyerProfile({ ...buyerProfile, timeline });
                        }}
                        variant="bordered"
                      >
                        {timelines.map(timeline => (
                          <SelectItem key={timeline}>{timeline}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Investment Criteria */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Euro className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Investment Criteria
                      </h2>
                      <p className="text-neutral-600">
                        Define your budget and preferred business characteristics
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Minimum Budget"
                        placeholder="Select minimum investment"
                        selectedKeys={
                          investmentCriteria.budget_min ? [investmentCriteria.budget_min] : []
                        }
                        onSelectionChange={keys => {
                          const budget_min = Array.from(keys)[0] as string;
                          setInvestmentCriteria({ ...investmentCriteria, budget_min });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {budgetRanges.map(range => (
                          <SelectItem key={range}>{range}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Maximum Budget"
                        placeholder="Select maximum investment"
                        selectedKeys={
                          investmentCriteria.budget_max ? [investmentCriteria.budget_max] : []
                        }
                        onSelectionChange={keys => {
                          const budget_max = Array.from(keys)[0] as string;
                          setInvestmentCriteria({ ...investmentCriteria, budget_max });
                        }}
                        variant="bordered"
                      >
                        {budgetRanges.map(range => (
                          <SelectItem key={range}>{range}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Preferred Industries <span className="text-danger-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {industries.map(industry => (
                          <button
                            key={industry}
                            onClick={() =>
                              handleArraySelection(
                                'preferred_industries',
                                industry,
                                investmentCriteria.preferred_industries
                              )
                            }
                            className={`p-3 text-sm rounded-lg border transition-all ${
                              investmentCriteria.preferred_industries.includes(industry)
                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            {industry}
                          </button>
                        ))}
                      </div>
                      {investmentCriteria.preferred_industries.length > 0 && (
                        <p className="text-xs text-neutral-500 mt-2">
                          {investmentCriteria.preferred_industries.length} selected
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Preferred Business Models
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {businessModels.map(model => (
                          <button
                            key={model}
                            onClick={() =>
                              handleArraySelection(
                                'business_models',
                                model,
                                investmentCriteria.business_models
                              )
                            }
                            className={`p-3 text-sm rounded-lg border transition-all ${
                              investmentCriteria.business_models.includes(model)
                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            {model}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Geographic & Size Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Location & Size Preferences
                      </h2>
                      <p className="text-neutral-600">
                        Where and what size businesses are you interested in?
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Preferred Countries <span className="text-danger-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {countries.map(country => (
                          <button
                            key={country}
                            onClick={() =>
                              handleArraySelection(
                                'preferred_countries',
                                country,
                                investmentCriteria.preferred_countries
                              )
                            }
                            className={`p-3 text-sm rounded-lg border transition-all ${
                              investmentCriteria.preferred_countries.includes(country)
                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Company Size (by Revenue)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {revenueRanges.map(range => (
                          <button
                            key={range}
                            onClick={() =>
                              handleArraySelection(
                                'revenue_range',
                                range,
                                investmentCriteria.revenue_range
                              )
                            }
                            className={`p-3 text-sm rounded-lg border transition-all ${
                              investmentCriteria.revenue_range.includes(range)
                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Company Size (by Employees)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {companySizes.map(size => (
                          <button
                            key={size}
                            onClick={() =>
                              handleArraySelection(
                                'company_size',
                                size,
                                investmentCriteria.company_size
                              )
                            }
                            className={`p-3 text-sm rounded-lg border transition-all ${
                              investmentCriteria.company_size.includes(size)
                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Search Preferences & Alerts */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Bell className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Search Preferences
                      </h2>
                      <p className="text-neutral-600">
                        Set up alerts and notifications to never miss an opportunity
                      </p>
                    </div>

                    <Input
                      label="Save This Search As"
                      placeholder="e.g., 'Tech Companies in Belgium'"
                      value={searchPreferences.saved_search_name}
                      onValueChange={value =>
                        setSearchPreferences({ ...searchPreferences, saved_search_name: value })
                      }
                      variant="bordered"
                    />

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        What alerts would you like to receive?
                      </label>
                      <div className="space-y-2">
                        {alertTypes.map(type => (
                          <button
                            key={type}
                            onClick={() =>
                              handleAlertSelection(type, searchPreferences.alert_types)
                            }
                            className={`w-full p-3 text-left text-sm rounded-lg border transition-all flex items-center gap-3 ${
                              searchPreferences.alert_types.includes(type)
                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                searchPreferences.alert_types.includes(type)
                                  ? 'bg-primary-600 border-primary-600'
                                  : 'border-neutral-300'
                              }`}
                            >
                              {searchPreferences.alert_types.includes(type) && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        How would you like to receive notifications?
                      </label>
                      <div className="space-y-2">
                        {communicationPrefs.map(pref => (
                          <button
                            key={pref}
                            onClick={() =>
                              handleCommSelection(pref, searchPreferences.communication_preferences)
                            }
                            className={`w-full p-3 text-left text-sm rounded-lg border transition-all flex items-center gap-3 ${
                              searchPreferences.communication_preferences.includes(pref)
                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                searchPreferences.communication_preferences.includes(pref)
                                  ? 'bg-primary-600 border-primary-600'
                                  : 'border-neutral-300'
                              }`}
                            >
                              {searchPreferences.communication_preferences.includes(pref) && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            {pref}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        You're all set!
                      </h4>
                      <p className="text-sm text-green-800">
                        Based on your preferences, we'll start showing you relevant business
                        opportunities immediately. You can always adjust these settings later in
                        your dashboard.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
                  <Button
                    variant="bordered"
                    onPress={handleBack}
                    startContent={<ChevronLeft className="w-4 h-4" />}
                    isDisabled={currentStep === 1}
                  >
                    Back
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      color="primary"
                      onPress={handleNext}
                      isDisabled={
                        (currentStep === 1 && !isStep1Valid) ||
                        (currentStep === 2 && !isStep2Valid) ||
                        (currentStep === 3 && !isStep3Valid)
                      }
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button color="primary" onPress={handleComplete} isLoading={isSubmitting}>
                      {isSubmitting ? 'Setting up...' : 'Start Searching'}
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerOnboarding;
