import type { Exercise } from "./lesson";

/* Session engine — hearts, wrong-answer requeue, XP, accuracy. */

export type SessionState = {
  queue: Exercise[];
  idx: number;
  hearts: number;
  correct: number;
  answered: number;
  picked: string | null;
  checked: boolean;
  finished: boolean;
  isCheckpoint: boolean;
};

export const MAX_HEARTS = 5;

export function createSession(exercises: Exercise[], isCheckpoint = false): SessionState {
  return {
    queue: [...exercises],
    idx: 0,
    hearts: isCheckpoint ? Infinity : MAX_HEARTS,
    correct: 0,
    answered: 0,
    picked: null,
    checked: false,
    finished: false,
    isCheckpoint,
  };
}

export const currentExercise = (s: SessionState) => s.queue[s.idx];

export function checkAnswer(s: SessionState): SessionState {
  if (s.checked || !s.picked) return s;
  const correct = s.picked === currentExercise(s)?.answer;
  return {
    ...s,
    checked: true,
    answered: s.answered + 1,
    correct: s.correct + (correct ? 1 : 0),
    hearts: correct || s.isCheckpoint ? s.hearts : Math.max(0, s.hearts - 1),
  };
}

export function next(s: SessionState): SessionState {
  if (!s.checked) return s;
  if (!s.isCheckpoint && s.hearts === 0) return { ...s, finished: true };
  const queue = [...s.queue];
  const ex = currentExercise(s);
  if (s.picked !== ex?.answer && !s.isCheckpoint) queue.push(queue[s.idx]);
  const idx = s.idx + 1;
  return { ...s, queue, idx, picked: null, checked: false, finished: idx >= queue.length };
}

export function sessionPassed(s: SessionState): boolean {
  if (!s.isCheckpoint) return s.hearts >= 0;
  return s.correct / Math.max(s.answered, 1) >= 4 / 5;
}

export const sessionXp = (s: SessionState) => 10 + 2 * s.correct;
export const sessionAccuracy = (s: SessionState) =>
  s.answered === 0 ? 100 : Math.round((s.correct / s.answered) * 100);
