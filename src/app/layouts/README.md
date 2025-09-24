# Layouts

This directory contains the different layout components used throughout the Flyp application.

## Available Layouts

### MainLayout

- **Purpose**: Public pages, general content pages
- **Usage**: Home page, search, listings, about, contact, help, legal pages
- **Features**: Full navigation bar with logo, menu items, auth buttons, optional footer

### BuyerLayout

- **Purpose**: Buyer pages (like Airbnb guest mode)
- **Usage**: Buyer dashboards, browsing businesses, saved items, messages
- **Features**:
  - Clean navigation with logo and user menu
  - NO "List your business" button (buyers don't list)
  - Minimal design and spacing
  - Optional footer

### SellerLayout

- **Purpose**: Seller pages (like Airbnb host mode)
- **Usage**: Seller dashboards, business management, listings, valuation
- **Features**:
  - Navigation items: Overview (my-business), Valuation, Data Room
  - User avatar/profile menu on the right
  - Optional footer

### AuthLayout

- **Purpose**: Authenticated user pages and dashboard pages (legacy)
- **Usage**: User dashboards, business management, account settings, messages
- **Features**:
  - Clean navigation with logo, "List your business" button, and user menu
  - No center navigation items (For Sellers, For Buyers, Valuation)
  - Minimal design and spacing
  - Optional footer

### LogoOnlyLayout

- **Purpose**: Checkout and payment flows
- **Usage**: Checkout pages, payment processing
- **Features**: Minimal layout with just logo, focused on conversion

### LayoutSplit

- **Purpose**: Authentication flows
- **Usage**: Login, signup, password reset, email verification
- **Features**: Split-screen layout for authentication

## Usage

```tsx
// In your router configuration
import { AuthLayout, BuyerLayout, MainLayout, SellerLayout } from '@/app/layouts';

// For buyer pages
{
  path: '/buyer',
  element: <BuyerLayout />,
  children: [
    { index: true, element: <BuyerDashboard /> }
  ]
}

// For seller pages
{
  path: '/seller',
  element: <SellerLayout />,
  children: [
    { index: true, element: <SellerDashboard /> }
  ]
}

// For dashboard pages (legacy)
{
  path: '/my-business',
  element: <AuthLayout />,
  children: [
    { index: true, element: <BusinessOverview /> }
  ]
}

// For public pages
{
  path: '/',
  element: <MainLayout />,
  children: [
    { index: true, element: <HomePage /> }
  ]
}
```

## Layout Selection Guide

| Page Type                    | Layout         | Reason                                         |
| ---------------------------- | -------------- | ---------------------------------------------- |
| Home, About, Contact         | MainLayout     | Full navigation for public access              |
| Buyer Dashboard              | BuyerLayout    | Clean interface without listing button         |
| Seller Dashboard             | SellerLayout   | Navigation with Overview, Valuation, Data Room |
| User Dashboard (legacy)      | AuthLayout     | Clean, focused interface                       |
| Business Management (legacy) | AuthLayout     | Minimal navigation, focus on content           |
| Checkout/Payment             | LogoOnlyLayout | Conversion-focused, minimal distractions       |
| Login/Signup                 | LayoutSplit    | Authentication-focused design                  |
| User Settings (legacy)       | AuthLayout     | Clean interface for account management         |

## Navigation Components

Each layout uses appropriate navigation components:

- **MainLayout**: Uses `Navigation` (full navigation with center menu items)
- **BuyerLayout**: Uses `BuyerNavigation` (clean navigation without listing button)
- **SellerLayout**: Uses `SellerNavigation` (navigation with Overview, Valuation, Data Room)
- **AuthLayout**: Uses `BuyerNavigation` (clean navigation without listing button) - **UPDATED**
- **LogoOnlyLayout**: Uses minimal logo-only navigation
- **LayoutSplit**: Uses authentication-specific navigation
