import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";

import { Drawer } from "@/components/Drawer";
import { Bolt } from "@/components/icons";
import { KeyButton } from "@/components/KeyButton";
import { PathHeader } from "@/components/PathHeader";
import { Toast } from "@/components/Toast";
import { toast } from "@/components/Toast";
import { collectLearnedWords } from "@/lib/lesson";
import { useProgressStore } from "@/lib/progress";
import { useLangStore } from "@/lib/store";
import { C, FONT } from "@/lib/theme";

/* Practice & Weak Wordsreal stats from the progress store: retention
   overview, Quick Review (a mixed quiz built from every learned word),
   and the review list. Audio buttons land in Phase 5. */

const Speaker = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    <Path d="M11 5L6 9H3v6h3l5 4z" fill={C.charcoal} />
    <Path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" stroke={C.charcoal} strokeWidth={2} fill="none" strokeLinecap="round" />
  </Svg>
);

function SoundButton({ term }: { term: string }) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      accessibilityRole="button"
      accessibilityLabel={`Hear ${term}`}
      className="mr-4 h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: C.gold, transform: [{ scale: pressed ? 0.9 : 1 }] }}
      onPress={() => toast.show("Native audio arrives in Phase 5recordings are being commissioned.")}
    >
      <Speaker />
    </Pressable>
  );
}

export default function Practice() {
  const lang = useLangStore((s) => s.lang);
  const completed = useProgressStore((s) => s.completed);
  const xp = useProgressStore((s) => s.xp);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const learned = collectLearnedWords(lang, completed);
  const words = learned.length;
  const retention = Math.min(96, words * 5); // honest estimate until FSRS (Phase 7)
  const reviewWords = learned.slice(-6).reverse();
  const langName = lang === "ewe" ? "Eʋe" : lang === "ga" ? "Ga" : "Twi";

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />
      <PathHeader lang={lang} onMenu={() => setDrawerOpen(true)} xp={xp} streak={5} />

      <Text className="mt-3 px-5 text-2xl" style={{ color: C.charcoal, fontFamily: FONT.black }}>
        Practice
      </Text>
      <Text className="mb-4 px-5 text-sm opacity-60" style={{ color: C.charcoal, fontFamily: FONT.semi }}>
        Spaced repetition keeps your {langName} words fresh.
      </Text>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* retention card */}
      <View className="mx-5 rounded-3xl border-2 p-5" style={{ backgroundColor: C.indigo, borderColor: C.charcoal }}>
        <Text className="text-sm uppercase tracking-widest" style={{ color: C.gold, fontFamily: FONT.black }}>
          Memory retention
        </Text>
        <View className="mt-3 h-3 overflow-hidden rounded-full" style={{ backgroundColor: "rgba(247,239,223,0.2)" }}>
          <View className="h-full rounded-full" style={{ width: `${retention}%`, backgroundColor: C.gold }} />
        </View>
        <Text className="mt-3 text-sm" style={{ color: C.cream, fontFamily: FONT.bold }}>
          {words > 0
            ? `${retention}% recall window · ${words} word${words === 1 ? "" : "s"} learned`
            : "Learn your first lesson to start tracking retention"}
        </Text>
      </View>

      {/* quick review */}
      <View className="mt-5 px-5">
        <KeyButton
          label="Start Quick Review"
          icon={<Bolt color={C.gold} />}
          color={C.indigo}
          disabled={words < 2}
          onPress={() => router.push({ pathname: "/lesson/[id]", params: { id: `review-${lang}` } })}
        />
        {words < 2 && (
          <Text className="mt-2 text-center text-xs opacity-50" style={{ color: C.charcoal, fontFamily: FONT.semi }}>
            Quick Review unlocks after 2 learned words
          </Text>
        )}
      </View>

      {/* words to review */}
      <Text className="mb-2 mt-7 px-5 text-lg" style={{ color: C.charcoal, fontFamily: FONT.black }}>
        Words to Review
      </Text>
      {reviewWords.length === 0 ? (
        <Text className="px-5 text-sm opacity-50" style={{ color: C.charcoal, fontFamily: FONT.semi }}>
          Nothing yetfinish lessons on the path and your words appear here.
        </Text>
      ) : (
        <View className="gap-3 px-5">
          {reviewWords.map(([term, gloss]) => (
            <View
              key={term}
              className="flex-row items-center gap-3 overflow-hidden rounded-2xl border-2 bg-white"
              style={{ borderColor: C.charcoal }}
            >
              <View className="w-1.5 self-stretch" style={{ backgroundColor: C.terracotta }} />
              <View className="flex-1 py-3.5">
                <Text className="text-base" style={{ color: C.charcoal, fontFamily: FONT.black }}>
                  {term}
                </Text>
                <Text className="text-sm opacity-60" style={{ color: C.charcoal, fontFamily: FONT.semi }}>
                  {gloss}
                </Text>
              </View>
              <SoundButton term={term} />
            </View>
          ))}
        </View>
      )}

      </ScrollView>

      {/* overlays live OUTSIDE the ScrollView so they cover the viewport,
          not the scrolling content */}
      <Drawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} onLearn={() => router.push("/learn")} />
      <Toast />
    </View>
  );
}
