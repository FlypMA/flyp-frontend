import { z } from 'zod';
import {
  UserRole,
  ListingStatus,
  InquiryStatus,
  ConversationStatus,
  MessageType,
  CurrencyCode,
  CountryCode,
  LanguageCode,
  BusinessSector,
} from './enums';
export declare const uuidSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const phoneSchema: z.ZodString;
export declare const urlSchema: z.ZodString;
export declare const dateStringSchema: z.ZodString;
export declare const positiveNumberSchema: z.ZodNumber;
export declare const nonNegativeNumberSchema: z.ZodNumber;
export declare const userRoleSchema: z.ZodNativeEnum<typeof UserRole>;
export declare const listingStatusSchema: z.ZodNativeEnum<typeof ListingStatus>;
export declare const inquiryStatusSchema: z.ZodNativeEnum<typeof InquiryStatus>;
export declare const conversationStatusSchema: z.ZodNativeEnum<typeof ConversationStatus>;
export declare const messageTypeSchema: z.ZodNativeEnum<typeof MessageType>;
export declare const currencyCodeSchema: z.ZodNativeEnum<typeof CurrencyCode>;
export declare const countryCodeSchema: z.ZodNativeEnum<typeof CountryCode>;
export declare const languageCodeSchema: z.ZodNativeEnum<typeof LanguageCode>;
export declare const businessSectorSchema: z.ZodNativeEnum<typeof BusinessSector>;
export declare const paginationSchema: z.ZodObject<
  {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
  },
  'strip',
  z.ZodTypeAny,
  {
    page: number;
    limit: number;
    offset?: number | undefined;
  },
  {
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
  }
>;
export declare const sortSchema: z.ZodObject<
  {
    sortBy: z.ZodOptional<z.ZodString>;
    sortDirection: z.ZodDefault<z.ZodEnum<['ASC', 'DESC']>>;
    orderBy: z.ZodOptional<z.ZodString>;
    orderDirection: z.ZodOptional<z.ZodEnum<['ASC', 'DESC']>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    sortDirection: 'ASC' | 'DESC';
    sortBy?: string | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  },
  {
    sortBy?: string | undefined;
    sortDirection?: 'ASC' | 'DESC' | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  }
>;
export declare const baseQuerySchema: z.ZodObject<
  {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
  } & {
    sortBy: z.ZodOptional<z.ZodString>;
    sortDirection: z.ZodDefault<z.ZodEnum<['ASC', 'DESC']>>;
    orderBy: z.ZodOptional<z.ZodString>;
    orderDirection: z.ZodOptional<z.ZodEnum<['ASC', 'DESC']>>;
  } & {
    search: z.ZodOptional<z.ZodString>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    page: number;
    limit: number;
    sortDirection: 'ASC' | 'DESC';
    search?: string | undefined;
    filter?: Record<string, any> | undefined;
    offset?: number | undefined;
    sortBy?: string | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  },
  {
    search?: string | undefined;
    filter?: Record<string, any> | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sortBy?: string | undefined;
    sortDirection?: 'ASC' | 'DESC' | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  }
>;
export declare const loginSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
    remember_me: z.ZodOptional<z.ZodBoolean>;
  },
  'strip',
  z.ZodTypeAny,
  {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
  },
  {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
  }
>;
export declare const registerSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRole>;
    locale: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
    first_name: z.ZodOptional<z.ZodString>;
    last_name: z.ZodOptional<z.ZodString>;
    phone_number: z.ZodOptional<z.ZodString>;
    terms_accepted: z.ZodLiteral<true>;
    marketing_consent: z.ZodOptional<z.ZodBoolean>;
  },
  'strip',
  z.ZodTypeAny,
  {
    email: string;
    password: string;
    role: UserRole;
    name: string;
    terms_accepted: true;
    locale?: LanguageCode | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    phone_number?: string | undefined;
    marketing_consent?: boolean | undefined;
  },
  {
    email: string;
    password: string;
    role: UserRole;
    name: string;
    terms_accepted: true;
    locale?: LanguageCode | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    phone_number?: string | undefined;
    marketing_consent?: boolean | undefined;
  }
>;
export declare const changePasswordSchema: z.ZodObject<
  {
    current_password: z.ZodString;
    new_password: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    current_password: string;
    new_password: string;
  },
  {
    current_password: string;
    new_password: string;
  }
>;
export declare const userPreferencesSchema: z.ZodObject<
  {
    language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
    timezone: z.ZodOptional<z.ZodString>;
    email_notifications: z.ZodOptional<z.ZodBoolean>;
    marketing_emails: z.ZodOptional<z.ZodBoolean>;
    currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
    theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
  },
  'passthrough',
  z.ZodTypeAny,
  z.objectOutputType<
    {
      language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
      timezone: z.ZodOptional<z.ZodString>;
      email_notifications: z.ZodOptional<z.ZodBoolean>;
      marketing_emails: z.ZodOptional<z.ZodBoolean>;
      currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
      theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
    },
    z.ZodTypeAny,
    'passthrough'
  >,
  z.objectInputType<
    {
      language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
      timezone: z.ZodOptional<z.ZodString>;
      email_notifications: z.ZodOptional<z.ZodBoolean>;
      marketing_emails: z.ZodOptional<z.ZodBoolean>;
      currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
      theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
    },
    z.ZodTypeAny,
    'passthrough'
  >
