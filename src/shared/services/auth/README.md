# 🔐 Authentication Service - MVP Version (Modular)

## 📁 Structure

```
src/shared/services/auth/
├── Auth.ts                     # Main authentication service (legacy compatible, modular)
├── index.ts                    # Alternative modular orchestrator (unified API)
├── login.ts                    # Dedicated login operations service
├── logout.ts                   # Dedicated logout operations service
├── checkAuth.ts                # Authentication status checking service
├── signup.ts                   # User registration service
├── utils/                      # Utility modules (used by all services)
│   ├── session-manager.ts      # Session persistence with cookies & localStorage
│   ├── error-handler.ts        # Centralized error handling with user-friendly messages
│   ├── retry-handler.ts        # Retry logic with exponential backoff
│   └── user-data-manager.ts    # User data operations with Supabase
└── README.md                   # This comprehensive documentation
```

### **Two Authentication Approaches Available:**

1. **`Auth.ts`** - Legacy-compatible monolithic service (✅ **Recommended for MVP**)
   - Single file with all authentication methods (511 lines)
   - Uses helper classes internally for modularity
   - Same API as legacy app for easy migration
   - Fully integrated with SessionManager, AuthErrorHandler, RetryHandler, UserDataManager

2. **`index.ts`** - Fully modular orchestrator service (Alternative approach)
   - Orchestrates individual service modules (login.ts, logout.ts, etc.)
   - More complex but highly modular
   - Good for larger applications with complex auth needs

## 🏗️ Architecture Overview

### **Modular Design**

- **Single Responsibility**: Each module handles one specific aspect of authentication
- **Separation of Concerns**: Clear boundaries between different operations
- **Testability**: Each module can be tested independently
- **Maintainability**: Easy to update and extend individual components

### **Key Features**

- ✅ **Cookie-based Session Management**: Persistent sessions with proper cookie handling
- ✅ **Supabase Integration**: Full integration with Supabase Auth
- ✅ **Error Handling**: Comprehensive error handling with retry logic
- ✅ **Development Support**: Dev bypass for testing
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Resilience**: Retry logic with exponential backoff
- ✅ **Security**: Proper session management and token handling

## 🚀 Quick Start

### **Using the Main Auth Service (✅ Recommended for MVP)**

```typescript
import { authService } from '@shared/services/auth/Auth';

// Login
const result = await authService.login('user@example.com', 'password');
if (result.success) {
  console.log('Logged in:', result.user);
}

// Check authentication
const authStatus = await authService.checkAuthentication();
if (authStatus.isAuthenticated) {
  console.log('User is authenticated:', authStatus.user);
}

// Logout
await authService.logout();
```

### **Using the Modular Orchestrator (Alternative)**

```typescript
import { authService } from '@shared/services/auth';

// Same API as above - orchestrates individual services
const result = await authService.login('user@example.com', 'password');
```

### **Using Individual Services Directly**

```typescript
import { LoginService } from '@shared/services/auth/login';
import { SessionManager } from '@shared/services/auth/utils/session-manager';

// Direct service usage
const loginResult = await LoginService.login({ email, password });
const session = SessionManager.getSession();
```

## 🔧 Core Modules

### **Main Auth Service (`Auth.ts`)**

The primary authentication service that provides the same API as the legacy app, now fully modularized with helper classes.

**Features:**

- Legacy-compatible API for easy migration
- **Modular Architecture**: Uses SessionManager, AuthErrorHandler, RetryHandler, and UserDataManager
- **Robust Error Handling**: Comprehensive error handling with retry logic
- **Session Management**: Cookie-based session persistence with SessionManager
- **Automatic Login After Signup**: Seamless user experience
- **Supabase Integration**: Full integration with fallbacks
- **Development Bypass**: Easy testing and development support

```typescript
import { authService } from '@shared/services/auth/Auth';

// Same API as legacy app, but now with modular architecture
const result = await authService.login('user@example.com', 'password');
const authResult = await authService.checkAuthentication();
await authService.logout();
```

**Modular Components Used:**

- **SessionManager**: Handles cookie and localStorage session persistence
- **AuthErrorHandler**: Centralized error handling and user-friendly messages
- **RetryHandler**: Exponential backoff retry logic for network resilience
- **UserDataManager**: User data operations with Supabase public.users table

### **Main Orchestrator (`index.ts`)**

Orchestrates all authentication operations and provides a unified API.

```typescript
import { authService } from '@shared/services/auth';

// Login
const result = await authService.login('user@example.com', 'password');

// Check authentication
const authResult = await authService.checkAuthentication();

// Logout
await authService.logout();
```

### **Login Service (`login.ts`)**

Handles user login with email and password.

**Features:**

- Supabase authentication
- Session storage
- Development bypass
- Error handling with retry logic

```typescript
import { LoginService } from '@shared/services/auth';

const result = await LoginService.login({
  email: 'user@example.com',
  password: 'password123',
});
```

