import { create } from "zustand";

interface AppStore {
    lang: string;

    setLang: (lang: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  lang: "ru",

  setLang: (lang: string) => {
    localStorage.setItem("lang", lang);
    set({ lang });
  },
}));