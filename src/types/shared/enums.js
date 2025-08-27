'use strict';
// =============================================================================
// SYSTEM ENUMERATIONS
// =============================================================================
// All enum types used throughout the BetweenDeals platform
// =============================================================================
Object.defineProperty(exports, '__esModule', { value: true });
exports.ValuationMethod =
  exports.DocumentType =
  exports.LanguageCode =
  exports.CountryCode =
  exports.BusinessSector =
  exports.CurrencyCode =
  exports.NotificationType =
  exports.SortDirection =
  exports.HttpStatusCode =
  exports.ApiStatus =
  exports.PaymentStatus =
  exports.SubscriptionStatus =
  exports.DocumentAccessLevel =
  exports.MessageType =
  exports.ConversationStatus =
  exports.InquiryStatus =
  exports.ListingStatus =
  exports.UserRole =
    void 0;
/**
 * User roles in the system
 */
var UserRole;
(function (UserRole) {
  UserRole['ADMIN'] = 'admin';
  UserRole['MODERATOR'] = 'moderator';
  UserRole['SELLER'] = 'seller';
  UserRole['BUYER'] = 'buyer';
})(UserRole || (exports.UserRole = UserRole = {}));
/**
 * Business listing status lifecycle
 */
var ListingStatus;
(function (ListingStatus) {
  ListingStatus['DRAFT'] = 'draft';
  ListingStatus['UNDER_REVIEW'] = 'under_review';
  ListingStatus['PUBLISHED'] = 'published';
  ListingStatus['ARCHIVED'] = 'archived';
  ListingStatus['SOLD'] = 'sold';
})(ListingStatus || (exports.ListingStatus = ListingStatus = {}));
/**
 * Buyer inquiry status to sellers
 */
var InquiryStatus;
(function (InquiryStatus) {
  InquiryStatus['PENDING'] = 'pending';
  InquiryStatus['ACCEPTED'] = 'accepted';
  InquiryStatus['REJECTED'] = 'rejected';
  InquiryStatus['WITHDRAWN'] = 'withdrawn';
})(InquiryStatus || (exports.InquiryStatus = InquiryStatus = {}));
/**
 * Conversation status between buyers and sellers
 */
var ConversationStatus;
(function (ConversationStatus) {
  ConversationStatus['ACTIVE'] = 'active';
  ConversationStatus['ARCHIVED'] = 'archived';
  ConversationStatus['COMPLETED'] = 'completed';
})(ConversationStatus || (exports.ConversationStatus = ConversationStatus = {}));
/**
 * Message types in conversations
 */
var MessageType;
(function (MessageType) {
  MessageType['TEXT'] = 'text';
  MessageType['DOCUMENT'] = 'document';
  MessageType['SYSTEM'] = 'system';
})(MessageType || (exports.MessageType = MessageType = {}));
/**
 * Document access levels
 */
var DocumentAccessLevel;
(function (DocumentAccessLevel) {
  DocumentAccessLevel['PUBLIC'] = 'public';
  DocumentAccessLevel['NDA_REQUIRED'] = 'nda_required';
  DocumentAccessLevel['PRIVATE'] = 'private';
})(DocumentAccessLevel || (exports.DocumentAccessLevel = DocumentAccessLevel = {}));
/**
 * Subscription status
 */