>;
export declare const updateUserProfileSchema: z.ZodObject<
  {
    name: z.ZodOptional<z.ZodString>;
    first_name: z.ZodOptional<z.ZodString>;
    last_name: z.ZodOptional<z.ZodString>;
    phone_number: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
    preferences: z.ZodOptional<
      z.ZodObject<
        {
          language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
          timezone: z.ZodOptional<z.ZodString>;
          email_notifications: z.ZodOptional<z.ZodBoolean>;
          marketing_emails: z.ZodOptional<z.ZodBoolean>;
          currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
          theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
        },
        'passthrough',
        z.ZodTypeAny,
        z.objectOutputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >,
        z.objectInputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >
      >
    >;
    avatar_url: z.ZodOptional<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    locale?: LanguageCode | undefined;
    name?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    phone_number?: string | undefined;
    preferences?:
      | z.objectOutputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >
      | undefined;
    avatar_url?: string | undefined;
  },
  {
    locale?: LanguageCode | undefined;
    name?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    phone_number?: string | undefined;
    preferences?:
      | z.objectInputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >
      | undefined;
    avatar_url?: string | undefined;
  }
>;
export declare const createOrganizationSchema: z.ZodObject<
  {
    name: z.ZodString;
    business_type: z.ZodOptional<z.ZodString>;
    registration_number: z.ZodOptional<z.ZodString>;
    tax_id: z.ZodOptional<z.ZodString>;
    country: z.ZodNativeEnum<typeof CountryCode>;
    region: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    contact_info: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    country: CountryCode;
    name: string;
    region?: string | undefined;
    business_type?: string | undefined;
    registration_number?: string | undefined;
    tax_id?: string | undefined;
    city?: string | undefined;
    website?: string | undefined;
    description?: string | undefined;
    contact_info?: Record<string, any> | undefined;
  },
  {
    country: CountryCode;
    name: string;
    region?: string | undefined;
    business_type?: string | undefined;
    registration_number?: string | undefined;
    tax_id?: string | undefined;
    city?: string | undefined;
    website?: string | undefined;
    description?: string | undefined;
    contact_info?: Record<string, any> | undefined;
  }
>;
export declare const updateOrganizationSchema: z.ZodObject<
  {
    name: z.ZodOptional<z.ZodString>;
    business_type: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    registration_number: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tax_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    country: z.ZodOptional<z.ZodNativeEnum<typeof CountryCode>>;
    region: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    website: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    contact_info: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    country?: CountryCode | undefined;
    region?: string | undefined;
    name?: string | undefined;
    business_type?: string | undefined;
    registration_number?: string | undefined;
    tax_id?: string | undefined;
    city?: string | undefined;
    website?: string | undefined;
    description?: string | undefined;
    contact_info?: Record<string, any> | undefined;
  },
  {
    country?: CountryCode | undefined;
    region?: string | undefined;
    name?: string | undefined;
    business_type?: string | undefined;
    registration_number?: string | undefined;
    tax_id?: string | undefined;
    city?: string | undefined;
    website?: string | undefined;
    description?: string | undefined;
    contact_info?: Record<string, any> | undefined;
  }
>;
export declare const listingFinancialsSchema: z.ZodEffects<
  z.ZodObject<
    {
      revenue_min: z.ZodOptional<z.ZodNumber>;
      revenue_max: z.ZodOptional<z.ZodNumber>;
      revenue_currency: z.ZodNativeEnum<typeof CurrencyCode>;
      ebitda_min: z.ZodOptional<z.ZodNumber>;
      ebitda_max: z.ZodOptional<z.ZodNumber>;
      ebitda_margin: z.ZodOptional<z.ZodNumber>;
      revenue_growth_rate: z.ZodOptional<z.ZodNumber>;
      profit_growth_rate: z.ZodOptional<z.ZodNumber>;
      financial_year: z.ZodOptional<z.ZodNumber>;
      years_in_business: z.ZodOptional<z.ZodNumber>;
      assets_value: z.ZodOptional<z.ZodNumber>;
      liabilities_value: z.ZodOptional<z.ZodNumber>;
      inventory_value: z.ZodOptional<z.ZodNumber>;
    },
    'strip',
    z.ZodTypeAny,
    {
      revenue_currency: CurrencyCode;
      revenue_min?: number | undefined;
      revenue_max?: number | undefined;
      ebitda_min?: number | undefined;
      ebitda_max?: number | undefined;
      ebitda_margin?: number | undefined;
      revenue_growth_rate?: number | undefined;
      profit_growth_rate?: number | undefined;
      financial_year?: number | undefined;
      years_in_business?: number | undefined;
      assets_value?: number | undefined;
      liabilities_value?: number | undefined;
      inventory_value?: number | undefined;
    },
    {
      revenue_currency: CurrencyCode;
      revenue_min?: number | undefined;
      revenue_max?: number | undefined;
      ebitda_min?: number | undefined;
      ebitda_max?: number | undefined;
      ebitda_margin?: number | undefined;
      revenue_growth_rate?: number | undefined;
      profit_growth_rate?: number | undefined;
      financial_year?: number | undefined;
      years_in_business?: number | undefined;
      assets_value?: number | undefined;
      liabilities_value?: number | undefined;
      inventory_value?: number | undefined;
    }
  >,
  {
    revenue_currency: CurrencyCode;
    revenue_min?: number | undefined;
    revenue_max?: number | undefined;
    ebitda_min?: number | undefined;
    ebitda_max?: number | undefined;
    ebitda_margin?: number | undefined;
    revenue_growth_rate?: number | undefined;
    profit_growth_rate?: number | undefined;
    financial_year?: number | undefined;
    years_in_business?: number | undefined;
    assets_value?: number | undefined;
    liabilities_value?: number | undefined;
    inventory_value?: number | undefined;
  },
  {
    revenue_currency: CurrencyCode;
    revenue_min?: number | undefined;
    revenue_max?: number | undefined;
    ebitda_min?: number | undefined;
    ebitda_max?: number | undefined;
    ebitda_margin?: number | undefined;
    revenue_growth_rate?: number | undefined;
    profit_growth_rate?: number | undefined;
    financial_year?: number | undefined;
    years_in_business?: number | undefined;
    assets_value?: number | undefined;
    liabilities_value?: number | undefined;
    inventory_value?: number | undefined;
  }
