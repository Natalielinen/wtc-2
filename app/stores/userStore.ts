import { create } from 'zustand';
import { User } from '../types';


interface UserStore {
    currentUser: User | null;
    openLoginModal: boolean;
    setCurrentUser: (user: User | null) => void;
    logout: () => void;
    setOpenLoginModal: (open: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  openLoginModal: false,
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
  setOpenLoginModal: (open: boolean) => set({ openLoginModal: open }),
}))