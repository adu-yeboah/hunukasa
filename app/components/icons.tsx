import Svg, { Path, Polygon } from "react-native-svg";

import { C } from "@/lib/theme";

/* Shared inline icons24px viewBox, palette-driven. No emoji: everything
   that used to be one is an SVG so it renders identically on every device. */

export const Flame = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    <Path d="M12 2c1 4-4 5.5-4 10a4 4 0 008 0c0-2-1-3-1-3s3 1 3 5a6 6 0 11-12 0c0-6 5-7 6-12z" fill={C.gold} />
  </Svg>
);

export const Bolt = ({ color = C.indigo }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    <Path d="M13 2L4 14h6l-1 8 9-12h-6z" fill={color} />
  </Svg>
);

export const Menu = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path d="M4 7h16M4 12h16M4 17h16" stroke={C.charcoal} strokeWidth={2.4} strokeLinecap="round" />
  </Svg>
);

export const Check = ({ size = 22 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4.5 12.5l5 5 10-11"
      stroke="#fff"
      strokeWidth={3.2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Lock = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    <Path d="M5 10h14v10H5z" fill={C.charcoal} opacity={0.55} />
    <Path d="M8 10V7a4 4 0 018 0v3" stroke={C.charcoal} strokeWidth={2.4} fill="none" />
  </Svg>
);

/* gold trophy cupreplaces the checkpoint emoji */
export const Trophy = ({ size = 34, color = C.charcoal }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M7 3h10v5a5 5 0 01-10 0V3z"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path d="M7 4H4a3 3 0 003 4M17 4h3a3 3 0 01-3 4" fill="none" stroke={color} strokeWidth={2} />
    <Path d="M12 13v4M8 21h8M9 17h6" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

/* four-point sparklereplaces ✨ */
export const Sparkle = ({ size = 18, color = C.gold }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill={color} />
  </Svg>
);

/* Ghana flagred / gold / green with the black star */
export const GhanaFlag = ({ width = 27, height = 18 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 27 18">
    <Path d="M0 0h27v6H0z" fill="#CE1126" />
    <Path d="M0 6h27v6H0z" fill={C.gold} />
    <Path d="M0 12h27v6H0z" fill="#006B3F" />
    <Polygon points="13.5,6.6 14.6,9.6 17.5,9.6 15.2,11.4 16,14.4 13.5,12.6 11,14.4 11.8,11.4 9.5,9.6 12.4,9.6" fill="#2B211A" />
    <Path d="M1 1h25v16H1z" fill="none" stroke={C.charcoal} strokeWidth={1.4} />
  </Svg>
);