### **Logout Service (`logout.ts`)**

Handles user logout and session cleanup.

**Features:**

- Supabase sign out
- Session cleanup
- Force logout option
- Logout from all devices

```typescript
import { LogoutService } from '@shared/services/auth';

await LogoutService.logout();
await LogoutService.forceLogout();
await LogoutService.logoutFromAllDevices();
```

### **Check Auth Service (`checkAuth.ts`)**

Handles authentication status checking and session validation.

**Features:**

- Session validation
- Token refresh
- Expiration checking
- Development bypass

```typescript
import { CheckAuthService } from '@shared/services/auth';

const isAuth = CheckAuthService.isAuthenticated();
const user = CheckAuthService.getCurrentUser();
const token = CheckAuthService.getCurrentToken();
```

### **Signup Service (`signup.ts`)**

Handles user registration and email verification.

**Features:**

- User registration
- Email verification
- Resend verification
- Development bypass

```typescript
import { SignupService } from '@shared/services/auth';

const result = await SignupService.signup({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  role: 'buyer',
});
```

## 🛠️ Utility Modules

### **Session Manager (`utils/session-manager.ts`)**

Handles session persistence with cookies and localStorage.

**Features:**

- Cookie management
- localStorage persistence
- Session validation
- Secure cookie configuration

```typescript
import { SessionManager } from '@shared/services/auth';

// Store session
SessionManager.storeSession(authResult);

// Get session
const session = SessionManager.getSession();

// Clear session
SessionManager.clearSession();
```

### **Error Handler (`utils/error-handler.ts`)**

Centralized error handling for authentication operations.

**Features:**

- Supabase error mapping
- User-friendly error messages
- Error logging
- Retryable error detection

```typescript
import { AuthErrorHandler } from '@shared/services/auth';

const error = AuthErrorHandler.handleSupabaseError(supabaseError);
const response = AuthErrorHandler.createErrorResponse(error);
```

### **Retry Handler (`utils/retry-handler.ts`)**

Handles retry logic with exponential backoff.

**Features:**

- Exponential backoff
- Timeout handling
- Retryable error detection
- Configurable retry attempts

```typescript
import { RetryHandler } from '@shared/services/auth';

const result = await RetryHandler.executeWithRetry(() => someOperation(), 'Operation context');
```

### **User Data Manager (`utils/user-data-manager.ts`)**

Handles user data operations with Supabase.

**Features:**

- Public users table operations
- Profile updates
- Business info updates
- Data synchronization

```typescript
import { UserDataManager } from '@shared/services/auth';

const userData = await UserDataManager.getPublicUserData(userId);
await UserDataManager.updateUserProfile(userId, updates);
```

## 🍪 Session Management

### **Cookie Configuration**

- **Name**: `flyp_session`
- **Expiry**: 7 days
- **Security**: Secure in production, SameSite=Lax
- **Path**: Root path for global access

### **localStorage Keys**

- `flyp_token`: Authentication token
- `flyp_user`: User data
- `flyp_refresh`: Refresh token (if needed)

### **Session Flow**

1. **Login**: Store session in both cookie and localStorage
2. **Check Auth**: Validate session with Supabase
3. **Refresh**: Update session with fresh data
4. **Logout**: Clear all session data

## 🔄 Error Handling

### **Error Types**

- **Network Errors**: Retryable with exponential backoff
- **Authentication Errors**: User-friendly messages
- **Server Errors**: Retryable with limits
- **Validation Errors**: Immediate feedback

### **Retry Logic**

- **Max Attempts**: 3 retries
- **Base Delay**: 1 second
- **Backoff**: Exponential (2x multiplier)
- **Max Delay**: 10 seconds

## 🚀 Usage Examples

### **Complete Authentication Flow**

```typescript
import { authService } from '@shared/services/auth';

// 1. Signup
const signupResult = await authService.createAccount(
  'user@example.com',
  'password123',
  'John Doe',
  'buyer'
);

// 2. Login
const loginResult = await authService.login('user@example.com', 'password123');

// 3. Check authentication
const authResult = await authService.checkAuthentication();

// 4. Update profile
await authService.updateProfile(userId, {
  name: 'John Smith',
  city: 'Brussels',
});

// 5. Logout
await authService.logout();
```

### **Session Management**

```typescript
import { authService } from '@shared/services/auth';

// Check if logged in
if (authService.isLoggedIn()) {
  const user = await authService.getCurrentUser();
  const token = authService.getCurrentToken();
}

// Validate session
const isValid = await authService.validateSession();

// Refresh session
const refreshed = await authService.refreshSession();
```

### **Error Handling**

```typescript
import { authService } from '@shared/services/auth';

try {
  const result = await authService.login(email, password);
  if (!result.success) {
    console.error('Login failed:', result.error);
  }
} catch (error) {
  console.error('Unexpected error:', error);
}
```

