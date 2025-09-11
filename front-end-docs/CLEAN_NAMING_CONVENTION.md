# 🎯 **BETWEENDEALS CLEAN NAMING CONVENTION**

**Date:** September 11, 2025  
**Standard:** Professional React/TypeScript file naming  
**Goal:** Short, clear, descriptive names for all 520 files

---

## 🏗️ **CORE NAMING PRINCIPLES**

### **✅ The Golden Rules:**

1. **ComponentType + Descriptor** format
2. **PascalCase** for all React components (.tsx files)
3. **camelCase** for utilities/services (.ts files)
4. **Maximum 2-3 words** - keep names concise
5. **Purpose must be clear** from the name alone
6. **No vague prefixes** (Custom, Clean, Simple, Unified, Test)

---

## 📋 **COMPONENT NAMING PATTERNS**

### **🧭 Navigation Components:**

```typescript
// ✅ CLEAN PATTERN: Navigation + Context/Device
NavigationDesktop.tsx; // Main desktop navigation bar
NavigationMobile.tsx; // Mobile hamburger navigation
NavigationOnboarding.tsx; // Onboarding flow navigation
SidebarSeller.tsx; // Seller dashboard sidebar
SidebarSettings.tsx; // Settings page sidebar
SidebarBuyer.tsx; // Buyer dashboard sidebar
```

### **🎨 UI Components:**

```typescript
// ✅ CLEAN PATTERN: Component + Variant (if needed)
Button.tsx; // Base button component
ButtonPrimary.tsx; // Primary action button (if separate)
Input.tsx; // Base input field
InputPassword.tsx; // Password input (if special)
Select.tsx; // Dropdown select
Textarea.tsx; // Text area input
Modal.tsx; // Base modal component
Card.tsx; // Content card component
```

### **📐 Layout Components:**

```typescript
// ✅ CLEAN PATTERN: Layout + Purpose
LayoutMain.tsx; // Main application layout
LayoutAuth.tsx; // Authentication pages layout
LayoutSplit.tsx; // Two-column split layout
LayoutCreator.tsx; // Creator landing layout
LayoutMinimal.tsx; // Minimal/logo-only layout
ContainerDefault.tsx; // Default content container
ContainerWide.tsx; // Wide content container
```

### **💼 Business Components:**

```typescript
// ✅ CLEAN PATTERN: Component + BusinessContext
CardListing.tsx; // Business listing card
CardBusiness.tsx; // Business information card
DashboardSeller.tsx; // Seller dashboard main view
DashboardBuyer.tsx; // Buyer dashboard main view
ModalListing.tsx; // Business listing modal
ModalInquiry.tsx; // Inquiry submission modal
SelectorIndustry.tsx; // Industry selection component
```

### **⚙️ Utility Components:**

```typescript
// ✅ CLEAN PATTERN: Component + Function
LoadingSpinner.tsx; // Loading indicator
LoadingFallback.tsx; // Loading fallback component
ErrorBoundary.tsx; // Error boundary wrapper
RouteProtected.tsx; // Protected route wrapper
RouteRoleProtected.tsx; // Role-based route protection
```

### **🎭 Logo/Brand Components:**

```typescript
// ✅ CLEAN PATTERN: Logo + Variant
LogoBetweendeals.tsx; // Main company logo
LogoInline.tsx; // Inline logo variant
LogoLoading.tsx; // Animated loading logo
```

### **📝 Form Components:**

```typescript
// ✅ CLEAN PATTERN: Form + Purpose OR Component + Form
FormLogin.tsx; // Login form
FormSignup.tsx; // Signup form
FormListing.tsx; // Business listing form
FormContact.tsx; // Contact form
FieldInput.tsx; // Form input field wrapper
FieldSelect.tsx; // Form select field wrapper
```

### **📊 Data Components:**

```typescript
// ✅ CLEAN PATTERN: Component + DataType
TableListing.tsx; // Listing data table
ChartRevenue.tsx; // Revenue chart component
GraphAnalytics.tsx; // Analytics graph
ReportDashboard.tsx; // Dashboard report view
```

---

## 🚨 **BANNED NAME PATTERNS**

