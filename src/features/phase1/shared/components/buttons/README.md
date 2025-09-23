# 🔘 Button Component System - Caregiver Brand

**World-class button implementation following the Caregiver brand archetype guidelines.**

## 🎯 **Brand Alignment**

The Button component embodies the **Caregiver archetype** through:

- **Warm, trustworthy colors** that reduce anxiety
- **Softer radii** for a more approachable feel
- **Clear visual hierarchy** that guides users gently
- **Accessible contrast** for all users
- **Consistent with brand package design tokens**

## 🏗️ **Architecture**

### **Main Component**

- **`Button.tsx`** - Core button component with all variants

### **Variant Components**

- **`PrimaryButton.tsx`** - Main CTA buttons (Trust Blue)
- **`SecondaryButton.tsx`** - Secondary actions (White with border)
- **`TertiaryButton.tsx`** - Subtle actions (Transparent with border)
- **`LinkButton.tsx`** - Text-only buttons (Primary blue text)
- **`SuccessButton.tsx`** - Positive actions (Success green)
- **`SupportiveButton.tsx`** - Supportive actions (Calm teal)
- **`SubtleButton.tsx`** - Gentle emphasis (Reassuring coral)
- **`DangerButton.tsx`** - Destructive actions (Error red)

## 🎨 **Button Variants**

### **Primary** - Main Actions

```tsx
import { Button, PrimaryButton } from '@/shared/components/buttons';

<Button variant="primary">Get Started</Button>
<PrimaryButton>Get Started</PrimaryButton>
```

- **Use for**: Main CTAs, primary actions
- **Color**: Trust Blue (`#3b82f6`)
- **Psychology**: Builds confidence and trust
- **Weight**: Semibold

### **Secondary** - Supportive Actions

```tsx
<Button variant="secondary">Learn More</Button>
<SecondaryButton>Learn More</SecondaryButton>
```

- **Use for**: Secondary actions, supportive CTAs
- **Color**: Neutral Gray (`#52525b`)
- **Psychology**: Professional, reliable, non-threatening
- **Weight**: Medium

### **Tertiary** - Gentle Emphasis

```tsx
<Button variant="tertiary">Cancel</Button>
<TertiaryButton>Cancel</TertiaryButton>
```

- **Use for**: Gentle emphasis, encouraging actions
- **Color**: Reassuring Coral (`#f25f57`)
- **Psychology**: Gentle emphasis, encouraging, positive prompts
- **Weight**: Medium

### **Link** - Text-Only Actions

```tsx
<Button variant="link">Read more</Button>
<LinkButton>Read more</LinkButton>
```

- **Use for**: Text-only actions, navigation links
- **Color**: Black text (`text-neutral-700`) with primary blue hover (`hover:text-primary-600`)
- **Psychology**: Subtle, non-intrusive, matches navigation styling
- **Weight**: Medium

### **Success** - Positive Actions

```tsx
<Button variant="success">Save Changes</Button>
<SuccessButton>Save Changes</SuccessButton>
```

- **Use for**: Positive actions, confirmations
- **Color**: Success green (`#22c55e`)
- **Psychology**: Positive reinforcement
- **Weight**: Semibold

### **Supportive** - Supportive Actions

```tsx
<Button variant="supportive">Talk to our team</Button>
<SupportiveButton>Talk to our team</SupportiveButton>
```

- **Use for**: Supportive CTAs, guidance actions
- **Color**: Trust Blue (`#3b82f6`)
- **Psychology**: Builds confidence and trust
- **Weight**: Semibold

### **Subtle** - Gentle Emphasis

```tsx
<Button variant="subtle">Learn more</Button>
<SubtleButton>Learn more</SubtleButton>
```

- **Use for**: Gentle emphasis, encouraging prompts
- **Color**: Reassuring coral (`#f25f57`)
- **Psychology**: Friendly, non-threatening
- **Weight**: Medium

### **Danger** - Destructive Actions

```tsx
<Button variant="danger">Delete Account</Button>
<DangerButton>Delete Account</DangerButton>
```

- **Use for**: Destructive actions, warnings
- **Color**: Error red (`#ef4444`)
- **Psychology**: Clear warning, use sparingly
- **Weight**: Semibold

## 📏 **Sizes**

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

## 🎛️ **Props**

```tsx
interface ButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'link'
    | 'success'
    | 'supportive'
    | 'subtle'
    | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
}
```

## 🎯 **Usage Guidelines**

### **When to Use Each Variant**

1. **Primary**: One main action per screen/section
2. **Secondary**: Alternative actions, secondary CTAs
3. **Tertiary**: Subtle actions, cancel buttons
4. **Link**: Navigation, text-only actions
5. **Success**: Positive confirmations, save actions
6. **Supportive**: Guidance, help actions
7. **Subtle**: Gentle prompts, encouraging actions
8. **Danger**: Destructive actions (use sparingly)

### **Visual Hierarchy**

```
Primary (Trust Blue)     → Main CTA
Secondary (White)        → Secondary actions
Supportive (Calm Teal)   → Supportive actions
Success (Green)          → Positive actions
Subtle (Coral)           → Gentle emphasis
Tertiary (Transparent)   → Subtle actions
Link (Blue text)         → Navigation
Danger (Red)             → Destructive actions
```

### **Accessibility**

- ✅ **WCAG AA compliant** contrast ratios
- ✅ **Focus states** with brand-consistent rings
- ✅ **Disabled states** with proper opacity
- ✅ **Loading states** with accessible spinners
- ✅ **Keyboard navigation** support
- ✅ **Screen reader** friendly

### **Brand Consistency**

- ✅ **Exact brand colors** from `brand-package.ts`
- ✅ **Consistent typography** weights
- ✅ **Brand border radius** (`rounded-lg`)
- ✅ **Smooth transitions** (200ms ease-in-out)
- ✅ **Subtle press feedback** (scale animation)
- ✅ **Brand shadow system** integration

## 📦 **Import Examples**

```tsx
// Import main Button component
import { Button } from '@/shared/components/buttons';

// Import specific variants
import { PrimaryButton, SecondaryButton, SupportiveButton } from '@/shared/components/buttons';

// Import all variants
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  LinkButton,
  SuccessButton,
  SupportiveButton,
  SubtleButton,
  DangerButton,
} from '@/shared/components/buttons';
```

## 🎨 **Design Principles**

### **Caregiver Brand Psychology**

- **Trust First**: Primary blue builds confidence
- **Calm by Design**: Supportive teal reduces anxiety
- **Gentle Guidance**: Subtle coral encourages without pressure
- **Clear Hierarchy**: Visual weight guides user attention
- **Accessible Always**: Works for all users

### **Modern UI Standards**

- **Consistent spacing** with 8px grid system
- **Smooth animations** for better UX
- **Proper loading states** for async actions
- **Touch-friendly** sizing (minimum 44px)
- **Responsive design** across all devices

## 🔄 **Migration from Old System**

```tsx
// Old variants → New variants
variant="supportive" → variant="primary" (or use SupportiveButton)
variant="bordered"   → variant="tertiary"
variant="ghost"      → variant="tertiary"
variant="outline"    → variant="tertiary"
variant="light"      → variant="tertiary"
variant="flat"       → variant="tertiary"
```

## 🎨 **Customization**

For custom styling, use the `className` prop:

```tsx
<Button variant="primary" className="custom-styles">
  Custom Button
</Button>
```

---

**Built with ❤️ for the Caregiver brand archetype - Creating trust through thoughtful design**
