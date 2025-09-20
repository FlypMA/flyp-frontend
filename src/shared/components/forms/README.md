# Form Components

This directory contains a comprehensive set of form components for building user interfaces with consistent styling and behavior. All components follow the same design system with floating labels, smooth animations, and consistent validation states.

## Components

### CustomInputField

The primary input component for text, email, and other standard input types.

**Features:**
- Floating label animation
- Error and validation states
- Disabled and required states
- Consistent styling with rounded corners
- Smooth focus transitions

**Usage:**

```tsx
import { CustomInputField } from '@/shared/components/forms';

<CustomInputField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={handleEmailChange}
  onBlur={handleEmailBlur}
  name="email"
  required
  error={errors.email}
  touched={touched.email}
/>
```

### CustomPasswordInputField

Specialized password input with visibility toggle and optional strength indicator.

**Features:**
- Show/hide password toggle
- Optional password strength indicator
- All standard input features
- Enhanced security UX

**Usage:**

```tsx
import { CustomPasswordInputField } from '@/shared/components/forms';

<CustomPasswordInputField
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChange={handlePasswordChange}
  onBlur={handlePasswordBlur}
  name="password"
  showPasswordStrength
  required
/>
```

### CustomNumberInputField

Number input with formatting, validation, and currency support.

**Features:**
- Min/max validation
- Currency formatting
- Prefix/suffix support
- Decimal control
- Step increment support

**Usage:**

```tsx
import { CustomNumberInputField } from '@/shared/components/forms';

<CustomNumberInputField
  label="Price"
  placeholder="0.00"
  value={price}
  onChange={handlePriceChange}
  onBlur={handlePriceBlur}
  name="price"
  prefix="$"
  formatAsCurrency
  min={0}
  step={0.01}
/>
```

### CustomTextarea

Enhanced textarea component with floating label and auto-resize functionality.

**Features:**
- Floating label animation
- Auto-resize functionality
- Min/max height control
- Error and validation states
- Consistent styling

**Usage:**

```tsx
import { CustomTextarea } from '@/shared/components/forms';

<CustomTextarea
  label="Description"
  placeholder="Enter your description..."
  value={description}
  onChange={handleDescriptionChange}
  onBlur={handleDescriptionBlur}
  name="description"
  minHeight={120}
  maxHeight={300}
  autoResize
  required
/>
```

### CustomDropdown

Enhanced dropdown component with floating label and search functionality.

**Features:**
- Floating label animation
- Search functionality
- Keyboard navigation
- Error and validation states
- Consistent styling

**Usage:**

```tsx
import { CustomDropdown } from '@/shared/components/forms';

<CustomDropdown
  label="Industry"
  placeholder="Select an industry"
  options={industryOptions}
  value={selectedIndustry}
  onChange={setSelectedIndustry}
  name="industry"
  required
/>
```

### CustomCheckbox

Enhanced checkbox component with consistent styling and validation.

**Features:**
- Custom checkbox styling
- Error and validation states
- Description text support
- Consistent design system

**Usage:**

```tsx
import { CustomCheckbox } from '@/shared/components/forms';

<CustomCheckbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={handleAgreementChange}
  onBlur={handleAgreementBlur}
  name="agreement"
  required
  description="By checking this box, you agree to our terms of service"
/>
```

### CustomRadio

Enhanced radio button component with consistent styling.

**Features:**
- Custom radio button styling
- Error and validation states
- Description text support
- Consistent design system

**Usage:**

```tsx
import { CustomRadio } from '@/shared/components/forms';

<CustomRadio
  label="Option 1"
  value="option1"
  checked={selectedOption === 'option1'}
  onChange={handleOptionChange}
  name="options"
  required
/>
```

### CustomSwitch

Enhanced switch component with consistent styling.

**Features:**
- Custom switch styling
- Error and validation states
- Description text support
- Consistent design system

**Usage:**

```tsx
import { CustomSwitch } from '@/shared/components/forms';

<CustomSwitch
  label="Enable notifications"
  checked={notificationsEnabled}
  onChange={handleNotificationChange}
  name="notifications"
  description="Receive email notifications about updates"
/>
```

### CustomFileInput

Enhanced file input component with drag and drop support.

**Features:**
- Drag and drop functionality
- File preview and removal
- File size validation
- Multiple file support
- Consistent styling

**Usage:**

```tsx
import { CustomFileInput } from '@/shared/components/forms';

<CustomFileInput
  label="Upload Documents"
  placeholder="Choose files or drag and drop"
  onChange={handleFileChange}
  name="documents"
  accept=".pdf,.doc,.docx"
  multiple
  maxSize={10}
  description="Maximum file size: 10MB"
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
import { FormField, CustomInputField } from '@/shared/components/forms';

<FormField
  label="Company Name"
  required
  helpText="Enter your company's legal name"
  error={errors.companyName}
>
  <CustomInputField
    type="text"
    placeholder="Acme Corporation"
    value={companyName}
    onChange={handleCompanyNameChange}
    onBlur={handleCompanyNameBlur}
    name="companyName"
  />
</FormField>
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
/>
```

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
