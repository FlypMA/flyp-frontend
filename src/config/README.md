# 🔧 Configuration - MVP Version

## 📁 Structure

```
src/config/
├── config.ts              # Main application configuration
├── api-config.ts          # API and service configuration
├── security-config.ts     # Security and monitoring configuration
├── Supabase.ts            # Supabase client configuration
├── index.ts               # Centralized exports
└── README.md              # This documentation
```

## 🏠 Main Configuration

**File**: `config.ts`

### Purpose

Central configuration hub for the entire MVP application, including app settings, feature flags, and UI preferences.

### Key Features

#### App Information

- **App Name**: Upswitch MVP
- **Version**: 1.0.0
- **Environment**: Development, Staging, Production

#### Feature Flags

- `enableAnalytics`: Enable analytics tracking
- `enableMessaging`: Enable messaging system
- `enableFileUpload`: Enable file upload functionality
- `enableNotifications`: Enable push notifications
- `enableDarkMode`: Enable dark mode support

#### UI Configuration

- **Theme**: Light, Dark, or System preference
- **Sidebar**: Collapsed state
- **Animations**: Enable/disable animations
- **Compact Mode**: Compact UI layout

#### App Settings

- **Default Language**: English
- **Default Country**: Belgium
- **Max File Size**: 10MB
- **Supported Languages**: English, Dutch, French
- **Supported Countries**: Belgium, Netherlands, France, Germany, US

### Usage Examples

```typescript
import { config, isFeatureEnabled, getConfig } from '@config';

// Check if feature is enabled
if (isFeatureEnabled('enableAnalytics')) {
  // Initialize analytics
}

// Get specific configuration value
const maxFileSize = getConfig('settings.maxFileSize');

// Access configuration directly
console.log(config.appName); // "Upswitch MVP"
```

## 🔗 API Configuration

**File**: `api-config.ts`

### Purpose

Comprehensive API configuration supporting both Supabase and custom backend services.

### Key Features

#### Supabase Configuration

- **URL**: Supabase project URL
- **Anon Key**: Supabase anonymous key
- **Validation**: Check if Supabase is properly configured

#### Backend Configuration

- **Base URL**: Custom backend API URL
- **Timeout**: Request timeout settings
- **Retry Logic**: Retry attempts and delays

#### API Endpoints

- **Authentication**: Login, register, logout, refresh
- **User Management**: Profile, update, business data
- **Listings**: CRUD operations, search, analytics
- **Messaging**: Conversations, messages, notifications
- **File Upload**: Images, documents, avatars
- **Analytics**: Dashboard, listings, user analytics

#### Development Configuration

- **Bypass Auth**: Skip authentication in development
- **Mock Data**: Use mock data for testing
- **Debug Logs**: Enable detailed logging
- **API Delay**: Simulate network delays

### Usage Examples

```typescript
import { getApiUrl, getSupabaseConfig, API_CONFIG } from '@config';

// Get API URL with parameters
const userUrl = getApiUrl('/api/users/:id', { id: '123' });

// Get Supabase configuration
const supabaseConfig = getSupabaseConfig();

// Access API endpoints
const loginEndpoint = API_CONFIG.ENDPOINTS.auth.login;
```

## 🔐 Supabase Configuration

**File**: `Supabase.ts`

### Purpose

Supabase client configuration and initialization for the MVP frontend.

### Key Features

#### Client Initialization

- **Automatic Setup**: Creates Supabase client with proper configuration
- **Error Handling**: Graceful fallback to mock client if configuration fails
- **Development Support**: Mock client for development without Supabase setup

#### Configuration Integration

- **Centralized Config**: Uses `getSupabaseConfig()` from `api-config.ts`
- **Environment Variables**: Automatically reads from environment variables
- **Validation**: Checks if Supabase is properly configured

#### Mock Client

- **Fallback Support**: Provides mock client when Supabase is not configured
- **No Crashes**: Prevents app crashes when Supabase is unavailable
- **Development Ready**: Allows development without Supabase setup

### Usage Examples

```typescript
import { supabase } from '@config';

// Use Supabase client
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Check if client is properly configured
if (error && error.message.includes('not configured')) {
  // Handle mock client scenario
}
```

## 🔒 Security Configuration

**File**: `security-config.ts`

### Purpose

Security settings, content security policy, and monitoring configuration.

### Key Features

#### Token Management

- **Storage Keys**: Token storage identifiers
- **Refresh Threshold**: Token refresh timing
- **Request ID**: Request identification

#### Content Security Policy

- **Script Sources**: Allowed script sources
- **Style Sources**: Allowed style sources
- **Image Sources**: Allowed image sources
- **Connect Sources**: Allowed connection sources

#### File Upload Security

- **Allowed Types**: Permitted file types
- **Max Size**: Maximum file size limits
- **Validation**: File validation rules

#### Monitoring

- **Security Monitoring**: Violation tracking
- **Threat Detection**: Threat reporting
- **Rate Limiting**: Request rate limits

### Usage Examples

```typescript
import { SECURITY_CONFIG, MONITORING_CONFIG } from '@config';

// Check file type
const isAllowed = SECURITY_CONFIG.ALLOWED_FILE_TYPES.includes(file.type);

// Get max file size
const maxSize = SECURITY_CONFIG.MAX_FILE_SIZE;

// Check monitoring status
if (MONITORING_CONFIG.ENABLED) {
  // Initialize monitoring
}
```

## 🌍 Environment Variables

The configuration system uses environment variables for different environments:

### Development

```bash
VITE_DEV_BYPASS_AUTH=true
VITE_DEV_MOCK_DATA=true
VITE_DEV_DEBUG_LOGS=true
VITE_DEV_API_DELAY=1000
```

### Supabase

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend API

```bash
VITE_API_BASE_URL=http://localhost:3001
```

### Feature Flags

```bash
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MESSAGING=true
VITE_ENABLE_FILE_UPLOAD=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true
```

### UI Settings

```bash
VITE_DEFAULT_THEME=system
VITE_SIDEBAR_COLLAPSED=false
VITE_ANIMATIONS_ENABLED=true
VITE_COMPACT_MODE=false
```

## 📦 Exports

The `index.ts` file provides centralized exports:

```typescript
// Main configuration
import { config, isFeatureEnabled } from '@config';

// API configuration
import { getApiUrl, API_CONFIG } from '@config';

// Supabase client
import { supabase } from '@config';

// Security configuration
import { SECURITY_CONFIG } from '@config';

// Utilities
import { isDevelopment, isProduction } from '@config';
```

## 🔄 Integration

The configuration system integrates with:

- **Authentication Service**: API endpoints and Supabase config
- **UI Components**: Theme and feature flags
- **Services**: API URLs and request configuration
- **Security**: CSP and monitoring settings
- **Development**: Debug and bypass settings

## 🚀 Benefits

- **Centralized**: All configuration in one place
- **Type Safe**: Full TypeScript support
- **Environment Aware**: Different settings per environment
- **Feature Flags**: Easy feature toggling
- **Development Friendly**: Debug and bypass options
- **Production Ready**: Security and monitoring built-in
