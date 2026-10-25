/* Hunukasa design tokenssingle source for every non-Tailwind style
   (inline styles, SVG strokes, navigation themes). Tailwind mirrors these
   in tailwind.config.js; keep both in sync. */
export const C = {
  cream: "#F7EFDF",
  charcoal: "#2B211A",
  terracotta: "#B54B2E",
  gold: "#D9A441",
  indigo: "#1B3A6B",
  locked: "#efe6d2",
  lockedEdge: "#c9bda3",
} as const;

export type Lang = "twi" | "ewe" | "ga";

/* Nunito family (loaded in app/_layout.tsx)use for every Text.
   RN has no CSS inheritance for fontFamily, so apply explicitly. */
export const FONT = {
  regular: "Nunito_400Regular",
  semi: "Nunito_600SemiBold",
  bold: "Nunito_700Bold",
  extra: "Nunito_800ExtraBold",
  black: "Nunito_900Black",
} as const;

export const LANGUAGES: { id: Lang; native: string; lessons: number }[] = [
  { id: "twi", native: "Twi", lessons: 116 },
  { id: "ewe", native: "Ewe", lessons: 51 },
  { id: "ga", native: "Ga", lessons: 35 },
];
