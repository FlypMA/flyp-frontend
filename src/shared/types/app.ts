export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  appName: string;
  version: string;
  features: {
    chat: boolean;
    analytics: boolean;
    billing: boolean;
    teamCollaboration: boolean;
  };
  limits: {
    maxTeamMembers: number;
    maxProjects: number;
    maxApiCalls: number;
  };
  integrations: {
    stripe: boolean;
    googleAnalytics: boolean;
    slack: boolean;
  };
}
