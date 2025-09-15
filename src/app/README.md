# App Shell - BetweenDeals MVP

The app folder contains the foundational architecture that supports all features in the MVP frontend. This is the **application shell** that provides the core infrastructure for the entire application.

## 📁 **Current Structure**

```
app/
├── providers/          # Context providers for global state
│   ├── providers.tsx       # Main provider composition
│   ├── auth-provider.tsx   # Authentication + modal management
│   ├── ui-provider.tsx     # UI state (sidebar, notifications)
│   └── README.md           # Provider documentation
├── layouts/            # Page layout components
│   ├── MainLayout.tsx      # Standard page layout with header/footer
│   ├── AuthLayout.tsx      # Authentication page layout
│   ├── DashboardLayout.tsx # Dashboard layout with sidebar
│   ├── LogoOnlyLayout.tsx  # Minimal layout (checkout, etc.)
│   ├── LayoutSplit.tsx     # Split screen layout
│   └── index.ts            # Layout exports
├── routing/            # Route configuration and guards
│   ├── router.tsx          # Main route configuration
│   ├── route-guards.tsx    # Authentication guards
│   └── README.md           # Routing documentation
└── README.md           # This file
```

## 🏗️ **Architecture Overview**

### **Application Shell Components**

#### **1. Providers (`/providers/`)**
- **`providers.tsx`**: Main provider composition that wraps the entire app
- **`auth-provider.tsx`**: Combined authentication state and modal management
- **`ui-provider.tsx`**: Global UI state (sidebar, notifications, loading)

#### **2. Layouts (`/layouts/`)**
- **`MainLayout.tsx`**: Standard layout with header and footer
- **`AuthLayout.tsx`**: Centered layout for authentication pages
- **`DashboardLayout.tsx`**: Sidebar layout for dashboard pages
- **`LogoOnlyLayout.tsx`**: Minimal layout for checkout and special pages
- **`LayoutSplit.tsx`**: Split screen layout for specific flows

#### **3. Routing (`/routing/`)**
- **`router.tsx`**: Main route configuration with all application routes
- **`route-guards.tsx`**: Authentication guards for protected routes

## 🎯 **Purpose & Scope**

### **What This App Shell Provides**
- ✅ **Global State Management**: Authentication and UI state
- ✅ **Layout System**: Consistent page layouts across the app
- ✅ **Route Protection**: Authentication-based route guards
- ✅ **Provider Composition**: Clean provider hierarchy
- ✅ **Type Safety**: Full TypeScript support

### **What This App Shell Does NOT Include**
- ❌ **Business Logic**: Feature-specific functionality
- ❌ **Page Components**: Individual page implementations
- ❌ **API Services**: Data fetching and API integration
- ❌ **Shared Components**: Reusable UI components
- ❌ **Utilities**: Helper functions and utilities

## 🔧 **Usage**

### **Provider Composition**
```typescript
import { AppProviders } from '@app/providers/providers';

function App() {
  return (
    <AppProviders>
      <YourAppContent />
    </AppProviders>
  );
}
```

### **Layout Usage**
```typescript
import { MainLayout, AuthLayout, DashboardLayout } from '@app/layouts';

// In your routes
<Route path="/" element={<MainLayout />}>
  <Route index element={<HomePage />} />
</Route>

<Route path="/auth" element={<AuthLayout />}>
  <Route path="login" element={<LoginPage />} />
</Route>
```

### **Route Protection**
```typescript
import { ProtectedRoute, GuestRoute } from '@app/routing/route-guards';

// Protected route
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />

// Guest-only route
<Route path="/login" element={
  <GuestRoute>
    <LoginPage />
  </GuestRoute>
} />
```

## 🏆 **Status**

**Status**: ✅ **COMPLETE**  
**Purpose**: 🏠 **Application Shell**  
**Scope**: 🎯 **Core Infrastructure Only**  
**Ready**: 🚀 **Ready for Feature Implementation**

The app shell is **complete and ready** to support the implementation of features, pages, and business logic. It provides a solid foundation for the entire MVP application.

---

**This app shell provides the essential infrastructure for the MVP. Features, pages, and business logic are implemented in the `/features/` and `/shared/` directories.**