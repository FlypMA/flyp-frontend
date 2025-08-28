import React from 'react';
import { Clock, Zap, Calendar, Hourglass, Compass } from 'lucide-react';

interface TimelineOption {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  urgency: 'high' | 'medium' | 'low' | 'flexible';
  timeframe: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface TimelineSelectorProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ selectedValue, onSelect }) => {
  const timelineOptions: TimelineOption[] = [
    {
      value: 'immediately',
      label: 'As soon as possible',
      description: 'Ready to close quickly',
      icon: Zap,
      urgency: 'high',
      timeframe: '1-3 months',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      value: '3-months',
      label: 'Within 3 months',
      description: 'Flexible on timing',
      icon: Calendar,
      urgency: 'medium',
      timeframe: '2-4 months',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      value: '6-months',
      label: 'Within 6 months',
      description: 'Standard timeline',
      icon: Clock,
      urgency: 'medium',
      timeframe: '3-6 months',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      value: '12-months',
      label: 'Within 12 months',
      description: 'Patient approach',
      icon: Hourglass,
      urgency: 'low',
      timeframe: '6-12 months',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      value: 'flexible',
      label: 'Very flexible',
      description: 'Waiting for right buyer',
      icon: Compass,
      urgency: 'flexible',
      timeframe: '12+ months',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  const getUrgencyBadge = (urgency: TimelineOption['urgency']) => {
    const badges = {
      high: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
      medium: { label: 'Standard', color: 'bg-blue-100 text-blue-700' },
      low: { label: 'Patient', color: 'bg-green-100 text-green-700' },
      flexible: { label: 'Flexible', color: 'bg-purple-100 text-purple-700' },
    };
    
    const badge = badges[urgency];
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What's your ideal timeline for selling?
        </h2>
        <p className="text-gray-600 text-lg">
          This helps us prioritize your listing and match you with buyers who align with your timeline.
        </p>
      </div>

      {/* Timeline Options */}
      <div className="space-y-4">
        {timelineOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedValue === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] ${
                isSelected
                  ? `${option.bgColor} ${option.borderColor} shadow-lg ring-2 ring-offset-2 ${option.color.replace('text-', 'ring-')}`
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left: Icon and Content */}
                <div className="flex items-center space-x-4 text-left flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                    isSelected ? option.bgColor : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isSelected ? option.color : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className={`font-bold text-lg ${
                        isSelected ? option.color : 'text-gray-900'
                      }`}>
                        {option.label}
                      </h3>
                      {getUrgencyBadge(option.urgency)}
                    </div>
                    <p className="text-gray-600 font-medium">{option.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Typical timeframe: <span className="font-medium">{option.timeframe}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected 
                    ? `${option.borderColor} ${option.bgColor}` 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <div className={`w-3 h-3 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Additional Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
        <div className="text-center">
          <div className="text-blue-600 font-medium mb-2">📅 Timeline Impact</div>
          <p className="text-blue-700 text-sm leading-relaxed">
            Urgent timelines attract immediate buyers but may result in lower offers. 
            Flexible timelines allow for better buyer matching and potentially higher valuations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineSelector;
