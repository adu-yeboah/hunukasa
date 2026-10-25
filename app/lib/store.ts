import { create } from "zustand";

import type { Lang } from "./theme";

/* Active language pickset on the login screen, read by the path,
   practice, profile and lesson screens. Persisted in Phase 2 (profiles). */
type LangState = { lang: Lang; setLang: (lang: Lang) => void };

export const useLangStore = create<LangState>((set) => ({
  lang: "twi",
  setLang: (lang) => set({ lang }),
}));
