import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, AppState } from '../../types';

const useStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: undefined,
        setUser: (user: User | null) => set({ user }),
        setLoading: (loading: boolean) => set({ loading }),
        setError: (error: string | undefined) => set({ error }),
        logout: () => set({ user: null, isAuthenticated: false }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'app-storage',
      }
    )
  )
);

export default useStore;
