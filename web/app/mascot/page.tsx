"use client";

import { useState } from "react";

import { MascotStar } from "../../components/MascotStar";
import { MOODS, getStandaloneMascotSvg, type MascotMood } from "../../lib/mascot-svg";

/* ── Nsoromma Gallerythe mascot, every mood, SVG export ─────────────
   The character lives in lib/mascot-svg.ts (single source of truth for
   web, mobile and Figma). This page previews all 9 moods live and lets
   you copy/download the standalone SVG of any pose. */

const C = {
  cream: "#F7EFDF",
  charcoal: "#2B211A",
  terracotta: "#B54B2E",
  gold: "#D9A441",
  indigo: "#1B3A6B",
};

const MOOD_META: Record<MascotMood, { tagline: string; usage: string }> = {
  idle: { tagline: "Hands on hips, proud bounce + sparkles", usage: "Path nodes, lesson avatars, menus" },
  wave: { tagline: "One arm up waving, big beaming grin", usage: "Onboarding, home hero, drawer, welcomes" },
  cheer: { tagline: "Victory arms, mid-air hop, confetti", usage: "Correct answers, “Pue!” celebration, paywall" },
  think: { tagline: "Hand to chin, eyes up, floating “?”", usage: "Sentence builder, loading states" },
  sad: { tagline: "Drooped arms, teary eyes, pout", usage: "Wrong answers, hearts lost" },
  sleep: { tagline: "Peaceful breathing, closed eyes, Z z z", usage: "Streak reminders, long idle" },
  listen: { tagline: "Cupped ear, wide eyes, ripples inward", usage: "Speech screen while recording" },
  speak: { tagline: "Singing bounce, sound waves outward", usage: "Audio playback, chants" },
  point: { tagline: "Fingertip point with sparkle, laser focus", usage: "“Start here” CTAs, unlocks" },
};

const PALETTE = [
  { name: "Kente Gold", hex: "#D9A441", role: "Body" },
  { name: "Dark Gold", hex: "#C48D30", role: "Lower cell shade" },
  { name: "Belly Light", hex: "#E5B34B", role: "Volume glow" },
  { name: "Stamp Charcoal", hex: "#2B211A", role: "5px ink outline & face" },
  { name: "Adinkra Terracotta", hex: "#B54B2E", role: "Cheeks & tongue" },
  { name: "Raw Cloth Cream", hex: "#F7EFDF", role: "Glints, sclera, sparkles" },
];

