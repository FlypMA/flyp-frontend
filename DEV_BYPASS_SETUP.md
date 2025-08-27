# Development Authentication Bypass Setup

## Overview

This document explains how to use the development authentication bypass feature to test protected pages and components without needing to log in.

## How It Works

The development bypass is controlled by the `VITE_DEV_BYPASS_AUTH` environment variable in your `.env.local` file. When enabled, it automatically bypasses all authentication checks and provides a mock user for development purposes.

## Configuration

### 1. Environment Variable

The bypass is controlled by this setting in your `.env.local` file:

```bash
# 🚨 DEVELOPMENT BYPASS: Set to true to bypass authentication for testing
VITE_DEV_BYPASS_AUTH=true
```

### 2. Mock User Details

When the bypass is active, you'll be automatically logged in as:

- **Email**: `dev@betweendeals.com`
- **Name**: `Development User`
- **User Type**: `Seller`
- **ID**: `dev-user-123`

## What Gets Bypassed

The following authentication checks are bypassed in development mode:

1. **Protected Routes** (`ProtectedRoute.tsx`)
   - All routes wrapped with `ProtectedRoute` will allow access
   - No redirect to login page

2. **Authentication Service** (`authenticationService.ts`)
   - `checkAuthentication()` returns a mock authenticated user
   - `getAuthenticatedUser()` returns a mock token

3. **Authenticated Layout** (`layout_authenticated.tsx`)
   - Automatically provides mock user data
   - Enables all authenticated features

## Protected Pages You Can Now Access

With the bypass enabled, you can access all these protected pages:

### Account Pages

- `/account` - Main account dashboard
- `/account/seller` - Seller dashboard
- `/account/buyer` - Buyer dashboard
- `/account/settings` - Account settings

### Seller Pages

- `/seller` - Seller dashboard
- `/seller/dashboard` - Seller dashboard
- `/seller/listings/new` - Create new listing
- `/seller/listings/:id/edit` - Edit listing

### Buyer Pages

- `/buyer` - Buyer dashboard
- `/buyer/dashboard` - Buyer dashboard
- `/buyer/search` - Search listings
- `/buyer/saved-searches` - Saved searches

### Transaction Pages

- `/transaction/:transactionId` - Transaction flow

### Onboarding Pages

- `/onboarding/seller` - Seller onboarding
- `/onboarding/buyer` - Buyer onboarding

## Console Logs

When the bypass is active, you'll see these console messages:

```
🚨 DEV MODE: Bypassing authentication check for development
🚨 DEV MODE: getAuthenticatedUser bypassing for development
🚨 DEV MODE: Bypassing authentication for development
```

## Security Note

⚠️ **IMPORTANT**: This bypass only works in development mode (`NODE_ENV === 'development'`) and when `VITE_DEV_BYPASS_AUTH=true`. It will never work in production builds.

## Troubleshooting

### Bypass Not Working?

1. **Check Environment Variable**:

   ```bash
   # Make sure this is set in .env.local
   VITE_DEV_BYPASS_AUTH=true
   ```

2. **Restart Development Server**:

   ```bash
   npm run dev
   ```

3. **Check Console Logs**:
   - Look for the bypass messages in browser console
   - If you don't see them, the bypass isn't active

4. **Clear Browser Cache**:
   - Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
   - Clear browser cache and cookies

### Still Having Issues?

1. Check that you're in development mode
2. Verify the `.env.local` file is in the correct location
3. Ensure the development server is running
4. Check browser console for any errors

## Disabling the Bypass

To disable the bypass and test normal authentication:

1. Set `VITE_DEV_BYPASS_AUTH=false` in `.env.local`
2. Restart the development server
3. You'll need to log in normally to access protected pages

## Development Workflow

1. **Enable bypass** for general development and testing
2. **Disable bypass** when testing authentication flows
3. **Use real accounts** when testing user-specific features
4. **Always test without bypass** before deploying

This setup allows you to efficiently develop and test all parts of the application without constantly logging in and out.
