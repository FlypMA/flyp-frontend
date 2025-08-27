'use strict';
// =============================================================================
// VALIDATION SCHEMAS
// =============================================================================
// Zod schemas for runtime validation of API requests and responses
// =============================================================================
Object.defineProperty(exports, '__esModule', { value: true });
exports.adminUpdateUserSchema =
  exports.adminUserListSchema =
  exports.createPaymentSchema =
  exports.createSubscriptionSchema =
  exports.updateBuyerProfileSchema =
  exports.createSavedSearchSchema =
  exports.uploadDocumentSchema =
  exports.sendMessageSchema =
  exports.createConversationSchema =
  exports.respondToInquirySchema =
  exports.createInquirySchema =
  exports.listingSearchSchema =
  exports.updateListingSchema =
  exports.createListingSchema =
  exports.listingTranslationSchema =
  exports.listingFinancialsSchema =
  exports.updateOrganizationSchema =
  exports.createOrganizationSchema =
  exports.updateUserProfileSchema =
  exports.userPreferencesSchema =
  exports.changePasswordSchema =
  exports.registerSchema =
  exports.loginSchema =
  exports.baseQuerySchema =
  exports.sortSchema =
  exports.paginationSchema =
  exports.businessSectorSchema =
  exports.languageCodeSchema =
  exports.countryCodeSchema =
  exports.currencyCodeSchema =
  exports.messageTypeSchema =
  exports.conversationStatusSchema =
  exports.inquiryStatusSchema =
  exports.listingStatusSchema =
  exports.userRoleSchema =
  exports.nonNegativeNumberSchema =
  exports.positiveNumberSchema =
  exports.dateStringSchema =
  exports.urlSchema =
  exports.phoneSchema =
  exports.emailSchema =
  exports.uuidSchema =
    void 0;
exports.validateData = validateData;
exports.validateDataAsync = validateDataAsync;
const zod_1 = require('zod');
const enums_1 = require('./enums');
// =============================================================================
// UTILITY SCHEMAS
// =============================================================================
exports.uuidSchema = zod_1.z.string().uuid();
exports.emailSchema = zod_1.z.string().email();
exports.phoneSchema = zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/);
exports.urlSchema = zod_1.z.string().url();
exports.dateStringSchema = zod_1.z.string().datetime();
exports.positiveNumberSchema = zod_1.z.number().positive();
exports.nonNegativeNumberSchema = zod_1.z.number().min(0);
// =============================================================================
// ENUM SCHEMAS
// =============================================================================
exports.userRoleSchema = zod_1.z.nativeEnum(enums_1.UserRole);
exports.listingStatusSchema = zod_1.z.nativeEnum(enums_1.ListingStatus);
exports.inquiryStatusSchema = zod_1.z.nativeEnum(enums_1.InquiryStatus);
exports.conversationStatusSchema = zod_1.z.nativeEnum(enums_1.ConversationStatus);
exports.messageTypeSchema = zod_1.z.nativeEnum(enums_1.MessageType);
exports.currencyCodeSchema = zod_1.z.nativeEnum(enums_1.CurrencyCode);
exports.countryCodeSchema = zod_1.z.nativeEnum(enums_1.CountryCode);
exports.languageCodeSchema = zod_1.z.nativeEnum(enums_1.LanguageCode);
exports.businessSectorSchema = zod_1.z.nativeEnum(enums_1.BusinessSector);
// =============================================================================
// PAGINATION & QUERY SCHEMAS
// =============================================================================
exports.paginationSchema = zod_1.z.object({
  page: zod_1.z.number().int().min(1).default(1),
  limit: zod_1.z.number().int().min(1).max(100).default(20),
  offset: zod_1.z.number().int().min(0).optional(),
});
exports.sortSchema = zod_1.z.object({
  sortBy: zod_1.z.string().optional(),
  sortDirection: zod_1.z.enum(['ASC', 'DESC']).default('DESC'),
  orderBy: zod_1.z.string().optional(),
  orderDirection: zod_1.z.enum(['ASC', 'DESC']).optional(),
});
exports.baseQuerySchema = exports.paginationSchema.merge(exports.sortSchema).extend({
  search: zod_1.z.string().optional(),
  filter: zod_1.z.record(zod_1.z.any()).optional(),
});
// =============================================================================
// AUTHENTICATION SCHEMAS
// =============================================================================
exports.loginSchema = zod_1.z.object({
  email: exports.emailSchema,
  password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
  remember_me: zod_1.z.boolean().optional(),
});
exports.registerSchema = zod_1.z.object({
  email: exports.emailSchema,
  password: zod_1.z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain lowercase, uppercase, and number'
    ),
  name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
  role: exports.userRoleSchema,
  locale: exports.languageCodeSchema.optional(),
  first_name: zod_1.z.string().min(1).optional(),
  last_name: zod_1.z.string().min(1).optional(),
  phone_number: exports.phoneSchema.optional(),
  terms_accepted: zod_1.z.literal(true, {
    errorMap: () => ({ message: 'Terms must be accepted' }),
  }),
  marketing_consent: zod_1.z.boolean().optional(),
});
exports.changePasswordSchema = zod_1.z.object({
  current_password: zod_1.z.string().min(1, 'Current password is required'),
  new_password: zod_1.z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain lowercase, uppercase, and number'
    ),
});
// =============================================================================
// USER SCHEMAS
// =============================================================================
exports.userPreferencesSchema = zod_1.z
  .object({
    language: exports.languageCodeSchema.optional(),
    timezone: zod_1.z.string().optional(),
    email_notifications: zod_1.z.boolean().optional(),
    marketing_emails: zod_1.z.boolean().optional(),
    currency: exports.currencyCodeSchema.optional(),
    theme: zod_1.z.enum(['light', 'dark', 'system']).optional(),
  })
  .passthrough(); // Allow additional fields
