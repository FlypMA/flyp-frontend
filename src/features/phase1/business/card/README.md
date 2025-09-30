# 🏢 Business Card Feature

**Location**: `/src/features/phase1/business/card`  
**Purpose**: Business card creation - primary onboarding flow for business owners  
**Status**: ✅ Implemented (Phase 1)

---

## 📋 Overview

The Business Card feature is the **primary onboarding flow** for business owners on the platform. It collects essential business information in a friendly, Airbnb-inspired 3-step process that creates a reusable business profile card.

### **Key Objectives**

1. **Reduce Friction**: Simple 3-step process (vs. 14 steps in old listing flow)
2. **Data Reusability**: Business card data is reused across valuation and listing features
3. **Beautiful UX**: Airbnb-inspired design with smooth transitions and helpful guidance
4. **No Pressure**: Business card creation is separate from listing/selling decisions

---

## 🎨 User Flow

```
Step 1: Business Type Selection
└─> User selects from 12 business types (Photography, Catering, etc.)
    └─> Large icon cards in 4-column grid
    └─> Airbnb-inspired card selection UI

Step 2: Years in Business
└─> Airbnb-style centered counter (+/- buttons)
    └─> Large number display
    └─> Contextual feedback (0 years vs. 10+ years)
    └─> Auto-calculates founded year

Step 3: Business Information
└─> Comprehensive form with smart validation
    ├─> Business Name *
    ├─> Location * (or Remote checkbox)
    ├─> Industry *
    ├─> Description *
    ├─> Team Size
    ├─> Website (optional)
    └─> Key Highlights (up to 5)

Complete → Business Card Created ✅
```

---

## 🏗️ Architecture

### **Component Structure**

```
/card
├── components/
│   ├── BusinessTypeSelection.tsx    # Step 1 (from listing/prelude)
│   ├── YearsInBusiness.tsx         # Step 2 (from listing-service/WelcomeStep)
│   ├── BusinessBasicInfo.tsx       # Step 3 (from BasicInfoStep + BusinessProfileModal)
│   ├── BusinessCardFlow.tsx        # Main orchestrator
│   └── index.ts
├── types/
│   ├── BusinessCardTypes.ts        # Type definitions
│   └── index.ts
├── index.ts
└── README.md
```

### **Data Model**

```typescript
export interface BusinessCard {
  // Step 1: Business Type
  type: BusinessType;

  // Step 2: Years in Business
  yearsInBusiness: number;
  foundedYear: number;

  // Step 3: Basic Information
  name: string;
  location: string;
  isRemote: boolean;
  industry: string;
  description: string;
  teamSize: string;
  website?: string;
  keyHighlights: string[];

  // Metadata
  status: 'draft' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔗 Integration Points

### **1. Business Valuation**

Business card data flows into valuation:

```typescript
const valuationData = {
  businessName: businessCard.name,
  industry: businessCard.industry,
  foundedYear: businessCard.foundedYear,
  // + user adds financial data
};
```

### **2. Listing Creation**

Business card prefills listing basic info:

```typescript
const listingData = {
  businessType: businessCard.type,
  basicInfo: {
    name: businessCard.name,
    location: businessCard.location,
    industry: businessCard.industry,
    // ... all other fields
  },
  // User only fills Steps 4-8
};
```

### **3. Dashboard**

Business card displays as profile card:

```tsx
<BusinessProfileCard businessInfo={businessCard} />
```

---

## 🎯 Design Principles

### **1. Airbnb-Inspired UI** ✨

- **Full-page layouts**: Spacious, centered content
- **Large typography**: text-4xl titles for clarity
- **Icon-first selection**: Visual business type cards
- **Smooth transitions**: 200ms duration for all interactions
- **Helpful guidance**: Contextual help sections

### **2. Progressive Disclosure** 📚

- **One question at a time**: Focused user experience
- **Smart defaults**: Pre-filled where possible
- **Optional fields clearly marked**: Reduce cognitive load
- **Contextual help**: Just-in-time information

### **3. Data Validation** ✅

- **Required fields**: Marked with asterisk (\*)
- **Real-time validation**: Immediate feedback
- **Continue button disabled**: Until step is valid
- **Clear error messages**: Helpful, not punitive

### **4. Accessibility** ♿

- **Keyboard navigation**: Tab through all fields
- **Screen reader support**: Proper ARIA labels
- **Focus states**: Clear visual indicators
- **Semantic HTML**: Proper heading hierarchy

---

## 📦 Components Detail

### **BusinessTypeSelection**

**Source**: Adapted from `/listing/prelude/BusinessTypeSelectionPage.tsx`

**Features**:

- 12 business type options
- 4-column grid layout (responsive)
- Icon + title + description cards
- Selected state with blue accent
- Checkmark indicator
- Help section with info icon
- Continue button appears when selected

**Props**:

```typescript
interface BusinessCardStepProps {
  data: BusinessCardFormData;
  onDataChange: (data: Partial<BusinessCardFormData>) => void;
  onNext?: () => void;
  onBack?: () => void;
}
```

---

### **YearsInBusiness**

**Source**: Adapted from `/listing-service/steps/WelcomeStep.tsx`

**Features**:

- Centered layout with large typography
- Plus/minus buttons (circular, bordered)
- Large number display (text-6xl)
- "years" label below number
- Contextual feedback:
  - 0 years: Blue info box ("Just starting out?")
  - 10+ years: Green success box ("Established business!")
- Auto-calculates founded year
- Help text explaining purpose

**UI Pattern**: Airbnb room/guest selector style

---

### **BusinessBasicInfo**

**Source**: Combined from `BasicInfoStep.tsx` + `BusinessProfileModal.tsx`

**Fields**:

1. **Business Name** \* (text input)
2. **Location** \* (text input, disabled if remote)
3. **Remote checkbox** (disables location)
4. **Industry** \* (select dropdown, 13 options)
5. **Description** \* (textarea, 4 rows)
6. **Team Size** (select dropdown, 6 options)
7. **Website** (URL input, optional)
8. **Key Highlights** (up to 5, add/remove UI)

**Features**:

- Smart form layout (2-column grid for some fields)
- Character limits with counters (future)
- Add/remove key highlights
- Help section explaining purpose
- Blue info box with context

---

### **BusinessCardFlow**

**Main orchestrator component**

**Features**:

- FullscreenModal wrapper (from prelude pattern)
- 3-step flow management
- State management for form data
- Navigation controls (Back/Continue/Complete)
- Progress indicator (Step X of 3)
- Validation per step
- Complete button on final step

**Footer Design**:

- Left: Back button (if not step 1)
- Right: Continue/Complete button (black, Airbnb style)
- Button disabled until step valid

---

## 🚀 Usage Example

```tsx
import { BusinessCardFlow } from '@/features/phase1/business/card';

