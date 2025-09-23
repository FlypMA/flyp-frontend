# Tab Components

This directory contains a modern, accessible tab component system for organizing content into multiple panels.

## Components

### Tabs

The main tab container component that manages tab state and provides context for tab panels.

**Features:**

- Modern pill/segment design
- Zero dependencies on complex UI libraries
- Built-in accessibility (ARIA, keyboard navigation)
- Responsive and mobile-friendly
- Lightweight and performant
- Context-based state management
- Customizable styling

**Usage:**

```tsx
import { Tabs, TabItem, TabPanel } from '@/shared/components/tabs';

const tabItems = [
  { id: 'overview', label: 'Overview', icon: <HomeIcon /> },
  { id: 'details', label: 'Details', icon: <InfoIcon /> },
  { id: 'contact', label: 'Contact', icon: <MailIcon /> },
];

<Tabs items={tabItems} defaultActiveTab="overview">
  <TabPanel tabId="overview">
    <h2>Business Overview</h2>
    <p>Overview content goes here...</p>
  </TabPanel>

  <TabPanel tabId="details">
    <h2>Business Details</h2>
    <p>Details content goes here...</p>
  </TabPanel>

  <TabPanel tabId="contact">
    <h2>Contact Information</h2>
    <p>Contact content goes here...</p>
  </TabPanel>
</Tabs>;
```

### TabItem

Individual tab item component with support for icons and custom styling.

**Features:**

- Icon support
- Custom styling
- Accessibility attributes
- Keyboard navigation
- Active state management

**Usage:**

```tsx
import { TabItem } from '@/shared/components/tabs';

<TabItem
  id="overview"
  label="Overview"
  icon={<HomeIcon />}
  isActive={activeTab === 'overview'}
  onClick={() => setActiveTab('overview')}
/>;
```

### TabPanel

Content panel component that displays when its corresponding tab is active.

**Features:**

- Conditional rendering based on active tab
- Smooth transitions
- Accessibility support
- Custom content support

**Usage:**

```tsx
import { TabPanel } from '@/shared/components/tabs';

<TabPanel tabId="overview">
  <div>
    <h2>Overview Content</h2>
    <p>This content is shown when the overview tab is active.</p>
  </div>
</TabPanel>;
```

### useTabs Hook

A custom hook for managing tab state and providing tab context.

**Features:**

- State management
- Context provision
- Active tab tracking
- Tab switching logic

**Usage:**

```tsx
import { useTabs } from '@/shared/components/tabs';

const MyComponent = () => {
  const { activeTab, setActiveTab, tabs } = useTabs({
    items: tabItems,
    defaultActiveTab: 'overview',
  });

  return <div>{/* Tab implementation */}</div>;
};
```

## Props and Types

### TabsProps

- `items`: TabItem[] - Array of tab items
- `defaultActiveTab`: string - Initially active tab ID
- `onTabChange`: (tabId: string) => void - Tab change handler
- `variant`: 'default' | 'pills' | 'underline' - Tab style variant
- `size`: 'sm' | 'md' | 'lg' - Tab size
- `className`: string - Additional CSS classes
- `children`: ReactNode - Tab panel content

### TabItem

- `id`: string - Unique tab identifier
- `label`: string - Tab display label
- `icon`: ReactNode - Optional icon
- `disabled`: boolean - Whether tab is disabled
- `badge`: string | number - Optional badge content

### TabPanelProps

- `tabId`: string - Associated tab ID
- `children`: ReactNode - Panel content

## Design Variants

### Default Variant

- Clean, minimal design
- Subtle borders and hover effects
- Professional appearance

### Pills Variant

- Rounded pill-shaped tabs
- Modern, segmented control appearance
- High contrast active state

### Underline Variant

- Underline indicator for active tab
- Minimal design
- Clean typography focus

## Accessibility Features

- **ARIA Support**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support (Tab, Arrow keys, Enter, Space)
- **Focus Management**: Clear focus indicators
- **Screen Reader Support**: Descriptive labels and announcements
- **High Contrast**: Compatible with high contrast modes

## Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Touch-Friendly**: Appropriate touch targets
- **Flexible Layout**: Adapts to different screen sizes
- **Overflow Handling**: Graceful handling of many tabs

## Performance

- **Lightweight**: Zero external dependencies
- **Optimized Rendering**: Efficient re-renders
- **Context Optimization**: Minimal context updates
- **Memory Efficient**: Proper cleanup and state management

## Use Cases

- **Dashboard Navigation**: Organize dashboard sections
- **Form Sections**: Group related form fields
- **Content Organization**: Structure complex content
- **Settings Panels**: Organize configuration options
- **Data Views**: Switch between different data representations
