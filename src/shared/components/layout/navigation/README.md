# 🧭 Navigation System - Buyer/Seller Based

> **✨ Recent Changes (Mobile Navigation Consolidation):**
>
> - `NavigationMobile.tsx`, `BuyerNavigationMobile.tsx`, and `SellerNavigationMobile.tsx` have been **REMOVED**
> - Replaced with unified `RoleNavigationMobile.tsx` in `unified/` directory
> - 70% reduction in mobile navigation code duplication
> - All mobile navigation now uses Zustand store and type-safe config from `navigationConfig.ts`

## 📁 Directory Structure

```
navigation/
├── main/                      # Main navigation components
│   ├── Navigation.tsx         # Main navigation orchestrator
│   ├── NavigationDesktop.tsx  # Desktop navigation (based on UnifiedNavigation)
│   └── index.ts               # Main navigation exports
├── buyer/                     # Buyer navigation components (like Airbnb guest)
│   ├── BuyerNavigation.tsx    # Buyer navigation orchestrator
│   ├── BuyerNavigationDesktop.tsx # Desktop buyer navigation
│   └── index.ts               # Buyer navigation exports
├── seller/                    # Seller navigation components (like Airbnb host)
│   ├── SellerNavigation.tsx   # Seller navigation orchestrator
│   ├── SellerNavigationDesktop.tsx # Desktop seller navigation
│   └── index.ts               # Seller navigation exports
├── unified/                   # Unified mobile navigation (NEW)
│   └── RoleNavigationMobile.tsx   # Unified mobile nav for all roles
├── dropdown/                  # User avatar dropdown components
│   ├── BuyerDropdown.tsx      # Buyer-specific dropdown
│   ├── SellerDropdown.tsx     # Seller-specific dropdown
│   └── index.ts               # Dropdown exports
├── dashboard/                 # Dashboard sidebar components (legacy)
│   ├── DashboardSidebar.tsx   # Desktop dashboard sidebar
│   ├── DashboardSidebarMobile.tsx # Mobile dashboard sidebar
│   └── index.ts               # Dashboard exports
├── index.ts                   # Main navigation exports
└── README.md                  # This documentation
```

## 🎯 Purpose

The navigation system provides a modular, production-ready navigation experience based on the legacy app implementation. Each component is carefully crafted to match the legacy functionality while providing better organization and maintainability.

## 🚀 Components Overview

### **Main Navigation System**

#### **Navigation.tsx (Orchestrator)**

- **Purpose**: Main navigation orchestrator that handles both desktop and mobile
- **Based on**: Legacy UnifiedNavigation.tsx logic
- **Features**:
  - Authentication state management
  - Token checking and user authentication
  - Mobile menu state management
  - Orchestrates NavigationDesktop and RoleNavigationMobile

#### **NavigationDesktop.tsx**

- **Purpose**: Desktop navigation bar
- **Based on**: Legacy UnifiedNavigation.tsx desktop logic
- **Features**:
  - Desktop navigation with authentication
  - Role-based user avatar dropdown integration
  - Mobile menu toggle button
  - Navigation items (For Sellers, For Buyers, Valuation Guide)

#### **NavigationMobile.tsx**

- **Purpose**: Mobile navigation sidebar
- **Based on**: Legacy MobileNavigation.tsx
- **Features**:
  - Mobile sidebar with slide-in animation
  - Role-based navigation sections
  - Body scroll prevention
  - User profile display for authenticated users

### **Buyer Navigation System (Like Airbnb Guest Mode)**

#### **BuyerNavigation.tsx (Orchestrator)**

- **Purpose**: Buyer navigation orchestrator (like Airbnb guest mode)
- **Features**:
  - Clean navigation without "List your business" button
  - Logo and user menu only
  - Mobile menu state management
  - Orchestrates BuyerNavigationDesktop and BuyerNavigationMobile

#### **BuyerNavigationDesktop.tsx**

