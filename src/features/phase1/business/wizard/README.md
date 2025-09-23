# 🏢 Listing Wizard - Modular Architecture

## Overview

The Listing Wizard is a comprehensive, modular system for creating business listings. It's designed with a senior CTO mindset, focusing on maintainability, scalability, and developer experience.

## 🏗️ Architecture

### Directory Structure

```
wizard/
├── components/           # Shared UI components
│   ├── ListingWizardModal.tsx    # Main modal orchestrator
│   ├── StepIndicator.tsx         # Step progress indicator
│   ├── WizardNavigation.tsx      # Navigation controls
│   └── index.ts                  # Component exports
├── steps/               # Individual wizard steps
│   ├── BasicInfoStep.tsx         # Step 1: Basic business info
│   ├── FinancialInfoStep.tsx     # Step 2: Financial data
│   ├── BusinessDetailsStep.tsx   # Step 3: Business story
│   ├── SaleDetailsStep.tsx       # Step 4: Sale journey
│   ├── PrivacySettingsStep.tsx   # Step 5: Privacy controls
│   ├── DocumentsStep.tsx         # Step 6: Document upload
│   ├── ReviewStep.tsx            # Step 7: Review & finalize
│   └── index.ts                  # Step exports
├── types/               # TypeScript definitions
│   └── index.ts                  # All type definitions
├── hooks/               # Custom hooks (future)
├── index.ts             # Main feature export
└── README.md            # This file
```

## 🎯 Design Principles

### 1. **Modularity**

- Each step is a self-contained component
- Shared components are reusable across steps
- Clear separation of concerns

### 2. **Type Safety**

- Comprehensive TypeScript interfaces
- Strict type checking throughout
- IntelliSense support for all props

### 3. **Maintainability**

- Single responsibility principle
- Easy to modify individual steps
- Clear component boundaries

### 4. **Scalability**

- Easy to add new steps
- Flexible data structure
- Extensible validation system

## 📋 Wizard Steps

### Step 1: Basic Information

- **Purpose**: Collect fundamental business details
- **Fields**: Name, description, industry, location, team size, founded year
- **Validation**: Required fields, industry selection, year validation

### Step 2: Financial Information

- **Purpose**: Gather financial data and valuation information
- **Features**:
  - Valuation report selection (if available)
  - 3-year revenue/EBITDA inputs
  - Asking price and negotiation settings
- **Validation**: Numeric inputs, price validation

### Step 3: Business Details

- **Purpose**: Tell the business story
- **Fields**: Products/services, target market, competitive advantage, growth opportunities
- **Design**: Caregiver brand approach with helpful guidance

### Step 4: Sale Details

- **Purpose**: Understand sale journey and transition
- **Fields**: Reason for sale, timeline, asset inclusion/exclusion, transition support
- **Features**: Asset selection checkboxes, timeline tips

### Step 5: Privacy Settings

- **Purpose**: Control listing visibility and privacy
- **Settings**: Anonymous listing, NDA requirement, data hiding options
- **Features**: Toggle switches, teaser description

### Step 6: Documents

- **Purpose**: Upload supporting documents
- **Categories**: Financial, legal, operations, marketing, other
- **Features**: Drag & drop, file validation, progress indicators

### Step 7: Review

- **Purpose**: Final review and submission
- **Features**: Complete data summary, terms agreement, publish options

## 🔧 Usage

### Basic Usage

```tsx
import { ListingWizardModal } from '@/features/phase1/business/wizard';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ListingWizardModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onComplete={data => {
        console.log('Listing created:', data);
        setIsOpen(false);
      }}
      businessInfo={{
        name: 'My Business',
        industry: 'Technology',
        // ... other business info
      }}
      valuationReports={
        [
          // ... valuation reports array
        ]
      }
    />
  );
}
```

### Advanced Usage with Pre-population

```tsx
<ListingWizardModal
  isOpen={isOpen}
  onClose={onClose}
  onComplete={handleComplete}
  businessInfo={businessProfile}
  valuationData={latestValuation}
  valuationReports={allValuationReports}
/>
```

## 🎨 Component Props

### ListingWizardModalProps

```typescript
interface ListingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: ListingWizardData) => void;
  businessInfo?: BusinessInfo;
  valuationData?: ValuationData;
  valuationReports?: ValuationReport[];
}
```

### StepComponentProps

```typescript
interface StepComponentProps {
  data: Partial<ListingWizardData>;
  onDataChange: (stepData: Partial<ListingWizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
}
```

## 🔄 Data Flow

1. **Initialization**: Modal opens with default data structure
2. **Pre-population**: Business info and valuation data populate relevant fields
3. **Step Navigation**: User moves through steps, data accumulates
4. **Validation**: Each step validates required fields
5. **Submission**: Complete data structure sent to parent component

## 🎯 Key Features

### Valuation Report Integration

- Select from existing valuation reports
- Auto-populate financial data
- Visual report selection UI

### Caregiver Brand Alignment

- Supportive messaging throughout
- Helpful guidance boxes
- Empathetic language and tone

### Privacy-First Design

- Anonymous listings by default
- NDA protection options
- Granular privacy controls

### Document Management

- Categorized document uploads
- File validation and size limits
- Progress indicators

## 🚀 Future Enhancements

### Planned Features

- [ ] Custom validation hooks
- [ ] Step-specific analytics
- [ ] Auto-save functionality
- [ ] Draft management
- [ ] Template system
- [ ] Multi-language support

### Extensibility Points

- New step components
- Custom validation rules
- Additional document categories
- Enhanced privacy controls

## 🧪 Testing Strategy

### Unit Tests

- Individual step components
- Validation logic
- Data transformation

### Integration Tests

- Complete wizard flow
- Data persistence
- Error handling

### E2E Tests

- User journey completion
- Cross-browser compatibility
- Performance benchmarks

## 📊 Performance Considerations

### Optimization Strategies

- Lazy loading of step components
- Memoized validation functions
- Efficient re-rendering patterns

### Bundle Size

- Tree-shakable exports
- Minimal dependencies
- Code splitting opportunities

## 🔒 Security Considerations

### Data Protection

- Client-side validation only
- Server-side validation required
- Sensitive data handling

### Privacy Controls

- Granular visibility settings
- NDA enforcement
- Data anonymization options

## 📚 Development Guidelines

### Adding New Steps

1. Create step component in `steps/` directory
2. Add to step exports in `steps/index.ts`
3. Update main modal to include new step
4. Add validation logic
5. Update types if needed

### Modifying Existing Steps

1. Update step component
2. Maintain backward compatibility
3. Update validation if needed
4. Test thoroughly

### Best Practices

- Keep components focused and single-purpose
- Use TypeScript strictly
- Follow naming conventions
- Document complex logic
- Write tests for new features

## 🤝 Contributing

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for complex functions

### Pull Request Process

1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit PR with clear description

---

**Built with ❤️ for maintainable, scalable business listing creation.**
