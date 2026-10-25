import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { MascotStar } from "@/components/MascotStar";
import { Check, Lock } from "@/components/icons";
import { toast } from "@/components/Toast";
import { C, FONT } from "@/lib/theme";
import { PATH_W, type PathItem } from "@/lib/path";

/* Path nodesdone / active / locked states with the key-3d circle
   (solid charcoal sliver below the disc). Locked nodes shake and explain
   themselves; the active node announces the unit goal until the lesson
   engine lands in Phase 3. */

export function NodeCircle({
  size,
  fill,
  borderColor = C.charcoal,
  children,
}: {
  size: number;
  fill: string;
  borderColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <View style={{ width: size, height: size + 5 }}>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: (size + 5) / 2,
          backgroundColor: borderColor,
        }}
      />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: fill,
          borderWidth: 2,
          borderColor: C.charcoal,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
}

export function PathNode({
  item,
  onStart,
}: {
  item: Extract<PathItem, { kind: "unit" }>;
  onStart?: () => void;
}) {
  const shake = useSharedValue(0);
  const anim = useAnimatedStyle(() => ({ transform: [{ translateX: shake.value }] }));

  const nodeLeft = PATH_W / 2 + item.x - 88; // 176px column, centered + weave offset

  const press = () => {
    if (item.state === "locked") {
      shake.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
      toast.show(`Locked${item.tip}`);
      return;
    }
    if (item.state === "active") {
      onStart?.();
    }
  };

  const body =
    item.state === "active" ? (
      <>
        <View className="flex-row items-center gap-2 rounded-full border-2 px-3 py-1" style={{ backgroundColor: C.gold, borderColor: C.charcoal }}>
          <MascotStar mood="wave" size={16} />
          <Text className="text-xs" style={{ color: C.charcoal, fontFamily: FONT.black }}>
            Start here!
          </Text>
        </View>
        <View className="mt-2 items-center justify-center" style={{ width: 96, height: 96 }}>
          <Svg width={96} height={96} style={{ position: "absolute" }}>
            <Circle cx={48} cy={48} r={48} fill={C.gold} opacity={0.35} />
          </Svg>
          <View style={{ position: "absolute", top: 8 }}>
            <NodeCircle size={80} fill={C.indigo}>
              <MascotStar mood="idle" size={56} />
            </NodeCircle>
          </View>
        </View>
        <Text className="mt-2 text-center text-sm" style={{ color: C.charcoal, fontFamily: FONT.extra }}>
          {item.label}
        </Text>
        <Text className="mt-0.5 text-center text-[11px] opacity-50" style={{ color: C.charcoal, fontFamily: FONT.semi }}>
          {item.tip}
        </Text>
      </>
    ) : (
      <>
        <NodeCircle size={64} fill={item.state === "done" ? C.terracotta : "#efe6d2"} borderColor={item.state === "done" ? C.charcoal : "#c9bda3"}>
          {item.state === "done" ? <Check /> : <Lock />}
        </NodeCircle>
        <Text className="mt-1.5 text-center text-xs opacity-70" style={{ color: C.charcoal, fontFamily: FONT.bold }}>
          {item.label}
        </Text>
      </>
    );

  if (item.state === "done") {
    return (
      <Pressable
        onPress={() => toast.show(`${item.label}mastered ✓`)}
        accessibilityLabel={`${item.label}completed`}
        style={{ position: "absolute", left: nodeLeft, top: item.y - 28, width: 176, alignItems: "center" }}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={press}
      accessibilityRole="button"
      accessibilityLabel={`${item.label}${item.state}`}
      style={{ position: "absolute", left: nodeLeft, top: item.y - (item.state === "active" ? 92 : 28), width: 176, alignItems: "center" }}
    >
      <Animated.View style={[{ alignItems: "center" }, anim]}>{body}</Animated.View>
    </Pressable>
  );
}
