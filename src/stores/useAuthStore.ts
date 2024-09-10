import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  perfil: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) =>
        set({
          user,
          token,
        }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // Nombre clave para el localStorage
      getStorage: () => localStorage, // El almacenamiento a utilizar (localStorage)
    }
  )
);

export default useAuthStore;