exports.updateUserProfileSchema = zod_1.z.object({
  name: zod_1.z.string().min(2).optional(),
  first_name: zod_1.z.string().min(1).optional(),
  last_name: zod_1.z.string().min(1).optional(),
  phone_number: exports.phoneSchema.optional(),
  locale: exports.languageCodeSchema.optional(),
  preferences: exports.userPreferencesSchema.optional(),
  avatar_url: exports.urlSchema.optional(),
});
// =============================================================================
// ORGANIZATION SCHEMAS
// =============================================================================
exports.createOrganizationSchema = zod_1.z.object({
  name: zod_1.z.string().min(2, 'Organization name must be at least 2 characters'),
  business_type: zod_1.z.string().optional(),
  registration_number: zod_1.z.string().optional(),
  tax_id: zod_1.z.string().optional(),
  country: exports.countryCodeSchema,
  region: zod_1.z.string().optional(),
  city: zod_1.z.string().optional(),
  website: exports.urlSchema.optional(),
  description: zod_1.z.string().optional(),
  contact_info: zod_1.z.record(zod_1.z.any()).optional(),
});
exports.updateOrganizationSchema = exports.createOrganizationSchema.partial();
// =============================================================================
// LISTING SCHEMAS
// =============================================================================
exports.listingFinancialsSchema = zod_1.z
  .object({
    revenue_min: exports.positiveNumberSchema.optional(),
    revenue_max: exports.positiveNumberSchema.optional(),
    revenue_currency: exports.currencyCodeSchema,
    ebitda_min: zod_1.z.number().optional(),
    ebitda_max: zod_1.z.number().optional(),
    ebitda_margin: zod_1.z.number().min(0).max(100).optional(),
    revenue_growth_rate: zod_1.z.number().optional(),
    profit_growth_rate: zod_1.z.number().optional(),
    financial_year: zod_1.z.number().int().min(2000).max(new Date().getFullYear()).optional(),
    years_in_business: zod_1.z.number().int().min(0).optional(),
    assets_value: exports.nonNegativeNumberSchema.optional(),
    liabilities_value: exports.nonNegativeNumberSchema.optional(),
    inventory_value: exports.nonNegativeNumberSchema.optional(),
  })
  .refine(
    data => {
      if (data.revenue_min && data.revenue_max) {
        return data.revenue_min <= data.revenue_max;
      }
      return true;
    },
    { message: 'Revenue minimum must be less than or equal to maximum' }
  );
