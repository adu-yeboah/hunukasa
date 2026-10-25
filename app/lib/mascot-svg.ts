/* Nsorommathe Hunukasa mascot (canonical, SVG-based).
 * A cuddly pear-plump star with soulful dual-glint eyes, chubby mitten
 * hands and flat two-tone cell shading, in the Ghanaian craft palette.
 *
 * This module is the single source of truth for the character: the web
 * MascotStar component (CSS motion baked in via {animated:true}), the
 * mobile SvgXml renderer, the /mascot gallery and Figma exports all
 * render these exact strings.
 *
 * Palette: gold #D9A441 · dark gold #C48D30 · belly light #E5B34B ·
 * charcoal ink #2B211A · terracotta cheeks/tongue #B54B2E · cream #F7EFDF
 *
 */

export type MascotMood =
  | "idle"
  | "wave"
  | "cheer"
  | "think"
  | "sad"
  | "sleep"
  | "listen"
  | "speak"
  | "point";

export const MOODS: MascotMood[] = [
  "idle",
  "wave",
  "cheer",
  "think",
  "sad",
  "sleep",
  "listen",
  "speak",
  "point",
];

const BODY_PATH =
  "M 120 20 " +
  "C 136 20 146 48 154 74 " +
  "C 166 76 192 82 210 96 " +
  "C 218 104 214 118 198 126 " +
  "C 182 134 164 136 156 144 " +
  "C 152 154 162 188 172 206 " +
  "C 176 216 164 224 148 216 " +
  "C 134 206 126 182 120 172 " +
  "C 114 182 106 206 92 216 " +
  "C 76 224 64 216 68 206 " +
  "C 78 188 88 154 84 144 " +
  "C 76 136 58 134 42 126 " +
  "C 26 118 22 104 30 96 " +
  "C 48 82 74 76 86 74 " +
  "C 94 48 104 20 120 20 Z";

/* CSS motion (web). Keyframes live in globals.css; transform/opacity only. */
const BODY_ANIM: Partial<Record<MascotMood, string>> = {
  idle: "mascot-bob 3s ease-in-out infinite",
  cheer: "mascot-bob 0.8s ease-in-out infinite",
  speak: "mascot-bob 1.4s ease-in-out infinite",
  sleep: "mascot-breathe 3.5s ease-in-out infinite",
  think: "mascot-sway 3.2s ease-in-out infinite alternate",
};

