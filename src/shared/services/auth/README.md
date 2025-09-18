# 🔐 Authentication Service - Backend API Architecture

## 🏗️ **Architecture Overview**

```
Frontend → Backend API → Supabase → HTTP-only Cookies → Frontend
```

**Security Model:**
- ✅ **Frontend**: UI logic only, no direct Supabase access
- ✅ **Backend**: All authentication operations, JWT management
- ✅ **Supabase**: Authentication provider, user data storage
- ✅ **Cookies**: HTTP-only, secure, SameSite protection

## 📁 **Service Structure**

```
src/shared/services/auth/
├── AuthService.ts              # Main authentication service (backend API)
├── index.ts                    # Clean exports
├── utils/                      # Utility modules
│   ├── session-manager.ts      # Local session state management
│   ├── error-handler.ts        # Error handling utilities
│   ├── retry-handler.ts        # Retry logic with exponential backoff
│   └── user-data-manager.ts    # User data operations
└── README.md                   # This documentation
```

## 🔐 **Security Features**

### **HTTP-only Cookie Authentication**
- **Cookie Name**: `flyp_session`
- **Security**: HTTP-only (XSS protection)
- **CSRF Protection**: SameSite=Lax
- **Expiry**: 7 days
- **Path**: Root path for global access

### **Backend API Integration**
- **Base URL**: `VITE_NODE_BACKEND_URL` or `http://localhost:3000`
- **Credentials**: `include` for cookie-based auth
- **Content-Type**: `application/json`
- **Error Handling**: Comprehensive error responses

### **No Direct Supabase Access**
- ❌ **Frontend does NOT access Supabase directly**
- ✅ **All Supabase operations go through backend**
- ✅ **Service role key stays on backend only**
- ✅ **Anon key used only for signup operations**

## 🚀 **Quick Start**

### **Basic Usage**

```typescript
import { authService } from '@/shared/services/auth';

// Login
const result = await authService.login('user@example.com', 'password');
if (result.success) {
  console.log('Logged in:', result.user);
}

// Check authentication
const authResult = await authService.checkAuthentication();
if (authResult.isAuthenticated) {
  console.log('User is authenticated:', authResult.user);
}

// Logout
await authService.logout();
```

### **Account Creation**

```typescript
const result = await authService.createAccount(
  'user@example.com',
  'password123',
  'John Doe',
  'buyer'
);

if (result.success) {
  console.log('Account created:', result.user);
} else {
  console.error('Error:', result.error);
}
```

## 🔧 **API Methods**

### **Authentication Methods**

| Method | Purpose | Backend Endpoint |
|--------|---------|------------------|
| `login(email, password)` | User login | `POST /api/auth/login` |
| `createAccount(email, password, name, role)` | User registration | `POST /api/auth/register` |
| `logout()` | User logout | `POST /api/auth/logout` |
| `checkAuthentication()` | Check auth status | `GET /api/auth/me` |
| `refreshSession()` | Refresh session | `POST /api/auth/refresh` |

### **Password Management**

| Method | Purpose | Backend Endpoint |
|--------|---------|------------------|
| `resetPassword(email)` | Request password reset | `POST /api/auth/forgot-password` |
| `updatePassword(newPassword)` | Update password | `POST /api/auth/reset-password` |

### **Email Verification**

| Method | Purpose | Backend Endpoint |
|--------|---------|------------------|
| `verifyEmail(token)` | Verify email address | `POST /api/auth/verify-email` |
| `resendVerification()` | Resend verification | `POST /api/auth/resend-verification` |

### **Utility Methods**

| Method | Purpose | Backend Endpoint |
|--------|---------|------------------|
| `checkEmailExists(email)` | Check if email exists | `POST /api/auth/check-email` |
| `getCurrentUser()` | Get current user data | `GET /api/auth/me` |

## 🍪 **Session Management**

### **Local State Management**
- **User Data**: Stored in localStorage (non-sensitive)
- **Session Flag**: `flyp_has_session` flag
- **No Tokens**: Tokens are HTTP-only cookies only

### **Session Flow**
1. **Login**: Backend sets HTTP-only cookie
2. **API Calls**: Include credentials for cookie auth
3. **Session Check**: Backend validates cookie
4. **Logout**: Backend clears cookie

## 🔄 **Error Handling**

### **Error Response Format**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### **Common Error Scenarios**
- **Network Errors**: Automatic retry with exponential backoff
- **Authentication Errors**: Clear error messages
- **Validation Errors**: Field-specific feedback
- **Server Errors**: Graceful degradation

## 🛠️ **Utility Classes**

### **SessionManager**
```typescript
import { SessionManager } from '@/shared/services/auth';

// Store user data locally (non-sensitive)
SessionManager.storeSession(authResult);

// Get current session
const session = SessionManager.getSession();

// Clear session
SessionManager.clearSession();
```

### **Error Handling**
```typescript
// Automatic error handling in all methods
try {
  const result = await authService.login(email, password);
  if (!result.success) {
    // Handle error
    console.error('Login failed:', result.error);
  }
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error);
}
```

## 🔒 **Security Best Practices**

### **Frontend Security**
- ✅ **No Supabase credentials in frontend**
- ✅ **No sensitive tokens in localStorage**
- ✅ **All auth operations through backend**
- ✅ **Proper error handling**

### **Backend Security**
- ✅ **HTTP-only cookies**
- ✅ **JWT token validation**
- ✅ **Input validation and sanitization**
- ✅ **Rate limiting**
- ✅ **CORS configuration**

### **Supabase Security**
- ✅ **Service role for admin operations**
- ✅ **Anon key for client operations**
- ✅ **Row Level Security (RLS)**
- ✅ **Proper user data isolation**

## 🚀 **Production Deployment**

### **Environment Variables**

**Frontend (.env):**
```bash
VITE_NODE_BACKEND_URL=https://your-backend-url.com
```

**Backend (.env):**
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

### **Deployment Checklist**
- ✅ Backend deployed with proper environment variables
- ✅ Frontend configured with backend URL
- ✅ HTTPS enabled for production
- ✅ CORS configured for frontend domain
- ✅ Database migrations applied

## 📊 **Monitoring & Analytics**

### **Error Tracking**
- All authentication errors are logged
- Network failures tracked with retry attempts
- User behavior analytics (login/logout patterns)

### **Performance Metrics**
- API response times
- Session duration tracking
- Error rates and types

## 🎯 **Benefits**

- ✅ **Secure**: HTTP-only cookies, no XSS vulnerabilities
- ✅ **Scalable**: Backend handles all auth operations
- ✅ **Maintainable**: Clear separation of concerns
- ✅ **Type Safe**: Full TypeScript support
- ✅ **Production Ready**: Comprehensive error handling
- ✅ **Developer Friendly**: Clean API, good documentation

## 🚨 **Important Notes**

### **DO NOT**
- ❌ Access Supabase directly from frontend
- ❌ Store sensitive tokens in localStorage
- ❌ Expose service role key in frontend
- ❌ Bypass backend for authentication

### **DO**
- ✅ Use backend API for all auth operations
- ✅ Handle errors gracefully
- ✅ Validate inputs on both frontend and backend
- ✅ Monitor authentication metrics
- ✅ Keep dependencies updated

---

**Built with security-first principles for enterprise-grade authentication** 🔐