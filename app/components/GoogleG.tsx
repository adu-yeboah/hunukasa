import Svg, { Path } from "react-native-svg";

/* Google "G" logo (official 4-color paths), sized for buttons. */

export function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.8z"
      />
      <Path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.1 0-5.8-2.1-6.8-5l-3.8 3C3.3 21.3 7.3 24 12 24z"
      />
      <Path
        fill="#FBBC05"
        d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-3.8-3C.5 8.2 0 10 0 12s.5 3.8 1.4 5.4l3.8-3z"
      />
      <Path
        fill="#EA4335"
        d="M12 4.7c1.8 0 3 .8 3.7 1.4l2.8-2.7C16.7 1.3 14.2 0 12 0 7.3 0 3.3 2.7 1.4 6.6l3.8 3c1-2.9 3.7-4.9 6.8-4.9z"
      />
    </Svg>
  );
}
