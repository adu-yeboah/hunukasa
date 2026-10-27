"use client";

import { MascotStar } from "@/components/MascotStar";
import { C } from "@/lib/constant";
import { buildReviewExercises, collectLearnedWords } from "@/lib/lesson";
import { useProgress } from "@/lib/progress";
import Link from "next/link";

/* Practice — retention card, Quick Review over learned words, and the
   word list. FSRS scheduling arrives in Phase 5; counts are real today. */

const Speaker = ({ term }: { term: string }) => (
  <span
    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
    style={{ background: C.gold }}
    title={`Audio for “${term}” arrives with the audio release`}
  >
    <svg width={16} height={16} viewBox="0 0 24 24">
      <path d="M11 5L6 9H3v6h3l5 4z" fill="#2B211A" />
      <path
        d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12"
        stroke="#2B211A"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default function PracticePage() {
  const { completed } = useProgress();
  const learned = collectLearnedWords(completed);
  const words = learned.length;
  const retention = Math.min(96, words * 5);
  const canReview = words >= 2;
  const reviewWords = learned.slice(-6).reverse();
  const exercises = buildReviewExercises(completed);

  return (
    <div className="px-4 pb-10 pt-5">
      <h1 className="text-2xl font-black tracking-wide text-charcoal">Practice</h1>

      {/* retention card */}
      <div className="mt-4 rounded-3xl border-2 border-charcoal bg-indigo p-5">
        <p className="text-sm font-black uppercase tracking-widest text-gold">Memory retention</p>
        <div className="mt-3 h-3 overflow-hidden rounded-full" style={{ background: "rgba(247,239,223,0.2)" }}>
          <div className="h-full rounded-full bg-gold" style={{ width: `${retention}%` }} />
        </div>
        <p className="mt-3 text-sm font-bold text-cream">
          {words > 0
            ? `${retention}% recall window · ${words} word${words === 1 ? "" : "s"} learned`
            : "Learn your first lesson to start tracking retention"}
        </p>
      </div>

      {/* quick review */}
      <div className="mt-6">
        {canReview ? (
          <Link
            href="/lesson/review-twi"
            className="key-3d block w-full rounded-2xl bg-indigo px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-cream"
          >
            Start Quick Review
          </Link>
        ) : (
          <>
            <span className="key-3d block w-full cursor-not-allowed rounded-2xl bg-indigo px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-cream opacity-60">
              Start Quick Review
            </span>
            <p className="mt-2 text-center text-xs font-semibold text-charcoal/50">
              Unlocks after 2 learned words
            </p>
          </>
        )}
        {canReview && exercises.length > 0 && (
          <p className="mt-2 text-center text-xs font-semibold text-charcoal/50">
            {exercises.length} exercises from your learned words
          </p>
        )}
      </div>

      {/* words to review */}
      <h2 className="mb-3 mt-8 text-lg font-black text-charcoal">Words to Review</h2>
      {reviewWords.length === 0 ? (
        <p className="px-1 text-sm font-semibold text-charcoal/50">
          Nothing yet — finish lessons on the path and your words appear here.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {reviewWords.map((w) => (
            <div
              key={w.term}
              className="flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-charcoal bg-white"
            >
              <span className="w-1.5 self-stretch" style={{ background: C.terracotta }} />
              <span className="flex-1 py-3.5">
                <span className="block text-base font-black text-charcoal">{w.term}</span>
                <span className="block text-sm font-semibold text-charcoal opacity-60">{w.gloss}</span>
              </span>
              <Speaker term={w.term} />
            </div>
          ))}
        </div>
      )}

      {words >= 6 && (
        <div className="mt-8 flex items-center justify-center gap-2 opacity-60">
          <MascotStar mood="sleep" size={40} />
          <p className="text-xs font-bold text-charcoal/60">Older words rest — FSRS review lands soon.</p>
        </div>
      )}
    </div>
  );
}
