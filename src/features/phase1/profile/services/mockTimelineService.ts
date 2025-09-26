/**
 * 🧪 Mock Timeline Service - Development & Testing
 *
 * Mock service for testing the business timeline feature without backend integration
 */

import {
  BusinessTimelineEvent,
  BusinessTimelineEventType,
  BusinessTimelineFilters,
  BusinessTimelineResponse,
  BusinessTimelineStats,
  CreateTimelineEventRequest,
  UpdateTimelineEventRequest,
} from '../types/timeline.types';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockTimelineEvents: BusinessTimelineEvent[] = [
  {
    id: 'event-1',
    type: 'business_founded',
    title: 'Founded Tech Innovations BV',
    subtitle: 'CEO & Founder',
    description:
      'Started the company with a vision to revolutionize small business technology solutions.',
    date: '2018-03-15',
    location: 'Amsterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    metadata: {
      industry: 'Technology',
      investmentAmount: 50000,
      employees: 3,
    },
    status: 'completed',
    createdAt: '2018-03-15T10:00:00Z',
    updatedAt: '2018-03-15T10:00:00Z',
  },
  {
    id: 'event-2',
    type: 'funding_raised',
    title: 'Series A Funding Round',
    subtitle: '€500K raised',
    description:
      'Successfully raised Series A funding to accelerate product development and market expansion.',
    date: '2019-06-20',
    location: 'Amsterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    metadata: {
      investmentAmount: 500000,
      valuation: 2000000,
    },
    status: 'completed',
    createdAt: '2019-06-20T14:30:00Z',
    updatedAt: '2019-06-20T14:30:00Z',
  },
  {
    id: 'event-3',

    type: 'business_milestone',
    title: 'Reached 1000 Customers',
    subtitle: 'Customer Milestone',
    description: 'Achieved the milestone of 1000 active customers using our SaaS platform.',
    date: '2020-09-10',
    location: 'Amsterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    metadata: {
      revenue: 1200000,
      employees: 15,
    },
    status: 'completed',
    createdAt: '2020-09-10T16:45:00Z',
    updatedAt: '2020-09-10T16:45:00Z',
  },
  {
    id: 'event-4',

    type: 'investment_made',
    title: 'Invested in Digital Solutions Ltd',
    subtitle: 'Angel Investment',
    description:
      'Made an angel investment in Digital Solutions Ltd, a promising digital marketing startup.',
    date: '2021-02-15',
    location: 'Rotterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    metadata: {
      investmentAmount: 25000,
      equityPercentage: 5,
      industry: 'Digital Marketing',
    },
    status: 'completed',
    createdAt: '2021-02-15T11:20:00Z',
    updatedAt: '2021-02-15T11:20:00Z',
  },
  {
    id: 'event-5',

    type: 'business_milestone',
    title: 'Team Expansion to 25 Employees',
    subtitle: 'Team Growth',
    description:
      'Successfully expanded the team to 25 employees across development, sales, and operations.',
    date: '2021-08-30',
    location: 'Amsterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    metadata: {
      employees: 25,
    },
    status: 'completed',
    createdAt: '2021-08-30T09:15:00Z',
    updatedAt: '2021-08-30T09:15:00Z',
  },
  {
    id: 'event-6',

    type: 'award_received',
    title: 'Best Tech Startup 2022',
    subtitle: 'Amsterdam Tech Awards',
    description:
      'Received the Best Tech Startup award at the Amsterdam Tech Awards for innovation and growth.',
    date: '2022-05-12',
    location: 'Amsterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    metadata: {
      industry: 'Technology',
    },
    status: 'completed',
    createdAt: '2022-05-12T19:30:00Z',
    updatedAt: '2022-05-12T19:30:00Z',
  },
  {
    id: 'event-7',

    type: 'business_milestone',
    title: '€2M Annual Revenue',
    subtitle: 'Revenue Milestone',
    description:
      'Achieved €2M in annual recurring revenue, marking a significant milestone in company growth.',
    date: '2022-12-31',
    location: 'Amsterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    metadata: {
      revenue: 2000000,
    },
    status: 'completed',
    createdAt: '2022-12-31T23:59:00Z',
    updatedAt: '2022-12-31T23:59:00Z',
  },
  {
    id: 'event-8',

    type: 'investment_made',
    title: 'Invested in E-commerce Platform',
    subtitle: 'Strategic Investment',
    description: 'Made a strategic investment in an e-commerce platform to expand our portfolio.',
    date: '2023-04-18',
    location: 'Utrecht, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    metadata: {
      investmentAmount: 100000,
      equityPercentage: 10,
      industry: 'E-commerce',
    },
    status: 'completed',
    createdAt: '2023-04-18T13:45:00Z',
    updatedAt: '2023-04-18T13:45:00Z',
  },
  {
    id: 'event-9',

    type: 'business_milestone',
    title: 'International Expansion',
    subtitle: 'Belgium & Germany',
    description:
      'Successfully expanded operations to Belgium and Germany, serving customers across three countries.',
    date: '2023-09-05',
    location: 'Brussels, Belgium',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    metadata: {
      industry: 'Technology',
    },
    status: 'completed',
    createdAt: '2023-09-05T10:30:00Z',
    updatedAt: '2023-09-05T10:30:00Z',
  },
  {
    id: 'event-10',

    type: 'business_milestone',
    title: 'Platform Upgrade v3.0',
    subtitle: 'Major Product Release',
    description:
      'Launched major platform upgrade with AI-powered features and enhanced user experience.',
    date: '2024-01-15',
    location: 'Amsterdam, Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    metadata: {
      industry: 'Technology',
    },
    status: 'completed',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },
];

