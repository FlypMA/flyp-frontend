export interface UserPreferences {
  enableDataCollection: boolean;
  eventCollection: 'view events only' | 'interaction events only' | 'all events';
  tabOption: 'all tabs' | 'this tab only';
}

export enum UserType {
  Default = 'default',
  Seller = 'seller',
  Buyer = 'buyer',
  Business = 'business',
  Admin = 'admin',
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
