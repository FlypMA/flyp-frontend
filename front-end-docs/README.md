# 🚀 Upswitch Frontend Documentation

**Modern React TypeScript application for Europe's premier SME M&A platform**

---

## 📋 Quick Start

```bash
# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
yarn dev

# Build for production
yarn build
```

## 🏗️ Architecture Overview

### **Tech Stack**

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS + HeroUI Components
- **State Management**: React Context + Zustand
- **Authentication**: Supabase Auth
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library

### **Project Structure**

```
src/
├── app/                    # 🏠 Application Shell
│   ├── layouts/           # Page layouts (Main, Auth, Dashboard)
│   ├── pages/             # Route-based page components
│   ├── providers/         # Context providers (Auth, UI)
│   ├── routing/           # Router configuration & guards
│   └── services/          # App-level services
│
├── features/              # 🎯 Business Domain Features
│   ├── authentication/   # Login, signup, auth modals
│   ├── business/         # Business dashboard & analytics
│   └── listings/         # Listing management
│
├── shared/               # 🔄 Reusable Resources
│   ├── components/       # UI components & design system
│   ├── services/         # API services & utilities
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper functions & utilities
│
├── config/              # ⚙️ Configuration
└── assets/              # 📁 Static assets
```

---

## 🛠️ Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `yarn dev`        | Start development server with HMR |
| `yarn build`      | Build optimized production bundle |
| `yarn type-check` | Run TypeScript type checking      |
| `yarn lint`       | Lint code with ESLint             |
| `yarn test`       | Run unit tests with Vitest        |

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
```

---

## 📱 Key Features

- **Authentication System**: Supabase-powered with role-based access
- **Business Marketplace**: Advanced search and filtering
- **Seller Dashboard**: Business analytics and listing management
- **Responsive Design**: Mobile-first with smooth animations

---

## 📚 Additional Documentation

- **[Architecture Details](./ARCHITECTURE_OVERVIEW.md)** - Detailed architecture patterns
- **[Development Guide](./DEVELOPMENT_GUIDE.md)** - Development workflows

---

**Status**: ✅ Production Ready  
**Last Updated**: September 2025
