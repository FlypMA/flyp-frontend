export enum ActivityType {
  View = 'view',
  Leave = 'leave',
  Video = 'video',
  Audio = 'audio',
}

// Define the Event interface
export interface Event {
  _id: string;
  userId: string;
  platformId: string;
  url: string;
  activity: ActivityType;
  description: string;
  metadata?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