var SubscriptionStatus;
(function (SubscriptionStatus) {
  SubscriptionStatus['ACTIVE'] = 'active';
  SubscriptionStatus['CANCELLED'] = 'cancelled';
  SubscriptionStatus['PAST_DUE'] = 'past_due';
  SubscriptionStatus['UNPAID'] = 'unpaid';
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
/**
 * Payment status
 */
var PaymentStatus;
(function (PaymentStatus) {
  PaymentStatus['PENDING'] = 'pending';
  PaymentStatus['SUCCEEDED'] = 'succeeded';
  PaymentStatus['FAILED'] = 'failed';
  PaymentStatus['CANCELLED'] = 'cancelled';
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
/**
 * API response status
 */
var ApiStatus;
(function (ApiStatus) {
  ApiStatus['SUCCESS'] = 'success';
  ApiStatus['ERROR'] = 'error';
  ApiStatus['WARNING'] = 'warning';
})(ApiStatus || (exports.ApiStatus = ApiStatus = {}));
/**
 * HTTP status codes commonly used
 */
var HttpStatusCode;
(function (HttpStatusCode) {
  HttpStatusCode[(HttpStatusCode['OK'] = 200)] = 'OK';
  HttpStatusCode[(HttpStatusCode['CREATED'] = 201)] = 'CREATED';
  HttpStatusCode[(HttpStatusCode['NO_CONTENT'] = 204)] = 'NO_CONTENT';
  HttpStatusCode[(HttpStatusCode['BAD_REQUEST'] = 400)] = 'BAD_REQUEST';
  HttpStatusCode[(HttpStatusCode['UNAUTHORIZED'] = 401)] = 'UNAUTHORIZED';
  HttpStatusCode[(HttpStatusCode['FORBIDDEN'] = 403)] = 'FORBIDDEN';
  HttpStatusCode[(HttpStatusCode['NOT_FOUND'] = 404)] = 'NOT_FOUND';
  HttpStatusCode[(HttpStatusCode['CONFLICT'] = 409)] = 'CONFLICT';
  HttpStatusCode[(HttpStatusCode['UNPROCESSABLE_ENTITY'] = 422)] = 'UNPROCESSABLE_ENTITY';
  HttpStatusCode[(HttpStatusCode['INTERNAL_SERVER_ERROR'] = 500)] = 'INTERNAL_SERVER_ERROR';
  HttpStatusCode[(HttpStatusCode['SERVICE_UNAVAILABLE'] = 503)] = 'SERVICE_UNAVAILABLE';
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
/**
 * Sort directions
 */
var SortDirection;
(function (SortDirection) {
  SortDirection['ASC'] = 'ASC';
  SortDirection['DESC'] = 'DESC';
})(SortDirection || (exports.SortDirection = SortDirection = {}));
/**
 * Notification types
 */
var NotificationType;
(function (NotificationType) {
  NotificationType['INFO'] = 'info';
  NotificationType['SUCCESS'] = 'success';
  NotificationType['WARNING'] = 'warning';
  NotificationType['ERROR'] = 'error';
})(NotificationType || (exports.NotificationType = NotificationType = {}));
/**
 * Currency codes (ISO 4217)
 */
var CurrencyCode;
(function (CurrencyCode) {
  CurrencyCode['USD'] = 'USD';
  CurrencyCode['EUR'] = 'EUR';
  CurrencyCode['GBP'] = 'GBP';
  CurrencyCode['CAD'] = 'CAD';
  CurrencyCode['AUD'] = 'AUD';
  CurrencyCode['CHF'] = 'CHF';
  CurrencyCode['JPY'] = 'JPY';
  CurrencyCode['CNY'] = 'CNY';
})(CurrencyCode || (exports.CurrencyCode = CurrencyCode = {}));
/**
 * Business sectors/industries
 */
var BusinessSector;
(function (BusinessSector) {
  BusinessSector['TECHNOLOGY'] = 'technology';
  BusinessSector['HEALTHCARE'] = 'healthcare';
  BusinessSector['FINANCE'] = 'finance';
  BusinessSector['RETAIL'] = 'retail';
  BusinessSector['MANUFACTURING'] = 'manufacturing';
  BusinessSector['REAL_ESTATE'] = 'real_estate';
  BusinessSector['HOSPITALITY'] = 'hospitality';
  BusinessSector['EDUCATION'] = 'education';
  BusinessSector['ENERGY'] = 'energy';
  BusinessSector['AGRICULTURE'] = 'agriculture';
  BusinessSector['TRANSPORTATION'] = 'transportation';
  BusinessSector['CONSULTING'] = 'consulting';
  BusinessSector['MEDIA'] = 'media';
  BusinessSector['CONSTRUCTION'] = 'construction';
  BusinessSector['OTHER'] = 'other';
})(BusinessSector || (exports.BusinessSector = BusinessSector = {}));
/**
 * Countries (partial list - common ones)
 */
var CountryCode;
(function (CountryCode) {
  CountryCode['US'] = 'US';
  CountryCode['CA'] = 'CA';
  CountryCode['GB'] = 'GB';
  CountryCode['DE'] = 'DE';
  CountryCode['FR'] = 'FR';
  CountryCode['IT'] = 'IT';
  CountryCode['ES'] = 'ES';
  CountryCode['NL'] = 'NL';
  CountryCode['CH'] = 'CH';
  CountryCode['AU'] = 'AU';
  CountryCode['SG'] = 'SG';
  CountryCode['HK'] = 'HK';
  CountryCode['JP'] = 'JP';
  CountryCode['KR'] = 'KR';
  CountryCode['IN'] = 'IN';
  CountryCode['BR'] = 'BR';
  CountryCode['MX'] = 'MX';
  CountryCode['OTHER'] = 'OTHER';
})(CountryCode || (exports.CountryCode = CountryCode = {}));
/**
 * Languages (ISO 639-1)
 */
var LanguageCode;
(function (LanguageCode) {
  LanguageCode['EN'] = 'en';
  LanguageCode['ES'] = 'es';
  LanguageCode['FR'] = 'fr';
  LanguageCode['DE'] = 'de';
  LanguageCode['IT'] = 'it';
  LanguageCode['PT'] = 'pt';
  LanguageCode['NL'] = 'nl';
  LanguageCode['RU'] = 'ru';
  LanguageCode['ZH'] = 'zh';
  LanguageCode['JA'] = 'ja';
  LanguageCode['KO'] = 'ko';
  LanguageCode['AR'] = 'ar';
})(LanguageCode || (exports.LanguageCode = LanguageCode = {}));
/**
 * File/Document types
 */
var DocumentType;
(function (DocumentType) {
  DocumentType['FINANCIAL_STATEMENT'] = 'financial_statement';
  DocumentType['BUSINESS_PLAN'] = 'business_plan';
  DocumentType['LEGAL_DOCUMENT'] = 'legal_document';
  DocumentType['DUE_DILIGENCE'] = 'due_diligence';
  DocumentType['PRESENTATION'] = 'presentation';
  DocumentType['CONTRACT'] = 'contract';
  DocumentType['CERTIFICATE'] = 'certificate';
  DocumentType['OTHER'] = 'other';
})(DocumentType || (exports.DocumentType = DocumentType = {}));
/**
 * Business valuation methods
 */
var ValuationMethod;
(function (ValuationMethod) {
  ValuationMethod['REVENUE_MULTIPLE'] = 'revenue_multiple';
  ValuationMethod['EBITDA_MULTIPLE'] = 'ebitda_multiple';
  ValuationMethod['ASSET_BASED'] = 'asset_based';
  ValuationMethod['DCF'] = 'dcf';
  ValuationMethod['COMPARABLE_SALES'] = 'comparable_sales';
  ValuationMethod['OTHER'] = 'other';
})(ValuationMethod || (exports.ValuationMethod = ValuationMethod = {}));
