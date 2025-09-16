# Shared Resources - BetweenDeals MVP

This directory contains reusable resources that can be used across multiple features. These are the building blocks that provide consistency and prevent code duplication across the entire M&A platform.

## 📁 Structure Overview

```
shared/
├── components/           # Reusable UI components
│   ├── buttons/         # Button components with HeroUI compatibility
│   ├── buyer/           # Buyer-specific components
│   ├── cards/           # Card components
│   ├── disclaimers/     # Legal disclaimer components
│   ├── FAQ/             # FAQ accordion and related components
│   ├── filters/         # Filter and search components
│   ├── forms/           # Form components (Input, Textarea, etc.)
│   ├── layout/          # Layout components (Container, Footer, Navigation)
│   ├── listings/        # Business listing components
│   ├── loading/         # Loading and spinner components
│   ├── logo/            # Logo and branding components
│   ├── modals/          # Modal dialog components
│   ├── search/          # Search functionality components
│   ├── seo/             # SEO and meta tag components
│   ├── tabs/            # Tab navigation components
│   ├── transaction/     # M&A transaction components
│   ├── typography/      # Typography and heading components
│   ├── ui/              # Basic UI primitives
│   └── valuation/       # Business valuation components
├── design-system/       # Design system and brand assets
├── services/            # API services and business logic
│   ├── auth/            # Authentication services
│   ├── monitoring/      # Error monitoring and logging
│   └── urls/            # URL generation utilities
├── types/               # Global TypeScript definitions
│   ├── api.ts           # Core API types
│   ├── api-auth.ts      # Authentication API types
│   ├── api-business.ts  # Business API types
│   ├── seo.ts           # SEO types
│   └── user.ts          # User and profile types
├── utils/               # Utility functions
│   ├── api/             # API utility functions
│   ├── seo/             # SEO utility functions
│   └── ux/              # UX utility components
└── README.md            # This file
```

## 🧱 UI Components

### Core UI Components

**Button Components (`components/buttons/`)**
- HeroUI-compatible button with variants (primary, secondary, outline, ghost, danger, light, bordered, flat)
- Loading states with spinner
- Multiple sizes (xs, sm, md, lg, xl)
- Icon support (leftIcon, rightIcon, startContent, endContent)
- Full accessibility support

**Form Components (`components/forms/`)**
- **Input.tsx**: Text input with label, error states, and HeroUI compatibility
- **AnimatedTextarea.tsx**: Animated textarea with character count
- **FormField.tsx**: Form field wrapper with validation
- **StyledSelect.tsx**: Custom styled select component
- **SwitchShowcase.tsx**: Toggle switch component
- **TextareaShowcase.tsx**: Textarea component showcase

**Card Components (`components/cards/`)**
- Container component for content sections
- Optional padding configuration
- Consistent shadow and border styling
- Responsive design ready

**Loading Components (`components/loading/`)**
- **LoadingSpinner.tsx**: Animated loading indicator
- Multiple size variants
- Consistent with design system

### Business-Specific Components

**Buyer Components (`components/buyer/`)**
- **SaveSearchModal.tsx**: Modal for saving search criteria

**Listing Components (`components/listings/`)**
- **ListingCard.tsx**: Business listing card component

**Transaction Components (`components/transaction/`)**
- **DueDiligencePlatform.tsx**: Due diligence workflow component
- **OfferManagement.tsx**: Offer management interface
- **SuccessFeeCollection.tsx**: Success fee collection component

**Valuation Components (`components/valuation/`)**
- **BusinessValuationTool.tsx**: Business valuation calculator

### Layout Components (`components/layout/`)

**Container (`components/layout/container/`)**
- **Container.tsx**: Standardized page container

**Footer (`components/layout/footer/`)**
- **Footer.tsx**: Site-wide footer with links and company information

**Navigation (`components/layout/navigation/`)**
- **Main Navigation**: Main navigation header with authentication awareness
- **Dashboard Navigation**: Business dashboard sidebar and mobile navigation
- **Dropdown Components**: Buyer and seller dropdown menus
- **Navigation Utils**: Navigation configuration and role utilities

### Specialized Components

**FAQ Components (`components/FAQ/`)**
- **FAQAccordion.tsx**: Accordion-style FAQ display
- **FAQItem.tsx**: Individual FAQ item component
- **FAQCategory.tsx**: FAQ category grouping
- **FAQBadge.tsx**: FAQ item badges (new, popular)