export function getStandaloneMascotSvg(
  mood: MascotMood = "idle",
  opts?: { animated?: boolean }
): string {
  const a = opts?.animated ?? false;
  const style = (animation: string, origin?: string) =>
    a ? ` style="animation:${animation}${origin ? `;transform-origin:${origin}` : ""}"` : "";

  let limbsSvg = "";
  if (mood === "idle") {
    limbsSvg = `
    <!-- Left Hand on Hip -->
    <path d="M 64 120 Q 54 134 68 140" fill="#D9A441" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />
    <!-- Right Hand on Hip -->
    <path d="M 176 120 Q 186 134 172 140" fill="#D9A441" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />`;
  } else if (mood === "wave") {
    limbsSvg = `
    <path d="M 64 122 Q 54 136 68 140" fill="#D9A441" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />
    <g${style("mascot-pulse 1s ease-in-out infinite", "176px 110px")}>
      <path d="M 166 112 Q 192 84 206 58" fill="none" stroke="#2B211A" stroke-width="5.5" stroke-linecap="round" />
      <circle cx="206" cy="58" r="8.5" fill="#D9A441" stroke="#2B211A" stroke-width="3.5" />
      <path d="M 218 48 Q 224 58 218 68" stroke="#2B211A" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M 226 44 Q 234 58 226 72" stroke="#2B211A" stroke-width="2" stroke-linecap="round" fill="none" />
    </g>`;
  } else if (mood === "cheer") {
    limbsSvg = `
    <!-- Joyous Victory Arms Thrown Wide -->
    <path d="M 68 108 Q 46 80 34 56" fill="none" stroke="#2B211A" stroke-width="5.5" stroke-linecap="round" />
    <circle cx="34" cy="56" r="8" fill="#D9A441" stroke="#2B211A" stroke-width="3.5" />
    <path d="M 172 108 Q 194 80 206 56" fill="none" stroke="#2B211A" stroke-width="5.5" stroke-linecap="round" />
    <circle cx="206" cy="56" r="8" fill="#D9A441" stroke="#2B211A" stroke-width="3.5" />`;
  } else if (mood === "think") {
    limbsSvg = `
    <path d="M 64 122 Q 54 136 68 142" fill="#D9A441" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 174 122 Q 164 138 144 136 Q 136 136 134 130" fill="none" stroke="#2B211A" stroke-width="5.5" stroke-linecap="round" />
    <circle cx="134" cy="130" r="7.5" fill="#D9A441" stroke="#2B211A" stroke-width="3.5" />`;
  } else if (mood === "sad") {
    limbsSvg = `
    <path d="M 66 120 Q 56 142 58 158" fill="none" stroke="#2B211A" stroke-width="5" stroke-linecap="round" />
    <circle cx="58" cy="158" r="6" fill="#D9A441" stroke="#2B211A" stroke-width="3" />
    <path d="M 174 120 Q 184 142 182 158" fill="none" stroke="#2B211A" stroke-width="5" stroke-linecap="round" />
    <circle cx="182" cy="158" r="6" fill="#D9A441" stroke="#2B211A" stroke-width="3" />`;
  } else if (mood === "sleep") {
    limbsSvg = `
    <path d="M 66 122 Q 88 138 106 140" fill="none" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 174 122 Q 152 138 134 140" fill="none" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />`;
  } else if (mood === "listen") {
    limbsSvg = `
    <path d="M 64 120 Q 56 136 68 142" fill="#D9A441" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 172 118 Q 194 104 192 84 Q 188 74 178 74" fill="none" stroke="#2B211A" stroke-width="5.5" stroke-linecap="round" />
    <circle cx="178" cy="74" r="8" fill="#D9A441" stroke="#2B211A" stroke-width="3.5" />
    <path d="M 176 70 Q 182 74 180 80" stroke="#2B211A" stroke-width="2.5" stroke-linecap="round" fill="none" />`;
  } else if (mood === "speak") {
    limbsSvg = `
    <path d="M 66 120 Q 42 116 34 130" fill="none" stroke="#2B211A" stroke-width="5" stroke-linecap="round" />
    <circle cx="34" cy="130" r="7" fill="#D9A441" stroke="#2B211A" stroke-width="3" />
    <path d="M 174 120 Q 198 116 206 130" fill="none" stroke="#2B211A" stroke-width="5" stroke-linecap="round" />
    <circle cx="206" cy="130" r="7" fill="#D9A441" stroke="#2B211A" stroke-width="3" />`;
  } else if (mood === "point") {
    limbsSvg = `
    <path d="M 64 120 Q 56 134 70 140" fill="#D9A441" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />
    <g${style("mascot-pulse 1.2s ease-in-out infinite", "172px 120px")}>
      <path d="M 172 120 Q 198 120 222 122" fill="none" stroke="#2B211A" stroke-width="5.5" stroke-linecap="round" />
      <circle cx="222" cy="122" r="7" fill="#D9A441" stroke="#2B211A" stroke-width="3" />
      <path d="M 224 122 L 234 122" stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" />
      <circle cx="234" cy="122" r="2" fill="#D9A441" />
    </g>`;
  }

  let browsSvg = "";
  if (mood === "think") {
    browsSvg = `
    <path d="M 95 86 C 99 84 105 84 111 88" />
    <path d="M 127 78 C 133 73 141 73 147 79" />`;
  } else if (mood === "sad") {
    browsSvg = `
    <path d="M 95 83 C 99 87 105 88 111 86" />
    <path d="M 129 86 C 135 88 141 87 145 83" />`;
  } else if (mood === "cheer") {
    browsSvg = `
    <path d="M 93 83 C 99 77 107 77 113 83" />
    <path d="M 127 83 C 133 77 141 77 147 83" />`;
  } else {
    browsSvg = `
    <path d="M 95 84 C 100 80 106 80 112 84" />
    <path d="M 128 84 C 134 80 140 80 145 84" />`;
  }

  let eyesSvg = "";
  if (mood === "cheer") {
    eyesSvg = `
    <g stroke="#2B211A" stroke-width="4.5" stroke-linecap="round" fill="none">
      <path d="M 93 103 C 97 91 109 91 114 103" />
      <path d="M 126 103 C 131 91 143 91 147 103" />
    </g>`;
  } else if (mood === "sleep") {
    eyesSvg = `
    <g stroke="#2B211A" stroke-width="3.6" stroke-linecap="round" fill="none">
      <path d="M 93 102 C 97 107 109 107 114 102" />
      <path d="M 96 106 L 94 109" />
      <path d="M 111 106 L 113 109" />
      <path d="M 126 102 C 130 107 142 107 147 102" />
      <path d="M 129 106 L 127 109" />
      <path d="M 144 106 L 146 109" />
    </g>`;
  } else if (mood === "sad") {
    eyesSvg = `
    <ellipse cx="103" cy="102" rx="13" ry="15.5" fill="#2B211A" transform="rotate(-2 103 102)" />
    <ellipse cx="100" cy="95.5" rx="5" ry="5.5" fill="#F7EFDF" />
    <circle cx="107" cy="108.5" r="2.5" fill="#F7EFDF" />
    <ellipse cx="137" cy="102" rx="13" ry="15.5" fill="#2B211A" transform="rotate(2 137 102)" />
    <ellipse cx="134" cy="95.5" rx="5" ry="5.5" fill="#F7EFDF" />
    <circle cx="141" cy="108.5" r="2.5" fill="#F7EFDF" />
    <ellipse cx="91" cy="116" rx="2.8" ry="4.5" fill="#F7EFDF" stroke="#2B211A" stroke-width="1.2" />`;
  } else if (mood === "think") {
    eyesSvg = `
    <ellipse cx="103" cy="100" rx="12" ry="14.5" fill="#2B211A" transform="rotate(-2 103 100)" />
    <ellipse cx="105.5" cy="94.5" rx="4.5" ry="5.2" fill="#F7EFDF" transform="rotate(10 105.5 94.5)" />
    <circle cx="100.5" cy="106.5" r="2" fill="#F7EFDF" />
    <ellipse cx="137" cy="100" rx="12" ry="14.5" fill="#2B211A" transform="rotate(2 137 100)" />
    <ellipse cx="139.5" cy="94.5" rx="4.5" ry="5.2" fill="#F7EFDF" transform="rotate(10 139.5 94.5)" />
    <circle cx="134.5" cy="106.5" r="2" fill="#F7EFDF" />`;
  } else if (mood === "listen") {
    eyesSvg = `
    <ellipse cx="103" cy="101" rx="13" ry="15.5" fill="#2B211A" transform="rotate(-1 103 101)" />
    <ellipse cx="100" cy="95" rx="4.8" ry="5.8" fill="#F7EFDF" transform="rotate(-12 100 95)" />
    <circle cx="107" cy="108" r="2.4" fill="#F7EFDF" />
    <ellipse cx="137" cy="101" rx="13" ry="15.5" fill="#2B211A" transform="rotate(1 137 101)" />
    <ellipse cx="134" cy="95" rx="4.8" ry="5.8" fill="#F7EFDF" transform="rotate(-12 134 95)" />
    <circle cx="141" cy="108" r="2.4" fill="#F7EFDF" />`;
  } else {
    eyesSvg = `
    <ellipse cx="103" cy="101" rx="12.5" ry="15" fill="#2B211A" transform="rotate(-2 103 101)" />
    <ellipse cx="100.5" cy="95.5" rx="4.5" ry="5.5" fill="#F7EFDF" transform="rotate(-12 100.5 95.5)" />
    <circle cx="106.5" cy="107.5" r="2.2" fill="#F7EFDF" />
    <ellipse cx="137" cy="101" rx="12.5" ry="15" fill="#2B211A" transform="rotate(2 137 101)" />
    <ellipse cx="134.5" cy="95.5" rx="4.5" ry="5.5" fill="#F7EFDF" transform="rotate(-12 134.5 95.5)" />
    <circle cx="140.5" cy="107.5" r="2.2" fill="#F7EFDF" />`;
  }

  let mouthSvg = "";
  if (mood === "idle") {
    mouthSvg = `
    <path d="M 110 116.5 C 112.5 122 116 125.5 120 125.5 C 124 125.5 127.5 122 130 116.5" fill="none" stroke="#2B211A" stroke-width="3.6" stroke-linecap="round" />
    <path d="M 108 115 C 109 116.5 110 117.5 111.5 117.5" fill="none" stroke="#2B211A" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 132 115 C 131 116.5 130 117.5 128.5 117.5" fill="none" stroke="#2B211A" stroke-width="2.2" stroke-linecap="round" />`;
  } else if (mood === "wave" || mood === "cheer" || mood === "point") {
    mouthSvg = `
    <path d="M 108 115.5 C 112 114.5 116 114 120 114 C 124 114 128 114.5 132 115.5 C 134.5 117.5 133 126 127 130 C 123.5 132.5 116.5 132.5 113 130 C 107 126 105.5 117.5 108 115.5 Z" fill="#2B211A" stroke="#2B211A" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" />
    <path d="M 113 126.5 C 115 122 117.5 120 120 120 C 122.5 120 125 122 127 126.5 C 124.5 130 122.5 131.5 120 131.5 C 117.5 131.5 115.5 130 113 126.5 Z" fill="#B54B2E" />
    <path d="M 112.5 115 C 115.5 116.5 124.5 116.5 127.5 115 C 126.5 118 124 119 120 119 C 116 119 113.5 118 112.5 115 Z" fill="#F7EFDF" />`;
  } else if (mood === "speak") {
    mouthSvg = `
    <path d="M 113 117 C 113 114 127 114 127 117 C 127 125 125 130 120 130 C 115 130 113 125 113 117 Z" fill="#2B211A" stroke="#2B211A" stroke-width="2.2" stroke-linejoin="round" />
    <ellipse cx="120" cy="125" rx="5" ry="3.5" fill="#B54B2E" />`;
  } else if (mood === "think") {
    mouthSvg = `
    <path d="M 112 120 C 115 121.5 119 122 123 121 C 126 120 128.5 118 129.5 116.5" fill="none" stroke="#2B211A" stroke-width="3.2" stroke-linecap="round" />`;
  } else if (mood === "sad") {
    mouthSvg = `
    <path d="M 111 124.5 C 114.5 119.5 118 118 120 118 C 122 118 125.5 119.5 129 124.5" fill="none" stroke="#2B211A" stroke-width="3.4" stroke-linecap="round" />
    <path d="M 117 128 C 118.5 129.5 121.5 129.5 123 128" fill="none" stroke="#2B211A" stroke-width="2" stroke-linecap="round" />`;
  } else if (mood === "listen") {
    mouthSvg = `
    <ellipse cx="120" cy="120.5" rx="4.8" ry="6.2" fill="#2B211A" />`;
  } else if (mood === "sleep") {
    mouthSvg = `
    <path d="M 115 120 C 117.5 123 122.5 123 125 120" fill="none" stroke="#2B211A" stroke-width="2.6" stroke-linecap="round" />`;
  }

  let accessoriesSvg = "";
  if (mood === "think") {
    accessoriesSvg = `
    <g${style("mascot-bob 2.5s ease-in-out infinite", "154px 44px")}>
      <circle cx="154" cy="44" r="14" fill="#F7EFDF" stroke="#2B211A" stroke-width="3" />
      <text x="154" y="50" text-anchor="middle" fill="#2B211A" font-size="18" font-weight="900" font-family="Nunito, sans-serif">?</text>
    </g>`;
  } else if (mood === "sleep") {
    accessoriesSvg = `
    <g${style("mascot-pulse 3s ease-in-out infinite")}>
      <text x="162" y="80" fill="#2B211A" font-size="16" font-weight="900" font-family="Nunito, sans-serif">Z</text>
      <text x="176" y="64" fill="#2B211A" font-size="13" font-weight="800" font-family="Nunito, sans-serif">z</text>
      <text x="188" y="50" fill="#2B211A" font-size="10" font-weight="700" font-family="Nunito, sans-serif">z</text>
    </g>`;
  } else if (mood === "listen") {
    accessoriesSvg = `
    <g${style("mascot-pulse 1.5s ease-in-out infinite")} stroke="#1B3A6B" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M 204 66 Q 214 78 204 90" />
      <path d="M 214 60 Q 228 78 214 96" stroke-width="2.5" opacity="0.8" />
      <path d="M 224 54 Q 242 78 224 102" stroke-width="2" opacity="0.5" />
    </g>`;
  } else if (mood === "speak") {
    accessoriesSvg = `
    <g${style("mascot-pulse 1.2s ease-in-out infinite")} stroke="#1B3A6B" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M 142 120 Q 148 126 142 132" />
      <path d="M 150 116 Q 158 126 150 136" stroke-width="2.5" opacity="0.8" />
      <path d="M 158 112 Q 168 126 158 140" stroke-width="2" opacity="0.6" />
    </g>
    <g${style("mascot-bob 2s ease-in-out infinite", "178px 66px")}>
      <circle cx="174" cy="74" r="3.8" fill="#1B3A6B" />
      <line x1="178" y1="74" x2="178" y2="58" stroke="#1B3A6B" stroke-width="2.4" />
      <path d="M 178 58 Q 186 60 188 66" fill="none" stroke="#1B3A6B" stroke-width="2.4" stroke-linecap="round" />
    </g>`;
  } else if (mood === "idle" || mood === "wave") {
    accessoriesSvg = `
    <g${style("mascot-pulse 2s ease-in-out infinite")}>
      <path d="M 24 64 Q 24 72 32 72 Q 24 72 24 80 Q 24 72 16 72 Q 24 72 24 64 Z" fill="#F7EFDF" stroke="#2B211A" stroke-width="2.2" />
    </g>
    <g${style("mascot-pulse 2.4s ease-in-out infinite")}>
      <path d="M 216 54 Q 216 64 226 64 Q 216 64 216 74 Q 216 64 206 64 Q 216 64 216 54 Z" fill="#F7EFDF" stroke="#2B211A" stroke-width="2.2" />
    </g>`;
  } else if (mood === "cheer") {
    accessoriesSvg = `
    <g${style("mascot-pulse 2s ease-in-out infinite")}>
      <path d="M 24 64 Q 24 72 32 72 Q 24 72 24 80 Q 24 72 16 72 Q 24 72 24 64 Z" fill="#F7EFDF" stroke="#2B211A" stroke-width="2.2" />
    </g>
    <g${style("mascot-bob 1.1s ease-in-out infinite", "52px 48px")}>
      <path d="M 52 40 Q 52 48 60 48 Q 52 48 52 56 Q 52 48 44 48 Q 52 48 52 40 Z" fill="#D9A441" stroke="#2B211A" stroke-width="2" />
    </g>
    <g${style("mascot-bob 1.3s ease-in-out infinite", "194px 44px")}>
      <path d="M 194 36 Q 194 44 202 44 Q 194 44 194 52 Q 194 44 186 44 Q 194 44 194 36 Z" fill="#F7EFDF" stroke="#2B211A" stroke-width="2" />
    </g>
    <circle cx="180" cy="94" r="3" fill="#B54B2E" stroke="#2B211A" stroke-width="1.5" />
    <circle cx="48" cy="98" r="3" fill="#3e7d32" stroke="#2B211A" stroke-width="1.5" />`;
  }

  const bodyAnim = a && BODY_ANIM[mood] ? ` style="animation:${BODY_ANIM[mood]};transform-origin:120px 120px"` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240" fill="none">
  <!-- Ground Contact Shadow -->
  <ellipse cx="120" cy="222" rx="${mood === "cheer" ? "30" : "46"}" ry="7" fill="#2B211A" opacity="${mood === "cheer" ? "0.12" : "0.22"}" />

  <defs>
    <clipPath id="body-clip-${mood}">
      <path d="${BODY_PATH}" />
    </clipPath>
  </defs>

  <!-- Mascot Body Group -->
  <g id="nsoromma-${mood}"${bodyAnim}>
    <!-- 1. Kente Gold Body Fill -->
    <path d="${BODY_PATH}" fill="#D9A441" />

    <!-- 2. Cell Shading & Volume -->
    <g clip-path="url(#body-clip-${mood})">
      <path d="M 10 134 Q 120 148 230 134 L 230 230 L 10 230 Z" fill="#C48D30" />
      <ellipse cx="120" cy="116" rx="44" ry="36" fill="#E5B34B" opacity="0.45" />
    </g>

    <!-- 3. Stamp Charcoal Bold 5px Outline -->
    <path
      d="${BODY_PATH}"
      fill="none"
      stroke="#2B211A"
      stroke-width="5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />

    <!-- 4. Posed Limbs -->
    <g id="limbs">${limbsSvg}
    </g>

    <!-- 5. Adinkra Terracotta Cheeks -->
    <ellipse cx="90" cy="120" rx="9" ry="5.5" fill="#B54B2E" opacity="${mood === "sad" ? "0.45" : "0.85"}" />
    <ellipse cx="150" cy="120" rx="9" ry="5.5" fill="#B54B2E" opacity="${mood === "sad" ? "0.45" : "0.85"}" />

    <!-- 6. Expressive Eyebrows -->
    <g stroke="#2B211A" stroke-width="3" stroke-linecap="round" fill="none">${browsSvg}
    </g>

    <!-- 7. Soulful Cartoon Eyes -->
    <g id="eyes">${eyesSvg}
    </g>

    <!-- 8. Redesigned Lips & Mouth -->
    <g id="mouth">${mouthSvg}
    </g>
  </g>

  <!-- 9. Mood Accessories & Sparkles -->
  ${accessoriesSvg}
</svg>`;
}