>;
export declare const listingTranslationSchema: z.ZodObject<
  {
    locale: z.ZodNativeEnum<typeof LanguageCode>;
    title: z.ZodString;
    description: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    highlights: z.ZodOptional<z.ZodArray<z.ZodString, 'many'>>;
    reason_for_sale_details: z.ZodOptional<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    locale: LanguageCode;
    title: string;
    description: string;
    summary?: string | undefined;
    highlights?: string[] | undefined;
    reason_for_sale_details?: string | undefined;
  },
  {
    locale: LanguageCode;
    title: string;
    description: string;
    summary?: string | undefined;
    highlights?: string[] | undefined;
    reason_for_sale_details?: string | undefined;
  }
>;
export declare const createListingSchema: z.ZodObject<
  {
    organization_id: z.ZodString;
    sector: z.ZodNativeEnum<typeof BusinessSector>;
    country: z.ZodNativeEnum<typeof CountryCode>;
    region: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    anonymous: z.ZodDefault<z.ZodBoolean>;
    requires_nda: z.ZodDefault<z.ZodBoolean>;
    featured: z.ZodDefault<z.ZodBoolean>;
    asking_price: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodNativeEnum<typeof CurrencyCode>;
    price_negotiable: z.ZodDefault<z.ZodBoolean>;
    reason_for_sale: z.ZodOptional<z.ZodString>;
    preferred_timeline: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodString>;
    translations: z.ZodArray<
      z.ZodObject<
        {
          locale: z.ZodNativeEnum<typeof LanguageCode>;
          title: z.ZodString;
          description: z.ZodString;
          summary: z.ZodOptional<z.ZodString>;
          highlights: z.ZodOptional<z.ZodArray<z.ZodString, 'many'>>;
          reason_for_sale_details: z.ZodOptional<z.ZodString>;
        },
        'strip',
        z.ZodTypeAny,
        {
          locale: LanguageCode;
          title: string;
          description: string;
          summary?: string | undefined;
          highlights?: string[] | undefined;
          reason_for_sale_details?: string | undefined;
        },
        {
          locale: LanguageCode;
          title: string;
          description: string;
          summary?: string | undefined;
          highlights?: string[] | undefined;
          reason_for_sale_details?: string | undefined;
        }
      >,
      'many'
    >;
    financials: z.ZodOptional<
      z.ZodEffects<
        z.ZodObject<
          {
            revenue_min: z.ZodOptional<z.ZodNumber>;
            revenue_max: z.ZodOptional<z.ZodNumber>;
            revenue_currency: z.ZodNativeEnum<typeof CurrencyCode>;
            ebitda_min: z.ZodOptional<z.ZodNumber>;
            ebitda_max: z.ZodOptional<z.ZodNumber>;
            ebitda_margin: z.ZodOptional<z.ZodNumber>;
            revenue_growth_rate: z.ZodOptional<z.ZodNumber>;
            profit_growth_rate: z.ZodOptional<z.ZodNumber>;
            financial_year: z.ZodOptional<z.ZodNumber>;
            years_in_business: z.ZodOptional<z.ZodNumber>;
            assets_value: z.ZodOptional<z.ZodNumber>;
            liabilities_value: z.ZodOptional<z.ZodNumber>;
            inventory_value: z.ZodOptional<z.ZodNumber>;
          },
          'strip',
          z.ZodTypeAny,
          {
            revenue_currency: CurrencyCode;
            revenue_min?: number | undefined;
            revenue_max?: number | undefined;
            ebitda_min?: number | undefined;
            ebitda_max?: number | undefined;
            ebitda_margin?: number | undefined;
            revenue_growth_rate?: number | undefined;
            profit_growth_rate?: number | undefined;
            financial_year?: number | undefined;
            years_in_business?: number | undefined;
            assets_value?: number | undefined;
            liabilities_value?: number | undefined;
            inventory_value?: number | undefined;
          },
          {
            revenue_currency: CurrencyCode;
            revenue_min?: number | undefined;
            revenue_max?: number | undefined;
            ebitda_min?: number | undefined;
            ebitda_max?: number | undefined;
            ebitda_margin?: number | undefined;
            revenue_growth_rate?: number | undefined;
            profit_growth_rate?: number | undefined;
            financial_year?: number | undefined;
            years_in_business?: number | undefined;
            assets_value?: number | undefined;
            liabilities_value?: number | undefined;
            inventory_value?: number | undefined;
          }
        >,
        {
          revenue_currency: CurrencyCode;
          revenue_min?: number | undefined;
          revenue_max?: number | undefined;
          ebitda_min?: number | undefined;
          ebitda_max?: number | undefined;
          ebitda_margin?: number | undefined;
          revenue_growth_rate?: number | undefined;
          profit_growth_rate?: number | undefined;
          financial_year?: number | undefined;
          years_in_business?: number | undefined;
          assets_value?: number | undefined;
          liabilities_value?: number | undefined;
          inventory_value?: number | undefined;
        },
        {
          revenue_currency: CurrencyCode;
          revenue_min?: number | undefined;
          revenue_max?: number | undefined;
          ebitda_min?: number | undefined;
          ebitda_max?: number | undefined;
          ebitda_margin?: number | undefined;
          revenue_growth_rate?: number | undefined;
          profit_growth_rate?: number | undefined;
          financial_year?: number | undefined;
          years_in_business?: number | undefined;
          assets_value?: number | undefined;
          liabilities_value?: number | undefined;
          inventory_value?: number | undefined;
        }
      >
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    country: CountryCode;
    sector: BusinessSector;
    anonymous: boolean;
    featured: boolean;
    currency: CurrencyCode;
    organization_id: string;
    requires_nda: boolean;
    price_negotiable: boolean;
    translations: {
      locale: LanguageCode;
      title: string;
      description: string;
      summary?: string | undefined;
      highlights?: string[] | undefined;
      reason_for_sale_details?: string | undefined;
    }[];
    region?: string | undefined;
    city?: string | undefined;
    asking_price?: number | undefined;
    reason_for_sale?: string | undefined;
    preferred_timeline?: string | undefined;
    expires_at?: string | undefined;
    financials?:
      | {
          revenue_currency: CurrencyCode;
          revenue_min?: number | undefined;
          revenue_max?: number | undefined;
          ebitda_min?: number | undefined;
          ebitda_max?: number | undefined;
          ebitda_margin?: number | undefined;
          revenue_growth_rate?: number | undefined;
          profit_growth_rate?: number | undefined;
          financial_year?: number | undefined;
          years_in_business?: number | undefined;
          assets_value?: number | undefined;
          liabilities_value?: number | undefined;
          inventory_value?: number | undefined;
        }
      | undefined;
  },
  {
    country: CountryCode;
    sector: BusinessSector;
    currency: CurrencyCode;
    organization_id: string;
    translations: {
      locale: LanguageCode;
      title: string;
      description: string;
      summary?: string | undefined;
      highlights?: string[] | undefined;
      reason_for_sale_details?: string | undefined;
    }[];
    region?: string | undefined;
    anonymous?: boolean | undefined;
    featured?: boolean | undefined;
    city?: string | undefined;
    requires_nda?: boolean | undefined;
    asking_price?: number | undefined;
    price_negotiable?: boolean | undefined;
    reason_for_sale?: string | undefined;
    preferred_timeline?: string | undefined;
    expires_at?: string | undefined;
    financials?:
      | {
          revenue_currency: CurrencyCode;
          revenue_min?: number | undefined;
          revenue_max?: number | undefined;
          ebitda_min?: number | undefined;
          ebitda_max?: number | undefined;
          ebitda_margin?: number | undefined;
          revenue_growth_rate?: number | undefined;
          profit_growth_rate?: number | undefined;
          financial_year?: number | undefined;
          years_in_business?: number | undefined;
          assets_value?: number | undefined;
          liabilities_value?: number | undefined;
          inventory_value?: number | undefined;
        }
      | undefined;
  }
