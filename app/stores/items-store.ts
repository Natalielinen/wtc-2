import { create } from "zustand";
import { Item } from "../types";
import { getUserItems } from "@/server/actions/user-items";

interface ItemsStore {
  items: Item[];

  setItems: (items: Item[]) => void;

  fetchItems: (userId: string) => Promise<void>;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  items: [],
  setItems: (items: Item[]) => set({ items }),

  fetchItems: async (userId: string) => {
    const res = await getUserItems(userId);

    set({ items: res });
  },
}));
