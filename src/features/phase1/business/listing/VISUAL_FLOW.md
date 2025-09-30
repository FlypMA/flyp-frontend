# 🎨 Visual Flow - Complete Listing Creation Journey

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                         START: Listings Page                        │
│                    /my-business/listings                            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │  Your Listings                                              │  │
│  │  ───────────────────────────────────────────                │  │
│  │                                                             │  │
│  │  No listings yet. Create your first listing!                │  │
│  │                                                             │  │
│  │  ┌────────────────────────┐                                │  │
│  │  │ + Create New Listing   │  ← User clicks this            │  │
│  │  └────────────────────────┘                                │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Navigate to prelude
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 1: Business Type Selection                  │
│                    /my-business/listings/prelude                    │
│                                                                     │
│  ┌──────────────────────┐                                          │
│  │  ← Back      FLYP     │  Header with logo                       │
│  └──────────────────────┘                                          │
│                                                                     │
│           What kind of business do you have?                        │
│                                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │🍽️      │  │📸      │  │💇‍♀️     │  │👨‍🍳     │              │
│  │Catering │  │Photo-   │  │Hair-    │  │Chef     │              │
│  │         │  │graphy   │  │styling  │  │Services │              │
│  │[Popular]│  │[Popular]│  │[Popular]│  │[Popular]│              │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘              │
│                                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │🍱      │  │💄      │  │💆‍♀️     │  │💅      │              │
│  │Meal     │  │Make-up  │  │Massage  │  │Nail     │              │
│  │Services │  │         │  │         │  │Care     │              │
│  │[Popular]│  │[Popular]│  │[Popular]│  │[Popular]│              │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘              │
│                                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │💪      │  │🧘‍♀️     │  │🧹      │  │💼      │              │
│  │Personal │  │Wellness │  │Cleaning │  │Business │              │
│  │Training │  │         │  │Services │  │Consult  │              │
│  │[Popular]│  │[Popular]│  │         │  │         │              │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ User selects "Catering"
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 2: Confirmation                             │
│                    /my-business/listings/prelude                    │
│                                                                     │
│  ┌──────────────────────┐                                          │
│  │  ← Back      FLYP     │  Header with logo                       │
│  └──────────────────────┘                                          │
│                                                                     │
│           ┌───────────────────────────────────┐                    │
│           │         🍽️                        │                    │
│           │                                   │                    │
│           │        Catering                   │                    │
│           │                                   │                    │
│           │ Event catering, corporate meals,  │                    │
│           │ party services                    │                    │
│           └───────────────────────────────────┘                    │
│                                                                     │
│                Create your listing                                  │
│                                                                     │
│           Tell us about yourself and the service                    │
│           you offer. We'll check if your listing                    │
│           meets our requirements.                                   │
│                                                                     │
│  ─────────────────────────────────────────────────────────────     │
│                                                                     │
│                    ┌────────────────┐                              │
│                    │  Get Started   │  ← User clicks               │
│                    └────────────────┘                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Navigate to listing service
                                  │ with businessType=catering
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│             STEP 3-10: Listing Service Wizard (8 Steps)             │
│            /my-business/listings/create?type=catering               │
│                                                                     │
│  ┌──────────┬────────────────────────────────────────────────────┐ │
│  │          │  ← Back             FLYP                           │ │
│  │  FLYP    ├────────────────────────────────────────────────────┤ │
│  │          │                                                    │ │
│  │  ●  🏢   │  🏢  Welcome                                       │ │
│  │     Welcome                                                  │ │
│  │          │  Let's get started with your business listing     │ │
│  │  ✓  📝   ├────────────────────────────────────────────────────┤ │
│  │     Basic│                                                    │ │
│  │          │                                                    │ │
│  │  ✓  💰   │  [Step Content Goes Here]                         │ │
│  │     Finan│                                                    │ │
│  │          │  • Forms                                           │ │
│  │     ✨   │  • Fields                                          │ │
│  │     Story│  • Inputs                                          │ │
│  │          │  • Validation                                      │ │
│  │     🤝   │                                                    │ │
│  │     Sale │                                                    │ │
│  │          │                                                    │ │
│  │     📸   │                                                    │ │
│  │     Photo│                                                    │ │
│  │          │                                                    │ │
│  │     🔒   ├────────────────────────────────────────────────────┤ │
│  │     Priv │  ← Back        Step 1 of 8        Continue →     │ │
│  │          └────────────────────────────────────────────────────┘ │
│  │     🚀   │                                                      │
│  │     Revie│                                                      │
│  │          │                                                      │
│  └──────────┘                                                      │
│    Sidebar                Main Content Area                        │
│    160px                                                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ User completes all 8 steps
                                  │ and clicks "Publish"
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         SUCCESS: Back to Listings                   │
│                    /my-business/listings                            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │  ✅ Business listing created successfully!                  │  │
│  │                                                             │  │
│  │  Your Listings                                              │  │
│  │  ───────────────────────────────────────────                │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────────┐ │  │
│  │  │ 🍽️ My Catering Business                    Draft     │ │  │
│  │  │ ─────────────────────────────────────────────────────│ │  │
│  │  │ Catering service in Brussels                         │ │  │
│  │  │ Created: Today                                        │ │  │
│  │  └───────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Sidebar Navigation - Detailed View

