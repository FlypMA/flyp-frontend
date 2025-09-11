// 🔌 API Types
// Location: src/types/api/index.ts
// Purpose: API-specific type definitions

// Re-export shared types for backward compatibility
export * from '../shared';

// Chat/Messaging Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  type: 'user' | 'assistant';
}

export interface ChatResponse {
  message: ChatMessage;
  context?: any;
}

// Payment/Billing Types
export interface PaymentMetadata {
  orderId?: string;
  userId?: string;
  planId?: string;
  amount?: number;
  currency?: string;
}

// User Types (API specific)
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserType;
  phone?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserType = 'buyer' | 'seller' | 'admin';
