# 🌟 BetweenDeals Frontend

**React-based web application for Europe's premier SME M&A platform**

BetweenDeals Frontend is the user-facing interface for the BetweenDeals platform, providing an intuitive experience for SME business buying, selling, and valuation. Built with modern React technologies and optimized for performance, it delivers a seamless user experience for business owners and investors across Europe.

## 🎯 Overview

BetweenDeals Frontend serves as the primary interface for Europe's premier SME M&A platform, enabling users to:

- **Browse and Search** business opportunities across Europe
- **Create and Manage** business listings for sale
- **Access Professional Valuations** and market insights
- **Communicate Securely** with potential buyers/sellers
- **Manage Transactions** through the complete M&A process
- **Access Analytics** and performance metrics

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                BetweenDeals Frontend                        │
├─────────────────────────────────────────────────────────────┤
│  React 18 + TypeScript + HeroUI + TailwindCSS + Vite       │
│  • Business Listing Management                             │
│  • Secure Transaction Processing                           │
│  • User Authentication & Profiles                          │
│  • Real-time Messaging & Notifications                     │
│  • Business Valuation Tools                                │
│  • Mobile-Responsive Design                                │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                BetweenDeals Backend                         │
│  • API Gateway & Authentication                            │
│  • Business Logic & Data Management                        │
│  • Payment Processing & Verification                       │
│  • Real-time Communication Services                        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### **Prerequisites**

- **Node.js** 18+
- **Yarn** or **npm**
- **Ilara Backend Services** (Saturn, Artemis, Aphrodite)

### **Development Setup**

```bash
# Navigate to Mercury directory
cd Ilara-mercury

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### **Production Build**

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Key Features

### **Conversational AI Interface**

- **Natural Language Queries**: Ask about trends in plain English
- **Smart Suggestions**: Popular queries and trending topics
- **Context Awareness**: AI remembers conversation history
- **Real-time Responses**: Instant trend analysis and insights

### **Professional Report Generation**

- **AI-Generated Reports**: Beautiful HTML reports with charts
- **Instant Preview**: Live report preview with source code
- **Export Options**: Shareable and downloadable reports
- **Custom Templates**: Branded and customizable reports

### **User Experience**

- **Mobile Responsive**: Works perfectly on all devices
- **Dark Mode**: Modern, eye-friendly interface
- **Hot Reloading**: Instant feedback during development
- **Error Handling**: Graceful error states and recovery

### **Authentication & Management**

- **User Registration**: Seamless signup and onboarding
- **Subscription Management**: Plan upgrades and billing
- **Profile Settings**: User preferences and account management
- **Session Management**: Secure authentication flow

## 🔧 Technology Stack

### **Core Framework**

- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type safety and developer experience
- **Vite**: Lightning-fast build tool and dev server
- **HeroUI**: Professional component library

### **Styling & UI**

- **Tailwind CSS**: Utility-first CSS framework
- **HeroUI Components**: Pre-built, accessible components
- **Lucide Icons**: Beautiful, consistent iconography
- **Responsive Design**: Mobile-first approach

### **State Management**

- **React Hooks**: Local state management
- **Context API**: Global state and theme management
- **Custom Hooks**: Reusable business logic
- **URL State**: Route-based state management

### **Development Tools**

- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Vitest**: Unit testing framework
- **TypeScript**: Static type checking

## 📁 Project Structure

```
src/
├── app/                    # Main application code
│   ├── pages/             # Page components
│   │   ├── landingPages/  # Marketing pages
│   │   ├── account/       # User account pages
│   │   └── error/         # Error pages
│   ├── components/        # Reusable components
│   │   ├── chat/          # Chat interface components
│   │   ├── reports/       # Report generation components
│   │   ├── layout/        # Layout components
│   │   └── main_UI/       # Core UI components
│   ├── services/          # API and business logic
│   │   ├── api/           # API service layer
│   │   ├── chat/          # Chat service integration
│   │   └── reports/       # Report generation services
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── assets/                # Static assets
│   ├── video/             # Background videos
│   └── images/            # Images and icons
├── styles/                # Global styles
└── main.tsx              # Application entry point
```

## 🎯 Key Components

### **Chat Interface (MCPChatUI)**

- **Real-time Messaging**: Live chat with AI
- **Message History**: Persistent conversation state
- **File Uploads**: Support for content analysis
- **Typing Indicators**: Real-time feedback

### **Report Generation (PreviewPanel)**

- **Live Preview**: Real-time report rendering
- **Source Code View**: HTML source inspection
- **Export Options**: Download and sharing
- **Responsive Design**: Mobile-optimized viewing

### **Dashboard (Dashboard)**

- **Service Orchestration**: Coordinates all features
- **Panel Management**: Resizable chat and preview panels
- **Mobile Support**: Adaptive layout for mobile devices
- **Error Boundaries**: Graceful error handling

### **Authentication (AuthModals)**

- **Login/Signup**: User authentication flow
- **Social Login**: OAuth integration
- **Password Reset**: Account recovery
- **Session Management**: Token handling

## 🔄 Data Flow

### **User Query Flow**

```
User Input → Chat Component → API Service → Saturn Backend → Artemis AI → Response → UI Update
```

### **Report Generation Flow**

```
Chat Message → Dashboard → Report Service → HTML Generation → Preview Panel → User
```

### **Authentication Flow**

```
User Login → Auth Modal → Supabase Auth → JWT Token → Session Context → Protected Routes
```

## 🎨 UI/UX Design

### **Design Principles**

- **Conversational**: Natural, chat-based interaction
- **Predictive**: AI-powered insights and suggestions
- **Professional**: Clean, modern interface
- **Accessible**: WCAG compliant design

### **Color Scheme**

- **Primary**: Purple/Blue gradient for brand identity
- **Background**: Dark theme for content focus
- **Accent**: White and gray for contrast
- **Status**: Green for success, red for errors

### **Typography**

- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, comfortable spacing
- **Code**: Monospace for technical content
- **Icons**: Lucide icons for consistency

## 🧪 Testing

### **Unit Tests**

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### **Component Testing**

- **React Testing Library**: Component behavior testing
- **Vitest**: Fast test runner
- **Mock Services**: Isolated testing environment
- **Accessibility Testing**: Screen reader compatibility

### **E2E Testing**

- **Playwright**: End-to-end testing
- **User Flows**: Critical path testing
- **Cross-browser**: Multi-browser compatibility
- **Mobile Testing**: Responsive design validation

## 🚀 Deployment

### **Development**

```bash
# Start development server
npm run dev