>;
export declare const updateListingSchema: z.ZodObject<
  {
    organization_id: z.ZodOptional<z.ZodString>;
    sector: z.ZodOptional<z.ZodNativeEnum<typeof BusinessSector>>;
    country: z.ZodOptional<z.ZodNativeEnum<typeof CountryCode>>;
    region: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    anonymous: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    requires_nda: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    featured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    asking_price: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
    price_negotiable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    reason_for_sale: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    preferred_timeline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    expires_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    translations: z.ZodOptional<
      z.ZodArray<
        z.ZodObject<
          {
            locale: z.ZodNativeEnum<typeof LanguageCode>;
            title: z.ZodString;
            description: z.ZodString;
            summary: z.ZodOptional<z.ZodString>;
            highlights: z.ZodOptional<z.ZodArray<z.ZodString, 'many'>>;
            reason_for_sale_details: z.ZodOptional<z.ZodString>;
          },
          'strip',
          z.ZodTypeAny,
          {
            locale: LanguageCode;
            title: string;
            description: string;
            summary?: string | undefined;
            highlights?: string[] | undefined;
            reason_for_sale_details?: string | undefined;
          },
          {
            locale: LanguageCode;
            title: string;
            description: string;
            summary?: string | undefined;
            highlights?: string[] | undefined;
            reason_for_sale_details?: string | undefined;
          }
        >,
        'many'
      >
    >;
    financials: z.ZodOptional<
      z.ZodOptional<
        z.ZodEffects<
          z.ZodObject<
            {
              revenue_min: z.ZodOptional<z.ZodNumber>;
              revenue_max: z.ZodOptional<z.ZodNumber>;
              revenue_currency: z.ZodNativeEnum<typeof CurrencyCode>;
              ebitda_min: z.ZodOptional<z.ZodNumber>;
              ebitda_max: z.ZodOptional<z.ZodNumber>;
              ebitda_margin: z.ZodOptional<z.ZodNumber>;
              revenue_growth_rate: z.ZodOptional<z.ZodNumber>;
              profit_growth_rate: z.ZodOptional<z.ZodNumber>;
              financial_year: z.ZodOptional<z.ZodNumber>;
              years_in_business: z.ZodOptional<z.ZodNumber>;
              assets_value: z.ZodOptional<z.ZodNumber>;
              liabilities_value: z.ZodOptional<z.ZodNumber>;
              inventory_value: z.ZodOptional<z.ZodNumber>;
            },
            'strip',
            z.ZodTypeAny,
            {
              revenue_currency: CurrencyCode;
              revenue_min?: number | undefined;
              revenue_max?: number | undefined;
              ebitda_min?: number | undefined;
              ebitda_max?: number | undefined;
              ebitda_margin?: number | undefined;
              revenue_growth_rate?: number | undefined;
              profit_growth_rate?: number | undefined;
              financial_year?: number | undefined;
              years_in_business?: number | undefined;
              assets_value?: number | undefined;
              liabilities_value?: number | undefined;
              inventory_value?: number | undefined;
            },
            {
              revenue_currency: CurrencyCode;
              revenue_min?: number | undefined;
              revenue_max?: number | undefined;
              ebitda_min?: number | undefined;
              ebitda_max?: number | undefined;
              ebitda_margin?: number | undefined;
              revenue_growth_rate?: number | undefined;
              profit_growth_rate?: number | undefined;
              financial_year?: number | undefined;
              years_in_business?: number | undefined;
              assets_value?: number | undefined;
              liabilities_value?: number | undefined;
              inventory_value?: number | undefined;
            }
          >,
          {
            revenue_currency: CurrencyCode;
            revenue_min?: number | undefined;
            revenue_max?: number | undefined;
            ebitda_min?: number | undefined;
            ebitda_max?: number | undefined;
            ebitda_margin?: number | undefined;
            revenue_growth_rate?: number | undefined;
            profit_growth_rate?: number | undefined;
            financial_year?: number | undefined;
            years_in_business?: number | undefined;
            assets_value?: number | undefined;
            liabilities_value?: number | undefined;
            inventory_value?: number | undefined;
          },
          {
            revenue_currency: CurrencyCode;
            revenue_min?: number | undefined;
            revenue_max?: number | undefined;
            ebitda_min?: number | undefined;
            ebitda_max?: number | undefined;
            ebitda_margin?: number | undefined;
            revenue_growth_rate?: number | undefined;
            profit_growth_rate?: number | undefined;
            financial_year?: number | undefined;
            years_in_business?: number | undefined;
            assets_value?: number | undefined;
            liabilities_value?: number | undefined;
            inventory_value?: number | undefined;
          }
        >
      >
    >;
  } & {
    status: z.ZodOptional<z.ZodNativeEnum<typeof ListingStatus>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    country?: CountryCode | undefined;
    region?: string | undefined;
    sector?: BusinessSector | undefined;
    anonymous?: boolean | undefined;
    featured?: boolean | undefined;
    status?: ListingStatus | undefined;
    currency?: CurrencyCode | undefined;
    city?: string | undefined;
    organization_id?: string | undefined;
    requires_nda?: boolean | undefined;
    asking_price?: number | undefined;
    price_negotiable?: boolean | undefined;
    reason_for_sale?: string | undefined;
    preferred_timeline?: string | undefined;
    expires_at?: string | undefined;
    translations?:
      | {
          locale: LanguageCode;
          title: string;
          description: string;
          summary?: string | undefined;
          highlights?: string[] | undefined;
          reason_for_sale_details?: string | undefined;
        }[]
      | undefined;
    financials?:
      | {
          revenue_currency: CurrencyCode;
          revenue_min?: number | undefined;
          revenue_max?: number | undefined;
          ebitda_min?: number | undefined;
          ebitda_max?: number | undefined;
          ebitda_margin?: number | undefined;
          revenue_growth_rate?: number | undefined;
          profit_growth_rate?: number | undefined;
          financial_year?: number | undefined;
          years_in_business?: number | undefined;
          assets_value?: number | undefined;
          liabilities_value?: number | undefined;
          inventory_value?: number | undefined;
        }
      | undefined;
  },
  {
    country?: CountryCode | undefined;
    region?: string | undefined;
    sector?: BusinessSector | undefined;
    anonymous?: boolean | undefined;
    featured?: boolean | undefined;
    status?: ListingStatus | undefined;
    currency?: CurrencyCode | undefined;
    city?: string | undefined;
    organization_id?: string | undefined;
    requires_nda?: boolean | undefined;
    asking_price?: number | undefined;
    price_negotiable?: boolean | undefined;
    reason_for_sale?: string | undefined;
    preferred_timeline?: string | undefined;
    expires_at?: string | undefined;
    translations?:
      | {
          locale: LanguageCode;
          title: string;
          description: string;
          summary?: string | undefined;
          highlights?: string[] | undefined;
          reason_for_sale_details?: string | undefined;
        }[]
      | undefined;
    financials?:
      | {
          revenue_currency: CurrencyCode;
          revenue_min?: number | undefined;
          revenue_max?: number | undefined;
          ebitda_min?: number | undefined;
          ebitda_max?: number | undefined;
          ebitda_margin?: number | undefined;
          revenue_growth_rate?: number | undefined;
          profit_growth_rate?: number | undefined;
          financial_year?: number | undefined;
          years_in_business?: number | undefined;
          assets_value?: number | undefined;
          liabilities_value?: number | undefined;
          inventory_value?: number | undefined;
        }
      | undefined;
  }
