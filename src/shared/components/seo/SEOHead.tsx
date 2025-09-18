/**
 * SEO Head Component
 *
 * Provides SEO meta tags and structured data for pages.
 * Uses react-helmet for dynamic head management.
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { SEOProps } from '../../types/seo';

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  type = 'website',
  structuredData,
  canonical,
  openGraph,
  twitter,
  noIndex = false,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  twitterHandle,
  children,
}) => {
  // Generate canonical URL
  const canonicalUrl = canonical || url;

  // Generate Open Graph data
  const ogTitle = openGraph?.title || title;
  const ogDescription = openGraph?.description || description;
  const ogImage = openGraph?.image || image;
  const ogUrl = openGraph?.url || url;
  const ogType = openGraph?.type || type;

  // Generate Twitter data
  const twitterTitle = twitter?.title || title;
  const twitterDescription = twitter?.description || description;
  const twitterImage = twitter?.image || image;
  const twitterCard = twitter?.card || 'summary_large_image';
  const twitterCreator = twitter?.creator || twitterHandle;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* Article Meta */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}

      {children}
    </Helmet>
  );
};

export default SEOHead;
