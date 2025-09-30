# 🏢 Listing Creation Feature

This feature handles the complete business listing creation flow, split into two distinct parts:

## Structure

```
listing/
├── prelude/                    # Business Type Selection (2 steps)
│   ├── components/
│   │   ├── PreludeFlow.tsx            # Main modal container
│   │   ├── BusinessTypeSelectionPage.tsx
│   │   ├── BusinessConfirmationPage.tsx
│   │   └── index.ts
│   ├── types/
│   │   ├── PreludeTypes.ts
│   │   └── index.ts
│   └── index.ts
│
├── listing-service/           # Listing Creation Wizard (7+ steps)
│   ├── components/
│   │   ├── ListingCreationModal.tsx   # Main wizard modal
│   │   ├── ProgressIndicator.tsx
│   │   ├── NavigationControls.tsx
│   │   └── index.ts
│   ├── steps/
│   │   ├── WelcomeStep.tsx           # Step 1: Business type reconfirmation
│   │   ├── BasicInfoStep.tsx         # Step 2: Business details
│   │   ├── FinancialOverviewStep.tsx # Step 3: Financial data
│   │   ├── BusinessStoryStep.tsx     # Step 4: Story & USP
│   │   ├── SaleDetailsStep.tsx       # Step 5: Sale preferences
│   │   ├── PhotosDocumentsStep.tsx   # Step 6: Media & docs
│   │   ├── PrivacyVisibilityStep.tsx # Step 7: Privacy settings
│   │   ├── ReviewPublishStep.tsx     # Step 8: Review & publish
│   │   └── index.ts
│   ├── types/
│   │   ├── ListingCreationTypes.ts
│   │   └── index.ts
│   └── index.ts
│
├── components/                # Legacy components (backward compatibility)
│   ├── ListingWizardModal.tsx
│   ├── ListingCreationFlow.tsx
│   └── index.ts
│
├── types/                     # Legacy types (backward compatibility)
│   └── index.ts
│
├── README.md                  # This file
└── index.ts                   # Main export file
```

## Routing Flow

The listing creation follows a two-stage routing flow:

### Stage 1: Prelude

**Route:** `/my-business/listings/prelude`  
**Purpose:** Business type selection and confirmation  
**Component:** `ListingPreludePage`

**Flow:**

1. User clicks "Create New Listing" from `/my-business/listings`
2. System navigates to `/my-business/listings/prelude`
3. User selects business type from 12 options
4. User confirms selection
5. System navigates to listing service with selected type

### Stage 2: Listing Service

**Route:** `/my-business/listings/create?type={businessType}`  
**Purpose:** Complete 7-step listing creation wizard  
**Component:** `ListingServicePage`

**Flow:**

1. System receives `businessType` from URL parameter
2. If no type provided, redirects to prelude
3. Opens listing creation modal with selected business type
4. User completes 7+ steps
5. System creates listing via API
6. Redirects to `/my-business/listings` with success message

## URL Generator Methods

```typescript
import { UrlGenerator } from '@/shared/services';

// Navigate to prelude (start listing creation)
navigate(UrlGenerator.listingPrelude());

// Navigate to listing service with business type
navigate(UrlGenerator.listingService('catering'));

// Navigate to listings management
navigate(UrlGenerator.businessListings());
```

## Usage

### Starting the Listing Creation Flow

```tsx
import { UrlGenerator } from '@/shared/services';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleCreateListing = () => {
    // Start with prelude
    navigate(UrlGenerator.listingPrelude());
  };

  return <button onClick={handleCreateListing}>Create New Listing</button>;
}
```

### Prelude Flow (Business Type Selection + Confirmation)

The prelude is a 2-step modal flow that captures the business type:

**Prelude Steps:**

1. **Business Type Selection**: Full-page selection with 12 business type cards
2. **Confirmation**: Shows selected type with "Get Started" CTA

**Key Features:**

- No progress indicator (intentionally kept separate from main wizard)
- Full-screen modal experience
- Airbnb-inspired UI with clean, minimal design
- 4-column grid layout for business types
- Popular badges on common business types

### Listing Service (7-Step Wizard)

The listing service is the main creation wizard that follows the prelude:

**Wizard Steps:**

1. **Welcome**: Business type reconfirmation
2. **Basic Info**: Business name, description, location, etc.
3. **Financial Overview**: Revenue, profitability, asking price
4. **Business Story**: What makes the business special
5. **Sale Details**: Timeline, assets, transition support
6. **Photos & Documents**: Visual assets and documentation
7. **Privacy & Visibility**: Control listing visibility
8. **Review & Publish**: Final review and publish

**Key Features:**

- Progress indicator showing current step
- Navigation controls (Back/Next)
- Step validation
- Real-time data saving
- Mobile-responsive design

## Design Philosophy

### Separation of Concerns

The prelude and listing service are intentionally separated:

- **Prelude**: Quick, low-friction business type selection
  - No progress indicators (feels lighter)
  - Can be shown to new users without commitment
  - Easy to back out of
  - Standalone route for independent access
