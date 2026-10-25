import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { KeyButton } from "@/components/KeyButton";
import { MascotStar } from "@/components/MascotStar";
import { Sparkle } from "@/components/icons";
import { C, FONT } from "@/lib/theme";

/* Pue!lesson complete celebration with real stats, then back to the path. */

export default function Complete() {
  const params = useLocalSearchParams<{ xp?: string; acc?: string; lang?: string }>();
  const xp = params.xp ?? "10";
  const acc = params.acc ?? "100";
  const langName = params.lang === "ewe" ? "Eʋegbe" : params.lang === "ga" ? "Gã" : "Twi";

  return (
    <View className="flex-1 items-center justify-between bg-indigo px-8 py-14">
      <StatusBar style="light" />

      <View className="items-center">
        <View style={{ transform: [{ rotate: "-8deg" }] }}>
          <MascotStar mood="cheer" size={150} />
        </View>
        <Text className="mt-2 text-3xl" style={{ color: C.gold, fontFamily: FONT.black }}>
          Pue!
        </Text>
        <Text className="mt-1 text-base text-cream/85" style={{ fontFamily: FONT.bold }}>
          It clicked! {langName} is yours.
        </Text>
        <View className="mt-2 flex-row items-center gap-3">
          <Sparkle size={20} color={C.cream} />
          <Sparkle size={26} color={C.gold} />
          <Sparkle size={20} color={C.cream} />
        </View>
      </View>

      <View className="w-full flex-row gap-3">
        {[
          { v: `+${xp}`, l: "XP Earned" },
          { v: `${acc}%`, l: "Accuracy" },
          { v: "5", l: "Day Streak" },
        ].map((s) => (
          <View key={s.l} className="flex-1 rounded-2xl border-2 py-4" style={{ borderColor: C.gold }}>
            <Text className="text-center text-xl" style={{ color: C.gold, fontFamily: FONT.black }}>
              {s.v}
            </Text>
            <Text className="mt-1 text-center text-[10px] uppercase tracking-wider text-cream/80" style={{ fontFamily: FONT.bold }}>
              {s.l}
            </Text>
          </View>
        ))}
      </View>

      <View className="w-full">
        <KeyButton label="Continue" color={C.gold} textColor={C.charcoal} onPress={() => router.replace("/learn")} />
      </View>
    </View>
  );
}
