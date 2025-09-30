// 🏢 Number Input - Airbnb-Inspired
// Location: src/features/phase1/business/listing/listing-service/components/NumberInput.tsx
// Purpose: Reusable number input with increment/decrement buttons

import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  testId?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  testId,
}) => {
  const handleDecrease = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onChange(clampedValue);
  };

  return (
    <div
      className="flex items-center justify-between h-auto border-2 border-gray-300 rounded-xl py-4 px-6 hover:border-gray-400 transition-colors"
      id={testId}
    >
      {/* Decrease Button */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Decrease"
        data-testid={`${testId}-decrease-button`}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className="w-3 h-3"
          fill="currentColor"
        >
          <path d="m.75 6.75h10.5v-1.5h-10.5z"></path>
        </svg>
      </button>

      {/* Input Field */}
      <div className="flex-1 mx-4">
        <label htmlFor={`${testId}-input`} className="sr-only">
          {label}
        </label>
        <input
          id={`${testId}-input`}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min={min}
          max={max}
          value={value}
          onChange={handleInputChange}
          className="w-full text-center text-2xl font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-0 appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label={label}
          data-testid={`${testId}-input`}
        />
        {/* Accessibility label */}
        <span className="sr-only" data-testid={`${testId}-a11y-value-label`}>
          {value}
        </span>
      </div>

      {/* Increase Button */}
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Increase"
        data-testid={`${testId}-increase-button`}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className="w-3 h-3"
          fill="currentColor"
        >
          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path>
        </svg>
      </button>
    </div>
  );
};

export default NumberInput;
