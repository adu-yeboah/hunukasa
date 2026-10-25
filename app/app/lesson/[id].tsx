import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";

import { KeyButton } from "@/components/KeyButton";
import { MascotStar } from "@/components/MascotStar";
import { toast } from "@/components/Toast";
import { C, FONT } from "@/lib/theme";
import { buildReviewExercises, getLessonExercises, parseLessonId } from "@/lib/lesson";
import {
  MAX_HEARTS,
  checkAnswer,
  createSession,
  currentExercise,
  next,
  sessionAccuracy,
  sessionXp,
  type SessionState,
} from "@/lib/session-engine";
import { useProgressStore } from "@/lib/progress";

/* Lessonthe core loop: hearts bar, select exercises, feedback, and the
   hand-off to the Pue! screen. Exercises are generated from the curriculum
   until Phase 1.4 ships hand-authored ones. */

const Heart = ({ filled }: { filled: boolean }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Path
      d="M12 21C7 16.5 3 13.2 3 9a4.6 4.6 0 018-3.1A4.6 4.6 0 0119 9c0 4.2-4 7.5-7 12z"
      fill={filled ? C.gold : "none"}
      stroke={C.gold}
      strokeWidth={2}
    />
  </Svg>
);

export default function Lesson() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id ?? "";
  const isReview = id.startsWith("review-");
  const reviewLang = isReview ? (id.replace("review-", "") as "twi" | "ewe" | "ga") : "twi";
  const ref = useMemo(() => parseLessonId(id), [id]);
  const completed = useProgressStore((s) => s.completed);
  const exercises = useMemo(
    () =>
      isReview
        ? buildReviewExercises(reviewLang, completed)
        : ref
        ? getLessonExercises(ref.lang, ref.sIdx, ref.uIdx, ref.lIdx)
        : [],
    [id, ref, isReview, completed, reviewLang]
  );
  const [state, setState] = useState<SessionState>(() => createSession(exercises));
  const [pressed, setPressed] = useState<string | null>(null);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  if (exercises.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <StatusBar style="dark" />
        <Text style={{ color: C.charcoal, fontFamily: FONT.bold }}>
          {isReview ? "Complete a lesson firstreviews are built from what you've learned." : "Lesson not found."}
        </Text>
      </View>
    );
  }

  const ex = currentExercise(state);
  const total = state.queue.length;
  const progress = Math.min(100, Math.round((state.idx / total) * 100));

  const finish = (s: SessionState) => {
    const xp = sessionXp(s);
    if (ref) completeLesson(ref.id, xp); // reviews award XP only
    router.replace({
      pathname: "/complete",
      params: { xp: String(xp), acc: String(sessionAccuracy(s)), lang: ref?.lang ?? reviewLang },
    });
  };

  const onCheck = () => {
    const s2 = checkAnswer(state);
    setState(s2);
    if (s2.hearts === 0 && s2.checked && state.picked !== ex?.answer) {
      // hearts run out after this check is advancedhandle in onContinue
    }
  };

  const onContinue = () => {
    const s2 = next(state);
    if (s2.hearts === 0) {
      toast.show("Out of hearts! The lesson resetspractice makes perfect.");
      router.replace("/learn");
      return;
    }
    setState(s2);
    if (s2.finished) finish(s2);
  };

  const correct = state.picked === ex?.answer;
  const checkColor = state.checked
    ? correct
      ? "#3e7d32"
      : C.terracotta
    : state.picked
    ? C.terracotta
    : "#c9bda3";

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* top bar */}
      <View className="flex-row items-center gap-4 px-5 pt-14">
        <Pressable onPress={() => (router.canDismiss() ? router.dismiss() : router.push("/learn"))} accessibilityLabel="Exit lesson">
          <Text className="text-2xl" style={{ color: C.terracotta, fontFamily: FONT.black }}>✕</Text>
        </Pressable>
        <View className="h-4 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: "#e6dcc6", borderWidth: 2, borderColor: C.charcoal }}>
          <View className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: C.indigo }} />
        </View>
        <View className="flex-row items-center gap-1">
          {Array.from({ length: MAX_HEARTS }, (_, i) => (
            <Heart key={i} filled={i < state.hearts} />
          ))}
        </View>
      </View>

      {ex && (
        <View className="flex-1 px-6 pt-6">
          <Text className="text-xl leading-snug" style={{ color: C.charcoal, fontFamily: FONT.black }}>
            {ex.prompt}
          </Text>

          {/* 2×2 select grid */}
          <View className="mt-6 gap-3">
            {[0, 1].map((row) => (
              <View key={row} className="flex-row gap-3">
                {ex.options.slice(row * 2, row * 2 + 2).map((opt) => {
                  const isPicked = state.picked === opt;
                  const revealCorrect = state.checked && opt === ex.answer;
                  const revealWrong = state.checked && isPicked && !correct;
                  return (
                    <Pressable
                      key={opt}
                      onPress={() => !state.checked && setState({ ...state, picked: opt })}
                      onPressIn={() => !state.checked && setPressed(opt)}
                      onPressOut={() => setPressed(null)}
                      accessibilityRole="button"
                      accessibilityLabel={opt}
                      className="flex-1 items-center rounded-2xl border-2 px-2 py-6"
                      style={{
                        backgroundColor: revealCorrect
                          ? "#e9f4e4"
                          : revealWrong
                          ? "#f8e3dd"
                          : isPicked
                          ? C.indigo
                          : "#fff",
                        borderColor: revealCorrect ? "#3e7d32" : revealWrong ? C.terracotta : C.charcoal,
                        transform: [{ scale: pressed === opt && !state.checked ? 0.97 : 1 }],
                      }}
                    >
                      <Text
                        className="text-center text-base"
                        style={{
                          color: isPicked && !state.checked ? "#fff" : C.charcoal,
                          fontFamily: FONT.extra,
                        }}
                      >
                        {opt}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* feedback + action */}
      <View className="px-5 pb-7">
        {state.checked && ex && (
          <View
            className="mb-4 flex-row items-center gap-3 rounded-2xl border-2 px-4 py-3"
            style={{
              backgroundColor: correct ? "#e9f4e4" : "#f8e3dd",
              borderColor: correct ? "#3e7d32" : C.terracotta,
            }}
          >
            {correct ? (
              <Text className="text-lg">✓</Text>
            ) : (
              <MascotStar mood="sad" size={44} />
            )}
            <Text style={{ color: correct ? "#2e5e24" : C.terracotta, fontFamily: FONT.extra }}>{ex.explain}</Text>
          </View>
        )}
        <KeyButton
          label={state.checked ? "Continue" : "Check"}
          color={checkColor}
          textColor={state.checked && correct ? "#fff" : correct ? "#fff" : state.picked || state.checked ? "#fff" : C.charcoal}
          disabled={!state.checked && !state.picked}
          onPress={() => (state.checked ? onContinue() : onCheck())}
        />
      </View>
    </View>
  );
}
