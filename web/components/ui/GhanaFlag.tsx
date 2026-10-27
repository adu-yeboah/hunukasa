/* Ghana flag, red/gold/green with the black star. Replaces the flag emoji. */
export function GhanaFlag({ width = 27, height = 18 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 27 18" aria-hidden="true">
      <path d="M0 0h27v6H0z" fill="#CE1126" />
      <path d="M0 6h27v6H0z" fill="#D9A441" />
      <path d="M0 12h27v6H0z" fill="#006B3F" />
      <polygon
        points="13.5,6.6 14.6,9.6 17.5,9.6 15.2,11.4 16,14.4 13.5,12.6 11,14.4 11.8,11.4 9.5,9.6 12.4,9.6"
        fill="#2B211A"
      />
      <path d="M1 1h25v16H1z" fill="none" stroke="#2B211A" strokeWidth={1.4} />
    </svg>
  );
}
