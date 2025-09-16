# Disclaimer Components

This directory contains legal disclaimer components for displaying important legal and financial information to users.

## Components

### FinancialDisclaimer

A comprehensive disclaimer component for displaying financial and legal disclaimers with different types and display variants.

**Features:**
- Multiple disclaimer types: `valuation`, `solvency`, `liquidation`, `general`
- Multiple display variants: `banner`, `modal`, `sidebar`
- Collapsible/expandable functionality
- Icon-based visual indicators
- Responsive design
- Customizable styling

**Usage:**
```tsx
import { FinancialDisclaimer } from '@/shared/components/disclaimers';

// Basic valuation disclaimer
<FinancialDisclaimer type="valuation" />

// Collapsible general disclaimer
<FinancialDisclaimer 
  type="general" 
  variant="banner" 
  isCollapsible={true} 
/>

// Modal variant for important disclaimers
<FinancialDisclaimer 
  type="solvency" 
  variant="modal" 
  className="mb-4" 
/>
```

**Props:**
- `type`: 'valuation' | 'solvency' | 'liquidation' | 'general' - Type of disclaimer
- `variant`: 'banner' | 'modal' | 'sidebar' - Display style (default: 'banner')
- `isCollapsible`: boolean - Whether the disclaimer can be collapsed (default: false)
- `className`: string - Additional CSS classes

**Disclaimer Types:**

1. **Valuation**: For business valuation tools and estimates
2. **Solvency**: For financial health assessments
3. **Liquidation**: For liquidation value calculations
4. **General**: For general financial information

**Display Variants:**

1. **Banner**: Horizontal banner style (default)
2. **Modal**: Modal dialog style for important disclaimers
3. **Sidebar**: Sidebar panel style for contextual disclaimers

## Legal Compliance

These components help ensure legal compliance by:
- Providing clear disclaimers for financial information
- Warning users about the limitations of estimates
- Directing users to seek professional advice
- Meeting regulatory requirements for financial platforms

## Accessibility

- Clear visual hierarchy with icons and typography
- Keyboard navigation support
- Screen reader friendly content
- High contrast for important information
