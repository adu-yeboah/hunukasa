"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { MascotStar } from "@/components/MascotStar";
import { C } from "@/lib/constant";
import {
  buildReviewExercises,
  getCheckpointExercises,
  getLessonExercises,
} from "@/lib/lesson";
import { completeLesson, useProgress } from "@/lib/progress";
import {
  checkAnswer,
  createSession,
  currentExercise,
  next,
  sessionAccuracy,
  sessionPassed,
  sessionXp,
  type SessionState,
} from "@/lib/session-engine";

/* Lesson — select exercises with hearts, requeue and XP. Checkpoint mode
   (id ends in -cp) drops hearts and needs 4/5 to pass. Review mode
   (id starts with review-) quizzes every learned word. */

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24">
      <path
        d="M12 21C7 16.5 3 13.2 3 9a4.6 4.6 0 018-3.1A4.6 4.6 0 0119 9c0 4.2-4 7.5-7 12z"
        fill={filled ? C.gold : "none"}
        stroke={C.gold}
        strokeWidth={2}
      />
    </svg>
  );
}

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id ?? "");
  const isCheckpoint = id.endsWith("-cp");
  const isReview = id.startsWith("review-");
  const router = useRouter();
  const { completed } = useProgress();

  const exercises = useMemo(() => {
    if (isCheckpoint) return getCheckpointExercises(id.replace("-cp", ""));
    if (isReview) return buildReviewExercises(completed);
    const parts = id.split("-");
    const lIdx = Number(parts[3] ?? 0);
    return getLessonExercises(parts.slice(0, 3).join("-"), lIdx);
    // completed intentionally excluded for review so the quiz is stable mid-play
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [state, setState] = useState<SessionState>(() => createSession(exercises, isCheckpoint));

  const ex = currentExercise(state);
  const progress = Math.min(100, Math.round((state.idx / Math.max(state.queue.length, 1)) * 100));
  const correct = state.picked === ex?.answer;

  const finish = (s: SessionState) => {
    const xp = sessionXp(s);
    if (!isReview) completeLesson(id, xp);
    router.push(
      `/complete?xp=${xp}&acc=${sessionAccuracy(s)}&pass=${sessionPassed(s) ? 1 : 0}&cp=${isCheckpoint ? 1 : 0}`
    );
  };

  const onContinue = () => {
    const s2 = next(state);
    if (!isCheckpoint && s2.hearts === 0) {
      router.push(`/complete?xp=${sessionXp(state)}&acc=${sessionAccuracy(state)}&pass=0`);
      return;
    }
    setState(s2);
    if (s2.finished) finish(s2);
  };

  const btnColor = state.checked
    ? correct
      ? "#3e7d32"
      : C.terracotta
    : state.picked
    ? C.terracotta
    : "#c9bda3";

  return (
    <div className="flex min-h-screen flex-col px-4 pb-8 pt-5">
      {/* top bar */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.push("/learn")} aria-label="Exit lesson">
          <span className="text-2xl font-black text-terracotta">✕</span>
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full border-2 border-charcoal bg-[#e6dcc6]">
          <div
            className="h-full rounded-full bg-indigo transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {!isCheckpoint && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Heart key={i} filled={i < state.hearts} />
            ))}
          </div>
        )}
        {isCheckpoint && (
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.indigo }}>
            Checkpoint
          </span>
        )}
      </div>

      {ex ? (
        <>
          <h2 className="mt-8 text-xl font-black leading-snug text-charcoal md:text-2xl">{ex.prompt}</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ex.options.map((opt) => {
              const isPicked = state.picked === opt;
              const revealOk = state.checked && opt === ex.answer;
              const revealBad = state.checked && isPicked && !correct;
              return (
                <button
                  key={opt}
                  onClick={() => !state.checked && setState({ ...state, picked: opt })}
                  className="rounded-2xl border-2 px-4 py-6 text-base font-extrabold transition-colors"
                  style={{
                    background: revealOk ? "#e9f4e4" : revealBad ? "#f8e3dd" : isPicked ? C.indigo : "#fff",
                    borderColor: revealOk ? "#3e7d32" : revealBad ? C.terracotta : C.charcoal,
                    color: isPicked && !state.checked ? "#fff" : C.charcoal,
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <p className="mt-8 text-sm font-bold text-charcoal/60">
          This lesson is being authored — new units land with the community.
        </p>
      )}

      {/* feedback + action */}
      <div className="mt-auto pt-10">
        {state.checked && ex && (
          <div
            className="mb-4 flex items-center gap-3 rounded-2xl border-2 px-4 py-3 font-extrabold"
            style={{
              background: correct ? "#e9f4e4" : "#f8e3dd",
              borderColor: correct ? "#3e7d32" : C.terracotta,
              color: correct ? "#2e5e24" : C.terracotta,
            }}
          >
            {correct ? <span className="text-lg">✓</span> : <MascotStar mood="sad" size={44} />}
            <span>{ex.explain}</span>
          </div>
        )}
        <button
          onClick={() => (state.checked ? onContinue() : setState(checkAnswer(state)))}
          disabled={!state.checked && !state.picked}
          className="key-3d w-full rounded-2xl px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em]"
          style={{
            background: btnColor,
            color: state.picked || state.checked ? "#fff" : C.charcoal,
            opacity: !state.checked && !state.picked ? 0.7 : 1,
          }}
        >
          {state.checked ? "Continue" : "Check"}
        </button>
      </div>
    </div>
  );
}