const mockTimelineStats: BusinessTimelineStats = {
  totalEvents: 10,
  businessesFounded: 1,
  businessesSold: 0,
  investmentsMade: 2,
  totalDealValue: 625000,
  averageDealSize: 312500,
  yearsActive: 6,
  industries: [
    { name: 'Technology', count: 8 },
    { name: 'Digital Marketing', count: 1 },
    { name: 'E-commerce', count: 1 },
  ],
  recentActivity: {
    lastEvent: mockTimelineEvents[0],
    eventsThisYear: 1,
    eventsThisMonth: 0,
  },
};

// =============================================================================
// MOCK TIMELINE SERVICE CLASS
// =============================================================================

class MockTimelineService {
  private events: Map<string, BusinessTimelineEvent> = new Map();
  private stats: BusinessTimelineStats = mockTimelineStats;

  constructor() {
    // Initialize with mock data
    mockTimelineEvents.forEach(event => {
      this.events.set(event.id, event);
    });
  }

  /**
   * Get timeline events for a user
   */
  async getTimeline(
    userId: string,
    filters?: BusinessTimelineFilters
  ): Promise<BusinessTimelineResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredEvents = Array.from(this.events.values()).filter(event => event.id === userId);

    // Apply filters
    if (filters) {
      if (filters.types) {
        filteredEvents = filteredEvents.filter(event => filters.types!.includes(event.type));
      }
      if (filters.status) {
        filteredEvents = filteredEvents.filter(event => filters.status!.includes(event.status));
      }
      if (filters.dateRange) {
        filteredEvents = filteredEvents.filter(
          event => event.date >= filters.dateRange!.start && event.date <= filters.dateRange!.end
        );
      }
      if (filters.industries) {
        filteredEvents = filteredEvents.filter(
          event => event.metadata?.industry && filters.industries!.includes(event.metadata.industry)
        );
      }
    }

    // Sort by date (newest first)
    filteredEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination (default to first 10 events)
    const paginatedEvents = filteredEvents.slice(0, 10);

