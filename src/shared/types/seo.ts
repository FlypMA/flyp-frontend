/**
 * SEO Types and Interfaces
 *
 * Centralized SEO type definitions for the UpSwitch platform.
 * Used across components, pages, and utilities for consistent SEO handling.
 */

export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  structuredData?: Record<string, any>;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
  };
  noIndex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  url?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
}

export interface SEOValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  suggestions: string[];
}

export interface SEOData {
  [key: string]: SEOProps;
}
