/**
 * Business Timeline Component
 * Inspired by Airbnb's travel timeline but for business activities
 */

import React, { useMemo, useState } from 'react';
import { useTimeline } from '../hooks/useTimeline';
import {
  BusinessTimelineEvent,
  BusinessTimelineEventType,
  EVENT_TYPE_CONFIGS,
} from '../types/timeline.types';

interface BusinessTimelineProps {
  userId: string;
  className?: string;
  showHeader?: boolean;
  showStats?: boolean;
  maxEvents?: number;
  groupByYear?: boolean;
}

interface TimelineEventCardProps {
  event: BusinessTimelineEvent;
  index: number;
  totalEvents: number;
}

const TimelineEventCard: React.FC<TimelineEventCardProps> = ({ event, index, totalEvents }) => {
  const eventConfig = EVENT_TYPE_CONFIGS.find(config => config.type === event.type);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getEventImage = () => {
    if (event.imageUrl) {
      return event.imageUrl;
    }

    // Default images based on event type
    const defaultImages: Record<BusinessTimelineEventType, string> = {
      business_founded: '/images/timeline/business-founded.jpg',
      business_acquired: '/images/timeline/business-acquired.jpg',
      business_sold: '/images/timeline/business-sold.jpg',
      investment_made: '/images/timeline/investment-made.jpg',
      investment_exited: '/images/timeline/investment-exited.jpg',
      partnership_formed: '/images/timeline/partnership.jpg',
      board_position: '/images/timeline/board-position.jpg',
      advisory_role: '/images/timeline/advisory-role.jpg',
      funding_raised: '/images/timeline/funding.jpg',
      merger_completed: '/images/timeline/merger.jpg',
      ipo_completed: '/images/timeline/ipo.jpg',
      business_closed: '/images/timeline/business-closed.jpg',
      award_received: '/images/timeline/award.jpg',
      certification_earned: '/images/timeline/certification.jpg',
      business_milestone: '/images/timeline/business-milestone.jpg',
      platform_joined: '/images/timeline/platform-joined.jpg',
      deal_completed: '/images/timeline/deal-completed.jpg',
      valuation_received: '/images/timeline/valuation.jpg',
    };

    return defaultImages[event.type] || '/images/timeline/default.jpg';
  };

  return (
    <div
      className="relative flex items-center mb-6"
      style={{
        transform: `rotate(${(Math.random() - 0.5) * 2}deg) scale(${0.95 + Math.random() * 0.1})`,
        zIndex: totalEvents - index,
      }}
    >
      {/* Event Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={getEventImage()}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={e => {
              // Fallback to a placeholder if image fails to load
              e.currentTarget.src = `https://via.placeholder.com/128x128/${eventConfig?.color.replace('#', '')}/ffffff?text=${eventConfig?.icon}`;
            }}
          />
        </div>

        {/* Event Type Icon Overlay */}
        {eventConfig && (
          <div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
            style={{ backgroundColor: eventConfig.color }}
          >
            {eventConfig.icon}
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="ml-4 flex-1 min-w-0">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{event.subtitle}</p>
          <p className="text-xs text-gray-500">
            {formatDate(event.date)}
            {event.location && ` • ${event.location}`}
          </p>

          {/* Event Description */}
          {event.description && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{event.description}</p>
          )}

          {/* Event Metadata */}
          {event.metadata && (
            <div className="mt-3 flex flex-wrap gap-2">
              {event.metadata.valuation && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ${(event.metadata.valuation / 1000000).toFixed(1)}M valuation
                </span>
              )}
              {event.metadata.investmentAmount && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ${(event.metadata.investmentAmount / 1000000).toFixed(1)}M invested
                </span>
              )}
              {event.metadata.industry && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {event.metadata.industry}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BusinessTimeline: React.FC<BusinessTimelineProps> = ({
  userId,
  className = '',
  showHeader = true,
  showStats = true,
  maxEvents = 20,
  groupByYear = false,
}) => {
  const { events, stats, loading, error, loadMore, hasMore } = useTimeline({
    userId,
    pageSize: maxEvents,
  });

  const [showAll, setShowAll] = useState(false);

  const displayedEvents = useMemo(() => {
    if (showAll) return events;
    return events.slice(0, 6); // Show first 6 events initially
  }, [events, showAll]);

  const groupedEvents = useMemo(() => {
    if (!groupByYear) return { 'All Events': displayedEvents };

    return displayedEvents.reduce(
      (groups, event) => {
        const year = new Date(event.date).getFullYear();
        if (!groups[year]) groups[year] = [];
        groups[year].push(event);
        return groups;
      },
      {} as Record<string, BusinessTimelineEvent[]>
    );
  }, [displayedEvents, groupByYear]);

  if (loading && events.length === 0) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-600 mb-4">Failed to load timeline: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">📈</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No business activities yet</h3>
        <p className="text-gray-600 mb-6">
          Start building your business timeline by adding your first activity.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Add First Activity
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      {showHeader && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Journey</h2>
          <p className="text-gray-600">
            {stats ? `${stats.totalEvents} activities` : `${events.length} activities`} in your
            business timeline
          </p>
        </div>
      )}

      {/* Stats */}
      {showStats && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{stats.businessesFounded}</div>
            <div className="text-sm text-gray-600">Businesses Founded</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{stats.businessesSold}</div>
            <div className="text-sm text-gray-600">Businesses Sold</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">{stats.investmentsMade}</div>
            <div className="text-sm text-gray-600">Investments Made</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-orange-600">
              ${(stats.totalDealValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Total Deal Value</div>
          </div>
        </div>
      )}

      {/* Timeline Events */}
      <div className="relative">
        {Object.entries(groupedEvents).map(([group, groupEvents]) => (
          <div key={group} className="mb-8">
            {groupByYear && (
              <h3 className="text-lg font-semibold text-gray-900 mb-4 sticky top-0 bg-white py-2">
                {group}
              </h3>
            )}

            <div className="space-y-6">
              {groupEvents.map((event, index) => (
                <TimelineEventCard
                  key={event.id}
                  event={event}
                  index={index}
                  totalEvents={groupEvents.length}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Load More */}
      {events.length > 6 && (
        <div className="text-center mt-8">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Show All {events.length} Activities
            </button>
          ) : hasMore ? (
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BusinessTimeline;
