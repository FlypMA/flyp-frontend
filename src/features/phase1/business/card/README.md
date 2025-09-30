# 🏢 Business Card Feature

**Location**: `src/features/phase1/business/card/`  
**Purpose**: Progressive onboarding - First step of business owner journey  
**Status**: ✅ Production Ready

---

## 📋 Overview

The Business Card feature is the **first step** in the progressive onboarding flow for business owners. It captures essential business information in a streamlined 2-part flow:

1. **Prelude** (2 steps): Business type selection and confirmation
2. **Card Service** (3 steps): Years in business, business information, and review

**Total**: 5 steps completed in ~3-5 minutes

---

## 📁 Feature Structure

```
card/
├── BusinessCardFlow.tsx          # Main orchestrator
├── prelude/                       # Business type selection
│   ├── components/
│   │   ├── BusinessTypeSelectionPage.tsx
│   │   └── BusinessConfirmationPage.tsx
│   └── types/
│       └── PreludeTypes.ts
├── card-service/                  # Main 3-step form
│   ├── components/
│   │   └── CardServiceModal.tsx
│   ├── steps/
│   │   ├── YearsSinceFoundedStep.tsx
│   │   ├── BusinessInformationStep.tsx
│   │   └── ReviewCardStep.tsx
│   └── types/
│       └── CardServiceTypes.ts
├── index.ts                       # Feature exports
└── README.md                      # This file
```

---

## 🎯 User Flow

```
1. Dashboard (/my-business)
   ↓
2. Click "Create Business Card"
   ↓
3. Navigate to /my-business/card/create
   ↓
4. PRELUDE STEP 1: Select Business Type
   - Photography, Catering, E-commerce, etc.
   - 12 common business types
   - Large visual cards with icons
   ↓
5. PRELUDE STEP 2: Confirmation
   - Two-panel layout
   - Selected business type displayed
   - "Get Started" CTA
   ↓
6. CARD SERVICE STEP 1: Years Since Founded
   - Large centered counter
   - Simple, focused UI
   ↓
7. CARD SERVICE STEP 2: Business Information
   - Business name *
   - Location (city, country) *
   - Remote checkbox
   - Description *
   - Team size *
   ↓
8. CARD SERVICE STEP 3: Review Card
   - Read-only preview
   - All data displayed
   ↓
9. Click "Complete"
   ↓
10. Save to localStorage
    ↓
11. Return to dashboard
    ↓
12. ✅ Business card displayed!
```

---

## 🔌 Usage

```tsx
import { BusinessCardFlow } from '@/features/phase1/business/card';

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (card: BusinessCard) => {
    console.log('Card created:', card);
    localStorage.setItem('businessCard', JSON.stringify(card));
  };

  return (
    <BusinessCardFlow
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onComplete={handleComplete}
      isEditing={false}
    />
  );
};
```

---

## 📊 Data Structure

```typescript
interface BusinessCard {
  type: BusinessType; // From prelude
  yearsFounded: number; // Step 1
  name: string; // Step 2
  location: string;
  isRemote: boolean;
  description: string;
  teamSize: string; // '1-10', '11-50', etc.
  status: 'draft' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 UI/UX Highlights

- **Consistent layout**: Same as profile card and listing flows
- **160px sidebar**: Vertical navigation with icons
- **Rounded content**: White rounded-2xl container
- **Black sidebar**: With progress indicators
- **Modal footer**: Back + Continue/Complete buttons
- **Validation**: Real-time per-step validation
- **Editing support**: Can edit existing business cards

---

## 🔗 Integration

### Routes

- **Creation**: `/my-business/card/create`
- **URL Generator**: `UrlGenerator.createBusinessCard()`

### Storage

- **Key**: `businessCard` (localStorage)
- **Flag**: `hasBusinessCard` (localStorage)

### Navigation

- **Entry**: Dashboard empty state
- **Exit**: Returns to `/my-business`
- **Next Step**: Profile card creation

---

## ✅ Success Criteria

- ✅ Build with no errors/warnings
- ✅ TypeScript strict mode compliant
- ✅ Mobile responsive
- ✅ Consistent with other flows
- ✅ Data persists in localStorage
- ✅ Clean modular architecture

---

## 📝 Recent Changes

### 2025-09-30

- ✅ Removed duplicate `BusinessCardFlow` from `components/`
- ✅ Removed unused `hooks/`, `utils/`, `types/` directories
- ✅ Consolidated types into `card-service/types/`
- ✅ Updated UI layout to match profile & listing flows
- ✅ Added edit functionality
- ✅ Clean modular structure

---

## 🔄 Progressive Onboarding

This is **Step 1** of the business owner journey:

```
Business Card → Profile Card → Valuation → Listing
    (3 min)      (5 min)        (10 min)   (15 min)
```

After completing the business card, users are prompted to:

1. **Complete Profile**: Personal/professional info
2. **Get Valuation**: Business worth estimation
3. **Create Listing**: Full listing with prefilled data

---

## 👨‍💻 Development

### Key Files

- `BusinessCardFlow.tsx`: Main orchestrator
- `CardServiceModal.tsx`: 3-step form modal
- `BusinessTypeSelectionPage.tsx`: Prelude step 1
- `BusinessConfirmationPage.tsx`: Prelude step 2

### Testing

```bash
# Run type check
yarn type-check

# Build
yarn build

# Test the flow
http://localhost:3000/my-business/card/create
```

---

**Status**: ✅ Production Ready | **Last Updated**: September 30, 2025
