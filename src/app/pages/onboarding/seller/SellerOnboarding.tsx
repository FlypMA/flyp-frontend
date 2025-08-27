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
  Chip,
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
  Upload,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Container from '../../../components/main_UI/containers/container_default';
import { SEOHead } from '../../../components/SEO';

interface OrganizationData {
  name: string;
  industry: string;
  description: string;
  founded_year: string;
  employee_count: string;
  website: string;
  country: string;
  city: string;
  annual_revenue: string;
  business_model: string;
}

interface VerificationData {
  business_registration: File | null;
  tax_certificate: File | null;
  ownership_proof: File | null;
  financial_statements: File | null;
}

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    name: '',
    industry: '',
    description: '',
    founded_year: '',
    employee_count: '',
    website: '',
    country: '',
    city: '',
    annual_revenue: '',
    business_model: '',
  });

  const [verificationData, setVerificationData] = useState<VerificationData>({
    business_registration: null,
    tax_certificate: null,
    ownership_proof: null,
    financial_statements: null,
  });

  const totalSteps = 4;
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

  const handleFileUpload = (field: keyof VerificationData, file: File | null) => {
    setVerificationData(prev => ({
      ...prev,
      [field]: file,
    }));
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

  const handleSkipVerification = () => {
    navigate('/seller/dashboard');
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      // Here you would submit the organization data and verification documents
      // await organizationService.createOrganization(organizationData);
      // await verificationService.submitDocuments(verificationData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      navigate('/seller/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid =
    organizationData.name && organizationData.industry && organizationData.country;
  const isStep2Valid =
    organizationData.description &&
    organizationData.founded_year &&
    organizationData.employee_count;
  const isStep3Valid = organizationData.annual_revenue && organizationData.business_model;

  const FileUploadCard = ({
    title,
    description,
    field,
    required = false,
  }: {
    title: string;
    description: string;
    field: keyof VerificationData;
    required?: boolean;
  }) => (
    <Card className="border border-neutral-200">
      <CardBody className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <FileText className="w-4 h-4 text-primary-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-neutral-900 mb-1">
              {title} {required && <span className="text-danger-500">*</span>}
            </h4>
            <p className="text-sm text-neutral-600 mb-3">{description}</p>

            <div className="flex items-center gap-3">
              <input
                type="file"
                id={field}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={e => handleFileUpload(field, e.target.files?.[0] || null)}
                className="hidden"
              />
              <label
                htmlFor={field}
                className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                Choose File
              </label>
              {verificationData[field] && (
                <Chip color="success" variant="flat" size="sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {verificationData[field]?.name}
                </Chip>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <>
      <SEOHead
        title="Seller Onboarding | betweendeals"
        description="Set up your seller account and organization profile"
        keywords="seller onboarding, business setup, organization profile"
      />

      <div className="min-h-screen bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto py-12">
            {/* Progress Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome to betweendeals</h1>
              <p className="text-lg text-neutral-600 mb-6">
                Let's set up your seller account in just a few steps
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
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Business Information
                      </h2>
                      <p className="text-neutral-600">
                        Tell us about your business to create your organization profile
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          label="Business Name"
                          placeholder="Enter your business name"
                          value={organizationData.name}
                          onValueChange={value =>
                            setOrganizationData({ ...organizationData, name: value })
                          }
                          isRequired
                          variant="bordered"
                        />
                      </div>

                      <Select
                        label="Industry"
                        placeholder="Select your industry"
                        selectedKeys={organizationData.industry ? [organizationData.industry] : []}
                        onSelectionChange={keys => {
                          const industry = Array.from(keys)[0] as string;
                          setOrganizationData({ ...organizationData, industry });
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
                        placeholder="Select your country"
                        selectedKeys={organizationData.country ? [organizationData.country] : []}
                        onSelectionChange={keys => {
                          const country = Array.from(keys)[0] as string;
                          setOrganizationData({ ...organizationData, country });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {countries.map(country => (
                          <SelectItem key={country}>{country}</SelectItem>
                        ))}
                      </Select>

                      <Input
                        label="City"
                        placeholder="Enter your city"
                        value={organizationData.city}
                        onValueChange={value =>
                          setOrganizationData({ ...organizationData, city: value })
                        }
                        variant="bordered"
                      />

                      <Input
                        label="Website"
                        placeholder="https://yourwebsite.com"
                        value={organizationData.website}
                        onValueChange={value =>
                          setOrganizationData({ ...organizationData, website: value })
                        }
                        variant="bordered"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Business Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Business Details
                      </h2>
                      <p className="text-neutral-600">
                        Help buyers understand your business better
                      </p>
                    </div>

                    <Textarea
                      label="Business Description"
                      placeholder="Provide a detailed description of your business, what you do, your target market, and key differentiators..."
                      value={organizationData.description}
                      onValueChange={value =>
                        setOrganizationData({ ...organizationData, description: value })
                      }
                      minRows={4}
                      isRequired
                      variant="bordered"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Founded Year"
                        placeholder="e.g., 2010"
                        type="number"
                        value={organizationData.founded_year}
                        onValueChange={value =>
                          setOrganizationData({ ...organizationData, founded_year: value })
                        }
                        isRequired
                        variant="bordered"
                      />

                      <Select
                        label="Number of Employees"
                        placeholder="Select employee count"
                        selectedKeys={
                          organizationData.employee_count ? [organizationData.employee_count] : []
                        }
                        onSelectionChange={keys => {
                          const employee_count = Array.from(keys)[0] as string;
                          setOrganizationData({ ...organizationData, employee_count });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {employeeCounts.map(count => (
                          <SelectItem key={count}>{count}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Financial Information */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Financial Overview
                      </h2>
                      <p className="text-neutral-600">
                        Basic financial information to help position your business
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Annual Revenue"
                        placeholder="Select revenue range"
                        selectedKeys={
                          organizationData.annual_revenue ? [organizationData.annual_revenue] : []
                        }
                        onSelectionChange={keys => {
                          const annual_revenue = Array.from(keys)[0] as string;
                          setOrganizationData({ ...organizationData, annual_revenue });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {revenueRanges.map(range => (
                          <SelectItem key={range}>{range}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Business Model"
                        placeholder="Select business model"
                        selectedKeys={
                          organizationData.business_model ? [organizationData.business_model] : []
                        }
                        onSelectionChange={keys => {
                          const business_model = Array.from(keys)[0] as string;
                          setOrganizationData({ ...organizationData, business_model });
                        }}
                        isRequired
                        variant="bordered"
                      >
                        {businessModels.map(model => (
                          <SelectItem key={model}>{model}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        📊 Why we ask for this information
                      </h4>
                      <p className="text-sm text-blue-800">
                        This information helps us position your business correctly in search results
                        and ensures qualified buyers can find you. All financial details remain
                        confidential and are only shared with verified, NDA-signed buyers.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Verification Documents */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="p-3 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Business Verification
                      </h2>
                      <p className="text-neutral-600">
                        Upload documents to verify your business and increase buyer trust
                      </p>
                    </div>

                    <div className="space-y-4">
                      <FileUploadCard
                        title="Business Registration"
                        description="Official business registration document or articles of incorporation"
                        field="business_registration"
                        required
                      />

                      <FileUploadCard
                        title="Tax Certificate"
                        description="Recent tax certificate or VAT registration document"
                        field="tax_certificate"
                        required
                      />

                      <FileUploadCard
                        title="Proof of Ownership"
                        description="Document proving your ownership or authorization to sell the business"
                        field="ownership_proof"
                        required
                      />

                      <FileUploadCard
                        title="Financial Statements"
                        description="Recent financial statements or profit & loss summary (optional)"
                        field="financial_statements"
                      />
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">🔒 Document Security</h4>
                      <p className="text-sm text-green-800">
                        All documents are encrypted and stored securely. They're only accessible to
                        our verification team and won't be shared with buyers without your explicit
                        consent.
                      </p>
                    </div>

                    <div className="text-center">
                      <Button variant="bordered" onPress={handleSkipVerification} className="mr-3">
                        Skip for Now
                      </Button>
                      <span className="text-sm text-neutral-500">
                        You can complete verification later in your dashboard
                      </span>
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
                      {isSubmitting ? 'Setting up...' : 'Complete Setup'}
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

export default SellerOnboarding;
