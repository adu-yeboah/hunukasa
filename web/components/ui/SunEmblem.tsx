/* Adinkra Sun Emblem  dashed sun ring + cross bars, kente gold.
   Spin it with the `spin-slow` class (42s, defined in globals.css). */
export function SunEmblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#D9A441" fill="none" strokeLinecap="round">
        <circle cx="200" cy="200" r="170" strokeWidth="10" strokeDasharray="26 20" />
        <circle cx="200" cy="200" r="118" strokeWidth="5" strokeDasharray="3 16" />
        <line x1="30" y1="200" x2="370" y2="200" strokeWidth="8" />
        <line x1="200" y1="30" x2="200" y2="370" strokeWidth="8" />
      </g>
      <g fill="#D9A441">
        {[45, 135, 225, 315].map((a) => {
          const rad = (a * Math.PI) / 180;
          return <circle key={a} cx={200 + 170 * Math.cos(rad)} cy={200 + 170 * Math.sin(rad)} r="9" />;
        })}
      </g>
    </svg>
  );
}
