# Shared Components - Phase 1

## 🧩 Overview

The shared components library provides reusable UI components, services, and utilities used across the FLYP platform. This ensures consistency, maintainability, and development efficiency.

## 📁 Structure

```
shared/
├── components/
│   ├── business/              # Business-specific components
│   ├── buttons/               # Button components
│   ├── cards/                 # Card components
│   ├── forms/                 # Form components
│   ├── layout/                # Layout components
│   ├── listings/              # Listing-specific components
│   ├── loading/               # Loading components
│   ├── modals/                # Modal components
│   ├── navigation/            # Navigation components
│   ├── typography/            # Typography components
│   └── index.ts               # Component exports
├── services/
│   ├── auth/                  # Authentication services
│   ├── api/                   # API services
│   └── index.ts               # Service exports
├── types/
│   └── index.ts               # Type definitions
├── utils/
│   ├── dev/                   # Development utilities
│   ├── validation/            # Validation utilities
│   └── index.ts               # Utility exports
└── README.md                  # This file
```

## 🎯 Core Component Categories

### 1. Form Components

- **CustomInputField**: Text input with validation
- **CustomNumberInputField**: Number input with formatting
- **CustomDropdown**: Select dropdown with search
- **CustomCheckbox**: Checkbox with custom styling
- **CustomTextarea**: Textarea with character count
- **CustomFileInput**: File upload with drag-and-drop
- **CustomRadio**: Radio button groups
- **CustomSwitch**: Toggle switch component

### 2. Button Components

- **Button**: Primary button component
- **PrimaryButton**: Primary action button
- **SecondaryButton**: Secondary action button
- **TertiaryButton**: Tertiary action button
- **DangerButton**: Destructive action button
- **SuccessButton**: Success action button
- **LinkButton**: Link-style button
- **SubtleButton**: Subtle action button

### 3. Card Components

- **Card**: Base card component
- **EmptyStateCard**: Empty state display
- **BusinessProfileCard**: Business profile display
- **ValuationCard**: Valuation report display

### 4. Modal Components

- **CenteredModal**: Centered modal container
- **FullscreenModal**: Fullscreen modal container
- **TwoPanelModal**: Two-panel modal layout
- **InquiryModal**: Business inquiry modal
- **NDAModal**: NDA signing modal
- **ValuationModal**: Business valuation modal
- **BusinessProfileModal**: Business profile modal

### 5. Navigation Components

- **Navigation**: Main navigation component
- **DashboardSidebar**: Dashboard sidebar navigation
- **UserAvatarDropdown**: User avatar dropdown
- **BuyerDropdown**: Buyer-specific navigation
- **SellerDropdown**: Seller-specific navigation

### 6. Layout Components

- **Container**: Page container component
- **Footer**: Site footer component
- **Header**: Site header component

## 🔧 Component Usage

### Form Components

```typescript
import {
  CustomInputField,
  CustomNumberInputField,
  CustomDropdown
} from '@/features/phase1/shared/components/forms';

function BusinessForm() {
  return (
    <form>
      <CustomInputField
        label="Business Name"
        placeholder="Enter business name"
        required
      />
      <CustomNumberInputField
        label="Annual Revenue"
        prefix="€"
        formatAsCurrency
      />
      <CustomDropdown
        label="Industry"
        options={industryOptions}
        placeholder="Select industry"
      />
    </form>
  );
}
```

### Button Components

```typescript
import {
  Button,
  PrimaryButton,
  SecondaryButton
} from '@/features/phase1/shared/components/buttons';

function ActionButtons() {
  return (
    <div className="flex space-x-4">
      <PrimaryButton onPress={handleSubmit}>
        Submit
      </PrimaryButton>
      <SecondaryButton onPress={handleCancel}>
        Cancel
      </SecondaryButton>
    </div>
  );
}
```

### Modal Components

```typescript
import { CenteredModal } from '@/features/phase1/shared/components/modals';

function MyModal() {
  return (
    <CenteredModal
      isOpen={isOpen}
      onClose={onClose}
      title="Modal Title"
    >
      <div>Modal content</div>
    </CenteredModal>
  );
}
```

## 🎨 Design System

### Color Palette

- **Primary**: Brand primary colors
- **Secondary**: Brand secondary colors
- **Neutral**: Gray scale colors
- **Success**: Green success colors
- **Warning**: Yellow warning colors
- **Error**: Red error colors

### Typography

- **Headings**: H1, H2, H3, H4, H5, H6
- **Body Text**: Regular, medium, semibold, bold
- **Small Text**: Captions, labels, helper text
- **Code**: Monospace font for code

### Spacing

- **Margin**: Consistent margin system
- **Padding**: Consistent padding system
- **Gap**: Consistent gap system
- **Border Radius**: Consistent border radius

### Shadows

- **Small**: Subtle shadows for cards
- **Medium**: Medium shadows for modals
- **Large**: Large shadows for overlays

## 🔒 Security Features

### Input Validation

- **Client-Side**: Real-time validation
- **Server-Side**: Backend validation
- **Error Messages**: User-friendly error messages
- **Sanitization**: Input sanitization

### Data Protection

- **Encryption**: Sensitive data encryption
- **Access Control**: Role-based access
- **Audit Trails**: User action logging
- **Compliance**: GDPR compliance

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### Mobile Optimization

- **Touch Targets**: Minimum 44px touch targets
- **Swipe Gestures**: Mobile navigation patterns
- **Keyboard Support**: Proper input types
- **Viewport**: Optimized viewport settings

## 🧪 Testing

### Component Testing

- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **Visual Tests**: Visual regression testing
- **Accessibility Tests**: WCAG compliance testing

### Test Coverage

- **Component Coverage**: > 90% component coverage
- **Function Coverage**: > 85% function coverage
- **Branch Coverage**: > 80% branch coverage
- **Line Coverage**: > 85% line coverage

## 📊 Performance

### Optimization

- **Lazy Loading**: Component lazy loading
- **Memoization**: Expensive calculations memoized
- **Bundle Splitting**: Code splitting for better performance
- **Tree Shaking**: Unused code elimination

### Metrics

- **Bundle Size**: Minimal impact on bundle size
- **Load Time**: Fast component loading
- **Memory Usage**: Efficient memory usage
- **Rendering**: Optimized rendering performance

## 🚀 Future Enhancements

### Phase 2 Features

- **Advanced Components**: More complex UI components
- **Animation Library**: Smooth animations and transitions
- **Theme System**: Advanced theming capabilities
- **Accessibility**: Enhanced accessibility features

### Integration Features

- **Design Tokens**: Design system tokens
- **Storybook**: Component documentation
- **Testing Tools**: Advanced testing utilities
- **Performance Monitoring**: Component performance tracking

## 📚 Related Documentation

- [Component Library](../../../shared/components/README.md)
- [Form Components](../../../shared/components/forms/README.md)
- [Button Components](../../../shared/components/buttons/README.md)
- [Modal Components](../../../shared/components/modals/README.md)

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: MVP Ready
