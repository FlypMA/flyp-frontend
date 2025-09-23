# 🔧 Shared Services - Centralized Service Architecture

This directory contains all shared services that provide core functionality across the Flyp frontend application. All services are centralized here to avoid duplication and ensure consistent imports.

## 📁 Complete Structure

```
src/shared/services/
├── auth/                       # 🔐 Authentication Services
│   ├── Auth.ts                # Main authentication service (Supabase)
│   ├── checkAuth.ts           # Authentication status checking
│   ├── login.ts               # User login functionality
│   ├── logout.ts              # User logout functionality
│   ├── signup.ts              # User registration functionality
│   ├── index.ts               # Auth service exports
│   ├── README.md              # Auth documentation
│   └── utils/                 # Authentication utilities
│       ├── error-handler.ts   # Auth error handling
│       ├── retry-handler.ts   # Request retry logic
│       ├── session-manager.ts # Session management
│       └── user-data-manager.ts # User data operations
│
├── payments/                   # 💳 Payment Services
│   ├── api.ts                 # Payment API service
│   └── index.ts               # Payment exports
│
├── urls/                       # 🔗 URL Generation Services
│   └── urlGenerator.ts        # URL generation utilities
│
├── monitoring/                 # 📊 Monitoring Services
│   └── errorHandler.ts        # Global error handling
│
├── index.ts                    # 📦 Centralized exports (SINGLE SOURCE OF TRUTH)
└── README.md                   # 📚 This documentation
```

## 🎯 Import Guidelines

### ✅ Correct Import Pattern

```typescript
// Import from centralized services index
import { authService, UrlGenerator, paymentsApi } from '@/shared/services';

// Or import specific services
import { authService } from '@/shared/services';
import { UrlGenerator } from '@/shared/services';
```

### ❌ Avoid These Patterns

```typescript
// Don't import from individual files
import { authService } from '@/shared/services/auth/Auth';

// Don't import from app/services (doesn't exist)
import { authService } from '@/app/services/users/authenticationService';

// Don't use relative paths
import { authService } from '../../../shared/services/auth';
```

## 🔐 Authentication Service

**Main File**: `auth/Auth.ts` (Supabase-based)

### Purpose

Comprehensive authentication system using Supabase Auth with session management, user data handling, and development bypass capabilities.

### Key Features

- ✅ **Supabase Integration**: Full Supabase Auth integration
- ✅ **User Management**: Login, logout, registration, profile updates
- ✅ **Session Handling**: Automatic session management and validation
- ✅ **Development Bypass**: Skip authentication in development mode
- ✅ **Error Handling**: Comprehensive error handling with retry logic
- ✅ **Type Safety**: Full TypeScript coverage

### Usage Examples

```typescript
import { authService, checkAuthWithBypass } from '@/shared/services';

// Login user
const result = await authService.login('user@example.com', 'password');

// Create new account
const newUser = await authService.createAccount(
  'user@example.com',
  'password',
  'John Doe',
  'seller'
);

// Check authentication (with dev bypass support)
const authStatus = await authService.checkAuthentication();

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();

// Development bypass example
const authResult = await checkAuthWithBypass(
  () => authService.checkAuthentication(),
  'seller' // default role for bypass
);
```

### Available Methods

- `login(email, password)` - User authentication
- `createAccount(email, password, name, role)` - Account creation
- `logout()` - User logout
- `checkAuthentication()` - Auth status check
- `getCurrentUser()` - Get current user data
- `updateProfile(userId, updates)` - Update user profile
- `resetPassword(email)` - Password reset
- `getAuthenticatedUser()` - Get auth token (legacy compatibility)

### Types

- `User`: Complete user object interface
- `AuthResult`: Authentication check result
- `UserRole`: User role types ('buyer', 'seller', 'both', 'admin')
- `LoginRequest`: Login request payload
- `RegisterRequest`: Registration request payload
- `UpdateProfileRequest`: Profile update payload

## 🔗 URL Generator Service

**File**: `urls/urlGenerator.ts`

### Purpose

Provides centralized URL generation and routing utilities for consistent navigation across the application.

### Key Features

- ✅ Route generation for all app sections
- ✅ Dynamic route building with parameters
- ✅ Legacy route compatibility
- ✅ User role-based routing
- ✅ Filter-based URL generation

### Usage

