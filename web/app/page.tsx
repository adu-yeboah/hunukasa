"use client";

import { useEffect, useState } from "react";

import { MascotStar } from "../components/MascotStar";
import { CURRICULUM, type Lang } from "../content/curriculum";

/* ── Palette (kept exactly as designed) ─────────────────────────────── */
const C = {
  cream: "#F7EFDF",
  charcoal: "#2B211A",
  terracotta: "#B54B2E",
  gold: "#D9A441",
  indigo: "#1B3A6B",
};

/* Ghana flagred/gold/green + black star (replaces the flag glyph) */
function GhanaFlag({ width = 27, height = 18 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 27 18">
      <path d="M0 0h27v6H0z" fill="#CE1126" />
      <path d="M0 6h27v6H0z" fill={C.gold} />
      <path d="M0 12h27v6H0z" fill="#006B3F" />
      <polygon
        points="13.5,6.6 14.6,9.6 17.5,9.6 15.2,11.4 16,14.4 13.5,12.6 11,14.4 11.8,11.4 9.5,9.6 12.4,9.6"
        fill={C.charcoal}
      />
      <path d="M1 1h25v16H1z" fill="none" stroke={C.charcoal} strokeWidth={1.4} />
    </svg>
  );
}

/* gold trophyreplaces the checkpoint glyph */
function Trophy({ size = 34, color = C.charcoal }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h10v5a5 5 0 01-10 0V3z" />
      <path d="M7 4H4a3 3 0 003 4M17 4h3a3 3 0 01-3 4" />
      <path d="M12 13v4M8 21h8M9 17h6" />
    </svg>
  );
}

/* four-point sparkle */
function Sparkle({ size = 18, color = C.gold }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill={color} />
    </svg>
  );
}

type Screen =
  | "onboard"
  | "auth"
  | "path"
  | "translate"
  | "builder"
  | "speech"
  | "complete"
  | "practice"
  | "profile"
  | "premium";

type Mood =
  | "idle"
  | "wave"
  | "cheer"
  | "think"
  | "sad"
  | "sleep"
  | "listen"
  | "speak"
  | "point";

/* Demo course state: first 3 units completed, the 4th is active */
const DONE_UNITS = 3;
const ACTIVE_INDEX = 3;

function courseStats(lang: Lang) {
  const sections = CURRICULUM[lang].sections;
  const totalLessons = sections.reduce((n, s) => n + s.units.reduce((m, u) => m + u.lessons.length, 0), 0);
  let unitIdx = 0;
  let doneLessons = 0;
  for (const s of sections)
    for (const u of s.units) {
      if (unitIdx < DONE_UNITS) doneLessons += u.lessons.length;
      unitIdx++;
    }
  return { totalLessons, doneLessons, sections: sections.length };
}

/* section containing the active unitdrives the path screen heading */
function activeSection(lang: Lang) {
  let i = 0;
  for (const s of CURRICULUM[lang].sections) {
    for (const u of s.units) {
      if (i === ACTIVE_INDEX) return s;
      i++;
    }
  }
  return CURRICULUM[lang].sections[0];
}

/* ── Kente pattern backgrounds (provided designs) ───────────────────── */
function KentePattern({ color = C.cream, id = "kente-a" }: { color?: string; id?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-10">
      <svg className="h-full w-full object-cover" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern height="48" id={id} patternUnits="userSpaceOnUse" width="48">
            <path d="M0 24 L24 0 L48 24 L24 48 Z" fill="none" stroke={color} strokeWidth="2" />
            <path d="M12 24 L24 12 L36 24 L24 36 Z" fill={color} />
            <circle cx="24" cy="24" fill="none" r="3" stroke={color} strokeWidth="2" />
          </pattern>
        </defs>
        <rect fill={`url(#${id})`} height="100%" width="100%" />
      </svg>
    </div>
  );
}

function KenteGeo({ color = C.gold, id = "kente-b" }: { color?: string; id?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-[0.08]">
      <svg className="h-full w-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  );
}

/* Sun-circle Adinkra-style emblem from the provided SVG set */
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

/* ── Mascot: Nsoromma, the SVG star (lib/mascot-svg.ts) ─────────────── */
function Mascot({
  size = 120,
  mood = "idle",
  className = "",
  style,
}: {
  size?: number;
  mood?: Mood;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <MascotStar mood={mood} size={size} className={className} style={style} />;
}

/* ── Tiny icons ─────────────────────────────────────────────────────── */
const GoogleG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.1 0-5.8-2.1-6.8-5l-3.8 3C3.3 21.3 7.3 24 12 24z" />
    <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-3.8-3C.5 8.2 0 10 0 12s.5 3.8 1.4 5.4l3.8-3z" />
    <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l2.8-2.7C16.7 1.3 14.2 0 12 0 7.3 0 3.3 2.7 1.4 6.6l3.8 3c1-2.9 3.7-4.9 6.8-4.9z" />
  </svg>
);

const Flame = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={C.gold}>
    <path d="M12 2c1 4-4 5.5-4 10a4 4 0 008 0c0-2-1-3-1-3s3 1 3 5a6 6 0 11-12 0c0-6 5-7 6-12z" />
  </svg>
);

const Bolt = ({ color = C.indigo }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
  </svg>
);

const Heart = ({ filled = true }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? C.gold : "none"} stroke={C.gold} strokeWidth="2">
    <path d="M12 21C7 16.5 3 13.2 3 9a4.6 4.6 0 018-3.1A4.6 4.6 0 0119 9c0 4.2-4 7.5-7 12z" />
  </svg>
);

const Menu = ({ color = C.charcoal }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" stroke={color} strokeWidth="2.4" strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const Speaker = ({ size = 24, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H3v6h3l5 4z" fill={color} />
    <path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" />
  </svg>
);

const Mic = ({ size = 32, color = C.terracotta }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <rect x="9" y="2.5" width="6" height="11" rx="3" fill={color} stroke="none" />
    <path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v3.5M8.5 21.5h7" />
  </svg>
);