```
┌────────────────────────────────────────┐
│                                        │
│             FLYP Logo                  │  ← Airbnb-style logo
│                                        │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ ●  🏢  Welcome                   │ │  ← CURRENT STEP
│  │        Let's get started         │ │     • Black border
│  └──────────────────────────────────┘ │     • Gray background
│                                        │     • Black dot indicator
│  ┌──────────────────────────────────┐ │
│  │    📝  Basic Info              ✓ │ │  ← UNLOCKED (completed)
│  │        Tell us about...          │ │     • Gray border
│  └──────────────────────────────────┘ │     • Green checkmark
│                                        │     • Clickable
│  ┌──────────────────────────────────┐ │
│  │    💰  Financials              ✓ │ │  ← UNLOCKED (completed)
│  │        Share your business...    │ │     • Gray border
│  └──────────────────────────────────┘ │     • Green checkmark
│                                        │     • Clickable
│  ┌──────────────────────────────────┐ │
│  │    ✨  Business Story            │ │  ← LOCKED (future)
│  │        What makes your...        │ │     • Gray border
│  └──────────────────────────────────┘ │     • 50% opacity
│                                        │     • Not clickable
│  ┌──────────────────────────────────┐ │
│  │    🤝  Sale Details              │ │  ← LOCKED
│  │        How would you like...     │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │    📸  Photos & Docs             │ │  ← LOCKED
│  │        Add visual appeal...      │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │    🔒  Privacy                   │ │  ← LOCKED
│  │        Control your listing...   │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │    🚀  Review                    │ │  ← LOCKED
│  │        Review and publish...     │ │
│  └──────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
         160px width
```

## Layout Breakdown - Listing Service

```
┌────────────────────────────────────────────────────────────────────┐
│                        Fullscreen Modal                            │
│                                                                    │
│  ┌────────────┬──────────────────────────────────────────────┐   │
│  │            │  ┌───────────────────────────────────────┐   │   │
│  │            │  │  Header Area (flex-shrink-0)          │   │   │
│  │            │  │  ─────────────────────────────────── │   │   │
│  │  Sidebar   │  │  🏢 Step Title                        │   │   │
│  │            │  │  Step description text                │   │   │
│  │  (Fixed)   │  └───────────────────────────────────────┘   │   │
│  │  160px     │                                              │   │
│  │            │  ┌───────────────────────────────────────┐   │   │
│  │  Scroll    │  │  Main Content (flex-1, overflow-y)    │   │   │
│  │  able      │  │                                       │   │   │
│  │            │  │  • Forms                              │   │   │
│  │            │  │  • Input fields                       │   │   │
│  │            │  │  • Validation messages                │   │   │
│  │            │  │  • Help text                          │   │   │
│  │            │  │  • ...more content...                 │   │   │
│  │            │  │  • ...                                │   │   │
│  │            │  │                                       │   │   │
│  │            │  │  [Scrollable if content overflows]    │   │   │
│  │            │  │                                       │   │   │
│  │            │  └───────────────────────────────────────┘   │   │
│  │            │                                              │   │
│  │            │  ┌───────────────────────────────────────┐   │   │
│  │            │  │  Footer Area (flex-shrink-0)          │   │   │
│  │            │  │  ─────────────────────────────────── │   │   │
│  │            │  │  ← Back    Step X of 8    Continue → │   │   │
│  │            │  └───────────────────────────────────────┘   │   │
│  └────────────┴──────────────────────────────────────────────┘   │
│       │                         │                                │
│    Sidebar                  Main Content                         │
│    - Logo                   - Header (step info)                 │
│    - Steps                  - Content (scrollable)               │
│    - Status                 - Footer (navigation)                │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## Responsive Behavior (Future Enhancement)

### Desktop (> 1024px)

```
┌────────────┬──────────────────────────┐
│            │                          │
│  Sidebar   │  Main Content            │
│  160px     │  Remaining space         │
│            │                          │
└────────────┴──────────────────────────┘
```

### Tablet (768px - 1024px)

```
┌──────┬────────────────────────────────┐
│      │                                │
│ Side │  Main Content                  │
│ 120px│  Remaining space               │
│      │                                │
└──────┴────────────────────────────────┘
```

### Mobile (< 768px)

```
┌─────────────────────────────────────┐
│  [≡] Step 1 of 8                    │ ← Collapsed sidebar
├─────────────────────────────────────┤
│                                     │
│  Main Content                       │
│  Full width                         │
│                                     │
└─────────────────────────────────────┘

