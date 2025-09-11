import React from 'react';
import { Search, Building2 } from 'lucide-react';
// import { UserIntent } from '../../utils/contextDetection'; // TODO: Fix import
type UserIntent = 'buyer' | 'seller' | 'neutral';

interface RoleSelectionCardsProps {
  onSelect: (role: UserIntent) => void;
  detectedIntent?: UserIntent;
  confidence?: 'high' | 'medium' | 'low';
  className?: string;
}

const RoleSelectionCards: React.FC<RoleSelectionCardsProps> = ({
  onSelect,
  detectedIntent: _detectedIntent,
  confidence: _confidence,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-left space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Choose your path</h2>
        <p className="text-gray-500 text-sm">What best describes your interest?</p>
      </div>

      {/* Role Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => onSelect('buyer')}
          className="
            w-full p-4 text-left border border-gray-200 rounded-lg 
            hover:border-gray-300 hover:bg-gray-50 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
          "
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">I want to buy a business</h3>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('seller')}
          className="
            w-full p-4 text-left border border-gray-200 rounded-lg 
            hover:border-gray-300 hover:bg-gray-50 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
          "
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">I want to sell my business</h3>
            </div>
          </div>
        </button>
      </div>

      {/* Skip Option */}
      <div className="text-left pt-2">
        <button
          onClick={() => onSelect('neutral')}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium hover:underline focus:outline-none focus:underline"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionCards;
