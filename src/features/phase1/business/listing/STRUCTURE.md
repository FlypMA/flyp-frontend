# 📂 Listing Feature Structure

## Current Structure (After Cleanup)

```
/Users/matthiasmandiau/Downloads/flyp/apps/flyp-frontend/src/features/phase1/business/listing/
├── README.md                       # Comprehensive documentation
├── STRUCTURE.md                    # This file
├── index.ts                        # Main exports
│
├── prelude/                        # ✅ READY FOR USE
│   ├── components/
│   │   ├── PreludeFlow.tsx                # Main modal orchestrator
│   │   ├── BusinessTypeSelectionPage.tsx  # Step 1: Type selection
│   │   ├── BusinessConfirmationPage.tsx   # Step 2: Confirmation
│   │   ├── DemoBusinessTypeSelection.tsx  # Demo component
│   │   ├── DemoBusinessConfirmation.tsx   # Demo component
│   │   └── index.ts
│   ├── types/
│   │   ├── PreludeTypes.ts                # Business types & interfaces
│   │   └── index.ts
│   └── index.ts
│
├── listing-service/                # ✅ READY TO DEFINE STEPS
│   ├── components/
│   │   ├── ListingCreationModal.tsx       # Main wizard orchestrator
│   │   ├── ProgressIndicator.tsx          # Step progress UI
│   │   ├── NavigationControls.tsx         # Back/Next buttons
│   │   └── index.ts
│   ├── steps/                      # ⚠️ PLACEHOLDER STEPS - NEEDS DEFINITION
│   │   ├── WelcomeStep.tsx                # Step 1: Welcome
│   │   ├── BasicInfoStep.tsx              # Step 2: Basic info (placeholder)
│   │   ├── FinancialOverviewStep.tsx      # Step 3: Financials (placeholder)
│   │   ├── BusinessStoryStep.tsx          # Step 4: Story (placeholder)
│   │   ├── SaleDetailsStep.tsx            # Step 5: Sale details (placeholder)
│   │   ├── PhotosDocumentsStep.tsx        # Step 6: Media (placeholder)
│   │   ├── PrivacyVisibilityStep.tsx      # Step 7: Privacy (placeholder)
│   │   ├── ReviewPublishStep.tsx          # Step 8: Review (placeholder)
│   │   ├── [Legacy steps...]              # To be removed
│   │   └── index.ts
│   ├── types/
│   │   ├── ListingCreationTypes.ts        # Listing data types
│   │   └── index.ts
│   └── index.ts
│
├── components/                     # 🔄 LEGACY (Backward compatibility)
│   ├── ListingWizardModal.tsx             # Old wizard
│   ├── ListingCreationFlow.tsx            # Old flow
│   ├── StepIndicator.tsx                  # Old indicator
│   ├── WizardNavigation.tsx               # Old navigation
│   └── index.ts
│
└── types/                          # 🔄 LEGACY (Backward compatibility)
    └── index.ts
```

## Route Structure

### Pages (`/src/app/pages/listings/`)

```
listings/
├── ListingPreludePage.tsx          # NEW: /my-business/listings/prelude
├── ListingServicePage.tsx          # NEW: /my-business/listings/create
├── CreateListingPage.tsx           # Legacy: /my-business/listings/new
├── CreateListingFlowPage.tsx       # Legacy flow page
├── EditListingPage.tsx             # Edit existing listing
├── ListingDetails.tsx              # View listing details
└── ListingSearch.tsx               # Search listings
```

### Router Configuration (`/src/app/routing/router.tsx`)

```typescript
// NEW ROUTES (Ready to use)
{
  path: 'my-business/listings/prelude',
  element: <SellerRoute><ListingPreludePage /></SellerRoute>,
},
{
  path: 'my-business/listings/create',
  element: <SellerRoute><ListingServicePage /></SellerRoute>,
},

// EXISTING ROUTES
{
  path: 'my-business/listings',
  element: <SellerRoute><ListingManagement /></SellerRoute>,
},
{
  path: 'my-business/listings/new',
  element: <SellerRoute><CreateListingPage /></SellerRoute>,
},
```

### URL Generator (`/src/shared/services/urls/urlGenerator.ts`)

```typescript
static listingPrelude = () => '/my-business/listings/prelude';
static listingService = (businessType: string) => `/my-business/listings/create?type=${encodeURIComponent(businessType)}`;
static businessListings = () => '/my-business/listings';
```

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  User Journey: Create New Listing                          │
└─────────────────────────────────────────────────────────────┘

1. Starting Point: /my-business/listings
   │
   │  Click "Create New Listing"
   │
   ↓
2. Prelude: /my-business/listings/prelude
   │
   │  ┌──────────────────────────────────────┐
   │  │  Step 1: Business Type Selection     │
   │  │  - 12 business type cards (4×3 grid) │
   │  │  - Popular badges                    │
   │  │  - Interactive selection              │
   │  └──────────────────────────────────────┘
   │
   │  User selects business type (e.g., "catering")
   │
   ↓
   │  ┌──────────────────────────────────────┐
   │  │  Step 2: Confirmation                │
   │  │  - Show selected business type       │
   │  │  - "Create your listing" title       │
   │  │  - "Get Started" CTA button         │
   │  └──────────────────────────────────────┘
   │
   │  User clicks "Get Started"
   │
   ↓
