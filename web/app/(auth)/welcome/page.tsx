"use client";

import { useRef, useState } from "react";

import { MascotStar } from "@/components/MascotStar";
import { KentePattern } from "@/components/ui/KentePattern";
import { SunEmblem } from "@/components/ui/SunEmblem";
import { C } from "@/lib/constant";


const SLIDES: { mood: "wave" | "point" | "cheer"; title: string; body: string }[] = [
  {
    mood: "wave",
    title: "Akwaaba, welcome",
    body: "Learn Asante Twi with Nsoromma, your star companion for every word you speak.",
  },
  {
    mood: "point",
    title: "A curriculum you can trust",
    body: "Lessons are adapted from the FSI Twi Basic Course, expert-built in 1963 and in the public domain.",
  },
  {
    mood: "cheer",
    title: "Free, forever",
    body: "No ads, no paywall, no account needed. Your progress stays on your device.",
  },
];

export default function OnboardingPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = active === SLIDES.length - 1;

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden" style={{ background: C.indigo }}>
      <KentePattern color={C.gold} id="kente-onboarding" />

      <a
        href="/sign-in"
        className="absolute right-4 top-4 z-20 rounded-xl px-3 py-1.5 text-[11px] font-black uppercase tracking-widest transition-opacity hover:opacity-100 md:right-6 md:top-6"
        style={{ color: C.cream, opacity: 0.6 }}
      >
        Skip →
      </a>

      {/* slide track */}
      <div
        ref={trackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / el.clientWidth);
          setActive((prev) => (prev === i ? prev : i));
        }}
        className="relative z-10 flex flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {SLIDES.map((s) => (
          <section
            key={s.mood}
            className="flex w-full shrink-0 snap-center flex-col items-center justify-center px-7 py-16 text-center"
          >
            <div className="relative flex h-56 w-56 items-center justify-center md:h-64 md:w-64">
              <SunEmblem className="spin-slow absolute inset-0 h-full w-full opacity-30" />
              <div className="floaty absolute inset-0 flex items-center justify-center">
                <MascotStar mood={s.mood} size={180} />
              </div>
            </div>
            <h1
              className="mt-8 max-w-md text-3xl font-black leading-tight tracking-wide md:text-4xl"
              style={{ color: C.gold }}
            >
              {s.title}
            </h1>
            <p
              className="mt-4 max-w-md text-base font-semibold leading-relaxed"
              style={{ color: C.cream, opacity: 0.85 }}
            >
              {s.body}
            </p>
          </section>
        ))}
      </div>

      {/* controls */}
      <div className="relative z-10 px-7 pb-10">
        <div className="mb-6 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.mood}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: i === active ? 26 : 8, background: i === active ? C.gold : `${C.cream}55` }}
            />
          ))}
        </div>
        <div className="mx-auto flex max-w-md items-center justify-center gap-3">
          {active > 0 && (
            <button
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
              className="key-3d flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black"
              style={{ background: "rgba(247,239,223,0.08)", color: C.cream, border: `2px solid ${C.cream}44` }}
            >
              ‹
            </button>
          )}
          <a
            href="/sign-in"
            className="key-3d flex-1 rounded-2xl bg-gold px-6 py-3.5 text-center text-sm font-black uppercase tracking-[0.18em] text-charcoal"
            onClick={(e) => {
              if (!last) {
                e.preventDefault();
                goTo(active + 1);
              }
            }}
          >
            {last ? "Start learning" : "Continue"}
          </a>
          {active < SLIDES.length - 1 && (
            <button
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
              className="key-3d flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black"
              style={{ background: "rgba(247,239,223,0.08)", color: C.cream, border: `2px solid ${C.cream}44` }}
            >
              ›
            </button>
          )}
        </div>
        <p
          className="mt-4 text-center text-[11px] font-bold uppercase tracking-widest"
          style={{ color: C.cream, opacity: 0.4 }}
        >
          ← swipe or use the arrows →
        </p>
      </div>
    </div>
  );
}
