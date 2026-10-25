import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Bolt, Flame, GhanaFlag, Menu } from "@/components/icons";
import { CURRICULUM, type Lang } from "@/lib/curriculum";
import { C, FONT } from "@/lib/theme";

/* Path headermenu, language, streak + XP pills with press feedback. */

function Pill({
  color,
  icon,
  value,
}: {
  color: string;
  icon: React.ReactNode;
  value: string;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      accessibilityRole="button"
      className="flex-row items-center gap-1.5 rounded-full border-2 bg-white px-3 py-1"
      style={{ borderColor: color, transform: [{ scale: pressed ? 0.92 : 1 }] }}
    >
      {icon}
      <Text className="text-xs font-bold" style={{ color, fontFamily: FONT.extra }}>
        {value}
      </Text>
    </Pressable>
  );
}

export function PathHeader({
  lang,
  onMenu,
  xp,
  streak,
}: {
  lang: Lang;
  onMenu: () => void;
  xp: number;
  streak: number;
}) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-14">
      <Pressable
        onPress={onMenu}
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.9 : 1 }], opacity: pressed ? 0.6 : 1 })}
      >
        <Menu />
      </Pressable>
      <Text className="text-sm uppercase tracking-widest" style={{ color: C.charcoal, fontFamily: FONT.black }}>
        <GhanaFlag width={18} height={12} /> {CURRICULUM[lang].native}
      </Text>
      <View className="flex-row items-center gap-3">
        <Pill color={C.gold} icon={<Flame />} value={String(streak)} />
        <Pill color={C.indigo} icon={<Bolt />} value={String(xp)} />
      </View>
    </View>
  );
}
