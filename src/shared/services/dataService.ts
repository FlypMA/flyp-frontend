import { User, UserType } from '../../../types/api/user';
import { IUserMetrics, IPlatformMetrics, IActiveUserData } from '../../../types/services/platform';
import apiClient from '../utils/APISendRequest';

class PlatformDataService {
  private static instance: PlatformDataService;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  }

  public static getInstance(): PlatformDataService {
    if (!PlatformDataService.instance) {
      PlatformDataService.instance = new PlatformDataService();
    }
    return PlatformDataService.instance;
  }

  async getUserMetrics(userId: string): Promise<IUserMetrics> {
    try {
      const response = await apiClient.get(`/api/users/${userId}/metrics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user metrics:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        newUsers: 0,
        userGrowth: 0,
      };
    }
  }

  async getPlatformMetrics(userId: string): Promise<IPlatformMetrics> {
    try {
      const response = await apiClient.get(`/api/platforms/${userId}/metrics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching platform metrics:', error);
      return {
        totalRevenue: 0,
        monthlyActiveUsers: 0,
        userEngagement: 0,
        conversionRate: 0,
      };
    }
  }

  async getActiveUsers(userId: string): Promise<IActiveUserData[]> {
    try {
      const response = await apiClient.get(`/api/platforms/${userId}/active-users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching active users:', error);
      return [];
    }
  }
}

export default PlatformDataService.getInstance();
