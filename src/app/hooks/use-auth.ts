// 🔐 Shared Auth Hook - Centralized authentication access
// Re-exports authentication functionality for shared use across features

export {
  useSimpleAuth as useAuth,
  SimpleAuthProvider as AuthProvider,
} from '@auth/services/SimpleAuthContext';
