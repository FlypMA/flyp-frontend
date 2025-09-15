# Shared Resources

This directory contains reusable resources that can be used across multiple features. These are the building blocks that provide consistency and prevent code duplication.

## 📁 Structure Overview

```
shared/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI primitives (Button, Input, Card)
│   ├── forms/           # Form-related components (empty in MVP)
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── navigation/      # Navigation components (empty in MVP)
├── hooks/               # Custom React hooks (empty in MVP)
├── services/            # API services and utilities (empty in MVP)
├── types/               # Global TypeScript definitions (empty in MVP)  
├── utils/               # Utility functions (empty in MVP)
├── constants/           # Application constants (empty in MVP)
└── README.md            # This file
```

## 🧱 UI Components

### Basic UI Primitives (`components/ui/`)

**Button.tsx**
- Configurable button component with variants (primary, secondary, ghost, danger)
- Loading states with spinner
- Multiple sizes (sm, md, lg)
- Full accessibility support

**Input.tsx**  
- Text input with label and error states
- Built-in validation styling
- Helper text support
- Consistent styling across the app

**Card.tsx**
- Container component for content sections
- Optional padding configuration
- Consistent shadow and border styling
- Responsive design ready

**LoadingSpinner.tsx**
- Animated loading indicator
- Multiple size variants
- Consistent with design system
- Used across the application

### Layout Components (`components/layout/`)

**Header.tsx**
- Main navigation header
- Authentication state awareness  
- Role-based menu items
- Mobile responsive navigation
- User avatar and dropdown menu

**Footer.tsx**
- Site-wide footer with links
- Company information
- Legal and support links
- Consistent across all pages

**Sidebar.tsx**
- Collapsible navigation sidebar
- Role-based navigation items
- Active state indicators
- Mobile-responsive behavior
- User profile section

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

## 🔄 Future Additions

Planned shared resources:
- [ ] Custom hooks for common patterns
- [ ] API service utilities
- [ ] Form validation helpers
- [ ] Date/time utilities
- [ ] File upload components
- [ ] Data table components
- [ ] Chart/visualization components

---

These shared resources provide the foundation for a consistent, maintainable, and scalable application architecture.
