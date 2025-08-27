export type WebSocketMessageType =
  | 'connection'
  | 'auth'
  | 'chat'
  | 'notification'
  | 'status'
  | 'error'
  | 'section_update'
  | 'progress_update';

export interface WebSocketPayload {
  auth?: {
    token: string;
    userId: string;
  };
  chat?: {
    messageId: string;
    content: string;
    timestamp: string;
  };
  notification?: {
    id: string;
    type: string;
    message: string;
    metadata: Record<string, unknown>;
  };
  status?: {
    code: number;
    message: string;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  section_update?: {
    id: string;
    title: string;
    content: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    progress: number;
  };
  progress_update?: {
    progress: number;
    message?: string;
  };
}

export interface WebSocketMessage {
  type: WebSocketMessageType;
  payload: WebSocketPayload;
  timestamp: Date;
  userId?: string;
}
