import { create } from "zustand";

interface AuthState {
  isSignIn: boolean;
  toggle: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isSignIn: true,
  toggle: () => set((state) => ({ isSignIn: !state.isSignIn })),
}));

export default useAuthStore;
