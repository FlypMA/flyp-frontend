# Logo Components

This directory contains logo components and configurations for the flyp brand identity.

## Components

### flypLogo

The main logo component for displaying the flyp brand logo with various variants and configurations.

**Features:**

- Multiple variants: `header`, `footer`, `sidebar`, `mobile`
- Customizable dimensions
- Responsive design
- Alt text customization
- Click handler support
- Link wrapper option
- Cache busting for logo updates

**Usage:**

```tsx
import { flypLogo } from '@/shared/components/logo';

// Basic logo
<flypLogo />

// Header variant with custom size
<flypLogo
  variant="header"
  width={120}
  height={40}
/>

// Footer variant
<flypLogo variant="footer" />

// With click handler
<flypLogo
  onClick={() => navigate('/')}
  className="cursor-pointer hover:opacity-80"
/>

// As a link
<flypLogo
  asLink
  href="/"
  variant="sidebar"
/>
```

**Props:**

- `variant`: 'header' | 'footer' | 'sidebar' | 'mobile' - Logo variant
- `width`: number - Custom width override
- `height`: number | 'auto' - Custom height override
- `className`: string - Additional CSS classes
- `alt`: string - Custom alt text
- `onClick`: () => void - Click handler
- `asLink`: boolean - Render as link wrapper
- `href`: string - Link destination (when asLink is true)

### BrandLogo

A generic brand logo component for displaying various brand logos with consistent styling.

**Features:**

- Generic brand logo support
- Customizable dimensions
- Alt text support
- Click handler support
- Responsive design

**Usage:**

```tsx
import { BrandLogo } from '@/shared/components/logo';

<BrandLogo src="/partner-logo.svg" alt="Partner Company" width={100} height={50} />;
```

### Logo Configuration (logos.ts)

Centralized logo configuration and utilities for consistent logo usage across the platform.

**Features:**

- Centralized logo paths
- Cache busting support
- Variant configurations
- Utility functions
- Favicon references

**Usage:**

```tsx
import { logos, getLogoConfig } from '@/shared/components/logo';

// Get logo path
const logoPath = logos.main;

// Get configuration for specific variant
const config = getLogoConfig('header');
```

## Logo Variants

### Header Variant

- **Use Case**: Main navigation, top of page
- **Default Size**: 120px × 40px
- **Context**: Primary brand presence

### Footer Variant

- **Use Case**: Footer sections, bottom of page
- **Default Size**: 100px × 35px
- **Context**: Secondary brand presence

### Sidebar Variant

- **Use Case**: Dashboard sidebar, navigation panels
- **Default Size**: 80px × 30px
- **Context**: Compact brand presence

### Mobile Variant

- **Use Case**: Mobile navigation, small screens
- **Default Size**: 100px × 35px
- **Context**: Mobile-optimized display

## Design System Integration

- **Consistent Sizing**: Standardized dimensions across variants
- **Responsive Design**: Adapts to different screen sizes
- **Brand Guidelines**: Follows flyp brand standards
- **Accessibility**: Proper alt text and semantic markup

## Cache Busting

The logo system includes cache busting to ensure users always see the latest logo version:

```tsx
// Logo path includes version parameter
const logoPath = '/flyp_logo.svg?v=2024.2';
```

## Accessibility

- **Alt Text**: Descriptive alt text for screen readers
- **Semantic Markup**: Proper HTML structure
- **Focus States**: Keyboard navigation support
- **High Contrast**: Compatible with high contrast modes

## Performance

- **Optimized SVGs**: Vector graphics for crisp display at any size
- **Lazy Loading**: Optional lazy loading for performance
- **Caching**: Browser caching with version control
- **Minimal Bundle**: Lightweight implementation