const MyBusinessPage = () => {
  const [isCardFlowOpen, setIsCardFlowOpen] = useState(false);

  const handleCardComplete = (card: BusinessCard) => {
    console.log('Business card created:', card);
    // Save to backend
    // Navigate to next step (profile card creation)
  };

  return (
    <>
      <button onClick={() => setIsCardFlowOpen(true)}>Create Business Card</button>

      <BusinessCardFlow
        isOpen={isCardFlowOpen}
        onClose={() => setIsCardFlowOpen(false)}
        onComplete={handleCardComplete}
        initialData={{}}
      />
    </>
  );
};
```

---

## 📊 Success Metrics

**Target Metrics**:

- **Completion Rate**: 90% (3 simple steps)
- **Time to Complete**: <5 minutes
- **Data Quality**: 95% (required fields + helpful guidance)
- **User Satisfaction**: 4.5/5 rating

**Current Performance** (Post-Launch):

- TBD after implementation

---

## 🔄 Data Flow

```
User Sign-up
    ↓
Dashboard (Empty State)
    ↓
"Create Business Card" CTA
    ↓
BusinessCardFlow Opens
    ↓
Step 1: Select Business Type
    ↓
Step 2: Enter Years in Business
    ↓
Step 3: Fill Business Information
    ↓
Complete Button
    ↓
BusinessCard Created ✅
    ↓
Save to Backend (API call)
    ↓
Dashboard Shows Business Profile Card
    ↓
Next CTA: "Create Profile Card"
```

---

## 🛠️ Technical Details

### **Dependencies**

- `@/shared/components/modals/foundations/FullscreenModal` - Modal wrapper
- React hooks (useState, useEffect)
- TypeScript for type safety

### **State Management**

Local state in `BusinessCardFlow` component:

- `currentStep` (1-3)
- `formData` (BusinessCardFormData)

### **Validation**

Per-step validation in `canProceed()`:

```typescript
case 1: return !!formData.type;
case 2: return !!formData.yearsInBusiness || formData.yearsInBusiness === 0;
case 3: return !!(formData.name && formData.industry && formData.description && (formData.location || formData.isRemote));
```

### **Performance**

- **Component Load**: Instant (no heavy dependencies)
- **Step Transitions**: Smooth (React state updates)
- **Form Updates**: Debounced (future enhancement)
- **Bundle Size**: ~15KB (compressed)

---

## 🎓 Best Practices

### **DO** ✅

- Keep form simple and focused
- Provide helpful context and examples
- Use large, clear typography
- Validate in real-time
- Save progress automatically (future)
- Allow editing after completion

### **DON'T** ❌

- Add unnecessary required fields
- Use jargon or complex terms
- Skip validation feedback
- Make UI cluttered
- Pressure users to complete
- Hide important information

---

## 🔮 Future Enhancements

### **Phase 2** (Post-Launch)

1. **Auto-save to localStorage**
   - Save draft every 30 seconds
   - Restore on return
   - "Saved" indicator

2. **LinkedIn Integration**
   - Import business info from LinkedIn
   - One-click populate

3. **Image Upload**
   - Business logo
   - Profile image
   - Cover photo

4. **Advanced Validation**
   - URL validation for website
   - Location autocomplete (Google Places)
   - Industry suggestions based on business type

5. **Analytics**
   - Track completion rates per step
   - Identify drop-off points
   - A/B test variations

6. **Internationalization**
   - Multi-language support
   - Currency/date formatting
   - Localized business types

---

## 📞 Support & Questions

For questions about this feature:

1. Check `/docs/architecture/BUSINESS_OWNER_JOURNEY_RESTRUCTURE.md`
2. Review component source code
3. Contact development team

---

**Last Updated**: September 30, 2025  
**Version**: 1.0.0  
**Status**: ✅ Ready for Testing
