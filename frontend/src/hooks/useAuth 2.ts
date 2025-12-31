import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

let authInitialized = false;

export const useAuth = () => {
  const authStore = useAuthStore();

  useEffect(() => {
    if (!authInitialized) {
      authInitialized = true;
      authStore.initializeAuth();
    }
  }, []);

  return {
    user: authStore.user,
    loading: authStore.loading,
    error: authStore.error,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
  };
};
