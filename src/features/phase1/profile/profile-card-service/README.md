# 👤 Profile Card Service

**Location**: `src/features/phase1/profile/profile-card-service/`  
**Purpose**: Comprehensive profile card creation for business owners  
**Status**: ✅ Production Ready

---

## 📋 Overview

The Profile Card Service enables business owners to create a comprehensive professional profile in just 3 steps. This profile builds trust and credibility with potential buyers.

**Flow**: Personal Info → Professional Info → Review  
**Time**: ~5-7 minutes  
**Data**: Name, location, bio, work history, education, business metrics

---

## 📁 Structure

```
profile-card-service/
├── components/
│   └── ProfileCardServiceModal.tsx  # Main modal orchestrator
├── steps/
│   ├── PersonalInfoStep.tsx         # Step 1: Name, location, avatar
│   ├── ProfessionalInfoStep.tsx     # Step 2: Bio, work, education
│   └── ReviewProfileCardStep.tsx    # Step 3: Review all data
├── types/
│   └── ProfileCardTypes.ts          # Type definitions
├── index.ts                          # Feature exports
└── README.md                         # This file
```

---

## 🎯 User Flow

```
1. Dashboard → "Create Profile" CTA
   ↓
2. Navigate to /my-business/profile/create
   ↓
3. STEP 1: Personal Information
   - Profile avatar upload (drag & drop, base64)
   - Full name *
   - Location (city, country) *
   - Timezone (dropdown)
   - LinkedIn import button (placeholder)
   - Contextual help text
   ↓
4. STEP 2: Professional Information

   A. About Me:
   - Bio * (textarea, 5 rows)

   B. Work & Education:
   - Job title
   - Company
   - Industry
   - Education (textarea)
   - Key achievements (textarea)

   C. Business Metrics:
   - Owned businesses * (number)
   - Exits (number)
   - Business portfolio notes (textarea)
   ↓
5. STEP 3: Review
   - Beautiful card preview
   - All sections displayed with icons
   - Comprehensive review layout
   ↓
6. Click "Complete"
   ↓
7. Save to localStorage
   ↓
8. Return to /my-business
   ↓
9. ✅ Profile card displayed!
```

---

## 📊 Data Structure

```typescript
interface ProfileCard {
  // Personal Information
  fullName: string;
  location: string;
  timezone?: string;
  profileImage?: string; // Base64 or URL

  // About Me
  bio: string;

  // Work & Education
  jobTitle?: string;
  company?: string;
  industry?: string;
  education?: string;
  keyAchievements?: string;

  // Business Metrics
  ownedBusinesses: number;
  exits: number;
  businessNotes?: string;

  // Platform Metadata
  yearsOnPlatform: number;
  status: 'draft' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 UI Features

### **Step 1: Personal Information**

- **Avatar Upload**:
  - Click to upload
  - Drag & drop support
  - Camera overlay on hover
  - Base64 encoding for localStorage
  - 5MB file size limit
  - Image preview

- **LinkedIn Import**:
  - Blue banner with CTA
  - OAuth placeholder (future)
  - Auto-populate fields

- **Form Fields**:
  - CustomInputField components
  - Floating labels
  - Validation feedback
  - Timezone dropdown with common zones

### **Step 2: Professional Information**

- **Sectioned Layout**:
  - About Me (bio)
  - Work & Education (5 fields)
  - Business Metrics (3 fields)

- **Form Components**:
  - CustomTextarea (auto-resize)
  - CustomInputField
  - CustomNumberInputField
  - Placeholder text
  - Character limits

### **Step 3: Review**

- **Beautiful Preview**:
  - Large avatar (128px)
  - Sectioned display
  - Icons for each section
  - Read-only formatted text
  - Business metrics in grid
  - Success message

---

## 🔌 Usage

```tsx
import { ProfileCardServiceModal } from '@/features/phase1/profile/profile-card-service';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleComplete = (profile: ProfileCard) => {
    localStorage.setItem('profileCard', JSON.stringify(profile));
    localStorage.setItem('hasProfileCard', 'true');
    navigate('/my-business');
  };

  return (
    <ProfileCardServiceModal
      isOpen={isOpen}
      onClose={() => navigate('/my-business')}
      onComplete={handleComplete}
    />
  );
};
```

---

## 🔗 Integration

### Routes

- **Creation**: `/my-business/profile/create`
- **URL Generator**: `UrlGenerator.createProfileCard()`

### Storage

- **Key**: `profileCard` (localStorage)
- **Flag**: `hasProfileCard` (localStorage)

### Display

- **Component**: `<ProfileCard />` (shared/components/business)
- **Pages**:
  - `/my-business` (dashboard)
  - `/users/profile` (profile page)

---

## ✅ Features

- ✅ **Comprehensive Data Collection**: 15+ fields
- ✅ **Avatar Upload**: File picker, validation, base64 encoding
- ✅ **LinkedIn Import**: Placeholder for OAuth integration
- ✅ **Step Validation**: Required fields per step
- ✅ **Beautiful Review**: Professional card preview
- ✅ **Consistent Layout**: 160px sidebar, rounded content
- ✅ **Mobile Responsive**: Works on all screen sizes
- ✅ **Edit Support**: Can edit existing profiles

---

## 📝 Recent Changes

### 2025-09-30

- ✅ Updated UI layout to match business card flow
- ✅ Removed duplicate step footers
- ✅ Centralized validation in modal
- ✅ Fixed sidebar vertical centering
- ✅ Consistent 160px sidebar width
- ✅ Added comprehensive data fields
- ✅ LinkedIn import placeholder
- ✅ Avatar upload with validation

---

## 🔄 Progressive Onboarding

This is **Step 2** of the business owner journey:

```
Business Card → Profile Card → Valuation → Listing
    (Done!)      (Current)      (Next)      (Final)
```

After completing the profile card, users can:

1. **Get Valuation**: Business worth estimation
2. **Create Listing**: Full listing with all data prefilled

---

## 👨‍💻 Development

### Key Files

- `ProfileCardServiceModal.tsx`: Main orchestrator with 3-step flow
- `PersonalInfoStep.tsx`: Avatar + personal details
- `ProfessionalInfoStep.tsx`: Bio + work + education + metrics
- `ReviewProfileCardStep.tsx`: Beautiful preview

### Testing

```bash
# Type check
yarn type-check

# Build
yarn build

# Test the flow
http://localhost:3000/my-business/profile/create
```

---

**Status**: ✅ Production Ready | **Last Updated**: September 30, 2025