# Check for issues
npm run lint
npm run type-check
```

### **Production**

```bash
# Build for production
npm run build

# Deploy to Vercel
npm run deploy

# Deploy to Railway
npm run deploy:railway
```

### **Environment Variables**

```bash
# Required environment variables
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
VITE_APP_ENV=development
```

## 📊 Performance

### **Optimization Features**

- **Code Splitting**: Lazy-loaded components
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP and responsive images
- **Caching**: Service worker for offline support

### **Performance Metrics**

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

### **Frontend Security**

- **Input Validation**: Client-side validation
- **XSS Prevention**: Content sanitization
- **CSRF Protection**: Token-based protection
- **Secure Headers**: Security-focused configuration

### **Authentication Security**

- **JWT Tokens**: Secure session management
- **Token Refresh**: Automatic token renewal
- **Secure Storage**: Encrypted local storage
- **Logout Handling**: Proper session cleanup

## 🐛 Troubleshooting

### **Common Issues**

#### **Development Server Not Starting**

```bash
# Check port availability
lsof -i :3000

# Clear cache and restart
npm run clean
npm install
npm run dev
```

#### **Build Failures**

```bash
# Check TypeScript errors
npm run type-check

# Fix linting issues
npm run lint:fix

# Clear build cache
rm -rf dist/
npm run build
```

#### **API Connection Issues**

```bash
# Verify backend services
npm run status

# Check environment variables
echo $VITE_API_URL

# Test API connectivity
curl http://localhost:3001/health
```

## 🤝 Contributing

### **Development Guidelines**

1. **Follow TypeScript**: Strict type checking
2. **Component Structure**: Consistent file organization
3. **Testing**: Write tests for new features
4. **Accessibility**: WCAG compliance
5. **Performance**: Optimize for speed

### **Code Quality**

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Run tests
npm run test
```

## 📚 Resources

### **Documentation**

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [HeroUI Components](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Related Services**

- **[Saturn](./../Ilara-saturn/)**: Backend API service
- **[Artemis](./../ilara-artemis/)**: AI processing service
- **[Aphrodite](./../ilara-aphrodite/)**: Trend data service

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: Production Ready