const Check = ({ color = "#fff", size = 20 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

const Lock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={C.charcoal} opacity="0.55">
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 018 0v3" stroke={C.charcoal} strokeWidth="2.4" fill="none" />
  </svg>
);

/* ── Shared button ──────────────────────────────────────────────────── */
function ChunkyButton({
  label,
  color,
  textColor = "#fff",
  onClick,
  outline = false,
}: {
  label: string;
  color: string;
  textColor?: string;
  onClick?: () => void;
  outline?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="key-3d w-full rounded-2xl py-4 text-base font-extrabold tracking-[0.18em] uppercase"
      style={
        outline
          ? { border: `2px solid ${color}`, color, background: "transparent", boxShadow: `0 4px 0 ${color}66` }
          : { background: color, color: textColor }
      }
    >
      {label}
    </button>
  );
}

/* ── Screen: Onboardingthree swipes of value, then login ─────────── */
const SLIDES: { mood: Mood; title: string; body: string }[] = [
  {
    mood: "wave",
    title: "Akwaabawelcome!",
    body: "Learn Twi, Eʋe or Ga with a star friend who celebrates every word you speak.",
  },
  {
    mood: "speak",
    title: "Hear it. Say it.",
    body: "Native audio and pronunciation practice from your very first lesson.",
  },
  {
    mood: "point",
    title: "Your path, your pace",
    body: "200+ bitesize lessons wind through everyday Ghanamarket, family, festivals.",
  },
];

function Onboarding({ go }: { go: (s: Screen) => void }) {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  const last = slide === SLIDES.length - 1;

  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden px-7 pb-8" style={{ background: C.indigo }}>
      <KentePattern color={C.gold} id="kente-onboard" />
      <button
        onClick={() => go("auth")}
        className="relative z-10 self-end pt-6 text-xs font-black uppercase tracking-widest opacity-70"
        style={{ color: C.cream }}
      >
        Skip ›
      </button>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div className="pop-in relative flex h-52 w-52 items-center justify-center" key={`m-${slide}`}>
          <div className="spin-slow absolute inset-0 flex items-center justify-center">
            <SunEmblem size={200} />
          </div>
          <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: C.gold, opacity: 0.25 }} />
          <Mascot size={140} mood={s.mood} style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.4))" }} />
        </div>
        <h2 className="pop-in mt-6 text-3xl font-black leading-tight" style={{ color: C.gold }} key={`t-${slide}`}>
          {s.title}
        </h2>
        <p className="pop-in mt-3 max-w-[280px] text-base font-semibold leading-relaxed" style={{ color: C.cream, opacity: 0.85 }} key={`b-${slide}`}>
          {s.body}
        </p>
      </div>

      <div className="relative z-10 mb-5 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setSlide(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === slide ? 26 : 8, background: i === slide ? C.gold : `${C.cream}55` }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full">
        <ChunkyButton
          label={last ? "Get started" : "Continue"}
          color={C.gold}
          textColor={C.charcoal}
          onClick={() => (last ? go("auth") : setSlide(slide + 1))}
        />
      </div>
    </div>
  );
}

