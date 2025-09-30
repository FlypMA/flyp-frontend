import { Button } from '@/shared/components/buttons';
import { AnimatedTextarea, Input } from '@/shared/components/forms';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { Card, Slider } from '@heroui/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Euro,
  FileText,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SellerFormData {
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

const SellerOnboarding: React.FC = () => {
  const navigate = useNavigate();
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
    revenueRange: [100000, 500000],
    sellingReason: '',
    timeline: '',
    priceExpectations: '',
    contactEmail: '',
    contactPhone: '',
    wantsVerification: false,
  });

  const totalSteps = 16;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Auto-advance for certain steps
  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const updateFormData = (field: keyof SellerFormData, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const autoAdvanceSteps = [2]; // Business type selection
    if (autoAdvanceSteps.includes(currentStep) && formData.businessType) {
      setTimeout(() => handleNext(), 800);
    }
  }, [currentStep, formData.businessType, handleNext]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(totalSteps - 1); // Go to success page

      // Celebration animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return formData.businessType !== '';
      case 3:
        return formData.businessName.trim() !== '';
      case 4:
        return formData.industry !== '';
      case 5:
        return formData.city.trim() !== '';
      case 6:
        return formData.foundedYear !== '';
      case 7:
        return formData.description.trim().length > 20;
      case 8:
        return formData.employeeCount !== '';
      case 10:
        return formData.sellingReason !== '';
      case 11:
        return formData.timeline !== '';
      case 12:
        return formData.priceExpectations !== '';
      case 13:
        return formData.contactEmail.trim() !== '';
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      // Step 0: Welcome Hero
      case 0:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Turn your business into your next big opportunity
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of successful entrepreneurs who've found the perfect buyers for their
                businesses on UpSwitch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Euro className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Maximum Value</h3>
                <p className="text-gray-600 text-sm">
                  Our verified buyers compete for quality businesses
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Process</h3>
                <p className="text-gray-600 text-sm">
                  Confidential listings with verified buyer identity
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Results</h3>
                <p className="text-gray-600 text-sm">Average time to first buyer contact: 7 days</p>
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              className="px-8 py-6 text-lg font-semibold"
              onPress={handleNext}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        );

      // Step 1: Success Stories
      case 1:
        return (
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join 1,200+ successful sellers
            </h1>
            <p className="text-gray-600 mb-8">
              Real stories from entrepreneurs who found their perfect buyer
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 text-left">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Marie Dubois</h3>
                    <p className="text-gray-500 text-sm">Digital Marketing Agency</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Sold my 8-person agency for €750k in just 3 weeks. The buyer was perfect - they
                  kept all my team and grew the business."
                </p>
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </Card>

              <Card className="p-6 text-left">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Thomas Peeters</h3>
                    <p className="text-gray-500 text-sm">E-commerce Store</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Found a buyer who shared my vision for sustainable products. Smooth process,
                  great support team."
                </p>
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </Card>
            </div>

            <div className="bg-primary-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-primary-600 mr-3" />
                <span className="text-2xl font-bold text-gray-900">€2.3M</span>
              </div>
              <p className="text-primary-800 font-medium">Average deal value in 2023</p>
            </div>

            <Button size="lg" variant="primary" onPress={handleNext} className="px-8">
              I want this success too
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        );

      // Step 2: Business Type Selection
      case 2:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                What kind of business are you selling?
              </h1>
              <p className="text-gray-600">Choose the category that best describes your business</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'tech', label: 'Technology & Software', icon: '💻', color: 'blue' },
                { id: 'ecommerce', label: 'E-commerce & Retail', icon: '🛒', color: 'green' },
                { id: 'services', label: 'Professional Services', icon: '⚖️', color: 'purple' },
                { id: 'manufacturing', label: 'Manufacturing', icon: '🏭', color: 'orange' },
                { id: 'food', label: 'Food & Beverage', icon: '🍕', color: 'red' },
                { id: 'healthcare', label: 'Healthcare', icon: '🏥', color: 'teal' },
                { id: 'education', label: 'Education', icon: '📚', color: 'indigo' },
                { id: 'real-estate', label: 'Real Estate', icon: '🏘️', color: 'yellow' },
                { id: 'other', label: 'Other', icon: '🎯', color: 'gray' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => updateFormData('businessType', type.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${
                    formData.businessType === type.id
                      ? `border-${type.color}-500 bg-${type.color}-50 shadow-lg transform scale-105`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-sm">{type.label}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      // Step 3: Business Name
      case 3:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Building2 className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                What's your business called?
              </h1>
              <p className="text-gray-600">This will be the title of your listing</p>
            </div>

            <Input
              placeholder="e.g., Brussels Digital Solutions"
              value={formData.businessName}
              onChange={e => updateFormData('businessName', e.target.value)}
              className="text-center text-xl [&_input]:text-center [&_input]:text-xl [&_input]:font-medium [&_input]:bg-gray-50 [&_input]:border-2 [&_input]:border-gray-200 hover:[&_input]:border-gray-300 focus-within:[&_input]:border-primary-500"
              autoFocus
              label=""
              type="text"
              onBlur={() => {}}
              name="businessName"
            />

            <div className="mt-6 text-sm text-gray-500">
              💡 Tip: Use your registered business name for better credibility
            </div>
          </div>
        );

      // Step 4: Industry Details
      case 4:
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <Target className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Tell us more about your industry
              </h1>
              <p className="text-gray-600">This helps us match you with the right buyers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'SaaS & Software Development',
                'Digital Marketing Agency',
                'E-commerce Store',
                'Consulting Services',
                'Manufacturing & Production',
                'Retail & Physical Stores',
                'Healthcare Services',
                'Food & Restaurant',
                'Professional Services (Legal, Accounting)',
                'Real Estate Services',
                'Education & Training',
                'Other',
              ].map(industry => (
                <button
                  key={industry}
                  onClick={() => updateFormData('industry', industry)}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                    formData.industry === industry
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900">{industry}</span>
                </button>
              ))}
            </div>
          </div>
        );

      // Step 5: Location
      case 5:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <MapPin className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Where is your business located?
              </h1>
              <p className="text-gray-600">This helps buyers understand your market</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={e => updateFormData('country', e.target.value)}
                  className="clean-select w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none appearance-none cursor-pointer pr-10"
                >
                  <option value="Belgium">🇧🇪 Belgium</option>
                  <option value="Netherlands">🇳🇱 Netherlands</option>
                  <option value="France">🇫🇷 France</option>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="Other">🌍 Other</option>
                </select>
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Input
                  placeholder="e.g., Brussels, Antwerp, Ghent..."
                  value={formData.city}
                  onChange={e => updateFormData('city', e.target.value)}
                  className="[&_input]:bg-gray-50 [&_input]:border-2 [&_input]:border-gray-200 hover:[&_input]:border-gray-300 focus-within:[&_input]:border-primary-500"
                  autoFocus
                  label=""
                  type="text"
                  onBlur={() => {}}
                  name="city"
                />
              </div>
            </div>
          </div>
        );

      // Step 6: Founded Year
      case 6:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Calendar className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                When was your business founded?
              </h1>
              <p className="text-gray-600">Buyers love businesses with proven track records</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 12 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <button
                    key={year}
                    onClick={() => updateFormData('foundedYear', year.toString())}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      formData.foundedYear === year.toString()
                        ? 'border-orange-500 bg-orange-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-semibold text-gray-900">{year}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => updateFormData('foundedYear', 'before-2012')}
              className={`mt-4 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                formData.foundedYear === 'before-2012'
                  ? 'border-orange-500 bg-orange-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-semibold text-gray-900">Before 2012</span>
            </button>
          </div>
        );

      // Step 7: Business Description
      case 7:
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <FileText className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Tell us about your business</h1>
              <p className="text-gray-600">What makes your business special? What do you do?</p>
            </div>

            <AnimatedTextarea
              label="Business Description"
              placeholder="e.g., We're a digital marketing agency specializing in helping SaaS companies grow their MRR through content marketing and SEO. We've helped 50+ companies increase their organic traffic by 300% on average..."
              value={formData.description}
              onChange={value => updateFormData('description', value)}
              minRows={6}
              className="text-left [&_textarea]:text-base [&_textarea]:leading-relaxed [&_textarea]:bg-gray-50 [&_textarea]:border-2 [&_textarea]:border-gray-200 hover:[&_textarea]:border-gray-300 focus-within:[&_textarea]:border-primary-500"
              onBlur={() => {}}
              name="description"
            />

            <div className="mt-4 text-sm text-gray-500">
              {formData.description.length < 20 && (
                <span className="text-orange-600">
                  💡 Add a bit more detail to help buyers understand your value proposition
                </span>
              )}
              {formData.description.length >= 20 && (
                <span className="text-green-600">
                  ✅ Great! This gives buyers a clear picture of your business
                </span>
              )}
            </div>
          </div>
        );

      // Step 8: Team Size
      case 8:
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <Users className="w-16 h-16 text-teal-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                How many people work at your business?
              </h1>
              <p className="text-gray-600">Including yourself, full-time and part-time employees</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: 'solo', label: 'Just me', subtitle: 'Solo entrepreneur' },
                { value: '2-5', label: '2-5 people', subtitle: 'Small team' },
                { value: '6-10', label: '6-10 people', subtitle: 'Growing team' },
                { value: '11-25', label: '11-25 people', subtitle: 'Medium company' },
                { value: '26-50', label: '26-50 people', subtitle: 'Established business' },
                { value: '50+', label: '50+ people', subtitle: 'Large operation' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateFormData('employeeCount', option.value)}
                  className={`p-6 rounded-2xl border-2 transition-all hover:shadow-md text-center ${
                    formData.employeeCount === option.value
                      ? 'border-teal-500 bg-teal-50 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900 text-lg mb-1">{option.label}</div>
                  <div className="text-gray-500 text-sm">{option.subtitle}</div>
                </button>
              ))}
            </div>
          </div>
        );

      // Step 9: Revenue Range (Slider Interface)
      case 9:
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <TrendingUp className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                What's your annual revenue range?
              </h1>
              <p className="text-gray-600">This helps buyers understand your business size</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  €{formData.revenueRange[0].toLocaleString()} - €
                  {formData.revenueRange[1].toLocaleString()}
                </div>
                <div className="text-gray-600">Annual revenue range</div>
              </div>

              <Slider
                value={formData.revenueRange}
                onChange={value => updateFormData('revenueRange', value as number[])}
                step={25000}
                minValue={0}
                maxValue={5000000}
                className="mb-4"
                formatOptions={{
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
              />

              <div className="flex justify-between text-sm text-gray-500">
                <span>€0</span>
                <span>€5M+</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              💡 Don't worry, this won't be visible to buyers until you approve it
            </div>
          </div>
        );

      // Step 10: Why Selling
      case 10:
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Why are you looking to sell?
              </h1>
              <p className="text-gray-600">
                Buyers appreciate honesty - it helps them understand your motivation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  value: 'new-venture',
                  label: 'Starting a new venture',
                  subtitle: 'Ready for the next challenge',
                  icon: '🚀',
                },
                {
                  value: 'retirement',
                  label: 'Planning retirement',
                  subtitle: 'Time to enjoy life',
                  icon: '🏖️',
                },
                {
                  value: 'life-change',
                  label: 'Life circumstances',
                  subtitle: 'Family, health, or personal reasons',
                  icon: '👨‍👩‍👧‍👦',
                },
                {
                  value: 'scale-needed',
                  label: 'Business needs scaling',
                  subtitle: "Needs resources I can't provide",
                  icon: '📈',
                },
                {
                  value: 'partnership',
                  label: 'Looking for partnership',
                  subtitle: 'Want to stay involved',
                  icon: '🤝',
                },
                {
                  value: 'other',
                  label: 'Other reasons',
                  subtitle: 'Something else',
                  icon: '💭',
                },
              ].map(reason => (
                <button
                  key={reason.value}
                  onClick={() => updateFormData('sellingReason', reason.value)}
                  className={`p-6 rounded-2xl border-2 transition-all hover:shadow-md text-left ${
                    formData.sellingReason === reason.value
                      ? 'border-red-500 bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{reason.icon}</span>
                    <span className="font-bold text-gray-900">{reason.label}</span>
                  </div>
                  <div className="text-gray-600 text-sm">{reason.subtitle}</div>
                </button>
              ))}
            </div>
          </div>
        );

      // Step 11: Timeline
      case 11:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Clock className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                When are you looking to sell?
              </h1>
              <p className="text-gray-600">This helps us prioritize your listing</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  value: 'asap',
                  label: 'As soon as possible',
                  subtitle: 'Ready to move quickly',
                  color: 'red',
                },
                {
                  value: '3months',
                  label: 'Within 3 months',
                  subtitle: 'Actively looking',
                  color: 'orange',
                },
                {
                  value: '6months',
                  label: 'Within 6 months',
                  subtitle: 'Planning ahead',
                  color: 'yellow',
                },
                {
                  value: '1year',
                  label: 'Within a year',
                  subtitle: 'Exploring options',
                  color: 'green',
                },
                {
                  value: 'flexible',
                  label: "I'm flexible",
                  subtitle: 'Waiting for the right offer',
                  color: 'blue',
                },
              ].map(timeline => (
                <button
                  key={timeline.value}
                  onClick={() => updateFormData('timeline', timeline.value)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all hover:shadow-md text-left ${
                    formData.timeline === timeline.value
                      ? `border-${timeline.color}-500 bg-${timeline.color}-50 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900 text-lg mb-1">{timeline.label}</div>
                  <div className="text-gray-600 text-sm">{timeline.subtitle}</div>
                </button>
              ))}
            </div>
          </div>
        );

      // Step 12: Price Expectations
      case 12:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Euro className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Do you have a price in mind?
              </h1>
              <p className="text-gray-600">This helps buyers understand your expectations</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  value: 'market-value',
                  label: 'I want market value',
                  subtitle: 'Let the market decide',
                },
                {
                  value: 'quick-sale',
                  label: 'I want a quick sale',
                  subtitle: 'Willing to negotiate for speed',
                },
                {
                  value: 'specific-range',
                  label: 'I have a specific range',
                  subtitle: 'I know what I want',
                },
                {
                  value: 'open-offers',
                  label: 'Open to all offers',
                  subtitle: "Show me what you've got",
                },
                {
                  value: 'not-sure',
                  label: 'Not sure yet',
                  subtitle: 'Need help with valuation',
                },
              ].map(price => (
                <button
                  key={price.value}
                  onClick={() => updateFormData('priceExpectations', price.value)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all hover:shadow-md text-left ${
                    formData.priceExpectations === price.value
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900 text-lg mb-1">{price.label}</div>
                  <div className="text-gray-600 text-sm">{price.subtitle}</div>
                </button>
              ))}
            </div>
          </div>
        );

      // Step 13: Contact Information
      case 13:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Mail className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                How can serious buyers reach you?
              </h1>
              <p className="text-gray-600">We'll only share this with verified, qualified buyers</p>
            </div>

            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.contactEmail}
                  onChange={e => updateFormData('contactEmail', e.target.value)}
                  leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
                  className="[&_input]:bg-gray-50 [&_input]:border-2 [&_input]:border-gray-200 hover:[&_input]:border-gray-300 focus-within:[&_input]:border-primary-500"
                  autoFocus
                  label=""
                  onBlur={() => {}}
                  name="contactEmail"
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <Input
                  type="tel"
                  placeholder="+32 xxx xxx xxx"
                  value={formData.contactPhone}
                  onChange={e => updateFormData('contactPhone', e.target.value)}
                  leftIcon={<Phone className="w-5 h-5 text-gray-400" />}
                  className="[&_input]:bg-gray-50 [&_input]:border-2 [&_input]:border-gray-200 hover:[&_input]:border-gray-300 focus-within:[&_input]:border-primary-500"
                  label=""
                  onBlur={() => {}}
                  name="contactPhone"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-xl">
              <p className="text-primary-800 text-sm">
                🔒 Your contact information is kept confidential and only shared with verified
                buyers who show serious interest
              </p>
            </div>
          </div>
        );

      // Step 14: Verification Option
      case 14:
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <Shield className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Want to stand out? Verify your business
              </h1>
              <p className="text-gray-600">Verified businesses get 3x more buyer interest</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => updateFormData('wantsVerification', false)}
                className={`p-8 rounded-2xl border-2 transition-all hover:shadow-md ${
                  formData.wantsVerification === false
                    ? 'border-gray-500 bg-gray-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-bold text-gray-900 text-lg mb-4">Maybe Later</h3>
                <ul className="text-left text-gray-600 space-y-2 text-sm">
                  <li>• List immediately</li>
                  <li>• Standard visibility</li>
                  <li>• Can verify anytime</li>
                </ul>
              </button>

              <button
                onClick={() => updateFormData('wantsVerification', true)}
                className={`p-8 rounded-2xl border-2 transition-all hover:shadow-md relative ${
                  formData.wantsVerification === true
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  RECOMMENDED
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Yes, Verify Now</h3>
                <ul className="text-left text-gray-600 space-y-2 text-sm">
                  <li>• 3x more buyer interest</li>
                  <li>• Priority in search results</li>
                  <li>• "Verified" badge</li>
                  <li>• Higher conversion rate</li>
                </ul>
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              Verification typically takes 24-48 hours and involves uploading basic business
              documents
            </div>
          </div>
        );

      // Step 15: Success & Next Steps
      case 15:
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Your business listing is ready. Here's what happens next:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-primary-50 rounded-2xl">
                <div className="w-12 h-12 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Review & Approve</h3>
                <p className="text-gray-600 text-sm">
                  We'll review your listing and have it live within 24 hours
                </p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Attract Buyers</h3>
                <p className="text-gray-600 text-sm">
                  Qualified buyers will start viewing your listing
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-2xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Connect & Sell</h3>
                <p className="text-gray-600 text-sm">
                  We'll facilitate introductions with serious buyers
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What you can expect:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">First buyer contact within 7 days</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Regular listing performance updates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Support throughout the sale process</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button
                size="lg"
                variant="primary"
                className="flex-1 px-8 py-6 text-lg font-semibold"
                onPress={() => navigate('/account/seller')}
              >
                Go to Seller Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="flex-1 px-8 py-6 text-lg font-semibold"
                onPress={() => navigate('/help')}
              >
                Get Help & Support
              </Button>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <>
      <SEOHead
        title={`Step ${currentStep + 1} - Sell Your Business | UpSwitch`}
        description="Complete your seller profile in minutes and start attracting qualified buyers for your business"
        keywords="sell business, business for sale, seller onboarding, business valuation"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Progress Bar */}
        {currentStep > 0 && currentStep < totalSteps - 1 && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <Button isIconOnly variant="tertiary" onPress={handleBack} className="mr-4">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <span className="text-sm text-gray-600">
                  Step {currentStep + 1} of {totalSteps}
                </span>
              </div>
              <div className="text-sm text-gray-500">{Math.round(progress)}% complete</div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className={`${currentStep > 0 && currentStep < totalSteps - 1 ? 'pt-24' : 'pt-8'} pb-8 px-6`}
        >
          <div className="max-w-6xl mx-auto">{renderStep()}</div>
        </div>

        {/* Navigation Footer */}
        {currentStep > 1 && currentStep < totalSteps - 1 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <Button
                variant="tertiary"
                size="md"
                onPress={handleBack}
                startContent={<ArrowLeft className="w-5 h-5" />}
              >
                Back
              </Button>

              {currentStep === 13 ? (
                <Button
                  size="lg"
                  variant="primary"
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  endContent={!isSubmitting && <CheckCircle className="w-5 h-5" />}
                  className="px-8"
                >
                  {isSubmitting ? 'Setting up your listing...' : 'Complete Setup'}
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="primary"
                  onPress={handleNext}
                  isDisabled={!isStepValid()}
                  endContent={<ArrowRight className="w-5 h-5" />}
                  className="px-8"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SellerOnboarding;
