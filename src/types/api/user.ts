// 👤 User API Types
// Location: src/types/api/user.ts
// Purpose: User-specific API types

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserType;
  phone?: string;
  company?: string;
  verified: boolean;
  avatar?: string;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export type UserType = 'buyer' | 'seller' | 'broker' | 'admin';

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
  };
  language: string;
  timezone: string;
}