- **Listing Service**: Detailed listing creation
  - Clear progress indicators
  - Multiple steps with validation
  - More committed user experience
  - Receives business type context from prelude

### Route-Based Flow

Instead of keeping everything in one modal, we use routes to:

- **Maintain state** in the URL
- **Enable sharing** of specific steps (if needed)
- **Support back button** navigation
- **Separate concerns** cleanly
- **Allow independent access** to each stage

### Airbnb-Inspired UX

Both flows follow Airbnb's design patterns:

- Full-page experiences (no cramped modals)
- Large, clear typography
- Interactive cards with hover states
- Smooth transitions between steps
- Visual confirmation of selections
- Mobile-first responsive design

## Business Types

The following business types are supported:

1. **Catering** 🍽️ (Popular)
2. **Photography** 📸 (Popular)
3. **Hairstyling** 💇‍♀️ (Popular)
4. **Chef Services** 👨‍🍳 (Popular)
5. **Meal Services** 🍱 (Popular)
6. **Make-up** 💄 (Popular)
7. **Massage** 💆‍♀️ (Popular)
8. **Nail Care** 💅 (Popular)
9. **Personal Training** 💪 (Popular)
10. **Wellness Treatments** 🧘‍♀️ (Popular)
11. **Cleaning Services** 🧹
12. **Business Consulting** 💼

## Integration Flow

```
User clicks "Create New Listing" from /my-business/listings
       ↓
Navigate to /my-business/listings/prelude
       ↓
PreludeFlow opens in modal
       ↓
Step 1: Select Business Type (12 cards)
       ↓
Step 2: Confirm Selection
       ↓
User clicks "Get Started"
       ↓
Navigate to /my-business/listings/create?type={businessType}
       ↓
ListingServicePage opens with businessType
       ↓
ListingCreationModal opens with 7-step wizard
       ↓
User completes all steps
       ↓
Data submitted to API
       ↓
Navigate back to /my-business/listings with success message
```

## Development Notes

### Adding New Steps to Listing Service

To add a new step to the listing service wizard:

1. Create step component in `listing-service/steps/`
2. Add step configuration in `ListingCreationModal.tsx`
3. Update `ListingCreationData` type in `listing-service/types/`
4. Add validation logic
5. Update progress indicator

### Modifying Business Types

To add/remove business types:

1. Update `BusinessType` in `prelude/types/PreludeTypes.ts`
2. Update `businessTypeOptions` in `BusinessTypeSelectionPage.tsx`
3. Update `businessTypeOptions` in `BusinessConfirmationPage.tsx`
4. Update `businessTypeOptions` in `WelcomeStep.tsx` (if needed)

### Legacy Support

The `components/` and `types/` directories contain legacy components for backward compatibility:

- `ListingWizardModal`: Original modal-based wizard
- `ListingCreationFlow`: Original full-page flow

These are maintained for existing integrations but new code should use:

- `prelude/` for business type selection
- `listing-service/` for the main wizard
- Route-based navigation via `UrlGenerator`

## Pages

### ListingPreludePage

**Location:** `src/app/pages/listings/ListingPreludePage.tsx`  
**Route:** `/my-business/listings/prelude`  
**Purpose:** Entry point for listing creation

### ListingServicePage

**Location:** `src/app/pages/listings/ListingServicePage.tsx`  
**Route:** `/my-business/listings/create?type={businessType}`  
**Purpose:** Main listing creation wizard

### ListingManagement

**Location:** `src/app/pages/business/management/ListingManagement.tsx`  
**Route:** `/my-business/listings`  
**Purpose:** View and manage all listings

## API Integration

### Creating a Listing

```typescript
// After user completes the wizard
const handleListingComplete = async (data: ListingCreationData) => {
  try {
    // Send to API
    const response = await api.post('/listings', data);

    // Show success
    toast.success('Listing created successfully!');

    // Navigate to listings
    navigate(UrlGenerator.businessListings());
  } catch (error) {
    toast.error('Failed to create listing');
  }
};
```

### Loading Business Data

```typescript
// Pre-populate with user's business data
useEffect(() => {
  const loadBusinessData = async () => {
    const business = await api.get('/business/profile');
    setBusinessInfo(business);
  };

  loadBusinessData();
}, []);
```

## Testing

### Test the Prelude Flow

1. Navigate to `http://localhost:3000/my-business/listings`
2. Click "Create New Listing"
3. Should redirect to `/my-business/listings/prelude`
4. Select a business type
5. Confirm selection
6. Should redirect to `/my-business/listings/create?type={selected}`

### Test the Listing Service

1. Navigate directly to `http://localhost:3000/my-business/listings/create?type=catering`
2. Modal should open with catering as selected business type
3. Complete the wizard steps
4. Should redirect to `/my-business/listings` on completion

### Test Error Cases

1. Navigate to `/my-business/listings/create` without type parameter
2. Should redirect back to `/my-business/listings/prelude`
3. Try accessing without authentication
4. Should redirect to login
