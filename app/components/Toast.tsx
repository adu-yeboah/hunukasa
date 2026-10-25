import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { C, FONT } from "@/lib/theme";

/* Tiny global toastreplaces Alert.alert so feedback works identically
   on native and web. Usage: toast.show("message"), mount <Toast /> once. */

type Listener = (msg: string) => void;
let listener: Listener | null = null;

export const toast = {
  show(msg: string) {
    listener?.(msg);
  },
  listen(fn: Listener | null) {
    listener = fn;
  },
};

export function Toast() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    toast.listen((m) => {
      setMsg(m);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setMsg(null), 2800);
    });
    return () => {
      if (timer) clearTimeout(timer);
      toast.listen(null);
    };
  }, []);

  if (!msg) return null;

  return (
    <View
      pointerEvents="none"
      className="absolute inset-x-6 bottom-10 z-30 rounded-2xl border-2 px-4 py-3"
      style={{ backgroundColor: C.indigo, borderColor: C.charcoal }}
    >
      <Text className="text-xs leading-relaxed text-cream" style={{ fontFamily: FONT.semi }}>
        {msg}
      </Text>
    </View>
  );
}
