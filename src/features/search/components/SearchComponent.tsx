// 🔍 SearchComponent - Enhanced search matching legacy exactly
// Location: src/features/search/components/SearchComponent.tsx
// Purpose: Professional search input with suggestions functionality matching legacy design

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Search, X } from 'lucide-react';

interface SearchComponentProps {
  /**
   * Current search query value
   */
  value: string;

  /**
   * Callback when search value changes
   */
  onChange: (value: string) => void;

  /**
   * Callback when search is submitted
   */
  onSearch: () => void;

  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Size variant of the search component
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether to show loading state
   */
  isLoading?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Button text override
   */
  buttonText?: string;

  /**
   * Whether to show suggestions dropdown
   */
  showSuggestions?: boolean;

  /**
   * Array of suggestion strings
   */
  suggestions?: string[];
}

/**
 * SearchComponent - Enhanced search matching legacy exactly
 *
 * Professional search component with suggestions dropdown functionality
 * matching the exact design and behavior of the legacy app.
 */
const SearchComponent: React.FC<SearchComponentProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search for businesses...',
  size = 'medium',
  isLoading = false,
  className = '',
  buttonText = 'Search',
  showSuggestions = false,
  suggestions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    small: 'text-sm px-3 py-2',
    medium: 'text-base px-4 py-3',
    large: 'text-lg px-4 py-3',
  };

  const buttonSizeClasses = {
    small: 'px-4 py-2',
    medium: 'px-6 py-3',
    large: 'px-8 py-3',
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    onSearch();
  };

  const clearSearch = () => {
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col md:flex-row gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={e => {
              onChange(e.target.value);
              if (showSuggestions && e.target.value) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            }}
            onKeyPress={handleKeyPress}
            onFocus={() => showSuggestions && value && setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow suggestion clicks
            placeholder={placeholder}
            className={`w-full border-none outline-none bg-transparent placeholder-neutral-400 ${sizeClasses[size]}`}
            disabled={isLoading}
          />

          {value && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            <Search className="w-5 h-5" />
          </div>
        </div>

        <Button
          size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'}
          onPress={onSearch}
          isLoading={isLoading}
          className={`bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors ${buttonSizeClasses[size]}`}
        >
          {isLoading ? 'Searching...' : buttonText}
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions
            .filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 8)
            .map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-900">{suggestion}</span>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
