import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CURRICULUM, type Lang } from "./curriculum";
import { lessonId } from "./lesson";

/* Progress storepersisted (AsyncStorage / localStorage), offline-first.
   Lesson ids are "lang/section/unit/lesson". Derived selectors compute the
   active unit from the completed set, so the path always reflects reality. */

type ProgressState = {
  completed: Record<string, true>;
  xp: number;
  completeLesson: (id: string, xp: number) => void;
  reset: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completed: {},
      xp: 0,
      completeLesson: (id, xp) =>
        set((s) => ({ completed: { ...s.completed, [id]: true }, xp: s.xp + xp })),
      reset: () => set({ completed: {}, xp: 0 }),
    }),
    { name: "hunukasa-progress", storage: createJSONStorage(() => AsyncStorage) }
  )
);

type UnitRef = { sIdx: number; uIdx: number; lessonCount: number };

function unitsOf(lang: Lang): UnitRef[] {
  return CURRICULUM[lang].sections.flatMap((sec, sIdx) =>
    sec.units.map((u, uIdx) => ({ sIdx, uIdx, lessonCount: u.lessons.length }))
  );
}

const isUnitDone = (lang: Lang, ref: UnitRef, completed: Record<string, true>) =>
  Array.from({ length: ref.lessonCount }, (_, lIdx) => `${lessonId(lang, ref.sIdx, ref.uIdx, lIdx)}`).every(
    (id) => completed[id]
  );

export type PathProgressInfo = {
  doneUnits: number;
  activeIndex: number; // global unit index
  activeLessonId: string;
  allDone: boolean;
};

/** derive the path position: the active unit is the first one with any
 *  incomplete lesson; its first incomplete lesson is what the node opens. */
export function usePathProgress(lang: Lang): PathProgressInfo {
  const completed = useProgressStore((s) => s.completed);
  return pathProgress(lang, completed);
}

export function pathProgress(lang: Lang, completed: Record<string, true>): PathProgressInfo {
  const units = unitsOf(lang);
  const doneUnits = units.filter((u) => isUnitDone(lang, u, completed)).length;
  let active = units.findIndex((u) => !isUnitDone(lang, u, completed));
  const allDone = active === -1;
  if (allDone) active = units.length - 1;

  const ref = units[active];
  const lIdx = Array.from({ length: ref.lessonCount }, (_, i) => i).find(
    (i) => !completed[`${lessonId(lang, ref.sIdx, ref.uIdx, i)}`]
  ) ?? 0;

  return {
    doneUnits,
    activeIndex: active,
    activeLessonId: `${lessonId(lang, ref.sIdx, ref.uIdx, lIdx)}`,
    allDone,
  };
}

/** global unit index → the active unit's first incomplete lesson id */
export function firstIncompleteLessonId(lang: Lang, activeIndex: number, completed: Record<string, true>): string {
  const units = unitsOf(lang);
  const ref = units[Math.min(activeIndex, units.length - 1)];
  const lIdx =
    Array.from({ length: ref.lessonCount }, (_, i) => i).find(
      (i) => !completed[`${lessonId(lang, ref.sIdx, ref.uIdx, i)}`]
    ) ?? 0;
  return `${lessonId(lang, ref.sIdx, ref.uIdx, lIdx)}`;
}