/* ── Screen: Home / Auth (Google only) ──────────────────────────────── */
function Auth({ go, lang, setLang }: { go: (s: Screen) => void; lang: Lang; setLang: (l: Lang) => void }) {
  const [busy, setBusy] = useState(false);
  const [mascotMood, setMascotMood] = useState<Mood>("wave");

  const pick = (l: Lang) => {
    setLang(l);
    setMascotMood("cheer"); // mascot celebrates your choice
    setTimeout(() => setMascotMood("wave"), 1100);
  };
  const signIn = () => {
    setBusy(true);
    setTimeout(() => go("path"), 700);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Indigo hero: rotating adinkra ring + animated mascot */}
      <div className="relative flex flex-col items-center overflow-hidden pb-8 pt-9" style={{ background: C.indigo }}>
        <KentePattern color={C.gold} id="kente-auth" />
        <div className="relative flex h-44 w-44 items-center justify-center">
          <div className="spin-slow absolute inset-0 flex items-center justify-center">
            <SunEmblem size={168} />
          </div>
          <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: C.gold, opacity: 0.28 }} />
          <Mascot size={124} mood={mascotMood} style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))" }} />
        </div>
        <h1 className="pop-in relative mt-4 text-4xl font-black tracking-wide" style={{ color: C.cream }}>
          Hunukasa
        </h1>
        <p className="relative mt-1 text-xs font-bold tracking-[0.35em] uppercase" style={{ color: C.gold }}>
          Understand Language
        </p>
        <span
          className="relative mt-3 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest"
          style={{ color: C.cream, borderColor: `${C.cream}55`, background: "rgba(247,239,223,0.08)" }}
        >
          Twi · Eʋegbe · Gã
        </span>
      </div>

      {/* Cream bottom sheet: language pick + Google sign-in */}
      <div className="cloth-texture sheet-up relative -mt-5 flex flex-1 flex-col justify-between rounded-t-[2rem] border-2 px-7 pb-7 pt-6" style={{ borderColor: C.charcoal, borderTopWidth: 2 }}>
        <div>
          <p className="mb-3 text-center text-xs font-black uppercase tracking-widest opacity-60" style={{ color: C.charcoal }}>
            Choose your language
          </p>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(CURRICULUM) as Lang[]).map((l, i) => {
              const active = lang === l;
              const stats = courseStats(l);
              return (
                <button
                  key={l}
                  onClick={() => pick(l)}
                  className="key-3d pop-in rounded-2xl py-3 text-center font-extrabold"
                  style={{ background: active ? C.indigo : "#fff", color: active ? C.cream : C.charcoal, animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className="block leading-6"><GhanaFlag width={26} height={17} /></span>
                  <span className="block text-sm">{CURRICULUM[l].native}</span>
                  <span className="block text-[10px] font-bold opacity-70">{stats.totalLessons} lessons</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={signIn}
            className="key-3d flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-4 text-base font-extrabold"
            style={{ color: C.charcoal }}
          >
            {busy ? (
              <span className="animate-pulse">Connecting to Google…</span>
            ) : (
              <>
                <GoogleG /> Continue with Google
              </>
            )}
          </button>
          <p className="text-center text-[11px] font-semibold leading-relaxed opacity-50" style={{ color: C.charcoal }}>
            One tap with Googleno passwords.
            <br />Akwaaba! You are welcome here.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Screen: Learning Path ──────────────────────────────────────────── */
function PathHeader({ onMenu, lang }: { onMenu: () => void; lang: Lang }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <button aria-label="Open menu" onClick={onMenu}>
        <Menu />
      </button>
      <span className="text-sm font-black uppercase tracking-widest" style={{ color: C.charcoal }}>
        <GhanaFlag width={18} height={12} /> {CURRICULUM[lang].native}
      </span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border-2 bg-white px-3 py-1 font-extrabold" style={{ borderColor: C.gold, color: C.charcoal }}>
          <Flame /> <span>5</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border-2 bg-white px-3 py-1 font-extrabold" style={{ borderColor: C.indigo, color: C.indigo }}>
          <Bolt /> <span>120</span>
        </div>
      </div>
    </div>
  );
}

const GAP = 132; // vertical distance between node centers
const OFFSETS = [0, 56, 0, -56, 0, 52];
const HEADER_H = 64;

type PathItem =
  | { kind: "header"; y: number; title: string; subtitle: string; order: number }
  | { kind: "unit"; y: number; x: number; label: string; tip: string; state: "done" | "active" | "locked"; order: number }
  | { kind: "checkpoint"; y: number; label: string; state: "done" | "locked"; order: number };

function buildPath(lang: Lang) {
  const items: PathItem[] = [];
  const segments: { x: number; y: number }[][] = [];
  let y = 20;
  let order = 0;
  let unitIdx = 0;

  for (const sec of CURRICULUM[lang].sections) {
    items.push({ kind: "header", y, title: sec.title, subtitle: sec.subtitle, order: order++ });
    y += HEADER_H + 12;
    const pts: { x: number; y: number }[] = [];
    sec.units.forEach((u) => {
      const x = OFFSETS[pts.length % OFFSETS.length];
      const state = unitIdx < DONE_UNITS ? "done" : unitIdx === ACTIVE_INDEX ? "active" : "locked";
      items.push({ kind: "unit", y, x, label: u.label, tip: u.goal, state, order: order++ });
      pts.push({ x, y });
      y += GAP;
      unitIdx++;
    });
    // checkpoint is earned once every unit of this section is completed
    const cpDone = unitIdx <= ACTIVE_INDEX;
    items.push({ kind: "checkpoint", y, label: `Checkpoint · ${sec.title}`, state: cpDone ? "done" : "locked", order: order++ });
    pts.push({ x: 0, y });
    y += GAP;
    segments.push(pts);
  }
  const totalH = y - GAP + 90;
  return { items, segments, totalH };
}

function pathD(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  return pts
    .slice(1)
    .reduce((acc, p, i) => {
      const prev = pts[i];
      const midY = (prev.y + p.y) / 2;
      return `${acc} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
    }, `M ${pts[0].x} ${pts[0].y}`);
}

function LearningPath({ go, openDrawer, lang }: { go: (s: Screen) => void; openDrawer: () => void; lang: Lang }) {
  const { items, segments, totalH } = buildPath(lang);
  const stats = courseStats(lang);
  const activeSec = activeSection(lang);
  const pct = Math.round((stats.doneLessons / stats.totalLessons) * 100);

  return (
    <div className="cloth-texture relative flex h-full flex-col overflow-hidden">
      <KenteGeo color={C.charcoal} id={`kente-path-${lang}`} />
      <div className="relative z-10 flex h-full flex-col">
        <PathHeader onMenu={openDrawer} lang={lang} />
        <p className="mt-3 px-5 text-2xl font-black" style={{ color: C.charcoal }}>
          {activeSec.title}
        </p>
        <p className="px-5 text-sm font-semibold opacity-60" style={{ color: C.charcoal }}>
          {activeSec.subtitle}
        </p>

        {/* course progress */}
        <div className="mx-5 mt-3 rounded-2xl border-2 bg-white px-4 py-2.5" style={{ borderColor: C.charcoal }}>
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider" style={{ color: C.charcoal }}>
            <span>Course progress</span>
            <span>
              {stats.doneLessons}/{stats.totalLessons} lessons · {pct}%
            </span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full" style={{ background: "#e6dcc6", border: `1.5px solid ${C.charcoal}` }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: C.indigo }} />
          </div>
        </div>

        <div className="no-scrollbar relative flex-1 overflow-y-auto px-6 pb-10 pt-2">
          <div className="relative mx-auto" style={{ height: totalH, width: 260 }}>
            {/* winding stitched path, one segment per section */}
            <svg className="path-in absolute left-1/2 top-0 -translate-x-1/2" width="260" height={totalH} viewBox={`-130 0 260 ${totalH}`}>
              {segments.map((seg, i) => (
                <g key={i}>
                  <path d={pathD(seg)} fill="none" stroke="rgba(43,33,26,0.18)" strokeWidth="10" strokeLinecap="round" />
                  <path className="dash-move" d={pathD(seg)} fill="none" stroke={C.gold} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 14" />
                </g>
              ))}
            </svg>

            {items.map((it) => {
              const delay = `${Math.min(140 + it.order * 60, 750)}ms`;
              if (it.kind === "header") {
                return (
                  <div key={`h-${it.order}`} className="node-in absolute left-0 w-full" style={{ top: it.y, animationDelay: delay }}>
                    <div className="rounded-2xl border-2 px-3 py-2" style={{ background: C.indigo, borderColor: C.charcoal, boxShadow: `0 4px 0 ${C.charcoal}` }}>
                      <div className="flex items-center gap-1.5">
                        {[C.gold, C.terracotta, C.cream, C.gold].map((col, i) => (
                          <span key={i} className="block h-1.5 w-1.5 rounded-[2px]" style={{ background: col }} />
                        ))}
                        <span className="ml-1 text-sm font-black" style={{ color: C.gold }}>{it.title}</span>
                      </div>
                      <p className="text-[11px] font-semibold" style={{ color: C.cream }}>{it.subtitle}</p>
                    </div>
                  </div>
                );
              }
              if (it.kind === "checkpoint") {
                const done = it.state === "done";
                return (
                  <div key={`c-${it.order}`} className="node-in absolute left-1/2 flex w-44 -translate-x-1/2 flex-col items-center" style={{ top: it.y - 30, animationDelay: delay }}>
                    <div
                      className={`flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 text-3xl ${done ? "floaty" : ""}`}
                      style={
                        done
                          ? { background: C.gold, borderColor: C.charcoal, boxShadow: `0 6px 0 ${C.charcoal}` }
                          : { background: "#efe6d2", borderColor: "#c9bda3", boxShadow: "0 5px 0 #c9bda3" }
                      }
                    >
                      {done ? <Trophy size={32} /> : <Lock />}
                    </div>
                    <span className="mt-1.5 text-center text-xs font-bold opacity-70" style={{ color: C.charcoal }}>{it.label}</span>
                  </div>
                );
              }
              // unit node
              if (it.state === "active") {
                return (
                  <div key={`u-${it.order}`} className="node-in absolute left-1/2 flex w-44 -translate-x-1/2 flex-col items-center" style={{ top: it.y - 92, marginLeft: it.x, animationDelay: delay }}>
                    <div className="badge-bob flex items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-extrabold" style={{ background: C.gold, borderColor: C.charcoal, color: C.charcoal }}>
                      <Mascot size={16} mood="wave" /> Start here!
                    </div>
                    <div className="relative mt-2 flex items-center justify-center">
                      <div className="halo-pulse absolute h-24 w-24 rounded-full blur-xl" style={{ background: C.gold, opacity: 0.5 }} />
                      <span className="twinkle absolute -left-9 -top-3" style={{ animationDelay: "0.4s" }}><Sparkle size={18} /></span>
                      <span className="twinkle absolute -right-8 top-4"><Sparkle size={14} /></span>
                      <button
                        onClick={() => go("translate")}
                        aria-label={`Start ${it.label} lesson`}
                        className="floaty flex h-20 w-20 items-center justify-center rounded-full border-2"
                        style={{ background: C.indigo, borderColor: C.charcoal, boxShadow: `0 6px 0 ${C.charcoal}` }}
                      >
                        <Mascot size={56} mood="idle" />
                      </button>
                    </div>
                    <span className="mt-2 text-sm font-extrabold" style={{ color: C.charcoal }}>{it.label}</span>
                    <span className="text-center text-xs font-semibold opacity-50" style={{ color: C.charcoal }}>{it.tip}</span>
                  </div>
                );
              }
              const done = it.state === "done";
              return (
                <div key={`u-${it.order}`} className="node-in absolute left-1/2 flex w-44 -translate-x-1/2 flex-col items-center" style={{ top: it.y - 28, marginLeft: it.x, animationDelay: delay }}>
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2"
                    style={
                      done
                        ? { background: C.terracotta, borderColor: C.charcoal, boxShadow: `0 5px 0 ${C.charcoal}` }
                        : { background: "#efe6d2", borderColor: "#c9bda3", boxShadow: "0 5px 0 #c9bda3" }
                    }
                  >
                    {done ? <Check /> : <Lock />}
                  </div>
                  <span className="mt-1.5 text-center text-xs font-bold opacity-70" style={{ color: C.charcoal }}>{it.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Drawer ─────────────────────────────────────────────────────────── */
function Drawer({ open, close, go }: { open: boolean; close: () => void; go: (s: Screen) => void }) {
  const items: { label: string; screen: Screen; tag?: string; icon: React.ReactNode }[] = [
    { label: "Learn", screen: "path", icon: <Mascot size={22} mood="wave" /> },
    { label: "Practice", screen: "practice", icon: <Bolt color={C.indigo} /> },
    { label: "Leaderboard", screen: "path", tag: "Soon", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill={C.indigo}><path d="M5 18h3v-7H5zm5.5 0h3V6h-3zm5.5 0h3v-4h-3zM4 20h16v1.5H4z"/></svg> },
    { label: "Settings", screen: "profile", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill={C.indigo}><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4l-2.2-1 .4-2.4-2.3-1-1.5-1.9-2.3.8L12 4.5 10.9 6.5l-2.3-.8-1.5 1.9-2.3 1 .4 2.4L3 12l2.2 1-.4 2.4 2.3 1 1.5 1.9 2.3-.8L12 19.5l1.1-2 2.3.8 1.5-1.9 2.3-1-.4-2.4z"/></svg> },
    { label: "Log Out", screen: "auth", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="2.4" strokeLinecap="round"><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/></svg> },
  ];
  return (
    <div className="absolute inset-0 z-20 transition-opacity" style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}>
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div
        className="cloth-texture absolute left-0 top-0 flex h-full w-4/5 flex-col transition-transform duration-300"
        style={{ transform: open ? "translateX(0)" : "translateX(-105%)", borderRight: `2px solid ${C.charcoal}` }}
      >
        <div className="relative flex items-center gap-4 px-5 py-7" style={{ background: C.indigo }}>
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <KentePattern color={C.cream} id="kente-drawer" />
          </div>
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl font-black" style={{ background: C.gold, borderColor: C.cream, color: C.charcoal }}>
            K
          </div>
          <div className="relative">
            <p className="font-extrabold" style={{ color: C.cream }}>Kwame Mensah</p>
            <button
              onClick={() => { go("premium"); close(); }}
              className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest"
              style={{ background: C.gold, color: C.charcoal }}
            >
              ★ Akwaaba Premium
            </button>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {items.map((it) => (
            <button key={it.label} onClick={() => { go(it.screen); close(); }} className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left font-bold" style={{ color: C.indigo }}>
              {it.icon}
              <span className="text-base">{it.label}</span>
              {it.tag && (
                <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-black" style={{ background: C.indigo, color: "#fff" }}>
                  {it.tag}
                </span>
              )}
            </button>
          ))}
        </nav>
        <p className="p-5 text-center text-xs font-semibold opacity-50" style={{ color: C.charcoal }}>
          Hunukasa · Understand Language
        </p>
      </div>
    </div>
  );
}

/* ── Lesson top bar ─────────────────────────────────────────────────── */
function LessonBar({ progress, onClose, hearts = 5 }: { progress: number; onClose: () => void; hearts?: number }) {
  return (
    <div className="flex items-center gap-4 px-5 pt-5">
      <button onClick={onClose} aria-label="Close lesson" className="text-2xl font-black" style={{ color: C.terracotta }}>
        ✕
      </button>
      <div className="h-4 flex-1 overflow-hidden rounded-full" style={{ background: "#e6dcc6", border: `2px solid ${C.charcoal}` }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: C.indigo }} />
      </div>
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => <Heart key={i} filled={i < hearts} />)}
      </div>
    </div>
  );
}

/* ── Screen: Select Translation ─────────────────────────────────────── */
const TRANSLATE_Q = {
  options: ["Maakye", "Medaase", "Ɛte sɛn?", "Da yie"],
  correct: "Maakye",
  explain: "Maakye means Good Morningfrom ɔkyena, the morning.",
};

function TranslateLesson({ go }: { go: (s: Screen) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = picked === TRANSLATE_Q.correct;

  return (
    <div className="cloth-texture flex h-full flex-col">
      <LessonBar progress={25} onClose={() => go("path")} />
      <div className="flex-1 px-6 py-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="pop-in flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2" style={{ background: C.gold, borderColor: C.charcoal }}>
            <Mascot size={42} mood="idle" />
          </div>
          <p className="text-xl font-black leading-snug" style={{ color: C.charcoal }}>
            How do you say <span style={{ color: C.terracotta }}>“Good Morning”</span>?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {TRANSLATE_Q.options.map((o, i) => {
            const isPicked = picked === o;
            const reveal = checked && o === TRANSLATE_Q.correct;
            return (
              <button
                key={o}
                onClick={() => !checked && setPicked(o)}
                className="key-3d pop-in rounded-2xl bg-white px-3 py-6 text-lg font-extrabold"
                style={{ color: C.charcoal, animationDelay: `${100 + i * 80}ms`, ...(reveal ? { background: "#e9f4e4", borderColor: "#3e7d32" } : {}), ...(isPicked && !checked ? { background: C.indigo, color: "#fff" } : {}) }}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-5 pb-7">
        {checked && (
          <div
            className="pop-in mb-4 flex items-center gap-3 rounded-2xl border-2 px-4 py-3 font-extrabold"
            style={{
              background: correct ? "#e9f4e4" : "#f8e3dd",
              borderColor: correct ? "#3e7d32" : C.terracotta,
              color: correct ? "#2e5e24" : C.terracotta,
            }}
          >
            {correct ? (
              <span className="text-lg">✓</span>
            ) : (
              <span className="shrink-0"><Mascot size={52} mood="sad" /></span>
            )}
            <span>
              {correct ? `Eyie paa! ${TRANSLATE_Q.explain}` : `Not quite. ${TRANSLATE_Q.explain}`}
            </span>
          </div>
        )}
        <ChunkyButton
          label={checked ? "Continue" : "Check"}
          color={checked ? (correct ? "#3e7d32" : C.terracotta) : picked ? C.terracotta : "#c9bda3"}
          onClick={() => (checked ? go("builder") : setChecked(true))}
        />
      </div>
    </div>
  );
}

/* ── Screen: Sentence Builder ───────────────────────────────────────── */
const BANK = ["Me", "papa", "wɔ", "ha", "yɛ", "nua"];
const ANSWER = ["Me", "papa", "wɔ", "ha"];

function BuilderLesson({ go }: { go: (s: Screen) => void }) {
  const [slots, setSlots] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const remaining = BANK.filter((w) => !slots.includes(w));
  const complete = slots.join(" ") === ANSWER.join(" ");

  return (
    <div className="cloth-texture flex h-full flex-col">
      <LessonBar progress={55} onClose={() => go("path")} />
      <div className="flex-1 px-6 py-5">
        <div className="flex items-start gap-3">
          <button
            aria-label="Play audio"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2"
            style={{ background: C.indigo, borderColor: C.charcoal, boxShadow: `0 4px 0 ${C.charcoal}` }}
          >
            <Speaker />
          </button>
          <div>
            <p className="text-xl font-black" style={{ color: C.charcoal }}>Build this sentence</p>
            <span className="mt-1 inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest" style={{ background: C.gold, color: C.charcoal }}>
              Cultural context · Family greeting
            </span>
          </div>
          <span className="ml-auto shrink-0"><Mascot size={52} mood="think" /></span>
        </div>
        <div
          className="mt-6 flex min-h-28 flex-wrap content-start items-start gap-2 rounded-2xl border-2 border-dashed p-3"
          style={{ borderColor: "#b8a888", background: "rgba(255,255,255,0.5)" }}
        >
          {slots.length === 0 && <span className="px-2 py-3 text-sm font-semibold opacity-50" style={{ color: C.charcoal }}>Tap words below to build “My father is here”…</span>}
          {slots.map((w, i) => (
            <button key={`${w}-${i}`} onClick={() => !done && setSlots(slots.filter((_, j) => j !== i))} className="key-3d rounded-xl bg-white px-4 py-2.5 font-extrabold" style={{ color: C.charcoal }}>
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 pb-7">
        <div className="flex flex-wrap gap-2 border-t-2 pt-4" style={{ borderColor: "#d8cbae" }}>
          {remaining.map((w) => (
            <button
              key={w}
              onClick={() => setSlots([...slots, w])}
              className="key-3d rounded-xl px-4 py-2.5 font-extrabold"
              style={{ background: C.indigo, color: "#fff" }}
            >
              {w}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <ChunkyButton
            label={done ? "Continue" : "Check"}
            color={done ? "#3e7d32" : complete ? C.terracotta : "#c9bda3"}
            onClick={() => (done ? go("speech") : setDone(true))}
          />
        </div>
        {done && (
          <div className="pop-in mt-4 rounded-2xl border-2 px-4 py-3 font-extrabold" style={{ background: complete ? "#e9f4e4" : "#f8e3dd", borderColor: complete ? "#3e7d32" : C.terracotta, color: complete ? "#2e5e24" : C.terracotta }}>
            {complete ? "✓ “Me papa wɔ ha”My father is here." : "✕ Almost! Try: Me · papa · wɔ · ha"}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Screen: Speech Practice ────────────────────────────────────────── */
function SpeechLesson({ go }: { go: (s: Screen) => void }) {
  const [recording, setRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="cloth-texture relative flex h-full flex-col overflow-hidden">
      <LessonBar progress={85} onClose={() => go("path")} />
      <div className="relative z-10 flex flex-1 flex-col items-center px-6 py-4">
        <p className="text-xl font-black" style={{ color: C.charcoal }}>Listen and repeat</p>
        <span className="mt-1 text-sm font-semibold opacity-60" style={{ color: C.charcoal }}>Akan Twi · Pronunciation</span>

        <div className="mt-4">
          <Mascot size={56} mood={recording ? "listen" : "speak"} />
        </div>

        <button aria-label="Play phrase" className="mt-7 flex h-24 w-24 items-center justify-center rounded-full border-2" style={{ background: C.gold, borderColor: C.charcoal, boxShadow: `0 6px 0 ${C.charcoal}` }}>
          <Speaker size={40} color={C.charcoal} />
        </button>
        <p className="mt-4 text-2xl font-black" style={{ color: C.indigo }}>“Medaase pii”</p>
        <p className="text-sm font-semibold italic opacity-60" style={{ color: C.charcoal }}>“Thank you very much”</p>

        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={() => !submitted && setRecording(!recording)}
            className="flex h-20 w-20 items-center justify-center rounded-full border-4"
            style={{ borderColor: C.terracotta, background: recording ? C.terracotta : "#fff", boxShadow: `0 5px 0 ${C.charcoal}` }}
          >
            <Mic color={recording ? "#fff" : C.terracotta} />
          </button>
          <span className="mt-2 text-sm font-extrabold" style={{ color: recording ? C.terracotta : C.charcoal }}>
            {recording ? "Listening…" : "Tap to record"}
          </span>
        </div>
        {submitted && (
          <div className="pop-in mt-5 w-full rounded-2xl border-2 px-4 py-3 text-center font-extrabold" style={{ background: "#e9f4e4", borderColor: "#3e7d32", color: "#2e5e24" }}>
            ✓ Great pronunciation! 95% match.
          </div>
        )}
      </div>
      <div className="relative z-10 px-5 pb-7">
        <ChunkyButton label={submitted ? "Finish Lesson" : "Submit"} color={submitted ? "#3e7d32" : C.terracotta} onClick={() => (submitted ? go("complete") : setSubmitted(true))} />
      </div>
    </div>
  );
}

/* ── Screen: Lesson Complete "Pue!" ─────────────────────────────────── */
const CONFETTI = [
  { x: "12%", delay: "0s", color: C.gold, size: 10 },
  { x: "24%", delay: "0.5s", color: C.terracotta, size: 8 },
  { x: "38%", delay: "1.1s", color: C.cream, size: 9 },
  { x: "52%", delay: "0.2s", color: C.gold, size: 8 },
  { x: "64%", delay: "0.9s", color: C.terracotta, size: 10 },
  { x: "76%", delay: "1.4s", color: C.cream, size: 8 },
  { x: "88%", delay: "0.6s", color: C.gold, size: 9 },
];

function Complete({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-between overflow-hidden px-8 py-12" style={{ background: C.indigo }}>
      <KentePattern color={C.gold} id="kente-complete" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className="confetti absolute top-0 block rounded-[2px]"
            style={{ left: c.x, width: c.size, height: c.size, background: c.color, animationDelay: c.delay }}
          />
        ))}
      </div>

      <div className="pop-in relative mt-6">
        <div className="absolute inset-0 blur-2xl opacity-40" style={{ background: C.gold, borderRadius: "50%" }} />
        <Mascot size={128} mood="cheer" style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.4))" }} />
        <span className="twinkle absolute -right-3 -top-2"><Sparkle size={24} /></span>
        <span className="twinkle absolute -left-4 top-6" style={{ animationDelay: "0.7s" }}><Sparkle size={18} /></span>
      </div>
      <div className="pop-in relative text-center" style={{ animationDelay: "150ms" }}>
        <h2 className="text-4xl font-black" style={{ color: C.gold }}>Pue!</h2>
        <p className="mt-1 text-lg font-bold" style={{ color: C.cream }}>(It clicked!)</p>
      </div>
      <div className="pop-in relative grid w-full grid-cols-3 gap-3" style={{ animationDelay: "280ms" }}>
        {[
          { v: "+20", l: "XP Earned" },
          { v: "95%", l: "Accuracy" },
          { v: "5", l: "Day Streak" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 py-4 text-center" style={{ borderColor: C.gold, background: "rgba(247,239,223,0.06)" }}>
            <p className="text-2xl font-black" style={{ color: C.gold }}>{s.v}</p>
            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.cream }}>{s.l}</p>
          </div>
        ))}
      </div>
      <div className="pop-in relative w-full" style={{ animationDelay: "400ms" }}>
        <ChunkyButton label="Continue" color={C.gold} textColor={C.charcoal} onClick={() => go("practice")} />
      </div>
    </div>
  );
}

/* ── Screen: Akwaaba Premium (subscription) ─────────────────────────── */
const PREMIUM_PERKS = [
  "Unlimited heartsnever wait to learn",
  "All three languages · Twi · Eʋe · Gã",
  "Offline lessons, stories & audio",
  "Pronunciation coaching with real scores",
  "Zero ads, ever",
];

function Premium({ go }: { go: (s: Screen) => void }) {
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-6 pb-7" style={{ background: C.indigo }}>
      <KentePattern color={C.gold} id="kente-premium" />
      <button
        onClick={() => go("profile")}
        aria-label="Close premium"
        className="relative z-10 self-end pt-5 text-2xl font-black"
        style={{ color: C.cream, opacity: 0.7 }}
      >
        ✕
      </button>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="pop-in relative">
          <div className="absolute inset-0 blur-2xl opacity-40" style={{ background: C.gold, borderRadius: "50%" }} />
        <Mascot size={104} mood="cheer" style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.4))" }} />
        </div>
        <h2 className="mt-1 text-3xl font-black" style={{ color: C.gold }}>Akwaaba Premium</h2>
        <p className="mt-1 text-sm font-bold" style={{ color: C.cream, opacity: 0.85 }}>
          Learn all of Ghana, without limits.
        </p>
      </div>

      <div className="relative z-10 mt-5 space-y-2.5 text-left">
        {PREMIUM_PERKS.map((perk, i) => (
          <div key={perk} className="pop-in flex items-center gap-3" style={{ animationDelay: `${i * 70}ms` }}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2" style={{ background: C.gold, borderColor: C.charcoal }}>
              <Check color={C.charcoal} size={14} />
            </span>
            <span className="text-sm font-bold" style={{ color: C.cream }}>{perk}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setPlan("monthly")}
          className="key-3d rounded-2xl px-3 py-4 text-left"
          style={
            plan === "monthly"
              ? { background: C.gold, color: C.charcoal, border: `2px solid ${C.charcoal}` }
              : { background: "rgba(247,239,223,0.07)", color: C.cream, border: `2px solid ${C.cream}44` }
          }
        >
          <span className="block text-lg font-black">GH₵25</span>
          <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70">per month</span>
        </button>
        <button
          onClick={() => setPlan("yearly")}
          className="key-3d relative rounded-2xl px-3 py-4 text-left"
          style={
            plan === "yearly"
              ? { background: C.gold, color: C.charcoal, border: `2px solid ${C.charcoal}` }
              : { background: "rgba(247,239,223,0.07)", color: C.cream, border: `2px solid ${C.cream}44` }
          }
        >
          <span className="absolute -top-2.5 right-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-widest" style={{ background: C.terracotta, color: "#fff" }}>
            2 months free
          </span>
          <span className="block text-lg font-black">GH₵150</span>
          <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70">per year</span>
        </button>
      </div>

      <div className="relative z-10 mt-auto pt-5">
        <ChunkyButton
          label={plan === "yearly" ? "Start 7 days free" : "Start 7 days free · GH₵25/mo"}
          color={C.gold}
          textColor={C.charcoal}
          onClick={() => go("path")}
        />
        <button
          onClick={() => go("path")}
          className="mt-3 w-full text-center text-xs font-black uppercase tracking-widest opacity-60"
          style={{ color: C.cream }}
        >
          Continue with Free
        </button>
        <p className="mt-2 text-center text-[10px] font-semibold" style={{ color: C.cream, opacity: 0.5 }}>
          Cancel anytime · Restore purchase ·{" "}
          <a href="/legal" className="underline underline-offset-2">
            Terms &amp; Privacy
          </a>
        </p>
      </div>
    </div>
  );
}

/* ── Screen: Practice & Weak Words (per language) ───────────────────── */
const WEAK_WORDS: Record<Lang, { twi: string; en: string }[]> = {
  twi: [
    { twi: "Akwaaba", en: "Welcome" },
    { twi: "Da yie", en: "Sleep well / Good night" },
    { twi: "Medaase", en: "Thank you" },
    { twi: "Mepa wo kyɛw", en: "Please / Sorry" },
    { twi: "Ɛte sɛn?", en: "How are you?" },
    { twi: "Nante yie", en: "Go well / Farewell" },
  ],
  ewe: [
    { twi: "Miawoe zɔ", en: "Welcome (to many)" },
    { twi: "Akpe na wò", en: "Thank you" },
    { twi: "Ŋdi", en: "Good morning" },
    { twi: "Akpe kakɛ", en: "Thanks a lot" },
    { twi: "Ɣetrɔ", en: "Good evening" },
    { twi: "Dede", en: "Yes indeed" },
  ],
  ga: [
    { twi: "Ojekoo", en: "Good morning" },
    { twi: "Oyiwalaadɔŋŋ", en: "Thank you" },
    { twi: "Te oyɔɔ tɛŋŋ?", en: "How are you?" },
    { twi: "Oshwiee", en: "Good evening" },
    { twi: "Ojemra", en: "Morning reply" },
    { twi: "Mɔlɔ", en: "Sorry / excuse me" },
  ],
};

function Practice({ go, lang }: { go: (s: Screen) => void; lang: Lang }) {
  return (
    <div className="cloth-texture flex h-full flex-col">
      <PathHeader onMenu={() => go("path")} lang={lang} />
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-4">
        <h2 className="text-2xl font-black" style={{ color: C.charcoal }}>Practice</h2>
        <p className="mb-4 text-sm font-semibold opacity-60" style={{ color: C.charcoal }}>
          Spaced repetition keeps your {CURRICULUM[lang].native} words fresh.
        </p>

        <div className="rounded-3xl border-2 p-5" style={{ background: C.indigo, borderColor: C.charcoal, boxShadow: `0 5px 0 ${C.charcoal}` }}>
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: C.gold }}>Memory retention</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full" style={{ background: "rgba(247,239,223,0.2)" }}>
            <div className="h-full rounded-full" style={{ width: "68%", background: C.gold }} />
          </div>
          <p className="mt-3 text-sm font-bold" style={{ color: C.cream }}>
            68% recall window · 12 words weakening
          </p>
        </div>

        <div className="mt-5">
          <button className="key-3d w-full rounded-2xl py-4 text-base font-extrabold uppercase tracking-[0.18em]" style={{ background: C.indigo, color: "#fff" }}>
            Start Quick Review
          </button>
        </div>

        <h3 className="mt-7 mb-2 text-lg font-black" style={{ color: C.charcoal }}>Words to Review</h3>
        <div className="space-y-3">
          {WEAK_WORDS[lang].map((w) => (
            <div key={w.twi} className="flex items-center gap-3 overflow-hidden rounded-2xl border-2 bg-white" style={{ borderColor: C.charcoal }}>
              <div className="h-full w-1.5 self-stretch" style={{ background: C.terracotta }} />
              <div className="flex-1 py-3.5 pl-1">
                <p className="text-base font-black" style={{ color: C.charcoal }}>{w.twi}</p>
                <p className="text-sm font-semibold opacity-60" style={{ color: C.charcoal }}>{w.en}</p>
              </div>
              <button aria-label={`Hear ${w.twi}`} className="mr-4 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: C.gold }}>
                <Speaker size={18} color={C.charcoal} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Screen: Profile & Settings ─────────────────────────────────────── */
function Toggle({ on: initial }: { on: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn(!on)}
      className="relative h-7 w-12 rounded-full border-2 transition-colors"
      style={{ background: on ? C.indigo : "#d8cbae", borderColor: C.charcoal }}
      aria-pressed={on}
    >
      <span className="absolute top-0.5 rounded-full transition-all" style={{ height: 18, width: 18, background: "#fff", left: on ? 24 : 3 }} />
    </button>
  );
}

function Profile({ go, lang }: { go: (s: Screen) => void; lang: Lang }) {
  const stats = courseStats(lang);
  const groups = [
    { title: "Account", rows: ["Google Account · kwame@…", "Linked Accounts"] },
    { title: "Daily Goal", rows: ["10 XP · Casual (edit)"] },
    { title: "Preferences", rows: ["Sound Effects", "Notifications"] },
    { title: "Privacy & Data", rows: ["Personalized Ads", "Delete My Data"] },
  ];
  return (
    <div className="cloth-texture flex h-full flex-col">
      <PathHeader onMenu={() => go("path")} lang={lang} />
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 text-2xl font-black" style={{ background: C.gold, borderColor: C.charcoal, color: C.charcoal }}>K</div>
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs" style={{ background: C.indigo, borderColor: C.cream, color: C.gold }}>✓</span>
          </div>
          <div>
            <p className="text-xl font-black" style={{ color: C.charcoal }}>Kwame Mensah</p>
            <p className="text-sm font-semibold opacity-60" style={{ color: C.charcoal }}>
              Learning {CURRICULUM[lang].name} · Accra
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border-2" style={{ borderColor: C.charcoal, background: C.indigo }}>
          {[
            { v: "5", l: "Streak · Days" },
            { v: "120", l: "Total XP" },
            { v: `${stats.doneLessons}/${stats.totalLessons}`, l: "Lessons" },
          ].map((s, i) => (
            <div key={s.l} className="py-4 text-center" style={{ borderLeft: i > 0 ? "2px solid rgba(247,239,223,0.2)" : "none" }}>
              <p className="text-lg font-black" style={{ color: C.gold }}>{s.v}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.cream }}>{s.l}</p>
            </div>
          ))}
        </div>

        {groups.map((g) => (
          <div key={g.title} className="mt-5">
            <p className="mb-2 text-xs font-black uppercase tracking-widest opacity-60" style={{ color: C.charcoal }}>{g.title}</p>
            <div className="overflow-hidden rounded-2xl border-2" style={{ borderColor: C.charcoal, background: "#fff" }}>
              {g.rows.map((r, i) => (
                <div key={r} className="flex items-center justify-between px-4 py-3.5" style={{ borderTop: i > 0 ? "2px solid #efe6d2" : "none" }}>
                  <span className="font-bold" style={{ color: C.charcoal }}>{r}</span>
                  {["Sound Effects", "Notifications", "Personalized Ads"].includes(r) ? (
                    <Toggle on={r !== "Personalized Ads"} />
                  ) : (
                    <span style={{ color: C.terracotta }}>›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <button
            onClick={() => go("premium")}
            className="key-3d flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left"
            style={{ background: C.indigo, borderColor: C.charcoal }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-base" style={{ background: C.gold }}>★</span>
            <span className="flex-1">
              <span className="block text-sm font-black" style={{ color: C.gold }}>Akwaaba Premium</span>
              <span className="block text-xs font-semibold" style={{ color: C.cream, opacity: 0.7 }}>Free plan · Upgrade for unlimited hearts</span>
            </span>
            <span style={{ color: C.gold }}>›</span>
          </button>
          <div className="mt-3">
            <ChunkyButton label="Remove Ads (Go Premium)" color={C.terracotta} outline onClick={() => go("premium")} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── App shell: phone frame + screen router ─────────────────────────── */
const SCREEN_IDS: Screen[] = ["onboard", "auth", "path", "translate", "builder", "speech", "complete", "practice", "profile", "premium"];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("onboard");
  const [drawer, setDrawer] = useState(false);
  const [lang, setLang] = useState<Lang>("twi");

  // deep link a specific screen, e.g. /?screen=practice (used by /design gallery)
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("screen");
    if (s && SCREEN_IDS.includes(s as Screen)) setScreen(s as Screen);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div
        className="relative h-[860px] max-h-[92vh] w-[400px] max-w-full overflow-hidden rounded-[2.5rem] border-2"
        style={{ borderColor: C.charcoal, boxShadow: `0 0 0 8px ${C.charcoal}, 0 24px 60px rgba(0,0,0,0.6)` }}
      >
        <div className="h-full">
          {screen === "onboard" && <Onboarding go={setScreen} />}
          {screen === "auth" && <Auth go={setScreen} lang={lang} setLang={setLang} />}
          {screen === "path" && <LearningPath go={setScreen} openDrawer={() => setDrawer(true)} lang={lang} />}
          {screen === "translate" && <TranslateLesson go={setScreen} />}
          {screen === "builder" && <BuilderLesson go={setScreen} />}
          {screen === "speech" && <SpeechLesson go={setScreen} />}
          {screen === "complete" && <Complete go={setScreen} />}
          {screen === "practice" && <Practice go={setScreen} lang={lang} />}
          {screen === "profile" && <Profile go={setScreen} lang={lang} />}
          {screen === "premium" && <Premium go={setScreen} />}
        </div>
        {screen !== "auth" && screen !== "onboard" && screen !== "premium" && (
          <Drawer open={drawer} close={() => setDrawer(false)} go={setScreen} />
        )}
      </div>
    </main>
  );
}
