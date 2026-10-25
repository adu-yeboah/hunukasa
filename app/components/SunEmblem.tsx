import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Rect } from "react-native-svg";

import { C } from "@/lib/theme";

/* Adinkra sun emblemdashed sun ring + cross, spinning slowly (42s/turn,
   same as the web prototype). Rendered behind the mascot on hero screens. */

export function SunEmblem({ size = 200 }: { size?: number }) {
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(withTiming(360, { duration: 42000, easing: Easing.linear }), -1);
  }, [spin]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  return (
    <Animated.View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100" opacity={0.55}>
        <Circle cx={50} cy={50} r={40} fill="none" stroke={C.gold} strokeDasharray="12 6" strokeWidth={8} />
        <Circle cx={50} cy={50} r={20} fill={C.gold} />
        <Rect x={46} y={0} width={8} height={100} fill={C.gold} />
        <Rect x={0} y={46} width={100} height={8} fill={C.gold} />
      </Svg>
    </Animated.View>
  );
}
