# FAQ Components

This directory contains a comprehensive FAQ (Frequently Asked Questions) system with accordion functionality, categorization, and visual indicators.

## Components

### FAQAccordion

The main accordion container that manages state and FAQ items. Supports both single and multiple item expansion.

**Features:**
- Single or multiple item expansion modes
- Smooth animations
- Keyboard navigation
- Customizable styling
- State management for open/closed items

**Usage:**
```tsx
import { FAQAccordion } from '@/shared/components/FAQ';

const faqs = [
  {
    question: "What is BetweenDeals?",
    answer: "BetweenDeals is a European SME M&A platform..."
  }
];

<FAQAccordion 
  faqs={faqs} 
  allowMultiple={false}
  className="max-w-4xl"
/>
```

### FAQBadge

Clean, modular badge system for indicating "Popular" or "New" FAQ items.

**Features:**
- Two badge types: `new` and `popular`
- Consistent styling with design system
- Customizable appearance

**Usage:**
```tsx
import { FAQBadge } from '@/shared/components/FAQ';

<FAQBadge type="popular" />
<FAQBadge type="new" />
```

### FAQCategory

Groups related FAQs with category headers, icons, and color-coded organization.

**Features:**
- Category grouping with headers
- Icon support for visual identification
- Color-coded category badges
- Nested FAQ accordion support
- Flexible layout options

**Usage:**
```tsx
import { FAQCategory } from '@/shared/components/FAQ';

const category = {
  name: "Getting Started",
  icon: <UserIcon />,
  color: "blue",
  faqs: [...]
};

<FAQCategory 
  category={category}
  allowMultiple={true}
/>
```

### FAQItem

Individual FAQ item component with question, answer, and optional badges.

**Features:**
- Question and answer display
- Optional badge indicators
- Smooth expand/collapse animations
- Keyboard accessible
- Customizable styling

**Usage:**
```tsx
import { FAQItem } from '@/shared/components/FAQ';

const faq = {
  question: "How do I get started?",
  answer: "To get started, create an account...",
  badge: "popular",
  isPopular: true,
  tags: ["onboarding", "getting-started"]
};

<FAQItem
  faq={faq}
  isOpen={false}
  onToggle={() => {}}
/>
```

## Component Architecture

The FAQ system is built with a hierarchical structure:

```
FAQCategory
├── Category Header (with icon and color)
└── FAQAccordion
    └── FAQItem[]
        ├── Question
        ├── Answer
        └── FAQBadge (optional)
```

## Props and Types

### FAQAccordionProps
- `faqs`: Array of FAQ objects
- `allowMultiple`: boolean - Allow multiple items open
- `className`: string - Additional CSS classes

### FAQBadgeProps
- `type`: 'new' | 'popular' - Badge type
- `className`: string - Additional CSS classes

### FAQCategoryProps
- `category`: Category object with name, icon, color, faqs
- `allowMultiple`: boolean - Allow multiple items open
- `className`: string - Additional CSS classes

### FAQItemProps
- `faq`: FAQItem object containing:
  - `question`: string - FAQ question
  - `answer`: React.ReactNode - FAQ answer (supports JSX)
  - `badge`: 'new' | 'popular' | undefined - Optional badge
  - `isNew`: boolean - Whether item is new
  - `isPopular`: boolean - Whether item is popular
  - `tags`: string[] - Optional tags array
- `isOpen`: boolean - Whether item is expanded
- `onToggle`: () => void - Toggle handler
- `className`: string - Additional CSS classes

## Design System Integration

- Consistent color palette for categories
- Smooth animations and transitions
- Responsive design
- Accessibility compliance
- Typography hierarchy

## Accessibility Features

- Keyboard navigation support
- Screen reader friendly
- Proper ARIA attributes
- Focus management
- High contrast support
