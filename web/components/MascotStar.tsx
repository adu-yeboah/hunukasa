"use client";

import { useId } from "react";

import { getStandaloneMascotSvg, type MascotMood } from "../lib/mascot-svg";

/* Nsorommathe Hunukasa mascot, web renderer.
 * All art (and, when animated=true, the CSS motion) comes verbatim from
 * lib/mascot-svg.tsthis component is a thin, safe wrapper that scopes
 * the clip-path id per instance and sizes the SVG. */

interface MascotStarProps {
  mood?: MascotMood;
  size?: number;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function MascotStar({
  mood = "idle",
  size = 160,
  animated = true,
  interactive = false,
  className = "",
  style,
  onClick,
}: MascotStarProps) {
  const clipId = `nsoromma-${useId().replace(/:/g, "")}`;
  const svg = getStandaloneMascotSvg(mood, { animated })
    .replaceAll(`body-clip-${mood}`, clipId)
    .replace(
      'width="240" height="240"',
      `width="${size}" height="${size}" style="overflow:visible;display:block"`
    );

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex select-none items-center justify-center ${className}`}
      style={{ width: size, height: size, ...style }}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Nsoromma the star (${mood})` : undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
