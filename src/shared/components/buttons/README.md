# 🔘 Button Component - Caregiver Brand System

**Unified button implementation following the Caregiver brand archetype guidelines.**

## 🎯 **Brand Alignment**

The Button component embodies the **Caregiver archetype** through:

- **Warm, trustworthy colors** that reduce anxiety
- **Softer radii** for a more approachable feel
- **Clear visual hierarchy** that guides users gently
- **Accessible contrast** for all users
- **Consistent with brand package design tokens**

## 🎨 **Color Variants**

### **Primary Actions** - Trust Blue

```typescript
<Button variant="primary">Get Started</Button>
<PrimaryButton>Get Started</PrimaryButton>
```

- **Use for**: Main CTAs, primary actions
- **Color**: Trust Blue (`#3b82f6`)
- **Psychology**: Builds confidence and trust

### **Supportive Actions** - Calm Teal

```typescript
<Button variant="supportive">We've Got You</Button>
<SupportiveButton>We've Got You</SupportiveButton>
```

- **Use for**: Supportive CTAs, "we're here to help" actions
- **Color**: Calm Teal (`#06b6d4`)
- **Psychology**: Reassuring, "we've got you" feeling

### **Gentle Emphasis** - Reassuring Coral

```typescript
<Button variant="subtle">Learn More</Button>
<SubtleButton>Learn More</SubtleButton>
```

- **Use for**: Secondary CTAs, gentle emphasis
- **Color**: Reassuring Coral (`#f25f57`)
- **Psychology**: Encouraging without being pushy

### **Secondary Actions** - Neutral

```typescript
<Button variant="secondary">Cancel</Button>
<SecondaryButton>Cancel</SecondaryButton>
```

- **Use for**: Secondary actions, alternatives
- **Color**: Neutral Gray (`#71717a`)
- **Psychology**: Professional, non-threatening

### **Outline Actions** - Clean Borders

```typescript
<Button variant="outline">Explore Options</Button>
<OutlineButton>Explore Options</OutlineButton>
```

- **Use for**: Exploratory actions, less prominent CTAs
- **Color**: White background with neutral border
- **Psychology**: Inviting exploration without pressure

### **Ghost Actions** - Minimal

```typescript
<Button variant="ghost">Back</Button>
<GhostButton>Back</GhostButton>
```

- **Use for**: Low-pressure prompts, minimal actions
- **Color**: Transparent with hover states
- **Psychology**: Subtle, non-intrusive

## 📏 **Sizes**

```typescript
<Button size="xs">Small</Button>    // Extra small
<Button size="sm">Small</Button>    // Small
<Button size="md">Medium</Button>   // Default
<Button size="lg">Large</Button>    // Large
<Button size="xl">Extra Large</Button> // Extra large
```

## 🔧 **Usage Examples**

### **Landing Page CTAs**

```typescript
import { CTAActions } from '@/shared/components/buttons';

// Primary action with supportive secondary
<CTAActions
  primary={{ label: "Start Your Business Sale", onClick: handleStart }}
  supportive={{ label: "Get Free Valuation", onClick: handleValuation }}
/>
```

### **Form Actions**

```typescript
import { FormActions } from '@/shared/components/buttons';

// Form submission with cancel option
<FormActions
  primary={{ label: "Save Changes", type: "submit" }}
  secondary={{ label: "Cancel", onClick: handleCancel }}
/>
```

### **Navigation Actions**

```typescript
import { NavigationActions } from '@/shared/components/buttons';

// Page navigation with back/continue
<NavigationActions
  continue={{ label: "Continue", onClick: handleContinue }}
  back={{ label: "Back", onClick: handleBack }}
/>
```

### **Individual Buttons**

```typescript
import { 
  PrimaryButton, 
  SupportiveButton, 
  OutlineButton,
  GhostButton 
} from '@/shared/components/buttons';

// Dashboard actions
<PrimaryButton onClick={handleCreate}>
  Create Listing
</PrimaryButton>

<SupportiveButton onClick={handleHelp}>
  Get Help
</SupportiveButton>

<OutlineButton onClick={handleView}>
  View Reports
</OutlineButton>
```