**Modal Components (`components/modals/`)**
- **InquiryModal.tsx**: Business inquiry modal
- **ImageGalleryModal.tsx**: Image gallery modal
- **NDAModal.tsx**: NDA agreement modal
- **SellerOnboardingModal.tsx**: Seller onboarding modal

**Typography Components (`components/typography/`)**
- **Heading1.tsx**: Main heading component
- **Heading2.tsx**: Secondary heading component
- **HeadingHero.tsx**: Hero section heading

**SEO Components (`components/seo/`)**
- **SEOHead.tsx**: SEO meta tags and structured data

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-900: #1e3a8a;

/* Semantic Colors */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
--info: #3b82f6;
```

### Typography
- **Font Family**: Inter (system fallback)
- **Base Size**: 16px
- **Scale**: 1.125 (Major Second)
- **Line Heights**: 1.5 for body, 1.2 for headings

### Spacing System
- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Container**: Max-width 1280px with responsive padding

## 🔧 Component Guidelines

### Creating New Shared Components

1. **Keep them generic**: Avoid feature-specific logic
2. **Use TypeScript**: Full type coverage required
3. **Follow naming conventions**: PascalCase for components
4. **Include accessibility**: ARIA labels, keyboard support
5. **Add documentation**: JSDoc comments for props

### Component Structure
```typescript
interface ComponentProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2 = 'defaultValue' 
}) => {
  return (
    <div className="component-styles">
      {/* Component JSX */}
    </div>
  );
};
```

### Testing Shared Components
```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

## 🔄 Usage Patterns

### Importing Shared Components
```typescript
// Correct: Import from shared
import { Button, Card, Input } from '@shared/components/ui';
import { Header } from '@shared/components/layout';

// Avoid: Feature-specific components in shared
import { LoginForm } from '@shared/components'; // ❌
```

### Styling with Tailwind
```typescript
// Good: Use design system classes
<Button className="bg-primary-600 hover:bg-primary-700">
  Click me
</Button>

// Avoid: Arbitrary values
<Button className="bg-[#1234ff] hover:bg-[#0000ff]"> // ❌
```

## 📱 Responsive Design

All shared components follow mobile-first responsive principles:

- **Mobile**: 0-768px (base styles)
- **Tablet**: 768px-1024px (md: prefix)  
- **Desktop**: 1024px+ (lg: prefix)

## ♿ Accessibility

Shared components include:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management

## 🧪 Testing Strategy

Shared components should have:
- Unit tests for functionality
- Visual regression tests
- Accessibility tests
- Cross-browser compatibility tests

## 📦 Bundle Optimization

- Tree-shaking friendly exports
- Lazy loading for heavy components
- Minimal external dependencies
- Optimized asset loading

## 🔧 Services and Utilities

### Authentication Services (`services/auth/`)
- **Auth.ts**: Main authentication service with Supabase integration
- **login.ts**: Login service with retry logic and error handling
- **logout.ts**: Logout service with session cleanup
- **signup.ts**: User registration service
- **checkAuth.ts**: Authentication status checking
- **Utils**: Session management, error handling, retry logic, user data management

### URL Generation (`services/urls/`)
- **urlGenerator.ts**: Centralized URL generation for all routes
- Role-based routing for different user types
- Dynamic parameter handling
- SEO-friendly URL generation

### Monitoring (`services/monitoring/`)
- **errorHandler.ts**: Comprehensive error handling and monitoring
- Error reporting and logging
- Performance monitoring
- User feedback collection

### Type Definitions (`types/`)
- **api.ts**: Core API response and request types
- **api-auth.ts**: Authentication-specific API types
- **api-business.ts**: Business and M&A transaction types
- **seo.ts**: SEO and meta tag types
- **user.ts**: User profile and role types

### Utilities (`utils/`)
- **api/**: API request utilities and helpers
- **seo/**: SEO validation and data utilities
- **ux/**: UX utility components (ScrollToTop, etc.)

## 🔄 Future Enhancements

Planned additions:
- [ ] Custom hooks for common patterns
- [ ] Advanced form validation helpers
- [ ] Date/time utilities
- [ ] File upload components
- [ ] Data table components
- [ ] Chart/visualization components
- [ ] Real-time WebSocket utilities
- [ ] Advanced caching utilities

---

These shared resources provide the foundation for a consistent, maintainable, and scalable application architecture.
