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

  // Unified list of all industries with their categories
  const allIndustries: UnifiedIndustry[] = [
    // Technology & Software
    { value: 'saas', label: 'SaaS Platforms', description: 'Software as a Service applications', category: 'Technology & Software', icon: '💻' },
    { value: 'mobile-apps', label: 'Mobile Applications', description: 'iOS, Android, cross-platform apps', category: 'Technology & Software', icon: '📱' },
    { value: 'ai-ml', label: 'AI & Machine Learning', description: 'Artificial intelligence solutions', category: 'Technology & Software', icon: '🤖' },
    { value: 'cybersecurity', label: 'Cybersecurity', description: 'Security solutions, data protection', category: 'Technology & Software', icon: '🔒' },
    { value: 'fintech', label: 'Financial Technology', description: 'Payment processing, digital banking', category: 'Technology & Software', icon: '💳' },
    { value: 'enterprise-software', label: 'Enterprise Software', description: 'B2B software solutions', category: 'Technology & Software', icon: '🏢' },
    { value: 'web-development', label: 'Web Development', description: 'Website development, web apps', category: 'Technology & Software', icon: '🌐' },
    { value: 'it-services', label: 'IT Services', description: 'Technical support, system administration', category: 'Technology & Software', icon: '⚙️' },
    
    // Retail & E-commerce  
    { value: 'fashion', label: 'Fashion & Apparel', description: 'Clothing, accessories, footwear', category: 'Retail & E-commerce', icon: '👗' },
    { value: 'electronics', label: 'Electronics & Tech', description: 'Consumer electronics, gadgets', category: 'Retail & E-commerce', icon: '⚡' },
    { value: 'home-garden', label: 'Home & Garden', description: 'Furniture, decor, home improvement', category: 'Retail & E-commerce', icon: '🏠' },
    { value: 'sports-recreation', label: 'Sports & Recreation', description: 'Sporting goods, outdoor equipment', category: 'Retail & E-commerce', icon: '🏃' },
    { value: 'luxury-goods', label: 'Luxury Goods', description: 'Premium brands, high-end products', category: 'Retail & E-commerce', icon: '💎' },
    { value: 'marketplace', label: 'Online Marketplace', description: 'Multi-vendor platforms', category: 'Retail & E-commerce', icon: '🛒' },
    { value: 'automotive-retail', label: 'Automotive Retail', description: 'Car dealerships, auto parts stores', category: 'Retail & E-commerce', icon: '🚙' },
    { value: 'jewelry', label: 'Jewelry & Watches', description: 'Fine jewelry, watch retail', category: 'Retail & E-commerce', icon: '💍' },
    { value: 'books-media', label: 'Books & Media', description: 'Bookstores, music, entertainment', category: 'Retail & E-commerce', icon: '📚' },
    { value: 'pet-supplies', label: 'Pet Supplies', description: 'Pet stores, animal products', category: 'Retail & E-commerce', icon: '🐾' },
    
    // Brick & Mortar Retail
    { value: 'grocery-stores', label: 'Grocery Stores', description: 'Supermarkets, convenience stores', category: 'Brick & Mortar', icon: '🛍️' },
    { value: 'hardware-stores', label: 'Hardware Stores', description: 'Building supplies, tools', category: 'Brick & Mortar', icon: '🔨' },
    { value: 'pharmacies', label: 'Pharmacies', description: 'Drug stores, medical supplies', category: 'Brick & Mortar', icon: '💊' },
    { value: 'gas-stations', label: 'Gas Stations', description: 'Fuel stations, convenience marts', category: 'Brick & Mortar', icon: '⛽' },
    { value: 'flower-shops', label: 'Flower Shops', description: 'Florists, plant nurseries', category: 'Brick & Mortar', icon: '🌸' },
    { value: 'bakeries', label: 'Bakeries', description: 'Bread shops, pastry stores', category: 'Brick & Mortar', icon: '🥖' },
    { value: 'beauty-salons', label: 'Beauty Salons', description: 'Hair salons, nail studios', category: 'Brick & Mortar', icon: '💄' },
    { value: 'dry-cleaners', label: 'Dry Cleaners', description: 'Laundry, cleaning services', category: 'Brick & Mortar', icon: '👔' },
    { value: 'repair-shops', label: 'Repair Shops', description: 'Electronics, appliance repair', category: 'Brick & Mortar', icon: '🔧' },
    { value: 'tobacco-shops', label: 'Tobacco Shops', description: 'Cigarettes, cigars, vaping', category: 'Brick & Mortar', icon: '🚬' },
    
    // Professional Services
    { value: 'consulting', label: 'Business Consulting', description: 'Strategy, management, operations', category: 'Professional Services', icon: '💼' },
    { value: 'marketing', label: 'Marketing & Advertising', description: 'Digital marketing, branding, PR', category: 'Professional Services', icon: '📣' },
    { value: 'legal', label: 'Legal Services', description: 'Law firms, legal advice', category: 'Professional Services', icon: '⚖️' },
    { value: 'accounting', label: 'Accounting & Finance', description: 'Bookkeeping, tax services', category: 'Professional Services', icon: '📊' },
    { value: 'design', label: 'Design & Creative', description: 'Graphic design, web design, branding', category: 'Professional Services', icon: '🎨' },
    { value: 'hr-services', label: 'HR & Recruitment', description: 'Human resources, talent acquisition', category: 'Professional Services', icon: '👥' },
    { value: 'real-estate', label: 'Real Estate', description: 'Property sales, rental management', category: 'Professional Services', icon: '🏘️' },
    { value: 'insurance', label: 'Insurance', description: 'Insurance brokers, agencies', category: 'Professional Services', icon: '🛡️' },
    { value: 'translation', label: 'Translation Services', description: 'Language services, localization', category: 'Professional Services', icon: '🌍' },
    { value: 'photography', label: 'Photography', description: 'Wedding, commercial, portrait photography', category: 'Professional Services', icon: '📸' },
    
    // Healthcare & Medical
    { value: 'medical-practice', label: 'Medical Practices', description: 'Clinics, specialists, family medicine', category: 'Healthcare & Medical', icon: '🏥' },
    { value: 'health-tech', label: 'Health Technology', description: 'Digital health, telemedicine', category: 'Healthcare & Medical', icon: '💊' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals', description: 'Drug development, medical supplies', category: 'Healthcare & Medical', icon: '💉' },
    { value: 'medical-devices', label: 'Medical Devices', description: 'Healthcare equipment, diagnostics', category: 'Healthcare & Medical', icon: '🩺' },
    { value: 'wellness', label: 'Wellness & Fitness', description: 'Fitness centers, wellness coaching', category: 'Healthcare & Medical', icon: '🧘' },
    { value: 'biotechnology', label: 'Biotechnology', description: 'Biotech research, life sciences', category: 'Healthcare & Medical', icon: '🧬' },
    { value: 'dental-practices', label: 'Dental Practices', description: 'Dental clinics, orthodontics', category: 'Healthcare & Medical', icon: '🦷' },
    { value: 'veterinary', label: 'Veterinary Services', description: 'Animal hospitals, vet clinics', category: 'Healthcare & Medical', icon: '🐕‍🦺' },
    { value: 'optometry', label: 'Optometry', description: 'Eye care, vision centers', category: 'Healthcare & Medical', icon: '👓' },
    
    // Food & Beverage
    { value: 'restaurants', label: 'Restaurants & Cafes', description: 'Dining establishments, quick service', category: 'Food & Beverage', icon: '🍽️' },
    { value: 'food-production', label: 'Food Production', description: 'Food manufacturing, processing', category: 'Food & Beverage', icon: '🏭' },
    { value: 'catering', label: 'Catering Services', description: 'Event catering, corporate dining', category: 'Food & Beverage', icon: '🎉' },
    { value: 'beverages', label: 'Beverages', description: 'Alcoholic and non-alcoholic drinks', category: 'Food & Beverage', icon: '🥤' },
    { value: 'food-delivery', label: 'Food Delivery', description: 'Meal delivery, food logistics', category: 'Food & Beverage', icon: '🚚' },
    { value: 'agriculture', label: 'Agriculture & Farming', description: 'Farming, agricultural products', category: 'Food & Beverage', icon: '🌾' },
    { value: 'bars-pubs', label: 'Bars & Pubs', description: 'Drinking establishments, nightlife', category: 'Food & Beverage', icon: '🍺' },
    { value: 'food-trucks', label: 'Food Trucks', description: 'Mobile food service', category: 'Food & Beverage', icon: '🚛' },
    { value: 'ice-cream', label: 'Ice Cream Shops', description: 'Gelato, frozen treats', category: 'Food & Beverage', icon: '🍦' },
    
    // Manufacturing
    { value: 'automotive', label: 'Automotive', description: 'Auto parts, vehicle manufacturing', category: 'Manufacturing', icon: '🚗' },
    { value: 'machinery', label: 'Industrial Machinery', description: 'Equipment, heavy machinery', category: 'Manufacturing', icon: '⚙️' },
    { value: 'chemicals', label: 'Chemicals', description: 'Chemical production, materials', category: 'Manufacturing', icon: '🧪' },
    { value: 'aerospace', label: 'Aerospace', description: 'Aircraft, space technology', category: 'Manufacturing', icon: '✈️' },
    { value: 'textiles', label: 'Textiles', description: 'Fabric production, clothing manufacturing', category: 'Manufacturing', icon: '🧵' },
    { value: 'packaging', label: 'Packaging', description: 'Packaging materials, containers', category: 'Manufacturing', icon: '📦' },
    { value: 'furniture', label: 'Furniture Manufacturing', description: 'Furniture production, woodworking', category: 'Manufacturing', icon: '🪑' },
    { value: 'electronics-mfg', label: 'Electronics Manufacturing', description: 'Electronic components, devices', category: 'Manufacturing', icon: '🔌' },
    { value: 'metal-fabrication', label: 'Metal Fabrication', description: 'Metalworking, steel production', category: 'Manufacturing', icon: '🔩' },
    
    // Education & Training
    { value: 'schools', label: 'Schools & Education', description: 'Private schools, training centers', category: 'Education & Training', icon: '🎓' },
    { value: 'language-schools', label: 'Language Schools', description: 'Language learning, ESL', category: 'Education & Training', icon: '🗣️' },
    { value: 'vocational-training', label: 'Vocational Training', description: 'Trade schools, skills training', category: 'Education & Training', icon: '🛠️' },
    { value: 'tutoring', label: 'Tutoring Services', description: 'Academic tutoring, test prep', category: 'Education & Training', icon: '📝' },
    { value: 'driving-schools', label: 'Driving Schools', description: 'Driver education, traffic schools', category: 'Education & Training', icon: '🚗' },
    
    // Transportation & Logistics
    { value: 'trucking', label: 'Trucking & Freight', description: 'Freight transport, logistics', category: 'Transportation & Logistics', icon: '🚛' },
    { value: 'taxi-rideshare', label: 'Taxi & Rideshare', description: 'Transportation services', category: 'Transportation & Logistics', icon: '🚕' },
    { value: 'moving-storage', label: 'Moving & Storage', description: 'Relocation, warehousing', category: 'Transportation & Logistics', icon: '📦' },
    { value: 'courier-delivery', label: 'Courier & Delivery', description: 'Package delivery, mail services', category: 'Transportation & Logistics', icon: '📮' },
    { value: 'car-rental', label: 'Car Rental', description: 'Vehicle rental services', category: 'Transportation & Logistics', icon: '🚙' },
    
    // Entertainment & Recreation
    { value: 'gyms-fitness', label: 'Gyms & Fitness Centers', description: 'Health clubs, personal training', category: 'Entertainment & Recreation', icon: '🏋️' },
    { value: 'entertainment-venues', label: 'Entertainment Venues', description: 'Theaters, event spaces', category: 'Entertainment & Recreation', icon: '🎭' },
    { value: 'gaming-arcades', label: 'Gaming & Arcades', description: 'Game centers, entertainment', category: 'Entertainment & Recreation', icon: '🎮' },
    { value: 'travel-tourism', label: 'Travel & Tourism', description: 'Travel agencies, tour operators', category: 'Entertainment & Recreation', icon: '✈️' },
    { value: 'hotels-lodging', label: 'Hotels & Lodging', description: 'Hotels, B&Bs, hostels', category: 'Entertainment & Recreation', icon: '🏨' }
  ];

  const handleIndustrySelect = (industryValue: string) => {
    setSelectedIndustryValue(industryValue);
  };

  const handleContinue = () => {
    if (selectedIndustryValue) {
      const selectedIndustry = allIndustries.find(ind => ind.value === selectedIndustryValue);
      if (selectedIndustry) {
        // Map category to business type value
        const categoryToBusinessType: { [key: string]: string } = {
          'Technology & Software': 'technology',
          'Retail & E-commerce': 'retail',
          'Brick & Mortar': 'retail',
          'Professional Services': 'service',
          'Healthcare & Medical': 'healthcare',
          'Food & Beverage': 'food-beverage',
          'Manufacturing': 'manufacturing',
          'Education & Training': 'service',
          'Transportation & Logistics': 'service',
          'Entertainment & Recreation': 'service',
        };
        const businessType = categoryToBusinessType[selectedIndustry.category];
        onSelect(businessType, selectedIndustryValue);
      }
    }
  };

  const selectedIndustryData = allIndustries.find(ind => ind.value === selectedIndustryValue);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What type of business are you selling?
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Choose the industry that best describes your business. We'll connect you with buyers who specialize in your sector.
          </p>
        </div>

        {/* Industry Grid - Clean and spacious */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Select your industry
          </h3>
          
          {/* Clean Industry Grid - Full space utilization */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {allIndustries.map((industry) => (
              <button
                key={industry.value}
                onClick={() => handleIndustrySelect(industry.value)}
                className={`group relative p-6 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                  selectedIndustryValue === industry.value
                    ? 'bg-blue-50 border-blue-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Selected indicator */}
                {selectedIndustryValue === industry.value && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                )}
                

                
                {/* Content */}
                <div className="text-center">
                  <div className="text-3xl mb-3">{industry.icon}</div>
                  <h4 className={`font-medium text-sm leading-tight ${
                    selectedIndustryValue === industry.value ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {industry.label}
                  </h4>
                </div>
              </button>
            ))}
          </div>
          
          {/* Category legend */}
          <div className="flex justify-center mt-8 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Selected</span>
            </div>
          </div>
        </div>

        {/* Selection Summary & Continue Button */}
        {selectedIndustryData && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 animate-in slide-in-from-bottom-4 duration-500 sticky bottom-0 z-10 shadow-lg">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-blue-700 font-bold text-xl mb-4">
                <Target className="w-6 h-6" />
                <span>Perfect Choice!</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-3xl">{selectedIndustryData.icon}</span>
                <div className="text-left">
                  <p className="text-gray-900 font-semibold text-lg">
                    {selectedIndustryData.label}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedIndustryData.category}
                  </p>
                </div>
              </div>
              
              <p className="text-blue-700 leading-relaxed max-w-3xl mx-auto">
                We'll connect you with buyers who specialize in {selectedIndustryData.label.toLowerCase()} 
                businesses and understand your industry's unique value.
              </p>
              
              <Button
                color="primary"
                size="lg"
                onPress={handleContinue}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-6"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Continue to Next Step
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessTypeAndIndustrySelector;
