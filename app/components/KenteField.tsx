import { useWindowDimensions } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { C } from "@/lib/theme";

/* Kente diamond weave at true 48px pixel scalethe web KentePattern tile
   (outer diamond stroke, inner filled diamond, ring circle), tiled to cover
   the screen with no viewBox stretching. Render absolutely behind content. */

export function KenteField({ opacity = 1, color = C.gold }: { opacity?: number; color?: string }) {
  const { width, height } = useWindowDimensions();
  const T = 48; // tile sizematches the web pattern
  const cols = Math.ceil(width / T) + 1;
  const rows = Math.ceil(height / T) + 1;

  const tiles = [];
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x = gx * T;
      const y = gy * T;
      const cx = x + 24;
      const cy = y + 24;
      tiles.push(
        <Path
          key={`o${gx}-${gy}`}
          d={`M ${x} ${cy} L ${cx} ${y} L ${x + T} ${cy} L ${cx} ${y + T} Z`}
          fill="none"
          stroke={color}
          strokeWidth={2}
        />
      );
      tiles.push(
        <Path
          key={`i${gx}-${gy}`}
          d={`M ${cx - 12} ${cy} L ${cx} ${cy - 12} L ${cx + 12} ${cy} L ${cx} ${cy + 12} Z`}
          fill={color}
        />
      );
      tiles.push(<Circle key={`c${gx}-${gy}`} cx={cx} cy={cy} r={3} fill="none" stroke={color} strokeWidth={2} />);
    }
  }

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: "absolute", left: 0, top: 0 }}
      opacity={0.1 * opacity}
    >
      {tiles}
    </Svg>
  );
}
