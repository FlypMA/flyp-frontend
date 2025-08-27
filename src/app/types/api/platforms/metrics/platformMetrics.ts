import { PlatformUserActivityMetric } from './platformUserActivity';

export type PlatformMetrics = {
  platformId: string;
  lastActive: Date;
  metrics: {
    activeToday: PlatformUserActivityMetric;
    activePast7Days: PlatformUserActivityMetric;
    activePast30Days: PlatformUserActivityMetric;
  };
};
