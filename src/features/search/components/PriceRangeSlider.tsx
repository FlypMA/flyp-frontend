// 🎚️ PriceRangeSlider - Professional price range selector
// Location: src/features/search/components/PriceRangeSlider.tsx
// Purpose: Clean price range slider matching legacy functionality

import React from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  currency?: string;
  showValueLabels?: boolean;
  className?: string;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  currency = '€',
  showValueLabels = true,
  className = '',
}) => {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${currency}${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${currency}${(price / 1000).toFixed(0)}K`;
    }
    return `${currency}${price.toLocaleString()}`;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= value[1]) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= value[0]) {
      onChange([value[0], newMax]);
    }
  };

  const minPercent = ((value[0] - min) / (max - min)) * 100;
  const maxPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      {showValueLabels && (
        <div className="flex justify-between items-center text-sm font-medium text-slate-700">
          <span>{formatPrice(value[0])}</span>
          <span>{formatPrice(value[1])}</span>
        </div>
      )}

      <div className="relative">
        {/* Track */}
        <div className="h-2 bg-slate-200 rounded-full"></div>

        {/* Active track */}
        <div
          className="absolute top-0 h-2 bg-blue-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleMinChange}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none slider-thumb"
          style={{ zIndex: 1 }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleMaxChange}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none pointer-events-none slider-thumb"
          style={{ zIndex: 2 }}
        />
      </div>

      <div className="flex justify-between text-xs text-slate-500">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>

      <style jsx>{`
        .slider-thumb {
          pointer-events: auto;
        }

        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          pointer-events: auto;
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          pointer-events: auto;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default PriceRangeSlider;
