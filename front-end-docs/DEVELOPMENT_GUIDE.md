# 🛠️ Development Guide

**Complete development workflow and best practices for the Flyp frontend**

**Updated:** September 2025  
**Status:** ✅ Production Ready

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 20+
- Yarn 1.22+
- VS Code (recommended)

### **Setup**

```bash
# Clone and install
git clone [repository-url]
cd flyp-frontend
yarn install

# Environment setup
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development
yarn dev
```

---

## 🏗️ Development Workflow

### **1. Environment Setup**

Create `.env.local` with required variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Development Settings
VITE_DEV_BYPASS_AUTH=false
VITE_ENVIRONMENT=development
```

### **2. Feature Development Process**

#### **Creating a New Feature**

```bash
# Create feature branch
git checkout -b feature/new-feature-name

# Create feature structure
mkdir -p src/features/new-feature/{components,hooks}
```

#### **Feature Structure Example**

```bash
src/features/authentication/
├── components/
│   ├── LoginModal.tsx
│   ├── SignupModal.tsx
│   └── forms/
│       ├── CustomInputField.tsx
│       └── CustomPasswordInputField.tsx
├── hooks/
│   └── useAuthModal.tsx
└── index.ts
```

### **3. Component Development**

#### **Shared Component Creation**

```typescript
// src/shared/components/forms/Input.tsx
interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
```

#### **Feature Component Creation**

```typescript
// src/features/authentication/components/LoginModal.tsx
import { useState } from 'react';
import { Modal } from '@heroui/react';
import { Input } from '@/shared/components/forms';
import { authService } from '@/shared/services/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authService.login(formData.email, formData.password);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </Modal>
  );
};
```

---

## 🎨 Styling Guidelines

### **Tailwind CSS Usage**

```typescript
// ✅ Good: Use Tailwind utility classes
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
  Submit
</button>

// ✅ Good: Conditional classes
<div className={`p-4 rounded-lg ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
  {message}
</div>

// ❌ Avoid: Inline styles
<button style={{ backgroundColor: '#3B82F6', padding: '8px 16px' }}>
  Submit
</button>
```

### **Responsive Design**

```typescript
// ✅ Mobile-first responsive design
<div className="w-full md:w-1/2 lg:w-1/3 p-4">
  <div className="bg-white rounded-lg shadow-md p-6">
    Content
  </div>
</div>
```

---

## 🔧 Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `yarn dev`        | Start development server with HMR |
| `yarn build`      | Build optimized production bundle |
| `yarn type-check` | Run TypeScript type checking      |
| `yarn lint`       | Lint code with ESLint             |
| `yarn lint:fix`   | Fix linting issues automatically  |
| `yarn format`     | Format code with Prettier         |
| `yarn test`       | Run unit tests with Vitest        |
| `yarn preview`    | Preview production build locally  |

---

## 🧪 Testing Strategy

### **Component Testing**

```typescript
// src/shared/components/forms/__tests__/Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with label', () => {
    render(
      <Input
        label="Email"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(
      <Input
        label="Email"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test@example.com' }
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
```

### **Feature Testing**

```typescript
// src/features/authentication/__tests__/LoginModal.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginModal } from '../components/LoginModal';

// Mock auth service
jest.mock('@/shared/services/auth', () => ({
  authService: {
    login: jest.fn()
  }
}));

describe('LoginModal', () => {
  it('submits login form', async () => {
    const onClose = jest.fn();

    render(<LoginModal isOpen={true} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
```

---

## 📋 Code Quality Standards

### **TypeScript Best Practices**

```typescript
// ✅ Good: Proper interface definitions
interface User {
  id: string;
  email: string;
  role: 'buyer' | 'seller';
  createdAt: Date;
}

// ✅ Good: Type-safe function signatures
const updateUser = (userId: string, updates: Partial<User>): Promise<User> => {
  // Implementation
};

// ✅ Good: Generic types for reusability
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

### **Import Organization**

```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@heroui/react';

// 2. Internal shared
import { Input } from '@/shared/components/forms';
import { authService } from '@/shared/services/auth';

// 3. Feature-specific
import { useAuthModal } from '../hooks/useAuthModal';

// 4. Relative imports
import './LoginModal.css';
```

### **Component Structure**

```typescript
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. Default export

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  // Hooks
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Event handlers
  const handleSubmit = async (e: React.FormEvent) => {
    // Implementation
  };

  // Render
  return (
    // JSX
  );
};

export default LoginModal;
```

---

## 🔍 Debugging Guide

### **Common Issues**

#### **Environment Variables Not Loading**

```bash
# Problem: VITE_SUPABASE_URL is undefined
# Solution: Ensure .env.local exists and restart dev server
yarn dev
```

#### **Import Path Issues**

```typescript
// Problem: Cannot resolve '@/shared/components'
// Solution: Check vite.config.ts path aliases
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### **TypeScript Errors**

```typescript
// Problem: Property 'user' does not exist on type '{}'
// Solution: Proper typing for context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
}
```

---

## 🚀 Performance Tips

### **Bundle Optimization**

```typescript
// ✅ Good: Lazy loading for routes
const BusinessOverview = lazy(() => import('@/app/pages/business/overview/BusinessOverview'));

// ✅ Good: Code splitting with dynamic imports
const loadFeature = () => import('@/features/authentication');
```

### **Component Optimization**

```typescript
// ✅ Good: Memoization for expensive operations
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);

  return <div>{processedData}</div>;
});
```

---

## 📚 Resources

### **Documentation**

- [React 18 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Supabase Docs](https://supabase.com/docs)

### **VS Code Extensions**

- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier - Code formatter
- Auto Rename Tag

---

**This guide covers the essential development practices for building and maintaining the Flyp frontend application efficiently.**
