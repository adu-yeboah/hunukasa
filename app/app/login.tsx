import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

import { GhanaFlag } from "@/components/icons";
import { GoogleG } from "@/components/GoogleG";
import { KeyButton } from "@/components/KeyButton";
import { KenteField } from "@/components/KenteField";
import { MascotStar } from "@/components/MascotStar";
import { SunEmblem } from "@/components/SunEmblem";
import { C, FONT, LANGUAGES } from "@/lib/theme";
import { useLangStore } from "@/lib/store";
import type { Lang } from "@/lib/theme";

/* LoginGoogle-only, in the prototype's design language:
   indigo hero (kente, spinning sun emblem, gold glow, mascot that cheers
   when you pick a language), cream sheet with language cards + Google CTA.
   Real Supabase OAuth replaces the placeholder handler in ACTION_PLAN 2.3. */

/* soft gold glow behind the mascotRN-port of the web hero's blur blob */
function Glow({ size = 230 }: { size?: number }) {
  return (
    <Svg width={size} height={size} style={{ position: "absolute" }}>
      <Defs>
        <RadialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={C.gold} stopOpacity={0.5} />
          <Stop offset="70%" stopColor={C.gold} stopOpacity={0.18} />
          <Stop offset="100%" stopColor={C.gold} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#hero-glow)" />
    </Svg>
  );
}

function LanguageCard({
  id,
  native,
  lessons,
  active,
  pressed,
  onPick,
  onPressIn,
  onPressOut,
}: {
  id: Lang;
  native: string;
  lessons: number;
  active: boolean;
  pressed: boolean;
  onPick: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
}) {
  void id;
  return (
    <View className="flex-1">
      <Pressable
        onPress={onPick}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        accessibilityLabel={`Learn ${native}${lessons} lessons`}
        className="items-center rounded-2xl py-4"
        style={{
          backgroundColor: active ? C.indigo : "#fff",
          borderWidth: 2,
          borderColor: active ? C.gold : C.charcoal,
          transform: [{ translateY: pressed ? 2 : 0 }],
        }}
      >
        {active && (
          <View
            className="absolute -top-2 -right-2 h-6 w-6 items-center justify-center rounded-full border-2"
            style={{ backgroundColor: C.gold, borderColor: C.charcoal }}
          >
            <Text className="text-[10px]" style={{ color: C.charcoal, fontFamily: FONT.black }}>
              ✓
            </Text>
          </View>
        )}
        <GhanaFlag width={30} height={20} />
        <Text className="mt-1 text-sm" style={{ color: active ? C.cream : C.charcoal, fontFamily: FONT.extra }}>
          {native}
        </Text>
        <Text
          className="mt-0.5 text-[10px] opacity-70"
          style={{ color: active ? C.cream : C.charcoal, fontFamily: FONT.semi }}
        >
          {lessons} lessons
        </Text>
      </Pressable>
    </View>
  );
}

export default function Login() {
  const { lang, setLang } = useLangStore();
  const [mood, setMood] = useState<"wave" | "cheer">("wave");
  const [pressedId, setPressedId] = useState<Lang | null>(null);
  const [busy, setBusy] = useState(false);

  const pick = (l: Lang) => {
    setLang(l);
    setMood("cheer");
    setTimeout(() => setMood("wave"), 1100);
  };

  const signIn = () => {
    if (busy) return;
    setBusy(true);
    setTimeout(() => router.push("/learn"), 700); // real OAuth lands in Phase 2
  };

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
      {/* Indigo hero */}
      <View className="items-center overflow-hidden bg-indigo pb-9 pt-16">
        <View className="absolute inset-0" pointerEvents="none">
          <KenteField />
        </View>
        <View className="h-44 w-44 items-center justify-center">
          <Glow />
          <View className="absolute inset-0 items-center justify-center">
            <SunEmblem size={168} />
          </View>
          <MascotStar mood={mood} size={124} />
        </View>
        <Text className="mt-4 text-4xl tracking-wide text-cream" style={{ fontFamily: FONT.black }}>
          Hunukasa
        </Text>
        <Text className="mt-1 text-xs uppercase tracking-[0.35em] text-gold" style={{ fontFamily: FONT.extra }}>
          Understand Language
        </Text>
      </View>

      {/* Cream sheet: language pick + Google */}
      <View className="-mt-5 flex-1 rounded-t-[2rem] border-2 border-charcoal bg-cream px-7 pb-6 pt-6">
        <Text
          className="mb-4 text-center text-xs uppercase tracking-widest text-charcoal/60"
          style={{ fontFamily: FONT.black }}
        >
          Choose your language
        </Text>
        <View className="flex-row gap-3">
          {LANGUAGES.map((l) => (
            <LanguageCard
              key={l.id}
              id={l.id}
              native={l.native}
              lessons={l.lessons}
              active={lang === l.id}
              pressed={pressedId === l.id}
              onPick={() => pick(l.id)}
              onPressIn={() => setPressedId(l.id)}
              onPressOut={() => setPressedId(null)}
            />
          ))}
        </View>

        <View className="mt-auto pt-8">
          <KeyButton
            label={busy ? "Connecting to Google…" : "Continue with Google"}
            icon={busy ? <ActivityIndicator size="small" color={C.charcoal} /> : <GoogleG />}
            color="#fff"
            textColor={C.charcoal}
            uppercase={false}
            disabled={busy}
            onPress={signIn}
          />
          <Text
            className="mt-3 text-center text-[11px] leading-relaxed text-charcoal/50"
            style={{ fontFamily: FONT.semi }}
          >
            One tap with Google, no passwords.{"\n"}Akwaaba! You are welcome here.
          </Text>
          <Text className="mt-3 text-center text-[10px] text-charcoal/40" style={{ fontFamily: FONT.semi }}>
            By continuing you agree to our Terms &amp; Privacy Policy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
