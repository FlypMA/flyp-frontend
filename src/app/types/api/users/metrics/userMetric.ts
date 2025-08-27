import { PlatformUserMetric } from './platformUserMetric';
import { UserMetricTimeframe } from './userMetricTimeframe';

export interface UserMetric {
  userId: string;
  ethAddress?: string;
  rank: number;
  lastActive: Date;
  total_durations: UserMetricTimeframe[];
  total_views: UserMetricTimeframe[];
  total_experiencePoints: number;
  total_userLevel: number;
  platforms: PlatformUserMetric[];
}
