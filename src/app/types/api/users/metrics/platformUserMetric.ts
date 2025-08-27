import { UserMetricTimeframe } from './userMetricTimeframe';

export interface PlatformUserMetric {
  platformId: string;
  lastActive: Date;
  platform_visitDurations: UserMetricTimeframe[];
  platform_views: UserMetricTimeframe[];
  platform_experiencePoints: number;
  platform_userLevel: number;
}
