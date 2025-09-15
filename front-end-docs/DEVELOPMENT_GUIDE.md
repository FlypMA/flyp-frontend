# 🛠️ **Frontend Development Guide**
**Essential Guidelines for BetweenDeals Development Teams**

**Updated:** September 11, 2025  
**Target Audience:** Frontend Developers, Team Leads, New Team Members  
**Purpose:** Practical development guidelines and best practices

---

## 🚀 **Getting Started**

### **📋 Prerequisites**
- Node.js 18+ 
- npm or yarn
- VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript Hero
  - Auto Rename Tag

### **⚡ Quick Setup**
```bash
# Clone and setup
git clone [repository-url]
cd betweendeals-frontend
npm install

# Start development
npm run dev

# Open in browser: http://localhost:3000
```

---

## 🏗️ **Feature Development Workflow**

### **1. Creating a New Feature**

#### **Step 1: Create Feature Structure**
```bash
# Create feature directory
mkdir -p src/features/your-feature/{components,pages,services,hooks,types}

# Create index file
touch src/features/your-feature/index.ts
```

#### **Step 2: Feature Index Template**
```typescript
// src/features/your-feature/index.ts
export { YourMainComponent } from './components/YourMainComponent';
export { YourPage } from './pages/YourPage';
export { yourService } from './services/yourService';
export type { YourFeatureTypes } from './types/yourFeature.types';

// Re-export everything for convenience
export * from './components';
export * from './pages';
export * from './services';
export * from './types';
```

#### **Step 3: Add to Main Features Export**
```typescript
// src/features/index.ts
export * from './your-feature';
```

### **2. Component Development**

#### **Component Template**
```typescript
// src/features/your-feature/components/YourComponent.tsx
import React from 'react';
import { Button, Input } from '@shared/components/design-system';

interface YourComponentProps {
  title: string;
  onAction: () => void;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  title,
  onAction,
}) => {
  return (
    <div className="your-component">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Button onClick={onAction} variant="primary">
        Take Action
      </Button>
    </div>
  );
};
```

#### **Page Component Template**
```typescript
// src/features/your-feature/pages/YourPage.tsx
import React from 'react';
import { YourComponent } from '../components/YourComponent';

export const YourPage: React.FC = () => {
  const handleAction = () => {
    // Page-level logic
  };

  return (
    <div className="page-container">
      <YourComponent 
        title="Your Feature"
        onAction={handleAction}
      />
    </div>
  );
};
```

### **3. Service Development**

#### **Service Template**
```typescript
// src/features/your-feature/services/yourService.ts
import { apiClient } from '@shared/services/apiClient';
import { YourFeatureData } from '../types/yourFeature.types';

export const yourService = {
  async fetchData(): Promise<YourFeatureData[]> {
    const response = await apiClient.get('/your-endpoint');
    return response.data;
  },

  async createItem(data: Partial<YourFeatureData>): Promise<YourFeatureData> {
    const response = await apiClient.post('/your-endpoint', data);
    return response.data;
  },

  async updateItem(id: string, data: Partial<YourFeatureData>): Promise<YourFeatureData> {
    const response = await apiClient.put(`/your-endpoint/${id}`, data);
    return response.data;
  },

  async deleteItem(id: string): Promise<void> {
    await apiClient.delete(`/your-endpoint/${id}`);
  },
};
```

---

## 🎨 **Component Guidelines**

### **🔧 When to Create Shared vs Feature Components**

#### **✅ Create in `shared/components/` when:**
- Component is reused across 3+ features
- Part of design system (buttons, inputs, modals)
- Common UI patterns (layouts, navigation)
- No feature-specific business logic

#### **✅ Create in `features/[feature]/components/` when:**
- Contains feature-specific business logic
- Uses feature-specific data structures
- Part of feature-specific user workflows
- Unlikely to be reused elsewhere

### **🎯 Component Patterns**

#### **Container/Presentational Pattern**
```typescript
// Container Component (handles logic)
export const LoginContainer: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <LoginForm
      credentials={credentials}
      onCredentialsChange={setCredentials}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

// Presentational Component (handles UI)
interface LoginFormProps {
  credentials: LoginCredentials;
  onCredentialsChange: (credentials: LoginCredentials) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  credentials,
  onCredentialsChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Form UI */}
    </form>
  );
};
```

#### **Custom Hook Pattern**
```typescript
// src/features/authentication/hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const user = await authService.login(credentials);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, login, isLoading };
};
```

---

## 🎯 **State Management Guidelines**

### **📊 State Organization Levels**

#### **1. Component State (useState)**
```typescript
// ✅ Use for: UI state, form inputs, local toggles
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });
```