>;
export declare const listingSearchSchema: z.ZodEffects<
  z.ZodObject<
    {
      page: z.ZodDefault<z.ZodNumber>;
      limit: z.ZodDefault<z.ZodNumber>;
      offset: z.ZodOptional<z.ZodNumber>;
    } & {
      sortBy: z.ZodOptional<z.ZodString>;
      sortDirection: z.ZodDefault<z.ZodEnum<['ASC', 'DESC']>>;
      orderBy: z.ZodOptional<z.ZodString>;
      orderDirection: z.ZodOptional<z.ZodEnum<['ASC', 'DESC']>>;
    } & {
      search: z.ZodOptional<z.ZodString>;
      filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    } & {
      country: z.ZodOptional<z.ZodNativeEnum<typeof CountryCode>>;
      region: z.ZodOptional<z.ZodString>;
      sector: z.ZodOptional<z.ZodNativeEnum<typeof BusinessSector>>;
      revenueMin: z.ZodOptional<z.ZodNumber>;
      revenueMax: z.ZodOptional<z.ZodNumber>;
      askingPriceMin: z.ZodOptional<z.ZodNumber>;
      askingPriceMax: z.ZodOptional<z.ZodNumber>;
      anonymous: z.ZodOptional<z.ZodBoolean>;
      requiresNda: z.ZodOptional<z.ZodBoolean>;
      featured: z.ZodOptional<z.ZodBoolean>;
      status: z.ZodOptional<z.ZodNativeEnum<typeof ListingStatus>>;
      locale: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
      yearsInBusinessMin: z.ZodOptional<z.ZodNumber>;
      yearsInBusinessMax: z.ZodOptional<z.ZodNumber>;
      searchQuery: z.ZodOptional<z.ZodString>;
    },
    'strip',
    z.ZodTypeAny,
    {
      page: number;
      limit: number;
      sortDirection: 'ASC' | 'DESC';
      search?: string | undefined;
      filter?: Record<string, any> | undefined;
      offset?: number | undefined;
      country?: CountryCode | undefined;
      region?: string | undefined;
      sector?: BusinessSector | undefined;
      revenueMin?: number | undefined;
      revenueMax?: number | undefined;
      askingPriceMin?: number | undefined;
      askingPriceMax?: number | undefined;
      anonymous?: boolean | undefined;
      requiresNda?: boolean | undefined;
      featured?: boolean | undefined;
      status?: ListingStatus | undefined;
      locale?: LanguageCode | undefined;
      yearsInBusinessMin?: number | undefined;
      yearsInBusinessMax?: number | undefined;
      searchQuery?: string | undefined;
      sortBy?: string | undefined;
      orderBy?: string | undefined;
      orderDirection?: 'ASC' | 'DESC' | undefined;
    },
    {
      search?: string | undefined;
      filter?: Record<string, any> | undefined;
      page?: number | undefined;
      limit?: number | undefined;
      offset?: number | undefined;
      country?: CountryCode | undefined;
      region?: string | undefined;
      sector?: BusinessSector | undefined;
      revenueMin?: number | undefined;
      revenueMax?: number | undefined;
      askingPriceMin?: number | undefined;
      askingPriceMax?: number | undefined;
      anonymous?: boolean | undefined;
      requiresNda?: boolean | undefined;
      featured?: boolean | undefined;
      status?: ListingStatus | undefined;
      locale?: LanguageCode | undefined;
      yearsInBusinessMin?: number | undefined;
      yearsInBusinessMax?: number | undefined;
      searchQuery?: string | undefined;
      sortBy?: string | undefined;
      sortDirection?: 'ASC' | 'DESC' | undefined;
      orderBy?: string | undefined;
      orderDirection?: 'ASC' | 'DESC' | undefined;
    }
  >,
  {
    page: number;
    limit: number;
    sortDirection: 'ASC' | 'DESC';
    search?: string | undefined;
    filter?: Record<string, any> | undefined;
    offset?: number | undefined;
    country?: CountryCode | undefined;
    region?: string | undefined;
    sector?: BusinessSector | undefined;
    revenueMin?: number | undefined;
    revenueMax?: number | undefined;
    askingPriceMin?: number | undefined;
    askingPriceMax?: number | undefined;
    anonymous?: boolean | undefined;
    requiresNda?: boolean | undefined;
    featured?: boolean | undefined;
    status?: ListingStatus | undefined;
    locale?: LanguageCode | undefined;
    yearsInBusinessMin?: number | undefined;
    yearsInBusinessMax?: number | undefined;
    searchQuery?: string | undefined;
    sortBy?: string | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  },
  {
    search?: string | undefined;
    filter?: Record<string, any> | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    country?: CountryCode | undefined;
    region?: string | undefined;
    sector?: BusinessSector | undefined;
    revenueMin?: number | undefined;
    revenueMax?: number | undefined;
    askingPriceMin?: number | undefined;
    askingPriceMax?: number | undefined;
    anonymous?: boolean | undefined;
    requiresNda?: boolean | undefined;
    featured?: boolean | undefined;
    status?: ListingStatus | undefined;
    locale?: LanguageCode | undefined;
    yearsInBusinessMin?: number | undefined;
    yearsInBusinessMax?: number | undefined;
    searchQuery?: string | undefined;
    sortBy?: string | undefined;
    sortDirection?: 'ASC' | 'DESC' | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  }
