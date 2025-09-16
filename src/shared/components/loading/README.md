# Loading Components

This directory contains loading and spinner components for providing visual feedback during asynchronous operations.

## Components

### LoadingSpinner

A simple, customizable loading spinner component with multiple size options.

**Features:**
- Multiple sizes: `sm`, `md`, `lg`
- Smooth CSS animation
- Customizable styling
- Lightweight implementation
- Consistent with design system colors

**Usage:**
```tsx
import { LoadingSpinner } from '@/shared/components/loading';

// Basic spinner
<LoadingSpinner />

// Different sizes
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />

// With custom styling
<LoadingSpinner 
  size="lg" 
  className="text-blue-600" 
/>

// In a button
<Button loading>
  <LoadingSpinner size="sm" />
  Processing...
</Button>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' - Size of the spinner (default: 'md')
- `className`: string - Additional CSS classes

**Size Specifications:**
- `sm`: 16px × 16px (h-4 w-4)
- `md`: 32px × 32px (h-8 w-8) - Default
- `lg`: 48px × 48px (h-12 w-12)

## Design System Integration

- Uses primary color from design system (`border-primary-600`)
- Consistent sizing scale
- Smooth animations with CSS transitions
- Accessible and performant

## Use Cases

- **Button Loading States**: Show loading state in buttons during form submission
- **Page Loading**: Display while page content is loading
- **Data Fetching**: Show during API calls and data loading
- **Form Processing**: Indicate form submission in progress
- **File Uploads**: Show progress during file upload operations

## Accessibility

- Uses CSS animations for smooth visual feedback
- No motion sensitivity issues (simple rotation)
- Screen reader friendly (decorative element)
- High contrast compatible

## Performance

- Lightweight CSS-only animation
- No JavaScript dependencies
- Minimal DOM footprint
- Optimized for smooth 60fps animation
