import { create } from 'zustand';
import { User } from '../types';


interface UserStore {
    currentUser: User | null;
    openLoginModal: boolean;
    registerForm: boolean;
    setCurrentUser: (user: User | null) => void;
    logout: () => void;
    setOpenLoginModal: (open: boolean) => void;
    setRegisterForm: (open: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  openLoginModal: false,
  registerForm: false,
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
  setOpenLoginModal: (open: boolean) => set({ openLoginModal: open }),
  setRegisterForm: (open: boolean) => set({ registerForm: open }),
}))