- **Purpose**: Desktop navigation for buyers
- **Features**:
  - Logo on the left
  - User avatar/profile menu on the right
  - NO "List your business" button (buyers don't list)
  - Clean, minimal design

#### **BuyerNavigationMobile.tsx**

- **Purpose**: Mobile navigation for buyers
- **Features**:
  - Mobile menu overlay
  - User authentication options
  - No "List your business" option
  - Clean, minimal design

### **Seller Navigation System (Like Airbnb Host Mode)**

#### **SellerNavigation.tsx (Orchestrator)**

- **Purpose**: Seller navigation orchestrator (like Airbnb host mode)
- **Features**:
  - Navigation items: Overview, Valuation, Data Room
  - User avatar/profile menu on the right
  - Mobile menu state management
  - Orchestrates SellerNavigationDesktop and SellerNavigationMobile

#### **SellerNavigationDesktop.tsx**

- **Purpose**: Desktop navigation for sellers
- **Features**:
  - Logo on the left
  - Navigation items: Overview, Valuation, Data Room
  - User avatar/profile menu on the right
  - Based on MainLayout navigation structure

#### **SellerNavigationMobile.tsx**

- **Purpose**: Mobile navigation for sellers
- **Features**:
  - Mobile menu overlay
  - Navigation items: Overview, Valuation, Data Room
  - User authentication options
  - Clean, minimal design

### **User Avatar Dropdown System**

#### **BuyerDropdown.tsx**

- **Purpose**: Buyer-specific user avatar dropdown
- **Based on**: Legacy user_avatar_dropdown.tsx buyer logic
- **Features**:
  - Browse businesses, saved items, messages
  - Account settings and help
  - Logout functionality

#### **SellerDropdown.tsx**

- **Purpose**: Seller-specific user avatar dropdown
- **Based on**: Legacy user_avatar_dropdown.tsx seller logic
- **Features**:
  - Business dashboard, listings, valuation
  - Performance tracking and analytics
  - Browse businesses (dual role support)
  - Account settings and help
  - Logout functionality

### **Dashboard Sidebar System**

#### **DashboardSidebar.tsx**

- **Purpose**: Desktop collapsible sidebar for seller dashboard
- **Features**:
  - Business management navigation sections
  - Role-based navigation items
  - Active state highlighting
  - Coming soon features

#### **DashboardSidebarMobile.tsx**

- **Purpose**: Mobile-optimized sidebar for seller dashboard
- **Features**:
  - Mobile-optimized with slide-in animation
  - Touch-friendly navigation items
  - Business management sections

## 🔧 Usage

### **Basic Usage**

```typescript
import {
  Navigation,
  BuyerNavigation,
  SellerNavigation,
  DashboardSidebar,
  BuyerDropdown,
  SellerDropdown
} from './navigation';

// Main navigation (used in MainLayout)
<Navigation />

// Buyer navigation (used in BuyerLayout)
<BuyerNavigation />

// Seller navigation (used in SellerLayout)
<SellerNavigation />

// Dashboard sidebar (used in DashboardLayout)
<DashboardSidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} user={user} />

// Role-specific dropdowns (used within NavigationDesktop)
{user.role === 'buyer' ? (
  <BuyerDropdown user={user} />
) : (
  <SellerDropdown user={user} />
)}
```

### **Layout Integration**

```typescript
// In MainLayout.tsx
import { Navigation } from './navigation';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

// In BuyerLayout.tsx
import { BuyerNavigation } from './navigation';

const BuyerLayout = () => (
  <div className="min-h-screen flex flex-col">
    <BuyerNavigation />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

// In SellerLayout.tsx
import { SellerNavigation } from './navigation';

const SellerLayout = () => (
  <div className="min-h-screen flex flex-col">
    <SellerNavigation />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

// In DashboardLayout.tsx
import { DashboardSidebar, DashboardSidebarMobile } from './navigation';

const DashboardLayout = () => (
  <div className="flex h-screen bg-gray-50">
    <DashboardSidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} user={user} />
    <DashboardSidebarMobile isOpen={isOpen} onClose={onClose} user={user} />
    <div className="flex flex-1 flex-col">
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  </div>
);
```

## 🎨 Legacy App Mapping

### **Component Mapping**

| Legacy Component           | MVP Component                              | Purpose                       |
| -------------------------- | ------------------------------------------ | ----------------------------- |
| `UnifiedNavigation.tsx`    | `Navigation.tsx` + `NavigationDesktop.tsx` | Main navigation orchestration |
| `MobileNavigation.tsx`     | `NavigationMobile.tsx`                     | Mobile sidebar navigation     |
| `user_avatar_dropdown.tsx` | `BuyerDropdown.tsx` + `SellerDropdown.tsx` | Role-specific user dropdowns  |
| `SellerSidebar.tsx`        | `DashboardSidebar.tsx`                     | Desktop dashboard sidebar     |

### **Feature Mapping**

- ✅ **Authentication state management** - Matches legacy UnifiedNavigation
- ✅ **Role-based navigation** - Matches legacy user_avatar_dropdown
- ✅ **Mobile navigation** - Matches legacy MobileNavigation
- ✅ **Dashboard sidebar** - Matches legacy SellerSidebar

## 🔗 Service Integration

### **Authentication Service**

```typescript
import { authService } from '../../services';

// Check authentication (used in Navigation.tsx)
const authResult = await authService.checkAuthentication();

// Logout (used in dropdown components)
await authService.logout();
```

### **URL Generator Service**

```typescript
import { UrlGenerator } from '../../services';

// Generate URLs (used throughout navigation components)
const urls = {
  home: UrlGenerator.root(),
  search: UrlGenerator.search(),
  myBusiness: UrlGenerator.myBusiness(),
  createListing: UrlGenerator.createListing(),
};
```

## 🎯 Role-Based Navigation

### **Buyer Navigation**

- Browse Businesses
- Saved Items
- Messages
- Account Settings
- Help Center

### **Seller Navigation**

- Business Dashboard
- My Listings
- Business Valuation
- Performance
- Browse Businesses (dual role)
- Saved Items
- Messages
- Account Settings
- Help Center

### **Hybrid (Both) Navigation**

- All seller features
- All buyer features
- Unified experience

## 📱 Responsive Design

### **Desktop (≥1024px)**

- Full navigation bar with center navigation items
- Role-specific user avatar dropdowns
- Collapsible dashboard sidebar
- Hover effects and keyboard navigation

### **Mobile (<1024px)**

- Mobile navigation sidebar with slide-in animation
- Touch-friendly navigation items
- Mobile dashboard sidebar
- Body scroll prevention

## 🚀 Performance Optimizations

### **Code Splitting**

- Modular components for tree shaking
- Role-specific dropdowns loaded as needed
- Optimized bundle size

### **Re-render Optimization**

- Proper state management in orchestrator
- Efficient event handlers
- Focused component updates

## 🔧 Customization

### **Adding New Navigation Items**

```typescript
// In NavigationDesktop.tsx
const getNavigationItems = () => {
  return [
    { href: UrlGenerator.forSellers(), label: 'For Sellers' },
    { href: UrlGenerator.search(), label: 'For Buyers' },
    { href: UrlGenerator.valuationGuide(), label: 'Valuation Guide' },
    // Add new items here
  ];
};
```

### **Adding New Dropdown Items**

```typescript
// In BuyerDropdown.tsx or SellerDropdown.tsx
const menuItems = [
  { icon: Search, label: 'Browse Businesses', href: UrlGenerator.search() },
  // Add new items here
];
```

## 🐛 Troubleshooting

### **Common Issues**

#### **Navigation not showing**

- Check if Navigation component is imported correctly
- Verify authentication service integration
- Check console for errors

#### **Dropdown not working**

- Ensure user prop is passed correctly
- Check role-based dropdown selection logic
- Verify click outside handlers

#### **Mobile navigation issues**

- Check mobile menu state management
- Verify body scroll prevention
- Ensure proper z-index values

## 📚 Related Documentation

- [Legacy UnifiedNavigation.tsx](../../../flyp-frontend-legacy/src/app/components/navigation/UnifiedNavigation.tsx)
- [Legacy MobileNavigation.tsx](../../../flyp-frontend-legacy/src/app/components/navigation/MobileNavigation.tsx)
- [Legacy user_avatar_dropdown.tsx](../../../flyp-frontend-legacy/src/app/components/account/account_UI/navigation/user_avatar_dropdown.tsx)

## 🤝 Contributing

When modifying navigation components:

1. **Follow legacy app patterns** - Maintain compatibility with existing functionality
2. **Update both desktop and mobile** - Ensure consistent experience
3. **Test role-based navigation** - Verify buyer, seller, and hybrid roles
4. **Add proper TypeScript types** - Maintain type safety
5. **Update this README** - Document any changes

## 📄 License

This navigation system is part of the UpSwitch MVP application and follows the same licensing terms.