### **❌ Vague Prefixes to Eliminate:**

```bash
❌ UnifiedNavigation.tsx    # "Unified" means nothing
❌ CustomInputField.tsx     # "Custom" is vague
❌ CleanInput.tsx          # "Clean" doesn't describe function
❌ SimpleSettings.tsx      # "Simple" is subjective
❌ GeneralModal.tsx        # "General" is meaningless
❌ DefaultContainer.tsx    # Often means poorly planned
```

### **❌ Test/Example Files to Remove:**

```bash
❌ NavigationTest.tsx      # Test files don't belong in components
❌ ExampleForm.tsx         # Example files should be in docs
❌ TestComponent.tsx       # Tests belong in __tests__ folder
❌ DevTester.tsx          # Development utilities don't belong in production
```

### **❌ Overly Long Names to Shorten:**

```bash
❌ BusinessTypeAndIndustrySelector.tsx  # → SelectorBusinessType.tsx
❌ SimpleNotificationSettings.tsx       # → SettingsNotifications.tsx
❌ business-listing-modal-container.tsx # → ModalBusinessListing.tsx
```

---

## 📁 **FILE STRUCTURE NAMING**

### **✅ Directory Names:**

```bash
src/
├── components/          # Shared UI components
├── features/           # Business feature modules
├── layouts/            # Layout components
├── pages/              # Route page components
├── services/           # API and business services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

### **✅ Feature Directory Contents:**

```bash
features/authentication/
├── components/         # Feature-specific components
│   ├── FormLogin.tsx
│   ├── FormSignup.tsx
│   └── ModalAuth.tsx
├── hooks/             # Feature-specific hooks
├── services/          # Feature-specific API calls
├── types/             # Feature-specific types
└── pages/             # Feature pages
    ├── LoginPage.tsx
    └── SignupPage.tsx
```

---

## 🔄 **SPECIFIC RENAMING EXAMPLES**

### **Navigation Components (User's Priority):**

```bash
# Current → New Name
UnifiedNavigation.tsx → NavigationDesktop.tsx
NavigationTest.tsx → DELETE (meaningless test file)
MobileNavigation.tsx → NavigationMobile.tsx
SellerSidebar.tsx → SidebarSeller.tsx
SettingsSidebar.tsx → SidebarSettings.tsx
SellerOnboardingNavigation.tsx → NavigationOnboarding.tsx
```

### **Layout Components:**

```bash
layout_authenticated.tsx → LayoutAuth.tsx
layout_split50.tsx → LayoutSplit.tsx
layout_main.tsx → LayoutMain.tsx
layout_creatorLanding.tsx → LayoutCreator.tsx
layout_logoOnlyNav.tsx → LayoutMinimal.tsx
container_default.tsx → ContainerDefault.tsx
```

### **Form Components:**

```bash
CleanInput.tsx → Input.tsx (merge with base)
AnimatedInput.tsx → InputAnimated.tsx
customInputField.tsx → InputCustom.tsx
customPasswordInputField.tsx → InputPassword.tsx
PrimaryButton.tsx → ButtonPrimary.tsx
SecondaryButton.tsx → ButtonSecondary.tsx
FormActions.tsx → ButtonGroup.tsx
```

### **Business Components:**

```bash
business-listing-modal-container.tsx → ModalBusinessListing.tsx
BusinessTypeAndIndustrySelector.tsx → SelectorBusinessType.tsx
IndustrySelector.tsx → SelectorIndustry.tsx
BusinessTypeSelector.tsx → SelectorBusinessType.tsx
TimelineSelector.tsx → SelectorTimeline.tsx
PriceExpectationsSelector.tsx → SelectorPrice.tsx
```

### **Utility Components:**

```bash
BetweendealsLoadingLogo.tsx → LogoBetweendeals.tsx
InlineBetweendealsLogo.tsx → LogoInline.tsx
protected-route.tsx → RouteProtected.tsx
role-protected-route.tsx → RouteRoleProtected.tsx
loading-fallback.tsx → LoadingFallback.tsx
loading-spinner.tsx → LoadingSpinner.tsx
```

---

## 🛠️ **IMPLEMENTATION PROCESS**

### **Step 1: Safe Renaming with Git**

```bash
# Use git mv to preserve file history
git mv src/components/UnifiedNavigation.tsx src/components/NavigationDesktop.tsx

