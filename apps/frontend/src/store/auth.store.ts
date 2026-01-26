import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  id: string;
  username: string;
  email: string;
  image?: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  token: string | null;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user, token) => set({ user, isAuthenticated: true, token }),
        logout: () => set({ user: null, isAuthenticated: false, token: null }),
      }),
      {
        name: "auth-storage",
      }
    ), {
      enabled: false
    }
  )
);
