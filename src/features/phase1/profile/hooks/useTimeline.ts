/**
 * Business Timeline Hook
 * Manages timeline state and operations
 */

import { useCallback, useEffect, useState } from 'react';
import { mockTimelineService } from '../services/mockTimelineService';
import { timelineService } from '../services/timelineService';
import {
  BusinessTimelineEvent,
  BusinessTimelineFilters,
  BusinessTimelineStats,
  CreateTimelineEventRequest,
  UpdateTimelineEventRequest,
} from '../types/timeline.types';

// Use mock service for development/testing
const isDevelopment =
  import.meta.env.MODE === 'development' || import.meta.env.VITE_USE_MOCK === 'true';
const service = isDevelopment ? mockTimelineService : timelineService;

interface UseTimelineOptions {
  userId: string;
  autoFetch?: boolean;
  initialFilters?: BusinessTimelineFilters;
  pageSize?: number;
}

interface UseTimelineReturn {
  // Data
  events: BusinessTimelineEvent[];
  stats: BusinessTimelineStats | null;
  loading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  totalPages: number;
  hasMore: boolean;

  // Filters
  filters: BusinessTimelineFilters;

  // Actions
  fetchEvents: (page?: number, newFilters?: BusinessTimelineFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  setFilters: (filters: BusinessTimelineFilters) => void;
  createEvent: (eventData: CreateTimelineEventRequest) => Promise<BusinessTimelineEvent>;
  updateEvent: (
    eventId: string,
    eventData: UpdateTimelineEventRequest
  ) => Promise<BusinessTimelineEvent>;
  deleteEvent: (eventId: string) => Promise<void>;
  searchEvents: (query: string) => Promise<BusinessTimelineEvent[]>;

  // Stats
  fetchStats: () => Promise<void>;
}

export const useTimeline = (options: UseTimelineOptions): UseTimelineReturn => {
  const { userId, autoFetch = true, initialFilters = {}, pageSize = 20 } = options;

  // State
  const [events, setEvents] = useState<BusinessTimelineEvent[]>([]);
  const [stats, setStats] = useState<BusinessTimelineStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFiltersState] = useState<BusinessTimelineFilters>(initialFilters);

  // Fetch events
  const fetchEvents = useCallback(
    async (page: number = 1, newFilters?: BusinessTimelineFilters) => {
      try {
        setLoading(true);
        setError(null);

        const activeFilters = newFilters || filters;
        const response = await service.getTimeline(userId, activeFilters, page, pageSize);

        if (page === 1) {
          setEvents(response.events);
        } else {
          setEvents(prev => [...prev, ...response.events]);
        }

        setCurrentPage(page);
        setTotalPages(Math.ceil(response.pagination.total / pageSize));
        setHasMore(response.pagination.hasMore);

        if (newFilters) {
          setFiltersState(newFilters);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch timeline events');
      } finally {
        setLoading(false);
      }
    },
    [userId, filters, pageSize]
  );

  // Load more events
  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      await fetchEvents(currentPage + 1);
    }
  }, [fetchEvents, currentPage, hasMore, loading]);

  // Refresh events
  const refresh = useCallback(async () => {
    await fetchEvents(1);
  }, [fetchEvents]);

  // Set filters
  const setFilters = useCallback(
    (newFilters: BusinessTimelineFilters) => {
      setFiltersState(newFilters);
      fetchEvents(1, newFilters);
    },
    [fetchEvents]
  );

  // Create event
  const createEvent = useCallback(
    async (eventData: CreateTimelineEventRequest): Promise<BusinessTimelineEvent> => {
      try {
        setLoading(true);
        setError(null);

        const newEvent = await service.createEvent(userId, eventData);
        setEvents(prev => [newEvent, ...prev]);

        // Refresh stats
        await fetchStats();

        return newEvent;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create timeline event');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  // Update event
  const updateEvent = useCallback(
    async (
      eventId: string,
      eventData: UpdateTimelineEventRequest
    ): Promise<BusinessTimelineEvent> => {
      try {
        setLoading(true);
        setError(null);

        const updatedEvent = await service.updateEvent(userId, eventId, eventData);
        setEvents(prev => prev.map(event => (event.id === eventId ? updatedEvent : event)));

        return updatedEvent;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update timeline event');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  // Delete event
  const deleteEvent = useCallback(
    async (eventId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        await service.deleteEvent(userId, eventId);
        setEvents(prev => prev.filter(event => event.id !== eventId));

        // Refresh stats
        await fetchStats();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete timeline event');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  // Search events
  const searchEvents = useCallback(
    async (query: string): Promise<BusinessTimelineEvent[]> => {
      try {
        setLoading(true);
        setError(null);

        const results = await service.searchEvents(userId, query, filters);
        return Array.isArray(results) ? results : results.events;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search timeline events');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId, filters]
  );

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await service.getTimelineStats(userId);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch timeline stats:', err);
    }
  }, [userId]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && userId) {
      fetchEvents(1);
      fetchStats();
    }
  }, [autoFetch, userId, fetchEvents, fetchStats]);

  return {
    // Data
    events,
    stats,
    loading,
    error,

    // Pagination
    currentPage,
    totalPages,
    hasMore,

    // Filters
    filters,

    // Actions
    fetchEvents,
    loadMore,
    refresh,
    setFilters,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents,

    // Stats
    fetchStats,
  };
};

export default useTimeline;
