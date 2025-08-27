import {
  User,
  Organization,
  Listing,
  ListingTranslation,
  ListingFinancials,
  ListingAnalytics,
  Inquiry,
  Conversation,
  Message,
  Document,
  DocumentAccess,
  BuyerProfile,
  SavedSearch,
  NDARecord,
  Subscription,
  SubscriptionPlan,
  Payment,
} from './entities';
import { ApiResponse, PaginationInfo, ActivityItem, TimeSeriesData } from './api';
export interface AuthResponse
  extends ApiResponse<{
    user: User;
    token: string;
    refreshToken: string;
    expires_in: number;
  }> {}
export interface RefreshTokenResponse
  extends ApiResponse<{
    token: string;
    expires_in: number;
  }> {}
export interface ProfileResponse extends ApiResponse<User> {}
export interface UserListResponse extends ApiResponse<User[]> {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface UserOrganizationsResponse
  extends ApiResponse<
    Array<{
      role: string;
      permissions: string[];
      created_at: string;
      organization: Organization;
    }>
  > {}
export interface OrganizationResponse extends ApiResponse<Organization> {}
export interface OrganizationListResponse extends ApiResponse<Organization[]> {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface ListingResponse
  extends ApiResponse<
    Listing & {
      translations?: ListingTranslation[];
      financials?: ListingFinancials;
      analytics?: ListingAnalytics;
      organization?: Organization;
    }
  > {}
export interface ListingListResponse
  extends ApiResponse<
    Array<
      Listing & {
        translations?: ListingTranslation[];
        financials?: ListingFinancials;
        analytics?: ListingAnalytics;
        organization?: Organization;
      }
    >
  > {
  meta: {
    pagination: PaginationInfo;
    total: number;
    filters_applied?: Record<string, any>;
  };
}
export interface ListingStatsResponse
  extends ApiResponse<{
    total_listings: number;
    published_listings: number;
    draft_listings: number;
    sold_listings: number;
    total_views: number;
    total_inquiries: number;
    avg_price: number;
    sectors: Array<{
      sector: string;
      count: number;
      avg_price?: number;
    }>;
    countries: Array<{
      country: string;
      count: number;
    }>;
  }> {}
export interface InquiryResponse
  extends ApiResponse<
    Inquiry & {
      listing?: Listing;
      buyer?: User;
      seller?: User;
    }
  > {}
export interface InquiryListResponse
  extends ApiResponse<
    Array<
      Inquiry & {
        listing?: Listing;
        buyer?: User;
        seller?: User;
      }
    >
  > {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface ConversationResponse
  extends ApiResponse<
    Conversation & {
      inquiry?: Inquiry;
      listing?: Listing;
      buyer?: User;
      seller?: User;
      recent_messages?: Message[];
    }
  > {}
export interface ConversationListResponse
  extends ApiResponse<
    Array<
      Conversation & {
        inquiry?: Inquiry;
        listing?: Listing;
        buyer?: User;
        seller?: User;
        recent_messages?: Message[];
      }
    >
  > {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface MessageResponse
  extends ApiResponse<
    Message & {
      sender?: User;
    }
  > {}
export interface MessageListResponse
  extends ApiResponse<
    Array<
      Message & {
        sender?: User;
      }
    >
  > {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface DocumentResponse
  extends ApiResponse<
    Document & {
      uploader?: User;
      access_grants?: DocumentAccess[];
    }
  > {}
export interface DocumentListResponse
  extends ApiResponse<
    Array<
      Document & {
        uploader?: User;
        access_count?: number;
      }
    >
  > {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface DocumentUploadResponse
  extends ApiResponse<{
    document: Document;
    upload_url?: string;
    upload_fields?: Record<string, string>;
  }> {}
export interface DocumentDownloadResponse
  extends ApiResponse<{
    download_url: string;
    expires_at: string;
    watermarked?: boolean;
  }> {}
export interface BuyerProfileResponse extends ApiResponse<BuyerProfile> {}
export interface SavedSearchResponse extends ApiResponse<SavedSearch> {}
export interface SavedSearchListResponse extends ApiResponse<SavedSearch[]> {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface SearchSuggestionsResponse
  extends ApiResponse<{
    suggestions: Array<{
      type: 'sector' | 'location' | 'keyword';
      value: string;
      count: number;
    }>;
  }> {}
export interface NDAResponse extends ApiResponse<NDARecord> {}
export interface NDATemplateResponse
  extends ApiResponse<{
    template_id: string;
    content: string;
    version: string;
    fields: Array<{
      name: string;
      type: 'text' | 'date' | 'signature';
      required: boolean;
    }>;
  }> {}
export interface SubscriptionPlanListResponse extends ApiResponse<SubscriptionPlan[]> {}
export interface SubscriptionResponse
  extends ApiResponse<
    Subscription & {
      plan?: SubscriptionPlan;
    }
  > {}
export interface PaymentResponse extends ApiResponse<Payment> {}
export interface PaymentListResponse extends ApiResponse<Payment[]> {
  meta: {
    pagination: PaginationInfo;
    total: number;
    total_amount?: number;
  };
}
export interface CheckoutSessionResponse
  extends ApiResponse<{
    session_id: string;
    checkout_url: string;
    expires_at: string;
  }> {}
export interface BillingPortalResponse
  extends ApiResponse<{
    portal_url: string;
    expires_at: string;
  }> {}
export interface AnalyticsOverviewResponse
  extends ApiResponse<{
    period: string;
    metrics: {
      listings: {
        total: number;
        published: number;
        sold: number;
        views: number;
      };
      inquiries: {
        total: number;
        accepted: number;
        pending: number;
      };
      conversations: {
        active: number;
        completed: number;
        total_messages: number;
      };
      users: {
        total: number;
        sellers: number;
        buyers: number;
        verified: number;
      };
    };
    trends: {
      listings: TimeSeriesData;
      inquiries: TimeSeriesData;
      users: TimeSeriesData;
    };
  }> {}
export interface ListingAnalyticsResponse
  extends ApiResponse<{
    listing_id: string;
    period: string;
    metrics: {
      views: TimeSeriesData;
      inquiries: TimeSeriesData;
      saves: TimeSeriesData;
      shares: TimeSeriesData;
    };
    demographics: {
      countries: Array<{
        country: string;
        count: number;
        percentage: number;
      }>;
      sectors: Array<{
        sector: string;
        count: number;
        percentage: number;
      }>;
    };
    performance: {
      completion_score: number;
      quality_score: number;
      engagement_rate: number;
      conversion_rate: number;
    };
  }> {}
export interface ActivityFeedResponse extends ApiResponse<ActivityItem[]> {
  meta: {
    pagination: PaginationInfo;
    total: number;
  };
}
export interface NotificationListResponse
  extends ApiResponse<
    Array<{
      id: string;
      type: string;
      title: string;
      message: string;
      data?: any;
      read: boolean;
      created_at: string;
    }>
  > {
  meta: {
    pagination: PaginationInfo;
    total: number;
    unread_count: number;
  };
}
export interface HealthCheckResponse
  extends ApiResponse<{
    status: 'healthy' | 'unhealthy' | 'degraded';
    timestamp: string;
    uptime: number;
    version: string;
    environment: string;
    services: {
      database: 'healthy' | 'unhealthy';
      redis?: 'healthy' | 'unhealthy';
      storage?: 'healthy' | 'unhealthy';
      email?: 'healthy' | 'unhealthy';
    };
    metrics?: {
      memory_usage?: number;
      cpu_usage?: number;
      active_connections?: number;
    };
  }> {}
export interface SystemInfoResponse
  extends ApiResponse<{
    version: string;
    environment: string;
    build_time: string;
    features: string[];
    maintenance_mode: boolean;
    announcement?: string;
  }> {}
export interface DeleteResponse
  extends ApiResponse<{
    deleted: boolean;
    id: string;
  }> {}
export interface BulkDeleteResponse
  extends ApiResponse<{
    deleted_count: number;
    failed_count: number;
    deleted_ids: string[];
    failed_ids: Array<{
      id: string;
      error: string;
    }>;
  }> {}
export interface ExportResponse
  extends ApiResponse<{
    export_id: string;
    download_url?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    expires_at?: string;
    file_size?: number;
    record_count?: number;
  }> {}
export interface ValidationErrorResponse extends ApiResponse<never> {
  success: false;
  error: string;
  details: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}
export interface AuthErrorResponse extends ApiResponse<never> {
  success: false;
  error: string;
  code: 'INVALID_CREDENTIALS' | 'ACCOUNT_LOCKED' | 'TOKEN_EXPIRED' | 'INSUFFICIENT_PERMISSIONS';
}
export interface RateLimitErrorResponse extends ApiResponse<never> {
  success: false;
  error: string;
  retry_after: number;
  limit: number;
  remaining: number;
  reset_time: string;
}
