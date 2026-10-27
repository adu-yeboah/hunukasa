import { unitWords, type Vocab } from "./twi-course";

/* Exercise generation from the verified unit vocabulary. Select-only today;
   the ladder engines (listen/build/culture/speak) hang off the same shapes. */

export type Exercise = {
  kind: "select";
  prompt: string;
  answer: string;
  options: string[];
  explain: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function parseTitle(title: string): [string, string] {
  const i = title.indexOf(" · ");
  return i === -1 ? [title, title] : [title.slice(0, i), title.slice(i + 3)];
}

function distractors(pool: Vocab[], exclude: string, side: "term" | "gloss", n: number) {
  return shuffle(pool.filter((w) => w[side] !== exclude))
    .slice(0, n)
    .map((w) => w[side]);
}

const fromVocab = (words: Vocab[], lIdx: number): Exercise[] => {
  const out: Exercise[] = [];
  words.forEach((w, i) => {
    const termToGloss = i % 2 === 0;
    out.push({
      kind: "select",
      prompt: termToGloss ? `How do you say “${w.gloss}”?` : `What does “${w.term}” mean?`,
      answer: termToGloss ? w.term : w.gloss,
      options: shuffle([
        termToGloss ? w.term : w.gloss,
        ...distractors(words, termToGloss ? w.term : w.gloss, termToGloss ? "term" : "gloss", 3),
      ]),
      explain: `“${w.term}” means ${w.gloss}.`,
    });
  });
  return out.slice(0, Math.max(5, Math.min(8, words.length + lIdx)));
};

export function getLessonExercises(unitId: string, lIdx: number): Exercise[] {
  const words = unitWords(unitId);
  if (words.length === 0) return [];
  // rotate the word list per lesson so each lesson leads with different words
  const rotated = [...words.slice(lIdx % words.length), ...words.slice(0, lIdx % words.length)];
  return fromVocab(rotated, lIdx);
}

/* checkpoint: one exercise per word across the whole unit (cap 6) */
export function getCheckpointExercises(unitId: string): Exercise[] {
  const words = unitWords(unitId);
  return fromVocab(words, 0).slice(0, 6);
}

/* review: mixed quiz from every learned word */
export function collectLearnedWords(completed: Record<string, true>): Vocab[] {
  return Object.keys(completed)
    .filter((id) => !id.endsWith("-cp"))
    .map((id) => {
      const parts = id.split("-");
      const unitId = `${parts[0]}-${parts[1]}-${parts[2]}`;
      const lIdx = Number(parts[3]);
      const rotated = unitWords(unitId);
      return rotated[(lIdx + Number(parts[2])) % Math.max(rotated.length, 1)];
    })
    .filter((w): w is Vocab => !!w);
}

export function buildReviewExercises(completed: Record<string, true>): Exercise[] {
  const pool = shuffle(collectLearnedWords(completed)).slice(0, 6);
  return pool.map((w, i) => {
    const term = w.term, gloss = w.gloss;
    const termToGloss = i % 2 === 0;
    return {
      kind: "select" as const,
      prompt: termToGloss ? `How do you say “${gloss}”?` : `What does “${term}” mean?`,
      answer: termToGloss ? term : gloss,
      options: shuffle([
        termToGloss ? term : gloss,
        ...distractors(pool, term, termToGloss ? "term" : "gloss", 3),
      ]),
      explain: `“${w.term}” means ${w.gloss}.`,
    };
  });
}
