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
    features: ['Browse verified listings', 'Connect with sellers', 'Get market insights', 'Due diligence support']
  };

  const sellerCard = {
    intent: 'seller' as UserIntent,
    icon: Building2,
    title: 'I want to sell my business', 
    description: 'Get your business in front of qualified buyers and maximize value',
    features: ['Professional listings', 'Buyer matching', 'Valuation tools', 'Transaction support']
  };

  const cards = [buyerCard, sellerCard];

  // If we have high confidence, show the detected intent first and make it recommended
  const sortedCards = isHighConfidence && detectedIntent !== 'neutral' 
    ? cards.sort((a, b) => a.intent === detectedIntent ? -1 : 1)
    : cards;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Choose your path</h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          {isHighConfidence && detectedIntent !== 'neutral' ? (
            <span>
              We detected you might be interested in{' '}
              <span className="font-medium text-black">
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
      <div className="grid md:grid-cols-2 gap-6">
        {sortedCards.map((card) => {
          const Icon = card.icon;
          const isRecommended = isHighConfidence && card.intent === detectedIntent;
          
          return (
            <div
              key={card.intent}
              onClick={() => onSelect(card.intent)}
              className={`
                relative p-6 bg-white border border-gray-200 rounded-xl cursor-pointer
                transition-all duration-200 hover:shadow-sm hover:border-gray-300
                ${isRecommended ? 'ring-2 ring-gray-900 ring-offset-1 shadow-sm' : ''}
              `}
            >
              {isRecommended && (
                <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  Recommended
                </div>
              )}
              
              <div className="space-y-6">
                {/* Icon and Title */}
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 rounded-xl bg-gray-50 text-gray-700">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-black">What you'll get:</h4>
                  <ul className="space-y-2">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  className="
                    w-full py-2.5 px-4 bg-gray-900 text-white font-medium rounded-lg 
                    hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center
                    text-sm
                  "
                  type="button"
                >
                  {card.intent === 'buyer' ? 'Continue as Buyer' : 'Continue as Seller'}
                  {isRecommended && <Target className="w-4 h-4 ml-2" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alternative Options */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-sm text-gray-500 px-4">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>
        
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">
            Not sure yet or interested in both?
          </p>
          <button
            onClick={() => onSelect('neutral')}
            className="text-gray-600 hover:text-gray-900 font-medium hover:underline focus:outline-none focus:underline text-sm"
          >
            I'll decide later
          </button>
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
