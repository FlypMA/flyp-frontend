import React, { useState, useEffect } from 'react';
import { Euro } from 'lucide-react';

interface RevenueRangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

const RevenueRangeSlider: React.FC<RevenueRangeSliderProps> = ({
  value,
  onChange,
  min = 50000, // €50K
  max = 50000000, // €50M
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  // Predefined revenue ranges for snapping
  const revenueMarkers = [
    { value: 50000, label: '€50K' },
    { value: 100000, label: '€100K' },
    { value: 250000, label: '€250K' },
    { value: 500000, label: '€500K' },
    { value: 1000000, label: '€1M' },
    { value: 2500000, label: '€2.5M' },
    { value: 5000000, label: '€5M' },
    { value: 10000000, label: '€10M' },
    { value: 25000000, label: '€25M' },
    { value: 50000000, label: '€50M' },
  ];

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const formatRevenue = (amount: number): string => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `€${(amount / 1000).toFixed(0)}K`;
    }
    return `€${amount.toLocaleString()}`;
  };

  const valueToPercent = (val: number): number => {
    // Use logarithmic scale for better UX with large ranges
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    const logVal = Math.log(val);
    return ((logVal - logMin) / (logMax - logMin)) * 100;
  };

  const percentToValue = (percent: number): number => {
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    const logVal = logMin + (percent / 100) * (logMax - logMin);
    return Math.exp(logVal);
  };

  const snapToNearestMarker = (val: number): number => {
    const nearest = revenueMarkers.reduce((prev, curr) =>
      Math.abs(curr.value - val) < Math.abs(prev.value - val) ? curr : prev
    );
    return nearest.value;
  };

  const handleSliderChange = (percent: number, type: 'min' | 'max') => {
    const rawValue = percentToValue(percent);
    const snappedValue = snapToNearestMarker(rawValue);
    
    let newMin = localValue[0];
    let newMax = localValue[1];

    if (type === 'min' && snappedValue < localValue[1]) {
      newMin = snappedValue;
    } else if (type === 'max' && snappedValue > localValue[0]) {
      newMax = snappedValue;
    }

    const newValue: [number, number] = [newMin, newMax];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const minPercent = valueToPercent(localValue[0]);
  const maxPercent = valueToPercent(localValue[1]);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl">
          <Euro className="w-8 h-8 text-blue-600" />
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {formatRevenue(localValue[0])} - {formatRevenue(localValue[1])}
          </h3>
          <p className="text-blue-700 font-medium">Annual Revenue Range</p>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative px-4">
        {/* Track Background */}
        <div className="h-2 bg-gray-200 rounded-full relative">
          {/* Active Range */}
          <div 
            className="absolute h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          />

          {/* Min Thumb */}
          <button
            className={`absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
              isDragging === 'min' ? 'scale-110 ring-4 ring-blue-200' : ''
            }`}
            style={{ left: `${minPercent}%`, top: '50%' }}
            onMouseDown={() => setIsDragging('min')}
            onTouchStart={() => setIsDragging('min')}
          />

          {/* Max Thumb */}
          <button
            className={`absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
              isDragging === 'max' ? 'scale-110 ring-4 ring-blue-200' : ''
            }`}
            style={{ left: `${maxPercent}%`, top: '50%' }}
            onMouseDown={() => setIsDragging('max')}
            onTouchStart={() => setIsDragging('max')}
          />
        </div>

        {/* Range Labels */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>{formatRevenue(min)}</span>
          <span>{formatRevenue(max)}</span>
        </div>
      </div>

      {/* Quick Selection Presets */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 text-center">Quick Select</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            [100000, 500000],
            [500000, 1000000],
            [1000000, 5000000],
            [5000000, 25000000],
          ].map(([minVal, maxVal]) => (
            <button
              key={`${minVal}-${maxVal}`}
              onClick={() => {
                const newValue: [number, number] = [minVal, maxVal];
                setLocalValue(newValue);
                onChange(newValue);
              }}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                localValue[0] === minVal && localValue[1] === maxVal
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formatRevenue(minVal)} - {formatRevenue(maxVal)}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="text-center">
          <div className="text-blue-600 font-medium mb-1">💡 Helpful Context</div>
          <p className="text-blue-700 text-sm">
            Revenue ranges help us match you with buyers who have the right investment capacity for your business size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueRangeSlider;
