/**
 * User roles in the system
 */
export declare enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SELLER = 'seller',
  BUYER = 'buyer',
}
/**
 * Business listing status lifecycle
 */
export declare enum ListingStatus {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  SOLD = 'sold',
}
/**
 * Buyer inquiry status to sellers
 */
export declare enum InquiryStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}
/**
 * Conversation status between buyers and sellers
 */
export declare enum ConversationStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  COMPLETED = 'completed',
}
/**
 * Message types in conversations
 */
export declare enum MessageType {
  TEXT = 'text',
  DOCUMENT = 'document',
  SYSTEM = 'system',
}
/**
 * Document access levels
 */
export declare enum DocumentAccessLevel {
  PUBLIC = 'public',
  NDA_REQUIRED = 'nda_required',
  PRIVATE = 'private',
}
/**
 * Subscription status
 */
export declare enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
  UNPAID = 'unpaid',
}
/**
 * Payment status
 */
export declare enum PaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}
/**
 * API response status
 */
export declare enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}
/**
 * HTTP status codes commonly used
 */
export declare enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
/**
 * Sort directions
 */
export declare enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
/**
 * Notification types
 */
export declare enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}
/**
 * Currency codes (ISO 4217)
 */
export declare enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  JPY = 'JPY',
  CNY = 'CNY',
}
/**
 * Business sectors/industries
 */
export declare enum BusinessSector {
  TECHNOLOGY = 'technology',
  HEALTHCARE = 'healthcare',
  FINANCE = 'finance',
  RETAIL = 'retail',
  MANUFACTURING = 'manufacturing',
  REAL_ESTATE = 'real_estate',
  HOSPITALITY = 'hospitality',
  EDUCATION = 'education',
  ENERGY = 'energy',
  AGRICULTURE = 'agriculture',
  TRANSPORTATION = 'transportation',
  CONSULTING = 'consulting',
  MEDIA = 'media',
  CONSTRUCTION = 'construction',
  OTHER = 'other',
}
/**
 * Countries (partial list - common ones)
 */
export declare enum CountryCode {
  US = 'US',
  CA = 'CA',
  GB = 'GB',
  DE = 'DE',
  FR = 'FR',
  IT = 'IT',
  ES = 'ES',
  NL = 'NL',
  CH = 'CH',
  AU = 'AU',
  SG = 'SG',
  HK = 'HK',
  JP = 'JP',
  KR = 'KR',
  IN = 'IN',
  BR = 'BR',
  MX = 'MX',
  OTHER = 'OTHER',
}
/**
 * Languages (ISO 639-1)
 */
export declare enum LanguageCode {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  DE = 'de',
  IT = 'it',
  PT = 'pt',
  NL = 'nl',
  RU = 'ru',
  ZH = 'zh',
  JA = 'ja',
  KO = 'ko',
  AR = 'ar',
}
/**
 * File/Document types
 */
export declare enum DocumentType {
  FINANCIAL_STATEMENT = 'financial_statement',
  BUSINESS_PLAN = 'business_plan',
  LEGAL_DOCUMENT = 'legal_document',
  DUE_DILIGENCE = 'due_diligence',
  PRESENTATION = 'presentation',
  CONTRACT = 'contract',
  CERTIFICATE = 'certificate',
  OTHER = 'other',
}
/**
 * Business valuation methods
 */
export declare enum ValuationMethod {
  REVENUE_MULTIPLE = 'revenue_multiple',
  EBITDA_MULTIPLE = 'ebitda_multiple',
  ASSET_BASED = 'asset_based',
  DCF = 'dcf',
  COMPARABLE_SALES = 'comparable_sales',
  OTHER = 'other',
}
