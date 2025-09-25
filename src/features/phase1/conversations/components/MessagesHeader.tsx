// 🎯 Messages Header Component
// Location: src/features/phase1/conversations/components/MessagesHeader.tsx
// Purpose: Enhanced messages header with search, filters, and actions (Airbnb-style)

import { Button } from '@/shared/components/buttons';
import { Badge, Chip } from '@heroui/react';
import { ChevronDown, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// =============================================================================
// TYPES
// =============================================================================

export type MessageCategory = 'all' | 'business' | 'due_diligence' | 'support';
export type MessageStatus = 'all' | 'unread' | 'archived';

interface MessagesHeaderProps {
  searchQuery: string;
  categoryFilter: MessageCategory;
  statusFilter: MessageStatus;
  unreadCount: number;
  onSearchChange: (_query: string) => void;
  onCategoryChange: (_category: MessageCategory) => void;
  onStatusChange: (_status: MessageStatus) => void;
  onSettingsClick: () => void;
  className?: string;
}

// =============================================================================
// MESSAGES HEADER COMPONENT
// =============================================================================

const MessagesHeader: React.FC<MessagesHeaderProps> = ({
  searchQuery,
  categoryFilter,
  statusFilter,
  unreadCount,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSettingsClick,
  className = '',
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories: { value: MessageCategory; label: string; count?: number }[] = [
    { value: 'all', label: 'All' },
    { value: 'business', label: 'Business' },
    { value: 'due_diligence', label: 'Due Diligence' },
    { value: 'support', label: 'Support' },
  ];

  const statusOptions: { value: MessageStatus; label: string; count?: number }[] = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'archived', label: 'Archived' },
  ];

  const handleCategorySelect = (category: MessageCategory) => {
    onCategoryChange(category);
    setShowCategoryDropdown(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      // Focus the input after it becomes visible
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      // Clear search when hiding
      onSearchChange('');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    if (showCategoryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown]);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggleSearch();
      }
      if (event.key === 'Escape' && isSearchVisible) {
        setIsSearchVisible(false);
        onSearchChange('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchVisible, searchQuery]);

  return (
    <div className={`messages-header bg-white border-b border-gray-200 p-4 ${className}`}>
      {/* Main Header Section */}
      <div className="px-4 py-3 pt-0">
        {/* Header with Title and Search Toggle */}
        {!isSearchVisible ? (
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSearch}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Search conversations"
              >
                <Search className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={onSettingsClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Message settings"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search conversations..."
                className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-200"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                onBlur={() => {
                  if (!searchQuery) {
                    setTimeout(() => {
                      if (!searchQuery) {
                        setIsSearchVisible(false);
                      }
                    }, 200);
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Filter Section - Only show when search is not visible */}
        {!isSearchVisible && (
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="secondary"
                  size="sm"
                  onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  endContent={<ChevronDown className="w-3 h-3" />}
                  className="text-sm"
                >
                  All
                  {unreadCount > 0 && (
                    <span className="ml-1 text-xs opacity-75">({unreadCount} unread)</span>
                  )}
                </Button>

                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <div className="mb-2">
                        <div className="text-xs font-medium text-gray-500 mb-1 px-2">
                          Message Type
                        </div>
                        <div className="space-y-1">
                          {categories.map(category => (
                            <button
                              key={category.value}
                              onClick={() => handleCategorySelect(category.value)}
                              className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-50 flex items-center justify-between ${
                                categoryFilter === category.value
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-gray-700'
                              }`}
                            >
                              <span>{category.label}</span>
                              {category.count && category.count > 0 && (
                                <Badge size="sm" color="danger">
                                  {category.count}
                                </Badge>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1 px-2">Status</div>
                        <div className="space-y-1">
                          {statusOptions.map(status => (
                            <button
                              key={status.value}
                              onClick={() => onStatusChange(status.value)}
                              className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-50 flex items-center justify-between ${
                                statusFilter === status.value
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-gray-700'
                              }`}
                            >
                              <span>{status.label}</span>
                              {status.count && status.count > 0 && (
                                <Badge size="sm" color="danger">
                                  {status.count}
                                </Badge>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {(categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-2 flex-wrap">
            {categoryFilter !== 'all' && (
              <Chip
                size="sm"
                variant="flat"
                color="primary"
                onClose={() => onCategoryChange('all')}
                className="text-xs"
              >
                {categories.find(c => c.value === categoryFilter)?.label}
              </Chip>
            )}
            {statusFilter !== 'all' && (
              <Chip
                size="sm"
                variant="flat"
                color="secondary"
                onClose={() => onStatusChange('all')}
                className="text-xs"
              >
                {statusOptions.find(s => s.value === statusFilter)?.label}
              </Chip>
            )}
            {searchQuery && (
              <Chip
                size="sm"
                variant="flat"
                color="default"
                onClose={() => onSearchChange('')}
                className="text-xs"
              >
                Search: "{searchQuery}"
              </Chip>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesHeader;