function download(data: string, name: string, type = "image/svg+xml;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export default function MascotPage() {
  const [mood, setMood] = useState<MascotMood>("idle");
  const [copied, setCopied] = useState(false);

  const svg = getStandaloneMascotSvg(mood);
  const meta = MOOD_META[mood];

  const copySvg = async () => {
    try {
      await navigator.clipboard.writeText(svg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 md:px-12" style={{ background: "#171310" }}>
      <header className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-black tracking-wide" style={{ color: C.cream }}>
          Nsoromma Gallery
        </h1>
        <p className="text-sm font-semibold" style={{ color: C.gold }}>
          the Hunukasa star · 9 moods · SVG export
        </p>
        <nav className="ml-auto flex gap-3">
          <a href="/design" className="key-3d rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-widest" style={{ background: C.indigo, color: "#fff" }}>
            ← Design system
          </a>
          <a href="/" className="key-3d rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-widest" style={{ background: C.terracotta, color: "#fff" }}>
            Live prototype
          </a>
        </nav>
      </header>

      <p className="mt-4 max-w-3xl text-sm font-semibold leading-relaxed" style={{ color: "rgba(247,239,223,0.6)" }}>
        The character is <strong style={{ color: C.gold }}>vector, not GIF</strong>one generator in{" "}
        <code style={{ color: C.gold }}>web/lib/mascot-svg.ts</code> feeds web, mobile (react-native-svg) and Figma.
        Motion is CSS (web) / Reanimated (mobile): compositor-driven, no per-frame JS.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* spotlight */}
        <section className="rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: C.terracotta }}>Spotlight</p>
              <h2 className="text-2xl font-black capitalize" style={{ color: C.cream }}>{mood}</h2>
            </div>
            <span className="rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: "#3a2f26", color: "rgba(247,239,223,0.6)" }}>
              {meta.tagline}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-center rounded-2xl p-8 cloth-texture" style={{ background: C.cream, border: `2px solid ${C.charcoal}33` }}>
            <MascotStar mood={mood} size={240} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={copySvg} className="key-3d rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-widest" style={{ background: C.gold, color: C.charcoal }}>
              {copied ? "SVG copied!" : "Copy SVG"}
            </button>
            <button onClick={() => download(svg, `nsoromma-${mood}.svg`)} className="key-3d rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-widest" style={{ background: "#c9bda3", color: C.charcoal }}>
              Download .svg
            </button>
            <span className="text-xs font-semibold" style={{ color: "rgba(247,239,223,0.5)" }}>
              In-app usage: <strong style={{ color: C.cream }}>{meta.usage}</strong>
            </span>
          </div>

          {/* mood switcher */}
          <div className="mt-6 flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className="rounded-full border-2 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest"
                style={
                  mood === m
                    ? { background: C.gold, borderColor: C.charcoal, color: C.charcoal }
                    : { background: "transparent", borderColor: "#3a2f26", color: "rgba(247,239,223,0.6)" }
                }
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        {/* palette + notes */}
        <section className="space-y-6">
          <div className="rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
            <h2 className="mb-4 text-xs font-black uppercase tracking-widest" style={{ color: C.gold }}>Palette & identity</h2>
            <div className="space-y-2.5">
              {PALETTE.map((p) => (
                <div key={p.hex} className="flex items-center gap-3">
                  <span className="block h-6 w-6 rounded-md border-2" style={{ background: p.hex, borderColor: C.charcoal }} />
                  <span className="text-xs font-bold" style={{ color: C.cream }}>{p.name}</span>
                  <code className="ml-auto text-[10px]" style={{ color: "rgba(247,239,223,0.45)" }}>{p.hex}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
            <h2 className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: C.gold }}>Anatomy</h2>
            <ul className="space-y-2.5 text-xs font-semibold leading-relaxed" style={{ color: "rgba(247,239,223,0.65)" }}>
              <li><strong style={{ color: C.cream }}>Silhouette:</strong> pear-plump star, soft chubby lobes (not sharp triangles), stands on its two lower points</li>
              <li><strong style={{ color: C.cream }}>Eyes:</strong> soulful ovals, 2° tilt, dual glints (upper-left specular + lower catchlight)</li>
              <li><strong style={{ color: C.cream }}>Mouth:</strong> cubic-Bézier smile with corner dimples; open grin with terracotta tongue + cream tooth</li>
              <li><strong style={{ color: C.cream }}>Ink:</strong> 5px stamp-charcoal outline, matching every button in the app</li>
              <li><strong style={{ color: C.cream }}>Hands:</strong> chubby mitten handships (idle), wave, victory (cheer), chin (think), droop (sad)</li>
            </ul>
          </div>
        </section>
      </div>

      {/* all moods strip */}
      <section className="mt-8 rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
        <h2 className="mb-5 text-xs font-black uppercase tracking-widest" style={{ color: C.gold }}>The full casttap to spotlight</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {MOODS.map((m) => (
            <button key={m} onClick={() => setMood(m)} className="flex flex-col items-center gap-1 rounded-xl p-2" style={{ background: mood === m ? `${C.gold}22` : "transparent" }}>
              <div className="rounded-xl" style={{ background: C.cream, border: `2px solid ${C.charcoal}22` }}>
                <MascotStar mood={m} size={84} animated={mood === m} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: mood === m ? C.gold : "rgba(247,239,223,0.6)" }}>{m}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="mt-10 text-xs font-semibold" style={{ color: "rgba(247,239,223,0.35)" }}>
        Single source: lib/mascot-svg.ts · mobile renders the same strings via react-native-svg
      </footer>
    </main>
  );
}
