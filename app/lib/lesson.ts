import { CURRICULUM, type Lang } from "./curriculum";

/* Exercise generationderives select exercises from the curriculum's
   `Twi · English` lesson titles, with distractors drawn from the same unit.
   Hand-authored ExerciseDefs replace these in Phase 1.4; the engine API
   (types + call sites) stays identical. */

export type Exercise = {
  kind: "select";
  prompt: string;
  answer: string;
  options: string[];
  explain: string;
};

export function parseTitle(title: string): [string, string] {
  const i = title.indexOf(" · ");
  if (i === -1) return [title, title];
  return [title.slice(0, i), title.slice(i + 3)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool: [string, string][], exclude: string, dir: "term" | "gloss", count: number): string[] {
  const idx = dir === "term" ? 0 : 1;
  return shuffle(pool.filter((p) => p[idx] !== exclude)).slice(0, count).map((p) => p[idx]);
}

export function getLessonExercises(lang: Lang, sIdx: number, uIdx: number, lIdx: number): Exercise[] {
  const unit = CURRICULUM[lang].sections[sIdx]?.units[uIdx];
  const title = unit?.lessons[lIdx];
  if (!title) return [];
  const [term, gloss] = parseTitle(title);
  const pool = unit.lessons.map(parseTitle).filter(([t]) => t !== term);
  const rotated = [...pool.slice(lIdx % Math.max(pool.length, 1)), ...pool.slice(0, lIdx % Math.max(pool.length, 1))];

  const termQ = (n: number): Exercise => ({
    kind: "select",
    prompt: `How do you say “${gloss}”?`,
    answer: term,
    options: shuffle([term, ...pickDistractors(pool, term, "term", 3)]),
    explain: `“${term}” means ${gloss}.`,
  });
  const glossQ = (n: number): Exercise => ({
    kind: "select",
    prompt: `What does “${term}” mean?`,
    answer: gloss,
    options: shuffle([gloss, ...pickDistractors(pool, gloss, "gloss", 3)]),
    explain: `“${term}” means ${gloss}.`,
  });

  void rotated;
  return [
    termQ(0),
    glossQ(1),
    termQ(2),
    glossQ(3),
    termQ(4),
  ];
}

export type LessonRef = { lang: Lang; sIdx: number; uIdx: number; lIdx: number; id: string };

/* dash-separated idssafe as a single dynamic-route segment */
export function lessonId(lang: Lang, sIdx: number, uIdx: number, lIdx: number): string {
  return `${lang}-${sIdx}-${uIdx}-${lIdx}`;
}

export function parseLessonId(id: string): LessonRef | null {
  const [lang, s, u, l] = id.split("-");
  if ((lang !== "twi" && lang !== "ewe" && lang !== "ga") || [s, u, l].some((n) => n === undefined || Number.isNaN(Number(n)))) {
    return null;
  }
  return { lang, sIdx: Number(s), uIdx: Number(u), lIdx: Number(l), id };
}

/* review mode: "review-twi" builds a mixed quiz from every completed word */
export function collectLearnedWords(lang: Lang, completed: Record<string, true>): [string, string][] {
  return Object.keys(completed)
    .filter((id) => id.startsWith(lang + "-"))
    .map((id) => {
      const ref = parseLessonId(id);
      if (!ref) return null;
      const title = CURRICULUM[lang].sections[ref.sIdx]?.units[ref.uIdx]?.lessons[ref.lIdx];
      return title ? parseTitle(title) : null;
    })
    .filter((p): p is [string, string] => p !== null);
}

export function buildReviewExercises(lang: Lang, completed: Record<string, true>): Exercise[] {
  const words = shuffle(collectLearnedWords(lang, completed)).slice(0, 5);
  return words.map(([term, gloss], i) =>
    i % 2 === 0
      ? {
          kind: "select" as const,
          prompt: `How do you say “${gloss}”?`,
          answer: term,
          options: shuffle([term, ...pickDistractors(words, term, "term", 3)]),
          explain: `“${term}” means ${gloss}.`,
        }
      : {
          kind: "select" as const,
          prompt: `What does “${term}” mean?`,
          answer: gloss,
          options: shuffle([gloss, ...pickDistractors(words, gloss, "gloss", 3)]),
          explain: `“${term}” means ${gloss}.`,
        }
  );
}
