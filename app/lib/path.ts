/* Learning-path layout enginemobile port of the web prototype's
   buildPath/pathD (web/app/page.tsx). Pure functions: curriculum +
   progress → absolutely-positioned items + winding bezier segments.
   Consolidation into packages/content happens in Phase 1. */

import { CURRICULUM, type Lang } from "./curriculum";

export const GAP = 132; // vertical distance between node centers
export const OFFSETS = [0, 56, 0, -56, 0, 52]; // horizontal weave
export const HEADER_H = 76; // section banner height (subtitles wrap on mobile)
export const HEADER_GAP = 92; // room for the active node's "Start here!" badge
export const PATH_W = 260; // path column width

export type PathProgress = { doneUnits: number; activeIndex: number };

export type PathItem =
  | { kind: "header"; y: number; title: string; subtitle: string; order: number }
  | { kind: "unit"; y: number; x: number; label: string; tip: string; state: "done" | "active" | "locked"; order: number }
  | { kind: "checkpoint"; y: number; label: string; state: "done" | "locked"; order: number };

export type PathPoint = { x: number; y: number };
export type BuiltPath = { items: PathItem[]; segments: PathPoint[][]; totalH: number };

export function buildPath(lang: Lang, progress: PathProgress): BuiltPath {
  const items: PathItem[] = [];
  const segments: PathPoint[][] = [];
  let y = 20;
  let order = 0;
  let unitIdx = 0;

  for (const sec of CURRICULUM[lang].sections) {
    items.push({ kind: "header", y, title: sec.title, subtitle: sec.subtitle, order: order++ });
    y += HEADER_H + HEADER_GAP;
    const pts: PathPoint[] = [];
    sec.units.forEach((u) => {
      const x = OFFSETS[pts.length % OFFSETS.length];
      const state = unitIdx < progress.doneUnits ? "done" : unitIdx === progress.activeIndex ? "active" : "locked";
      items.push({ kind: "unit", y, x, label: u.label, tip: u.goal, state, order: order++ });
      pts.push({ x, y });
      y += GAP;
      unitIdx++;
    });
    // checkpoint is earned once every unit of this section is completed
    const cpDone = unitIdx <= progress.activeIndex;
    items.push({ kind: "checkpoint", y, label: `Checkpoint · ${sec.title}`, state: cpDone ? "done" : "locked", order: order++ });
    pts.push({ x: 0, y });
    y += GAP;
    segments.push(pts);
  }
  const totalH = y - GAP + 90;
  return { items, segments, totalH };
}

/* winding bezier through node centers (vertical midpoints)same math as web */
export function pathD(pts: PathPoint[]): string {
  if (pts.length < 2) return "";
  return pts
    .slice(1)
    .reduce((acc, p, i) => {
      const prev = pts[i];
      const midY = (prev.y + p.y) / 2;
      return `${acc} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
    }, `M ${pts[0].x} ${pts[0].y}`);
}

export function courseStats(lang: Lang, completed: Record<string, true>) {
  const sections = CURRICULUM[lang].sections;
  const totalLessons = sections.reduce((n, s) => n + s.units.reduce((m, u) => m + u.lessons.length, 0), 0);
  const doneLessons = Object.keys(completed).filter((id) => id.startsWith(lang + "-")).length;
  return { totalLessons, doneLessons, sections: sections.length };
}

/* section containing the active unitdrives the heading */
export function activeSection(lang: Lang, activeIndex: number) {
  let i = 0;
  for (const s of CURRICULUM[lang].sections) {
    for (const u of s.units) {
      if (i === activeIndex) return s;
      i++;
    }
  }
  return CURRICULUM[lang].sections[0];
}
