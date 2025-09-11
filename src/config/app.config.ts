interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  appName: string;
  version: string;
}

const config: AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  environment: (import.meta.env.MODE as AppConfig['environment']) || 'development',
  appName: 'Flyp Platform',
  version: '1.0.0',
};

export default config;