exports.listingTranslationSchema = zod_1.z.object({
  locale: exports.languageCodeSchema,
  title: zod_1.z.string().min(10, 'Title must be at least 10 characters'),
  description: zod_1.z.string().min(50, 'Description must be at least 50 characters'),
  summary: zod_1.z.string().optional(),
  highlights: zod_1.z.array(zod_1.z.string()).optional(),
  reason_for_sale_details: zod_1.z.string().optional(),
});
exports.createListingSchema = zod_1.z.object({
  organization_id: exports.uuidSchema,
  // Basic information
  sector: exports.businessSectorSchema,
  country: exports.countryCodeSchema,
  region: zod_1.z.string().optional(),
  city: zod_1.z.string().optional(),
  // Listing configuration
  anonymous: zod_1.z.boolean().default(false),
  requires_nda: zod_1.z.boolean().default(false),
  featured: zod_1.z.boolean().default(false),
  // Financial information
  asking_price: exports.positiveNumberSchema.optional(),
  currency: exports.currencyCodeSchema,
  price_negotiable: zod_1.z.boolean().default(true),
  // Timing
  reason_for_sale: zod_1.z.string().optional(),
  preferred_timeline: zod_1.z.string().optional(),
  expires_at: exports.dateStringSchema.optional(),
  // Content
  translations: zod_1.z
    .array(exports.listingTranslationSchema)
    .min(1, 'At least one translation is required'),
  financials: exports.listingFinancialsSchema.optional(),
});
exports.updateListingSchema = exports.createListingSchema.partial().extend({
  status: exports.listingStatusSchema.optional(),
});
exports.listingSearchSchema = exports.baseQuerySchema
  .extend({
    country: exports.countryCodeSchema.optional(),
    region: zod_1.z.string().optional(),
    sector: exports.businessSectorSchema.optional(),
    revenueMin: exports.positiveNumberSchema.optional(),
    revenueMax: exports.positiveNumberSchema.optional(),
    askingPriceMin: exports.positiveNumberSchema.optional(),
    askingPriceMax: exports.positiveNumberSchema.optional(),
    anonymous: zod_1.z.boolean().optional(),
    requiresNda: zod_1.z.boolean().optional(),
    featured: zod_1.z.boolean().optional(),
    status: exports.listingStatusSchema.optional(),
    locale: exports.languageCodeSchema.optional(),
    yearsInBusinessMin: zod_1.z.number().int().min(0).optional(),
    yearsInBusinessMax: zod_1.z.number().int().min(0).optional(),
    searchQuery: zod_1.z.string().optional(),
  })
  .refine(
    data => {
      if (data.revenueMin && data.revenueMax) {
        return data.revenueMin <= data.revenueMax;
      }
      return true;
    },
    { message: 'Revenue minimum must be less than or equal to maximum' }
  );
// =============================================================================
// INQUIRY SCHEMAS
// =============================================================================
exports.createInquirySchema = zod_1.z.object({
  listing_id: exports.uuidSchema,
  message: zod_1.z.string().min(20, 'Message must be at least 20 characters'),
  buyer_background: zod_1.z.string().optional(),
  intended_use: zod_1.z.string().optional(),
  financing_confirmed: zod_1.z.boolean(),
  nda_required: zod_1.z.boolean().optional(),
});
exports.respondToInquirySchema = zod_1.z
  .object({
    status: exports.inquiryStatusSchema,
    seller_response: zod_1.z.string().min(10).optional(),
    nda_required: zod_1.z.boolean().optional(),
  })
  .refine(
    data => {
      if (
        data.status === enums_1.InquiryStatus.ACCEPTED ||
        data.status === enums_1.InquiryStatus.REJECTED
      ) {
        return data.seller_response && data.seller_response.length >= 10;
      }
      return true;
    },
    { message: 'Seller response is required when accepting or rejecting' }
  );
