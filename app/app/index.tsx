import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";

import { KeyButton } from "@/components/KeyButton";
import { KenteField } from "@/components/KenteField";
import { MascotStar } from "@/components/MascotStar";
import { SunEmblem } from "@/components/SunEmblem";
import { C, FONT } from "@/lib/theme";

/* Onboarding */

const SLIDES: { mood: "wave" | "speak" | "point"; title: string; body: string }[] = [
  {
    mood: "wave",
    title: "Akwaaba",
    body: "Learn Twi with a star friend who celebrates every word you speak.",
  },
  {
    mood: "speak",
    title: "Hear it. Say it.",
    body: "Native audio and pronunciation practice from your very first lesson.",
  },
  {
    mood: "point",
    title: "Your path, your pace",
    body: "200+ bitesize lessons wind through everyday Ghana market, family, festivals.",
  },
];

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    if (i >= SLIDES.length) {
      router.push("/login");
      return;
    }
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
  };

  return (
    <View className="flex-1 bg-indigo">
      <KenteField />

      <Pressable onPress={() => router.push("/login")} className="z-10 self-end px-6 pt-5">
        <Text className="text-sm uppercase tracking-widest text-cream/70" style={{ fontFamily: FONT.black }}>
          Skip 
        </Text>
      </Pressable>

      {/* swipeable slidessnapToInterval works on native AND web
          (pagingEnabled alone is ignored by react-native-web) */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}
        className="z-10 flex-1"
        scrollEventThrottle={16}
        onScroll={(e) => {
          const i = Math.min(SLIDES.length - 1, Math.max(0, Math.round(e.nativeEvent.contentOffset.x / width)));
          setActive((prev) => (prev === i ? prev : i));
        }}
      >
        {SLIDES.map((s, i) => (
          <View key={s.mood} style={{ width }} className="items-center justify-center px-8">
            <View className="h-56 w-56 items-center justify-center">
              <View className="absolute inset-0 items-center justify-center">
                <SunEmblem size={200} />
              </View>
              <MascotStar mood={s.mood} size={150} />
            </View>
            <Text className="mt-6 text-center text-3xl leading-tight text-gold" style={{ fontFamily: FONT.black }}>
              {s.title}
            </Text>
            <Text
              className="mt-3 max-w-[300px] text-center text-base leading-relaxed text-cream/85"
              style={{ fontFamily: FONT.semi }}
            >
              {s.body}
            </Text>
           
          </View>
        ))}
      </ScrollView>

      <View className="z-10 px-7 pb-12">
        <View className="mb-5 flex-row items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => goTo(i)}
              className="h-2 rounded-full"
              style={{ width: i === active ? 26 : 8, backgroundColor: i === active ? C.gold : `${C.cream}55` }}
            />
          ))}
        </View>
        <KeyButton
          label={active === SLIDES.length - 1 ? "Get started" : "Continue"}
          color={C.gold}
          textColor={C.charcoal}
          onPress={() => goTo(active + 1)}
        />
      </View>
    </View>
  );
}
