/**
 * Business Timeline Service
 * Handles API calls for business timeline events
 */

import {
  BusinessTimelineEvent,
  BusinessTimelineFilters,
  BusinessTimelineResponse,
  BusinessTimelineStats,
  CreateTimelineEventRequest,
  UpdateTimelineEventRequest,
} from '../types/timeline.types';

class TimelineService {
  private baseUrl = '/api/timeline';

  /**
   * Get user's business timeline events
   */
  async getTimeline(
    userId: string,
    filters?: BusinessTimelineFilters,
    page: number = 1,
    limit: number = 20
  ): Promise<BusinessTimelineResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.types && { types: filters.types.join(',') }),
      ...(filters?.status && { status: filters.status.join(',') }),
      ...(filters?.dateRange?.start && { startDate: filters.dateRange.start }),
      ...(filters?.dateRange?.end && { endDate: filters.dateRange.end }),
      ...(filters?.industries && { industries: filters.industries.join(',') }),
      ...(filters?.tags && { tags: filters.tags.join(',') }),
    });

    const response = await fetch(`${this.baseUrl}/${userId}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch timeline: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get timeline statistics
   */
  async getTimelineStats(userId: string): Promise<BusinessTimelineStats> {
    const response = await fetch(`${this.baseUrl}/${userId}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch timeline stats: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Create a new timeline event
   */
  async createEvent(
    userId: string,
    eventData: CreateTimelineEventRequest
  ): Promise<BusinessTimelineEvent> {
    const response = await fetch(`${this.baseUrl}/${userId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create timeline event: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update an existing timeline event
   */
  async updateEvent(
    userId: string,
    eventId: string,
    eventData: UpdateTimelineEventRequest
  ): Promise<BusinessTimelineEvent> {
    const response = await fetch(`${this.baseUrl}/${userId}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update timeline event: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a timeline event
   */
  async deleteEvent(userId: string, eventId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${userId}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete timeline event: ${response.statusText}`);
    }
  }

  /**
   * Get events by type
   */
  async getEventsByType(
    userId: string,
    type: string,
    limit: number = 10
  ): Promise<BusinessTimelineEvent[]> {
    const response = await fetch(`${this.baseUrl}/${userId}/events/type/${type}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events by type: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get recent activity (last 6 months)
   */
  async getRecentActivity(userId: string): Promise<BusinessTimelineEvent[]> {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return this.getTimeline(
      userId,
      {
        dateRange: {
          start: sixMonthsAgo.toISOString(),
          end: new Date().toISOString(),
        },
      },
      1,
      10
    ).then(response => response.events);
  }

  /**
   * Search timeline events
   */
  async searchEvents(
    userId: string,
    query: string,
    filters?: BusinessTimelineFilters
  ): Promise<BusinessTimelineEvent[]> {
    const params = new URLSearchParams({
      q: query,
      ...(filters?.types && { types: filters.types.join(',') }),
      ...(filters?.status && { status: filters.status.join(',') }),
      ...(filters?.dateRange?.start && { startDate: filters.dateRange.start }),
      ...(filters?.dateRange?.end && { endDate: filters.dateRange.end }),
    });

    const response = await fetch(`${this.baseUrl}/${userId}/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search timeline events: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Upload event image
   */
  async uploadEventImage(
    userId: string,
    eventId: string,
    file: File
  ): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${this.baseUrl}/${userId}/events/${eventId}/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload event image: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get timeline export data
   */
  async exportTimeline(userId: string, format: 'json' | 'csv' | 'pdf' = 'json'): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/${userId}/export?format=${format}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to export timeline: ${response.statusText}`);
    }

    return response.blob();
  }
}

export const timelineService = new TimelineService();
export default timelineService;
