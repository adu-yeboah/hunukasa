"use client";

import { MascotStar } from "@/components/MascotStar";
import { C } from "@/lib/constant";
import { doneLessonCount, resetProgress, TOTAL, useProgress } from "@/lib/progress";
import { useEffect, useState } from "react";

/* Profile — local stats, goal editing, and progress reset. No account:
   everything lives on this device. */

const GOALS = [
  { id: "casual", label: "Casual", xp: 10, hint: "1 lesson a day" },
  { id: "regular", label: "Regular", xp: 20, hint: "2 lessons a day" },
  { id: "serious", label: "Serious", xp: 40, hint: "4 lessons a day" },
];

export default function ProfilePage() {
  const { completed, xp } = useProgress();
  const done = doneLessonCount(completed);
  const [name, setName] = useState("Friend");
  const [goal, setGoal] = useState("casual");
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = loadName();
    setName(savedProfile.name);
    setGoal(savedProfile.goal);
    setLoaded(true);
  }, []);

  const save = () => {
    try {
      localStorage.setItem(
        "hunukasa-profile",
        JSON.stringify({ name: name.trim() || "Friend", goal })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="px-4 pb-10 pt-5">
      <h1 className="text-2xl font-black tracking-wide text-charcoal">Profile</h1>

      {/* identity */}
      <div className="mt-4 flex items-center gap-4">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-charcoal text-xl font-black"
          style={{ background: C.gold, color: C.charcoal }}
        >
          {(name || "F").slice(0, 1).toUpperCase()}
        </span>
        <div>
          <p className="text-lg font-black text-charcoal">{name || "Friend"}</p>
          <p className="text-xs font-bold text-charcoal/50">Learning on this device · no account</p>
        </div>
      </div>

      {/* stats */}
      <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border-2 border-charcoal bg-indigo text-center">
        {[
          { v: String(xp), l: "Total XP" },
          { v: `${done}`, l: "Lessons" },
          { v: `${Math.round((done / TOTAL) * 100)}%`, l: "Course" },
        ].map((s, i) => (
          <div key={s.l} className="py-4" style={{ borderLeft: i > 0 ? "2px solid rgba(247,239,223,0.2)" : "none" }}>
            <p className="text-lg font-black text-gold">{s.v}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-cream/85">{s.l}</p>
          </div>
        ))}
      </div>

      {/* settings */}
      <h2 className="mb-2 mt-7 text-xs font-black uppercase tracking-widest text-charcoal/60">Your name</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={30}
        className="w-full rounded-2xl border-2 border-charcoal bg-white px-4 py-3 text-base font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
      />

      <h2 className="mb-2 mt-5 text-xs font-black uppercase tracking-widest text-charcoal/60">Daily goal</h2>
      <div className="flex flex-col gap-2.5">
        {GOALS.map((g) => {
          const active = goal === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              aria-pressed={active}
              className="flex items-center justify-between rounded-2xl border-2 px-5 py-3.5 text-left transition-transform hover:-translate-y-0.5"
              style={{
                background: active ? C.indigo : "#fff",
                borderColor: active ? C.gold : C.charcoal,
              }}
            >
              <span>
                <span className="block text-base font-black" style={{ color: active ? C.cream : C.charcoal }}>
                  {g.label}
                </span>
                <span
                  className="block text-xs font-semibold"
                  style={{ color: active ? `${C.cream}bb` : "rgba(43,33,26,0.55)" }}
                >
                  {g.hint} · {g.xp} XP
                </span>
              </span>
              {active && (
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-charcoal text-xs font-black"
                  style={{ background: C.gold, color: C.charcoal }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button onClick={save} className="key-3d mt-5 w-full rounded-2xl bg-indigo px-6 py-3.5 text-sm font-black uppercase tracking-widest text-cream">
        {saved ? "Saved ✓" : "Save changes"}
      </button>

      {/* provenance */}
      <div className="mt-7 rounded-2xl border-2 border-charcoal bg-white p-4">
        <p className="text-xs font-black uppercase tracking-widest text-charcoal/60">Curriculum</p>
        <p className="mt-1.5 text-xs font-semibold leading-relaxed text-charcoal/70">
          Adapted from the FSI Twi Basic Course (US Foreign Service Institute,
          1963 — public domain) and Peace Corps &ldquo;Twi For All&rdquo;
          lessons. Every unit in the app cites its source.
        </p>
      </div>

      {/* reset */}
      {confirmReset ? (
        <div className="mt-6 rounded-2xl border-2 p-4" style={{ borderColor: C.terracotta }}>
          <p className="text-sm font-bold text-charcoal">
            Delete all progress on this device? This cannot be undone.
          </p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
              }}
              className="key-3d flex-1 rounded-xl bg-terracotta px-4 py-2.5 text-xs font-black uppercase tracking-widest text-cream"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="key-3d flex-1 rounded-xl bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-charcoal"
              style={{ border: `2px solid ${C.charcoal}` }}
            >
              Keep it
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirmReset(true)}
          className="mt-6 w-full text-center text-xs font-bold text-charcoal/50 underline"
        >
          Reset all progress
        </button>
      )}
    </div>
  );
}

function loadName(): { name: string; goal: string } {
  try {
    const raw = localStorage.getItem("hunukasa-profile");
    if (raw) {
      const saved = JSON.parse(raw) as { name?: string; goal?: string };
      return { name: saved.name ?? "Friend", goal: saved.goal ?? "casual" };
    }
  } catch {
    /* ignore */
  }
  return { name: "Friend", goal: "casual" };
}
