# Shared Components Library

This directory contains a comprehensive library of reusable React components for the BetweenDeals application. All components follow consistent design patterns, accessibility standards, and are built with TypeScript for type safety.

## 📁 Directory Structure

```
src/shared/components/
├── buttons/           # Button components and variants
├── cards/            # Card and container components
├── disclaimers/      # Legal and financial disclaimers
├── FAQ/              # FAQ accordion and related components
├── filters/          # Filter and search components
├── forms/            # Form input and validation components
├── layout/           # Layout and navigation components
├── loading/          # Loading states and spinners
├── logo/             # Brand logo components
├── modals/           # Modal dialogs and overlays
├── seo/              # SEO and meta components
├── tabs/             # Tab navigation components
├── transaction/      # M&A transaction components
├── typography/       # Text and heading components
├── ui/               # Basic UI building blocks
└── valuation/        # Business valuation tools
```

## 🎯 Component Categories

### Core UI Components
- **[Buttons](./buttons/)** - Unified button system with variants and states
- **[Cards](./cards/)** - Content containers and layout components
- **[Typography](./typography/)** - Text components and heading hierarchy
- **[Loading](./loading/)** - Loading states and spinner components
- **[UI](./ui/)** - Basic input and form components

### Form & Input Components
- **[Forms](./forms/)** - Comprehensive form system with validation
- **[Filters](./filters/)** - Search and filtering components
- **[Tabs](./tabs/)** - Tab navigation and content organization

### Business-Specific Components
- **[Valuation](./valuation/)** - Business valuation tools and calculators
- **[Transaction](./transaction/)** - M&A transaction management components
- **[Modals](./modals/)** - Business inquiry and NDA modals
- **[Disclaimers](./disclaimers/)** - Legal and financial disclaimers

### Layout & Navigation
- **[Layout](./layout/)** - Navigation, containers, and page structure
- **[Logo](./logo/)** - Brand identity and logo components

### Content & Information
- **[FAQ](./FAQ/)** - Frequently asked questions system
- **[SEO](./seo/)** - Search engine optimization components

## 🚀 Quick Start

### Importing Components

```tsx
// Import individual components
import { Button } from '@/shared/components/buttons';
import { Input } from '@/shared/components/forms';
import { Card } from '@/shared/components/cards';

// Import multiple components
import { 
  Button, 
  Input, 
  Card,
  LoadingSpinner 
} from '@/shared/components';
```

### Basic Usage

```tsx
import { Button, Input, Card } from '@/shared/components';

const MyComponent = () => (
  <Card>
    <Input 
      label="Email Address"
      type="email"
      placeholder="Enter your email"
    />
    <Button variant="primary">
      Submit
    </Button>
  </Card>
);
```

## 🎨 Design System

All components follow a unified design system:

### Color Palette
- **Primary**: Blue tones for main actions and branding
- **Secondary**: Gray tones for secondary elements
- **Success**: Green for positive states
- **Warning**: Yellow/amber for caution states
- **Error**: Red for error states
- **Neutral**: Slate/gray for text and borders

### Typography
- **Font Family**: System fonts with fallbacks
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes**: Responsive scale from 12px to 72px
- **Line Heights**: Optimized for readability

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
- **Responsive**: Mobile-first with breakpoint adjustments

### Border Radius
- **Small**: 4px (rounded)
- **Medium**: 8px (rounded-lg)
- **Large**: 12px (rounded-xl)
- **Full**: 50% (rounded-full)

## ♿ Accessibility

All components are built with accessibility in mind:

- **ARIA Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML and announcements
- **Focus Management**: Clear focus indicators
- **High Contrast**: Compatible with high contrast modes
- **Color Blindness**: Not relying solely on color for information

## 📱 Responsive Design

Components are designed mobile-first with responsive breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🔧 Development Guidelines

### Component Structure
```tsx
// Component file structure
interface ComponentProps {
  // Props with JSDoc comments
  children: React.ReactNode;
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`base-classes ${className}`} {...props}>
      {children}
    </div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Button`, `InputField`)
- **Files**: PascalCase (e.g., `Button.tsx`, `InputField.tsx`)
- **Directories**: kebab-case (e.g., `button-group`, `input-field`)
- **Props**: camelCase (e.g., `isLoading`, `onClick`)

### TypeScript
- All components are written in TypeScript
- Props interfaces are exported for reuse
- Generic types are used where appropriate
- Strict type checking is enforced

## 🧪 Testing

Components should be tested with:
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interactions
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Visual Tests**: Screenshot comparisons

## 📦 Bundle Optimization

- **Tree Shaking**: Components are exported individually
- **Code Splitting**: Large components are lazy-loaded
- **Minimal Dependencies**: Reduced external dependencies
- **Optimized Imports**: Import only what you need

## 🔄 Migration from Legacy

This component library replaces the legacy component system:

- **Unified API**: Consistent prop interfaces
- **Better Performance**: Optimized rendering and state management
- **Enhanced Accessibility**: Improved screen reader support
- **Modern Patterns**: React hooks and functional components
- **Type Safety**: Full TypeScript support

## 📚 Documentation

Each component directory contains:
- **README.md**: Comprehensive component documentation
- **index.ts**: Clean exports for easy importing
- **Examples**: Usage examples and best practices
- **Props**: Complete prop documentation
- **Accessibility**: Accessibility features and guidelines

## 🤝 Contributing

When adding new components:

1. **Follow the established patterns** in existing components
2. **Add comprehensive documentation** in the component's README
3. **Include TypeScript types** for all props
4. **Test accessibility** with screen readers and keyboard navigation
5. **Add to the main index.ts** for easy importing
6. **Update this README** with new component information

## 📞 Support

For questions about components:
- Check the individual component README files
- Review the TypeScript interfaces for prop types
- Test components in Storybook (if available)
- Consult the design system documentation
