# Form Components

This directory contains a comprehensive set of form components for building user interfaces with consistent styling and behavior.

## Components

### Input

The primary input component that serves as the single source of truth for all input implementations across the application.

**Features:**

- Multiple input types: text, email, password, number, tel, etc.
- Icon support (left and right icons)
- Error and validation states
- Help text and descriptions
- Multiple sizes: sm, md, lg
- Full width option
- Disabled and required states
- Custom styling via className

**Usage:**

```tsx
import { Input } from '@/shared/components/forms';

// Basic input
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>

// With icons and validation
<Input
  label="Password"
  type="password"
  leftIcon={<LockIcon />}
  error="Password must be at least 8 characters"
  required
/>

// With help text
<Input
  label="Phone Number"
  type="tel"
  placeholder="+32 123 456 789"
  description="Include country code"
/>
```

### AnimatedTextarea

An advanced textarea component with smooth animations and React Final Form integration.

**Features:**

- Smooth label animations
- React Final Form integration
- Standalone mode support
- Auto-resize functionality
- Min/max rows control
- Error and validation states
- Customizable styling

**Usage:**

```tsx
import { AnimatedTextarea } from '@/shared/components/forms';

// Standalone mode
<AnimatedTextarea
  label="Message"
  placeholder="Enter your message..."
  minRows={3}
  maxRows={8}
  value={message}
  onChange={setMessage}
/>

// React Final Form integration
<AnimatedTextarea
  variant="react-final-form"
  label="Description"
  field={field}
  meta={meta}
/>
```

### FormField

A wrapper component that provides consistent labeling, validation, and help text for form fields.

**Features:**

- Consistent field labeling
- Required field indicators
- Help text display
- Error message handling
- Flexible content wrapping
- Accessibility support

**Usage:**

```tsx
import { FormField, Input } from '@/shared/components/forms';

<FormField
  label="Company Name"
  required
  helpText="Enter your company's legal name"
  error={errors.companyName}
>
  <Input value={companyName} onChange={setCompanyName} placeholder="Acme Corporation" />
</FormField>;
```

### FormRecovery

A component for handling form recovery and auto-save functionality.

**Features:**

- Auto-save form data
- Recovery prompts
- Local storage integration
- Session management
- User-friendly recovery flow

**Usage:**

```tsx
import { FormRecovery } from '@/shared/components/forms';

<FormRecovery
  formId="business-listing"
  onRecover={data => setFormData(data)}
  onSave={data => saveToStorage(data)}
/>;
```

### StyledSelect

A custom styled select component with enhanced functionality.

**Features:**

- Custom styling
- Search functionality
- Multi-select support
- Custom options rendering
- Keyboard navigation
- Accessibility compliance

**Usage:**

```tsx
import { StyledSelect } from '@/shared/components/forms';

<StyledSelect
  label="Industry"
  options={industries}
  value={selectedIndustry}
  onChange={setSelectedIndustry}
  placeholder="Select an industry"
/>;
```

### SwitchShowcase

A demonstration component showing various switch configurations and use cases.

**Features:**

- Multiple switch examples
- Different configurations
- Interactive demonstrations
- Best practices showcase

### TextareaShowcase

A demonstration component showing various textarea configurations and use cases.

**Features:**

- Multiple textarea examples
- Different configurations
- Interactive demonstrations
- Best practices showcase

## Design System Integration

All form components follow the unified design system:

- **Consistent Styling**: Unified color palette, typography, and spacing
- **State Management**: Consistent error, success, and disabled states
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Theme Support**: CSS custom properties for easy theming

## Form Validation

Components support various validation patterns:

- **Required Fields**: Visual indicators and validation
- **Error States**: Clear error messaging and styling
- **Help Text**: Contextual help and guidance
- **Real-time Validation**: Immediate feedback on user input
- **Custom Validation**: Support for custom validation rules

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **High Contrast**: Support for high contrast modes
- **Error Announcements**: Screen reader announcements for errors

## Usage Patterns

### Basic Form

```tsx
import { FormField, Input, AnimatedTextarea, Button } from '@/shared/components/forms';

const BasicForm = () => (
  <form>
    <FormField label="Name" required>
      <Input placeholder="Enter your name" />
    </FormField>

    <FormField label="Message">
      <AnimatedTextarea placeholder="Enter your message" />
    </FormField>

    <Button type="submit">Submit</Button>
  </form>
);
```

### Advanced Form with Validation

```tsx
const AdvancedForm = () => {
  const [errors, setErrors] = useState({});

  return (
    <form>
      <FormField
        label="Email"
        required
        error={errors.email}
        helpText="We'll never share your email"
      >
        <Input type="email" error={!!errors.email} />
      </FormField>
    </form>
  );
};
```
