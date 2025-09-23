import { Button } from '@/shared/components/buttons';
import { Search } from 'lucide-react';
import React from 'react';

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
  size?: 'default' | 'large';

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
}

/**
 * SearchComponent - A clean, reusable search component
 *
 * Designed to replace the complex HeroUI search implementations
 * with a simpler, more maintainable solution.
 */
const SearchComponent: React.FC<SearchComponentProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search businesses, sectors, locations...',
  size = 'default',
  isLoading = false,
  className = '',
  buttonText = 'Search',
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const sizeClasses = {
    default: {
      container: 'p-4',
      input: 'h-12 text-base px-4 pl-12',
      button: 'h-12 px-6 text-base',
      icon: 'w-5 h-5',
    },
    large: {
      container: 'p-6',
      input: 'h-14 text-lg px-6 pl-14',
      button: 'h-14 px-10 text-lg',
      icon: 'w-6 h-6',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`professional-search-container ${className}`}>
      <div
        className={`bg-white border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-2xl ${sizes.container}`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 ${sizes.icon}`}
                style={{ stroke: 'currentColor', fill: 'none' }}
              />
              <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className={`w-full border-0 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ${sizes.input}`}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            type="button"
            onClick={onSearch}
            disabled={isLoading}
            variant="primary"
            className={`${sizes.button} text-lg`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </div>
            ) : (
              buttonText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
