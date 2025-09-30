# 🚀 Upswitch Frontend Documentation

**Modern React TypeScript application for Europe's premier SME M&A platform**

**Last Updated**: September 30, 2025  
**Version**: 2.0.0  
**Status**: ✅ Production Ready

---

## 📋 Quick Start

```bash
# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server (Vite HMR)
yarn dev

# Build for production
yarn build

# Type checking
yarn type-check

# Linting
yarn lint
```

**Development Server**: `http://localhost:5173` (Vite default)

---

## 🏗️ Architecture Overview

### **Tech Stack**

| Technology       | Version | Purpose                               |
| ---------------- | ------- | ------------------------------------- |
| **React**        | 18.3    | UI framework with concurrent features |
| **TypeScript**   | 5.5     | Type safety and DX                    |
| **Vite**         | 5.4     | Build tool and dev server (HMR)       |
| **Tailwind CSS** | 3.4     | Utility-first styling                 |
| **HeroUI**       | Latest  | Component library (Tailwind-based)    |
| **React Router** | 6.x     | Client-side routing                   |
| **Supabase**     | Latest  | Auth, database, storage               |
| **Lucide React** | Latest  | Icon system                           |
| **Vitest**       | Latest  | Unit testing                          |

### **Project Structure**

```
apps/flyp-frontend/
├── src/
│   ├── app/                    # 🏠 Application Shell
│   │   ├── layouts/           # Page layouts (Main, Auth, Buyer, Seller)
│   │   ├── pages/             # Route-based pages
│   │   │   ├── landingPages/  # Marketing pages & variations
│   │   │   │   ├── home/      # Homepage (3 variations)
│   │   │   │   ├── sellers/   # Seller landing (3 variations)
│   │   │   │   └── resources/ # Resources pages
│   │   │   ├── business/      # Seller dashboard pages
│   │   │   ├── listings/      # Listing search & details
│   │   │   ├── messages/      # Conversations
│   │   │   ├── users/         # User account pages
│   │   │   └── support/       # Help & FAQ
│   │   ├── providers/         # Context providers (Auth, UI)
│   │   ├── routing/           # Router config & guards
│   │   └── App.tsx            # Root component
│   │
│   ├── features/              # 🎯 Business Domain Features
│   │   ├── phase1/            # MVP features
│   │   │   ├── authentication/   # Login, signup modals
│   │   │   ├── business/         # Business card, listing creation
│   │   │   ├── conversations/    # Messaging system
│   │   │   └── profile/          # User profiles
│   │
│   ├── shared/                # 🔄 Reusable Resources
│   │   ├── components/        # Design system components
│   │   │   ├── layout/        # Navigation, footer, layouts
│   │   │   ├── forms/         # Form controls
│   │   │   ├── buttons/       # Button variants
│   │   │   ├── modals/        # Modal system
│   │   │   ├── video/         # Video background component
│   │   │   └── ...            # Other UI components
│   │   ├── services/          # API services
│   │   │   ├── auth/          # Auth service
│   │   │   └── urls/          # URL generator
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utilities
│   │
│   ├── config/               # ⚙️ Configuration
│   └── assets/               # 📁 Static assets
│
├── public/                   # Static files
│   ├── videos/              # Video backgrounds
│   ├── images/              # Images & posters
│   └── *.svg                # Logos
│
└── front-end-docs/          # 📚 Documentation
    ├── README.md            # This file
    ├── ARCHITECTURE_OVERVIEW.md
    └── DEVELOPMENT_GUIDE.md
```

---

## 🛠️ Available Scripts

| Command            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `yarn dev`         | Start Vite dev server with HMR at http://localhost:5173 |
| `yarn build`       | Build optimized production bundle to `dist/`            |
| `yarn type-check`  | Run TypeScript compiler in check mode                   |
| `yarn lint`        | Run ESLint across all .tsx and .ts files                |
| `yarn clean:build` | Remove dist folder before build                         |

---

## 🔧 Environment Setup

Create `.env.local` in the project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Development Settings
VITE_DEV_BYPASS_AUTH=false
VITE_ENVIRONMENT=development

# Optional: Feature Flags
VITE_ENABLE_ANALYTICS=false
```

**Important**: Never commit `.env.local` - it contains sensitive keys.

---

## 📱 Key Features

### **Authentication System**

- Supabase-powered auth with email/password
- Role-based access (seller, buyer, admin)
- Protected routes with guards
- Modal-based login/signup (no separate pages)

### **Landing Page Variations** (NEW)

- **Homepage**: 3 variations (Dual Audience, Search-First, Trust & Storytelling)
- **Seller Landing**: 3 variations (Intelligence First, Guided Journey, Success Stories)
- **Valuation Pages**: 3 variations (Conversational, All-in-One, Interactive Calculator)
- **Video Backgrounds**: Reusable `VideoBackground` component
- **A/B Testing Ready**: Comparison tools for each page type

### **Business Management**

- Business card creation (3-step wizard)
- Business valuation tools
- Listing creation & management
- Document vault
- Performance analytics

### **Marketplace**

- Advanced search with filters
- Listing detail pages
- NDA-protected private info
- Saved listings
- Inquiry system

### **Messaging**

- Real-time conversations
- Document sharing
- Due diligence requests
- Offer management

---

## 🗺️ Routing & Navigation

### **Public Routes** (MainLayout)

```
/                           # Homepage
/for-sellers               # Seller landing page
/search                    # Browse businesses
/listings/:id              # Listing details
/about                     # About page
/contact                   # Contact page
/help                      # Help center
/faq                       # FAQ page
/resources/valuation-guide # Valuation guide
```

### **Landing Page Variations** (Design Exploration)

```
# Homepage variations
/home/variation-a          # Dual Audience Split
/home/variation-b          # Search-First
/home/variation-c          # Trust & Storytelling
/home/compare              # Comparison tool

