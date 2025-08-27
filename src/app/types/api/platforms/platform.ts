export interface Platform {
  lastActive: any;
  platform_userLevel: number;
  _id: string;
  name: string;
  url: {
    base_url: string;
    subdomain?: string;
    tld?: string;
  };
  favIconUrl?: string;
  type: string;
  similarDomains?: string[];
  company?: {
    name?: string;
    city?: string;
    countryCode?: string;
    tags?: string[];
  };
}