## 🔒 Security Features

- **Secure Cookies**: HTTPOnly, Secure, SameSite
- **Token Validation**: JWT token validation
- **Session Expiry**: Automatic session expiration
- **CSRF Protection**: SameSite cookie policy
- **Error Logging**: Comprehensive error tracking
- **Rate Limiting**: Built-in retry limits

## 🧪 Development Features

- **Dev Bypass**: Skip authentication in development
- **Mock Data**: Use mock users for testing
- **Debug Logging**: Comprehensive logging
- **Error Simulation**: Test error scenarios

## 📊 Monitoring

- **Error Tracking**: All errors are logged
- **Performance**: Retry and timeout metrics
- **Session Analytics**: Session duration and usage
- **User Behavior**: Login/logout patterns

## 🚀 Benefits

- ✅ **Modular**: Easy to maintain and extend
- ✅ **Resilient**: Handles network failures gracefully with retry logic
- ✅ **Secure**: Proper session and token management
- ✅ **Type Safe**: Full TypeScript support
- ✅ **Testable**: Each module can be tested independently
- ✅ **Production Ready**: Comprehensive error handling and monitoring
- ✅ **Developer Friendly**: Great development experience with bypass options
- ✅ **Legacy Compatible**: Same API as legacy app for easy migration
- ✅ **Helper Classes**: Leverages SessionManager, AuthErrorHandler, RetryHandler, and UserDataManager

## 📋 File Descriptions

### **Core Services**

| File               | Purpose                                   | Lines | Key Features                                              |
| ------------------ | ----------------------------------------- | ----- | --------------------------------------------------------- |
| **`Auth.ts`**      | Main authentication service (recommended) | 511   | Legacy-compatible API, modular with helper classes        |
| **`index.ts`**     | Alternative modular orchestrator          | 315   | Orchestrates individual services, unified API             |
| **`login.ts`**     | Dedicated login operations                | 158   | Email/password auth, session management, error handling   |
| **`logout.ts`**    | Dedicated logout operations               | 133   | Session cleanup, force logout, multi-device logout        |
| **`signup.ts`**    | User registration service                 | 276   | Account creation, email verification, auto-login          |
| **`checkAuth.ts`** | Authentication status checking            | 227   | Session validation, user data retrieval, token management |

### **Utility Modules**

| File                       | Purpose              | Lines | Key Features                                              |
| -------------------------- | -------------------- | ----- | --------------------------------------------------------- |
| **`session-manager.ts`**   | Session persistence  | 172   | Cookies + localStorage, secure config, cross-tab sync     |
| **`error-handler.ts`**     | Error handling       | 248   | User-friendly messages, Supabase errors, categorization   |
| **`retry-handler.ts`**     | Retry logic          | 153   | Exponential backoff, timeout handling, network resilience |
| **`user-data-manager.ts`** | User data operations | 257   | Supabase integration, profile updates, business info      |

## 🔄 Modular Architecture Benefits

### **Before Refactoring**

- ❌ Monolithic 582-line file
- ❌ Duplicate cookie management code
- ❌ Inconsistent error handling
- ❌ No retry logic
- ❌ Direct Supabase calls without abstraction

### **After Refactoring**

- ✅ **Modular Design**: Uses helper classes for specific responsibilities
- ✅ **SessionManager**: Centralized session management with cookies and localStorage
- ✅ **AuthErrorHandler**: Consistent error handling with user-friendly messages
- ✅ **RetryHandler**: Exponential backoff retry logic for network resilience
- ✅ **UserDataManager**: Abstracted user data operations
- ✅ **Clean Code**: Reduced from 582 lines to ~510 lines with better organization
- ✅ **Maintainable**: Each concern is handled by a dedicated helper class

## 🎯 Best Practices

1. **Use the main Auth service** (`Auth.ts`) for most operations - it's the recommended approach for MVP
2. **Handle errors gracefully** with proper user feedback using AuthErrorHandler
3. **Check authentication status** before protected operations
4. **Use development bypass** for testing and development
5. **Monitor session state** for better UX with SessionManager
6. **Implement proper loading states** during auth operations
7. **Leverage retry logic** for network resilience with RetryHandler
8. **Keep user data synchronized** between Supabase Auth and public.users table

## 🏆 Recommendations

### **For MVP Development (✅ Recommended)**

- ✅ Use **`Auth.ts`** as your main authentication service
- ✅ Import from `@shared/services/auth/Auth`
- ✅ Leverage the modular helper classes internally
- ✅ Same API as legacy app for easy migration

### **For Complex Applications (Alternative)**

- 🔄 Use **`index.ts`** orchestrator for maximum modularity
- 🔄 Import individual services as needed
- 🔄 More complex but highly maintainable

### **For Direct Service Usage**

- 🛠️ Import individual services for specific needs
- 🛠️ Use utility classes directly for custom implementations
- 🛠️ Good for advanced use cases and custom logic
