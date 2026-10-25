import { Pressable, Text, View } from "react-native";

import { MascotStar } from "@/components/MascotStar";
import { Link, Stack } from "expo-router";

import { C } from "@/lib/theme";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-cream px-8">
        <MascotStar mood="idle" size={72} />
        <Text className="mt-3 text-xl font-black text-charcoal">This path doesn&apos;t exist</Text>
        <Link asChild href="/">
          <Pressable
            className="mt-8 rounded-2xl border-2 px-8 py-3"
            style={{ backgroundColor: C.indigo, borderColor: C.charcoal }}
          >
            <Text className="font-extrabold text-cream">Go home</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