>;
export declare const createInquirySchema: z.ZodObject<
  {
    listing_id: z.ZodString;
    message: z.ZodString;
    buyer_background: z.ZodOptional<z.ZodString>;
    intended_use: z.ZodOptional<z.ZodString>;
    financing_confirmed: z.ZodBoolean;
    nda_required: z.ZodOptional<z.ZodBoolean>;
  },
  'strip',
  z.ZodTypeAny,
  {
    message: string;
    listing_id: string;
    financing_confirmed: boolean;
    nda_required?: boolean | undefined;
    buyer_background?: string | undefined;
    intended_use?: string | undefined;
  },
  {
    message: string;
    listing_id: string;
    financing_confirmed: boolean;
    nda_required?: boolean | undefined;
    buyer_background?: string | undefined;
    intended_use?: string | undefined;
  }
>;
export declare const respondToInquirySchema: z.ZodEffects<
  z.ZodObject<
    {
      status: z.ZodNativeEnum<typeof InquiryStatus>;
      seller_response: z.ZodOptional<z.ZodString>;
      nda_required: z.ZodOptional<z.ZodBoolean>;
    },
    'strip',
    z.ZodTypeAny,
    {
      status: InquiryStatus;
      nda_required?: boolean | undefined;
      seller_response?: string | undefined;
    },
    {
      status: InquiryStatus;
      nda_required?: boolean | undefined;
      seller_response?: string | undefined;
    }
  >,
  {
    status: InquiryStatus;
    nda_required?: boolean | undefined;
    seller_response?: string | undefined;
  },
  {
    status: InquiryStatus;
    nda_required?: boolean | undefined;
    seller_response?: string | undefined;
  }
