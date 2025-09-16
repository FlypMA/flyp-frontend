# UI Components

This directory contains basic UI components that provide foundational building blocks for user interfaces.

## Components

### Input

A basic input component with built-in label, error, and helper text support.

**Features:**
- Built-in label support
- Error state handling with red styling
- Helper text display
- Focus states with primary color
- Full HTML input attribute support
- Customizable styling

**Usage:**
```tsx
import { Input } from '@/shared/components/ui';

// Basic input with label
<Input 
  label="Email Address"
  type="email"
  placeholder="Enter your email"
/>

// Input with error state
<Input 
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// Input with helper text
<Input 
  label="Phone Number"
  type="tel"
  helperText="Include country code"
/>

// Custom styled input
<Input 
  label="Custom Input"
  className="border-blue-300 focus:ring-blue-500"
/>
```

**Props:**
- `label`: string - Input label
- `error`: string - Error message (shows in red)
- `helperText`: string - Helper text (shows in gray)
- `className`: string - Additional CSS classes
- All standard HTML input attributes are supported

**Styling:**
- **Default**: Gray border with subtle shadow
- **Focus**: Primary color ring and border
- **Error**: Red border and ring
- **Helper Text**: Gray text below input
- **Error Text**: Red text below input

## Design System Integration

- **Colors**: Uses design system primary colors for focus states
- **Typography**: Consistent with design system font sizes and weights
- **Spacing**: Standardized margins and padding
- **Accessibility**: Proper label association and focus management

## Accessibility Features

- **Label Association**: Proper label-input association
- **Focus Management**: Clear focus indicators
- **Error Announcements**: Screen reader friendly error messages
- **Keyboard Navigation**: Full keyboard support
- **High Contrast**: Compatible with high contrast modes

## Use Cases

- **Forms**: Basic form input fields
- **Search**: Search input fields
- **Settings**: Configuration input fields
- **Authentication**: Login and registration forms
- **Data Entry**: General data input needs

## Styling Customization

The Input component can be customized through the `className` prop:

```tsx
// Custom border color
<Input 
  label="Custom Border"
  className="border-green-300 focus:ring-green-500"
/>

// Custom size
<Input 
  label="Large Input"
  className="px-4 py-3 text-lg"
/>

// Custom background
<Input 
  label="Custom Background"
  className="bg-gray-50"
/>
```

## Error Handling

The component provides built-in error state management:

```tsx
const [error, setError] = useState('');

<Input 
  label="Email"
  type="email"
  error={error}
  onChange={(e) => {
    if (!e.target.value.includes('@')) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  }}
/>
```

## Helper Text

Helper text provides additional context without indicating an error:

```tsx
<Input 
  label="Password"
  type="password"
  helperText="Must be at least 8 characters with numbers and symbols"
/>
```