#### **2. Feature State (Context/Custom Hooks)**
```typescript
// ✅ Use for: Feature-wide state, complex business logic
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  
  return (
    <AuthContext.Provider value={{ user, permissions, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### **3. Global State (App-level Context/Store)**
```typescript
// ✅ Use for: App-wide state, cross-feature data
// Handled by app-level providers in src/app/providers/
```

---

## 🧪 **Testing Guidelines**

### **📋 Testing Strategy**

#### **Component Testing**
```typescript
// YourComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  test('renders title correctly', () => {
    render(<YourComponent title="Test Title" onAction={jest.fn()} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('calls onAction when button clicked', () => {
    const mockAction = jest.fn();
    render(<YourComponent title="Test" onAction={mockAction} />);
    
    fireEvent.click(screen.getByText('Take Action'));
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
```

#### **Service Testing**
```typescript
// yourService.test.ts
import { yourService } from './yourService';
import { apiClient } from '@shared/services/apiClient';

jest.mock('@shared/services/apiClient');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('yourService', () => {
  test('fetchData returns data correctly', async () => {
    const mockData = [{ id: '1', name: 'Test' }];
    mockedApiClient.get.mockResolvedValue({ data: mockData });

    const result = await yourService.fetchData();
    
    expect(result).toEqual(mockData);
    expect(mockedApiClient.get).toHaveBeenCalledWith('/your-endpoint');
  });
});
```

---

## 🎨 **Styling Guidelines**

### **🎯 Tailwind CSS Patterns**

#### **Component Styling**
```typescript
// ✅ Use Tailwind utility classes
export const Card = ({ children, variant = 'default' }) => {
  const baseClasses = 'rounded-lg border p-6';
  const variantClasses = {
    default: 'bg-white border-gray-200',
    highlighted: 'bg-blue-50 border-blue-200',
    error: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};
```

#### **Responsive Design**
```typescript
// ✅ Mobile-first responsive design
<div className="
  grid grid-cols-1 gap-4     // Mobile: single column
  md:grid-cols-2             // Tablet: two columns  
  lg:grid-cols-3             // Desktop: three columns
  xl:grid-cols-4             // Large: four columns
">
```

### **🎨 Design System Usage**
```typescript
// ✅ Use design system components
import { Button, Input, Modal } from '@shared/components/design-system';
import { colors, typography } from '@shared/components/design-system/tokens';

// ✅ Use design tokens
const customStyle = {
  color: colors.primary[600],
  fontSize: typography.fontSize.lg,
};
```

---

## 📦 **Performance Guidelines**

### **⚡ Optimization Techniques**

#### **Code Splitting**
```typescript
// ✅ Lazy load pages
const DashboardPage = lazy(() => 
  import('@features/business-dashboard/pages/DashboardPage')
);

// ✅ Use Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
</Suspense>
```

#### **Component Optimization**
```typescript
// ✅ Memoize expensive components
export const ExpensiveList = React.memo(({ items }) => {
  return (
    <div>
      {items.map(item => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  );
});

// ✅ Memoize expensive calculations
const processedData = useMemo(() => {
  return items.map(item => expensiveProcessing(item));
}, [items]);
```

---

## 🔧 **Common Development Tasks**

### **🔄 Adding Routes**
```typescript
// 1. Create route in appropriate feature
// src/features/your-feature/routes.tsx
export const yourFeatureRoutes = [
  {
    path: '/your-feature',
    element: <YourFeaturePage />,
  },
  {
    path: '/your-feature/:id',
    element: <YourFeatureDetailPage />,
  },
];

// 2. Add to main router
// src/app/routes/index.ts
import { yourFeatureRoutes } from '@features/your-feature/routes';

export const routes = [
  ...authRoutes,
  ...marketplaceRoutes,
  ...yourFeatureRoutes, // Add here
];
```

### **🌐 API Integration**
```typescript
// 1. Define API types
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// 2. Create service method
export const fetchUserData = async (userId: string): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  return response.data.data;
};

// 3. Use in component
const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (!user) return <ErrorMessage />;

  return <UserDetails user={user} />;
};
```

---

## 🚀 **Deployment Preparation**

### **🔍 Pre-deployment Checklist**
```bash
# 1. Run all quality checks
npm run lint          # Check code quality
npm run type-check    # Verify TypeScript
npm run test          # Run test suite
npm run build         # Test production build

# 2. Performance checks
npm run analyze       # Bundle size analysis
npm run lighthouse    # Performance audit

# 3. Security checks
npm audit             # Dependency vulnerabilities
npm run security-check # Custom security rules
```

### **🏗️ Build Optimization**
```typescript
// vite.config.ts optimization
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@heroui/react'],
        },
      },
    },
  },
});
```

---

## 🆘 **Troubleshooting**

### **🔧 Common Issues**

#### **Import Resolution**
```typescript
// ❌ Problem: Module not found
import { Component } from '../../../shared/components/Component';

// ✅ Solution: Use path aliases
import { Component } from '@shared/components/Component';
```

#### **Type Errors**
```typescript
// ❌ Problem: Type 'unknown' error
const data = await apiCall();

// ✅ Solution: Proper typing
const data: YourDataType = await apiCall();
```

#### **Build Errors**
```bash
# Common build issues and solutions
npm run clean         # Clear build cache
npm install           # Reinstall dependencies
npm run type-check    # Check for TypeScript errors
```

---

## 📚 **Additional Resources**

### **📖 Documentation Links**
- **Main README:** Repository overview and quick start
- **Architecture Guide:** `HYBRID_ARCHITECTURE_STRATEGY.md`
- **Naming Conventions:** `CLEAN_NAMING_CONVENTION.md`
- **Development Setup:** `DEVELOPMENT_CONFIGURATION_SUCCESS_REPORT.md`

### **🛠️ Useful VS Code Snippets**
```json
// .vscode/snippets.json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:Component}Props {",
      "  $2",
      "}",
      "",
      "export const ${1:Component}: React.FC<${1:Component}Props> = ({",
      "  $3",
      "}) => {",
      "  return (",
      "    <div>",
      "      $4",
      "    </div>",
      "  );",
      "};"
    ]
  }
}
```

---

**Status:** ✅ **Ready for Development**  
**Architecture:** 🏗️ **Feature-First + Hybrid Components**  
**Quality:** 🏆 **Enterprise Standards**

**Follow this guide for consistent, high-quality development that aligns with our enterprise-grade architecture standards.**