>;
export declare const createConversationSchema: z.ZodObject<
  {
    inquiry_id: z.ZodString;
    subject: z.ZodOptional<z.ZodString>;
    initial_message: z.ZodOptional<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    inquiry_id: string;
    subject?: string | undefined;
    initial_message?: string | undefined;
  },
  {
    inquiry_id: string;
    subject?: string | undefined;
    initial_message?: string | undefined;
  }
>;
export declare const sendMessageSchema: z.ZodObject<
  {
    content: z.ZodString;
    message_type: z.ZodDefault<z.ZodNativeEnum<typeof MessageType>>;
    reply_to_id: z.ZodOptional<z.ZodString>;
    attachments: z.ZodOptional<z.ZodArray<z.ZodString, 'many'>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    content: string;
    message_type: MessageType;
    reply_to_id?: string | undefined;
    attachments?: string[] | undefined;
  },
  {
    content: string;
    message_type?: MessageType | undefined;
    reply_to_id?: string | undefined;
    attachments?: string[] | undefined;
  }
>;
export declare const uploadDocumentSchema: z.ZodObject<
  {
    listing_id: z.ZodString;
    filename: z.ZodString;
    file_size: z.ZodNumber;
    mime_type: z.ZodString;
    document_type: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    access_level: z.ZodEnum<['public', 'nda_required', 'private']>;
    password_protected: z.ZodDefault<z.ZodBoolean>;
  },
  'strip',
  z.ZodTypeAny,
  {
    listing_id: string;
    filename: string;
    file_size: number;
    mime_type: string;
    access_level: 'public' | 'nda_required' | 'private';
    password_protected: boolean;
    description?: string | undefined;
    document_type?: string | undefined;
    category?: string | undefined;
  },
  {
    listing_id: string;
    filename: string;
    file_size: number;
    mime_type: string;
    access_level: 'public' | 'nda_required' | 'private';
    description?: string | undefined;
    document_type?: string | undefined;
    category?: string | undefined;
    password_protected?: boolean | undefined;
  }
>;
export declare const createSavedSearchSchema: z.ZodObject<
  {
    name: z.ZodString;
    search_criteria: z.ZodRecord<z.ZodString, z.ZodAny>;
    alert_enabled: z.ZodDefault<z.ZodBoolean>;
    alert_frequency: z.ZodOptional<z.ZodEnum<['daily', 'weekly', 'monthly']>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    name: string;
    search_criteria: Record<string, any>;
    alert_enabled: boolean;
    alert_frequency?: 'monthly' | 'daily' | 'weekly' | undefined;
  },
  {
    name: string;
    search_criteria: Record<string, any>;
    alert_enabled?: boolean | undefined;
    alert_frequency?: 'monthly' | 'daily' | 'weekly' | undefined;
  }
>;
export declare const updateBuyerProfileSchema: z.ZodEffects<
  z.ZodObject<
    {
      target_sectors: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof BusinessSector>, 'many'>>;
      target_countries: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof CountryCode>, 'many'>>;
      target_regions: z.ZodOptional<z.ZodArray<z.ZodString, 'many'>>;
      budget_min: z.ZodOptional<z.ZodNumber>;
      budget_max: z.ZodOptional<z.ZodNumber>;
      budget_currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
      preferred_business_age_min: z.ZodOptional<z.ZodNumber>;
      preferred_business_age_max: z.ZodOptional<z.ZodNumber>;
      preferred_employee_count_min: z.ZodOptional<z.ZodNumber>;
      preferred_employee_count_max: z.ZodOptional<z.ZodNumber>;
      investment_timeline: z.ZodOptional<z.ZodString>;
      involvement_level: z.ZodOptional<z.ZodEnum<['hands_off', 'advisory', 'active', 'full_time']>>;
      experience_level: z.ZodOptional<z.ZodEnum<['first_time', 'experienced', 'serial']>>;
      risk_tolerance: z.ZodOptional<z.ZodEnum<['low', 'medium', 'high']>>;
      contact_preferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    },
    'strip',
    z.ZodTypeAny,
    {
      target_sectors?: BusinessSector[] | undefined;
      target_countries?: CountryCode[] | undefined;
      target_regions?: string[] | undefined;
      budget_min?: number | undefined;
      budget_max?: number | undefined;
      budget_currency?: CurrencyCode | undefined;
      preferred_business_age_min?: number | undefined;
      preferred_business_age_max?: number | undefined;
      preferred_employee_count_min?: number | undefined;
      preferred_employee_count_max?: number | undefined;
      investment_timeline?: string | undefined;
      involvement_level?: 'active' | 'hands_off' | 'advisory' | 'full_time' | undefined;
      experience_level?: 'first_time' | 'experienced' | 'serial' | undefined;
      risk_tolerance?: 'low' | 'medium' | 'high' | undefined;
      contact_preferences?: Record<string, any> | undefined;
    },
    {
      target_sectors?: BusinessSector[] | undefined;
      target_countries?: CountryCode[] | undefined;
      target_regions?: string[] | undefined;
      budget_min?: number | undefined;
      budget_max?: number | undefined;
      budget_currency?: CurrencyCode | undefined;
      preferred_business_age_min?: number | undefined;
      preferred_business_age_max?: number | undefined;
      preferred_employee_count_min?: number | undefined;
      preferred_employee_count_max?: number | undefined;
      investment_timeline?: string | undefined;
      involvement_level?: 'active' | 'hands_off' | 'advisory' | 'full_time' | undefined;
      experience_level?: 'first_time' | 'experienced' | 'serial' | undefined;
      risk_tolerance?: 'low' | 'medium' | 'high' | undefined;
      contact_preferences?: Record<string, any> | undefined;
    }
  >,
  {
    target_sectors?: BusinessSector[] | undefined;
    target_countries?: CountryCode[] | undefined;
    target_regions?: string[] | undefined;
    budget_min?: number | undefined;
    budget_max?: number | undefined;
    budget_currency?: CurrencyCode | undefined;
    preferred_business_age_min?: number | undefined;
    preferred_business_age_max?: number | undefined;
    preferred_employee_count_min?: number | undefined;
    preferred_employee_count_max?: number | undefined;
    investment_timeline?: string | undefined;
    involvement_level?: 'active' | 'hands_off' | 'advisory' | 'full_time' | undefined;
    experience_level?: 'first_time' | 'experienced' | 'serial' | undefined;
    risk_tolerance?: 'low' | 'medium' | 'high' | undefined;
    contact_preferences?: Record<string, any> | undefined;
  },
  {
    target_sectors?: BusinessSector[] | undefined;
    target_countries?: CountryCode[] | undefined;
    target_regions?: string[] | undefined;
    budget_min?: number | undefined;
    budget_max?: number | undefined;
    budget_currency?: CurrencyCode | undefined;
    preferred_business_age_min?: number | undefined;
    preferred_business_age_max?: number | undefined;
    preferred_employee_count_min?: number | undefined;
    preferred_employee_count_max?: number | undefined;
    investment_timeline?: string | undefined;
    involvement_level?: 'active' | 'hands_off' | 'advisory' | 'full_time' | undefined;
    experience_level?: 'first_time' | 'experienced' | 'serial' | undefined;
    risk_tolerance?: 'low' | 'medium' | 'high' | undefined;
    contact_preferences?: Record<string, any> | undefined;
  }