# Seller variations
/for-sellers/variation-a   # Intelligence First
/for-sellers/variation-b   # Guided Journey
/for-sellers/variation-c   # Success Stories
/for-sellers/compare       # Comparison tool

# Valuation variations
/valuation/variation-a     # Conversational Flow
/valuation/variation-b     # All-in-One Form
/valuation/variation-c     # Interactive Calculator
/valuation/compare         # Comparison tool
```

### **Protected Routes** (Auth Required)

```
/my-business               # Seller dashboard
/my-business/overview      # Business overview
/my-business/valuations    # Valuation tool
/my-business/listings      # Listing management
/my-business/documents     # Document vault

/users/profile             # User profile
/users/billing             # Billing & subscription
/users/saved               # Saved listings (buyers)

/messages                  # Conversations
```

---

## 🎨 Design System

### **Brand Colors** (Tailwind Extended)

```javascript
// Primary (Teal)
primary: {
  50 - 950;
} // Main brand color

// Calm (Slate)
calm: {
  50 - 950;
} // Secondary, professional

// Success (Green)
success: {
  50 - 950;
} // Positive actions

// Warm Amber
accent: {
  50 - 950;
} // Highlights, CTAs
```

### **Typography**

- **Headings**: DM Sans / Circular (via font-display class)
- **Body**: Inter (default)
- **Code**: JetBrains Mono

### **Component Library**

- **HeroUI**: Primary component library (Button, Input, Card, Modal, etc.)
- **Custom**: Video backgrounds, navigation, specialized business components

---

## 📊 State Management

### **Global State** (React Context)

- **AuthProvider**: User authentication, session management
- **UIProvider**: Theme, notifications, modal state
- **ConversationProvider**: Real-time messaging state

### **Local State**

- React hooks (`useState`, `useEffect`, `useMemo`)
- Form state with controlled components
- URL params for search filters

---

## 🧪 Testing Strategy

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage
yarn test:coverage
```

### **Testing Approach**

- Unit tests for utilities and services
- Component tests for shared components
- Integration tests for critical flows
- E2E tests (future): Playwright/Cypress

---

## 🚀 Deployment

### **Build Process**

```bash
# 1. Clean previous build
yarn clean:build

# 2. Type check
yarn type-check

# 3. Build production bundle
yarn build

# Output: dist/ directory
```

### **Build Output**

- Optimized JS bundles with code splitting
- CSS extracted and minimized
- Static assets with content hashing
- Source maps for debugging

### **Hosting**

- **Recommended**: Vercel, Netlify, Cloudflare Pages
- **Requires**: Node.js 18+ for build
- **CDN**: Static assets should be CDN-hosted

---

## 📚 Additional Documentation

- **[Architecture Details](./ARCHITECTURE_OVERVIEW.md)** - Component patterns, data flow
- **[Development Guide](./DEVELOPMENT_GUIDE.md)** - Coding standards, workflows

---

## 🔐 Security Considerations

- **Environment Variables**: Never commit `.env.local`
- **API Keys**: All keys prefixed with `VITE_` are exposed to client
- **Authentication**: Supabase handles secure session management
- **CORS**: Configured in Supabase dashboard
- **Content Security Policy**: Configure in hosting platform

---

## 🎯 Performance Optimizations

- **Code Splitting**: React.lazy() for routes
- **Image Optimization**: WebP with fallbacks
- **Video Backgrounds**: Mobile fallback to gradients
- **Bundle Analysis**: Use `vite-bundle-visualizer`
- **Caching**: Service worker ready

---

## 📦 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "@supabase/supabase-js": "^2.45.4",
  "@heroui/react": "latest",
  "lucide-react": "^0.446.0",
  "tailwindcss": "^3.4.13",
  "vite": "^5.4.20"
}
```

---

## 🆘 Troubleshooting

### **Common Issues**

**Port already in use**

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
yarn dev --port 3001
```

**Type errors after dependency update**

```bash
# Clear node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install
```

**Build fails**

```bash
# Check TypeScript errors
yarn type-check

# Check for linter issues
yarn lint
```

---

## 👥 Team Contacts

- **CTO**: Technical architecture and strategy
- **Frontend Lead**: Component library and design system
- **Backend Lead**: API integration and Supabase

---

**Status**: ✅ Production Ready  
**Last Updated**: September 30, 2025  
**Version**: 2.0.0
