# 🏢 Seller Onboarding Modal System

**Modular, scalable seller onboarding system for business listing creation.**

## 📁 **Architecture Overview**

```
sellerOnboarding/
├── README.md                    # This documentation
├── index.ts                     # Centralized exports
├── types.ts                     # TypeScript type definitions
├── utils.ts                     # Utility functions
├── SellerOnboardingModal.tsx    # Main modal orchestrator
└── steps/                       # Individual step components
    ├── WelcomeStep.tsx
    ├── BusinessTypeStep.tsx
    ├── BusinessNameStep.tsx
    ├── LocationStep.tsx
    ├── FoundedYearStep.tsx
    ├── BusinessDescriptionStep.tsx
    ├── EmployeeCountStep.tsx
    ├── RevenueRangeStep.tsx
    ├── SellingReasonStep.tsx
    ├── ContactEmailStep.tsx
    ├── ContactPhoneStep.tsx
    └── SuccessStep.tsx
```

## 🎯 **Design Principles**

### **Senior CTO Standards**

- ✅ **Modular Architecture**: Each step is a separate, reusable component
- ✅ **Type Safety**: Comprehensive TypeScript interfaces and types
- ✅ **Separation of Concerns**: Logic, UI, and data are properly separated
- ✅ **Scalability**: Easy to add, remove, or modify steps
- ✅ **Maintainability**: Clear file structure and naming conventions
- ✅ **Performance**: Optimized imports and lazy loading where appropriate
- ✅ **Developer Experience**: Comprehensive documentation and examples

### **Enterprise-Grade Features**

- 🔄 **Draft Persistence**: Auto-save progress to localStorage
- 🎨 **Consistent UI**: Unified design system across all steps
- 📱 **Responsive Design**: Mobile-first approach
- ♿ **Accessibility**: ARIA labels and keyboard navigation
- 🧪 **Testable**: Isolated components for easy unit testing
- 🔧 **Configurable**: Flexible step validation and flow control

## 🚀 **Usage**

### **Basic Implementation**

```typescript
import { SellerOnboardingModal } from '@/shared/components/modals/sellerOnboarding';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: SellerFormData) => {
    console.log('Business listing created:', data);
    // Handle completion logic
  };

  return (
    <SellerOnboardingModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onComplete={handleComplete}
    />
  );
}
```

### **Edit Mode**

```typescript
<SellerOnboardingModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onComplete={handleComplete}
  existingData={existingBusinessData}
  isEditMode={true}
/>
```

## 📋 **Step Overview**

| Step | Component               | Purpose                     | Validation   |
| ---- | ----------------------- | --------------------------- | ------------ |
| 0    | WelcomeStep             | Introduction and overview   | None         |
| 1    | BusinessTypeStep        | Business type and industry  | Required     |
| 2    | BusinessNameStep        | Business name input         | Required     |
| 3    | LocationStep            | Location selection          | Required     |
| 4    | FoundedYearStep         | Business establishment year | Required     |
| 5    | BusinessDescriptionStep | Business description        | Min 50 chars |
| 6    | EmployeeCountStep       | Team size selection         | Required     |
| 7    | RevenueRangeStep        | Annual revenue range        | Always valid |
| 8    | SellingReasonStep       | Reason for selling          | Required     |
| 9    | TimelineStep            | Selling timeline            | Required     |
| 10   | PriceExpectationsStep   | Expected price range        | Required     |
| 11   | ContactEmailStep        | Contact email               | Valid email  |
| 12   | ContactPhoneStep        | Contact phone               | Required     |
| 13   | VerificationStep        | Verification preferences    | Optional     |
| 14   | SuccessStep             | Completion celebration      | None         |

## 🔧 **API Reference**

### **Types**

