import React, { useState } from 'react';
import { Building2, Target, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@heroui/react';

interface BusinessType {
  value: string;
  label: string;
  description: string;
  industries: Industry[];
}

interface Industry {
  value: string;
  label: string;
  description: string;
  popular?: boolean;
}

interface BusinessTypeAndIndustrySelectorProps {
  selectedBusinessType?: string;
  selectedIndustry?: string;
  onSelect: (businessType: string, industry: string) => void;
}

const BusinessTypeAndIndustrySelector: React.FC<BusinessTypeAndIndustrySelectorProps> = ({ 
  selectedBusinessType, 
  selectedIndustry,
  onSelect 
}) => {
  const [currentBusinessType, setCurrentBusinessType] = useState<string>(selectedBusinessType || '');
  const [currentIndustry, setCurrentIndustry] = useState<string>(selectedIndustry || '');
  const [expandedType, setExpandedType] = useState<string>(selectedBusinessType || '');

  const businessTypes: BusinessType[] = [
    {
      value: 'retail',
      label: 'Retail & E-commerce',
      description: 'Physical or online stores selling products directly to customers',
      industries: [
        { value: 'fashion', label: 'Fashion & Apparel', description: 'Clothing, accessories, footwear', popular: true },
        { value: 'electronics', label: 'Electronics & Tech', description: 'Consumer electronics, gadgets', popular: true },
        { value: 'home-garden', label: 'Home & Garden', description: 'Furniture, decor, home improvement' },
        { value: 'sports-recreation', label: 'Sports & Recreation', description: 'Sporting goods, outdoor equipment' },
        { value: 'luxury-goods', label: 'Luxury Goods', description: 'Premium brands, high-end products' },
        { value: 'marketplace', label: 'Online Marketplace', description: 'Multi-vendor platforms' },
      ]
    },
    {
      value: 'service',
      label: 'Professional Services',
      description: 'Service-based businesses providing expertise and solutions',
      industries: [
        { value: 'consulting', label: 'Business Consulting', description: 'Strategy, management, operations', popular: true },
        { value: 'marketing', label: 'Marketing & Advertising', description: 'Digital marketing, branding, PR', popular: true },
        { value: 'legal', label: 'Legal Services', description: 'Law firms, legal advice' },
        { value: 'accounting', label: 'Accounting & Finance', description: 'Bookkeeping, tax services' },
        { value: 'design', label: 'Design & Creative', description: 'Graphic design, web design, branding' },
        { value: 'hr-services', label: 'HR & Recruitment', description: 'Human resources, talent acquisition' },
      ]
    },
    {
      value: 'technology',
      label: 'Technology & Software',
      description: 'Software development, SaaS, and technology-driven businesses',
      industries: [
        { value: 'saas', label: 'SaaS Platforms', description: 'Software as a Service applications', popular: true },
        { value: 'mobile-apps', label: 'Mobile Applications', description: 'iOS, Android, cross-platform apps', popular: true },
        { value: 'ai-ml', label: 'AI & Machine Learning', description: 'Artificial intelligence solutions' },
        { value: 'cybersecurity', label: 'Cybersecurity', description: 'Security solutions, data protection' },
        { value: 'fintech', label: 'Financial Technology', description: 'Payment processing, digital banking' },
        { value: 'enterprise-software', label: 'Enterprise Software', description: 'B2B software solutions' },
      ]
    },
    {
      value: 'healthcare',
      label: 'Healthcare & Medical',
      description: 'Medical services, health technology, and wellness businesses',
      industries: [
        { value: 'medical-practice', label: 'Medical Practices', description: 'Clinics, specialists, family medicine', popular: true },
        { value: 'health-tech', label: 'Health Technology', description: 'Digital health, telemedicine', popular: true },
        { value: 'pharmaceuticals', label: 'Pharmaceuticals', description: 'Drug development, medical supplies' },
        { value: 'medical-devices', label: 'Medical Devices', description: 'Healthcare equipment, diagnostics' },
        { value: 'wellness', label: 'Wellness & Fitness', description: 'Fitness centers, wellness coaching' },
        { value: 'biotechnology', label: 'Biotechnology', description: 'Biotech research, life sciences' },
      ]
    },
    {
      value: 'food-beverage',
      label: 'Food & Beverage',
      description: 'Restaurants, food production, and hospitality businesses',
      industries: [
        { value: 'restaurants', label: 'Restaurants & Cafes', description: 'Dining establishments, quick service', popular: true },
        { value: 'food-production', label: 'Food Production', description: 'Food manufacturing, processing', popular: true },
        { value: 'catering', label: 'Catering Services', description: 'Event catering, corporate dining' },
        { value: 'beverages', label: 'Beverages', description: 'Alcoholic and non-alcoholic drinks' },
        { value: 'food-delivery', label: 'Food Delivery', description: 'Meal delivery, food logistics' },
        { value: 'agriculture', label: 'Agriculture & Farming', description: 'Farming, agricultural products' },
      ]
    },
    {
      value: 'manufacturing',
      label: 'Manufacturing',
      description: 'Production and industrial businesses creating physical products',
      industries: [
        { value: 'automotive', label: 'Automotive', description: 'Auto parts, vehicle manufacturing', popular: true },
        { value: 'machinery', label: 'Industrial Machinery', description: 'Equipment, heavy machinery', popular: true },
        { value: 'chemicals', label: 'Chemicals', description: 'Chemical production, materials' },
        { value: 'aerospace', label: 'Aerospace', description: 'Aircraft, space technology' },
        { value: 'textiles', label: 'Textiles', description: 'Fabric production, clothing manufacturing' },
        { value: 'packaging', label: 'Packaging', description: 'Packaging materials, containers' },
      ]
    }
  ];

  const handleBusinessTypeSelect = (typeValue: string) => {
    setCurrentBusinessType(typeValue);
    setExpandedType(typeValue);
    setCurrentIndustry(''); // Reset industry when changing business type
  };

  const handleIndustrySelect = (industryValue: string) => {
    setCurrentIndustry(industryValue);
  };

  const handleComplete = () => {
    if (currentBusinessType && currentIndustry) {
      onSelect(currentBusinessType, currentIndustry);
    }
  };

  const selectedTypeData = businessTypes.find(type => type.value === currentBusinessType);
  const selectedIndustryData = selectedTypeData?.industries.find(ind => ind.value === currentIndustry);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
          <Building2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Tell us about your business
        </h2>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
          Select your business type and industry to help us connect you with the right buyers.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
          currentBusinessType ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
        }`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            currentBusinessType ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'
          }`}>
            {currentBusinessType ? <CheckCircle2 className="w-4 h-4" /> : '1'}
          </div>
          <span className="font-medium">Business Type</span>
        </div>
        
        <ArrowRight className="w-4 h-4 text-gray-400" />
        
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
          currentIndustry ? 'bg-purple-100 text-purple-700' : currentBusinessType ? 'bg-gray-100 text-gray-600' : 'bg-gray-50 text-gray-400'
        }`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            currentIndustry ? 'bg-purple-600 text-white' : currentBusinessType ? 'bg-gray-400 text-white' : 'bg-gray-300 text-gray-500'
          }`}>
            {currentIndustry ? <CheckCircle2 className="w-4 h-4" /> : '2'}
          </div>
          <span className="font-medium">Industry</span>
        </div>
      </div>

      {/* Business Type Selection */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          First, what type of business do you have?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleBusinessTypeSelect(type.value)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:scale-[1.02] ${
                currentBusinessType === type.value
                  ? 'bg-blue-50 border-blue-500 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold text-lg ${
                  currentBusinessType === type.value ? 'text-blue-700' : 'text-gray-900'
                }`}>
                  {type.label}
                </h4>
                {currentBusinessType === type.value && (
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Industry Selection */}
      {currentBusinessType && selectedTypeData && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
              Now, which industry best describes your {selectedTypeData.label.toLowerCase()}?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTypeData.industries.map((industry) => (
                <button
                  key={industry.value}
                  onClick={() => handleIndustrySelect(industry.value)}
                  className={`p-5 rounded-xl border transition-all duration-300 text-left hover:shadow-md group ${
                    currentIndustry === industry.value
                      ? 'bg-purple-50 border-purple-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-semibold ${
                        currentIndustry === industry.value ? 'text-purple-700' : 'text-gray-900 group-hover:text-gray-700'
                      }`}>
                        {industry.label}
                      </h4>
                      {industry.popular && (
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    {currentIndustry === industry.value && (
                      <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {industry.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selection Summary & Continue */}
      {currentBusinessType && currentIndustry && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-blue-700 font-bold text-xl mb-4">
              <Target className="w-6 h-6" />
              <span>Perfect Match!</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Business Type:</span> {selectedTypeData?.label}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Industry:</span> {selectedIndustryData?.label}
              </p>
            </div>
            
            <p className="text-blue-700 leading-relaxed max-w-3xl mx-auto">
              We'll connect you with buyers who specialize in {selectedTypeData?.label.toLowerCase()} 
              businesses in the {selectedIndustryData?.label.toLowerCase()} industry.
            </p>
            
            <Button
              color="primary"
              size="lg"
              onPress={handleComplete}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-6"
              endContent={<ArrowRight className="w-5 h-5" />}
            >
              Continue to Next Step
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessTypeAndIndustrySelector;
