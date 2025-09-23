import { Button } from '@/shared/components/buttons';
import { AnimatedTextarea, Input } from '@/shared/components/forms';
import Container from '@/shared/components/layout/container/Container';
import {
  Card,
  CardBody,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Progress,
  Switch,
} from '@heroui/react';
import {
  BarChart3,
  Building2,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Euro,
  FileCheck,
  FileText,
  Rocket,
  Shield,
  Target,
  Upload,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

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

interface ListingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  businessInfo?: any;
  valuationData?: any;
}

const ListingWizardModal: React.FC<ListingWizardModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  businessInfo,
  valuationData,
}) => {
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

  // Pre-populate form data when modal opens
  useEffect(() => {
    if (isOpen && businessInfo) {
      setBasicInfo(prev => ({
        ...prev,
        title: businessInfo.name ? `${businessInfo.name} - Business for Sale` : prev.title,
        description: businessInfo.description || prev.description,
        industry: businessInfo.industry || prev.industry,
        location_city: businessInfo.location || prev.location_city,
        founded_year: businessInfo.foundedYear
          ? businessInfo.foundedYear.toString()
          : prev.founded_year,
        employee_count: businessInfo.teamSize || prev.employee_count,
      }));
    }

    if (isOpen && valuationData) {
      // Pre-populate financial data from valuation
      const estimatedRevenue =
        valuationData.revenue2025 || valuationData.revenue2024 || valuationData.revenue2023 || 0;
      const estimatedEbitda =
        valuationData.ebitda2025 || valuationData.ebitda2024 || valuationData.ebitda2023 || 0;

      setFinancialInfo(prev => ({
        ...prev,
        annual_revenue: estimatedRevenue ? estimatedRevenue.toString() : prev.annual_revenue,
        ebitda_margin:
          estimatedEbitda && estimatedRevenue
            ? ((estimatedEbitda / estimatedRevenue) * 100).toFixed(1)
            : prev.ebitda_margin,
      }));

      // Set privacy-first defaults
      setPrivacySettings(prev => ({
        ...prev,
        anonymous_listing: true,
        requires_nda: true,
        hide_financials: false, // Show financials since they have valuation data
        hide_location: false,
        hide_industry_details: false,
      }));
    }
  }, [isOpen, businessInfo, valuationData]);

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

  const employeeCounts = ['1-5', '6-10', '11-25', '26-50', '51-100', '101-250', '251-500', '500+'];

  const businessModels = [
    'B2B',
    'B2C',
    'B2B2C',
    'Marketplace',
    'SaaS',
    'E-commerce',
    'Franchise',
    'Manufacturing',
    'Service',
    'Other',
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (field: keyof Documents, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [field]: file,
    }));
  };

  const handlePublishListing = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      // console.log('Publishing listing with data:', {
      //   basicInfo,
      //   financialInfo,
      //   businessDetails,
      //   saleDetails,
      //   privacySettings,
      //   documents,
      // });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call onComplete instead of navigating
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      // console.error('Error publishing listing:', error);
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
          <Button variant="secondary" size="sm" startContent={<Upload className="w-4 h-4" />}>
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      classNames={{
        base: 'h-full max-h-full m-0',
        wrapper: 'h-full',
        body: 'h-full p-0',
        backdrop: 'bg-black/50',
      }}
      hideCloseButton={true}
      isDismissable={false}
    >
      <ModalContent className="h-full max-h-full m-0">
        <ModalHeader className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Create Business Listing</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              We've pre-filled what we know - just review and adjust
            </span>
          </div>
          <Button
            isIconOnly
            variant="tertiary"
            onPress={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </ModalHeader>
        <ModalBody className="p-0 overflow-hidden">
          <div className="h-full overflow-y-auto min-h-screen bg-neutral-50">
            <Container>
              <div className="max-w-5xl mx-auto py-8">
                {/* Caregiver-aligned Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
                    Let's create your confidential business listing together
                  </h1>
                  <p className="text-lg text-neutral-600 mb-6">
                    We're here to help at every step. Your identity will stay completely private
                    until you decide to share it.
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
                  <StepIndicator
                    step={7}
                    title="Review"
                    completed={false}
                    active={currentStep === 7}
                  />
                </div>

                <Card className="border border-neutral-200">
                  <CardBody className="p-8">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <Building2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                            Basic Information
                          </h2>
                          <p className="text-neutral-600">Tell us about your business</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="Business Title"
                            placeholder="Enter a compelling title for your listing"
                            value={basicInfo.title}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, title: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="title"
                          />

                          <Input
                            label="Industry"
                            placeholder="Select your industry"
                            value={basicInfo.industry}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, industry: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="industry"
                          />

                          <Input
                            label="Business Model"
                            placeholder="Select your business model"
                            value={basicInfo.business_model}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, business_model: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="business_model"
                          />

                          <Input
                            label="Website"
                            placeholder="https://yourbusiness.com"
                            value={basicInfo.website}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, website: e.target.value }))
                            }
                            type="url"
                            onBlur={() => {}}
                            name="website"
                          />

                          <Input
                            label="Founded Year"
                            placeholder="e.g., 2015"
                            value={basicInfo.founded_year}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, founded_year: e.target.value }))
                            }
                            type="number"
                            onBlur={() => {}}
                            name="founded_year"
                          />

                          <Input
                            label="Employee Count"
                            placeholder="Select employee count"
                            value={basicInfo.employee_count}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, employee_count: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="employee_count"
                          />

                          <Input
                            label="Country"
                            placeholder="Select country"
                            value={basicInfo.location_country}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, location_country: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="location_country"
                          />

                          <Input
                            label="City"
                            placeholder="Enter city"
                            value={basicInfo.location_city}
                            onChange={e =>
                              setBasicInfo(prev => ({ ...prev, location_city: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="location_city"
                          />
                        </div>

                        <AnimatedTextarea
                          label="Business Description"
                          placeholder="Describe your business, its history, and what makes it unique..."
                          value={basicInfo.description}
                          onChange={e =>
                            setBasicInfo(prev => ({ ...prev, description: e.target.value }))
                          }
                          required
                          minRows={4}
                          onBlur={() => {}}
                          name="description"
                        />
                      </div>
                    )}

                    {/* Step 2: Financials */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <Euro className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                            Financial Information
                          </h2>
                          <p className="text-neutral-600">Share your financial performance</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="Annual Revenue"
                            placeholder="€1,000,000"
                            value={financialInfo.annual_revenue}
                            onChange={e =>
                              setFinancialInfo(prev => ({
                                ...prev,
                                annual_revenue: e.target.value,
                              }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="annual_revenue"
                          />

                          <Input
                            label="Revenue Trend"
                            placeholder="Growing, Stable, Declining"
                            value={financialInfo.revenue_trend}
                            onChange={e =>
                              setFinancialInfo(prev => ({ ...prev, revenue_trend: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="revenue_trend"
                          />

                          <Input
                            label="EBITDA Margin"
                            placeholder="15%"
                            value={financialInfo.ebitda_margin}
                            onChange={e =>
                              setFinancialInfo(prev => ({ ...prev, ebitda_margin: e.target.value }))
                            }
                            type="text"
                            onBlur={() => {}}
                            name="ebitda_margin"
                          />

                          <Input
                            label="Asking Price"
                            placeholder="€5,000,000"
                            value={financialInfo.asking_price}
                            onChange={e =>
                              setFinancialInfo(prev => ({ ...prev, asking_price: e.target.value }))
                            }
                            required
                            type="text"
                            onBlur={() => {}}
                            name="asking_price"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <Switch
                            isSelected={financialInfo.price_negotiable}
                            onValueChange={value =>
                              setFinancialInfo(prev => ({ ...prev, price_negotiable: value }))
                            }
                          />
                          <span className="text-sm text-neutral-600">Price is negotiable</span>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Business Details */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <BarChart3 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                            Business Details
                          </h2>
                          <p className="text-neutral-600">
                            Describe your operations and market position
                          </p>
                        </div>

                        <AnimatedTextarea
                          label="Key Products/Services"
                          placeholder="Describe your main products or services..."
                          value={businessDetails.key_products}
                          onChange={e =>
                            setBusinessDetails(prev => ({ ...prev, key_products: e.target.value }))
                          }
                          required
                          minRows={3}
                          onBlur={() => {}}
                          name="key_products"
                        />

                        <AnimatedTextarea
                          label="Target Market"
                          placeholder="Describe your target customers and market segments..."
                          value={businessDetails.target_market}
                          onChange={e =>
                            setBusinessDetails(prev => ({ ...prev, target_market: e.target.value }))
                          }
                          required
                          minRows={3}
                          onBlur={() => {}}
                          name="target_market"
                        />

                        <AnimatedTextarea
                          label="Competitive Advantage"
                          placeholder="What makes your business unique? What are your competitive advantages?"
                          value={businessDetails.competitive_advantage}
                          onChange={e =>
                            setBusinessDetails(prev => ({
                              ...prev,
                              competitive_advantage: e.target.value,
                            }))
                          }
                          required
                          minRows={3}
                          onBlur={() => {}}
                          name="competitive_advantage"
                        />

                        <AnimatedTextarea
                          label="Growth Opportunities"
                          placeholder="Describe potential growth opportunities for the business..."
                          value={businessDetails.growth_opportunities}
                          onChange={e =>
                            setBusinessDetails(prev => ({
                              ...prev,
                              growth_opportunities: e.target.value,
                            }))
                          }
                          minRows={3}
                          onBlur={() => {}}
                          name="growth_opportunities"
                        />
                      </div>
                    )}

                    {/* Step 4: Sale Details */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Sale Details</h2>
                          <p className="text-neutral-600">Information about the sale process</p>
                        </div>

                        <AnimatedTextarea
                          label="Reason for Sale"
                          placeholder="Why are you selling the business?"
                          value={saleDetails.reason_for_sale}
                          onChange={e =>
                            setSaleDetails(prev => ({ ...prev, reason_for_sale: e.target.value }))
                          }
                          required
                          minRows={3}
                          onBlur={() => {}}
                          name="reason_for_sale"
                        />

                        <Input
                          label="Preferred Timeline"
                          placeholder="e.g., 3-6 months"
                          value={saleDetails.preferred_timeline}
                          onChange={e =>
                            setSaleDetails(prev => ({
                              ...prev,
                              preferred_timeline: e.target.value,
                            }))
                          }
                          type="text"
                          onBlur={() => {}}
                          name="preferred_timeline"
                          required
                        />

                        <AnimatedTextarea
                          label="Transition Support"
                          placeholder="What support are you willing to provide during the transition?"
                          value={saleDetails.transition_support}
                          onChange={e =>
                            setSaleDetails(prev => ({
                              ...prev,
                              transition_support: e.target.value,
                            }))
                          }
                          minRows={3}
                          onBlur={() => {}}
                          name="transition_support"
                        />

                        <AnimatedTextarea
                          label="Staff Retention"
                          placeholder="What are your plans for existing staff?"
                          value={saleDetails.staff_retention}
                          onChange={e =>
                            setSaleDetails(prev => ({ ...prev, staff_retention: e.target.value }))
                          }
                          minRows={3}
                          onBlur={() => {}}
                          name="staff_retention"
                        />
                      </div>
                    )}

                    {/* Step 5: Privacy Settings */}
                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                            Privacy Settings
                          </h2>
                          <p className="text-neutral-600">
                            Control what information is visible to buyers
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                            <div>
                              <h3 className="font-medium text-neutral-900">Anonymous Listing</h3>
                              <p className="text-sm text-neutral-600">
                                Hide your business name and location
                              </p>
                            </div>
                            <Switch
                              isSelected={privacySettings.anonymous_listing}
                              onValueChange={value =>
                                setPrivacySettings(prev => ({ ...prev, anonymous_listing: value }))
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                            <div>
                              <h3 className="font-medium text-neutral-900">Require NDA</h3>
                              <p className="text-sm text-neutral-600">
                                Buyers must sign NDA before viewing details
                              </p>
                            </div>
                            <Switch
                              isSelected={privacySettings.requires_nda}
                              onValueChange={value =>
                                setPrivacySettings(prev => ({ ...prev, requires_nda: value }))
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                            <div>
                              <h3 className="font-medium text-neutral-900">Hide Financials</h3>
                              <p className="text-sm text-neutral-600">
                                Hide detailed financial information
                              </p>
                            </div>
                            <Switch
                              isSelected={privacySettings.hide_financials}
                              onValueChange={value =>
                                setPrivacySettings(prev => ({ ...prev, hide_financials: value }))
                              }
                            />
                          </div>
                        </div>

                        <AnimatedTextarea
                          label="Teaser Description"
                          placeholder="Write a brief teaser description that will be visible to all buyers..."
                          value={privacySettings.teaser_description}
                          onChange={e =>
                            setPrivacySettings(prev => ({
                              ...prev,
                              teaser_description: e.target.value,
                            }))
                          }
                          minRows={3}
                          onBlur={() => {}}
                          name="teaser_description"
                        />
                      </div>
                    )}

                    {/* Step 6: Documents */}
                    {currentStep === 6 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Documents</h2>
                          <p className="text-neutral-600">Upload relevant business documents</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FileUploadCard
                            title="Business Overview"
                            description="Executive summary and business plan"
                            icon={FileText}
                            field="business_overview"
                          />

                          <FileUploadCard
                            title="Financial Statements"
                            description="P&L, balance sheet, cash flow"
                            icon={Euro}
                            field="financial_statements"
                          />

                          <FileUploadCard
                            title="Tax Returns"
                            description="Last 3 years of tax returns"
                            icon={FileText}
                            field="tax_returns"
                          />

                          <FileUploadCard
                            title="Legal Documents"
                            description="Contracts, licenses, permits"
                            icon={Shield}
                            field="legal_documents"
                          />

                          <FileUploadCard
                            title="Operational Documents"
                            description="Processes, procedures, manuals"
                            icon={BarChart3}
                            field="operational_docs"
                          />

                          <FileUploadCard
                            title="Marketing Materials"
                            description="Brochures, presentations, case studies"
                            icon={Camera}
                            field="marketing_materials"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 7: Review */}
                    {currentStep === 7 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <CheckCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                            Review & Publish
                          </h2>
                          <p className="text-neutral-600">Review your listing before publishing</p>
                        </div>

                        <div className="space-y-6">
                          <Card className="border border-neutral-200">
                            <CardBody>
                              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                                Basic Information
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Title:</span>{' '}
                                  {basicInfo.title || 'Not provided'}
                                </div>
                                <div>
                                  <span className="font-medium">Industry:</span>{' '}
                                  {basicInfo.industry || 'Not provided'}
                                </div>
                                <div>
                                  <span className="font-medium">Location:</span>{' '}
                                  {basicInfo.location_city}, {basicInfo.location_country}
                                </div>
                                <div>
                                  <span className="font-medium">Employees:</span>{' '}
                                  {basicInfo.employee_count || 'Not provided'}
                                </div>
                              </div>
                            </CardBody>
                          </Card>

                          <Card className="border border-neutral-200">
                            <CardBody>
                              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                                Financial Summary
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Annual Revenue:</span>{' '}
                                  {financialInfo.annual_revenue || 'Not provided'}
                                </div>
                                <div>
                                  <span className="font-medium">Asking Price:</span>{' '}
                                  {financialInfo.asking_price || 'Not provided'}
                                </div>
                                <div>
                                  <span className="font-medium">Revenue Trend:</span>{' '}
                                  {financialInfo.revenue_trend || 'Not provided'}
                                </div>
                                <div>
                                  <span className="font-medium">Price Negotiable:</span>{' '}
                                  {financialInfo.price_negotiable ? 'Yes' : 'No'}
                                </div>
                              </div>
                            </CardBody>
                          </Card>

                          <Card className="border border-neutral-200">
                            <CardBody>
                              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                                Privacy Settings
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium">Anonymous Listing:</span>{' '}
                                  {privacySettings.anonymous_listing ? 'Yes' : 'No'}
                                </div>
                                <div>
                                  <span className="font-medium">Require NDA:</span>{' '}
                                  {privacySettings.requires_nda ? 'Yes' : 'No'}
                                </div>
                                <div>
                                  <span className="font-medium">Hide Financials:</span>{' '}
                                  {privacySettings.hide_financials ? 'Yes' : 'No'}
                                </div>
                              </div>
                            </CardBody>
                          </Card>

                          <div className="flex items-center gap-3">
                            <Checkbox
                              isSelected={!isDraft}
                              onValueChange={value => setIsDraft(!value)}
                            />
                            <span className="text-sm text-neutral-600">
                              I confirm that all information provided is accurate and I agree to the
                              terms of service
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
                      <Button
                        variant="secondary"
                        onPress={handlePrevious}
                        isDisabled={currentStep === 1}
                        startContent={<ChevronLeft className="w-4 h-4" />}
                      >
                        Previous
                      </Button>

                      <div className="flex gap-3">
                        {currentStep < totalSteps ? (
                          <Button
                            variant="primary"
                            size="md"
                            onPress={handleNext}
                            endContent={<ChevronRight className="w-4 h-4" />}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="md"
                            onPress={handlePublishListing}
                            isLoading={isSubmitting}
                            endContent={<Rocket className="w-4 h-4" />}
                          >
                            {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Container>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ListingWizardModal;
