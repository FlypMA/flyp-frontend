import React from 'react';
import { Helmet } from 'react-helmet';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  image?: string;
  url?: string;
  twitterHandle?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

// Workaround for react-helmet React 18 compatibility
const HelmetComponent = Helmet as any;

const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  author = 'betweendeals.com',
  type = 'website',
  image = '/og-image.png',
  url,
  twitterHandle = '@betweendeals',
  publishedTime,
  modifiedTime,
  noIndex = false,
  canonicalUrl,
  structuredData,
}) => {
  // Default values
  const defaultTitle = 'betweendeals.com | Pan-European SME M&A Platform';
  const defaultDescription =
    'The #1 multilingual platform for confidential SME business sales and cross-border deal discovery. Connect vetted buyers with quality businesses across Europe.';
  const defaultKeywords =
    'SME, M&A, business sales, mergers and acquisitions, business marketplace, company sales, business broker, sell business, buy business, European SME, cross-border deals, confidential transactions, business valuation, due diligence, SME marketplace';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalUrl =
    url || (typeof window !== 'undefined' ? window.location.href : 'https://www.betweendeals.com');
  const finalCanonicalUrl = canonicalUrl || finalUrl;

  // Generate full title with brand suffix for non-home pages
  const fullTitle =
    title && !title.includes('betweendeals') ? `${title} | betweendeals.com` : finalTitle;

  return (
    <>
      <HelmetComponent>
        {/* Basic meta tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={finalKeywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
        <meta name="theme-color" content="#000000" />

        {/* Canonical URL */}
        <link rel="canonical" href={finalCanonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={finalUrl} />
        <meta property="og:site_name" content="betweendeals" />
        <meta property="og:locale" content="en_US" />

        {publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={twitterHandle} />
        <meta name="twitter:creator" content={twitterHandle} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={finalDescription} />
        <meta name="twitter:image" content={image} />

        {/* Additional SEO tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </HelmetComponent>

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  );
};

export default SEOHead;
