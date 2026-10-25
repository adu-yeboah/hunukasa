import { Image, type ImageSourcePropType } from "react-native";

import type { MascotMood } from "@/lib/mascot-svg";

/* Nsorommathe Hunukasa mascot, mobile renderer.
 * Uses the animated GIFs generated from the canonical SVG source
 * (web/scripts/make-mascot-gifs.mjs renders web/lib/mascot-svg.ts
 * frame-by-frame)full motion including arm waves, sound ripples,
 * Z z z and confetti, animated natively by the OS with zero JS cost. */

const SOURCES: Record<MascotMood, ImageSourcePropType> = {
  idle: require("../assets/mascots/mascot-idle.gif"),
  wave: require("../assets/mascots/mascot-wave.gif"),
  cheer: require("../assets/mascots/mascot-cheer.gif"),
  think: require("../assets/mascots/mascot-think.gif"),
  sad: require("../assets/mascots/mascot-sad.gif"),
  sleep: require("../assets/mascots/mascot-sleep.gif"),
  listen: require("../assets/mascots/mascot-listen.gif"),
  speak: require("../assets/mascots/mascot-speak.gif"),
  point: require("../assets/mascots/mascot-point.gif"),
};

interface MascotStarProps {
  mood?: MascotMood;
  size?: number;
  animated?: boolean;
}

export function MascotStar({ mood = "idle", size = 124 }: MascotStarProps) {
  return (
    <Image
      source={SOURCES[mood]}
      style={{ width: size, height: size }}
      resizeMode="contain"
      accessible
      accessibilityLabel={`Nsoromma the star (${mood})`}
    />
  );
}