    return {
      events: paginatedEvents,
      stats: await this.getTimelineStats(userId),
      pagination: {
        page: 1,
        limit: 10,
        total: filteredEvents.length,
        hasMore: filteredEvents.length > 10,
      },
    };
  }

  /**
   * Get timeline statistics
   */
  async getTimelineStats(userId: string): Promise<BusinessTimelineStats> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const userEvents = Array.from(this.events.values()).filter(event => event.id === userId);

    // Calculate stats from user events
    let businessesFounded = 0;
    let businessesSold = 0;
    let investmentsMade = 0;
    let totalDealValue = 0;
    const industries: { [key: string]: number } = {};
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let eventsThisYear = 0;
    let eventsThisMonth = 0;
    let lastEvent: BusinessTimelineEvent | null = null;

    userEvents.forEach(event => {
      // Count by type
      if (event.type === 'business_founded') {
        businessesFounded++;
      } else if (event.type === 'business_sold') {
        businessesSold++;
      } else if (event.type === 'investment_made') {
        investmentsMade++;
        if (event.metadata?.investmentAmount) {
          totalDealValue += event.metadata.investmentAmount;
        }
      }

      // Count industries
      if (event.metadata?.industry) {
        industries[event.metadata.industry] = (industries[event.metadata.industry] || 0) + 1;
      }

      // Count events by time
      const eventDate = new Date(event.date);
      if (eventDate.getFullYear() === currentYear) {
        eventsThisYear++;
        if (eventDate.getMonth() === currentMonth) {
          eventsThisMonth++;
        }
      }

      // Track last event
      if (!lastEvent || new Date(event.date) > new Date(lastEvent.date)) {
        lastEvent = event;
      }
    });

    // Calculate business age
    const foundedEvent = userEvents.find(event => event.type === 'business_founded');
    let yearsActive = 0;
    if (foundedEvent) {
      const foundedDate = new Date(foundedEvent.date);
      const now = new Date();
      yearsActive = Math.floor(
        (now.getTime() - foundedDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
      );
    }

    const stats: BusinessTimelineStats = {
      totalEvents: userEvents.length,
      businessesFounded,
      businessesSold,
      investmentsMade,
      totalDealValue,
      averageDealSize: investmentsMade > 0 ? totalDealValue / investmentsMade : 0,
      yearsActive,
      industries: Object.entries(industries).map(([name, count]) => ({ name, count })),
      recentActivity: {
        lastEvent,
        eventsThisYear,
        eventsThisMonth,
      },
    };

    return stats;
  }

  /**
   * Create timeline event
   */
  async createEvent(
    userId: string,
    data: CreateTimelineEventRequest
  ): Promise<BusinessTimelineEvent> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const newEvent: BusinessTimelineEvent = {
      id: `event-${Date.now()}`,
      type: data.type,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      date: data.date,
      location: data.location,
      imageUrl: data.imageUrl,
      metadata: data.metadata,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.events.set(newEvent.id, newEvent);
    return { ...newEvent };
  }

  /**
   * Update timeline event
   */
  async updateEvent(
    userId: string,
    eventId: string,
    data: UpdateTimelineEventRequest
  ): Promise<BusinessTimelineEvent> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const existingEvent = this.events.get(eventId);
    if (!existingEvent) {
      throw new Error('Event not found');
    }

    const updatedEvent: BusinessTimelineEvent = {
      ...existingEvent,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.events.set(eventId, updatedEvent);
    return { ...updatedEvent };
  }

  /**
   * Delete timeline event
   */
  async deleteEvent(userId: string, eventId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const event = this.events.get(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    this.events.delete(eventId);
  }

  /**
   * Search timeline events
   */
  async searchEvents(
    userId: string,
    query: string,
    filters?: BusinessTimelineFilters
  ): Promise<BusinessTimelineResponse> {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Get all events for the user
    let filteredEvents = Array.from(this.events.values()).filter(event => event.id === userId);

    // Apply text search
    const searchTerm = query.toLowerCase();
    filteredEvents = filteredEvents.filter(
      event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.subtitle?.toLowerCase().includes(searchTerm) ||
        event.description?.toLowerCase().includes(searchTerm)
    );

    // Apply additional filters
    if (filters) {
      if (filters.types) {
        filteredEvents = filteredEvents.filter(event => filters.types!.includes(event.type));
      }
      if (filters.status) {
        filteredEvents = filteredEvents.filter(event => filters.status!.includes(event.status));
      }
      if (filters.dateRange) {
        filteredEvents = filteredEvents.filter(
          event => event.date >= filters.dateRange!.start && event.date <= filters.dateRange!.end
        );
      }
      if (filters.industries) {
        filteredEvents = filteredEvents.filter(
          event => event.metadata?.industry && filters.industries!.includes(event.metadata.industry)
        );
      }
    }

    // Sort by date (newest first)
    filteredEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination (default to first 10 events)
    const paginatedEvents = filteredEvents.slice(0, 10);

    return {
      events: paginatedEvents,
      stats: await this.getTimelineStats(userId),
      pagination: {
        page: 1,
        limit: 10,
        total: filteredEvents.length,
        hasMore: filteredEvents.length > 10,
      },
    };
  }

  /**
   * Get events by type
   */
  async getEventsByType(
    userId: string,
    type: BusinessTimelineEventType
  ): Promise<BusinessTimelineEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const events = Array.from(this.events.values())
      .filter(event => event.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return events;
  }

  /**
   * Upload event image
   */
  async uploadEventImage(
    userId: string,
    eventId: string,
    file: File
  ): Promise<{ imageUrl: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate image upload
    const imageUrl = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&t=${Date.now()}`;

    const event = this.events.get(eventId);
    if (event) {
      event.imageUrl = imageUrl;
      event.updatedAt = new Date().toISOString();
    }

    return { imageUrl };
  }

  /**
   * Export timeline data
   */
  async exportTimelineData(userId: string): Promise<{ data: string; filename: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const events = Array.from(this.events.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const exportData = {
      userId,
      exportDate: new Date().toISOString(),
      totalEvents: events.length,
      events: events.map(event => ({
        title: event.title,
        subtitle: event.subtitle,
        date: event.date,
        type: event.type,
        description: event.description,
        location: event.location,
      })),
    };

    return {
      data: JSON.stringify(exportData, null, 2),
      filename: `timeline-export-${userId}-${new Date().toISOString().split('T')[0]}.json`,
    };
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export const mockTimelineService = new MockTimelineService();
export default mockTimelineService;
