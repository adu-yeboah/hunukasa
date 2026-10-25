import type { Exercise } from "./lesson";

/* Lesson session enginepure state machine, shared logic per
   hearts, wrong-answer requeue, XP, accuracy. */

export type SessionState = {
  queue: Exercise[];
  idx: number;
  hearts: number;
  correct: number;
  answered: number;
  picked: string | null;
  checked: boolean;
  finished: boolean;
};

export const MAX_HEARTS = 5;

export function createSession(exercises: Exercise[]): SessionState {
  return {
    queue: [...exercises],
    idx: 0,
    hearts: MAX_HEARTS,
    correct: 0,
    answered: 0,
    picked: null,
    checked: false,
    finished: false,
  };
}

export function currentExercise(s: SessionState): Exercise | undefined {
  return s.queue[s.idx];
}

/** submit the picked option → marks checked; wrong answers lose a heart
 *  and are requeued at the end by next(). */
export function checkAnswer(s: SessionState): SessionState {
  if (s.checked || !s.picked) return s;
  const ex = currentExercise(s);
  const correct = s.picked === ex?.answer;
  return {
    ...s,
    checked: true,
    answered: s.answered + 1,
    correct: s.correct + (correct ? 1 : 0),
    hearts: correct ? s.hearts : Math.max(0, s.hearts - 1),
  };
}

/** advance: wrong answers requeue at the end; finishes when the queue
 *  is exhausted or hearts run out. */
export function next(s: SessionState): SessionState {
  if (!s.checked) return s;
  const ex = currentExercise(s);
  const correct = s.picked === ex?.answer;
  if (s.hearts === 0) return { ...s, finished: true };
  const queue = [...s.queue];
  if (!correct) queue.push(queue[s.idx]); // requeue
  const idx = s.idx + 1;
  return { ...s, queue, idx, picked: null, checked: false, finished: idx >= queue.length };
}

export function sessionXp(s: SessionState): number {
  return 10 + 2 * s.correct;
}

export function sessionAccuracy(s: SessionState): number {
  return s.answered === 0 ? 100 : Math.round((s.correct / s.answered) * 100);
}
