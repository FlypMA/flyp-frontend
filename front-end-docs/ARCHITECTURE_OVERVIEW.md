# 🏗️ Frontend Architecture Overview

**Detailed architecture reference for the Flyp frontend application**

**Updated:** September 2025  
**Architecture:** Modern React with TypeScript  
**Status:** ✅ Production Ready

---

## 🎯 Architecture Principles

### **1. Hybrid Organization**

The application uses a hybrid approach combining page-based routing with feature modules:

- **App Layer**: Application shell with layouts, routing, and providers
- **Features**: Self-contained business domain modules
- **Shared**: Reusable components, services, and utilities

### **2. Component Strategy**

- **Shared Components**: Reusable UI primitives and design system
- **Feature Components**: Business logic specific to domains
- **Page Components**: Route-based components in the app layer

```typescript
// Shared components (reusable across features)
import { Input, Button, Modal } from '@/shared/components/forms';

// Feature-specific components
import { LoginModal, SignupModal } from '@/features/authentication';

// Page components
import { BusinessOverview } from '@/app/pages/business/overview';
```

### **3. Clean Separation of Concerns**

- **App**: Application shell, routing, layouts, and page components
- **Features**: Business domains with complete ownership
- **Shared**: Reusable components, services, types, and utilities
- **Config**: Environment and API configuration

---

## 📁 Detailed Directory Structure

````bash
src/
├── app/                      # 🏠 Application Shell
│   ├── layouts/             # Layout components
│   │   ├── MainLayout.tsx   # Public pages layout
│   │   ├── AuthLayout.tsx   # Authenticated pages layout
│   │   ├── DashboardLayout.tsx # Seller dashboard layout
│   │   └── LayoutSplit.tsx  # Split screen layout
│   │
│   ├── pages/               # Route-based page components
│   │   ├── account/         # Account management pages
│   │   ├── business/        # Business dashboard pages
│   │   ├── checkout/        # Payment and subscription pages
│   │   ├── company/         # Company info pages
│   │   ├── landingPages/    # Marketing pages
│   │   ├── listings/        # Listing pages
│   │   ├── messages/        # Messaging pages
│   │   └── support/         # Support and help pages
│   │
│   ├── providers/           # React context providers
│   │   ├── auth-provider.tsx # Authentication context
│   │   ├── ui-provider.tsx  # UI theme provider
│   │   └── providers.tsx    # Combined providers
│   │
│   ├── routing/             # Router configuration
│   │   ├── router.tsx       # Main router setup
│   │   └── route-guards.tsx # Protected route components
│   │
│   └── services/            # App-level services
│       ├── payments/        # Payment processing
│       ├── urlMapping/      # URL generation
│       └── users/           # User services
│
├── features/                # 🎯 Business Domain Features
│   ├── authentication/     # Authentication domain
│   │   ├── components/      # Auth-specific components
│   │   │   ├── LoginModal.tsx
│   │   │   ├── SignupModal.tsx
│   │   │   └── forms/       # Auth form components
│   │   ├── hooks/           # Auth-related hooks
│   │   └── index.ts         # Feature exports
│   │
│   ├── business/            # Business management domain
│   │   ├── components/      # Business-specific components
│   │   ├── hooks/           # Business-related hooks
│   │   ├── pages/           # Business page components
│   │   ├── services/        # Business API services
│   │   └── types/           # Business type definitions
│   │
│   └── listings/            # Listing management domain
│       ├── components/      # Listing-specific components
│       └── index.ts         # Feature exports
│
├── shared/                  # 🔄 Reusable Resources
│   ├── components/          # Shared UI components
│   │   ├── forms/           # Form components (Input, Textarea, etc.)
│   │   ├── layout/          # Layout components (Navigation, Footer)
│   │   ├── modals/          # Modal components
│   │   ├── buttons/         # Button components
│   │   ├── cards/           # Card components
│   │   └── [other-ui]/      # Other UI components
│   │
│   ├── services/            # Shared services
│   │   ├── auth/            # Authentication services
│   │   ├── urls/            # URL generation utilities
│   │   └── monitoring/      # Monitoring and logging
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── user.ts          # User-related types
│   │   ├── api.ts           # API response types
│   │   └── index.ts         # Type exports
│   │
│   └── utils/               # Utility functions
│       ├── api/             # API utilities
│       ├── seo/             # SEO utilities
│       └── ux/              # UX utilities (ScrollToTop)
│
├── config/                  # ⚙️ Configuration
│   ├── api-config.ts        # API configuration
│   ├── supabase.ts          # Supabase client setup
│   └── config.ts            # App configuration
│
└── assets/                  # 📁 Static Assets
    ├── GroceryStore.jpg     # Background images
    ├── RecordStore.jpg      # Background images
    └── betweendeals-logo.svg # Legacy logo
