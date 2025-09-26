/**
 * Business Timeline Types
 * Inspired by Airbnb's travel timeline but for business activities
 */

export interface BusinessTimelineEvent {
  id: string;
  type: BusinessTimelineEventType;
  title: string;
  subtitle: string;
  date: string;
  imageUrl?: string;
  description?: string;
  location?: string;
  status: BusinessTimelineEventStatus;
  metadata?: BusinessTimelineMetadata;
  createdAt: string;
  updatedAt: string;
}

export type BusinessTimelineEventType =
  | 'business_founded'
  | 'business_acquired'
  | 'business_sold'
  | 'investment_made'
  | 'investment_exited'
  | 'partnership_formed'
  | 'board_position'
  | 'advisory_role'
  | 'funding_raised'
  | 'merger_completed'
  | 'ipo_completed'
  | 'business_closed'
  | 'award_received'
  | 'certification_earned'
  | 'business_milestone'
  | 'platform_joined'
  | 'deal_completed'
  | 'valuation_received';

export type BusinessTimelineEventStatus =
  | 'active'
  | 'completed'
  | 'ongoing'
  | 'cancelled'
  | 'pending';

export interface BusinessTimelineMetadata {
  // Business-specific metadata
  businessId?: string;
  businessName?: string;
  industry?: string;
  revenue?: number;
  employees?: number;
  valuation?: number;

  // Investment-specific metadata
  investmentAmount?: number;
  equityPercentage?: number;
  exitValue?: number;
  irr?: number;

  // Deal-specific metadata
  dealSize?: number;
  dealType?: string;
  buyerName?: string;
  sellerName?: string;

  // Award/Certification metadata
  issuer?: string;
  category?: string;
  level?: string;

  // General metadata
  tags?: string[];
  links?: Array<{
    title: string;
    url: string;
    type: 'website' | 'news' | 'linkedin' | 'crunchbase' | 'other';
  }>;
}

export interface BusinessTimelineFilters {
  types?: BusinessTimelineEventType[];
  status?: BusinessTimelineEventStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  industries?: string[];
  tags?: string[];
}

export interface BusinessTimelineStats {
  totalEvents: number;
  businessesFounded: number;
  businessesSold: number;
  investmentsMade: number;
  totalDealValue: number;
  averageDealSize: number;
  yearsActive: number;
  industries: Array<{
    name: string;
    count: number;
  }>;
  recentActivity: {
    lastEvent: BusinessTimelineEvent | null;
    eventsThisYear: number;
    eventsThisMonth: number;
  };
}

export interface BusinessTimelineResponse {
  events: BusinessTimelineEvent[];
  stats: BusinessTimelineStats;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface CreateTimelineEventRequest {
  type: BusinessTimelineEventType;
  title: string;
  subtitle: string;
  date: string;
  imageUrl?: string;
  description?: string;
  location?: string;
  metadata?: BusinessTimelineMetadata;
}

export interface UpdateTimelineEventRequest extends Partial<CreateTimelineEventRequest> {
  id: string;
}

// Timeline display configuration
export interface TimelineDisplayConfig {
  showImages: boolean;
  showDescriptions: boolean;
  showMetadata: boolean;
  groupByYear: boolean;
  maxEventsPerPage: number;
  sortOrder: 'asc' | 'desc';
}

// Event type display configuration
export interface EventTypeConfig {
  type: BusinessTimelineEventType;
  label: string;
  icon: string;
  color: string;
  defaultImage?: string;
  description: string;
}

export const EVENT_TYPE_CONFIGS: EventTypeConfig[] = [
  {
    type: 'business_founded',
    label: 'Business Founded',
    icon: '🚀',
    color: '#10B981',
    description: 'Started a new business venture',
  },
  {
    type: 'business_acquired',
    label: 'Business Acquired',
    icon: '🏢',
    color: '#3B82F6',
    description: 'Acquired another business',
  },
  {
    type: 'business_sold',
    label: 'Business Sold',
    icon: '💰',
    color: '#F59E0B',
    description: 'Sold a business',
  },
  {
    type: 'investment_made',
    label: 'Investment Made',
    icon: '💼',
    color: '#8B5CF6',
    description: 'Made an investment in a business',
  },
  {
    type: 'investment_exited',
    label: 'Investment Exited',
    icon: '📈',
    color: '#EF4444',
    description: 'Exited an investment',
  },
  {
    type: 'partnership_formed',
    label: 'Partnership Formed',
    icon: '🤝',
    color: '#06B6D4',
    description: 'Formed a business partnership',
  },
  {
    type: 'board_position',
    label: 'Board Position',
    icon: '👔',
    color: '#84CC16',
    description: 'Joined a board of directors',
  },
  {
    type: 'advisory_role',
    label: 'Advisory Role',
    icon: '🎯',
    color: '#F97316',
    description: 'Took on an advisory role',
  },
  {
    type: 'funding_raised',
    label: 'Funding Raised',
    icon: '💵',
    color: '#EC4899',
    description: 'Raised funding for a business',
  },
  {
    type: 'merger_completed',
    label: 'Merger Completed',
    icon: '🔗',
    color: '#6366F1',
    description: 'Completed a business merger',
  },
  {
    type: 'ipo_completed',
    label: 'IPO Completed',
    icon: '📊',
    color: '#14B8A6',
    description: 'Completed an initial public offering',
  },
  {
    type: 'business_closed',
    label: 'Business Closed',
    icon: '🔒',
    color: '#6B7280',
    description: 'Closed a business',
  },
  {
    type: 'award_received',
    label: 'Award Received',
    icon: '🏆',
    color: '#F59E0B',
    description: 'Received a business award',
  },
  {
    type: 'certification_earned',
    label: 'Certification Earned',
    icon: '📜',
    color: '#10B981',
    description: 'Earned a professional certification',
  },
  {
    type: 'platform_joined',
    label: 'Platform Joined',
    icon: '🌐',
    color: '#3B82F6',
    description: 'Joined Flyp platform',
  },
  {
    type: 'deal_completed',
    label: 'Deal Completed',
    icon: '✅',
    color: '#10B981',
    description: 'Completed a deal on Flyp',
  },
  {
    type: 'valuation_received',
    label: 'Valuation Received',
    icon: '📊',
    color: '#8B5CF6',
    description: 'Received a business valuation',
  },
];
