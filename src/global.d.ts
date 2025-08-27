// global.d.ts

interface BetweendealsPluginUser {
  id: string;
  email: string;
  name?: string;
  role: 'seller' | 'buyer' | 'broker' | 'admin';
  preferences?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

interface BetweendealsPluginContentData {
  id: string;
  type: 'listing' | 'inquiry' | 'offer' | 'document';
  platform: 'web' | 'mobile' | 'api';
  url: string;
  title?: string;
  description?: string;
  metrics: {
    views?: number;
    inquiries?: number;
    offers?: number;
    favorites?: number;
  };
  metadata: Record<string, unknown>;
  createdAt: string;
}

interface BetweendealsPlugin {
  version: string;
  isActive: boolean;
  domains: string[];
  user?: BetweendealsPluginUser;
  contentData?: BetweendealsPluginContentData[];
}

interface DataLayerEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

interface Window {
  dataLayer: DataLayerEvent[];
  betweendealsPlugin?: BetweendealsPlugin;
  myExtensionVariable?: {
    isInstalled: boolean;
    version: string;
    settings: Record<string, unknown>;
  };
  chrome?: {
    runtime: {
      id: string;
      getManifest(): Record<string, unknown>;
      sendMessage(message: unknown): void;
      onMessage: {
        addListener(callback: (message: unknown) => void): void;
        removeListener(callback: (message: unknown) => void): void;
      };
    };
    storage: {
      local: {
        get(keys: string[]): Promise<Record<string, unknown>>;
        set(items: Record<string, unknown>): Promise<void>;
      };
    };
  };
}
