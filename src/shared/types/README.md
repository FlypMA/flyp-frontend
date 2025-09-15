# 🔧 Shared Types - MVP Version

## 📁 Structure

```
src/shared/types/
├── user.ts                    # User and authentication types
├── index.ts                   # Centralized exports
└── README.md                  # This documentation
```

## 👤 User Types

**File**: `user.ts`

### Purpose
Provides comprehensive type definitions for user management, authentication, and business data in the MVP application.

### Key Features

#### Core Types
- **User**: Main user interface with all business and profile data
- **UserRole**: User role enumeration ('buyer', 'seller', 'both', 'admin')
- **AuthProvider**: Authentication provider types
- **Language**: Supported languages
- **Country**: Supported countries

#### Authentication Types
- **LoginRequest**: Login request payload
- **RegisterRequest**: Registration request payload
- **AuthResponse**: Authentication response
- **AuthResult**: Authentication check result
- **UpdateProfileRequest**: Profile update payload
- **UpdateBusinessInfoRequest**: Business info update payload

#### Utility Types
- **PublicUserFields**: Public user data subset
- **RequiredUserFields**: Required user fields
- **BusinessUserFields**: Business-specific user fields

#### Type Guards
- `isSellerUser()`: Check if user is a seller
- `isBuyerUser()`: Check if user is a buyer
- `isAdminUser()`: Check if user is an admin
- `hasBusinessInfo()`: Check if user has business information
- `isVerifiedUser()`: Check if user is verified

#### Constants
- **USER_ROLES**: Available user roles
- **COUNTRIES**: Supported countries
- **LANGUAGES**: Supported languages
- **INDUSTRIES**: Business industries
- **REVENUE_RANGES**: Revenue range options
- **ASKING_PRICE_RANGES**: Asking price range options
- **EMPLOYEE_COUNT_RANGES**: Employee count ranges
- **BUSINESS_TYPES**: Business type options
- **LISTING_STATUSES**: Listing status options

### Usage Examples

```typescript
// Import types
import { User, UserRole, isSellerUser } from '@shared/types';

// Type a user object
const user: User = {
  id: '123',
  email: 'user@example.com',
  name: 'John Doe',
  role: 'seller',
  country: 'BE',
  email_verified: true,
  auth_provider: 'email',
  language_preference: 'en',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

// Use type guards
if (isSellerUser(user)) {
  console.log('User is a seller');
}

// Use constants
const availableRoles: UserRole[] = USER_ROLES;
```

### Data Room Integration

These types are based on the production-ready types from the data room (`/data/models/user.types.production.ts`) but simplified for MVP needs:

- **Maintains compatibility** with backend API
- **Includes all essential fields** for MVP functionality
- **Provides type safety** across the application
- **Supports business data** for sellers
- **Includes authentication** and verification fields

### Type Safety

All types are fully typed with TypeScript, providing:
- **Compile-time validation** of user data
- **IntelliSense support** in IDEs
- **Runtime type guards** for safe type checking
- **Consistent interfaces** across the application

## 📦 Exports

The `index.ts` file provides centralized exports:

```typescript
// Import all types
import * from '@shared/types';

// Import specific types
import { User, UserRole, isSellerUser } from '@shared/types';

// Import constants
import { USER_ROLES, COUNTRIES, LANGUAGES } from '@shared/types';
```

## 🔄 Integration

These types are used throughout the application:

- **Authentication Service**: User and auth types
- **Components**: User interface and form types
- **API Calls**: Request and response types
- **State Management**: User state types
- **Forms**: Validation and submission types

## 🚀 Future Enhancements

The type system is designed to be extensible:

- **Additional user fields** can be added as needed
- **New business types** can be included
- **Extended validation** can be implemented
- **API integration** can be enhanced
