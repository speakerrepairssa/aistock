import { create } from 'zustand';
import { User } from '../types';
import { authService } from '../services';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      await authService.login(email, password);
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        loading: false,
      });
      throw error;
    }
  },

  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      await authService.register(email, password);
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        loading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Logout failed',
        loading: false,
      });
      throw error;
    }
  },

  initializeAuth: () => {
    set({ loading: true });
    const unsubscribe = authService.onAuthStateChanged((user) => {
      set({ user, loading: false });
    });
    return unsubscribe;
  },
}));