# Update component name inside file
sed -i 's/UnifiedNavigation/NavigationDesktop/g' src/components/NavigationDesktop.tsx
```

### **Step 2: Update All Imports**

```bash
# Find all files importing the old component
grep -r "UnifiedNavigation" src/ --include="*.tsx" --include="*.ts"

# Replace imports across codebase
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/UnifiedNavigation/NavigationDesktop/g'
```

### **Step 3: Update Export Statements**

```bash
# Update index.ts export files
sed -i 's/UnifiedNavigation/NavigationDesktop/g' src/components/index.ts
```

### **Step 4: Validation**

```bash
# Check for broken imports
npm run type-check

# Verify build still works
npm run build
```

---

## 📊 **QUALITY CHECKLIST**

### **✅ Good Component Names:**

- [ ] **Clear purpose** - Can you tell what it does from the name?
- [ ] **Concise** - Maximum 2-3 words
- [ ] **Consistent pattern** - Follows established conventions
- [ ] **No vague words** - No Custom/Clean/Simple/Unified
- [ ] **Professional** - Sounds like enterprise software

### **✅ Name Quality Examples:**

```typescript
✅ NavigationDesktop.tsx    // Clear: desktop navigation component
✅ InputPassword.tsx        // Clear: password input field
✅ ModalBusinessListing.tsx // Clear: modal for business listings
✅ SidebarSeller.tsx        // Clear: sidebar for seller dashboard
✅ ButtonPrimary.tsx        // Clear: primary action button
✅ CardListing.tsx          // Clear: card displaying a listing

❌ UnifiedNavigation.tsx    // Vague: "unified" doesn't describe function
❌ NavigationTest.tsx       // Meaningless: test files don't belong here
❌ CustomInput.tsx          // Vague: "custom" doesn't specify how
❌ CleanComponent.tsx       // Subjective: "clean" isn't descriptive
```

---

## 🎯 **SUCCESS METRICS**

### **Developer Experience Goals:**

- **Component Discovery:** Find any component in <10 seconds
- **Clear Intent:** Understand component purpose from filename
- **Consistent Patterns:** Zero mental overhead switching between files
- **Professional Quality:** Enterprise-grade naming throughout

### **Team Benefits:**

- **Onboarding Speed:** New developers understand structure immediately
- **Code Reviews:** Meaningful names improve review quality
- **Refactoring Safety:** Consistent patterns make bulk changes safer
- **IDE Support:** Better autocomplete and file navigation

### **Measurable Outcomes:**

- **0 vague names** (Test, Custom, Unified, Simple eliminated)
- **100% PascalCase** consistency for React components
- **<3 words maximum** for all component names
- **0 broken imports** after renaming process

---

## 🚀 **ROLLOUT PLAN**

### **Phase 1: High-Impact Components (This Week)**

1. **Navigation components** - User's specific concern
2. **Layout components** - Used across entire app
3. **Common UI components** - Buttons, inputs, modals

### **Phase 2: Business Components (Next Week)**

1. **Feature-specific components** in each domain
2. **Form components** and selectors
3. **Dashboard and analytics components**

### **Phase 3: Utilities & Cleanup (Week 3)**

1. **Utility components** and wrappers
2. **Logo and branding components**
3. **Remove test/example files**
4. **Final validation and documentation**

---

## 🏆 **EXPECTED IMPACT**

**This naming convention will transform the developer experience from chaotic file hunting to instant component discovery. Professional, consistent naming elevates the entire codebase quality and makes the team significantly more productive.**

### **Before:**

- 2+ minutes to find a component
- Confusion about component purpose
- Mixed naming conventions
- Amateur appearance

### **After:**

- 10 seconds to find any component
- Clear understanding from filename
- Consistent professional naming
- Enterprise-grade code quality

---

**Next Step:** Begin systematic renaming starting with navigation components per user's specific request.
