# 🎭 Modals - Organized Architecture

**Scalable, maintainable modal system with clear separation of concerns.**

## 📁 **Folder Structure**

```
modals/
├── README.md                           # This documentation
├── index.ts                           # Main exports
├── SellerOnboardingModal.tsx          # Legacy bridge (deprecated)
├── business-listing-modal-container.tsx
├── InquiryModal.tsx
├── NDAModal.tsx
├── onboarding/                        # Onboarding modals
│   ├── index.ts                       # Onboarding exports
│   ├── seller/                        # Seller onboarding
│   │   ├── index.ts                   # Seller exports
│   │   ├── README.md                  # Seller documentation
│   │   ├── SellerOnboardingModal.tsx  # Main modal
│   │   ├── types.ts                   # TypeScript types
│   │   ├── utils.ts                   # Utility functions
│   │   └── steps/                     # Individual steps
│   │       ├── WelcomeStep.tsx
│   │       ├── BusinessTypeStep.tsx
│   │       ├── BusinessNameStep.tsx
│   │       ├── LocationStep.tsx
│   │       ├── FoundedYearStep.tsx
│   │       ├── BusinessDescriptionStep.tsx
│   │       ├── EmployeeCountStep.tsx
│   │       ├── RevenueRangeStep.tsx
│   │       ├── SellingReasonStep.tsx
│   │       ├── ContactEmailStep.tsx
│   │       ├── ContactPhoneStep.tsx
│   │       └── SuccessStep.tsx
│   └── buyer/                         # Buyer onboarding (future)
│       └── index.ts                   # Buyer exports (placeholder)
└── images/                            # Image-related modals
    ├── index.ts                       # Image exports
    └── ImageGalleryModal.tsx
```

## 🎯 **Design Principles**

### **Organized by Function**

- **`onboarding/`**: All onboarding-related modals
- **`images/`**: Image gallery and media modals
- **Root level**: General business modals

### **Scalable Architecture**

- **Clear separation**: Each category has its own folder
- **Consistent structure**: Same pattern across all categories
- **Easy extension**: New categories can be added easily

### **Backward Compatibility**

- **Legacy support**: Old imports still work
- **Gradual migration**: Teams can migrate at their own pace
- **Deprecation path**: Clear migration strategy

## 🚀 **Usage Patterns**

### **Legacy (Still Works)**

```typescript
import { SellerOnboardingModal } from '@/shared/components/modals';
```

### **New Organized Structure**

```typescript
// Seller onboarding
import { SellerOnboardingModal } from '@/shared/components/modals/onboarding/seller';

// All onboarding modals
import { SellerOnboardingModal } from '@/shared/components/modals/onboarding';

// Image modals
import { ImageGalleryModal } from '@/shared/components/modals/images';

// Main modals index
import { SellerOnboardingModal, ImageGalleryModal, InquiryModal } from '@/shared/components/modals';
```

### **Individual Components**

```typescript
// Individual step components
import {
  WelcomeStep,
  BusinessTypeStep,
  BusinessNameStep,
} from '@/shared/components/modals/onboarding/seller';

// Utilities
import {
  isStepValid,
  saveDraft,
  formatCurrency,
} from '@/shared/components/modals/onboarding/seller';
```

## 📋 **Category Overview**

### **🏢 Onboarding Modals**

- **Purpose**: User onboarding flows
- **Subcategories**: `seller/`, `buyer/`
- **Features**: Multi-step forms, validation, progress tracking

### **🖼️ Image Modals**

- **Purpose**: Image and media display
- **Components**: Gallery, viewer, uploader
- **Features**: Lightbox, zoom, navigation

### **💼 Business Modals**

- **Purpose**: General business operations
- **Components**: Inquiry, NDA, listing management
- **Features**: Forms, confirmations, data display

## 🔧 **Adding New Modals**

### **New Onboarding Modal**

1. Create folder: `onboarding/[category]/`
2. Add components and index
3. Update `onboarding/index.ts`
4. Update main `index.ts`

### **New Image Modal**

1. Add component to `images/`
2. Update `images/index.ts`
3. Update main `index.ts`

### **New Business Modal**

1. Add component to root level
2. Update main `index.ts`

## 📊 **Migration Strategy**

### **Phase 1: Current (Now)**

- ✅ **New structure implemented**
- ✅ **Legacy support maintained**
- ✅ **All imports work**

### **Phase 2: Gradual Migration**

- 🔄 **Update new code** to use organized structure
- 🔄 **Document new patterns**
- 🔄 **Train teams** on new structure

### **Phase 3: Legacy Deprecation**

- ⚠️ **Add deprecation warnings**
- ⚠️ **Set removal timeline**
- ⚠️ **Communicate to teams**

### **Phase 4: Cleanup**

- 🗑️ **Remove legacy files**
- 🗑️ **Update all imports**
- 🗑️ **Clean up references**

## 🎨 **Benefits**

### **Developer Experience**

- **Clear organization**: Easy to find components
- **Consistent patterns**: Same structure everywhere
- **Better imports**: Organized import paths
- **Easier maintenance**: Logical file grouping

### **Scalability**

- **Easy extension**: Add new categories easily
- **Modular design**: Independent components
- **Clear boundaries**: Well-defined responsibilities
- **Future-proof**: Ready for growth

### **Maintainability**

- **Reduced complexity**: Smaller, focused files
- **Better testing**: Isolated components
- **Easier debugging**: Clear component hierarchy
- **Simplified reviews**: Focused changes

## 🔮 **Future Enhancements**

### **Planned Categories**

- **`auth/`**: Authentication modals
- **`payment/`**: Payment and billing modals
- **`notifications/`**: Alert and notification modals
- **`settings/`**: Configuration and settings modals

### **Advanced Features**

- **Lazy loading**: Dynamic imports for better performance
- **Modal management**: Centralized modal state
- **Animation system**: Consistent transitions
- **Accessibility**: Enhanced a11y support

---

**Built with ❤️ by the flyp engineering team**