```typescript
import { UrlGenerator } from '@shared/services';

// Basic routes
const homeUrl = UrlGenerator.root();
const loginUrl = UrlGenerator.login();

// Dynamic routes
const listingUrl = UrlGenerator.listingById('123');
const editUrl = UrlGenerator.editListing('123');

// Role-based routing
const dashboardUrl = UrlGenerator.getDashboardForRole('seller');
```

### Route Categories

- **Public Pages**: Home, about, contact, etc.
- **Authentication**: Login, signup, password reset
- **Marketplace**: Listings, search, browse
- **Business Owner**: Dashboard, listings management
- **User Management**: Profile, settings, billing
- **Communication**: Messages, conversations
- **Legal**: Privacy, terms, GDPR
- **Resources**: Valuation guide, due diligence

## 💳 Payments Service

**File**: `payments/api.ts`

### Purpose

Handles payment processing, subscription management, and billing functionality.

### Key Features

- ✅ Payment plan management
- ✅ Subscription handling
- ✅ Payment method management
- ✅ Stripe integration (planned)
- ✅ Checkout session creation

### Usage

```typescript
import { paymentsApi, createCheckoutSessionAPI } from '@shared/services';

// Get available plans
const plans = await paymentsApi.getPlans();

// Subscribe to a plan
const subscription = await paymentsApi.subscribe('plan-id');

// Create checkout session
const session = await createCheckoutSessionAPI('plan-id');
```

### Types

- `PaymentPlan`: Available subscription plans
- `PaymentMethod`: User payment methods
- `Subscription`: Active subscriptions
- `CheckoutSession`: Stripe checkout sessions

## 🚀 Getting Started

### Import Services

```typescript
// Import specific services
import { authService, UrlGenerator } from '@shared/services';

// Or import from individual files
import { authService } from '@shared/services/authenticationService';
import UrlGenerator from '@shared/services/UrlGenerator';
```

### Environment Variables

The authentication service uses these environment variables:

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_DEV_BYPASS_AUTH`: Development authentication bypass
- `VITE_DEMO_MODE`: Demo mode for production showcase

## 🔧 Configuration

### API Configuration

The authentication service is configured with:

- Base URL from environment variables
- Standard REST endpoints
- JWT token handling
- Cookie-based session storage

### Development Features

- **Dev Bypass**: Skip authentication in development
- **Demo Mode**: Bypass authentication for demos
- **Mock User**: Default development user

## 🏗️ Centralized Architecture

### Single Source of Truth

All services are centralized in `/shared/services` to:

- ✅ **Eliminate Duplication**: No duplicate service files
- ✅ **Consistent Imports**: All imports from `@/shared/services`
- ✅ **Easy Maintenance**: Single location for all services
- ✅ **Clear Dependencies**: Explicit service relationships
- ✅ **Type Safety**: Centralized type exports

### Migration from `/app/services`

If you previously had services in `/app/services`, they should be:

1. **Moved to** `/shared/services/[category]/`
2. **Exported from** `/shared/services/index.ts`
3. **Imported via** `@/shared/services`

### Service Categories

- **`auth/`**: Authentication and user management
- **`payments/`**: Payment processing and billing
- **`urls/`**: URL generation and routing
- **`monitoring/`**: Error handling and logging

## 📝 Migration Notes

### From Legacy App

These services are modernized versions of the legacy app services:

- ✅ **Enhanced**: Supabase integration instead of custom auth
- ✅ **Simplified**: Streamlined API configuration
- ✅ **Improved**: Better error handling and retry logic
- ✅ **Centralized**: Single services directory
- ✅ **Type-Safe**: Full TypeScript coverage

### Key Improvements

- ✅ **Development Bypass**: Built-in dev mode authentication bypass
- ✅ **Modular Design**: Individual functions can be imported separately
- ✅ **Error Resilience**: Comprehensive error handling with retries
- ✅ **Session Management**: Automatic session validation and refresh
- ✅ **Legacy Compatibility**: Backward-compatible method names

## 🎯 MVP Focus

These services are designed specifically for MVP needs:

- **Essential Features Only**: Core authentication and routing
- **Simplified Architecture**: Reduced complexity
- **Fast Implementation**: Ready to use out of the box
- **Future-Ready**: Easy to extend when needed

## 🔮 Future Enhancements

When moving beyond MVP, consider adding:

- **Credit Service**: Billing and subscription management
- **Notification Service**: Real-time notifications
- **Analytics Service**: User behavior tracking
- **File Upload Service**: Document and image handling
- **WebSocket Service**: Real-time communication
