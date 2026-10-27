/* Path layout engine (web port of the prototype's buildPath/pathD).
   Stages provide banners; units and per-stage checkpoints sit on the weave. */

import { lessonCount, STAGES } from "./twi-course";

export const GAP = 128;
export const OFFSETS = [0, 56, 0, -56, 0, 52];
export const PATH_W = 260;

export type PathPoint = { x: number; y: number };

export type PathItem =
  | { kind: "stage"; y: number; num: number; title: string; subtitle: string; order: number }
  | { kind: "unit"; y: number; x: number; unitId: string; name: string; authored: boolean; state: "done" | "active" | "locked"; order: number }
  | { kind: "checkpoint"; y: number; unitId: string; state: "done" | "locked"; order: number };

export type BuiltPath = { items: PathItem[]; segments: PathPoint[][]; totalH: number };

const unitDone = (unitId: string, lessons: number, completed: Record<string, true>) =>
  Array.from({ length: lessons }, (_, i) => completed[`${unitId}-${i}`]).every(Boolean) &&
  !!completed[`${unitId}-cp`];

export function buildPath(completed: Record<string, true>): BuiltPath {
  const items: PathItem[] = [];
  const segments: PathPoint[][] = [];
  let y = 8;
  let order = 0;

  STAGES.forEach((stage) => {
    items.push({
      kind: "stage",
      y,
      num: stage.id,
      title: `Stage ${stage.id} · ${stage.title}`,
      subtitle: stage.subtitle,
      order: order++,
    });
    y += 150; // banner + room for the active node's "Start here!" badge

    const pts: PathPoint[] = [];
    stage.units.forEach((u, ui) => {
      const done = unitDone(u.id, lessonCount(u), completed);
      const firstIncomplete = STAGES.flatMap((s) => s.units).find((x) => !unitDone(x.id, lessonCount(x), completed));
      const active = !done && firstIncomplete?.id === u.id;

      const x = OFFSETS[ui % OFFSETS.length];
      items.push({
        kind: "unit",
        y,
        x,
        unitId: u.id,
        name: u.name,
        authored: u.authored,
        state: done ? "done" : active ? "active" : "locked",
        order: order++,
      });
      pts.push({ x, y });
      y += GAP;

      // stage checkpoint sits after the unit that completes the stage
      const isLast = ui === stage.units.length - 1;
      if (isLast) {
        const cpDone = stage.units.every((x) => unitDone(x.id, lessonCount(x), completed));
        items.push({
          kind: "checkpoint",
          y,
          unitId: u.id,
          state: cpDone ? "done" : "locked",
          order: order++,
        });
        pts.push({ x: 0, y });
        y += GAP;
      }
    });
    segments.push(pts);
  });

  return { items, segments, totalH: y - GAP + 80, };
}

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
