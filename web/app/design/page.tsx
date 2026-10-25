"use client";

import { useState } from "react";

import { MascotStar } from "../../components/MascotStar";

/* ── Hunukasa Design Systemevery token, asset & screen in one place ── */

const C = {
  cream: "#F7EFDF",
  charcoal: "#2B211A",
  terracotta: "#B54B2E",
  gold: "#D9A441",
  indigo: "#1B3A6B",
};

const PALETTE = [
  { name: "Raw Cloth Cream", hex: "#F7EFDF", usage: "Primary screen background (woven .cloth-texture), sheet surfaces, outline buttons on indigo." },
  { name: "Stamp Charcoal", hex: "#2B211A", usage: "Text, icons, 2px borders, key-3d drop shadowsthe ink of the whole system." },
  { name: "Adinkra Terracotta", hex: "#B54B2E", usage: "Primary CTAs (CHECK / SUBMIT), completed path nodes, mic accents, error states, review edges." },
  { name: "Kente Gold", hex: "#D9A441", usage: "Mascot, streak flame, hearts, XP badges, celebration CONTINUE, checkpoint trophies." },
  { name: "Kente Indigo", hex: "#1B3A6B", usage: "Progress bars, active nodes, headers, drawer header, deep panels, speech phrase text." },
];

const TYPE_SCALE = [
  { label: "Display / H1", spec: "40px · Black (900) · tracking-wide", sample: "Hunukasa", color: C.cream, bg: C.indigo },
  { label: "H2screen title", spec: "24–32px · Black (900)", sample: "Unit 1 · Akwaaba!", color: C.charcoal },
  { label: "H3card title", spec: "18–20px · Black (900)", sample: "Words to Review", color: C.charcoal },
  { label: "Body", spec: "14–16px · SemiBold/Bold", sample: "Spaced repetition keeps your Twi words fresh.", color: C.charcoal },
  { label: "Label / chip", spec: "10–12px · Black · uppercase · 0.15–0.35em tracking", sample: "CULTURAL CONTEXT", color: C.charcoal },
  { label: "Button label", spec: "16px · Black · uppercase · 0.18em tracking", sample: "START QUICK REVIEW", color: "#fff", bg: C.indigo },
];

/* Patterns duplicated from the app (self-contained showcase) */
function KentePattern({ color = C.cream, id }: { color?: string; id: string }) {
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern height="48" id={id} patternUnits="userSpaceOnUse" width="48">
          <path d="M0 24 L24 0 L48 24 L24 48 Z" fill="none" stroke={color} strokeWidth="2" />
          <path d="M12 24 L24 12 L36 24 L24 36 Z" fill={color} />
          <circle cx="24" cy="24" fill="none" r="3" stroke={color} strokeWidth="2" />
        </pattern>
      </defs>
      <rect fill={`url(#${id})`} height="100%" width="100%" />
    </svg>
  );
}

function KenteGeo({ color = C.gold, id }: { color?: string; id: string }) {
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern height="60" id={id} patternUnits="userSpaceOnUse" width="60">
          <path d="M0 30 L30 0 L60 30 L30 60 Z" fill="none" stroke={color} strokeWidth="2" />
          <path d="M15 30 L30 15 L45 30 L30 45 Z" fill={color} fillOpacity="0.3" />
          <line stroke={color} strokeDasharray="2 4" strokeWidth="1.5" x1="0" x2="60" y1="0" y2="60" />
          <line stroke={color} strokeDasharray="2 4" strokeWidth="1.5" x1="60" x2="0" y1="0" y2="60" />
          <rect fill={color} height="10" width="10" x="25" y="25" />
        </pattern>
      </defs>
      <rect fill={`url(#${id})`} height="100%" width="100%" />
    </svg>
  );
}