// =============================================================================
// CONVERSATION & MESSAGE SCHEMAS
// =============================================================================
exports.createConversationSchema = zod_1.z.object({
  inquiry_id: exports.uuidSchema,
  subject: zod_1.z.string().optional(),
  initial_message: zod_1.z.string().min(10).optional(),
});
exports.sendMessageSchema = zod_1.z.object({
  content: zod_1.z.string().min(1, 'Message content is required'),
  message_type: exports.messageTypeSchema.default(enums_1.MessageType.TEXT),
  reply_to_id: exports.uuidSchema.optional(),
  attachments: zod_1.z.array(exports.uuidSchema).optional(),
});
// =============================================================================
// DOCUMENT SCHEMAS
// =============================================================================
exports.uploadDocumentSchema = zod_1.z.object({
  listing_id: exports.uuidSchema,
  filename: zod_1.z.string().min(1, 'Filename is required'),
  file_size: exports.positiveNumberSchema,
  mime_type: zod_1.z.string().min(1, 'MIME type is required'),
  document_type: zod_1.z.string().optional(),
  category: zod_1.z.string().optional(),
  description: zod_1.z.string().optional(),
  access_level: zod_1.z.enum(['public', 'nda_required', 'private']),
  password_protected: zod_1.z.boolean().default(false),
});
// =============================================================================
// SEARCH & PROFILE SCHEMAS
// =============================================================================
exports.createSavedSearchSchema = zod_1.z.object({
  name: zod_1.z.string().min(3, 'Search name must be at least 3 characters'),
  search_criteria: zod_1.z.record(zod_1.z.any()),
  alert_enabled: zod_1.z.boolean().default(false),
  alert_frequency: zod_1.z.enum(['daily', 'weekly', 'monthly']).optional(),
});
exports.updateBuyerProfileSchema = zod_1.z
  .object({
    target_sectors: zod_1.z.array(exports.businessSectorSchema).optional(),
    target_countries: zod_1.z.array(exports.countryCodeSchema).optional(),
    target_regions: zod_1.z.array(zod_1.z.string()).optional(),
    budget_min: exports.positiveNumberSchema.optional(),
    budget_max: exports.positiveNumberSchema.optional(),
    budget_currency: exports.currencyCodeSchema.optional(),
    preferred_business_age_min: zod_1.z.number().int().min(0).optional(),
    preferred_business_age_max: zod_1.z.number().int().min(0).optional(),
    preferred_employee_count_min: zod_1.z.number().int().min(0).optional(),
    preferred_employee_count_max: zod_1.z.number().int().min(0).optional(),
    investment_timeline: zod_1.z.string().optional(),
    involvement_level: zod_1.z.enum(['hands_off', 'advisory', 'active', 'full_time']).optional(),
    experience_level: zod_1.z.enum(['first_time', 'experienced', 'serial']).optional(),
    risk_tolerance: zod_1.z.enum(['low', 'medium', 'high']).optional(),
    contact_preferences: zod_1.z.record(zod_1.z.any()).optional(),
  })
  .refine(
    data => {
      if (data.budget_min && data.budget_max) {
        return data.budget_min <= data.budget_max;
      }
      return true;
    },
    { message: 'Budget minimum must be less than or equal to maximum' }
  );
// =============================================================================
// BILLING SCHEMAS
// =============================================================================
exports.createSubscriptionSchema = zod_1.z.object({
  plan_id: exports.uuidSchema,
  billing_period: zod_1.z.enum(['monthly', 'yearly']),
  payment_method_id: zod_1.z.string().min(1, 'Payment method is required'),
});
exports.createPaymentSchema = zod_1.z.object({
  amount: exports.positiveNumberSchema,
  currency: exports.currencyCodeSchema,
  purpose: zod_1.z.string().min(1, 'Payment purpose is required'),
  description: zod_1.z.string().optional(),
  payment_method_id: zod_1.z.string().min(1, 'Payment method is required'),
  listing_id: exports.uuidSchema.optional(),
});
// =============================================================================
// ADMIN SCHEMAS
// =============================================================================
exports.adminUserListSchema = exports.baseQuerySchema.extend({
  role: exports.userRoleSchema.optional(),
  email_verified: zod_1.z.boolean().optional(),
  business_verified: zod_1.z.boolean().optional(),
  is_active: zod_1.z.boolean().optional(),
  created_after: exports.dateStringSchema.optional(),
  created_before: exports.dateStringSchema.optional(),
});
exports.adminUpdateUserSchema = zod_1.z.object({
  role: exports.userRoleSchema.optional(),
  email_verified: zod_1.z.boolean().optional(),
  business_verified: zod_1.z.boolean().optional(),
  is_active: zod_1.z.boolean().optional(),
  preferences: exports.userPreferencesSchema.optional(),
});
function validateData(schema, data) {
  try {
    const result = schema.parse(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof zod_1.z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        })),
      };
    }
    return {
      success: false,
      errors: [
        {
          field: 'unknown',
          message: 'Validation failed',
          code: 'unknown',
        },
      ],
    };
  }
}
function validateDataAsync(schema, data) {
  return Promise.resolve(validateData(schema, data));
}
