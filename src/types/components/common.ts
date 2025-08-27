export interface MenuItem {
  text: string;
  onClick: () => void;
}

export interface ContainerProps {
  children: React.ReactNode;
  variant?: 'xl' | 'md' | 'sm';
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: Record<string, any>;
}
