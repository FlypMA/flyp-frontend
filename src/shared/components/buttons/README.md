# 🔘 Button Component - Caregiver Brand System

**Unified button implementation following the Caregiver brand archetype guidelines.**

## 🎯 **Brand Alignment**

The Button component embodies the **Caregiver archetype** through:

- **Warm, trustworthy colors** that reduce anxiety
- **Softer radii** for a more approachable feel
- **Clear visual hierarchy** that guides users gently
- **Accessible contrast** for all users

## 🎨 **Color Variants**

### **Primary Actions** - Trust Blue

```typescript
<Button variant="primary">Get Started</Button>
```

- **Use for**: Main CTAs, primary actions
- **Color**: Trust Blue (`primary-600`)
- **Psychology**: Builds confidence and trust

### **Supportive Actions** - Calm Teal

```typescript
<Button variant="supportive">We've Got You</Button>
```

- **Use for**: Supportive CTAs, "we're here to help" actions
- **Color**: Calm Teal (`calm-600`)
- **Psychology**: Reassuring, "we've got you" feeling

### **Gentle Emphasis** - Reassuring Coral

```typescript
<Button variant="subtle">Learn More</Button>
```

- **Use for**: Secondary CTAs, gentle emphasis
- **Color**: Reassuring Coral (`accent-600`)
- **Psychology**: Encouraging without being pushy

### **Secondary Actions** - Neutral

```typescript
<Button variant="secondary">Cancel</Button>
```

- **Use for**: Secondary actions, alternatives
- **Color**: Neutral Gray (`neutral-600`)
- **Psychology**: Professional, non-threatening

### **Outline Actions** - Clean Borders

```typescript
<Button variant="outline">Explore Options</Button>
```

- **Use for**: Exploratory actions, less prominent CTAs
- **Color**: White background with neutral border
- **Psychology**: Inviting exploration without pressure

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
// Primary action - main CTA
<Button variant="primary" size="lg">
  Start Your Business Sale
</Button>

// Supportive action - secondary CTA
<Button variant="supportive" size="lg">
  Get Free Valuation
</Button>
```

### **Dashboard Actions**

```typescript
// Primary dashboard action
<Button variant="primary">
  Create Listing
</Button>

// Supportive action
<Button variant="supportive">
  Get Help
</Button>

// Secondary action
<Button variant="outline">
  View Reports
</Button>
```

### **Form Actions**

```typescript
// Form submission
<Button variant="primary" type="submit">
  Save Changes
</Button>

// Form cancellation
<Button variant="outline" type="button">
  Cancel
</Button>
```

### **Navigation Actions**

```typescript
// Primary navigation
<Button variant="primary" size="sm">
  Continue
</Button>

// Secondary navigation
<Button variant="ghost" size="sm">
  Back
</Button>
```

## 🎨 **Brand Guidelines**

### **Do's**

- ✅ Use `primary` for main actions that drive the user forward
- ✅ Use `supportive` for "we're here to help" messaging
- ✅ Use `subtle` for gentle encouragement
- ✅ Use `outline` for exploratory actions
- ✅ Maintain consistent sizing within the same context

### **Don'ts**

- ❌ Don't use multiple primary buttons on the same page
- ❌ Don't use `danger` unless it's truly destructive
- ❌ Don't mix button sizes randomly
- ❌ Don't override colors with custom CSS

## 🔍 **Accessibility**

All buttons include:

- **Focus rings** for keyboard navigation
- **Proper contrast ratios** for text readability
- **Disabled states** with reduced opacity
- **Loading states** with spinner indicators

## 🚀 **Advanced Usage**

### **With Icons**

```typescript
<Button variant="primary" startContent={<ArrowRight />}>
  Get Started
</Button>

<Button variant="supportive" endContent={<HelpCircle />}>
  Need Help?
</Button>
```

### **Loading States**

```typescript
<Button variant="primary" loading>
  Processing...
</Button>
```

### **Full Width**

```typescript
<Button variant="primary" fullWidth>
  Complete Setup
</Button>
```

### **Icon Only**

```typescript
<Button variant="ghost" isIconOnly>
  <Settings />
</Button>
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

### **Emotional Impact**

- **Reduces decision fatigue** with clear hierarchy
- **Builds trust** through consistent, professional design
- **Feels supportive** rather than pushy
- **Guides gently** rather than shouting

---

**Built with ❤️ following the Caregiver brand archetype**