function SunEmblem({ size = 90, color = C.gold }: { size?: number; color?: string }) {
  return (
    <svg fill={color} height={size} viewBox="0 0 100 100" width={size} opacity="0.55">
      <circle cx="50" cy="50" fill="none" r="40" stroke={color} strokeDasharray="12 6" strokeWidth="8" />
      <circle cx="50" cy="50" fill={color} r="20" />
      <rect fill={color} height="100" width="8" x="46" y="0" />
      <rect fill={color} height="8" width="100" x="0" y="46" />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-center gap-3">
        <span className="block h-2 w-2 rounded-[2px]" style={{ background: C.gold }} />
        <span className="block h-2 w-2 rounded-[2px]" style={{ background: C.terracotta }} />
        <h2 className="text-2xl font-black tracking-wide" style={{ color: C.cream }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DemoToggle({ on: initial }: { on: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn(!on)}
      className="relative h-7 w-12 rounded-full border-2 transition-colors"
      style={{ background: on ? C.indigo : "#d8cbae", borderColor: C.charcoal }}
    >
      <span className="absolute top-0.5 rounded-full transition-all" style={{ height: 18, width: 18, background: "#fff", left: on ? 24 : 3 }} />
    </button>
  );
}

const SCREENS = [
  { id: "onboard", label: "Onboarding · value slides" },
  { id: "auth", label: "Home / Sign in · Google only" },
  { id: "path", label: "Learning Path · sections, checkpoints" },
  { id: "translate", label: "Lesson · Select Translation" },
  { id: "builder", label: "Lesson · Sentence Builder" },
  { id: "speech", label: "Lesson · Speech Practice" },
  { id: "complete", label: "Lesson Complete · “Pue!”" },
  { id: "practice", label: "Practice & Weak Words" },
  { id: "profile", label: "Profile & Settings" },
  { id: "premium", label: "Akwaaba Premium · paywall" },
];

const MOODS = [
  { mood: "idle", desc: "Hands on hips, proud bounce, sparkles. Path nodes, lesson avatars, menus.", size: "vector · CSS bob 3s" },
  { mood: "wave", desc: "Arm up waving, beaming grin, pulsing hand. Onboarding, home hero, drawer.", size: "vector · arm pulse 1s" },
  { mood: "cheer", desc: "Victory arms, mid-air hop, confetti sparkles. Correct answers, Pue!, paywall.", size: "vector · bob 0.8s" },
  { mood: "think", desc: "Hand to chin, eyes up, floating “?”. Sentence builder, loading states.", size: "vector · sway + ? bob" },
  { mood: "sad", desc: "Drooped arms, teary eyes, quivering pout. Wrong answers, hearts lost.", size: "vector · static slump" },
  { mood: "sleep", desc: "Breathing scale, closed eyes, rising Z z z. Streak reminders, long idle.", size: "vector · breathe 3.5s" },
  { mood: "listen", desc: "Cupped ear, wide eyes, ripples inward. Speech screen while recording.", size: "vector · ripples 1.5s" },
  { mood: "speak", desc: "Singing bounce, waves outward, music note. Audio playback, chants.", size: "vector · bob 1.4s" },
  { mood: "point", desc: "Fingertip point with sparkle, grin. “Start here” CTAs, unlocks.", size: "vector · arm pulse 1.2s" },
];

export default function DesignPage() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-20" style={{ background: "#171310" }}>
      {/* header */}
      <header className="flex flex-wrap items-center gap-5">
        <MascotStar mood="wave" size={72} />
        <div>
          <h1 className="text-3xl font-black tracking-wide" style={{ color: C.cream }}>Hunukasa Design System</h1>
          <p className="mt-1 text-sm font-semibold" style={{ color: C.gold }}>
            “Understand Language” · Twi · Eʋegbe · Gãfull design reference for mobile & web
          </p>
        </div>
        <nav className="ml-auto flex flex-wrap gap-3">
          <a
            href="/mascot"
            className="key-3d rounded-2xl px-5 py-3 text-sm font-extrabold uppercase tracking-widest"
            style={{ background: C.gold, color: C.charcoal }}
          >
            ⭐ Mascot Studio
          </a>
          <a
            href="/hunukasa-design-kit.svg"
            download
            className="key-3d rounded-2xl px-5 py-3 text-sm font-extrabold uppercase tracking-widest"
            style={{ background: C.indigo, color: "#fff" }}
          >
            Figma kit (.svg) ↓
          </a>
          <a
            href="/"
            className="key-3d rounded-2xl px-5 py-3 text-sm font-extrabold uppercase tracking-widest"
            style={{ background: C.terracotta, color: "#fff" }}
          >
            Open live prototype →
          </a>
        </nav>
      </header>

      {/* palette */}
      <Section title="1 · Color Palette">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PALETTE.map((p) => (
            <div key={p.hex} className="overflow-hidden rounded-2xl border-2" style={{ borderColor: C.charcoal, background: "#221b15" }}>
              <div className="h-20 w-full" style={{ background: p.hex }} />
              <div className="p-4">
                <div className="flex items-baseline justify-between">
                  <p className="font-black" style={{ color: C.cream }}>{p.name}</p>
                  <code className="text-xs font-bold" style={{ color: C.gold }}>{p.hex}</code>
                </div>
                <p className="mt-2 text-xs font-semibold leading-relaxed" style={{ color: "rgba(247,239,223,0.6)" }}>{p.usage}</p>
              </div>
            </div>
          ))}
          <div className="flex flex-col justify-center gap-3 rounded-2xl border-2 p-5" style={{ borderColor: C.charcoal, background: "#221b15" }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: C.cream }}>Feedback colors</p>
            {[
              { hex: "#3e7d32", label: "Correct · green" },
              { hex: "#2e5e24", label: "Correct text" },
              { hex: "#f8e3dd", label: "Error surface · blush" },
            ].map((f) => (
              <div key={f.hex} className="flex items-center gap-3">
                <span className="block h-6 w-6 rounded-md border" style={{ background: f.hex, borderColor: C.charcoal }} />
                <span className="text-xs font-semibold" style={{ color: "rgba(247,239,223,0.7)" }}>{f.label}</span>
                <code className="ml-auto text-xs" style={{ color: C.gold }}>{f.hex}</code>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* typography */}
      <Section title="2 · TypographyNunito (self-hosted)">
        <div className="mb-4 flex flex-wrap items-center gap-5 rounded-2xl border-2 p-5" style={{ borderColor: C.charcoal, background: C.indigo }}>
          <span className="text-5xl font-black" style={{ color: C.gold }}>Aa</span>
          <div>
            <p className="font-black" style={{ color: C.cream }}>Nunito · 400 / 600 / 700 / 800 / 900</p>
            <p className="mt-1 max-w-xl text-xs font-semibold" style={{ color: "rgba(247,239,223,0.6)" }}>
              Rounded, warm, Duolingo-adjacentfriendly without losing legibility for Twi diacritics (ɛ ɔ ʋ ƒ ɖ ɣ ŋ ɔ).
              Same TTFs on web (<code style={{ color: C.gold }}>next/font/local</code>) and mobile (<code style={{ color: C.gold }}>@expo-google-fonts/nunito</code>).
            </p>
          </div>
          <div className="ml-auto flex items-end gap-3">
            <span className="text-base" style={{ color: C.cream, fontWeight: 400 }}>Regular</span>
            <span className="text-base" style={{ color: C.cream, fontWeight: 600 }}>SemiBold</span>
            <span className="text-base" style={{ color: C.cream, fontWeight: 700 }}>Bold</span>
            <span className="text-base" style={{ color: C.cream, fontWeight: 800 }}>ExtraBold</span>
            <span className="text-base" style={{ color: C.gold, fontWeight: 900 }}>Black</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border-2" style={{ borderColor: C.charcoal, background: "#221b15" }}>
          {TYPE_SCALE.map((t) => (
            <div key={t.label} className="flex flex-wrap items-center gap-4 border-b-2 p-5 last:border-b-0" style={{ borderColor: "#332821", background: t.bg ?? "transparent" }}>
              <div className="min-w-56">
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: t.bg ? C.cream : C.gold }}>{t.label}</p>
                <p className="text-[11px] font-semibold" style={{ color: t.bg ? "rgba(247,239,223,0.55)" : "rgba(247,239,223,0.4)" }}>{t.spec}</p>
              </div>
              <p className="text-2xl font-black" style={{ color: t.color }}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* patterns */}
      <Section title="3 · Kente & Adinkra Patterns">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Kente Diamond", sub: "48px tile · gold on indigo (hero, drawer, celebration)", node: <KentePattern color={C.gold} id="ds-k1" />, bg: C.indigo },
            { title: "Kente Diamond", sub: "48px tile · cream on indigo (alt surfaces)", node: <KentePattern color={C.cream} id="ds-k2" />, bg: C.indigo },
            { title: "Kente Geo", sub: "60px tile · charcoal on cream (learning path backdrop)", node: <KenteGeo color={C.charcoal} id="ds-k3" />, bg: C.cream },
          ].map((p) => (
            <div key={p.title + p.sub} className="overflow-hidden rounded-2xl border-2" style={{ borderColor: C.charcoal }}>
              <div className="h-36 opacity-40" style={{ background: p.bg }}>{p.node}</div>
              <div className="p-4" style={{ background: "#221b15" }}>
                <p className="font-black" style={{ color: C.cream }}>{p.title}</p>
                <p className="mt-1 text-xs font-semibold" style={{ color: "rgba(247,239,223,0.55)" }}>{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-6 rounded-2xl border-2 p-5" style={{ borderColor: C.charcoal, background: C.indigo }}>
          <SunEmblem size={84} />
          <div>
            <p className="font-black" style={{ color: C.cream }}>Adinkra Sun Emblem</p>
            <p className="mt-1 max-w-xl text-xs font-semibold" style={{ color: "rgba(247,239,223,0.6)" }}>
              Dashed sun-circle mark used behind the mascot on the home hero (spins slowly, 42s). Pure SVG, currentColor-driven.
            </p>
          </div>
        </div>
      </Section>

      {/* mascot */}
      <Section title="4 · Star Mascot9 moods (pre-rendered GIFs)">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {MOODS.map((m) => (
            <div key={m.mood} className="flex flex-col items-center rounded-2xl border-2 p-5" style={{ borderColor: C.charcoal, background: "#221b15" }}>
              <div className="rounded-xl" style={{ background: C.cream, border: `2px solid ${C.charcoal}22` }}>
                <MascotStar mood={m.mood as "idle"} size={110} />
              </div>
              <p className="mt-3 font-black uppercase tracking-widest" style={{ color: C.gold }}>{m.mood}</p>
              <p className="mt-1 text-center text-xs font-semibold" style={{ color: "rgba(247,239,223,0.55)" }}>{m.desc}</p>
              <code className="mt-2 text-[10px]" style={{ color: C.gold }}>{m.size}</code>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs font-semibold" style={{ color: "rgba(247,239,223,0.5)" }}>
          Character: <strong style={{ color: C.cream }}>Nsoromma</strong>pear-plump standing star, soulful dual-glint eyes,
          mitten hands, 5px charcoal ink, two-tone cell shade. Vector (single source:{" "}
          <code style={{ color: C.gold }}>web/lib/mascot-svg.ts</code>), CSS motion, ~6 KB per mood.
          Every app moment has a moodpick by emotion, not by decoration.
          Preview & export poses in the{" "}
          <a href="/mascot" className="underline font-bold" style={{ color: C.gold }}>
            Nsoromma Gallery →
          </a>
        </p>
      </Section>

      {/* components */}
      <Section title="5 · Component Library">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
            <p className="mb-4 text-xs font-black uppercase tracking-widest" style={{ color: C.gold }}>Tactile buttons (key-3d)</p>
            <div className="cloth-texture space-y-3 rounded-xl p-4">
              <button className="key-3d w-full rounded-2xl py-4 text-base font-extrabold uppercase tracking-[0.18em]" style={{ background: C.terracotta, color: "#fff" }}>Check · primary CTA</button>
              <button className="key-3d w-full rounded-2xl py-4 text-base font-extrabold uppercase tracking-[0.18em]" style={{ background: C.gold, color: C.charcoal }}>Continue · celebration</button>
              <button className="key-3d w-full rounded-2xl py-4 text-base font-extrabold uppercase tracking-[0.18em]" style={{ background: C.indigo, color: "#fff" }}>Start Quick Review</button>
              <button className="key-3d w-full rounded-2xl py-4 text-base font-extrabold uppercase tracking-[0.18em]" style={{ border: `2px solid ${C.terracotta}`, color: C.terracotta, background: "transparent", boxShadow: `0 4px 0 ${C.terracotta}66` }}>Remove Ads (Go Premium) · outline</button>
              <button className="key-3d w-full rounded-2xl py-4 text-base font-extrabold uppercase tracking-[0.18em]" style={{ background: "#c9bda3", color: C.charcoal }}>Check · disabled</button>
            </div>
            <p className="mt-3 text-xs font-semibold" style={{ color: "rgba(247,239,223,0.5)" }}>Spec: 2px charcoal border + solid 4px drop shadow; press = translateY(4px), shadow 0.</p>
          </div>

          <div className="rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
            <p className="mb-4 text-xs font-black uppercase tracking-widest" style={{ color: C.gold }}>Path nodes & progress</p>
            <div className="cloth-texture flex flex-wrap items-start gap-8 rounded-xl p-5">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2" style={{ background: C.terracotta, borderColor: C.charcoal, boxShadow: `0 5px 0 ${C.charcoal}` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.5l5 5 10-11" /></svg>
                </div>
                <span className="text-[10px] font-bold" style={{ color: C.charcoal }}>done</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <div className="halo-pulse absolute h-24 w-24 rounded-full blur-xl" style={{ background: C.gold, opacity: 0.5 }} />
                  <div className="floaty relative flex h-20 w-20 items-center justify-center rounded-full border-2" style={{ background: C.indigo, borderColor: C.charcoal, boxShadow: `0 6px 0 ${C.charcoal}` }}>
                    <MascotStar mood="idle" size={54} />
                  </div>
                </div>
                <span className="text-[10px] font-bold" style={{ color: C.charcoal }}>active</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2" style={{ background: "#efe6d2", borderColor: "#c9bda3", boxShadow: "0 5px 0 #c9bda3" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={C.charcoal} opacity="0.55"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" stroke={C.charcoal} strokeWidth="2.4" fill="none" /></svg>
                </div>
                <span className="text-[10px] font-bold" style={{ color: C.charcoal }}>locked</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2" style={{ background: C.gold, borderColor: C.charcoal, boxShadow: `0 6px 0 ${C.charcoal}` }}>
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={C.charcoal} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 3h10v5a5 5 0 01-10 0V3z" />
                    <path d="M7 4H4a3 3 0 003 4M17 4h3a3 3 0 01-3 4" />
                    <path d="M12 13v4M8 21h8M9 17h6" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold" style={{ color: C.charcoal }}>checkpoint</span>
              </div>
            </div>
            <div className="cloth-texture mt-4 space-y-3 rounded-xl p-4">
              <div className="h-4 overflow-hidden rounded-full" style={{ background: "#e6dcc6", border: `2px solid ${C.charcoal}` }}>
                <div className="h-full rounded-full" style={{ width: "25%", background: C.indigo }} />
              </div>
              <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "#e6dcc6", border: `1.5px solid ${C.charcoal}` }}>
                <div className="h-full rounded-full" style={{ width: "21%", background: C.indigo }} />
              </div>
              <div className="flex gap-3">
                <span className="rounded-full border-2 bg-white px-3 py-1 text-xs font-extrabold" style={{ borderColor: C.gold, color: C.charcoal }}>5 streak</span>
                <span className="rounded-full border-2 bg-white px-3 py-1 text-xs font-extrabold" style={{ borderColor: C.indigo, color: C.indigo }}>120 XP</span>
                <span className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest" style={{ background: C.indigo, color: "#fff" }}>Soon</span>
                <span className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest" style={{ background: C.gold, color: C.charcoal }}>★ Akwaaba Premium</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
            <p className="mb-4 text-xs font-black uppercase tracking-widest" style={{ color: C.gold }}>Cards, keys & toggles</p>
            <div className="cloth-texture space-y-3 rounded-xl p-4">
              <div className="flex items-center gap-3 overflow-hidden rounded-2xl border-2 bg-white" style={{ borderColor: C.charcoal }}>
                <div className="h-full w-1.5 self-stretch" style={{ background: C.terracotta }} />
                <div className="flex-1 py-3 pl-1">
                  <p className="text-base font-black" style={{ color: C.charcoal }}>Medaase</p>
                  <p className="text-sm font-semibold opacity-60" style={{ color: C.charcoal }}>Thank you</p>
                </div>
                <span className="mr-4 flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: C.gold }}>SND</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Me", "papa", "wɔ", "ha"].map((w) => (
                  <span key={w} className="key-3d rounded-xl px-4 py-2.5 font-extrabold" style={{ background: C.indigo, color: "#fff" }}>{w}</span>
                ))}
                <span className="key-3d rounded-xl bg-white px-4 py-2.5 font-extrabold" style={{ color: C.charcoal }}>white tile</span>
              </div>
              <div className="flex items-center gap-4">
                <DemoToggle on />
                <DemoToggle on={false} />
                <span className="text-xs font-bold" style={{ color: C.charcoal }}>Sound Effects · Notifications</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 p-6" style={{ borderColor: C.charcoal, background: "#221b15" }}>
            <p className="mb-4 text-xs font-black uppercase tracking-widest" style={{ color: C.gold }}>Section banner & feedback</p>
            <div className="cloth-texture space-y-3 rounded-xl p-4">
              <div className="rounded-2xl border-2 px-3 py-2" style={{ background: C.indigo, borderColor: C.charcoal, boxShadow: `0 4px 0 ${C.charcoal}` }}>
                <div className="flex items-center gap-1.5">
                  {[C.gold, C.terracotta, C.cream, C.gold].map((col, i) => (
                    <span key={i} className="block h-1.5 w-1.5 rounded-[2px]" style={{ background: col }} />
                  ))}
                  <span className="ml-1 text-sm font-black" style={{ color: C.gold }}>Section 2 · Everyday Life</span>
                </div>
                <p className="text-[11px] font-semibold" style={{ color: C.cream }}>Asetena mu nsɛm · home, food & health</p>
              </div>
              <div className="rounded-2xl border-2 px-4 py-3 font-extrabold" style={{ background: "#e9f4e4", borderColor: "#3e7d32", color: "#2e5e24" }}>✓ Eyie paa! Maakye means Good Morning.</div>
              <div className="rounded-2xl border-2 px-4 py-3 font-extrabold" style={{ background: "#f8e3dd", borderColor: C.terracotta, color: C.terracotta }}>✕ Not quitetry again, wo te ase?</div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={C.gold}><path d="M12 21C7 16.5 3 13.2 3 9a4.6 4.6 0 018-3.1A4.6 4.6 0 0119 9c0 4.2-4 7.5-7 12z" /></svg>
                ))}
                <span className="ml-2 text-xs font-bold" style={{ color: C.charcoal }}>hearts ×5</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* motion */}
      <Section title="6 · Motion Library (transform/opacity only)">
        <div className="overflow-hidden rounded-2xl border-2" style={{ borderColor: C.charcoal, background: "#221b15" }}>
          {[
            ["spin-slow", "42s linear ∞", "Adinkra ring rotation behind hero mascot"],
            ["floaty", "2.6s ease-in-out ∞ · ±6px Y", "Mascot drift, active node idle"],
            ["node-in", "0.5s cubic-bezier(.22,1,.36,1) · staggered 60–110ms", "Path node entrance (fade + rise + scale)"],
            ["halo-pulse", "2.2s ease-in-out ∞ · scale 1→1.3", "Gold glow behind active node"],
            ["dash-move", "1.4s linear ∞ · dashoffset -32", "Kente stitch marching down the path"],
            ["badge-bob / twinkle", "1.8s / 1.6s ∞", "“Start here!” badge bob, sparkle pulsing"],
            ["sheet-up / pop-in", "0.55s / 0.45s spring-ish backwards fill", "Home bottom sheet, cards & feedback"],
            ["confetti", "3.2s linear ∞ · translateY+rotate 540°", "Celebration screen confetti"],
          ].map(([name, spec, use]) => (
            <div key={name} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b-2 p-4 last:border-b-0" style={{ borderColor: "#332821" }}>
              <code className="w-40 shrink-0 font-bold" style={{ color: C.gold }}>{name}</code>
              <span className="w-64 shrink-0 text-xs font-semibold" style={{ color: "rgba(247,239,223,0.6)" }}>{spec}</span>
              <span className="text-xs font-semibold" style={{ color: "rgba(247,239,223,0.45)" }}>{use}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* screens */}
      <Section title="7 · Screen Gallery (live, interactive)">
        <p className="mb-5 max-w-2xl text-sm font-semibold" style={{ color: "rgba(247,239,223,0.6)" }}>
          Each frame below is the real app deep-linked with <code style={{ color: C.gold }}>/?screen=…</code>click around, they are fully interactive.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {SCREENS.map((s) => (
            <figure key={s.id} className="flex flex-col items-center gap-3">
              <div
                className="overflow-hidden rounded-[1.8rem] border-2"
                style={{ borderColor: C.charcoal, boxShadow: `0 0 0 5px ${C.charcoal}`, width: 248, height: 534 }}
              >
                <iframe
                  src={`/?screen=${s.id}`}
                  title={s.label}
                  loading="lazy"
                  style={{ width: 400, height: 860, border: "none", transform: "scale(0.62)", transformOrigin: "top left" }}
                />
              </div>
              <figcaption className="text-center text-xs font-bold" style={{ color: C.cream }}>
                {s.label}
                <span className="block font-semibold opacity-50" style={{ color: "rgba(247,239,223,0.5)" }}>?screen={s.id}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <footer className="mt-16 border-t-2 pt-6 text-xs font-semibold" style={{ borderColor: "#332821", color: "rgba(247,239,223,0.4)" }}>
        Hunukasa design system · palette & patterns per brand spec · mascot = Nsoromma, edited in lib/mascot-svg.ts · written spec in DESIGN.md · current plan in ACTION_PLAN.md
      </footer>
    </main>
  );
}