### **Button Groups**

```typescript
import { ButtonGroup } from '@/shared/components/buttons';

// Custom button grouping
<ButtonGroup layout="horizontal" spacing="normal">
  <PrimaryButton>Save</PrimaryButton>
  <OutlineButton>Cancel</OutlineButton>
  <GhostButton>Reset</GhostButton>
</ButtonGroup>
```

## 🎨 **Brand Guidelines**

### **Do's**

- ✅ Use `primary` for main actions that drive the user forward
- ✅ Use `supportive` for "we're here to help" messaging
- ✅ Use `subtle` for gentle encouragement
- ✅ Use `outline` for exploratory actions
- ✅ Use `ghost` for low-pressure prompts
- ✅ Maintain consistent sizing within the same context
- ✅ Use button groups for related actions

### **Don'ts**

- ❌ Don't use multiple primary buttons on the same page
- ❌ Don't use `danger` unless it's truly destructive
- ❌ Don't mix button sizes randomly
- ❌ Don't override colors with custom CSS
- ❌ Don't use harsh, aggressive colors

## 🔍 **Accessibility**

All buttons include:

- **Focus rings** for keyboard navigation
- **Proper contrast ratios** for text readability
- **Disabled states** with reduced opacity
- **Loading states** with spinner indicators
- **ARIA attributes** for screen readers

## 🚀 **Advanced Usage**

### **With Icons**

```typescript
import { ArrowRight, HelpCircle } from 'lucide-react';

<PrimaryButton startContent={<ArrowRight />}>
  Get Started
</PrimaryButton>

<SupportiveButton endContent={<HelpCircle />}>
  Need Help?
</SupportiveButton>
```

### **Loading States**

```typescript
<PrimaryButton loading>
  Processing...
</PrimaryButton>

<SupportiveButton isLoading>
  Saving...
</SupportiveButton>
```

### **Full Width**

```typescript
<PrimaryButton fullWidth>
  Complete Setup
</PrimaryButton>
```

### **Icon Only**

```typescript
import { Settings } from 'lucide-react';

<GhostButton isIconOnly>
  <Settings />
</GhostButton>
```

## 🎯 **Caregiver Brand Psychology**

### **Color Psychology**

- **Trust Blue**: Builds confidence and credibility
- **Calm Teal**: Reduces anxiety, feels supportive
- **Reassuring Coral**: Encourages without pressure
- **Neutral Gray**: Professional, non-threatening

### **Visual Hierarchy**

- **Primary**: "This is the main action"
- **Supportive**: "We're here to help"
- **Subtle**: "This might be useful"
- **Outline**: "Explore this option"
- **Ghost**: "This is available but not urgent"

### **Emotional Impact**

- **Reduces decision fatigue** with clear hierarchy
- **Builds trust** through consistent, professional design
- **Feels supportive** rather than pushy
- **Guides gently** rather than shouting
- **Creates emotional safety** through warm, approachable design

## 📚 **Component Architecture**

```
Button (Base Component)
├── BrandButton (Specialized Variants)
│   ├── PrimaryButton
│   ├── SupportiveButton
│   ├── SubtleButton
│   ├── SecondaryButton
│   ├── OutlineButton
│   ├── GhostButton
│   └── DangerButton
└── ButtonGroup (Layout Patterns)
    ├── FormActions
    ├── CTAActions
    └── NavigationActions
```

## 🔧 **Technical Details**

- **Built with**: React + TypeScript
- **Styling**: Tailwind CSS with brand tokens
- **Accessibility**: WCAG AA compliant
- **Browser Support**: Modern browsers (ES2020+)
- **Bundle Size**: ~2KB gzipped

---

**Built with ❤️ following the Caregiver brand archetype**