---

## 🔧 Technical Stack Details

### **Core Technologies**
- **React 18**: Latest React with concurrent features
- **TypeScript**: Strict type checking enabled
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **HeroUI**: React component library for complex components

### **State Management**
- **React Context**: Authentication and UI state
- **Zustand**: Complex state management (when needed)
- **Local State**: Component-level state with useState/useReducer

### **Authentication & API**
- **Supabase Auth**: User authentication and session management
- **Supabase Client**: Database operations and real-time features
- **Axios**: HTTP client for external APIs

### **Development Tools**
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Vitest**: Fast unit testing framework
- **Husky**: Git hooks for quality gates

---

## 🎨 Component Guidelines

### **Shared Components**
Create in `shared/components/` when:
- ✅ Reused across multiple features
- ✅ Part of the design system
- ✅ Common UI patterns (buttons, inputs, modals)
- ✅ No business logic

### **Feature Components**
Create in `features/[domain]/components/` when:
- ✅ Feature-specific business logic
- ✅ Domain-specific data structures
- ✅ Unique to feature workflows

### **Page Components**
Create in `app/pages/` when:
- ✅ Route-based components
- ✅ Layout composition
- ✅ Data fetching and coordination

---

## 🚀 Development Benefits

### **Scalability**
- Clear ownership boundaries per feature
- Independent development streams
- Reduced merge conflicts
- Easy onboarding for new developers

### **Maintainability**
- Single source of truth for shared code
- No duplicate implementations
- Clear import patterns
- Consistent file organization

### **Performance**
- Optimized bundle splitting
- Lazy loading capabilities
- Clean dependency graphs
- Efficient re-renders with proper state management

---

## 📋 Best Practices

### **File Naming**
- **Components**: PascalCase (e.g., `LoginModal.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **Types**: PascalCase (e.g., `User.ts`)

### **Import Organization**
```typescript
// 1. External libraries
import React from 'react';
import { Button } from '@heroui/react';

// 2. Internal shared
import { Input } from '@/shared/components/forms';
import { useAuth } from '@/shared/services/auth';

// 3. Feature-specific
import { LoginForm } from './components/LoginForm';

// 4. Relative imports
import './styles.css';
````

### **Component Structure**

```typescript
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. Default export

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  // Component logic
  return (
    // JSX
  );
};

export default LoginModal;
```

---

## 📋 Quick Reference

### **Common Import Patterns**

```typescript
// Shared components
import { Input, Button, Modal } from '@/shared/components/forms';
import { Navigation, Footer } from '@/shared/components/layout';

// Feature components
import { LoginModal, SignupModal } from '@/features/authentication';

// Services
import { authService } from '@/shared/services/auth';
import { UrlGenerator } from '@/shared/services/urls';

// Types
import { User, UserRole } from '@/shared/types';
```

### **Path Aliases**

- `@/app/*` → `src/app/*`
- `@/features/*` → `src/features/*`
- `@/shared/*` → `src/shared/*`
- `@/config/*` → `src/config/*`

### **Feature Structure Example**

```bash
features/authentication/
├── components/
│   ├── LoginModal.tsx
│   ├── SignupModal.tsx
│   └── forms/
├── hooks/
│   └── useAuthModal.tsx
└── index.ts
```

---

## 🏆 Architecture Status

### **✅ Current State**

- **Status**: Production Ready
- **Architecture**: Hybrid (App + Features + Shared)
- **Type Safety**: 100% TypeScript coverage
- **Testing**: Vitest + Testing Library setup
- **Performance**: Optimized with Vite

### **🎯 Key Strengths**

- Clean separation of concerns
- Reusable component library
- Type-safe API integration
- Modern development tooling
- Scalable project structure

---

**This architecture provides a solid foundation for building and maintaining a modern React application with TypeScript, following current industry best practices.**
