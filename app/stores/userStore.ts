import { create } from 'zustand';
import { User } from '../types';


interface UserStore {
    currentUser: User | null;
    setCurrentUser: (user: User) => void;
    logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
}))