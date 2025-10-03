# 🚀 MVP Routing - UpSwitch MVP

## 📋 **Overview**

Simple, MVP-appropriate routing system with just 3 files. No over-engineering, no premature optimization - just what you need for an MVP.

## 📁 **File Structure**

```
src/app/routing/
├── router.tsx              # Main router configuration
├── route-guards.tsx        # Basic route protection
└── README.md              # This documentation
```

## 🛣️ **Routes**

### **Public Routes**

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/search` - Search listings
- `/search` - Browse listings (with design variations for A/B testing)
- `/listings/:id` - Listing details
- `/login` - Login page
- `/register` - Register page

### **Protected Routes**

- `/dashboard` - User dashboard (requires auth)
- `/profile` - User profile (requires auth)

### **Legacy Redirects**

- `/account` → `/profile`
- `/account/seller` → `/dashboard`
- `/account/settings` → `/profile`
- `/business` → `/dashboard`
- `/selling` → `/dashboard`
- `/buying` → `/search`

## 🛡️ **Route Protection**

### **ProtectedRoute**

```typescript
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

- Requires authentication
- Redirects to `/login` if not authenticated
- Shows loading state while checking auth

### **GuestRoute**

```typescript
<GuestRoute>
  <LoginPage />
</GuestRoute>
```

- For login/register pages
- Redirects to `/dashboard` if already authenticated
- Shows loading state while checking auth

## 🚀 **Usage**

### **Basic Setup**

```typescript
import { router } from '@app/routing/router';

function App() {
  return <RouterProvider router={router} />;
}
```

### **Adding New Routes**

1. Import your page component
2. Add route to router.tsx
3. Wrap with protection if needed

```typescript
// Add to router.tsx
{ path: 'new-page', element: <NewPage /> },

// Or with protection
{
  path: 'protected-page',
  element: (
    <ProtectedRoute>
      <ProtectedPage />
    </ProtectedRoute>
  ),
},
```

## 🎯 **MVP Principles**

- ✅ **Simple**: 3 files only
- ✅ **Direct Imports**: No lazy loading for MVP
- ✅ **Basic Protection**: Auth check only
- ✅ **Essential Routes**: Only what's needed
- ✅ **Legacy Support**: Key redirects only

## 🔄 **When to Scale Up**

When your MVP grows beyond 10-15 routes, consider:

- Lazy loading for performance
- Role-based protection
- Feature-based organization
- Advanced route guards

**For now**: Keep it simple! 🚀

---

**Status**: ✅ **MVP READY**  
**Complexity**: 🎯 **APPROPRIATE**  
**Files**: 📁 **3 FILES ONLY**
