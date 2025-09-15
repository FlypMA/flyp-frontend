import React, { useState, useCallback } from 'react';

interface PriceRangeSliderProps {
  /**
   * Minimum value for the range
   */
  min?: number;

  /**
   * Maximum value for the range
   */
  max?: number;

  /**
   * Step size for the slider
   */
  step?: number;

  /**
   * Initial value range [min, max]
   */
  defaultValue?: [number, number];

  /**
   * Current value range [min, max]
   */
  value?: [number, number];

  /**
   * Callback when range changes
   */
  onChange?: (value: [number, number]) => void;

  /**
   * Currency symbol to display
   */
  currency?: string;

  /**
   * Whether to show value labels above thumbs
   */
  showValueLabels?: boolean;

  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * PriceRangeSlider - A clean, professional dual-range slider for price selection
 *
 * Replaces complex HeroUI Slider with a simple, accessible implementation
 */
const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min = 0,
  max = 5000000,
  step = 100000,
  defaultValue = [0, 5000000],
  value,
  onChange,
  currency = '€',
  showValueLabels = true,
  disabled = false,
  className = '',
}) => {
  // Use controlled or uncontrolled state
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
  const currentValue = value || internalValue;

  const handleMinChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.max(min, Math.min(max, parseInt(event.target.value)));
      const clampedMax = Math.max(min, Math.min(max, currentValue[1]));
      const newValue: [number, number] = [newMin, Math.max(newMin, clampedMax)];

      if (!value) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [currentValue, value, onChange, min, max]
  );

  const handleMaxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(min, Math.min(max, parseInt(event.target.value)));
      const clampedMin = Math.max(min, Math.min(max, currentValue[0]));
      const newValue: [number, number] = [Math.min(clampedMin, newMax), newMax];

      if (!value) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [currentValue, value, onChange, min, max]
  );

  const formatPrice = (price: number): string => {
    if (price >= 1000000) {
      return `${currency}${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
    } else if (price >= 1000) {
      return `${currency}${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
    } else {
      return `${currency}${price.toLocaleString()}`;
    }
  };

  const getPercentage = (value: number): number => {
    const clampedValue = Math.max(min, Math.min(max, value));
    return ((clampedValue - min) / (max - min)) * 100;
  };

  // Ensure current values are within bounds
  const clampedCurrentValue: [number, number] = [
    Math.max(min, Math.min(max, currentValue[0])),
    Math.max(min, Math.min(max, currentValue[1])),
  ];

  const minPercent = getPercentage(clampedCurrentValue[0]);
  const maxPercent = getPercentage(clampedCurrentValue[1]);

  return (
    <div className={`price-range-slider ${className}`}>
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
        {/* Value Labels */}
        {showValueLabels && (
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-slate-700">
              Min:{' '}
              <span className="text-blue-600 font-semibold">
                {formatPrice(clampedCurrentValue[0])}
              </span>
            </div>
            <div className="text-sm font-medium text-slate-700">
              Max:{' '}
              <span className="text-blue-600 font-semibold">
                {formatPrice(clampedCurrentValue[1])}
              </span>
            </div>
          </div>
        )}

        {/* Slider Container */}
        <div className="relative mb-6">
          {/* Track Background */}
          <div className="slider-track">
            {/* Active Range */}
            <div
              className="slider-range"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />
          </div>

          {/* Range Inputs */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={clampedCurrentValue[0]}
            onChange={handleMinChange}
            disabled={disabled}
            className="slider-input slider-input-min"
            aria-label={`Minimum price: ${formatPrice(clampedCurrentValue[0])}`}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={clampedCurrentValue[1]}
            onChange={handleMaxChange}
            disabled={disabled}
            className="slider-input slider-input-max"
            aria-label={`Maximum price: ${formatPrice(clampedCurrentValue[1])}`}
          />
        </div>

        {/* Price Markers */}
        <div className="flex justify-between text-xs text-slate-500">
          <span>{formatPrice(0)}</span>
          <span>{formatPrice(1000000)}</span>
          <span>{formatPrice(2500000)}</span>
          <span>{formatPrice(max)}+</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
