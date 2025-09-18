# flyp MVP Frontend

A modern React TypeScript application for Belgium's premier SME M&A platform. This MVP focuses on core functionality needed for business buyers and sellers to connect, browse listings, and conduct transactions.

## 🎯 MVP Scope

This application includes everything needed for a production-ready MVP:

### Core Features

- **Landing Pages**: Home, About, Pricing
- **Authentication**: Login, Register, Password Reset
- **Marketplace**: Browse businesses, detailed views, advanced search
- **Business Dashboard**: Create/manage listings, analytics, performance tracking
- **User Profiles**: Personal settings, account management
- **Messaging**: Real-time conversations between buyers and sellers

### Architecture Highlights

- **Feature-First Structure**: Organized by business domains, not technical layers
- **Modern React**: React 18, TypeScript, Vite for optimal development experience
- **Design System**: Consistent UI components with Tailwind CSS and HeroUI
- **State Management**: Context API with Zustand for complex state
- **Type Safety**: Full TypeScript coverage with strict configuration

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test
```

## 📁 Project Structure

```
src/
├── features/           # 🎯 Business domains (complete feature modules)
├── shared/            # 🔄 Reusable resources across features
├── app/               # 🏠 Application shell (providers, layouts, routing)
├── assets/            # 📁 Static assets (images, icons)
└── config/            # ⚙️ Configuration files
```

### Why This Structure?

1. **Scalability**: Features can be developed independently
2. **Maintainability**: Related code stays together
3. **Team Collaboration**: Clear ownership boundaries
4. **Code Reuse**: Shared components prevent duplication

## 🔧 Available Scripts

- `yarn dev` - Start development server with HMR
- `yarn build` - Build optimized production bundle
- `yarn type-check` - Run TypeScript type checking
- `yarn lint` - Lint code with ESLint
- `yarn lint:fix` - Fix linting issues automatically
- `yarn format` - Format code with Prettier
- `yarn test` - Run unit tests with Vitest

## 🛠 Technology Stack

### Core Framework

- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety and better DX
- **Vite** - Lightning-fast build tool and dev server

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **HeroUI** - React component library
- **Lucide Icons** - Beautiful, customizable icons
- **Framer Motion** - Animation library

### State & Data

- **React Context** - Built-in state management
- **Zustand** - Lightweight state management for complex scenarios
- **Axios** - HTTP client for API communication

### Development

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing framework

## 📱 Features Overview

### Authentication System

- JWT-based authentication
- Social login integration ready
- Password reset functionality
- Role-based access (buyer/seller)

### Business Marketplace

- Advanced search and filtering
- Business listing cards with key metrics
- Detailed business profiles
- Save/favorite functionality

### Seller Dashboard

- Create and manage business listings
- Performance analytics and insights
- Inquiry management
- Revenue tracking

### Messaging System

- Real-time conversations
- File attachments
- Message status indicators
- Conversation management

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: Primary blues with semantic colors
- **Typography**: Inter font family with consistent scales
- **Components**: Reusable UI primitives
- **Spacing**: 4px base unit system
- **Responsive**: Mobile-first responsive design

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.flyp.be
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Feature Flags
VITE_ENABLE_DEV_TOOLS=true
VITE_ENABLE_ANALYTICS=false
```

## 📦 Deployment

### Production Build

```bash
yarn build
```

### Preview Build

```bash
yarn build:preview
```

### Vercel Deployment

The application is configured for Vercel deployment with:

- Automatic deployments from main branch
- Environment variable management
- Edge function support for API routes

## 🤝 Contributing

1. Create feature branches from `main`
2. Follow the existing code structure
3. Add tests for new features
4. Run linting and type checking before commits
5. Use conventional commit messages

## 📋 Todo / Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Document management system
- [ ] Video call integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Business valuation tools

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**

```bash
yarn type-check
```

**Styling issues:**

```bash
# Clear Tailwind cache
rm -rf node_modules/.cache
yarn dev
```

**Port conflicts:**

```bash
# Use different port
yarn dev --port 3001
```

## 📞 Support

For technical support or questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs`

---

Built with ❤️ for Belgium's entrepreneurial community