Tap [≡] to expand sidebar:
┌─────────────────────────────────────┐
│  Steps Menu                    [✕]  │
│  ───────────────────────────────    │
│  ✓  🏢 Welcome                      │
│  ●  📝 Basic Info                   │
│     💰 Financials                   │
│     ...                             │
└─────────────────────────────────────┘
```

## Color System

### Sidebar

- **Background:** White (`#FFFFFF`)
- **Border:** Gray-200 (`#E5E7EB`)
- **Text (current):** Gray-900 (`#111827`)
- **Text (unlocked):** Gray-700 (`#374151`)
- **Text (locked):** Gray-400 (`#9CA3AF`)

### Step States

- **Current border:** Gray-900 (`#111827`)
- **Current background:** Gray-50 (`#F9FAFB`)
- **Current ring:** Gray-100 (`#F3F4F6`)
- **Unlocked border:** Gray-200 (`#E5E7EB`)
- **Unlocked hover:** Gray-300 (`#D1D5DB`)
- **Locked:** 50% opacity

### Indicators

- **Current dot:** Gray-900 (`#111827`)
- **Completed checkmark:** Green-600 (`#059669`)

## Spacing System

### Sidebar

- **Padding:** `28px 40px` (top/bottom, left/right)
- **Gap between steps:** `12px`
- **Logo margin bottom:** `32px`

### Main Content

- **Header padding:** `24px 32px`
- **Content padding:** `24px 32px`
- **Footer padding:** `24px 32px`
- **Header border:** `1px` bottom
- **Footer border:** `1px` top

## Typography

### Sidebar

- **Step title:** `font-semibold`, current = `text-gray-900`, unlocked = `text-gray-700`
- **Step description:** `text-xs`, `text-gray-600` or `text-gray-400`

### Main Content

- **Header title:** `text-2xl`, `font-semibold`, `text-gray-900`
- **Header description:** `text-sm`, `text-gray-600`

## Status Summary

| Component              | Status      | Notes                           |
| ---------------------- | ----------- | ------------------------------- |
| **Sidebar Navigation** | ✅ Complete | Airbnb-style vertical nav       |
| **Layout Structure**   | ✅ Complete | Flexbox with fixed sidebar      |
| **Visual States**      | ✅ Complete | Current, unlocked, locked       |
| **Click Navigation**   | ✅ Complete | Navigate to unlocked steps      |
| **Step Indicators**    | ✅ Complete | Dot for current, check for done |
| **Responsive Design**  | ⚠️ Future   | Desktop only (ready for mobile) |
| **Accessibility**      | ✅ Good     | ARIA labels, keyboard support   |
| **Build Status**       | ✅ Passing  | No errors, ready to use         |

## Next Actions

Now that the structure is complete, you can:

1. **Define Step Content** - Tell me what each step (2-8) should contain
2. **Add Validation** - Define what makes each step "complete"
3. **Implement Forms** - Build out the actual forms for each step
4. **Add API Integration** - Connect to backend for saving
5. **Mobile Responsive** - Add collapse/expand for sidebar on mobile

The foundation is ready! 🎉
