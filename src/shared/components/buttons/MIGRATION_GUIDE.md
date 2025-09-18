# 🔄 Button Component Migration Guide

## Overview

The button components have been completely redesigned to align with the **Caregiver brand archetype** from the brand package. This migration ensures consistent, warm, and trustworthy UI across the entire application.

## 🎯 **What Changed**

### **Brand Alignment**
- ✅ **Colors**: Now use exact brand package colors (Trust Blue, Calm Teal, Reassuring Coral)
- ✅ **Typography**: Consistent with brand font weights and sizing
- ✅ **Border Radius**: Softer radii for approachable feel
- ✅ **Shadows**: Subtle shadows following brand guidelines
- ✅ **Psychology**: Each variant has specific emotional purpose

### **New Components**
- ✅ **BrandButton.tsx**: Specialized button components for each brand variant
- ✅ **ButtonGroup.tsx**: Layout patterns for common button combinations
- ✅ **ButtonExamples.tsx**: Comprehensive usage examples

### **Enhanced Features**
- ✅ **Better TypeScript**: Improved type definitions with brand psychology documentation
- ✅ **Accessibility**: Enhanced focus states and ARIA support
- ✅ **Loading States**: Improved loading indicators
- ✅ **Icon Support**: Better icon integration with proper spacing

## 🚀 **Migration Steps**

### **1. Update Imports**

**Before:**
```typescript
import { Button } from '@/shared/components/buttons';
```

**After:**
```typescript
// Option 1: Use brand-specific components (recommended)
import { 
  PrimaryButton, 
  SupportiveButton, 
  OutlineButton 
} from '@/shared/components/buttons';

// Option 2: Use base Button with variants
import { Button } from '@/shared/components/buttons';
```

### **2. Update Button Usage**

**Before:**
```typescript
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
```

**After:**
```typescript
// Recommended: Use brand-specific components
<PrimaryButton>Save</PrimaryButton>
<OutlineButton>Cancel</OutlineButton>

// Or use base Button with variants (same result)
<Button variant="primary">Save</Button>
<Button variant="outline">Cancel</Button>
```

### **3. Use Button Patterns**

**Before:**
```typescript
<div className="flex gap-4">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

**After:**
```typescript
import { FormActions } from '@/shared/components/buttons';

<FormActions
  primary={{ label: "Save", type: "submit" }}
  secondary={{ label: "Cancel", onClick: handleCancel }}
/>
```

## 🎨 **Brand Variants**

### **Primary (Trust Blue)**
- **Use for**: Main CTAs, primary actions
- **Psychology**: Builds confidence and trust
- **Color**: `#3b82f6`

```typescript
<PrimaryButton>Get Started</PrimaryButton>
```

### **Supportive (Calm Teal)**
- **Use for**: Supportive CTAs, "we're here to help" actions
- **Psychology**: Reduces anxiety, feels supportive
- **Color**: `#06b6d4`

```typescript
<SupportiveButton>We've Got You</SupportiveButton>
```

### **Subtle (Reassuring Coral)**
- **Use for**: Secondary CTAs, gentle emphasis
- **Psychology**: Encourages without being pushy
- **Color**: `#f25f57`

```typescript
<SubtleButton>Learn More</SubtleButton>
```

### **Secondary (Neutral)**
- **Use for**: Secondary actions, alternatives
- **Psychology**: Professional, non-threatening
- **Color**: `#71717a`

```typescript
<SecondaryButton>Cancel</SecondaryButton>
```

### **Outline (Clean Borders)**
- **Use for**: Exploratory actions, less prominent CTAs
- **Psychology**: Inviting exploration without pressure
- **Color**: White background with neutral border

```typescript
<OutlineButton>Explore Options</OutlineButton>
```

### **Ghost (Minimal)**
- **Use for**: Low-pressure prompts, minimal actions
- **Psychology**: Subtle, non-intrusive
- **Color**: Transparent with hover states

```typescript
<GhostButton>Back</GhostButton>
```

## 🔧 **Common Patterns**

### **Form Actions**
```typescript
import { FormActions } from '@/shared/components/buttons';

<FormActions
  primary={{ label: "Save Changes", type: "submit" }}
  secondary={{ label: "Cancel", onClick: handleCancel }}
/>
```

### **Call-to-Action**
```typescript
import { CTAActions } from '@/shared/components/buttons';

<CTAActions
  primary={{ label: "Start Your Sale", onClick: handleStart }}
  supportive={{ label: "Get Free Valuation", onClick: handleValuation }}
/>
```

### **Navigation**
```typescript
import { NavigationActions } from '@/shared/components/buttons';

<NavigationActions
  continue={{ label: "Continue", onClick: handleContinue }}
  back={{ label: "Back", onClick: handleBack }}
/>
```

### **Button Groups**
```typescript
import { ButtonGroup } from '@/shared/components/buttons';

<ButtonGroup layout="horizontal" spacing="normal">
  <PrimaryButton>Save</PrimaryButton>
  <OutlineButton>Cancel</OutlineButton>
  <GhostButton>Reset</GhostButton>
</ButtonGroup>
```

## 📋 **Migration Checklist**

- [ ] Update imports to use new button components
- [ ] Replace generic buttons with brand-specific variants
- [ ] Use button patterns for common combinations
- [ ] Test all button states (hover, focus, disabled, loading)
- [ ] Verify accessibility (keyboard navigation, screen readers)
- [ ] Update any custom CSS that overrides button styles
- [ ] Test on different screen sizes

## 🎯 **Benefits**

### **Brand Consistency**
- ✅ All buttons now follow the Caregiver brand archetype
- ✅ Consistent colors, typography, and spacing
- ✅ Emotional design that reduces user anxiety

### **Developer Experience**
- ✅ Clear component names that indicate purpose
- ✅ Better TypeScript support with documentation
- ✅ Pre-built patterns for common use cases

### **User Experience**
- ✅ Warm, trustworthy interface
- ✅ Clear visual hierarchy
- ✅ Accessible and inclusive design
- ✅ Consistent interaction patterns

## 🚨 **Breaking Changes**

### **Removed Variants**
- ❌ Some old variants may not exist anymore
- ✅ Use brand-aligned variants instead

### **Changed Styling**
- ❌ Custom CSS overrides may not work
- ✅ Use component props instead of CSS overrides

### **Import Changes**
- ❌ Some import paths may have changed
- ✅ Use the new import structure

## 📚 **Resources**

- **Brand Package**: `/src/shared/design-system/brand-package.ts`
- **Button Examples**: `/src/shared/components/buttons/ButtonExamples.tsx`
- **Component Documentation**: `/src/shared/components/buttons/README.md`
- **Type Definitions**: `/src/shared/components/types.ts`

## 🆘 **Need Help?**

If you encounter issues during migration:

1. Check the `ButtonExamples.tsx` file for usage patterns
2. Review the brand package for color and spacing values
3. Use the TypeScript definitions for proper prop usage
4. Test with the new components in isolation first

---

**Built with ❤️ following the Caregiver brand archetype**
