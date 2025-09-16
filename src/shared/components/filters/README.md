# Filter Components

This directory contains interactive filter components for data filtering and search functionality.

## Components

### PriceRangeSlider

A dual-handle range slider component for selecting price ranges with customizable min/max values and step sizes.

**Features:**
- Dual-handle range selection
- Customizable min/max values
- Step size control
- Real-time value updates
- Currency formatting
- Responsive design
- Keyboard navigation
- Touch/mobile support

**Usage:**
```tsx
import { PriceRangeSlider } from '@/shared/components/filters';

// Basic price range slider
<PriceRangeSlider
  min={0}
  max={10000000}
  step={10000}
  defaultValue={[100000, 500000]}
  onChange={(range) => console.log(range)}
/>

// With currency formatting
<PriceRangeSlider
  min={0}
  max={5000000}
  step={5000}
  currency="EUR"
  formatValue={(value) => `€${value.toLocaleString()}`}
  onChange={(range) => setPriceRange(range)}
/>
```

**Props:**
- `min`: number - Minimum value (default: 0)
- `max`: number - Maximum value (default: 1000000)
- `step`: number - Step size (default: 1)
- `defaultValue`: [number, number] - Initial range
- `value`: [number, number] - Controlled value
- `onChange`: (range: [number, number]) => void - Change handler
- `currency`: string - Currency code for formatting
- `formatValue`: (value: number) => string - Custom value formatter
- `disabled`: boolean - Disable the slider
- `className`: string - Additional CSS classes

### PriceRangeSliderShowcase

A demonstration component showing various configurations and use cases of the PriceRangeSlider.

**Features:**
- Multiple slider examples
- Different configurations
- Interactive demonstrations
- Code examples
- Best practices showcase

**Usage:**
```tsx
import { PriceRangeSliderShowcase } from '@/shared/components/filters';

// Display showcase for development/testing
<PriceRangeSliderShowcase />
```

## Use Cases

- **Business Listings**: Filter by asking price range
- **Investment Search**: Filter by investment amount
- **Property Search**: Filter by property value
- **Product Catalogs**: Filter by price range
- **Analytics Dashboards**: Filter data by value ranges

## Design System Integration

- Consistent styling with application theme
- Responsive breakpoints
- Accessibility compliance
- Touch-friendly interactions
- Smooth animations

## Accessibility Features

- Keyboard navigation (arrow keys, page up/down)
- Screen reader support with ARIA labels
- High contrast mode support
- Focus indicators
- Value announcements

## Technical Implementation

- Uses HTML5 range input elements
- CSS custom properties for theming
- React hooks for state management
- TypeScript for type safety
- Responsive design with CSS Grid/Flexbox
