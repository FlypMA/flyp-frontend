import React, { useState } from 'react';
import { Search, TrendingUp, MapPin } from 'lucide-react';

interface Industry {
  value: string;
  label: string;
  description: string;
  subcategories: string[];
  marketSize: string;
  growth: 'high' | 'medium' | 'stable';
  hotness: number; // 1-5 scale
}

interface IndustrySelectorProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ 
  selectedValue, 
  onSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const industries: Industry[] = [
    {
      value: 'technology',
      label: 'Technology & Software',
      description: 'Software development, SaaS, AI, cybersecurity, and tech services',
      subcategories: ['SaaS', 'Mobile Apps', 'Enterprise Software', 'AI/ML', 'Cybersecurity', 'Fintech'],
      marketSize: '€2.8T globally',
      growth: 'high',
      hotness: 5,
    },
    {
      value: 'healthcare',
      label: 'Healthcare & Medical',
      description: 'Medical services, pharmaceuticals, medical devices, and health tech',
      subcategories: ['Medical Practices', 'Pharmaceuticals', 'Medical Devices', 'Health Tech', 'Biotechnology'],
      marketSize: '€1.5T globally',
      growth: 'high',
      hotness: 4,
    },
    {
      value: 'finance',
      label: 'Financial Services',
      description: 'Banking, insurance, investment, accounting, and financial technology',
      subcategories: ['Banking', 'Insurance', 'Investment', 'Accounting', 'Wealth Management', 'Payment Processing'],
      marketSize: '€1.2T globally',
      growth: 'medium',
      hotness: 4,
    },
    {
      value: 'retail',
      label: 'Retail & E-commerce',
      description: 'Online and offline retail, consumer goods, fashion, and marketplace businesses',
      subcategories: ['Fashion', 'Electronics', 'Home & Garden', 'Sports & Recreation', 'Luxury Goods'],
      marketSize: '€900B globally',
      growth: 'medium',
      hotness: 3,
    },
    {
      value: 'manufacturing',
      label: 'Manufacturing',
      description: 'Industrial production, automotive, aerospace, chemicals, and materials',
      subcategories: ['Automotive', 'Aerospace', 'Chemicals', 'Machinery', 'Textiles', 'Electronics'],
      marketSize: '€800B in EU',
      growth: 'stable',
      hotness: 3,
    },
    {
      value: 'food-beverage',
      label: 'Food & Beverage',
      description: 'Restaurants, food production, beverages, catering, and food technology',
      subcategories: ['Restaurants', 'Food Production', 'Beverages', 'Catering', 'Food Tech', 'Agriculture'],
      marketSize: '€650B in EU',
      growth: 'stable',
      hotness: 2,
    },
    {
      value: 'professional-services',
      label: 'Professional Services',
      description: 'Legal, consulting, accounting, marketing, and business services',
      subcategories: ['Legal Services', 'Management Consulting', 'Marketing', 'HR Services', 'Architecture'],
      marketSize: '€400B in EU',
      growth: 'medium',
      hotness: 3,
    },
    {
      value: 'construction',
      label: 'Construction & Real Estate',
      description: 'Construction, real estate development, property management, and architecture',
      subcategories: ['Residential Construction', 'Commercial Development', 'Property Management', 'Architecture'],
      marketSize: '€350B in EU',
      growth: 'medium',
      hotness: 3,
    },
    {
      value: 'transportation',
      label: 'Transportation & Logistics',
      description: 'Shipping, logistics, transportation services, and supply chain management',
      subcategories: ['Logistics', 'Freight', 'Last-mile Delivery', 'Supply Chain', 'Warehousing'],
      marketSize: '€300B in EU',
      growth: 'high',
      hotness: 4,
    },
    {
      value: 'education',
      label: 'Education & Training',
      description: 'Educational institutions, training services, e-learning, and EdTech',
      subcategories: ['Higher Education', 'Vocational Training', 'E-learning', 'Corporate Training'],
      marketSize: '€250B in EU',
      growth: 'high',
      hotness: 4,
    },
    {
      value: 'real-estate',
      label: 'Real Estate',
      description: 'Property development, real estate services, and property management',
      subcategories: ['Residential', 'Commercial', 'Industrial', 'Property Management', 'Real Estate Tech'],
      marketSize: '€200B in EU',
      growth: 'medium',
      hotness: 3,
    },
    {
      value: 'other',
      label: 'Other Industries',
      description: 'Specialized or unique industry not listed above',
      subcategories: ['Agriculture', 'Mining', 'Utilities', 'Entertainment', 'Non-profit', 'Government'],
      marketSize: 'Varies',
      growth: 'stable',
      hotness: 2,
    },
  ];

  const filteredIndustries = industries.filter(industry =>
    industry.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getGrowthBadge = (growth: Industry['growth']) => {
    const styles = {
      high: 'bg-green-100 text-green-700 border border-green-200',
      medium: 'bg-blue-100 text-blue-700 border border-blue-200',
      stable: 'bg-gray-100 text-gray-700 border border-gray-200',
    };
    const labels = { high: 'High Growth', medium: 'Moderate Growth', stable: 'Stable' };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-md ${styles[growth]}`}>
        <TrendingUp className="w-3 h-3 mr-1" />
        {labels[growth]}
      </span>
    );
  };

  const getHotnessStars = (hotness: number) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < hotness ? 'bg-yellow-400' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header - Directory Style */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-2xl">
          <MapPin className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Which industry best describes your business?
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Select your primary industry sector to help buyers understand your market position and growth potential.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search industries or sectors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none text-gray-900 placeholder-gray-500 text-lg transition-all duration-200"
        />
      </div>

      {/* Industries List - Directory/Table Style */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-4">Industry</div>
          <div className="col-span-3">Market Info</div>
          <div className="col-span-3">Specializations</div>
          <div className="col-span-2 text-center">Growth & Interest</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredIndustries.map((industry, index) => {
            const isSelected = selectedValue === industry.value;
            
            return (
              <button
                key={industry.value}
                onClick={() => onSelect(industry.value)}
                className={`w-full grid grid-cols-12 gap-4 p-6 text-left transition-all duration-200 hover:bg-gray-50 ${
                  isSelected ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''
                }`}
              >
                {/* Industry Name & Description */}
                <div className="col-span-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                      isSelected ? 'bg-emerald-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <h3 className={`font-semibold text-lg mb-1 ${
                        isSelected ? 'text-emerald-700' : 'text-gray-900'
                      }`}>
                        {industry.label}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Market Info */}
                <div className="col-span-3 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Market Size:</span>
                    <span className="ml-2 font-medium text-gray-900">{industry.marketSize}</span>
                  </div>
                  {getGrowthBadge(industry.growth)}
                </div>

                {/* Subcategories */}
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-1">
                    {industry.subcategories.slice(0, 3).map((sub, subIndex) => (
                      <span 
                        key={subIndex}
                        className={`inline-block px-2 py-1 text-xs rounded-md ${
                          isSelected 
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {sub}
                      </span>
                    ))}
                    {industry.subcategories.length > 3 && (
                      <span className={`inline-block px-2 py-1 text-xs rounded-md ${
                        isSelected 
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{industry.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Growth & Hotness */}
                <div className="col-span-2 text-center space-y-2">
                  {getHotnessStars(industry.hotness)}
                  <div className="text-xs text-gray-500">Buyer Interest</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Industry Details */}
      {selectedValue && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-emerald-700 font-bold text-lg mb-2">
              🎯 Selected: {industries.find(i => i.value === selectedValue)?.label}
            </div>
            <p className="text-emerald-700 leading-relaxed max-w-3xl mx-auto">
              You've selected the {industries.find(i => i.value === selectedValue)?.label.toLowerCase()} industry. 
              This helps us connect you with buyers who understand your market dynamics and have experience 
              in your sector.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustrySelector;

