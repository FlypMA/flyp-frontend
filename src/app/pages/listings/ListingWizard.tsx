import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  Progress,
  Checkbox,
  Switch,
  Chip,
  Textarea,
} from '@heroui/react';
import { AnimatedInput, AnimatedTextarea } from '../../components/forms';
import {
  EnhancedInput,
  EnhancedSelect,
  EnhancedTextarea,
  FormSection,
  FormTip,
} from '../../components/forms/EnhancedFormFields';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  FileText,
  Euro,
  Shield,
  Eye,
  Upload,
  CheckCircle,
  AlertTriangle,
  Lock,
  Globe,
  Camera,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Save,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Package,
  Calendar,
  MapPin,
  FileCheck,
  EyeOff,
  Building,
  Briefcase,
  MapPin as Location,
  Info,
} from 'lucide-react';
import Container from '../../components/main_UI/containers/container_default';
import { SEOHead } from '../../components/SEO';

interface BasicInfo {
  title: string;
  description: string;
  industry: string;
  business_model: string;
  location_country: string;
  location_city: string;
  website: string;
  founded_year: string;
  employee_count: string;
}

interface FinancialInfo {
  annual_revenue: string;
  revenue_trend: string;
  ebitda_margin: string;
  asking_price: string;
  price_negotiable: boolean;
  currency: string;
  revenue_breakdown: {
    product_sales: string;
    service_revenue: string;
    recurring_revenue: string;
    other_revenue: string;
  };
}

interface BusinessDetails {
  key_products: string;
  target_market: string;
  competitive_advantage: string;
  growth_opportunities: string;
  key_assets: string;
  operational_highlights: string;
}

interface SaleDetails {
  reason_for_sale: string;
  preferred_timeline: string;
  included_assets: string[];
  excluded_assets: string[];
  transition_support: string;
  staff_retention: string;
}

interface PrivacySettings {
  anonymous_listing: boolean;
  requires_nda: boolean;
  hide_financials: boolean;
  hide_location: boolean;
  hide_industry_details: boolean;
  teaser_description: string;
}

interface Documents {
  business_overview: File | null;
  financial_statements: File | null;
  tax_returns: File | null;
  legal_documents: File | null;
  operational_docs: File | null;
  marketing_materials: File | null;
}

const ListingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: '',
    description: '',
    industry: '',
    business_model: '',
    location_country: '',
    location_city: '',
    website: '',
    founded_year: '',
    employee_count: '',
  });

  const [financialInfo, setFinancialInfo] = useState<FinancialInfo>({
    annual_revenue: '',
    revenue_trend: '',
    ebitda_margin: '',
    asking_price: '',
    price_negotiable: true,
    currency: 'EUR',
    revenue_breakdown: {
      product_sales: '',
      service_revenue: '',
      recurring_revenue: '',
      other_revenue: '',
    },
  });

  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    key_products: '',
    target_market: '',
    competitive_advantage: '',
    growth_opportunities: '',
    key_assets: '',
    operational_highlights: '',
  });

  const [saleDetails, setSaleDetails] = useState<SaleDetails>({
    reason_for_sale: '',
    preferred_timeline: '',
    included_assets: [],
    excluded_assets: [],
    transition_support: '',
    staff_retention: '',
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    anonymous_listing: false,
    requires_nda: true,
    hide_financials: false,
    hide_location: false,
    hide_industry_details: false,
    teaser_description: '',
  });

  const [documents, setDocuments] = useState<Documents>({
    business_overview: null,
    financial_statements: null,
    tax_returns: null,
    legal_documents: null,
    operational_docs: null,
    marketing_materials: null,
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

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
    'Other',
  ];

  const countries = [
    'Belgium',
    'Netherlands',
    'France',
    'Germany',
    'United Kingdom',
    'Spain',
    'Italy',
    'Other',
  ];

  const employeeCounts = ['1-5', '6-10', '11-25', '26-50', '51-100', '101-250', '250+'];

  const revenueRanges = [
    'Under €100K',
    '€100K - €500K',
    '€500K - €1M',
    '€1M - €5M',
    '€5M - €10M',
    '€10M - €50M',
    '€50M+',
  ];

  const businessModels = [
    'B2B Services',
    'B2C Products',
    'SaaS/Software',
    'E-commerce',
    'Manufacturing',
    'Consulting',
    'Franchise',
    'Other',
  ];

  const timelineOptions = [
    'Immediate (1-3 months)',
    'Short-term (3-6 months)',
    'Medium-term (6-12 months)',
    'Long-term (12+ months)',
    'Flexible',
  ];

  const assetOptions = [
    'Real Estate',
    'Equipment & Machinery',
    'Intellectual Property',
    'Customer Database',
    'Brand & Trademarks',
    'Inventory',
    'Cash & Investments',
    'Contracts & Agreements',
    'Employees & Staff',
    'Technology & Software',
  ];

  const handleFileUpload = (field: keyof Documents, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleAssetToggle = (asset: string, type: 'included' | 'excluded') => {
    if (type === 'included') {
      setSaleDetails(prev => ({
        ...prev,
        included_assets: prev.included_assets.includes(asset)
          ? prev.included_assets.filter(a => a !== asset)
          : [...prev.included_assets, asset],
        excluded_assets: prev.excluded_assets.filter(a => a !== asset),
      }));
    } else {
      setSaleDetails(prev => ({
        ...prev,
        excluded_assets: prev.excluded_assets.includes(asset)
          ? prev.excluded_assets.filter(a => a !== asset)
          : [...prev.excluded_assets, asset],
        included_assets: prev.included_assets.filter(a => a !== asset),
      }));
    }
  };

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

  const handleSaveDraft = async () => {
    setIsDraft(true);
    try {
      // TODO: Implement draft saving
      console.log('Saving draft...', {
        basicInfo,
        financialInfo,
        businessDetails,
        saleDetails,
        privacySettings,
        documents,
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsDraft(false);
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement listing publication
      console.log('Publishing listing...', {
        basicInfo,
        financialInfo,
        businessDetails,
        saleDetails,
        privacySettings,
        documents,
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/account/seller/dashboard');
    } catch (error) {
      console.error('Error publishing listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = ({
    step,
    title,
    completed,
    active,
  }: {
    step: number;
    title: string;
    completed: boolean;
    active: boolean;
  }) => (
    <div
      className={`flex flex-col items-center ${active ? 'text-primary-600' : completed ? 'text-green-600' : 'text-neutral-400'}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
          active
            ? 'bg-primary-100 text-primary-600'
            : completed
              ? 'bg-green-100 text-green-600'
              : 'bg-neutral-100 text-neutral-400'
        }`}
      >
        {completed ? <CheckCircle className="w-5 h-5" /> : step}
      </div>
      <span className="text-xs font-medium">{title}</span>
    </div>
  );

  const FileUploadCard = ({
    title,
    description,
    icon: Icon,
    field,
  }: {
    title: string;
    description: string;
    icon: any;
    field: keyof Documents;
  }) => (
    <Card className="border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors cursor-pointer">
      <CardBody className="text-center p-6">
        <Icon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
        <h4 className="font-medium text-neutral-900 mb-2">{title}</h4>
        <p className="text-sm text-neutral-600 mb-4">{description}</p>
        <input
          type="file"
          className="hidden"
          id={`file-${field}`}
          onChange={e => handleFileUpload(field, e.target.files?.[0] || null)}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        />
        <label htmlFor={`file-${field}`} className="cursor-pointer">
          <Button variant="bordered" size="sm" startContent={<Upload className="w-4 h-4" />}>
            Upload File
          </Button>
        </label>
        {documents[field] && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-600">
            <FileCheck className="w-4 h-4" />
            <span>{documents[field]?.name}</span>
          </div>
        )}
      </CardBody>
    </Card>
  );

  return (
    <>
      <SEOHead
        title="Create Listing | betweendeals"
        description="Create a professional business listing to attract qualified buyers"
        keywords="create listing, sell business, business listing"
      />

      <div className="min-h-screen bg-neutral-50">
        <Container>
          <div className="max-w-5xl mx-auto py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Create Your Business Listing
              </h1>
              <p className="text-lg text-neutral-600 mb-6">
                Showcase your business to qualified buyers across Europe
              </p>

              <div className="mb-6">
                <Progress value={progress} color="primary" className="max-w-2xl mx-auto" />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mb-8 px-4">
              <StepIndicator
                step={1}
                title="Basic Info"
                completed={currentStep > 1}
                active={currentStep === 1}
              />
              <StepIndicator
                step={2}
                title="Financials"
                completed={currentStep > 2}
                active={currentStep === 2}
              />
              <StepIndicator
                step={3}
                title="Business Details"
                completed={currentStep > 3}
                active={currentStep === 3}
              />
              <StepIndicator
                step={4}
                title="Sale Details"
                completed={currentStep > 4}
                active={currentStep === 4}
              />
              <StepIndicator
                step={5}
                title="Privacy"
                completed={currentStep > 5}
                active={currentStep === 5}
              />
              <StepIndicator
                step={6}
                title="Documents"
                completed={currentStep > 6}
                active={currentStep === 6}
              />
              <StepIndicator step={7} title="Review" completed={false} active={currentStep === 7} />
            </div>

            <Card className="border border-neutral-200">
              <CardBody className="p-8">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    {/* Company Information Section */}
                    <FormSection
                      title="Company Information"
                      description="Tell us about your business and what makes it special"
                      icon={<Building className="w-5 h-5 text-primary-600" />}
                    >
                      <div className="space-y-6">
                        {/* Business Title - Full Width */}
                        <EnhancedInput
                          label="Business Title"
                          placeholder="Enter a compelling title that attracts buyers"
                          value={basicInfo.title}
                          onChange={value => setBasicInfo({ ...basicInfo, title: value })}
                          name="title"
                          required
                          description="This will be the main headline buyers see first"
                          icon={<Building2 className="w-4 h-4 text-default-400" />}
                        />

                        {/* Industry & Business Model Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <EnhancedSelect
                            label="Industry"
                            placeholder="Select your primary industry"
                            value={basicInfo.industry}
                            onSelectionChange={value =>
                              setBasicInfo({ ...basicInfo, industry: value })
                            }
                            options={industries}
                            required
                            description="Choose the industry that best describes your business"
                          />

                          <EnhancedSelect
                            label="Business Model"
                            placeholder="Select your business model"
                            value={basicInfo.business_model}
                            onSelectionChange={value =>
                              setBasicInfo({ ...basicInfo, business_model: value })
                            }
                            options={businessModels}
                            required
                            description="How does your business generate revenue?"
                          />
                        </div>
                      </div>
                    </FormSection>

                    {/* Business Details Section */}
                    <FormSection
                      title="Business Details"
                      description="Key metrics and operational information"
                      icon={<Briefcase className="w-5 h-5 text-primary-600" />}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <EnhancedSelect
                          label="Company Size"
                          placeholder="Select number of employees"
                          value={basicInfo.employee_count}
                          onSelectionChange={value =>
                            setBasicInfo({ ...basicInfo, employee_count: value })
                          }
                          options={employeeCounts}
                          required
                          description="Total number of employees"
                        />

                        <EnhancedInput
                          label="Founded Year"
                          placeholder="e.g., 2015"
                          type="number"
                          value={basicInfo.founded_year}
                          onChange={value => setBasicInfo({ ...basicInfo, founded_year: value })}
                          name="founded_year"
                          description="When was your company established?"
                          icon={<Calendar className="w-4 h-4 text-default-400" />}
                        />
                      </div>
                    </FormSection>

                    {/* Location & Contact Section */}
                    <FormSection
                      title="Location & Contact"
                      description="Where is your business located?"
                      icon={<Location className="w-5 h-5 text-primary-600" />}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <EnhancedSelect
                          label="Country"
                          placeholder="Select your country"
                          value={basicInfo.location_country}
                          onSelectionChange={value =>
                            setBasicInfo({ ...basicInfo, location_country: value })
                          }
                          options={countries}
                          required
                          description="Primary business location"
                        />

                        <EnhancedInput
                          label="City"
                          placeholder="Enter your city"
                          value={basicInfo.location_city}
                          onChange={value => setBasicInfo({ ...basicInfo, location_city: value })}
                          name="city"
                          required
                          description="Main business city"
                          icon={<MapPin className="w-4 h-4 text-default-400" />}
                        />

                        <EnhancedInput
                          label="Website"
                          placeholder="https://yourcompany.com"
                          type="url"
                          value={basicInfo.website}
                          onChange={value => setBasicInfo({ ...basicInfo, website: value })}
                          name="website"
                          description="Your company website (optional)"
                          icon={<Globe className="w-4 h-4 text-default-400" />}
                          className="lg:col-span-2"
                        />
                      </div>
                    </FormSection>

                    {/* Business Description Section */}
                    <FormSection
                      title="Business Description"
                      description="Describe what makes your business unique and attractive"
                      icon={<Info className="w-5 h-5 text-primary-600" />}
                    >
                      <EnhancedTextarea
                        label="Tell Your Story"
                        placeholder="Describe your business, its history, key achievements, growth potential, and what makes it attractive to buyers..."
                        value={basicInfo.description}
                        onChange={value => setBasicInfo({ ...basicInfo, description: value })}
                        name="description"
                        required
                        rows={5}
                        description="Be specific and compelling. This is your chance to make a great first impression."
                      />
                    </FormSection>

                    {/* Tips Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <FormTip
                        title="Writing Tips"
                        content="Focus on your unique value proposition, key achievements, growth metrics, and what makes your business stand out from competitors."
                        type="info"
                      />
                      <FormTip
                        title="What Buyers Look For"
                        content="Stable revenue, growth potential, strong market position, quality management team, and clear competitive advantages."
                        type="success"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Financials */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <BarChart3 className="w-6 h-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-neutral-900">
                        Financial Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Annual Revenue"
                        placeholder="Select revenue range"
                        value={financialInfo.annual_revenue}
                        onSelectionChange={keys =>
                          setFinancialInfo({
                            ...financialInfo,
                            annual_revenue: Array.from(keys)[0] as string,
                          })
                        }
                        required
                      >
                        {revenueRanges.map(range => (
                          <SelectItem key={range}>{range}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Revenue Trend"
                        placeholder="Select revenue trend"
                        value={financialInfo.revenue_trend}
                        onSelectionChange={keys =>
                          setFinancialInfo({
                            ...financialInfo,
                            revenue_trend: Array.from(keys)[0] as string,
                          })
                        }
                        required
                      >
                        <SelectItem key="growing">Growing</SelectItem>
                        <SelectItem key="stable">Stable</SelectItem>
                        <SelectItem key="declining">Declining</SelectItem>
                        <SelectItem key="seasonal">Seasonal</SelectItem>
                      </Select>

                      <AnimatedInput
                        label="EBITDA Margin %"
                        placeholder="e.g., 15"
                        type="number"
                        value={financialInfo.ebitda_margin}
                        onChange={value =>
                          setFinancialInfo({ ...financialInfo, ebitda_margin: value })
                        }
                        endContent={<span className="text-foreground-400">%</span>}
                        name="ebitda_margin"
                      />

                      <AnimatedInput
                        label="Asking Price"
                        placeholder="Enter asking price"
                        type="number"
                        value={financialInfo.asking_price}
                        onChange={value =>
                          setFinancialInfo({ ...financialInfo, asking_price: value })
                        }
                        startContent={<span className="text-foreground-400">€</span>}
                        name="asking_price"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch
                        isSelected={financialInfo.price_negotiable}
                        onValueChange={checked =>
                          setFinancialInfo({ ...financialInfo, price_negotiable: checked })
                        }
                      />
                      <span className="text-sm text-neutral-700">Price is negotiable</span>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        💡 Financial Information Tips
                      </h4>
                      <p className="text-sm text-blue-800">
                        Be as accurate as possible. Verified financial information significantly
                        increases buyer interest and helps position your business correctly in the
                        market.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Business Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-6 h-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-neutral-900">Business Details</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <AnimatedTextarea
                        variant="standalone"
                        label="Key Products/Services"
                        placeholder="Describe your main products or services..."
                        value={businessDetails.key_products}
                        onChange={value =>
                          setBusinessDetails({ ...businessDetails, key_products: value })
                        }
                        name="key_products"
                        required
                      />

                      <AnimatedTextarea
                        variant="standalone"
                        label="Target Market"
                        placeholder="Describe your target customers and market segments..."
                        value={businessDetails.target_market}
                        onChange={value =>
                          setBusinessDetails({ ...businessDetails, target_market: value })
                        }
                        name="target_market"
                        required
                      />

                      <AnimatedTextarea
                        variant="standalone"
                        label="Competitive Advantage"
                        placeholder="What makes your business unique? What are your competitive advantages?"
                        value={businessDetails.competitive_advantage}
                        onChange={value =>
                          setBusinessDetails({ ...businessDetails, competitive_advantage: value })
                        }
                        name="competitive_advantage"
                        required
                      />

                      <AnimatedTextarea
                        variant="standalone"
                        label="Growth Opportunities"
                        placeholder="Describe potential growth opportunities and expansion possibilities..."
                        value={businessDetails.growth_opportunities}
                        onChange={value =>
                          setBusinessDetails({ ...businessDetails, growth_opportunities: value })
                        }
                        name="growth_opportunities"
                      />

                      <AnimatedTextarea
                        variant="standalone"
                        label="Key Assets"
                        placeholder="List your key assets, intellectual property, contracts, etc..."
                        value={businessDetails.key_assets}
                        onChange={value =>
                          setBusinessDetails({ ...businessDetails, key_assets: value })
                        }
                        name="key_assets"
                      />

                      <AnimatedTextarea
                        variant="standalone"
                        label="Operational Highlights"
                        placeholder="Describe your operations, processes, and key operational strengths..."
                        value={businessDetails.operational_highlights}
                        onChange={value =>
                          setBusinessDetails({ ...businessDetails, operational_highlights: value })
                        }
                        name="operational_highlights"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">💡 Business Details Tips</h4>
                      <p className="text-sm text-blue-800">
                        Focus on what makes your business valuable and attractive to potential
                        buyers. Include specific examples and metrics where possible.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Sale Details */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Package className="w-6 h-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-neutral-900">Sale Details</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <AnimatedTextarea
                        variant="standalone"
                        label="Reason for Sale"
                        placeholder="Why are you selling? What are your motivations?"
                        value={saleDetails.reason_for_sale}
                        onChange={value =>
                          setSaleDetails({ ...saleDetails, reason_for_sale: value })
                        }
                        name="reason_for_sale"
                        required
                      />

                      <Select
                        label="Preferred Timeline"
                        placeholder="Select preferred sale timeline"
                        value={saleDetails.preferred_timeline}
                        onSelectionChange={keys =>
                          setSaleDetails({
                            ...saleDetails,
                            preferred_timeline: Array.from(keys)[0] as string,
                          })
                        }
                        required
                      >
                        {timelineOptions.map(timeline => (
                          <SelectItem key={timeline}>{timeline}</SelectItem>
                        ))}
                      </Select>

                      <div>
                        <h4 className="font-medium text-neutral-900 mb-3">Included Assets</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {assetOptions.map(asset => (
                            <Checkbox
                              key={asset}
                              isSelected={saleDetails.included_assets.includes(asset)}
                              onValueChange={() => handleAssetToggle(asset, 'included')}
                            >
                              {asset}
                            </Checkbox>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-neutral-900 mb-3">Excluded Assets</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {assetOptions.map(asset => (
                            <Checkbox
                              key={asset}
                              isSelected={saleDetails.excluded_assets.includes(asset)}
                              onValueChange={() => handleAssetToggle(asset, 'excluded')}
                            >
                              {asset}
                            </Checkbox>
                          ))}
                        </div>
                      </div>

                      <AnimatedTextarea
                        variant="standalone"
                        label="Transition Support"
                        placeholder="What support are you willing to provide during the transition?"
                        value={saleDetails.transition_support}
                        onChange={value =>
                          setSaleDetails({ ...saleDetails, transition_support: value })
                        }
                        name="transition_support"
                      />

                      <AnimatedTextarea
                        variant="standalone"
                        label="Staff Retention"
                        placeholder="What are your plans for existing staff? Any retention agreements?"
                        value={saleDetails.staff_retention}
                        onChange={value =>
                          setSaleDetails({ ...saleDetails, staff_retention: value })
                        }
                        name="staff_retention"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">💡 Sale Details Tips</h4>
                      <p className="text-sm text-blue-800">
                        Be transparent about your motivations and timeline. Clear expectations help
                        attract serious buyers and facilitate smoother negotiations.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Privacy Settings */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="w-6 h-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-neutral-900">
                        Privacy & Confidentiality
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-neutral-900">Anonymous Listing</h4>
                          <p className="text-sm text-neutral-600">
                            Hide your business name from public view
                          </p>
                        </div>
                        <Switch
                          isSelected={privacySettings.anonymous_listing}
                          onValueChange={checked =>
                            setPrivacySettings({ ...privacySettings, anonymous_listing: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-neutral-900">Require NDA</h4>
                          <p className="text-sm text-neutral-600">
                            Buyers must sign NDA before accessing confidential information
                          </p>
                        </div>
                        <Switch
                          isSelected={privacySettings.requires_nda}
                          onValueChange={checked =>
                            setPrivacySettings({ ...privacySettings, requires_nda: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-neutral-900">Hide Financial Details</h4>
                          <p className="text-sm text-neutral-600">
                            Keep financial information private until NDA is signed
                          </p>
                        </div>
                        <Switch
                          isSelected={privacySettings.hide_financials}
                          onValueChange={checked =>
                            setPrivacySettings({ ...privacySettings, hide_financials: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-neutral-900">Hide Exact Location</h4>
                          <p className="text-sm text-neutral-600">
                            Show only general area, not exact address
                          </p>
                        </div>
                        <Switch
                          isSelected={privacySettings.hide_location}
                          onValueChange={checked =>
                            setPrivacySettings({ ...privacySettings, hide_location: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-neutral-900">Hide Industry Details</h4>
                          <p className="text-sm text-neutral-600">
                            Keep specific industry information private
                          </p>
                        </div>
                        <Switch
                          isSelected={privacySettings.hide_industry_details}
                          onValueChange={checked =>
                            setPrivacySettings({
                              ...privacySettings,
                              hide_industry_details: checked,
                            })
                          }
                        />
                      </div>

                      <AnimatedTextarea
                        variant="standalone"
                        label="Teaser Description"
                        placeholder="Write a brief, attractive description that will be shown publicly..."
                        value={privacySettings.teaser_description}
                        onChange={value =>
                          setPrivacySettings({ ...privacySettings, teaser_description: value })
                        }
                        name="teaser_description"
                        required
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">💡 Privacy Tips</h4>
                      <p className="text-sm text-blue-800">
                        Balance confidentiality with attracting interest. Use the teaser description
                        to generate curiosity while protecting sensitive information.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 6: Documents */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <FileText className="w-6 h-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-neutral-900">
                        Documents & Materials
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUploadCard
                        title="Business Overview"
                        description="Executive summary, business plan, or company presentation"
                        icon={Building2}
                        field="business_overview"
                      />

                      <FileUploadCard
                        title="Financial Statements"
                        description="P&L statements, balance sheets, cash flow statements"
                        icon={BarChart3}
                        field="financial_statements"
                      />

                      <FileUploadCard
                        title="Tax Returns"
                        description="Recent tax returns and filings"
                        icon={FileText}
                        field="tax_returns"
                      />

                      <FileUploadCard
                        title="Legal Documents"
                        description="Contracts, licenses, permits, legal structure"
                        icon={Shield}
                        field="legal_documents"
                      />

                      <FileUploadCard
                        title="Operational Documents"
                        description="Process documentation, SOPs, operational metrics"
                        icon={Package}
                        field="operational_docs"
                      />

                      <FileUploadCard
                        title="Marketing Materials"
                        description="Brochures, presentations, marketing collateral"
                        icon={Camera}
                        field="marketing_materials"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">💡 Document Tips</h4>
                      <p className="text-sm text-blue-800">
                        Upload comprehensive documentation to build buyer confidence. Well-organized
                        documents significantly increase the likelihood of serious inquiries.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 7: Review */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="w-6 h-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-neutral-900">Review & Publish</h2>
                    </div>

                    <div className="space-y-6">
                      {/* Basic Info Review */}
                      <Card className="border border-neutral-200">
                        <CardBody className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Building2 className="w-5 h-5 text-primary-600" />
                            <h3 className="text-lg font-medium text-neutral-900">
                              Basic Information
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-neutral-700">Title:</span>
                              <p className="text-neutral-900">
                                {basicInfo.title || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">Industry:</span>
                              <p className="text-neutral-900">
                                {basicInfo.industry || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">Location:</span>
                              <p className="text-neutral-900">
                                {basicInfo.location_city}, {basicInfo.location_country}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">Employees:</span>
                              <p className="text-neutral-900">
                                {basicInfo.employee_count || 'Not provided'}
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      {/* Financial Info Review */}
                      <Card className="border border-neutral-200">
                        <CardBody className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <BarChart3 className="w-5 h-5 text-primary-600" />
                            <h3 className="text-lg font-medium text-neutral-900">
                              Financial Information
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-neutral-700">Annual Revenue:</span>
                              <p className="text-neutral-900">
                                {financialInfo.annual_revenue || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">Asking Price:</span>
                              <p className="text-neutral-900">
                                {financialInfo.asking_price
                                  ? `€${financialInfo.asking_price}`
                                  : 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">EBITDA Margin:</span>
                              <p className="text-neutral-900">
                                {financialInfo.ebitda_margin
                                  ? `${financialInfo.ebitda_margin}%`
                                  : 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-700">
                                Price Negotiable:
                              </span>
                              <p className="text-neutral-900">
                                {financialInfo.price_negotiable ? 'Yes' : 'No'}
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      {/* Privacy Settings Review */}
                      <Card className="border border-neutral-200">
                        <CardBody className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-5 h-5 text-primary-600" />
                            <h3 className="text-lg font-medium text-neutral-900">
                              Privacy Settings
                            </h3>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle
                                className={`w-4 h-4 ${privacySettings.anonymous_listing ? 'text-green-600' : 'text-neutral-300'}`}
                              />
                              <span>
                                Anonymous Listing:{' '}
                                {privacySettings.anonymous_listing ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle
                                className={`w-4 h-4 ${privacySettings.requires_nda ? 'text-green-600' : 'text-neutral-300'}`}
                              />
                              <span>
                                NDA Required: {privacySettings.requires_nda ? 'Yes' : 'No'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle
                                className={`w-4 h-4 ${privacySettings.hide_financials ? 'text-green-600' : 'text-neutral-300'}`}
                              />
                              <span>
                                Hide Financials: {privacySettings.hide_financials ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      {/* Documents Review */}
                      <Card className="border border-neutral-200">
                        <CardBody className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-5 h-5 text-primary-600" />
                            <h3 className="text-lg font-medium text-neutral-900">
                              Documents Uploaded
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {Object.entries(documents).map(([key, file]) => (
                              <div key={key} className="flex items-center gap-2">
                                {file ? (
                                  <>
                                    <FileCheck className="w-4 h-4 text-green-600" />
                                    <span className="text-neutral-900">{file.name}</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                    <span className="text-neutral-500">Not uploaded</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardBody>
                      </Card>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">✅ Ready to Publish</h4>
                      <p className="text-sm text-green-800">
                        Your listing looks great! Once published, it will be visible to qualified
                        buyers across Europe. You can edit it anytime from your dashboard.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200">
                  <div className="flex gap-3">
                    {currentStep > 1 && (
                      <Button
                        variant="bordered"
                        onPress={handleBack}
                        startContent={<ChevronLeft className="w-4 h-4" />}
                      >
                        Back
                      </Button>
                    )}

                    <Button
                      variant="bordered"
                      onPress={handleSaveDraft}
                      startContent={<Save className="w-4 h-4" />}
                      isLoading={isDraft}
                    >
                      Save Draft
                    </Button>
                  </div>

                  {currentStep < totalSteps ? (
                    <Button
                      color="primary"
                      onPress={handleNext}
                      endContent={<ChevronRight className="w-4 h-4" />}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onPress={handlePublish}
                      isLoading={isSubmitting}
                      endContent={!isSubmitting && <Rocket className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ListingWizard;
