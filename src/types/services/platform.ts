import { UserType } from '../api/user';

export interface IUserMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: number;
}

export interface IPlatformMetrics {
  totalRevenue: number;
  monthlyActiveUsers: number;
  userEngagement: number;
  conversionRate: number;
}

interface IMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

interface IUserActivityMetrics {
  total: number;
  unique: number;
}

export interface IActiveUserData {
  userId: string;
  lastActive: Date;
  sessionDuration: number;
  actions: string[];
}
