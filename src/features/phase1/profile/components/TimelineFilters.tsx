/**
 * Timeline Filters Component
 * Allows filtering timeline events by type, date, status, etc.
 */

import React, { useState } from 'react';
import {
  BusinessTimelineEventStatus,
  BusinessTimelineEventType,
  BusinessTimelineFilters,
  EVENT_TYPE_CONFIGS,
} from '../types/timeline.types';

interface TimelineFiltersProps {
  filters: BusinessTimelineFilters;
  onFiltersChange: (filters: BusinessTimelineFilters) => void;
  className?: string;
}

const TimelineFilters: React.FC<TimelineFiltersProps> = ({
  filters,
  onFiltersChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeChange = (type: BusinessTimelineEventType, checked: boolean) => {
    const currentTypes = filters.types || [];
    const newTypes = checked ? [...currentTypes, type] : currentTypes.filter(t => t !== type);

    onFiltersChange({
      ...filters,
      types: newTypes.length > 0 ? newTypes : undefined,
    });
  };

  const handleStatusChange = (status: BusinessTimelineEventStatus, checked: boolean) => {
    const currentStatuses = filters.status || [];
    const newStatuses = checked
      ? [...currentStatuses, status]
      : currentStatuses.filter(s => s !== status);

    onFiltersChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const currentRange = filters.dateRange || { start: '', end: '' };
    const newRange = { ...currentRange, [field]: value };

    onFiltersChange({
      ...filters,
      dateRange: newRange.start || newRange.end ? newRange : undefined,
    });
  };

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const currentIndustries = filters.industries || [];
    const newIndustries = checked
      ? [...currentIndustries, industry]
      : currentIndustries.filter(i => i !== industry);

    onFiltersChange({
      ...filters,
      industries: newIndustries.length > 0 ? newIndustries : undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = () => {
    return !!(
      filters.types?.length ||
      filters.status?.length ||
      filters.dateRange ||
      filters.industries?.length ||
      filters.tags?.length
    );
  };

  const commonIndustries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Real Estate',
    'Manufacturing',
    'Retail',
    'Food & Beverage',
    'Consulting',
    'Education',
    'Energy',
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
      {/* Filter Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700">
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Event Types */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Event Types</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {EVENT_TYPE_CONFIGS.map(config => (
                <label key={config.type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.types?.includes(config.type) || false}
                    onChange={e => handleTypeChange(config.type, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 flex items-center">
                    <span className="mr-1">{config.icon}</span>
                    {config.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Status</h4>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  'active',
                  'completed',
                  'ongoing',
                  'cancelled',
                  'pending',
                ] as BusinessTimelineEventStatus[]
              ).map(status => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status?.includes(status) || false}
                    onChange={e => handleStatusChange(status, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Date Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={e => handleDateRangeChange('start', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={e => handleDateRangeChange('end', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Industries</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonIndustries.map(industry => (
                <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.industries?.includes(industry) || false}
                    onChange={e => handleIndustryChange(industry, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{industry}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Date Filters */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Filters</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Last Year', months: 12 },
                { label: 'Last 2 Years', months: 24 },
                { label: 'Last 5 Years', months: 60 },
              ].map(({ label, months }) => {
                const startDate = new Date();
                startDate.setMonth(startDate.getMonth() - months);

                return (
                  <button
                    key={label}
                    onClick={() =>
                      handleDateRangeChange('start', startDate.toISOString().split('T')[0])
                    }
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineFilters;
