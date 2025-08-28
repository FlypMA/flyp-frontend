import React from 'react';
import { TrendingUp, Target, Handshake, Zap, Award } from 'lucide-react';

interface PriceOption {
  value: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  strategy: string;
  pros: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
}

interface PriceExpectationsSelectorProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const PriceExpectationsSelector: React.FC<PriceExpectationsSelectorProps> = ({ 
  selectedValue, 
  onSelect 
}) => {
  const priceOptions: PriceOption[] = [
    {
      value: 'market-value',
      title: 'Market value assessment',
      subtitle: 'Professional valuation approach',
      description: 'Based on comprehensive financial analysis and market comparables',
      icon: Award,
      strategy: 'Data-driven pricing',
      pros: ['Higher credibility', 'Faster buyer trust', 'Professional approach'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      value: 'flexible',
      title: 'Open to offers',
      subtitle: 'Negotiation-friendly',
      description: 'Flexible approach allows for market discovery and competitive bidding',
      icon: Handshake,
      strategy: 'Market-driven pricing',
      pros: ['Wider buyer pool', 'Price discovery', 'Competitive offers'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      gradient: 'from-green-500 to-green-600',
    },
    {
      value: 'premium',
      title: 'Premium pricing',
      subtitle: 'Above market value',
      description: 'Targeting buyers who value unique assets and growth potential',
      icon: Target,
      strategy: 'Value-premium approach',
      pros: ['Higher returns', 'Selective buyers', 'Quality focused'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      value: 'quick-sale',
      title: 'Quick sale pricing',
      subtitle: 'Competitive for speed',
      description: 'Priced to attract immediate interest and accelerate the sale process',
      icon: Zap,
      strategy: 'Speed-optimized pricing',
      pros: ['Fast sale', 'Multiple offers', 'Quick liquidity'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      gradient: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl">
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What are your price expectations?
        </h2>
        <p className="text-gray-600 text-lg">
          Your pricing strategy helps us match you with the right buyers and set proper expectations.
        </p>
      </div>

      {/* Price Strategy Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {priceOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedValue === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] text-left ${
                isSelected
                  ? `${option.bgColor} ${option.borderColor} shadow-xl ring-2 ring-offset-2 ${option.color.replace('text-', 'ring-')}`
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                    isSelected ? option.bgColor : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isSelected ? option.color : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className={`font-bold text-lg ${
                      isSelected ? option.color : 'text-gray-900'
                    }`}>
                      {option.title}
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">{option.subtitle}</p>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected 
                    ? `${option.borderColor} ${option.bgColor}` 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <div className={`w-3 h-3 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {option.description}
              </p>

              {/* Strategy Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  isSelected 
                    ? `${option.bgColor} ${option.color}` 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.strategy}
                </span>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800">Key Benefits:</h4>
                <div className="space-y-1">
                  {option.pros.map((pro, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? option.color.replace('text-', 'bg-') : 'bg-gray-400'
                      }`} />
                      <span className="text-sm text-gray-700">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selection Highlight */}
              {isSelected && (
                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${option.gradient}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Helpful Context */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="text-center">
          <div className="text-amber-600 font-medium mb-2">💰 Pricing Strategy Impact</div>
          <p className="text-amber-700 text-sm leading-relaxed">
            <strong>Market value</strong> builds trust with buyers. <strong>Flexible pricing</strong> maximizes interest. 
            <strong>Premium pricing</strong> targets strategic buyers. <strong>Quick sale</strong> prioritizes speed over price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceExpectationsSelector;
