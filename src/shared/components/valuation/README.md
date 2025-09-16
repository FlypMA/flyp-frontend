# Valuation Components

This directory contains business valuation tools and components for calculating and displaying business valuations.

## Components

### BusinessValuationTool

A comprehensive business valuation tool that calculates business values based on multiple financial metrics and industry factors.

**Features:**
- Multi-factor valuation calculation
- Industry-specific multipliers
- EBITDA-based valuation
- Asset-based valuation
- Growth rate considerations
- Market position analysis
- Confidence scoring
- Interactive form inputs
- Real-time calculations
- Detailed results breakdown

**Usage:**
```tsx
import { BusinessValuationTool } from '@/shared/components/valuation';

// Basic usage
<BusinessValuationTool />

// With custom styling
<BusinessValuationTool className="max-w-6xl mx-auto" />
```

**Valuation Inputs:**
- **Sector**: Business industry/sector
- **Annual Revenue**: Total annual revenue
- **EBITDA**: Earnings before interest, taxes, depreciation, and amortization
- **Years in Business**: Company age
- **Number of Employees**: Company size
- **Growth Rate**: Annual growth percentage
- **Market Position**: Market leadership position
- **Assets**: Total company assets
- **Debt**: Total company debt
- **Recurring Revenue**: Percentage of recurring revenue

**Valuation Methods:**
1. **EBITDA Multiple**: Based on industry EBITDA multiples
2. **Revenue Multiple**: Based on industry revenue multiples
3. **Asset-Based**: Based on company assets and debt
4. **Growth-Adjusted**: Adjusted for growth rate and market position

**Results:**
- **Low Estimate**: Conservative valuation
- **Mid Estimate**: Most likely valuation
- **High Estimate**: Optimistic valuation
- **Confidence Level**: Low, Medium, or High
- **Key Factors**: Influencing factors explanation

## Valuation Logic

### EBITDA Multiple Method
- Uses industry-specific EBITDA multiples
- Adjusts for company size and growth
- Considers market position and stability

### Revenue Multiple Method
- Applies industry revenue multiples
- Adjusts for profitability and growth
- Considers recurring revenue percentage

### Asset-Based Method
- Calculates net asset value
- Adjusts for intangible assets
- Considers debt and liabilities

### Growth-Adjusted Method
- Applies growth rate multipliers
- Considers market position premium
- Adjusts for business maturity

## Industry Multipliers

The tool includes industry-specific multipliers for various sectors:

- **Technology**: Higher multiples for growth potential
- **Manufacturing**: Standard multiples with asset considerations
- **Services**: Revenue-based with recurring revenue adjustments
- **Retail**: Location and market-dependent adjustments
- **Healthcare**: Regulatory and stability considerations

## Confidence Scoring

The tool provides confidence levels based on:

- **Data Completeness**: How much information is provided
- **Industry Alignment**: How well the business fits industry norms
- **Financial Health**: EBITDA margins and growth rates
- **Market Factors**: Market position and competition

## Design Features

- **Interactive Form**: Real-time input validation and calculation
- **Progress Indicators**: Visual feedback for calculation steps
- **Results Visualization**: Clear presentation of valuation ranges
- **Factor Analysis**: Detailed breakdown of influencing factors
- **Responsive Design**: Works on all device sizes

## Use Cases

- **Business Sellers**: Get initial valuation estimates
- **Business Buyers**: Evaluate potential acquisitions
- **Investors**: Assess investment opportunities
- **Advisors**: Provide valuation guidance to clients
- **Analysts**: Perform preliminary business analysis

## Disclaimer

This tool provides estimates for informational purposes only and should not be considered as professional financial advice. Actual valuations may vary significantly based on market conditions, buyer preferences, and other factors.

## Technical Implementation

- **React Hooks**: State management with useState and useEffect
- **Real-time Calculation**: Immediate updates on input changes
- **Form Validation**: Input validation and error handling
- **Responsive Design**: Mobile-first responsive layout
- **Accessibility**: Screen reader support and keyboard navigation

## Integration

The component integrates with:
- **Form Components**: Custom Input and Button components
- **UI Components**: Cards, Progress bars, and Chips
- **Icons**: Lucide React icons for visual elements
- **Design System**: Consistent styling and spacing