```typescript
interface SellerFormData {
  businessType: string;
  businessName: string;
  industry: string;
  country: string;
  city: string;
  foundedYear: string;
  description: string;
  employeeCount: string;
  revenueRange: number[];
  sellingReason: string;
  timeline: string;
  priceExpectations: string;
  contactEmail: string;
  contactPhone: string;
  wantsVerification: boolean;
}

interface SellerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: SellerFormData) => void;
  existingData?: SellerFormData | null;
  isEditMode?: boolean;
}
```

### **Utilities**

```typescript
// Validation
isStepValid({ formData, step }): boolean

// Draft management
saveDraft(formData, currentStep): void
loadDraft(): { formData, currentStep } | null
clearDraft(): void

// UI helpers
triggerConfetti(): void
formatCurrency(amount): string
getStepTitle(step): string
getStepDescription(step): string
```

## 🎨 **Customization**

### **Adding New Steps**

1. Create new step component in `steps/` folder
2. Follow the `OnboardingStepProps` interface
3. Add step to the main modal's `renderStep()` function
4. Update validation in `utils.ts`
5. Update types and documentation

### **Modifying Existing Steps**

Each step is self-contained and can be modified independently:

```typescript
// Example: Customizing BusinessNameStep
const CustomBusinessNameStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  return (
    <div>
      {/* Your custom implementation */}
    </div>
  );
};
```

### **Styling**

All steps use the shared design system:

- **Colors**: Primary, secondary, success, warning, error
- **Components**: Input, Button, Card from shared components
- **Icons**: Lucide React icons
- **Layout**: Responsive grid system

## 🧪 **Testing**

### **Unit Testing Individual Steps**

```typescript
import { render, screen } from '@testing-library/react';
import { BusinessNameStep } from './steps/BusinessNameStep';

test('renders business name input', () => {
  const mockProps = {
    formData: { businessName: '' },
    updateFormData: jest.fn(),
    onNext: jest.fn(),
    onBack: jest.fn(),
    isFirstStep: false,
    isLastStep: false,
  };

  render(<BusinessNameStep {...mockProps} />);
  expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
});
```

### **Integration Testing**

```typescript
import { SellerOnboardingModal } from './SellerOnboardingModal';

test('completes full onboarding flow', async () => {
  const onComplete = jest.fn();
  render(
    <SellerOnboardingModal
      isOpen={true}
      onClose={jest.fn()}
      onComplete={onComplete}
    />
  );

  // Test step progression
  // Test form validation
  // Test completion
});
```

## 📊 **Performance Considerations**

- **Lazy Loading**: Steps are imported only when needed
- **Memoization**: Form data updates are optimized
- **Draft Persistence**: Minimal localStorage operations
- **Bundle Size**: Tree-shakeable exports

## 🔒 **Security & Privacy**

- **Data Validation**: Client-side validation for UX, server-side for security
- **Privacy**: Contact information is protected and only shared with verified buyers
- **Draft Storage**: Local storage only, no server transmission
- **Input Sanitization**: All user inputs are properly sanitized

## 🚀 **Future Enhancements**

- [ ] **Multi-language Support**: i18n integration
- [ ] **Advanced Validation**: Real-time validation with server checks
- [ ] **Analytics**: Step completion tracking
- [ ] **A/B Testing**: Different step variations
- [ ] **Offline Support**: PWA capabilities
- [ ] **Voice Input**: Accessibility improvements

## 📝 **Contributing**

When adding new features:

1. **Follow the established patterns**
2. **Update types and documentation**
3. **Add comprehensive tests**
4. **Ensure accessibility compliance**
5. **Test on multiple devices**

## 🎯 **Business Impact**

This modular system enables:

- **Faster Development**: New steps can be added in hours, not days
- **Better UX**: Consistent, professional onboarding experience
- **Higher Conversion**: Optimized flow increases completion rates
- **Easier Maintenance**: Isolated components reduce bugs and complexity
- **Scalable Growth**: System grows with business needs

---

**Built with ❤️ by the flyp engineering team**
