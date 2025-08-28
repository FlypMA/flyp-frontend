import React from 'react';
import { Building2, Users, Zap, Target, Heart, Star, Package, Briefcase } from 'lucide-react';

interface BusinessType {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  examples: string[];
  color: string;
  gradient: string;
}

interface BusinessTypeSelectorProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({ 
  selectedValue, 
  onSelect 
}) => {
  const businessTypes: BusinessType[] = [
    {
      value: 'retail',
      label: 'Retail Business',
      description: 'Physical or online stores selling products directly to customers',
      icon: Building2,
      examples: ['Boutiques', 'Specialty stores', 'Franchises', 'E-commerce'],
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      value: 'service',
      label: 'Service Business',
      description: 'Professional services and consultancy focused businesses',
      icon: Users,
      examples: ['Consulting', 'Agencies', 'Professional services', 'B2B services'],
      color: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
    },
    {
      value: 'manufacturing',
      label: 'Manufacturing',
      description: 'Production and industrial businesses creating physical products',
      icon: Package,
      examples: ['Production facilities', 'Industrial equipment', 'Assembly', 'Processing'],
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      value: 'technology',
      label: 'Technology',
      description: 'Software, SaaS, and technology-driven businesses',
      icon: Target,
      examples: ['SaaS platforms', 'Software development', 'Tech startups', 'Digital products'],
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      value: 'restaurant',
      label: 'Restaurant/Food',
      description: 'Food service and hospitality businesses',
      icon: Heart,
      examples: ['Restaurants', 'Cafes', 'Catering', 'Food delivery'],
      color: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
    },
    {
      value: 'professional',
      label: 'Professional Services',
      description: 'Licensed professional practices and specialized services',
      icon: Briefcase,
      examples: ['Legal firms', 'Accounting', 'Medical practices', 'Real estate'],
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-indigo-600',
    },
    {
      value: 'creative',
      label: 'Creative & Media',
      description: 'Creative industries and media production businesses',
      icon: Zap,
      examples: ['Design studios', 'Marketing agencies', 'Media production', 'Entertainment'],
      color: 'text-pink-600',
      gradient: 'from-pink-500 to-pink-600',
    },
    {
      value: 'other',
      label: 'Other',
      description: 'Unique or specialized business model not listed above',
      icon: Star,
      examples: ['Unique models', 'Hybrid businesses', 'Specialized niches', 'Other categories'],
      color: 'text-gray-600',
      gradient: 'from-gray-500 to-gray-600',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header with distinctive design */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
          <Building2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What type of business are you selling?
        </h2>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
          This helps us understand your business model and attract the right buyers who specialize in your type of business.
        </p>
      </div>

      {/* Business Type Cards - Visual Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessTypes.map((type) => {
          const IconComponent = type.icon;
          const isSelected = selectedValue === type.value;
          
          return (
            <button
              key={type.value}
              onClick={() => onSelect(type.value)}
              className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.05] text-left relative overflow-hidden ${
                isSelected
                  ? `bg-gradient-to-br from-white to-gray-50 border-transparent shadow-2xl ring-4 ${type.color.replace('text-', 'ring-')}/20`
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-lg'
              }`}
            >
              {/* Background Gradient Overlay for Selected */}
              {isSelected && (
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-5 rounded-2xl`} />
              )}
              
              {/* Icon Section */}
              <div className="relative z-10 mb-4">
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
                  isSelected 
                    ? `bg-gradient-to-br ${type.gradient} shadow-lg` 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <IconComponent className={`w-8 h-8 transition-colors duration-300 ${
                    isSelected ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`} />
                </div>
              </div>

              {/* Content Section */}
              <div className="relative z-10 space-y-3">
                <h3 className={`font-bold text-xl transition-colors duration-300 ${
                  isSelected ? type.color : 'text-gray-900 group-hover:text-gray-700'
                }`}>
                  {type.label}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {type.description}
                </p>

                {/* Examples */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1">
                    {type.examples.slice(0, 2).map((example, index) => (
                      <span 
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                          isSelected 
                            ? `${type.color.replace('text-', 'bg-')}/10 ${type.color} font-medium`
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {example}
                      </span>
                    ))}
                    {type.examples.length > 2 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isSelected 
                          ? `${type.color.replace('text-', 'bg-')}/10 ${type.color}` 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{type.examples.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="flex justify-end pt-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? `${type.color.replace('text-', 'border-')} bg-gradient-to-br ${type.gradient}` 
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Additional Context */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mt-12">
        <div className="text-center">
          <div className="text-blue-700 font-bold text-lg mb-2">🎯 Why Business Type Matters</div>
          <p className="text-blue-700 leading-relaxed max-w-4xl mx-auto">
            Different business types attract different kinds of buyers. Retail businesses appeal to entrepreneurs, 
            while technology companies often interest strategic acquirers and investors. Selecting the right type 
            helps us show your listing to buyers who understand and value your specific business model.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeSelector;
