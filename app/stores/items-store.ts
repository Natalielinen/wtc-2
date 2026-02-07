import { create } from "zustand";
import { Item, Website } from "../types";
import { getUserItems } from "@/server/actions/user-items";
import { getUserWebsites } from "@/server/actions/user-websites";

interface ItemsStore {
  items: Item[];
  websites: Website[];
  websitesLoading: boolean;

  setItems: (items: Item[]) => void;

  fetchItems: (userId: string) => Promise<void>;
  fetchWebsites: (userId: string) => Promise<void>;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  items: [],
  websites: [],
  websitesLoading: false,

  setItems: (items: Item[]) => set({ items }),

  fetchItems: async (userId: string) => {
    
    const res = await getUserItems(userId);

    set({ items: res });
  },

  fetchWebsites: async (userId: string) => {
    set({ websitesLoading: true });
    const res = await getUserWebsites(userId);

    set({ websites: res, websitesLoading: false });
  },
}));
