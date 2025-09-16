# Button Components

This directory contains the unified button component system for the BetweenDeals application.

## Components

### Button

The primary button component that serves as the single source of truth for all button implementations across the application.

**Features:**
- Multiple variants: `primary`, `secondary`, `outline`, `ghost`, `danger`, `light`, `bordered`, `flat`
- Multiple sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Loading state with spinner animation
- Icon support (leftIcon, rightIcon, startContent, endContent)
- HeroUI compatibility with color and radius props
- Full width option
- Disabled state
- Custom styling via className
- onPress prop for mobile compatibility

**Usage:**
```tsx
import { Button } from '@/shared/components/buttons';

// Basic button
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">Primary Button</Button>

// With loading state
<Button loading>Processing...</Button>

// With icons
<Button leftIcon={<Icon />} rightIcon={<ArrowIcon />}>
  Action
</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'light' | 'bordered' | 'flat'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
- `radius`: 'none' | 'sm' | 'md' | 'lg' | 'full'
- `disabled`: boolean
- `loading`: boolean
- `isLoading`: boolean (HeroUI compatibility)
- `isDisabled`: boolean (HeroUI compatibility)
- `fullWidth`: boolean
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- `startContent`: ReactNode (HeroUI compatibility)
- `endContent`: ReactNode (HeroUI compatibility)
- `isIconOnly`: boolean (HeroUI compatibility)
- `className`: string
- `onClick`: () => void
- `onPress`: () => void (mobile compatibility)
- `type`: 'button' | 'submit' | 'reset'

## Design System Integration

This button component replaces all duplicate button implementations throughout the application, ensuring consistent styling and behavior. It integrates with the overall design system and follows accessibility best practices.

## Accessibility

- Proper focus states with ring indicators
- Keyboard navigation support
- Screen reader friendly
- Disabled state handling
- Loading state announcements
