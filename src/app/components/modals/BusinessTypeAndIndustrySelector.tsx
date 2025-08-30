import React, { useState } from 'react';
import { Building2, Target, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@heroui/react';

interface UnifiedIndustry {
  value: string;
  label: string;
  description: string;
  category: string;
  icon: string;
  popular?: boolean;
  emoji?: string;
  name?: string;
}

interface BusinessTypeAndIndustrySelectorProps {
  selectedBusinessType?: string;
  selectedIndustry?: string;
  onSelect: (businessType: string, industry: string) => void;
}

const BusinessTypeAndIndustrySelector: React.FC<BusinessTypeAndIndustrySelectorProps> = ({ 
  selectedIndustry,
  onSelect 
}) => {
  const [selectedIndustryValue, setSelectedIndustryValue] = useState<string>(selectedIndustry || '');

  // Unified list of all industries with their categories - with emojis for display
  const allIndustries: UnifiedIndustry[] = [
    // Technology & Software
    { value: 'saas', label: 'SaaS Platforms', name: 'SaaS Platforms', description: 'Software as a Service applications', category: 'Technology & Software', icon: '💻', emoji: '💻', popular: true },
    { value: 'mobile-apps', label: 'Mobile Applications', name: 'Mobile Applications', description: 'iOS, Android, cross-platform apps', category: 'Technology & Software', icon: '📱', emoji: '📱', popular: true },
    { value: 'ai-ml', label: 'AI & Machine Learning', name: 'AI & Machine Learning', description: 'Artificial intelligence solutions', category: 'Technology & Software', icon: '🤖', emoji: '🤖' },
    { value: 'cybersecurity', label: 'Cybersecurity', name: 'Cybersecurity', description: 'Security solutions, data protection', category: 'Technology & Software', icon: '🔒', emoji: '🔒' },
    { value: 'fintech', label: 'Financial Technology', name: 'Financial Technology', description: 'Payment processing, digital banking', category: 'Technology & Software', icon: '💳', emoji: '💳', popular: true },
    { value: 'enterprise-software', label: 'Enterprise Software', name: 'Enterprise Software', description: 'B2B software solutions', category: 'Technology & Software', icon: '🏢', emoji: '🏢' },
    { value: 'web-development', label: 'Web Development', name: 'Web Development', description: 'Website development, web apps', category: 'Technology & Software', icon: '🌐', emoji: '🌐', popular: true },
    { value: 'it-services', label: 'IT Services', name: 'IT Services', description: 'Technical support, system administration', category: 'Technology & Software', icon: '⚙️', emoji: '⚙️' },
    { value: 'cloud-computing', label: 'Cloud Computing', name: 'Cloud Computing', description: 'AWS, Azure, cloud infrastructure', category: 'Technology & Software', icon: '☁️', emoji: '☁️' },
    { value: 'data-analytics', label: 'Data Analytics', name: 'Data Analytics', description: 'Business intelligence, data science', category: 'Technology & Software', icon: '📊', emoji: '📊' },
    { value: 'blockchain', label: 'Blockchain & Crypto', name: 'Blockchain & Crypto', description: 'Cryptocurrency, DeFi, NFTs', category: 'Technology & Software', icon: '⛓️', emoji: '⛓️' },
    { value: 'gaming', label: 'Gaming & Esports', name: 'Gaming & Esports', description: 'Video games, mobile games, esports', category: 'Technology & Software', icon: '🎮', emoji: '🎮' },
    { value: 'iot', label: 'Internet of Things', name: 'Internet of Things', description: 'Connected devices, smart technology', category: 'Technology & Software', icon: '🔗', emoji: '🔗' },
    { value: 'edtech', label: 'Education Technology', name: 'Education Technology', description: 'Online learning, educational software', category: 'Technology & Software', icon: '🎓', emoji: '🎓' },
    
    // Retail & E-commerce  
    { value: 'fashion', label: 'Fashion & Apparel', name: 'Fashion & Apparel', description: 'Clothing, accessories, footwear', category: 'Retail & E-commerce', icon: '👗', emoji: '👗', popular: true },
    { value: 'electronics', label: 'Electronics & Tech', name: 'Electronics & Tech', description: 'Consumer electronics, gadgets', category: 'Retail & E-commerce', icon: '⚡', emoji: '⚡' },
    { value: 'home-garden', label: 'Home & Garden', name: 'Home & Garden', description: 'Furniture, decor, home improvement', category: 'Retail & E-commerce', icon: '🏠', emoji: '🏠', popular: true },
    { value: 'sports-recreation', label: 'Sports & Recreation', name: 'Sports & Recreation', description: 'Sporting goods, outdoor equipment', category: 'Retail & E-commerce', icon: '🏃', emoji: '🏃' },
    { value: 'luxury-goods', label: 'Luxury Goods', name: 'Luxury Goods', description: 'Premium brands, high-end products', category: 'Retail & E-commerce', icon: '💎', emoji: '💎' },
    { value: 'marketplace', label: 'Online Marketplace', name: 'Online Marketplace', description: 'Multi-vendor platforms', category: 'Retail & E-commerce', icon: '🛒', emoji: '🛒' },
    { value: 'automotive-retail', label: 'Automotive Retail', name: 'Automotive Retail', description: 'Car dealerships, parts', category: 'Retail & E-commerce', icon: '🚙', emoji: '🚙' },
    { value: 'jewelry', label: 'Jewelry & Watches', name: 'Jewelry & Watches', description: 'Fine jewelry, luxury watches', category: 'Retail & E-commerce', icon: '💍', emoji: '💍' },
    { value: 'books-media', label: 'Books & Media', name: 'Books & Media', description: 'Publishing, digital content', category: 'Retail & E-commerce', icon: '📚', emoji: '📚' },
    { value: 'pet-supplies', label: 'Pet Supplies', name: 'Pet Supplies', description: 'Pet food, accessories, services', category: 'Retail & E-commerce', icon: '🐾', emoji: '🐾' },
    { value: 'cosmetics', label: 'Cosmetics & Beauty', name: 'Cosmetics & Beauty', description: 'Beauty products, skincare', category: 'Retail & E-commerce', icon: '💄', emoji: '💄' },
    { value: 'toys-games', label: 'Toys & Games', name: 'Toys & Games', description: 'Children toys, board games', category: 'Retail & E-commerce', icon: '🧸', emoji: '🧸' },
    { value: 'arts-crafts', label: 'Arts & Crafts', name: 'Arts & Crafts', description: 'Art supplies, handmade goods', category: 'Retail & E-commerce', icon: '🎨', emoji: '🎨' },
    { value: 'baby-kids', label: 'Baby & Kids', name: 'Baby & Kids', description: 'Baby products, children clothing', category: 'Retail & E-commerce', icon: '👶', emoji: '👶' },
    { value: 'health-wellness', label: 'Health & Wellness', name: 'Health & Wellness', description: 'Supplements, wellness products', category: 'Retail & E-commerce', icon: '🌿', emoji: '🌿' },
    { value: 'dropshipping', label: 'Dropshipping', name: 'Dropshipping', description: 'Drop shipping businesses', category: 'Retail & E-commerce', icon: '📦', emoji: '📦' },

    // Food & Beverage
    { value: 'restaurants', label: 'Restaurants & Cafes', name: 'Restaurants & Cafes', description: 'Dining establishments', category: 'Food & Beverage', icon: '🍽️', emoji: '🍽️', popular: true },
    { value: 'food-production', label: 'Food Production', name: 'Food Production', description: 'Food manufacturing', category: 'Food & Beverage', icon: '🏭', emoji: '🏭' },
    { value: 'catering', label: 'Catering Services', name: 'Catering Services', description: 'Event catering', category: 'Food & Beverage', icon: '🎉', emoji: '🎉' },
    { value: 'beverages', label: 'Beverages', name: 'Beverages', description: 'Drinks, soft drinks', category: 'Food & Beverage', icon: '🥤', emoji: '🥤' },
    { value: 'food-delivery', label: 'Food Delivery', name: 'Food Delivery', description: 'Delivery services', category: 'Food & Beverage', icon: '🚚', emoji: '🚚', popular: true },
    { value: 'agriculture', label: 'Agriculture & Farming', name: 'Agriculture & Farming', description: 'Farm operations', category: 'Food & Beverage', icon: '🌾', emoji: '🌾' },
    { value: 'bars-pubs', label: 'Bars & Pubs', name: 'Bars & Pubs', description: 'Drinking establishments', category: 'Food & Beverage', icon: '🍺', emoji: '🍺' },
    { value: 'food-trucks', label: 'Food Trucks', name: 'Food Trucks', description: 'Mobile food service', category: 'Food & Beverage', icon: '🚛', emoji: '🚛' },
    { value: 'ice-cream', label: 'Ice Cream Shops', name: 'Ice Cream Shops', description: 'Ice cream parlors', category: 'Food & Beverage', icon: '🍦', emoji: '🍦' },
    { value: 'coffee-shops', label: 'Coffee Shops', name: 'Coffee Shops', description: 'Coffee houses', category: 'Food & Beverage', icon: '☕', emoji: '☕' },
    { value: 'fast-food', label: 'Fast Food', name: 'Fast Food', description: 'Quick service restaurants', category: 'Food & Beverage', icon: '🍟', emoji: '🍟' },
    { value: 'pizza', label: 'Pizza Restaurants', name: 'Pizza Restaurants', description: 'Pizza establishments', category: 'Food & Beverage', icon: '🍕', emoji: '🍕' },
    { value: 'seafood', label: 'Seafood Restaurants', name: 'Seafood Restaurants', description: 'Seafood dining', category: 'Food & Beverage', icon: '🦞', emoji: '🦞' },
    { value: 'bakery', label: 'Bakery & Pastry', name: 'Bakery & Pastry', description: 'Baked goods', category: 'Food & Beverage', icon: '🥐', emoji: '🥐' },
    { value: 'organic-food', label: 'Organic & Health Food', name: 'Organic & Health Food', description: 'Healthy food options', category: 'Food & Beverage', icon: '🥬', emoji: '🥬' },
    { value: 'wine-spirits', label: 'Wine & Spirits', name: 'Wine & Spirits', description: 'Alcohol retail', category: 'Food & Beverage', icon: '🍷', emoji: '🍷' },

    // Professional Services
    { value: 'business-consulting', label: 'Business Consulting', name: 'Business Consulting', description: 'Business advisory', category: 'Professional Services', icon: '💼', emoji: '💼' },
    { value: 'marketing-advertising', label: 'Marketing & Advertising', name: 'Marketing & Advertising', description: 'Marketing agencies', category: 'Professional Services', icon: '📣', emoji: '📣' },
    { value: 'legal-services', label: 'Legal Services', name: 'Legal Services', description: 'Law firms', category: 'Professional Services', icon: '⚖️', emoji: '⚖️' },
    { value: 'accounting-finance', label: 'Accounting & Finance', name: 'Accounting & Finance', description: 'Financial services', category: 'Professional Services', icon: '📊', emoji: '📊' },
    { value: 'design-creative', label: 'Design & Creative', name: 'Design & Creative', description: 'Creative agencies', category: 'Professional Services', icon: '🎨', emoji: '🎨' },
    { value: 'hr-recruitment', label: 'HR & Recruitment', name: 'HR & Recruitment', description: 'Human resources', category: 'Professional Services', icon: '👥', emoji: '👥' },
    { value: 'real-estate', label: 'Real Estate', name: 'Real Estate', description: 'Property services', category: 'Professional Services', icon: '🏘️', emoji: '🏘️' },
    { value: 'insurance', label: 'Insurance', name: 'Insurance', description: 'Insurance services', category: 'Professional Services', icon: '🛡️', emoji: '🛡️' },
    { value: 'translation', label: 'Translation Services', name: 'Translation Services', description: 'Language services', category: 'Professional Services', icon: '🌍', emoji: '🌍' },
    { value: 'photography', label: 'Photography', name: 'Photography', description: 'Photo services', category: 'Professional Services', icon: '📸', emoji: '📸' },

    // Healthcare
    { value: 'medical-practices', label: 'Medical Practices', name: 'Medical Practices', description: 'Doctor offices', category: 'Healthcare', icon: '🏥', emoji: '🏥' },
    { value: 'health-tech', label: 'Health Technology', name: 'Health Technology', description: 'Medical tech', category: 'Healthcare', icon: '💊', emoji: '💊' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals', name: 'Pharmaceuticals', description: 'Drug companies', category: 'Healthcare', icon: '💉', emoji: '💉' },
    { value: 'medical-devices', label: 'Medical Devices', name: 'Medical Devices', description: 'Medical equipment', category: 'Healthcare', icon: '🩺', emoji: '🩺' },
    { value: 'wellness-fitness', label: 'Wellness & Fitness', name: 'Wellness & Fitness', description: 'Fitness services', category: 'Healthcare', icon: '🧘', emoji: '🧘' },
    { value: 'biotechnology', label: 'Biotechnology', name: 'Biotechnology', description: 'Biotech companies', category: 'Healthcare', icon: '🧬', emoji: '🧬' },
    { value: 'dental', label: 'Dental Practices', name: 'Dental Practices', description: 'Dental clinics', category: 'Healthcare', icon: '🦷', emoji: '🦷' },
    { value: 'veterinary', label: 'Veterinary Services', name: 'Veterinary Services', description: 'Animal care', category: 'Healthcare', icon: '🐕‍🦺', emoji: '🐕‍🦺' },
    { value: 'optometry', label: 'Optometry', name: 'Optometry', description: 'Eye care', category: 'Healthcare', icon: '👓', emoji: '👓' },

    // Entertainment & Hospitality
    { value: 'gyms-fitness', label: 'Gyms & Fitness Centers', name: 'Gyms & Fitness Centers', description: 'Fitness facilities', category: 'Entertainment & Hospitality', icon: '🏋️', emoji: '🏋️', popular: true },
    { value: 'entertainment', label: 'Entertainment Venues', name: 'Entertainment Venues', description: 'Entertainment businesses', category: 'Entertainment & Hospitality', icon: '🎭', emoji: '🎭' },
    { value: 'gaming-arcades', label: 'Gaming & Arcades', name: 'Gaming & Arcades', description: 'Gaming centers', category: 'Entertainment & Hospitality', icon: '🎮', emoji: '🎮' },
    { value: 'travel-tourism', label: 'Travel & Tourism', name: 'Travel & Tourism', description: 'Travel services', category: 'Entertainment & Hospitality', icon: '✈️', emoji: '✈️' },
    { value: 'hotels-lodging', label: 'Hotels & Lodging', name: 'Hotels & Lodging', description: 'Accommodation', category: 'Entertainment & Hospitality', icon: '🏨', emoji: '🏨', popular: true },
    { value: 'spas-wellness', label: 'Spas & Wellness', name: 'Spas & Wellness', description: 'Spa services', category: 'Entertainment & Hospitality', icon: '🧘', emoji: '🧘' },
    { value: 'sports-clubs', label: 'Sports Clubs', name: 'Sports Clubs', description: 'Athletic clubs', category: 'Entertainment & Hospitality', icon: '⛳', emoji: '⛳' },
    { value: 'event-planning', label: 'Event Planning', name: 'Event Planning', description: 'Event services', category: 'Entertainment & Hospitality', icon: '🎊', emoji: '🎊' },
    { value: 'photography-video', label: 'Photography & Video', name: 'Photography & Video', description: 'Media production', category: 'Entertainment & Hospitality', icon: '📷', emoji: '📷' },
    { value: 'music-nightlife', label: 'Music & Nightlife', name: 'Music & Nightlife', description: 'Night entertainment', category: 'Entertainment & Hospitality', icon: '🎵', emoji: '🎵' },
    { value: 'outdoor-adventure', label: 'Outdoor & Adventure', name: 'Outdoor & Adventure', description: 'Outdoor activities', category: 'Entertainment & Hospitality', icon: '🏔️', emoji: '🏔️' },

    // Construction & Real Estate
    { value: 'construction', label: 'Construction', name: 'Construction', description: 'Building services', category: 'Construction & Real Estate', icon: '🏗️', emoji: '🏗️', popular: true },
    { value: 'real-estate-dev', label: 'Real Estate Development', name: 'Real Estate Development', description: 'Property development', category: 'Construction & Real Estate', icon: '🏘️', emoji: '🏘️' },
    { value: 'property-management', label: 'Property Management', name: 'Property Management', description: 'Property services', category: 'Construction & Real Estate', icon: '🔑', emoji: '🔑' },
    { value: 'landscaping', label: 'Landscaping', name: 'Landscaping', description: 'Garden services', category: 'Construction & Real Estate', icon: '🌳', emoji: '🌳' },
    { value: 'roofing', label: 'Roofing Services', name: 'Roofing Services', description: 'Roof repair', category: 'Construction & Real Estate', icon: '🏠', emoji: '🏠' },
    { value: 'plumbing', label: 'Plumbing Services', name: 'Plumbing Services', description: 'Plumbing repair', category: 'Construction & Real Estate', icon: '🔧', emoji: '🔧' },
    { value: 'electrical', label: 'Electrical Services', name: 'Electrical Services', description: 'Electrical work', category: 'Construction & Real Estate', icon: '⚡', emoji: '⚡' },
    { value: 'hvac', label: 'HVAC Services', name: 'HVAC Services', description: 'Heating & cooling', category: 'Construction & Real Estate', icon: '❄️', emoji: '❄️' },
    { value: 'painting', label: 'Painting Services', name: 'Painting Services', description: 'House painting', category: 'Construction & Real Estate', icon: '🎨', emoji: '🎨' },
    { value: 'flooring', label: 'Flooring Services', name: 'Flooring Services', description: 'Floor installation', category: 'Construction & Real Estate', icon: '🪵', emoji: '🪵' },

    // Financial Services
    { value: 'banking', label: 'Banking Services', name: 'Banking Services', description: 'Financial institutions', category: 'Financial Services', icon: '🏦', emoji: '🏦' },
    { value: 'investment', label: 'Investment Advisory', name: 'Investment Advisory', description: 'Investment services', category: 'Financial Services', icon: '📈', emoji: '📈' },
    { value: 'mortgage', label: 'Mortgage & Lending', name: 'Mortgage & Lending', description: 'Lending services', category: 'Financial Services', icon: '🏠', emoji: '🏠' },
    { value: 'tax-services', label: 'Tax Services', name: 'Tax Services', description: 'Tax preparation', category: 'Financial Services', icon: '📋', emoji: '📋' },
    { value: 'payment-processing', label: 'Payment Processing', name: 'Payment Processing', description: 'Payment solutions', category: 'Financial Services', icon: '💳', emoji: '💳' },
    { value: 'crypto-trading', label: 'Crypto & Trading', name: 'Crypto & Trading', description: 'Cryptocurrency services', category: 'Financial Services', icon: '₿', emoji: '₿' },

    // Personal Services
    { value: 'cleaning-services', label: 'Cleaning Services', name: 'Cleaning Services', description: 'Cleaning businesses', category: 'Personal Services', icon: '🧽', emoji: '🧽', popular: true },
    { value: 'childcare', label: 'Childcare Services', name: 'Childcare Services', description: 'Child care', category: 'Personal Services', icon: '👶', emoji: '👶' },
    { value: 'elder-care', label: 'Elder Care', name: 'Elder Care', description: 'Senior care', category: 'Personal Services', icon: '👴', emoji: '👴' },
    { value: 'pet-services', label: 'Pet Services', name: 'Pet Services', description: 'Pet care', category: 'Personal Services', icon: '🐕', emoji: '🐕' },
    { value: 'laundry', label: 'Laundry Services', name: 'Laundry Services', description: 'Laundry businesses', category: 'Personal Services', icon: '👕', emoji: '👕' },
    { value: 'auto-services', label: 'Auto Services', name: 'Auto Services', description: 'Car services', category: 'Personal Services', icon: '🚗', emoji: '🚗' },

    // Energy & Environment
    { value: 'solar-energy', label: 'Solar Energy', name: 'Solar Energy', description: 'Solar installations', category: 'Energy & Environment', icon: '☀️', emoji: '☀️' },
    { value: 'waste-management', label: 'Waste Management', name: 'Waste Management', description: 'Waste services', category: 'Energy & Environment', icon: '♻️', emoji: '♻️' },
    { value: 'environmental', label: 'Environmental Services', name: 'Environmental Services', description: 'Environmental consulting', category: 'Energy & Environment', icon: '🌍', emoji: '🌍' },
    { value: 'water-treatment', label: 'Water Treatment', name: 'Water Treatment', description: 'Water services', category: 'Energy & Environment', icon: '💧', emoji: '💧' },

    // Other Industries
    { value: 'security', label: 'Security Services', name: 'Security Services', description: 'Security companies', category: 'Other Industries', icon: '🛡️', emoji: '🛡️' },
    { value: 'printing', label: 'Printing & Publishing', name: 'Printing & Publishing', description: 'Print services', category: 'Other Industries', icon: '📰', emoji: '📰' },
    { value: 'import-export', label: 'Import & Export', name: 'Import & Export', description: 'Trade businesses', category: 'Other Industries', icon: '🌐', emoji: '🌐' },
    { value: 'non-profit', label: 'Non-Profit', name: 'Non-Profit', description: 'Non-profit organizations', category: 'Other Industries', icon: '❤️', emoji: '❤️' },
    { value: 'franchise', label: 'Franchise Business', name: 'Franchise Business', description: 'Franchise operations', category: 'Other Industries', icon: '🏪', emoji: '🏪' },
    { value: 'other', label: 'Other', name: 'Other', description: 'Other business types', category: 'Other Industries', icon: '❓', emoji: '❓' },
  ];

  // Map category to business type
  const categoryToBusinessType: { [key: string]: string } = {
    'Technology & Software': 'technology',
    'Retail & E-commerce': 'retail',
    'Food & Beverage': 'food-beverage',
    'Professional Services': 'professional-services',
    'Healthcare': 'healthcare',
    'Entertainment & Hospitality': 'entertainment-hospitality',
    'Construction & Real Estate': 'construction',
    'Financial Services': 'financial-services',
    'Personal Services': 'personal-services',
    'Energy & Environment': 'energy-environment',
    'Other Industries': 'other',
  };

  const handleIndustrySelect = (industryValue: string) => {
    setSelectedIndustryValue(industryValue);
    
    // Auto-advance to next step after selecting industry
    setTimeout(() => {
      const selectedIndustry = allIndustries.find(ind => ind.value === industryValue);
      if (selectedIndustry) {
        const businessType = categoryToBusinessType[selectedIndustry.category];
        onSelect(businessType, industryValue);
      }
    }, 800); // Small delay to show selection feedback
  };

  const selectedIndustryData = allIndustries.find(industry => industry.value === selectedIndustryValue);

  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <div className="flex-shrink-0 text-center p-4 bg-white border-b">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Select your industry</h2>
        <p className="text-gray-600 text-sm">Choose the category that best describes your business</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="w-full max-w-6xl mx-auto space-y-6">
          {/* Popular Industries First */}
          {allIndustries.some(industry => industry.popular) && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 text-center mb-4">
                🔥 Most Popular
              </h4>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                {allIndustries
                  .filter(industry => industry.popular)
                  .map((industry) => (
                    <button
                      key={industry.value}
                      onClick={() => handleIndustrySelect(industry.value)}
                      className={`group relative p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                        selectedIndustryValue === industry.value
                          ? 'bg-blue-50 border-blue-500 shadow-lg ring-2 ring-blue-200'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      {/* Selection Indicator */}
                      {selectedIndustryValue === industry.value && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}

                      <div className="text-center">
                        <div className="text-xl mb-1">{industry.emoji}</div>
                        <h4 className={`font-medium text-xs leading-tight ${
                          selectedIndustryValue === industry.value ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {industry.name}
                        </h4>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* All Industries */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 text-center mb-4">
              📋 All Industries
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {allIndustries.map((industry) => (
                <button
                  key={industry.value}
                  onClick={() => handleIndustrySelect(industry.value)}
                  className={`group relative p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    selectedIndustryValue === industry.value
                      ? 'bg-blue-50 border-blue-500 shadow-lg ring-2 ring-blue-200'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {/* Selection Indicator */}
                  {selectedIndustryValue === industry.value && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  {/* Popular Indicator for duplicates */}
                  {industry.popular && selectedIndustryValue !== industry.value && (
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-xl mb-1">{industry.emoji}</div>
                    <h4 className={`font-medium text-xs leading-tight ${
                      selectedIndustryValue === industry.value ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {industry.name}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selection Legend */}
          {selectedIndustryValue && (
            <div className="flex justify-center mt-6 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Selected</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Industry Preview - Fixed Footer */}
      {selectedIndustryData && (
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50 border-t-2 border-blue-200 p-4 shadow-lg">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 text-blue-700 font-bold text-lg mb-3">
              <Target className="w-5 h-5" />
              <span>Perfect Choice!</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 mb-3">
              <span className="text-2xl">{selectedIndustryData.emoji}</span>
              <div className="text-left">
                <p className="text-gray-900 font-semibold text-base">{selectedIndustryData.name}</p>
                <p className="text-gray-600 text-xs">{selectedIndustryData.category}</p>
              </div>
            </div>
            
            <p className="text-blue-700 leading-relaxed max-w-2xl mx-auto text-sm">
              We'll connect you with buyers who specialize in {selectedIndustryData.name?.toLowerCase()} businesses and understand your industry's unique value.
            </p>
            
            {/* Auto-advancing indicator */}
            <div className="flex items-center justify-center space-x-2 text-blue-600 mt-4">
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span className="font-medium text-sm">Moving to next step...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessTypeAndIndustrySelector;