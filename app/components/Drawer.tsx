import { useEffect } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

import { KenteField } from "@/components/KenteField";
import { toast } from "@/components/Toast";
import { MascotStar } from "@/components/MascotStar";
import { C, FONT } from "@/lib/theme";

/* Drawermobile port of the prototype's panel: indigo kente header with
   avatar + premium chip, nav items, slide-in with dimmed backdrop.
   Items without screens yet respond with honest "coming in Phase N" notes. */

const W = Dimensions.get("window").width;
const PANEL_W = W * 0.78;

const Icon = ({ d, filled = true }: { d: string; filled?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d={d}
      fill={filled ? C.indigo : "none"}
      stroke={filled ? "none" : C.indigo}
      strokeWidth={filled ? 0 : 2.4}
      strokeLinecap="round"
    />
  </Svg>
);

export function Drawer({
  visible,
  onClose,
  onLearn,
}: {
  visible: boolean;
  onClose: () => void;
  /** where "Learn" goesdefaults to just closing (used on the path itself) */
  onLearn?: () => void;
}) {
  const x = useSharedValue(-PANEL_W - 40);
  const dim = useSharedValue(0);

  useEffect(() => {
    x.value = withTiming(visible ? 0 : -PANEL_W - 40, { duration: 280, easing: Easing.out(Easing.quad) });
    dim.value = withTiming(visible ? 1 : 0, { duration: 280 });
  }, [visible, x, dim]);

  const panelStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const backdropStyle = useAnimatedStyle(() => ({ opacity: dim.value }));

  const note = (feature: string, phase: string) =>
    `${feature} arrives in Phase ${phase} of the action planthe core loop comes first!`;

  const items: { label: string; icon: React.ReactNode; tag?: string; onPress: () => void }[] = [
    { label: "Learn", icon: <MascotStar mood="wave" size={22} />, onPress: () => { onClose(); onLearn?.(); } },
    { label: "Practice", icon: <Icon d="M13 2L4 14h6l-1 8 9-12h-6z" />, onPress: () => { onClose(); router.push("/practice"); } },
    {
      label: "Leaderboard",
      icon: <Icon d="M5 18h3v-7H5zm5.5 0h3V6h-3zm5.5 0h3v-4h-3zM4 20h16v1.5H4z" />,
      tag: "Soon",
      onPress: () => toast.show(note("Weekly XP leagues", "8")),
    },
    {
      label: "Settings",
      icon: (
        <Icon d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4l-2.2-1 .4-2.4-2.3-1-1.5-1.9-2.3.8L12 4.5 10.9 6.5l-2.3-.8-1.5 1.9-2.3 1 .4 2.4L3 12l2.2 1-.4 2.4 2.3 1 1.5 1.9 2.3-.8L12 19.5l1.1-2 2.3.8 1.5-1.9 2.3-1-.4-2.4z" />
      ),
      onPress: () => toast.show(note("Settings & daily goal", "7")),
    },
    { label: "Log Out", icon: <Icon d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10" filled={false} />, onPress: () => { onClose(); router.replace("/login"); } },
  ];

  return (
    <View className="absolute inset-0 z-20" pointerEvents={visible ? "auto" : "none"}>
      {/* dimmed backdrop */}
      <Animated.View style={[{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }, backdropStyle]}>
        <Pressable onPress={onClose} style={{ position: "absolute", inset: 0 }} accessibilityLabel="Close menu" />
      </Animated.View>

      {/* sliding panel */}
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: PANEL_W,
            backgroundColor: C.cream,
            borderRightWidth: 2,
            borderColor: C.charcoal,
          },
          panelStyle,
        ]}
      >
        {/* profile header */}
        <View style={{ position: "relative", overflow: "hidden", backgroundColor: C.indigo }} className="flex-row items-center gap-4 px-5 py-7">
          <View style={{ position: "absolute", inset: 0, opacity: 0.2 }} pointerEvents="none">
            <KenteField color={C.cream} />
          </View>
          <View
            className="items-center justify-center rounded-full border-2"
            style={{ width: 56, height: 56, backgroundColor: C.gold, borderColor: C.cream }}
          >
            <Text className="text-xl" style={{ color: C.charcoal, fontFamily: FONT.black }}>K</Text>
          </View>
          <View style={{ position: "relative" }}>
            <Text style={{ color: C.cream, fontFamily: FONT.extra }}>Kwame Mensah</Text>
            <View className="mt-1 rounded-full px-2.5 py-0.5 self-start" style={{ backgroundColor: C.gold }}>
              <Text className="text-[10px] uppercase tracking-widest" style={{ color: C.charcoal, fontFamily: FONT.black }}>
                ★ Akwaaba Premium
              </Text>
            </View>
          </View>
        </View>

        {/* nav */}
        <View className="flex-1 gap-1 p-4">
          {items.map((it) => (
            <NavRow key={it.label} {...it} />
          ))}
        </View>

        <Text className="p-5 text-center text-xs opacity-50" style={{ color: C.charcoal, fontFamily: FONT.semi }}>
          Hunukasa · Understand Language
        </Text>
      </Animated.View>
    </View>
  );
}

function NavRow({
  label,
  icon,
  tag,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  tag?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center gap-4 rounded-xl px-4 py-3.5"
      style={({ pressed }) => ({ backgroundColor: pressed ? "rgba(27,58,107,0.08)" : "transparent" })}
    >
      {icon}
      <Text style={{ color: C.indigo, fontFamily: FONT.extra }}>{label}</Text>
      {tag && (
        <View className="ml-auto rounded-full px-2 py-0.5" style={{ backgroundColor: C.indigo }}>
          <Text className="text-[10px] font-bold text-white">{tag}</Text>
        </View>
      )}
    </Pressable>
  );
}
