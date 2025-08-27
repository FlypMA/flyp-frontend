export type UserType = 'seller' | 'buyer' | 'admin';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  language: string;
  timezone: string;
}

export interface User {
  _id: string;
  ethAddress?: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  rank: number;
  userPreferences: UserPreferences;
  userType: UserType;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  platformId?: string;
}

export interface AuthCheckResponse {
  isAuthenticated: boolean;
  user?: User;
  error?: string;
}

export interface UserMetrics {
  _id: string;
  platformExperiencePoints: number;
  total_experiencePoints: number;
  total_userLevel: number;
}
