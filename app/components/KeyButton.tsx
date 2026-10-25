import { useState, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { C, FONT } from "@/lib/theme";

/* key-3d buttonthe app's tactile spec: solid charcoal layer 4px below,
   press sinks the button into it. Press state is tracked via onPressIn/Out
   with a plain object styleNativeWind drops Pressable function styles. */

export function KeyButton({
  label,
  icon,
  color,
  textColor = "#fff",
  onPress,
  disabled = false,
  uppercase = true,
}: {
  label: string;
  icon?: ReactNode;
  color: string;
  textColor?: string;
  onPress: () => void;
  disabled?: boolean;
  uppercase?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const sunk = pressed && !disabled;

  return (
    <View style={{ paddingBottom: 4, opacity: disabled ? 0.6 : 1 }}>
      {/* solid shadow layer */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, borderRadius: 16, backgroundColor: C.charcoal }}
      />
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        accessibilityRole="button"
        accessibilityLabel={label}
        className="w-full flex-row items-center justify-center gap-3 rounded-2xl py-4"
        style={{
          position: "relative",
          zIndex: 1,
          transform: [{ translateY: sunk ? 4 : 0 }],
          backgroundColor: color,
          borderWidth: 2,
          borderColor: C.charcoal,
        }}
      >
        {icon}
        <Text
          className={"text-base" + (uppercase ? " uppercase tracking-[0.18em]" : "")}
          style={{ color: textColor, fontFamily: FONT.black }}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
}
