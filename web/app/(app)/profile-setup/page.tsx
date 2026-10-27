"use client";

import { useState } from "react";

import { MascotStar } from "@/components/MascotStar";
import { KentePattern } from "@/components/ui/KentePattern";
import { C } from "@/lib/constant";

/* Profile setup — the local "sign-up": a name for Nsoromma to use and a
   daily goal. Everything is saved on this device only (localStorage); no
   account exists and none is required. */

const GOALS = [
  { id: "casual", label: "Casual", xp: 10, hint: "1 lesson a day" },
  { id: "regular", label: "Regular", xp: 20, hint: "2 lessons a day" },
  { id: "serious", label: "Serious", xp: 40, hint: "4 lessons a day" },
];

export default function ProfileSetupPage() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("casual");

  const save = () => {
    try {
      localStorage.setItem(
        "hunukasa-profile",
        JSON.stringify({ name: name.trim() || "Friend", goal })
      );
    } catch {
      /* storage unavailable — continue anyway */
    }
    window.location.href = "/learn";
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: C.indigo }}
    >
      <KentePattern color={C.gold} id="kente-profile-setup" />

      <main
        className="cloth-texture relative z-10 w-full max-w-md rounded-[2rem] border-2 border-charcoal bg-cream px-6 py-7"
        style={{ boxShadow: `0 6px 0 ${C.charcoal}` }}
      >
        {/* compact brand mark */}
        <div className="flex flex-col items-center">
          <MascotStar mood="wave" size={72} />
          <h1 className="mt-1 text-2xl font-black tracking-wide text-charcoal">Almost there</h1>
          <p className="mt-1 text-center text-xs font-semibold text-charcoal/55">
            Tell Nsoromma who you are and how fast you want to go.
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="display-name"
            className="mb-2 block text-xs font-black uppercase tracking-widest"
            style={{ color: C.gold }}
          >
            Your name
          </label>
          <input
            id="display-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kwame"
            maxLength={30}
            autoComplete="given-name"
            className="w-full rounded-2xl border-2 border-charcoal bg-white px-4 py-3.5 text-base font-bold text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <p className="mt-1.5 text-[11px] font-semibold text-charcoal/45">
            Stays on this device. This is how Nsoromma greets you.
          </p>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-2 block text-xs font-black uppercase tracking-widest text-charcoal/60">
            Daily goal
          </legend>
          <div className="flex flex-col gap-2.5">
            {GOALS.map((g) => {
              const active = goal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  aria-pressed={active}
                  className="flex items-center justify-between rounded-2xl border-2 border-charcoal bg-white px-5 py-3.5 text-left transition-transform hover:-translate-y-0.5"
                  style={{
                    background: active ? C.indigo : "#fff",
                    borderColor: active ? C.gold : C.charcoal,
                  }}
                >
                  <span>
                    <span
                      className="block text-base font-black"
                      style={{ color: active ? C.cream : C.charcoal }}
                    >
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
        </fieldset>

        <button
          onClick={save}
          className="key-3d mt-7 w-full rounded-2xl bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-charcoal"
        >
          Akwaaba, let&rsquo;s go
        </button>
        <p className="mt-3 text-center text-[11px] font-semibold text-charcoal/50">
          You can change these any time in settings.
        </p>
      </main>
    </div>
  );
}