3. Listing Service: /my-business/listings/create?type=catering
   │
   │  ┌──────────────────────────────────────┐
   │  │  ListingCreationModal (7-8 steps)    │
   │  │                                      │
   │  │  ⚠️ STEPS NEED TO BE DEFINED         │
   │  │                                      │
   │  │  Step 1: Welcome (✅ Ready)          │
   │  │  Step 2: Basic Info (⚠️ Placeholder) │
   │  │  Step 3: Financials (⚠️ Placeholder) │
   │  │  Step 4: Story (⚠️ Placeholder)      │
   │  │  Step 5: Sale Details (⚠️ Placeholder)│
   │  │  Step 6: Media (⚠️ Placeholder)      │
   │  │  Step 7: Privacy (⚠️ Placeholder)    │
   │  │  Step 8: Review (⚠️ Placeholder)     │
   │  └──────────────────────────────────────┘
   │
   │  User completes all steps
   │
   ↓
4. Success: /my-business/listings
   │
   └──> Show success message
        "Business listing created successfully!"
```

## Business Types (12 Options)

```
Service-Focused Business Types:

1. Catering        🍽️   [Popular]
2. Photography     📸   [Popular]
3. Hairstyling     💇‍♀️   [Popular]
4. Chef Services   👨‍🍳   [Popular]
5. Meal Services   🍱   [Popular]
6. Make-up         💄   [Popular]
7. Massage         💆‍♀️   [Popular]
8. Nail Care       💅   [Popular]
9. Personal Training 💪 [Popular]
10. Wellness       🧘‍♀️   [Popular]
11. Cleaning       🧹
12. Consulting     💼
```

## Next Steps (Your Input Needed)

### 1. Define Listing Service Steps

The placeholder steps in `listing-service/steps/` need to be defined:

**Step 2: BasicInfoStep.tsx**

- What fields should we collect?
- Current placeholder has: name, description, industry, location, etc.
- Should we keep these or modify?

**Step 3: FinancialOverviewStep.tsx**

- Revenue data?
- EBITDA?
- Asking price?
- Profitability metrics?

**Step 4: BusinessStoryStep.tsx**

- What makes the business special?
- Target customers?
- Growth opportunities?
- Competitive advantage?

**Step 5: SaleDetailsStep.tsx**

- Reason for sale?
- Timeline preferences?
- Included/excluded assets?
- Transition support?

**Step 6: PhotosDocumentsStep.tsx**

- Business photos?
- Financial documents?
- Legal documents?
- Marketing materials?

**Step 7: PrivacyVisibilityStep.tsx**

- Anonymous listing?
- NDA requirements?
- Hidden information?
- Teaser description?

**Step 8: ReviewPublishStep.tsx**

- Summary of all data?
- Terms agreement?
- Publish button?
- Draft option?

### 2. Clean Up Legacy Steps

Remove or consolidate these legacy steps:

- `BusinessDetailsStep.tsx`
- `DocumentsStep.tsx`
- `FinancialInfoStep.tsx`
- `PrivacySettingsStep.tsx`
- `ReviewStep.tsx`

### 3. API Integration

Define API endpoints for:

- Creating listings
- Uploading documents
- Saving drafts
- Publishing listings

## Testing

### Manual Testing

1. **Start Dev Server:**

   ```bash
   cd /Users/matthiasmandiau/Downloads/flyp/apps/flyp-frontend
   yarn dev
   ```

2. **Test Prelude Flow:**
   - Navigate to: `http://localhost:3000/my-business/listings`
   - Click "Create New Listing"
   - Should redirect to: `/my-business/listings/prelude`
   - Select a business type
   - Confirm selection
   - Should redirect to: `/my-business/listings/create?type={selected}`

3. **Test Listing Service:**
   - Should open modal with 8 steps
   - Step 1 (Welcome) should show selected business type
   - Steps 2-8 are placeholders (ready to define)

### Build Verification

✅ **Build Status: PASSING**

- Type check: ✅ No errors
- Vite build: ✅ Success
- Bundle size: ~2.4MB (138KB gzipped)

## Status Summary

| Component                     | Status      | Notes                         |
| ----------------------------- | ----------- | ----------------------------- |
| **Prelude**                   | ✅ Complete | Business type selection ready |
| **Routing**                   | ✅ Complete | URLs and navigation set up    |
| **URL Generator**             | ✅ Complete | Helper methods added          |
| **Listing Service Structure** | ✅ Complete | Modal and nav ready           |
| **Step Definitions**          | ⚠️ Pending  | Waiting for your input        |
| **API Integration**           | ⚠️ Pending  | To be implemented             |
| **Documentation**             | ✅ Complete | README and STRUCTURE docs     |
| **Build**                     | ✅ Passing  | No errors                     |

## Ready for Your Input

You can now define what each step in the listing service should contain. The structure is ready, and all files are organized in:

```
/Users/matthiasmandiau/Downloads/flyp/apps/flyp-frontend/src/features/phase1/business/listing/listing-service/
```

Tell me what each step should include, and I'll implement them following the Airbnb-inspired design we established in the prelude!