>;
export declare const createSubscriptionSchema: z.ZodObject<
  {
    plan_id: z.ZodString;
    billing_period: z.ZodEnum<['monthly', 'yearly']>;
    payment_method_id: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    plan_id: string;
    billing_period: 'monthly' | 'yearly';
    payment_method_id: string;
  },
  {
    plan_id: string;
    billing_period: 'monthly' | 'yearly';
    payment_method_id: string;
  }
>;
export declare const createPaymentSchema: z.ZodObject<
  {
    amount: z.ZodNumber;
    currency: z.ZodNativeEnum<typeof CurrencyCode>;
    purpose: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    payment_method_id: z.ZodString;
    listing_id: z.ZodOptional<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    currency: CurrencyCode;
    payment_method_id: string;
    amount: number;
    purpose: string;
    description?: string | undefined;
    listing_id?: string | undefined;
  },
  {
    currency: CurrencyCode;
    payment_method_id: string;
    amount: number;
    purpose: string;
    description?: string | undefined;
    listing_id?: string | undefined;
  }
>;
export declare const adminUserListSchema: z.ZodObject<
  {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
  } & {
    sortBy: z.ZodOptional<z.ZodString>;
    sortDirection: z.ZodDefault<z.ZodEnum<['ASC', 'DESC']>>;
    orderBy: z.ZodOptional<z.ZodString>;
    orderDirection: z.ZodOptional<z.ZodEnum<['ASC', 'DESC']>>;
  } & {
    search: z.ZodOptional<z.ZodString>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
  } & {
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    email_verified: z.ZodOptional<z.ZodBoolean>;
    business_verified: z.ZodOptional<z.ZodBoolean>;
    is_active: z.ZodOptional<z.ZodBoolean>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    page: number;
    limit: number;
    sortDirection: 'ASC' | 'DESC';
    search?: string | undefined;
    filter?: Record<string, any> | undefined;
    offset?: number | undefined;
    role?: UserRole | undefined;
    email_verified?: boolean | undefined;
    business_verified?: boolean | undefined;
    is_active?: boolean | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    sortBy?: string | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  },
  {
    search?: string | undefined;
    filter?: Record<string, any> | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    role?: UserRole | undefined;
    email_verified?: boolean | undefined;
    business_verified?: boolean | undefined;
    is_active?: boolean | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    sortBy?: string | undefined;
    sortDirection?: 'ASC' | 'DESC' | undefined;
    orderBy?: string | undefined;
    orderDirection?: 'ASC' | 'DESC' | undefined;
  }
>;
export declare const adminUpdateUserSchema: z.ZodObject<
  {
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    email_verified: z.ZodOptional<z.ZodBoolean>;
    business_verified: z.ZodOptional<z.ZodBoolean>;
    is_active: z.ZodOptional<z.ZodBoolean>;
    preferences: z.ZodOptional<
      z.ZodObject<
        {
          language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
          timezone: z.ZodOptional<z.ZodString>;
          email_notifications: z.ZodOptional<z.ZodBoolean>;
          marketing_emails: z.ZodOptional<z.ZodBoolean>;
          currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
          theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
        },
        'passthrough',
        z.ZodTypeAny,
        z.objectOutputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >,
        z.objectInputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >
      >
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    role?: UserRole | undefined;
    email_verified?: boolean | undefined;
    business_verified?: boolean | undefined;
    is_active?: boolean | undefined;
    preferences?:
      | z.objectOutputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >
      | undefined;
  },
  {
    role?: UserRole | undefined;
    email_verified?: boolean | undefined;
    business_verified?: boolean | undefined;
    is_active?: boolean | undefined;
    preferences?:
      | z.objectInputType<
          {
            language: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
            timezone: z.ZodOptional<z.ZodString>;
            email_notifications: z.ZodOptional<z.ZodBoolean>;
            marketing_emails: z.ZodOptional<z.ZodBoolean>;
            currency: z.ZodOptional<z.ZodNativeEnum<typeof CurrencyCode>>;
            theme: z.ZodOptional<z.ZodEnum<['light', 'dark', 'system']>>;
          },
          z.ZodTypeAny,
          'passthrough'
        >
      | undefined;
  }
>;
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
};
export declare function validateData<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T>;
export declare function validateDataAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<ValidationResult<T>>;
