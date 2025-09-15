# 🔧 Shared Services - MVP Version

This directory contains shared services that provide core functionality across the MVP application.

## 📁 Structure

```
src/shared/services/
├── authenticationService.ts    # Authentication and user management
├── UrlGenerator.ts             # URL generation and routing utilities
├── index.ts                    # Centralized exports
└── README.md                   # This documentation
```

## 🔐 Authentication Service

**File**: `authenticationService.ts`

### Purpose
Handles user authentication, registration, and session management for the MVP application.

### Key Features
- ✅ User login/logout
- ✅ Account creation
- ✅ Password reset functionality
- ✅ JWT token management
- ✅ Development bypass mode
- ✅ Cookie-based session storage

### Usage
```typescript
import { authService } from '@shared/services';

// Login
const result = await authService.login('user@example.com', 'password');

// Check authentication
const authStatus = await authService.checkAuthentication();

// Logout
await authService.logout();
```

### Types
- `User`: User object interface
- `AuthResult`: Authentication check result
- `LoginRequest`: Login request payload
- `RegisterRequest`: Registration request payload

## 🔗 URL Generator Service

**File**: `UrlGenerator.ts`

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

## 📝 Migration Notes

### From Legacy App
These services are simplified versions of the legacy app services:
- **Removed**: Complex credit service integration
- **Simplified**: Type definitions and interfaces
- **Streamlined**: API configuration
- **Maintained**: Core functionality and compatibility

### Improvements
- ✅ Cleaner TypeScript interfaces
- ✅ Better error handling
- ✅ Simplified configuration
- ✅ MVP-focused functionality
- ✅ Consistent naming conventions

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
