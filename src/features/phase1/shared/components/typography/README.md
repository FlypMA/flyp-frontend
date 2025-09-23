# Typography Components

This directory contains typography components for consistent text styling and hierarchy throughout the application.

## Components

### Heading1

A standardized H1 heading component for primary page titles and main headings.

**Features:**

- Responsive typography (3xl on mobile, 4xl on desktop)
- Consistent font weight and color
- Proper spacing and line height
- Customizable styling via className
- Semantic HTML structure

**Usage:**

```tsx
import { Heading1 } from '@/shared/components/typography';

// Basic heading
<Heading1>Welcome to flyp</Heading1>

// With custom styling
<Heading1 className="text-center text-blue-600">
  Business Listings
</Heading1>
```

**Props:**

- `children`: ReactNode - Heading content
- `className`: string - Additional CSS classes

**Default Styling:**

- Font size: `text-3xl md:text-4xl` (responsive)
- Font weight: `font-bold`
- Color: `text-slate-900`
- Margin bottom: `mb-8`
- Line height: `leading-tight`

### Heading2

A standardized H2 heading component for section titles and secondary headings.

**Features:**

- Responsive typography
- Consistent styling with Heading1
- Proper semantic structure
- Customizable appearance

**Usage:**

```tsx
import { Heading2 } from '@/shared/components/typography';

<Heading2>Business Information</Heading2>
<Heading2 className="text-green-600">Success Stories</Heading2>
```

**Props:**

- `children`: ReactNode - Heading content
- `className`: string - Additional CSS classes

### HeadingHero

A large, impactful heading component for hero sections and prominent page titles.

**Features:**

- Extra large responsive typography (5xl to 7xl)
- Bold font weight for maximum impact
- Perfect for hero sections and landing pages
- Customizable styling

**Usage:**

```tsx
import { HeadingHero } from '@/shared/components/typography';

// Hero section heading
<HeadingHero>Find Your Perfect Business</HeadingHero>

// With custom styling
<HeadingHero className="text-center text-white drop-shadow-lg">
  European SME M&A Platform
</HeadingHero>
```

**Props:**

- `children`: ReactNode - Heading content
- `className`: string - Additional CSS classes

**Default Styling:**

- Font size: `text-5xl md:text-6xl lg:text-7xl` (highly responsive)
- Font weight: `font-bold`

## Typography Hierarchy

The typography system follows a clear hierarchy:

1. **HeadingHero** - Largest, for hero sections and main page titles
2. **Heading1** - Primary headings for page sections
3. **Heading2** - Secondary headings for subsections
4. **Body Text** - Standard paragraph text (handled by CSS)

## Design System Integration

- **Consistent Spacing**: Standardized margins and line heights
- **Color Palette**: Uses design system colors (slate-900, etc.)
- **Responsive Design**: Mobile-first responsive typography
- **Font Weights**: Consistent font weight usage
- **Accessibility**: Proper semantic HTML structure

## Responsive Behavior

All heading components are designed with mobile-first responsive typography:

- **Mobile**: Smaller, more readable sizes
- **Tablet**: Medium sizes for better readability
- **Desktop**: Larger sizes for impact and hierarchy

## Accessibility Features

- **Semantic HTML**: Proper use of h1, h2 elements
- **Screen Reader Support**: Clear heading structure
- **High Contrast**: Compatible with high contrast modes
- **Focus Management**: Proper focus indicators when interactive

## Use Cases

### HeadingHero

- Landing page hero sections
- Main page titles
- Promotional banners
- Marketing pages

### Heading1

- Page section titles
- Main content headings
- Dashboard section headers
- Form section titles

### Heading2

- Subsection headings
- Card titles
- Sidebar headings
- Content organization

## Customization

All typography components accept a `className` prop for custom styling:

```tsx
// Custom color
<Heading1 className="text-blue-600">Blue Heading</Heading1>

// Custom alignment
<HeadingHero className="text-center">Centered Hero</HeadingHero>

// Custom spacing
<Heading2 className="mb-4">Tight Spacing</Heading2>

// Multiple customizations
<Heading1 className="text-center text-green-600 mb-12">
  Custom Styled Heading
</Heading1>
```
