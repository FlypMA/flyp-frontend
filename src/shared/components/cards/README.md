# Card Components

This directory contains card components for displaying content in structured containers.

## Components

### Card

A flexible container component for grouping related content with consistent styling and spacing.

**Features:**

- Clean white background with subtle border
- Rounded corners for modern appearance
- Optional padding control
- Shadow for depth
- Customizable styling via className

**Usage:**

```tsx
import { Card } from '@/shared/components/cards';

// Basic card with default padding
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>

// Card without padding
<Card padding={false}>
  <img src="image.jpg" alt="Card image" />
</Card>

// Card with custom styling
<Card className="bg-blue-50 border-blue-200">
  <p>Custom styled card</p>
</Card>
```

**Props:**

- `children`: ReactNode - Content to display inside the card
- `className`: string - Additional CSS classes
- `padding`: boolean - Whether to include default padding (default: true)

## Design System Integration

The Card component follows the design system's spacing and color guidelines, providing a consistent foundation for content containers throughout the application.

## Use Cases

- Content grouping and organization
- Dashboard widgets
- Information panels
- Image galleries
- Form containers
- Status displays
