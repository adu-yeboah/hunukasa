import { useSyncExternalStore } from "react";

import { ALL_UNITS, lessonCount, TOTAL_LESSONS } from "./twi-course";

/* Progress store — vanilla external store persisted to localStorage.
   (Dependency-free on purpose; swap for zustand when the shared package
   lands in Phase 1.) Lesson ids: "twi-<stage>-<unit>-<lesson>" and
   "twi-<stage>-<unit>-cp" for checkpoints. */

export type ProgressState = { completed: Record<string, true>; xp: number };

let state: ProgressState = read();
const listeners = new Set<() => void>();

function read(): ProgressState {
  if (typeof window === "undefined") return { completed: {}, xp: 0 };
  try {
    const raw = localStorage.getItem("hunukasa-progress-v2");
    if (raw) return JSON.parse(raw) as ProgressState;
  } catch {
    /* ignore */
  }
  return { completed: {}, xp: 0 };
}

function persist() {
  try {
    localStorage.setItem("hunukasa-progress-v2", JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const EMPTY: ProgressState = { completed: {}, xp: 0 };

export function useProgress() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY
  );
}

export function completeLesson(id: string, xp: number) {
  state = {
    completed: { ...state.completed, [id]: true },
    xp: state.xp + xp,
  };
  persist();
}

export function resetProgress() {
  state = { completed: {}, xp: 0 };
  persist();
}

/* ── derived path position ── */
export type PathInfo = {
  doneUnits: number;
  activeIndex: number;
  activeLessonId: string;
  activeCheckpointId: string;
  allDone: boolean;
};

const unitLessonIds = (unitId: string) => {
  const u = ALL_UNITS.find((x) => x.id === unitId)!;
  return Array.from({ length: lessonCount(u) }, (_, i) => `${unitId}-${i}`);
};

const isUnitDone = (unitId: string, completed: Record<string, true>) =>
  unitLessonIds(unitId).every((id) => completed[id]) && completed[`${unitId}-cp`];

export function pathProgress(completed: Record<string, true>): PathInfo {
  const doneUnits = ALL_UNITS.filter((u) => isUnitDone(u.id, completed)).length;
  let active = ALL_UNITS.findIndex((u) => !isUnitDone(u.id, completed));
  const allDone = active === -1;
  if (allDone) active = ALL_UNITS.length - 1;

  const unit = ALL_UNITS[active];
  const lIdx = Array.from({ length: lessonCount(unit) }, (_, i) => i).find((i) => !completed[`${unit.id}-${i}`]) ?? 0;

  return {
    doneUnits,
    activeIndex: active,
    activeLessonId: `${unit.id}-${lIdx}`,
    activeCheckpointId: `${unit.id}-cp`,
    allDone,
  };
}

export const TOTAL = TOTAL_LESSONS;

export function doneLessonCount(completed: Record<string, true>) {
  return Object.keys(completed).filter((id) => !id.endsWith("-cp")).length;
}
