import React from 'react';
import { Card, CardBody, Button, Badge } from '@heroui/react';
import { Search, Building2, TrendingUp, Users, Euro, Target } from 'lucide-react';
import { UserIntent } from '../../utils/contextDetection';

interface RoleSelectionCardsProps {
  onSelect: (role: UserIntent) => void;
  detectedIntent?: UserIntent;
  confidence?: 'high' | 'medium' | 'low';
  className?: string;
}

const RoleSelectionCards: React.FC<RoleSelectionCardsProps> = ({
  onSelect,
  detectedIntent,
  confidence,
  className = ''
}) => {
  const isHighConfidence = confidence === 'high';
  
  const buyerCard = {
    intent: 'buyer' as UserIntent,
    icon: Search,
    title: 'I want to buy a business',
    description: 'Explore opportunities and find the perfect business to acquire',
    features: ['Browse verified listings', 'Connect with sellers', 'Get market insights', 'Due diligence support'],
    color: 'blue',
    bgGradient: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverColor: 'hover:border-blue-400'
  };

  const sellerCard = {
    intent: 'seller' as UserIntent,
    icon: Building2,
    title: 'I want to sell my business',
    description: 'Get your business in front of qualified buyers and maximize value',
    features: ['Professional listings', 'Buyer matching', 'Valuation tools', 'Transaction support'],
    color: 'green',
    bgGradient: 'from-green-50 to-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
    hoverColor: 'hover:border-green-400'
  };

  const cards = [buyerCard, sellerCard];

  // If we have high confidence, show the detected intent first and make it recommended
  const sortedCards = isHighConfidence && detectedIntent !== 'neutral' 
    ? cards.sort((a, b) => a.intent === detectedIntent ? -1 : 1)
    : cards;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Choose your path</h2>
        <p className="text-gray-600">
          {isHighConfidence && detectedIntent !== 'neutral' ? (
            <span>
              We detected you might be interested in{' '}
              <span className="font-semibold">
                {detectedIntent === 'buyer' ? 'buying' : 'selling'}
              </span>{' '}
              a business. Is this correct?
            </span>
          ) : (
            'Select what best describes your current interest to get started.'
          )}
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {sortedCards.map((card) => {
          const Icon = card.icon;
          const isRecommended = isHighConfidence && card.intent === detectedIntent;
          
          return (
            <Card
              key={card.intent}
              isPressable
              onPress={() => onSelect(card.intent)}
              className={`
                relative p-2 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]
                ${card.borderColor} ${card.hoverColor} border-2
                ${isRecommended ? 'ring-2 ring-offset-2 ring-blue-400 shadow-lg' : 'hover:shadow-lg'}
                bg-gradient-to-br ${card.bgGradient} hover:to-white
              `}
            >
              {isRecommended && (
                <Badge
                  color="primary"
                  className="absolute -top-2 -right-2 z-10 bg-blue-500 text-white text-xs font-semibold"
                >
                  Recommended
                </Badge>
              )}
              
              <CardBody className="p-6 space-y-4">
                {/* Icon and Title */}
                <div className="text-center space-y-4">
                  <div className={`inline-flex p-4 rounded-full bg-white shadow-sm ${card.iconColor}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-800">What you'll get:</h4>
                  <ul className="space-y-2">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${card.iconColor.replace('text-', 'bg-')} mr-3 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  className={`
                    w-full font-semibold transition-all duration-200 
                    ${card.color === 'blue' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                    }
                    ${isRecommended ? 'shadow-md hover:shadow-lg' : ''}
                  `}
                  size="lg"
                >
                  {card.intent === 'buyer' ? 'Start Buying' : 'Start Selling'}
                  {isRecommended && <Target className="w-4 h-4 ml-2" />}
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Alternative Options */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500 px-3">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Not sure yet or interested in both?
          </p>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 font-medium"
            onPress={() => onSelect('neutral')}
          >
            I'll decide later
          </Button>
        </div>
      </div>

      {/* Confidence Indicator (Development) */}
      {process.env.NODE_ENV === 'development' && detectedIntent && (
        <div className="text-center">
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            Detected: {detectedIntent} ({confidence} confidence)
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelectionCards;
