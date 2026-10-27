"use client";

import { MascotStar } from "@/components/MascotStar";
import { C } from "@/lib/constant";
import { buildPath, pathD } from "@/lib/path";
import { doneLessonCount, pathProgress, TOTAL, useProgress } from "@/lib/progress";
import Link from "next/link";

/* Learn — the Asante Twi path. Stages, units and checkpoints derived from
   real completion (lib/progress); layout from lib/path (FSI-ordered). */

function Lock() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24">
      <path d="M5 10h14v10H5z" fill="#2B211A" opacity={0.55} />
      <path d="M8 10V7a4 4 0 018 0v3" stroke="#2B211A" strokeWidth={2.4} fill="none" />
    </svg>
  );
}

function Check() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24">
      <path
        d="M4.5 12.5l5 5 10-11"
        stroke="#fff"
        strokeWidth={3.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LearnPage() {
  const { completed, xp } = useProgress();
  const info = pathProgress(completed);
  const { items, segments, totalH } = buildPath(completed);
  const done = doneLessonCount(completed);
  const pct = Math.round((done / TOTAL) * 100);

  return (
    <div className="px-4 pb-10 pt-5">
      <h1 className="text-2xl font-black tracking-wide text-charcoal">Asante Twi</h1>

      {/* course progress */}
      <div className="mt-3 rounded-2xl border-2 border-charcoal bg-white px-4 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-charcoal">
            Course progress
          </span>
          <span className="text-[11px] font-black text-charcoal">
            {done}/{TOTAL} lessons · {pct}%
          </span>
        </div>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full border-[1.5px] border-charcoal bg-[#e6dcc6]">
          <div className="h-full rounded-full bg-indigo transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* the winding path */}
      <div className="mt-4">
        <div className="relative mx-auto" style={{ width: 300 }}>
          <svg
            width={300}
            height={totalH}
            viewBox={`-150 0 300 ${totalH}`}
            className="absolute left-0 top-0"
          >
            {segments.map((seg, i) => (
              <path
                key={`seg-${i}`}
                d={pathD(seg)}
                fill="none"
                stroke="rgba(43,33,26,0.18)"
                strokeWidth={10}
                strokeLinecap="round"
              />
            ))}
            {segments.map((seg, i) => (
              <path
                key={`dash-${i}`}
                d={pathD(seg)}
                fill="none"
                stroke={C.gold}
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="2 14"
              />
            ))}
          </svg>

          {items.map((it) => {
            if (it.kind === "stage") {
              return (
                <div key={`s-${it.order}`} className="absolute left-0 right-0" style={{ top: it.y }}>
                  <div className="rounded-2xl border-2 border-charcoal bg-indigo px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      {[C.gold, C.terracotta, C.cream, C.gold].map((col, i) => (
                        <span key={i} className="h-1.5 w-1.5 rounded-[2px]" style={{ background: col }} />
                      ))}
                      <span className="ml-1 text-sm font-black text-gold">{it.title}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-cream">{it.subtitle}</span>
                  </div>
                </div>
              );
            }

            if (it.kind === "checkpoint") {
              const done = it.state === "done";
              const unlocked = done || it.state === "locked";
              void unlocked;
              return (
                <div
                  key={`cp-${it.order}`}
                  className="absolute flex w-44 -translate-x-1/2 flex-col items-center"
                  style={{ left: 150, top: it.y - 30 }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-charcoal"
                    style={{
                      background: done ? C.gold : "#efe6d2",
                      boxShadow: `0 5px 0 ${done ? C.charcoal : "#c9bda3"}`,
                    }}
                  >
                    {done ? <Check /> : <Lock />}
                  </div>
                  <span className="mt-1.5 text-center text-xs font-bold text-charcoal opacity-70">
                    {done ? "Checkpoint passed" : "Checkpoint — complete the stage to unlock"}
                  </span>
                </div>
              );
            }

            // unit node
            const left = 150 + it.x;
            if (it.state === "active") {
              return (
                <div
                  key={`u-${it.order}`}
                  className="absolute flex w-44 -translate-x-1/2 flex-col items-center"
                  style={{ left, top: it.y - 84 }}
                >
                  <div className="badge flex items-center gap-2 rounded-full border-2 border-charcoal bg-gold px-3 py-1">
                    <MascotStar mood="wave" size={16} />
                    <span className="text-xs font-black text-charcoal">Start here!</span>
                  </div>
                  <Link
                    href={`/lesson/${it.unitId}-0`}
                    className="floaty relative mt-2 flex h-20 w-20 items-center justify-center rounded-full border-2 border-charcoal bg-indigo"
                    style={{ boxShadow: `0 6px 0 ${C.charcoal}` }}
                  >
                    <span className="halo absolute h-24 w-24 rounded-full bg-gold opacity-30 blur-xl" />
                    <MascotStar mood="idle" size={56} />
                  </Link>
                  <span className="mt-2 text-sm font-black text-charcoal">{it.name}</span>
                  {!it.authored && (
                    <span className="text-[11px] font-bold text-charcoal/50">authored next</span>
                  )}
                </div>
              );
            }

            const done = it.state === "done";
            return (
              <div
                key={`u-${it.order}`}
                className="absolute flex w-44 -translate-x-1/2 flex-col items-center"
                style={{ left, top: it.y - 28 }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-charcoal"
                  style={{
                    background: done ? C.terracotta : "#efe6d2",
                    boxShadow: `0 5px 0 ${done ? C.charcoal : "#c9bda3"}`,
                  }}
                >
                  {done ? <Check /> : <Lock />}
                </div>
                <span className="mt-1.5 text-center text-xs font-bold text-charcoal opacity-70">
                  {it.name}
                </span>
                {!it.authored && it.state === "locked" && (
                  <span className="text-[10px] font-bold text-charcoal/40">authored next</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {info.allDone && (
        <div className="mx-auto mt-6 max-w-md rounded-2xl border-2 border-gold bg-white p-5 text-center">
          <MascotStar mood="cheer" size={90} />
          <p className="mt-2 text-lg font-black text-charcoal">Meka Twi kakra!</p>
          <p className="text-sm font-semibold text-charcoal/60">
            You finished every authored lesson. More units land with the community.
          </p>
        </div>
      )}
    </div>
  );
}
