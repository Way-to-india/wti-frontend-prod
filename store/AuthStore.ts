import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  token: string | null; // Add token
  isAuthenticated: boolean;
  isLoading: boolean; 
  login: (user: User, token: string) => void; // Update to accept token
  logout: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null, 
      isAuthenticated: false,
      isLoading: true, 
      
      login: (user, token) => set({ 
        user, 
        token,
        isAuthenticated: true,
        isLoading: false 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        isLoading: false 
      }),
      
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token, 
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);